'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Cpu, Zap, ShieldCheck, Database, Layers, Activity, Sparkles, Server } from 'lucide-react'

export function IsometricHeroAnimation() {
  return (
    <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[460px] flex items-center justify-center overflow-hidden my-4">
      {/* 3D Isometric Projection Stage */}
      <div 
        className="relative w-[540px] h-[360px] flex items-center justify-center scale-[0.68] sm:scale-[0.85] md:scale-95 lg:scale-100 origin-center shrink-0"
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glowing Isometric Floor Grid */}
        <div 
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/10 via-indigo-500/15 to-purple-500/10 blur-3xl pointer-events-none"
        />

        {/* Isometric SVG Highway / Animated Circuit Grid */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          viewBox="0 0 540 360" 
          fill="none"
        >
          {/* Isometric Ground Grid Lines */}
          <g stroke="rgba(99, 102, 241, 0.15)" strokeWidth="1" strokeDasharray="4 4">
            <path d="M 270,40 L 510,180 L 270,320 L 30,180 Z" />
            <path d="M 270,80 L 450,180 L 270,280 L 90,180 Z" />
            <path d="M 270,120 L 390,180 L 270,240 L 150,180 Z" />
            
            {/* Diagonal interconnects */}
            <path d="M 30,180 L 510,180" />
            <path d="M 270,40 L 270,320" />
            <path d="M 150,110 L 390,250" />
            <path d="M 390,110 L 150,250" />
          </g>

          {/* Animated Glowing Light Pulses traveling on the Grid */}
          <motion.path
            d="M 30,180 L 270,320 L 510,180 L 270,40 Z"
            stroke="url(#pulse-gradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0.2, pathOffset: 0 }}
            animate={{ pathOffset: [0, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          <motion.path
            d="M 90,180 L 270,280 L 450,180 L 270,80 Z"
            stroke="url(#cyan-pulse-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0.25, pathOffset: 1 }}
            animate={{ pathOffset: [1, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
          />

          {/* Linear Gradients for Light Pulses */}
          <defs>
            <linearGradient id="pulse-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="50%" stopColor="#6366f1" stopOpacity="1" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="cyan-pulse-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="50%" stopColor="#14b8a6" stopOpacity="1" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Central Isometric Floating Main Core Node */}
        <motion.div
          animate={{
            y: [0, -12, 0],
            rotateZ: [0, 2, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative z-20 flex flex-col items-center justify-center"
        >
          {/* 3D Layered Glass Platform */}
          <div className="relative p-6 rounded-3xl bg-gradient-to-b from-white/95 to-white/75 backdrop-blur-2xl border-2 border-indigo-200/90 shadow-[0_25px_60px_-15px_rgba(79,70,229,0.3)] group hover:border-indigo-400 transition-colors">
            {/* Glowing Orbit Rings around central core */}
            <div className="absolute -inset-3 rounded-full border border-indigo-400/30 animate-[spin_12s_linear_infinite]" />
            <div className="absolute -inset-6 rounded-full border border-blue-400/20 animate-[spin_18s_linear_infinite_reverse]" />

            {/* Core Icon with Animated Gradient Pulse */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/40 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Cpu className="w-8 h-8 sm:w-10 sm:h-10 animate-pulse" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-cyan-300 animate-ping" />
            </div>

            <div className="mt-3 text-center">
              <p className="text-[11px] font-mono font-bold tracking-wider text-indigo-600 uppercase">
                NEURAL CORE v4.0
              </p>
              <p className="text-xs font-black text-slate-900 mt-0.5">
                Active Execution
              </p>
            </div>
          </div>
        </motion.div>

        {/* Isometric Floating Node 1: Left Top (Cloud Mesh) */}
        <motion.div
          animate={{
            y: [0, -14, 0],
            x: [0, 4, 0],
          }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.2,
          }}
          className="absolute top-8 left-6 sm:left-12 z-20"
        >
          <div className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-indigo-200/80 shadow-xl shadow-indigo-500/10 flex items-center gap-3 hover:scale-105 transition-transform">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">CLOUD MESH</span>
              <span className="text-xs font-extrabold text-slate-900">Distributed Edge</span>
            </div>
          </div>
        </motion.div>

        {/* Isometric Floating Node 2: Right Top (Zero-Trust) */}
        <motion.div
          animate={{
            y: [0, 14, 0],
            x: [0, -4, 0],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.6,
          }}
          className="absolute top-8 right-6 sm:right-12 z-20"
        >
          <div className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-indigo-200/80 shadow-xl shadow-indigo-500/10 flex items-center gap-3 hover:scale-105 transition-transform">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">SECURITY MATRIX</span>
              <span className="text-xs font-extrabold text-slate-900">Zero-Trust Shield</span>
            </div>
          </div>
        </motion.div>

        {/* Isometric Floating Node 3: Left Bottom (High QPS Telemetry) */}
        <motion.div
          animate={{
            y: [0, 10, 0],
            x: [0, 5, 0],
          }}
          transition={{
            duration: 5.2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.1,
          }}
          className="absolute bottom-6 left-8 sm:left-16 z-20"
        >
          <div className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-indigo-200/80 shadow-xl shadow-indigo-500/10 flex items-center gap-3 hover:scale-105 transition-transform">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">UPTIME METRIC</span>
              <span className="text-xs font-extrabold text-emerald-600">99.9% SLA Uptime</span>
            </div>
          </div>
        </motion.div>

        {/* Isometric Floating Node 4: Right Bottom (Quantum Engine) */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            x: [0, -5, 0],
          }}
          transition={{
            duration: 4.6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.4,
          }}
          className="absolute bottom-6 right-8 sm:right-16 z-20"
        >
          <div className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-indigo-200/80 shadow-xl shadow-indigo-500/10 flex items-center gap-3 hover:scale-105 transition-transform">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 shadow-sm">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">API LATENCY</span>
              <span className="text-xs font-extrabold text-slate-900">&lt; 45ms Response</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
