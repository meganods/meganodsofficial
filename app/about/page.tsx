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
  MessageSquare,
  Building2,
  PhoneCall,
  Mail,
  MapPin,
  ShieldCheck,
  Briefcase,
  FileCode
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
  {
    year: 'Oct 2025',
    title: 'MegaNods Founded',
    description: 'MegaNods officially launched — a focused team of engineers and designers committed to building high-quality digital products for ambitious businesses.'
  },
  {
    year: 'Jan 2026',
    title: 'First Clients Onboarded',
    description: 'Successfully delivered our first batch of projects across web development, mobile apps, and branding — every one delivered on time, within budget, and beyond expectations.'
  },
  {
    year: 'Apr 2026',
    title: 'AI & Automation Division',
    description: 'Launched a dedicated AI services division — offering custom LLM integrations, workflow automation, intelligent chatbots, and data-driven decision tools for enterprise clients.'
  },
  {
    year: 'Aug 2026',
    title: 'Global Client Reach',
    description: 'Expanded our client base to include businesses from UAE, UK, Canada, and Singapore — becoming a trusted cross-border technology delivery partner.'
  },
]


const stats = [
  { value: '99.9%', label: 'Production Uptime', icon: Shield, sub: 'Fault Tolerant' },
  { value: '< 50ms', label: 'Avg Latency', icon: Zap, sub: 'Edge Routing' },
  { value: '50+', label: 'Delivered Projects', icon: Award, sub: 'Global Reach' },
  { value: '100%', label: 'Milestone Tracking', icon: Layers, sub: 'Agile Delivery' },
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

        {/* ═══ HERO SECTION — matches home page style ═══ */}
        <section className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/50">

          {/* Grid + ambient glow background */}
          <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage: `linear-gradient(to right, #4f46e5 1px, transparent 1px), linear-gradient(to bottom, #4f46e5 1px, transparent 1px)`,
                backgroundSize: '48px 48px',
              }}
            />
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] bg-gradient-to-tr from-blue-200/40 via-indigo-200/30 to-purple-200/40 rounded-full blur-[140px]" />
            <div className="absolute top-1/3 -left-20 w-80 h-80 bg-cyan-200/30 rounded-full blur-[110px]" />
            <div className="absolute top-1/3 -right-20 w-80 h-80 bg-violet-200/30 rounded-full blur-[110px]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-indigo-100/40 rounded-full blur-[80px]" />
          </div>

          <div className="relative container mx-auto px-6 lg:px-8 max-w-7xl z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

              {/* ── LEFT: Content ── */}
              <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">

                {/* Status pill */}
                <motion.div
                  initial={{ opacity: 0, y: -15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-3 rounded-full border border-indigo-200/90 bg-white/90 px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-md shadow-indigo-500/5 backdrop-blur-xl hover:border-indigo-400 transition-all cursor-default"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="font-mono text-[11px] tracking-wider uppercase text-slate-500 font-bold">Enterprise Profile</span>
                  <span className="text-slate-300">|</span>
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent font-black tracking-wide">
                    MegaNods
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                </motion.div>

                {/* Sub label */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="text-xs sm:text-sm font-mono tracking-[0.3em] text-slate-400 uppercase font-bold"
                >
                  Architect • Innovate • Scale • <span className="text-emerald-500 font-black">Deliver</span>
                </motion.div>

                {/* Main headline */}
                <div className="relative pt-1">
                  <div className="absolute top-1/2 left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 -translate-y-1/2 w-full max-w-lg h-28 bg-gradient-to-r from-blue-500/15 via-indigo-500/20 to-teal-400/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
                  <motion.h1
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]"
                  >
                    <span className="block text-slate-900 drop-shadow-sm">Architecting</span>
                    <span className="relative inline-block mt-1 font-extrabold italic bg-gradient-to-r from-blue-600 via-indigo-600 via-purple-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent animate-gradient-flow drop-shadow-sm">
                      Total Intelligence.
                    </span>
                  </motion.h1>
                </div>

                {/* Subtext */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.18 }}
                  className="max-w-xl text-base sm:text-lg text-slate-600 leading-relaxed"
                >
                  We are not just a technology company. We are the <span className="font-semibold text-slate-900">structural foundation</span> for the next era of human industry — powered by <span className="font-semibold text-slate-900">specialized neural networks</span> and fortified global infrastructure.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.26 }}
                  className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
                >
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="h-12 px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-xl shadow-blue-500/20 text-sm border-0 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
                    >
                      Initiate Audit <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/team">
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-12 px-6 rounded-xl border-slate-200 bg-white/90 hover:bg-slate-50 text-slate-700 text-sm font-semibold shadow-sm flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
                    >
                      <Users className="h-4 w-4 text-indigo-600" />
                      Meet the Team
                    </Button>
                  </Link>
                </motion.div>

                {/* Inline stats row */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="flex flex-wrap gap-6 pt-3 justify-center lg:justify-start"
                >
                  {[
                    { value: '50+', label: 'Delivered Projects' },
                    { value: '99.9%', label: 'Uptime SLA' },
                    { value: '< 50ms', label: 'Average Latency' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center lg:text-left">
                      <div className="text-2xl font-black text-slate-900 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">{stat.value}</div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* ── RIGHT: Animated Visual ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, x: 24 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 relative flex items-center justify-center"
              >
                {/* Floating cards around the visual */}
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-6 -left-4 z-20 hidden lg:flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-indigo-200/80 shadow-2xl shadow-indigo-500/10"
                >
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono font-bold uppercase text-slate-400">Founded</p>
                    <p className="text-sm font-black text-slate-900">Est. 2025</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [8, -8, 8] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -top-4 -right-4 z-20 hidden lg:flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-indigo-200/80 shadow-2xl shadow-indigo-500/10"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono font-bold uppercase text-slate-400">Global Reach</p>
                    <p className="text-sm font-black text-slate-900">Cross-Border</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [6, -6, 6] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-4 -left-4 z-20 hidden lg:flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-indigo-200/80 shadow-2xl shadow-indigo-500/10"
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono font-bold uppercase text-slate-400">Standards</p>
                    <p className="text-sm font-black text-slate-900">ISO Aligned</p>
                  </div>
                </motion.div>

                {/* Central animated visual orb */}
                <div className="relative w-full max-w-md aspect-square">
                  {/* Outer ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border border-dashed border-indigo-200/60"
                  />
                  {/* Middle ring */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-8 rounded-full border border-dashed border-blue-200/40"
                  />

                  {/* Orbiting dots */}
                  {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                    <motion.div
                      key={i}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12 + i * 2, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0"
                      style={{ transformOrigin: 'center' }}
                    >
                      <div
                        className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 shadow-lg shadow-indigo-500/40"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `rotate(${deg}deg) translateX(${150 - i * 8}px) translateY(-50%)`,
                        }}
                      />
                    </motion.div>
                  ))}

                  {/* Glowing center card */}
                  <div className="absolute inset-12 rounded-[3rem] bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 p-[2px] shadow-2xl shadow-indigo-500/30">
                    <div className="w-full h-full rounded-[2.9rem] bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center gap-4 p-8">
                      <motion.div
                        animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-xl shadow-indigo-500/30"
                      >
                        <Bot className="w-9 h-9 text-white" />
                      </motion.div>
                      <div className="text-center">
                        <div className="text-2xl font-black text-slate-900">MegaNods</div>
                        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-indigo-600 font-bold mt-1">Intelligence Core</div>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] font-mono font-black uppercase tracking-widest text-emerald-600">System Online</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom feature cards — matches home page bottom strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-16 max-w-5xl mx-auto"
            >
              {[
                { icon: Cpu, title: 'AI & Intelligent Systems', desc: 'Custom LLM fine-tuning, automated cognitive workflows, and intelligent business tooling.', color: 'indigo' },
                { icon: Globe, title: 'Cloud Infrastructure', desc: 'Multi-region cloud architecture, CDN acceleration, and high-availability container clusters.', color: 'blue' },
                { icon: Shield, title: 'Enterprise Security', desc: 'Zero-trust architecture, encrypted data pipelines, and hardened cloud infrastructure.', color: 'purple' },
              ].map(({ icon: Icon, title, desc, color }) => (
                <div
                  key={title}
                  className={`p-6 rounded-2xl bg-white border border-slate-200/80 shadow-md flex flex-col items-center text-center group hover:border-${color}-300 hover:shadow-xl transition-all duration-300`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-${color}-50 border border-${color}-100 flex items-center justify-center text-${color}-600 mb-4 group-hover:scale-110 group-hover:bg-${color}-600 group-hover:text-white transition-all duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">{title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
          >
            <div className="w-px h-10 bg-gradient-to-b from-foreground/0 via-foreground to-foreground/0" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500">Scroll</span>
          </motion.div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-24 lg:py-36 relative z-10 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/60 border-y border-slate-100">

          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

              {/* Left: Animated Achievement Visual */}
              <AnimatedSection>
                <div className="relative max-w-md mx-auto lg:mx-0">
                  {/* Main card */}
                  <div className="relative rounded-3xl bg-white border border-slate-200 shadow-xl p-8 overflow-hidden">
                    {/* Gradient top bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500" />
                    
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-md">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-slate-900 font-bold text-sm">MegaNods</div>
                        <div className="text-indigo-500 font-mono text-[9px] uppercase tracking-widest">Quality Audit</div>
                      </div>
                      <div className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-emerald-600 font-mono text-[9px] uppercase font-black">Active</span>
                      </div>
                    </div>

                    {/* Achievement rows */}
                    {[
                      { label: 'Delivered Projects', value: '50+', progress: 95, color: 'from-indigo-500 to-blue-500' },
                      { label: 'Client Satisfaction', value: '4.9 / 5.0', progress: 98, color: 'from-emerald-500 to-teal-500' },
                      { label: 'On-Time Delivery', value: '99%', progress: 99, color: 'from-purple-500 to-indigo-500' },
                      { label: 'Code Review Rigor', value: '100%', progress: 100, color: 'from-amber-500 to-orange-500' },
                    ].map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="mb-5 last:mb-0"
                      >
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-slate-600 text-xs font-semibold">{item.label}</span>
                          <span className="text-slate-900 font-black text-sm">{item.value}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.progress}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12 + 0.3, duration: 1, ease: 'easeOut' }}
                            className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Floating badge — top right */}
                  <motion.div
                    animate={{ y: [-6, 6, -6] }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                    className="absolute -top-5 -right-5 bg-white border border-slate-200 rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2"
                  >
                    <Award className="w-4 h-4 text-amber-500" />
                    <div>
                      <div className="text-slate-900 font-black text-xs">Quality Core</div>
                      <div className="text-slate-400 font-mono text-[8px] uppercase tracking-wider">Peer-Reviewed</div>
                    </div>
                  </motion.div>

                  {/* Floating badge — bottom left */}
                  <motion.div
                    animate={{ y: [6, -6, 6] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-5 -left-5 bg-white border border-slate-200 rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2"
                  >
                    <Globe className="w-4 h-4 text-indigo-500" />
                    <div>
                      <div className="text-slate-900 font-black text-xs">Global Reach</div>
                      <div className="text-slate-400 font-mono text-[8px] uppercase tracking-wider">Remote Delivery</div>
                    </div>
                  </motion.div>
                </div>
              </AnimatedSection>

              {/* Right: Mission & Vision content */}
              <AnimatedSection>
                <div className="space-y-12">
                  {/* Mission */}
                  <div className="relative pl-6 border-l-2 border-indigo-200">
                    <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    <div className="text-indigo-600 font-mono text-[10px] uppercase tracking-[0.4em] mb-3 font-bold">Our Mission</div>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight text-slate-900 leading-tight">
                      Building Software That{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-600">
                        Actually Works
                      </span>
                      .
                    </h2>
                    <p className="text-slate-600 text-base leading-relaxed">
                      MegaNods exists to close the gap between what businesses need and what technology can deliver. We specialise in custom web development, mobile apps, AI integrations, and enterprise-grade digital platforms — built on clean architecture, shipped on time, and designed to scale.
                    </p>
                  </div>

                  {/* Vision */}
                  <div className="relative pl-6 border-l-2 border-emerald-200">
                    <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <div className="text-emerald-600 font-mono text-[10px] uppercase tracking-[0.4em] mb-3 font-bold">Our Vision</div>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight text-slate-900 leading-tight">
                      The Go-To Tech Partner for{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
                        Ambitious Teams
                      </span>
                      .
                    </h2>
                    <p className="text-slate-600 text-base leading-relaxed">
                      We aim to become the most trusted technology partner for growth-focused companies across India and beyond. Every project we take on is treated as our own — with the same urgency, creativity, and accountability we would bring to building our own product.
                    </p>
                  </div>

                  {/* Key differentiators */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    {[
                      { icon: CheckCircle2, text: 'Transparent communication, always' },
                      { icon: CheckCircle2, text: 'Fixed-price & milestone billing' },
                      { icon: CheckCircle2, text: 'Post-launch support included' },
                      { icon: CheckCircle2, text: 'Source code fully owned by you' },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-start gap-2.5">
                        <Icon className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600 text-sm leading-snug">{text}</span>
                      </div>
                    ))}
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
        <section className="py-20 lg:py-32 relative z-10 overflow-hidden">
          {/* Subtle ambient bg */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-indigo-100/40 via-blue-100/30 to-purple-100/40 rounded-full blur-[120px]" />
          </div>

          <div className="relative container mx-auto px-6 lg:px-8">
            {/* Section header */}
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
              <div className="inline-flex items-center gap-3 mb-5">
                <div className="w-6 h-px bg-indigo-400/60" />
                <span className="text-indigo-600 dark:text-indigo-400 font-mono text-[10px] uppercase tracking-[0.4em] font-bold">Foundation</span>
                <div className="w-6 h-px bg-indigo-400/60" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-5 text-slate-900">
                Built on{' '}
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-400">
                  Total Integrity
                </span>
                .
              </h2>
              <p className="text-slate-500 text-base lg:text-lg leading-relaxed">
                Four non-negotiable principles that define every line of code we ship — from prototype to production.
              </p>
            </AnimatedSection>

            {/* Values grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4 }}
                  className="group"
                >
                  <div className="relative bg-white border border-slate-200/80 rounded-2xl p-7 h-full flex flex-col overflow-hidden shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-400">
                    {/* Hover gradient glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500`} />
                    {/* Top accent line */}
                    <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl`} />

                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.12, rotate: 3 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-5 shadow-md relative z-10`}
                    >
                      <value.icon className="w-5 h-5 text-white" />
                    </motion.div>

                    {/* Meta label */}
                    <div className="text-indigo-500 font-mono text-[9px] uppercase tracking-[0.3em] mb-3 opacity-60 relative z-10">
                      [ {value.meta} ]
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold mb-2.5 text-slate-900 group-hover:text-indigo-600 transition-colors duration-300 relative z-10">
                      {value.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-500 text-sm leading-relaxed relative z-10 flex-1">
                      {value.description}
                    </p>

                    {/* Bottom scan line animation */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.4, duration: 0.8 }}
                      className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r ${value.gradient} opacity-20 origin-left`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CORPORATE TRANSPARENCY & E-E-A-T IDENTITY BOXES ═══ */}
        <section className="py-24 lg:py-36 relative z-10 bg-slate-50/70 dark:bg-[#020206] border-y border-slate-200 dark:border-border overflow-hidden">
          {/* Grid Background Accents */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-[140px]" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px]" />
          </div>

          <div className="relative container mx-auto px-6 lg:px-8 max-w-7xl">
            <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 font-mono text-[10px] uppercase tracking-[0.3em] font-bold mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                Operational Transparency
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-foreground">
                Corporate <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">Identity & Disclosure</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
                Comprehensive overview of MegaNods operations, technical capabilities, team pedigree, and corporate governance.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              
              {/* BOX 1: Who MegaNods is: */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative bg-white dark:bg-card border border-slate-200 dark:border-border rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-xl hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500" />
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-xs">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">Founded Oct 2025</span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 dark:text-foreground mb-4 tracking-tight flex items-center gap-2">
                    Who MegaNods is:
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                    MegaNods is an engineering-first technology company and digital innovation partner established in October 2025. We were founded with a singular purpose: to engineer high-resilience, production-grade digital software for modern enterprises.
                  </p>

                  <div className="space-y-3 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-5 text-xs text-slate-600 dark:text-slate-400 font-medium">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                      <span><strong>Engineering Philosophy:</strong> Clean architectural separation, deterministic state validation, and sub-second operational performance.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                      <span><strong>Core Values:</strong> Total transparency, fixed-price milestone delivery, zero technical debt, and 100% IP ownership for clients.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-border flex items-center justify-between text-xs font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                  <span>Entity Status: Active & Operational</span>
                  <span className="text-emerald-500">● 99.9% Uptime</span>
                </div>
              </motion.div>

              {/* BOX 2: What you actually do: */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative bg-white dark:bg-card border border-slate-200 dark:border-border rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-xl hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">Core Capabilities</span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 dark:text-foreground mb-4 tracking-tight flex items-center gap-2">
                    What you actually do:
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                    We deliver end-to-end full-lifecycle software engineering, cloud architecture, and artificial intelligence implementations across four primary service pillars:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {[
                      { title: 'AI & Cognitive Agents', desc: 'Custom LLM fine-tuning, LangGraph state workflows, and vector retrieval (RAG).' },
                      { title: 'Cloud Infrastructure', desc: 'Multi-region Active-Active cloud deployment, Kubernetes meshes, and BGP Anycast.' },
                      { title: 'Cybersecurity Shield', desc: 'Zero-trust architecture, FIDO2/WebAuthn passkeys, and eBPF kernel threat monitoring.' },
                      { title: 'Web & Mobile Systems', desc: 'Next.js 15 Server Components, high-concurrency SaaS apps, and React Native mobile.' },
                    ].map((item, i) => (
                      <div key={i} className="bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-3.5">
                        <p className="font-bold text-slate-900 dark:text-slate-100 mb-1">{item.title}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-border flex items-center justify-between text-xs font-mono text-blue-600 dark:text-blue-400 font-bold">
                  <span>Stack: Next.js, Go, Python, K8s, PostgreSQL</span>
                  <Link href="/services" className="hover:underline flex items-center gap-1">View Services →</Link>
                </div>
              </motion.div>

              {/* BOX 3: Team & company info: */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative bg-white dark:bg-card border border-slate-200 dark:border-border rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-xl hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500" />
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-xs">
                      <Users className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">Global Footprint</span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 dark:text-foreground mb-4 tracking-tight flex items-center gap-2">
                    Team & company info:
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                    MegaNods operates as an elite team of principal engineers, distributed systems architects, security specialists, and UI/UX designers with deep technical pedigree across leading global hubs.
                  </p>

                  <div className="space-y-3 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-5 text-xs text-slate-600 dark:text-slate-400 font-medium">
                    <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800 pb-2">
                      <span className="text-slate-900 dark:text-slate-100 font-bold">Core Leadership:</span>
                      <span>Principal AI Architects & Lead Systems Engineers</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800 pb-2">
                      <span className="text-slate-900 dark:text-slate-100 font-bold">Cross-Border Delivery:</span>
                      <span>Client operations in UAE, UK, Canada, and Singapore</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-900 dark:text-slate-100 font-bold">Engagement Model:</span>
                      <span>Agile milestone sprints with dedicated technical leads</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-border flex items-center justify-between text-xs font-mono text-purple-600 dark:text-purple-400 font-bold">
                  <span>50+ Projects Successfully Delivered</span>
                  <Link href="/team" className="hover:underline flex items-center gap-1">Meet The Team →</Link>
                </div>
              </motion.div>

              {/* BOX 4: Business & contact info: */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative bg-white dark:bg-card border border-slate-200 dark:border-border rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xs">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">Corporate Headquarters</span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 dark:text-foreground mb-4 tracking-tight flex items-center gap-2">
                    Business & contact info:
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                    Connect directly with our corporate headquarters or dispatch an encrypted communication to our client operations desk:
                  </p>

                  <div className="space-y-3 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-5 text-xs text-slate-700 dark:text-slate-300">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-slate-100">HQ Address:</p>
                        <p className="text-slate-600 dark:text-slate-400 text-xs">OC-821 8th Floor, Gaur City Centre, Greater Noida West, Uttar Pradesh, India.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                      <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <div>
                        <span className="font-bold text-slate-900 dark:text-slate-100">Official Email: </span>
                        <a href="mailto:admin@meganods.com" className="text-emerald-600 dark:text-emerald-400 font-mono hover:underline font-bold">admin@meganods.com</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                      <PhoneCall className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <div>
                        <span className="font-bold text-slate-900 dark:text-slate-100">Direct Phone: </span>
                        <a href="tel:+918796140682" className="text-emerald-600 dark:text-emerald-400 font-mono hover:underline font-bold">+91 8796140682</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-border flex items-center justify-between text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Operating Hours: Mon – Sat (9AM – 7PM IST)</span>
                  <Link href="/contact" className="hover:underline flex items-center gap-1">Contact Desk →</Link>
                </div>
              </motion.div>

            </div>
          </div>
        </section>


        {/* The Timeline Mesh */}
        <section className="py-32 lg:py-56 relative z-10 bg-secondary/40 backdrop-blur-3xl border-y border-border">
          <div className="relative container mx-auto px-6 lg:px-8">
            <AnimatedSection className="text-center max-w-4xl mx-auto mb-32">
              <span className="text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-[0.4em] mb-6 block">Evolution</span>
              <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-indigo-400 dark:to-blue-400">Growth Story</span>.
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
        <section className="py-20 lg:py-28 relative z-10 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 bg-white shadow-xl">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/60 pointer-events-none" />
                {/* Animated top border */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

                <div className="relative px-8 py-16 lg:px-20 lg:py-20 text-center">
                  {/* Animated badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    </motion.div>
                    <span className="text-indigo-600 font-mono text-[10px] uppercase tracking-[0.35em] font-bold">Ready to Start?</span>
                  </motion.div>

                  {/* Heading */}
                  <motion.h2
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15, duration: 0.6 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-5 tracking-tight leading-tight"
                  >
                    Let&apos;s Build Something{' '}
                    <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-400 animate-gradient-flow">
                      Extraordinary
                    </span>
                    .
                  </motion.h2>

                  {/* Subtext */}
                  <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.22, duration: 0.6 }}
                    className="text-slate-500 text-base lg:text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
                  >
                    Whether you have a product idea, a broken system to fix, or a team that needs technical reinforcement — we're the partner that gets it done right.
                  </motion.p>

                  {/* Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-4"
                  >
                    <Button
                      asChild
                      size="lg"
                      className="h-12 px-8 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 text-sm border-0 gap-2 hover:scale-105 active:scale-95 transition-all"
                    >
                      <Link href="/contact">
                        Start a Project <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="h-12 px-8 rounded-xl border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold shadow-sm hover:scale-105 active:scale-95 transition-all"
                    >
                      <Link href="/projects">View Our Work</Link>
                    </Button>
                  </motion.div>

                  {/* Trust badges */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-10 flex flex-wrap justify-center gap-6"
                  >
                    {[
                      { icon: Shield, text: 'NDA Protected' },
                      { icon: CheckCircle2, text: 'Free Consultation' },
                      { icon: Zap, text: '48-hr Response' },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-2 text-slate-400">
                        <Icon className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="text-xs font-mono uppercase tracking-widest">{text}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}

