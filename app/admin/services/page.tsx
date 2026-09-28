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
import { db } from "@/lib/firebase"
import { collection, getDocs, deleteDoc, doc, query, orderBy, updateDoc } from "firebase/firestore"
import { toast } from "sonner"

const iconMap: Record<string, any> = {
  Brain,
  Cloud,
  Shield,
  Activity,
  Cpu,
  Zap,
  Globe
}

const defaultServices = [
  {
    id: "srv-01",
    title: "Neural Architectures",
    category: "Artificial Intelligence",
    meta: "ARTIFICIAL INTELLIGENCE",
    icon: "Brain",
    gradient: "from-blue-600 to-indigo-600",
    description: "End-to-end ML model design, LLM orchestration, fine-tuning pipelines, and autonomous agent systems.",
    isActive: true,
    order: 1
  },
  {
    id: "srv-02",
    title: "Web & Mobile Development",
    category: "Scalable Architecture",
    meta: "SCALABLE ARCHITECTURE",
    icon: "Globe",
    gradient: "from-indigo-600 to-purple-600",
    description: "High-performance Next.js web applications, cross-platform React Native apps, and micro-frontend design systems.",
    isActive: true,
    order: 2
  },
  {
    id: "srv-03",
    title: "Quantum Cloud Core",
    category: "Cloud Infrastructure",
    meta: "CLOUD INFRASTRUCTURE",
    icon: "Cloud",
    gradient: "from-emerald-600 to-teal-600",
    description: "Kubernetes orchestration, multi-cloud disaster resilience, serverless setups, and sub-45ms latency optimization.",
    isActive: true,
    order: 3
  }
]

export default function AdminServicesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [searchQuery, setSearchQuery] = useState("")
  const [services, setServices] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const fetchServices = async () => {
    setIsLoading(true)
    try {
      const q = query(collection(db, "services"), orderBy("order", "asc"), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      if (docs.length > 0) {
        setServices(docs)
      } else {
        setServices(defaultServices)
      }
    } catch (error: any) {
      console.warn("FIREBASE_SERVICES_FALLBACK:", error)
      setServices(defaultServices)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return
    
    const toastId = toast.loading("Deleting service node...")
    try {
      await deleteDoc(doc(db, "services", id))
      setServices(services.filter(s => s.id !== id))
      toast.success("Service deleted successfully", { id: toastId })
    } catch (error: any) {
      toast.error(`Deletion failed: ${error.message}`, { id: toastId })
    }
  }

  const handleUpdateOrder = async (id: string, newOrder: number) => {
    setUpdatingId(id)
    try {
      await updateDoc(doc(db, "services", id), {
        order: newOrder,
        updatedAt: new Date()
      })
      setServices(services.map(s => s.id === id ? { ...s, order: newOrder } : s))
      toast.success("Sequence updated")
    } catch (error: any) {
      toast.error(`Sequence update failed: ${error.message}`)
    } finally {
      setUpdatingId(null)
    }
  }

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, "services", id), {
        isActive: !currentStatus,
        updatedAt: new Date()
      })
      setServices(services.map(s => s.id === id ? { ...s, isActive: !currentStatus } : s))
      toast.success(`Service ${!currentStatus ? 'activated' : 'deactivated'}`)
    } catch (error: any) {
      toast.error(`Update failed: ${error.message}`)
    }
  }

  const filteredServices = services.filter(s => 
    s.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.meta?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 pb-20 selection:bg-indigo-500/30">
      
      {/* Tactical Header */}
      <div className="relative">
        <div className="absolute -left-10 top-0 w-1 h-16 bg-gradient-to-b from-indigo-500 to-transparent" />
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-[11px] font-mono text-indigo-700 dark:text-indigo-400 uppercase tracking-wider font-bold">
                Capabilities Registry
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-1">
              Service <span className="text-indigo-600 dark:text-indigo-400">Stacks</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-medium">
              Manage global service portfolio, capabilities & core architectures
            </p>
          </motion.div>
          
          <Link href="/admin/services/new">
            <Button className="h-10 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-md flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-transform active:scale-95 border-0">
              <Plus className="w-4 h-4" />
              <span>New Service</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Control Strip */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            placeholder="Search services by title, category, or capability..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-1 rounded-xl shadow-sm">
          <button 
            onClick={() => setViewMode('grid')} 
            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${
              viewMode === 'grid' 
                ? "bg-indigo-600 text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
            aria-label="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setViewMode('list')} 
            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${
              viewMode === 'list' 
                ? "bg-indigo-600 text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
            aria-label="List View"
          >
            <ListIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Services Grid / List */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            Loading Services...
          </p>
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl bg-white/50 dark:bg-slate-900/30">
          <Database className="w-10 h-10 text-slate-400" />
          <div className="text-center">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No Services Found</h3>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your search query or create a new service.</p>
          </div>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-5" : "space-y-3"}>
          {filteredServices.map((service, i) => {
            const Icon = iconMap[service.icon] || Brain
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`group relative bg-white dark:bg-[#0d1224]/85 backdrop-blur-2xl border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden hover:border-indigo-500/40 hover:shadow-md transition-all duration-200 shadow-sm ${
                  viewMode === 'list' ? "flex flex-col md:flex-row md:items-center p-4 gap-4" : "flex flex-col p-5"
                }`}
              >
                {/* Icon Container */}
                <div className={`relative flex items-center justify-center shrink-0 ${
                  viewMode === 'grid' ? "w-14 h-14 rounded-xl mb-4" : "w-14 h-14 rounded-xl"
                } bg-gradient-to-br ${service.gradient || 'from-indigo-600 to-purple-600'} shadow-md text-white`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <div className={`flex-1 min-w-0 ${viewMode === 'grid' ? "flex flex-col justify-between" : ""}`}>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                        {service.meta || service.category || 'Core Capability'}
                      </span>
                      <button 
                        onClick={() => toggleStatus(service.id, service.isActive)} 
                        className="text-slate-400 hover:text-indigo-600 transition-colors"
                        title={service.isActive ? "Active" : "Inactive"}
                      >
                        {service.isActive ? (
                          <ToggleRight className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <ToggleLeft className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                        )}
                      </button>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white line-clamp-1 mb-1">
                      {service.title}
                    </h3>
                    
                    {service.description && (
                      <p className={`text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-normal ${
                        viewMode === 'list' ? "hidden lg:block" : ""
                      }`}>
                        {service.description}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className={`flex items-center gap-2 ${viewMode === 'grid' ? "mt-4 pt-3 border-t border-slate-100 dark:border-slate-800" : "mt-3 md:mt-0"}`}>
                    <Link href={`/admin/services/edit/${service.id}`} className="flex-1 md:flex-initial">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full md:w-auto h-8 px-3 rounded-lg border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 text-[11px] font-semibold flex items-center justify-center gap-1.5 shadow-none"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Reconfigure</span>
                      </Button>
                    </Link>
                    <Button 
                      onClick={() => handleDelete(service.id)} 
                      variant="outline" 
                      size="sm" 
                      className="w-8 h-8 p-0 rounded-lg border-red-200 dark:border-red-500/20 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-500/10 shadow-none"
                      aria-label="Delete Service"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
