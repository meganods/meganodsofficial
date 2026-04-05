"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Save, 
  Sparkles, 
  Loader2, 
  Zap, 
  X, 
  PlusCircle, 
  Layout, 
  Info, 
  Layers, 
  Cpu, 
  Target, 
  Brain, 
  Cloud, 
  Shield, 
  Activity, 
  Globe,
  Database,
  ArrowUpDown
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function NewServicePage() {
  const router = useRouter()
  const [activeSegment, setActiveSegment] = useState<'profile' | 'specs' | 'visual'>('profile')
  const [isAiModalOpen, setIsAiModalOpen] = useState(false)
  const [aiPrompt, setAiPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    meta: "",
    icon: "Brain",
    gradient: "from-indigo-600 via-blue-600 to-cyan-500",
    order: 0,
    isActive: true,
    features: [""],
    results: [""]
  })

  // --- Dynamic Handlers ---
  const handleArrayChange = (field: 'features' | 'results', index: number, value: string) => {
    const newArray = [...formData[field]]
    newArray[index] = value
    setFormData({ ...formData, [field]: newArray })
  }

  const addArrayItem = (field: 'features' | 'results') => setFormData({ ...formData, [field]: [...formData[field], ""] })
  const removeArrayItem = (field: 'features' | 'results', i: number) => setFormData({ ...formData, [field]: formData[field].filter((_, idx) => idx !== i) })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title) return toast.error("SERVICE_ID_MISSING: Title is required")
    
    setIsSubmitting(true)
    const toastId = toast.loading("SYNCHRONIZING_WITH_DISTRIBUTED_REGISTRY...")

    try {
      await addDoc(collection(db, "services"), {
        ...formData,
        slug: formData.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      toast.success("SERVICE_NODE_SYNCHRONIZED_SUCCESSFULLY", { id: toastId });
      router.push("/admin/services")
    } catch (error: any) {
      console.error("FIREBASE_SYNC_ERROR:", error);
      toast.error(`SYNCHRONIZATION_FAILURE: ${error.message}`, { id: toastId });
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAiGenerate = async () => {
    if (!aiPrompt) return
    setIsGenerating(true)
    
    try {
      const response = await fetch("/api/generate-project", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt, type: 'service' })
      })
      
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      
      setFormData({
        ...formData,
        ...data
      })
      
      toast.success("NEURAL_GENERATION_SUCCESSFUL")
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
    { id: 'profile', label: 'Service Profile', icon: Info },
    { id: 'specs', label: 'Functional Specs', icon: Cpu },
    { id: 'visual', label: 'Visual Interface', icon: Layers },
  ]

  const icons = [
    { name: "Brain", icon: Brain },
    { name: "Cloud", icon: Cloud },
    { name: "Shield", icon: Shield },
    { name: "Activity", icon: Activity },
    { name: "Cpu", icon: Cpu },
    { name: "Globe", icon: Globe }
  ]

  return (
    <div className="space-y-12 pb-24 selection:bg-indigo-500/30">
      {/* Header */}
      <div className="relative">
        <div className="absolute -left-10 top-0 w-1 h-20 bg-gradient-to-b from-indigo-500 to-transparent" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Link href="/admin/services" className="inline-flex items-center gap-2 text-[9px] font-mono text-indigo-500 uppercase tracking-[0.4em] mb-4 hover:opacity-70 transition-opacity">
                 <ArrowLeft className="w-4 h-4" /> Terminate Operation & Return
              </Link>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-2 underline decoration-indigo-500/20 underline-offset-[12px]">Initialize <span className="text-indigo-500">Service</span> Node</h1>
              <p className="text-slate-400 dark:text-white/20 font-mono text-[10px] uppercase tracking-[0.3em]">Configure All Parameters for Global Capabilities Inventory</p>
           </motion.div>
           
           <div className="flex gap-4">
              <Button onClick={() => setIsAiModalOpen(true)} type="button" variant="outline" className="h-16 px-8 border-indigo-500/30 text-indigo-500 hover:bg-indigo-500 hover:text-white rounded-2xl flex items-center gap-3 transition-all">
                 <Sparkles className="w-5 h-5" />
                 <span className="font-bold uppercase tracking-widest text-xs">Neural Generate</span>
              </Button>
              <Button disabled={isSubmitting} onClick={handleSubmit} className="h-16 px-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-xl shadow-indigo-600/20 flex items-center gap-3 border-0">
                 {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Database className="w-5 h-5" />}
                 <span className="font-black uppercase tracking-widest text-xs">{isSubmitting ? 'Syncing...' : 'Execute Deployment'}</span>
              </Button>
           </div>
        </div>
      </div>

      {/* Grid Tab Nav */}
      <div className="flex flex-wrap gap-4 p-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[2.5rem] shadow-sm max-w-max">
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
            {activeSegment === 'profile' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <InputGroup label="Service Title" icon={Layout} placeholder="e.g. AI & Machine Learning" value={formData.title} onChange={(v: string) => setFormData({...formData, title: v})} />
                    <InputGroup label="Strategic Subtitle" icon={Info} placeholder="e.g. Neural Infrastructure" value={formData.subtitle} onChange={(v: string) => setFormData({...formData, subtitle: v})} />
                    <InputGroup label="Node Classification" icon={Globe} placeholder="e.g. Intelligence Core" value={formData.meta} onChange={(v: string) => setFormData({...formData, meta: v})} />
                    <div className="space-y-3">
                      <label className="text-[9px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.3em] font-bold pl-2">Display Sequence</label>
                      <div className="relative group/input">
                          <ArrowUpDown className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 dark:text-white/10 group-focus-within/input:text-indigo-500 transition-colors" />
                          <input 
                            type="number" 
                            placeholder="0" 
                            value={formData.order} 
                            onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})} 
                            className="w-full h-14 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl pl-14 pr-8 text-sm focus:outline-none focus:border-indigo-500/30 transition-all" 
                          />
                      </div>
                    </div>
                 </div>
                 <TextAreaGroup label="Operational Description" value={formData.description} onChange={(v: string) => setFormData({...formData, description: v})} />
                 
                 <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[3rem] p-10">
                    <h3 className="text-[10px] font-mono text-indigo-500 uppercase tracking-[0.5em] mb-10">Iconography Selection</h3>
                    <div className="flex flex-wrap gap-4">
                       {icons.map((item) => (
                         <button
                           key={item.name}
                           type="button"
                           onClick={() => setFormData({...formData, icon: item.name})}
                           className={`w-20 h-20 rounded-2xl flex items-center justify-center border-2 transition-all ${formData.icon === item.name ? "border-indigo-500 bg-indigo-500/10 text-indigo-500 shadow-xl shadow-indigo-500/10" : "border-slate-100 dark:border-white/5 text-slate-400 dark:text-white/20 hover:border-indigo-500/30"}`}
                         >
                            <item.icon className="w-8 h-8" />
                         </button>
                       ))}
                    </div>
                 </div>
              </motion.div>
            )}

            {activeSegment === 'specs' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid md:grid-cols-2 gap-8">
                 <ArrayInputGroup label="Capability Protocol (Features)" items={formData.features} onAdd={() => addArrayItem('features')} onRemove={(i: number) => removeArrayItem('features', i)} onChange={(i: number, v: string) => handleArrayChange('features', i, v)} placeholder="e.g. Real-time NLP" />
                 <ArrayInputGroup label="Strategic Telemetry (Results)" items={formData.results} onAdd={() => addArrayItem('results')} onRemove={(i: number) => removeArrayItem('results', i)} onChange={(i: number, v: string) => handleArrayChange('results', i, v)} placeholder="e.g. -40% Ops Costs" />
              </motion.div>
            )}

            {activeSegment === 'visual' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[3rem] p-10">
                 <h3 className="text-[10px] font-mono text-indigo-500 uppercase tracking-[0.5em] mb-10">Kinetic Gradient Configuration</h3>
                 <InputGroup label="Tailwind Gradient String" icon={Layers} placeholder="from-indigo-600 via-blue-600 to-cyan-500..." value={formData.gradient} onChange={(v: string) => setFormData({...formData, gradient: v})} />
                 <div className={`mt-10 w-full h-24 rounded-2xl bg-gradient-to-r ${formData.gradient} flex items-center justify-center border border-white/10`}>
                    <span className="text-white text-[10px] font-black uppercase tracking-widest bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">Tactical Preview</span>
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
                     <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Neural Intelligence Hub</h3>
                     <span className="text-[7px] font-mono bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded-full border border-indigo-500/20 uppercase tracking-widest">v2.5_FLASH</span>
                  </div>
                  <button onClick={() => setIsAiModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"><X className="w-5 h-5" /></button>
               </div>
               <div className="space-y-6">
                  <p className="text-xs text-slate-400 dark:text-white/20 font-mono uppercase tracking-[0.2em] leading-relaxed">
                     Describe the service stack you wish to architect. The Neural Engine will autonomously configure all operational specs including features, results, and artistic gradients.
                  </p>
                  <textarea value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} placeholder="e.g. Build a High-Performance Distributed Systems service with focuses on edge computing and microservices..." className="w-full h-40 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl p-6 text-sm focus:outline-none focus:border-indigo-500/30 transition-all resize-none text-slate-900 dark:text-white" />
                  <Button onClick={handleAiGenerate} disabled={isGenerating || !aiPrompt} className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl flex items-center justify-center gap-4 transition-all disabled:opacity-50">
                     {isGenerating ? <><Loader2 className="w-5 h-5 animate-spin" /><span className="font-bold uppercase tracking-widest text-xs">Architecting Service Node...</span></> : <><Zap className="w-5 h-5 fill-white" /><span className="font-bold uppercase tracking-widest text-xs">Synchronize Neural Network</span></>}
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

function ArrayInputGroup({ label, items, onAdd, onRemove, onChange, placeholder }: any) {
  return (
    <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 flex flex-col">
       <div className="flex items-center justify-between mb-10">
          <h3 className="text-[10px] font-mono text-indigo-500 uppercase tracking-[0.5em]">{label}</h3>
          <Button onClick={onAdd} variant="ghost" className="text-indigo-500 uppercase font-bold text-[10px] tracking-widest hover:bg-indigo-500 hover:text-white group" type="button"><PlusCircle className="w-4 h-4 mr-2" /> Expand</Button>
       </div>
       <div className="space-y-4 flex-1">
          {items.map((item: string, i: number) => (
            <div key={i} className="flex gap-4">
               <input type="text" placeholder={placeholder} value={item} onChange={(e) => onChange(i, e.target.value)} className="flex-1 h-12 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl px-6 text-sm focus:outline-none focus:border-indigo-500/30 transition-all" />
               <Button onClick={() => onRemove(i)} variant="ghost" className="h-12 w-12 rounded-xl text-red-500 hover:bg-red-500 hover:text-white p-0" type="button"><Trash2 className="w-4 h-4" /></Button>
            </div>
          ))}
       </div>
    </div>
  )
}
