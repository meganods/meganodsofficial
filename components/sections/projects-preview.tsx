"use client"

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, ExternalLink, ChevronLeft, ChevronRight, Loader2, Database, Layers, Target, ShieldCheck, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DeepTechBackground } from '@/components/ui/deep-tech-background'
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { defaultProjects } from "@/lib/data/projects";

export function ProjectsPreviewSection() {
  const containerRef = useRef(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  
  const [projects, setProjects] = useState<any[]>(defaultProjects)
  const [isLoading, setIsLoading] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(
          collection(db, "projects"), 
          orderBy("order", "asc"),
          orderBy("createdAt", "desc"),
          limit(12)
        );
        const querySnapshot = await getDocs(q);
        const priorityProjects = defaultProjects.slice(0, 3);
        const prioritySlugs = new Set(priorityProjects.map(p => p.slug));

        if (!querySnapshot.empty) {
          const docs = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          const otherDocs = docs.filter((d: any) => !prioritySlugs.has(d.slug));
          setProjects([...priorityProjects, ...otherDocs]);
        } else {
          setProjects(defaultProjects);
        }
      } catch (error) {
        console.error("PROJECTS_FETCH_ERROR:", error);
        setProjects(defaultProjects);
      }
    }
    fetchProjects();
  }, [])

  // Autonomous Motion Protocol
  useEffect(() => {
    if (isLoading || projects.length === 0 || isHovered) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;
        
        if (scrollLeft >= maxScroll - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: clientWidth * 0.25, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isLoading, projects.length, isHovered]);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.5 : clientWidth * 0.5;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  useEffect(() => {
    const current = scrollRef.current;
    if (current) {
      current.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      setTimeout(checkScroll, 500);
      return () => {
        current.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      }
    }
  }, [projects]);

  const gradients = [
    'from-indigo-600 to-cyan-500',
    'from-emerald-600 to-teal-500',
    'from-amber-600 to-orange-500',
    'from-purple-600 to-pink-500',
    'from-blue-600 to-indigo-500',
    'from-rose-600 to-orange-500'
  ];

  return (
    <section ref={containerRef} className="relative py-32 lg:py-48 overflow-hidden bg-background" id="projects">
      <DeepTechBackground />

      <div className="relative container mx-auto px-6 lg:px-8">
        {/* Section Header HUD */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 lg:mb-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="text-indigo-600 dark:text-indigo-400 font-mono text-[11px] uppercase tracking-[0.35em] mb-4 font-bold leading-none flex items-center gap-3"
            >
              <div className="w-8 h-px bg-indigo-600/50 dark:bg-indigo-400/50" />
              GLOBAL PORTFOLIO & CASE STUDIES
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05]"
            >
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-400 font-extrabold">Projects</span>.
            </motion.h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl font-normal">
              High-impact digital platforms, AI architectures, and full-stack enterprise solutions.
            </p>
          </div>
          
          <div className="flex items-center gap-3 self-end">
            <button
               onClick={() => scroll('left')}
               disabled={!canScrollLeft}
               className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 ${canScrollLeft ? 'border-border bg-card/80 text-foreground hover:bg-secondary hover:border-indigo-400 shadow-md active:scale-95 cursor-pointer' : 'border-border/40 text-muted-foreground/30 cursor-not-allowed'}`}
               aria-label="Scroll left"
            >
               <ChevronLeft className="w-5 h-5" />
            </button>
            <button
               onClick={() => scroll('right')}
               disabled={!canScrollRight}
               className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 ${canScrollRight ? 'border-border bg-card/80 text-foreground hover:bg-secondary hover:border-indigo-400 shadow-md active:scale-95 cursor-pointer' : 'border-border/40 text-muted-foreground/30 cursor-not-allowed'}`}
               aria-label="Scroll right"
            >
               <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cinematic Projects Carousel - Quad Column Layout */}
        {isLoading ? (
           <div className="flex flex-col items-center justify-center py-40 gap-8">
              <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
              <p className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.4em] animate-pulse font-bold leading-none">Syncing Portfolio...</p>
           </div>
        ) : projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-40 gap-8 border border-dashed border-border rounded-[4rem]">
               <Database className="w-16 h-16 text-muted-foreground/20" />
               <div className="text-center">
                  <h3 className="text-3xl font-bold text-foreground">Registry Empty</h3>
                  <p className="text-sm text-muted-foreground mt-2">No verified operational projects detected.</p>
               </div>
            </div>
        ) : (
            <div 
              ref={scrollRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="flex gap-6 lg:gap-8 overflow-x-auto no-scrollbar scroll-smooth pb-16 -mx-6 px-6 lg:mx-0 lg:px-0"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.05 * index }}
                  className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[22vw] group relative"
                >
                  <Link href={`/projects/${project.slug || project.id}`}>
                    <div className="relative aspect-[1/1.3] bg-card/60 backdrop-blur-2xl border border-border/90 rounded-[2.5rem] overflow-hidden group-hover:border-indigo-500/50 transition-all duration-500 shadow-xl hover:shadow-2xl flex flex-col">
                      <div className="relative aspect-[16/11] overflow-hidden bg-slate-900">
                        {/* Identity Asset */}
                        <img 
                           src={project.heroImage} 
                           alt={project.title}
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        
                        {/* Subtle Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
 
                        {/* Visual Top Badges */}
                        {project.liveUrl && (
                          <div className="absolute top-5 left-5 z-10">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/90 text-white text-[9px] font-mono font-bold uppercase tracking-wider shadow-md backdrop-blur-md">
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                              Live System
                            </span>
                          </div>
                        )}

                        {/* Visual Hover Target */}
                        <div className="absolute top-5 right-5 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                           <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform">
                              <ArrowUpRight className="w-5 h-5" />
                           </div>
                        </div>
                      </div>

                      {/* Nodal Content */}
                      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-bold mb-1.5">
                            {project.category}
                          </p>
                          <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 mb-2 line-clamp-1">
                            {project.title}
                          </h3>
                          <p className="text-xs text-muted-foreground font-normal leading-relaxed line-clamp-2 mb-4">
                            {project.description}
                          </p>
                        </div>
                        
                        {/* Operational Telemetry HUD */}
                        <div className="pt-4 border-t border-border/80 space-y-3">
                           <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-wider font-semibold">
                              <div className="flex items-center gap-1.5">
                                 <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                 <span className="truncate max-w-[130px]">{project.client}</span>
                              </div>
                              <span className="text-indigo-600 font-bold">{project.year || '2025'}</span>
                           </div>
 
                           <div className="grid grid-cols-2 gap-2">
                              {(project.results || []).slice(0, 2).map((res: any, i: number) => (
                                 <div key={i} className="p-2.5 rounded-xl bg-muted/50 border border-border/80 group-hover:border-indigo-400/30 transition-all">
                                    <div className="text-sm font-bold text-foreground tracking-tight">{res.metric}</div>
                                    <div className="text-[8px] text-muted-foreground font-medium uppercase tracking-wider truncate">{res.label}</div>
                                 </div>
                              ))}
                           </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
        )}

        {/* Global Hub Actions */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-12">
           <div className="flex gap-2">
              <div className="h-1.5 w-16 bg-indigo-600 dark:bg-indigo-500 rounded-full" />
              <div className="h-1.5 w-4 bg-border rounded-full" />
              <div className="h-1.5 w-4 bg-border rounded-full" />
           </div>
           
           <Link href="/projects" className="group">
              <Button 
                 variant="ghost" 
                 className="h-20 px-12 rounded-[2rem] border border-border hover:bg-secondary text-muted-foreground/40 hover:text-foreground font-black text-xs uppercase tracking-[0.5em] gap-6 transition-all"
              >
                 Registry Access <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
              </Button>
           </Link>
        </div>
      </div>
    </section>
  )
}
