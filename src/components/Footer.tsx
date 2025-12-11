import { PoweredByExplNodes } from './PoweredByExplNodes'

const socialLinks = [
  {
    name: 'Discord',
    url: 'https://discord.com/invite/RetTCVq7tJ',
    icon: '/Discord-Symbol-White.svg',
  },
  {
    name: 'Twitter',
    url: 'https://x.com/explorills_main',
    icon: 'https://cdn.simpleicons.org/x/ffffff',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/explorills',
    icon: '/github-mark-white.svg',
  },
]

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/30 bg-background/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="text-xs text-muted-foreground whitespace-nowrap">
              EXPL.ONE © 2025 All rights reserved
            </div>
            
            <div className="flex items-center gap-4 max-[480px]:ml-auto">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  <img src={social.icon} alt={social.name} className="w-5 h-5 opacity-60 hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>

            <div className="max-[480px]:hidden">
              <PoweredByExplNodes size="sm" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
