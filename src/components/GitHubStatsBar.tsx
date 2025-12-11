import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { GitCommit, TrendUp, Calendar, Clock } from '@phosphor-icons/react'

interface GitHubStats {
  lastCommitDate: string
  commitsToday: number
  commitsThisWeek: number
  commitsThisMonth: number
  commitsThisYear: number
  totalCommits: number
  loading: boolean
}

export function GitHubStatsBar() {
  const [stats, setStats] = useState<GitHubStats>({
    lastCommitDate: '-',
    commitsToday: 0,
    commitsThisWeek: 0,
    commitsThisMonth: 0,
    commitsThisYear: 0,
    totalCommits: 0,
    loading: true,
  })

  useEffect(() => {
    // Mock data for now - in production, fetch from GitHub API
    const mockData: GitHubStats = {
      lastCommitDate: new Date().toISOString().split('T')[0],
      commitsToday: 12,
      commitsThisWeek: 84,
      commitsThisMonth: 342,
      commitsThisYear: 1247,
      totalCommits: 3891,
      loading: false,
    }
    
    setTimeout(() => setStats(mockData), 500)
  }, [])

  const statItems = [
    {
      icon: Clock,
      label: 'Last Update',
      value: stats.lastCommitDate,
      color: '#a147e1',
    },
    {
      icon: GitCommit,
      label: 'Today',
      value: stats.commitsToday,
      color: '#16a34a',
    },
    {
      icon: TrendUp,
      label: 'This Week',
      value: stats.commitsThisWeek,
      color: '#2563eb',
    },
    {
      icon: Calendar,
      label: 'This Month',
      value: stats.commitsThisMonth,
      color: '#f59e0b',
    },
    {
      icon: TrendUp,
      label: 'This Year',
      value: stats.commitsThisYear,
      color: '#ec4899',
    },
    {
      icon: GitCommit,
      label: 'Total Commits',
      value: stats.totalCommits,
      color: '#a147e1',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/30 p-4 sm:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {statItems.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative group"
              >
                <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-background/40 border border-border/20 hover:border-primary/30 transition-all duration-300">
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                      style={{ backgroundColor: stat.color }}
                    />
                    <Icon 
                      size={20} 
                      weight="bold" 
                      style={{ color: stat.color }}
                      className="relative"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-foreground" style={{ color: stat.color }}>
                      {stats.loading ? (
                        <motion.div
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="h-6 w-12 bg-muted-foreground/20 rounded mx-auto"
                        />
                      ) : (
                        stat.value
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
