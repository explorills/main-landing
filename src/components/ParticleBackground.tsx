import { useEffect, useRef, useMemo } from 'react'
import { usePerformanceMode } from '@/hooks/use-performance-mode'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  baseX: number
  baseY: number
}

// Pre-computed colors for performance (avoid runtime color calculations)
const PARTICLE_COLORS = [
  'rgba(161, 71, 225, 0.8)',   // Primary purple
  'rgba(140, 60, 200, 0.7)',   // Darker purple
  'rgba(180, 90, 240, 0.6)',   // Lighter purple
]

const LINE_COLOR = 'rgba(161, 71, 225, 0.15)'

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number | undefined>(undefined)
  const lastFrameTimeRef = useRef<number>(0)
  const isVisibleRef = useRef(true)
  const config = usePerformanceMode()

  // Don't render anything if particles are disabled
  if (!config.enableParticles) {
    return null
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true, // Allow async rendering for better performance
    })
    if (!ctx) return

    // Use integer dimensions for better performance
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio, 2) // Cap at 2x for performance
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }

    resizeCanvas()

    // Debounced resize handler
    let resizeTimeout: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 150)
    }
    window.addEventListener('resize', handleResize, { passive: true })

    // Initialize particles with fewer, simpler calculations
    const particleCount = config.particleCount
    const width = window.innerWidth
    const height = window.innerHeight

    particlesRef.current = Array.from({ length: particleCount }, (_, i) => {
      const x = Math.random() * width
      const y = Math.random() * height
      return {
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.4 + 0.3,
      }
    })

    // Visibility change handling
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden
      if (isVisibleRef.current && !animationRef.current) {
        lastFrameTimeRef.current = performance.now()
        animate(performance.now())
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Frame interval based on target FPS
    const frameInterval = 1000 / config.targetFPS

    const animate = (currentTime: number) => {
      if (!ctx || !canvas || !isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      // FPS throttling
      const elapsed = currentTime - lastFrameTimeRef.current
      if (elapsed < frameInterval) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      lastFrameTimeRef.current = currentTime - (elapsed % frameInterval)

      const displayWidth = window.innerWidth
      const displayHeight = window.innerHeight

      // Clear canvas
      ctx.clearRect(0, 0, displayWidth, displayHeight)

      const particles = particlesRef.current
      const connectionDistance = config.connectionDistance
      const connectionDistanceSq = connectionDistance * connectionDistance

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i]

        // Simple physics update
        particle.x += particle.vx
        particle.y += particle.vy

        // Return to base position (gentle spring)
        particle.x += (particle.baseX - particle.x) * 0.01
        particle.y += (particle.baseY - particle.y) * 0.01

        // Boundary bouncing
        if (particle.x < 0 || particle.x > displayWidth) {
          particle.vx *= -1
          particle.x = Math.max(0, Math.min(displayWidth, particle.x))
        }
        if (particle.y < 0 || particle.y > displayHeight) {
          particle.vy *= -1
          particle.y = Math.max(0, Math.min(displayHeight, particle.y))
        }

        // Draw particle (use integer coordinates for faster rendering)
        ctx.beginPath()
        ctx.arc(particle.x | 0, particle.y | 0, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = PARTICLE_COLORS[i % PARTICLE_COLORS.length]
        ctx.globalAlpha = particle.opacity
        ctx.fill()
      }

      // Draw connections (optimized: use spatial hashing or limit checks)
      if (connectionDistance > 0) {
        ctx.strokeStyle = LINE_COLOR
        ctx.lineWidth = 0.5
        ctx.globalAlpha = 0.3

        // Only check nearby particles (simple optimization)
        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i]
          // Limit connections per particle for performance
          let connections = 0
          const maxConnections = 3

          for (let j = i + 1; j < particles.length && connections < maxConnections; j++) {
            const p2 = particles[j]
            const dx = p1.x - p2.x
            const dy = p1.y - p2.y
            const distSq = dx * dx + dy * dy

            if (distSq < connectionDistanceSq) {
              const opacity = 1 - distSq / connectionDistanceSq
              ctx.globalAlpha = opacity * 0.2
              ctx.beginPath()
              ctx.moveTo(p1.x | 0, p1.y | 0)
              ctx.lineTo(p2.x | 0, p2.y | 0)
              ctx.stroke()
              connections++
            }
          }
        }
      }

      ctx.globalAlpha = 1
      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    lastFrameTimeRef.current = performance.now()
    animate(performance.now())

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearTimeout(resizeTimeout)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [config.particleCount, config.connectionDistance, config.targetFPS])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        opacity: 0.6,
        zIndex: 0,
        willChange: 'auto', // Don't hint GPU when not needed
      }}
      aria-hidden="true"
    />
  )
}

// Simplified floating orbs - CSS only, no JS animation loops
export function FloatingOrbs() {
  const config = usePerformanceMode()

  if (!config.enableFloatingOrbs) {
    return null
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
      <div
        className="floating-orb floating-orb-1"
        style={{
          width: 250,
          height: 250,
          left: '10%',
          top: '20%',
        }}
      />
      <div
        className="floating-orb floating-orb-2"
        style={{
          width: 300,
          height: 300,
          left: '75%',
          top: '55%',
        }}
      />
    </div>
  )
}

// Simplified rising particles - CSS only
export function RisingParticles() {
  const config = usePerformanceMode()

  if (!config.enableRisingParticles) {
    return null
  }

  // Pre-generate particle positions
  const particles = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 10 + (i * 12),
      delay: i * 1.5,
      duration: 12 + (i % 3) * 4,
      size: 2 + (i % 2),
    })),
  [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="rising-particle"
          style={{
            left: `${particle.x}%`,
            width: particle.size,
            height: particle.size,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

// Second canvas removed - one is enough and less impactful
export function BottomParticleBackground() {
  // Completely disabled - the main ParticleBackground is sufficient
  return null
}
