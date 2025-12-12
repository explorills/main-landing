import { motion } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'
import { GitCommit, TrendUp, Calendar, Clock, WifiHigh, WifiSlash } from '@phosphor-icons/react'
import { io, Socket } from 'socket.io-client'
import { updateRepoStatsCache, RepoStats } from '@/lib/github'

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
      // Update the global cache for repo stats - this makes repo commits update live
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

// Animated number component with flash effect
function AnimatedNumber({ value, color, prevValue }: { value: number | string; color: string; prevValue?: number | string }) {
  const [isFlashing, setIsFlashing] = useState(false)
  
  useEffect(() => {
    if (prevValue !== undefined && value !== prevValue) {
      setIsFlashing(true)
      const timer = setTimeout(() => setIsFlashing(false), 1200)
      return () => clearTimeout(timer)
    }
  }, [value, prevValue])
  
  return (
    <motion.span
      animate={{
        scale: isFlashing ? [1, 1.15, 1] : 1,
      }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{ 
        color,
        display: 'inline-block',
        textShadow: isFlashing ? `0 0 20px ${color}, 0 0 40px ${color}` : 'none',
      }}
      className={isFlashing ? 'transition-all duration-300' : ''}
    >
      {value}
    </motion.span>
  )
}

// Live status indicator
function LiveIndicator({ status }: { status: 'connecting' | 'connected' | 'disconnected' }) {
  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return { color: '#16a34a', text: 'LIVE', Icon: WifiHigh, pulse: true }
      case 'connecting':
        return { color: '#f59e0b', text: 'Connecting...', Icon: WifiHigh, pulse: true }
      case 'disconnected':
        return { color: '#ef4444', text: 'Offline', Icon: WifiSlash, pulse: false }
    }
  }
  
  const { color, text, Icon, pulse } = getStatusConfig()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/60 border border-border/30"
    >
      <motion.div
        className="relative flex items-center justify-center"
        animate={pulse ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {pulse && (
          <motion.div
            className="absolute w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
            animate={{ scale: [1, 2], opacity: [0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
        />
      </motion.div>
      <span className="text-xs font-medium" style={{ color }}>{text}</span>
      <Icon size={14} weight="bold" style={{ color }} />
    </motion.div>
  )
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
      console.log('📡 Live stats update received:', data.stats?.today, 'commits today')
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/30 p-4 sm:p-6">
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
                    <Icon size={20} weight="bold" style={{ color: stat.color }} className="relative" />
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-foreground">
                      {stats.loading ? (
                        <motion.div
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="h-6 w-12 bg-muted-foreground/20 rounded mx-auto"
                        />
                      ) : (
                        <AnimatedNumber value={stat.value} color={stat.color} prevValue={stat.prevValue} />
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
