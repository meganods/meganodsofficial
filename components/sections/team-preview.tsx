"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowRight, 
  Linkedin, 
  Twitter, 
  Github, 
  Mail, 
  Users, 
  Loader2, 
  Database,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { collection, query, orderBy, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import { DeepTechBackground } from '@/components/ui/deep-tech-background'

import { defaultTeam } from '@/lib/data/team'

export function TeamPreviewSection() {
  const [members, setMembers] = useState<any[]>(defaultTeam)
  const [isLoading, setIsLoading] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  
  const [isPaused, setIsPaused] = useState(false)
  
  const ref = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const q = query(collection(db, "team"), orderBy("order", "asc"));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docs = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          if (docs.length > 0) {
            setMembers(docs);
          }
        }
      } catch (error) {
        console.warn("TEAM_PREVIEW_FALLBACK_DEFAULT:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTeam();
  }, [])

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    const maxScroll = scrollWidth - clientWidth;
    const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
    setScrollProgress(progress);
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < maxScroll - 10);
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const card = container.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : container.clientWidth * 0.85;
    const isAtEnd = container.scrollLeft >= container.scrollWidth - container.clientWidth - 20;
    
    if (direction === 'right' && isAtEnd) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      container.scrollBy({
        left: direction === 'left' ? -step : step,
        behavior: 'smooth'
      });
    }
  }

  useEffect(() => {
    if (isLoading || members.length === 0 || isPaused) return;
    
    const interval = setInterval(() => {
      scroll('right');
    }, 5000);

    return () => clearInterval(interval);
  }, [isLoading, members.length, isPaused])

  return (
    <section ref={ref} className="relative py-24 sm:py-32 lg:py-44 bg-background overflow-hidden" id="team">
      <DeepTechBackground />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-24">
          <div className="max-w-2xl text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="text-indigo-600 dark:text-indigo-400 font-mono text-[11px] uppercase tracking-[0.35em] mb-3 font-bold flex items-center justify-center md:justify-start gap-3"
            >
              <div className="w-8 h-px bg-indigo-600/50" />
              LEADERSHIP & ENGINEERING SQUAD
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight"
            >
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600">Leadership Hub</span>.
            </motion.h2>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <div className="hidden sm:flex items-center gap-2">
                <button 
                  onClick={() => {
                    scroll('left');
                    setIsPaused(true);
                  }}
                  disabled={!canScrollLeft}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border border-border flex items-center justify-center text-foreground hover:bg-secondary hover:border-indigo-400 transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-sm active:scale-95 cursor-pointer"
                  aria-label="Previous team member"
                >
                   <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => {
                    scroll('right');
                    setIsPaused(true);
                  }}
                  disabled={!canScrollRight}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border border-border flex items-center justify-center text-foreground hover:bg-secondary hover:border-indigo-400 transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-sm active:scale-95 cursor-pointer"
                  aria-label="Next team member"
                >
                   <ChevronRight className="w-5 h-5" />
                </button>
             </div>
             
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={isInView ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.5, delay: 0.2 }}
               className="w-full sm:w-auto"
             >
               <Button 
                 asChild
                 variant="outline"
                 className="w-full sm:w-auto border-border hover:bg-secondary text-foreground h-12 sm:h-13 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold uppercase tracking-widest text-[10px] cursor-pointer"
               >
                 <Link href="/team">
                   Explore Full Directory
                   <ArrowRight className="ml-2 w-4 h-4" />
                 </Link>
               </Button>
             </motion.div>
          </div>
        </div>

        {/* Carousel Technical Track */}
        <div 
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
            {isLoading ? (
               <div className="flex flex-col items-center justify-center py-40 gap-8">
                  <Loader2 className="w-16 h-16 text-indigo-600 dark:text-indigo-500 animate-spin" />
                  <p className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.5em] animate-pulse font-black">Decrypting Personnel Mesh...</p>
               </div>
            ) : members.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-40 gap-8 border border-dashed border-border rounded-[3rem]">
                  <Database className="w-16 h-16 text-muted-foreground/5" />
                  <p className="text-sm text-muted-foreground/20 font-bold font-mono uppercase tracking-[0.3em]">Leadership Registry Idle</p>
               </div>
            ) : (
              <>
                 <div 
                   ref={carouselRef}
                   onScroll={handleScroll}
                   className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto pb-8 pt-2 no-scrollbar cursor-grab active:cursor-grabbing snap-x snap-mandatory -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
                   style={{ WebkitOverflowScrolling: 'touch' }}
                 >
                     {members.map((member, index) => (
                       <motion.div
                         key={member.id}
                         initial={{ opacity: 0, x: 50 }}
                         animate={isInView ? { opacity: 1, x: 0 } : {}}
                         transition={{ duration: 0.5, delay: 0.08 * index }}
                         className="flex-shrink-0 w-[82vw] max-w-[320px] sm:w-[320px] md:w-[360px] snap-center sm:snap-start"
                       >
                         <Link href={`/team/${member.id}`} className="block h-full">
                           <div className="bg-card/80 backdrop-blur-3xl border border-border/90 rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-7 h-full flex flex-col justify-between hover:border-indigo-600/30 dark:hover:border-indigo-500/30 transition-all duration-500 overflow-hidden relative shadow-lg hover:shadow-2xl group/card cursor-pointer">
                              <div className={`absolute -inset-1 bg-gradient-to-br ${member.gradient || 'from-indigo-500 to-blue-500'} opacity-0 group-hover/card:opacity-10 transition-opacity blur-2xl pointer-events-none`} />
                              
                              <div>
                                {/* Visual Profile Node */}
                                <div className="relative mb-5 sm:mb-6 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden aspect-square border border-border shadow-md bg-muted">
                                   <img 
                                     src={member.avatarUrl || `https://i.pravatar.cc/400?${member.name?.toLowerCase().includes('virat') ? 'img=11' : `u=${encodeURIComponent(member.name)}`}`} 
                                     className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105" 
                                     alt={member.name} 
                                     loading="lazy"
                                   />
                                   
                                   {/* Social HUD Overlay */}
                                   <div className="absolute inset-0 bg-background/50 dark:bg-black/50 flex items-center justify-center gap-3 opacity-0 group-hover/card:opacity-100 transition-all duration-300 backdrop-blur-xs" onClick={(e) => e.preventDefault()}>
                                      {member.social?.linkedin && (
                                        <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(member.social.linkedin, '_blank'); }} className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-secondary border border-border flex items-center justify-center text-foreground hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 hover:scale-110 transition-all shadow-md cursor-pointer">
                                           <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </span>
                                      )}
                                      {member.social?.twitter && (
                                        <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(member.social.twitter, '_blank'); }} className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-secondary border border-border flex items-center justify-center text-foreground hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 hover:scale-110 transition-all shadow-md cursor-pointer">
                                           <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </span>
                                      )}
                                      {member.social?.github && (
                                        <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(member.social.github, '_blank'); }} className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-secondary border border-border flex items-center justify-center text-foreground hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:scale-110 transition-all shadow-md cursor-pointer">
                                           <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </span>
                                      )}
                                      {member.social?.email && (
                                        <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = `mailto:${member.social.email}`; }} className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-secondary border border-border flex items-center justify-center text-foreground hover:bg-rose-600 hover:text-white dark:hover:bg-rose-500 hover:scale-110 transition-all shadow-md cursor-pointer">
                                           <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </span>
                                      )}
                                   </div>
                                </div>
     
                                <div className="text-indigo-600 dark:text-indigo-400 font-mono text-[9px] uppercase tracking-[0.3em] mb-2 font-black opacity-80 relative z-10">[ {member.meta || 'Strategic Node'} ]</div>
                                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1 group-hover/card:text-indigo-600 dark:group-hover/card:text-indigo-400 transition-colors relative z-10 leading-snug">{member.name}</h3>
                                <div className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.15em] mb-3 relative z-10 font-mono">{member.role}</div>
                                <p className="text-muted-foreground text-xs leading-relaxed font-normal relative z-10 line-clamp-3">{member.bio}</p>
                              </div>
                              
                              {/* Decorative Node ID */}
                              <div className="absolute top-6 right-6 text-2xl sm:text-3xl font-black text-foreground/[0.04] tracking-tight leading-none select-none font-mono">
                                 {index < 9 ? `0${index + 1}` : index + 1}
                              </div>
                           </div>
                         </Link>
                       </motion.div>
                     ))}
                 </div>

                  {/* Progress Bar HUD */}
                  <div className="mt-8 sm:mt-10 h-1.5 w-full bg-secondary rounded-full overflow-hidden relative border border-border">
                     <motion.div 
                        className="absolute inset-y-0 left-0 bg-indigo-600 dark:bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                        style={{ width: `${Math.max(scrollProgress, 5)}%` }}
                        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                     />
                  </div>
              </>
           )}
        </div>

        {/* Join Narrative CTA */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.6, delay: 0.4 }}
           className="mt-16 sm:mt-24 lg:mt-36 max-w-4xl mx-auto"
         >
           <div className="bg-card backdrop-blur-3xl border border-border rounded-[2rem] sm:rounded-[3rem] lg:rounded-[3.5rem] px-5 py-8 sm:px-10 sm:py-14 lg:p-16 text-center relative overflow-hidden group shadow-xl hover:shadow-2xl transition-all">
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
             <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-5 sm:mb-8">
               <Users className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 dark:text-indigo-400" />
             </div>
             <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 sm:mb-6 tracking-tight uppercase leading-tight">
               Expand the Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">Mesh</span>.
             </h3>
             <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed font-normal">
               We are actively searching for elite operational units to join our global network of intelligence architects and neural engineers.
             </p>
             <Button 
               asChild
               className="w-full sm:w-auto h-12 sm:h-14 px-8 sm:px-12 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl sm:rounded-2xl group transition-all text-xs sm:text-sm shadow-xl border-0 cursor-pointer"
             >
               <Link href="/contact">
                 Connect With Our Team
                 <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
               </Link>
             </Button>
           </div>
         </motion.div>
      </div>
    </section>
  )
}
