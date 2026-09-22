"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowRight, 
  Brain, 
  Cloud, 
  ChevronLeft, 
  ChevronRight,
  Smartphone,
  Globe,
  Layout,
  ShoppingBag,
  Cpu,
  Zap,
  Code2,
  ShieldCheck,
  Layers,
  Search,
  PenTool,
  Lock,
  Server,
  TrendingUp,
  Sparkles,
  Terminal,
  CheckCircle2,
  Activity,
  FileCode2,
  Database,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { DeepTechBackground } from '@/components/ui/deep-tech-background'

// Comprehensive Story Visual Renderer for Every Service Episode
const ServiceVisual = ({ service, gradient }: { service: any, gradient: string }) => {
  const typeKey = (service.type || service.id || service.title || '').toLowerCase()

  // 1. WORDPRESS & DECOUPLED CMS
  if (typeKey.includes('wordpress') || typeKey.includes('cms') || typeKey.includes('gutenberg')) {
    return (
      <div className="relative w-full h-full flex items-center justify-center p-6 sm:p-8">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="relative w-full max-w-md bg-slate-900/95 text-white rounded-3xl border border-indigo-500/30 p-5 shadow-2xl overflow-hidden backdrop-blur-xl"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#21759b] flex items-center justify-center font-bold text-white text-[11px] shadow-sm">
                W
              </div>
              <span className="font-bold text-slate-200">Decoupled WP Studio</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              GraphQL Live
            </div>
          </div>

          {/* Gutenberg Block Visual Preview */}
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600/30 via-indigo-600/20 to-purple-600/30 border border-blue-500/30 relative overflow-hidden">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-300 font-bold flex items-center gap-1.5">
                  <FileCode2 className="w-3 h-3" />
                  &lt;wp:hero-block /&gt;
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded bg-blue-500/30 text-white font-mono">Speed 100/100</span>
              </div>
              <div className="h-2 w-3/4 bg-white/30 rounded-full mb-1" />
              <div className="h-2 w-1/2 bg-white/15 rounded-full" />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[10px] font-mono text-slate-400 mb-1">Custom Post Type</div>
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Headless REST
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[10px] font-mono text-slate-400 mb-1">SSR Edge Cache</div>
                <div className="text-xs font-bold text-indigo-400 flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Sub-150ms TTFB
                </div>
              </div>
            </div>
          </div>

          {/* Floating Floating Accent Badge */}
          <motion.div 
            animate={{ y: [-4, 4, -4] }} 
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-4 p-3 rounded-xl bg-gradient-to-r from-indigo-600/40 to-blue-600/40 border border-indigo-400/40 flex items-center justify-between"
          >
            <span className="text-[11px] font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Enterprise Security Fortified
            </span>
            <span className="text-[10px] font-mono text-indigo-200">OWASP TOP 10</span>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  // 2. MOBILE APP DEVELOPMENT
  if (typeKey.includes('app') || typeKey.includes('mobile') || typeKey.includes('ios') || typeKey.includes('android')) {
    return (
      <div className="relative w-full h-full flex items-center justify-center p-6 sm:p-8">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative w-52 h-84 bg-slate-950 rounded-[2.5rem] border-2 border-slate-700 p-3 shadow-2xl">
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full border border-white/10" />
          <div className="w-full h-full bg-gradient-to-b from-slate-900 to-slate-950 rounded-[2.2rem] overflow-hidden flex flex-col p-4 pt-7 text-white">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-indigo-400 font-mono">NATIVE SUITE</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-3.5 bg-white/20 rounded-full" />
              <div className="p-3 bg-indigo-600/30 border border-indigo-500/30 rounded-xl space-y-1.5">
                <div className="h-2.5 w-full bg-indigo-400/40 rounded-full" />
                <div className="h-2 w-2/3 bg-indigo-400/20 rounded-full" />
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                 <div className="h-14 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center justify-center text-[10px] font-bold text-slate-300">
                    <Smartphone className="w-4 h-4 text-cyan-400 mb-1" />
                    iOS Swift
                 </div>
                 <div className="h-14 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center justify-center text-[10px] font-bold text-slate-300">
                    <Layers className="w-4 h-4 text-emerald-400 mb-1" />
                    Kotlin Native
                 </div>
              </div>
            </div>
          </div>
          <motion.div animate={{ y: [-6, 6, -6] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -right-6 top-1/3 w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl border border-white/20">
             <Smartphone className="w-7 h-7 text-white" />
          </motion.div>
        </motion.div>
      </div>
    )
  }

  // 3. WEB DEVELOPMENT & HEADLESS FRONTENDS
  if (typeKey.includes('web') || typeKey.includes('frontend') || typeKey.includes('next')) {
    return (
      <div className="relative w-full h-full flex items-center justify-center p-6 sm:p-8">
         <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative w-full max-w-md bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
            <div className="h-7 bg-slate-900 w-full flex items-center justify-between px-4 border-b border-white/10 text-[10px] text-slate-400 font-mono">
               <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
               </div>
               <span>Next.js 14 App Router</span>
               <span className="text-emerald-400 font-bold">100 FPS</span>
            </div>
            <div className="p-5 space-y-3.5 font-mono text-xs">
               <div className="p-3 bg-indigo-950/40 border border-indigo-500/20 rounded-xl text-indigo-300">
                  <span className="text-purple-400">const</span> <span className="text-cyan-400">architecture</span> = <span className="text-yellow-300">createEdgeNode</span>(&#123;
                  <div className="pl-4 text-emerald-400">ssr: true, latency: '&lt;50ms'</div>
                  &#125;);
               </div>
               <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-300 text-[11px]">
                     <div className="text-slate-400 text-[9px] uppercase font-bold">Lighthouse</div>
                     <div className="text-emerald-400 font-black text-sm mt-0.5">100 Performance</div>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-300 text-[11px]">
                     <div className="text-slate-400 text-[9px] uppercase font-bold">SEO Score</div>
                     <div className="text-cyan-400 font-black text-sm mt-0.5">Grade A+ Fortified</div>
                  </div>
               </div>
            </div>
            <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-3 right-4 bg-emerald-500/20 px-3 py-1 rounded-md text-[10px] text-emerald-400 border border-emerald-500/40 font-mono">
               {"Edge Render Active"}
            </motion.div>
         </motion.div>
      </div>
    )
  }

  // 4. AI & MACHINE LEARNING
  if (typeKey.includes('ai') || typeKey.includes('neural') || typeKey.includes('machine') || typeKey.includes('intelligence')) {
    return (
      <div className="relative w-full h-full flex items-center justify-center p-6">
         <div className="relative w-64 h-64">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-dashed border-indigo-500/30" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
               <motion.div 
                 animate={{ scale: [1, 1.2, 1] }} 
                 transition={{ duration: 4, repeat: Infinity }}
                 className="w-36 h-36 bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 rounded-full blur-2xl" 
               />
               <motion.div 
                 animate={{ 
                   boxShadow: ['0 0 20px rgba(99,102,241,0.3)', '0 0 45px rgba(99,102,241,0.6)', '0 0 20px rgba(99,102,241,0.3)'] 
                 }}
                 transition={{ duration: 2.5, repeat: Infinity }}
                 className="relative w-28 h-28 rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 flex flex-col items-center justify-center text-white shadow-2xl border border-white/20"
               >
                  <Brain className="w-12 h-12 text-white mb-1" />
                  <span className="text-[9px] font-mono uppercase tracking-widest font-black">Neural LLM</span>
               </motion.div>
            </div>
            {[...Array(6)].map((_, i) => (
               <motion.div
                 key={i}
                 animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.4, 1, 0.4] }}
                 transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}
                 className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                 style={{
                   left: '50%',
                   top: '50%',
                   transformOrigin: '0 0',
                   transform: `rotate(${i * 60}deg) translateX(115px)`
                 }}
               />
            ))}
         </div>
      </div>
    )
  }

  // 5. CLOUD, DEVOPS & INFRASTRUCTURE
  if (typeKey.includes('cloud') || typeKey.includes('devops') || typeKey.includes('server') || typeKey.includes('infrastructure')) {
    return (
      <div className="relative w-full h-full flex items-center justify-center p-6">
        <div className="relative w-full max-w-md bg-slate-900/90 text-white rounded-3xl border border-cyan-500/30 p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <Cloud className="w-5 h-5 text-cyan-400" />
              <span className="font-bold text-sm">Distributed Edge Mesh</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">Multi-Region Active</span>
          </div>
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
              <span>US-East / EU-Central / AP-South</span>
              <span className="text-emerald-400 font-bold">99.999% SLA</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-slate-400 text-[9px]">KUBERNETES PODS</div>
                <div className="text-cyan-400 font-bold mt-1">Auto-Scaling Live</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-slate-400 text-[9px]">LATENCY MESH</div>
                <div className="text-emerald-400 font-bold mt-1">&lt; 18ms Global</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 6. E-COMMERCE & MARKETPLACE
  if (typeKey.includes('commerce') || typeKey.includes('shop') || typeKey.includes('marketplace') || typeKey.includes('store')) {
    return (
      <div className="relative w-full h-full flex items-center justify-center p-6">
        <div className="relative w-full max-w-md bg-slate-900/90 text-white rounded-3xl border border-emerald-500/30 p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <span className="font-bold text-sm">High-Volume Commerce Engine</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Live Checkout</span>
          </div>
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-600/30 to-teal-600/30 border border-emerald-500/30 flex justify-between items-center">
              <div>
                <div className="text-[10px] text-emerald-200">TRANSACTION VELOCITY</div>
                <div className="text-lg font-bold text-white">$148,920 ARR / min</div>
              </div>
              <Zap className="w-6 h-6 text-emerald-400 animate-pulse" />
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-slate-400 text-[9px]">MULTI-VENDOR</div>
                <div className="text-emerald-400 font-bold mt-1">Split Payments</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-slate-400 text-[9px]">CHECKOUT CONVERSION</div>
                <div className="text-cyan-400 font-bold mt-1">3.8x Industry Avg</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 7. CYBERSECURITY & ZERO TRUST
  if (typeKey.includes('security') || typeKey.includes('cyber') || typeKey.includes('shield') || typeKey.includes('zero-trust')) {
    return (
      <div className="relative w-full h-full flex items-center justify-center p-6">
        <div className="relative w-full max-w-md bg-slate-900/90 text-white rounded-3xl border border-rose-500/30 p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-rose-400" />
              <span className="font-bold text-sm">Zero-Trust Shield Radar</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">256-bit TLS</span>
          </div>
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 flex justify-between items-center text-rose-300">
              <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-rose-400" /> Threat Neutralization</span>
              <span className="text-emerald-400 font-bold">100% Protected</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-300">
              <div className="text-slate-400 text-[9px]">OWASP & SOC2 TYPE II</div>
              <div className="text-emerald-400 font-bold mt-1">Automated Compliance Guard</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // DEFAULT DYNAMIC ROTATING NODE WITH HIGH-TECH PARTICLES
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6">
       <motion.div 
         animate={{ rotate: 360 }}
         transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
         className="relative w-64 h-64"
       >
          <div className="absolute inset-0 border border-border/40 dark:border-white/10 rounded-full" />
          <div className="absolute inset-8 border border-dashed border-indigo-500/30 rounded-full" />
          <div className="absolute inset-0 flex items-center justify-center rotate-[-360deg]">
             <div className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${gradient} flex flex-col items-center justify-center shadow-2xl text-white border border-white/20`}>
                <Cpu className="w-12 h-12 mb-1" />
                <span className="text-[9px] font-mono uppercase tracking-widest font-black">Core Engine</span>
             </div>
          </div>
       </motion.div>
    </div>
  )
}

export function ServicesPreviewSection() {
  const [services, setServices] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const q = query(
          collection(db, "services"), 
          where("isActive", "==", true),
          orderBy("order", "asc"), 
          orderBy("createdAt", "desc")
        )
        const querySnapshot = await getDocs(q)
        if (!querySnapshot.empty) {
          const docs = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          setServices(docs)
        } else {
          // Robust Default Services Catalog
          setServices([
            {
              id: 'wordpress-development',
              title: 'WordPress & Headless CMS',
              category: 'CMS Infrastructure',
              description: 'Enterprise-grade WordPress architectures. We bypass the bloat to deliver decoupled, secure, and SEO-fortified content management systems for modern organizations.',
              gradient: 'from-blue-600 to-indigo-600',
              features: ['Headless WP (GraphQL)', 'Custom Gutenberg Blocks', 'Security Hardening Pro', 'High-Volume Performance']
            },
            {
              id: 'web-development',
              title: 'Next-Gen Web Applications',
              category: 'Digital Systems',
              description: 'High-performance web platforms engineered with Next.js 14, TypeScript, and edge rendering for lightning-fast sub-second experiences.',
              gradient: 'from-emerald-500 to-teal-500',
              features: ['Sub-100ms TTFB', 'Server Components', 'Micro-Frontend Mesh', 'Global Edge CDN']
            },
            {
              id: 'app-development',
              title: 'Mobile & Native Mobility',
              category: 'Mobile Ecosystems',
              description: 'Native iOS and Android architectures delivering immersive fluid animations, offline-first sync, and native device hardware integration.',
              gradient: 'from-indigo-600 to-cyan-500',
              features: ['Swift & Kotlin', 'React Native & Flutter', 'Offline-First Telemetry', 'Biometric Security']
            },
            {
              id: 'ai-cognitive',
              title: 'Artificial Intelligence & Neural Systems',
              category: 'Cognitive Computing',
              description: 'Custom LLMs, cognitive vector agents, and predictive AI pipelines tailored to automate multi-department enterprise workflows.',
              gradient: 'from-purple-600 to-pink-500',
              features: ['Custom Enterprise LLMs', 'Vector Embeddings', 'Automated Agents', 'Sub-8ms Inference']
            }
          ])
        }
      } catch (error) {
        console.error("SERVICES_FETCH_ERROR:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchServices()
  }, [])

  const next = () => {
    if (services.length === 0) return
    setDirection(1)
    setIndex((prev) => (prev + 1) % services.length)
  }

  const prev = () => {
    if (services.length === 0) return
    setDirection(-1)
    setIndex((prev) => (prev - 1 + services.length) % services.length)
  }

  // Auto-play mechanism
  useEffect(() => {
    if (!isAutoPlaying || services.length === 0) return
    const interval = setInterval(next, 7000)
    return () => clearInterval(interval)
  }, [index, isAutoPlaying, services.length])

  const handleManualNav = (action: () => void) => {
    setIsAutoPlaying(false)
    action()
    // Resume auto-play after 12s of inactivity
    setTimeout(() => setIsAutoPlaying(true), 12000)
  }

  if (isLoading) {
    return (
      <section className="relative py-24 lg:py-32 bg-background overflow-hidden" id="services">
        <DeepTechBackground />
        <div className="flex flex-col items-center justify-center py-40 gap-6">
          <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
          <p className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.4em] animate-pulse font-bold">Synchronizing Services Catalog...</p>
        </div>
      </section>
    )
  }

  if (services.length === 0) return null

  const currentService = services[index]

  return (
    <section className="relative py-24 lg:py-36 bg-background overflow-hidden" id="services">
      <DeepTechBackground />

      <div className="relative container mx-auto px-6 lg:px-8 max-w-7xl">
        {/* Section Header HUD */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 lg:mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-indigo-600 dark:text-indigo-400 font-mono text-[11px] mb-3 uppercase tracking-[0.35em] font-bold flex items-center gap-3"
            >
              <div className="w-8 h-px bg-indigo-600/50" />
              MASTERED CAPABILITIES
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight"
            >
              Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600">Services & Solutions</span>.
            </motion.h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground font-normal">
              High-velocity digital architectures, custom AI agents, and enterprise infrastructure.
            </p>
          </div>
          
          <div className="flex items-center gap-3 self-end">
            <button
              onClick={() => handleManualNav(prev)}
              className="group w-12 h-12 rounded-2xl border border-border bg-card/80 flex items-center justify-center hover:bg-secondary hover:border-indigo-400 transition-all text-foreground shadow-sm active:scale-95 cursor-pointer"
              aria-label="Previous episode"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => handleManualNav(next)}
              className="group w-12 h-12 rounded-2xl border border-border bg-card/80 flex items-center justify-center hover:bg-secondary hover:border-indigo-400 transition-all text-foreground shadow-sm active:scale-95 cursor-pointer"
              aria-label="Next episode"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Dynamic Episode Frame */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: direction * -40, filter: 'blur(8px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center"
            >
              {/* Story Visual Side (Left 5 Cols) */}
              <div className="lg:col-span-5 relative group">
                <div className={`absolute -inset-6 bg-gradient-to-br ${currentService.gradient || 'from-indigo-500 to-blue-500'} rounded-[2.5rem] opacity-20 blur-[80px] pointer-events-none`} />
                <div className="relative aspect-[4/3] sm:aspect-square rounded-[2.5rem] overflow-hidden border border-border/80 bg-card/80 backdrop-blur-2xl group-hover:border-indigo-500/40 transition-all duration-500 shadow-xl flex items-center justify-center">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />
                  <ServiceVisual service={currentService} gradient={currentService.gradient || 'from-indigo-500 to-blue-500'} />
                </div>
              </div>

              {/* Story Content Side (Right 7 Cols) */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex flex-wrap items-center gap-3 mb-5"
                >
                  <span className="px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                    Episode {index + 1} of {services.length}
                  </span>
                  <div className="h-3 w-px bg-border" />
                  <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider font-mono">
                    {currentService.category || 'Strategic Capability'}
                  </span>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 tracking-tight leading-snug"
                >
                  {currentService.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="text-sm sm:text-base text-muted-foreground mb-8 leading-relaxed font-normal max-w-2xl"
                >
                  {currentService.description}
                </motion.p>

                {/* Feature Tags Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                  {(currentService.features || []).map((feature: string, i: number) => (
                    <motion.div 
                      key={feature} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-card/60 border border-border/70 hover:border-indigo-400/40 hover:bg-card transition-all"
                    >
                      <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                        <Zap className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <span className="text-foreground font-semibold text-xs">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap items-center gap-4"
                >
                  <Button
                    asChild
                    className="h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95"
                  >
                    <Link href={`/services#${currentService.id || currentService.title?.toLowerCase().replace(/\s+/g, '-')}`}>
                      <span>Explore Architecture</span>
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-12 px-6 border-border hover:bg-secondary text-foreground text-xs font-semibold rounded-xl"
                  >
                    <Link href="/contact">
                      Request Consultation
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Episode Dots Stepper */}
          <div className="mt-14 flex justify-center gap-2">
            {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleManualNav(() => {
                    setDirection(i > index ? 1 : -1)
                    setIndex(i)
                  })}
                  aria-label={`Go to episode ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${i === index ? 'w-12 bg-indigo-600' : 'w-2.5 bg-border hover:bg-indigo-400'}`}
                />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
