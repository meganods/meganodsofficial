"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider'
import { Button } from '@/components/ui/button'
import { DeepTechBackground } from '@/components/ui/deep-tech-background'
import { 
  ArrowRight, 
  CheckCircle2,
  Zap,
  Settings,
  Code2,
  Database,
  Brain,
  Cloud,
  Shield,
  Activity,
  Cpu,
  Layers,
  ChevronRight,
  Terminal,
  Server,
  Globe
} from 'lucide-react'

const services = [
  {
    id: 'ai',
    icon: Brain,
    title: 'AI & Machine Learning',
    subtitle: 'Neural Infrastructure',
    description: 'Establish autonomous business logic through state-of-the-art machine learning models and predictive neural networks.',
    features: [
      'Natural Language (NLP)',
      'Computer Vision Nodes',
      'Strategic Prediction',
      'Autonomous Agents',
      'MLOps Pipelines',
      'Custom Model Architecture'
    ],
    results: ['-40% Ops Costs', '+65% Efficiency'],
    gradient: 'from-indigo-600 via-blue-600 to-cyan-500',
    meta: "Intelligence Core"
  },
  {
    id: 'cloud',
    icon: Cloud,
    title: 'Cloud Architectures',
    subtitle: 'Global Mesh',
    description: 'Fortified, decentralized cloud infrastructure designed for sub-millisecond latency and infinite scalability.',
    features: [
      'Multi-Cloud Fabric',
      'Mesh Migration',
      'Serverless Core',
      'Container Swarms',
      'Cost Minimization',
      'Disaster Recovery'
    ],
    results: ['99.99% Guaranteed', 'Global Edge'],
    gradient: 'from-cyan-600 via-blue-600 to-indigo-500',
    meta: "Infrastructure Layer"
  },
  {
    id: 'cyber',
    icon: Shield,
    title: 'Cybersecurity Ops',
    subtitle: 'Zero Trust Control',
    description: 'Offensive and defensive security protocols that ensure your digital sovereignty in an era of evolving threats.',
    features: [
      'Real-time Threat Audits',
      'Zero Trust Framework',
      'Incident Suppression',
      'Encryption Shards',
      'Penetration Vectors',
      'Compliant Hardening'
    ],
    results: ['24/7 Observation', 'Zero Data Leakage'],
    gradient: 'from-emerald-600 via-teal-600 to-cyan-500',
    meta: "Security Perimeter"
  },
  {
    id: 'data',
    icon: Activity,
    title: 'Analytics & Insight',
    subtitle: 'Decision Engine',
    description: 'Convert raw data streams into a strategic advantage with high-frequency analytics and real-time visualization.',
    features: [
      'BI Control Centers',
      'Kinetic Visuals',
      'High-Freq Ingestion',
      'Data Lakes v3',
      'ETL Automation',
      'Predictive Dashboards'
    ],
    results: ['+25% Margin Growth', 'Instant Insight'],
    gradient: 'from-amber-500 via-orange-500 to-amber-700',
    meta: "Observation Deck"
  },
]

const processSteps = [
  { icon: Terminal, title: 'Network Audit', description: 'Deep scan of your existing infrastructure to identify optimization vectors.' },
  { icon: Cpu, title: 'Core Design', description: 'Architecting custom neural and structural components for your specific sector.' },
  { icon: Zap, title: 'Rapid Deployment', description: 'High-speed implementation through automated delivery pipelines.' },
  { icon: Globe, title: 'Global Scale', description: 'Multiplying your operational footprint across the global mesh network.' },
]

