"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider'
import { DeepTechBackground } from '@/components/ui/deep-tech-background'
import { 
  ArrowLeft,
  Linkedin, 
  Twitter, 
  Github, 
  Mail,
  Loader2,
  Terminal,
  Cpu,
  Globe,
  Award
} from 'lucide-react'
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Button } from '@/components/ui/button'
import { defaultTeam } from '@/lib/data/team'

export default function TeamMemberPage() {
  const params = useParams()
  const router = useRouter()
  const [member, setMember] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMember = async () => {
      const id = params?.id as string
      if (!id) return;
      try {
        const docRef = doc(db, "team", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setMember({ id: docSnap.id, ...docSnap.data() });
        } else {
          // Check static defaultTeam fallback
          const staticMatch = defaultTeam.find(m => m.id === id || m.slug === id);
          if (staticMatch) {
            setMember(staticMatch);
          } else {
            router.push('/team');
          }
        }
      } catch (error) {
        console.warn("MEMBER_FETCH_FALLBACK_DEFAULT:", error);
        const staticMatch = defaultTeam.find(m => m.id === id || m.slug === id);
        if (staticMatch) {
          setMember(staticMatch);
        } else {
          router.push('/team');
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchMember();
  }, [params.id, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-8">
        <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
        <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.5em] animate-pulse">Resolving Node Data...</p>
      </div>
    )
  }

  if (!member) return null;

  return (
    <SmoothScrollProvider>
      <Navigation />
      <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 transition-colors duration-500">
        <div className="fixed inset-0 pointer-events-none z-0">
           <DeepTechBackground />
        </div>

        <section className="relative pt-40 pb-32 z-10 min-h-screen flex items-center">
          <div className="container mx-auto px-6 lg:px-8">
            <Link 
              href="/team" 
              className="inline-flex items-center gap-3 text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] mb-12 hover:opacity-70 transition-opacity"
            >
              <ArrowLeft className="w-4 h-4" /> Return to Directory
            </Link>

            <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
               {/* Visual Node */}
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="lg:col-span-5 relative"
               >
                  <div className={`absolute -inset-4 bg-gradient-to-br ${member.gradient} opacity-20 blur-3xl rounded-[4rem] pointer-events-none`} />
                  <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5] border border-border shadow-2xl bg-secondary group">
                     {member.avatarUrl ? (
                        <img 
                          src={member.avatarUrl} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                          alt={member.name} 
                        />
                     ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-7xl font-black text-white tracking-widest`}>
                           {member.initials || '??'}
                        </div>
                     )}
                     
                     {/* HUD Overlay */}
                     <div className="absolute top-6 right-6 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-mono text-white uppercase tracking-widest">Node Active</span>
                     </div>
                  </div>
               </motion.div>

               {/* Intelligence Data */}
               <motion.div 
                 initial={{ opacity: 0, x: 30 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.2 }}
                 className="lg:col-span-7"
               >
                  <div className="flex flex-col h-full">
                     <div className="mb-12">
                        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-secondary border border-border text-indigo-600 dark:text-indigo-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-8">
                           <Terminal className="w-4 h-4" />
                           {member.meta || 'Strategic Node'}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter leading-none uppercase">
                           {member.name}
                        </h1>
                        <h2 className="text-xl md:text-2xl text-muted-foreground font-mono uppercase tracking-[0.3em] font-bold">
                           {member.role}
                        </h2>
                     </div>

                     <div className="bg-card/40 backdrop-blur-md border border-border rounded-[3rem] p-10 lg:p-14 shadow-lg mb-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                           <Cpu className="w-40 h-40" />
                        </div>
                        <h3 className="text-sm font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-3">
                           <Award className="w-5 h-5" /> Operational Objective
                        </h3>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium relative z-10 whitespace-pre-wrap">
                           {member.bio || 'No operational objective provided.'}
                        </p>
                     </div>

                     <div className="space-y-6">
                        <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-[0.3em] font-bold">Uplink Protocols</h3>
                        <div className="flex flex-wrap gap-4">
                           {member.social?.linkedin && (
                             <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="h-16 px-8 rounded-2xl bg-secondary border border-border flex items-center gap-4 text-foreground hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-all shadow-md group">
                                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span className="font-bold text-sm tracking-wide uppercase">LinkedIn</span>
                             </a>
                           )}
                           {member.social?.twitter && (
                             <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="h-16 px-8 rounded-2xl bg-secondary border border-border flex items-center gap-4 text-foreground hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-all shadow-md group">
                                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span className="font-bold text-sm tracking-wide uppercase">Twitter</span>
                             </a>
                           )}
                           {member.social?.github && (
                             <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="h-16 px-8 rounded-2xl bg-secondary border border-border flex items-center gap-4 text-foreground hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow-md group">
                                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span className="font-bold text-sm tracking-wide uppercase">GitHub</span>
                             </a>
                           )}
                           {member.social?.email && (
                             <a href={`mailto:${member.social.email}`} className="h-16 px-8 rounded-2xl bg-secondary border border-border flex items-center gap-4 text-foreground hover:bg-rose-600 hover:text-white dark:hover:bg-rose-500 transition-all shadow-md group">
                                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span className="font-bold text-sm tracking-wide uppercase">Comm Link</span>
                             </a>
                           )}
                        </div>
                     </div>
                  </div>
               </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
