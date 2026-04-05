"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  User as UserIcon,
  Shield,
  Zap,
  Cpu,
  Globe,
  LayoutGrid,
  List as ListIcon,
  Linkedin,
  Twitter,
  Github,
  Mail,
  MoreVertical,
  Target,
  Layers,
  Loader2,
  Database,
  ArrowUpDown,
  ShieldCheck,
  Award
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc, query, orderBy, updateDoc } from "firebase/firestore";
import { toast } from "sonner";

export default function AdminTeamPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState("")
  const [team, setTeam] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const fetchTeam = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, "team"), orderBy("order", "asc"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTeam(docs);
    } catch (error: any) {
      console.error("FIREBASE_FETCH_ERROR:", error);
      toast.error(`REGISTRY_ACCESS_DENIED: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTeam();
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to TERMINATE this personnel node?")) return;
    
    const toastId = toast.loading("TERMINATING_PERSONNEL_NODE...");
    try {
      await deleteDoc(doc(db, "team", id));
      setTeam(team.filter(t => t.id !== id));
      toast.success("PERSONNEL_NODE_TERMINATED", { id: toastId });
    } catch (error: any) {
      toast.error(`TERMINATION_FAILURE: ${error.message}`, { id: toastId });
    }
  }

  const handleUpdateOrder = async (id: string, newOrder: number) => {
    setUpdatingId(id);
    try {
      await updateDoc(doc(db, "team", id), {
        order: newOrder,
        updatedAt: new Date()
      });
      setTeam(team.map(t => t.id === id ? { ...t, order: newOrder } : t));
      toast.success("SEQUENCE_UPDATED");
    } catch (error: any) {
      toast.error(`SEQUENCE_FAILURE: ${error.message}`);
    } finally {
      setUpdatingId(null);
    }
  }

  const toggleLeader = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, "team", id), {
        isLeader: !currentStatus,
        updatedAt: new Date()
      });
      setTeam(team.map(t => t.id === id ? { ...t, isLeader: !currentStatus } : t));
      toast.success(`EXECUTIVE_STATUS_${!currentStatus ? 'GRANTED' : 'REVOKED'}`);
    } catch (error: any) {
      toast.error(`PROTOCOL_FAILURE: ${error.message}`);
    }
  }

  const filteredTeam = team.filter(t => 
    t.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.meta?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { name: 'Executive Command', count: team.filter(t => t.isLeader).length, icon: ShieldCheck },
    { name: 'Tactical Units', count: team.filter(t => !t.isLeader).length, icon: Cpu },
    { name: 'Total Architects', count: team.length, icon: Target },
    { name: 'Active Nodes', count: team.length, icon: Layers }
  ]

  return (
    <div className="space-y-10 pb-20 selection:bg-indigo-500/30">
      {/* Tactical Header */}
      <div className="relative">
        <div className="absolute -left-10 top-0 w-1 h-20 bg-gradient-to-b from-indigo-500 to-transparent" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                 <span className="text-[10px] font-mono text-indigo-500 uppercase tracking-[0.5em] font-bold">Base command station</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-2 underline decoration-indigo-500/10 underline-offset-[12px]">Personnel <span className="text-indigo-500">Nodes</span></h1>
              <p className="text-slate-400 dark:text-white/20 font-mono text-[10px] uppercase tracking-[0.4em]">Manage Global Intelligence Architects & Strategic Directors</p>
           </motion.div>
           
           <Link href="/admin/team/new">
              <Button className="h-16 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-3xl shadow-xl shadow-indigo-600/20 flex items-center gap-3 group border border-white/10 transition-transform active:scale-95">
                 <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                 <span className="font-bold uppercase tracking-widest text-xs">Initialize Personnel Node</span>
              </Button>
           </Link>
        </div>
      </div>

      {/* Dept Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
         {stats.map((stat, i) => (
           <div key={stat.name} className="bg-white dark:bg-[#05050a]/40 backdrop-blur-3xl border border-slate-200 dark:border-white/5 p-8 rounded-[2.5rem] flex items-center gap-5 shadow-sm dark:shadow-none">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 border border-indigo-500/10 shadow-inner"><stat.icon className="w-6 h-6" /></div>
              <div>
                 <div className="text-2xl font-black text-slate-900 dark:text-white leading-none tracking-tighter">{stat.count}</div>
                 <div className="text-[9px] font-mono text-slate-400 uppercase tracking-[0.2em] mt-2 font-bold">{stat.name}</div>
              </div>
           </div>
         ))}
      </div>

      {/* Control Strip */}
      <div className="flex flex-col lg:flex-row items-center gap-6">
         <div className="relative flex-1 group w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-white/20 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="Scan personnel IDs..."
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

      {/* Personnel Nodes */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
           <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
           <p className="text-[10px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.4em]">Resolving Personnel Mesh...</p>
        </div>
      ) : team.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-40 gap-6 border border-dashed border-slate-200 dark:border-white/10 rounded-[3rem]">
           <Database className="w-12 h-12 text-slate-300 dark:text-white/10" />
           <div className="text-center">
              <h3 className="text-xl font-bold dark:text-white uppercase tracking-tight">Registry Idle</h3>
              <p className="text-[10px] text-slate-400 font-mono uppercase tracking-[0.3em] mt-2 leading-relaxed">No personnel nodes detected in the distributed registry.</p>
           </div>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" : "space-y-4"}>
           {filteredTeam.map((node, i) => (
             <motion.div
               key={node.id}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.05 }}
               className={`group relative bg-white dark:bg-[#05050a]/40 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[3rem] p-10 hover:border-indigo-500/30 transition-all duration-500 shadow-xl dark:shadow-none ${viewMode === 'list' ? "flex items-center py-6" : ""}`}
             >
                {viewMode === 'grid' && (
                  <div className={`absolute -inset-1 bg-gradient-to-br ${node.gradient} opacity-0 group-hover:opacity-10 transition-opacity blur-3xl rounded-[3rem] pointer-events-none`} />
                )}
                
                <div className={`${viewMode === 'grid' ? "mb-10 rounded-[2.5rem] overflow-hidden aspect-square border border-white/5 shadow-2xl" : "w-16 h-16 rounded-[1.5rem] mr-8"} relative bg-slate-50 dark:bg-black/40`}>
                   {node.avatarUrl ? (
                      <img src={node.avatarUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={node.name} />
                   ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${node.gradient} flex items-center justify-center ${viewMode === 'grid' ? 'text-4xl' : 'text-xl'} font-black text-white tracking-widest shadow-inner`}>
                         {node.initials || '??'}
                      </div>
                   )}

                    {/* Order Badge */}
                    <div className="absolute top-4 left-4 z-20">
                        <div className="bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 group/order">
                           <ArrowUpDown className="w-2.5 h-2.5 text-white/40 group-focus-within/order:text-indigo-500 transition-colors" />
                           <input 
                             type="number" 
                             defaultValue={node.order || 0}
                             onBlur={(e) => handleUpdateOrder(node.id, parseInt(e.target.value))}
                             className="bg-transparent border-0 text-white font-mono text-[9px] w-6 focus:outline-none"
                           />
                        </div>
                    </div>

                    {/* Leader Status Badge */}
                    {node.isLeader && (
                      <button onClick={() => toggleLeader(node.id, node.isLeader)} className="absolute top-4 right-4 z-20 w-10 h-10 bg-indigo-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/40 border border-white/20">
                         <ShieldCheck className="w-5 h-5" />
                      </button>
                    )}
                </div>

                <div className={`${viewMode === 'list' ? "flex-1 flex items-center justify-between" : ""}`}>
                   <div className="space-y-1">
                      <div className="text-indigo-500 font-mono text-[9px] uppercase tracking-[0.4em] mb-2 font-black opacity-60 flex items-center gap-2">
                         [ {node.meta} ]
                         {node.isLeader && <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />}
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter leading-none group-hover:text-indigo-500 transition-colors">{node.name}</h3>
                      <p className="text-slate-400 dark:text-white/20 text-[10px] font-black uppercase tracking-[0.3em] font-mono py-1">{node.role}</p>
                   </div>

                   <div className={`flex items-center gap-4 ${viewMode === 'grid' ? "mt-12" : ""}`}>
                      <Link href={`/admin/team/edit/${node.id}`} className="flex-1">
                        <Button variant="ghost" className="w-full h-14 rounded-2xl border border-slate-100 dark:border-white/10 text-slate-400 dark:text-white/20 hover:text-indigo-500 dark:hover:text-white flex items-center gap-2 transition-all">
                           <Edit2 className="w-4 h-4" />
                           <span className="font-black text-[10px] uppercase tracking-widest">Configure Node</span>
                        </Button>
                      </Link>
                      <Button onClick={() => handleDelete(node.id)} variant="ghost" className="h-14 w-14 rounded-2xl border border-red-500/10 text-red-500/40 hover:text-red-500 p-0 transition-all hover:bg-red-500/5">
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
