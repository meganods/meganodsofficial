"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  ArrowLeft, 
  Save, 
  Image as ImageIcon, 
  Star, 
  Hash, 
  User, 
  Briefcase, 
  FileText,
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";

export default function NewTestimonialPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    avatar: "",
    rating: 5,
    tag: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.content) {
      toast.error("IDENTIFICATION_FAILURE: Name and Content are mandatory nodes.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "testimonials"), {
        ...formData,
        createdAt: serverTimestamp()
      });
      toast.success("TESTIMONIAL_NODE_ESTABLISHED");
      router.push("/admin/testimonials");
    } catch (error: any) {
      toast.error(`ESTABLISHMENT_FAILED: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-6 lg:p-12 max-w-4xl mx-auto space-y-12">
      {/* HUD Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <Link href="/admin/testimonials">
            <Button variant="ghost" className="w-14 h-14 rounded-full border border-slate-200 dark:border-white/10 text-slate-400 dark:text-white/20 hover:text-indigo-500 hover:bg-indigo-500/5 transition-all p-0 shadow-lg dark:shadow-none">
               <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <div>
            <div className="text-indigo-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-4 font-black">Node // Deployment</div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
              New <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-emerald-500 text-glow">Establishment</span>.
            </h1>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Core Identity Profile */}
        <div className="bg-white dark:bg-[#05050a]/40 backdrop-blur-3xl border border-slate-100 dark:border-white/10 rounded-[3.5rem] p-10 lg:p-16 space-y-12 shadow-xl dark:shadow-none">
           <div className="grid md:grid-cols-2 gap-10">
             {/* Name Node */}
             <div className="space-y-4">
                <label className="flex items-center gap-3 text-indigo-400 font-mono text-[10px] uppercase tracking-[0.4em] font-black pb-2 border-b border-indigo-400/10">
                   <User className="w-3 h-3" /> Identity Header
                </label>
                <input
                  type="text"
                  required
                  placeholder="Subject Name..."
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full h-16 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl px-6 text-sm focus:outline-none focus:border-indigo-500/30 transition-all font-medium"
                />
             </div>

             {/* Role Node */}
             <div className="space-y-4">
                <label className="flex items-center gap-3 text-indigo-400 font-mono text-[10px] uppercase tracking-[0.4em] font-black pb-2 border-b border-indigo-400/10">
                   <Briefcase className="w-3 h-3" /> Tactical Role
                </label>
                <input
                  type="text"
                  placeholder="Title, Organization..."
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full h-16 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl px-6 text-sm focus:outline-none focus:border-indigo-500/30 transition-all font-medium"
                />
             </div>

             {/* Rating Node */}
             <div className="space-y-4">
                <label className="flex items-center gap-3 text-indigo-400 font-mono text-[10px] uppercase tracking-[0.4em] font-black pb-2 border-b border-indigo-400/10">
                   <Star className="w-3 h-3" /> Audit Score
                </label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})}
                  className="w-full h-16 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl px-6 text-sm focus:outline-none focus:border-indigo-500/30 transition-all font-medium appearance-none"
                >
                   {[5,4,3,2,1].map(r => (
                     <option key={r} value={r} className="bg-slate-900">{r} Node High-Fidelity</option>
                   ))}
                </select>
             </div>

             {/* Tag Node */}
             <div className="space-y-4">
                <label className="flex items-center gap-3 text-indigo-400 font-mono text-[10px] uppercase tracking-[0.4em] font-black pb-2 border-b border-indigo-400/10">
                   <Hash className="w-3 h-3" /> Sector Tag
                </label>
                <input
                  type="text"
                  placeholder="e.g., Enterprise Mobility"
                  value={formData.tag}
                  onChange={(e) => setFormData({...formData, tag: e.target.value})}
                  className="w-full h-16 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl px-6 text-sm focus:outline-none focus:border-indigo-500/30 transition-all font-medium"
                />
             </div>
           </div>

           {/* Content Node */}
           <div className="space-y-4">
              <label className="flex items-center gap-3 text-indigo-400 font-mono text-[10px] uppercase tracking-[0.4em] font-black pb-2 border-b border-indigo-400/10">
                 <FileText className="w-3 h-3" /> Feedback Protocol
              </label>
              <textarea
                required
                rows={6}
                placeholder="The technical audit feedback..."
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-3xl p-8 text-sm focus:outline-none focus:border-indigo-500/30 transition-all font-medium leading-relaxed resize-none"
              />
           </div>

           {/* Avatar Node */}
           <div className="space-y-4">
              <label className="flex items-center gap-3 text-indigo-400 font-mono text-[10px] uppercase tracking-[0.4em] font-black pb-2 border-b border-indigo-400/10">
                 <ImageIcon className="w-3 h-3" /> Visual Asset URL
              </label>
              <input
                type="text"
                placeholder="Avatar mesh URL..."
                value={formData.avatar}
                onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                className="w-full h-16 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl px-6 text-sm focus:outline-none focus:border-indigo-500/30 transition-all font-medium"
              />
           </div>
        </div>

        {/* Execution Hub */}
        <div className="flex justify-end gap-6 pb-20">
           <Link href="/admin/testimonials">
             <Button type="button" variant="ghost" className="h-20 px-12 border border-slate-200 dark:border-white/10 text-slate-400 dark:text-white/20 hover:text-white hover:bg-white/5 font-black uppercase text-[10px] tracking-widest rounded-[2rem] transition-all">
                Terminate Sync
             </Button>
           </Link>
           <Button 
             type="submit" 
             disabled={isSubmitting}
             className="h-20 px-16 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-[10px] tracking-[0.4em] rounded-[2rem] shadow-2xl shadow-indigo-600/30 transition-all disabled:opacity-50"
           >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Synchronizing...
                </>
              ) : (
                <>
                  <Save className="mr-3 h-5 w-5" />
                  Establish Deployment
                </>
              )}
           </Button>
        </div>
      </form>
    </div>
  )
}
