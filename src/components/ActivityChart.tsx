import { motion } from 'framer-motion'

interface ActivityChartProps {
  isActive: boolean
  color: string
}

export function ActivityChart({ isActive, color }: ActivityChartProps) {
  const bars = Array.from({ length: 7 }, (_, i) => {
    const height = Math.random() * 60 + 20
    return height
  })

  return (
    <div className="flex items-end gap-[2px] h-8">
      {bars.map((height, index) => (
        <motion.div
          key={index}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: `${height}%`, opacity: isActive ? 0.8 : 0.3 }}
          transition={{
            duration: 0.6,
            delay: index * 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="w-1 rounded-t-sm"
          style={{
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  )
}
