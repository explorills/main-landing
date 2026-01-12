/**
 * Static starfield background - lightweight, no animations, no JavaScript event listeners.
 * Pure CSS-based stars using box-shadow for performance on low-end devices.
 */

// Generate static star shadows (computed once at module load)
const generateStarShadows = (count: number, seed: number, color: string, maxSize: number = 1): string => {
  const shadows: string[] = []
  let s = seed
  const random = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  
  for (let i = 0; i < count; i++) {
    const x = Math.floor(random() * 2000)
    const y = Math.floor(random() * 2000)
    const size = maxSize
    shadows.push(`${x}px ${y}px 0 ${size}px ${color}`)
  }
  return shadows.join(', ')
}

// Pre-computed star shadows for different layers
const tinyStarShadows = generateStarShadows(100, 1, 'rgba(255, 255, 255, 0.3)', 0)
const smallStarShadows = generateStarShadows(60, 100, 'rgba(255, 255, 255, 0.5)', 0.5)
const mediumStarShadows = generateStarShadows(25, 200, 'rgba(168, 85, 247, 0.6)', 1)
const glowStarShadows = generateStarShadows(12, 300, 'rgba(168, 85, 247, 0.8)', 1.5)

export function ParticleBackground() {
  return (
    <div 
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ backgroundColor: 'oklch(0.15 0.02 265)' }}
    >
      {/* Tiny stars layer */}
      <div
        className="absolute"
        style={{
          width: '1px',
          height: '1px',
          top: 0,
          left: 0,
          boxShadow: tinyStarShadows,
        }}
      />
      
      {/* Small stars layer */}
      <div
        className="absolute"
        style={{
          width: '1px',
          height: '1px',
          top: 0,
          left: 0,
          boxShadow: smallStarShadows,
        }}
      />
      
      {/* Medium stars layer - purple accent */}
      <div
        className="absolute"
        style={{
          width: '1px',
          height: '1px',
          top: 0,
          left: 0,
          boxShadow: mediumStarShadows,
        }}
      />
      
      {/* Glow stars - larger with soft glow effect */}
      <div
        className="absolute"
        style={{
          width: '2px',
          height: '2px',
          borderRadius: '50%',
          top: 0,
          left: 0,
          boxShadow: glowStarShadows,
          filter: 'blur(1px)',
        }}
      />
      
      {/* Subtle ambient glow spots */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          background: `
            radial-gradient(ellipse 400px 400px at 15% 25%, rgba(168, 85, 247, 0.8) 0%, transparent 70%),
            radial-gradient(ellipse 500px 500px at 85% 55%, rgba(139, 92, 246, 0.7) 0%, transparent 70%),
            radial-gradient(ellipse 350px 350px at 50% 80%, rgba(192, 132, 252, 0.6) 0%, transparent 70%)
          `,
        }}
      />
    </div>
  )
}

export function FloatingOrbs() {
  return null
}

export function RisingParticles() {
  return null
}

export function BottomParticleBackground() {
  return null
}
