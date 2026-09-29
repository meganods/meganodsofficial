'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  X,
  ArrowRight,
  Sparkles,
  Layers,
  FileText,
  Cpu,
  Globe,
  ShieldCheck,
  Zap,
  Bot,
  Terminal,
  Clock,
  Command,
  CornerDownLeft
} from 'lucide-react'
import { defaultBlogs } from '@/lib/data/blogs'
import { defaultProjects } from '@/lib/data/projects'
import { TECHNOLOGIES_DATA } from '@/lib/data/technologies'

interface SearchItem {
  id: string
  title: string
  subtitle: string
  category: 'Service' | 'Project' | 'Insight' | 'Technology' | 'Page'
  url: string
  icon: React.ElementType
  tags?: string[]
}

const staticPages: SearchItem[] = [
  { id: 'page-home', title: 'Home', subtitle: 'Engineering Intelligence at Scale', category: 'Page', url: '/', icon: Globe },
  { id: 'page-about', title: 'About Meganods', subtitle: 'Company Manifesto, Vision & Team Core', category: 'Page', url: '/about', icon: Sparkles },
  { id: 'page-services', title: 'Engineering Services', subtitle: 'AI, Web, Mobile, Cloud & Security', category: 'Page', url: '/services', icon: Layers },
  { id: 'page-projects', title: 'Project Portfolio', subtitle: 'Live Client Case Studies & Systems', category: 'Page', url: '/projects', icon: Terminal },
  { id: 'page-team', title: 'Our Team', subtitle: 'Technical Leadership & Contributors', category: 'Page', url: '/team', icon: Bot },
  { id: 'page-blog', title: 'Technical Insights', subtitle: 'Deep-Dive Engineering Articles & Research', category: 'Page', url: '/blog', icon: FileText },
  { id: 'page-contact', title: 'Contact & Estimator', subtitle: 'Project Inquiries, Scope & Timeline', category: 'Page', url: '/contact', icon: Zap },
  { id: 'page-privacy', title: 'Privacy Policy', subtitle: 'Data Protection & Security Standards', category: 'Page', url: '/privacy', icon: ShieldCheck },
  { id: 'page-terms', title: 'Terms of Service', subtitle: 'Operational & Service Agreements', category: 'Page', url: '/terms', icon: ShieldCheck },
]

