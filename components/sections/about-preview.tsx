"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Bot, Zap, Cpu, Code2, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DeepTechBackground } from '@/components/ui/deep-tech-background'

const highlights = [
  { title: 'Neural Operations', desc: 'AI-driven systems that automate complex business logic.', icon: Brain },
  { title: 'Edge Analytics', desc: 'Real-time data processing with sub-100ms latency globally.', icon: Zap },
  { title: 'Autonomous Scale', desc: 'Self-healing digital workers that scale with your traffic.', icon: Bot },
]

const stats = [
  { value: '1.2B', label: 'Predictions / Day', sub: 'High-Volume throughput' },
  { value: '500+', label: 'Enterprise Partners', sub: 'Global scale' },
  { value: '99.9%', label: 'Infrastructure Uptime', sub: 'Critical reliability' },
  { value: '250ms', label: 'Response Time', sub: 'Global average' },
]

import { Brain } from 'lucide-react'

export function AboutPreviewSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-28 lg:py-48 bg-background overflow-hidden" id="about">
      <DeepTechBackground />
      
      {/* Dynamic Mission HUD */}
      <div className="relative container mx-auto px-6 lg:px-8 mb-32 lg:mb-48">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto text-center"
        >
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-[0.4em] mb-8">
             <div className="w-12 h-[1px] bg-indigo-500/30" />
             Manifesto
             <div className="w-12 h-[1px] bg-indigo-500/30" />
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.1] mb-12">
            Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-400 to-emerald-500 dark:from-indigo-400 dark:via-blue-400 dark:to-emerald-400">Future of Intelligence</span>. We are Meganods.
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-4 group">
               <div className="w-12 h-12 rounded-2xl bg-card border border-border flex items-center justify-center group-hover:border-indigo-500/50 transition-colors shadow-sm">
                  <Globe className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
               </div>
               <div className="text-left">
                  <div className="text-foreground font-bold text-lg leading-none">Global Coverage</div>
                  <div className="text-muted-foreground text-sm mt-1">Edge Nodes globally</div>
               </div>
            </div>
            <div className="flex items-center gap-4 group">
               <div className="w-12 h-12 rounded-2xl bg-card border border-border flex items-center justify-center group-hover:border-emerald-500/50 transition-colors shadow-sm">
                  <Cpu className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
               </div>
               <div className="text-left">
                  <div className="text-foreground font-bold text-lg leading-none">Self-Healing Infrastructure</div>
                  <div className="text-muted-foreground text-sm mt-1">Automated recovery</div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          {/* Visual Presentation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0">
               {/* High-Tech Frame */}
               <div className="absolute inset-0 rounded-[3rem] border border-border bg-card/40 backdrop-blur-xl overflow-hidden p-4 shadow-sm dark:shadow-none">
                  <div className="w-full h-full rounded-[2.2rem] bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent flex items-center justify-center p-12">
                     <motion.div 
                        animate={{ y: [-20, 20, -20] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                        className="relative w-full aspect-square flex items-center justify-center"
                     >
                        <div className="absolute inset-0 rounded-full border border-indigo-500/10 scale-150 blur-sm" />
                        <div className="absolute inset-4 rounded-full border border-indigo-500/20 scale-125" />
                        <div className="absolute inset-8 rounded-full border border-indigo-500/30" />
                        
                        <div className="relative w-48 h-48 rounded-[2.5rem] bg-gradient-to-br from-indigo-600 via-blue-600 to-emerald-500 p-[1px] shadow-2xl shadow-indigo-500/20 dark:shadow-indigo-500/40">
                           <div className="w-full h-full bg-card rounded-[2.4rem] flex items-center justify-center">
                              <Bot className="w-24 h-24 text-foreground" />
                           </div>
                        </div>
                     </motion.div>
                  </div>
               </div>

               {/* Kinetic Data Points */}
               <motion.div 
                 animate={{ x: [0, 10, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                 className="absolute -top-10 -right-10 p-6 rounded-3xl bg-card border border-border shadow-2xl backdrop-blur-md"
               >
                  <div className="text-indigo-600 dark:text-indigo-400 font-bold text-4xl mb-1">+285%</div>
                  <div className="text-muted-foreground text-xs font-mono uppercase">Scale Intelligence</div>
               </motion.div>
            </div>
          </motion.div>

          {/* Content Narrative */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-[0.3em]">
                  Status: Operational
                </span>
                <h3 className="text-4xl lg:text-7xl font-bold text-foreground tracking-tighter leading-none">
                  Empower Your Business With Pulse Genesis.
                </h3>
                <p className="text-muted-foreground text-xl leading-relaxed max-w-xl">
                  We don’t just deploy code. We architect high-performance digital ecosystems that think, evolve, and dominate markets through specialized AI integration.
                </p>
              </div>

              {/* Advanced Highlights */}
              <div className="space-y-6">
                {highlights.map((h, i) => (
                  <motion.div 
                    key={h.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex gap-5 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center shrink-0 group-hover:bg-indigo-500/10 transition-colors shadow-sm">
                       <h.icon className="w-6 h-6 text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                    </div>
                    <div className="border-b border-border pb-4 w-full">
                       <h4 className="text-foreground font-bold text-lg mb-1">{h.title}</h4>
                       <p className="text-muted-foreground text-sm">{h.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-8">
                <Button 
                  asChild
                  size="lg"
                  className="h-16 px-10 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-2xl shadow-xl transition-all text-base group border-0"
                >
                  <Link href="/about">
                    View Enterprise Profile
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Technical Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-32 lg:mt-56 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-[40px] overflow-hidden border border-border shadow-lg dark:shadow-none"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="bg-card p-10 group hover:bg-secondary/40 transition-colors relative">
               <div className="text-emerald-600 dark:text-emerald-400/50 font-mono text-[10px] uppercase mb-4 tracking-widest flex items-center justify-between">
                  {stat.sub}
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               </div>
               <div className="text-5xl font-bold text-foreground mb-2 tracking-tighter group-hover:text-indigo-600 dark:group-hover:text-emerald-400 transition-colors">
                  {stat.value}
               </div>
               <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
               {/* Accent decoration */}
               <div className="absolute top-0 right-0 w-8 h-8 rounded-bl-3xl bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
