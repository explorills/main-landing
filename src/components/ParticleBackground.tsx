import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  baseX: number
  baseY: number
  colorIndex: number
}

const colors = [
  'oklch(0.62 0.24 295)',
  'oklch(0.55 0.20 280)',
  'oklch(0.68 0.18 310)',
]

const getColorForScrollPosition = (scrollProgress: number, colorIndex: number): string => {
  const hue = 295 + (scrollProgress * 60 - 30)
  const saturation = 0.20 + (Math.sin(scrollProgress * Math.PI * 2) * 0.08)
  const lightness = 0.58 + (colorIndex * 0.05)
  return `oklch(${lightness} ${saturation} ${hue})`
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number | undefined>(undefined)
  const scrollY = useRef(0)
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const isVisible = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Detect mobile and adjust particle count
    const isMobile = window.innerWidth < 768
    const particleCount = Math.min(
      Math.floor((canvas.width * canvas.height) / (isMobile ? 25000 : 15000)), 
      isMobile ? 50 : 100
    )

    particlesRef.current = Array.from({ length: particleCount }, (_, i) => {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      return {
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.6 + 0.3,
        color: colors[i % colors.length],
        colorIndex: i % colors.length,
      }
    })

    const handleScroll = () => {
      scrollY.current = window.scrollY
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX
      mouseY.current = e.clientY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Pause animation when page is hidden
    const handleVisibilityChange = () => {
      isVisible.current = !document.hidden
      if (isVisible.current && !animationRef.current) {
        animate()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    const animate = () => {
      if (!ctx || !canvas || !isVisible.current) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const scrollOffset = scrollY.current * 0.3
      const scrollProgress = Math.min(scrollY.current / (document.documentElement.scrollHeight - window.innerHeight), 1)

      particlesRef.current.forEach((particle) => {
        const dx = mouseX.current - particle.x
        const dy = mouseY.current - (particle.y - scrollOffset)
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150

        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 0.5
          particle.x -= (dx / distance) * force * 3
          particle.y -= (dy / distance) * force * 3
        }

        particle.x += particle.vx
        particle.y += particle.vy

        const returnForce = 0.02
        particle.x += (particle.baseX - particle.x) * returnForce
        particle.y += (particle.baseY - particle.y) * returnForce

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        const displayY = particle.y - scrollOffset

        if (displayY > -50 && displayY < canvas.height + 50) {
          const particleColor = getColorForScrollPosition(scrollProgress, particle.colorIndex)
          
          ctx.beginPath()
          ctx.arc(particle.x, displayY, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = particleColor
          ctx.globalAlpha = particle.opacity
          ctx.fill()
        }
      })

      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const displayY1 = particle.y - scrollOffset
            const displayY2 = otherParticle.y - scrollOffset

            if (displayY1 > -50 && displayY1 < canvas.height + 50 && 
                displayY2 > -50 && displayY2 < canvas.height + 50) {
              const lineColor = getColorForScrollPosition(scrollProgress, 0)
              
              ctx.beginPath()
              ctx.moveTo(particle.x, displayY1)
              ctx.lineTo(otherParticle.x, displayY2)
              ctx.strokeStyle = `${lineColor.replace(')', ` / ${0.15 * (1 - distance / 150)})`).replace('oklch(', 'oklch(')}`
              ctx.globalAlpha = 0.3 * (1 - distance / 150)
              ctx.lineWidth = 0.8
              ctx.stroke()
            }
          }
        })
      })

      ctx.globalAlpha = 1
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 pointer-events-none z-0"
      style={{ 
        opacity: 0.7, 
        width: '100vw', 
        height: '100vh',
        mixBlendMode: 'screen'
      }}
    />
  )
}

