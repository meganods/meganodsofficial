"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { 
  ArrowLeft, 
  ArrowRight,
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Bookmark, 
  ThumbsUp, 
  MessageCircle, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Copy,
  Loader2,
  Database,
  Type,
  ChevronRight,
  Share,
  Mail
} from "lucide-react"
import { use, useState, useEffect } from "react"
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, limit, doc, getDoc } from "firebase/firestore";
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider"
import { Button } from "@/components/ui/button"
import { toast } from "sonner";

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const [post, setPost] = useState<any>(null)
  const [relatedPosts, setRelatedPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const q = query(collection(db, "blogs"), where("slug", "==", resolvedParams.slug), limit(1));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          const postData = { id: docSnap.id, ...docSnap.data() } as any;
          setPost(postData);
          
          // Fetch related
          const relatedQ = query(collection(db, "blogs"), where("category", "==", postData.category), limit(4));
          const relatedSnap = await getDocs(relatedQ);
          setRelatedPosts(relatedSnap.docs.map(d => ({ id: d.id, ...d.data() })).filter((d: any) => d.id !== postData.id));
        } else {
          toast.error("EDITORIAL_NODE_NOT_FOUND");
        }
      } catch (error) {
        console.error("BLOG_DETAIL_FETCH_ERROR:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPost();
  }, [resolvedParams.slug])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#010103] flex flex-col items-center justify-center gap-8">
         <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
         <p className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.5em] animate-pulse">Resolving Editorial Nodal Data...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#010103] flex flex-col items-center justify-center gap-8 px-6 text-center">
         <Database className="w-20 h-20 text-white/5" />
         <div className="space-y-4">
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Node Terminated</h1>
            <p className="text-white/40 font-mono text-sm uppercase tracking-widest leading-relaxed">The requested editorial intelligence node does not exist or has been purged from the mesh.</p>
         </div>
         <Link href="/blog">
            <Button className="h-16 px-10 bg-indigo-600 hover:bg-white hover:text-black rounded-2xl font-black uppercase text-xs tracking-widest transition-all">
               Return to Feed Network
            </Button>
         </Link>
      </div>
    )
  }

  return (
    <SmoothScrollProvider>
      <Navigation />
      <main className="min-h-screen bg-[#010103] text-white selection:bg-indigo-500/30">
        
        {/* Cinematic Header Segment */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 h-[80vh]">
            {post.imageUrl ? (
               <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
            ) : (
               <div className="w-full h-full bg-[#05050a]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-[#010103]/60 via-[#010103]/80 to-[#010103]" />
          </div>

          <div className="container mx-auto px-6 lg:px-8 relative z-10 pt-40 lg:pt-56 pb-20">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Link href="/blog" className="inline-flex items-center gap-3 text-white/40 hover:text-indigo-400 transition-all font-mono text-[10px] uppercase tracking-[0.4em] mb-12">
                <ArrowLeft className="w-4 h-4" /> Back to Intelligence Grid
              </Link>

              <div className="flex items-center gap-4 mb-8">
                 <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                 <span className="text-indigo-400 font-mono text-[11px] uppercase tracking-[0.4em] font-black">{post.category}</span>
              </div>

              <h1 className="text-4xl md:text-7xl lg:text-9xl font-black mb-10 tracking-tighter leading-none uppercase max-w-6xl">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-12 gap-y-8 pt-8 border-t border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-[1.2rem] overflow-hidden border border-white/10 bg-black">
                     {post.author?.avatarUrl ? (
                        <img src={post.author.avatarUrl} alt={post.author.name} className="w-full h-full object-cover" />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center">
                           <User className="w-8 h-8 text-white/20" />
                        </div>
                     )}
                  </div>
                  <div>
                    <p className="font-black text-xl tracking-tight uppercase leading-none mb-1">{post.author?.name || 'Neural Node'}</p>
                    <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest font-bold">{post.author?.role || 'Strategic Director'}</p>
                  </div>
                </div>
                
                <div className="flex gap-10">
                   <div className="space-y-1">
                      <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Release Date</p>
                      <p className="text-sm font-black uppercase text-white/60 tracking-tight">{post.date}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Intake Span</p>
                      <p className="text-sm font-black uppercase text-white/60 tracking-tight">{post.readTime}</p>
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
                    <h3 className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.5em] font-black">Nodal Uplink</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { icon: Twitter, label: "Twitter" },
                        { icon: Linkedin, label: "LinkedIn" },
                        { icon: Mail, label: "Mail" },
                        { icon: Share2, label: "Global" }
                      ].map((item, i) => (
                        <button key={i} className="h-16 rounded-[1.2rem] bg-white/5 border border-white/5 flex flex-col items-center justify-center gap-2 hover:bg-white hover:text-black transition-all group">
                          <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          <span className="text-[7px] font-mono uppercase tracking-widest opacity-40 group-hover:opacity-100">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-8">
                    <h3 className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.5em] font-black">Meta Taxonomy</h3>
                    <div className="flex flex-wrap gap-2">
                       {post.tags?.map((tag: string, i: number) => (
                         <span key={i} className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[9px] font-mono text-white/40 uppercase tracking-widest hover:border-indigo-500/50 hover:text-indigo-400 transition-all cursor-pointer">
                            #{tag.trim()}
                         </span>
                       ))}
                    </div>
                  </div>

                  <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/10 to-transparent border border-white/5">
                     <p className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.3em] font-black mb-6">Strategic Alert</p>
                     <p className="text-sm font-medium text-white/50 leading-relaxed">This editorial intelligence report is part of our global technological audit for the fiscal cycle.</p>
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
                    className="editorial-mesh text-white/60 text-lg lg:text-xl leading-[1.8] font-medium 
                      prose-headings:text-white prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
                      prose-h2:text-4xl lg:text-5xl prose-h2:mt-24 prose-h2:mb-10 prose-h2:pb-4 prose-h2:border-b prose-h2:border-white/5
                      prose-h3:text-2xl lg:text-3xl prose-h3:mt-12 prose-h3:mb-6
                      prose-p:mb-8 prose-p:text-balance
                      prose-ul:space-y-4 prose-ul:mb-10 prose-li:marker:text-indigo-500
                      prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-white/5 prose-blockquote:rounded-2xl prose-blockquote:py-10 prose-blockquote:px-12 prose-blockquote:not-italic prose-blockquote:text-white prose-blockquote:font-black prose-blockquote:text-2xl lg:text-3xl prose-blockquote:tracking-tight prose-blockquote:my-16
                      prose-strong:text-white prose-strong:font-black
                      prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
                    "
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </motion.div>

                {/* Tactical Footer Segment */}
                <div className="mt-40 pt-20 border-t border-white/10">
                   <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                      <div className="flex items-center gap-6">
                         <div className="w-20 h-20 rounded-[2rem] bg-indigo-500 flex items-center justify-center shadow-2xl shadow-indigo-500/20">
                            <Share className="w-8 h-8 text-white" />
                         </div>
                         <div className="space-y-1">
                            <h4 className="text-xl font-black uppercase tracking-tight">Deploy Intelligence</h4>
                            <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] font-bold">Synchronize this report with your network</p>
                         </div>
                      </div>
                      <div className="flex gap-4">
                         <Button className="h-16 px-10 bg-white text-black hover:bg-indigo-500 hover:text-white rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-2xl border-0">Establishing Node Uplink</Button>
                      </div>
                   </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Global Related Network */}
        <section className="py-32 lg:py-56 bg-[#05050a]/40 border-t border-white/5">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between mb-24">
               <div className="space-y-4">
                  <span className="text-indigo-400 font-mono text-[10px] uppercase tracking-[0.4em] font-black">Nodal Recommendations</span>
                  <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter leading-none">Related <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Intelligence</span>.</h2>
               </div>
               <Link href="/blog" className="hidden md:flex items-center gap-3 text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] hover:text-indigo-400 transition-all font-black">
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
                  <Link href={`/blog/${article.slug}`}>
                    <div className="bg-[#010103] border border-white/10 rounded-[3.5rem] p-8 h-full flex flex-col hover:border-indigo-500/30 transition-all duration-700 shadow-2xl">
                      <div className="relative aspect-video overflow-hidden rounded-[2.5rem] mb-8 border border-white/5">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors leading-tight tracking-tighter uppercase mb-6">
                        {article.title}
                      </h3>
                      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                         <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em] font-black">{article.date}</p>
                         <ArrowRight className="w-5 h-5 text-indigo-400/50 group-hover:text-indigo-400 transition-colors" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
