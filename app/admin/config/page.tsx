"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft, 
  Save, 
  Sparkles, 
  Loader2, 
  Zap, 
  X, 
  Settings, 
  Globe, 
  Shield, 
  Cpu, 
  Palette, 
  Share2, 
  Mail, 
  Phone, 
  MapPin, 
  Key, 
  Activity, 
  Lock, 
  Eye, 
  Database,
  Terminal,
  Server,
  Cloud,
  Command
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function AdminConfigPage() {
  const router = useRouter()
  const [activeSegment, setActiveSegment] = useState<'general' | 'protocols' | 'appearance' | 'security'>('general')
  const [isAiModalOpen, setIsAiModalOpen] = useState(false)
  const [aiPrompt, setAiPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  
  const [config, setConfig] = useState({
    general: {
       siteName: "NexaTech",
       siteTitle: "High-Fidelity Deep Tech Solutions",
       description: "Architecting the future of human industry with specialized neural networks and fortified infrastructure.",
       keywords: "AI, Blockchain, Enterprise Solutions, Deep Tech",
       status: "Operational"
    },
    contact: {
       email: "base@nexatech.com",
       phone: "+1 800 NEXA CORE",
       address: "Decentralized Operations Center 01",
       social: {
          linkedin: "https://linkedin.com/company/nexatech",
          twitter: "https://twitter.com/nexatech",
          github: "https://github.com/nexatech-labs"
       }
    },
    protocols: {
       geminiKey: "AIzaSyAhNwn7...",
       analyticsId: "G-NEXA-CORE-001",
       deploymentNode: "US-EAST-01-PRIMARY"
    },
    appearance: {
       theme: "System Managed",
       primaryColor: "#4F46E5",
       accentColor: "#10B981",
       glassmorphism: true
    },
    security: {
       maintenanceMode: false,
       authLevel: "Protocol Level 04",
       encryption: "AES-256-GCM"
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("SYNCHRONIZING_SYSTEM_CONFIG:", config)
    toast.success("SYSTEM_CONFIG_SYNCHRONIZED")
  }

  const handleAiOptimize = async () => {
    if (!aiPrompt) return
    setIsGenerating(true)
    
    try {
      // Specialized optimization prompt
      const response = await fetch("/api/generate-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt, type: 'config' }) 
      })
      
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      
      setConfig({
        ...config,
        ...data
      })
      
      toast.success("SYSTEM_OPTIMIZATION_SUCCESSFUL")
      setIsAiModalOpen(false)
      setAiPrompt("")
    } catch (error: any) {
      console.error("AI_GEN_ERROR:", error)
      toast.error(`OPTIMIZATION_FAILURE: ${error.message}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const segments = [
    { id: 'general', label: 'Global Metadata', icon: Globe },
    { id: 'protocols', label: 'Inbound Protocols', icon: Terminal },
    { id: 'appearance', label: 'Visual Signature', icon: Palette },
    { id: 'security', label: 'Encrypted Fortification', icon: Shield },
  ]

  return (
    <div className="space-y-12 pb-24">
      {/* Tactical Header */}
      <div className="relative">
        <div className="absolute -left-10 top-0 w-1 h-20 bg-gradient-to-b from-indigo-500 to-transparent" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                 <span className="text-[10px] font-mono text-indigo-500 uppercase tracking-[0.5em] font-bold">Base command tower</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-2 underline decoration-indigo-500/20 underline-offset-[12px]">System <span className="text-indigo-500">Config</span></h1>
              <p className="text-slate-400 dark:text-white/20 font-mono text-[10px] uppercase tracking-[0.3em]">Configure Global Protocols & Strategic Infrastructure Settings</p>
           </motion.div>
           
           <div className="flex gap-4">
              <Button onClick={() => setIsAiModalOpen(true)} type="button" variant="outline" className="h-16 px-8 border-indigo-500/30 text-indigo-500 hover:bg-indigo-500 hover:text-white rounded-2xl flex items-center gap-3 transition-all">
                 <Sparkles className="w-5 h-5" />
                 <span className="font-bold uppercase tracking-widest text-xs">Neural Optimization</span>
              </Button>
              <Button onClick={handleSubmit} className="h-16 px-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-xl shadow-indigo-600/20 flex items-center gap-3">
                 <Save className="w-5 h-5" />
                 <span className="font-black uppercase tracking-widest text-xs">Authorize Sync</span>
              </Button>
           </div>
        </div>
      </div>

      {/* Grid Tab Nav */}
      <div className="flex flex-wrap gap-4 p-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[2.5rem] shadow-sm">
         {segments.map((s) => (
           <button
             key={s.id}
             onClick={() => setActiveSegment(s.id as any)}
             className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all font-mono text-[9px] uppercase tracking-widest ${activeSegment === s.id ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "text-slate-400 dark:text-white/20 hover:bg-slate-50 dark:hover:bg-white/5"}`}
           >
              <s.icon className="w-4 h-4" />
              {s.label}
           </button>
         ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
         
         <AnimatePresence mode="wait">
           {activeSegment === 'general' && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                   <InputGroup label="Unit Instance Name" icon={Cpu} value={config.general.siteName} onChange={(v: string) => setConfig({...config, general: {...config.general, siteName: v}})} />
                   <InputGroup label="Public Index Title" icon={Globe} value={config.general.siteTitle} onChange={(v: string) => setConfig({...config, general: {...config.general, siteTitle: v}})} />
                </div>
                <TextAreaGroup label="Global Metadata Description" value={config.general.description} onChange={(v: string) => setConfig({...config, general: {...config.general, description: v}})} />
                <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 space-y-8">
                   <h3 className="text-[10px] font-mono text-indigo-500 uppercase tracking-[0.5em] mb-4">Contact Uplink Protocols</h3>
                   <div className="grid md:grid-cols-2 gap-8">
                      <InputGroup label="Global Base Email" icon={Mail} value={config.contact.email} onChange={(v: string) => setConfig({...config, contact: {...config.contact, email: v}})} />
                      <InputGroup label="Tactical Phone Line" icon={Phone} value={config.contact.phone} onChange={(v: string) => setConfig({...config, contact: {...config.contact, phone: v}})} />
                   </div>
                   <InputGroup label="Decentralized Office Hub" icon={MapPin} value={config.contact.address} onChange={(v: string) => setConfig({...config, contact: {...config.contact, address: v}})} />
                </div>
             </motion.div>
           )}

           {activeSegment === 'protocols' && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 space-y-8">
                   <div className="flex items-center gap-4 mb-4">
                      <Key className="w-6 h-6 text-indigo-500" />
                      <div>
                         <h3 className="text-xl font-bold dark:text-white leading-none tracking-tight">Intelligence Access Keys</h3>
                         <p className="text-xs text-slate-400 dark:text-white/20 font-mono uppercase tracking-widest">Active Neural Uplink Protocols</p>
                      </div>
                   </div>
                   <div className="grid md:grid-cols-2 gap-8">
                      <InputGroup label="Gemini API Key (Encrypted)" icon={Sparkles} type="password" value={config.protocols.geminiKey} onChange={(v: string) => setConfig({...config, protocols: {...config.protocols, geminiKey: v}})} />
                      <InputGroup label="Strategic Analytics ID" icon={Activity} value={config.protocols.analyticsId} onChange={(v: string) => setConfig({...config, protocols: {...config.protocols, analyticsId: v}})} />
                   </div>
                   <InputGroup label="Active Deployment Node" icon={Server} value={config.protocols.deploymentNode} onChange={(v: string) => setConfig({...config, protocols: {...config.protocols, deploymentNode: v}})} />
                </div>
             </motion.div>
           )}

           {activeSegment === 'appearance' && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 space-y-6">
                      <label className="text-[10px] font-mono text-indigo-500 uppercase tracking-[0.5em] block">Base Visual Mode</label>
                      <div className="flex gap-3">
                         {['Light Protocol', 'Dark Protocol', 'System Managed'].map((mode) => (
                           <button
                             key={mode}
                             type="button"
                             onClick={() => setConfig({...config, appearance: {...config.appearance, theme: mode}})}
                             className={`flex-1 py-4 px-2 rounded-2xl text-[9px] font-mono uppercase tracking-widest transition-all ${config.appearance.theme === mode ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "bg-slate-50 dark:bg-white/5 text-slate-400 dark:text-white/20"}`}
                           >
                              {mode}
                           </button>
                         ))}
                      </div>
                   </div>
                   <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 space-y-6">
                      <label className="text-[10px] font-mono text-indigo-500 uppercase tracking-[0.5em] block">Protocol Color Signature</label>
                      <div className="flex gap-4">
                         <div className="flex-1">
                            <InputGroup label="Primary Hue" value={config.appearance.primaryColor} onChange={(v: string) => setConfig({...config, appearance: {...config.appearance, primaryColor: v}})} />
                         </div>
                         <div className="w-14 h-14 mt-7 rounded-xl border border-white/10" style={{ backgroundColor: config.appearance.primaryColor }} />
                      </div>
                   </div>
                </div>
             </motion.div>
           )}

           {activeSegment === 'security' && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 flex items-center justify-between">
                   <div className="flex gap-6 items-center">
                      <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500"><Lock className="w-6 h-6" /></div>
                      <div>
                         <h3 className="text-xl font-bold dark:text-white tracking-tight">Maintenance Protocol</h3>
                         <p className="text-xs text-slate-400 dark:text-white/20 font-mono uppercase tracking-widest">Restrict global access for architectural cleanup</p>
                      </div>
                   </div>
                   <button 
                     type="button" 
                     onClick={() => setConfig({...config, security: {...config.security, maintenanceMode: !config.security.maintenanceMode}})}
                     className={`w-20 h-10 rounded-full transition-all relative ${config.security.maintenanceMode ? "bg-red-500" : "bg-slate-200 dark:bg-white/10"}`}
                   >
                      <div className={`absolute top-1 w-8 h-8 rounded-full bg-white transition-all shadow-md ${config.security.maintenanceMode ? "left-11" : "left-1"}`} />
                   </button>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                   <InputGroup label="Unit Auth Level" icon={Shield} value={config.security.authLevel} onChange={(v: string) => setConfig({...config, security: {...config.security, authLevel: v}})} />
                   <InputGroup label="Encryption Standard" icon={Terminal} value={config.security.encryption} onChange={(v: string) => setConfig({...config, security: {...config.security, encryption: v}})} />
                </div>
             </motion.div>
           )}
         </AnimatePresence>

      </form>

      {/* AI Modal */}
      <AnimatePresence>
        {isAiModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]" onClick={() => !isGenerating && setIsAiModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white dark:bg-[#05050a] border border-slate-200 dark:border-white/10 rounded-[3rem] p-10 z-[110] shadow-2xl">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                     <Sparkles className="w-6 h-6 text-indigo-500" />
                     <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">Neural Optimization Hub</h3>
                     <span className="text-[7px] font-mono bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded-full border border-indigo-500/20 uppercase tracking-widest">v2.5_FLASH</span>
                  </div>
                  <button onClick={() => setIsAiModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"><X className="w-5 h-5" /></button>
               </div>
               <div className="space-y-6">
                  <p className="text-xs text-slate-400 dark:text-white/20 font-mono uppercase tracking-[0.2em] leading-relaxed">
                     Describe your strategic objective. The Neural Engine will autonomously optimize your site's identity, SEO taxonomy, and visual signature for maximum global frequency.
                  </p>
                  <textarea value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} placeholder="e.g. Optimize our SEO description and theme colors for a high-end luxury watch brand that uses AI for tracking..." className="w-full h-40 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl p-6 text-sm focus:outline-none focus:border-indigo-500/30 transition-all resize-none text-slate-900 dark:text-white" />
                  <Button onClick={handleAiOptimize} disabled={isGenerating || !aiPrompt} className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl flex items-center justify-center gap-4 transition-all disabled:opacity-50">
                     {isGenerating ? <><Loader2 className="w-5 h-5 animate-spin" /><span className="font-bold uppercase tracking-widest text-xs">Optimizing Base Config...</span></> : <><Zap className="w-5 h-5 fill-white" /><span className="font-bold uppercase tracking-widest text-xs">Execute Synchronized Optimization</span></>}
                  </Button>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function InputGroup({ label, icon: Icon, placeholder, value, onChange, type = "text" }: any) {
  return (
    <div className="space-y-3">
       <label className="text-[9px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.3em] font-bold pl-2">{label}</label>
       <div className="relative group/input">
          {Icon && <Icon className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 dark:text-white/10 group-focus-within/input:text-indigo-500 transition-colors" />}
          <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className={`w-full h-14 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl pr-8 text-sm focus:outline-none focus:border-indigo-500/30 transition-all ${Icon ? 'pl-14' : 'pl-6'}`} />
       </div>
    </div>
  )
}

function TextAreaGroup({ label, value, onChange }: any) {
  return (
    <div className="space-y-3">
       <label className="text-[9px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.3em] font-bold pl-2">{label}</label>
       <textarea value={value} onChange={(e) => onChange(e.target.value)} className="w-full h-40 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[2rem] p-8 text-sm focus:outline-none focus:border-indigo-500/30 transition-all resize-none" />
    </div>
  )
}
