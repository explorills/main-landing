// Single source of GitHub stats for the landing page.
//
// The backend computes everything (commit counts across all branches, per repo
// and in total) and serves it from a cache. The page fetches it ONCE per load
// via fetchSiteStats() — the in-flight promise + cache below guarantee that a
// single /api/stats request is shared by every component on the page.

const API_URL = 'https://api-landing.expl.one'

export interface RepoStats {
  name: string
  commits: number
  daysSinceCreation: number
  lastCommitDate: string
  createdAt: string
}

export interface GlobalStats {
  lastUpdate: string
  today: number
  thisWeek: number
  thisMonth: number
  thisYear: number
  total: number
}

export interface ProjectGitHubData {
  commitCount: number
  lastCommitDate: string
  daysSinceCreation: number
  daysSinceLastCommit: number
  isActive: boolean
}

export interface SiteStats {
  global: GlobalStats
  repos: Record<string, RepoStats>
}

// Maps a project card name to its actual GitHub repository name.
export const projectToRepoMap: Record<string, string> = {
  ecosystem: 'main-landing',
  pump: 'expl-one-pump',
  network: 'expl-nodes-dashboard',
  world: 'world-soon',
  agent: 'expl-one-ai',
  chat: 'one-chat',
  ID: 'one-id',
  box: 'one-box',
  deal: 'one-deal',
  venture: 'ventures-soon',
  care: 'care-soon',
  chain: 'one-chain-landing',
  space: 'world-soon',
}

let cache: SiteStats | null = null
let inFlight: Promise<SiteStats> | null = null

// Fetch the stats snapshot. Resolves from cache after the first successful call;
// concurrent callers share one in-flight request. A failed request is not
// cached, so a later call will retry.
export async function fetchSiteStats(): Promise<SiteStats> {
  if (cache) return cache

  if (!inFlight) {
    inFlight = fetch(`${API_URL}/api/stats`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Stats request failed: ${res.status}`)
        const data = await res.json()
        const result: SiteStats = {
          global: {
            lastUpdate: data.lastUpdate ?? '',
            today: data.today ?? 0,
            thisWeek: data.thisWeek ?? 0,
            thisMonth: data.thisMonth ?? 0,
            thisYear: data.thisYear ?? 0,
            total: data.total ?? 0,
          },
          repos: data.repos ?? {},
        }
        cache = result
        return result
      })
      .finally(() => {
        inFlight = null
      })
  }

  return inFlight
}

// Derive a project card's GitHub data from an already-fetched stats snapshot.
export function getProjectGitHubData(
  projectName: string,
  repos: Record<string, RepoStats>
): ProjectGitHubData | null {
  const repoName = projectToRepoMap[projectName] || projectName
  const repo = repos[repoName]
  if (!repo) return null

  const daysSinceLastCommit = Math.floor(
    (Date.now() - new Date(repo.lastCommitDate).getTime()) / 86_400_000
  )

  return {
    commitCount: repo.commits,
    lastCommitDate: repo.lastCommitDate,
    daysSinceCreation: repo.daysSinceCreation,
    daysSinceLastCommit,
    isActive: repo.commits > 0,
  }
}
