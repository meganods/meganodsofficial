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
  MousePointer2,
  Code2,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { DeepTechBackground } from '@/components/ui/deep-tech-background'

// story visual components
const ServiceVisual = ({ type, gradient }: { type: string, gradient: string }) => {
  switch (type) {
    case 'app':
      return (
        <div className="relative w-full h-full flex items-center justify-center p-8">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative w-48 h-80 bg-[#0a0a0f] rounded-[2.5rem] border border-white/10 p-3 shadow-2xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-b-xl border border-white/5" />
            <div className="w-full h-full bg-[#05050a] rounded-[2.2rem] overflow-hidden flex flex-col p-4">
              <div className="space-y-3 pt-6">
                <motion.div initial={{ width: 0 }} animate={{ width: '80%' }} className="h-4 bg-white/5 rounded-full" />
                <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.2 }} className="h-12 bg-indigo-500/20 rounded-xl" />
                <div className="grid grid-cols-2 gap-2">
                   <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} className="h-20 bg-white/5 rounded-xl" />
                   <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} className="h-20 bg-white/5 rounded-xl" />
                </div>
              </div>
            </div>
            {/* Floating Orbitals */}
            <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -right-8 top-1/4 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
               <Smartphone className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>
        </div>
      )
    case 'web':
      return (
        <div className="relative w-full h-full flex items-center justify-center p-8">
           <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative w-full max-w-sm aspect-video bg-[#0a0a0f] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="h-6 bg-[#1a1a25] w-full flex items-center px-4 gap-1.5 border-b border-white/5">
                 <div className="w-2 h-2 rounded-full bg-red-400" />
                 <div className="w-2 h-2 rounded-full bg-amber-400" />
                 <div className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="p-4 space-y-4">
                 <div className="flex justify-between items-center">
                    <motion.div initial={{ width: 0 }} animate={{ width: 60 }} className="h-3 bg-white/10 rounded-full" />
                    <div className="flex gap-2">
                       <div className="w-3 h-3 bg-white/5 rounded-full" />
                       <div className="w-3 h-3 bg-white/5 rounded-full" />
                    </div>
                 </div>
                 <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="h-24 bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-lg p-3">
                    <div className="w-1/2 h-4 bg-emerald-400/20 rounded-full mb-2" />
                    <div className="w-3/4 h-2 bg-white/5 rounded-full" />
                 </motion.div>
              </div>
              {/* Kinetic Code Block */}
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-4 right-4 bg-black/60 p-4 rounded-lg font-mono text-[10px] text-emerald-400 border border-emerald-500/20">
                 {"<Code />"}
              </motion.div>
           </motion.div>
        </div>
      )
    case 'ai':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
           <div className="relative w-64 h-64">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-indigo-500/20" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <motion.div 
                   animate={{ scale: [1, 1.15, 1] }} 
                   transition={{ duration: 4, repeat: Infinity }}
                   className="w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" 
                 />
                 <motion.div 
                   animate={{ 
                     boxShadow: ['0 0 20px rgba(99,102,241,0.2)', '0 0 40px rgba(99,102,241,0.4)', '0 0 20px rgba(99,102,241,0.2)'] 
                   }}
                   transition={{ duration: 2, repeat: Infinity }}
                   className="relative w-24 h-24 rounded-3xl bg-indigo-600 flex items-center justify-center"
                 >
                    <Brain className="w-12 h-12 text-white" />
                 </motion.div>
              </div>
              {/* Neural Nodes */}
              {[...Array(6)].map((_, i) => (
                 <motion.div
                   key={i}
                   animate={{ 
                     scale: [0.8, 1.2, 0.8],
                     opacity: [0.3, 0.8, 0.3]
                   }}
                   transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                   className="absolute w-2 h-2 rounded-full bg-cyan-400"
                   style={{
                     left: '50%',
                     top: '50%',
                     transformOrigin: '0 0',
                     transform: `rotate(${i * 60}deg) translateX(110px)`
                   }}
                 />
              ))}
           </div>
        </div>
      )
    default:
      return (
        <div className="relative w-full h-full flex items-center justify-center">
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
             className="relative w-64 h-64"
           >
              <div className="absolute inset-0 border border-white/5 rounded-full" />
              <div className="absolute inset-8 border border-white/5 rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center rotate-[-360deg]">
                 <div className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-2xl`}>
                    <Cpu className="w-14 h-14 text-white" />
                 </div>
              </div>
           </motion.div>
        </div>
      )
  }
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
        const docs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setServices(docs)
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
    const interval = setInterval(next, 8000)
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
      <section className="relative py-28 lg:py-40 bg-[#010103] overflow-hidden" id="services">
        <DeepTechBackground />
        <div className="flex flex-col items-center justify-center py-60 gap-8">
          <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
          <p className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.5em] animate-pulse font-black">Decrypting Services Mesh...</p>
        </div>
      </section>
    )
  }

  if (services.length === 0) return null

  const currentService = services[index]

  return (
    <section className="relative py-28 lg:py-40 bg-[#010103] overflow-hidden" id="services">
      <DeepTechBackground />

      <div className="relative container mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-24">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-indigo-400 font-mono text-sm mb-4 uppercase tracking-[0.3em] font-black"
            >
              Mastery
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[0.85] uppercase"
            >
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">Services Story</span> Hub.
            </motion.h2>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={() => handleManualNav(prev)}
              className="group w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all text-white"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => handleManualNav(next)}
              className="group w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all text-white"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: direction * -50, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center"
            >
              {/* Story Visual Side */}
              <div className="relative group perspective-1000">
                <div className={`absolute -inset-10 bg-gradient-to-br ${currentService.gradient || 'from-indigo-500 to-blue-500'} rounded-[2.5rem] opacity-20 blur-[100px] pointer-events-none`} />
                <div className="relative aspect-square md:aspect-[4/3] rounded-[3.5rem] overflow-hidden border border-white/5 bg-[#05050a]/80 backdrop-blur-3xl group-hover:border-white/10 transition-colors duration-500 shadow-2xl">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
                  <ServiceVisual type={currentService.type || currentService.id} gradient={currentService.gradient || 'from-indigo-500 to-blue-500'} />
                </div>
              </div>

              {/* Story Content Side */}
              <div className="flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 mb-8"
                >
                  <span className={`px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]`}>
                    Episode {index + 1}
                  </span>
                  <div className="h-[1px] w-12 bg-white/10" />
                  <span className="text-white/40 text-[10px] font-black uppercase tracking-widest font-mono">[ {currentService.category || 'Strategic Node'} ]</span>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl lg:text-7xl font-bold text-white mb-8 tracking-tighter uppercase leading-none"
                >
                  {currentService.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-white/40 text-xl lg:text-2xl mb-12 leading-relaxed font-medium"
                >
                  {currentService.description}
                </motion.p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 mb-16">
                  {(currentService.features || []).map((feature: string, i: number) => (
                    <motion.div 
                      key={feature} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center gap-4 group/item"
                    >
                      <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/item:border-indigo-500/50 transition-colors`}>
                        <Zap className="w-4 h-4 text-indigo-400" />
                      </div>
                      <span className="text-white/60 font-black uppercase tracking-tight text-xs group-hover/item:text-white transition-colors">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Button
                    asChild
                    size="lg"
                    className={`h-20 bg-white text-black hover:bg-white/90 transition-all text-xl font-black rounded-2xl group px-12 shadow-2xl overflow-hidden border-0`}
                  >
                    <Link href={`/services#${currentService.id}`}>
                      Read Operational Audit
                      <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-3 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute -bottom-24 left-0 right-0 flex justify-center gap-4">
            {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleManualNav(() => {
                    setDirection(i > index ? 1 : -1)
                    setIndex(i)
                  })}
                  className={`h-1.5 rounded-full bg-white transition-all duration-700 ${i === index ? 'w-24 bg-indigo-500 opacity-100' : 'w-8 opacity-10 hover:opacity-30'}`}
                />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
