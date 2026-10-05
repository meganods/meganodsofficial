"use client"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  Fingerprint, 
  ArrowLeft,
  KeyRound,
  Activity,
  AlertCircle
} from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password)
      localStorage.setItem("adminAuth", "true")
      if (rememberMe) {
        localStorage.setItem("adminRemember", "true")
      }
      router.push("/admin")
    } catch (err: any) {
      console.error(err)
      setError("Invalid administrative credentials. Please verify and try again.")
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#070913] text-slate-100 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden selection:bg-indigo-500/30 selection:text-white">
      {/* Dynamic Background Mesh & Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Cyber Grid */}
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(129, 140, 248, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(129, 140, 248, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '52px 52px',
          }}
        />

        {/* Ambient Gradient Orbs */}
        <div className="absolute -top-40 -left-40 w-[650px] h-[650px] bg-blue-600/20 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 -right-40 w-[650px] h-[650px] bg-indigo-600/20 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-purple-600/10 rounded-full blur-[160px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-xl z-10 my-8"
      >
        {/* Main Card */}
        <div className="relative rounded-[2rem] bg-[#0d1224]/90 backdrop-blur-2xl border border-slate-800/90 shadow-[0_25px_80px_rgba(0,0,0,0.75),0_0_50px_rgba(99,102,241,0.1)] overflow-hidden">
          
          {/* Top Decorative Border Accent */}
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

          <div className="p-8 sm:p-14">
            
            {/* Header / Brand Identity */}
            <div className="flex flex-col items-center text-center mb-10">
              <div className="relative mb-6 group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-lg opacity-40 group-hover:opacity-70 transition duration-500" />
                <div className="relative w-20 h-20 rounded-2xl bg-[#090d1a] border border-slate-700/80 flex items-center justify-center p-3.5 shadow-2xl">
                  <Image 
                    src="/logo.png" 
                    alt="Meganods Logo" 
                    width={56} 
                    height={56} 
                    className="object-contain filter drop-shadow" 
                    priority
                  />
                </div>
              </div>

              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-mono font-semibold mb-4 tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>MEGANODS SECURITY PORTAL</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
                Admin Console
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-md">
                Enter your administrative credentials to access and manage services.
              </p>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: 28 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="p-4 rounded-xl bg-red-500/15 border border-red-500/30 flex items-start gap-3 text-red-200 text-sm sm:text-base"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-red-100">Authentication Failed</p>
                    <p className="text-xs sm:text-sm text-red-300/90 mt-0.5">{error}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email Input */}
              <div className="space-y-2.5">
                <label className="block text-sm sm:text-base font-semibold uppercase tracking-wider text-slate-200">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-400 transition-colors">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-14 bg-slate-900/90 border border-slate-700/90 rounded-2xl pl-13 sm:pl-15 pr-5 text-white text-base sm:text-lg font-medium placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/25 transition-all"
                    placeholder="admin@meganods.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-sm sm:text-base font-semibold uppercase tracking-wider text-slate-200">
                    Security Key
                  </label>
                </div>
                <div className="relative group">
                  <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-400 transition-colors">
                    <Lock className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full h-14 bg-slate-900/90 border border-slate-700/90 rounded-2xl pl-13 sm:pl-15 pr-14 text-white text-base sm:text-lg font-medium placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/25 transition-all"
                    placeholder="Enter security key"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1.5"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Node Status */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500/30 focus:ring-offset-0"
                  />
                  <span className="text-sm sm:text-base text-slate-300 hover:text-white transition-colors">
                    Keep session active
                  </span>
                </label>
                <span className="text-xs sm:text-sm font-mono text-slate-400">Node: Greater Noida</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 sm:h-15 mt-3 py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-bold text-base sm:text-lg shadow-xl shadow-indigo-600/30 active:scale-[0.99] hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Authenticating Node...</span>
                  </>
                ) : (
                  <>
                    <span>Authorize Session</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Security Badges */}
            <div className="mt-10 pt-6 border-t border-slate-800/90 flex items-center justify-between text-xs sm:text-sm text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>256-Bit TLS</span>
              </div>
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-indigo-400" />
                <span>Zero-Trust Shield</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-400" />
                <span>Audit Active</span>
              </div>
            </div>

          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-7">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Meganods Homepage</span>
          </Link>
        </div>
      </motion.div>
    </main>
  )
}
