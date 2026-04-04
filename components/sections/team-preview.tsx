"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Linkedin, Twitter, Github, Cpu, Shield, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DeepTechBackground } from '@/components/ui/deep-tech-background'

const teamMembers = [
  {
    id: 1,
    name: 'Alexander Wright',
    role: 'CEO & Founder',
    specialty: 'Strategy & Growth',
    gradient: 'from-blue-600 via-indigo-600 to-cyan-500',
    social: { linkedin: '#', twitter: '#' }
  },
  {
    id: 2,
    name: 'Dr. Maya Chen',
    role: 'Chief AI Officer',
    specialty: 'Neural Architectures',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-500',
    social: { linkedin: '#', github: '#' }
  },
  {
    id: 3,
    name: 'James Mitchell',
    role: 'CTO',
    specialty: 'Scalable Engine',
    gradient: 'from-rose-600 via-pink-600 to-orange-500',
    social: { linkedin: '#', github: '#' }
  },
  {
    id: 4,
    name: 'Sofia Rodriguez',
    role: 'Head of Design',
    specialty: 'Kinetic UX / UI',
    gradient: 'from-amber-500 via-orange-500 to-amber-600',
    social: { linkedin: '#', twitter: '#' }
  },
]

export function TeamPreviewSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-28 lg:py-48 bg-[#010103] overflow-hidden" id="team">
      <DeepTechBackground />
      
      <div className="relative container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20 lg:mb-32">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="text-indigo-400 font-mono text-xs uppercase tracking-[0.4em] mb-4"
            >
              Architects
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tighter leading-none"
            >
              Human <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">Intelligence</span> Driving Progress.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button 
              asChild
              variant="outline"
              className="border-white/10 hover:bg-white/5 text-white h-14 px-8 rounded-2xl"
            >
              <Link href="/team">
                Full Member Directory
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Team Grid - Technical Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative"
            >
              <div className="bg-[#05050a]/80 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 h-full flex flex-col hover:border-indigo-500/30 transition-all duration-500 overflow-hidden">
                {/* Visual Identity Profile */}
                <div className="relative mb-10 overflow-hidden rounded-[2rem] bg-white/5 aspect-square flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-20`} />
                  <div className="relative w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
                     <span className="text-white font-bold text-4xl leading-none">
                        {member.name.split(' ').map(n => n[0]).join('')}
                     </span>
                  </div>
                  
                  {/* Skill Badge HUD */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-1.5 translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                     <div className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[8px] font-bold text-white uppercase tracking-widest">
                        Node-{member.id}
                     </div>
                     <div className="px-3 py-1 rounded-full bg-emerald-500/80 border border-white/10 text-[8px] font-bold text-white uppercase tracking-widest">
                        Active
                     </div>
                  </div>
                </div>

                {/* Member Info */}
                <div className="text-left flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                    {member.name}
                  </h3>
                  <div className="text-indigo-400 font-mono text-[10px] uppercase tracking-[0.2em] mb-4">
                    {member.role}
                  </div>
                  <div className="h-[1px] w-full bg-white/5 mb-6" />
                  <div className="flex items-center gap-3 text-white/40">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                     <span className="text-sm font-medium">{member.specialty}</span>
                  </div>
                </div>

                {/* Social Interface */}
                <div className="mt-8 flex items-center gap-4 pt-6 border-t border-white/5">
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-indigo-500 transition-all group-hover:scale-110">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a href={member.social.twitter} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-blue-400 transition-all group-hover:scale-110">
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.github && (
                    <a href={member.social.github} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-emerald-500 transition-all group-hover:scale-110">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Narrative CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-24 lg:mt-32 max-w-4xl mx-auto"
        >
          <div className="bg-[#05050a]/80 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 lg:p-16 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">Expand the Global Intelligence Base.</h3>
            <p className="text-white/40 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              We are seeking exceptional engineers, designers, and strategists to build the next generation of digital infrastructure.
            </p>
            <Button 
              asChild
              className="h-14 px-10 bg-white text-black hover:bg-white/90 font-bold rounded-2xl group transition-all"
            >
              <Link href="/careers">
                Explore Open Nodes
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
