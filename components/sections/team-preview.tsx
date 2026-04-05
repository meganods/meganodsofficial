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

export function TeamPreviewSection() {
  const [members, setMembers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
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
        const q = query(collection(db, "team"), orderBy("order", "asc"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMembers(docs);
      } catch (error) {
        console.error("TEAM_FETCH_ERROR:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTeam();
  }, [])

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
    setScrollProgress(progress);
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth * 0.8;
    const isAtEnd = carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 50;
    
    if (direction === 'right' && isAtEnd) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
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
    <section ref={ref} className="relative py-28 lg:py-48 bg-[#010103] overflow-hidden" id="team">
      <DeepTechBackground />
      
      <div className="relative container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20 lg:mb-32">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="text-indigo-400 font-mono text-xs uppercase tracking-[0.4em] mb-4 font-black"
            >
              Architects
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tighter leading-none uppercase"
            >
              Human <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">Intelligence</span> Hub.
            </motion.h2>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2 mr-4">
                <button 
                  onClick={() => {
                    scroll('left');
                    setIsPaused(true);
                  }}
                  disabled={!canScrollLeft}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                >
                   <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => {
                    scroll('right');
                    setIsPaused(true);
                  }}
                  disabled={!canScrollRight}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                >
                   <ChevronRight className="w-6 h-6" />
                </button>
             </div>
             
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={isInView ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.5, delay: 0.2 }}
             >
               <Button 
                 asChild
                 variant="outline"
                 className="border-white/10 hover:bg-white/5 text-white h-14 px-8 rounded-2xl font-bold uppercase tracking-widest text-[10px]"
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
                 <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
                 <p className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.5em] animate-pulse font-black">Decrypting Personnel Mesh...</p>
              </div>
           ) : members.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-40 gap-8 border border-dashed border-white/10 rounded-[3rem]">
                 <Database className="w-16 h-16 text-white/5" />
                 <p className="text-sm text-white/20 font-bold font-mono uppercase tracking-[0.3em]">Leadership Registry Idle</p>
              </div>
           ) : (
              <>
                 <div 
                   ref={carouselRef}
                   onScroll={handleScroll}
                   className="flex gap-8 overflow-x-auto pb-12 pt-4 no-scrollbar cursor-grab active:cursor-grabbing snap-x snap-mandatory"
                 >
                    {members.map((member, index) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="min-w-[320px] md:min-w-[400px] snap-center first:ml-0 last:mr-10"
                      >
                        <div className="bg-[#05050a]/80 backdrop-blur-3xl border border-white/5 rounded-[3.5rem] p-10 h-full flex flex-col hover:border-indigo-500/30 transition-all duration-700 overflow-hidden relative shadow-2xl group/card">
                           <div className={`absolute -inset-1 bg-gradient-to-br ${member.gradient} opacity-0 group-hover/card:opacity-10 transition-opacity blur-2xl pointer-events-none`} />
                           
                           {/* Visual Profile Node */}
                           <div className="relative mb-10 rounded-[2.5rem] overflow-hidden aspect-square border border-white/5 shadow-2xl bg-black">
                              {member.avatarUrl ? (
                                 <img src={member.avatarUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110" alt={member.name} />
                              ) : (
                                 <div className={`w-full h-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-6xl font-black text-white tracking-widest shadow-inner`}>
                                    {member.initials || '??'}
                                 </div>
                              )}
                              
                              {/* Social HUD Overlay - Cinematic */}
                              <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center gap-4 opacity-0 group-hover/card:opacity-100 transition-all duration-500 translate-y-12 group-hover/card:translate-y-0">
                                 {member.social?.linkedin && (
                                   <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-indigo-500 hover:scale-110 transition-all shadow-xl">
                                      <Linkedin className="w-6 h-6" />
                                   </a>
                                 )}
                                 {member.social?.twitter && (
                                   <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-blue-500 hover:scale-110 transition-all shadow-xl">
                                      <Twitter className="w-6 h-6" />
                                   </a>
                                 )}
                                 {member.social?.github && (
                                   <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-black hover:scale-110 transition-all shadow-xl">
                                      <Github className="w-6 h-6" />
                                   </a>
                                 )}
                                 {member.social?.email && (
                                   <a href={`mailto:${member.social.email}`} className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-rose-500 hover:scale-110 transition-all shadow-xl">
                                      <Mail className="w-6 h-6" />
                                   </a>
                                 )}
                              </div>
                           </div>

                           <div className="flex-1">
                              <div className="text-indigo-400 font-mono text-[9px] uppercase tracking-[0.4em] mb-4 font-black opacity-60 relative z-10">[ {member.meta || 'Strategic Node'} ]</div>
                              <h3 className="text-3xl font-black text-white mb-2 group-hover/card:text-indigo-400 transition-colors relative z-10 leading-none tracking-tighter uppercase">{member.name}</h3>
                              <div className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-8 relative z-10 font-mono">{member.role}</div>
                              <p className="text-white/30 text-base leading-relaxed font-medium relative z-10 group-hover/card:text-white/50 transition-colors line-clamp-3">{member.bio}</p>
                           </div>
                           
                           {/* Decorative Node ID */}
                           <div className="absolute top-8 right-8 text-[40px] font-black text-white/[0.02] tracking-tighter leading-none select-none">
                              {index < 9 ? `0${index + 1}` : index + 1}
                           </div>
                        </div>
                      </motion.div>
                    ))}
                 </div>

                 {/* Progress Bar HUD */}
                 <div className="mt-12 h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                    <motion.div 
                       className="absolute inset-y-0 left-0 bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                       style={{ width: `${scrollProgress}%` }}
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
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-24 lg:mt-40 max-w-5xl mx-auto"
        >
          <div className="bg-[#05050a]/60 backdrop-blur-3xl border border-white/10 rounded-[4rem] p-12 lg:p-20 text-center relative overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <Users className="w-16 h-16 text-indigo-400/20 mx-auto mb-8 animate-pulse" />
            <h3 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter uppercase leading-none">Expand the Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Mesh</span>.</h3>
            <p className="text-white/40 text-xl lg:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              We are actively searching for elite operational units to join our global network of intelligence architects and neural engineers.
            </p>
            <Button 
              asChild
              className="h-20 px-16 bg-white text-black hover:bg-white/90 font-black rounded-[2rem] group transition-all text-xl shadow-2xl"
            >
              <Link href="/careers">
                Explore Protocol Openings
                <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-3 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
