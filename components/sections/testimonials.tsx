"use client"

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Quote, Star, ChevronLeft, ChevronRight, MessageSquare, Terminal, Shield, User, Zap, Loader2, ArrowRight } from 'lucide-react'
import { DeepTechBackground } from '@/components/ui/deep-tech-background'
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
     const fetchTestimonials = async () => {
        try {
           const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
           const querySnapshot = await getDocs(q);
           const docs = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
           }));
           setTestimonials(docs);
        } catch (error) {
           console.error("TESTIMONIALS_FETCH_ERROR:", error);
        } finally {
           setIsLoading(false);
        }
     }
     fetchTestimonials();
  }, [])

  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, activeIndex, testimonials.length])

  const handlePrev = () => {
    if (testimonials.length === 0) return
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    if (testimonials.length === 0) return
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

   if (isLoading) {
      return (
         <section ref={ref} className="relative py-28 lg:py-48 bg-background overflow-hidden">
            <DeepTechBackground />
            <div className="flex flex-col items-center justify-center py-40 gap-6">
               <Loader2 className="w-10 h-10 text-indigo-600 dark:text-indigo-500 animate-spin" />
               <p className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.4em] animate-pulse font-black">Syncing Operational Feedback Registry...</p>
            </div>
         </section>
      )
   }

  if (testimonials.length === 0) return null

  const activeTestimonial = testimonials[activeIndex]

  return (
    <section ref={ref} className="relative py-28 lg:py-48 bg-background overflow-hidden" id="testimonials">
      <DeepTechBackground />
      
      <div className="relative container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20 lg:mb-32">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-[0.4em] mb-4 font-black"
            >
              Feedback Registry
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground tracking-tighter leading-none uppercase"
            >
              Market <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-600 dark:from-indigo-400 dark:via-blue-400 dark:to-emerald-400">Authority</span> nodes.
            </motion.h2>
          </div>
          
          <div className="flex gap-4">
            <button
               onClick={handlePrev}
               className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors text-foreground"
            >
               <ChevronLeft className="w-6 h-6" />
            </button>
            <button
               onClick={handleNext}
               className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors text-foreground"
            >
               <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Technical Testimonial HUD */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-24 items-center"
              >
                {/* Visual Identity Side */}
                <div className="relative">
                   <div className="relative aspect-square max-w-sm mx-auto lg:mx-0">
                      <div className="absolute inset-0 rounded-[3.5rem] bg-gradient-to-br from-indigo-500/20 to-emerald-500/10 border border-border p-1">
                         <div className="w-full h-full rounded-[3.3rem] bg-card flex items-center justify-center overflow-hidden">
                            <motion.div 
                               animate={{ 
                                  scale: [1, 1.1, 1],
                                  opacity: [0.5, 0.8, 0.5]
                                }}
                               transition={{ duration: 8, repeat: Infinity }}
                               className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent" 
                            />
                            {activeTestimonial?.avatar ? (
                               <img src={activeTestimonial.avatar} className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" alt={activeTestimonial.name} />
                            ) : (
                               <User className="w-40 h-40 text-muted-foreground/5" />
                            )}
                            <div className="absolute bottom-10 left-10 right-10 p-6 rounded-2xl bg-background/80 dark:bg-black/60 border border-border backdrop-blur-xl">
                               <div className="flex items-center gap-3 mb-2">
                                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                  <div className="text-foreground font-black text-lg uppercase tracking-tight">{activeTestimonial?.name}</div>
                                </div>
                                <div className="text-indigo-600 dark:text-indigo-400 font-mono text-[9px] uppercase tracking-[0.2em] font-black opacity-60 font-mono">{activeTestimonial?.role}</div>
                            </div>
                         </div>
                      </div>
                      
                      {/* Floating HUD Elements */}
                      <motion.div 
                         animate={{ y: [-10, 10, -10] }}
                         transition={{ duration: 4, repeat: Infinity }}
                         className="absolute -top-8 -right-8 w-24 h-24 rounded-3xl bg-card border border-border flex flex-col items-center justify-center shadow-2xl"
                      >
                         <Star className="w-7 h-7 text-amber-400 fill-amber-400 mb-1" />
                         <div className="text-foreground font-black text-sm font-mono">{activeTestimonial?.rating || 5}.0</div>
                      </motion.div>
                   </div>
                </div>

                {/* Narrative Side */}
                <div className="flex flex-col text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12"
                  >
                    <div className="flex items-center gap-3 mb-6">
                       <Zap className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                       <div className="text-indigo-600 dark:text-indigo-400 font-mono text-[10px] uppercase tracking-[0.4em] font-black">
                         [ {activeTestimonial?.tag || 'Verified Operational Node'} ]
                       </div>
                    </div>
                    <div className="relative">
                      <Quote className="absolute -top-12 -left-12 w-24 h-24 text-foreground/[0.03]" />
                      <p className="text-2xl lg:text-4xl font-black text-foreground leading-[1.1] tracking-tighter uppercase italic relative z-10">
                        &ldquo;{activeTestimonial?.content}&rdquo;
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 0.4 }}
                     className="flex flex-col sm:flex-row gap-8 items-start sm:items-center"
                  >
                     <div className="flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center group-hover:bg-indigo-600/10 dark:group-hover:bg-indigo-500/10 transition-colors">
                           <MessageSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div className="text-left">
                           <div className="text-foreground font-black text-[10px] uppercase tracking-widest">Protocol Sync</div>
                           <div className="text-muted-foreground/45 text-[9px] uppercase font-mono tracking-widest font-bold">Node verified 100%</div>
                        </div>
                     </div>
                     <Link href="/testimonials">
                        <Button variant="outline" className="h-16 px-8 rounded-2xl border-border hover:bg-secondary text-foreground font-black text-[10px] uppercase tracking-[0.2em] gap-3">
                           Full Directory <ArrowRight className="w-4 h-4" />
                        </Button>
                     </Link>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Carousel Progress */}
            <div className="mt-20 flex justify-center lg:justify-start gap-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false)
                    setActiveIndex(index)
                  }}
                  className={`h-1.5 rounded-full transition-all duration-700 ${
                    index === activeIndex ? 'w-24 bg-indigo-600 dark:bg-indigo-500 opacity-100' : 'w-8 bg-foreground opacity-20 hover:opacity-40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
