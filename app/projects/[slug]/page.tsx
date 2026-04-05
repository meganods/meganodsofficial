"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Clock, CheckCircle, ArrowRight, Loader2, Database, ShieldCheck, Zap } from "lucide-react"
import { use, useEffect, useState } from "react"
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const [project, setProject] = useState<any>(null)
  const [relatedProjects, setRelatedProjects] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProjectData = async () => {
      setIsLoading(true);
      try {
        // Fetch current project
        const q = query(collection(db, "projects"), where("slug", "==", resolvedParams.slug), limit(1));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const projectData = querySnapshot.docs[0].data();
          setProject(projectData);

          // Fetch related projects (different from current)
          const relatedQ = query(collection(db, "projects"), limit(4));
          const relatedSnapshot = await getDocs(relatedQ);
          const related = relatedSnapshot.docs
            .map(doc => doc.data())
            .filter(p => p.slug !== resolvedParams.slug)
            .slice(0, 3);
          setRelatedProjects(related);
        }
      } catch (error) {
        console.error("FIREBASE_NODE_ERROR:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjectData();
  }, [resolvedParams.slug])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#010103] flex flex-col items-center justify-center gap-6 text-white">
        <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
        <p className="text-xs font-mono text-indigo-400 uppercase tracking-[0.5em] animate-pulse">Resolving Nodal Data...</p>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#010103] flex flex-col items-center justify-center gap-6 text-white">
        <Database className="w-16 h-16 text-white/5" />
        <h2 className="text-3xl font-black text-white">Node Not Found</h2>
        <Link href="/projects">
          <button className="h-14 px-8 border border-white/10 rounded-2xl font-mono text-xs uppercase tracking-widest text-white/40 hover:text-white mt-10">
            Return to Registry
          </button>
        </Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#010103] text-white selection:bg-indigo-500/30">
      <Navigation />
      
      {/* Refined Hero Architecture - Split Design */}
      <section className="relative pt-32 lg:pt-40 px-6 lg:px-12">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <Link 
              href="/projects"
              className="inline-flex items-center gap-3 text-[10px] font-mono text-indigo-400 uppercase tracking-[0.4em] mb-8 hover:opacity-70 transition-opacity"
            >
              <ArrowLeft className="w-4 h-4" />
              Registry Archive
            </Link>

            <div className="flex gap-4 mb-6">
               <span className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-[9px] font-black uppercase tracking-widest">
                 <Zap className="w-3.5 h-3.5" />
                 {project.category}
               </span>
               <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-md text-white/40 border border-white/5 rounded-full text-[9px] font-black uppercase tracking-widest">
                 {project.year} PROTOCOL
               </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-7xl font-black max-w-4xl tracking-tighter leading-[1.1] uppercase mb-10">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-10 text-[9px] font-mono uppercase tracking-[0.3em] opacity-60">
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-indigo-500" />
                <span>Client:</span>
                <span className="font-black text-white">{project.client}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-indigo-500" />
                <span>Operational Span:</span>
                <span className="font-black text-white">{project.duration}</span>
              </div>
            </div>
          </motion.div>

          {/* Elevated Hero Image Container */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="relative aspect-[21/9] rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden border border-white/10 shadow-3xl group mb-24"
          >
             <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#010103]/60 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="pb-24 lg:pb-40 relative z-10 px-6">
         <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
               {/* Fixed content positioning at bottom as requested */}
               <div className="lg:col-span-8 space-y-20">
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                     <h2 className="text-xl font-black uppercase tracking-[0.4em] text-indigo-500 mb-8 border-b border-indigo-500/20 pb-4 inline-block">Case Brief</h2>
                     <p className="text-lg lg:text-2xl text-white/60 leading-relaxed font-medium max-w-4xl">
                        {project.description}
                     </p>
                  </motion.div>

                  <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                     <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-10 group transition-all hover:bg-white/[0.04]">
                        <div className="w-10 h-10 rounded-xl bg-red-500/5 text-red-500 flex items-center justify-center font-black mb-6 border border-red-500/10 text-xs">01</div>
                        <h3 className="text-base font-black uppercase tracking-widest mb-4 text-white/90">The Challenge</h3>
                        <p className="text-sm text-white/40 leading-relaxed">{project.challenge}</p>
                     </motion.div>
                     <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-10 group transition-all hover:bg-white/[0.04]">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/5 text-indigo-500 flex items-center justify-center font-black mb-6 border border-indigo-500/10 text-xs">02</div>
                        <h3 className="text-base font-black uppercase tracking-widest mb-4 text-white/90">Strategic Solution</h3>
                        <p className="text-sm text-white/40 leading-relaxed">{project.solution}</p>
                     </motion.div>
                  </div>
               </div>

               <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-40">
                  <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-indigo-600/20 relative overflow-hidden">
                     <h4 className="text-[9px] font-black uppercase tracking-[0.5em] mb-10 opacity-70">Impact Metrics</h4>
                     <div className="space-y-8 relative z-10">
                        {project.results?.map((res: any, i: number) => (
                           <div key={i} className="space-y-1 border-b border-white/10 pb-8 last:border-0 last:pb-0">
                              <div className="text-3xl font-black tracking-tighter">{res.metric}</div>
                              <div className="text-[9px] font-mono uppercase tracking-widest opacity-60">{res.label}</div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-10">
                     <h4 className="text-[9px] font-black uppercase tracking-[0.5em] mb-8 text-indigo-500">Node protocols</h4>
                     <div className="flex flex-wrap gap-2">
                        {project.technologies?.map((tech: string, i: number) => (
                           <span key={i} className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-[9px] font-bold tracking-widest text-white/30">
                              {tech}
                           </span>
                        ))}
                     </div>
                  </div>
               </aside>
            </div>
         </div>
      </section>

      {/* Structured Media registry */}
      <section className="py-24 border-t border-white/5 relative">
         <div className="container mx-auto px-6 lg:px-12">
            <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 mb-16 text-center">Nodal Visual Feed</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {project.gallery?.map((img: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative aspect-video rounded-[2rem] overflow-hidden group border border-white/5 bg-black"
                  >
                     <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Testimonial - Structured */}
      <section className="py-32 lg:py-48 relative z-10 px-6">
         <div className="container mx-auto max-w-4xl text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-12">
               <div className="w-px h-20 bg-gradient-to-b from-indigo-500 to-transparent mx-auto" />
               <blockquote className="text-2xl md:text-4xl font-black tracking-tighter text-balance uppercase leading-[1.2]">
                  "{project.testimonial?.quote}"
               </blockquote>
               <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full border border-indigo-500/20 p-1">
                     <img src={project.testimonial?.avatar} className="w-full h-full rounded-full object-cover" />
                  </div>
                  <div>
                     <div className="text-base font-black uppercase tracking-widest">{project.testimonial?.author}</div>
                     <div className="text-[8px] font-mono text-indigo-500 uppercase tracking-[0.4em] mt-1 font-bold">{project.testimonial?.role}</div>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>

      <Footer />
    </main>
  )
}
