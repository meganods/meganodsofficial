"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { DeepTechBackground } from '@/components/ui/deep-tech-background'
import { Brain, Cloud, Cpu, Database, Flame, Globe, Lock, Terminal } from 'lucide-react'

const technologies = [
  {
    name: 'TensorFlow',
    category: 'AI/ML',
    icon: Brain,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/15 dark:bg-amber-500/25',
    borderColor: 'border-amber-500/40 group-hover:border-amber-500',
    glowColor: 'shadow-amber-500/20 group-hover:shadow-amber-500/40',
    accentText: 'group-hover:text-amber-500',
  },
  {
    name: 'PyTorch',
    category: 'AI/ML',
    icon: Flame,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/15 dark:bg-orange-500/25',
    borderColor: 'border-orange-500/40 group-hover:border-orange-500',
    glowColor: 'shadow-orange-500/20 group-hover:shadow-orange-500/40',
    accentText: 'group-hover:text-orange-500',
  },
  {
    name: 'AWS',
    category: 'Cloud',
    icon: Cloud,
    color: 'text-amber-500 dark:text-amber-400',
    bgColor: 'bg-amber-500/15 dark:bg-amber-500/25',
    borderColor: 'border-amber-500/40 group-hover:border-amber-400',
    glowColor: 'shadow-amber-500/20 group-hover:shadow-amber-500/40',
    accentText: 'group-hover:text-amber-500 dark:group-hover:text-amber-400',
  },
  {
    name: 'Azure',
    category: 'Cloud',
    icon: Cloud,
    color: 'text-sky-500',
    bgColor: 'bg-sky-500/15 dark:bg-sky-500/25',
    borderColor: 'border-sky-500/40 group-hover:border-sky-500',
    glowColor: 'shadow-sky-500/20 group-hover:shadow-sky-500/40',
    accentText: 'group-hover:text-sky-500',
  },
  {
    name: 'GCP',
    category: 'Cloud',
    icon: Globe,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/15 dark:bg-blue-500/25',
    borderColor: 'border-blue-500/40 group-hover:border-blue-500',
    glowColor: 'shadow-blue-500/20 group-hover:shadow-blue-500/40',
    accentText: 'group-hover:text-blue-500',
  },
  {
    name: 'Kubernetes',
    category: 'DevOps',
    icon: Cpu,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-600/15 dark:bg-blue-600/25',
    borderColor: 'border-blue-600/40 group-hover:border-blue-500',
    glowColor: 'shadow-blue-600/20 group-hover:shadow-blue-600/40',
    accentText: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
  },
  {
    name: 'Docker',
    category: 'DevOps',
    icon: Cpu,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/15 dark:bg-cyan-500/25',
    borderColor: 'border-cyan-500/40 group-hover:border-cyan-400',
    glowColor: 'shadow-cyan-500/20 group-hover:shadow-cyan-500/40',
    accentText: 'group-hover:text-cyan-500',
  },
  {
    name: 'Next.js',
    category: 'Frontend',
    icon: Globe,
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-500/15 dark:bg-indigo-500/25',
    borderColor: 'border-indigo-500/40 group-hover:border-indigo-500',
    glowColor: 'shadow-indigo-500/20 group-hover:shadow-indigo-500/40',
    accentText: 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400',
  },
  {
    name: 'Node.js',
    category: 'Backend',
    icon: Terminal,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/15 dark:bg-emerald-500/25',
    borderColor: 'border-emerald-500/40 group-hover:border-emerald-500',
    glowColor: 'shadow-emerald-500/20 group-hover:shadow-emerald-500/40',
    accentText: 'group-hover:text-emerald-500',
  },
  {
    name: 'Python',
    category: 'Backend',
    icon: Terminal,
    color: 'text-yellow-500 dark:text-yellow-400',
    bgColor: 'bg-yellow-500/15 dark:bg-yellow-500/25',
    borderColor: 'border-yellow-500/40 group-hover:border-yellow-400',
    glowColor: 'shadow-yellow-500/20 group-hover:shadow-yellow-500/40',
    accentText: 'group-hover:text-yellow-600 dark:group-hover:text-yellow-400',
  },
  {
    name: 'PostgreSQL',
    category: 'Database',
    icon: Database,
    color: 'text-blue-500 dark:text-blue-400',
    bgColor: 'bg-blue-500/15 dark:bg-blue-500/25',
    borderColor: 'border-blue-500/40 group-hover:border-blue-500',
    glowColor: 'shadow-blue-500/20 group-hover:shadow-blue-500/40',
    accentText: 'group-hover:text-blue-500 dark:group-hover:text-blue-400',
  },
  {
    name: 'Redis',
    category: 'Database',
    icon: Flame,
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/15 dark:bg-rose-500/25',
    borderColor: 'border-rose-500/40 group-hover:border-rose-500',
    glowColor: 'shadow-rose-500/20 group-hover:shadow-rose-500/40',
    accentText: 'group-hover:text-rose-500',
  },
  {
    name: 'Terraform',
    category: 'IaC',
    icon: Lock,
    color: 'text-purple-500 dark:text-purple-400',
    bgColor: 'bg-purple-500/15 dark:bg-purple-500/25',
    borderColor: 'border-purple-500/40 group-hover:border-purple-500',
    glowColor: 'shadow-purple-500/20 group-hover:shadow-purple-500/40',
    accentText: 'group-hover:text-purple-500 dark:group-hover:text-purple-400',
  },
]

