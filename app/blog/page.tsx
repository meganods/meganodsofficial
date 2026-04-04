"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Calendar, Clock, User, Search, Newspaper, Zap, Layers, Globe } from "lucide-react"
import { useState } from "react"
import { DeepTechBackground } from "@/components/ui/deep-tech-background"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider"
import { Button } from "react-day-picker"

const blogPosts = [
  {
    id: 1,
    slug: "future-of-ai-in-enterprise",
    title: "The Future of AI in Enterprise Solutions",
    excerpt: "Discover how artificial intelligence is reshaping the enterprise landscape and driving digital transformation across industries.",
    category: "Artificial Intelligence",
    author: "John Mitchell",
    date: "March 15, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    featured: true,
    meta: "Insight 01"
  },
  {
    id: 2,
    slug: "cloud-migration-strategies",
    title: "Cloud Migration Strategies for 2024",
    excerpt: "Learn the best practices and strategies for seamless cloud migration that ensures security, scalability, and cost efficiency.",
    category: "Cloud Computing",
    author: "Sarah Chen",
    date: "March 12, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    featured: true,
    meta: "Insight 02"
  },
  {
    id: 3,
    slug: "cybersecurity-best-practices",
    title: "Cybersecurity Best Practices for Modern Businesses",
    excerpt: "Protect your organization with these essential cybersecurity measures and stay ahead of evolving threats.",
    category: "Cybersecurity",
    author: "Michael Torres",
    date: "March 10, 2024",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    featured: false,
    meta: "Secure Layer"
  },
  {
    id: 4,
    slug: "machine-learning-automation",
    title: "Machine Learning in Business Process Automation",
    excerpt: "Explore how ML algorithms are automating complex business processes and increasing operational efficiency.",
    category: "Machine Learning",
    author: "Emily Johnson",
    date: "March 8, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800",
    featured: false,
    meta: "Automation X"
  },
  {
    id: 5,
    slug: "iot-smart-solutions",
    title: "IoT Solutions Transforming Smart Cities",
    excerpt: "How Internet of Things technology is creating smarter, more efficient urban environments worldwide.",
    category: "IoT",
    author: "David Park",
    date: "March 5, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800",
    featured: false,
    meta: "Urban Pulse"
  },
  {
    id: 6,
    slug: "blockchain-enterprise",
    title: "Blockchain Applications in Enterprise",
    excerpt: "Understanding how blockchain technology is revolutionizing supply chain, finance, and data management.",
    category: "Blockchain",
    author: "Lisa Wang",
    date: "March 3, 2024",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
    featured: false,
    meta: "Trust Mesh"
  }
]

