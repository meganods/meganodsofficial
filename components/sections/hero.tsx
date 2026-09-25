'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowRight, 
  Play, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Volume2, 
  VolumeX, 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { IsometricHeroAnimation } from '@/components/effects/isometric-hero-animation'

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Ensure video starts playing immediately on page load in all browsers
    video.muted = true
    video.play().catch(() => {})

    // Attempt to unmute immediately if browser policy permits
    const tryUnmute = () => {
      if (!videoRef.current) return
      videoRef.current.muted = false
      videoRef.current.volume = 1.0
      const promise = videoRef.current.play()
      if (promise !== undefined) {
        promise
          .then(() => {
            setIsMuted(false)
          })
          .catch(() => {
            // Browser restricted unmuted autoplay on initial load, ensure video stays playing muted
            if (videoRef.current) {
              videoRef.current.muted = true
              videoRef.current.play().catch(() => {})
            }
            setIsMuted(true)
          })
      }
    }

    tryUnmute()

    // Unmute automatically upon first user interaction anywhere on the screen
    const handleFirstInteraction = () => {
      if (videoRef.current) {
        videoRef.current.muted = false
        videoRef.current.volume = 1.0
        videoRef.current.play().then(() => {
          setIsMuted(false)
        }).catch(() => {})
      }
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('touchstart', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
      window.removeEventListener('scroll', handleFirstInteraction)
    }

    window.addEventListener('click', handleFirstInteraction, { once: true, passive: true })
    window.addEventListener('touchstart', handleFirstInteraction, { once: true, passive: true })
    window.addEventListener('keydown', handleFirstInteraction, { once: true, passive: true })
    window.addEventListener('scroll', handleFirstInteraction, { once: true, passive: true })

    return () => {
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('touchstart', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
      window.removeEventListener('scroll', handleFirstInteraction)
    }
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted
      videoRef.current.muted = nextMuted
      videoRef.current.volume = 1.0
      setIsMuted(nextMuted)
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {})
      }
    }
  }


  return (
    <section className="relative min-h-screen pt-32 sm:pt-36 pb-24 overflow-hidden bg-gradient-to-b from-slate-50/70 via-white to-slate-50/50">
      {/* Dynamic 3D Isometric Background Grid & Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Fine perspective grid */}
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(to right, #4f46e5 1px, transparent 1px), linear-gradient(to bottom, #4f46e5 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
            backgroundPosition: 'center center',
          }}
        />
        
        {/* Soft Isometric Radial Flares */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-tr from-blue-200/40 via-indigo-200/30 to-purple-200/40 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-cyan-200/35 rounded-full blur-[110px]" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-violet-200/35 rounded-full blur-[110px]" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-center space-y-12">
          
          {/* 2-COLUMN HERO SPLIT: Left (Content) | Right (Isometric 3D Motion) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
            
            {/* LEFT COLUMN: Badges, Headline, Subtext & Action Buttons */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
              
              {/* Top Pill: Next-Gen Isometric Status Beacon */}
              <motion.div
                initial={{ opacity: 0, y: -15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="group relative inline-flex items-center gap-3 rounded-full border border-indigo-200/90 bg-white/90 px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-md shadow-indigo-500/5 backdrop-blur-xl transition-all hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/10 cursor-default"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="font-mono text-[11px] tracking-wider uppercase text-slate-500 font-bold">
                  SYSTEM ONLINE
                </span>
                <span className="text-slate-300">|</span>
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent font-black tracking-wide">
                  MegaNods Enterprise Platform
                </span>
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
              </motion.div>

              {/* Sub-headline / Slogan */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="text-xs sm:text-sm font-mono tracking-[0.3em] text-slate-400 uppercase font-bold"
              >
                Innovate • Build • Scale • <span className="text-emerald-500 font-black">Deliver</span>
              </motion.div>

              {/* Main Headline */}
              <div className="relative pt-1 pb-1">
                <div className="absolute top-1/2 left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 -translate-y-1/2 w-full max-w-lg h-28 bg-gradient-to-r from-blue-500/15 via-indigo-500/20 to-teal-400/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />

                <motion.h1 
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12]"
                >
                  <span className="block text-slate-900 drop-shadow-sm">
                    Engineering
                  </span>
                  <span className="relative inline-block mt-1 font-extrabold italic bg-gradient-to-r from-blue-600 via-indigo-600 via-purple-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent animate-gradient-flow drop-shadow-sm">
                    Intelligence at Scale.
                  </span>
                </motion.h1>
              </div>

              {/* Subtext Paragraph */}
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="max-w-xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
              >
                We architect <span className="font-semibold text-slate-900">intelligent systems</span> and craft high-performance <span className="font-semibold text-slate-900">mobile and web experiences</span> — engineered from concept to global deployment.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.24 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="h-12 px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-xl shadow-blue-500/20 text-sm cursor-pointer border-0 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <Link href="/about">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 px-6 rounded-xl border-slate-200 bg-white/90 hover:bg-slate-50 text-slate-700 text-sm font-semibold shadow-sm cursor-pointer flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
                  >
                    <Play className="h-3.5 w-3.5 text-indigo-600 fill-indigo-600" />
                    <span>Watch Demo</span>
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: 3D Isometric Motion Illustration */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="lg:col-span-6 flex items-center justify-center relative w-full"
            >
              <IsometricHeroAnimation />
            </motion.div>

          </div>

          {/* 3D ISOMETRIC / DRIBBBLE-STYLE FLOATING SHOWCASE CONTAINER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-6xl pt-4 relative"
          >
            {/* FLOATING 3D GLASS TELEMETRY CARDS (Dribbble 3D Crypto & Isometric Style) */}
            
            {/* 1. Top-Left Floating Card: Latency Metric */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden lg:flex absolute -top-2 -left-6 z-20 items-center gap-3 p-3.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-indigo-200/80 shadow-2xl shadow-indigo-500/10 text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-mono font-bold uppercase text-slate-400">INFERENCE SPEED</p>
                <p className="text-sm font-black text-slate-900">&lt; 18ms Latency</p>
              </div>
            </motion.div>

            {/* 2. Top-Right Floating Card: Zero-Trust Security */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="hidden lg:flex absolute -top-2 -right-6 z-20 items-center gap-3 p-3.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-indigo-200/80 shadow-2xl shadow-indigo-500/10 text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-mono font-bold uppercase text-slate-400">SECURITY PROTOCOL</p>
                <p className="text-sm font-black text-slate-900">Zero-Trust Active</p>
              </div>
            </motion.div>

            {/* 3. Bottom-Left Floating Card: Autonomous Agents */}
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="hidden lg:flex absolute -bottom-4 -left-6 z-20 items-center gap-3 p-3.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-indigo-200/80 shadow-2xl shadow-indigo-500/10 text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-mono font-bold uppercase text-slate-400">COGNITIVE SWARMS</p>
                <p className="text-sm font-black text-slate-900">500+ Concurrent</p>
              </div>
            </motion.div>



            {/* Main Central 3D Video Frame with Glowing Multi-tone Border */}
            <div className="relative w-full rounded-3xl p-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-2xl shadow-indigo-950/20 group">
              <div className="relative w-full rounded-[22px] overflow-hidden bg-slate-950">
                <video
                  ref={videoRef}
                  src="/hero-video.mp4"
                  poster="https://cdn.jumpshare.com/preview/FlVNv5fa6Yuzv8WzU517lvfTt_eD4Xx8Dagk3cadFfaXMZ2lFLMZw9iIAxaO--i9YOHe-2CSey8F1wMafnLCe_jfowcVPMucKCCZM-4V7t4-4h3unfsVFOq8J"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  preload="auto"
                  className="w-full h-auto aspect-[16/9] object-cover block"
                />

                {/* Subtle Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                {/* Mute / Unmute Button */}
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  className="absolute bottom-4 right-4 z-30 flex items-center gap-2 rounded-full bg-slate-900/90 hover:bg-slate-950 text-white backdrop-blur-md px-4 py-2 text-xs font-bold shadow-2xl transition-all cursor-pointer border border-white/30 hover:scale-105 active:scale-95"
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="h-4 w-4 text-rose-400" />
                      <span>Unmute Sound</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-4 w-4 text-emerald-400 animate-pulse" />
                      <span className="text-emerald-300">Sound On</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* 3 Elevated High-Tech Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 w-full max-w-5xl"
          >
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-md shadow-slate-200/50 flex flex-col items-center text-center group hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">AI & Neural Systems</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Autonomous cognitive agents, custom LLM fine-tuning, and scalable neural inference.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-md shadow-slate-200/50 flex flex-col items-center text-center group hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">High-Speed Platforms</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Sub-second reactive web platforms, native mobile SDKs, and high-frequency architecture.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-md shadow-slate-200/50 flex flex-col items-center text-center group hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Enterprise Cloud & SecOps</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Zero-trust encryption meshes, automated Kubernetes orchestration, and global edge computing.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}