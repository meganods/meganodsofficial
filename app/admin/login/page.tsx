"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, Terminal, Fingerprint, Cpu } from "lucide-react"
import Link from "next/link"
import { DeepTechBackground } from "@/components/ui/deep-tech-background"

export default function AdminLoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulated technical verification sequence
    await new Promise(resolve => setTimeout(resolve, 2000))

    if (formData.email === "admin@meganods.com" && formData.password === "admin123") {
      localStorage.setItem("adminAuth", "true")
      router.push("/admin")
    } else {
      setError("AUTHENTICATION_FAILURE: INVALID_CREDENTIALS")
    }

    setIsLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#010103] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Cinematic Deep Tech Foundation */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <DeepTechBackground />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-xl z-10"
      >
        <div className="bg-[#05050a]/60 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-1 shadow-2xl overflow-hidden group hover:border-indigo-500/30 transition-all duration-700">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-blue-500/10 pointer-events-none" />
          
          <div className="p-10 md:p-16 relative">
            {/* Logo Hub */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-4 mb-10">
                <div className="relative w-14 h-14">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-indigo-500/30 rounded-xl" 
                  />
                  <div className="absolute inset-1.5 bg-[#010103] rounded-lg border border-white/10 flex items-center justify-center text-2xl font-black shadow-2xl">
                    <img src="/WhatsApp Image 2026-04-04 at 12.39.24 PM.jpeg" alt="MN" className="w-full h-full object-contain grayscale opacity-50 contrast-150" />
                  </div>
                </div>
                <div className="text-left">
                  <h1 className="text-2xl font-black tracking-tighter leading-none mb-1">
                    Mega<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">nods</span>
                  </h1>
                  <span className="text-[8px] font-mono text-white/30 tracking-[0.4em] uppercase">Security Portal v4.2</span>
                </div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Establish <span className="text-glow">Access</span></h2>
              <p className="text-white/40 text-sm font-medium tracking-wide">
                Terminal authorization required for administrative control.
              </p>
            </div>

            {/* Tactical Form */}
            <form onSubmit={handleSubmit} className="space-y-10">
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-[10px] font-mono tracking-widest uppercase text-center"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] pl-2">Operator ID</label>
                  <div className="relative group/input">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400 opacity-40 group-focus-within/input:opacity-100 transition-opacity">
                       <Mail className="w-full h-full" />
                    </div>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl pl-16 pr-8 text-white font-bold focus:outline-none focus:border-indigo-500/50 transition-all text-sm tracking-wide placeholder:text-white/10"
                      placeholder="admin@meganods.com"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] pl-2">Access Frequency</label>
                  <div className="relative group/input">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400 opacity-40 group-focus-within/input:opacity-100 transition-opacity">
                       <Lock className="w-full h-full" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl pl-16 pr-16 text-white font-bold focus:outline-none focus:border-indigo-500/50 transition-all text-sm tracking-wide placeholder:text-white/10"
                      placeholder="Access Token"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-5 h-5 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center transition-all group-hover:border-indigo-500/50">
                    <input type="checkbox" className="hidden peer" />
                    <div className="w-2 h-2 rounded-sm bg-indigo-500 scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Persist Node</span>
                </label>
                <Link href="#" className="text-[10px] font-mono text-indigo-400/50 hover:text-indigo-400 uppercase tracking-widest transition-colors">Recover Uplink</Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-20 bg-white text-black hover:bg-white/90 font-black rounded-[2rem] transition-all shadow-2xl flex items-center justify-center gap-4 group disabled:opacity-50 text-xl tracking-tighter"
              >
                {isLoading ? (
                  <>
                    <div className="w-6 h-6 border-4 border-black/30 border-t-black rounded-full animate-spin" />
                    <span className="uppercase text-sm tracking-[0.4em]">Verifying...</span>
                  </>
                ) : (
                  <>
                    Authorize Connection <Fingerprint className="w-7 h-7 group-hover:scale-110 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-12 pt-10 border-t border-white/5 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="text-white/20 font-mono text-[8px] uppercase tracking-widest">Security: Optimal</span>
               </div>
               <Cpu className="w-8 h-8 text-white/5" />
            </div>
          </div>
        </div>
        
        <div className="text-center mt-10">
          <Link href="/" className="text-[10px] font-mono text-white/20 hover:text-white uppercase tracking-[0.4em] transition-all">
             Abort Mission & Return to Base
          </Link>
        </div>
      </motion.div>
    </main>
  )
}
