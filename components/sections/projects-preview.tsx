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
        if (!querySnapshot.empty) {
          const docs = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setProjects(docs);
        }
      } catch (error) {
        console.error("PROJECTS_FETCH_ERROR:", error);
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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12 mb-20 lg:mb-32">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="text-indigo-600 dark:text-indigo-400 font-mono text-[10px] uppercase tracking-[0.5em] mb-6 font-black leading-none flex items-center gap-4"
            >
              <div className="w-12 h-px bg-indigo-600/30 dark:bg-indigo-500/30" />
              GLOBAL PORTFOLIO
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-6xl md:text-8xl lg:text-[10rem] font-black text-foreground tracking-tighter leading-[0.8] uppercase"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/90 to-foreground/20">PROJECTS</span>.
            </motion.h2>
          </div>
          
          <div className="flex flex-col items-end gap-10">
            <div className="flex gap-4">
              <button
                 onClick={() => scroll('left')}
                 disabled={!canScrollLeft}
                 className={`w-16 h-16 rounded-full border flex items-center justify-center transition-all duration-500 ${canScrollLeft ? 'border-border text-foreground hover:bg-secondary active:scale-90 shadow-2xl' : 'border-border/40 text-muted-foreground/10 grayscale cursor-not-allowed'}`}
              >
                 <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                 onClick={() => scroll('right')}
                 disabled={!canScrollRight}
                 className={`w-16 h-16 rounded-full border flex items-center justify-center transition-all duration-500 ${canScrollRight ? 'border-border text-foreground hover:bg-secondary active:scale-90 shadow-2xl' : 'border-border/40 text-muted-foreground/10 grayscale cursor-not-allowed'}`}
              >
                 <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>

        {/* Cinematic Projects Carousel - Quad Column Layout */}
        {isLoading ? (
           <div className="flex flex-col items-center justify-center py-40 gap-8">
              <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
              <p className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.4em] animate-pulse font-black leading-none">Syncing Portfolio Mesh...</p>
           </div>
        ) : projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-40 gap-8 border border-dashed border-border rounded-[4rem]">
               <Database className="w-16 h-16 text-muted-foreground/5" />
               <div className="text-center">
                  <h3 className="text-4xl font-black text-foreground uppercase tracking-tighter">Registry Empty</h3>
                  <p className="text-xl text-muted-foreground/20 font-black uppercase mt-4 tracking-widest">No verified operational nodes detected.</p>
               </div>
            </div>
        ) : (
            <div 
              ref={scrollRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="flex gap-6 lg:gap-8 overflow-x-auto no-scrollbar scroll-smooth pb-20 -mx-6 px-6 lg:mx-0 lg:px-0"
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
                    <div className="relative aspect-[1/1.3] bg-card/40 backdrop-blur-3xl border border-border rounded-[3.5rem] overflow-hidden group-hover:border-indigo-600/30 dark:group-hover:border-indigo-500/30 transition-all duration-700 shadow-2xl flex flex-col">
                      <div className="relative aspect-square overflow-hidden">
                        {/* Identity Asset */}
                        <img 
                           src={project.heroImage} 
                           alt={project.title}
                           className="w-full h-full object-cover transition-transform duration-[1.5s] scale-110 group-hover:scale-100 grayscale-[40%] group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
                        />
                        
                        {/* HUD Overlays */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-30 group-hover:opacity-10 transition-all duration-700 pointer-events-none`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-card dark:from-[#05050a] via-transparent to-transparent opacity-90" />
 
                        {/* Visual Top Badges */}
                        {project.liveUrl && (
                          <div className="absolute top-8 left-8 z-10">
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/90 text-white text-[8px] font-mono font-black uppercase tracking-wider shadow-lg backdrop-blur-md">
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                              Live Platform
                            </span>
                          </div>
                        )}

                        {/* Visual Hover Target */}
                        <div className="absolute top-8 right-8 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700">
                           <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform">
                              <ArrowUpRight className="w-6 h-6" />
                           </div>
                        </div>
                      </div>

                      {/* Nodal Content - Refined for 1:1.3 aspect ratio */}
                      <div className="p-8 lg:p-10 flex-1 flex flex-col">
                        <div className="mb-4">
                           <h3 className="text-2xl font-black text-foreground tracking-tighter uppercase leading-[0.9] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-500 mb-2 truncate">
                             {project.title}
                           </h3>
                           <p className="text-[8px] font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-black opacity-60">{project.category}</p>
                        </div>
                        
                        <p className="text-xs font-black text-muted-foreground/60 uppercase tracking-tight mb-6 line-clamp-2 leading-relaxed transition-colors group-hover:text-muted-foreground/80">
                          {project.description}
                        </p>
                        
                        {/* Operational Telemetry HUD */}
                        <div className="mt-auto space-y-4 pt-6 border-t border-border">
                           <div className="flex items-center justify-between text-[9px] font-mono text-muted-foreground/40 uppercase tracking-widest font-black">
                              <div className="flex items-center gap-2">
                                 <ShieldCheck className="w-3 h-3 text-emerald-500" />
                                 {project.client}
                              </div>
                           </div>
 
                           <div className="grid grid-cols-2 gap-3">
                              {(project.results || []).slice(0, 2).map((res: any, i: number) => (
                                 <div key={i} className="p-3 rounded-2xl bg-muted/40 border border-border group-hover:border-indigo-600/20 dark:group-hover:border-indigo-500/20 transition-all">
                                    <div className="text-lg font-black text-foreground tracking-tighter uppercase mb-0.5">{res.metric}</div>
                                    <div className="text-[6px] text-muted-foreground/40 font-black uppercase tracking-widest">{res.label}</div>
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
