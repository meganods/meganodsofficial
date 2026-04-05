"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  ExternalLink,
  ChevronRight,
  Archive,
  CheckCircle2,
  Clock,
  Layers,
  LayoutGrid,
  List as ListIcon,
  Loader2,
  Database,
  Cloud,
  Briefcase,
  ArrowUpDown,
  Save
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc, query, orderBy, updateDoc } from "firebase/firestore";
import { toast } from "sonner";

export default function AdminProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState("")
  const [projects, setProjects] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, "projects"), orderBy("order", "asc"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(docs);
    } catch (error: any) {
      console.error("FIREBASE_FETCH_ERROR:", error);
      toast.error(`REGISTRY_ACCESS_DENIED: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to TERMINATE this project node?")) return;
    
    const toastId = toast.loading("TERMINATING_PROJECT_NODE...");
    try {
      await deleteDoc(doc(db, "projects", id));
      setProjects(projects.filter(p => p.id !== id));
      toast.success("PROJECT_NODE_TERMINATED", { id: toastId });
    } catch (error: any) {
      toast.error(`TERMINATION_FAILURE: ${error.message}`, { id: toastId });
    }
  }

  const handleUpdateOrder = async (id: string, newOrder: number) => {
    setUpdatingId(id);
    try {
      await updateDoc(doc(db, "projects", id), {
        order: newOrder,
        updatedAt: new Date()
      });
      setProjects(projects.map(p => p.id === id ? { ...p, order: newOrder } : p));
      toast.success("SEQUENCE_UPDATED");
    } catch (error: any) {
      toast.error(`SEQUENCE_FAILURE: ${error.message}`);
    } finally {
      setUpdatingId(null);
    }
  }

  const filteredProjects = projects.filter(p => 
    p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.client?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-20">
      {/* Tactical Header */}
      <div className="relative">
        <div className="absolute -left-10 top-0 w-1 h-20 bg-gradient-to-b from-indigo-500 to-transparent" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                 <span className="text-[10px] font-mono text-indigo-500 uppercase tracking-[0.5em] font-bold">Catalog Management</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-2 underline decoration-indigo-500/10 underline-offset-[12px]">Project <span className="text-indigo-500">Nodes</span></h1>
              <p className="text-slate-400 dark:text-white/20 font-mono text-[10px] uppercase tracking-[0.4em]">Manage Global Portfolio & Sequence Mapping</p>
           </motion.div>
           
           <Link href="/admin/projects/new">
              <Button className="h-16 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-3xl shadow-xl shadow-indigo-600/20 flex items-center gap-3 group border border-white/10">
                 <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                 <span className="font-bold uppercase tracking-widest text-xs">Initialize New Node</span>
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
              placeholder="Query project registry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-16 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2.5rem] pl-16 pr-8 text-sm focus:outline-none focus:border-indigo-500/30 transition-all shadow-sm dark:shadow-none"
            />
         </div>
         <div className="flex items-center gap-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-2 rounded-[2.5rem]">
            <button 
              onClick={() => setViewMode('grid')}
              className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all ${viewMode === 'grid' ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "text-slate-400 dark:text-white/20 hover:bg-slate-50 dark:hover:bg-white/5"}`}
            >
               <LayoutGrid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all ${viewMode === 'list' ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "text-slate-400 dark:text-white/20 hover:bg-slate-50 dark:hover:bg-white/5"}`}
            >
               <ListIcon className="w-5 h-5" />
            </button>
         </div>
      </div>

      {/* Projects Grid/List */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
           <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
           <p className="text-[10px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.4em]">Synchronizing with Global Node...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-40 gap-6 border border-dashed border-slate-200 dark:border-white/10 rounded-[3rem]">
           <Database className="w-12 h-12 text-slate-300 dark:text-white/10" />
           <div className="text-center">
              <h3 className="text-xl font-bold dark:text-white">Registry Empty</h3>
              <p className="text-xs text-slate-400 font-mono uppercase tracking-widest mt-1">No project nodes detected in current mesh</p>
           </div>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-4"}>
           {filteredProjects.map((project, i) => (
             <motion.div
               key={project.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className={`group relative bg-white dark:bg-[#05050a]/40 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[3rem] overflow-hidden hover:border-indigo-500/30 transition-all duration-500 shadow-xl dark:shadow-none ${viewMode === 'list' ? "flex items-center p-6" : ""}`}
             >
                {/* Media Section */}
                <div className={`relative overflow-hidden ${viewMode === 'grid' ? "aspect-video" : "w-56 h-32 rounded-3xl"}`}>
                   <img src={project.heroImage || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   
                   {/* Order Badge */}
                   <div className="absolute top-6 left-6 flex items-center gap-2">
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-xl flex items-center gap-2">
                         <ArrowUpDown className="w-3 h-3 text-white/60" />
                         <input 
                           type="number" 
                           defaultValue={project.order || 0}
                           onBlur={(e) => handleUpdateOrder(project.id, parseInt(e.target.value))}
                           className="bg-transparent border-0 text-white font-mono text-[10px] w-8 focus:outline-none"
                         />
                      </div>
                   </div>
                </div>

                {/* Content Section */}
                <div className={`p-10 ${viewMode === 'list' ? "flex-1 py-0 flex items-center justify-between" : ""}`}>
                   <div className="space-y-2">
                       <div className="flex items-center gap-2 mb-2">
                        <span className="text-[9px] font-mono text-indigo-500 uppercase tracking-[0.4em]">{project.category}</span>
                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{project.title}</h3>
                      <div className="flex items-center gap-6 text-[9px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-widest pt-4">
                         <span className="flex items-center gap-2"><Briefcase className="w-3.5 h-3.5" /> {project.client}</span>
                         <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {project.year}</span>
                      </div>
                   </div>

                   <div className={`flex items-center gap-4 ${viewMode === 'grid' ? "mt-12" : ""}`}>
                      <Link href={`/admin/projects/edit/${project.id}`} className="flex-1">
                        <Button variant="ghost" className="w-full h-14 rounded-2xl border border-slate-100 dark:border-white/10 text-slate-400 dark:text-white/20 hover:text-indigo-500 dark:hover:text-white flex items-center gap-2">
                           <Edit2 className="w-4 h-4" />
                           <span className="font-bold text-[10px] uppercase tracking-widest">Configure</span>
                        </Button>
                      </Link>
                      <Button onClick={() => handleDelete(project.id)} variant="ghost" className="h-14 w-14 rounded-2xl border border-red-500/10 text-red-500/40 hover:text-red-500 p-0 transition-colors">
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
