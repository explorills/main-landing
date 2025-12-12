const API_URL = 'https://api-landing.expl.one'

export interface RepoStats {
  name: string
  commits: number
  daysSinceCreation: number
  lastCommitDate: string
  createdAt: string
}

export interface ProjectGitHubData {
  commitCount: number
  lastCommitDate: string
  daysSinceCreation: number
  isActive: boolean
}

// Cache for repo stats
let cachedRepoStats: Map<string, RepoStats> = new Map()
let lastFetchTime = 0
const CACHE_DURATION = 60 * 1000 // 1 minute

// Map project names to their actual repo names
const projectToRepoMap: Record<string, string> = {
  ecosystem: 'main-landing',
  pump: 'expl-one-pump',
  network: 'expl-nodes-dashboard',
  world: 'world-soon',
  agent: 'explorills-ai',
  chat: 'spark-chat-interface',
  ID: 'user-dashboard',
  venture: 'ventures-soon',
  care: 'care-soon',
  merch: 'shop-soon',
  space: 'world-soon',
}

export async function fetchAllRepoStats(): Promise<Map<string, RepoStats>> {
  const now = Date.now()
  
  if (cachedRepoStats.size > 0 && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedRepoStats
  }
  
  try {
    const response = await fetch(`${API_URL}/api/stats`)
    if (!response.ok) throw new Error('Failed to fetch stats')
    
    const data = await response.json()
    
    if (data.repos) {
      cachedRepoStats = new Map(Object.entries(data.repos))
      lastFetchTime = now
    }
    
    return cachedRepoStats
  } catch (error) {
    console.error('Error fetching repo stats:', error)
    return cachedRepoStats
  }
}

export async function getProjectData(projectName: string): Promise<{
  daysSinceStart: number
  githubData: ProjectGitHubData | null
} | null> {
  try {
    const allStats = await fetchAllRepoStats()
    const repoName = projectToRepoMap[projectName] || projectName
    
    const repoStats = allStats.get(repoName)
    
    if (repoStats) {
      return {
        daysSinceStart: repoStats.daysSinceCreation,
        githubData: {
          commitCount: repoStats.commits,
          lastCommitDate: repoStats.lastCommitDate,
          daysSinceCreation: repoStats.daysSinceCreation,
          isActive: repoStats.commits > 0,
        }
      }
    }
    
    return null
  } catch (error) {
    console.error('Error getting project data:', error)
    return null
  }
}

// Subscribe to real-time updates
export function updateRepoStatsCache(repos: Record<string, RepoStats>) {
  cachedRepoStats = new Map(Object.entries(repos))
  lastFetchTime = Date.now()
}
