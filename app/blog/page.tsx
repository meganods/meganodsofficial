"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  User, 
  Search, 
  Newspaper, 
  Zap, 
  Layers, 
  Loader2, 
  Database, 
  Type,
  Sparkles,
  Code2,
  Brain,
  Cloud,
  ShieldCheck,
  BookOpen,
  TrendingUp,
  ChevronRight,
  CheckCircle2,
  Server,
  Activity
} from "lucide-react"
import { useState, useEffect } from "react"
import { DeepTechBackground } from "@/components/ui/deep-tech-background"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

import { defaultBlogs } from "@/lib/data/blogs";

const categories = [
  "All",
  "Artificial Intelligence",
  "Cloud Infrastructure",
  "Cybersecurity",
  "Web & Mobile Development",
  "DevOps & Infrastructure",
  "Data Engineering"
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [blogs, setBlogs] = useState<any[]>(defaultBlogs)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docs = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          // Merge dynamic Firestore blogs with default high-quality static articles, upgrading any thin content
          const merged = docs.map((d: any) => {
            const def = defaultBlogs.find(b => b.slug === d.slug || b.id === d.id);
            if (def && (!d.content || d.content.length < def.content.length)) {
              return { ...d, ...def };
            }
            return d;
          });
          const existingSlugs = new Set(docs.map((d: any) => d.slug || d.id));
          const finalBlogs = [...merged, ...defaultBlogs.filter(b => !existingSlugs.has(b.slug) && !existingSlugs.has(b.id))];
          setBlogs(finalBlogs);
        }
      } catch (error) {
        // Fallback to static default blogs if firestore is offline or rules are pending
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlogs();
  }, [])

  const filteredPosts = blogs.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesSearch = post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const scrollToArticles = () => {
    const el = document.getElementById('articles-catalog')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <SmoothScrollProvider>
      <Navigation />
      <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 transition-colors duration-500">
        <div className="fixed inset-0 pointer-events-none z-0">
          <DeepTechBackground />
        </div>

        {/* ═══ HERO SECTION — matches home page style ═══ */}
        <section className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/50">

          {/* Grid + ambient glow background */}
          <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage: `linear-gradient(to right, #4f46e5 1px, transparent 1px), linear-gradient(to bottom, #4f46e5 1px, transparent 1px)`,
                backgroundSize: '48px 48px',
              }}
            />
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] bg-gradient-to-tr from-blue-200/40 via-indigo-200/30 to-purple-200/40 rounded-full blur-[140px]" />
            <div className="absolute top-1/3 -left-20 w-80 h-80 bg-cyan-200/30 rounded-full blur-[110px]" />
            <div className="absolute top-1/3 -right-20 w-80 h-80 bg-violet-200/30 rounded-full blur-[110px]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-indigo-100/40 rounded-full blur-[80px]" />
          </div>

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

              {/* ── LEFT: Content ── */}
              <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">

                {/* Status pill */}
                <motion.div
                  initial={{ opacity: 0, y: -15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-3 rounded-full border border-indigo-200/90 bg-white/90 px-4 py-1.5 text-xs shadow-md shadow-indigo-500/5 backdrop-blur-xl hover:border-indigo-400 transition-all cursor-default"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="font-mono text-[11px] tracking-wider uppercase text-slate-500 font-bold">RESEARCH & INSIGHTS</span>
                  <span className="text-slate-300">|</span>
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent font-black tracking-wide">
                    Weekly Engineering Briefs
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                </motion.div>

                {/* Sub label */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="text-xs sm:text-sm font-mono tracking-[0.3em] text-slate-400 uppercase font-bold"
                >
                  Trends • Architecture • AI • <span className="text-emerald-500 font-black">Analysis</span>
                </motion.div>

                {/* Main headline */}
                <div className="relative pt-1">
                  <div className="absolute top-1/2 left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 -translate-y-1/2 w-full max-w-lg h-28 bg-gradient-to-r from-blue-500/15 via-indigo-500/20 to-teal-400/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
                  <motion.h1
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]"
                  >
                    <span className="block text-slate-900 drop-shadow-sm">Deep Tech Insights</span>
                    <span className="relative inline-block mt-1 font-extrabold italic bg-gradient-to-r from-blue-600 via-indigo-600 via-purple-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent animate-gradient-flow drop-shadow-sm">
                      & Architecture Guides.
                    </span>
                  </motion.h1>
                </div>

                {/* Subtext */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.18 }}
                  className="max-w-xl text-base sm:text-lg text-slate-600 leading-relaxed"
                >
                  Expert perspectives on <span className="font-semibold text-slate-900">full-stack web engineering</span>, <span className="font-semibold text-slate-900">production AI systems</span>, and cloud scalability — written directly by our engineers.
                </motion.p>

                {/* Search Box in Hero */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.22 }}
                  className="w-full max-w-lg"
                >
                  <div className="relative flex items-center bg-white border border-slate-200/90 rounded-2xl shadow-sm focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all p-1.5">
                    <Search className="w-4 h-4 text-slate-400 ml-3 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search articles, AI, cloud architecture..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-3 py-2 bg-transparent text-slate-800 text-xs sm:text-sm font-medium focus:outline-none placeholder:text-slate-400"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="px-2.5 py-1 text-[11px] font-mono font-bold text-slate-400 hover:text-slate-700 transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.26 }}
                  className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1"
                >
                  <Button
                    onClick={scrollToArticles}
                    size="lg"
                    className="h-12 px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-xl shadow-blue-500/20 text-sm border-0 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    Browse All Articles <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-12 px-6 rounded-xl border-slate-200 bg-white/90 hover:bg-slate-50 text-slate-700 text-sm font-semibold shadow-sm flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
                    >
                      <ChevronRight className="h-4 w-4 text-indigo-600" />
                      Suggest A Topic
                    </Button>
                  </Link>
                </motion.div>

                {/* Stats row */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="flex flex-wrap gap-6 pt-2 justify-center lg:justify-start"
                >
                  {[
                    { value: 'Verified', label: 'Technical Guides' },
                    { value: '100%', label: 'Engineering Led' },
                    { value: 'Open', label: 'Architecture Patterns' },
                    { value: 'Continuous', label: 'Research Dispatches' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center lg:text-left">
                      <div className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">{stat.value}</div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* ── RIGHT: Animated Interactive Article Deck & Badges ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, x: 24 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 relative flex items-center justify-center pt-10 pb-8"
              >
                {/* Floating badge 1: Cadence */}
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-0 -left-2 xl:-left-6 z-20 hidden lg:flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-indigo-200/90 shadow-xl shadow-indigo-500/10"
                >
                  <div className="w-7 h-7 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[8px] font-mono font-bold uppercase text-slate-400">Release Cadence</p>
                    <p className="text-xs font-black text-slate-900">Weekly Deep Dives</p>
                  </div>
                </motion.div>

                {/* Floating badge 2: Read Time */}
                <motion.div
                  animate={{ y: [6, -6, 6] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute top-0 -right-2 xl:-right-6 z-20 hidden lg:flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-indigo-200/90 shadow-xl shadow-indigo-500/10"
                >
                  <div className="w-7 h-7 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[8px] font-mono font-bold uppercase text-slate-400">Avg Read Time</p>
                    <p className="text-xs font-black text-slate-900">5–8 Min Reads</p>
                  </div>
                </motion.div>

                {/* Floating badge 3: Coverage */}
                <motion.div
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-2 -left-2 xl:-left-6 z-20 hidden lg:flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-indigo-200/90 shadow-xl shadow-indigo-500/10"
                >
                  <div className="w-7 h-7 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[8px] font-mono font-bold uppercase text-slate-400">Core Focus</p>
                    <p className="text-xs font-black text-slate-900">AI & Cloud Scale</p>
                  </div>
                </motion.div>

                {/* Central interactive insight topic cards */}
                <div className="relative w-full max-w-md space-y-3">
                  {[
                    { 
                      icon: Brain, 
                      title: 'Production RAG Architectures with Next.js', 
                      desc: 'Vector databases, hybrid search & sub-second latency',
                      tag: 'Artificial Intelligence',
                      color: 'from-blue-500 to-indigo-600',
                      badge: 'Trending'
                    },
                    { 
                      icon: Cloud, 
                      title: 'Zero-Downtime PostgreSQL Scaling', 
                      desc: 'Partitioning, connection pooling & read replicas',
                      tag: 'Cloud & Database',
                      color: 'from-purple-500 to-indigo-600',
                      badge: 'Deep Dive'
                    },
                    { 
                      icon: ShieldCheck, 
                      title: 'Zero-Trust Architecture for Modern SaaS', 
                      desc: 'OAuth 2.1, mTLS, and end-to-end telemetry',
                      tag: 'Security Ops',
                      color: 'from-cyan-500 to-blue-600',
                      badge: 'Best Practice'
                    },
                    { 
                      icon: Code2, 
                      title: 'Enterprise Design Systems & Micro-UI', 
                      desc: 'Figma tokens, Tailwind sync & component governance',
                      tag: 'Frontend Engineering',
                      color: 'from-emerald-500 to-teal-600',
                      badge: 'Architecture'
                    },
                  ].map(({ icon: Icon, title, desc, tag, color, badge }, i) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ x: 6, scale: 1.02 }}
                      className="p-4 bg-white/95 border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300 cursor-default"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0 shadow-md`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <div className="text-slate-900 font-bold text-sm truncate">{title}</div>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-600 font-mono text-[8px] font-bold shrink-0">
                              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                              {badge}
                            </span>
                          </div>
                          <div className="text-slate-500 text-[10.5px] leading-snug mt-0.5 truncate">{desc}</div>
                          <div className="text-indigo-600 font-mono text-[8.5px] font-bold uppercase tracking-wider mt-0.5 truncate">{tag}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Highlight pill */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.65 }}
                    className="text-center pt-1"
                  >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 font-mono text-[9px] uppercase tracking-widest font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                      Browse Full Dispatch Catalog Below
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Bottom feature strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-16 max-w-5xl mx-auto"
            >
              {[
                { 
                  icon: Code2, 
                  title: 'Production-Grounded Analysis', 
                  desc: 'Every article is written from real production deployments and actual scalability battle scars.' 
                },
                { 
                  icon: Server, 
                  title: 'Actionable Code & Systems', 
                  desc: 'Complete architectural blueprints, benchmarks, and practical implementation patterns.' 
                },
                { 
                  icon: Sparkles, 
                  title: 'Curated Emerging Tech', 
                  desc: 'Weekly synthesis of LLM advancements, cloud infrastructure shifts, and frontend patterns.' 
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col items-center text-center group hover:border-indigo-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-slate-900 font-bold text-sm mb-2">{title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Categories Bar */}
        <section id="articles-catalog" className="relative z-20 bg-background/90 backdrop-blur-md border-y border-border py-4">
          <div className="container mx-auto px-4 sm:px-6 overflow-x-auto no-scrollbar">
            <div className="flex gap-2.5 min-w-max justify-center items-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border cursor-pointer ${
                    selectedCategory === category
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/20"
                      : "bg-card border-border text-muted-foreground hover:border-indigo-400 hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {isLoading ? (
           <div className="flex flex-col items-center justify-center py-40 gap-8">
              <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
              <p className="text-xs font-mono text-indigo-600 uppercase tracking-[0.5em] animate-pulse">Loading Articles...</p>
           </div>
        ) : filteredPosts.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-40 gap-6 border border-dashed border-border rounded-3xl mx-4 sm:mx-6 my-16">
              <Database className="w-12 h-12 text-muted-foreground/30" />
              <div className="text-center">
                 <h3 className="text-xl font-bold text-foreground">No Articles Found</h3>
                 <p className="text-sm text-muted-foreground mt-2">Try adjusting your search query or selected category.</p>
              </div>
           </div>
        ) : (
          <>
            {/* Global Catalog Grid */}
            <section className="py-16 sm:py-24 lg:py-28 relative z-10">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                  {filteredPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index % 6) * 0.08, duration: 0.5 }}
                      className="group h-full flex flex-col"
                    >
                      <Link href={`/blog/${post.slug || post.id}`} className="h-full block">
                        <div className="h-full flex flex-col justify-between bg-card/60 backdrop-blur-2xl border border-border/80 rounded-[2rem] overflow-hidden group-hover:border-indigo-400/50 group-hover:-translate-y-1.5 group-hover:shadow-2xl group-hover:shadow-indigo-500/10 transition-all duration-300 relative shadow-md">
                          {/* Image Visual Header */}
                          <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                            {post.imageUrl ? (
                              <motion.img
                                src={post.imageUrl}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                <Type className="w-12 h-12 text-slate-600" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" />
                            
                            {/* Badges on Visual Asset */}
                            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                              <span className="px-3 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-md text-slate-900 dark:text-white text-[9px] font-mono font-bold uppercase tracking-wider rounded-lg shadow-sm border border-border/40">
                                {post.category || 'Engineering'}
                              </span>
                              {post.readTime && (
                                <span className="px-2.5 py-1 bg-indigo-600 text-white text-[9px] font-mono font-bold rounded-lg shadow-md flex items-center gap-1">
                                  <Clock className="w-2.5 h-2.5" />
                                  {post.readTime}
                                </span>
                              )}
                            </div>

                            {/* Author tag on bottom image */}
                            <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-white/90">
                              <span className="font-bold tracking-wider truncate drop-shadow-md flex items-center gap-1.5">
                                <User className="w-3 h-3 text-indigo-400" />
                                {post.author?.name || 'MegaNods Team'}
                              </span>
                              <span className="text-slate-300 font-medium text-[9px] drop-shadow-md">{post.date || '2025'}</span>
                            </div>
                          </div>

                          {/* Card Body */}
                          <div className="p-6 flex-1 flex flex-col justify-between">
                            <div>
                              <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug tracking-tight mb-2 line-clamp-2">
                                {post.title}
                              </h3>
                              <p className="text-xs text-muted-foreground font-normal leading-relaxed line-clamp-3 mb-4">
                                {post.excerpt}
                              </p>
                            </div>

                            {/* Card Footer */}
                            <div className="pt-4 border-t border-border/80 flex items-center justify-between gap-3">
                              <span className="text-indigo-600 font-mono text-xs font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                                Read Full Article <ChevronRight className="w-3.5 h-3.5" />
                              </span>
                              <div className="w-8 h-8 rounded-xl bg-muted group-hover:bg-indigo-600 text-muted-foreground group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm shrink-0">
                                <ArrowRight className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* Newsletter / Insights Subscription CTA */}
        <section className="py-16 sm:py-24 relative z-10 px-4 sm:px-6">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 bg-white shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/60 pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

                <div className="relative px-5 py-10 sm:px-12 sm:py-16 lg:px-16 lg:py-16">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-center">
                    {/* Left: Text */}
                    <div className="text-center sm:text-left">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 mb-3 sm:mb-4 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-indigo-600 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-bold">Engineering Dispatch</span>
                      </motion.div>

                      <motion.h2
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, duration: 0.6 }}
                        className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 sm:mb-4 tracking-tight leading-tight"
                      >
                        Stay ahead with our{' '}
                        <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-600">
                          weekly technical brief.
                        </span>
                      </motion.h2>

                      <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.22 }}
                        className="text-slate-500 text-xs sm:text-sm md:text-base leading-relaxed mb-6"
                      >
                        Get actionable engineering breakdowns, AI pipeline guides, and architecture blueprints delivered directly to your inbox every Thursday. Zero marketing fluff.
                      </motion.p>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="email"
                          placeholder="Enter your work email..."
                          className="flex-1 h-12 bg-white border border-slate-200 rounded-xl px-4 text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-slate-400"
                        />
                        <Button
                          size="lg"
                          className="w-full sm:w-auto h-12 px-6 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-md text-xs sm:text-sm border-0 shrink-0 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                        >
                          <span>Subscribe Free</span>
                          <ArrowRight className="w-4 h-4 ml-1.5" />
                        </Button>
                      </div>
                    </div>

                    {/* Right: Trust checklist */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.25, duration: 0.6 }}
                      className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 sm:p-6 space-y-3.5"
                    >
                      <div className="text-slate-900 font-bold text-xs sm:text-sm mb-3">What you receive in each edition:</div>
                      {[
                        { icon: CheckCircle2, title: 'In-Depth Architectural Breakdowns', desc: 'Real production architectures and system trade-offs.' },
                        { icon: Zap, title: 'Production AI Implementation Notes', desc: 'Tested RAG patterns, latency optimizations, and agent frameworks.' },
                        { icon: Server, title: 'Cloud & Database Scaling Guides', desc: 'High-traffic Postgres, Redis, and Kubernetes benchmarks.' },
                        { icon: ShieldCheck, title: 'No Spam Guarantee', desc: '100% technical insights. Unsubscribe at any time with one click.' },
                      ].map(({ icon: Icon, title, desc }, i) => (
                        <motion.div
                          key={title}
                          initial={{ opacity: 0, x: 10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.07 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                            <Icon className="w-3.5 h-3.5 text-indigo-600" />
                          </div>
                          <div>
                            <div className="text-slate-900 font-semibold text-xs sm:text-sm">{title}</div>
                            <div className="text-slate-500 text-[11px] sm:text-xs leading-relaxed">{desc}</div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}

