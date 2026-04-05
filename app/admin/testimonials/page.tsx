"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Star, 
  MessageSquare, 
  User, 
  Hash, 
  MoreVertical,
  Loader2,
  Database,
  ArrowUpRight
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { toast } from "sonner";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTestimonials(docs);
    } catch (error: any) {
      console.error("FIREBASE_FETCH_ERROR:", error);
      toast.error(`TESTIMONIALS_ACCESS_DENIED: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTestimonials();
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Confirm complete de-manifestation of this testimonial node?")) return;
    try {
      await deleteDoc(doc(db, "testimonials", id));
      toast.success("TESTIMONIAL_TERMINATED");
      fetchTestimonials();
    } catch (error: any) {
      toast.error(`TERMINATION_FAILED: ${error.message}`);
    }
  }

  const filtered = testimonials.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-12 space-y-12">
      {/* Header HUD */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="text-indigo-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-4 font-black">Admin // Nexus</div>
          <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
            Testimonial <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-emerald-500 text-glow">Registry</span>.
          </h1>
        </div>
        <Link href="/admin/testimonials/new">
          <Button className="h-16 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-xl shadow-indigo-500/20 font-black text-[10px] uppercase tracking-widest gap-3">
             <Plus className="w-5 h-5" /> Establish Node
          </Button>
        </Link>
      </div>

      {/* Control Strip */}
      <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative flex-1 group w-full">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-white/20 group-focus-within:text-indigo-500 transition-colors" />
             <input
               type="text"
               placeholder="Query operational feedback..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full h-16 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2.5rem] pl-16 pr-8 text-sm focus:outline-none focus:border-indigo-500/30 transition-all shadow-sm dark:shadow-none"
             />
          </div>
      </div>

      {/* Registry Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
           <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
           <p className="text-[10px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.4em]">Resolving Feedback Mesh...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-40 gap-6 border border-dashed border-slate-200 dark:border-white/10 rounded-[3rem]">
           <Database className="w-12 h-12 text-slate-300 dark:text-white/10" />
           <div className="text-center">
              <h3 className="text-xl font-bold dark:text-white uppercase tracking-tight">Testimonial Matrix Empty</h3>
              <p className="text-[10px] text-slate-400 font-mono uppercase tracking-[0.3em] mt-2 font-bold leading-relaxed">No operational feedback nodes detected.</p>
           </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
           {filtered.map((node, i) => (
             <motion.div
               key={node.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.05 }}
               className="group relative bg-white dark:bg-[#05050a]/40 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[3.5rem] p-10 overflow-hidden hover:border-indigo-500/30 transition-all duration-500 shadow-xl dark:shadow-none"
             >
                <div className="flex justify-between items-start mb-8">
                   <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-[1.5rem] overflow-hidden border border-slate-100 dark:border-white/10">
                         {node.avatar ? (
                            <img src={node.avatar} className="w-full h-full object-cover" alt={node.name} />
                         ) : (
                            <div className="w-full h-full bg-slate-50 dark:bg-white/5 flex items-center justify-center">
                               <User className="w-6 h-6 text-indigo-500/20" />
                            </div>
                         )}
                      </div>
                      <div>
                         <h3 className="text-xl font-bold dark:text-white tracking-tight uppercase">{node.name}</h3>
                         <div className="text-indigo-400 font-mono text-[9px] uppercase tracking-widest font-black opacity-60 font-mono">{node.role}</div>
                      </div>
                   </div>
                   <div className="flex gap-1">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className={`w-3 h-3 ${j < (node.rating || 5) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 dark:text-white/5'}`} />
                      ))}
                   </div>
                </div>

                <div className="relative mb-10">
                   <MessageSquare className="absolute -top-4 -left-4 w-12 h-12 text-indigo-500/5 group-hover:text-indigo-500/10 transition-colors" />
                   <p className="text-sm text-slate-500 dark:text-white/40 leading-relaxed font-medium line-clamp-3 relative z-10">{node.content}</p>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-slate-50 dark:border-white/5">
                   <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
                      <Hash className="w-3 h-3 text-indigo-400" />
                      <span className="text-[8px] font-black uppercase text-slate-400 dark:text-white/20 tracking-widest font-mono">{node.tag || 'GLOBAL NODE'}</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <Link href={`/admin/testimonials/edit/${node.id}`}>
                        <Button variant="ghost" className="w-12 h-12 rounded-2xl border border-slate-50 dark:border-white/10 text-slate-400 dark:text-white/20 hover:text-emerald-500 dark:hover:text-white p-0">
                           <Edit2 className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button onClick={() => handleDelete(node.id)} variant="ghost" className="w-12 h-12 rounded-2xl border border-red-500/10 text-red-500/30 hover:text-red-500 p-0 transition-all hover:bg-red-500/5">
                         <Trash2 className="w-4 h-4" />
                      </Button>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      )}
    </div>
  )
}
