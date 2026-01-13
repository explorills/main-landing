import { useState, useEffect, useCallback } from 'react'
import { getProjectData, ProjectGitHubData, RepoStats, projectToRepoMap } from '@/lib/github'
import { subscribeToStats, getSharedSocket } from '@/components/GitHubStatsBar'

interface ProjectData {
  daysSinceStart: number
  githubData: ProjectGitHubData | null
}

export function useGitHubData(projectName: string) {
  const [data, setData] = useState<ProjectData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const updateFromRepoStats = useCallback((repoStats: Record<string, RepoStats>) => {
    const repoName = projectToRepoMap[projectName] || projectName
    const stats = repoStats[repoName]
    
    if (stats) {
      const lastCommitDate = new Date(stats.lastCommitDate)
      const now = new Date()
      const daysSinceLastCommit = Math.floor((now.getTime() - lastCommitDate.getTime()) / (1000 * 60 * 60 * 24))
      
      setData({
        daysSinceStart: stats.daysSinceCreation,
        githubData: {
          commitCount: stats.commits,
          lastCommitDate: stats.lastCommitDate,
          daysSinceCreation: stats.daysSinceCreation,
          daysSinceLastCommit,
          isActive: stats.commits > 0,
        }
      })
      setLoading(false)
    }
  }, [projectName])

  useEffect(() => {
    let mounted = true

    async function fetchData() {
      try {
        setLoading(true)
        const result = await getProjectData(projectName)

        if (mounted && result) {
          setData(result)
          setError(null)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch data'))
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    // Initialize socket connection
    getSharedSocket()

    // Subscribe to live updates for repo stats
    const unsubscribe = subscribeToStats((wsData) => {
      if (wsData.repoStats && mounted) {
        updateFromRepoStats(wsData.repoStats)
      }
    })

    fetchData()

    return () => {
      mounted = false
      unsubscribe()
    }
  }, [projectName, updateFromRepoStats])

  return { data, loading, error }
}
