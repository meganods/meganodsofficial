"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  ExternalLink,
  X,
  Upload,
  Save
} from "lucide-react"

const initialProjects = [
  {
    id: 1,
    title: "AI Analytics Platform",
    category: "AI & Machine Learning",
    client: "TechCorp Industries",
    status: "completed",
    date: "2024-03-15",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Enterprise Cloud Infrastructure",
    category: "Cloud Solutions",
    client: "GlobalFinance Corp",
    status: "completed",
    date: "2024-02-20",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Smart IoT Ecosystem",
    category: "IoT Solutions",
    client: "MetroCity Council",
    status: "in-progress",
    date: "2024-01-10",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Cybersecurity Shield",
    category: "Cybersecurity",
    client: "SecureBank Ltd",
    status: "in-progress",
    date: "2024-03-01",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    title: "E-Commerce Platform",
    category: "Web Development",
    client: "RetailMax Inc",
    status: "planning",
    date: "2024-03-20",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop"
  }
]

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState(initialProjects)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<typeof initialProjects[0] | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    client: "",
    status: "planning",
    date: "",
    image: ""
  })

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const openCreateModal = () => {
    setEditingProject(null)
    setFormData({ title: "", category: "", client: "", status: "planning", date: "", image: "" })
    setIsModalOpen(true)
  }

  const openEditModal = (project: typeof initialProjects[0]) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      category: project.category,
      client: project.client,
      status: project.status,
      date: project.date,
      image: project.image
    })
    setIsModalOpen(true)
  }

  const handleSave = () => {
    if (editingProject) {
      setProjects(projects.map(p => 
        p.id === editingProject.id ? { ...p, ...formData } : p
      ))
    } else {
      setProjects([
        ...projects,
        { id: Date.now(), ...formData }
      ])
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter(p => p.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-card border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="planning">Planning</option>
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Project</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground hidden md:table-cell">Category</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground hidden lg:table-cell">Client</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground hidden sm:table-cell">Date</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <motion.tr
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <span className="font-medium">{project.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground hidden md:table-cell">{project.category}</td>
                  <td className="py-4 px-6 text-muted-foreground hidden lg:table-cell">{project.client}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                      project.status === "completed" ? "bg-emerald-500/10 text-emerald-500" :
                      project.status === "in-progress" ? "bg-amber-500/10 text-amber-500" :
                      "bg-blue-500/10 text-blue-500"
                    }`}>
                      {project.status === "in-progress" ? "In Progress" : 
                       project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground hidden sm:table-cell">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {project.date}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => openEditModal(project)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No projects found matching your criteria.
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-card border border-border rounded-2xl p-6 z-50 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                  {editingProject ? "Edit Project" : "Add New Project"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Project Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                    placeholder="Enter project title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="">Select category</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="Cloud Solutions">Cloud Solutions</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="IoT Solutions">IoT Solutions</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Development">Mobile Development</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Client</label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                    placeholder="Enter client name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="planning">Planning</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2.5 bg-muted text-foreground rounded-xl hover:bg-muted/80 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {editingProject ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
