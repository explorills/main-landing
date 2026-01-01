import { useState, useEffect, useCallback } from 'react'

export type PerformanceMode = 'high' | 'medium' | 'low'

interface PerformanceConfig {
  mode: PerformanceMode
  enableParticles: boolean
  enableFloatingOrbs: boolean
  enableRisingParticles: boolean
  enableBlurEffects: boolean
  enableGlowEffects: boolean
  enableInfiniteAnimations: boolean
  enableScrollAnimations: boolean
  particleCount: number
  connectionDistance: number
  targetFPS: number
  enableMouseInteraction: boolean
}

const PERFORMANCE_CONFIGS: Record<PerformanceMode, PerformanceConfig> = {
  high: {
    mode: 'high',
    enableParticles: true,
    enableFloatingOrbs: true,
    enableRisingParticles: true,
    enableBlurEffects: true,
    enableGlowEffects: true,
    enableInfiniteAnimations: true,
    enableScrollAnimations: true,
    particleCount: 60,
    connectionDistance: 120,
    targetFPS: 60,
    enableMouseInteraction: true,
  },
  medium: {
    mode: 'medium',
    enableParticles: true,
    enableFloatingOrbs: false,
    enableRisingParticles: false,
    enableBlurEffects: true,
    enableGlowEffects: false,
    enableInfiniteAnimations: false,
    enableScrollAnimations: true,
    particleCount: 25,
    connectionDistance: 80,
    targetFPS: 30,
    enableMouseInteraction: false,
  },
  low: {
    mode: 'low',
    enableParticles: false,
    enableFloatingOrbs: false,
    enableRisingParticles: false,
    enableBlurEffects: false,
    enableGlowEffects: false,
    enableInfiniteAnimations: false,
    enableScrollAnimations: true,
    particleCount: 0,
    connectionDistance: 0,
    targetFPS: 30,
    enableMouseInteraction: false,
  },
}

// Detect device capabilities
function detectPerformanceMode(): PerformanceMode {
  // Check for reduced motion preference first
  if (typeof window !== 'undefined') {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return 'low'
    }
  }

  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 2

  // Check device memory (in GB, if available)
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 4

  // Check if mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  // Check screen size as a proxy for device power
  const screenWidth = window.screen.width
  const isSmallScreen = screenWidth < 768

  // Check for low-end mobile indicators
  const isLowEndMobile = isMobile && (
    cores <= 4 ||
    memory <= 2 ||
    isSmallScreen ||
    // Common low-end device patterns
    /Moto|LG|Samsung Galaxy [A-J]|Redmi|OPPO A|Vivo Y|Realme C|Nokia [1-4]/i.test(navigator.userAgent)
  )

  // Check for very low-end devices
  const isVeryLowEnd = (
    cores <= 2 ||
    memory <= 1 ||
    /Android [4-7]\./i.test(navigator.userAgent)
  )

  if (isVeryLowEnd) {
    return 'low'
  }

  if (isLowEndMobile) {
    return 'low'
  }

  if (isMobile) {
    return 'medium'
  }

  // Desktop with good specs
  if (cores >= 4 && memory >= 4) {
    return 'high'
  }

  return 'medium'
}

// Measure actual frame rate performance
function measureFrameRate(callback: (fps: number) => void, samples = 10): () => void {
  let frameCount = 0
  let lastTime = performance.now()
  let animationId: number
  const fpsSamples: number[] = []

  const measure = () => {
    frameCount++
    const currentTime = performance.now()
    const elapsed = currentTime - lastTime

    if (elapsed >= 1000) {
      const fps = Math.round((frameCount * 1000) / elapsed)
      fpsSamples.push(fps)
      frameCount = 0
      lastTime = currentTime

      if (fpsSamples.length >= samples) {
        // Get average FPS, excluding outliers
        const sorted = [...fpsSamples].sort((a, b) => a - b)
        const trimmed = sorted.slice(1, -1) // Remove highest and lowest
        const avg = trimmed.reduce((a, b) => a + b, 0) / trimmed.length
        callback(Math.round(avg))
        return
      }
    }

    animationId = requestAnimationFrame(measure)
  }

  animationId = requestAnimationFrame(measure)

  return () => cancelAnimationFrame(animationId)
}

// Singleton state for performance mode
let globalPerformanceMode: PerformanceMode | null = null
let listeners: Set<(mode: PerformanceMode) => void> = new Set()

export function usePerformanceMode(): PerformanceConfig {
  const [mode, setMode] = useState<PerformanceMode>(() => {
    if (globalPerformanceMode) return globalPerformanceMode
    if (typeof window === 'undefined') return 'medium'
    return detectPerformanceMode()
  })

  useEffect(() => {
    // Initialize global mode if not set
    if (!globalPerformanceMode) {
      globalPerformanceMode = detectPerformanceMode()
      setMode(globalPerformanceMode)
    }

    // Listen for reduced motion changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        globalPerformanceMode = 'low'
        listeners.forEach(l => l('low'))
      } else {
        globalPerformanceMode = detectPerformanceMode()
        listeners.forEach(l => l(globalPerformanceMode!))
      }
    }

    mediaQuery.addEventListener('change', handleMotionChange)

    // Add this component as a listener
    const listener = (newMode: PerformanceMode) => setMode(newMode)
    listeners.add(listener)

    // Adaptive performance: measure actual FPS after initial render
    let cleanup: (() => void) | undefined

    const startMeasuring = setTimeout(() => {
      cleanup = measureFrameRate((fps) => {
        // Only downgrade, never upgrade (conservative approach)
        if (fps < 25 && globalPerformanceMode !== 'low') {
          console.log(`[Performance] Detected low FPS (${fps}), switching to low mode`)
          globalPerformanceMode = 'low'
          listeners.forEach(l => l('low'))
        } else if (fps < 40 && globalPerformanceMode === 'high') {
          console.log(`[Performance] Detected medium FPS (${fps}), switching to medium mode`)
          globalPerformanceMode = 'medium'
          listeners.forEach(l => l('medium'))
        }
      }, 5) // Measure for 5 seconds
    }, 2000) // Wait 2 seconds before measuring

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange)
      listeners.delete(listener)
      clearTimeout(startMeasuring)
      cleanup?.()
    }
  }, [])

  return PERFORMANCE_CONFIGS[mode]
}

// For components that need to check mode without hook
export function getPerformanceMode(): PerformanceMode {
  if (globalPerformanceMode) return globalPerformanceMode
  if (typeof window === 'undefined') return 'medium'
  globalPerformanceMode = detectPerformanceMode()
  return globalPerformanceMode
}

// Utility to check if animations should be reduced
export function shouldReduceMotion(): boolean {
  return getPerformanceMode() === 'low'
}
