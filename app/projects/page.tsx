"use client"

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider'
import { Button } from '@/components/ui/button'
import { DeepTechBackground } from '@/components/ui/deep-tech-background'
import { ArrowRight, ArrowUpRight, Filter, Layers, Rocket, Loader2, Database, ExternalLink } from 'lucide-react'
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

  return (
    <SmoothScrollProvider>
      <Navigation />
      <main className="min-h-screen bg-background text-foreground selection:bg-emerald-500/30">
        <div className="fixed inset-0 pointer-events-none z-0">
           <DeepTechBackground />
        </div>

        {/* Hero Section - Refined Architecture Portfolio */}
        <section className="relative pt-32 lg:pt-48 pb-10 z-10 text-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 font-mono text-[10px] uppercase tracking-[0.4em] mb-10 shadow-[0_0_20px_rgba(16,185,129,0.05)]"
            >
               <Rocket className="w-4 h-4" />
               Global Operational Map
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight"
            >
              Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-cyan-500 to-blue-600">Case Studies</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-normal"
            >
              A visual chronicle of disruptive engineering. Explore our global deployments across healthcare, collaboration systems, and multi-vendor commerce.
            </motion.p>
        </section>

        {/* Tactical Filter Bar */}
        <section className="sticky top-[80px] z-50 bg-background/70 backdrop-blur-2xl border-y border-border py-4">
          <div className="container mx-auto px-6 overflow-x-auto no-scrollbar">
            <div className="flex gap-2.5 min-w-max justify-center items-center">
              <Filter className="w-4 h-4 text-emerald-600 mr-1" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border cursor-pointer ${
                    activeCategory === category
                      ? "bg-emerald-600 border-emerald-600 text-white shadow-md"
                      : "bg-card border-border text-muted-foreground hover:border-emerald-400 hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Deployment Cards */}
        <section className="py-20 lg:py-32 relative z-10">
          <div className="container mx-auto px-6 lg:px-8">
            {isLoading ? (
               <div className="flex flex-col items-center justify-center py-60 gap-8">
                  <Loader2 className="w-16 h-16 text-emerald-500 animate-spin" />
                  <p className="text-xs font-mono text-emerald-500 uppercase tracking-[0.5em] animate-pulse">Synchronizing with Distributed Mesh...</p>
               </div>
            ) : filteredProjects.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-60 gap-8 border border-dashed border-border rounded-[3rem]">
                  <Database className="w-16 h-16 text-muted-foreground/10" />
                  <div className="text-center">
                     <h3 className="text-3xl font-black text-foreground">Registry Idle</h3>
                     <p className="text-lg text-muted-foreground font-medium mt-4">No enterprise case studies detected for this sector.</p>
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
        <section className="py-32 lg:py-48 relative z-10 px-6">
           <div className="container mx-auto max-w-5xl">
              <div className="relative rounded-[3.5rem] lg:rounded-[4.5rem] border border-border bg-card/65 backdrop-blur-3xl overflow-hidden p-1 shadow-2xl">
                 <div className="relative px-8 py-24 lg:px-24 lg:py-32 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0%,transparent_70%)] pointer-events-none" />
                    <Layers className="w-16 h-16 text-emerald-500/20 mx-auto mb-10" />
                    
                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold text-foreground mb-10 tracking-tighter leading-[1]">
                       Ready for <br />
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-cyan-500 to-blue-600">Total Scale</span>.
                    </h2>
                    <p className="text-muted-foreground text-xl lg:text-2xl mb-16 max-w-3xl mx-auto font-medium leading-relaxed">
                       Deploy our engineering department to your unique organizational challenges today.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                       <Button 
                          asChild
                          className="h-20 px-12 bg-primary text-primary-foreground hover:bg-emerald-600 hover:text-white font-black rounded-[1.5rem] shadow-2xl transition-all text-lg group border-0"
                       >
                          <Link href="/contact" className="flex items-center">
                             Request Operational Audit
                             <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" />
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
