"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Phone, Mail, MessageCircle, Zap, Globe, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DeepTechBackground } from '@/components/ui/deep-tech-background'

export function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-28 lg:py-48 bg-[#010103] overflow-hidden" id="contact">
      <DeepTechBackground />
      
      <div className="relative container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[3rem] lg:rounded-[4rem] overflow-hidden border border-white/10 bg-[#05050a]/40 backdrop-blur-2xl shadow-2xl p-1"
        >
          {/* Internal Luminous Core */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-emerald-500/10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

          {/* Content Wrapper */}
          <div className="relative px-8 py-20 lg:px-24 lg:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 font-mono text-[10px] uppercase tracking-[0.3em] mb-10"
              >
                 <Zap className="w-3 h-3 fill-current" />
                 Ready for Deployment
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-10 tracking-tighter leading-[0.9]"
              >
                Let’s Scale <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">Your Vision</span> to Reality.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-white/40 text-xl lg:text-2xl mb-16 max-w-2xl mx-auto leading-relaxed font-medium"
              >
                Join the enterprise network of high-performance innovators. From autonomous AI to global cloud architectures, we build what’s next.
              </motion.p>

              {/* Action Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
              >
                <Button 
                  asChild
                  size="lg"
                  className="h-16 lg:h-20 px-12 bg-white text-black hover:bg-white/90 font-bold rounded-2xl lg:rounded-3xl shadow-2xl transition-all text-lg group"
                >
                  <Link href="/contact">
                    Initiate Project
                    <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-16 lg:h-20 px-12 border-white/10 text-white hover:bg-white/5 rounded-2xl lg:rounded-3xl text-lg backdrop-blur-md"
                >
                  <Link href="/contact#schedule">
                    Schedule Technical Audit
                    <Phone className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>

              {/* Secure Transport Layer / Contacts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-white/5"
              >
                <div className="flex flex-col items-center gap-3">
                   <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                      <Mail className="w-5 h-5 text-indigo-400" />
                   </div>
                   <div className="text-white font-bold text-sm tracking-tight">hello@nexatech.com</div>
                   <div className="text-white/20 text-[10px] uppercase font-mono">Email Gateway</div>
                </div>
                <div className="flex flex-col items-center gap-3">
                   <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                      <Globe className="w-5 h-5 text-blue-400" />
                   </div>
                   <div className="text-white font-bold text-sm tracking-tight">Global HQ / Remote</div>
                   <div className="text-white/20 text-[10px] uppercase font-mono">Operational Base</div>
                </div>
                <div className="flex flex-col items-center gap-3">
                   <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                      <Shield className="w-5 h-5 text-emerald-400" />
                   </div>
                   <div className="text-white font-bold text-sm tracking-tight">256-bit Encrypted</div>
                   <div className="text-white/20 text-[10px] uppercase font-mono">Channel Security</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Global Trust Marquee Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-24 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-indigo-500/5 border border-indigo-500/10">
             <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full border-2 border-[#010103] bg-gradient-to-br from-indigo-500 to-blue-500" />
                ))}
             </div>
             <p className="text-white/40 text-sm font-medium tracking-tight">
                Trusted by <span className="text-white font-bold">500+ Industry Leaders</span> globally.
             </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
