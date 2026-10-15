"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Star, 
  MessageSquare, 
  User, 
  Quote, 
  ArrowRight, 
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  Loader2,
  Database
} from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider"
import { DeepTechBackground } from "@/components/ui/deep-tech-background"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

import { defaultTestimonials } from "@/lib/data/testimonials"

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>(defaultTestimonials)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docs = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          if (docs.length > 0) {
            setTestimonials(docs);
          }
        }
      } catch (error) {
        console.warn("TESTIMONIALS_FETCH_FALLBACK_DEFAULT:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTestimonials();
  }, [])

  return (
    <SmoothScrollProvider>
      <Navigation />
      <main className="min-h-screen bg-[#010103] text-white selection:bg-indigo-500/30">
        <div className="fixed inset-0 pointer-events-none z-0">
           <DeepTechBackground />
        </div>

        {/* Cinematic Header */}
        <section className="relative pt-32 lg:pt-56 pb-20 z-10 px-6 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[160px] pointer-events-none" />
            <div className="container mx-auto max-w-7xl text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-indigo-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-12 shadow-2xl shadow-indigo-500/10 font-bold"
                >
                   <ShieldCheck className="w-4 h-4" />
                   Verification Protocol 1.0
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl md:text-8xl lg:text-[10rem] font-black mb-12 tracking-tighter leading-[0.85] uppercase"
                >
                  Market <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-400 to-emerald-400">Authority</span>.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl lg:text-3xl text-white/40 max-w-4xl mx-auto mb-16 leading-relaxed font-black uppercase tracking-tight"
                >
                  Direct auditing reports from our global partner nodes and strategic deployment successes.
                </motion.p>
            </div>
        </section>

        {/* Global Feedback Matrix */}
        <section className="py-24 relative z-10">
          <div className="container mx-auto px-6 lg:px-8">
            {isLoading ? (
               <div className="flex flex-col items-center justify-center py-60 gap-8">
                  <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
                  <p className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.5em] animate-pulse font-black leading-none">Synchronizing with Decentralized Registry...</p>
               </div>
            ) : testimonials.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-60 gap-8 border border-dashed border-white/10 rounded-[4rem]">
                   <Database className="w-16 h-16 text-white/5" />
                   <div className="text-center">
                      <h3 className="text-4xl font-black text-white uppercase tracking-tighter">Registry Idle</h3>
                      <p className="text-xl text-white/20 font-black uppercase mt-4 tracking-widest">No verified feedback nodes detected in current mesh.</p>
                   </div>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-40">
                  {testimonials.map((node, i) => (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group relative bg-[#05050a]/40 backdrop-blur-3xl border border-white/5 rounded-[4rem] p-12 overflow-hidden hover:border-indigo-500/20 transition-all duration-700 shadow-2xl"
                    >
                        <Quote className="absolute -top-8 -left-8 w-40 h-40 text-indigo-500/[0.03] group-hover:text-indigo-500/[0.05] transition-colors -rotate-12" />
                        
                        <div className="flex gap-1 mb-8">
                           {[...Array(5)].map((_, j) => (
                             <Star key={j} className={`w-4 h-4 ${j < (node.rating || 5) ? 'text-amber-400 fill-amber-400' : 'text-white/5'}`} />
                           ))}
                        </div>

                        <p className="text-xl text-white/60 leading-relaxed font-black mb-12 relative z-10 tracking-tight italic uppercase">
                           "{node.content}"
                        </p>

                        <div className="flex items-center gap-6 mt-auto">
                            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/10 group-hover:border-indigo-500/50 transition-colors">
                               {node.avatar ? (
                                 <img src={node.avatar} className="w-full h-full object-cover" alt={node.name} />
                               ) : (
                                 <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                    <User className="w-6 h-6 text-white/20" />
                                 </div>
                               )}
                            </div>
                            <div className="flex-1">
                               <h3 className="text-2xl font-black text-white tracking-tighter leading-none uppercase mb-2">{node.name}</h3>
                               <p className="text-indigo-400 font-mono text-[9px] uppercase tracking-[0.2em] font-black opacity-60 font-mono">{node.role}</p>
                            </div>
                        </div>

                        {/* Kinetic Node Tag */}
                        <div className="absolute top-12 right-12">
                           <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 group-hover:border-indigo-500/20 transition-all">
                              <Zap className="w-3 h-3 text-indigo-400" />
                              <span className="text-[9px] font-black uppercase text-white/20 tracking-widest font-mono">{node.tag || 'DEIFIED NODE'}</span>
                           </div>
                        </div>
                    </motion.div>
                  ))}
                </div>
            )}
          </div>
        </section>

        {/* Quality Assurance & Verification Standards Section */}
        <section className="py-24 relative z-10 px-6 border-t border-white/5 bg-white/[0.01]">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[10px] uppercase tracking-[0.3em] font-bold mb-4">
                <ShieldCheck className="w-3.5 h-3.5" /> Quality Assurance Protocol
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
                How We Guarantee Client Success
              </h2>
              <p className="text-white/50 text-sm md:text-base mt-4 leading-relaxed font-normal">
                Every testimonial represents a verified production rollout backed by deterministic service level agreements, transparent milestones, and enterprise security compliance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-mono font-black text-base mb-6">
                  01
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Milestone-Based Acceptance</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  We operate strictly under objective acceptance criteria. Invoices and phase transitions are tied directly to demonstrable software deliverables verified in isolated staging environments.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-mono font-black text-base mb-6">
                  02
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Automated Security Auditing</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Before any deployment touches production, our automated pipelines execute end-to-end vulnerability scanning, dependency auditing, and strict zero-trust network access validation.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-mono font-black text-base mb-6">
                  03
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Enterprise SLA Support</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Our engagement does not end at deployment. We provide multi-tier incident support, sub-hour emergency response times, and automated uptime telemetry monitoring.
                </p>
              </div>
            </div>

            {/* Empirical Satisfaction Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-white/[0.02] border border-white/5 text-center">
              <div>
                <div className="text-3xl lg:text-4xl font-black text-white mb-1">98.4%</div>
                <div className="text-xs font-mono uppercase tracking-widest text-indigo-400">Client Retention</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-black text-white mb-1">50+</div>
                <div className="text-xs font-mono uppercase tracking-widest text-emerald-400">Systems Shipped</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-black text-white mb-1">&lt; 1 Hour</div>
                <div className="text-xs font-mono uppercase tracking-widest text-cyan-400">SLA Response</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-black text-white mb-1">100%</div>
                <div className="text-xs font-mono uppercase tracking-widest text-amber-400">Verified NDA</div>
              </div>
            </div>
          </div>
        </section>

        {/* Cinematic CTA */}
        <section className="py-40 relative z-10 px-6">
           <div className="container mx-auto max-w-5xl">
              <div className="relative rounded-[5rem] border border-white/10 bg-[#05050a]/40 backdrop-blur-3xl overflow-hidden p-1 shadow-2xl">
                 <div className="relative p-24 lg:p-40 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-blue-500/10 pointer-events-none" />
                    <Activity className="w-20 h-20 text-indigo-400/20 mx-auto mb-16" />
                    
                    <h2 className="text-5xl md:text-8xl font-black text-white mb-12 tracking-tighter leading-[0.85] uppercase">
                       Deploy <br />
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-400 to-emerald-400 text-glow">Success</span>.
                    </h2>
                    <p className="text-white/40 text-2xl lg:text-3xl mb-20 max-w-3xl mx-auto font-black uppercase tracking-tight">
                       Collaborate with the world's most advanced technical architects and establish your market authority.
                    </p>
                    <div className="flex justify-center">
                       <Button 
                          asChild
                          className="h-28 px-24 bg-white text-black hover:bg-white/90 font-black rounded-[2.5rem] shadow-2xl transition-all text-3xl group border-0"
                       >
                          <Link href="/contact" className="flex items-center">
                             Audit Now
                             <ArrowRight className="ml-6 w-10 h-10 group-hover:translate-x-4 transition-transform" />
                          </Link>
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
