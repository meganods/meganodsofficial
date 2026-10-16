"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Clock, User, Newspaper, Bookmark } from 'lucide-react'
import { collection, query, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import { DeepTechBackground } from '@/components/ui/deep-tech-background'
import { defaultBlogs } from '@/lib/data/blogs'

export function BlogPreviewSection() {
  const [posts, setPosts] = useState<any[]>(defaultBlogs.slice(0, 3))
  const [isLoading, setIsLoading] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'), limit(3))
        const querySnapshot = await getDocs(q)
        if (!querySnapshot.empty) {
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
        }
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
    <section ref={ref} className="relative py-28 lg:py-48 bg-background overflow-hidden" id="blog">
      <DeepTechBackground />
      
      <div className="relative container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20 lg:mb-32">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="text-indigo-600 dark:text-indigo-400 font-mono text-[11px] uppercase tracking-[0.35em] mb-3 font-bold flex items-center gap-3"
            >
              <div className="w-8 h-px bg-indigo-600/50" />
              INTELLIGENCE & INSIGHTS
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight"
            >
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-600">Tech Insights</span> & News.
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
              className="border-border bg-card/60 hover:bg-secondary text-foreground h-14 px-8 rounded-2xl backdrop-blur-md"
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
              <Link href={`/blog/${featuredPost.slug || featuredPost.id}`}>
                <div className="relative bg-card/80 backdrop-blur-xl border border-border rounded-[2.5rem] overflow-hidden flex flex-col h-full hover:border-indigo-500/30 transition-all duration-500 shadow-md">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {featuredPost.imageUrl ? (
                      <div className="absolute inset-0">
                        <img 
                          src={featuredPost.imageUrl} 
                          alt={featuredPost.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                      </div>
                    ) : (
                      <>
                        <div className={`absolute inset-0 bg-gradient-to-br ${featuredPost.gradient || 'from-indigo-500 via-blue-500 to-cyan-400'} opacity-20`} />
                        <div className="absolute inset-0 flex items-center justify-center p-12">
                           <div className="w-full h-full rounded-2xl border border-border bg-secondary flex items-center justify-center relative shadow-2xl">
                              <Newspaper className="w-24 h-24 text-indigo-500 dark:text-indigo-400 opacity-20" />
                              <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                                 <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                                    <motion.div animate={{ width: ['0%', '100%', '0%'] }} transition={{ duration: 5, repeat: Infinity }} className="h-full bg-indigo-500" />
                                 </div>
                                 <div className="h-1.5 w-1/3 bg-border rounded-full" />
                              </div>
                           </div>
                        </div>
                      </>
                    )}
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-indigo-600 text-white shadow-sm">
                         {featuredPost.tag || 'Special Report'}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col flex-1">
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[10px] uppercase tracking-widest mb-4">{featuredPost.category}</span>
                    <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
                      {featuredPost.title}
                    </h3>
                    <p className="text-muted-foreground text-lg mb-8 line-clamp-3 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="mt-auto pt-8 border-t border-border flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center">
                             <User className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                          </div>
                          <div className="text-left">
                             <div className="text-foreground font-bold text-sm tracking-tight">{featuredPost.author?.name || featuredPost.author || 'Neural Node'}</div>
                             <div className="text-muted-foreground text-xs">{featuredPost.date} • {featuredPost.readTime || '5 min read'}</div>
                          </div>
                       </div>
                       <div className="w-12 h-12 rounded-full bg-indigo-600 text-white dark:bg-white dark:text-black flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
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
                <Link href={`/blog/${post.slug || post.id}`}>
                  <div className="bg-transparent hover:bg-card p-6 lg:p-10 rounded-3xl border border-transparent hover:border-border hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-8">
                    <div className={`sm:w-40 h-40 shrink-0 bg-secondary rounded-2xl border border-border relative overflow-hidden flex items-center justify-center group-hover:border-indigo-500/20 transition-colors`}>
                       {post.imageUrl ? (
                         <img 
                           src={post.imageUrl} 
                           alt={post.title}
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                           loading="lazy"
                           decoding="async"
                         />
                       ) : (
                         <>
                           <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient || 'from-indigo-500 via-blue-500 to-cyan-400'} opacity-10`} />
                           <Bookmark className="w-10 h-10 text-muted-foreground/20 group-hover:text-muted-foreground/40 transition-colors" />
                         </>
                       )}
                    </div>
                    <div className="flex-1 flex flex-col">
                      <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[10px] uppercase tracking-widest mb-2">{post.category}</span>
                      <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-6 line-clamp-2">{post.excerpt}</p>
                      <div className="mt-auto flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">
                        <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {post.author?.name || post.author || 'Neural Node'}</span>
                        <span className="w-1 h-1 rounded-full bg-border" />
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
               <Link href="/blog" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-bold tracking-tight group transition-colors px-10">
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
