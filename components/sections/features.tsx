"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Brain, 
  Code2, 
  Cpu, 
  Globe, 
  Layers, 
  Smartphone, 
  Zap,
  Bot,
  Terminal,
  Activity,
  Box,
  Layout
} from 'lucide-react'

const features = [
  {
    category: 'AI Solutions',
    icon: Brain,
    title: 'Neural Intelligence',
    description: 'Bespoke LLMs and predictive models trained on your proprietary data for unmatched business insights.',
    features: ['Custom GPTs', 'Neural Search', 'Predictive Analysis'],
    color: 'indigo'
  },
  {
    category: 'App Development',
    icon: Smartphone,
    title: 'Native Mobility',
    description: 'High-performance iOS and Android applications with fluid animations and native hardware integration.',
    features: ['Swift & Kotlin', 'React Native', 'Offline-First'],
    color: 'blue'
  },
  {
    category: 'Web Development',
    icon: Globe,
    title: 'Precision Web',
    description: 'Next-gen web applications built for speed, SEO, and massive scalability using Headless architectures.',
    features: ['Next.js 14', 'Edge Rendering', 'Dynamic UX'],
    color: 'emerald'
  },
  {
    category: 'Automation',
    icon: Bot,
    title: 'Intelligent Workflows',
    description: 'End-to-end automation pipelines that replace repetitive tasks with self-healing digital workers.',
    features: ['RPA Systems', 'Auto-Scaling', 'CI/CD Flow'],
    color: 'purple'
  },
  {
    category: 'Software Engineering',
    icon: Terminal,
    title: 'Legacy Migration',
    description: 'Modernizing complex legacy stacks into modular, cloud-native microservices without downtime.',
    features: ['Microservices', 'API First', 'Dockerized'],
    color: 'amber'
  },
  {
    category: 'Cloud Solutions',
    icon: Layers,
    title: 'Edge Infrastructure',
    description: 'Distributed cloud architectures designed for sub-100ms latency across global availability zones.',
    features: ['Serverless', 'Multi-Cloud', 'Auto-healing'],
    color: 'rose'
  }
]

import { DeepTechBackground } from '@/components/ui/deep-tech-background'

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-28 lg:py-40 bg-[#010103] overflow-hidden" id="features">
      <DeepTechBackground />

      <div className="relative container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-4xl mb-20 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-indigo-400 font-mono text-sm mb-6 uppercase tracking-widest"
          >
            <Zap className="w-4 h-4 fill-current" />
            Capabilities
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.1]"
          >
            Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">Next Frontier</span> of Development.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            We don't just build software. We architect high-performance digital ecosystems that leverage AI, Automation, and Cloud to dominate markets.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const colorMap: Record<string, string> = {
              indigo: 'rgba(99, 102, 241, 0.1)',
              blue: 'rgba(59, 130, 246, 0.1)',
              emerald: 'rgba(16, 185, 129, 0.1)',
              purple: 'rgba(168, 85, 247, 0.1)',
              amber: 'rgba(245, 158, 11, 0.1)',
              rose: 'rgba(244, 63, 94, 0.1)'
            }
            const accentColor = colorMap[feature.color] || colorMap.indigo
            const Icon = feature.icon

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="group relative h-full"
              >
                {/* Card Glow Effect */}
                <div 
                  className="absolute -inset-[1px] rounded-[2.2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]" 
                  style={{ background: `linear-gradient(to bottom right, ${accentColor.replace('0.1', '0.5')}, transparent, ${accentColor.replace('0.1', '0.5')})` }}
                />

                {/* Main Card Container */}
                <div className="relative h-full bg-[#07070a]/90 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 lg:p-10 hover:border-white/20 transition-all duration-500 overflow-hidden flex flex-col">
                  
                  {/* Subtle Background Gradient Overlay */}
                  <div 
                    className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 0% 0%, ${accentColor}, transparent 70%)` }}
                  />
                  
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-10 relative z-10">
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 group-hover:border-white/10 group-hover:scale-110 transition-all duration-500 shadow-2xl">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] font-bold">
                      {feature.category}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4 text-white tracking-tight group-hover:text-indigo-400 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-white/50 text-base mb-10 line-clamp-3 leading-relaxed flex-1 group-hover:text-white/70 transition-colors">
                    {feature.description}
                  </p>

                  {/* Sub Features List */}
                  <div className="space-y-4 pt-8 border-t border-white/5 mt-auto relative z-10">
                    {feature.features.map((item) => (
                      <div key={item} className="flex items-center gap-3 text-sm font-medium text-white/30 group-hover:text-white/60 transition-colors">
                        <div 
                          className="w-1.5 h-1.5 rounded-full" 
                          style={{ backgroundColor: accentColor.replace('0.1', '0.8') }} 
                        />
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Animated Accent Line (Progressive) */}
                  <motion.div 
                     initial={{ width: 0 }}
                     whileInView={{ width: '100%' }}
                     className="absolute bottom-0 left-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                     style={{ background: `linear-gradient(to right, transparent, ${accentColor.replace('0.1', '1')}, transparent)` }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Global Tech Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24 lg:mt-32 p-8 lg:p-12 rounded-[40px] bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent border border-white/5 flex flex-wrap justify-between gap-12"
        >
          {[
            { label: 'Uptime SLA', value: '99.99%', sub: 'Enterprise Grade' },
            { label: 'Latency', value: '<100ms', sub: 'Global Edge' },
            { label: 'Deployment', value: 'Atomic', sub: 'Zero Downtime' },
            { label: 'Security', value: 'SOC2', sub: 'Encryption At Rest' }
          ].map((stat) => (
            <div key={stat.label} className="min-w-[120px]">
              <div className="text-muted-foreground text-sm font-mono uppercase tracking-tighter mb-2">{stat.label}</div>
              <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-indigo-400/60 font-medium">{stat.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
