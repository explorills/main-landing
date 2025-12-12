import { useState, useEffect } from 'react'
import { getProjectData, ProjectGitHubData } from '@/lib/github'

interface ProjectData {
  daysSinceStart: number
  githubData: ProjectGitHubData | null
}

export function useGitHubData(projectName: string) {
  const [data, setData] = useState<ProjectData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true

    async function fetchData() {
      try {
        setLoading(true)
        const result = await getProjectData(projectName)

        if (mounted) {
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

    fetchData()

    return () => {
      mounted = false
    }
  }, [projectName])

  return { data, loading, error }
}