const servicesList: SearchItem[] = [
  { id: 'srv-ai', title: 'AI & Neural Systems', subtitle: 'Autonomous agents, custom LLM fine-tuning & RAG', category: 'Service', url: '/services', icon: Cpu, tags: ['AI', 'LLM', 'GPT', 'PyTorch', 'Vector'] },
  { id: 'srv-web', title: 'High-Performance Web Platforms', subtitle: 'Next.js 15, React Server Components & Edge SSR', category: 'Service', url: '/services', icon: Globe, tags: ['Web', 'Next.js', 'React', 'TypeScript'] },
  { id: 'srv-mobile', title: 'Cross-Platform Mobile Apps', subtitle: 'Native iOS & Android React Native / Flutter apps', category: 'Service', url: '/services', icon: Zap, tags: ['Mobile', 'iOS', 'Android', 'React Native'] },
  { id: 'srv-cloud', title: 'Distributed Cloud Infrastructure', subtitle: 'Kubernetes mesh, multi-region CDN & auto-scaling', category: 'Service', url: '/services', icon: Layers, tags: ['Cloud', 'Kubernetes', 'AWS', 'GCP', 'DevOps'] },
  { id: 'srv-cyber', title: 'Cybersecurity & Zero-Trust', subtitle: 'eBPF threat detection, micro-segmentation & SOC-2', category: 'Service', url: '/services', icon: ShieldCheck, tags: ['Security', 'Zero-Trust', 'eBPF', 'Compliance'] },
]

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Build searchable index
  const allItems = useMemo<SearchItem[]>(() => {
    const projectItems: SearchItem[] = defaultProjects.map((p) => ({
      id: `proj-${p.id}`,
      title: p.title,
      subtitle: p.category || p.tagline || 'Case Study',
      category: 'Project',
      url: `/projects/${p.slug || p.id}`,
      icon: Terminal,
      tags: p.technologies || [],
    }))

    const blogItems: SearchItem[] = defaultBlogs.map((b) => ({
      id: `blog-${b.id}`,
      title: b.title,
      subtitle: `${b.category} • ${b.readTime || '6 min read'}`,
      category: 'Insight',
      url: `/blog/${b.slug || b.id}`,
      icon: FileText,
      tags: [b.category, ...(b.tags || [])],
    }))

    const techItems: SearchItem[] = TECHNOLOGIES_DATA.map((t) => ({
      id: `tech-${t.id}`,
      title: t.title,
      subtitle: t.category,
      category: 'Technology',
      url: `/technologies/${t.slug}`,
      icon: Cpu,
      tags: [t.category, ...(t.coreCapabilities?.map(c => c.title) || [])],
    }))

    return [...staticPages, ...servicesList, ...projectItems, ...blogItems, ...techItems]
  }, [])

  // Filtered items based on query & category
  const filteredItems = useMemo(() => {
    let list = allItems

    if (selectedCategory !== 'All') {
      list = list.filter((item) => item.category === selectedCategory)
    }

    if (!query.trim()) return list.slice(0, 12)

    const q = query.toLowerCase().trim()
    return list.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q)
      const matchSub = item.subtitle.toLowerCase().includes(q)
      const matchTags = item.tags?.some((t) => t.toLowerCase().includes(q))
      return matchTitle || matchSub || matchTags
    }).slice(0, 20)
  }, [allItems, query, selectedCategory])

  // Keyboard shortcut listener (Cmd+K / Ctrl+K / Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault()
        setIsOpen(false)
      }
    }

    const handleCustomOpen = () => {
      setIsOpen(true)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('open-search', handleCustomOpen)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('open-search', handleCustomOpen)
    }
  }, [isOpen])

  // Prevent background scrolling when search palette is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isOpen])

  // Scroll active item into view when navigating with arrow keys
  useEffect(() => {
    if (listRef.current) {
      const activeElement = listRef.current.querySelector<HTMLElement>('[data-selected="true"]')
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      }
    }
  }, [selectedIndex])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Reset selected index when filtered items change
  useEffect(() => {
    setSelectedIndex(0)
  }, [filteredItems])

  const handleSelect = (item: SearchItem) => {
    setIsOpen(false)
    router.push(item.url)
  }

  // Handle arrow key navigation inside search results
  const handleKeyNav = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1))
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault()
      handleSelect(filteredItems[selectedIndex])
    }
  }

  const categories = ['All', 'Service', 'Project', 'Insight', 'Technology', 'Page']

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 sm:px-6"
          data-lenis-prevent="true"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent="true"
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh] z-10 overscroll-contain"
          >
            {/* Top Search Input Bar */}
            <div className="relative flex items-center px-5 py-4 border-b border-slate-100 dark:border-slate-800/80 shrink-0">
              <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mr-3" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyNav}
                placeholder="Search services, projects, articles, technologies..."
                className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 font-medium text-base sm:text-lg outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500">
                <span>ESC</span>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div 
              data-lenis-prevent="true"
              className="flex items-center gap-2 px-5 py-2.5 overflow-x-auto border-b border-slate-100 dark:border-slate-800/60 no-scrollbar bg-slate-50/50 dark:bg-slate-900/50 shrink-0 overscroll-contain"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Results List */}
            <div 
              ref={listRef} 
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="flex-1 overflow-y-auto p-3 space-y-1 overscroll-contain touch-pan-y"
            >
              {filteredItems.length === 0 ? (
                <div className="py-16 text-center text-slate-400">
                  <Search className="w-8 h-8 mx-auto mb-3 opacity-40 text-slate-400" />
                  <p className="text-sm font-semibold">No results found for &ldquo;{query}&rdquo;</p>
                  <p className="text-xs text-slate-500 mt-1 font-mono">Try searching for AI, Cloud, Projects, or Articles</p>
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const Icon = item.icon
                  const isSelected = index === selectedIndex

                  return (
                    <button
                      key={item.id}
                      type="button"
                      data-selected={isSelected ? "true" : "false"}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/80 dark:border-indigo-800/80 shadow-sm'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0 pr-4">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                            {item.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate font-medium">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md uppercase font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                          {item.category}
                        </span>
                        {isSelected && (
                          <CornerDownLeft className="w-4 h-4 text-indigo-600 dark:text-indigo-400 hidden sm:block" />
                        )}
                      </div>
                    </button>
                  )
                })
              )}
            </div>

            {/* Footer Shortcut Guide */}
            <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/70 flex items-center justify-between text-[11px] font-mono text-slate-400 shrink-0">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">↓</kbd>
                  to navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">↵</kbd>
                  to open
                </span>
              </div>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">MegaNods Search</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
