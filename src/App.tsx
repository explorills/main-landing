import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { ArrowUpRight, GitCommit, Calendar, TrendUp } from '@phosphor-icons/react'
import { useGitHubData } from '@/hooks/use-github-data'
import { ActivityChart } from '@/components/ActivityChart'
import { FAQSection } from '@/components/FAQSection'
import { TeamSection } from '@/components/TeamSection'
import { Footer } from '@/components/Footer'
import { ParticleBackground, FloatingOrbs, RisingParticles, BottomParticleBackground } from '@/components/ParticleBackground'
import { PoweredByExplNodes } from '@/components/PoweredByExplNodes'
import { calculateDaysSinceStart } from '@/lib/github'

const ecosystemProjects = [
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

type ProjectStatus = 'LIVE' | 'In Progress' | 'Coming Soon'

interface ProjectDetails {
  name: string
  color: string
  status: ProjectStatus
  description: string
  url?: string
}

const projectsDetails: ProjectDetails[] = [
  {
    name: 'pump',
    color: '#16a34a',
    status: 'In Progress',
    description: 'Decentralized token launch and trading platform for the ONE ecosystem',
    url: 'https://pump.expl.one',
  },
  {
    name: 'network',
    color: '#2563eb',
    status: 'In Progress',
    description: 'Core blockchain infrastructure powering the entire ONE ecosystem',
    url: 'https://network.expl.one',
  },
  {
    name: 'world',
    color: '#ec4899',
    status: 'In Progress',
    description: 'Metaverse platform connecting digital experiences across ONE projects',
    url: 'https://world.expl.one',
  },
  {
    name: 'agent',
    color: '#dc2626',
    status: 'Coming Soon',
    description: 'AI-powered autonomous agents for smart contract interactions',
  },
  {
    name: 'chat',
    color: '#dfdfdf',
    status: 'Coming Soon',
    description: 'Decentralized communication protocol for the ONE community',
  },
  {
    name: 'ID',
    color: '#92400e',
    status: 'Coming Soon',
    description: 'Universal identity system for seamless authentication across ONE',
  },
  {
    name: 'venture',
    color: '#facc15',
    status: 'Coming Soon',
    description: 'Investment platform for funding innovation within the ecosystem',
  },
  {
    name: 'care',
    color: '#64748b',
    status: 'Coming Soon',
    description: 'Healthcare and wellness solutions powered by blockchain technology',
  },
  {
    name: 'merch',
    color: '#ef5609',
    status: 'Coming Soon',
    description: 'Official merchandise marketplace for the ONE ecosystem brand',
  },
  {
    name: 'space',
    color: '#84cc16',
    status: 'Coming Soon',
    description: 'Virtual collaborative workspaces for decentralized teams',
  },
]

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
        style={{ color: currentProject.color }}
      >
        <span className="relative">
          {currentProject.name}
          <span
            className="absolute inset-0 blur-2xl opacity-50"
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

function StatusIndicator({ status }: { status: ProjectStatus }) {
  const getStatusColor = () => {
    switch (status) {
      case 'LIVE':
        return '#16a34a'
      case 'In Progress':
        return '#f59e0b'
      case 'Coming Soon':
        return '#6b7280'
    }
  }

  const isPulsing = status === 'In Progress'

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div
          className={`w-2 h-2 rounded-full ${isPulsing ? 'animate-pulse' : ''}`}
          style={{ backgroundColor: getStatusColor() }}
        />
        {isPulsing && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: getStatusColor() }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </div>
      <span className="text-xs font-medium" style={{ color: getStatusColor() }}>
        {status}
      </span>
    </div>
  )
}

