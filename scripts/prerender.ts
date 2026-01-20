/**
 * Pre-render Script for SSG (Static Site Generation)
 * 
 * This script runs after vite build to pre-render the SPA into static HTML.
 * It launches a headless browser, loads the built app, waits for React to render,
 * and saves the fully-rendered HTML back to dist/index.html.
 * 
 * Result: Search engines and AI crawlers see complete content instead of empty <div id="root">
 */

import puppeteer from 'puppeteer'
import { createServer } from 'http'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distPath = join(__dirname, '..', 'dist')

// Simple static file server for the dist folder
function createStaticServer(port: number): Promise<ReturnType<typeof createServer>> {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = join(distPath, req.url === '/' ? 'index.html' : req.url || '')
      
      // Handle SPA routing - serve index.html for non-file routes
      if (!existsSync(filePath) || !filePath.includes('.')) {
        filePath = join(distPath, 'index.html')
      }

      try {
        const content = readFileSync(filePath)
        const ext = filePath.split('.').pop() || ''
        const mimeTypes: Record<string, string> = {
          'html': 'text/html',
          'js': 'application/javascript',
          'css': 'text/css',
          'png': 'image/png',
          'svg': 'image/svg+xml',
          'json': 'application/json',
          'webmanifest': 'application/manifest+json',
        }
        res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream')
        res.end(content)
      } catch {
        res.statusCode = 404
        res.end('Not found')
      }
    })

    server.listen(port, () => {
      console.log(`[prerender] Static server running on http://localhost:${port}`)
      resolve(server)
    })
  })
}

async function prerender() {
  const port = 4173 // Vite preview port
  const url = `http://localhost:${port}`
  
  console.log('[prerender] Starting SSG pre-render process...')
  console.log('[prerender] dist path:', distPath)

  // Check if dist exists
  if (!existsSync(join(distPath, 'index.html'))) {
    console.error('[prerender] ERROR: dist/index.html not found. Run `bun run build` first.')
    process.exit(1)
  }

  // Read original HTML to preserve head content
  const originalHtml = readFileSync(join(distPath, 'index.html'), 'utf-8')

  // Start static server
  const server = await createStaticServer(port)

  // Launch browser
  console.log('[prerender] Launching headless browser...')
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
  })

  try {
    const page = await browser.newPage()
    
    // Set viewport for consistent rendering
    await page.setViewport({ width: 1920, height: 1080 })

    console.log('[prerender] Loading page...')
    await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 60000 
    })

    // Wait for React to fully render
    // Wait for the root element to have content
    console.log('[prerender] Waiting for React to render...')
    await page.waitForFunction(
      () => {
        const root = document.getElementById('root')
        return root && root.innerHTML.length > 100
      },
      { timeout: 30000 }
    )

    // Additional wait for animations and async data
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Get the rendered HTML from the root element
    const renderedContent = await page.evaluate(() => {
      const root = document.getElementById('root')
      return root ? root.innerHTML : ''
    })

    console.log(`[prerender] Captured ${renderedContent.length} characters of rendered content`)

    // Replace the empty root div with the rendered content
    const prerenderedHtml = originalHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${renderedContent}</div>`
    )

    // Backup original and write pre-rendered version
    writeFileSync(join(distPath, 'index.original.html'), originalHtml)
    writeFileSync(join(distPath, 'index.html'), prerenderedHtml)

    console.log('[prerender] ✅ Pre-rendered HTML saved to dist/index.html')
    console.log('[prerender] ✅ Original HTML backed up to dist/index.original.html')

    // Verify the result
    const finalHtml = readFileSync(join(distPath, 'index.html'), 'utf-8')
    const rootMatch = finalHtml.match(/<div id="root">(.{0,100})/s)
    console.log('[prerender] Root div preview:', rootMatch ? rootMatch[1] + '...' : 'Not found')

  } catch (error) {
    console.error('[prerender] ERROR:', error)
    process.exit(1)
  } finally {
    await browser.close()
    server.close()
    console.log('[prerender] Done!')
  }
}

prerender()
