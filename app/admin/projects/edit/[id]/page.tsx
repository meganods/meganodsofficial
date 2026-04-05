"use client"

import { useState, useEffect, use } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Save, 
  Image as ImageIcon, 
  Layout, 
  Target, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  MessageSquare,
  X,
  PlusCircle,
  FileText,
  Info,
  Clock,
  Calendar,
  Users,
  Briefcase,
  Sparkles,
  Loader2,
  CloudUpload,
  Database,
  Star,
  ArrowUpDown
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { CldUploadWidget } from 'next-cloudinary';
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [activeSegment, setActiveSegment] = useState<'profile' | 'narrative' | 'telemetry' | 'protocol' | 'media'>('profile')
  const [isAiModalOpen, setIsAiModalOpen] = useState(false)
  const [aiPrompt, setAiPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    client: "",
    duration: "",
    team: "",
    year: "2024",
    heroImage: "",
    description: "",
    challenge: "",
    solution: "",
    order: 0,
    results: [{ metric: "", label: "" }],
    features: [""],
    technologies: [""],
    testimonial: {
       quote: "",
       author: "",
       role: "",
       avatar: ""
    },
    gallery: [] as string[]
  })

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const docRef = doc(db, "projects", resolvedParams.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            ...formData,
            ...data,
            results: data.results || [{ metric: "", label: "" }],
            features: data.features || [""],
            technologies: data.technologies || [""],
            testimonial: data.testimonial || { quote: "", author: "", role: "", avatar: "" },
            gallery: data.gallery || []
          });
        } else {
          toast.error("PROJECT_NODE_NOT_FOUND");
          router.push("/admin/projects");
        }
      } catch (error: any) {
        toast.error(`FETCH_FAILURE: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProject();
  }, [resolvedParams.id])

  // --- Dynamic Handlers ---
  const handleResultChange = (index: number, field: 'metric' | 'label', value: string) => {
    const newResults = [...formData.results] as any
    newResults[index][field] = value
    setFormData({ ...formData, results: newResults })
  }

  const addResult = () => setFormData({ ...formData, results: [...formData.results, { metric: "", label: "" }] })
  const removeResult = (i: number) => setFormData({ ...formData, results: formData.results.filter((_, idx) => idx !== i) })

  const handleArrayChange = (field: 'features' | 'technologies' | 'gallery', index: number, value: string) => {
    const newArray = [...formData[field]]
    newArray[index] = value
    setFormData({ ...formData, [field]: newArray })
  }

  const addArrayItem = (field: 'features' | 'technologies' | 'gallery') => setFormData({ ...formData, [field]: [...formData[field], ""] })
  const removeArrayItem = (field: 'features' | 'technologies' | 'gallery', i: number) => setFormData({ ...formData, [field]: formData[field].filter((_, idx) => idx !== i) })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title) return toast.error("PROJECT_ID_MISSING: Title is required")
    
    setIsSubmitting(true)
    const toastId = toast.loading("UPDATING_DISTRIBUTED_REGISTRY...")

    try {
      const docRef = doc(db, "projects", resolvedParams.id);
      await updateDoc(docRef, {
        ...formData,
        slug: formData.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
        updatedAt: serverTimestamp(),
      });

      toast.success("PROJECT_NODE_UPDATED_SUCCESSFULLY", { id: toastId });
      router.push("/admin/projects")
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
        body: JSON.stringify({ prompt: aiPrompt })
      })
      
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      
      setFormData({
        ...formData,
        ...data,
        year: data.year?.toString() || "2024"
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
    { id: 'profile', label: 'Identity', icon: Info },
    { id: 'narrative', label: 'Brief', icon: FileText },
    { id: 'telemetry', label: 'Results', icon: Target },
    { id: 'protocol', label: 'Stack', icon: Zap },
    { id: 'media', label: 'Visuals', icon: ImageIcon },
  ]

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
         <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
         <p className="text-[10px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.4em]">Resolving Node Data...</p>
      </div>
    )
  }

  return (
    <div className="space-y-10 pb-24 selection:bg-indigo-500/30">
      {/* Cinematic Header */}
      <div className="relative">
        <div className="absolute -left-10 top-0 w-1 h-20 bg-gradient-to-b from-indigo-500 to-transparent" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Link href="/admin/projects" className="inline-flex items-center gap-2 text-[9px] font-mono text-indigo-500 uppercase tracking-[0.4em] mb-4 hover:opacity-70 transition-opacity">
                 <ArrowLeft className="w-4 h-4" /> Cancel Reconfiguration
              </Link>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-2 underline decoration-indigo-500/10 underline-offset-[12px]">Edit <span className="text-indigo-500">Project</span> Node</h1>
              <p className="text-slate-400 dark:text-white/20 font-mono text-[10px] uppercase tracking-[0.3em]">Update operational parameters for global publication</p>
           </motion.div>
           
           <div className="flex gap-4">
              <Button 
                onClick={() => setIsAiModalOpen(true)}
                type="button" 
                variant="outline"
                className="h-16 px-8 border-indigo-500/20 text-indigo-500 hover:bg-indigo-500 hover:text-white rounded-[1.75rem] flex items-center gap-3 transition-all font-bold uppercase tracking-widest text-xs"
              >
                 <Sparkles className="w-4 h-4" />
                 Neural Patch
              </Button>
              <Button disabled={isSubmitting} onClick={handleSubmit} className="h-16 px-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[1.75rem] shadow-xl shadow-indigo-600/20 flex items-center gap-3 border-0 transition-transform active:scale-95">
                 {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                 <span className="font-black uppercase tracking-widest text-xs">{isSubmitting ? 'Updating...' : 'Commit Changes'}</span>
              </Button>
           </div>
        </div>
      </div>

      {/* Segment Terminal Navigation */}
      <div className="flex flex-wrap gap-3 p-1.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[2rem] shadow-sm max-w-max">
         {segments.map((s) => (
           <button
             key={s.id}
             onClick={() => setActiveSegment(s.id as any)}
             className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all font-mono text-[9px] uppercase tracking-widest ${activeSegment === s.id ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "text-slate-400 dark:text-white/20 hover:bg-slate-50 dark:hover:bg-white/5"}`}
           >
              <s.icon className="w-4 h-4" />
              {s.label}
           </button>
         ))}
      </div>

      {/* Deployment Form */}
      <form onSubmit={handleSubmit} className="space-y-12">
         
         <AnimatePresence mode="wait">
            {activeSegment === 'profile' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                 <InputGroup label="Project Name" icon={Info} placeholder="AI-Powered Analytics" value={formData.title} onChange={(v: string) => setFormData({...formData, title: v})} />
                 <InputGroup label="Sector" icon={Layout} placeholder="Artificial Intelligence" value={formData.category} onChange={(v: string) => setFormData({...formData, category: v})} />
                 <InputGroup label="Client" icon={Briefcase} placeholder="TechCorp Industries" value={formData.client} onChange={(v: string) => setFormData({...formData, client: v})} />
                 <InputGroup label="Duration" icon={Clock} placeholder="8 months" value={formData.duration} onChange={(v: string) => setFormData({...formData, duration: v})} />
                 <InputGroup label="Strength" icon={Users} placeholder="12 specialists" value={formData.team} onChange={(v: string) => setFormData({...formData, team: v})} />
                 <InputGroup label="Year" icon={Calendar} placeholder="2024" value={formData.year} onChange={(v: string) => setFormData({...formData, year: v})} />
                 <div className="space-y-3">
                   <label className="text-[9px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.3em] font-black pl-2">Display Order</label>
                   <div className="relative group/input">
                      <ArrowUpDown className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 dark:text-white/10 group-focus-within/input:text-indigo-500 transition-colors" />
                      <input
                        type="number"
                        placeholder="0"
                        value={formData.order}
                        onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                        className="w-full h-14 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl pl-14 pr-8 text-sm focus:outline-none focus:border-indigo-500/30 transition-all placeholder:opacity-50"
                      />
                   </div>
                 </div>
              </motion.div>
            )}

            {activeSegment === 'narrative' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                 <TextAreaGroup label="Intelligence Brief" value={formData.description} onChange={(v: string) => setFormData({...formData, description: v})} />
                 <div className="grid md:grid-cols-2 gap-8">
                    <TextAreaGroup label="Operational Challenge" value={formData.challenge} onChange={(v: string) => setFormData({...formData, challenge: v})} />
                    <TextAreaGroup label="Strategic Solution" value={formData.solution} onChange={(v: string) => setFormData({...formData, solution: v})} />
                 </div>
                 <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-10 space-y-8">
                    <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.5em]">Subject Witness</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                       <InputGroup label="Witness Name" icon={Users} placeholder="Michael Roberts" value={formData.testimonial.author} onChange={(v: string) => setFormData({...formData, testimonial: {...formData.testimonial, author: v}})} />
                       <InputGroup label="Witness Rank" icon={ShieldCheck} placeholder="CTO, TechCorp" value={formData.testimonial.role} onChange={(v: string) => setFormData({...formData, testimonial: {...formData.testimonial, role: v}})} />
                    </div>
                    <TextAreaGroup label="Statement Quote" value={formData.testimonial.quote} onChange={(v: string) => setFormData({...formData, testimonial: {...formData.testimonial, quote: v}})} />
                    <div className="space-y-3">
                       <label className="text-[9px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.3em] font-bold pl-2">Witness Identity Asset</label>
                       <CldUploadWidget 
                         uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                         onSuccess={(result: any) => {
                           setFormData({...formData, testimonial: {...formData.testimonial, avatar: result.info.secure_url}})
                           toast.success("WITNESS_AVATAR_UPLINKED")
                         }}
                       >
                         {({ open }) => (
                           <div onClick={() => open()} className="w-full h-16 bg-white dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10 rounded-2xl flex items-center px-6 gap-4 cursor-pointer hover:bg-indigo-500/5 transition-all group">
                              {formData.testimonial.avatar ? <img src={formData.testimonial.avatar} className="w-10 h-10 rounded-full object-cover border border-indigo-500/20" /> : <CloudUpload className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />}
                              <span className="text-xs text-slate-400 font-mono uppercase tracking-widest">{formData.testimonial.avatar ? 'Identity Verified' : 'Uplink witness Avatar'}</span>
                           </div>
                         )}
                       </CldUploadWidget>
                    </div>
                 </div>
              </motion.div>
            )}

            {activeSegment === 'telemetry' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-10 shadow-sm">
                 <div className="flex items-center justify-between mb-10">
                    <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.5em]">Success telemetry</h3>
                    <Button onClick={addResult} variant="ghost" className="text-indigo-500 uppercase font-black text-[10px] tracking-widest hover:bg-indigo-500 hover:text-white rounded-xl" type="button">
                       <PlusCircle className="w-4 h-4 mr-2" /> Add Metric
                    </Button>
                 </div>
                 <div className="space-y-4">
                    {formData.results.map((res, i) => (
                      <div key={i} className="flex gap-4 items-end">
                         <div className="flex-1 grid md:grid-cols-2 gap-4">
                            <InputGroup label={`Metric ${i+1}`} placeholder="40%" value={res.metric} onChange={(v: string) => handleResultChange(i, 'metric', v)} />
                            <InputGroup label={`Label ${i+1}`} placeholder="Efficiency Increase" value={res.label} onChange={(v: string) => handleResultChange(i, 'label', v)} />
                         </div>
                         <Button onClick={() => removeResult(i)} variant="ghost" className="h-14 w-14 rounded-2xl text-red-500/40 hover:text-red-500 hover:bg-red-500/5 p-0" type="button">
                            <Trash2 className="w-5 h-5" />
                         </Button>
                      </div>
                    ))}
                 </div>
              </motion.div>
            )}

            {activeSegment === 'protocol' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid md:grid-cols-2 gap-10">
                 <ArrayInputGroup label="Key Features" items={formData.features} onAdd={() => addArrayItem('features')} onRemove={(i: number) => removeArrayItem('features', i)} onChange={(i: number, v: string) => handleArrayChange('features', i, v)} placeholder="Dynamic encryption" />
                 <ArrayInputGroup label="Tech Stack" items={formData.technologies} onAdd={() => addArrayItem('technologies')} onRemove={(i: number) => removeArrayItem('technologies', i)} onChange={(i: number, v: string) => handleArrayChange('technologies', i, v)} placeholder="Next.js / Firebase" />
              </motion.div>
            )}

            {activeSegment === 'media' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">
                 {/* Main Identity Uplink - Big One */}
                 <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6">
                       <Star className={`w-5 h-5 ${formData.heroImage ? 'text-amber-500 fill-amber-500' : 'text-slate-200 dark:text-white/5'}`} />
                    </div>
                    <div className="mb-8">
                       <h3 className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.5em] mb-2">Main Project Identity</h3>
                       <p className="text-[9px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-widest">This asset will represent the node in global galleries</p>
                    </div>
                    
                    <CldUploadWidget 
                       uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                       onSuccess={(result: any) => {
                         setFormData({...formData, heroImage: result.info.secure_url})
                         toast.success("MAIN_IDENTITY_UPLINKED")
                       }}
                     >
                       {({ open }) => (
                         <div onClick={() => open()} className="w-full aspect-[21/9] bg-slate-50 dark:bg-white/5 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[2rem] flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-all overflow-hidden group border-spacing-4">
                            {formData.heroImage ? (
                              <div className="relative w-full h-full">
                                 <img src={formData.heroImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                 <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="px-6 py-3 bg-white text-black rounded-xl font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                                       <CloudUpload className="w-4 h-4" /> Change Main Identity
                                    </div>
                                 </div>
                              </div>
                            ) : (
                              <>
                                 <div className="p-6 rounded-full bg-indigo-500/10 text-indigo-500 group-hover:scale-110 transition-transform duration-500">
                                    <ImageIcon className="w-10 h-10" />
                                 </div>
                                 <div className="text-center">
                                    <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Uplink Primary Asset</p>
                                    <p className="text-[10px] text-slate-400 font-mono mt-1 opacity-60">High-Resolution Preferred (21:9)</p>
                                 </div>
                              </>
                            )}
                         </div>
                       )}
                     </CldUploadWidget>
                 </div>
                 
                 {/* Secondary Mosaic - Gallery */}
                 <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-10">
                    <div className="flex items-center justify-between mb-10">
                       <div className="space-y-1">
                          <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.5em]">Supporting Mosaic</h3>
                          <p className="text-[9px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-widest">Additional witness captures & UI nodes</p>
                       </div>
                       <CldUploadWidget 
                         uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                         onSuccess={(result: any) => {
                           setFormData({...formData, gallery: [...formData.gallery, result.info.secure_url]})
                           toast.success("MOSAIC_NODE_BUFFERED")
                         }}
                       >
                         {({ open }) => (
                           <Button onClick={() => open()} variant="ghost" className="text-indigo-500 font-black uppercase text-[10px] tracking-widest hover:bg-indigo-500 hover:text-white rounded-xl h-12" type="button">
                             <PlusCircle className="w-4 h-4 mr-2" /> Add Node
                           </Button>
                         )}
                       </CldUploadWidget>
                    </div>
                    
                    {formData.gallery.length === 0 ? (
                       <div className="py-20 text-center border-2 border-dashed border-slate-100 dark:border-white/5 rounded-[2rem]">
                          <Database className="w-12 h-12 text-slate-200 dark:text-white/10 mx-auto mb-4" />
                          <p className="text-[10px] font-mono text-slate-300 dark:text-white/10 uppercase tracking-widest leading-loose">Mosaic Registry Empty<br/>Add witness captures to buffer</p>
                       </div>
                    ) : (
                       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                          {formData.gallery.map((img, i) => (
                            <motion.div 
                              key={i} 
                              initial={{ opacity: 0, scale: 0.9 }} 
                              animate={{ opacity: 1, scale: 1 }} 
                              className="relative aspect-square rounded-2xl overflow-hidden group bg-slate-50 dark:bg-white/5 border border-white/5"
                            >
                               <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                               <div className="absolute inset-0 bg-red-500/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer gap-2" onClick={() => removeArrayItem('gallery', i)}>
                                  <Trash2 className="w-5 h-5 text-white" />
                                  <span className="text-[8px] font-black text-white uppercase tracking-widest">Terminate</span>
                               </div>
                               <div className="absolute top-2 left-2 flex gap-1">
                                  <button 
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const oldHero = formData.heroImage;
                                      const newGallery = [...formData.gallery];
                                      newGallery[i] = oldHero;
                                      setFormData({...formData, heroImage: img, gallery: newGallery.filter(Boolean)});
                                      toast.success("IDENTITY_SWAP_COMPLETE");
                                    }}
                                    className="p-2 bg-indigo-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-indigo-700"
                                    title="Promote to Main Identity"
                                  >
                                    <Star className="w-3 h-3 fill-white" />
                                  </button>
                               </div>
                            </motion.div>
                          ))}
                       </div>
                    )}
                 </div>
              </motion.div>
            )}
         </AnimatePresence>

      </form>

      {/* AI Generating Modal - Minimalist HUD */}
      <AnimatePresence>
        {isAiModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#010103]/90 backdrop-blur-md z-[100]"
              onClick={() => !isGenerating && setIsAiModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white dark:bg-[#05050a] border border-slate-200 dark:border-white/10 rounded-[3rem] p-10 z-[110] shadow-[0_0_100px_rgba(99,102,241,0.1)]"
            >
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-2xl">
                        <Sparkles className="w-6 h-6 animate-pulse" />
                     </div>
                     <div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">Neural Hub</h3>
                        <span className="text-[7px] font-mono text-indigo-500 uppercase tracking-[0.4em] font-bold mt-2 inline-block">Flash Engine v2.5</span>
                     </div>
                  </div>
                  <button onClick={() => setIsAiModalOpen(false)} className="p-3 hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl transition-colors">
                     <X className="w-5 h-5" />
                  </button>
               </div>

               <div className="space-y-6">
                  <p className="text-[10px] text-slate-400 dark:text-white/20 font-mono uppercase tracking-[0.2em] leading-relaxed">
                     Describe project intent. engine will simulate technical parameters.
                  </p>
                  
                  <textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="Build a decentralized finance bridge for cross-chain liquidity..."
                    className="w-full h-44 bg-slate-50 dark:bg-[#010103]/60 border border-slate-200 dark:border-white/5 rounded-2xl p-8 text-sm focus:outline-none focus:border-indigo-500/30 transition-all resize-none shadow-inner"
                  />

                  <Button 
                    onClick={handleAiGenerate}
                    disabled={isGenerating || !aiPrompt}
                    className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl flex items-center justify-center gap-4 transition-all disabled:opacity-30 border-0"
                  >
                     {isGenerating ? (
                       <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="font-black uppercase tracking-widest text-[10px]">Processing Neural Stream...</span>
                       </>
                     ) : (
                       <>
                          <Zap className="w-4 h-4 fill-white" />
                          <span className="font-black uppercase tracking-widest text-[10px]">Synchronize Intelligence</span>
                       </>
                     )}
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
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full h-14 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl pr-8 text-sm focus:outline-none focus:border-indigo-500/30 transition-all ${Icon ? 'pl-14' : 'pl-6'} placeholder:opacity-50`}
          />
       </div>
    </div>
  )
}

function TextAreaGroup({ label, placeholder, value, onChange }: any) {
  return (
    <div className="space-y-3">
       <label className="text-[9px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.3em] font-black pl-2">{label}</label>
       <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-44 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 text-sm focus:outline-none focus:border-indigo-500/30 transition-all resize-none placeholder:opacity-50"
       />
    </div>
  )
}

function ArrayInputGroup({ label, items, onAdd, onRemove, onChange, placeholder }: any) {
  return (
    <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-10 flex flex-col shadow-sm">
       <div className="flex items-center justify-between mb-10">
          <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.5em]">{label}</h3>
          <Button onClick={onAdd} variant="ghost" className="text-indigo-500 font-black text-[10px] tracking-widest hover:bg-indigo-500 hover:text-white rounded-xl h-10 px-4" type="button">
             <PlusCircle className="w-4 h-4 mr-2" /> Add
          </Button>
       </div>
       <div className="space-y-4 flex-1">
          {items.map((item: string, i: number) => (
            <div key={i} className="flex gap-3">
               <input
                 type="text"
                 placeholder={placeholder}
                 value={item}
                 onChange={(e) => onChange(i, e.target.value)}
                 className="flex-1 h-12 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl px-6 text-sm focus:outline-none focus:border-indigo-500/30 transition-all placeholder:opacity-50"
               />
               <Button onClick={() => onRemove(i)} variant="ghost" className="h-12 w-12 rounded-xl text-red-500/30 hover:text-red-500 hover:bg-red-500/5 p-0" type="button">
                  <Trash2 className="w-4 h-4" />
               </Button>
            </div>
          ))}
       </div>
    </div>
  )
}