export function FloatingOrbs() {
  const orbs = [
    { size: 300, x: '10%', y: '20%', delay: 0, duration: 20 },
    { size: 400, x: '80%', y: '60%', delay: 5, duration: 25 },
    { size: 250, x: '60%', y: '10%', delay: 10, duration: 22 },
    { size: 350, x: '20%', y: '80%', delay: 15, duration: 28 },
  ]

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: 'radial-gradient(circle, oklch(0.62 0.24 295 / 0.4) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -30, 50, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export function RisingParticles() {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 15 + Math.random() * 10,
    size: 2 + Math.random() * 3,
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            bottom: '-20px',
            width: particle.size,
            height: particle.size,
            background: 'oklch(0.62 0.24 295 / 0.6)',
            boxShadow: '0 0 10px oklch(0.62 0.24 295 / 0.4)',
          }}
          animate={{
            y: ['0vh', '-110vh'],
            opacity: [0, 0.8, 0.8, 0],
            x: [0, Math.random() * 40 - 20],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

export function BottomParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number | undefined>(undefined)
  const scrollY = useRef(0)
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const isVisible = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const isMobile = window.innerWidth < 768
    const particleCount = Math.min(
      Math.floor((canvas.width * canvas.height) / (isMobile ? 25000 : 15000)), 
      isMobile ? 50 : 100
    )

    const viewportHeight = window.innerHeight
    const totalHeight = document.documentElement.scrollHeight
    const startY = totalHeight * 0.4

    particlesRef.current = Array.from({ length: particleCount }, (_, i) => {
      const x = Math.random() * canvas.width
      const y = startY + Math.random() * (totalHeight - startY)
      return {
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.6 + 0.3,
        color: colors[i % colors.length],
        colorIndex: i % colors.length,
      }
    })

    const handleScroll = () => {
      scrollY.current = window.scrollY
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX
      mouseY.current = e.clientY + scrollY.current
    }

    const handleVisibilityChange = () => {
      isVisible.current = !document.hidden
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    const animate = () => {
      if (!isVisible.current) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const scrollOffset = scrollY.current
      const scrollProgress = Math.min(scrollOffset / (document.documentElement.scrollHeight - window.innerHeight), 1)

      particlesRef.current.forEach((particle) => {
        const dx = mouseX.current - particle.x
        const dy = mouseY.current - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          particle.vx -= (dx / distance) * force * 0.3
          particle.vy -= (dy / distance) * force * 0.3
        }

        particle.x += particle.vx
        particle.y += particle.vy

        const returnForce = 0.02
        particle.x += (particle.baseX - particle.x) * returnForce
        particle.y += (particle.baseY - particle.y) * returnForce

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        const displayY = particle.y - scrollOffset

        if (displayY > -50 && displayY < window.innerHeight + 50) {
          const particleColor = getColorForScrollPosition(scrollProgress, particle.colorIndex)
          
          ctx.beginPath()
          ctx.arc(particle.x, displayY, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = particleColor
          ctx.globalAlpha = particle.opacity
          ctx.fill()
        }
      })

      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const displayY1 = particle.y - scrollOffset
            const displayY2 = otherParticle.y - scrollOffset

            if (displayY1 > -50 && displayY1 < window.innerHeight + 50 && 
                displayY2 > -50 && displayY2 < window.innerHeight + 50) {
              const lineColor = getColorForScrollPosition(scrollProgress, 0)
              
              ctx.beginPath()
              ctx.moveTo(particle.x, displayY1)
              ctx.lineTo(otherParticle.x, displayY2)
              ctx.strokeStyle = `${lineColor.replace(')', ` / ${0.15 * (1 - distance / 150)})`).replace('oklch(', 'oklch(')}`
              ctx.globalAlpha = 0.3 * (1 - distance / 150)
              ctx.lineWidth = 0.8
              ctx.stroke()
            }
          }
        })
      })

      ctx.globalAlpha = 1
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 pointer-events-none z-0"
      style={{ 
        opacity: 0.7, 
        width: '100vw', 
        height: '100vh',
        mixBlendMode: 'screen'
      }}
    />
  )
}
