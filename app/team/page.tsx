"use client"

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider'
import { Button } from '@/components/ui/button'
import { DeepTechBackground } from '@/components/ui/deep-tech-background'
import { 
  ArrowRight, 
  Linkedin, 
  Twitter, 
  Github, 
  Mail, 
  Shield, 
  Zap, 
  Target, 
  Layers, 
  Globe, 
  Cpu, 
  Users,
  Loader2,
  Database
} from 'lucide-react'
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const departments = [
  { name: 'Engineering', count: 85, icon: Cpu },
  { name: 'Data Science', count: 35, icon: Target },
  { name: 'Design', count: 20, icon: Layers },
  { name: 'Sales', count: 30, icon: Zap },
  { name: 'Operations', count: 25, icon: Shield },
  { name: 'Network Support', count: 15, icon: Globe },
]

export default function TeamPage() {
  const [leadership, setLeadership] = useState<any[]>([])
  const [teamMembers, setTeamMembers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const q = query(collection(db, "team"), orderBy("order", "asc"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as any[];
        
        setLeadership(docs.filter(t => t.isLeader));
        setTeamMembers(docs.filter(t => !t.isLeader));
      } catch (error) {
        console.error("TEAM_FETCH_ERROR:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTeam();
  }, [])

  return (
    <SmoothScrollProvider>
      <Navigation />
      <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 transition-colors duration-500">
        <div className="fixed inset-0 pointer-events-none z-0">
           <DeepTechBackground />
        </div>

        {/* Hero Section - Operational Nodes */}
        <section className="relative pt-32 lg:pt-48 pb-20 z-10 text-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-secondary border border-border text-indigo-600 dark:text-indigo-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-12 shadow-md dark:shadow-none"
            >
               <Users className="w-4 h-4" />
               Base Command Station
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-7xl lg:text-[10rem] font-bold mb-12 tracking-tighter leading-[0.85] uppercase"
            >
              Operational <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-400 dark:from-indigo-400 dark:to-emerald-400">Intelligence</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl lg:text-3xl text-muted-foreground max-w-6xl mx-auto mb-16 leading-relaxed font-bold"
            >
              A collective of the world's most disciplined engineers, designers, and neural architects—united by the mission to optimize human potential through code.
            </motion.p>
        </section>

        {/* Tactical Impact grid (Stats) */}
        <section className="py-24 lg:py-32 relative z-10">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border rounded-[3rem] overflow-hidden border border-border shadow-md dark:shadow-none">
              {departments.map((dept, index) => (
                <div key={dept.name} className="bg-card p-10 group hover:bg-secondary/40 transition-all duration-300 relative text-center">
                   <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary border border-border text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform shadow-inner">
                      <dept.icon className="w-6 h-6" />
                   </div>
                   <div className="text-3xl lg:text-4xl font-black text-foreground mb-2 tracking-tighter uppercase">{dept.count}+</div>
                   <div className="text-muted-foreground/75 text-[9px] font-mono uppercase tracking-widest font-bold">{dept.name}</div>
                   <div className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Leadership Nodes */}
        <section className="py-32 lg:py-56 relative z-10">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-32">
               <span className="text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-[0.4em] mb-6 block font-bold">Command Hub</span>
               <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-none text-foreground">
                  Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-indigo-400 dark:to-blue-400">Directors</span>.
               </h2>
               <p className="text-muted-foreground text-xl lg:text-2xl font-medium leading-relaxed">
                  The primary architects responsible for our global operational blueprint and ethical intelligence standards.
               </p>
            </div>

            {isLoading ? (
               <div className="flex flex-col items-center justify-center py-40 gap-8">
                  <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
                  <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.5em] animate-pulse">Resolving Personnel Mesh...</p>
               </div>
            ) : leadership.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-40 gap-8 border border-dashed border-border rounded-[3rem]">
                  <Database className="w-16 h-16 text-muted-foreground/20" />
                  <p className="text-lg text-muted-foreground/45 font-medium font-mono uppercase tracking-widest">Leadership Registry Empty</p>
               </div>
            ) : (
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
                    <Link href={`/team/${member.id}`} className="block h-full">
                      <div className="bg-card/60 backdrop-blur-3xl border border-border rounded-[3.5rem] p-10 h-full flex flex-col hover:border-indigo-500/30 transition-all duration-500 overflow-hidden relative shadow-sm dark:shadow-none cursor-pointer">
                        <div className={`absolute -inset-1 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-10 transition-opacity blur-2xl pointer-events-none`} />
                        
                        <div className="relative mb-8 rounded-[2.5rem] overflow-hidden aspect-square border border-border shadow-md bg-secondary">
                           <img src={member.avatarUrl || `https://i.pravatar.cc/400?${member.name?.toLowerCase().includes('virat') ? 'img=11' : `u=${encodeURIComponent(member.name)}`}`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={member.name} />
                           
                           {/* Social HUD Overlay */}
                           <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-8 group-hover:translate-y-0" onClick={(e) => e.preventDefault()}>
                              {member.social?.linkedin && (
                                <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(member.social.linkedin, '_blank'); }} className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-indigo-500 hover:scale-110 transition-all shadow-xl cursor-pointer">
                                   <Linkedin className="w-6 h-6" />
                                </span>
                              )}
                              {member.social?.twitter && (
                                <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(member.social.twitter, '_blank'); }} className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-blue-500 hover:scale-110 transition-all shadow-xl cursor-pointer">
                                   <Twitter className="w-6 h-6" />
                                </span>
                              )}
                              {member.social?.github && (
                                <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(member.social.github, '_blank'); }} className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-black hover:scale-110 transition-all shadow-xl cursor-pointer">
                                   <Github className="w-6 h-6" />
                                </span>
                              )}
                              {member.social?.email && (
                                <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = `mailto:${member.social.email}`; }} className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-rose-500 hover:scale-110 transition-all shadow-xl cursor-pointer">
                                   <Mail className="w-6 h-6" />
                                </span>
                              )}
                           </div>
                        </div>
  
                        <div className="text-indigo-600 dark:text-indigo-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-4 font-black relative z-10">[ {member.meta} ]</div>
                        <h3 className="text-3xl font-black text-foreground mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors relative z-10 leading-none tracking-tighter">{member.name}</h3>
                        <div className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.3em] mb-8 relative z-10 font-mono">{member.role}</div>
                        <p className="text-muted-foreground text-base leading-relaxed font-medium relative z-10 group-hover:text-foreground/80 transition-colors line-clamp-4">{member.bio}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Operational Staff grid */}
        {!isLoading && teamMembers.length > 0 && (
          <section className="py-24 lg:py-56 relative z-10 bg-secondary/40 backdrop-blur-3xl border-y border-border overflow-hidden">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="text-center max-w-4xl mx-auto mb-20">
                 <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none text-foreground font-bold">Key Node <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-indigo-400 dark:to-blue-400">Collaborators</span>.</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    <Link href={`/team/${member.id}`} className="block h-full">
                      <div className="bg-card border border-border rounded-[3rem] p-10 text-center hover:border-indigo-500/30 transition-all shadow-md dark:shadow-none h-full flex flex-col items-center cursor-pointer">
                        <div className={`relative w-28 h-28 mx-auto rounded-[2rem] overflow-hidden mb-8 group-hover:scale-110 transition-transform duration-700 shadow-lg`}>
                          <img src={member.avatarUrl || `https://i.pravatar.cc/400?${member.name?.toLowerCase().includes('virat') ? 'img=11' : `u=${encodeURIComponent(member.name)}`}`} className="w-full h-full object-cover" alt={member.name} />
                        </div>
                        <div className="text-indigo-600 dark:text-indigo-400 font-mono text-[9px] uppercase tracking-[0.4em] mb-3 font-bold">[ {member.meta} ]</div>
                        <h3 className="text-2xl font-black text-foreground mb-1 leading-none tracking-tighter uppercase">{member.name}</h3>
                        <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] font-mono">{member.role}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Operational Culture Hub */}
        <section className="py-32 lg:py-56 relative z-10 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-24 lg:gap-40 items-center">
              <div>
                <span className="text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-[0.4em] mb-6 block font-bold">Foundation</span>
                <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter leading-[0.85] uppercase text-foreground">
                  Where Innovation <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-400 to-emerald-400 dark:from-indigo-400 dark:via-blue-400 dark:to-emerald-400">Accelerates</span>.
                </h2>
                <p className="text-muted-foreground text-xl lg:text-3xl font-medium leading-relaxed mb-16">
                   Meganods is a decentralized, remote-first operational unit that prioritizes high-fidelity output and recursive learning.
                </p>
                <div className="space-y-12">
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
                      className="flex gap-8"
                    >
                      <div className="w-2 h-16 bg-gradient-to-b from-indigo-500 to-transparent mt-1" />
                      <div>
                        <h4 className="text-2xl font-black text-foreground mb-3 uppercase tracking-tight">{perk.title}</h4>
                        <p className="text-muted-foreground text-base font-medium leading-relaxed">{perk.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Dynamic Culture Panel */}
              <div className="bg-card/60 backdrop-blur-3xl border border-border rounded-[5rem] p-12 lg:p-24 relative overflow-hidden group shadow-md dark:shadow-none">
                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-emerald-500/5 pointer-events-none" />
                 <div className="relative grid grid-cols-2 gap-16 lg:gap-24">
                    {[
                      { value: '200+', label: 'Managed Nodes' },
                      { value: '25+', label: 'Sectors' },
                      { value: '4.9', label: 'Satisfaction' },
                      { value: '92%', label: 'Stability' },
                    ].map((stat, index) => (
                      <div key={stat.label} className="text-left">
                        <div className="text-6xl lg:text-8xl font-black text-foreground tracking-tighter mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase leading-none">
                          {stat.value}
                        </div>
                        <div className="text-muted-foreground/60 text-[10px] font-mono uppercase tracking-[0.4em] font-bold">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                 
                 {/* Visual HUD Element */}
                 <div className="mt-24 pt-12 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                       <span className="text-muted-foreground font-mono text-xs uppercase tracking-[0.4em] font-bold">Protocol Stable</span>
                    </div>
                    <Cpu className="w-12 h-12 text-muted-foreground/10 group-hover:text-indigo-500/20 transition-colors duration-700" />
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join the Mesh CTA */}
        <section className="py-32 lg:py-56 relative z-10 px-6">
           <div className="container mx-auto max-w-5xl">
              <div className="relative rounded-[4rem] lg:rounded-[5rem] border border-border bg-card/60 backdrop-blur-3xl overflow-hidden p-1 shadow-md dark:shadow-none">
                 <div className="relative px-8 py-24 lg:px-24 lg:py-32 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-blue-500/10 pointer-events-none" />
                    <Target className="w-16 h-16 text-indigo-600/20 dark:text-indigo-400/20 mx-auto mb-10" />
                    
                    <h2 className="text-4xl md:text-7xl lg:text-[8rem] font-bold text-foreground mb-10 tracking-tighter leading-[0.85] uppercase">
                       Establish Your <br />
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-400 to-emerald-400 dark:from-indigo-400 dark:to-emerald-400">Node Hub</span>.
                    </h2>
                    <p className="text-muted-foreground text-xl lg:text-3xl mb-16 max-w-3xl mx-auto font-medium leading-relaxed">
                       We are actively looking for elite operational units to join our global network of intelligence architects.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                       <Button 
                          asChild
                          className="h-24 px-16 bg-foreground text-background hover:bg-foreground/90 font-black rounded-[2rem] shadow-2xl transition-all text-2xl group border-0"
                       >
                          <Link href="/careers" className="flex items-center">
                             View Operational Openings
                             <ArrowRight className="ml-4 w-8 h-8 group-hover:translate-x-3 transition-transform" />
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
