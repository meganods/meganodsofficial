"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider'
import { Button } from '@/components/ui/button'
import { DeepTechBackground } from '@/components/ui/deep-tech-background'
import { ArrowRight, Linkedin, Twitter, Github, Mail, Shield, Zap, Target, Layers, Globe, Cpu, Users } from 'lucide-react'

const leadership = [
  {
    id: 1,
    name: 'Alexander Wright',
    role: 'CEO & Founder',
    bio: 'Visionary leader with 20+ years in tech innovation. Former VP at strategic global labs.',
    avatar: 'AW',
    gradient: 'from-indigo-600 via-blue-600 to-cyan-500',
    meta: "Strategic Node 01",
    social: { linkedin: '#', twitter: '#', email: 'alex@nexatech.com' }
  },
  {
    id: 2,
    name: 'Dr. Maya Chen',
    role: 'Chief AI Officer',
    bio: 'PhD in Machine Learning from MIT. Published 50+ papers on autonomous neural networks.',
    avatar: 'MC',
    gradient: 'from-rose-600 via-pink-600 to-orange-500',
    meta: "Neural Core V3",
    social: { linkedin: '#', twitter: '#', github: '#' }
  },
  {
    id: 3,
    name: 'James Mitchell',
    role: 'Chief Technology Officer',
    bio: 'Engineering leader with 15+ years experience. Previously led infrastructure at major cloud hubs.',
    avatar: 'JM',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-500',
    meta: "Arch Node X",
    social: { linkedin: '#', github: '#' }
  },
  {
    id: 4,
    name: 'Sofia Rodriguez',
    role: 'Chief Design Officer',
    bio: 'Award-winning designer creating intuitive digital systems. Expert in human-machine interface.',
    avatar: 'SR',
    gradient: 'from-amber-500 via-orange-500 to-amber-600',
    meta: "Interface Proto",
    social: { linkedin: '#', twitter: '#' }
  },
]

const teamMembers = [
  { id: 5, name: 'David Kim', role: 'VP Engineering', avatar: 'DK', gradient: 'from-indigo-600 to-cyan-500', meta: "Ops Eng" },
  { id: 6, name: 'Emma Thompson', role: 'VP Sales', avatar: 'ET', gradient: 'from-rose-600 to-orange-500', meta: "Market Node" },
  { id: 7, name: 'Michael Brown', role: 'Data Scientist', avatar: 'MB', gradient: 'from-emerald-600 to-teal-500', meta: "Logic" },
  { id: 8, name: 'Sarah Lee', role: 'Head Product', avatar: 'SL', gradient: 'from-cyan-600 to-blue-500', meta: "Product V1" },
]

const departments = [
  { name: 'Engineering', count: 85, icon: Cpu },
  { name: 'Data Science', count: 35, icon: Target },
  { name: 'Design', count: 20, icon: Layers },
  { name: 'Sales', count: 30, icon: Zap },
  { name: 'Operations', count: 25, icon: Shield },
  { name: 'Network Support', count: 15, icon: Globe },
]