const categories = ["All", "Artificial Intelligence", "Cloud Computing", "Cybersecurity", "Machine Learning", "IoT", "Blockchain"]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

  return (
    <SmoothScrollProvider>
      <Navigation />
      <main className="min-h-screen bg-[#010103] text-white">
        <div className="fixed inset-0 pointer-events-none z-0">
          <DeepTechBackground />
        </div>

        {/* Hero Section - The Intelligence Network */}
        <section className="relative pt-32 lg:pt-48 pb-20 lg:pb-32 z-10">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-12"
            >
              <Newspaper className="w-3 h-3" />
              Global Intelligence Network
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-7xl lg:text-[10rem] font-bold mb-12 tracking-tighter leading-[0.85]"
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
              <div className="relative bg-[#05050a]/60 backdrop-blur-3xl border border-white/10 rounded-2xl lg:rounded-3xl p-1 overflow-hidden group-hover:border-indigo-500/30 transition-all">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Query Database..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-8 h-16 lg:h-20 bg-transparent text-white font-medium focus:outline-none placeholder:text-white/20 text-lg"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                  <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-mono text-white/40 uppercase tracking-widest hidden sm:block">CMD + K</div>
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
                  className={`px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${selectedCategory === category
                      ? "bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                      : "bg-[#05050a] border-white/10 text-white/40 hover:border-white/20 hover:text-white"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Network Cards */}
        {selectedCategory === "All" && searchQuery === "" && (
          <section className="py-24 relative z-10">
            <div className="container mx-auto px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 mb-16"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-indigo-400" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Priority Reports</h2>
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
                      <div className="relative bg-[#05050a]/80 backdrop-blur-xl border border-white/10 rounded-[3rem] overflow-hidden p-1 hover:border-indigo-500/30 transition-all duration-500">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-[2.8rem]">
                          <motion.img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700"
                            initial={{ scale: 1.2 }}
                            whileHover={{ scale: 1 }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-transparent to-transparent opacity-80" />
                          <div className="absolute top-8 left-8">
                            <span className="px-4 py-1.5 bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                              Priority
                            </span>
                          </div>
                          <div className="absolute bottom-8 left-8 right-8">
                            <div className="text-emerald-400 font-mono text-[10px] uppercase tracking-widest mb-4">{post.category}</div>
                            <h3 className="text-3xl font-bold text-white group-hover:text-indigo-400 transition-colors leading-tight">
                              {post.title}
                            </h3>
                          </div>
                        </div>
                        <div className="p-10 flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs font-mono text-white/30 tracking-widest uppercase">
                            <span className="flex items-center gap-2"><User className="w-4 h-4" /> {post.author}</span>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {post.readTime}</span>
                          </div>
                          <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                            <ArrowRight className="w-5 h-5" />
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
        <section className="py-24 relative z-10 border-t border-white/5 bg-[#05050a]/20">
          <div className="container mx-auto px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white/40 font-mono text-[10px] uppercase tracking-[0.4em] mb-16 text-center"
            >
              Full Database Catalog
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
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
                    <div className="bg-[#05050a]/60 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 h-full flex flex-col hover:border-indigo-500/30 transition-all duration-500 overflow-hidden">
                      <div className="relative aspect-video overflow-hidden rounded-2xl mb-8">
                        <motion.img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700"
                          initial={{ scale: 1.2 }}
                          whileHover={{ scale: 1 }}
                        />
                        <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-emerald-400 font-mono text-[10px] uppercase tracking-widest mb-4">[ {post.meta} ]</div>
                        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-white/40 text-sm leading-relaxed mb-8 line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-[10px] font-mono text-white/30 uppercase tracking-widest">
                          <Calendar className="w-3.5 h-3.5" /> {post.date}
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-indigo-500 flex items-center justify-center transition-colors">
                          <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-32">
                <Search className="w-20 h-20 text-white/10 mx-auto mb-8" />
                <p className="text-white/40 text-xl font-medium">No intelligence reports found matching your query.</p>
              </div>
            )}
          </div>
        </section>

        {/* Global Connection CTA */}
        <section className="py-32 lg:py-56 relative z-10 px-6">
          <div className="container mx-auto max-w-5xl">
            <div className="relative rounded-[3rem] lg:rounded-[4rem] border border-white/10 bg-[#05050a]/40 backdrop-blur-3xl overflow-hidden p-1">
              <div className="relative px-8 py-20 lg:px-24 lg:py-32 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-emerald-500/10 pointer-events-none" />
                <Layers className="w-16 h-16 text-indigo-400/20 mx-auto mb-10" />

                <h2 className="text-4xl md:text-6xl font-bold text-white mb-10 tracking-tighter leading-none">
                  Join the <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">Intelligence Grid</span>.
                </h2>
                <p className="text-white/40 text-xl mb-16 max-w-2xl mx-auto font-medium">
                  Receive the latest technical audits, neural breakthroughs, and operational news straight to your terminal.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 max-w-xl mx-auto">
                  <input
                    type="email"
                    placeholder="Terminal Email..."
                    className="flex-1 h-16 lg:h-20 bg-white/5 border border-white/5 rounded-2xl px-8 text-white font-bold focus:outline-none focus:border-indigo-500/50 transition-all text-lg"
                  />
                  <Button
                    className="h-16 lg:h-20 px-10 bg-white text-black hover:bg-white/90 font-bold rounded-2xl shadow-xl transition-all text-lg"
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
