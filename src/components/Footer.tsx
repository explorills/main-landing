import { motion } from 'framer-motion'
import { GithubLogo, DiscordLogo, XLogo, ArrowUp } from '@phosphor-icons/react'
import { useState, useEffect } from 'react'

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/explorills',
    icon: GithubLogo,
    color: '#a147e1',
  },
  {
    name: 'Discord',
    url: 'https://discord.com/invite/RetTCVq7tJ',
    icon: DiscordLogo,
    color: '#5865F2',
  },
  {
    name: 'Twitter',
    url: 'https://x.com/explorills_main',
    icon: XLogo,
    color: '#1DA1F2',
  },
]

const footerLinks = [
  {
    title: 'Ecosystem',
    links: [
      { name: 'ONE pump', url: 'https://pump.expl.one' },
      { name: 'ONE network', url: 'https://network.expl.one' },
      { name: 'ONE world', url: 'https://world.expl.one' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Documentation', url: 'https://docs.expl.one' },
      { name: 'Tokenomics', url: 'https://docs.explorills.com/tokenomics/supply/' },
      { name: 'Mint EXPL Node', url: 'https://mint.expl.one' },
    ],
  },
  {
    title: 'Community',
    links: [
      { name: 'Discord', url: 'https://discord.com/invite/RetTCVq7tJ' },
      { name: 'GitHub', url: 'https://github.com/explorills' },
      { name: 'Contact Us', url: 'mailto:team@expl.one' },
    ],
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
    <footer className="relative border-t border-border/30 bg-background">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 sm:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 relative flex-shrink-0">
                  <svg viewBox="0 0 500 500" className="w-full h-full">
                    <circle cx="250" cy="250" r="200" fill="#d1d5db" />
                    <ellipse cx="250" cy="250" rx="110" ry="180" fill="#000000" />
                    <circle cx="425" cy="425" r="25" fill="#a147e1" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">EXPL.ONE</h3>
                  <p className="text-sm text-muted-foreground font-mono">ONE ecosystem</p>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-muted-foreground leading-relaxed max-w-md"
              >
                Building the future of Web3 with one perfect tool per category. 
                Open source, community-driven, and transparent.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-4"
              >
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                        style={{ backgroundColor: social.color }}
                      />
                      <div className="relative w-12 h-12 rounded-full border border-border/50 group-hover:border-primary/50 backdrop-blur-sm bg-card/30 group-hover:bg-card/50 flex items-center justify-center transition-all duration-300">
                        <Icon 
                          size={24} 
                          weight="fill" 
                          className="text-muted-foreground group-hover:text-primary transition-colors duration-300"
                        />
                      </div>
                    </motion.a>
                  )
                })}
              </motion.div>
            </div>

            {footerLinks.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + sectionIndex * 0.1 }}
                className="space-y-4"
              >
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + sectionIndex * 0.1 + linkIndex * 0.05 }}
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center gap-2 group"
                      >
                        <span className="relative">
                          {link.name}
                          <motion.span
                            className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary origin-left"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-border/30 py-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} EXPL.ONE. All rights reserved.</p>
              <span className="hidden sm:inline text-border">•</span>
              <p className="font-mono">Building in public, open source forever</p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <span>Made with</span>
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-primary"
              >
                ♦
              </motion.span>
              <span>by the ONE team</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 flex items-center justify-center transition-all duration-300 z-50 border border-primary/50"
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
          <ArrowUp size={24} weight="bold" />
        </motion.div>
      </motion.button>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </footer>
  )
}
