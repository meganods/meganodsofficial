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
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(
          collection(db, "projects"), 
          limit(12)
        );
        const querySnapshot = await getDocs(q);
        const priorityProjects = defaultProjects.slice(0, 3);
        const prioritySlugs = new Set(priorityProjects.map(p => p.slug));

        if (!querySnapshot.empty) {
          const docs = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as any[];
          docs.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          const otherDocs = docs.filter((d: any) => !prioritySlugs.has(d.slug));
          setProjects([...priorityProjects, ...otherDocs]);
        } else {
          setProjects(defaultProjects);
        }
      } catch {
        setProjects(defaultProjects);
      }
    }
    fetchProjects();
  }, [])

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);

      const item = scrollRef.current.querySelector('[data-project-card]') as HTMLElement | null;
      const step = item ? item.offsetWidth + 24 : clientWidth * 0.88;
      const newIndex = Math.round(scrollLeft / step);
      setActiveIndex(Math.min(Math.max(newIndex, 0), Math.max(projects.length - 1, 0)));
    }
  }

  // Smooth Step Scroll Protocol
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const item = container.querySelector('[data-project-card]') as HTMLElement | null;
      const step = item ? item.offsetWidth + 24 : container.clientWidth * 0.88;
      const scrollAmount = direction === 'left' ? -step : step;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  const scrollToProject = (idx: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const item = container.querySelector('[data-project-card]') as HTMLElement | null;
      const step = item ? item.offsetWidth + 24 : container.clientWidth * 0.88;
      container.scrollTo({ left: idx * step, behavior: 'smooth' });
      setActiveIndex(idx);
    }
  }

  // Autonomous Motion Protocol (one full card at a time)
  useEffect(() => {
    if (isLoading || projects.length === 0 || isHovered) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        const { scrollLeft, scrollWidth, clientWidth } = container;
        const maxScroll = scrollWidth - clientWidth;
        const item = container.querySelector('[data-project-card]') as HTMLElement | null;
        const step = item ? item.offsetWidth + 24 : clientWidth * 0.88;
        
        if (scrollLeft >= maxScroll - 20) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: step, behavior: 'smooth' });
        }
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isLoading, projects.length, isHovered]);

  useEffect(() => {
    const current = scrollRef.current;
    if (current) {
      current.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
      setTimeout(checkScroll, 300);
      return () => {
        current.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      }
    }
  }, [projects]);

  return (
    <section ref={containerRef} className="relative py-24 sm:py-32 lg:py-44 overflow-hidden bg-background" id="projects">
      <DeepTechBackground />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header HUD */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 sm:gap-8 mb-10 sm:mb-16 lg:mb-20">
          <div className="max-w-3xl text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="text-indigo-600 dark:text-indigo-400 font-mono text-[11px] uppercase tracking-[0.35em] mb-3 font-bold leading-none flex items-center justify-center md:justify-start gap-3"
            >
              <div className="w-8 h-px bg-indigo-600/50 dark:bg-indigo-400/50" />
              GLOBAL PORTFOLIO & CASE STUDIES
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight"
            >
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-400 font-extrabold">Projects</span>.
            </motion.h2>
            <p className="mt-3 text-xs sm:text-sm md:text-base text-muted-foreground max-w-xl font-normal mx-auto md:mx-0">
              High-impact digital platforms, AI architectures, and full-stack enterprise solutions.
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-3 self-center md:self-end">
            <button
               onClick={() => scroll('left')}
               disabled={!canScrollLeft}
               className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 ${canScrollLeft ? 'border-border bg-card/80 text-foreground hover:bg-secondary hover:border-indigo-400 shadow-md active:scale-95 cursor-pointer' : 'border-border/40 text-muted-foreground/30 cursor-not-allowed opacity-50'}`}
               aria-label="Scroll left"
            >
               <ChevronLeft className="w-5 h-5" />
            </button>
            <button
               onClick={() => scroll('right')}
               disabled={!canScrollRight}
               className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 ${canScrollRight ? 'border-border bg-card/80 text-foreground hover:bg-secondary hover:border-indigo-400 shadow-md active:scale-95 cursor-pointer' : 'border-border/40 text-muted-foreground/30 cursor-not-allowed opacity-50'}`}
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
              className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-8 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  data-project-card
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.05 * index }}
                  className="flex-shrink-0 w-[84vw] max-w-[340px] sm:w-[320px] md:w-[350px] lg:w-[340px] xl:w-[360px] snap-center sm:snap-start group relative"
                >
                  <Link href={`/projects/${project.slug || project.id}`} className="block h-full">
                    <div className="h-full bg-card/70 backdrop-blur-2xl border border-border/90 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden group-hover:border-indigo-500/50 transition-all duration-500 shadow-lg hover:shadow-2xl flex flex-col justify-between">
                      <div>
                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                          {/* Identity Asset */}
                          <img 
                             src={project.heroImage} 
                             alt={project.title}
                             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                             loading="lazy"
                          />
                          
                          {/* Subtle Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
   
                          {/* Visual Top Badges */}
                          {project.liveUrl && (
                            <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-500/90 text-white text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider shadow-md backdrop-blur-md">
                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                                Live System
                              </span>
                            </div>
                          )}

                          {/* Visual Hover Target */}
                          <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                             <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform">
                                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                             </div>
                          </div>
                        </div>

                        {/* Nodal Content */}
                        <div className="p-4 sm:p-6">
                          <p className="text-[9px] sm:text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-bold mb-1">
                            {project.category}
                          </p>
                          <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 mb-2 line-clamp-1">
                            {project.title}
                          </h3>
                          <p className="text-xs text-muted-foreground font-normal leading-relaxed line-clamp-2">
                            {project.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Operational Telemetry HUD */}
                      <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-3 border-t border-border/80 space-y-2.5 sm:space-y-3">
                         <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-wider font-semibold">
                            <div className="flex items-center gap-1.5 truncate pr-2">
                               <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                               <span className="truncate">{project.client}</span>
                            </div>
                            <span className="text-indigo-600 dark:text-indigo-400 font-bold shrink-0">{project.year || '2025'}</span>
                         </div>

                         <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                            {(project.results || []).slice(0, 2).map((res: any, i: number) => (
                               <div key={i} className="p-2 sm:p-2.5 rounded-xl bg-muted/50 border border-border/80 group-hover:border-indigo-400/30 transition-all">
                                  <div className="text-xs sm:text-sm font-bold text-foreground tracking-tight truncate">{res.metric}</div>
                                  <div className="text-[7.5px] sm:text-[8px] text-muted-foreground font-medium uppercase tracking-wider truncate">{res.label}</div>
                               </div>
                            ))}
                         </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
        )}

        {/* Global Hub Actions */}
        <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
           {/* Dynamic Pagination Stepper */}
           <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-2">
              {projects.map((_, i) => (
                 <button
                    key={i}
                    onClick={() => scrollToProject(i)}
                    aria-label={`Go to project ${i + 1}`}
                    className="py-3 px-1 flex items-center justify-center focus:outline-none cursor-pointer"
                 >
                    <span
                       className={`block h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 sm:w-12 bg-indigo-600 dark:bg-indigo-500' : 'w-2 bg-border hover:bg-indigo-400'}`}
                    />
                 </button>
              ))}
           </div>
           
           <Link href="/projects" className="group w-full sm:w-auto">
              <Button 
                 variant="outline" 
                 className="w-full sm:w-auto h-12 px-6 rounded-2xl border-border hover:bg-secondary text-foreground font-bold text-xs uppercase tracking-[0.2em] gap-3 transition-all cursor-pointer"
              >
                 View All Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Button>
           </Link>
        </div>
      </div>
    </section>
  )
}
