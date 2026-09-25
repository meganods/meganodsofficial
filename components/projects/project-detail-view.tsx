"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { 
  ArrowLeft, 
  ExternalLink, 
  Users, 
  Clock, 
  ArrowRight, 
  Loader2, 
  Database, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  GitBranch, 
  Rocket, 
  Activity, 
  Server 
} from "lucide-react"
import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs, limit } from "firebase/firestore"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { defaultProjects, ProjectNode } from "@/lib/data/projects"

interface ProjectDetailViewProps {
  initialProject?: ProjectNode | null
  initialRelatedProjects?: ProjectNode[]
  slug: string
}

export function ProjectDetailView({
  initialProject,
  initialRelatedProjects,
  slug,
}: ProjectDetailViewProps) {
  const [project, setProject] = useState<ProjectNode | null>(
    () => initialProject || defaultProjects.find((p) => p.slug === slug) || null
  )
  const [relatedProjects, setRelatedProjects] = useState<ProjectNode[]>(
    () =>
      initialRelatedProjects ||
      defaultProjects.filter((p) => p.slug !== slug).slice(0, 3)
  )
  const [isLoading, setIsLoading] = useState(!initialProject && !project)
  const [activeTab, setActiveTab] = useState<'overview' | 'workflow' | 'timeline'>('overview')

  useEffect(() => {
    if (initialProject) {
      setProject(initialProject)
      if (initialRelatedProjects) setRelatedProjects(initialRelatedProjects)
      setIsLoading(false)
      return
    }

    const fetchProjectData = async () => {
      try {
        const q = query(collection(db, "projects"), where("slug", "==", slug), limit(1))
        const querySnapshot = await getDocs(q)
        
        if (!querySnapshot.empty) {
          const projectData = querySnapshot.docs[0].data() as ProjectNode
          const fallback = defaultProjects.find((p) => p.slug === slug)
          setProject({ ...fallback, ...projectData })

          const relatedQ = query(collection(db, "projects"), limit(4))
          const relatedSnapshot = await getDocs(relatedQ)
          const related = relatedSnapshot.docs
            .map((doc) => doc.data() as ProjectNode)
            .filter((p) => p.slug !== slug)
            .slice(0, 3)
          if (related.length > 0) {
            setRelatedProjects(related)
          }
        }
      } catch (error) {
        console.error("FIREBASE_NODE_ERROR:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProjectData()
  }, [slug, initialProject, initialRelatedProjects])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-6 text-slate-800">
        <Loader2 className="w-16 h-16 text-indigo-600 animate-spin" />
        <p className="text-xs font-mono text-indigo-600 uppercase tracking-[0.5em] animate-pulse font-bold">
          Resolving Project Architecture...
        </p>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-6 text-slate-800">
        <Database className="w-16 h-16 text-slate-300" />
        <h2 className="text-3xl font-black text-slate-900">Project Not Found</h2>
        <Link href="/projects">
          <button className="h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-mono text-xs uppercase tracking-widest font-bold shadow-lg transition-all cursor-pointer">
            Return to Projects Archive
          </button>
        </Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50/80 via-white to-slate-50/60 text-slate-900 selection:bg-indigo-500/20">
      <Navigation />
      
      {/* Background Isometric Perspective Grid */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #4f46e5 1px, transparent 1px), linear-gradient(to bottom, #4f46e5 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
            backgroundPosition: 'center center',
          }}
        />
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-tr from-blue-200/30 via-indigo-200/25 to-purple-200/30 rounded-full blur-[140px]" />
      </div>

      {/* Hero Header Section */}
      <section className="relative pt-32 sm:pt-36 lg:pt-44 pb-8 px-6 lg:px-12">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-10"
          >
            {/* Back link */}
            <Link 
              href="/projects"
              className="inline-flex items-center gap-2.5 text-[11px] font-mono font-bold text-slate-500 uppercase tracking-[0.3em] mb-8 hover:text-indigo-600 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Projects Registry</span>
            </Link>

            {/* Badges & Direct Launch Action */}
            <div className="flex flex-wrap items-center gap-3.5 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 border border-indigo-200/80 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
                <Zap className="w-3.5 h-3.5 text-indigo-600" />
                {project.category}
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                {project.year} PRODUCTION DEPLOYMENT
              </span>
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95"
                >
                  <span>Visit Live Platform</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Main Project Title & Tagline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-3 max-w-5xl">
              {project.title}
            </h1>
            {project.tagline && (
              <p className="text-base sm:text-lg text-indigo-600 font-medium mb-8 max-w-3xl">
                {project.tagline}
              </p>
            )}

            {/* Telemetry info bar */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 py-3.5 px-6 rounded-2xl bg-white/90 border border-slate-200/80 shadow-sm backdrop-blur-md max-w-3xl text-xs font-mono">
              <div className="flex items-center gap-2.5 text-slate-500">
                <Users className="w-4 h-4 text-indigo-600 shrink-0" />
                <span className="uppercase tracking-wider font-semibold">Client:</span>
                <span className="font-bold text-slate-900">{project.client}</span>
              </div>
              <div className="h-4 w-px bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-2.5 text-slate-500">
                <Clock className="w-4 h-4 text-indigo-600 shrink-0" />
                <span className="uppercase tracking-wider font-semibold">Duration:</span>
                <span className="font-bold text-slate-900">{project.duration}</span>
              </div>
              <div className="h-4 w-px bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-2.5 text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="uppercase tracking-wider font-semibold">Status:</span>
                <span className="font-bold text-emerald-600">Active Live</span>
              </div>
            </div>
          </motion.div>

          {/* Elevated Hero Screenshot Showcase */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9 }}
            className="relative aspect-[16/9] sm:aspect-[21/9] rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden border border-slate-200 shadow-2xl shadow-indigo-950/10 group mb-16 bg-slate-900"
          >
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* Interactive Navigation Tabs */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-y border-slate-200/80 px-6 py-3">
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Case Brief & Architecture
            </button>
            {project.workflow && project.workflow.length > 0 && (
              <button
                onClick={() => setActiveTab('workflow')}
                className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'workflow'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Process Workflow</span>
              </button>
            )}
            {project.timeline && project.timeline.length > 0 && (
              <button
                onClick={() => setActiveTab('timeline')}
                className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'timeline'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>Execution Timeline</span>
              </button>
            )}
          </div>

          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden md:inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700"
            >
              <span>{project.liveUrl.replace('https://', '').replace('/', '')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 lg:py-24 relative z-10 px-6 lg:px-12">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column (Content according to active tab) */}
            <div className="lg:col-span-8 space-y-16">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-16">
                  {/* Case Brief */}
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-mono font-bold uppercase tracking-widest mb-4">
                      <Sparkles className="w-3 h-3" />
                      EXECUTIVE SUMMARY
                    </div>
                    <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </motion.div>

                  {/* Highlights Grid */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-stretch">
                      {project.highlights.map((hl, i) => (
                        <div 
                          key={i} 
                          className="h-full p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl hover:border-indigo-300 transition-all duration-300 flex flex-col"
                        >
                          <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold mb-4 text-xs shrink-0 shadow-sm">
                            0{i + 1}
                          </div>
                          <h4 className="text-base font-bold text-slate-900 mb-2">{hl.title}</h4>
                          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed flex-1">{hl.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Challenge & Strategic Solution */}
                  <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                    {/* 1. The Challenge */}
                    <div className="h-full bg-white border border-slate-200/90 rounded-[2.5rem] p-8 lg:p-10 shadow-lg shadow-slate-200/50 flex flex-col hover:border-rose-300 hover:shadow-xl transition-all duration-300">
                      <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center font-black mb-6 text-xs shrink-0 shadow-sm">
                        01
                      </div>
                      <h3 className="text-lg font-black uppercase tracking-wider mb-3 text-slate-900">
                        The Core Challenge
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed flex-1">
                        {project.challenge}
                      </p>
                    </div>

                    {/* 2. Strategic Solution */}
                    <div className="h-full bg-white border border-slate-200/90 rounded-[2.5rem] p-8 lg:p-10 shadow-lg shadow-slate-200/50 flex flex-col hover:border-indigo-300 hover:shadow-xl transition-all duration-300">
                      <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-black mb-6 text-xs shrink-0 shadow-sm">
                        02
                      </div>
                      <h3 className="text-lg font-black uppercase tracking-wider mb-3 text-slate-900">
                        Strategic Solution
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed flex-1">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Core Architectural Features Matrix */}
                  {project.features && project.features.length > 0 && (
                    <div className="p-8 lg:p-10 rounded-[2.5rem] bg-white border border-slate-200/90 shadow-lg shadow-slate-200/40">
                      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                        <div>
                          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                            <Layers className="w-5 h-5 text-indigo-600" />
                            Architectural Capabilities Matrix
                          </h3>
                          <p className="text-xs text-slate-500 mt-1">Engineered core modules powering this deployment</p>
                        </div>
                        <span className="text-xs font-mono font-bold text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full">
                          {project.features.length} Modules Active
                        </span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4 items-stretch">
                        {project.features.map((feat: string, idx: number) => (
                          <div key={idx} className="h-full min-h-[58px] flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-indigo-300 hover:bg-white transition-all shadow-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span className="text-xs font-bold text-slate-800">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: WORKFLOW */}
              {activeTab === 'workflow' && project.workflow && (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-8">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-mono font-bold uppercase tracking-widest mb-4">
                      <Activity className="w-3 h-3" />
                      OPERATIONAL PIPELINE
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">Step-by-Step Execution Flow</h3>
                    <p className="text-sm text-slate-500 mt-1">How data and tasks seamlessly transition across stakeholders</p>
                  </div>

                  <div className="relative pl-6 sm:pl-8 border-l-2 border-indigo-200 space-y-8 my-6">
                    {project.workflow.map((item, idx) => (
                      <div key={idx} className="relative group">
                        {/* Node bullet */}
                        <div 
                          className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-md flex items-center justify-center text-[9px] font-mono font-bold text-white"
                          style={{ backgroundColor: item.color }}
                        />
                        
                        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-md group-hover:border-indigo-300 group-hover:shadow-lg transition-all">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-mono font-bold text-slate-400">STAGE {item.step}</span>
                            <span 
                              className="px-3 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm"
                              style={{ backgroundColor: item.color }}
                            >
                              {item.action}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-slate-900">{item.role}</h4>
                          <p className="text-xs text-slate-500 mt-1">
                            Responsible for initiating, reviewing, and advancing this critical pipeline state.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* TAB 3: TIMELINE */}
              {activeTab === 'timeline' && project.timeline && (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-8">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-mono font-bold uppercase tracking-widest mb-4">
                      <GitBranch className="w-3 h-3" />
                      ROADMAP & MILESTONES
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">Project Engineering Roadmap</h3>
                    <p className="text-sm text-slate-500 mt-1">Structured sprint lifecycle from initial concept to global scale</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6 items-stretch">
                    {project.timeline.map((phase, idx) => (
                      <div key={idx} className="h-full p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl hover:border-indigo-300 transition-all flex flex-col justify-between">
                        <div className="flex flex-col h-full">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-mono font-black uppercase text-indigo-600 px-3 py-1 bg-indigo-50 rounded-lg">
                              {phase.phase}
                            </span>
                            <Rocket className="w-4 h-4 text-slate-400" />
                          </div>
                          <h4 className="text-base font-bold text-slate-900 mb-2">{phase.title}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed flex-1">{phase.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

            </div>

            {/* Right Sidebar: Impact Metrics, Protocols & Live CTA */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-36">
              
              {/* Impact Metrics Card */}
              <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 rounded-[2.5rem] p-8 sm:p-10 text-white shadow-2xl shadow-indigo-600/25 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] mb-8 text-indigo-200 flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  KEY PERFORMANCE METRICS
                </h4>
                <div className="space-y-6 relative z-10">
                  {project.results?.map((res: any, i: number) => (
                    <div key={i} className="space-y-1 border-b border-white/15 pb-6 last:border-0 last:pb-0">
                      <div className="text-3xl sm:text-4xl font-black tracking-tight">{res.metric}</div>
                      <div className="text-xs font-mono uppercase tracking-wider text-indigo-200 font-semibold">{res.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Stack Card */}
              <div className="bg-white border border-slate-200/90 rounded-[2.5rem] p-8 shadow-lg shadow-slate-200/50">
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] mb-6 text-slate-500 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-indigo-600" />
                  TECHNOLOGIES & PROTOCOLS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech: string, i: number) => (
                    <span key={i} className="px-3.5 py-1.5 bg-slate-100 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl text-xs font-bold text-slate-800 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Live Platform Quick CTA Box */}
              {project.liveUrl && (
                <div className="p-8 rounded-[2.5rem] bg-indigo-50/90 border border-indigo-200 flex flex-col gap-4 text-center shadow-md">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <Server className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Production Ready</h4>
                    <p className="text-xs text-slate-600 mt-1">Explore this platform live in production environment.</p>
                  </div>
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
                  >
                    <span>Launch Live Platform</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}

            </aside>
          </div>
        </div>
      </section>

      {/* Gallery Feed (if present) */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-20 border-t border-slate-200/80 bg-slate-50/50">
          <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
            <h2 className="text-xs font-mono font-bold uppercase tracking-[0.5em] text-slate-400 mb-12 text-center">
              PROJECT VISUAL ARTIFACTS
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {project.gallery.map((img: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative aspect-video rounded-[2rem] overflow-hidden group border border-slate-200 shadow-xl bg-slate-900"
                >
                  <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Project visual screenshot" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial Section */}
      {project.testimonial && (
        <section className="py-24 lg:py-32 border-t border-slate-200/80 bg-white relative z-10 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-8">
              <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto" />
              <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-snug">
                "{project.testimonial.quote}"
              </blockquote>
              <div className="flex flex-col items-center gap-3 pt-2">
                <div className="w-14 h-14 rounded-full border-2 border-indigo-200 p-0.5 shadow-md">
                  <img src={project.testimonial.avatar} className="w-full h-full rounded-full object-cover" alt={project.testimonial.author} />
                </div>
                <div>
                  <div className="text-base font-black text-slate-900">{project.testimonial.author}</div>
                  <div className="text-xs font-mono text-indigo-600 font-bold uppercase tracking-wider">{project.testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Related Projects Discovery */}
      {relatedProjects.length > 0 && (
        <section className="py-24 bg-slate-50/70 border-t border-slate-200/80 px-6 lg:px-12">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600 mb-1">DISCOVER MORE</p>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">Related Case Studies</h3>
              </div>
              <Link href="/projects" className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedProjects.map((rel: any, idx: number) => (
                <Link key={idx} href={`/projects/${rel.slug || rel.id}`} className="group">
                  <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-md group-hover:shadow-xl group-hover:border-indigo-300 transition-all duration-300 flex flex-col h-full">
                    <div className="aspect-[16/10] overflow-hidden bg-slate-900 relative">
                      <img src={rel.heroImage} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/95 text-slate-900 font-bold text-[9px] uppercase tracking-wider rounded-lg shadow-sm">
                          {rel.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">
                          {rel.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {rel.description}
                        </p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                        <span>Read Case Study</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
