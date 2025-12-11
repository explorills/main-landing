import { motion } from 'framer-motion'
import { Info, X } from '@phosphor-icons/react'
import { useState } from 'react'
import { Card } from '@/components/ui/card'

export function GitHubSetupBanner() {
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4"
    >
      <Card className="border-primary/50 bg-card/95 backdrop-blur-md shadow-lg shadow-primary/10">
        <div className="p-4 flex items-start gap-4">
          <Info size={24} weight="bold" className="text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-2">
              GitHub Integration Ready
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Project cards are ready to display live GitHub data. See{' '}
              <code className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">
                GITHUB_INTEGRATION_SETUP.md
              </code>{' '}
              for step-by-step instructions.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="px-2 py-1 rounded bg-muted/50">
                ✓ Add repository names
              </span>
              <span className="px-2 py-1 rounded bg-muted/50">
                ✓ Update start dates
              </span>
              <span className="px-2 py-1 rounded bg-muted/50">
                ✓ Add API token
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsDismissed(true)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={20} weight="bold" />
          </button>
        </div>
      </Card>
    </motion.div>
  )
}
