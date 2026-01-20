import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
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
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/30 bg-background/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="text-xs whitespace-nowrap">
                <span className="text-primary font-semibold">EXPL.ONE</span>
                <span className="text-muted-foreground"> © {new Date().getFullYear()} All rights reserved</span>
              </div>
              
              <div className="flex items-center gap-4 max-[550px]:ml-auto">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group cursor-pointer"
                  >
                    <div className="absolute inset-0 rounded-full bg-primary/50 blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                    <div className="relative w-5 h-5">
                      <img src={social.icon} alt={social.name} className="w-full h-full opacity-60 group-hover:opacity-0 transition-opacity duration-300" />
                      <img src={social.icon} alt={social.name} className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ filter: 'brightness(0) saturate(100%) invert(55%) sepia(75%) saturate(3021%) hue-rotate(248deg) brightness(93%) contrast(91%)' }} />
                    </div>
                  </a>
                ))}
              </div>

              <div className="max-[550px]:hidden">
                <PoweredByExplNodes size="sm" />
              </div>
            </div>
          </div>
        </div>
      </footer>

      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-20 right-8 w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 flex items-center justify-center transition-all duration-300 z-50 border border-primary/50 cursor-pointer"
        initial={{ opacity: 0, scale: 0, y: 100 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0,
          y: showScrollTop ? 0 : 100,
        }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Scroll to top"
      >
        <motion.div
          animate={{
            y: [-2, 2, -2],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </motion.div>
      </motion.button>
    </>
  )
}
