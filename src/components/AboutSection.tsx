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
          className="text-center mb-6"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-foreground">About </span>
            <span className="text-primary glow-accent">ONE</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Building with Purpose.
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
            >
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed cursor-text select-text text-center">
                We're escaping digital chaos-thousands of 
                mediocre apps drowning in AI slop, bots, spam, and endless 
              options, building <span className="whitespace-nowrap">HUMAN-VERIFIABLE</span>, <span className="whitespace-nowrap">HUMAN-TRANSPARENT</span>, 
              <span className="whitespace-nowrap"> HUMAN-SHAPED</span> one perfect ecosystem, with its own singular economic model 
                <span className="text-primary whitespace-nowrap"> Powered by EXPL Nodes</span>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
