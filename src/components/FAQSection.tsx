import { motion } from 'framer-motion'
import { useState } from 'react'
import { CaretDown } from '@phosphor-icons/react'

interface FAQItem {
  question: string
  answer: string
  links?: Array<{ text: string; url: string }>
}

const faqs: FAQItem[] = [
  {
    question: "Why does ONE exist?",
    answer: "We're escaping digital chaos. Instead of thousands of mediocre apps drowning in AI slop and endless options, we build ONE perfect tool per category. Quality over quantity. Singularity over noise.",
  },
  {
    question: "How is ONE different?",
    answer: "We're open source, community-driven, and non-capitalistic. No profit-hungry tech giants here - we create what we love because the purpose IS the creation. The community decides what's worth building, not investors or user metrics.",
  },
  {
    question: "What's an EXPL Node?",
    answer: "Your stake in the entire ecosystem. One Node = shareholder status in ALL 10 projects. It's the backbone of our economy, decentralization, and governance. Plus, you earn 171 EXPL daily for 731 days (125,000 EXPL total per Node).",
    links: [
      { text: "Tokenomics", url: "https://docs.explorills.com/tokenomics/supply/" },
    ],
  },
  {
    question: "What do Node owners get?",
    answer: "40% of ALL revenue from every project. Not one app - the entire ecosystem. You're not just a user, you're a co-owner earning from pump, network, world, and everything we build.",
  },
  {
    question: "How does revenue work?",
    answer: "Simple: 40% to Node owners (you), 50% to ONE care (charity helping the world), 10% to founders. Fair economics powered by Web3 and AI for independence and efficiency.",
  },
  {
    question: "How many Nodes exist?",
    answer: "1 million total across three batches: 12k (first), 88k (second), 900k (third). Get in early or miss your chance at ecosystem ownership.",
  },
  {
    question: "How transparent is ONE?",
    answer: "Fully open source on GitHub. Every line of code, every decision, every commit - public. No hidden agendas, no corporate secrecy. Just pure transparency.",
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
                  <span className="text-xs">→</span>
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
    <section className="relative min-h-screen py-20 px-4">
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
          className="text-center mb-16"
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
              Everything you need to know about the ONE ecosystem and EXPL Nodes
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
              <span>→</span>
            </a>
            <a
              href="https://docs.expl.one"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card/50 hover:bg-card border border-border/50 hover:border-primary/50 text-foreground font-semibold transition-all duration-200"
            >
              Read Docs
              <span>→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
