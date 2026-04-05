"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Clock, User, Newspaper, Bookmark } from 'lucide-react'
import { collection, query, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import { DeepTechBackground } from '@/components/ui/deep-tech-background'

export function BlogPreviewSection() {
  const [posts, setPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'), limit(3))
        const querySnapshot = await getDocs(q)
        const fetchedPosts = querySnapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            ...data,
            date: data.createdAt instanceof Timestamp 
              ? data.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              : data.date || "Just now"
          }
        })
        setPosts(fetchedPosts)
      } catch (error) {
        console.error('BLOG_FETCH_ERROR:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const featuredPost = posts[0]
  const otherPosts = posts.slice(1)

  return (
    <section ref={ref} className="relative py-28 lg:py-48 bg-[#010103] overflow-hidden" id="blog">
      <DeepTechBackground />
      
      <div className="relative container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20 lg:mb-32">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="text-indigo-400 font-mono text-xs uppercase tracking-[0.4em] mb-4"
            >
              Intelligence
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tighter leading-none"
            >
              Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">Insights</span> & Global News.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button 
              asChild
              variant="outline"
              className="border-white/10 hover:bg-white/5 text-white h-14 px-8 rounded-2xl"
            >
              <Link href="/blog">
                Explore Full Library
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Blog Grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Featured Post - Large Technical Card */}
          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group h-full"
            >
              <Link href={`/blog/${featuredPost.id}`}>
                <div className="relative bg-[#05050a]/80 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col h-full hover:border-indigo-500/30 transition-all duration-500">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {featuredPost.imageUrl ? (
                      <div className="absolute inset-0">
                        <img 
                          src={featuredPost.imageUrl} 
                          alt={featuredPost.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#010103] via-transparent to-transparent opacity-60" />
                      </div>
                    ) : (
                      <>
                        <div className={`absolute inset-0 bg-gradient-to-br ${featuredPost.gradient || 'from-indigo-500 via-blue-500 to-cyan-400'} opacity-20`} />
                        <div className="absolute inset-0 flex items-center justify-center p-12">
                           <div className="w-full h-full rounded-2xl border border-white/10 bg-[#0a0a0f] flex items-center justify-center relative shadow-2xl">
                              <Newspaper className="w-24 h-24 text-indigo-400 opacity-20" />
                              <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div animate={{ width: ['0%', '100%', '0%'] }} transition={{ duration: 5, repeat: Infinity }} className="h-full bg-indigo-500" />
                                 </div>
                                 <div className="h-1.5 w-1/3 bg-white/5 rounded-full" />
                              </div>
                           </div>
                        </div>
                      </>
                    )}
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-indigo-500 text-white">
                         {featuredPost.tag || 'Special Report'}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col flex-1">
                    <span className="text-emerald-400 font-mono text-[10px] uppercase tracking-widest mb-4">{featuredPost.category}</span>
                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6 group-hover:text-indigo-400 transition-colors leading-tight">
                      {featuredPost.title}
                    </h3>
                    <p className="text-white/40 text-lg mb-8 line-clamp-3 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                             <User className="w-5 h-5 text-indigo-400" />
                          </div>
                          <div className="text-left">
                             <div className="text-white font-bold text-sm tracking-tight">{featuredPost.author?.name || featuredPost.author || 'Neural Node'}</div>
                             <div className="text-white/40 text-xs">{featuredPost.date} • {featuredPost.readTime || '5 min read'}</div>
                          </div>
                       </div>
                       <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                          <ArrowUpRight className="w-6 h-6" />
                       </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* List Profile Posts */}
          <div className="space-y-8 lg:space-y-12">
            {otherPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="group relative"
              >
                <Link href={`/blog/${post.id}`}>
                  <div className="bg-white/0 hover:bg-white/5 p-6 lg:p-10 rounded-3xl border border-transparent hover:border-white/10 transition-all duration-300 flex flex-col sm:flex-row gap-8">
                    <div className={`sm:w-40 h-40 shrink-0 bg-[#05050a] rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center group-hover:border-white/20 transition-colors`}>
                       {post.imageUrl ? (
                         <img 
                           src={post.imageUrl} 
                           alt={post.title}
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                         />
                       ) : (
                         <>
                           <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient || 'from-indigo-500 via-blue-500 to-cyan-400'} opacity-10`} />
                           <Bookmark className="w-10 h-10 text-white/10 group-hover:text-white/30 transition-colors" />
                         </>
                       )}
                    </div>
                    <div className="flex-1 flex flex-col">
                      <span className="text-emerald-400 font-mono text-[10px] uppercase tracking-widest mb-2">{post.category}</span>
                      <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors line-clamp-2 leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-white/40 text-sm mb-6 line-clamp-2">{post.excerpt}</p>
                      <div className="mt-auto flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-white/30">
                        <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {post.author?.name || post.author || 'Neural Node'}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime || '5 min read'}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            
            <motion.div 
               initial={{ opacity: 0 }}
               animate={isInView ? { opacity: 1 } : {}}
               transition={{ delay: 0.8 }}
               className="pt-8"
            >
               <Link href="/blog" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-bold tracking-tight group transition-colors px-10">
                  Read More Insights
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
