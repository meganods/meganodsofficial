"use client"

import { useState, useEffect, use } from "react"
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
  Image as ImageIcon, 
  User, 
  Calendar, 
  Clock, 
  Tag, 
  FileText, 
  BookOpen, 
  Type,
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
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [activeSegment, setActiveSegment] = useState<'meta' | 'editorial' | 'author'>('meta')
  const [isAiModalOpen, setIsAiModalOpen] = useState(false)
  const [aiPrompt, setAiPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "",
    date: "",
    readTime: "",
    imageUrl: "",
    content: "",
    tags: [""],
    author: {
       name: "",
       role: "",
       avatarUrl: ""
    }
  })

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, "blogs", resolvedParams.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            ...formData,
            ...data,
            author: data.author || { name: "", role: "", avatarUrl: "" },
            tags: data.tags || [""]
          });
        } else {
          toast.error("EDITORIAL_NODE_NOT_FOUND");
          router.push("/admin/blog");
        }
      } catch (error: any) {
        toast.error(`FETCH_FAILURE: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlog();
  }, [resolvedParams.id])

  // --- Dynamic Handlers ---
  const handleArrayChange = (index: number, value: string) => {
    const newTags = [...formData.tags]
    newTags[index] = value
    setFormData({ ...formData, tags: newTags })
  }

  const addTag = () => setFormData({ ...formData, tags: [...formData.tags, ""] })
  const removeTag = (i: number) => setFormData({ ...formData, tags: formData.tags.filter((_, idx) => idx !== i) })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title) return toast.error("EDITORIAL_ID_MISSING: Title is required")
    
    setIsSubmitting(true)
    const toastId = toast.loading("UPDATING_DISTRIBUTED_REGISTRY...")

    try {
      const docRef = doc(db, "blogs", resolvedParams.id);
      await updateDoc(docRef, {
        ...formData,
        slug: formData.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
        updatedAt: serverTimestamp(),
      });

      toast.success("EDITORIAL_NODE_UPDATED_SUCCESSFULLY", { id: toastId });
      router.push("/admin/blog")
    } catch (error: any) {
      console.error("FIREBASE_UPDATE_ERROR:", error);
      toast.error(`UPDATE_FAILURE: ${error.message}`, { id: toastId });
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
        body: JSON.stringify({ prompt: aiPrompt, type: 'blog' })
      })
      
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      
      setFormData({
        ...formData,
        ...data
      })
      
      toast.success("EDITORIAL_GENERATION_SUCCESSFUL")
      setIsAiModalOpen(false)
      setAiPrompt("")
    } catch (error: any) {
      console.error("AI_GEN_ERROR:", error)
      toast.error(`EDITORIAL_FAILURE: ${error.message}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const segments = [
    { id: 'meta', label: 'Article Metadata', icon: Info },
    { id: 'editorial', label: 'Editorial Content', icon: BookOpen },
    { id: 'author', label: 'Author Intel', icon: User },
  ]

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
         <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
         <p className="text-[10px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.4em]">Resolving Editorial Node...</p>
      </div>
    )
  }

  return (
    <div className="space-y-12 pb-24 selection:bg-indigo-500/30">
      {/* Header */}
      <div className="relative">
        <div className="absolute -left-10 top-0 w-1 h-20 bg-gradient-to-b from-indigo-500 to-transparent" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Link href="/admin/blog" className="inline-flex items-center gap-2 text-[9px] font-mono text-indigo-500 uppercase tracking-[0.4em] mb-4 hover:opacity-70 transition-opacity">
                 <ArrowLeft className="w-4 h-4" /> Terminate Operation & Return
              </Link>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-2 underline decoration-indigo-500/10 underline-offset-[12px]">Edit <span className="text-indigo-500">Editorial</span> Node</h1>
              <p className="text-slate-400 dark:text-white/20 font-mono text-[10px] uppercase tracking-[0.3em]">Update technical parameters for strategic intelligence publication</p>
           </motion.div>
           
           <div className="flex gap-4">
              <Button onClick={() => setIsAiModalOpen(true)} type="button" variant="outline" className="h-16 px-8 border-indigo-500/30 text-indigo-500 hover:bg-indigo-500 hover:text-white rounded-2xl flex items-center gap-3 transition-all font-bold uppercase tracking-widest text-xs">
                 <Sparkles className="w-5 h-5" />
                 Neural Patch
              </Button>
              <Button disabled={isSubmitting} onClick={handleSubmit} className="h-16 px-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-xl shadow-indigo-600/20 flex items-center gap-3 border-0 transition-transform active:scale-95">
                 {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                 <span className="font-black uppercase tracking-widest text-xs">{isSubmitting ? 'Updating...' : 'Commit Changes'}</span>
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
            {activeSegment === 'meta' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
                 
                 {/* PRIMARY VISUAL RECONFIGURATION (FEATURED IMAGE) */}
                 <div className="bg-white dark:bg-[#05050a]/60 border border-slate-200 dark:border-white/10 rounded-[3.5rem] p-10 lg:p-14 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                       <ImageIcon className="w-60 h-60 text-indigo-500" />
                    </div>
                    
                    <div className="flex flex-col lg:flex-row gap-14 relative z-10">
                       <div className="w-full lg:w-[450px] shrink-0">
                          <CldUploadWidget 
                            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                            onSuccess={(result: any) => {
                               setFormData({...formData, imageUrl: result.info.secure_url})
                               toast.success("FEATURED_ASSET_PATCHED")
                            }}
                          >
                            {({ open }) => (
                              <div 
                                onClick={() => open()} 
                                className="relative aspect-[16/10] rounded-[2.5rem] bg-slate-50 dark:bg-black border-2 border-dashed border-slate-200 dark:border-white/5 overflow-hidden group/upload cursor-pointer transition-all hover:border-indigo-500/50 hover:bg-slate-100 dark:hover:bg-indigo-500/5 shadow-inner"
                              >
                                 {formData.imageUrl ? (
                                    <img src={formData.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover/upload:scale-105" alt="Featured" />
                                 ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                                       <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                                          <UploadCloud className="w-8 h-8" />
                                       </div>
                                       <p className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-black text-center leading-relaxed">Update tactical identity</p>
                                    </div>
                                 )}
                                 <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/upload:opacity-100 transition-opacity flex items-center justify-center">
                                    <Camera className="w-10 h-10 text-white" />
                                 </div>
                              </div>
                            )}
                          </CldUploadWidget>
                       </div>

                       <div className="flex-1 space-y-8 w-full text-left">
                          <div className="space-y-4">
                             <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">Editorial Reconfiguration</h3>
                             <p className="text-[10px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.4em] font-bold">Synchronize global intelligence parameters</p>
                          </div>
                          
                          <div className="grid sm:grid-cols-2 gap-6 pt-4">
                             <InputGroup label="Article Title" icon={Type} placeholder="e.g. Future of AI..." value={formData.title} onChange={(v: string) => setFormData({...formData, title: v})} />
                             <InputGroup label="Node Sector" icon={Layout} placeholder="e.g. Artificial Intelligence" value={formData.category} onChange={(v: string) => setFormData({...formData, category: v})} />
                             <InputGroup label="Release Date" icon={Calendar} placeholder="e.g. March 15, 2024" value={formData.date} onChange={(v: string) => setFormData({...formData, date: v})} />
                             <InputGroup label="Intelligence Span" icon={Clock} placeholder="e.g. 8 min read" value={formData.readTime} onChange={(v: string) => setFormData({...formData, readTime: v})} />
                          </div>
                       </div>
                    </div>
                 </div>

                 <TextAreaGroup label="Strategic Excerpt" value={formData.excerpt} onChange={(v: string) => setFormData({...formData, excerpt: v})} />
                 
                 <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[3rem] p-10">
                    <div className="flex items-center justify-between mb-10">
                       <h3 className="text-[10px] font-mono text-indigo-500 uppercase tracking-[0.5em] font-black">Taxonomy Protocols (Tags)</h3>
                       <Button onClick={addTag} variant="ghost" className="h-10 px-6 rounded-xl border border-indigo-500/20 text-indigo-500 uppercase font-black text-[10px] tracking-widest hover:bg-indigo-500 hover:text-white transition-all group" type="button"><Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" /> Expand</Button>
                    </div>
                    <div className="grid md:grid-cols-4 gap-4">
                       {formData.tags.map((tag, i) => (
                         <div key={i} className="flex gap-2">
                            <input type="text" placeholder="e.g. AI" value={tag} onChange={(e) => handleArrayChange(i, e.target.value)} className="flex-1 h-12 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl px-4 text-[11px] focus:outline-none focus:border-indigo-500/30 transition-all font-mono" />
                            <Button onClick={() => removeTag(i)} variant="ghost" className="h-12 w-12 rounded-xl text-red-500 hover:bg-red-500 hover:text-white p-0" type="button"><Trash2 className="w-4 h-4" /></Button>
                         </div>
                       ))}
                    </div>
                 </div>
              </motion.div>
            )}

            {activeSegment === 'editorial' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                 <TextAreaGroup label="Full Editorial Content (HTML Supported)" value={formData.content} onChange={(v: string) => setFormData({...formData, content: v})} height="h-[600px]" />
              </motion.div>
            )}

            {activeSegment === 'author' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                 <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[3.5rem] p-10 lg:p-14 shadow-2xl overflow-hidden group">
                    <h3 className="text-[10px] font-mono text-indigo-500 uppercase tracking-[0.5em] mb-12 font-black">Subject Intelligence Author</h3>
                    
                    <div className="flex flex-col lg:flex-row gap-14 items-center">
                       <div className="w-32 h-32 shrink-0">
                          <CldUploadWidget 
                            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                            onSuccess={(result: any) => {
                               setFormData({...formData, author: {...formData.author, avatarUrl: result.info.secure_url}})
                               toast.success("AUTHOR_IDENTITY_PATCHED")
                            }}
                          >
                            {({ open }) => (
                              <div onClick={() => open()} className="relative w-full h-full rounded-[2rem] bg-slate-50 dark:bg-black border-2 border-dashed border-slate-200 dark:border-white/5 overflow-hidden group/author cursor-pointer hover:border-indigo-500/50 transition-all">
                                 {formData.author.avatarUrl ? (
                                    <img src={formData.author.avatarUrl} className="w-full h-full object-cover" alt="Author" />
                                 ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center">
                                       <User className="w-8 h-8 text-indigo-500 opacity-20" />
                                    </div>
                                 )}
                                 <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/author:opacity-100 transition-opacity flex items-center justify-center">
                                    <Camera className="w-6 h-6 text-white" />
                                 </div>
                              </div>
                            )}
                          </CldUploadWidget>
                       </div>

                       <div className="flex-1 grid md:grid-cols-2 gap-8 w-full text-left">
                          <InputGroup label="Author Name" icon={User} value={formData.author.name} onChange={(v: string) => setFormData({...formData, author: {...formData.author, name: v}})} />
                          <InputGroup label="Editorial Rank" icon={FileText} value={formData.author.role} onChange={(v: string) => setFormData({...formData, author: {...formData.author, role: v}})} />
                       </div>
                    </div>
                 </div>
              </motion.div>
            )}
         </AnimatePresence>

      </form>

      {/* AI Modal */}
      <AnimatePresence>
        {isAiModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#010103]/90 backdrop-blur-md z-[100]" onClick={() => !isGenerating && setIsAiModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white dark:bg-[#05050a] border border-slate-200 dark:border-white/10 rounded-[3.5rem] p-10 z-[110] shadow-[0_0_100px_rgba(99,102,241,0.1)]">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                     <Sparkles className="w-6 h-6 text-indigo-500" />
                     <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">Neural Hub</h3>
                  </div>
                  <button onClick={() => setIsAiModalOpen(false)} className="p-3 hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl transition-colors"><X className="w-5 h-5" /></button>
               </div>
               <div className="space-y-6">
                  <p className="text-[10px] text-slate-400 dark:text-white/20 font-mono uppercase tracking-[0.2em] leading-relaxed font-bold">
                     Describe editorial intent. engine will simulate technical whitepaper data.
                  </p>
                  <textarea value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} placeholder="Patch this whitepaper with data for a high-performance Kubernetes deployment strategy focusing on multi-cloud mesh networks..." className="w-full h-44 bg-slate-50 dark:bg-[#010103]/60 border border-slate-200 dark:border-white/5 rounded-2xl p-8 text-sm focus:outline-none focus:border-indigo-500/30 transition-all resize-none text-slate-900 dark:text-white shadow-inner" />
                  <Button onClick={handleAiGenerate} disabled={isGenerating || !aiPrompt} className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl flex items-center justify-center gap-4 transition-all disabled:opacity-30 border-0">
                     {isGenerating ? <><Loader2 className="w-4 h-4 animate-spin" /><span className="font-black uppercase tracking-widest text-[10px]">Sequencing Data...</span></> : <><Zap className="w-4 h-4 fill-white" /><span className="font-black uppercase tracking-widest text-[10px]">Sync Intelligence</span></>}
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
       <label className="text-[9px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.3em] font-black pl-2">{label}</label>
       <div className="relative group/input">
          {Icon && <Icon className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 dark:text-white/10 group-focus-within/input:text-indigo-500 transition-colors" />}
          <input type="text" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className={`w-full h-14 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl pr-8 text-sm focus:outline-none focus:border-indigo-500/30 transition-all ${Icon ? 'pl-14' : 'pl-6'} placeholder:opacity-50`} />
       </div>
    </div>
  )
}

function TextAreaGroup({ label, value, onChange, height = "h-40" }: any) {
  return (
    <div className="space-y-3">
       <label className="text-[9px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.3em] font-black pl-2">{label}</label>
       <textarea value={value} onChange={(e) => onChange(e.target.value)} className={`w-full ${height} bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 text-sm focus:outline-none focus:border-indigo-500/30 transition-all resize-none shadow-inner placeholder:opacity-50`} />
    </div>
  )
}
