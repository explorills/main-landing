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
    question: "What is EXPL.ONE / the ONE ecosystem?",
    answer:
      "ONE is a decentralized ecosystem made up of multiple independent projects operating under a shared infrastructure. The ecosystem is powered by EXPL Nodes, which form the backbone for distribution, participation, and on-chain operations. Everything is designed to function transparently without centralized control.",
    links: [
      { text: "Read the overview", url: "https://docs.expl.one" },
    ],
  },
  {
    question: "What are EXPL Nodes?",
    answer:
      "EXPL Nodes are ERC721 node licenses that power the ONE ecosystem. Node owners operate infrastructure, participate in distribution mechanisms, and receive ecosystem rewards. Nodes exist on Ethereum and Flare and are designed to be immutable, verifiable, and decentralized.",
    links: [
      { text: "Node documentation", url: "https://docs.expl.one/nodes/node-nft-licenses" },
      { text: "Get a node", url: "https://node.expl.one" },
    ],
  },
  {
    question: "How does revenue work?",
    answer:
      "All ecosystem revenue is distributed automatically through smart contracts. 45% goes to EXPL Node owners, 45% to ONE Creators, and 10% to the founding team. This model removes intermediaries and allows contributors and operators to earn directly from ecosystem activity.",
    links: [
      { text: "Distribution framework", url: "https://docs.expl.one/distribution-framework/introduction" },
    ],
  },
  {
    question: "What is EXPL and how is it distributed?",
    answer:
      "EXPL is the ecosystem token with a fixed maximum supply. Distribution occurs through node-based minting and direct mint mechanisms tied to ecosystem participation. Tokens are routed through non-custodial escrows and reward flows defined on-chain.",
    links: [
      { text: "Tokenomics", url: "https://docs.expl.one/tokenomics/introduction" },
    ],
  },
  {
    question: "What projects exist inside the ONE ecosystem?",
    answer:
      "The ONE ecosystem consists of multiple products and layers, including ONE pump, ONE network, and other exploration-focused initiatives. Each project serves a distinct role while sharing the same infrastructure and distribution logic.",
    links: [
      { text: "ONE pump", url: "https://pump.expl.one" },
      { text: "ONE network", url: "https://network.expl.one" },
      { text: "ONE world", url: "https://world.expl.one" },
    ],
  },
  {
    question: "How do I buy an EXPL Node?",
    answer:
      "EXPL Nodes can be purchased through the official node portal. The documentation explains the full process, supported wallets, and security considerations to ensure a safe purchase.",
    links: [
      { text: "How to purchase a node", url: "https://docs.expl.one/nodes/how-to-purchase-node" },
      { text: "Node portal", url: "https://node.expl.one" },
    ],
  },
  {
    question: "What is the node escrow?",
    answer:
      "Nodes are initially held in a non-custodial escrow contract. Once all predefined node IDs are minted, the escrow is released automatically, allowing owners to withdraw their nodes. Ownership is always verifiable on-chain.",
    links: [
      { text: "Node escrow explained", url: "https://docs.expl.one/nodes/node-escrow" },
    ],
  },
  {
    question: "Where can I find official links and community channels?",
    answer:
      "All official resources, including GitHub repositories, social channels, and support links, are maintained in a single verified location to prevent confusion and impersonation.",
    links: [
      { text: "Official links", url: "https://docs.expl.one/additional-information/official-links" },
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
