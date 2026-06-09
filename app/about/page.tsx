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
  Target,
  Eye,
  Heart,
  Zap,
  Award,
  Users,
  Globe,
  CheckCircle2,
  Bot,
  Cpu,
  Shield,
  Fingerprint,
  Layers,
  Sparkles,
  Search,
  MessageSquare
} from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Precision First',
    description: 'We prioritize sub-millisecond precision in every algorithm we deploy to the global network.',
    gradient: 'from-indigo-600 via-blue-600 to-cyan-500',
    meta: 'Operational Core'
  },
  {
    icon: Heart,
    title: 'Human-Centric AI',
    description: 'Technology is a tool for humanity. We design systems that empower, never replace.',
    gradient: 'from-rose-600 via-pink-600 to-orange-500',
    meta: 'Ethics Audit 01'
  },
  {
    icon: Shield,
    title: 'Fortified Security',
    description: 'End-to-end encryption and decentralized nodes ensure your data stays yours.',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-500',
    meta: 'Secure Layer V3'
  },
  {
    icon: Zap,
    title: 'Kinetic Scale',
    description: 'Our infrastructure grows in real-time alongside your business ambitions.',
    gradient: 'from-amber-500 via-orange-500 to-amber-600',
    meta: 'Growth Engine'
  },
]

const milestones = [
  { year: '2015', title: 'Genesis Protocol', description: 'Meganods founded with a vision for autonomous intelligence.' },
  { year: '2018', title: 'Neural Core v1', description: 'First large-scale enterprise AI deployment for Fortune 500 partners.' },
  { year: '2020', title: 'Global Mesh Expansion', description: 'Deployment of 500+ edge nodes across all major continents.' },
  { year: '2022', title: 'Pulse Sentinel', description: 'Launch of our fortified security and infrastructure management suite.' },
  { year: '2024', title: 'The Intelligence Frontier', description: 'Dominating the market as the gold standard for Deep Tech solutions.' },
]

