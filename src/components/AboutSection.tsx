import { motion } from 'framer-motion'

export function AboutSection() {
  return (
    <section id="about" className="relative py-12 px-4">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.02 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-radial-gradient(circle at center, transparent 0, transparent 2px, oklch(0.62 0.24 295 / 0.05) 2px, transparent 3px)`,
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-foreground">About </span>
            <span className="text-primary glow-accent">ONE</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Escaping digital chaos, building with purpose
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <div className="bg-card/30 backdrop-blur-sm rounded-2xl border border-border/30 p-8 sm:p-10 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
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
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
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
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6 rounded-lg border border-border/30 backdrop-blur-sm bg-card/20 text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm font-semibold text-foreground mb-1">{stat.title}</div>
                  <div className="text-xs text-muted-foreground">{stat.description}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
