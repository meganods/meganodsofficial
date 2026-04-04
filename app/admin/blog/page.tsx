"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  X,
  Save,
  Clock,
  User
} from "lucide-react"

const initialPosts = [
  {
    id: 1,
    title: "The Future of AI in Enterprise Solutions",
    excerpt: "Discover how AI is reshaping the enterprise landscape...",
    category: "Artificial Intelligence",
    author: "John Mitchell",
    status: "published",
    date: "2024-03-15",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Cloud Migration Strategies for 2024",
    excerpt: "Learn the best practices for seamless cloud migration...",
    category: "Cloud Computing",
    author: "Sarah Chen",
    status: "published",
    date: "2024-03-12",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Cybersecurity Best Practices",
    excerpt: "Protect your organization with essential security measures...",
    category: "Cybersecurity",
    author: "Michael Torres",
    status: "draft",
    date: "2024-03-10",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Machine Learning in Business",
    excerpt: "Explore how ML algorithms are automating business processes...",
    category: "Machine Learning",
    author: "Emily Johnson",
    status: "scheduled",
    date: "2024-03-20",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop"
  }
]

const categories = ["Artificial Intelligence", "Cloud Computing", "Cybersecurity", "Machine Learning", "IoT", "Blockchain"]

export default function AdminBlogPage() {
  const [posts, setPosts] = useState(initialPosts)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<typeof initialPosts[0] | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "",
    author: "",
    status: "draft",
    date: "",
    readTime: "",
    image: ""
  })

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || post.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const openCreateModal = () => {
    setEditingPost(null)
    setFormData({
      title: "",
      excerpt: "",
      category: "",
      author: "",
      status: "draft",
      date: new Date().toISOString().split("T")[0],
      readTime: "",
      image: ""
    })
    setIsModalOpen(true)
  }

  const openEditModal = (post: typeof initialPosts[0]) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      author: post.author,
      status: post.status,
      date: post.date,
      readTime: post.readTime,
      image: post.image
    })
    setIsModalOpen(true)
  }

  const handleSave = () => {
    if (editingPost) {
      setPosts(posts.map(p =>
        p.id === editingPost.id ? { ...p, ...formData } : p
      ))
    } else {
      setPosts([
        ...posts,
        { id: Date.now(), ...formData }
      ])
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter(p => p.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground">Manage your blog content</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          New Post
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Published", value: posts.filter(p => p.status === "published").length, color: "text-emerald-500" },
          { label: "Drafts", value: posts.filter(p => p.status === "draft").length, color: "text-amber-500" },
          { label: "Scheduled", value: posts.filter(p => p.status === "scheduled").length, color: "text-blue-500" },
          { label: "Total", value: posts.length, color: "text-primary" }
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-4 text-center">
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search posts..."
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
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredPosts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl overflow-hidden group"
          >
            <div className="relative aspect-video">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  post.status === "published" ? "bg-emerald-500/90 text-white" :
                  post.status === "draft" ? "bg-amber-500/90 text-white" :
                  "bg-blue-500/90 text-white"
                }`}>
                  {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                </span>
              </div>
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-card/90 backdrop-blur rounded-lg hover:bg-card transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openEditModal(post)}
                  className="p-2 bg-card/90 backdrop-blur rounded-lg hover:bg-card transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-2 bg-destructive/90 backdrop-blur rounded-lg hover:bg-destructive transition-colors text-white"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-primary text-xs font-medium">{post.category}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2 line-clamp-2">{post.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="py-12 text-center text-muted-foreground bg-card border border-border rounded-2xl">
          No posts found matching your criteria.
        </div>
      )}

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
                  {editingPost ? "Edit Post" : "New Blog Post"}
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
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                    placeholder="Enter post title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Excerpt</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Brief description..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Author</label>
                    <input
                      type="text"
                      required
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                      placeholder="Author name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="scheduled">Scheduled</option>
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
                  <div>
                    <label className="block text-sm font-medium mb-2">Read Time</label>
                    <input
                      type="text"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                      placeholder="5 min"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Featured Image URL</label>
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
                    {editingPost ? "Update" : "Create"}
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
