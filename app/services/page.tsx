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
  CheckCircle2,
  Zap,
  Settings,
  Code2,
  Database,
  Brain,
  Cloud,
  Shield,
  Activity,
  Cpu,
  Layers,
  ChevronRight,
  Terminal,
  Server,
  Globe,
  Loader2
} from 'lucide-react'
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";

const iconMap: Record<string, any> = {
  Brain,
  Cloud,
  Shield,
  Activity,
  Cpu,
  Zap,
  Globe
}

const processSteps = [
  { icon: Terminal, title: 'Network Audit', description: 'Deep scan of your existing infrastructure to identify optimization vectors.' },
  { icon: Cpu, title: 'Core Design', description: 'Architecting custom neural and structural components for your specific sector.' },
  { icon: Zap, title: 'Rapid Deployment', description: 'High-speed implementation through automated delivery pipelines.' },
  { icon: Globe, title: 'Global Scale', description: 'Multiplying your operational footprint across the global mesh network.' },
]

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const q = query(
          collection(db, "services"), 
          where("isActive", "==", true),
          orderBy("order", "asc"), 
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setServices(docs);
      } catch (error) {
        console.error("SERVICE_FETCH_ERROR:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchServices();
  }, [])

  return (
    <SmoothScrollProvider>
      <Navigation />
      <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 transition-colors duration-500">
        <div className="fixed inset-0 pointer-events-none z-0">
           <DeepTechBackground />
        </div>

        {/* ═══ HERO SECTION — home page style ═══ */}
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
                  <span className="font-mono text-[11px] tracking-wider uppercase text-slate-500 font-bold">Capabilities Active</span>
                  <span className="text-slate-300">|</span>
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent font-black tracking-wide">
                    Protocol v4.5
                  </span>
                  <Layers className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                </motion.div>

                {/* Sub label */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="text-xs sm:text-sm font-mono tracking-[0.3em] text-slate-400 uppercase font-bold"
                >
                  Design • Develop • Deploy • <span className="text-emerald-500 font-black">Scale</span>
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
                    <span className="block text-slate-900 drop-shadow-sm">Strategic</span>
                    <span className="relative inline-block mt-1 font-extrabold italic bg-gradient-to-r from-blue-600 via-indigo-600 via-purple-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent animate-gradient-flow drop-shadow-sm">
                      Digital Services.
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
                  From <span className="font-semibold text-slate-900">custom web & mobile apps</span> to <span className="font-semibold text-slate-900">AI integrations</span> and enterprise infrastructure — end-to-end technology services built to perform at scale.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.26 }}
                  className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
                >
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="h-12 px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-xl shadow-blue-500/20 text-sm border-0 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
                    >
                      Start a Project <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/projects">
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-12 px-6 rounded-xl border-slate-200 bg-white/90 hover:bg-slate-50 text-slate-700 text-sm font-semibold shadow-sm flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
                    >
                      <ChevronRight className="h-4 w-4 text-indigo-600" />
                      View Portfolio
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
                    { value: '20+', label: 'Services Offered' },
                    { value: '320+', label: 'Projects Delivered' },
                    { value: '48hr', label: 'Avg Kickoff Time' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center lg:text-left">
                      <div className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">{stat.value}</div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* ── RIGHT: Animated service stack visual ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, x: 24 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 relative flex items-center justify-center"
              >
                {/* Floating cards */}
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-6 -left-4 z-20 hidden lg:flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-indigo-200/80 shadow-2xl shadow-indigo-500/10"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono font-bold uppercase text-slate-400">Avg Delivery</p>
                    <p className="text-sm font-black text-slate-900">2–6 Weeks</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [8, -8, 8] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -top-4 -right-4 z-20 hidden lg:flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-indigo-200/80 shadow-2xl shadow-indigo-500/10"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono font-bold uppercase text-slate-400">Quality</p>
                    <p className="text-sm font-black text-slate-900">100% Guaranteed</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [6, -6, 6] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-4 -left-4 z-20 hidden lg:flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-indigo-200/80 shadow-2xl shadow-indigo-500/10"
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono font-bold uppercase text-slate-400">Clients</p>
                    <p className="text-sm font-black text-slate-900">150+ Worldwide</p>
                  </div>
                </motion.div>

                {/* Central service stack cards */}
                <div className="relative w-full max-w-sm space-y-3">
                  {[
                    { icon: Code2, label: 'Web & Mobile Development', tag: 'React · Next.js · Flutter', color: 'from-blue-500 to-indigo-600' },
                    { icon: Brain, label: 'AI & Machine Learning', tag: 'LLMs · Automation · RAG', color: 'from-purple-500 to-indigo-600' },
                    { icon: Cloud, label: 'Cloud & DevOps', tag: 'AWS · GCP · CI/CD', color: 'from-cyan-500 to-blue-600' },
                    { icon: Settings, label: 'CRM & ERP Solutions', tag: 'Salesforce · Odoo · Custom', color: 'from-emerald-500 to-teal-600' },
                  ].map(({ icon: Icon, label, tag, color }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ x: 6, scale: 1.02 }}
                      className="flex items-center gap-4 p-4 bg-white/95 border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300 cursor-default"
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0 shadow-md`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-slate-900 font-bold text-sm truncate">{label}</div>
                        <div className="text-slate-400 font-mono text-[9px] uppercase tracking-wider">{tag}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                    </motion.div>
                  ))}

                  {/* More services pill */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.65 }}
                    className="text-center pt-1"
                  >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 font-mono text-[9px] uppercase tracking-widest font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                      +16 More Services Available
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
                { icon: Terminal, title: 'Discovery & Audit', desc: 'We start with a deep understanding of your business before writing a single line of code.' },
                { icon: Cpu, title: 'Agile Execution', desc: 'Sprint-based delivery with weekly updates, live demos, and zero surprise scope creep.' },
                { icon: Server, title: 'Launch & Support', desc: 'Production-ready deployment, monitoring, and ongoing maintenance included as standard.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col items-center text-center group hover:border-indigo-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">{title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
          >
            <div className="w-px h-10 bg-gradient-to-b from-transparent via-slate-400 to-transparent" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500">Scroll</span>
          </motion.div>
        </section>


        {/* Dynamic Services Catalog */}
        <section className="py-24 relative z-10">
          <div className="container mx-auto px-6 lg:px-8">
            {isLoading ? (
               <div className="flex flex-col items-center justify-center py-60 gap-8">
                  <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
                  <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.5em] animate-pulse">Synchronizing with Distributed Mesh...</p>
               </div>
            ) : services.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-60 gap-8 border border-dashed border-border rounded-[3rem]">
                  <Database className="w-16 h-16 text-muted-foreground/20" />
                  <div className="text-center">
                     <h3 className="text-3xl font-black text-foreground">Registry Idle</h3>
                     <p className="text-lg text-muted-foreground/45 font-medium mt-4">No tactical service stacks detected in current registry.</p>
                  </div>
               </div>
            ) : (
              services.map((service, index) => {
                const Icon = iconMap[service.icon] || Brain;
                return (
                  <motion.div 
                    key={service.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`flex flex-col lg:flex-row items-center gap-20 lg:gap-32 mb-40 last:mb-0 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                  >
                      {/* Service Visual Hub */}
                      <div className="flex-1 w-full">
                         <div className="relative aspect-square max-w-lg mx-auto lg:mx-0 group">
                            <div className="absolute inset-0 rounded-[4rem] border border-border bg-card/60 backdrop-blur-3xl overflow-hidden p-8 shadow-sm dark:shadow-none">
                               <div className="relative w-full h-full rounded-[3rem] bg-secondary overflow-hidden flex items-center justify-center">
                                  {/* Background HUD Layers */}
                                  <motion.div 
                                     animate={{ rotate: 360 }}
                                     transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                     className="absolute inset-4 border border-border/30 rounded-full" 
                                  />
                                  <motion.div 
                                     animate={{ rotate: -360 }}
                                     transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                     className="absolute inset-16 border border-border/30 rounded-full" 
                                  />
                                  
                                  <div className={`w-32 h-32 rounded-[2.5rem] bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-[0_0_50px_rgba(79,70,229,0.3)] z-10 group-hover:scale-110 transition-transform duration-700`}>
                                     <Icon className="w-16 h-16 text-white" />
                                  </div>

                                  {/* Orbiting Particles */}
                                  {[...Array(4)].map((_, i) => (
                                    <motion.div
                                      key={i}
                                      animate={{ rotate: 360 }}
                                      transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}
                                      className="absolute inset-0"
                                    >
                                      <div className={`absolute top-1/2 left-0 w-2 h-2 rounded-full bg-gradient-to-br ${service.gradient}`} />
                                    </motion.div>
                                  ))}
                                </div>
                            </div>
                         </div>
                      </div>

                      {/* Service Content Layer */}
                      <div className="flex-1 text-left">
                         <div className="text-indigo-600 dark:text-indigo-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-4 font-bold">[ {service.meta || service.category} ]</div>
                         <span className="text-muted-foreground text-lg font-black uppercase tracking-widest block mb-4">{service.subtitle}</span>
                         <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter text-foreground uppercase">
                            {service.title}
                         </h2>
                         <p className="text-xl text-muted-foreground leading-relaxed font-medium mb-12">
                            {service.description}
                          </p>

                         <div className="grid sm:grid-cols-2 gap-6 mb-16">
                            {service.features?.map((feature: string) => (
                               <div key={feature} className="flex items-center gap-4 group/item">
                                  <div className="p-2 rounded-lg bg-secondary border border-border group-hover/item:border-indigo-500/50 transition-colors">
                                     <ChevronRight className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                                  </div>
                                  <span className="text-sm font-bold text-muted-foreground group-hover/item:text-foreground transition-colors">{feature}</span>
                                </div>
                            ))}
                         </div>

                         <div className="flex items-center gap-6">
                            <Button 
                              asChild
                              className={`h-20 px-12 bg-foreground text-background hover:bg-foreground/90 font-bold rounded-2xl shadow-2xl transition-all text-lg group border-0`}
                            >
                               <Link href="/contact" className="flex items-center">
                                  Request Intelligence Audit
                                  <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                               </Link>
                            </Button>
                            <div className="flex flex-col">
                               {service.results?.map((r: string) => (
                                  <span key={r} className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest mb-1 font-bold">• {r}</span>
                               ))}
                            </div>
                         </div>
                      </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </section>

        {/* Operational Deployment Lifecycle (Process) */}
        <section className="py-32 lg:py-56 relative z-10 bg-secondary/40 backdrop-blur-3xl border-y border-border overflow-hidden">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-32">
               <span className="text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-[0.4em] mb-6 block font-bold">The Pipeline</span>
               <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase text-foreground">
                  Tactical <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-indigo-400 dark:to-blue-400">Deployment</span>.
               </h2>
               <p className="text-muted-foreground text-xl lg:text-2xl font-medium leading-relaxed">
                  Our hyper-accelerated delivery lifecycle ensures your infrastructure is optimized and active in record cycles.
               </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-[3rem] overflow-hidden border border-border shadow-md dark:shadow-none">
              {processSteps.map((step, index) => (
                <div key={step.title} className="bg-card p-12 group hover:bg-secondary/40 transition-all duration-300 relative">
                   <div className="text-5xl font-black text-foreground/5 absolute top-10 right-10 group-hover:text-indigo-500/10 transition-colors pointer-events-none">0{index + 1}</div>
                   <div className="w-16 h-16 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 dark:border-indigo-500/20 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                      <step.icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                   </div>
                   <h3 className="text-2xl font-black text-foreground mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{step.title}</h3>
                   <p className="text-muted-foreground text-sm font-medium leading-relaxed">{step.description}</p>
                   
                   {/* Kinetic Indicator */}
                   <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Connection Hub CTA */}
        <section className="py-32 lg:py-56 relative z-10 px-6">
           <div className="container mx-auto max-w-5xl">
              <div className="relative rounded-[4rem] lg:rounded-[5rem] border border-border bg-card/60 backdrop-blur-3xl overflow-hidden p-1 shadow-md dark:shadow-none">
                 <div className="relative px-8 py-24 lg:px-24 lg:py-32 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-blue-500/10 pointer-events-none" />
                    <Server className="w-16 h-16 text-indigo-600/20 dark:text-indigo-400/20 mx-auto mb-10" />
                    
                    <h2 className="text-4xl md:text-7xl lg:text-9xl font-black text-foreground mb-10 tracking-tighter leading-[0.85] uppercase">
                       Establish <br />
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-400 to-emerald-400 dark:from-indigo-400 dark:via-blue-400 dark:to-emerald-400">Authority</span>.
                    </h2>
                    <p className="text-muted-foreground text-xl lg:text-3xl mb-16 max-w-3xl mx-auto font-medium leading-relaxed">
                       Don't just compete. Dominate your market sector with the world's most advanced technology infrastructure.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                       <Button 
                          asChild
                          className="h-24 px-16 bg-foreground text-background hover:bg-foreground/90 font-black rounded-[2rem] shadow-2xl transition-all text-2xl group border-0"
                       >
                          <Link href="/contact" className="flex items-center">
                             Request Operational Audit
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
