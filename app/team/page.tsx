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
  Database,
  Sparkles,
  Code2,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Brain,
  Palette
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

  const scrollToLeadership = () => {
    const el = document.getElementById('leadership-grid')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <SmoothScrollProvider>
      <Navigation />
      <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 transition-colors duration-500">
        <div className="fixed inset-0 pointer-events-none z-0">
           <DeepTechBackground />
        </div>

        {/* ═══ HERO SECTION — matches home page style ═══ */}
        <section className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/50">

          {/* Grid + ambient glow background */}
          <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage: `linear-gradient(to right, #4f46e5 1px, transparent 1px), linear-gradient(to bottom, #4f46e5 1px, transparent 1px)`,
                backgroundSize: '48px 48px',
              }}
            />
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] bg-gradient-to-tr from-blue-200/40 via-indigo-200/30 to-purple-200/40 rounded-full blur-[140px]" />
            <div className="absolute top-1/3 -left-20 w-80 h-80 bg-cyan-200/30 rounded-full blur-[110px]" />
            <div className="absolute top-1/3 -right-20 w-80 h-80 bg-violet-200/30 rounded-full blur-[110px]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-indigo-100/40 rounded-full blur-[80px]" />
          </div>

          <div className="relative container mx-auto px-6 lg:px-8 max-w-7xl z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

              {/* ── LEFT: Content ── */}
              <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">

                {/* Status pill */}
                <motion.div
                  initial={{ opacity: 0, y: -15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-3 rounded-full border border-indigo-200/90 bg-white/90 px-4 py-1.5 text-xs shadow-md shadow-indigo-500/5 backdrop-blur-xl hover:border-indigo-400 transition-all cursor-default"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="font-mono text-[11px] tracking-wider uppercase text-slate-500 font-bold">CORE TALENT</span>
                  <span className="text-slate-300">|</span>
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent font-black tracking-wide">
                    Global Engineering Nodes
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                </motion.div>

                {/* Sub label */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="text-xs sm:text-sm font-mono tracking-[0.3em] text-slate-400 uppercase font-bold"
                >
                  Culture • Talent • Leadership • <span className="text-emerald-500 font-black">Impact</span>
                </motion.div>

                {/* Main headline */}
                <div className="relative pt-1">
                  <div className="absolute top-1/2 left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 -translate-y-1/2 w-full max-w-lg h-28 bg-gradient-to-r from-blue-500/15 via-indigo-500/20 to-teal-400/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
                  <motion.h1
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]"
                  >
                    <span className="block text-slate-900 drop-shadow-sm">The Minds Behind</span>
                    <span className="relative inline-block mt-1 font-extrabold italic bg-gradient-to-r from-blue-600 via-indigo-600 via-purple-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent animate-gradient-flow drop-shadow-sm">
                      MegaNods Innovation.
                    </span>
                  </motion.h1>
                </div>

                {/* Subtext */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.18 }}
                  className="max-w-xl text-base sm:text-lg text-slate-600 leading-relaxed"
                >
                  A passionate collective of <span className="font-semibold text-slate-900">senior full-stack engineers</span>, <span className="font-semibold text-slate-900">AI researchers</span>, and product designers — united to build resilient, high-impact digital solutions.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.26 }}
                  className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
                >
                  <Button
                    onClick={scrollToLeadership}
                    size="lg"
                    className="h-12 px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-xl shadow-blue-500/20 text-sm border-0 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    Meet The Leadership <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-12 px-6 rounded-xl border-slate-200 bg-white/90 hover:bg-slate-50 text-slate-700 text-sm font-semibold shadow-sm flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
                    >
                      <ChevronRight className="h-4 w-4 text-indigo-600" />
                      Work With Us
                    </Button>
                  </Link>
                </motion.div>

                {/* Stats row */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="flex flex-wrap gap-6 pt-3 justify-center lg:justify-start"
                >
                  {[
                    { value: 'Full-Stack', label: 'Engineering Core' },
                    { value: '15+', label: 'Tech Disciplines' },
                    { value: 'Peer-Reviewed', label: 'Code Quality' },
                    { value: '100%', label: 'Remote First' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center lg:text-left">
                      <div className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">{stat.value}</div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* ── RIGHT: Animated Interactive Showcase Visual ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, x: 24 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 relative flex items-center justify-center pt-10 pb-8"
              >
                {/* Floating badge 1: Engineering */}
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-0 -left-2 xl:-left-6 z-20 hidden lg:flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-indigo-200/90 shadow-xl shadow-indigo-500/10"
                >
                  <div className="w-7 h-7 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <Code2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[8px] font-mono font-bold uppercase text-slate-400">Engineering</p>
                    <p className="text-xs font-black text-slate-900">Senior Architects</p>
                  </div>
                </motion.div>

                {/* Floating badge 2: Culture */}
                <motion.div
                  animate={{ y: [6, -6, 6] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute top-0 -right-2 xl:-right-6 z-20 hidden lg:flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-indigo-200/90 shadow-xl shadow-indigo-500/10"
                >
                  <div className="w-7 h-7 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[8px] font-mono font-bold uppercase text-slate-400">Culture</p>
                    <p className="text-xs font-black text-slate-900">100% Agile & Remote</p>
                  </div>
                </motion.div>

                {/* Floating badge 3: Quality */}
                <motion.div
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-2 -left-2 xl:-left-6 z-20 hidden lg:flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-indigo-200/90 shadow-xl shadow-indigo-500/10"
                >
                  <div className="w-7 h-7 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[8px] font-mono font-bold uppercase text-slate-400">Talent Standard</p>
                    <p className="text-xs font-black text-slate-900">Top 3% Tier</p>
                  </div>
                </motion.div>

                {/* Central interactive team discipline cards */}
                <div className="relative w-full max-w-md space-y-3">
                  {[
                    { 
                      icon: Code2, 
                      title: 'Full-Stack & Cloud Architects', 
                      details: 'React · Next.js · Node.js · Go · AWS',
                      tag: 'Core Engineering',
                      color: 'from-blue-500 to-indigo-600',
                      badge: 'Active Sprint'
                    },
                    { 
                      icon: Brain, 
                      title: 'AI & Machine Learning Engineers', 
                      details: 'LLMs · RAG Pipelines · PyTorch · Vision',
                      tag: 'AI Intelligence',
                      color: 'from-purple-500 to-indigo-600',
                      badge: 'Innovation Hub'
                    },
                    { 
                      icon: ShieldCheck, 
                      title: 'Cloud Security & DevOps Leads', 
                      details: 'Kubernetes · Terraform · CI/CD · Zero-Trust',
                      tag: 'Cloud & Infrastructure',
                      color: 'from-cyan-500 to-blue-600',
                      badge: '99.99% Uptime'
                    },
                    { 
                      icon: Palette, 
                      title: 'Product Designers & UX Leads', 
                      details: 'Figma · Design Systems · Micro-interactions',
                      tag: 'Design & Experience',
                      color: 'from-emerald-500 to-teal-600',
                      badge: 'Design System'
                    },
                  ].map(({ icon: Icon, title, details, tag, color, badge }, i) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ x: 6, scale: 1.02 }}
                      className="p-4 bg-white/95 border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300 cursor-default"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0 shadow-md`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <div className="text-slate-900 font-bold text-sm truncate">{title}</div>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-600 font-mono text-[8px] font-bold shrink-0">
                              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                              {badge}
                            </span>
                          </div>
                          <div className="text-indigo-600 font-mono text-[9.5px] font-semibold mt-0.5 truncate">{details}</div>
                          <div className="text-slate-400 font-mono text-[8.5px] uppercase tracking-wider mt-0.5 truncate">{tag}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Highlight pill */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.65 }}
                    className="text-center pt-1"
                  >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 font-mono text-[9px] uppercase tracking-widest font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                      Multidisciplinary Engineering Excellence
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Bottom feature strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-16 max-w-5xl mx-auto"
            >
              {[
                { 
                  icon: Code2, 
                  title: 'Senior-Led Engineering', 
                  desc: 'Every client project is guided directly by seasoned technical architects with deep enterprise experience.' 
                },
                { 
                  icon: Users, 
                  title: 'Transparent Collaboration', 
                  desc: 'Direct Slack communication, weekly demo calls, and collaborative sprint planning at every phase.' 
                },
                { 
                  icon: Sparkles, 
                  title: 'Continuous Innovation', 
                  desc: 'Dedicated R&D cycles exploring latest AI paradigms, framework updates, and cloud performance architectures.' 
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col items-center text-center group hover:border-indigo-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-slate-900 font-bold text-sm mb-2">{title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Global Leadership Section */}
        <section id="leadership-grid" className="py-20 lg:py-32 relative z-10">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
               <span className="text-indigo-600 font-mono text-xs uppercase tracking-[0.35em] mb-3 block font-bold">Executive Board</span>
               <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight leading-tight text-slate-900">
                  Leadership <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Council</span>.
               </h2>
               <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
                  The visionary leaders responsible for our engineering standards, innovation culture, and project excellence.
               </p>
            </div>

            {isLoading ? (
               <div className="flex flex-col items-center justify-center py-40 gap-8">
                  <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
                  <p className="text-xs font-mono text-indigo-600 uppercase tracking-[0.5em] animate-pulse">Loading Team Members...</p>
               </div>
            ) : leadership.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-40 gap-8 border border-dashed border-border rounded-3xl">
                  <Database className="w-16 h-16 text-muted-foreground/20" />
                  <p className="text-base text-muted-foreground font-medium font-mono uppercase tracking-widest">Leadership Registry Empty</p>
               </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
                {leadership.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-[360px] group relative flex flex-col"
                  >
                    <Link href={`/team/${member.id}`} className="block h-full">
                      <div className="bg-card/60 backdrop-blur-3xl border border-border rounded-[2.5rem] p-8 h-full flex flex-col hover:border-indigo-500/30 transition-all duration-500 overflow-hidden relative shadow-sm cursor-pointer">
                        <div className={`absolute -inset-1 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-10 transition-opacity blur-2xl pointer-events-none`} />
                        
                        <div className="relative mb-6 rounded-2xl overflow-hidden aspect-square border border-border shadow-md bg-secondary">
                           <img src={member.avatarUrl || `https://i.pravatar.cc/400?${member.name?.toLowerCase().includes('virat') ? 'img=11' : `u=${encodeURIComponent(member.name)}`}`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={member.name} />
                           
                           {/* Social Overlay */}
                           <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-6 group-hover:translate-y-0" onClick={(e) => e.preventDefault()}>
                              {member.social?.linkedin && (
                                <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(member.social.linkedin, '_blank'); }} className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-indigo-600 hover:scale-110 transition-all shadow-xl cursor-pointer">
                                   <Linkedin className="w-4 h-4" />
                                </span>
                              )}
                              {member.social?.twitter && (
                                <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(member.social.twitter, '_blank'); }} className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-blue-500 hover:scale-110 transition-all shadow-xl cursor-pointer">
                                   <Twitter className="w-4 h-4" />
                                </span>
                              )}
                              {member.social?.github && (
                                <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(member.social.github, '_blank'); }} className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-black hover:scale-110 transition-all shadow-xl cursor-pointer">
                                   <Github className="w-4 h-4" />
                                </span>
                              )}
                              {member.social?.email && (
                                <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = `mailto:${member.social.email}`; }} className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-rose-500 hover:scale-110 transition-all shadow-xl cursor-pointer">
                                   <Mail className="w-4 h-4" />
                                </span>
                              )}
                           </div>
                        </div>
  
                        <div className="text-indigo-600 font-mono text-[9px] uppercase tracking-[0.3em] mb-2 font-bold relative z-10">[ {member.meta ? member.meta.replace(/STRATEGIC NODE/i, 'LEADERSHIP').replace(/NODE/i, 'TEAM') : `LEADERSHIP 0${index + 1}`} ]</div>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors relative z-10 leading-tight tracking-tight">{member.name}</h3>
                        <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-4 relative z-10 font-mono">{member.role}</div>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed relative z-10 group-hover:text-slate-800 transition-colors line-clamp-3">{member.bio}</p>
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
          <section className="py-20 lg:py-28 relative z-10 bg-slate-50/70 border-y border-border overflow-hidden">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-14">
                 <span className="text-indigo-600 font-mono text-xs uppercase tracking-[0.35em] mb-3 block font-bold">Engineering Collective</span>
                 <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-slate-900">Key Team <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Collaborators</span>.</h2>
              </div>
              
              <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-[340px] group flex flex-col"
                  >
                    <Link href={`/team/${member.id}`} className="block h-full">
                      <div className="bg-white border border-slate-200 rounded-[2.25rem] p-7 text-center hover:border-indigo-300 hover:shadow-lg transition-all h-full flex flex-col items-center cursor-pointer shadow-sm">
                        <div className="relative w-36 h-36 mx-auto rounded-2xl overflow-hidden mb-5 group-hover:scale-105 transition-transform duration-500 shadow-md border border-slate-100 bg-secondary">
                          <img src={member.avatarUrl || `https://i.pravatar.cc/400?${member.name?.toLowerCase().includes('virat') ? 'img=11' : `u=${encodeURIComponent(member.name)}`}`} className="w-full h-full object-cover" alt={member.name} />
                        </div>
                        <div className="text-indigo-600 font-mono text-[9px] uppercase tracking-wider mb-2 font-bold">[ {member.meta ? member.meta.replace(/STRATEGIC NODE/i, 'TEAM').replace(/NODE/i, 'MEMBER') : `TEAM MEMBER 0${index + 1}`} ]</div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1 leading-snug tracking-tight group-hover:text-indigo-600 transition-colors">{member.name}</h3>
                        <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider font-mono">{member.role}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Culture & Work Ethic */}
        <section className="py-20 lg:py-28 relative z-10 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <span className="text-indigo-600 font-mono text-xs uppercase tracking-[0.35em] mb-3 block font-bold">Our Culture</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight leading-tight text-slate-900">
                  Where Innovation <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600">Accelerates</span>.
                </h2>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-10">
                   MegaNods operates as a collaborative, remote-first technology firm focused on technical craft, accountability, and continuous learning.
                </p>
                <div className="space-y-8">
                  {[
                    { title: 'Remote-First Autonomy', description: 'Empowered teams working across time zones with flexible, async-friendly workflows.' },
                    { title: 'Continuous Upskilling & Mastery', description: 'Dedicated resources and budget for certifications, technical research, and workshops.' },
                    { title: 'High-Impact Ownership', description: 'Engineers take direct ownership of product outcomes, architecture decisions, and code quality.' },
                  ].map((perk, index) => (
                    <motion.div
                      key={perk.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-5"
                    >
                      <div className="w-1.5 h-12 bg-gradient-to-b from-indigo-600 to-blue-500 rounded-full mt-1 shrink-0" />
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 mb-1 tracking-tight">{perk.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">{perk.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Dynamic Culture Panel */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-8 lg:p-12 relative overflow-hidden shadow-xl">
                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-blue-50/30 pointer-events-none" />
                 <div className="relative grid grid-cols-2 gap-8">
                    {[
                      { value: 'Dedicated', label: 'Technical Leads' },
                      { value: 'Full-Cycle', label: 'Project Delivery' },
                      { value: '4.9/5', label: 'Client Rating' },
                      { value: '99.9%', label: 'SLA Reliability' },
                    ].map((stat, index) => (
                      <div key={stat.label} className="text-left">
                        <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent tracking-tight mb-1">
                          {stat.value}
                        </div>
                        <div className="text-slate-400 text-[10px] font-mono uppercase tracking-wider font-bold">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                 
                 {/* Visual Status Indicator */}
                 <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                       <span className="text-slate-600 font-mono text-xs uppercase tracking-wider font-bold">Collaborative Engineering Active</span>
                    </div>
                    <Cpu className="w-6 h-6 text-indigo-400" />
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join the Team CTA */}
        <section className="py-20 lg:py-28 relative z-10 px-6">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 bg-white shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/60 pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

                <div className="relative px-8 py-14 lg:px-16 lg:py-16">
                  <div className="grid lg:grid-cols-2 gap-10 items-center">
                    {/* Left: Text */}
                    <div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-indigo-600 font-mono text-[10px] uppercase tracking-[0.35em] font-bold">Collaborations & Partnerships</span>
                      </motion.div>

                      <motion.h2
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, duration: 0.6 }}
                        className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight"
                      >
                        Want to build the future{' '}
                        <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-600">
                          with our team?
                        </span>
                      </motion.h2>

                      <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.22 }}
                        className="text-slate-500 text-sm sm:text-base leading-relaxed mb-6"
                      >
                        Whether you&apos;re looking to collaborate on high-scale client solutions or join our engineering collective, we&apos;d love to connect.
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap gap-4"
                      >
                        <Button
                          asChild
                          size="lg"
                          className="h-12 px-8 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 text-sm border-0 gap-2 hover:scale-105 active:scale-95 transition-all"
                        >
                          <Link href="/contact">
                            Get In Touch <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          size="lg"
                          className="h-12 px-6 rounded-xl border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold shadow-sm hover:scale-105 active:scale-95 transition-all"
                        >
                          <Link href="/projects">View Case Studies</Link>
                        </Button>
                      </motion.div>
                    </div>

                    {/* Right: Trust checklist */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.25, duration: 0.6 }}
                      className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 space-y-4"
                    >
                      <div className="text-slate-900 font-bold text-sm mb-4">Why top talent and clients choose MegaNods:</div>
                      {[
                        { icon: CheckCircle2, title: 'Senior Technical Guidance', desc: 'Direct engagement with lead architects on every project.' },
                        { icon: Zap, title: 'High-Impact Engineering', desc: 'Build scalable products used by thousands of active users.' },
                        { icon: ShieldCheck, title: 'Culture of Excellence', desc: 'No shortcuts, clean architectures, and modern engineering standards.' },
                        { icon: Users, title: 'Global Collaborative Network', desc: 'Work with talented engineers across modern tech stacks.' },
                      ].map(({ icon: Icon, title, desc }, i) => (
                        <motion.div
                          key={title}
                          initial={{ opacity: 0, x: 10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.07 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                            <Icon className="w-4 h-4 text-indigo-600" />
                          </div>
                          <div>
                            <div className="text-slate-900 font-semibold text-xs sm:text-sm">{title}</div>
                            <div className="text-slate-500 text-[11px] sm:text-xs leading-relaxed">{desc}</div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}

