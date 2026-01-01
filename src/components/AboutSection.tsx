import { motion } from 'framer-motion'
import { usePerformanceMode } from '@/hooks/use-performance-mode'

export function AboutSection() {
  const config = usePerformanceMode()

  return (
    <section id="about" className="relative min-h-screen py-20 px-4">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <motion.div
          initial={config.enableScrollAnimations ? { opacity: 0, y: 20 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-foreground">About </span>
            <span className="text-primary">ONE</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Escaping digital chaos, building with purpose
          </p>
        </motion.div>

        <motion.div
          initial={config.enableScrollAnimations ? { opacity: 0 } : false}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-8"
        >
          <div className="bg-card/30 rounded-2xl border border-border/30 p-8 sm:p-10 md:p-12">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Why ONE Exists
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed cursor-text select-text">
                  We're escaping digital chaos. Instead of thousands of mediocre apps drowning in AI slop and endless options,
                  we build ONE perfect tool per category. Quality over quantity. Singularity over noise.
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />

              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Our Philosophy
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed cursor-text select-text">
                  We're open source, community-driven, and non-capitalistic. No profit-hungry tech giants here -
                  we create what we love because the purpose IS the creation. The community decides what's worth building,
                  not investors or user metrics.
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />

              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Radical Transparency
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed cursor-text select-text">
                  Every line of code, every decision, every commit - public. We're fully open source on GitHub.
                  No hidden agendas, no corporate secrecy. Just pure transparency and community-driven innovation.
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />

              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Fair Economics
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed cursor-text select-text">
                  40% of ALL revenue goes to Node owners (you), 50% to ONE care (charity helping the world),
                  10% to founders. This isn't just a company - it's a movement toward fair, community-owned technology.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: 'Open Source',
                value: '100%',
                description: 'Fully transparent code',
              },
              {
                title: 'Community',
                value: '1M',
                description: 'Total EXPL Nodes',
              },
              {
                title: 'Revenue Share',
                value: '40%',
                description: 'To Node owners',
              },
            ].map((stat) => (
              <div
                key={stat.title}
                className="stat-card text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm font-semibold text-foreground mb-1">{stat.title}</div>
                <div className="text-xs text-muted-foreground">{stat.description}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
