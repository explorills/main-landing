import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { CaretDown, ArrowUpRight, GitCommit, Calendar } from '@phosphor-icons/react'
import { useGitHubData } from '@/hooks/use-github-data'
import { usePerformanceMode } from '@/hooks/use-performance-mode'
import { GitHubStatsBar } from './GitHubStatsBar'

type ProjectStatus = 'Deployed' | 'In Progress' | 'Coming Soon'

interface ProjectDetails {
  name: string
  color: string
  status: ProjectStatus
  description?: string
  url?: string
}

// Animated commit count that flashes on update (only on high performance)
function AnimatedCommitCount({ count, enableAnimation }: { count: number; enableAnimation: boolean }) {
  const [isFlashing, setIsFlashing] = useState(false)
  const prevCountRef = useRef(count)

  useEffect(() => {
    if (!enableAnimation) return
    if (count !== prevCountRef.current) {
      setIsFlashing(true)
      prevCountRef.current = count
      const timer = setTimeout(() => setIsFlashing(false), 800)
      return () => clearTimeout(timer)
    }
  }, [count, enableAnimation])

  return (
    <span
      style={{
        color: isFlashing ? '#16a34a' : '#a1a1aa',
        transform: isFlashing ? 'scale(1.2)' : 'scale(1)',
        display: 'inline-block',
        transition: 'all 0.3s ease-out',
      }}
    >
      {count}
    </span>
  )
}

const projectsDetails: ProjectDetails[] = [
  {
    name: 'ecosystem',
    color: '#a147e1',
    status: 'Deployed',
    description: '',
    url: 'https://expl.one',
  },
  {
    name: 'pump',
    color: '#16a34a',
    status: 'In Progress',
    description: 'Decentralized token launch and trading platform',
    url: 'https://pump.expl.one',
  },
  {
    name: 'network',
    color: '#2563eb',
    status: 'In Progress',
    description: 'Core blockchain infrastructure powering ONE',
    url: 'https://network.expl.one',
  },
  {
    name: 'world',
    color: '#ec4899',
    status: 'In Progress',
    description: 'Metaverse connecting digital experiences',
    url: 'https://world.expl.one',
  },
  {
    name: 'agent',
    color: '#dc2626',
    status: 'Coming Soon',
  },
  {
    name: 'chat',
    color: '#dfdfdf',
    status: 'Coming Soon',
  },
  {
    name: 'ID',
    color: '#92400e',
    status: 'Coming Soon',
  },
  {
    name: 'venture',
    color: '#facc15',
    status: 'Coming Soon',
  },
  {
    name: 'care',
    color: '#64748b',
    status: 'Coming Soon',
  },
  {
    name: 'merch',
    color: '#ef5609',
    status: 'Coming Soon',
  },
  {
    name: 'space',
    color: '#84cc16',
    status: 'Coming Soon',
  },
]

const statusCategories: ProjectStatus[] = ['Deployed', 'In Progress', 'Coming Soon']

function ProjectItem({ project, compact, enableAnimation }: { project: ProjectDetails; compact?: boolean; enableAnimation: boolean }) {
  const { data: githubData } = useGitHubData(project.name)
  const hasLink = project.status === 'Deployed' || project.status === 'In Progress'

  if (compact) {
    return (
      <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-background/20 hover:bg-background/40 transition-all duration-150">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: project.color }}
          />
          <span className="text-sm font-medium text-foreground cursor-text select-text">
            ONE <span style={{ color: project.color }}>{project.name}</span>
          </span>
        </div>
      </div>
    )
  }

  const CardContent = (
    <div className="flex items-center justify-between gap-3 py-3 px-4 rounded-lg bg-background/20 hover:bg-background/40 transition-all duration-150 group">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div
          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: project.color }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-semibold text-foreground cursor-text select-text">
              ONE <span style={{ color: project.color }}>{project.name}</span>
            </h3>
            {hasLink && (
              <ArrowUpRight className="text-primary flex-shrink-0" size={16} weight="bold" />
            )}
          </div>
          {project.description && (
            <p className="text-xs text-muted-foreground leading-relaxed cursor-text select-text">
              {project.description}
            </p>
          )}
        </div>
      </div>

      {githubData && (
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <GitCommit size={12} weight="bold" />
            <AnimatedCommitCount count={githubData.githubData?.commitCount || 0} enableAnimation={enableAnimation} />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar size={12} weight="bold" />
            <span>{githubData.daysSinceStart}d</span>
          </div>
        </div>
      )}
    </div>
  )

  if (hasLink && project.url) {
    return (
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
        {CardContent}
      </a>
    )
  }

  return CardContent
}

function StatusCategory({ status, projects, enableAnimation }: { status: ProjectStatus; projects: ProjectDetails[]; enableAnimation: boolean }) {
  const [isOpen, setIsOpen] = useState(status === 'In Progress' || status === 'Deployed')

  const getStatusColor = () => {
    switch (status) {
      case 'Deployed':
        return '#16a34a'
      case 'In Progress':
        return '#f59e0b'
      case 'Coming Soon':
        return '#6b7280'
    }
  }

  const isCompact = status === 'Coming Soon'

  return (
    <motion.div
      initial={enableAnimation ? { opacity: 0, y: 15 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-card/30 rounded-xl border border-border/30 overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 cursor-pointer hover:bg-background/20 transition-colors duration-150"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: getStatusColor() }}
          />
          <h3 className="text-lg sm:text-xl font-bold text-foreground">
            {status} <span className="text-muted-foreground text-sm">({projects.length})</span>
          </h3>
        </div>
        <div
          className="transition-transform duration-200"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <CaretDown size={20} weight="bold" style={{ color: getStatusColor() }} />
        </div>
      </button>

      <div
        className="overflow-hidden transition-all duration-200"
        style={{
          maxHeight: isOpen ? '1000px' : '0',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-4 sm:px-5 pb-4 space-y-2">
          {isCompact ? (
            <div className="flex flex-wrap justify-center gap-2">
              {projects.map((project) => (
                <ProjectItem key={project.name} project={project} compact enableAnimation={enableAnimation} />
              ))}
            </div>
          ) : (
            projects.map((project) => (
              <ProjectItem key={project.name} project={project} enableAnimation={enableAnimation} />
            ))
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const config = usePerformanceMode()

  return (
    <section id="projects" className="relative min-h-screen py-20 px-4">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <motion.div
          initial={config.enableScrollAnimations ? { opacity: 0, y: 20 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="text-foreground">Ecosystem </span>
            <span className="text-primary">Projects</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto cursor-text select-text">
            Explore the growing landscape of interconnected applications
          </p>
        </motion.div>

        <GitHubStatsBar />

        <div className="space-y-4">
          {statusCategories.map((status) => {
            const projects = projectsDetails.filter((p) => p.status === status)
            if (projects.length === 0) return null
            return (
              <StatusCategory
                key={status}
                status={status}
                projects={projects}
                enableAnimation={config.enableScrollAnimations}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
