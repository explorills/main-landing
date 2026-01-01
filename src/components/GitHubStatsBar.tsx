import { motion } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'
import { GitCommit, TrendUp, Calendar, Clock, WifiHigh, WifiSlash } from '@phosphor-icons/react'
import { io, Socket } from 'socket.io-client'
import { updateRepoStatsCache, RepoStats } from '@/lib/github'
import { usePerformanceMode } from '@/hooks/use-performance-mode'

const API_URL = 'https://api-landing.expl.one'

interface GitHubStats {
  lastCommitDate: string
  commitsToday: number
  commitsThisWeek: number
  commitsThisMonth: number
  commitsThisYear: number
  totalCommits: number
  loading: boolean
}

interface BackendStats {
  lastUpdate: string
  today: number
  thisWeek: number
  thisMonth: number
  thisYear: number
  total: number
  timestamp: number
}

interface WebSocketData {
  stats: BackendStats
  repoStats: Record<string, RepoStats>
}

// Shared socket instance
let sharedSocket: Socket | null = null
let socketListeners: Set<(data: WebSocketData) => void> = new Set()
let connectionStatus: 'connecting' | 'connected' | 'disconnected' = 'connecting'
let statusListeners: Set<(status: typeof connectionStatus) => void> = new Set()

export function getSharedSocket(): Socket {
  if (!sharedSocket) {
    sharedSocket = io(API_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 10
    })

    sharedSocket.on('connect', () => {
      connectionStatus = 'connected'
      statusListeners.forEach(listener => listener('connected'))
    })

    sharedSocket.on('disconnect', () => {
      connectionStatus = 'disconnected'
      statusListeners.forEach(listener => listener('disconnected'))
    })

    sharedSocket.on('connect_error', () => {
      connectionStatus = 'disconnected'
      statusListeners.forEach(listener => listener('disconnected'))
    })

    sharedSocket.on('stats-update', (data: WebSocketData) => {
      if (data.repoStats) {
        updateRepoStatsCache(data.repoStats)
      }
      socketListeners.forEach(listener => listener(data))
    })
  }
  return sharedSocket
}

export function subscribeToStats(callback: (data: WebSocketData) => void) {
  socketListeners.add(callback)
  return () => socketListeners.delete(callback)
}

export function subscribeToConnectionStatus(callback: (status: typeof connectionStatus) => void) {
  statusListeners.add(callback)
  callback(connectionStatus)
  return () => statusListeners.delete(callback)
}

// Animated number component - CSS-only animation
function AnimatedNumber({ value, color, prevValue, enableAnimation }: {
  value: number | string
  color: string
  prevValue?: number | string
  enableAnimation: boolean
}) {
  const [isFlashing, setIsFlashing] = useState(false)

  useEffect(() => {
    if (!enableAnimation) return
    if (prevValue !== undefined && value !== prevValue) {
      setIsFlashing(true)
      const timer = setTimeout(() => setIsFlashing(false), 800)
      return () => clearTimeout(timer)
    }
  }, [value, prevValue, enableAnimation])

  return (
    <span
      style={{
        color,
        display: 'inline-block',
        transform: isFlashing ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform 0.3s ease-out',
      }}
    >
      {value}
    </span>
  )
}

// Live status indicator
function LiveIndicator({ status }: { status: 'connecting' | 'connected' | 'disconnected' }) {
  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return { color: '#16a34a', text: 'LIVE', Icon: WifiHigh }
      case 'connecting':
        return { color: '#f59e0b', text: 'Connecting...', Icon: WifiHigh }
      case 'disconnected':
        return { color: '#ef4444', text: 'Offline', Icon: WifiSlash }
    }
  }

  const { color, text, Icon } = getStatusConfig()

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/60 border border-border/30">
      <div className="relative flex items-center justify-center w-3 h-3">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-medium" style={{ color }}>{text}</span>
      <Icon size={14} weight="bold" style={{ color }} />
    </div>
  )
}

export function GitHubStatsBar() {
  const config = usePerformanceMode()
  const [stats, setStats] = useState<GitHubStats>({
    lastCommitDate: '-',
    commitsToday: 0,
    commitsThisWeek: 0,
    commitsThisMonth: 0,
    commitsThisYear: 0,
    totalCommits: 0,
    loading: true,
  })
  const [prevStats, setPrevStats] = useState<GitHubStats | null>(null)
  const [wsStatus, setWsStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting')
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null)

  const updateStats = useCallback((data: BackendStats) => {
    setStats(prev => {
      setPrevStats(prev)
      return {
        lastCommitDate: data.lastUpdate ? new Date(data.lastUpdate).toLocaleDateString() : '-',
        commitsToday: data.today,
        commitsThisWeek: data.thisWeek,
        commitsThisMonth: data.thisMonth,
        commitsThisYear: data.thisYear,
        totalCommits: data.total,
        loading: false,
      }
    })
    setLastUpdateTime(new Date())
  }, [])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_URL}/api/stats`)
        if (response.ok) {
          const data = await response.json()
          updateStats(data)
          if (data.repos) {
            updateRepoStatsCache(data.repos)
          }
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
        setStats(prev => ({ ...prev, loading: false }))
      }
    }

    const socket = getSharedSocket()
    const unsubscribeStatus = subscribeToConnectionStatus(setWsStatus)

    const unsubscribe = subscribeToStats((data: WebSocketData) => {
      if (data.stats) {
        updateStats(data.stats)
      }
    })

    fetchStats()

    return () => {
      unsubscribe()
      unsubscribeStatus()
    }
  }, [updateStats])

  const statItems = [
    { icon: Clock, label: 'Last Update', value: stats.lastCommitDate, prevValue: prevStats?.lastCommitDate, color: '#a147e1' },
    { icon: GitCommit, label: 'Today', value: stats.commitsToday, prevValue: prevStats?.commitsToday, color: '#16a34a' },
    { icon: TrendUp, label: 'This Week', value: stats.commitsThisWeek, prevValue: prevStats?.commitsThisWeek, color: '#2563eb' },
    { icon: Calendar, label: 'This Month', value: stats.commitsThisMonth, prevValue: prevStats?.commitsThisMonth, color: '#f59e0b' },
    { icon: TrendUp, label: 'This Year', value: stats.commitsThisYear, prevValue: prevStats?.commitsThisYear, color: '#ec4899' },
    { icon: GitCommit, label: 'Total Commits', value: stats.totalCommits, prevValue: prevStats?.totalCommits, color: '#a147e1' },
  ]

  return (
    <motion.div
      initial={config.enableScrollAnimations ? { opacity: 0, y: 15 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="mb-12"
    >
      <div className="bg-card/30 rounded-xl border border-border/30 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <LiveIndicator status={wsStatus} />
          {lastUpdateTime && (
            <span className="text-xs text-muted-foreground">
              Updated {lastUpdateTime.toLocaleTimeString()}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {statItems.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="relative group"
              >
                <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-background/40 border border-border/20 hover:border-primary/30 transition-all duration-150">
                  <Icon size={20} weight="bold" style={{ color: stat.color }} />
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-foreground">
                      {stats.loading ? (
                        <div className="h-6 w-12 bg-muted-foreground/20 rounded mx-auto animate-pulse" />
                      ) : (
                        <AnimatedNumber
                          value={stat.value}
                          color={stat.color}
                          prevValue={stat.prevValue}
                          enableAnimation={config.enableInfiniteAnimations}
                        />
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
