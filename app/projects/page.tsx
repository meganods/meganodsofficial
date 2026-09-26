"use client"

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider'
import { Button } from '@/components/ui/button'
import { DeepTechBackground } from '@/components/ui/deep-tech-background'
import { 
  ArrowRight, 
  ArrowUpRight, 
  Filter, 
  Layers, 
  Rocket, 
  Loader2, 
  Database, 
  ExternalLink,
  Sparkles,
  Zap,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Globe,
  Cpu,
  Code2,
  Server,
  Activity
} from 'lucide-react'
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { defaultProjects, ProjectNode } from "@/lib/data/projects";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [projects, setProjects] = useState<ProjectNode[]>(defaultProjects)
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState<string[]>(['All', ...new Set(defaultProjects.map(p => p.category))])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, "projects"), orderBy("order", "asc"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const priorityProjects = defaultProjects.slice(0, 3);
        const prioritySlugs = new Set(priorityProjects.map(p => p.slug));

        if (!querySnapshot.empty) {
          const docs = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as ProjectNode[];
          
          const otherDocs = docs.filter((d: ProjectNode) => !prioritySlugs.has(d.slug));
          const merged = [...priorityProjects, ...otherDocs];
          setProjects(merged);
          
          // Extract unique categories
          const cats = ['All', ...new Set(merged.map(p => p.category).filter(Boolean))];
          setCategories(cats);
        } else {
          setProjects(defaultProjects);
          setCategories(['All', ...new Set(defaultProjects.map(p => p.category))]);
        }
      } catch (error) {
        console.error("REGISTRY_FETCH_ERROR:", error);
        setProjects(defaultProjects);
      }
    }
    fetchProjects();
  }, [])

  const filteredProjects = activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory)

  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio-grid')
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
                  <span className="font-mono text-[11px] tracking-wider uppercase text-slate-500 font-bold">PORTFOLIO LIVE</span>
                  <span className="text-slate-300">|</span>
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent font-black tracking-wide">
                    35+ Shipped Products
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
                  Architect • Validate • Scale • <span className="text-emerald-500 font-black">Ship</span>
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
                    <span className="block text-slate-900 drop-shadow-sm">Proven Impact.</span>
                    <span className="relative inline-block mt-1 font-extrabold italic bg-gradient-to-r from-blue-600 via-indigo-600 via-purple-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent animate-gradient-flow drop-shadow-sm">
                      Real Digital Products.
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
                  Explore our portfolio of production-grade <span className="font-semibold text-slate-900">SaaS platforms</span>, <span className="font-semibold text-slate-900">AI workflows</span>, mobile applications, and enterprise software — engineered from architecture to global deployment.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.26 }}
                  className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
                >
                  <Button
                    onClick={scrollToPortfolio}
                    size="lg"
                    className="h-12 px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-xl shadow-blue-500/20 text-sm border-0 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    Explore Case Studies <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-12 px-6 rounded-xl border-slate-200 bg-white/90 hover:bg-slate-50 text-slate-700 text-sm font-semibold shadow-sm flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
                    >
                      <ChevronRight className="h-4 w-4 text-indigo-600" />
                      Discuss Your Project
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
                    { value: '35+', label: 'Shipped Products' },
                    { value: '99.8%', label: 'On-Time Delivery' },
                    { value: '4.9/5', label: 'Client Rating' },
                    { value: '100%', label: 'IP Ownership' },
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
                {/* Floating badge 1: Speed */}
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-0 -left-2 xl:-left-6 z-20 hidden lg:flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-indigo-200/90 shadow-xl shadow-indigo-500/10"
                >
                  <div className="w-7 h-7 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[8px] font-mono font-bold uppercase text-slate-400">Time-To-Market</p>
                    <p className="text-xs font-black text-slate-900">4–8 Weeks</p>
                  </div>
                </motion.div>

                {/* Floating badge 2: Quality */}
                <motion.div
                  animate={{ y: [6, -6, 6] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute top-0 -right-2 xl:-right-6 z-20 hidden lg:flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-indigo-200/90 shadow-xl shadow-indigo-500/10"
                >
                  <div className="w-7 h-7 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[8px] font-mono font-bold uppercase text-slate-400">QA Standard</p>
                    <p className="text-xs font-black text-slate-900">Zero Defect</p>
                  </div>
                </motion.div>

                {/* Floating badge 3: Growth */}
                <motion.div
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-2 -left-2 xl:-left-6 z-20 hidden lg:flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-indigo-200/90 shadow-xl shadow-indigo-500/10"
                >
                  <div className="w-7 h-7 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[8px] font-mono font-bold uppercase text-slate-400">Client Impact</p>
                    <p className="text-xs font-black text-slate-900">3.4x Avg ROI</p>
                  </div>
                </motion.div>

                {/* Central interactive project preview cards */}
                <div className="relative w-full max-w-md space-y-3">
                  {[
                    { 
                      icon: Code2, 
                      title: 'Enterprise CRM & Collaboration', 
                      metrics: '10k+ Daily Users · 99.99% Uptime',
                      tech: 'Next.js · Node · PostgreSQL',
                      color: 'from-blue-500 to-indigo-600',
                      status: 'Live in Production'
                    },
                    { 
                      icon: Activity, 
                      title: 'HealthTech & Telemedicine', 
                      metrics: 'Sub-second AI Inference · HIPAA Ready',
                      tech: 'FastAPI · PyTorch · Tailwind',
                      color: 'from-purple-500 to-indigo-600',
                      status: 'High Performance'
                    },
                    { 
                      icon: Globe, 
                      title: 'Multi-Vendor eCommerce', 
                      metrics: '500k+ Transactions Processed',
                      tech: 'React Native · Go · Stripe',
                      color: 'from-cyan-500 to-blue-600',
                      status: 'Global Scale'
                    },
                    { 
                      icon: Cpu, 
                      title: 'AI Automation & Copilots', 
                      metrics: '85% Workflow Reduction',
                      tech: 'LangChain · OpenAI · AWS',
                      color: 'from-emerald-500 to-teal-600',
                      status: 'Enterprise Deployed'
                    },
                  ].map(({ icon: Icon, title, metrics, tech, color, status }, i) => (
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
                              {status}
                            </span>
                          </div>
                          <div className="text-indigo-600 font-mono text-[9.5px] font-semibold mt-0.5 truncate">{metrics}</div>
                          <div className="text-slate-400 font-mono text-[8.5px] uppercase tracking-wider mt-0.5 truncate">{tech}</div>
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
                      Explore All Deployments Below
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
                  title: 'Production-Grade Engineering', 
                  desc: 'Engineered with clean, modular architecture, complete test suites, and high-concurrency benchmarks.' 
                },
                { 
                  icon: ShieldCheck, 
                  title: '100% IP & Code Ownership', 
                  desc: 'Complete source repository handover, full documentation, and zero vendor lock-in from day one.' 
                },
                { 
                  icon: Server, 
                  title: 'Dedicated Post-Launch SLA', 
                  desc: '30-day warranty included, with proactive telemetry monitoring, security patches, and scaling support.' 
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

        {/* Tactical Filter Bar */}
        <section id="portfolio-grid" className="relative z-20 bg-background/90 backdrop-blur-md border-y border-border py-4">
          <div className="container mx-auto px-6 overflow-x-auto no-scrollbar">
            <div className="flex gap-2.5 min-w-max justify-center items-center">
              <Filter className="w-4 h-4 text-indigo-600 mr-1" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border cursor-pointer ${
                    activeCategory === category
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/20"
                      : "bg-card border-border text-muted-foreground hover:border-indigo-400 hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Deployment Cards */}
        <section className="py-20 lg:py-28 relative z-10">
          <div className="container mx-auto px-6 lg:px-8">
            {isLoading ? (
               <div className="flex flex-col items-center justify-center py-60 gap-8">
                  <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
                  <p className="text-xs font-mono text-indigo-500 uppercase tracking-[0.5em] animate-pulse">Loading Case Studies...</p>
               </div>
            ) : filteredProjects.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-40 gap-6 border border-dashed border-border rounded-3xl">
                  <Database className="w-12 h-12 text-muted-foreground/30" />
                  <div className="text-center">
                     <h3 className="text-xl font-bold text-foreground">No Case Studies Found</h3>
                     <p className="text-sm text-muted-foreground mt-2">No projects match the selected category.</p>
                  </div>
               </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                {filteredProjects.map((project, index) => (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
                    className="group h-full flex flex-col"
                  >
                    <Link href={`/projects/${project.slug || project.id}`} className="h-full block">
                      <div className="h-full flex flex-col justify-between bg-card/60 backdrop-blur-2xl border border-border/80 rounded-[2rem] overflow-hidden group-hover:border-indigo-400/50 group-hover:-translate-y-1.5 group-hover:shadow-2xl group-hover:shadow-indigo-500/10 transition-all duration-300 relative shadow-md">
                        {/* Project Visual Header */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                           <img
                              src={project.heroImage}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                           
                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" />
                           
                           {/* Badges on Visual Asset */}
                           <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                              <span className="px-3 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-md text-foreground text-[9px] font-mono font-bold uppercase tracking-wider rounded-lg shadow-sm border border-border/40">
                                 {project.category}
                              </span>
                              {project.liveUrl && (
                                 <button
                                    type="button"
                                    onClick={(e) => {
                                       e.preventDefault();
                                       e.stopPropagation();
                                       window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                                    }}
                                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold uppercase tracking-wider rounded-lg shadow-md flex items-center gap-1 transition-all hover:scale-105 z-20 cursor-pointer"
                                 >
                                    <span>Live</span>
                                    <ExternalLink className="w-2.5 h-2.5" />
                                 </button>
                              )}
                           </div>
                           
                           {/* Client Tag on Image Bottom */}
                           <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-white/90">
                              <span className="font-bold tracking-wider truncate drop-shadow-md">{project.client}</span>
                              <span className="text-emerald-400 font-bold drop-shadow-md text-[9px]">{project.year || '2025'}</span>
                           </div>
                        </div>
                        
                        {/* Project Card Body */}
                        <div className="p-6 flex-1 flex flex-col justify-between">
                           <div>
                              <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug tracking-tight mb-2 line-clamp-1">
                                {project.title}
                              </h3>
                              <p className="text-xs text-muted-foreground font-normal leading-relaxed line-clamp-2 mb-4">
                                {project.description}
                              </p>
                           </div>

                           {/* Card Footer / Telemetry */}
                           <div className="pt-4 border-t border-border/80 flex items-center justify-between gap-3">
                              <div className="flex flex-wrap gap-1.5">
                                 {project.results?.slice(0, 2).map((res: any, i: number) => (
                                   <div key={i} className="px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold font-mono">
                                      {res.metric}
                                   </div>
                                 ))}
                              </div>

                              <div className="w-8 h-8 rounded-xl bg-muted group-hover:bg-indigo-600 text-muted-foreground group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm shrink-0">
                                 <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                              </div>
                           </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Case Study CTA */}
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
                        <span className="text-indigo-600 font-mono text-[10px] uppercase tracking-[0.35em] font-bold">Start Your Project</span>
                      </motion.div>

                      <motion.h2
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, duration: 0.6 }}
                        className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight"
                      >
                        Ready to build your next{' '}
                        <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-600">
                          breakthrough product?
                        </span>
                      </motion.h2>

                      <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.22 }}
                        className="text-slate-500 text-sm sm:text-base leading-relaxed mb-6"
                      >
                        Let&apos;s discuss your technical requirements and turn your vision into a scalable, high-performance product. Book a free 30-minute discovery call with our engineering lead.
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
                            Book Free Discovery Call <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          size="lg"
                          className="h-12 px-6 rounded-xl border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold shadow-sm hover:scale-105 active:scale-95 transition-all"
                        >
                          <Link href="/services">Explore Services</Link>
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
                      <div className="text-slate-900 font-bold text-sm mb-4">What you get when partnering with us:</div>
                      {[
                        { icon: CheckCircle2, title: 'Rapid Prototyping & Architecture', desc: 'Clear system diagrams, tech stack choices, and roadmap.' },
                        { icon: Zap, title: 'Transparent Sprints & Live Demos', desc: 'Weekly progress demos so you always know where things stand.' },
                        { icon: Server, title: 'Cloud-Native & Production Scalable', desc: 'AWS/GCP infrastructure, automated CI/CD, zero downtime.' },
                        { icon: ShieldCheck, title: 'Full IP & Repository Handover', desc: 'You own 100% of all code, assets, and documentation.' },
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

