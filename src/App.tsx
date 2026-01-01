import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { FAQSection } from '@/components/FAQSection'
import { TeamSection } from '@/components/TeamSection'
import { AboutSection } from '@/components/AboutSection'
import { ProjectsSection } from '@/components/ProjectsSection'
import { Footer } from '@/components/Footer'
import { ParticleBackground, FloatingOrbs, RisingParticles, BottomParticleBackground } from '@/components/ParticleBackground'
import { PoweredByExplNodes } from '@/components/PoweredByExplNodes'
import { usePerformanceMode } from '@/hooks/use-performance-mode'

// Projects for navbar title rotation (includes ecosystem)
const ecosystemProjects = [
  { name: 'ecosystem', color: '#a147e1' },
  { name: 'pump', color: '#16a34a' },
  { name: 'network', color: '#2563eb' },
  { name: 'world', color: '#ec4899' },
  { name: 'agent', color: '#dc2626' },
  { name: 'chat', color: '#dfdfdf' },
  { name: 'ID', color: '#92400e' },
  { name: 'venture', color: '#facc15' },
  { name: 'care', color: '#64748b' },
  { name: 'merch', color: '#ef5609' },
  { name: 'space', color: '#84cc16' },
]

// Projects for hero ring (excludes ecosystem - it's in the center)
const heroRingProjects = ecosystemProjects.filter(p => p.name !== 'ecosystem')

// Simple fade-only animation variants (GPU-friendly)
const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

// Simple slide variants using transform only (GPU-friendly)
const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

function AnimatedWord({ enableAnimation }: { enableAnimation: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!enableAnimation) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ecosystemProjects.length)
    }, 2500) // Slower rotation for less CPU usage

    return () => clearInterval(interval)
  }, [enableAnimation])

  const currentProject = ecosystemProjects[currentIndex]

  if (!enableAnimation) {
    return (
      <span className="relative inline-block min-w-[200px] sm:min-w-[300px] md:min-w-[400px] lg:min-w-[500px]">
        <span
          className="flex items-center justify-center text-primary"
          style={{ color: currentProject.color }}
        >
          {currentProject.name}
        </span>
      </span>
    )
  }

  return (
    <span className="relative inline-block min-w-[200px] sm:min-w-[300px] md:min-w-[400px] lg:min-w-[500px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ color: currentProject.color }}
        >
          {currentProject.name}
        </motion.span>
      </AnimatePresence>
      <span className="opacity-0">{ecosystemProjects[0].name}</span>
    </span>
  )
}

// Navbar word animation (simpler version)
function NavbarAnimatedWord({ currentIndex, enableAnimation }: { currentIndex: number; enableAnimation: boolean }) {
  const currentProject = ecosystemProjects[currentIndex]

  if (!enableAnimation) {
    return (
      <span className="relative inline-block min-w-[80px] sm:min-w-[120px]">
        <span
          className="absolute left-0 top-1/2 -translate-y-1/2 text-[22px] sm:text-2xl font-bold whitespace-nowrap"
          style={{ color: currentProject.color }}
        >
          {currentProject.name}
        </span>
        <span className="opacity-0 text-[22px] sm:text-2xl font-bold">ecosystem</span>
      </span>
    )
  }

  return (
    <span className="relative inline-block min-w-[80px] sm:min-w-[120px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-[22px] sm:text-2xl font-bold whitespace-nowrap"
          style={{ color: currentProject.color }}
        >
          {currentProject.name}
        </motion.span>
      </AnimatePresence>
      <span className="opacity-0 text-[22px] sm:text-2xl font-bold">ecosystem</span>
    </span>
  )
}

