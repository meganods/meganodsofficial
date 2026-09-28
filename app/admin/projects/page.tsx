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
import { db } from "@/lib/firebase"
import { collection, getDocs, deleteDoc, doc, query, orderBy, updateDoc } from "firebase/firestore"
import { toast } from "sonner"
import { defaultProjects } from "@/lib/data/projects"

export default function AdminProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [searchQuery, setSearchQuery] = useState("")
  const [projects, setProjects] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const fetchProjects = async () => {
    setIsLoading(true)
    try {
      const q = query(collection(db, "projects"), orderBy("order", "asc"), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      if (docs.length > 0) {
        setProjects(docs)
      } else {
        setProjects(defaultProjects)
      }
    } catch (error: any) {
      console.warn("FIREBASE_FETCH_FALLBACK:", error)
      setProjects(defaultProjects)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return
    
    const toastId = toast.loading("Deleting project...")
    try {
      await deleteDoc(doc(db, "projects", id))
      setProjects(projects.filter(p => p.id !== id))
      toast.success("Project deleted successfully", { id: toastId })
    } catch (error: any) {
      toast.error(`Deletion failed: ${error.message}`, { id: toastId })
    }
  }

  const handleUpdateOrder = async (id: string, newOrder: number) => {
    setUpdatingId(id)
    try {
      await updateDoc(doc(db, "projects", id), {
        order: newOrder,
        updatedAt: new Date()
      })
      setProjects(projects.map(p => p.id === id ? { ...p, order: newOrder } : p))
      toast.success("Sequence updated")
    } catch (error: any) {
      toast.error(`Update failed: ${error.message}`)
    } finally {
      setUpdatingId(null)
    }
  }

  const filteredProjects = projects.filter(p => 
    p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.client?.toLowerCase().includes(searchQuery.toLowerCase())
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
                Catalog Management
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-1">
              Project <span className="text-indigo-600 dark:text-indigo-400">Nodes</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-medium">
              Manage global enterprise portfolio, case studies & sequence mapping
            </p>
          </motion.div>
          
          <Link href="/admin/projects/new">
            <Button className="h-10 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-md flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-transform active:scale-95 border-0">
              <Plus className="w-4 h-4" />
              <span>New Project</span>
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
            placeholder="Search projects by name, category, or client..."
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

      {/* Projects Grid / List */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            Loading Projects...
          </p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl bg-white/50 dark:bg-slate-900/30">
          <Database className="w-10 h-10 text-slate-400" />
          <div className="text-center">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No Projects Found</h3>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your search query or add a new project.</p>
          </div>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-5" : "space-y-3"}>
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`group relative bg-white dark:bg-[#0d1224]/85 backdrop-blur-2xl border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden hover:border-indigo-500/40 hover:shadow-md transition-all duration-200 shadow-sm ${
                viewMode === 'list' ? "flex flex-col md:flex-row md:items-center p-4 gap-4" : "flex flex-col"
              }`}
            >
              {/* Thumbnail */}
              <div className={`relative overflow-hidden shrink-0 ${
                viewMode === 'grid' ? "aspect-[16/9] w-full" : "w-full md:w-44 h-24 rounded-xl"
              }`}>
                <img 
                  src={project.heroImage || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm border border-white/10 text-[9px] font-bold text-white uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className={`flex-1 min-w-0 ${viewMode === 'grid' ? "p-4 flex flex-col justify-between" : ""}`}>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug mb-1.5">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      {project.client || "Enterprise Client"}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {project.year || "2026"}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className={`flex items-center gap-1.5 shrink-0 ${viewMode === 'grid' ? "mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 w-full" : "self-center"}`}>
                  <Link href={`/projects/${project.slug || project.id}`} target="_blank" className={viewMode === 'grid' ? "flex-1" : ""}>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`${viewMode === 'grid' ? "w-full" : ""} h-8 px-3 rounded-lg border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 text-[11px] font-semibold flex items-center justify-center gap-1.5 shadow-none`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </Button>
                  </Link>
                  <Link href={`/admin/projects/edit/${project.id}`}>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-8 h-8 p-0 rounded-lg border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 shadow-none"
                      aria-label="Edit Project"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                  <Button 
                    onClick={() => handleDelete(project.id)} 
                    variant="outline" 
                    size="sm" 
                    className="w-8 h-8 p-0 rounded-lg border-red-200 dark:border-red-500/20 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-500/10 shadow-none"
                    aria-label="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
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