export default function TeamPage() {
  return (
    <SmoothScrollProvider>
      <Navigation />
      <main className="min-h-screen bg-[#010103] text-white">
        <div className="fixed inset-0 pointer-events-none z-0">
           <DeepTechBackground />
        </div>

        {/* Hero Section - Operational Nodes */}
        <section className="relative pt-32 lg:pt-48 pb-20 z-10 text-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-12"
            >
               <Users className="w-3 h-3" />
               Base Command Station
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-7xl lg:text-[10rem] font-bold mb-12 tracking-tighter leading-[0.85]"
            >
              Operational <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">Intelligence</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl lg:text-3xl text-white/40 max-w-6xl mx-auto mb-16 leading-relaxed font-medium"
            >
              A collective of the world's most disciplined engineers, designers, and neural architects—united by the mission to optimize human potential through code.
            </motion.p>
        </section>

        {/* Tactical Impact grid (Stats) */}
        <section className="py-24 lg:py-32 relative z-10">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5 rounded-[3rem] overflow-hidden border border-white/5">
              {departments.map((dept, index) => (
                <div key={dept.name} className="bg-[#05050a] p-10 group hover:bg-white/5 transition-all duration-300 relative text-center">
                   <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                      <dept.icon className="w-6 h-6" />
                   </div>
                   <div className="text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tighter">{dept.count}+</div>
                   <div className="text-white/30 text-xs font-mono uppercase tracking-widest">{dept.name}</div>
                   <div className="absolute bottom-0 left-0 w-full h-[1px] bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Leadership Nodes */}
        <section className="py-32 lg:py-56 relative z-10">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-32">
               <span className="text-indigo-400 font-mono text-xs uppercase tracking-[0.4em] mb-6 block">Command Hub</span>
               <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
                  Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400 text-glow">Directors</span>.
               </h2>
               <p className="text-white/40 text-xl lg:text-2xl font-medium leading-relaxed">
                  The primary architects responsible for our global operational blueprint and ethical intelligence standards.
               </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {leadership.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="bg-[#05050a]/60 backdrop-blur-xl border border-white/5 rounded-[3rem] p-8 h-full flex flex-col hover:border-indigo-500/30 transition-all duration-500 overflow-hidden relative">
                    <div className={`absolute -inset-1 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-10 transition-opacity blur-2xl`} />
                    
                    <div className="relative mb-8 rounded-[2.5rem] overflow-hidden aspect-square">
                       <div className={`w-full h-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-6xl font-bold text-white tracking-widest`}>
                          {member.avatar}
                       </div>
                       
                       {/* Social HUD Overlay */}
                       <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                          {member.social.linkedin && (
                            <a href={member.social.linkedin} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-indigo-500 transition-all">
                               <Linkedin className="w-5 h-5" />
                            </a>
                          )}
                          {member.social.twitter && (
                            <a href={member.social.twitter} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-blue-500 transition-all">
                               <Twitter className="w-5 h-5" />
                            </a>
                          )}
                          {member.social.github && (
                            <a href={member.social.github} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-emerald-500 transition-all">
                               <Github className="w-5 h-5" />
                            </a>
                          )}
                       </div>
                    </div>

                    <div className="text-indigo-400 font-mono text-[10px] uppercase tracking-widest mb-3 opacity-50 relative z-10">[ {member.meta} ]</div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors relative z-10">{member.name}</h3>
                    <div className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 relative z-10">{member.role}</div>
                    <p className="text-white/30 text-sm leading-relaxed font-medium relative z-10 group-hover:text-white/50 transition-colors">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Operational Staff grid */}
        <section className="py-24 lg:py-56 relative z-10 bg-[#05050a]/40 backdrop-blur-3xl border-y border-white/5">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-20 text-balance">
               <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Key Node <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Collaborators</span>.</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <div className="bg-[#010103]/60 border border-white/5 rounded-[2rem] p-8 text-center hover:border-indigo-500/30 transition-all">
                    <div className={`w-24 h-24 mx-auto rounded-[1.5rem] bg-gradient-to-br ${member.gradient} flex items-center justify-center text-3xl font-bold text-white mb-6 group-hover:scale-110 transition-transform`}>
                      {member.avatar}
                    </div>
                    <div className="text-indigo-400/50 font-mono text-[9px] uppercase tracking-widest mb-2">[ {member.meta} ]</div>
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-white/30 text-xs font-bold uppercase tracking-widest">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Operational Culture Hub */}
        <section className="py-32 lg:py-56 relative z-10 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-24 lg:gap-40 items-center">
              <div>
                <span className="text-indigo-400 font-mono text-xs uppercase tracking-[0.4em] mb-6 block">Foundation</span>
                <h2 className="text-5xl md:text-7xl font-bold mb-10 tracking-tighter leading-[0.85]">
                  Where Innovation <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">Accelerates</span>.
                </h2>
                <p className="text-white/40 text-xl lg:text-2xl font-medium leading-relaxed mb-16">
                   NexaTech is a decentralized, remote-first operational unit that prioritizes high-fidelity output and recursive learning.
                </p>
                <div className="space-y-10">
                  {[
                    { title: 'Global Node Protocol', description: 'Complete operational autonomy from any location with an active uplink.' },
                    { title: 'Recursive Learning', description: '$5,000 annual deployment for technical mastery and skill expansion.' },
                    { title: 'Infinite Uptime', description: 'Flexible operational cycles and unlimited recovery windows (PTO).' },
                  ].map((perk, index) => (
                    <motion.div
                      key={perk.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-6"
                    >
                      <div className="w-2 h-12 bg-gradient-to-b from-indigo-500 to-transparent mt-1" />
                      <div>
                        <h4 className="text-xl font-bold text-white mb-2">{perk.title}</h4>
                        <p className="text-white/30 text-sm font-medium leading-relaxed">{perk.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Dynamic Culture Panel */}
              <div className="bg-[#05050a]/60 border border-white/10 rounded-[4rem] p-12 lg:p-20 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-emerald-500/5" />
                 <div className="relative grid grid-cols-2 gap-10">
                    {[
                      { value: '200+', label: 'Managed Nodes' },
                      { value: '25+', label: 'Sectors' },
                      { value: '4.9', label: 'Satisfaction' },
                      { value: '92%', label: 'Stability' },
                    ].map((stat, index) => (
                      <div key={stat.label} className="text-left">
                        <div className="text-5xl lg:text-7xl font-bold text-white tracking-tighter mb-2 group-hover:text-indigo-400 transition-colors">
                          {stat.value}
                        </div>
                        <div className="text-white/30 text-[10px] font-mono uppercase tracking-widest">{stat.label}</div>
                      </div>
                    ))}
                 </div>
                 
                 {/* Visual HUD Element */}
                 <div className="mt-20 pt-10 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
                       <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest">Protocol Stable</span>
                    </div>
                    <Cpu className="w-10 h-10 text-white/5 group-hover:text-indigo-500/20 transition-colors" />
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join the Mesh CTA */}
        <section className="py-32 lg:py-56 relative z-10 px-6">
           <div className="container mx-auto max-w-5xl">
              <div className="relative rounded-[3rem] lg:rounded-[4rem] border border-white/10 bg-[#05050a]/40 backdrop-blur-3xl overflow-hidden p-1">
                 <div className="relative px-8 py-24 lg:px-24 lg:py-32 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-blue-500/10 pointer-events-none" />
                    <Target className="w-16 h-16 text-indigo-400/20 mx-auto mb-10" />
                    
                    <h2 className="text-4xl md:text-7xl lg:text-[7rem] font-bold text-white mb-10 tracking-tighter leading-[0.85]">
                       Establish Your <br />
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">Node Hub</span>.
                    </h2>
                    <p className="text-white/40 text-xl lg:text-3xl mb-16 max-w-3xl mx-auto font-medium leading-relaxed">
                       We are actively looking for elite operational units to join our global network of intelligence architects.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                       <Button 
                          asChild
                          className="h-20 px-12 bg-white text-black hover:bg-white/90 font-bold rounded-3xl shadow-2xl transition-all text-xl group"
                       >
                          <Link href="/careers">
                             View Operational Openings
                             <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                          </Link>
                       </Button>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
