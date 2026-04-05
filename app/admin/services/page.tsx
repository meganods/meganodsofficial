"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Layers,
  LayoutGrid,
  List as ListIcon,
  Brain,
  Cloud,
  Shield,
  Activity,
  Cpu,
  Zap,
  CheckCircle2,
  ToggleLeft,
  ToggleRight,
  Loader2,
  Database,
  ArrowUpDown,
  Globe
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc, query, orderBy, updateDoc } from "firebase/firestore";
import { toast } from "sonner";

const iconMap: Record<string, any> = {
  Brain,
  Cloud,
  Shield,
  Activity,
  Cpu,
  Zap,
  Globe
}

export default function AdminServicesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState("")
  const [services, setServices] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, "services"), orderBy("order", "asc"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setServices(docs);
    } catch (error: any) {
      console.error("FIREBASE_FETCH_ERROR:", error);
      toast.error(`REGISTRY_ACCESS_DENIED: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchServices();
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to TERMINATE this service node?")) return;
    
    const toastId = toast.loading("TERMINATING_SERVICE_NODE...");
    try {
      await deleteDoc(doc(db, "services", id));
      setServices(services.filter(s => s.id !== id));
      toast.success("SERVICE_NODE_TERMINATED", { id: toastId });
    } catch (error: any) {
      toast.error(`TERMINATION_FAILURE: ${error.message}`, { id: toastId });
    }
  }

  const handleUpdateOrder = async (id: string, newOrder: number) => {
    setUpdatingId(id);
    try {
      await updateDoc(doc(db, "services", id), {
        order: newOrder,
        updatedAt: new Date()
      });
      setServices(services.map(s => s.id === id ? { ...s, order: newOrder } : s));
      toast.success("SEQUENCE_UPDATED");
    } catch (error: any) {
      toast.error(`SEQUENCE_FAILURE: ${error.message}`);
    } finally {
      setUpdatingId(null);
    }
  }

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, "services", id), {
        isActive: !currentStatus,
        updatedAt: new Date()
      });
      setServices(services.map(s => s.id === id ? { ...s, isActive: !currentStatus } : s));
      toast.success(`SERVICE_STACK_${!currentStatus ? 'ACTIVATED' : 'DEACTIVATED'}`);
    } catch (error: any) {
      toast.error(`PROTOCOL_FAILURE: ${error.message}`);
    }
  }

  const filteredServices = services.filter(s => 
    s.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.meta?.toLowerCase().includes(searchQuery.toLowerCase())
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
                 <span className="text-[10px] font-mono text-indigo-500 uppercase tracking-[0.5em] font-bold">Capabilities registry</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-2 underline decoration-indigo-500/10 underline-offset-[12px]">Service <span className="text-indigo-500">Stacks</span></h1>
              <p className="text-slate-400 dark:text-white/20 font-mono text-[10px] uppercase tracking-[0.4em]">Manage Global Service Portfolio & Core Protocols</p>
           </motion.div>
           
           <Link href="/admin/services/new">
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
              placeholder="Query services registry..."
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

      {/* Services Grid/List */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
           <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
           <p className="text-[10px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.4em]">Synchronizing with Global Node...</p>
        </div>
      ) : services.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-40 gap-6 border border-dashed border-slate-200 dark:border-white/10 rounded-[3rem]">
           <Database className="w-12 h-12 text-slate-300 dark:text-white/10" />
           <div className="text-center">
              <h3 className="text-xl font-bold dark:text-white">Registry Empty</h3>
              <p className="text-xs text-slate-400 font-mono uppercase tracking-widest mt-1">No service nodes detected in current mesh</p>
           </div>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? "grid md:grid-cols-2 xl:grid-cols-3 gap-8" : "space-y-4"}>
           {filteredServices.map((service, i) => {
             const Icon = iconMap[service.icon] || Brain;
             return (
               <motion.div
                 key={service.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className={`group relative bg-white dark:bg-[#05050a]/40 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[3rem] overflow-hidden hover:border-indigo-500/30 transition-all duration-500 shadow-xl dark:shadow-none ${viewMode === 'list' ? "flex items-center p-6" : ""}`}
               >
                  {/* Icon & Glow */}
                  <div className={`relative flex items-center justify-center ${viewMode === 'grid' ? "h-56" : "w-32 h-32 rounded-[2rem]"} bg-slate-50 dark:bg-black/40 overflow-hidden`}>
                     <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-gradient-to-br ${service.gradient}`} />
                     <div className={`w-20 h-20 rounded-[2rem] bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-700 relative z-10 border border-white/20`}>
                        <Icon className="w-10 h-10 text-white" />
                     </div>
                     
                     {/* Order Badge */}
                     <div className="absolute top-6 left-6 flex items-center gap-2">
                        <div className="bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl flex items-center gap-2">
                           <ArrowUpDown className="w-3 h-3 text-white/60" />
                           <input 
                             type="number" 
                             defaultValue={service.order || 0}
                             onBlur={(e) => handleUpdateOrder(service.id, parseInt(e.target.value))}
                             className="bg-transparent border-0 text-white font-mono text-[10px] w-8 focus:outline-none"
                           />
                        </div>
                     </div>
                  </div>

                  {/* Content Section */}
                  <div className={`p-10 ${viewMode === 'list' ? "flex-1 py-0 flex items-center justify-between" : ""}`}>
                     <div className="space-y-3">
                        <div className="flex items-center gap-3 mb-2">
                           <span className="text-[9px] font-mono text-indigo-500 uppercase tracking-[0.4em] font-bold">{service.meta || service.category}</span>
                           <button onClick={() => toggleStatus(service.id, service.isActive)}>
                              {service.isActive ? <ToggleRight className="w-6 h-6 text-emerald-500" /> : <ToggleLeft className="w-6 h-6 text-slate-300 dark:text-white/10" />}
                           </button>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{service.title}</h3>
                        <p className={`text-slate-400 dark:text-white/20 text-xs leading-relaxed line-clamp-2 font-medium ${viewMode === 'list' ? "hidden" : ""}`}>
                           {service.description}
                        </p>
                     </div>

                     <div className={`flex items-center gap-4 ${viewMode === 'grid' ? "mt-12" : ""}`}>
                        <Link href={`/admin/services/edit/${service.id}`} className="flex-1">
                          <Button variant="ghost" className="w-full h-14 rounded-2xl border border-slate-100 dark:border-white/10 text-slate-400 dark:text-white/20 hover:text-indigo-500 dark:hover:text-white flex items-center gap-2">
                             <Edit2 className="w-4 h-4" />
                             <span className="font-black text-[10px] uppercase tracking-widest">Reconfigure</span>
                          </Button>
                        </Link>
                        <Button onClick={() => handleDelete(service.id)} variant="ghost" className="h-14 w-14 rounded-2xl border border-red-500/10 text-red-500/40 hover:text-red-500 p-0 transition-all">
                           <Trash2 className="w-5 h-5" />
                        </Button>
                     </div>
                  </div>
               </motion.div>
             );
           })}
        </div>
      )}
    </div>
  )
}
