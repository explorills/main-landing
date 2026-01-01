import { useState, useEffect } from 'react'

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
    enableFloatingOrbs: true,
    enableRisingParticles: true,
    enableBlurEffects: true,
    enableGlowEffects: true,
    enableInfiniteAnimations: true,
    enableScrollAnimations: true,
    particleCount: 35,
    connectionDistance: 100,
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
  if (typeof window === 'undefined') return 'high'

  // Check for reduced motion preference first
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    return 'low'
  }

  // Check if mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  // Desktop = always high performance
  if (!isMobile) {
    return 'high'
  }

  // For mobile devices, check for low-end indicators
  const cores = navigator.hardwareConcurrency || 4
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 4

  // Check for very low-end devices
  const isVeryLowEnd = (
    cores <= 2 ||
    memory <= 1 ||
    /Android [4-6]\./i.test(navigator.userAgent)
  )

  if (isVeryLowEnd) {
    return 'low'
  }

  // Check for low-end mobile patterns
  const isLowEndMobile = (
    memory <= 2 ||
    /Moto [eEgG]|LG-|Samsung Galaxy [AJ][0-3]|Redmi [4-7]|OPPO A[0-3]|Vivo Y[0-1]|Realme C[0-2]|Nokia [1-3]/i.test(navigator.userAgent)
  )

  if (isLowEndMobile) {
    return 'low'
  }

  // Modern mobile devices get medium (slightly reduced particles but all animations)
  return 'medium'
}

// Singleton state for performance mode
let globalPerformanceMode: PerformanceMode | null = null
let listeners: Set<(mode: PerformanceMode) => void> = new Set()

export function usePerformanceMode(): PerformanceConfig {
  const [mode, setMode] = useState<PerformanceMode>(() => {
    if (globalPerformanceMode) return globalPerformanceMode
    if (typeof window === 'undefined') return 'high'
    const detected = detectPerformanceMode()
    globalPerformanceMode = detected
    return detected
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

    // Log current mode for debugging
    console.log(`[Performance] Mode: ${globalPerformanceMode}`)

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange)
      listeners.delete(listener)
    }
  }, [])

  return PERFORMANCE_CONFIGS[mode]
}

// For components that need to check mode without hook
export function getPerformanceMode(): PerformanceMode {
  if (globalPerformanceMode) return globalPerformanceMode
  if (typeof window === 'undefined') return 'high'
  globalPerformanceMode = detectPerformanceMode()
  return globalPerformanceMode
}

// Utility to check if animations should be reduced
export function shouldReduceMotion(): boolean {
  return getPerformanceMode() === 'low'
}
