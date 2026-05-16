import { useState, useEffect } from 'react'
import { fetchSiteStats, getProjectGitHubData, ProjectGitHubData } from '@/lib/github'

interface ProjectData {
  daysSinceStart: number
  githubData: ProjectGitHubData | null
}

// Per-project GitHub data, derived once from the shared site-stats snapshot.
export function useGitHubData(projectName: string) {
  const [data, setData] = useState<ProjectData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true

    fetchSiteStats()
      .then((site) => {
        if (!mounted) return
        const githubData = getProjectGitHubData(projectName, site.repos)
        setData({
          daysSinceStart: githubData?.daysSinceCreation ?? 0,
          githubData,
        })
        setError(null)
      })
      .catch((err) => {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch data'))
        }
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [projectName])

  return { data, loading, error }
}