const stats = [
  { value: '1.2B', label: 'Nodes Managed', icon: Layers, sub: 'Global Scale' },
  { value: '50ms', label: 'Avg Latency', icon: Zap, sub: 'Ultra-Fast' },
  { value: '450+', label: 'Enterprise Partners', icon: Award, sub: 'Strategic' },
  { value: '99.9%', label: 'Active Uptime', icon: Shield, sub: 'Fault Tolerant' },
]

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function AboutPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <SmoothScrollProvider>
      <Navigation />
      <main className="bg-background text-foreground transition-colors duration-500">
        {/* Dynamic Atmospheric Backgrounds */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <DeepTechBackground />
        </div>

        {/* Hero Section - The Manifesto */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 lg:pt-48">
          <div className="relative container mx-auto px-6 py-20 text-center z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border text-indigo-600 dark:text-indigo-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-12"
            >
              <Fingerprint className="w-3 h-3" />
              Enterprise Profile: Meganods
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-7xl lg:text-[10rem] font-bold mb-12 tracking-tighter leading-[0.85]"
            >
              Architecting <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-400 to-emerald-400">Total Intelligence</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl lg:text-3xl text-muted-foreground max-w-6xl mx-auto mb-16 leading-relaxed font-bold"
            >
              We are not just a technology company. We are the structural foundation for the next era of human industry—powered by specialized neural networks and fortified global infrastructure.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center gap-6"
            >
              <Button
                asChild
                size="lg"
                className="h-16 lg:h-20 px-10 bg-foreground text-background hover:bg-foreground/90 font-bold rounded-2xl lg:rounded-3xl shadow-2xl transition-all text-lg group border-0"
              >
                <Link href="/contact">
                  Initiate Audit
                  <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-16 lg:h-20 px-10 border-border text-foreground hover:bg-secondary font-bold rounded-2xl lg:rounded-3xl text-lg backdrop-blur-md"
              >
                <Link href="/team">View Base Operations</Link>
              </Button>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
          >
            <div className="w-px h-12 bg-gradient-to-b from-foreground/0 via-foreground to-foreground/0" />
            <span className="text-[10px] font-mono uppercase tracking-widest">Protocol Scrolled</span>
          </motion.div>
        </section>        {/* The Operational Core (Mission) */}
        <section className="py-32 lg:py-56 relative z-10 bg-secondary/40 backdrop-blur-3xl border-y border-border">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-24 lg:gap-40 items-center">
              <AnimatedSection>
                <div className="relative aspect-square max-w-lg mx-auto lg:mx-0">
                  <div className="absolute inset-0 rounded-[4rem] border border-border bg-card overflow-hidden p-6">
                    <div className="relative w-full h-full rounded-[3rem] bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent flex items-center justify-center p-12 overflow-hidden group">
                      <motion.div
                        animate={{
                          rotate: [0, 90, 180, 270, 360],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-indigo-500/5 rounded-full scale-110"
                      />
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-full aspect-square rounded-[3.5rem] bg-gradient-to-br from-indigo-600 via-blue-600 to-emerald-500 p-[1px] shadow-[0_0_50px_rgba(79,70,229,0.3)]"
                      >
                        <div className="w-full h-full bg-card rounded-[3.4rem] flex items-center justify-center">
                          <Bot className="w-32 h-32 text-foreground group-hover:scale-110 transition-transform duration-500" />
                        </div>
                      </motion.div>

                      {/* HUD Data Rings */}
                      <div className="absolute inset-4 border border-border/40 rounded-full pointer-events-none opacity-20" />
                      <div className="absolute inset-12 border border-border/40 rounded-full pointer-events-none opacity-10" />
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <div className="space-y-16">
                  <div>
                    <div className="text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-[0.4em] mb-4">Core Vision</div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">
                      The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-indigo-400 to-blue-500 dark:from-indigo-400 dark:to-blue-400">Mission Protocol</span>.
                    </h2>
                    <p className="text-muted-foreground text-xl leading-relaxed font-medium">
                      To empower global industry through the seamless integration of artificial intelligence and high-performance engineering. We bridge the gap between complex business logic and autonomous execution.
                    </p>
                  </div>
                  <div>
                    <div className="text-emerald-600 dark:text-emerald-400 font-mono text-xs uppercase tracking-[0.4em] mb-4">Strategic Map</div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">
                      Tomorrow’s <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400">Sovereignty</span>.
                    </h2>
                    <p className="text-muted-foreground text-xl leading-relaxed font-medium">
                      Establishing a world where technology doesn't just assist humans—it anticipates their needs, fortifies their security, and scales their ambitions across infinite horizons.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Global Impact Grid */}
        <section className="py-24 lg:py-40 relative z-10">
          <div className="container mx-auto px-6 lg:px-8">
            <AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-[3rem] overflow-hidden border border-border shadow-md dark:shadow-none">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="bg-card p-12 group hover:bg-secondary/40 transition-all duration-300 relative">
                    <div className="text-indigo-600/50 dark:text-indigo-400/50 font-mono text-[10px] uppercase mb-6 tracking-widest flex items-center justify-between">
                      {stat.sub}
                      <stat.icon className="w-5 h-5 opacity-20 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="text-5xl lg:text-7xl font-bold text-foreground mb-3 tracking-tighter group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
                    {/* Kinetic Accent */}
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Guiding Principles */}
        <section className="py-32 lg:py-56 relative z-10 overflow-hidden">
          <div className="relative container mx-auto px-6 lg:px-8">
            <AnimatedSection className="text-center max-w-4xl mx-auto mb-24 lg:mb-32">
              <span className="text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-[0.4em] mb-6 block">Foundation</span>
              <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold mb-8 tracking-tighter leading-[0.85]">
                Built on <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-400 to-emerald-400 dark:from-indigo-400 dark:via-blue-400 dark:to-emerald-400">Total Integrity</span>.
              </h2>
              <p className="text-muted-foreground text-xl lg:text-2xl font-medium leading-relaxed">
                Our core architecture is built upon four non-negotiable principles that define every line of code we ship.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-card/60 backdrop-blur-xl border border-border rounded-[2.5rem] p-10 h-full flex flex-col hover:border-indigo-500/30 transition-all duration-500 overflow-hidden relative">
                    {/* Hover Glow */}
                    <div className={`absolute -inset-1 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 transition-opacity blur-2xl`} />

                    <div className={`w-16 h-16 rounded-[1.2rem] bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-10 group-hover:scale-110 transition-all duration-500 shadow-2xl relative z-10`}>
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-emerald-600 dark:text-emerald-400 font-mono text-[10px] uppercase tracking-widest mb-4 opacity-50 relative z-10">
                      [ {value.meta} ]
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors relative z-10">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed relative z-10 group-hover:text-foreground/80 transition-colors">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The Timeline Mesh */}
        <section className="py-32 lg:py-56 relative z-10 bg-secondary/40 backdrop-blur-3xl border-y border-border">
          <div className="relative container mx-auto px-6 lg:px-8">
            <AnimatedSection className="text-center max-w-4xl mx-auto mb-32">
              <span className="text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-[0.4em] mb-6 block">Evolution</span>
              <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
                Chronicle of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-indigo-400 dark:to-blue-400">Expansion</span>.
              </h2>
            </AnimatedSection>

            <div className="relative max-w-4xl mx-auto">
              {/* Technical Mesh Line */}
              <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />
              <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-emerald-500 to-blue-500 opacity-20" />

              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className={`relative flex items-start mb-24 md:mb-32 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <div className="bg-card border border-border rounded-[2rem] p-10 hover:border-indigo-500/30 transition-all duration-500 group shadow-sm dark:shadow-none">
                      <div className="text-indigo-600 dark:text-indigo-400 font-mono text-3xl font-bold mb-4 tracking-tighter">{milestone.year}</div>
                      <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{milestone.title}</h3>
                      <p className="text-muted-foreground leading-relaxed font-medium">{milestone.description}</p>
                    </div>
                  </div>
                  {/* Mesh Point */}
                  <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 mt-10 md:mt-12 w-3 h-3 rounded-full bg-indigo-500 z-20 border-4 border-background group-hover:scale-150 group-hover:bg-indigo-600 transition-all" />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Secure Engagement CTA */}
        <section className="py-32 lg:py-56 relative z-10 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-8">
            <AnimatedSection>
              <div className="relative rounded-[3rem] lg:rounded-[4rem] overflow-hidden border border-border bg-card/60 backdrop-blur-3xl p-1">
                <div className="relative px-8 py-24 lg:px-24 lg:py-32 text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-emerald-500/10 pointer-events-none" />
                  <Sparkles className="w-16 h-16 text-indigo-600/20 dark:text-indigo-400/20 mx-auto mb-10" />

                  <h2 className="text-4xl md:text-7xl lg:text-[7rem] font-bold text-foreground mb-10 tracking-tighter leading-[0.85]">
                    Scale Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-400 to-emerald-400 dark:from-indigo-400 dark:via-blue-400 dark:to-emerald-400">Future Now</span>.
                  </h2>
                  <p className="text-muted-foreground text-xl lg:text-2xl mb-16 max-w-3xl mx-auto leading-relaxed font-medium">
                    Contact our strategic engineering department to discuss your unique organizational requirements and begin your infrastructure audit.
                  </p>
                  <div className="flex flex-wrap justify-center gap-6">
                    <Button
                      asChild
                      size="lg"
                      className="h-16 lg:h-20 px-12 bg-foreground text-background hover:bg-foreground/90 font-bold rounded-2xl lg:rounded-3xl shadow-2xl transition-all text-xl group border-0"
                    >
                      <Link href="/contact">
                        Initiate Connection
                        <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>

                  {/* Security Badge */}
                  <div className="mt-20 inline-flex items-center gap-4 px-6 py-3 rounded-full bg-indigo-500/5 border border-indigo-500/10 dark:border-indigo-500/20 opacity-30">
                    <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-foreground font-mono text-[10px] uppercase tracking-widest">256-bit Encrypted Session</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
