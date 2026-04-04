"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight, Play, CheckCircle2,
  ShieldCheck, Zap, Terminal, GitBranch,
  Wifi, Package, Layers, Globe
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const partners = ['Microsoft', 'AWS', 'Google Cloud', 'Oracle', 'Cisco', 'NVIDIA']
const SPRING = { type: 'spring', stiffness: 260, damping: 28 }
const EASE_OUT = [0.16, 1, 0.3, 1]

/* ─────────────────────────────────────────────
   LIGHTWEIGHT CSS GRID BACKGROUND
   Pure CSS lines — no JS cell loop
───────────────────────────────────────────── */
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#010103]" style={{ zIndex: 0 }}>
      {/* 1. Primary Luminous Grid (Static Blueprint) */}
      <div className="absolute inset-0 opacity-[0.22]" style={{
        backgroundImage: `
          linear-gradient(rgba(129,140,248,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(129,140,248,0.5) 1px, transparent 1px)
        `,
        backgroundSize: '52px 52px',
      }} />

      {/* 2. Higher-Resolution Pattern Layer (Squares & Dots) */}
      <div className="absolute inset-0 opacity-[0.28]" style={{
        backgroundImage: `
          radial-gradient(circle at 104px 104px, rgba(168,85,247,0.6) 2px, transparent 2px),
          linear-gradient(rgba(129,140,248,0.2) 1px, transparent 1px),
          linear-gradient(90deg, rgba(129,140,248,0.2) 1px, transparent 1px)
        `,
        backgroundSize: '104px 104px',
      }} />

      {/* 3. Luminous Intersection Plus (+) Pattern (Static) */}
      <div className="absolute inset-0 opacity-[0.20]" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(129,140,248,0.4) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(129,140,248,0.4) 1px, transparent 1px)
        `,
        backgroundSize: '208px 208px',
        backgroundPosition: '104px 104px',
      }} />

      {/* 4. Ambient Cinematic Overlays (Vibrant Gradient Blurs) */}
      <div className="absolute inset-0 opacity-60 mix-blend-screen overflow-hidden" style={{ zIndex: 0 }}>
        {/* Left Side: Lime/Emerald Glow */}
        <div className="absolute top-1/2 left-[-10%] -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/30 rounded-full blur-[140px]" />

        {/* Right Side: Cyan/Blue Glow */}
        <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/30 rounded-full blur-[140px]" />

        {/* Bottom Center: Indigo/Violet Glow */}
        <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-indigo-600/25 rounded-full blur-[160px]" />

        {/* Top Center: Subtle Amber/Gold Hint */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="absolute inset-0 opacity-40 blur-3xl" style={{
        background: `
          radial-gradient(circle 800px at 0% 0%,  rgba(27, 245, 172, 0.94) 0%, transparent 100%),
          radial-gradient(circle 600px at 100% 0%, rgba(18, 188, 218, 0.88) 0%, transparent 100%),
          radial-gradient(circle 900px at 50% 100%, rgba(78, 70, 229, 0.69) 0%, transparent 100%)
        `,
      }} />

      {/* 5. Subtle Edge transition */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 50% 40%, transparent 0%, rgba(1,1,3,0.1) 70%, #010103 100%)',
      }} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   Stage 1 — Code Editor
───────────────────────────────────────────── */
const codeLines = [
  { tokens: [{ t: 'import', c: 'text-sky-400' }, { t: ' { useMeganods } ', c: 'text-slate-300' }, { t: 'from', c: 'text-sky-400' }, { t: " '@meganods/core'", c: 'text-emerald-400' }] },
  { tokens: [] },
  { tokens: [{ t: 'const ', c: 'text-sky-400' }, { t: 'App', c: 'text-amber-300' }, { t: ' = () => {', c: 'text-slate-300' }] },
  { tokens: [{ t: '  const ', c: 'text-sky-400' }, { t: '{ build, deploy }', c: 'text-purple-400' }, { t: ' = useMeganods()', c: 'text-slate-300' }] },
  { tokens: [{ t: '  const ', c: 'text-sky-400' }, { t: 'theme', c: 'text-purple-400' }, { t: ' = ', c: 'text-slate-300' }, { t: "'premium'", c: 'text-emerald-400' }] },
  { tokens: [] },
  { tokens: [{ t: '  return ', c: 'text-sky-400' }, { t: '(', c: 'text-slate-300' }] },
  { tokens: [{ t: '    <', c: 'text-slate-500' }, { t: 'Layout', c: 'text-amber-300' }, { t: ' theme={theme}', c: 'text-purple-400' }, { t: ' />', c: 'text-slate-500' }] },
  { tokens: [{ t: '  )', c: 'text-slate-300' }] },
  { tokens: [{ t: '}', c: 'text-slate-300' }] },
]

function CodeStage() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [cursorOn, setCursorOn] = useState(true)

  useEffect(() => {
    setVisibleLines(0)
    const t = setInterval(() => setVisibleLines(v => v < codeLines.length ? v + 1 : v), 280)
    const c = setInterval(() => setCursorOn(v => !v), 530)
    return () => { clearInterval(t); clearInterval(c) }
  }, [])

  return (
    <div className="h-full flex flex-col select-none">
      {/* Chrome */}
      <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 border-b border-white/5 flex-shrink-0">
        <div className="flex gap-1.5">
          {['#FF5F57', '#FEBC2E', '#28C840'].map((c, i) => (
            <div key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 text-[10px] sm:text-[11px] font-mono text-slate-500">
            <GitBranch className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span className="hidden sm:inline">main · </span>App.tsx
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] sm:text-[10px] text-emerald-500/80 font-mono hidden sm:inline">LIVE</span>
        </div>
      </div>

      {/* Code area */}
      <div className="flex-1 p-3 sm:p-4 md:p-5 font-mono text-[10px] sm:text-[12px] md:text-[13px] leading-5 sm:leading-6 overflow-hidden">
        <AnimatePresence>
          {codeLines.slice(0, visibleLines).map((line, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.18 }} className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <span className="w-4 text-right text-slate-700 text-[9px] sm:text-[11px] flex-shrink-0">{idx + 1}</span>
              <span>
                {line.tokens.map((tok, ti) => <span key={ti} className={tok.c}>{tok.t}</span>)}
                {idx === visibleLines - 1 && (
                  <span className={`inline-block w-[2px] h-[11px] sm:h-[14px] bg-sky-400 ml-0.5 align-middle transition-opacity ${cursorOn ? 'opacity-100' : 'opacity-0'}`} />
                )}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Status bar */}
      <div className="px-3 sm:px-4 py-1.5 sm:py-2 border-t border-white/5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2 sm:gap-4 text-[9px] sm:text-[10px] font-mono text-slate-600">
          <span className="flex items-center gap-1"><Terminal className="w-2.5 h-2.5" /> TS</span>
          <span className="hidden sm:inline">UTF-8</span>
          <span>Ln {visibleLines}</span>
        </div>
        <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-mono">
          <span className="text-emerald-500/70 flex items-center gap-0.5"><CheckCircle2 className="w-2.5 h-2.5" /> 0 err</span>
          <span className="text-amber-500/70 hidden sm:inline">2 warn</span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Stage 2 — Cloud Build
───────────────────────────────────────────── */
const buildSteps = [
  { icon: Package, label: 'Installing dependencies', sub: '847 packages', color: 'text-sky-400' },
  { icon: Layers, label: 'Compiling TypeScript', sub: '94 files', color: 'text-purple-400' },
  { icon: Zap, label: 'Bundling & optimizing', sub: 'Tree-shaking active', color: 'text-amber-400', active: true },
  { icon: ShieldCheck, label: 'Security audit', sub: 'Scanning…', color: 'text-slate-500' },
  { icon: Wifi, label: 'Deploying to cloud', sub: '3 regions', color: 'text-slate-500' },
]

function BuildStage() {
  const [progress, setProgress] = useState(0)
  const [activeStep, setActiveStep] = useState(2)

  useEffect(() => {
    setProgress(0); setActiveStep(2)
    const p = setInterval(() => setProgress(v => Math.min(v + 0.8, 72)), 50)
    const s = setTimeout(() => setActiveStep(3), 4500)
    return () => { clearInterval(p); clearTimeout(s) }
  }, [])

  return (
    <div className="h-full flex flex-col p-3 sm:p-5 md:p-6 gap-3 sm:gap-4 md:gap-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <p className="text-[9px] sm:text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-0.5">Cloud Pipeline</p>
          <h3 className="text-white/90 font-semibold text-sm sm:text-base md:text-lg tracking-tight">Build #247 · main</h3>
        </div>
        <div className="flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="w-2.5 h-2.5 border-2 border-amber-500/50 border-t-amber-500 rounded-full" />
          <span className="text-amber-500 text-[10px] sm:text-xs font-semibold">Running</span>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-1.5 flex-shrink-0">
        <div className="flex justify-between text-[10px] sm:text-xs">
          <span className="text-slate-500 font-mono">Progress</span>
          <span className="text-slate-300 font-mono font-semibold">{Math.round(progress)}%</span>
        </div>
        <div className="h-1 sm:h-1.5 rounded-full bg-white/5 overflow-hidden">
          <motion.div style={{ width: `${progress}%` }}
            className="h-full rounded-full bg-gradient-to-r from-sky-500 via-purple-500 to-amber-500" />
        </div>
      </div>

      {/* Steps */}
      <div className="flex-1 space-y-2 sm:space-y-2.5 overflow-hidden">
        {buildSteps.map((step, i) => {
          const Icon = step.icon
          const isDone = i < activeStep
          const isActive = i === activeStep
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: isDone || isActive ? 1 : 0.3, y: 0 }}
              transition={{ delay: i * 0.1, ...SPRING }}
              className="flex items-center gap-2 sm:gap-3">
              <div className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 border
                ${isDone ? 'bg-emerald-500/10 border-emerald-500/30' : isActive ? 'bg-amber-500/10 border-amber-500/30' : 'bg-white/3 border-white/5'}`}>
                {isDone
                  ? <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" />
                  : isActive
                    ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                      <Icon className={`w-3 h-3 sm:w-4 sm:h-4 ${step.color}`} />
                    </motion.div>
                    : <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-slate-700" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-[10px] sm:text-xs md:text-sm font-medium truncate ${isDone ? 'text-emerald-400/80' : isActive ? 'text-white/90' : 'text-slate-600'}`}>
                  {step.label}
                </p>
                <p className="text-[9px] sm:text-[11px] text-slate-600 font-mono hidden sm:block">{step.sub}</p>
              </div>
              {isDone && <span className="text-[9px] sm:text-[10px] font-mono text-emerald-500/60 flex-shrink-0">done</span>}
              {isActive && (
                <motion.div className="flex gap-0.5 flex-shrink-0">
                  {[0, 1, 2].map(j => (
                    <motion.div key={j} animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: j * 0.2 }}
                      className="w-1 h-1 rounded-full bg-amber-500" />
                  ))}
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 flex-shrink-0">
        {[{ label: 'Duration', val: '1m 34s' }, { label: 'Bundle', val: '284 KB' }, { label: 'Score', val: '99/100' }].map(m => (
          <div key={m.label} className="bg-white/3 border border-white/5 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center">
            <p className="text-[8px] sm:text-[10px] text-slate-600 font-mono uppercase tracking-widest mb-0.5 sm:mb-1">{m.label}</p>
            <p className="text-[11px] sm:text-sm font-semibold text-white/80 font-mono">{m.val}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Stage 3 — Deliver  (stacked on mobile)
───────────────────────────────────────────── */
function AndroidPhone({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[130px] sm:w-[160px] md:w-[190px] flex-shrink-0" style={{ aspectRatio: '9/19.5' }}>
      <div className="absolute inset-0 rounded-[2.4rem] sm:rounded-[2.8rem] bg-gradient-to-b from-[#2a2a2e] to-[#0c0c0e] border border-white/10" />
      <div className="absolute inset-[3px] sm:inset-[4px] rounded-[2.1rem] sm:rounded-[2.5rem] bg-[#050508] overflow-hidden">
        <div className="flex items-center justify-between px-4 pt-3 pb-1">
          <span className="text-[8px] text-white/40 font-mono font-bold">9:41</span>
          <div className="flex items-center gap-1 opacity-40">
            <div className="w-2.5 h-[5px] rounded-[2px] bg-white" />
            <div className="w-1.5 h-[5px] rounded-[2px] bg-white" />
          </div>
        </div>
        <div className="px-2 pb-2 h-full overflow-hidden">{children}</div>
      </div>
      <div className="absolute right-[-3px] top-[28%] w-[3px] h-9 rounded-r-full bg-[#2a2a2e]" />
      <div className="absolute left-[-3px] top-[22%] w-[3px] h-6 rounded-l-full bg-[#1a1a1e]" />
      <div className="absolute left-[-3px] top-[34%] w-[3px] h-6 rounded-l-full bg-[#1a1a1e]" />
    </div>
  )
}

function AppScreen() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 600); return () => clearTimeout(t) }, [])

  if (!loaded) return (
    <div className="h-full flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-6 h-6 border-2 border-white/5 border-t-indigo-500 rounded-full" />
    </div>
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-2 py-1">
      <div className="flex items-center justify-between mb-1.5">
        <div>
          <p className="text-[7px] text-white/30 uppercase tracking-widest font-bold">Status</p>
          <p className="text-[11px] font-black text-white/90">Live.</p>
        </div>
        <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[7px] font-black text-indigo-400 border border-indigo-500/30">MN</div>
      </div>
      <div className="rounded-xl bg-gradient-to-br from-indigo-600/40 via-blue-600/40 to-sky-600/40 border border-white/10 p-2">
        <p className="text-[7px] text-white/40 mb-0.5 font-bold">ENGINE</p>
        <p className="text-xs font-black text-white">OPTIMIZED</p>
        <div className="flex items-center gap-1 mt-1">
          <div className="h-0.5 flex-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} className="h-full bg-white" />
          </div>
          <span className="text-[7px] text-white/60 font-bold">92%</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {[
          { bg: 'from-sky-500/20 to-blue-600/20', icon: Globe, color: 'text-sky-400', label: 'Global' },
          { bg: 'from-purple-500/20 to-pink-600/20', icon: Layers, color: 'text-purple-400', label: 'Assets' },
          { bg: 'from-emerald-500/20 to-teal-600/20', icon: Zap, color: 'text-emerald-400', label: 'Speed' },
          { bg: 'from-amber-500/20 to-orange-600/20', icon: ShieldCheck, color: 'text-amber-400', label: 'Vault' },
        ].map((card, i) => {
          const Icon = card.icon
          return (
            <motion.div key={i} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.08, ...SPRING }}
              className={`rounded-lg bg-gradient-to-br ${card.bg} border border-white/5 p-1.5 flex flex-col gap-0.5`}>
              <Icon className={`w-3 h-3 ${card.color}`} />
              <p className="text-[7px] text-white/70 font-bold uppercase">{card.label}</p>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

function DeliverStage() {
  return (
    /* column on mobile → row on sm+ */
    <div className="h-full flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 md:gap-10 lg:gap-14 px-4 sm:px-6 md:px-8 py-5 sm:py-0 overflow-hidden">

      {/* Phone — smaller on mobile so text fits */}
      <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE_OUT }} className="flex-shrink-0">
        <motion.div animate={{ y: [-8, 8, -8], rotate: [-1, 1, -1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
          <AndroidPhone><AppScreen /></AndroidPhone>
        </motion.div>
      </motion.div>

      {/* Text panel */}
      <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.9, ease: EASE_OUT }}
        className="flex-1 min-w-0 space-y-4 sm:space-y-5 text-center sm:text-left">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] sm:text-[10px] text-emerald-500 font-black uppercase tracking-widest">Live in Production</span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-none tracking-tighter mb-2">
            Vision Made<br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">Real.</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-xs mx-auto sm:mx-0">
            Engineered for maximum performance, security, and unlimited scale.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-[260px] sm:max-w-none mx-auto sm:mx-0">
          {[
            { label: 'Latency', val: '< 60ms', c: 'text-sky-400' },
            { label: 'Security', val: 'Lvl 10', c: 'text-purple-400' },
            { label: 'Scalability', val: 'Auto', c: 'text-amber-400' },
            { label: 'Uptime', val: '99.9%', c: 'text-emerald-400' },
          ].map(s => (
            <div key={s.label} className="bg-white/3 border border-white/5 rounded-xl p-2.5 sm:p-3 hover:bg-white/5 transition-colors group">
              <p className="text-[8px] sm:text-[10px] text-slate-600 font-bold uppercase mb-0.5 tracking-widest">{s.label}</p>
              <p className={`text-sm sm:text-lg md:text-xl font-black font-mono group-hover:scale-105 transition-transform ${s.c}`}>{s.val}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   4-Word Animated Tagline
───────────────────────────────────────────── */
const WORDS = ['Innovate.', 'Build.', 'Scale.', 'Deliver.']
const COLORS = ['text-indigo-400', 'text-purple-400', 'text-sky-400', 'text-emerald-400']

function AnimatedTagline() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setActive(v => (v + 1) % WORDS.length), 2000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 sm:gap-x-4 md:gap-x-5 mb-4 sm:mb-6">
      {WORDS.map((word, i) => (
        <motion.span key={word}
          animate={i === active ? { y: [0, -4, 0] } : { y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={`font-black tracking-tight transition-all duration-500 select-none
            text-xl sm:text-2xl md:text-3xl lg:text-4xl
            ${i === active ? COLORS[i] : 'text-white/18'}`}
          style={{
            textShadow: i === active ? '0 0 28px currentColor, 0 0 56px currentColor' : 'none',
            display: 'inline-block', lineHeight: 1.1,
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   Main Export
───────────────────────────────────────────── */
type Stage = 'coding' | 'building' | 'delivering'
const STAGES: { key: Stage; label: string; num: string }[] = [
  { key: 'coding', label: 'Write Code', num: '01' },
  { key: 'building', label: 'Cloud Build', num: '02' },
  { key: 'delivering', label: 'Ship App', num: '03' },
]

export function HeroSection() {
  const [stage, setStage] = useState<Stage>('coding')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const t = setInterval(() =>
      setStage(p => p === 'coding' ? 'building' : p === 'building' ? 'delivering' : 'coding')
      , 6000)
    return () => clearInterval(t)
  }, [])

  const stageIdx = STAGES.findIndex(s => s.key === stage)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      {mounted && <GridBackground />}

      <div className="relative w-full container mx-auto px-6 py-10 sm:py-16 md:py-20" style={{ zIndex: 40 }}>
        <div className="max-w-7xl mx-auto text-center">

          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full border border-indigo-500/25 bg-indigo-500/8 text-indigo-400 text-[11px] sm:text-sm mb-5 sm:mb-8 backdrop-blur-md">
            <motion.div animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-indigo-400" />
            <span className="font-medium tracking-tight">Meganods — Next-Gen App & Web Development</span>
          </motion.div>

          {/* 4-Word Tagline */}
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}>
            <AnimatedTagline />
          </motion.div>

          {/* Heading */}
          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[90px] font-black leading-[1.1] sm:leading-[1.05] mb-4 sm:mb-6 tracking-tighter xl:whitespace-nowrap">
            <span className="text-white/90 text-glow">Crafting Digital</span>
            <span className="italic sm:ml-4 block sm:inline" style={{
              background: 'linear-gradient(135deg,#818cf8 0%,#a78bfa 35%,#38bdf8 70%,#34d399 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Masterpieces.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.18 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white/35 max-w-4xl mx-auto mb-7 sm:mb-10 leading-relaxed font-light px-2 sm:px-0">
            We transform complex ideas into high-performance mobile apps and breathtaking websites.
            Engineering excellence from concept to delivery.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14">
            <Button asChild size="lg"
              className="w-full sm:w-auto px-6 sm:px-8 h-11 sm:h-12 rounded-2xl font-semibold text-white group transition-all active:scale-95"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#3b82f6)', boxShadow: '0 18px 45px -10px rgba(99,102,241,0.5)' }}>
              <Link href="/contact">
                Get Started <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg"
              className="w-full sm:w-auto px-6 sm:px-8 h-11 sm:h-12 rounded-2xl border-white/10 bg-white/3 hover:bg-white/8 text-white/70 hover:text-white transition-all backdrop-blur-md">
              <Link href="/about">
                <Play className="mr-2 w-4 h-4" /> Watch Demo
              </Link>
            </Button>
          </motion.div>

          {/* ── Hero Animation Card ── */}
          <motion.div initial={{ opacity: 0, y: 36, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE_OUT }}
            className="relative mx-auto max-w-5xl">

            {/* Stage tabs */}
            <div className="flex items-center justify-center gap-1 sm:gap-2 mb-3 flex-wrap px-2">
              {STAGES.map(s => (
                <button key={s.key} onClick={() => setStage(s.key)}
                  className={`flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold transition-all
                    ${stage === s.key ? 'bg-white/10 text-white border border-white/15' : 'text-white/30 hover:text-white/60'}`}>
                  <span className="font-mono opacity-60 hidden sm:inline">{s.num}</span>
                  {s.label}
                  {stage === s.key && (
                    <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  )}
                </button>
              ))}
            </div>

            {/* Progress strips */}
            <div className="flex gap-1 sm:gap-1.5 mb-3 sm:mb-4 px-1 sm:px-2">
              {STAGES.map((s, i) => (
                <div key={s.key} className="flex-1 h-0.5 rounded-full bg-white/8 overflow-hidden">
                  {i <= stageIdx && (
                    <motion.div
                      initial={{ width: i < stageIdx ? '100%' : '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: i < stageIdx ? 0 : 6, ease: 'linear' }}
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-500" />
                  )}
                </div>
              ))}
            </div>

            {/* ─── Main animated panel ───
                On mobile: fixed min-height 400px so content isn't crushed
                On sm+:    padding-bottom trick gives proper 16:9
            ─────────────────────────────── */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden" style={{
              background: 'linear-gradient(145deg,rgba(255,255,255,0.04) 0%,rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 40px 80px -20px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}>
              {/* Top glow */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 35% at 50% 0%,rgba(99,102,241,0.09) 0%,transparent 60%)' }} />

              {/*
                Responsive height:
                  mobile  (<sm) : 420px fixed
                  sm–md        : aspect-ratio 4/3 via padding trick
                  md+          : full 16/9
              */}
              <div
                className="relative w-full"
                style={{
                  minHeight: 'clamp(420px, 50vw, 640px)',
                }}
              >
                <AnimatePresence mode="wait">
                  {stage === 'coding' && (
                    <motion.div key="coding"
                      initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.98 }}
                      animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.02 }}
                      transition={{ duration: 0.55, ease: EASE_OUT }}
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(145deg,#0e0e14,#0a0a10)' }}>
                      <CodeStage />
                    </motion.div>
                  )}
                  {stage === 'building' && (
                    <motion.div key="building"
                      initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.98 }}
                      animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.02 }}
                      transition={{ duration: 0.55, ease: EASE_OUT }}
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(145deg,#0a0d14,#080a12)' }}>
                      <BuildStage />
                    </motion.div>
                  )}
                  {stage === 'delivering' && (
                    <motion.div key="delivering"
                      initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.98 }}
                      animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.02 }}
                      transition={{ duration: 0.55, ease: EASE_OUT }}
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(145deg,#090c14,#060910)' }}>
                      <DeliverStage />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Floating AI badge */}
            <motion.div animate={{ y: [-6, 6, -6], rotate: [0, 3, 0, -3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 w-10 h-10 sm:w-13 sm:h-13 md:w-15 md:h-15 rounded-xl sm:rounded-2xl flex items-center justify-center font-black text-sm sm:text-base md:text-xl text-white z-10"
              style={{ width: 'clamp(40px,4vw,60px)', height: 'clamp(40px,4vw,60px)', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 14px 32px rgba(99,102,241,0.45)' }}>
              AI
            </motion.div>

            {/* System Active badge */}
            <motion.div animate={{ y: [5, -5, 5], x: [-2, 2, -2] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-3 -left-2 sm:-bottom-4 sm:-left-4 px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-xl sm:rounded-2xl backdrop-blur-xl z-10 flex items-center gap-1.5 sm:gap-2.5"
              style={{ background: 'rgba(6,6,10,0.9)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="relative w-1.5 h-1.5 sm:w-2.5 sm:h-2.5">
                <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />
                <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500" />
              </div>
              <span className="text-[10px] sm:text-sm font-semibold text-white/90">System Active</span>
            </motion.div>
          </motion.div>

          {/* Partner Marquee */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}
            className="mt-12 sm:mt-20 relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-16 sm:w-32 pointer-events-none z-10"
              style={{ background: 'linear-gradient(to right, #03030a, transparent)' }} />
            <div className="absolute inset-y-0 right-0 w-16 sm:w-32 pointer-events-none z-10"
              style={{ background: 'linear-gradient(to left, #03030a, transparent)' }} />

            <p className="text-[9px] sm:text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] sm:tracking-[0.35em] mb-5 sm:mb-8">
              Strategic Technology Alliances
            </p>

            <div className="flex overflow-hidden">
              <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="flex flex-nowrap gap-8 sm:gap-16 md:gap-24 items-center whitespace-nowrap">
                {[...partners, ...partners].map((p, i) => (
                  <span key={`${p}-${i}`}
                    className="text-white/15 hover:text-white/40 transition-colors text-base sm:text-xl md:text-2xl font-black tracking-tighter cursor-default">
                    {p}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}