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
  PlusCircle, 
  Layout, 
  Info, 
  Image as ImageIcon, 
  User, 
  Calendar, 
  Clock, 
  Tag, 
  FileText, 
  BookOpen, 
  Type,
  Target,
  Eye,
  Heart,
  Shield,
  Layers,
  Award,
  Fingerprint,
  Trash2
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function AdminAboutPage() {
  const router = useRouter()
  const [activeSegment, setActiveSegment] = useState<'hero' | 'mission' | 'stats' | 'values' | 'history'>('hero')
  const [isAiModalOpen, setIsAiModalOpen] = useState(false)
  const [aiPrompt, setAiPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  
  const [formData, setFormData] = useState({
    hero: {
      title: "Architecting Total Intelligence",
      subtitle: "Enterprise Profile: Meganods",
      description: "We are not just a technology company. We are the structural foundation for the next era of human industry—powered by specialized neural networks and fortified global infrastructure.",
    },
    mission: [
      { 
        title: "The Mission Protocol", 
        meta: "Core Vision", 
        description: "To empower global industry through the seamless integration of artificial intelligence and high-performance engineering. We bridge the gap between complex business logic and autonomous execution." 
      },
      { 
        title: "Tomorrow’s Sovereignty", 
        meta: "Strategic Map", 
        description: "Establishing a world where technology doesn't just assist humans—it anticipates their needs, fortifies their security, and scales their ambitions across infinite horizons." 
      }
    ],
    stats: [
      { value: '1.2B', label: 'Nodes Managed', sub: 'Global Scale' },
      { value: '50ms', label: 'Avg Latency', sub: 'Ultra-Fast' },
      { value: '450+', label: 'Enterprise Partners', sub: 'Strategic' },
      { value: '99.9%', label: 'Active Uptime', sub: 'Fault Tolerant' },
    ],
    values: [
      { title: 'Precision First', meta: 'Operational Core', description: 'We prioritize sub-millisecond precision in every algorithm we deploy to the global network.', gradient: 'from-indigo-600 via-blue-600 to-cyan-500' },
      { title: 'Human-Centric AI', meta: 'Ethics Audit 01', description: 'Technology is a tool for humanity. We design systems that empower, never replace.', gradient: 'from-rose-600 via-pink-600 to-orange-500' },
    ],
    milestones: [
      { year: '2015', title: 'Genesis Protocol', description: 'Meganods founded with a vision for autonomous intelligence.' },
      { year: '2024', title: 'The Intelligence Frontier', description: 'Dominating the market as the gold standard for Deep Tech solutions.' },
    ]
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("UPDATING_ABOUT_PROTOCOL:", formData)
    toast.success("ABOUT_PROTOCOL_SYNCHRONIZED")
  }

  const handleAiGenerate = async () => {
    if (!aiPrompt) return
    setIsGenerating(true)
    
    try {
      // In a real implementation, we'd have a specialized 'about' type in our API
      const response = await fetch("/api/generate-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt, type: 'about' }) // Assume we'll add 'about' support
      })
      
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      
      setFormData({
        ...formData,
        ...data
      })
      
      toast.success("ABOUT_REFRESH_SUCCESSFUL")
      setIsAiModalOpen(false)
      setAiPrompt("")
    } catch (error: any) {
      console.error("AI_GEN_ERROR:", error)
      toast.error(`NEURAL_FAILURE: ${error.message}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const segments = [
    { id: 'hero', label: 'Manifesto (Hero)', icon: Fingerprint },
    { id: 'mission', label: 'Mission Nodes', icon: Target },
    { id: 'stats', label: 'Impact Telemetry', icon: Zap },
    { id: 'values', label: 'Core Principles', icon: Shield },
    { id: 'history', label: 'Evolution Mesh', icon: Clock },
  ]

  return (
    <div className="space-y-12 pb-24">
      {/* Header */}
      <div className="relative">
        <div className="absolute -left-10 top-0 w-1 h-20 bg-gradient-to-b from-indigo-500 to-transparent" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                 <span className="text-[10px] font-mono text-indigo-500 uppercase tracking-[0.5em] font-bold">Structural identity module</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-2">About <span className="text-indigo-500">Meganods</span></h1>
              <p className="text-slate-400 dark:text-white/20 font-mono text-[10px] uppercase tracking-[0.3em]">Configure Global Identity & Operational Philosophy</p>
           </motion.div>
           
           <div className="flex gap-4">
              <Button onClick={() => setIsAiModalOpen(true)} type="button" variant="outline" className="h-16 px-8 border-indigo-500/30 text-indigo-500 hover:bg-indigo-500 hover:text-white rounded-2xl flex items-center gap-3 transition-all">
                 <Sparkles className="w-5 h-5" />
                 <span className="font-bold uppercase tracking-widest text-xs">Neural Rewrite</span>
              </Button>
              <Button onClick={handleSubmit} className="h-16 px-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-xl shadow-indigo-600/20 flex items-center gap-3">
                 <Save className="w-5 h-5" />
                 <span className="font-black uppercase tracking-widest text-xs">Synchronize Protocol</span>
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
           {activeSegment === 'hero' && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                   <InputGroup label="Main Heading" icon={Type} value={formData.hero.title} onChange={(v: string) => setFormData({...formData, hero: {...formData.hero, title: v}})} />
                   <InputGroup label="Module Tagline" icon={Fingerprint} value={formData.hero.subtitle} onChange={(v: string) => setFormData({...formData, hero: {...formData.hero, subtitle: v}})} />
                </div>
                <TextAreaGroup label="Manifesto Description" value={formData.hero.description} onChange={(v: string) => setFormData({...formData, hero: {...formData.hero, description: v}})} />
             </motion.div>
           )}

           {activeSegment === 'mission' && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
                {formData.mission.map((node, i) => (
                  <div key={i} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 space-y-6">
                     <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold dark:text-white tracking-tight">Mission Node 0{i+1}</h3>
                        <Button variant="ghost" className="text-red-500 p-0 hover:bg-transparent"><Trash2 className="w-5 h-5" /></Button>
                     </div>
                     <div className="grid md:grid-cols-2 gap-8">
                        <InputGroup label="Node Title" icon={Target} value={node.title} onChange={(v: string) => {
                          const newMission = [...formData.mission];
                          newMission[i].title = v;
                          setFormData({...formData, mission: newMission});
                        }} />
                        <InputGroup label="Strategic Classification" icon={Info} value={node.meta} onChange={(v: string) => {
                          const newMission = [...formData.mission];
                          newMission[i].meta = v;
                          setFormData({...formData, mission: newMission});
                        }} />
                     </div>
                     <TextAreaGroup label="Operational Detail" value={node.description} onChange={(v: string) => {
                          const newMission = [...formData.mission];
                          newMission[i].description = v;
                          setFormData({...formData, mission: newMission});
                        }} />
                  </div>
                ))}
                <Button variant="outline" className="w-full h-20 border-dashed border-slate-200 dark:border-white/10 rounded-[2.5rem] flex items-center justify-center gap-3 text-slate-400">
                   <PlusCircle className="w-5 h-5" />
                   <span className="font-bold uppercase tracking-widest text-xs">Append Mission Node</span>
                </Button>
             </motion.div>
           )}

           {activeSegment === 'stats' && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid md:grid-cols-2 gap-8">
                {formData.stats.map((stat, i) => (
                   <div key={i} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 space-y-6">
                      <div className="flex items-center justify-between">
                         <h3 className="text-[10px] font-mono text-indigo-500 uppercase tracking-[0.5em]">Telemetry Stat 0{i+1}</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <InputGroup label="Kinetic Value" value={stat.value} onChange={(v: string) => {
                           const newStats = [...formData.stats];
                           newStats[i].value = v;
                           setFormData({...formData, stats: newStats});
                         }} />
                         <InputGroup label="Metric Label" value={stat.label} onChange={(v: string) => {
                           const newStats = [...formData.stats];
                           newStats[i].label = v;
                           setFormData({...formData, stats: newStats});
                         }} />
                      </div>
                      <InputGroup label="Sector classification" icon={Layers} value={stat.sub} onChange={(v: string) => {
                        const newStats = [...formData.stats];
                        newStats[i].sub = v;
                        setFormData({...formData, stats: newStats});
                      }} />
                   </div>
                ))}
             </motion.div>
           )}

           {activeSegment === 'values' && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                {formData.values.map((val, i) => (
                  <div key={i} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 space-y-6">
                     <div className="grid md:grid-cols-2 gap-8">
                        <InputGroup label="Principle Title" value={val.title} onChange={(v: string) => {
                          const newValues = [...formData.values];
                          newValues[i].title = v;
                          setFormData({...formData, values: newValues});
                        }} />
                        <InputGroup label="Ethics classification" value={val.meta} onChange={(v: string) => {
                          const newValues = [...formData.values];
                          newValues[i].meta = v;
                          setFormData({...formData, values: newValues});
                        }} />
                     </div>
                     <TextAreaGroup label="Principle Description" value={val.description} onChange={(v: string) => {
                          const newValues = [...formData.values];
                          newValues[i].description = v;
                          setFormData({...formData, values: newValues});
                        }} />
                     <InputGroup label="Kinetic Gradient" icon={Layers} value={val.gradient} onChange={(v: string) => {
                          const newValues = [...formData.values];
                          newValues[i].gradient = v;
                          setFormData({...formData, values: newValues});
                        }} />
                  </div>
                ))}
                <Button variant="outline" className="w-full h-20 border-dashed border-slate-200 dark:border-white/10 rounded-[2.5rem] flex items-center justify-center gap-3 text-slate-400">
                   <PlusCircle className="w-5 h-5" />
                   <span className="font-bold uppercase tracking-widest text-xs">Append Core Principle</span>
                </Button>
             </motion.div>
           )}

           {activeSegment === 'history' && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                {formData.milestones.map((ms, i) => (
                   <div key={i} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 flex gap-8 items-start">
                      <div className="w-32">
                         <InputGroup label="Neural Year" value={ms.year} onChange={(v: string) => {
                            const newMS = [...formData.milestones];
                            newMS[i].year = v;
                            setFormData({...formData, milestones: newMS});
                         }} />
                      </div>
                      <div className="flex-1 space-y-4">
                         <InputGroup label="Milestone Rank" value={ms.title} onChange={(v: string) => {
                            const newMS = [...formData.milestones];
                            newMS[i].title = v;
                            setFormData({...formData, milestones: newMS});
                         }} />
                         <TextAreaGroup label="Historical Registry" value={ms.description} onChange={(v: string) => {
                            const newMS = [...formData.milestones];
                            newMS[i].description = v;
                            setFormData({...formData, milestones: newMS});
                         }} />
                      </div>
                      <Button variant="ghost" className="text-red-500 hover:bg-red-500/10"><Trash2 className="w-5 h-5" /></Button>
                   </div>
                ))}
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
                     <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">Neural Identity Hub</h3>
                     <span className="text-[7px] font-mono bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded-full border border-indigo-500/20 uppercase tracking-widest">v2.5_FLASH</span>
                  </div>
                  <button onClick={() => setIsAiModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"><X className="w-5 h-5" /></button>
               </div>
               <div className="space-y-6">
                  <p className="text-xs text-slate-400 dark:text-white/20 font-mono uppercase tracking-[0.2em] leading-relaxed">
                     Describe the identity shift you wish to execute. The Neural Engine will autonomously rewrite your mission, values, and historical registry to match your new organizational frequency.
                  </p>
                  <textarea value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} placeholder="e.g. Refactor our about page to focus more on decentralized infrastructure and ethical AI governance..." className="w-full h-40 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl p-6 text-sm focus:outline-none focus:border-indigo-500/30 transition-all resize-none text-slate-900 dark:text-white" />
                  <Button onClick={handleAiGenerate} disabled={isGenerating || !aiPrompt} className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl flex items-center justify-center gap-4 transition-all disabled:opacity-50">
                     {isGenerating ? <><Loader2 className="w-5 h-5 animate-spin" /><span className="font-bold uppercase tracking-widest text-xs">Refactoring Identity Protocol...</span></> : <><Zap className="w-5 h-5 fill-white" /><span className="font-bold uppercase tracking-widest text-xs">Synchronize Neural Network</span></>}
                  </Button>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function InputGroup({ label, icon: Icon, placeholder, value, onChange }: any) {
  return (
    <div className="space-y-3">
       <label className="text-[9px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.3em] font-bold pl-2">{label}</label>
       <div className="relative group/input">
          {Icon && <Icon className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 dark:text-white/10 group-focus-within/input:text-indigo-500 transition-colors" />}
          <input type="text" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className={`w-full h-14 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl pr-8 text-sm focus:outline-none focus:border-indigo-500/30 transition-all ${Icon ? 'pl-14' : 'pl-6'}`} />
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
