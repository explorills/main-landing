import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Envelope, LinkedinLogo } from '@phosphor-icons/react'
import giorgioImage from '@/assets/images/giorgio-orb-orbeliani.jpg'
import likaImage from '@/assets/images/lika-biniashvili.jpeg'

interface TeamMember {
  name: string
  title: string
  role: string
  color: string
  image: string
  linkedin: string
}

const teamMembers: TeamMember[] = [
  {
    name: 'Giorgi (orb) Orbeliani',
    title: 'Creator-Engineer / Founder',
    role: 'Handles all technical development, full-stack, building everything',
    color: '#a147e1',
    image: giorgioImage,
    linkedin: 'https://www.linkedin.com/in/g-orbeliani/',
  },
  {
    name: 'Lia Biniashvili',
    title: 'Marketing & Communications Lead',
    role: 'Handles collaborations, communications, investor relations, branding, messaging',
    color: '#2563eb',
    image: likaImage,
    linkedin: 'https://www.linkedin.com/in/lika-biniashvili-liabin/',
  },
]

function TeamMemberCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className="relative group overflow-hidden cursor-default h-full">
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${member.color}15, transparent)`,
          }}
        />
        
        <div className="relative z-10 p-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
            className="mb-6"
          >
            <div className="relative w-32 h-32 mx-auto">
              <motion.div
                className="absolute inset-0 rounded-full blur-2xl opacity-40"
                style={{ backgroundColor: member.color }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div 
                className="relative w-full h-full rounded-full border-4 overflow-hidden backdrop-blur-sm bg-card/40 group-hover:scale-105 transition-transform duration-300"
                style={{ borderColor: member.color }}
              >
                <img 
                  src={member.image} 
                  alt={`${member.name} - ${member.title} at EXPL.ONE`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width="128"
                  height="128"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
            className="text-center space-y-4"
          >
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-foreground">
                {member.name}
              </h3>
              <h4 
                className="text-lg font-semibold"
                style={{ color: member.color }}
              >
                {member.title}
              </h4>
              <div className="h-1 w-16 mx-auto rounded-full" style={{ backgroundColor: member.color }} />
            </div>

            <p className="text-base text-muted-foreground leading-relaxed">
              {member.role}
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.2 + 0.5 }}
              className="pt-2"
            >
              <motion.a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 hover:border-[#0077b5] bg-card/30 hover:bg-[#0077b5]/10 transition-all duration-300 group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <LinkedinLogo 
                  size={20} 
                  weight="fill" 
                  className="text-muted-foreground group-hover:text-[#0077b5] transition-colors duration-300" 
                />
                <span className="text-sm font-medium text-muted-foreground group-hover:text-[#0077b5] transition-colors duration-300">
                  LinkedIn
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 origin-left"
          style={{ backgroundColor: member.color }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
        />
      </Card>
    </motion.div>
  )
}

export function TeamSection() {
  return (
    <section className="relative min-h-screen py-20 px-4">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.03 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, transparent 0%, transparent 40%, oklch(0.62 0.24 295 / 0.1) 100%)`
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            <span className="text-foreground">Meet the </span>
            <span className="text-primary glow-accent">Team</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            The minds behind the ONE ecosystem, building the future one project at a time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.title} member={member} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <Card className="relative overflow-hidden group">
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, oklch(0.62 0.24 295 / 0.1), transparent)`,
              }}
            />
            
            <div className="relative z-10 p-8 sm:p-12 text-center space-y-6">
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4"
              >
                <Envelope size={32} weight="duotone" className="text-primary" />
              </motion.div>

              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Want to Contribute?
              </h3>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                We're not currently hiring, <span className="text-foreground font-semibold">BUT</span> if you believe in our vision and want to volunteer/contribute (technical or non-technical), reach us at:
              </p>

              <motion.a
                href="mailto:team@expl.one"
                className="inline-flex items-center gap-2 text-xl sm:text-2xl font-semibold text-primary hover:text-primary/80 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>team@expl.one</span>
                <motion.span
                  animate={{
                    x: [0, 4, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  →
                </motion.span>
              </motion.a>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
