"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useMemo } from "react"
import { Cpu, Zap, Globe, Shield, Activity, Radio, Sparkles, Network, Database } from "lucide-react"

export function Preloader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [activeNodes, setActiveNodes] = useState<string[]>([])

  const phases = [
    { label: "INITIALIZING NEURAL CLUSTERS", status: "CORE ACTIVE", icon: Cpu, node: "US-EAST [VERIFIED]" },
    { label: "SYNCHRONIZING GLOBAL NODES", status: "MESH CONNECTED", icon: Globe, node: "EU-CENTRAL [SYNCED]" },
    { label: "ENGAGING QUANTUM CIPHER", status: "ZERO LATENCY", icon: Activity, node: "AP-NORTHEAST [READY]" },
    { label: "COMPILING ENTERPRISE PLATFORM", status: "SYSTEM DEPLOYED", icon: Zap, node: "GLOBAL EDGE [ONLINE]" },
  ]

  // Floating Micro-Cards (Distributed Mesh Widgets)
  const floatingCards = useMemo(() => [
    {
      id: "card-1",
      icon: Cpu,
      title: "Neural Engine",
      value: "99.8% Efficiency",
      initialX: -260,
      initialY: -140,
      floatX: [-10, 15, -10],
      floatY: [-15, 10, -15],
      duration: 5,
      color: "from-indigo-500/20 to-blue-500/10",
      border: "border-indigo-500/30",
      iconColor: "text-indigo-400"
    },
    {
      id: "card-2",
      icon: Network,
      title: "Edge Mesh",
      value: "0.2ms Latency",
      initialX: 260,
      initialY: -120,
      floatX: [15, -12, 15],
      floatY: [-10, 15, -10],
      duration: 6,
      color: "from-purple-500/20 to-pink-500/10",
      border: "border-purple-500/30",
      iconColor: "text-purple-400"
    },
    {
      id: "card-3",
      icon: Shield,
      title: "Quantum Cipher",
      value: "Zero-Trust Active",
      initialX: -270,
      initialY: 130,
      floatX: [-12, 10, -12],
      floatY: [12, -15, 12],
      duration: 5.5,
      color: "from-teal-500/20 to-emerald-500/10",
      border: "border-teal-500/30",
      iconColor: "text-teal-400"
    },
    {
      id: "card-4",
      icon: Database,
      title: "Global Nodes",
      value: "128 Nodes Synced",
      initialX: 270,
      initialY: 140,
      floatX: [10, -15, 10],
      floatY: [15, -10, 15],
      duration: 6.5,
      color: "from-blue-500/20 to-cyan-500/10",
      border: "border-blue-500/30",
      iconColor: "text-cyan-400"
    },
  ], [])

  // Floating Ambient Stardust Particles
  const ambientParticles = useMemo(() => 
    Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: (i * 17) % 100,
      y: (i * 23) % 100,
      size: (i % 3) + 2,
      duration: 3 + (i % 4) * 1.5,
      delay: (i % 5) * 0.4,
      driftX: ((i % 2 === 0 ? 1 : -1) * (15 + (i % 10))),
    })), [])

  // Dynamic background constellation nodes
  const nodes = useMemo(() => [
    { id: 1, x: 18, y: 22, delay: 0 },
    { id: 2, x: 82, y: 18, delay: 0.3 },
    { id: 3, x: 86, y: 78, delay: 0.6 },
    { id: 4, x: 14, y: 76, delay: 0.2 },
    { id: 5, x: 50, y: 10, delay: 0.5 },
    { id: 6, x: 50, y: 90, delay: 0.4 },
    { id: 7, x: 30, y: 48, delay: 0.7 },
    { id: 8, x: 70, y: 52, delay: 0.8 },
  ], [])

  useEffect(() => {
    const startTime = Date.now()
    const duration = 3400 // Smooth, captivating 3.4s

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const currentProgress = Math.min(Math.floor((elapsed / duration) * 100), 100)
      setProgress(currentProgress)

      if (currentProgress < 25) {
        setPhaseIndex(0)
        setActiveNodes(["Node 01: Active", "Node 02: Connecting"])
      } else if (currentProgress < 52) {
        setPhaseIndex(1)
        setActiveNodes(["Node 01: Synced", "Node 02: Synced", "Node 03: Linking"])
      } else if (currentProgress < 80) {
        setPhaseIndex(2)
        setActiveNodes(["Node 01: Low-Latency", "Node 02: 12ms", "Node 03: 8ms", "Node 04: Connected"])
      } else {
        setPhaseIndex(3)
        setActiveNodes(["All 128 Global Edge Nodes Synchronized"])
      }

      if (elapsed >= duration) {
        clearInterval(interval)
        setTimeout(() => {
          setLoading(false)
        }, 500)
      }
    }, 20)

    return () => clearInterval(interval)
  }, [])

  const CurrentIcon = phases[phaseIndex].icon

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(28px)",
            transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } 
          }}
          className="fixed inset-0 z-[99999] bg-[#02040B] flex items-center justify-center overflow-hidden select-none"
        >
          {/* Animated Retro-Futuristic Cyber Grid Plane */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b18_1px,transparent_1px),linear-gradient(to_bottom,#1e293b18_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />
          
          {/* Animated Sweeping Light Beam */}
          <motion.div
            animate={{ y: ["-100%", "250%"] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-x-0 h-48 bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent pointer-events-none"
          />

          {/* Glowing Ambient Radial Energy Spheres */}
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.35, 0.6, 0.35],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-indigo-600/35 via-purple-600/30 to-teal-400/25 blur-[140px] pointer-events-none"
          />

          {/* Floating Stardust Particles */}
          {ambientParticles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-gradient-to-tr from-indigo-300 to-teal-200 pointer-events-none shadow-[0_0_8px_rgba(165,180,252,0.8)]"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
              }}
              animate={{
                y: [-25, 25, -25],
                x: [-p.driftX, p.driftX, -p.driftX],
                opacity: [0.15, 0.8, 0.15],
                scale: [0.8, 1.5, 0.8],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Ambient SVG Constellation Laser Mesh */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            {nodes.map((n) => (
              <g key={n.id}>
                <motion.line
                  x1={`${n.x}%`}
                  y1={`${n.y}%`}
                  x2="50%"
                  y2="50%"
                  stroke="url(#laserGrad)"
                  strokeWidth="1.2"
                  strokeDasharray="4 6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1, 0.85],
                    opacity: [0.15, 0.5, 0.15],
                    strokeDashoffset: [0, -50]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: n.delay,
                    ease: "easeInOut" 
                  }}
                />
                <motion.circle
                  cx={`${n.x}%`}
                  cy={`${n.y}%`}
                  r="3.5"
                  fill="#818cf8"
                  animate={{ 
                    scale: [1, 2, 1],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: n.delay }}
                />
              </g>
            ))}
          </svg>

          {/* Futuristic Corner HUD Indicators */}
          <div className="absolute top-6 left-6 sm:top-8 sm:left-10 flex items-center gap-3 text-[10px] font-mono tracking-widest text-slate-400 uppercase">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-ping" />
            <span className="text-slate-300 font-bold">MEGANODS ARCHITECTURE // V4.0</span>
          </div>

          <div className="absolute top-6 right-6 sm:top-8 sm:right-10 flex items-center gap-2 text-[10px] font-mono tracking-widest text-slate-400 uppercase">
            <Radio className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span className="text-indigo-400 font-bold">{phases[phaseIndex].node}</span>
          </div>

          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-10 hidden sm:flex items-center gap-3 text-[9.5px] font-mono tracking-widest text-slate-500 uppercase">
            <span>LATENCY: 0.2ms</span>
            <span className="text-slate-800">|</span>
            <span>NODES: 128 CLUSTERED</span>
            <span className="text-slate-800">|</span>
            <span className="text-teal-400">EDGE READY</span>
          </div>

          <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 flex items-center gap-1.5 text-[9.5px] font-mono text-slate-400 uppercase">
            <span className="text-purple-400 font-bold">ZERO-TRUST ENCLAVE</span>
            <Shield className="w-3.5 h-3.5 text-purple-400" />
          </div>

          {/* Floating Interactive Micro Tech Cards (Surrounding Central Hub) */}
          <div className="absolute inset-0 pointer-events-none hidden lg:flex items-center justify-center">
            {floatingCards.map((card) => {
              const IconComponent = card.icon
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: [card.initialX + card.floatX[0], card.initialX + card.floatX[1], card.initialX + card.floatX[2]],
                    y: [card.initialY + card.floatY[0], card.initialY + card.floatY[1], card.initialY + card.floatY[2]],
                  }}
                  transition={{
                    opacity: { duration: 0.6 },
                    scale: { duration: 0.6 },
                    x: { duration: card.duration, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: card.duration, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className={`absolute flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-gradient-to-r ${card.color} border ${card.border} backdrop-blur-xl shadow-xl shadow-indigo-950/40`}
                >
                  <div className={`p-2 rounded-xl bg-slate-900/80 border border-white/10 ${card.iconColor}`}>
                    <IconComponent className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="text-left font-mono">
                    <p className="text-[11px] font-bold text-white leading-tight">{card.title}</p>
                    <p className="text-[9px] text-slate-400 tracking-wider uppercase">{card.value}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Central Main Interactive Core & Brand Nexus */}
          <motion.div 
            animate={{ 
              y: [-6, 6, -6],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex flex-col items-center text-center px-6 max-w-lg w-full z-10"
          >
            
            {/* Holographic Concentric Core with 3D Revolving Planet / Earth System */}
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center mb-6 sm:mb-8">
              
              {/* Outer SVG Celestial Ring with Precision Markers */}
              <svg className="absolute inset-0 w-full h-full animate-[spin_25s_linear_infinite]">
                <circle
                  cx="50%"
                  cy="50%"
                  r="48%"
                  fill="none"
                  stroke="rgba(99, 102, 241, 0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="4 8"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="44%"
                  fill="none"
                  stroke="rgba(168, 85, 247, 0.35)"
                  strokeWidth="1.2"
                  strokeDasharray="25 120"
                />
              </svg>

              {/* 3D Tilted Elliptical Planetary Orbit Path with Revolving Planet Earth */}
              <div 
                className="absolute w-[220px] h-[220px] sm:w-[270px] sm:h-[270px] rounded-full pointer-events-none"
                style={{ 
                  transform: "rotateX(68deg) rotateY(-18deg) rotateZ(25deg)",
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Glowing Elliptical Orbit Track */}
                <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]" />
                
                {/* Revolving Earth System (Continuous Smooth Planetary Orbit) */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full"
                >
                  {/* Planet Earth Container */}
                  <div 
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center justify-center"
                    style={{ 
                      // Un-tilt the planet so it stays upright facing the camera
                      transform: "rotateZ(-25deg) rotateY(18deg) rotateX(-68deg)",
                    }}
                  >
                    {/* Glowing Atmospheric Aura */}
                    <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-[#0284c7] via-[#38bdf8] to-[#2dd4bf] shadow-[0_0_20px_#38bdf8,inset_-3px_-3px_6px_rgba(0,0,0,0.6)] flex items-center justify-center p-1 overflow-hidden border border-white/40">
                      
                      {/* Earth Continent Texture Silhouette */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(52,211,153,0.8)_0%,transparent_60%)] pointer-events-none" />
                      <div className="absolute bottom-0.5 right-1 w-3 h-2 bg-emerald-400/80 rounded-full blur-[0.5px] pointer-events-none" />
                      <div className="absolute top-1 left-1.5 w-2.5 h-2 bg-emerald-400/70 rounded-full blur-[0.5px] pointer-events-none" />
                      
                      {/* Atmospheric Cloud Swirl */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-t border-r border-white/60"
                      />

                      {/* Mini Planet Glow Spark */}
                      <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
                    </div>

                    {/* Orbiting Moon / Mini Satellite revolving around Earth */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-2.5 rounded-full border border-dashed border-teal-400/30"
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-teal-200 shadow-[0_0_6px_#5eead4]" />
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Secondary Counter-Tilted Cyber Satellite Orbit with Fast Data Beacon */}
              <div 
                className="absolute w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full pointer-events-none"
                style={{ 
                  transform: "rotateX(72deg) rotateY(25deg) rotateZ(-35deg)",
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Orbit Path */}
                <div className="absolute inset-0 rounded-full border border-indigo-500/30" />

                {/* Revolving Data Node Satellite */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full"
                >
                  <div 
                    className="absolute -top-2 left-1/2 -translate-x-1/2 flex items-center justify-center"
                    style={{ 
                      transform: "rotateZ(35deg) rotateY(-25deg) rotateX(-72deg)",
                    }}
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-purple-500 shadow-[0_0_12px_#c084fc] flex items-center justify-center border border-purple-200">
                      <div className="w-1 h-1 rounded-full bg-white animate-ping" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* High-Speed Rotating Segmented Gyro Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 sm:inset-10 rounded-full border-2 border-dashed border-indigo-400/60"
              />

              {/* Inner Pulsing Hologram Backdrop */}
              <motion.div
                animate={{ 
                  scale: [0.92, 1.12, 0.92],
                  opacity: [0.4, 0.85, 0.4] 
                }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-11 sm:inset-14 rounded-3xl bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-teal-500/30 blur-lg pointer-events-none"
              />

              {/* Central Premium Logo Glass Prism */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-slate-900/90 border border-white/25 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-5 shadow-[0_0_60px_rgba(99,102,241,0.45)] overflow-hidden group z-20"
              >
                {/* Dynamic Diagonal Light Sweep */}
                <motion.div
                  animate={{ x: ["-150%", "250%"] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 w-2/3 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-12 pointer-events-none"
                />

                {/* Corner Neon Precision Accents */}
                <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 border-indigo-400 rounded-tl shadow-[0_0_8px_#818cf8]" />
                <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t-2 border-r-2 border-purple-400 rounded-tr shadow-[0_0_8px_#c084fc]" />
                <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b-2 border-l-2 border-teal-400 rounded-bl shadow-[0_0_8px_#2dd4bf]" />
                <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 border-indigo-400 rounded-br shadow-[0_0_8px_#818cf8]" />
                
                <img 
                  src="/logo.png" 
                  alt="MegaNods" 
                  className="w-full h-full object-contain filter drop-shadow-[0_0_18px_rgba(99,102,241,0.75)] transform group-hover:scale-105 transition-transform duration-300" 
                />
              </motion.div>
            </div>

            {/* Kinetic Typography Brand Name - Seamless single word */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="space-y-2 mb-6"
            >
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white inline-block drop-shadow-2xl">
                <span>Mega</span><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-teal-300 animate-gradient">nods</span>
              </h1>
              
              <div className="flex items-center justify-center gap-2">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-indigo-500/80" />
                <p className="text-[10px] sm:text-[11.5px] font-mono tracking-[0.38em] uppercase text-slate-300 font-semibold">
                  Innovating The Future Of Technology
                </p>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-indigo-500/80" />
              </div>
            </motion.div>

            {/* Dynamic Real-time Frequency Waveform / Equalizer */}
            <div className="flex items-center justify-center gap-1.5 mb-5 h-6">
              {[0.4, 0.85, 0.6, 1, 0.75, 0.35, 0.9, 0.55, 0.95, 0.45, 0.8, 0.3].map((scale, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    height: ["4px", `${Math.floor(scale * 24)}px`, "4px"],
                    backgroundColor: ["#6366f1", "#a855f7", "#14b8a6", "#6366f1"]
                  }}
                  transition={{ 
                    duration: 1.1, 
                    repeat: Infinity, 
                    delay: i * 0.08,
                    ease: "easeInOut" 
                  }}
                  className="w-1 rounded-full opacity-85 shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                />
              ))}
            </div>

            {/* Dynamic Interactive Progress HUD Container */}
            <div className="w-full max-w-sm space-y-3.5 bg-slate-900/70 border border-white/15 backdrop-blur-2xl p-4 sm:p-5 rounded-2xl shadow-2xl shadow-indigo-950/60">
              
              {/* Status Pill & Percentage */}
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/35 text-indigo-300 font-bold">
                  <CurrentIcon className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                  <span className="text-[10.5px] tracking-wider uppercase">{phases[phaseIndex].status}</span>
                </div>
                
                <div className="flex items-baseline gap-0.5">
                  <span className="text-xl sm:text-2xl text-white font-black font-mono tracking-tight">{progress}</span>
                  <span className="text-xs text-indigo-400 font-bold font-mono">%</span>
                </div>
              </div>

              {/* Multi-layered Progress Track with Plasma Spark */}
              <div className="relative h-2 w-full bg-slate-950/90 rounded-full overflow-hidden p-0.5 border border-white/15">
                <motion.div
                  className="relative h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-400 rounded-full shadow-[0_0_20px_rgba(99,102,241,1)] transition-all duration-75"
                  style={{ width: `${progress}%` }}
                >
                  {/* Leading Edge Sparkle */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_#ffffff]" />
                </motion.div>
              </div>

              {/* Live Terminal Diagnostics Text */}
              <div className="h-4 flex items-center justify-between text-[9.5px] font-mono">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phaseIndex}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.2 }}
                    className="tracking-[0.2em] text-slate-300 uppercase font-semibold flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
                    {phases[phaseIndex].label}
                  </motion.span>
                </AnimatePresence>

                <span className="text-slate-400 font-mono hidden sm:inline">
                  [{activeNodes.length} NODES LINKED]
                </span>
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
