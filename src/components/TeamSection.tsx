import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Envelope, LinkedinLogo } from '@phosphor-icons/react'
import { usePerformanceMode } from '@/hooks/use-performance-mode'
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
    role: 'Leads platform architecture and full-stack development, building and integrating all core systems end-to-end.',
    color: '#a147e1',
    image: giorgioImage,
    linkedin: 'https://www.linkedin.com/in/g-orbeliani/',
  },
  {
    name: 'Lia Biniashvili',
    title: 'Marketing & Communications Lead',
    role: 'Directs marketing strategy, communications, partnerships, investor relations, and brand messaging across all channels.',
    color: '#2563eb',
    image: likaImage,
    linkedin: 'https://www.linkedin.com/in/lika-biniashvili-liabin/',
  },
]

function TeamMemberCard({ member, index, enableAnimation }: { member: TeamMember; index: number; enableAnimation: boolean }) {
  return (
    <motion.div
      initial={enableAnimation ? { opacity: 0, y: 30 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
    >
      <Card className="relative group overflow-hidden cursor-default h-full">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, ${member.color}15, transparent)`,
          }}
        />

        <div className="relative z-10 p-8">
          <div className="mb-6">
            <div className="relative w-32 h-32 mx-auto">
              <div
                className="absolute inset-0 rounded-full opacity-30"
                style={{ backgroundColor: member.color, filter: 'blur(16px)' }}
              />
              <div
                className="relative w-full h-full rounded-full border-4 overflow-hidden bg-card/40 group-hover:scale-105 transition-transform duration-300"
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
          </div>

          <div className="text-center space-y-4">
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

            <div className="pt-2">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 hover:border-[#0077b5] bg-card/30 hover:bg-[#0077b5]/10 transition-all duration-200 group/link cursor-pointer"
              >
                <LinkedinLogo
                  size={20}
                  weight="fill"
                  className="text-muted-foreground group-hover/link:text-[#0077b5] transition-colors duration-200"
                />
                <span className="text-sm font-medium text-muted-foreground group-hover/link:text-[#0077b5] transition-colors duration-200">
                  LinkedIn
                </span>
              </a>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
          style={{ backgroundColor: member.color }}
        />
      </Card>
    </motion.div>
  )
}

export function TeamSection() {
  const config = usePerformanceMode()

  return (
    <section className="relative min-h-screen py-20 px-4">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <motion.div
          initial={config.enableScrollAnimations ? { opacity: 0, y: 20 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            <span className="text-foreground">Meet the </span>
            <span className="text-primary">Team</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            The minds behind the ONE ecosystem, building the foundation of next-gen decentralized internet for everyone
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={member.title}
              member={member}
              index={index}
              enableAnimation={config.enableScrollAnimations}
            />
          ))}
        </div>

        <motion.div
          initial={config.enableScrollAnimations ? { opacity: 0, y: 20 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          <Card className="relative overflow-hidden group">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, oklch(0.62 0.24 295 / 0.1), transparent)`,
              }}
            />

            <div className="relative z-10 p-8 sm:p-12 text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Envelope size={32} weight="duotone" className="text-primary" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Interested in being part of what we're building?
              </h3>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                We're not hiring at the moment <span className="text-foreground font-semibold">BUT</span> if you share our vision and would like to volunteer/contribute (technical or non-technical) contact us at:
              </p>

              <a
                href="mailto:team@expl.one"
                className="inline-flex items-center gap-2 text-xl sm:text-2xl font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
              >
                <span>team@expl.one</span>
                <span>→</span>
              </a>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