export default function ServicesPage() {
  return (
    <SmoothScrollProvider>
      <Navigation />
      <main className="min-h-screen bg-[#010103] text-white">
        <div className="fixed inset-0 pointer-events-none z-0">
           <DeepTechBackground />
        </div>

        {/* Hero Section - Capabilities Catalog */}
        <section className="relative pt-32 lg:pt-48 pb-20 z-10 text-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-12"
            >
               <Layers className="w-3 h-3" />
               Capabilities Protocol 0.1
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-7xl lg:text-[10rem] font-bold mb-12 tracking-tighter leading-[0.85]"
            >
              Strategic <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-400 to-emerald-400">Operations</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl lg:text-3xl text-white/40 max-w-6xl mx-auto mb-16 leading-relaxed font-medium"
            >
              Multi-sector intelligence and high-performance infrastructure services designed to provide permanent competitive dominance.
            </motion.p>
        </section>

        {/* Dynamic Services Catalog */}
        <section className="py-24 relative z-10">
          <div className="container mx-auto px-6 lg:px-8">
            {services.map((service, index) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row items-center gap-20 lg:gap-32 mb-40 last:mb-0 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                  {/* Service Visual Hub */}
                  <div className="flex-1 w-full">
                     <div className="relative aspect-square max-w-lg mx-auto lg:mx-0 group">
                        <div className="absolute inset-0 rounded-[4rem] border border-white/10 bg-[#05050a]/60 backdrop-blur-3xl overflow-hidden p-8">
                           <div className="relative w-full h-full rounded-[3rem] bg-black overflow-hidden flex items-center justify-center">
                              {/* Background HUD Layers */}
                              <motion.div 
                                 animate={{ rotate: 360 }}
                                 transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                 className="absolute inset-4 border border-white/5 rounded-full" 
                              />
                              <motion.div 
                                 animate={{ rotate: -360 }}
                                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                 className="absolute inset-16 border border-white/5 rounded-full" 
                              />
                              
                              <div className={`w-32 h-32 rounded-[2.5rem] bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-[0_0_50px_rgba(79,70,229,0.3)] z-10 group-hover:scale-110 transition-transform duration-700`}>
                                 <service.icon className="w-16 h-16 text-white" />
                              </div>

                              {/* Orbiting Particles */}
                              {[...Array(4)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-0"
                                >
                                  <div className={`absolute top-1/2 left-0 w-2 h-2 rounded-full bg-gradient-to-br ${service.gradient}`} />
                                </motion.div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Service Content Layer */}
                  <div className="flex-1 text-left">
                     <div className="text-indigo-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-4">[ {service.meta} ]</div>
                     <span className="text-white/40 text-lg font-bold uppercase tracking-widest block mb-4">{service.subtitle}</span>
                     <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter text-white">
                        {service.title}
                     </h2>
                     <p className="text-xl text-white/40 leading-relaxed font-medium mb-12">
                        {service.description}
                     </p>

                     <div className="grid sm:grid-cols-2 gap-6 mb-16">
                        {service.features.map(feature => (
                           <div key={feature} className="flex items-center gap-4 group/item">
                              <div className="p-2 rounded-lg bg-white/5 border border-white/5 group-hover/item:border-indigo-500/50 transition-colors">
                                 <ChevronRight className="w-3 h-3 text-indigo-400" />
                              </div>
                              <span className="text-sm font-bold text-white/60 group-hover/item:text-white transition-colors">{feature}</span>
                           </div>
                        ))}
                     </div>

                     <div className="flex items-center gap-6">
                        <Button 
                          asChild
                          className={`h-16 px-10 bg-white text-black hover:bg-white/90 font-bold rounded-2xl shadow-2xl transition-all text-lg group`}
                        >
                          <Link href="/contact">
                             Request Intelligence Audit
                             <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                        <div className="flex flex-col">
                           {service.results.map(r => (
                              <span key={r} className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-1">• {r}</span>
                           ))}
                        </div>
                     </div>
                  </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Operational Deployment Lifecycle (Process) */}
        <section className="py-32 lg:py-56 relative z-10 bg-[#05050a]/40 backdrop-blur-3xl border-y border-white/5 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-32">
               <span className="text-indigo-400 font-mono text-xs uppercase tracking-[0.4em] mb-6 block">The Pipeline</span>
               <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
                  Tactical <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Deployment</span>.
               </h2>
               <p className="text-white/40 text-xl lg:text-2xl font-medium leading-relaxed">
                  Our hyper-accelerated delivery lifecycle ensures your infrastructure is optimized and active in record cycles.
               </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-[3rem] overflow-hidden border border-white/5">
              {processSteps.map((step, index) => (
                <div key={step.title} className="bg-[#05050a] p-12 group hover:bg-white/5 transition-all duration-300 relative">
                   <div className="text-5xl font-black text-white/5 absolute top-10 right-10 group-hover:text-indigo-500/10 transition-colors">0{index + 1}</div>
                   <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                      <step.icon className="w-8 h-8 text-indigo-400" />
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">{step.title}</h3>
                   <p className="text-white/30 text-sm font-medium leading-relaxed">{step.description}</p>
                   
                   {/* Kinetic Indicator */}
                   <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Connection Hub CTA */}
        <section className="py-32 lg:py-56 relative z-10 px-6">
           <div className="container mx-auto max-w-5xl">
              <div className="relative rounded-[3rem] lg:rounded-[4rem] border border-white/10 bg-[#05050a]/40 backdrop-blur-3xl overflow-hidden p-1">
                 <div className="relative px-8 py-24 lg:px-24 lg:py-32 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-blue-500/10 pointer-events-none" />
                    <Server className="w-16 h-16 text-indigo-400/20 mx-auto mb-10" />
                    
                    <h2 className="text-4xl md:text-7xl lg:text-9xl font-bold text-white mb-10 tracking-tighter leading-[0.85]">
                       Establish <br />
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">Authority</span>.
                    </h2>
                    <p className="text-white/40 text-xl lg:text-3xl mb-16 max-w-3xl mx-auto font-medium leading-relaxed">
                       Don't just compete. Dominate your market sector with the world's most advanced technology infrastructure.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                       <Button 
                          asChild
                          className="h-20 px-12 bg-white text-black hover:bg-white/90 font-bold rounded-3xl shadow-2xl transition-all text-xl group"
                       >
                          <Link href="/contact">
                             Request Intelligence Audit
                             <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                          </Link>
                       </Button>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
