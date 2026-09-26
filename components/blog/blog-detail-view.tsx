"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { 
  ArrowLeft, 
  ArrowRight,
  Loader2,
  Database,
  ChevronRight,
  Share,
  Twitter,
  Linkedin,
  Mail,
  Share2,
  ShieldCheck,
  FileCheck2
} from "lucide-react"
import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs, limit, doc, getDoc } from "firebase/firestore"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

import { defaultBlogs } from "@/lib/data/blogs"

interface BlogDetailViewProps {
  initialPost?: any
  initialRelatedPosts?: any[]
  slug: string
}

export function BlogDetailView({ initialPost, initialRelatedPosts = [], slug }: BlogDetailViewProps) {
  const [post, setPost] = useState<any>(() => {
    if (initialPost) return initialPost
    return defaultBlogs.find(b => b.slug === slug || b.id === slug) || null
  })
  const [relatedPosts, setRelatedPosts] = useState<any[]>(() => {
    if (initialRelatedPosts.length > 0) return initialRelatedPosts
    return defaultBlogs.filter(b => b.slug !== slug).slice(0, 3)
  })
  const [isLoading, setIsLoading] = useState(!initialPost && !post)

  useEffect(() => {
    if (initialPost) {
      setPost(initialPost)
      setRelatedPosts(initialRelatedPosts.length > 0 ? initialRelatedPosts : defaultBlogs.filter(b => b.slug !== slug).slice(0, 3))
      setIsLoading(false)
      return
    }

    const fetchPost = async () => {
      try {
        const q = query(collection(db, "blogs"), where("slug", "==", slug), limit(1))
        const querySnapshot = await getDocs(q)
        
        let postData: any = null

        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0]
          postData = { id: docSnap.id, ...docSnap.data() }
        } else {
          const docRef = doc(db, "blogs", slug)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            postData = { id: docSnap.id, ...docSnap.data() }
          }
        }

        if (!postData) {
          const fallback = defaultBlogs.find(b => b.slug === slug || b.id === slug)
          if (fallback) postData = fallback
        }

        if (postData) {
          setPost(postData)
          
          // Fetch related
          const relatedQ = query(collection(db, "blogs"), where("category", "==", postData.category), limit(4))
          const relatedSnap = await getDocs(relatedQ)
          if (!relatedSnap.empty) {
            setRelatedPosts(relatedSnap.docs.map(d => ({ id: d.id, ...d.data() })).filter((d: any) => d.id !== postData.id))
          } else {
            setRelatedPosts(defaultBlogs.filter(b => b.slug !== slug).slice(0, 3))
          }
        }
      } catch (error) {
        console.error("BLOG_DETAIL_FETCH_ERROR:", error)
        const fallback = defaultBlogs.find(b => b.slug === slug || b.id === slug)
        if (fallback) setPost(fallback)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPost()
  }, [slug, initialPost, initialRelatedPosts])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-8">
         <Loader2 className="w-16 h-16 text-primary animate-spin" />
         <p className="text-[10px] font-mono text-primary uppercase tracking-[0.5em] animate-pulse">Resolving Editorial Nodal Data...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-8 px-6 text-center">
         <Database className="w-20 h-20 text-muted-foreground/10" />
         <div className="space-y-4">
            <h2 className="text-4xl font-black text-foreground uppercase tracking-tighter">Node Terminated</h2>
            <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest leading-relaxed">The requested editorial intelligence node does not exist or has been purged from the mesh.</p>
         </div>
         <Link href="/blog">
            <Button className="h-16 px-10 bg-primary hover:bg-primary/95 text-primary-foreground rounded-2xl font-black uppercase text-xs tracking-widest transition-all">
               Return to Feed Network
            </Button>
         </Link>
      </div>
    )
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://www.meganods.com/blog/${slug}`
  const shareTitle = post.title || 'Meganods Article'

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: shareTitle, url: shareUrl })
      } catch {
        // Fallback to clipboard
        navigator.clipboard.writeText(shareUrl)
        toast.success("Link copied to clipboard!")
      }
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl)
      toast.success("Link copied to clipboard!")
    }
  }

  return (
    <SmoothScrollProvider>
      <Navigation />
      <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30">
        
        {/* Cinematic Header Segment */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 h-[80vh] bg-secondary">
            {post.imageUrl ? (
               <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
            ) : (
               <div className="w-full h-full bg-secondary" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
          </div>

          <div className="container mx-auto px-6 lg:px-8 relative z-10 pt-28 sm:pt-36 pb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Link href="/blog" className="inline-flex items-center gap-2.5 text-slate-500 hover:text-indigo-600 transition-colors font-mono text-xs uppercase tracking-[0.25em] mb-8 font-bold">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Insights
              </Link>

              <div className="flex items-center gap-3 mb-6">
                 <span className="px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-wider font-bold">
                   {post.category}
                 </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.2] text-slate-900 dark:text-foreground max-w-4xl mb-8">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-10 gap-y-6 pt-6 border-t border-slate-200 dark:border-border/80">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 dark:border-border bg-secondary shrink-0">
                     <img src={post.author?.avatar || post.author?.avatarUrl || `https://i.pravatar.cc/400?u=${encodeURIComponent(post.author?.name || 'author')}`} alt={post.author?.name || 'Author'} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-base tracking-tight text-slate-900 dark:text-slate-100">{post.author?.name || 'Meganods Team'}</p>
                    <p className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">{post.author?.role || 'Technical Contributor'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 text-xs font-mono">
                   <div className="space-y-0.5">
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Published</p>
                      <p className="font-bold text-slate-700 dark:text-slate-300">{post.date}</p>
                   </div>
                   <div className="space-y-0.5">
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Read Time</p>
                      <p className="font-bold text-slate-700 dark:text-slate-300">{post.readTime || '6 min read'}</p>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content & Sidebar Mesh */}
        <section className="pb-32 relative z-10">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-4 gap-20 xl:gap-32">
              
              {/* Tactical Sidebar */}
              <aside className="lg:col-span-1 hidden lg:block">
                <div className="sticky top-40 space-y-16">
                  <div className="space-y-8">
                    <h3 className="text-[10px] font-mono text-primary uppercase tracking-[0.5em] font-black">Nodal Uplink</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { 
                          icon: Twitter, 
                          label: "Twitter", 
                          onClick: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`, '_blank') 
                        },
                        { 
                          icon: Linkedin, 
                          label: "LinkedIn", 
                          onClick: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank') 
                        },
                        { 
                          icon: Mail, 
                          label: "Mail", 
                          onClick: () => window.open(`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`) 
                        },
                        { 
                          icon: Share2, 
                          label: "Global", 
                          onClick: handleShare 
                        }
                      ].map((item, i) => (
                        <button 
                          key={i} 
                          onClick={item.onClick}
                          className="h-16 rounded-[1.2rem] bg-card border border-border flex flex-col items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all group cursor-pointer"
                        >
                          <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          <span className="text-[7px] font-mono uppercase tracking-widest opacity-40 group-hover:opacity-100">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {post.tags && post.tags.length > 0 && (
                    <div className="space-y-8">
                      <h3 className="text-[10px] font-mono text-primary uppercase tracking-[0.5em] font-black">Meta Taxonomy</h3>
                      <div className="flex flex-wrap gap-2">
                         {post.tags.map((tag: string, i: number) => (
                           <span key={i} className="px-4 py-2 rounded-xl bg-card border border-border text-[9px] font-mono text-muted-foreground uppercase tracking-widest hover:border-primary/50 hover:text-primary transition-all cursor-pointer">
                              #{tag.trim()}
                           </span>
                         ))}
                      </div>
                    </div>
                  )}

                  <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/5 to-transparent border border-border">
                     <p className="text-[10px] font-mono text-primary uppercase tracking-[0.3em] font-black mb-6">Strategic Alert</p>
                     <p className="text-sm font-medium text-muted-foreground leading-relaxed">This editorial intelligence report is part of our global technological audit for the fiscal cycle.</p>
                  </div>
                </div>
              </aside>

              {/* Editorial Engine (Main Content) */}
              <article className="lg:col-span-3">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="prose-container"
                >
                  <div 
                    className="editorial-mesh text-foreground/80 text-lg lg:text-xl leading-[1.8] font-medium 
                      prose-headings:text-foreground prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
                      prose-h2:text-4xl lg:text-5xl prose-h2:mt-24 prose-h2:mb-10 prose-h2:pb-4 prose-h2:border-b prose-h2:border-border
                      prose-h3:text-2xl lg:text-3xl prose-h3:mt-12 prose-h3:mb-6
                      prose-p:mb-8 prose-p:text-balance
                      prose-ul:space-y-4 prose-ul:mb-10 prose-li:marker:text-primary
                      prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-secondary/40 prose-blockquote:rounded-2xl prose-blockquote:py-10 prose-blockquote:px-12 prose-blockquote:not-italic prose-blockquote:text-foreground prose-blockquote:font-black prose-blockquote:text-2xl lg:text-3xl prose-blockquote:tracking-tight prose-blockquote:my-16
                      prose-strong:text-foreground prose-strong:font-black
                      prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    "
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </motion.div>

                {/* Editorial Standards & Technical Fact-Checking Trust Box */}
                <div className="mt-16 p-6 sm:p-7 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/20">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        Peer-Reviewed Engineering Article
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold">
                          ✓ Fact Checked
                        </span>
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                        Authored by senior engineering practitioners. Verified for production reproducibility and accuracy.
                      </p>
                    </div>
                  </div>
                  <div className="text-[11px] font-mono text-indigo-700 dark:text-indigo-400 font-bold shrink-0">
                    Meganods Editorial Policy
                  </div>
                </div>

                {/* Author Bio & E-E-A-T Verification Box */}
                {post.author && (
                  <div className="mt-8 p-8 sm:p-10 rounded-3xl bg-slate-50 dark:bg-card border border-slate-200 dark:border-border shadow-sm">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-indigo-500/20 bg-indigo-50 dark:bg-indigo-950/40">
                        <img 
                          src={post.author.avatar || post.author.avatarUrl || `https://i.pravatar.cc/400?u=${encodeURIComponent(post.author.name || 'author')}`} 
                          alt={post.author.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">{post.author.name}</h4>
                          <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider">
                            {post.author.role || 'Senior Technical Contributor'}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                          {post.author.bio || 'Principal engineer and distributed systems architect researching scalable infrastructure and AI deployment workflows.'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tactical Footer Segment */}
                <div className="mt-24 pt-16 border-t border-border">
                   <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                      <div className="flex items-center gap-6">
                         <div className="w-20 h-20 rounded-[2rem] bg-primary flex items-center justify-center shadow-2xl shadow-primary/20">
                            <Share className="w-8 h-8 text-primary-foreground" />
                          </div>
                          <div className="space-y-1">
                             <h4 className="text-xl font-black uppercase tracking-tight text-foreground">Deploy Intelligence</h4>
                             <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.4em] font-bold">Synchronize this report with your network</p>
                          </div>
                      </div>
                      <div className="flex gap-4">
                         <Button 
                           onClick={handleShare}
                           className="h-16 px-10 bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-2xl border-0 cursor-pointer"
                         >
                           Share Intelligence
                         </Button>
                      </div>
                   </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Global Related Network */}
        {relatedPosts.length > 0 && (
          <section className="py-20 lg:py-28 bg-slate-50/70 dark:bg-secondary/15 border-t border-border">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                 <div className="space-y-2">
                    <span className="text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-widest font-bold">Recommended Reading</span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-foreground">
                      Related <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Intelligence</span>
                    </h2>
                 </div>
                 <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-indigo-600 transition-colors font-bold uppercase tracking-wider">
                    View All Articles <ChevronRight className="w-4 h-4" />
                 </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((article, index) => (
                  <motion.article
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={`/blog/${article.slug || article.id}`}>
                      <div className="bg-white dark:bg-card border border-slate-200 dark:border-border rounded-3xl p-6 h-full flex flex-col hover:border-indigo-400 hover:shadow-xl transition-all duration-300">
                        <div className="relative aspect-video overflow-hidden rounded-2xl mb-6 border border-slate-100 dark:border-border bg-slate-100 dark:bg-secondary">
                          <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug tracking-tight mb-4">
                          {article.title}
                        </h3>
                        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-border flex items-center justify-between">
                           <p className="text-xs font-mono text-slate-500 font-semibold">{article.date}</p>
                           <ArrowRight className="w-4 h-4 text-indigo-500 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