// Memoized hero ring item to prevent re-renders
const HeroRingItem = ({ project, index, total, enableAnimation }: {
  project: { name: string; color: string }
  index: number
  total: number
  enableAnimation: boolean
}) => {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2
  const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 35 : 42
  const x = 50 + radius * Math.cos(angle)
  const y = 50 + radius * Math.sin(angle)

  return (
    <motion.div
      initial={enableAnimation ? { opacity: 0, scale: 0.8 } : false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: enableAnimation ? 0.3 + index * 0.05 : 0,
        ease: 'easeOut',
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
    >
      <div className="relative group cursor-pointer hero-ring-item">
        <div
          className="hero-ring-item-glow"
          style={{ backgroundColor: project.color }}
        />
        <div className="relative px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-border/50 bg-background/30 group-hover:border-primary/50 transition-colors duration-200">
          <span className="text-sm sm:text-base lg:text-lg font-medium whitespace-nowrap">
            <span className="opacity-60">ONE</span>{' '}
            <span style={{ color: project.color }}>{project.name}</span>
          </span>
        </div>
      </div>
    </motion.div>
  )
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const config = usePerformanceMode()

  // Slower rotation for performance
  useEffect(() => {
    if (!config.enableInfiniteAnimations) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ecosystemProjects.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [config.enableInfiniteAnimations])

  // Scroll to top on page load/refresh
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Throttled scroll handler
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), [])

  // Memoize hero ring items
  const heroRingItems = useMemo(() => (
    heroRingProjects.map((project, index) => (
      <HeroRingItem
        key={project.name}
        project={project}
        index={index}
        total={heroRingProjects.length}
        enableAnimation={config.enableScrollAnimations}
      />
    ))
  ), [config.enableScrollAnimations])

  return (
    <div className="min-h-screen bg-background text-foreground pb-16">
      {/* Background effects - conditionally rendered based on performance */}
      <ParticleBackground />
      <BottomParticleBackground />
      <FloatingOrbs />
      <RisingParticles />

      {/* Header */}
      <motion.header
        initial={config.enableScrollAnimations ? { y: -50, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
          scrolled ? 'header-scrolled' : 'header-default'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 sm:py-4 gap-4">
            {/* Logo area */}
            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
              <img
                src="/logo.png"
                alt="EXPL.ONE - ONE Ecosystem Logo"
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                loading="eager"
                width="64"
                height="64"
              />
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-[24px] sm:text-[26px] font-bold text-white">ONE</span>
                  <NavbarAnimatedWord
                    currentIndex={currentIndex}
                    enableAnimation={config.enableInfiniteAnimations}
                  />
                </div>
                <PoweredByExplNodes size="sm" />
              </div>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#why-node" className="nav-link">Why Node</a>
              <a href="#projects" className="nav-link">Projects</a>
              <a href="#about" className="nav-link">About Us</a>
              <a href="#team" className="nav-link">Team</a>
              <a href="https://github.com/explorills" target="_blank" rel="noopener noreferrer" className="nav-link">Contribute</a>
              <a href="#faq" className="nav-link">FAQ</a>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed top-[72px] left-0 right-0 z-40 mobile-menu md:hidden"
          role="navigation"
        >
          <div className="flex flex-col py-4 px-4 gap-4">
            <a href="#why-node" onClick={closeMobileMenu} className="nav-link">Why Node</a>
            <a href="#projects" onClick={closeMobileMenu} className="nav-link">Projects</a>
            <a href="#about" onClick={closeMobileMenu} className="nav-link">About Us</a>
            <a href="#team" onClick={closeMobileMenu} className="nav-link">Team</a>
            <a href="https://github.com/explorills" target="_blank" rel="noopener noreferrer" className="nav-link">Contribute</a>
            <a href="#faq" onClick={closeMobileMenu} className="nav-link">FAQ</a>
          </div>
        </div>
      )}

      <main className="pt-10 sm:pt-14" role="main">
        {/* Visually hidden H1 for SEO */}
        <h1 className="sr-only">EXPL.ONE - Open Source Web3 Ecosystem: ONE Perfect Tool Per Category</h1>

        {/* Hero section with project ring */}
        <section aria-label="ONE Ecosystem Overview" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 -mt-4">
          <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />

          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <div className="relative w-full aspect-square max-w-3xl mx-auto">
              {/* Hero ring items */}
              {heroRingItems}

              {/* Center logo */}
              <motion.div
                initial={config.enableScrollAnimations ? { opacity: 0, scale: 0.9 } : false}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" />
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-primary/30 flex items-center justify-center bg-background/40">
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-primary">ONE</div>
                      <div className="text-xs sm:text-sm text-muted-foreground mt-1">ecosystem</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Dashed circle */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.1 }}>
                <circle
                  cx="50%"
                  cy="50%"
                  r={typeof window !== 'undefined' && window.innerWidth < 640 ? '35%' : '42%'}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="text-primary"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* Why Node section */}
        <section id="why-node" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 w-full max-w-5xl mx-auto">
            <motion.div
              initial={config.enableScrollAnimations ? slideUpVariants.hidden : false}
              whileInView={slideUpVariants.visible}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-center space-y-8 sm:space-y-12"
            >
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight px-4">
                  <span className="text-foreground">A single </span>
                  <span className="relative inline-block">
                    <span className="text-primary">EXPL Node</span>
                  </span>
                  <span className="text-foreground"> is all you need</span>
                  <br />
                  <span className="text-foreground/80">to become a stakeholder</span>
                  <br />
                  <span className="text-foreground/80">in the </span>
                  <span className="text-primary">ONE </span>
                  <span className="text-foreground/80">ecosystem</span>
                </h2>
              </div>

              <motion.div
                initial={config.enableScrollAnimations ? fadeInVariants.hidden : false}
                whileInView={fadeInVariants.visible}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-3xl mx-auto space-y-6 px-4"
              >
                <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed">
                  Each EXPL Node grants a 45% lifetime proportional share of revenue from the entire ecosystem, minting up to 125,000 EXPL over 731 days, and voting power across all projects.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground/80 leading-relaxed">
                  Become more than a user. Become a co-owner.
                </p>
              </motion.div>

              <motion.div
                initial={config.enableScrollAnimations ? fadeInVariants.hidden : false}
                whileInView={fadeInVariants.visible}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="pt-4"
              >
                <a
                  href="https://node.expl.one"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button inline-block"
                >
                  <span className="flex items-center gap-3">
                    <span>Mint Your EXPL Node</span>
                    <span aria-hidden="true">→</span>
                  </span>
                </a>
              </motion.div>

              <motion.div
                initial={config.enableScrollAnimations ? fadeInVariants.hidden : false}
                whileInView={fadeInVariants.visible}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto px-4"
              >
                {[
                  { label: 'Ecosystem Access', value: '10 Projects' },
                  { label: 'Ownership Model', value: 'Co-Shareholder' },
                  { label: 'Node Type', value: 'Single NFT' },
                  { label: 'Future Growth', value: 'Unlimited' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="stat-card"
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <ProjectsSection />
        <AboutSection />
        <div id="team">
          <TeamSection />
        </div>
        <div id="faq">
          <FAQSection />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
