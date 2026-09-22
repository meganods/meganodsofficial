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
              className="text-4xl md:text-6xl lg:text-8xl font-black mb-8 tracking-tighter leading-[1.1]"
            >
              Enterprise <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-cyan-500 to-blue-600">Case Studies</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-16 leading-relaxed font-medium"
            >
              A visual chronicle of disruptive engineering. Explore our global deployments across healthcare, urban infrastructure, and high-finance security.
            </motion.p>
        </section>

        {/* Tactical Filter Bar */}
        <section className="sticky top-[80px] z-50 bg-background/60 backdrop-blur-3xl border-y border-border py-6">
          <div className="container mx-auto px-6 overflow-x-auto no-scrollbar">
            <div className="flex gap-3 min-w-max justify-center items-center">
              <Filter className="w-4 h-4 text-emerald-600 mr-2" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 border ${
                    activeCategory === category
                      ? "bg-emerald-500 border-emerald-500 text-white shadow-2xl shadow-emerald-500/20 scale-105"
                      : "bg-card border-border text-muted-foreground hover:border-emerald-500/30 hover:text-foreground"
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
              <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
                {filteredProjects.map((project, index) => (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative"
                  >
                    <Link href={`/projects/${project.slug}`}>
                      <div className="bg-card/85 backdrop-blur-xl border border-border rounded-[3rem] overflow-hidden p-1.5 hover:border-emerald-500/30 transition-all duration-500 shadow-2xl">
                        {/* Internal Image System */}
                        <div className="relative aspect-[16/10] overflow-hidden rounded-[2.8rem] bg-secondary border border-border">
                           <motion.img
                             src={project.heroImage}
                             alt={project.title}
                             className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                           />
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-95 pointer-events-none" />
                          
                          <div className="absolute top-8 left-8 flex flex-wrap gap-3">
                             <span className="px-5 py-2 bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-xl">
                                {project.category}
                             </span>
                             <span className="px-5 py-2 bg-secondary border border-border backdrop-blur-md text-foreground text-[9px] font-black uppercase tracking-widest rounded-lg">
                                {project.year} PROTOCOL
                             </span>
                             {project.liveUrl && (
                                <button
                                   type="button"
                                   onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                                   }}
                                   className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-xl flex items-center gap-1.5 transition-all hover:scale-105 z-20 cursor-pointer"
                                >
                                   <span>Live System</span>
                                   <ExternalLink className="w-3 h-3" />
                                </button>
                             )}
                          </div>
                          
                          <div className="absolute bottom-10 left-10 right-10">
                             <div className="text-emerald-600 font-mono text-[9px] uppercase tracking-[0.4em] mb-3 flex items-center gap-3">
                                [ {project.client} ]
                                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                             </div>
                             <h3 className="text-3xl font-black text-foreground group-hover:text-emerald-600 transition-colors leading-[1.1] tracking-tighter">
                               {project.title}
                             </h3>
                          </div>
                        </div>
                        
                        {/* Project Performance Footer */}
                        <div className="p-10 lg:p-12">
                           <p className="text-muted-foreground text-base font-medium leading-relaxed mb-10 line-clamp-2">
                             {project.description}
                           </p>
                           <div className="flex flex-wrap items-center justify-between gap-6 pt-10 border-t border-border">
                              <div className="flex gap-3">
                                 {project.results?.slice(0, 2).map((res: any, i: number) => (
                                   <div key={i} className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                                      {res.metric}
                                   </div>
                                 ))}
                              </div>
                              <div className="flex items-center gap-5">
                                 <div className="flex -space-x-3">
                                    {project.technologies?.slice(0, 3).map((t: string, i: number) => (
                                      <div key={i} className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-[9px] font-black text-muted-foreground uppercase">
                                         {t.substring(0, 1)}
                                      </div>
                                    ))}
                                 </div>
                                 <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 shadow-xl">
                                    <ArrowUpRight className="w-6 h-6" />
                                 </div>
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
