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
  Share2
} from "lucide-react"
import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs, limit, doc, getDoc } from "firebase/firestore"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface BlogDetailViewProps {
  initialPost?: any
  initialRelatedPosts?: any[]
  slug: string
}

export function BlogDetailView({ initialPost, initialRelatedPosts = [], slug }: BlogDetailViewProps) {
  const [post, setPost] = useState<any>(initialPost || null)
  const [relatedPosts, setRelatedPosts] = useState<any[]>(initialRelatedPosts)
  const [isLoading, setIsLoading] = useState(!initialPost)

  useEffect(() => {
    if (initialPost) {
      setPost(initialPost)
      setRelatedPosts(initialRelatedPosts)
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

        if (postData) {
          setPost(postData)
          
          // Fetch related
          const relatedQ = query(collection(db, "blogs"), where("category", "==", postData.category), limit(4))
          const relatedSnap = await getDocs(relatedQ)
          setRelatedPosts(relatedSnap.docs.map(d => ({ id: d.id, ...d.data() })).filter((d: any) => d.id !== postData.id))
        } else {
          toast.error("EDITORIAL_NODE_NOT_FOUND")
        }
      } catch (error) {
        console.error("BLOG_DETAIL_FETCH_ERROR:", error)
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

          <div className="container mx-auto px-6 lg:px-8 relative z-10 pt-40 lg:pt-56 pb-20">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Link href="/blog" className="inline-flex items-center gap-3 text-muted-foreground hover:text-primary transition-all font-mono text-[10px] uppercase tracking-[0.4em] mb-12">
                <ArrowLeft className="w-4 h-4" /> Back to Intelligence Grid
              </Link>

              <div className="flex items-center gap-4 mb-8">
                 <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                 <span className="text-primary font-mono text-[11px] uppercase tracking-[0.4em] font-black">{post.category}</span>
              </div>

              <h1 className="text-4xl md:text-7xl lg:text-9xl font-black mb-10 tracking-tighter leading-none uppercase max-w-6xl">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-12 gap-y-8 pt-8 border-t border-border">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-[1.2rem] overflow-hidden border border-border bg-secondary">
                     <img src={post.author?.avatarUrl || `https://i.pravatar.cc/400?${post.author?.name?.toLowerCase().includes('virat') ? 'img=11' : `u=${encodeURIComponent(post.author?.name || 'author')}`}`} alt={post.author?.name || 'Author'} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-black text-xl tracking-tight uppercase leading-none mb-1 text-foreground">{post.author?.name || 'Neural Node'}</p>
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-bold">{post.author?.role || 'Strategic Director'}</p>
                  </div>
                </div>
                
                <div className="flex gap-10">
                   <div className="space-y-1">
                      <p className="text-[9px] font-mono text-muted-foreground/40 uppercase tracking-widest">Release Date</p>
                      <p className="text-sm font-black uppercase text-foreground/75 tracking-tight">{post.date}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[9px] font-mono text-muted-foreground/40 uppercase tracking-widest">Intake Span</p>
                      <p className="text-sm font-black uppercase text-foreground/75 tracking-tight">{post.readTime || '5 min read'}</p>
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

                {/* Tactical Footer Segment */}
                <div className="mt-40 pt-20 border-t border-border">
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
          <section className="py-32 lg:py-56 bg-secondary/20 border-t border-border">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="flex items-center justify-between mb-24">
                 <div className="space-y-4">
                    <span className="text-primary font-mono text-[10px] uppercase tracking-[0.4em] font-black">Nodal Recommendations</span>
                    <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter leading-none">Related <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Intelligence</span>.</h2>
                 </div>
                 <Link href="/blog" className="hidden md:flex items-center gap-3 text-[10px] font-mono text-muted-foreground uppercase tracking-[0.4em] hover:text-primary transition-all font-black">
                    View Full Feed <ChevronRight className="w-4 h-4" />
                 </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                {relatedPosts.map((article, index) => (
                  <motion.article
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={`/blog/${article.slug || article.id}`}>
                      <div className="bg-card border border-border rounded-[3.5rem] p-8 h-full flex flex-col hover:border-primary/30 transition-all duration-700 shadow-2xl">
                        <div className="relative aspect-video overflow-hidden rounded-[2.5rem] mb-8 border border-border bg-secondary">
                          <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                        </div>
                        <h3 className="text-2xl font-black text-foreground group-hover:text-primary transition-colors leading-tight tracking-tighter uppercase mb-6">
                          {article.title}
                        </h3>
                        <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
                           <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.3em] font-black">{article.date}</p>
                           <ArrowRight className="w-5 h-5 text-primary/50 group-hover:text-primary transition-colors" />
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
