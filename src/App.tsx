import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FAQSection } from '@/components/FAQSection'
import { TeamSection } from '@/components/TeamSection'
import { AboutSection } from '@/components/AboutSection'
import { ProjectsSection } from '@/components/ProjectsSection'
import { Footer } from '@/components/Footer'
import { ParticleBackground } from '@/components/ParticleBackground'
import { PoweredByExplNodes } from '@/components/PoweredByExplNodes'

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

function AnimatedWord() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ecosystemProjects.length)
    }, 2000)
    
    return () => clearInterval(interval)
  }, [])

  const currentProject = ecosystemProjects[currentIndex]
  const nextProject = ecosystemProjects[(currentIndex + 1) % ecosystemProjects.length]

  return (
    <span className="relative inline-block min-w-[200px] sm:min-w-[300px] md:min-w-[400px] lg:min-w-[500px]">
      <motion.span
        key={currentIndex}
        initial={{ y: 50, opacity: 0, filter: 'blur(8px)' }}
        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        exit={{ y: -50, opacity: 0, filter: 'blur(8px)' }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute inset-0 flex items-center justify-center"
        style={{ 
          color: currentProject.color,
          textShadow: `0 0 20px ${currentProject.color}, 0 0 40px ${currentProject.color}, 0 0 60px ${currentProject.color}40`
        }}
      >
        <span className="relative">
          {currentProject.name}
          <span
            className="absolute inset-0 blur-2xl opacity-60"
            style={{ color: currentProject.color }}
          >
            {currentProject.name}
          </span>
        </span>
      </motion.span>
      <span className="opacity-0">{nextProject.name}</span>
    </span>
  )
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ecosystemProjects.length)
    }, 2000)
    
    return () => clearInterval(interval)
  }, [])

  // Scroll to top on page load/refresh
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])



  return (
    <div className="min-h-screen text-foreground pb-16">
      {/* Static starfield background - no animations */}
      <ParticleBackground />
      
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 gpu-accelerate ${
          scrolled ? 'backdrop-blur-lg bg-[#1c1c1d]/40' : 'bg-[#1c1c1d]/50'
        }`}
        style={{ willChange: 'transform' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 sm:py-4 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 sm:gap-4 flex-shrink-0"
            >
              <a href="https://expl.one/" className="cursor-pointer">
                <motion.img 
                  src="/logo.png" 
                  alt="EXPL.ONE - ONE Ecosystem Logo - Open Source Web3 Platform" 
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                  loading="eager"
                  width="64"
                  height="64"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], repeat: Infinity, repeatDelay: 1.5 }}
                  style={{ willChange: 'transform' }}
                />
              </a>
              <motion.div 
                className="flex flex-col gap-1"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], repeat: Infinity, repeatDelay: 1.5 }}
                style={{ willChange: 'transform' }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[24px] sm:text-[26px] font-bold text-white">ONE</span>
                  <span className="relative inline-block min-w-[80px] sm:min-w-[120px]">
                    <motion.span
                      key={currentIndex}
                      initial={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
                      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                      exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
                      transition={{
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="absolute left-0 top-1/2 -translate-y-1/2 text-[22px] sm:text-2xl font-bold whitespace-nowrap"
                      style={{ color: ecosystemProjects[currentIndex].color }}
                    >
                      <span className="relative">
                        {ecosystemProjects[currentIndex].name}
                        <span
                          className="absolute inset-0 blur-2xl opacity-50"
                          style={{ color: ecosystemProjects[currentIndex].color }}
                        >
                          {ecosystemProjects[currentIndex].name}
                        </span>
                      </span>
                    </motion.span>
                    <span className="opacity-0 text-[22px] sm:text-2xl font-bold">ecosystem</span>
                  </span>
                </div>
                <PoweredByExplNodes size="sm" />
              </motion.div>
            </motion.div>
            <motion.nav
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden md:flex items-center gap-6"
            >
              <a href="#why-node" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer">Why Node</a>
              <a href="#projects" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer">Projects</a>
              <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer">About Us</a>
              <a href="#team" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer">Team</a>
              <a href="#contribute" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer">Contribute</a>
              <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer">FAQ</a>
            </motion.nav>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.header>
      
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed top-[72px] left-0 right-0 z-40 bg-[#1c1c1d]/95 backdrop-blur-md border-t border-border/30 md:hidden"
          style={{ willChange: 'opacity' }}
        >
          <div className="flex flex-col py-4 px-4 gap-4">
            <a href="#why-node" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer">Why Node</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer">Projects</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer">About Us</a>
            <a href="#team" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer">Team</a>
            <a href="#contribute" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer">Contribute</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer">FAQ</a>
          </div>
        </motion.div>
      )}

      <main className="pb-14" role="main">
        {/* Visually hidden H1 for SEO - critical for page structure */}
        <h1 className="sr-only">EXPL.ONE - Open Source Web3 Ecosystem: ONE Perfect Tool Per Category</h1>
        
        {/* Hero section: perfectly centered between navbar (top) and footer (bottom) 
            Navbar height: ~104px (logo 56-64px + title + powered by button + py-3/py-4)
            Footer height: ~48px (py-3 + content)
            Using 100svh for better mobile viewport handling */}
        <section 
          aria-label="ONE Ecosystem Overview" 
          className="relative flex items-center justify-center overflow-hidden px-4"
          style={{
            height: 'calc(100svh - 104px - 48px)',
            minHeight: '400px',
            marginTop: '104px',
          }}
        >
          <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
          
          <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-center" style={{ height: '100%' }}>
            {/* Ring container: uses min of available width/height to never cut */}
            <div className="relative" style={{ width: 'min(100%, 100vh - 200px, 768px)', aspectRatio: '1/1' }}>
              {heroRingProjects.map((project, index) => {
                const angle = (index / heroRingProjects.length) * 2 * Math.PI - Math.PI / 2
                const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 35 : 42
                const x = 50 + radius * Math.cos(angle)
                const y = 50 + radius * Math.sin(angle)

                return (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.6 + index * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 gpu-accelerate"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                    }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 3 + index * 0.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      style={{
                        willChange: 'transform',
                      }}
                      className="relative group cursor-pointer"
                    >
                      <div
                        className="absolute inset-0 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-300"
                        style={{ backgroundColor: project.color }}
                      />
                      <div className="relative px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-border/50 backdrop-blur-sm bg-background/30 group-hover:border-primary/50 transition-all duration-300 cursor-pointer">
                        <span className="text-sm sm:text-base lg:text-lg font-medium whitespace-nowrap cursor-pointer">
                          <span className="opacity-60 cursor-pointer">ONE</span> <span style={{ color: project.color }} className="cursor-pointer">{project.name}</span>
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl" />
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-primary/30 flex items-center justify-center backdrop-blur-sm bg-background/40">
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-primary glow-accent">ONE</div>
                      <div className="text-xs sm:text-sm text-muted-foreground mt-1">ecosystem</div>
                    </div>
                  </div>
                </div>
              </motion.div>

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



        <section id="why-node" className="relative flex items-center justify-center overflow-hidden px-4 py-12">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.03 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at center, transparent 0%, transparent 40%, oklch(0.62 0.24 295 / 0.1) 100%)`
              }}
            />
          </div>

          <div className="relative z-10 w-full max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center space-y-8 sm:space-y-12"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              > 
                <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight px-4">
                  <span className="text-foreground">A single </span>
                  <span className="relative inline-block">
                    <span className="text-primary glow-accent-strong">EXPL Node</span>
                    <motion.span
                      className="absolute -inset-2 rounded-lg bg-primary/10 -z-10"
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </span>
                  <span className="text-foreground"> is all you need</span>
                  <br />
                  <span className="text-foreground/80">to become a stakeholder</span>
                  <br />
                  <span className="text-foreground/80">in the </span>
                  <span className="text-primary">ONE </span>
                  <span className="text-foreground/80">ecosystem</span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-3xl mx-auto space-y-6 px-4"
              >
                <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed">
                  Each EXPL Node grants: <span className="inline-flex items-center justify-center w-[1.2em] h-[1.2em] rounded-full bg-primary/20 text-primary font-bold mr-1">1</span>A 45% lifetime proportional share of revenue from the entire ecosystem.<span className="inline-flex items-center justify-center w-[1.2em] h-[1.2em] rounded-full bg-primary/20 text-primary font-bold mx-1">2</span>Minting up to 125,000 EXPL over 731 days.<span className="inline-flex items-center justify-center w-[1.2em] h-[1.2em] rounded-full bg-primary/20 text-primary font-bold mx-1">3</span>Voting power across all projects.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="pt-4"
              >
                <motion.a
                  href="https://node.expl.one"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block relative group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary blur-xl opacity-50 group-hover:opacity-80"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="relative px-8 sm:px-12 py-4 sm:py-6 rounded-full bg-primary text-primary-foreground font-semibold text-lg sm:text-xl md:text-2xl border-2 border-primary/50 shadow-lg shadow-primary/25 group-hover:shadow-xl group-hover:shadow-primary/40 transition-all duration-300">
                    <span className="flex items-center gap-3">
                      <span>Mint Your EXPL Node</span>
                      <motion.span
                        animate={{
                          x: [0, 4, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        →
                      </motion.span>
                    </span>
                  </div>
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8 }}
                className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto px-4"
              >
                {[
                  { label: 'Ecosystem Access', value: '10 Projects' },
                  { label: 'Ownership Model', value: 'Co-Shareholder' },
                  { label: 'Node Type', value: 'Single NFT' },
                  { label: 'Future Growth', value: 'Unlimited' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative p-4 rounded-lg border border-border/30 backdrop-blur-sm bg-card/20">
                      <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </motion.div>
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