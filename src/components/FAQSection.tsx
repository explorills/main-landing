import { motion } from 'framer-motion'
import { useState } from 'react'
import { CaretDown, ArrowRight } from '@phosphor-icons/react'

interface FAQItem {
  question: string
  answer: string
  links?: Array<{ text: string; url: string }>
}

const faqs: FAQItem[] = [
  {
    question: "Why does ONE exist?",
    answer: "Every product in the ONE ecosystem exists for a clear reason, serves a defined role, and is built to be stable before it is expanded. We value coherence over scale and depth over speed. If something doesn't deserve to exist, we don't build it.",
  },
  {
    question: "How does revenue work?",
    answer: "ONE rewards everyone involved, whether you're an EXPL Node owner or a ONE Creator: 45% of total ecosystem revenue goes to EXPL Node owners, 45% to ONE Creators, and 10% to the founding team. This isn't your typical company. It’s a community-driven system built to scale infinitely and generate multiple streams of passive income, completely independent of third parties in a fully decentralized environment.",
  },
  {
    question: "How transparent is ONE?",
    answer: "ONE is open source and community-governed. Contributions matter more than titles, funding, or popularity. We treat software as shared infrastructure, something to be understood, improved, and maintained collectively.",
    links: [
      { text: "View GitHub", url: "https://github.com/explorills" },
    ],
  },
]

function FAQItem({ item, index, isOpen, onToggle }: { item: FAQItem; index: number; isOpen: boolean; onToggle: () => void }) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-border/30 last:border-0"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-6 text-left group cursor-pointer"
      >
        <h3 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
          {item.question}
        </h3>
        <div className="flex-shrink-0 mt-1">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-primary"
          >
            <CaretDown size={20} weight="bold" />
          </motion.div>
        </div>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div className="pb-6 pr-12">
          <p className="text-base text-muted-foreground leading-relaxed mb-4 cursor-text select-text">
            {item.answer}
          </p>
          {item.links && item.links.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {item.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-colors duration-200 border border-primary/20 hover:border-primary/40"
                >
                  {link.text}
                  <ArrowRight size={14} weight="bold" />
                </a>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="relative py-12 px-4">
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

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-foreground">Questions? </span>
              <span className="text-primary glow-accent">Answered.</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about the EXPL Nodes and ONE ecosystem.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-card/30 backdrop-blur-sm rounded-2xl border border-border/30 p-6 sm:p-8 md:p-10"
        >
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index} 
                item={faq} 
                index={index} 
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-6">
            Still have questions? Join our community
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://discord.com/invite/RetTCVq7tJ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40"
            >
              Join Discord
              <ArrowRight size={18} weight="bold" />
            </a>
            <a
              href="https://docs.expl.one"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card/50 hover:bg-card border border-border/50 hover:border-primary/50 text-foreground font-semibold transition-all duration-200"
            >
              Read Docs
              <ArrowRight size={18} weight="bold" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
