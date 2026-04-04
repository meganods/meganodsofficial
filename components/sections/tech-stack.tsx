"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { DeepTechBackground } from '@/components/ui/deep-tech-background'
import { Brain, Cloud, Cpu, Database, Flame, Globe, Lock, Terminal } from 'lucide-react'

const technologies = [
  { name: 'TensorFlow', category: 'AI/ML', icon: Brain },
  { name: 'PyTorch', category: 'AI/ML', icon: Brain },
  { name: 'AWS', category: 'Cloud', icon: Cloud },
  { name: 'Azure', category: 'Cloud', icon: Cloud },
  { name: 'GCP', category: 'Cloud', icon: Cloud },
  { name: 'Kubernetes', category: 'DevOps', icon: Cpu },
  { name: 'Docker', category: 'DevOps', icon: Cpu },
  { name: 'Next.js', category: 'Frontend', icon: Globe },
  { name: 'Node.js', category: 'Backend', icon: Terminal },
  { name: 'Python', category: 'Backend', icon: Terminal },
  { name: 'PostgreSQL', category: 'Database', icon: Database },
  { name: 'Redis', category: 'Database', icon: Flame },
  { name: 'Terraform', category: 'IaC', icon: Lock },
]

export function TechStackSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-28 lg:py-48 bg-[#010103] overflow-hidden" id="tech-stack">
      <DeepTechBackground />
      
      <div className="relative container mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-20 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="text-indigo-400 font-mono text-xs uppercase tracking-[0.4em] mb-4"
          >
            Capabilities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tighter leading-tight"
          >
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">Technology Core</span> Powering Nexa.
          </motion.h2>
        </div>

        {/* Technical Marquee System */}
        <div className="relative space-y-12 lg:space-y-20">
          {/* Row 1 - Direct Marquee */}
          <div className="flex overflow-hidden relative py-4 lg:py-8 border-y border-white/5">
            <motion.div
              animate={{ x: [0, '-50%'] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex gap-12 lg:gap-20 shrink-0"
            >
              {[...technologies, ...technologies].map((tech, index) => (
                <div
                  key={`marquee-1-${index}`}
                  className="flex items-center gap-6 group cursor-default"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-indigo-400/50 transition-colors">
                     <tech.icon className="w-6 h-6 text-white group-hover:text-indigo-400 transition-colors" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-xl lg:text-2xl tracking-tight group-hover:text-indigo-400 transition-colors">{tech.name}</div>
                    <div className="text-white/20 text-[10px] items-center font-mono uppercase tracking-widest">{tech.category}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2 - Inverse Marquee */}
          <div className="flex overflow-hidden relative py-4 lg:py-8">
            <motion.div
              animate={{ x: ['-50%', '0%'] }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              className="flex gap-12 lg:gap-20 shrink-0"
            >
              {[...technologies, ...technologies].reverse().map((tech, index) => (
                <div
                  key={`marquee-2-${index}`}
                  className="flex items-center gap-6 group cursor-default"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-400/50 transition-colors">
                     <tech.icon className="w-6 h-6 text-white group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-xl lg:text-2xl tracking-tight group-hover:text-emerald-400 transition-colors">{tech.name}</div>
                    <div className="text-white/20 text-[10px] font-mono uppercase tracking-widest">{tech.category}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Architecture HUD */}
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ delay: 0.6 }}
           className="mt-24 lg:mt-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
           {[
              { label: 'Latency', value: '75ms', sub: 'Global Average' },
              { label: 'Throughput', value: '1.2M', sub: 'Ops / Second' },
              { label: 'Compliance', value: 'SOC2', sub: 'Enterprise Grade' },
              { label: 'Security', value: 'AES/V', sub: 'Encrypted Core' },
           ].map((stat, i) => (
              <div key={stat.label} className="flex flex-col gap-2 p-6 rounded-3xl bg-white/5 border border-white/5 group hover:border-indigo-500/20 transition-all">
                 <div className="text-white/40 text-[10px] font-mono uppercase tracking-widest">{stat.label}</div>
                 <div className="text-3xl font-bold text-white group-hover:text-indigo-400 transition-colors">{stat.value}</div>
                 <div className="text-white/20 text-xs font-medium">{stat.sub}</div>
              </div>
           ))}
        </motion.div>
      </div>
    </section>
  )
}
