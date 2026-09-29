"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Phone, Mail, Zap, Globe, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DeepTechBackground } from '@/components/ui/deep-tech-background'

export function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-20 sm:py-28 lg:py-44 bg-background overflow-hidden" id="contact">
      <DeepTechBackground />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[2rem] sm:rounded-[3rem] lg:rounded-[4rem] overflow-hidden border border-border bg-card/40 backdrop-blur-2xl shadow-2xl p-1 dark:border-white/10 dark:bg-[#05050a]/40"
        >
          {/* Internal Luminous Core */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-emerald-500/10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

          {/* Content Wrapper */}
          <div className="relative px-4 py-8 sm:px-8 sm:py-16 lg:px-20 lg:py-28">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary border border-border text-indigo-600 dark:text-indigo-400 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] mb-6 sm:mb-8 font-bold"
              >
                 <Zap className="w-3 h-3 fill-current" />
                 Ready for Deployment
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 sm:mb-6 tracking-tight leading-tight"
              >
                Let’s Scale <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600">Your Vision</span> to Reality.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-muted-foreground text-xs sm:text-sm md:text-base mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed font-normal"
              >
                Join the enterprise network of high-performance innovators. From autonomous AI to global cloud architectures, we build what’s next.
              </motion.p>

              {/* Action Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 w-full max-w-md sm:max-w-none mx-auto"
              >
                <Button 
                  asChild
                  className="w-full sm:w-auto h-12 sm:h-14 lg:h-16 px-6 sm:px-8 lg:px-10 bg-foreground text-background hover:bg-foreground/90 font-bold rounded-xl sm:rounded-2xl shadow-xl transition-all text-xs sm:text-sm lg:text-base group border-0 cursor-pointer"
                >
                  <Link href="/contact" className="flex items-center justify-center gap-2">
                    <span>Initiate Project</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  className="w-full sm:w-auto h-12 sm:h-14 lg:h-16 px-6 sm:px-8 lg:px-10 border border-border text-foreground bg-card/80 hover:bg-secondary rounded-xl sm:rounded-2xl text-xs sm:text-sm lg:text-base backdrop-blur-md shadow-sm cursor-pointer"
                >
                  <Link href="/contact#schedule" className="flex items-center justify-center gap-2">
                    <span>Schedule Technical Audit</span>
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Link>
                </Button>
              </motion.div>

              {/* Secure Transport Layer / Contacts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 sm:pt-14 border-t border-border"
              >
                <div className="flex flex-col items-center gap-2">
                   <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-secondary flex items-center justify-center border border-border">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
                   </div>
                   <div className="text-foreground font-bold text-xs sm:text-sm tracking-tight">admin@meganods.com</div>
                   <div className="text-muted-foreground text-[9px] sm:text-[10px] uppercase font-mono">Email Gateway</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                   <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-secondary flex items-center justify-center border border-border">
                      <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 dark:text-blue-400" />
                   </div>
                   <div className="text-foreground font-bold text-xs sm:text-sm tracking-tight">Global HQ / Remote</div>
                   <div className="text-muted-foreground text-[9px] sm:text-[10px] uppercase font-mono">Operational Base</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                   <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-secondary flex items-center justify-center border border-border">
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
                   </div>
                   <div className="text-foreground font-bold text-xs sm:text-sm tracking-tight">256-bit Encrypted</div>
                   <div className="text-muted-foreground text-[9px] sm:text-[10px] uppercase font-mono">Channel Security</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Global Trust Marquee Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 sm:mt-24 text-center"
        >
          <div className="inline-flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-indigo-500/5 border border-indigo-500/10">
             <div className="flex -space-x-2 sm:-space-x-3">
                {[1,2,3,4].map(i => (
                   <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-background bg-gradient-to-br from-indigo-500 to-blue-500" />
                ))}
             </div>
             <p className="text-muted-foreground text-xs sm:text-sm font-medium tracking-tight">
                Trusted by <span className="text-foreground font-bold">500+ Industry Leaders</span> globally.
             </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
