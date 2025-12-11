import { projectConfigs } from './github'

export interface ValidationResult {
  isValid: boolean
  warnings: string[]
  errors: string[]
  info: string[]
}

export function validateGitHubConfiguration(): ValidationResult {
  const warnings: string[] = []
  const errors: string[] = []
  const info: string[] = []

  Object.entries(projectConfigs).forEach(([key, config]) => {
    const projectName = config.name

    if (!config.startDate) {
      errors.push(`${projectName}: Missing start date`)
    } else {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      if (!dateRegex.test(config.startDate)) {
        errors.push(
          `${projectName}: Invalid start date format. Expected YYYY-MM-DD, got ${config.startDate}`
        )
      }
    }

    if (config.status === 'LIVE' || config.status === 'In Progress') {
      if (!config.githubRepo) {
        warnings.push(
          `${projectName}: Status is "${config.status}" but no GitHub repo configured`
        )
      } else {
        if (
          !config.githubRepo.repoOwner ||
          config.githubRepo.repoOwner === 'PLACEHOLDER_OWNER'
        ) {
          errors.push(
            `${projectName}: GitHub repo owner is still a placeholder. Update to actual GitHub username/org.`
          )
        }

        if (
          !config.githubRepo.repoName ||
          config.githubRepo.repoName.startsWith('PLACEHOLDER_')
        ) {
          errors.push(
            `${projectName}: GitHub repo name is still a placeholder. Update to actual repository name.`
          )
        }

        if (!config.githubRepo.token) {
          info.push(
            `${projectName}: No GitHub token configured. API rate limit will be 60 requests/hour.`
          )
        }
      }
    } else if (config.githubRepo) {
      warnings.push(
        `${projectName}: Status is "${config.status}" but GitHub repo is configured. GitHub data won't be displayed.`
      )
    }
  })

  const isValid = errors.length === 0

  return {
    isValid,
    warnings,
    errors,
    info,
  }
}

export function logValidationResults(result: ValidationResult): void {
  if (result.errors.length > 0) {
    console.group('❌ GitHub Configuration Errors')
    result.errors.forEach((error) => console.error(error))
    console.groupEnd()
  }

  if (result.warnings.length > 0) {
    console.group('⚠️  GitHub Configuration Warnings')
    result.warnings.forEach((warning) => console.warn(warning))
    console.groupEnd()
  }

  if (result.info.length > 0) {
    console.group('ℹ️  GitHub Configuration Info')
    result.info.forEach((info) => console.info(info))
    console.groupEnd()
  }

  if (result.isValid && result.warnings.length === 0 && result.info.length === 0) {
    console.log('✅ GitHub configuration is complete and valid!')
  }
}
