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
  {
    icon: Terminal,
    step: '01',
    title: 'Discovery Call',
    description: 'We start with a deep 60-minute consultation — understanding your goals, pain points, tech stack, and timeline before anything else.',
    tag: 'Free & No Obligation',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    icon: Cpu,
    step: '02',
    title: 'Proposal & Scoping',
    description: 'Within 48 hours we deliver a detailed proposal — clear scope, tech stack recommendations, timeline breakdown, and fixed pricing. No surprises.',
    tag: '48hr Turnaround',
    color: 'from-purple-500 to-indigo-600'
  },
  {
    icon: Zap,
    step: '03',
    title: 'Agile Development',
    description: 'We build in 2-week sprints with weekly live demos, Slack updates, and full transparency. You see progress — always.',
    tag: 'Sprint-Based Delivery',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    icon: Globe,
    step: '04',
    title: 'Launch & Handover',
    description: 'Production deployment, QA testing, documentation, and 30-day post-launch support — all included. You own everything, source code and all.',
    tag: '30-Day Support Included',
    color: 'from-emerald-500 to-teal-600'
  },
]

import { defaultServices } from "@/lib/data/services"

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>(defaultServices)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const q = query(
          collection(db, "services"), 
          where("isActive", "==", true),
          orderBy("order", "asc")
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docs = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          if (docs.length > 0) {
            setServices(docs);
          }
        }
      } catch (error) {
        console.warn("SERVICE_FETCH_FALLBACK_DEFAULT:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchServices();
  }, [])

  return (
    <SmoothScrollProvider>
      <Navigation />
      <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 transition-colors duration-500 overflow-x-hidden">
        <div className="fixed inset-0 pointer-events-none z-0">
           <DeepTechBackground />
        </div>

        {/* ═══ HERO SECTION ═══ */}
        <section className="relative min-h-[85vh] sm:min-h-screen flex items-center overflow-hidden pt-24 sm:pt-28 pb-12 sm:pb-16 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/50">

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

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

              {/* ── LEFT: Content ── */}
              <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-6">

                {/* Status pill */}
                <motion.div
                  initial={{ opacity: 0, y: -15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-indigo-200/90 bg-white/90 px-3.5 py-1 text-xs shadow-sm backdrop-blur-xl hover:border-indigo-400 transition-all cursor-default"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="font-mono text-[10px] sm:text-[11px] tracking-wider uppercase text-slate-500 font-bold">Capabilities Active</span>
                  <span className="text-slate-300">|</span>
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent font-black tracking-wide text-[10px] sm:text-[11px]">
                    Protocol v4.5
                  </span>
                  <Layers className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                </motion.div>

                {/* Sub label */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-slate-400 uppercase font-bold"
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
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]"
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
                  className="max-w-xl text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal"
                >
                  From <span className="font-semibold text-slate-900">custom web & mobile apps</span> to <span className="font-semibold text-slate-900">AI integrations</span> and enterprise infrastructure — end-to-end technology services built to perform at scale.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.26 }}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 w-full sm:w-auto"
                >
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto h-12 px-6 sm:px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 text-xs sm:text-sm border-0 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      Start a Project <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/projects" className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto h-12 px-6 rounded-xl border-slate-200 bg-white/90 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold shadow-sm flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer"
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
                  className="flex flex-wrap gap-4 sm:gap-6 pt-3 justify-center lg:justify-start"
                >
                  {[
                    { value: 'End-to-End', label: 'Service Coverage' },
                    { value: '50+', label: 'Delivered Projects' },
                    { value: '48hr', label: 'Avg Kickoff Time' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center lg:text-left">
                      <div className="text-xl sm:text-2xl font-black bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">{stat.value}</div>
                      <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* ── RIGHT: Animated service stack visual ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, x: 24 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 relative flex items-center justify-center w-full"
              >
                {/* Central service stack cards */}
                <div className="relative w-full max-w-sm space-y-2.5 sm:space-y-3">
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
                      className="flex items-center gap-3.5 p-3 sm:p-4 bg-white/95 border border-slate-200/80 rounded-2xl shadow-sm hover:border-indigo-200 transition-all duration-300"
                    >
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0 shadow-md`}>
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-slate-900 font-bold text-xs sm:text-sm truncate">{label}</div>
                        <div className="text-slate-400 font-mono text-[8px] sm:text-[9px] uppercase tracking-wider truncate">{tag}</div>
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
                    <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 font-mono text-[8.5px] sm:text-[9px] uppercase tracking-widest font-bold">
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
              className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5 mt-12 sm:mt-16 max-w-5xl mx-auto"
            >
              {[
                { icon: Terminal, title: 'Discovery & Audit', desc: 'We start with a deep understanding of your business before writing a single line of code.' },
                { icon: Cpu, title: 'Agile Execution', desc: 'Sprint-based delivery with weekly updates, live demos, and zero surprise scope creep.' },
                { icon: Server, title: 'Launch & Support', desc: 'Production-ready deployment, monitoring, and ongoing maintenance included as standard.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col items-center text-center group hover:border-indigo-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-3 sm:mb-4 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">{title}</h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Dynamic Services Catalog */}
        <section className="py-16 sm:py-24 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {isLoading ? (
               <div className="flex flex-col items-center justify-center py-40 gap-6">
                  <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
                  <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.4em] animate-pulse font-bold">Synchronizing with Distributed Mesh...</p>
               </div>
            ) : services.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-40 gap-6 border border-dashed border-border rounded-3xl">
                  <Database className="w-12 h-12 text-muted-foreground/20" />
                  <div className="text-center">
                     <h3 className="text-2xl font-bold text-foreground">Registry Idle</h3>
                     <p className="text-sm text-muted-foreground mt-2">No tactical service stacks detected in current registry.</p>
                  </div>
               </div>
            ) : (
              services.map((service, index) => {
                const Icon = iconMap[service.icon] || Brain;
                return (
                  <motion.div 
                    key={service.id}
                    id={service.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-20 mb-20 sm:mb-28 lg:mb-36 last:mb-0 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                  >
                      {/* Service Visual Hub */}
                      <div className="w-full lg:w-1/2 flex justify-center">
                         <div className="relative aspect-[4/3] sm:aspect-square w-full max-w-md mx-auto group">
                            <div className="absolute inset-0 rounded-[2rem] sm:rounded-[3rem] border border-border bg-card/60 backdrop-blur-3xl overflow-hidden p-4 sm:p-8 shadow-md">
                               <div className="relative w-full h-full rounded-[1.5rem] sm:rounded-[2.5rem] bg-secondary/80 overflow-hidden flex items-center justify-center">
                                  {/* Background HUD Layers */}
                                  <motion.div 
                                     animate={{ rotate: 360 }}
                                     transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                     className="absolute inset-4 border border-border/30 rounded-full" 
                                  />
                                  <motion.div 
                                     animate={{ rotate: -360 }}
                                     transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                     className="absolute inset-10 sm:inset-16 border border-border/30 rounded-full" 
                                  />
                                  
                                  <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-2xl sm:rounded-[2.5rem] bg-gradient-to-br ${service.gradient || 'from-indigo-600 to-blue-600'} flex items-center justify-center shadow-2xl z-10 group-hover:scale-105 transition-transform duration-500`}>
                                     <Icon className="w-10 h-10 sm:w-16 sm:h-16 text-white" />
                                  </div>

                                  {/* Orbiting Particles */}
                                  {[...Array(4)].map((_, i) => (
                                    <motion.div
                                      key={i}
                                      animate={{ rotate: 360 }}
                                      transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}
                                      className="absolute inset-0"
                                    >
                                      <div className={`absolute top-1/2 left-0 w-2 h-2 rounded-full bg-gradient-to-br ${service.gradient || 'from-indigo-600 to-blue-600'}`} />
                                    </motion.div>
                                  ))}
                                </div>
                            </div>
                         </div>
                      </div>

                      {/* Service Content Layer */}
                      <div className="w-full lg:w-1/2 text-left">
                         <div className="text-indigo-600 dark:text-indigo-400 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.35em] mb-2 font-bold">[ {service.meta || service.category || 'Strategic Solution'} ]</div>
                         {service.subtitle && (
                           <span className="text-muted-foreground text-xs sm:text-sm font-bold uppercase tracking-wider block mb-2">{service.subtitle}</span>
                         )}
                         <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 tracking-tight text-foreground uppercase leading-tight">
                            {service.title}
                         </h2>
                         <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed font-normal mb-6 sm:mb-8">
                            {service.description}
                          </p>

                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 mb-8 sm:mb-10">
                            {service.features?.map((feature: string) => (
                               <div key={feature} className="flex items-center gap-3 p-2.5 rounded-xl bg-card/60 border border-border/70 group/item">
                                  <div className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center shrink-0">
                                     <ChevronRight className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                                  </div>
                                  <span className="text-xs font-semibold text-foreground">{feature}</span>
                                </div>
                            ))}
                         </div>

                         <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                            <Button 
                              asChild
                              className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 bg-foreground text-background hover:bg-foreground/90 font-bold rounded-xl sm:rounded-2xl shadow-xl transition-all text-xs sm:text-sm group border-0 cursor-pointer"
                            >
                               <Link href="/contact" className="flex items-center justify-center gap-2">
                                  <span>Request Intelligence Audit</span>
                                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                               </Link>
                            </Button>
                            {service.results && service.results.length > 0 && (
                              <div className="flex flex-wrap gap-2 sm:flex-col">
                                 {service.results.map((r: string) => (
                                    <span key={r} className="text-[9px] sm:text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-bold">• {r}</span>
                                 ))}
                              </div>
                            )}
                         </div>
                      </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </section>

        {/* How We Work — Process Section */}
        <section className="py-16 sm:py-24 relative z-10 overflow-hidden bg-gradient-to-b from-slate-50/60 via-white to-slate-50/40 border-y border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative max-w-7xl">
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
            >
              <div className="inline-flex items-center gap-3 mb-3">
                <div className="w-6 h-px bg-indigo-400/60" />
                <span className="text-indigo-600 font-mono text-[10px] uppercase tracking-[0.4em] font-bold">Our Process</span>
                <div className="w-6 h-px bg-indigo-400/60" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-3 leading-tight">
                How We{' '}
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400">
                  Deliver
                </span>
                .
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm md:text-base leading-relaxed">
                A clear, predictable delivery process — from first call to final launch. No hidden steps, no vague timelines.
              </p>
            </motion.div>

            {/* Process steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative"
                >
                  <div className="relative bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 h-full flex flex-col overflow-hidden shadow-xs hover:shadow-md hover:border-indigo-200 transition-all duration-300">
                    <div className="absolute top-4 right-4 text-2xl font-black text-slate-100 group-hover:text-indigo-100 transition-colors duration-300 leading-none">{step.step}</div>

                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-md`}>
                      <step.icon className="w-4 h-4 text-white" />
                    </div>

                    <div className="text-indigo-500 font-mono text-[8.5px] uppercase tracking-[0.25em] mb-1 font-bold">{step.tag}</div>
                    <h3 className="text-sm sm:text-base font-bold mb-2 text-slate-900 group-hover:text-indigo-600 transition-colors duration-300">{step.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed flex-1">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 relative z-10 px-4 sm:px-6">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 bg-white shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/60 pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

                <div className="relative px-5 py-10 sm:px-12 sm:py-16 lg:px-20 lg:py-20">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-center">
                    {/* Left: Text */}
                    <div className="text-center lg:text-left">
                      <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-indigo-600 font-mono text-[9px] uppercase tracking-[0.3em] font-bold">Available for New Projects</span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight leading-tight">
                        Have a project in mind?{' '}
                        <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-600">
                          Let&apos;s talk.
                        </span>
                      </h2>

                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
                        Book a free 30-minute discovery call. We&apos;ll review your requirements, suggest the right tech approach, and give you a ballpark estimate — all before you commit to anything.
                      </p>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3">
                        <Button
                          asChild
                          size="lg"
                          className="h-12 px-6 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-md text-xs sm:text-sm border-0 gap-2 cursor-pointer"
                        >
                          <Link href="/contact" className="flex items-center justify-center">
                            Book Free Discovery Call <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          size="lg"
                          className="h-12 px-6 rounded-xl border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold shadow-xs cursor-pointer"
                        >
                          <Link href="/projects" className="flex items-center justify-center">See Our Work</Link>
                        </Button>
                      </div>
                    </div>

                    {/* Right: Trust checklist */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 sm:p-7 space-y-3.5">
                      <div className="text-slate-900 font-bold text-xs sm:text-sm mb-3">What happens after you reach out:</div>
                      {[
                        { icon: CheckCircle2, title: 'Response within 4 hours', desc: 'We reply fast — no waiting days for a callback.' },
                        { icon: Zap, title: '30-min discovery call', desc: 'A focused call to understand your needs and goals.' },
                        { icon: Server, title: 'Detailed proposal in 48hrs', desc: 'Scope, timeline, stack, and fixed price — no fluff.' },
                        { icon: Shield, title: 'NDA available on request', desc: 'Your ideas are protected from day one.' },
                      ].map(({ icon: Icon, title, desc }) => (
                        <div key={title} className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                            <Icon className="w-3.5 h-3.5 text-indigo-600" />
                          </div>
                          <div>
                            <div className="text-slate-900 font-semibold text-xs sm:text-sm">{title}</div>
                            <div className="text-slate-500 text-[11px] sm:text-xs leading-relaxed">{desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
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
