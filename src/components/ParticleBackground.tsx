/**
 * Static starfield background - lightweight, no animations, no JavaScript event listeners.
 * Pure CSS-based stars and glow effects for performance on low-end devices.
 */

// Generate static star positions (computed once at module load)
const generateStars = (count: number, seed: number = 1): string => {
  const stars: string[] = []
  let s = seed
  const random = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  
  for (let i = 0; i < count; i++) {
    const x = random() * 100
    const y = random() * 100
    stars.push(`${x}% ${y}%`)
  }
  return stars.join(', ')
}

// Pre-computed star positions for different layers
const tinyStars = generateStars(80, 1)
const smallStars = generateStars(40, 100)
const mediumStars = generateStars(15, 200)
const glowStars = generateStars(8, 300)

export function ParticleBackground() {
  return (
    <div 
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ backgroundColor: 'oklch(0.15 0.02 265)' }}
    >
      {/* Tiny stars layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(1px 1px at ${tinyStars}, oklch(0.98 0 0 / 0.15) 50%, transparent 100%)`,
          backgroundSize: '100% 100%',
        }}
      />
      
      {/* Small stars layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(1.5px 1.5px at ${smallStars}, oklch(0.98 0 0 / 0.25) 50%, transparent 100%)`,
          backgroundSize: '100% 100%',
        }}
      />
      
      {/* Medium stars layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(2px 2px at ${mediumStars}, oklch(0.62 0.24 295 / 0.4) 30%, transparent 100%)`,
          backgroundSize: '100% 100%',
        }}
      />
      
      {/* Glow stars - larger with soft glow effect */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(4px 4px at ${glowStars}, oklch(0.62 0.24 295 / 0.5) 0%, oklch(0.62 0.24 295 / 0.1) 50%, transparent 100%)`,
          backgroundSize: '100% 100%',
        }}
      />
      
      {/* Subtle ambient glow spots */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 300px 300px at 15% 20%, oklch(0.62 0.24 295) 0%, transparent 70%),
            radial-gradient(ellipse 400px 400px at 85% 60%, oklch(0.55 0.20 280) 0%, transparent 70%),
            radial-gradient(ellipse 250px 250px at 60% 85%, oklch(0.68 0.18 310) 0%, transparent 70%)
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
