"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Terminal, Shield, Cpu, Zap, Globe, Code2, Rocket, Layers } from "lucide-react"

const loadingStory = [
  { 
    id: 1, 
    label: "PHASE 01: ARCHITECTURE", 
    text: "Analyzing Domain & User Flow...", 
    icon: Layers, 
    gradient: "from-blue-600 to-indigo-600",
    logs: ["> Scanning corpus...", "> Map entry established", "> Architecture: 100%"]
  },
  { 
    id: 2, 
    label: "PHASE 02: DEVELOPMENT", 
    text: "Neural Code Compilation...", 
    icon: Code2, 
    gradient: "from-indigo-600 to-purple-600",
    logs: ["> git commit -m 'init core'", "> npm build success", "> Unit Tests: PASS"]
  },
  { 
    id: 3, 
    label: "PHASE 03: DEPLOYMENT", 
    text: "Pushing to Global Edge Nodes...", 
    icon: Rocket, 
    gradient: "from-purple-600 to-emerald-500",
    logs: ["> CDN warm-up...", "> SSL handshake...", "> STATUS: LIVE"]
  }
]

export function Preloader() {
  const [loading, setLoading] = useState(true)
  const [currentPhase, setCurrentPhase] = useState(0)

  useEffect(() => {
    // 3 second total duration (1s per phase)
    const phaseInterval = setInterval(() => {
      setCurrentPhase((prev) => {
        if (prev >= 2) {
          clearInterval(phaseInterval)
          setTimeout(() => setLoading(false), 800)
          return 2
        }
        return prev + 1
      })
    }, 1000)

    return () => clearInterval(phaseInterval)
  }, [])

  const ActiveIcon = loadingStory[currentPhase].icon

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(40px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#010103] flex items-center justify-center overflow-hidden"
        >
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 overflow-hidden">
             <motion.div 
               animate={{ 
                 opacity: [0.1, 0.2, 0.1],
                 scale: [1, 1.1, 1]
               }}
               className={`absolute inset-0 bg-gradient-to-br ${loadingStory[currentPhase].gradient} blur-[120px] opacity-10 transition-colors duration-700`}
             />
             <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
          </div>

          <div className="relative w-full max-w-4xl px-8 flex flex-col items-center">
            
            {/* Visual HUD Container */}
            <div className="relative w-full aspect-square md:aspect-[21/9] rounded-[2.5rem] md:rounded-[3rem] border border-white/10 bg-[#05050a]/40 backdrop-blur-3xl overflow-hidden p-1 shadow-2xl mb-12">
               <div className="w-full h-full rounded-[2.3rem] md:rounded-[2.8rem] bg-black overflow-hidden relative p-8 md:p-12">
                  
                  {/* Top Status Bar */}
                  <div className="flex items-center justify-between mb-12 opacity-40">
                     <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-mono text-[8px] uppercase tracking-[0.4em]">Node Connectivity: Stabilized</span>
                     </div>
                     <span className="font-mono text-[8px] uppercase tracking-[0.4em]">Build Sequence: MN-42-X</span>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-12 items-center h-full pb-16">
                     {/* Left Side: Icon & Headline */}
                     <div className="text-left space-y-6">
                        <motion.div
                          key={`icon-${currentPhase}`}
                          initial={{ scale: 0.8, opacity: 0, rotate: -20 }}
                          animate={{ scale: 1, opacity: 1, rotate: 0 }}
                          className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${loadingStory[currentPhase].gradient} flex items-center justify-center shadow-xl shadow-indigo-500/20`}
                        >
                           <ActiveIcon className="w-10 h-10 text-white" />
                        </motion.div>
                        
                        <motion.div
                          key={`text-${currentPhase}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                           <h2 className="text-white/40 font-mono text-[10px] uppercase tracking-[0.6em] mb-2">{loadingStory[currentPhase].label}</h2>
                           <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-none text-white whitespace-normal md:whitespace-nowrap">
                              {loadingStory[currentPhase].text}
                           </h1>
                        </motion.div>
                     </div>

                     {/* Right Side: Log Console */}
                     <div className="hidden lg:block">
                        <div className="space-y-4 font-mono text-[10px] text-white/30 uppercase tracking-widest pl-12 border-l border-white/5 h-32 overflow-hidden">
                           {loadingStory[currentPhase].logs.map((log, i) => (
                             <motion.div
                               key={`${currentPhase}-${i}`}
                               initial={{ opacity: 0, x: 20 }}
                               animate={{ opacity: 1, x: 0 }}
                               transition={{ delay: i * 0.1 }}
                               className="flex items-center gap-4 py-1"
                             >
                                <span className="text-emerald-500/50">OK</span>
                                {log}
                             </motion.div>
                           ))}
                           <motion.div 
                             animate={{ opacity: [0, 1, 0] }}
                             transition={{ duration: 1, repeat: Infinity }}
                             className="w-2 h-4 bg-emerald-500/30" 
                           />
                        </div>
                     </div>
                  </div>
                  
                  {/* Progress Line */}
                  <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full bg-white shadow-[0_0_20px_white]"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, ease: "linear" }}
                    />
                  </div>
               </div>
            </div>

            {/* Branding Minimal */}
            <div className="flex flex-col items-center gap-4">
               <motion.div
                 animate={{ 
                   opacity: [0.3, 0.6, 0.3],
                 }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="flex items-center gap-3"
               >
                  <img src="/WhatsApp Image 2026-04-04 at 12.39.24 PM.jpeg" alt="Logo" className="w-8 h-8 rounded-lg grayscale opacity-50 contrast-150" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.8em] text-white/20">Establishing Experience Hub</span>
               </motion.div>
               
               <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                     <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${currentPhase >= i ? 'bg-white shadow-[0_0_8px_white]' : 'bg-white/5'}`} />
                  ))}
               </div>
            </div>

          </div>

          {/* HUD Tag */}
          <div className="absolute bottom-12 right-12 text-[8px] font-mono text-white/10 uppercase tracking-[0.4em] hidden md:block">
             System Auth: SUCCESS<br />
             Uplink: ESTABLISHED<br />
             Engine: MN-X42
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
