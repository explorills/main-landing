import { Plugin, ResolvedConfig } from 'vite'
import fs from 'fs'
import path from 'path'

/**
 * Vite plugin to create a proxy for Phosphor icons
 * This enables tree-shaking and prevents loading all 1500+ icons at once
 */
export default function phosphorIconProxyPlugin(): Plugin {
  let iconExports: Set<string> = new Set()
  let packagePath = ''

  return {
    name: 'vite-phosphor-icon-proxy',
    
    configResolved(config: ResolvedConfig) {
      // Find the phosphor icons package
      const phosphorPath = path.join(
        config.root,
        'node_modules',
        '@phosphor-icons',
        'react'
      )
      
      if (fs.existsSync(phosphorPath)) {
        packagePath = phosphorPath
        console.log('[icon-proxy] Found Phosphor icons package at:', phosphorPath)
        
        // Read the package index to get all available exports
        const indexPath = path.join(phosphorPath, 'dist', 'index.d.ts')
        if (fs.existsSync(indexPath)) {
          const content = fs.readFileSync(indexPath, 'utf-8')
          // Extract icon names from 'export * from' statements
          const exportFromRegex = /export \* from '\.\/(csr|ssr)\/(\w+)'/g
          const exportMatches = content.matchAll(exportFromRegex)
          for (const match of exportMatches) {
            iconExports.add(match[2])
          }
          console.log(`[icon-proxy] Loaded ${iconExports.size} icon exports`)
        }
      }
    },

    resolveId(id: string) {
      // Intercept imports from @phosphor-icons/react
      if (id === '@phosphor-icons/react') {
        return '\0phosphor-proxy'
      }
      return null
    },

    load(id: string) {
      if (id === '\0phosphor-proxy') {
        // Create a virtual module that re-exports all icons
        // This allows Vite to tree-shake unused icons
        return `
          ${Array.from(iconExports)
            .map(name => `export { ${name} } from '@phosphor-icons/react/dist/index.esm.js'`)
            .join('\n')}
        `
      }
      return null
    },
  }
}
