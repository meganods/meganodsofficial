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
  User,
  ShieldCheck,
  Cpu,
  Layout,
  Info,
  Linkedin,
  Twitter,
  Github,
  Mail,
  Layers,
  Award,
  Globe,
  Database,
  Camera,
  ArrowUpDown,
  UploadCloud
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { CldUploadWidget } from 'next-cloudinary';
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function NewTeamMemberPage() {
  const router = useRouter()
  const [activeSegment, setActiveSegment] = useState<'profile' | 'social' | 'styling'>('profile')
  const [isAiModalOpen, setIsAiModalOpen] = useState(false)
  const [aiPrompt, setAiPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    avatarUrl: "",
    initials: "",
    meta: "Strategic Node 01",
    gradient: "from-indigo-600 via-blue-600 to-cyan-500",
    order: 0,
    social: {
      linkedin: "",
      twitter: "",
      github: "",
      email: ""
    },
    isLeader: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name) return toast.error("PERSONNEL_ID_MISSING: Name is required")
    
    setIsSubmitting(true)
    const toastId = toast.loading("SYNCHRONIZING_PERSONNEL_NODE...")

    try {
      await addDoc(collection(db, "team"), {
        ...formData,
        slug: formData.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      toast.success("PERSONNEL_NODE_SYNCHRONIZED_SUCCESSFULLY", { id: toastId });
      router.push("/admin/team")
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
        body: JSON.stringify({ prompt: aiPrompt, type: 'team' })
      })

      const data = await response.json()
      if (data.error) throw new Error(data.error)

      setFormData({
        ...formData,
        ...data
      })

      toast.success("PERSONNEL_GENERATION_SUCCESSFUL")
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
    { id: 'profile', label: 'Node Identity', icon: User },
    { id: 'social', label: 'Uplink Protocols', icon: Globe },
    { id: 'styling', label: 'Visual Interface', icon: Layers },
  ]

  return (
    <div className="space-y-12 pb-24 selection:bg-indigo-500/30">
      {/* Header */}
      <div className="relative">
        <div className="absolute -left-10 top-0 w-1 h-20 bg-gradient-to-b from-indigo-500 to-transparent" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link href="/admin/team" className="inline-flex items-center gap-2 text-[9px] font-mono text-indigo-500 uppercase tracking-[0.4em] mb-4 hover:opacity-70 transition-opacity">
              <ArrowLeft className="w-4 h-4" /> Terminate Operation & Return
            </Link>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-2 underline decoration-indigo-500/20 underline-offset-[12px]">Initialize <span className="text-indigo-500">Personnel</span> Node</h1>
            <p className="text-slate-400 dark:text-white/20 font-mono text-[10px] uppercase tracking-[0.3em]">Configure All Parameters for Strategic Unit Deployment</p>
          </motion.div>

          <div className="flex gap-4">
            <Button onClick={() => setIsAiModalOpen(true)} type="button" variant="outline" className="h-16 px-8 border-indigo-500/30 text-indigo-500 hover:bg-indigo-500 hover:text-white rounded-2xl flex items-center gap-3 transition-all font-bold uppercase tracking-widest text-xs">
              <Sparkles className="w-5 h-5" />
              Neural Generate
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
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
               
               {/* IDENTITY ASSET UPLINK (PRIMARY) */}
               <div className="bg-white dark:bg-[#05050a]/60 border border-slate-200 dark:border-white/10 rounded-[3.5rem] p-10 lg:p-14 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                     <Camera className="w-40 h-40 text-indigo-500" />
                  </div>
                  
                  <div className="flex flex-col lg:flex-row items-center gap-14 relative z-10">
                     <div className="w-full lg:w-[300px] shrink-0">
                        <CldUploadWidget 
                          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                          onSuccess={(result: any) => {
                             setFormData({...formData, avatarUrl: result.info.secure_url})
                             toast.success("IDENTITY_ASSET_UPLINKED")
                          }}
                        >
                          {({ open }) => (
                            <div 
                              onClick={() => open()} 
                              className="relative aspect-square rounded-[3rem] bg-slate-50 dark:bg-black border-2 border-dashed border-slate-200 dark:border-white/5 overflow-hidden group/upload cursor-pointer transition-all hover:border-indigo-500/50 hover:bg-slate-100 dark:hover:bg-indigo-500/5"
                            >
                               {formData.avatarUrl ? (
                                  <img src={formData.avatarUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover/upload:scale-105" alt="Avatar" />
                               ) : (
                                  <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                                     <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover/upload:scale-110 transition-transform">
                                        <UploadCloud className="w-8 h-8" />
                                     </div>
                                     <div className="text-center">
                                        <p className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-black leading-relaxed">Uplink tactical<br/>visual identity</p>
                                     </div>
                                  </div>
                               )}
                               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/upload:opacity-100 transition-opacity flex items-center justify-center">
                                  <Camera className="w-10 h-10 text-white" />
                               </div>
                            </div>
                          )}
                        </CldUploadWidget>
                     </div>

                     <div className="flex-1 space-y-8 w-full">
                        <div className="space-y-4">
                           <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Personnel Asset</h3>
                           <p className="text-[10px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.4em] font-bold">Synchronize a tactical photo for the global node terminal</p>
                        </div>
                        
                        <div className="grid sm:grid-cols-2 gap-6 pt-4">
                           <InputGroup label="Unit Name" icon={User} placeholder="e.g. John Mitchell" value={formData.name} onChange={(v: string) => setFormData({ ...formData, name: v })} />
                           <InputGroup label="Node Rank/Role" icon={ShieldCheck} placeholder="e.g. CEO & Founder" value={formData.role} onChange={(v: string) => setFormData({ ...formData, role: v })} />
                        </div>
                     </div>
                  </div>
               </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <InputGroup label="Nodal Identifier" icon={Cpu} placeholder="e.g. Strategic Node 01" value={formData.meta} onChange={(v: string) => setFormData({ ...formData, meta: v })} />
                <InputGroup label="Visual Initials" icon={Award} placeholder="e.g. JM" value={formData.initials} onChange={(v: string) => setFormData({ ...formData, initials: v })} />
                <div className="space-y-3">
                    <label className="text-[9px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.3em] font-bold pl-2">Display Sequence</label>
                    <div className="relative group/input">
                        <ArrowUpDown className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 dark:text-white/10 group-focus-within/input:text-indigo-500 transition-colors" />
                        <input 
                          type="number" 
                          placeholder="0" 
                          value={formData.order} 
                          onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})} 
                          className="w-full h-14 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl pl-14 pr-8 text-sm focus:outline-none focus:border-indigo-500/30 transition-all font-mono" 
                        />
                    </div>
                </div>
              </div>

              <TextAreaGroup label="Operational Objective (Bio)" value={formData.bio} onChange={(v: string) => setFormData({ ...formData, bio: v })} />

              <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-10 flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold dark:text-white leading-none tracking-tight uppercase">Executive Command</h3>
                  <p className="text-[9px] text-slate-400 dark:text-white/20 font-mono uppercase tracking-widest font-bold">Protocol authorization for this nodal unit</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isLeader: !formData.isLeader })}
                  className={`w-20 h-10 rounded-full transition-all relative ${formData.isLeader ? "bg-indigo-500 shadow-xl shadow-indigo-500/20" : "bg-slate-200 dark:bg-white/10"}`}
                >
                  <div className={`absolute top-1 w-8 h-8 rounded-full bg-white transition-all shadow-md ${formData.isLeader ? "left-11" : "left-1"}`} />
                </button>
              </div>
            </motion.div>
          )}

          {activeSegment === 'social' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid md:grid-cols-2 gap-8">
              <InputGroup label="LinkedIn Protocol" icon={Linkedin} value={formData.social.linkedin} onChange={(v: string) => setFormData({ ...formData, social: { ...formData.social, linkedin: v } })} />
              <InputGroup label="Twitter/X Protocol" icon={Twitter} value={formData.social.twitter} onChange={(v: string) => setFormData({ ...formData, social: { ...formData.social, twitter: v } })} />
              <InputGroup label="GitHub Network" icon={Github} value={formData.social.github} onChange={(v: string) => setFormData({ ...formData, social: { ...formData.social, github: v } })} />
              <InputGroup label="Email Uplink" icon={Mail} value={formData.social.email} onChange={(v: string) => setFormData({ ...formData, social: { ...formData.social, email: v } })} />
            </motion.div>
          )}

          {activeSegment === 'styling' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[3rem] p-10">
              <h3 className="text-[10px] font-mono text-indigo-500 uppercase tracking-[0.5em] mb-10 font-bold">Kinetic Gradient Configuration</h3>
              <InputGroup label="Tailwind Gradient String" icon={Layers} placeholder="from-rose-600 via-pink-600 to-orange-500..." value={formData.gradient} onChange={(v: string) => setFormData({ ...formData, gradient: v })} />
              <div className={`mt-10 w-full h-32 rounded-3xl bg-gradient-to-r ${formData.gradient} flex items-center justify-center border border-white/10 shadow-2xl overflow-hidden`}>
                 <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white font-black text-xl tracking-widest">{formData.initials || '??'}</div>
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
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white dark:bg-[#05050a] border border-slate-200 dark:border-white/10 rounded-[3.5rem] p-10 z-[110] shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-indigo-500" />
                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">Neural Hub</h3>
                </div>
                <button onClick={() => setIsAiModalOpen(false)} className="p-3 hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-6">
                <p className="text-[10px] text-slate-400 dark:text-white/20 font-mono uppercase tracking-[0.2em] leading-relaxed font-bold">
                  Describe personnel intent. The Neural Engine will autonomously craft a professional biography, assign identifiers, and configure visual signatures.
                </p>
                <textarea value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} placeholder="e.g. Synthesize a Node Lead for our Quantum Intelligence division with focuses on distributed neural networks..." className="w-full h-40 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl p-8 text-sm focus:outline-none focus:border-indigo-500/30 transition-all resize-none text-slate-900 dark:text-white shadow-inner" />
                <Button onClick={handleAiGenerate} disabled={isGenerating || !aiPrompt} className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl flex items-center justify-center gap-4 transition-all disabled:opacity-50 border-0">
                  {isGenerating ? <><Loader2 className="w-5 h-5 animate-spin" /><span className="font-black uppercase tracking-widest text-[10px]">Sequencing Data...</span></> : <><Zap className="w-5 h-5 fill-white" /><span className="font-black uppercase tracking-widest text-[10px]">Sync Intelligence</span></>}
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
        <input type="text" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className={`w-full h-14 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl pr-8 text-sm focus:outline-none focus:border-indigo-500/30 transition-all ${Icon ? 'pl-14' : 'pl-6'} placeholder:opacity-50`} />
      </div>
    </div>
  )
}

function TextAreaGroup({ label, value, onChange }: any) {
  return (
    <div className="space-y-3">
      <label className="text-[9px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.3em] font-bold pl-2">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} className="w-full h-44 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 text-sm focus:outline-none focus:border-indigo-500/30 transition-all resize-none shadow-inner" />
    </div>
  )
}