export function TechStackSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-28 lg:py-48 bg-background overflow-hidden" id="tech-stack">
      <DeepTechBackground />
      
      <div className="relative container mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-20 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="text-indigo-600 dark:text-indigo-400 font-mono text-[11px] uppercase tracking-[0.35em] mb-3 font-bold flex items-center gap-3"
          >
            <div className="w-8 h-px bg-indigo-600/50" />
            INFRASTRUCTURE PROTOCOLS
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight"
          >
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-600">Technology Core</span> of Meganods.
          </motion.h2>
        </div>

        {/* Technical Marquee System */}
        <div className="relative space-y-12 lg:space-y-20">
          {/* Row 1 - Direct Marquee */}
          <div className="flex overflow-hidden relative py-4 lg:py-8 border-y border-border">
            <motion.div
              animate={{ x: [0, '-50%'] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex gap-12 lg:gap-20 shrink-0"
            >
              {[...technologies, ...technologies].map((tech, index) => (
                <div
                  key={`marquee-1-${index}`}
                  className="flex items-center gap-6 group cursor-pointer"
                >
                  <motion.div 
                    whileHover={{ scale: 1.15, rotate: [0, -6, 6, 0] }}
                    transition={{ duration: 0.35 }}
                    className={`w-14 h-14 rounded-2xl ${tech.bgColor} border ${tech.borderColor} shadow-lg ${tech.glowColor} flex items-center justify-center transition-all duration-300 relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                    <tech.icon className={`w-7 h-7 ${tech.color} group-hover:scale-110 transition-transform duration-300 drop-shadow-sm animate-pulse`} />
                  </motion.div>
                  <div>
                    <div className={`text-foreground font-bold text-xl lg:text-2xl tracking-tight ${tech.accentText} transition-colors duration-300`}>{tech.name}</div>
                    <div className="text-muted-foreground/50 text-[10px] items-center font-mono uppercase tracking-widest">{tech.category}</div>
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
                  className="flex items-center gap-6 group cursor-pointer"
                >
                  <motion.div 
                    whileHover={{ scale: 1.15, rotate: [0, 6, -6, 0] }}
                    transition={{ duration: 0.35 }}
                    className={`w-14 h-14 rounded-2xl ${tech.bgColor} border ${tech.borderColor} shadow-lg ${tech.glowColor} flex items-center justify-center transition-all duration-300 relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                    <tech.icon className={`w-7 h-7 ${tech.color} group-hover:scale-110 transition-transform duration-300 drop-shadow-sm animate-pulse`} />
                  </motion.div>
                  <div>
                    <div className={`text-foreground font-bold text-xl lg:text-2xl tracking-tight ${tech.accentText} transition-colors duration-300`}>{tech.name}</div>
                    <div className="text-muted-foreground/50 text-[10px] font-mono uppercase tracking-widest">{tech.category}</div>
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
              <div key={stat.label} className="flex flex-col gap-2 p-6 rounded-3xl bg-card border border-border group hover:border-indigo-600/20 dark:hover:border-indigo-500/20 transition-all">
                 <div className="text-muted-foreground/60 text-[10px] font-mono uppercase tracking-widest">{stat.label}</div>
                 <div className="text-3xl font-bold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{stat.value}</div>
                 <div className="text-muted-foreground/40 text-xs font-medium">{stat.sub}</div>
              </div>
           ))}
        </motion.div>
      </div>
    </section>
  )
}
