"use client"

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Play,
  Sparkles,
  CheckCircle2,
  Zap,
  Volume2,
  VolumeX,
  Brain,
  Smartphone,
  Cloud,
  Globe,
  Gauge,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const PARTNERS = [
  { name: 'Microsoft Azure', tier: 'Cloud Partner' },
  { name: 'Amazon Web Services', tier: 'Premier Tier' },
  { name: 'Google Cloud Platform', tier: 'AI Partner' },
  { name: 'NVIDIA Inception', tier: 'AI Hardware' },
  { name: 'Cloudflare', tier: 'Edge Network' },
  { name: 'Pinecone Vector', tier: 'Neural Storage' },
]

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isMuted, setIsMuted] = useState(false)

  // Ensure autoplay starts immediately on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true
          setIsMuted(true)
          videoRef.current.play()
        }
      })
    }
  }, [])

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  return (
    <section className="relative min-h-screen pt-32 sm:pt-36 pb-20 overflow-hidden bg-white">
      {/* Light subtle background grid & soft radial glow */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-tr from-indigo-100/60 via-cyan-100/40 to-purple-100/50 rounded-full blur-[140px]" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-center text-center space-y-6">
          
          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-4 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm"
          >
            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            <span>MegaNods — Innovating the Future of Technology</span>
          </motion.div>

          {/* Sub-headline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-400"
          >
            Innovate. Build. Scale.{' '}
            <span className="text-emerald-500 font-black">Deliver.</span>
          </motion.div>

          {/* Main Hero Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 leading-[1.05]">
              Crafting Digital{' '}
              <span className="italic font-serif bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400 bg-clip-text text-transparent">
                Masterpieces.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              We transform complex ideas into high-performance mobile apps and breathtaking websites. Engineering excellence from concept to delivery.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <Link href="/contact">
              <Button
                size="lg"
                className="h-12 px-8 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/25 text-sm cursor-pointer border-0 flex items-center gap-2"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Link href="/about">
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-6 rounded-xl border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold shadow-sm cursor-pointer flex items-center gap-2"
              >
                <Play className="h-3.5 w-3.5 text-indigo-600 fill-indigo-600" />
                <span>Watch Demo</span>
              </Button>
            </Link>
          </motion.div>

          {/* PROMINENT ULTRA-WIDE VIDEO CONTAINER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full max-w-6xl pt-6 relative"
          >
            <div className="relative w-full rounded-3xl overflow-hidden border-2 border-indigo-100/80 bg-slate-950 shadow-2xl shadow-indigo-950/15 group">
              <video
                ref={videoRef}
                src="/robot-welcome.mp4"
                autoPlay
                loop
                playsInline
                className="w-full h-auto aspect-[16/9] object-cover block"
              />

              {/* Discreet Sound Toggle in bottom corner */}
              <button
                type="button"
                onClick={toggleAudio}
                className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold shadow-lg transition-all cursor-pointer border border-white/20"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="h-3.5 w-3.5 text-red-400" />
                    <span>Unmute</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
                    <span>Audio On</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* 3 CORE PILLARS BELOW THE VIDEO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-6xl pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left"
          >
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 hover:bg-white hover:border-indigo-300 hover:shadow-md transition-all">
              <div className="flex items-center gap-2.5 text-indigo-600 font-bold text-xs uppercase font-mono">
                <Brain className="h-4 w-4" />
                <span>01 • Autonomous AI</span>
              </div>
              <h4 className="mt-2 text-base font-bold text-slate-900">Neural Agents & Vector DB</h4>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Bespoke LLM fine-tuning and sub-second vector search with zero hallucination.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 hover:bg-white hover:border-blue-300 hover:shadow-md transition-all">
              <div className="flex items-center gap-2.5 text-blue-600 font-bold text-xs uppercase font-mono">
                <Smartphone className="h-4 w-4" />
                <span>02 • Mobile & Web</span>
              </div>
              <h4 className="mt-2 text-base font-bold text-slate-900">Native iOS, Android & Next.js</h4>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                60/120 FPS fluid mobile apps and 100/100 Lighthouse web platforms.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 hover:bg-white hover:border-emerald-300 hover:shadow-md transition-all">
              <div className="flex items-center gap-2.5 text-emerald-600 font-bold text-xs uppercase font-mono">
                <Zap className="h-4 w-4" />
                <span>03 • Cloud Fabric</span>
              </div>
              <h4 className="mt-2 text-base font-bold text-slate-900">Multi-Region Edge SLA</h4>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Sub-100ms global latency with 99.999% uptime and automated CI/CD pipelines.
              </p>
            </div>
          </motion.div>

          {/* Strategic Technology Alliances Footer Grid */}
          <div className="w-full max-w-5xl pt-16 border-t border-slate-200/80">
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400 mb-6">
              Strategic Technology Alliances
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {PARTNERS.map((partner, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200/80 bg-white p-3 text-center hover:border-indigo-300 hover:shadow-md transition-all"
                >
                  <div className="text-xs font-bold text-slate-900">{partner.name}</div>
                  <div className="text-[10px] font-mono text-indigo-600 font-semibold">{partner.tier}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}