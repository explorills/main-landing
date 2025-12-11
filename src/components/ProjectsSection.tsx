import { motion } from 'framer-motion'
import { useState } from 'react'
import { CaretDown, ArrowUpRight, GitCommit, Calendar } from '@phosphor-icons/react'
import { useGitHubData } from '@/hooks/use-github-data'
import { GitHubStatsBar } from './GitHubStatsBar'

type ProjectStatus = 'LIVE' | 'In Progress' | 'Coming Soon'

interface ProjectDetails {
  name: string
  color: string
  status: ProjectStatus
  description?: string
  url?: string
}

const projectsDetails: ProjectDetails[] = [
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

const statusCategories: ProjectStatus[] = ['LIVE', 'In Progress', 'Coming Soon']

function ProjectItem({ project, compact }: { project: ProjectDetails; compact?: boolean }) {
  const { data: githubData } = useGitHubData(project.name)
  const hasLink = project.status === 'LIVE' || project.status === 'In Progress'

  if (compact) {
    return (
      <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-background/20 hover:bg-background/40 transition-all duration-200">
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
    <div className="flex items-center justify-between gap-3 py-3 px-4 rounded-lg bg-background/20 hover:bg-background/40 transition-all duration-200 group">
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
            <span>{githubData.githubData?.commitCount || 0}</span>
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

function StatusCategory({ status, projects }: { status: ProjectStatus; projects: ProjectDetails[] }) {
  const [isOpen, setIsOpen] = useState(status === 'In Progress')

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

  const isCompact = status === 'Coming Soon'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/30 overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 cursor-pointer hover:bg-background/20 transition-colors duration-200"
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
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <CaretDown size={20} weight="bold" style={{ color: getStatusColor() }} />
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div className="px-4 sm:px-5 pb-4 space-y-2">
          {isCompact ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {projects.map((project) => (
                <ProjectItem key={project.name} project={project} compact />
              ))}
            </div>
          ) : (
            projects.map((project) => (
              <ProjectItem key={project.name} project={project} />
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ProjectsSection() {
  return (
    <section id="projects" className="relative min-h-screen py-20 px-4">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto">
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
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto cursor-text select-text">
            Explore the growing landscape of interconnected applications
          </p>
        </motion.div>

        <GitHubStatsBar />

        <div className="space-y-4">
          {statusCategories.map((status) => {
            const projects = projectsDetails.filter((p) => p.status === status)
            if (projects.length === 0) return null
            return <StatusCategory key={status} status={status} projects={projects} />
          })}
        </div>
      </div>
    </section>
  )
}
