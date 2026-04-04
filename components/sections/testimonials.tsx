"use client"

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Quote, Star, ChevronLeft, ChevronRight, MessageSquare, Terminal, Shield } from 'lucide-react'
import { DeepTechBackground } from '@/components/ui/deep-tech-background'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO, TechVentures Inc.',
    content: 'NexaTech transformed our entire operation. Their AI solutions increased our efficiency by 300% and helped us scale globally in just one year.',
    rating: 5,
    avatar: 'SJ',
    metadata: 'Verified Partner 01'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CTO, DataFlow Systems',
    content: 'The level of expertise and innovation at NexaTech is unmatched. They delivered a custom ML solution that exceeded all our expectations.',
    rating: 5,
    avatar: 'MC',
    metadata: 'Data Systems Audit'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'VP of Engineering, CloudFirst',
    content: 'Working with NexaTech was a game-changer. Their cloud infrastructure solutions are robust, scalable, and incredibly well-designed.',
    rating: 5,
    avatar: 'ER',
    metadata: 'Cloud Infra Review'
  },
]

export function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, activeIndex])

  const handlePrev = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const activeTestimonial = testimonials[activeIndex] || testimonials[0]

  return (
    <section ref={ref} className="relative py-28 lg:py-48 bg-[#010103] overflow-hidden" id="testimonials">
      <DeepTechBackground />
      
      <div className="relative container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20 lg:mb-32">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="text-indigo-400 font-mono text-xs uppercase tracking-[0.4em] mb-4"
            >
              Feedback
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tighter leading-none"
            >
              Trust in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">Proven Results</span>.
            </motion.h2>
          </div>
          
          <div className="flex gap-4">
            <button
               onClick={handlePrev}
               className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-white"
            >
               <ChevronLeft className="w-6 h-6" />
            </button>
            <button
               onClick={handleNext}
               className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-white"
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
                      <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-indigo-500/20 to-blue-500/10 border border-white/10 p-1">
                         <div className="w-full h-full rounded-[2.8rem] bg-[#05050a] flex items-center justify-center overflow-hidden">
                            <motion.div 
                               animate={{ 
                                  scale: [1, 1.1, 1],
                                  opacity: [0.5, 0.8, 0.5]
                               }}
                               transition={{ duration: 8, repeat: Infinity }}
                               className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent" 
                            />
                            <span className="text-white font-bold text-[8rem] opacity-10 select-none">
                               {activeTestimonial?.avatar}
                            </span>
                            <div className="absolute bottom-10 left-10 right-10 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                               <div className="flex items-center gap-3 mb-2">
                                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                  <div className="text-white font-bold text-lg">{activeTestimonial?.name}</div>
                               </div>
                               <div className="text-white/40 text-xs font-mono uppercase tracking-widest">{activeTestimonial?.role}</div>
                            </div>
                         </div>
                      </div>
                      
                      {/* Floating HUD Elements */}
                      <motion.div 
                         animate={{ y: [-10, 10, -10] }}
                         transition={{ duration: 4, repeat: Infinity }}
                         className="absolute -top-8 -right-8 w-20 h-20 rounded-2xl bg-[#0a0a0f] border border-white/10 flex flex-col items-center justify-center shadow-2xl"
                      >
                         <Star className="w-6 h-6 text-yellow-500 fill-yellow-500 mb-1" />
                         <div className="text-white font-bold text-xs font-mono">5.0</div>
                      </motion.div>
                      
                      <div className="absolute top-1/2 -left-12 -translate-y-1/2 flex flex-col gap-3">
                         <div className="w-3 h-3 rounded-full bg-white opacity-20" />
                         <div className="w-3 h-3 rounded-full bg-indigo-500" />
                         <div className="w-3 h-3 rounded-full bg-white opacity-20" />
                      </div>
                   </div>
                </div>

                {/* Narrative Side */}
                <div className="flex flex-col text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-10"
                  >
                    <div className="text-emerald-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-4">
                       [ {activeTestimonial?.metadata} ]
                    </div>
                    <div className="relative">
                      <Quote className="absolute -top-10 -left-10 w-20 h-20 text-white/5" />
                      <p className="text-2xl lg:text-4xl font-bold text-white leading-tight tracking-tight italic">
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
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-indigo-500/10 transition-colors">
                           <MessageSquare className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div className="text-left">
                           <div className="text-white font-bold text-sm tracking-tight">Verified Protocol</div>
                           <div className="text-white/20 text-[10px] uppercase font-mono tracking-widest">Auth Certificate 0X-233</div>
                        </div>
                     </div>
                     <div className="flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500/10 transition-colors">
                           <Shield className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div className="text-left">
                           <div className="text-white font-bold text-sm tracking-tight">Enterprise Success</div>
                           <div className="text-white/20 text-[10px] uppercase font-mono tracking-widest">Impact Factor: 9.8/10</div>
                        </div>
                     </div>
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
                  className={`h-1 rounded-full transition-all duration-700 bg-white ${
                    index === activeIndex ? 'w-16 opacity-100' : 'w-6 opacity-10 hover:opacity-30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Global Network Count */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ delay: 0.8 }}
           className="mt-32 text-center"
        >
           <p className="text-white/40 text-[10px] font-mono uppercase tracking-[0.4em] mb-8">
              Global Connection Pulse
           </p>
           <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 transition-all">
              {['TechCorp', 'Innova', 'Base-X', 'Cloud-9', 'DevOps-P'].map((c) => (
                 <div key={c} className="text-xl font-bold text-white tracking-widest">{c}</div>
              ))}
           </div>
        </motion.div>
      </div>
    </section>
  )
}
