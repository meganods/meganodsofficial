"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Save,
  GripVertical,
  Brain,
  Cloud,
  Shield,
  BarChart3,
  Cpu,
  Workflow
} from "lucide-react"

const iconOptions = [
  { name: "Brain", icon: Brain },
  { name: "Cloud", icon: Cloud },
  { name: "Shield", icon: Shield },
  { name: "BarChart3", icon: BarChart3 },
  { name: "Cpu", icon: Cpu },
  { name: "Workflow", icon: Workflow }
]

const initialServices = [
  {
    id: 1,
    title: "AI & Machine Learning",
    subtitle: "Intelligent Automation",
    description: "Harness the power of AI to automate processes and drive innovation.",
    icon: "Brain",
    features: ["Natural Language Processing", "Computer Vision", "Predictive Analytics"],
    isActive: true
  },
  {
    id: 2,
    title: "Cloud Solutions",
    subtitle: "Scalable Infrastructure",
    description: "Build resilient and secure cloud infrastructure for your business.",
    icon: "Cloud",
    features: ["Multi-Cloud Strategy", "Cloud Migration", "Serverless Architecture"],
    isActive: true
  },
  {
    id: 3,
    title: "Cybersecurity",
    subtitle: "Enterprise Protection",
    description: "Comprehensive security solutions to protect your digital assets.",
    icon: "Shield",
    features: ["Threat Detection", "Security Audits", "Zero Trust Architecture"],
    isActive: true
  },
  {
    id: 4,
    title: "Data Analytics",
    subtitle: "Business Intelligence",
    description: "Transform raw data into actionable insights.",
    icon: "BarChart3",
    features: ["BI Dashboards", "Data Visualization", "Real-time Analytics"],
    isActive: true
  },
  {
    id: 5,
    title: "IoT Solutions",
    subtitle: "Connected Devices",
    description: "Connect and manage your devices with cutting-edge IoT platforms.",
    icon: "Cpu",
    features: ["Device Management", "Edge Computing", "Predictive Maintenance"],
    isActive: false
  }
]

export default function AdminServicesPage() {
  const [services, setServices] = useState(initialServices)
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingService, setEditingService] = useState<typeof initialServices[0] | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    icon: "Brain",
    features: [""],
    isActive: true
  })

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const openCreateModal = () => {
    setEditingService(null)
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      icon: "Brain",
      features: [""],
      isActive: true
    })
    setIsModalOpen(true)
  }

  const openEditModal = (service: typeof initialServices[0]) => {
    setEditingService(service)
    setFormData({
      title: service.title,
      subtitle: service.subtitle,
      description: service.description,
      icon: service.icon,
      features: service.features,
      isActive: service.isActive
    })
    setIsModalOpen(true)
  }

  const handleSave = () => {
    if (editingService) {
      setServices(services.map(s =>
        s.id === editingService.id ? { ...s, ...formData } : s
      ))
    } else {
      setServices([
        ...services,
        { id: Date.now(), ...formData }
      ])
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter(s => s.id !== id))
    }
  }

  const toggleActive = (id: number) => {
    setServices(services.map(s =>
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ))
  }

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] })
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData({ ...formData, features: newFeatures })
  }

  const removeFeature = (index: number) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) })
  }

  const getIconComponent = (iconName: string) => {
    const found = iconOptions.find(i => i.name === iconName)
    return found ? found.icon : Brain
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Services</h1>
          <p className="text-muted-foreground">Manage your service offerings</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          Add Service
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredServices.map((service) => {
          const IconComponent = getIconComponent(service.icon)
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-card border border-border rounded-2xl p-6 relative ${
                !service.isActive ? "opacity-60" : ""
              }`}
            >
              {/* Drag Handle */}
              <div className="absolute top-4 left-4 cursor-grab">
                <GripVertical className="w-5 h-5 text-muted-foreground" />
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => toggleActive(service.id)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    service.isActive
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {service.isActive ? "Active" : "Inactive"}
                </button>
              </div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mt-4 mb-4">
                <IconComponent className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-1">{service.title}</h3>
              <p className="text-primary text-sm mb-3">{service.subtitle}</p>
              <p className="text-muted-foreground text-sm mb-4">{service.description}</p>

              {/* Features */}
              <div className="space-y-2 mb-6">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(service)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-muted text-foreground rounded-xl hover:bg-muted/80 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-2 bg-destructive/10 text-destructive rounded-xl hover:bg-destructive/20 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {filteredServices.length === 0 && (
        <div className="py-12 text-center text-muted-foreground bg-card border border-border rounded-2xl">
          No services found matching your search.
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
                  {editingService ? "Edit Service" : "Add New Service"}
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
                  <label className="block text-sm font-medium mb-2">Service Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                    placeholder="Enter service title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subtitle</label>
                  <input
                    type="text"
                    required
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                    placeholder="Enter subtitle"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Enter description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Icon</label>
                  <div className="flex gap-2 flex-wrap">
                    {iconOptions.map((option) => (
                      <button
                        key={option.name}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon: option.name })}
                        className={`p-3 rounded-xl border transition-colors ${
                          formData.icon === option.name
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <option.icon className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Features</label>
                  <div className="space-y-2">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature(index, e.target.value)}
                          className="flex-1 px-4 py-2 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                          placeholder="Enter feature"
                        />
                        {formData.features.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="p-2 text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addFeature}
                      className="text-sm text-primary hover:underline"
                    >
                      + Add Feature
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded border-border"
                  />
                  <label htmlFor="isActive" className="text-sm">Active (visible on website)</label>
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
                    {editingService ? "Update" : "Create"}
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
