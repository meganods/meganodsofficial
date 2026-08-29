"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  Clock,
  User,
  Tag,
  BookOpen,
  LayoutGrid,
  List as ListIcon,
  Filter,
  ArrowUpRight,
  Loader2,
  Database,
  Type
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { toast } from "sonner";

export default function AdminBlogPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState("")
  const [blogs, setBlogs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBlogs(docs);
    } catch (error: any) {
      console.error("FIREBASE_FETCH_ERROR:", error);
      toast.error(`EDITORIAL_ACCESS_DENIED: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to TERMINATE this editorial node?")) return;
    
    const toastId = toast.loading("TERMINATING_EDITORIAL_NODE...");
    try {
      await deleteDoc(doc(db, "blogs", id));
      setBlogs(blogs.filter(b => b.id !== id));
      toast.success("EDITORIAL_NODE_TERMINATED", { id: toastId });
    } catch (error: any) {
      toast.error(`TERMINATION_FAILURE: ${error.message}`, { id: toastId });
    }
  }

  const filteredBlogs = blogs.filter(b => 
    b.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.author?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-20 selection:bg-indigo-500/30">
      {/* Tactical Header */}
      <div className="relative">
        <div className="absolute -left-10 top-0 w-1 h-20 bg-gradient-to-b from-indigo-500 to-transparent" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                 <span className="text-[10px] font-mono text-indigo-500 uppercase tracking-[0.5em] font-black">Intelligence Feed</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-2 underline decoration-indigo-500/10 underline-offset-[12px]">Editorial <span className="text-indigo-500">Nodes</span></h1>
              <p className="text-slate-400 dark:text-white/20 font-mono text-[10px] uppercase tracking-[0.4em]">Manage Global Insights & Technical Whitepapers</p>
           </motion.div>
           
           <Link href="/admin/blog/new">
              <Button className="h-16 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-3xl shadow-xl shadow-indigo-600/20 flex items-center gap-3 group transition-transform active:scale-95 border-0">
                 <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                 <span className="font-bold uppercase tracking-widest text-xs">Initialize Article</span>
              </Button>
           </Link>
        </div>
      </div>

      {/* Control Strip */}
      <div className="flex flex-col lg:flex-row items-center gap-6">
         <div className="relative flex-1 group w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-white/20 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="Query editorial registry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-16 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2.5rem] pl-16 pr-8 text-sm focus:outline-none focus:border-indigo-500/30 transition-all shadow-sm dark:shadow-none"
            />
         </div>
         <div className="flex items-center gap-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-2 rounded-[2.5rem]">
            <button onClick={() => setViewMode('grid')} className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all ${viewMode === 'grid' ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "text-slate-400 dark:text-white/20 hover:bg-slate-50 dark:hover:bg-white/5"}`}><LayoutGrid className="w-5 h-5" /></button>
            <button onClick={() => setViewMode('list')} className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all ${viewMode === 'list' ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "text-slate-400 dark:text-white/20 hover:bg-slate-50 dark:hover:bg-white/5"}`}><ListIcon className="w-5 h-5" /></button>
         </div>
      </div>

      {/* Articles Grid/List */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
           <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
           <p className="text-[10px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.4em]">Resolving Editorial Mesh...</p>
        </div>
      ) : blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-40 gap-6 border border-dashed border-slate-200 dark:border-white/10 rounded-[3rem]">
           <Database className="w-12 h-12 text-slate-300 dark:text-white/10" />
           <div className="text-center">
              <h3 className="text-xl font-bold dark:text-white uppercase tracking-tight">Editorial Registry Idle</h3>
              <p className="text-[10px] text-slate-400 font-mono uppercase tracking-[0.3em] mt-2 font-bold leading-relaxed">No articles detected in current node hub.</p>
           </div>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? "grid md:grid-cols-2 xl:grid-cols-3 gap-8" : "space-y-4"}>
           {filteredBlogs.map((post, i) => (
             <motion.div
               key={post.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.05 }}
               className={`group relative bg-white dark:bg-[#05050a]/40 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[3.5rem] overflow-hidden hover:border-indigo-500/30 transition-all duration-500 shadow-xl dark:shadow-none ${viewMode === 'list' ? "flex items-center p-6" : ""}`}
             >
                {/* Media Hub */}
                <div className={`relative overflow-hidden ${viewMode === 'grid' ? "aspect-[16/10]" : "w-48 h-28 rounded-3xl"}`}>
                   {post.imageUrl ? (
                     <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                   ) : (
                     <div className="w-full h-full bg-slate-100 dark:bg-black/40 flex items-center justify-center">
                        <Type className="w-10 h-10 text-indigo-500/20" />
                     </div>
                   )}
                   <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-[8px] font-black text-white uppercase tracking-widest">{post.category}</span>
                   </div>
                </div>

                {/* Content Layer */}
                <div className={`p-10 ${viewMode === 'list' ? "flex-1 py-0 flex items-center justify-between" : ""}`}>
                   <div className="space-y-4">
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter line-clamp-2 leading-none uppercase">{post.title}</h3>
                      <div className="flex flex-wrap items-center gap-6 text-[9px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-widest font-bold">
                         <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {post.author?.name || 'Neural Node'}</span>
                         <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                      </div>
                   </div>

                   <div className={`flex items-center gap-4 ${viewMode === 'grid' ? "mt-12" : ""}`}>
                      <Link href={`/blog/${post.slug || post.id}`} target="_blank" className="flex-1">
                        <Button variant="ghost" className="w-full h-14 rounded-2xl border border-slate-100 dark:border-white/10 text-slate-400 dark:text-white/20 hover:text-indigo-500 dark:hover:text-white flex items-center gap-2 font-black text-[10px] uppercase tracking-widest transition-all">
                           <Eye className="w-4 h-4" /> Preview
                        </Button>
                      </Link>
                      <Link href={`/admin/blog/edit/${post.id}`}>
                        <Button variant="ghost" className="w-14 h-14 rounded-2xl border border-slate-100 dark:border-white/10 text-slate-400 dark:text-white/20 hover:text-emerald-500 dark:hover:text-white p-0">
                           <Edit2 className="w-5 h-5" />
                        </Button>
                      </Link>
                      <Button onClick={() => handleDelete(post.id)} variant="ghost" className="w-14 h-14 rounded-2xl border border-red-500/10 text-red-500/40 hover:text-red-500 p-0 transition-all hover:bg-red-500/5">
                         <Trash2 className="w-5 h-5" />
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
