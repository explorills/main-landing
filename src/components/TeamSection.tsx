import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LinkedinLogo, UserPlus } from '@phosphor-icons/react'
import { ProfileSubmissionModal } from '@/components/ProfileSubmissionModal'
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
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="relative py-5 md:py-12 px-4">
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
          className="text-center mb-6 space-y-4"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            <span className="text-foreground">Meet the </span>
            <span className="text-primary glow-accent">Team</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            The minds behind the ONE ecosystem, building the foundation of next-gen decentralized internet for everyone
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
          <Card id="contribute" className="relative overflow-hidden group scroll-mt-35">
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
                <UserPlus size={32} weight="duotone" className="text-primary" />
              </motion.div>

              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Interested in being part of what we're building?
              </h3>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                We're not hiring at the moment <span className="text-foreground font-semibold">BUT</span> feel free to register your profile in our database and we will review it <span className="whitespace-nowrap">(technical or non-technical)</span>, whether you share our vision and want to contribute right away, or if you'd like us to consider your profile once recruitment opens.
              </p>

              <Button
                onClick={() => setIsModalOpen(true)}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full font-semibold transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40"
              >
                <span>Submit Your Profile</span>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      <ProfileSubmissionModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </section>
  )
}