function ProjectCard({ project, index }: { project: ProjectDetails; index: number }) {
  const hasLink = project.status === 'LIVE' || project.status === 'In Progress'
  const showMetrics = project.status === 'LIVE' || project.status === 'In Progress'
  
  const { data: githubData } = useGitHubData(project.name)

  const CardContent = () => (
    <>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: project.color }}
          />
          <h3 className="text-xl font-semibold text-foreground">
            <span className="text-muted-foreground">ONE</span> {project.name}
          </h3>
        </div>
        {hasLink && (
          <ArrowUpRight className="text-primary flex-shrink-0" size={20} weight="bold" />
        )}
      </div>

      <div className="mb-4">
        <StatusIndicator status={project.status} />
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {project.description}
      </p>

      {showMetrics && githubData && (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4 pt-3 border-t border-border/30">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <GitCommit size={14} weight="bold" />
                <span>
                  {githubData.githubData?.commitCount || 0} commits
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar size={14} weight="bold" />
                <span>{githubData.daysSinceStart} days</span>
              </div>
            </div>
            {githubData.githubData && (
              <div className="flex items-center gap-2">
                <TrendUp 
                  size={14} 
                  weight="bold"
                  className={githubData.githubData.isActive ? 'text-green-500' : 'text-muted-foreground'}
                />
                <ActivityChart 
                  isActive={githubData.githubData.isActive}
                  color={project.color}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )

  const cardClasses = `relative group ${
    hasLink ? 'cursor-pointer' : 'cursor-default'
  }`

  const card = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className={cardClasses}>
        <div className="p-6">
          {hasLink && (
            <motion.div
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, ${project.color}10, transparent)`,
              }}
            />
          )}
          <div className="relative z-10">
            <CardContent />
          </div>
        </div>
      </Card>
    </motion.div>
  )

  if (hasLink && project.url) {
    return (
      <a href={project.url} target="_blank" rel="noopener noreferrer">
        {card}
      </a>
    )
  }

  return card
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ecosystemProjects.length)
    }, 2000)
    
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (import.meta.env.DEV) {
      import('@/lib/validateGitHubConfig').then(({ validateGitHubConfiguration, logValidationResults }) => {
        const result = validateGitHubConfiguration()
        logValidationResults(result)
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground pb-16">
      <ParticleBackground />
      <BottomParticleBackground />
      <FloatingOrbs />
      <RisingParticles />
      
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'backdrop-blur-lg bg-[#1c1c1d]/40' : 'bg-[#1c1c1d]/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 sm:py-4 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 sm:gap-4 flex-shrink-0"
            >
              <div className="bg-[#1c1c1d] rounded-lg p-2">
                <img 
                  src="/logo.png" 
                  alt="ONE Logo" 
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                />
              </div>
              <div className="flex flex-col gap-1">
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
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.a
                href="https://mint.expl.one"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm transition-all duration-200 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Node
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <main className="pt-10 sm:pt-14">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 -mt-5">
          <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
          
          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <div className="relative w-full aspect-square max-w-3xl mx-auto">
              {ecosystemProjects.map((project, index) => {
                const angle = (index / ecosystemProjects.length) * 2 * Math.PI - Math.PI / 2
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
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                    }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -12, 0],
                      }}
                      transition={{
                        duration: 2.5 + index * 0.15,
                        repeat: Infinity,
                        ease: [0.45, 0.05, 0.55, 0.95],
                        delay: index * 0.15,
                      }}
                      style={{
                        willChange: 'transform',
                        transform: 'translateZ(0)',
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



        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
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
                  <span className="text-foreground/80">to become a shareholder</span>
                  <br />
                  <span className="text-foreground/80">in the </span>
                  <span className="text-primary">ONE ecosystem</span>
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
                  Join a revolutionary ecosystem where ownership is democratized. 
                  Each EXPL Node grants you a stake in the entire ONE ecosystem, 
                  connecting you to every project, every innovation, and every success.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground/80 leading-relaxed">
                  Become more than a user. Become a co-owner.
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
                  href="https://mint.expl.one"
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

        <section className="relative min-h-screen py-20 px-4">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
                <span className="text-foreground">Ecosystem </span>
                <span className="text-primary glow-accent">Projects</span>
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore the growing landscape of interconnected applications powered by EXPL Nodes
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsDetails.map((project, index) => (
                <ProjectCard key={project.name} project={project} index={index} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-16 text-center"
            >
              <div className="inline-flex items-center gap-6 px-8 py-4 rounded-full border border-border/30 backdrop-blur-sm bg-card/20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#16a34a]" />
                  <span className="text-sm text-muted-foreground">LIVE</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
                  <span className="text-sm text-muted-foreground">In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#6b7280]" />
                  <span className="text-sm text-muted-foreground">Coming Soon</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <TeamSection />

        <FAQSection />
      </main>

      <Footer />
    </div>
  )
}

export default App