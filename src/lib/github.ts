export interface GitHubConfig {
  repoOwner: string
  repoName: string
  token?: string
}

export interface ProjectGitHubData {
  commitCount: number
  lastCommitDate: string
  contributors: number
  isActive: boolean
}

export interface ProjectConfig {
  name: string
  githubRepo?: GitHubConfig
  startDate: string
  status: 'LIVE' | 'In Progress' | 'Coming Soon'
}

/**
 * GitHub Integration Configuration
 * 
 * How to set up:
 * 1. Update 'startDate' with actual project start date (format: YYYY-MM-DD)
 * 2. For LIVE/In Progress projects, update githubRepo:
 *    - repoOwner: Your GitHub username or organization
 *    - repoName: Your repository name
 *    - token: (Optional) Add import.meta.env.VITE_GITHUB_TOKEN for higher rate limits
 * 
 * See QUICK_START_GITHUB.md for detailed instructions.
 */

export const projectConfigs: Record<string, ProjectConfig> = {
  pump: {
    name: 'pump',
    status: 'In Progress',
    startDate: '2024-01-15',
    githubRepo: {
      repoOwner: 'PLACEHOLDER_OWNER',
      repoName: 'PLACEHOLDER_PUMP_REPO',
      token: undefined,
    },
  },
  network: {
    name: 'network',
    status: 'In Progress',
    startDate: '2023-10-01',
    githubRepo: {
      repoOwner: 'PLACEHOLDER_OWNER',
      repoName: 'PLACEHOLDER_NETWORK_REPO',
      token: undefined,
    },
  },
  world: {
    name: 'world',
    status: 'In Progress',
    startDate: '2023-12-10',
    githubRepo: {
      repoOwner: 'PLACEHOLDER_OWNER',
      repoName: 'PLACEHOLDER_WORLD_REPO',
      token: undefined,
    },
  },
  agent: {
    name: 'agent',
    status: 'Coming Soon',
    startDate: '2024-06-01',
  },
  chat: {
    name: 'chat',
    status: 'Coming Soon',
    startDate: '2024-07-01',
  },
  ID: {
    name: 'ID',
    status: 'Coming Soon',
    startDate: '2024-08-01',
  },
  venture: {
    name: 'venture',
    status: 'Coming Soon',
    startDate: '2024-09-01',
  },
  care: {
    name: 'care',
    status: 'Coming Soon',
    startDate: '2024-10-01',
  },
  merch: {
    name: 'merch',
    status: 'Coming Soon',
    startDate: '2024-11-01',
  },
  space: {
    name: 'space',
    status: 'Coming Soon',
    startDate: '2024-12-01',
  },
}

export function calculateDaysSinceStart(startDate: string): number {
  const start = new Date(startDate)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export async function fetchGitHubData(
  config: GitHubConfig
): Promise<ProjectGitHubData | null> {
  if (
    !config.repoOwner ||
    !config.repoName ||
    config.repoOwner === 'PLACEHOLDER_OWNER'
  ) {
    return null
  }

  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
    }

    if (config.token) {
      headers.Authorization = `Bearer ${config.token}`
    }

    const [commitsResponse, contributorsResponse] = await Promise.all([
      fetch(
        `https://api.github.com/repos/${config.repoOwner}/${config.repoName}/commits?per_page=1`,
        { headers }
      ),
      fetch(
        `https://api.github.com/repos/${config.repoOwner}/${config.repoName}/contributors?per_page=1`,
        { headers }
      ),
    ])

    if (!commitsResponse.ok || !contributorsResponse.ok) {
      console.warn(
        `Failed to fetch GitHub data for ${config.repoOwner}/${config.repoName}`
      )
      return null
    }

    const linkHeader = commitsResponse.headers.get('Link')
    let commitCount = 1

    if (linkHeader) {
      const match = linkHeader.match(/page=(\d+)>; rel="last"/)
      if (match) {
        commitCount = parseInt(match[1], 10)
      }
    }

    const commits = await commitsResponse.json()
    const lastCommitDate =
      commits.length > 0 ? commits[0].commit.author.date : new Date().toISOString()

    const contributorsLinkHeader = contributorsResponse.headers.get('Link')
    let contributors = 1

    if (contributorsLinkHeader) {
      const match = contributorsLinkHeader.match(/page=(\d+)>; rel="last"/)
      if (match) {
        contributors = parseInt(match[1], 10)
      }
    }

    const lastCommit = new Date(lastCommitDate)
    const daysSinceLastCommit = Math.floor(
      (Date.now() - lastCommit.getTime()) / (1000 * 60 * 60 * 24)
    )
    const isActive = daysSinceLastCommit <= 7

    return {
      commitCount,
      lastCommitDate,
      contributors,
      isActive,
    }
  } catch (error) {
    console.error('Error fetching GitHub data:', error)
    return null
  }
}

export async function getProjectData(projectName: string) {
  const config = projectConfigs[projectName]
  if (!config) {
    return null
  }

  const daysSinceStart = calculateDaysSinceStart(config.startDate)

  if (config.githubRepo) {
    const githubData = await fetchGitHubData(config.githubRepo)

    return {
      ...config,
      daysSinceStart,
      githubData,
    }
  }

  return {
    ...config,
    daysSinceStart,
    githubData: null,
  }
}
