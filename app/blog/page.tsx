"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Calendar, Clock, User, Search, Newspaper, Zap, Layers, Globe, Loader2, Database, Type } from "lucide-react"
import { useState, useEffect } from "react"
import { DeepTechBackground } from "@/components/ui/deep-tech-background"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const categories = ["All", "Artificial Intelligence", "Cloud Computing", "Security Ops", "Machine Learning", "IoT", "Blockchain"]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [blogs, setBlogs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBlogs(docs);
      } catch (error) {
        console.error("BLOG_FETCH_ERROR:", error);
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

  const featuredPosts = blogs.slice(0, 2)

  return (
    <SmoothScrollProvider>
      <Navigation />
      <main className="min-h-screen bg-[#010103] text-white selection:bg-indigo-500/30">
        <div className="fixed inset-0 pointer-events-none z-0">
          <DeepTechBackground />
        </div>

        {/* Hero Section - The Intelligence Network */}
        <section className="relative pt-32 lg:pt-48 pb-20 lg:pb-32 z-10 px-6">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-12 shadow-xl shadow-indigo-500/5"
            >
              <Newspaper className="w-4 h-4" />
              Global Intelligence Network
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-7xl lg:text-[10rem] font-black mb-12 tracking-tighter leading-[0.85] uppercase"
            >
              Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">Insights</span> & Global News.
            </motion.h1>

            {/* Search HUD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-4xl mx-auto mt-16 group"
            >
              <div className="relative bg-[#05050a]/60 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] lg:rounded-[3.5rem] p-1.5 overflow-hidden group-hover:border-indigo-500/30 transition-all shadow-2xl">
                <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-indigo-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Query editorial registry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-20 pr-8 h-18 lg:h-24 bg-transparent text-white font-medium focus:outline-none placeholder:text-white/20 text-2xl tracking-tight"
                />
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex gap-3">
                  <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[9px] font-mono text-white/40 uppercase tracking-widest hidden sm:block font-black">NODE_SEARCH v3</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories Bar */}
        <section className="sticky top-[80px] z-50 bg-[#010103]/60 backdrop-blur-3xl border-y border-white/5 py-4">
          <div className="container mx-auto px-6 overflow-x-auto no-scrollbar">
            <div className="flex gap-4 min-w-max justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 border ${selectedCategory === category
                      ? "bg-indigo-500 border-indigo-500 text-white shadow-xl shadow-indigo-500/20"
                      : "bg-[#05050a] border-white/5 text-white/40 hover:border-white/20 hover:text-white"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {isLoading ? (
           <div className="flex flex-col items-center justify-center py-60 gap-8">
              <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
              <p className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.5em] animate-pulse">Resolving Editorial Mesh...</p>
           </div>
        ) : filteredPosts.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-60 gap-8">
              <Database className="w-20 h-20 text-white/5" />
              <p className="text-xl text-white/20 font-black font-mono uppercase tracking-[0.3em]">Editorial Registry Empty</p>
           </div>
        ) : (
          <>
            {/* Featured Network Cards */}
            {selectedCategory === "All" && searchQuery === "" && (
              <section className="py-32 relative z-10">
                <div className="container mx-auto px-6 lg:px-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-6 mb-20"
                  >
                    <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shadow-xl shadow-indigo-500/5">
                      <Zap className="w-8 h-8 text-indigo-400" />
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-none">Priority Reports</h2>
                  </motion.div>

                  <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                    {featuredPosts.map((post, index) => (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative"
                      >
                        <Link href={`/blog/${post.slug}`}>
                          <div className="relative bg-[#05050a]/80 backdrop-blur-3xl border border-white/5 rounded-[4.5rem] overflow-hidden p-1.5 hover:border-indigo-500/30 transition-all duration-700 shadow-2xl">
                            <div className="relative aspect-[16/10] overflow-hidden rounded-[4rem]">
                              {post.imageUrl ? (
                                <motion.img
                                  src={post.imageUrl}
                                  alt={post.title}
                                  className="w-full h-full object-cover transition-transform duration-1000"
                                  initial={{ scale: 1.1 }}
                                  whileHover={{ scale: 1 }}
                                />
                              ) : (
                                <div className="w-full h-full bg-slate-100 dark:bg-black/40" />
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-[#010103] via-transparent to-transparent opacity-90" />
                              <div className="absolute top-10 left-10">
                                <span className="px-5 py-2 bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-2xl">
                                  Priority
                                </span>
                              </div>
                              <div className="absolute bottom-12 left-12 right-12">
                                <div className="text-emerald-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-6 font-black">{post.category}</div>
                                <h3 className="text-3xl lg:text-4xl font-black text-white group-hover:text-indigo-400 transition-colors leading-none tracking-tighter uppercase">
                                  {post.title}
                                </h3>
                              </div>
                            </div>
                            <div className="p-12 flex items-center justify-between">
                              <div className="flex flex-wrap items-center gap-8 text-[10px] font-mono text-white/30 tracking-[0.2em] uppercase font-black">
                                <span className="flex items-center gap-3"><User className="w-4 h-4 text-white/10" /> {post.author?.name || 'Neural Node'}</span>
                                <span className="flex items-center gap-3"><Clock className="w-4 h-4 text-white/10" /> {post.readTime}</span>
                              </div>
                              <div className="w-16 h-16 rounded-[1.5rem] bg-white text-black flex items-center justify-center group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 shadow-2xl">
                                <ArrowRight className="w-7 h-7" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.article>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Global Catalog Grid */}
            <section className="py-32 relative z-10 border-t border-white/5 bg-[#05050a]/20">
              <div className="container mx-auto px-6 lg:px-8">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-white/40 font-mono text-[11px] uppercase tracking-[0.6em] mb-24 text-center font-black"
                >
                  Full Database Catalog
                </motion.h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                  {filteredPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative"
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <div className="bg-[#05050a]/60 backdrop-blur-3xl border border-white/5 rounded-[3.5rem] p-10 h-full flex flex-col hover:border-indigo-500/30 transition-all duration-700 overflow-hidden shadow-2xl">
                          <div className="relative aspect-video overflow-hidden rounded-[2.5rem] mb-10 shadow-2xl border border-white/5 bg-black">
                            {post.imageUrl ? (
                              <motion.img
                                src={post.imageUrl}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-1000"
                                initial={{ scale: 1.15 }}
                                whileHover={{ scale: 1 }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Type className="w-12 h-12 text-white/5" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="text-emerald-400 font-mono text-[9px] uppercase tracking-[0.4em] mb-6 font-black leading-none flex items-center gap-3">
                               <div className="w-1 h-3 bg-emerald-500/20" />
                               {post.category}
                            </div>
                            <h3 className="text-2xl font-black text-white mb-6 group-hover:text-indigo-400 transition-colors leading-tight tracking-tighter uppercase">
                              {post.title}
                            </h3>
                            <p className="text-white/40 text-base leading-relaxed mb-10 line-clamp-3 font-medium">
                              {post.excerpt}
                            </p>
                          </div>
                          <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4 text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] font-black">
                              <Calendar className="w-4 h-4 text-white/10" /> {post.date}
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-indigo-500 group-hover:border-indigo-400 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                              <ArrowRight className="w-5 h-5 text-white" />
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

        {/* Global Connection CTA */}
        <section className="py-32 lg:py-56 relative z-10 px-6">
          <div className="container mx-auto max-w-5xl">
            <div className="relative rounded-[4rem] lg:rounded-[5rem] border border-white/10 bg-[#05050a]/40 backdrop-blur-3xl overflow-hidden p-1.5 shadow-2xl">
              <div className="relative px-8 py-24 lg:px-24 lg:py-32 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-emerald-500/10 pointer-events-none" />
                <Layers className="w-20 h-20 text-indigo-400/10 mx-auto mb-10" />

                <h2 className="text-4xl md:text-7xl lg:text-[8rem] font-black text-white mb-10 tracking-tighter leading-none uppercase">
                  Join the <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">Intelligence Grid</span>.
                </h2>
                <p className="text-white/40 text-xl lg:text-3xl mb-20 max-w-2xl mx-auto font-medium leading-relaxed">
                  Receive the latest technical audits, neural breakthroughs, and operational news straight to your terminal.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 max-w-2xl mx-auto">
                  <input
                    type="email"
                    placeholder="Terminal Email..."
                    className="flex-1 h-20 lg:h-24 bg-white/5 border border-white/5 rounded-3xl px-10 text-white font-black focus:outline-none focus:border-indigo-500/50 transition-all text-xl placeholder:text-white/10"
                  />
                  <Button
                    className="h-20 lg:h-24 px-12 bg-white text-black hover:bg-white/90 font-black rounded-3xl shadow-2xl transition-all text-xl uppercase tracking-widest border-0"
                  >
                    Establish Node
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
