"use client"

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider'
import { Button } from '@/components/ui/button'
import { DeepTechBackground } from '@/components/ui/deep-tech-background'
import { 
  ArrowRight, 
  CheckCircle2,
  Zap,
  Settings,
  Code2,
  Database,
  Brain,
  Cloud,
  Shield,
  Activity,
  Cpu,
  Layers,
  ChevronRight,
  Terminal,
  Server,
  Globe,
  Loader2
} from 'lucide-react'
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";

const iconMap: Record<string, any> = {
  Brain,
  Cloud,
  Shield,
  Activity,
  Cpu,
  Zap,
  Globe
}

const processSteps = [
  { icon: Terminal, title: 'Network Audit', description: 'Deep scan of your existing infrastructure to identify optimization vectors.' },
  { icon: Cpu, title: 'Core Design', description: 'Architecting custom neural and structural components for your specific sector.' },
  { icon: Zap, title: 'Rapid Deployment', description: 'High-speed implementation through automated delivery pipelines.' },
  { icon: Globe, title: 'Global Scale', description: 'Multiplying your operational footprint across the global mesh network.' },
]

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const q = query(
          collection(db, "services"), 
          where("isActive", "==", true),
          orderBy("order", "asc"), 
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setServices(docs);
      } catch (error) {
        console.error("SERVICE_FETCH_ERROR:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchServices();
  }, [])

  return (
    <SmoothScrollProvider>
      <Navigation />
      <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 transition-colors duration-500">
        <div className="fixed inset-0 pointer-events-none z-0">
           <DeepTechBackground />
        </div>

        {/* Hero Section - Capabilities Catalog */}
        <section className="relative pt-32 lg:pt-48 pb-20 z-10 text-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-secondary border border-border text-indigo-600 dark:text-indigo-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-12 shadow-md dark:shadow-none"
            >
               <Layers className="w-4 h-4" />
               Capabilities Protocol 4.5
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-7xl lg:text-[10rem] font-bold mb-12 tracking-tighter leading-[0.85] uppercase"
            >
              Strategic <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-400 dark:from-indigo-400 dark:to-emerald-400">Operations</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl lg:text-3xl text-muted-foreground max-w-6xl mx-auto mb-16 leading-relaxed font-bold"
            >
              Multi-sector intelligence and high-performance infrastructure services designed to provide permanent competitive dominance.
            </motion.p>
        </section>

        {/* Dynamic Services Catalog */}
        <section className="py-24 relative z-10">
          <div className="container mx-auto px-6 lg:px-8">
            {isLoading ? (
               <div className="flex flex-col items-center justify-center py-60 gap-8">
                  <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
                  <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.5em] animate-pulse">Synchronizing with Distributed Mesh...</p>
               </div>
            ) : services.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-60 gap-8 border border-dashed border-border rounded-[3rem]">
                  <Database className="w-16 h-16 text-muted-foreground/20" />
                  <div className="text-center">
                     <h3 className="text-3xl font-black text-foreground">Registry Idle</h3>
                     <p className="text-lg text-muted-foreground/45 font-medium mt-4">No tactical service stacks detected in current registry.</p>
                  </div>
               </div>
            ) : (
              services.map((service, index) => {
                const Icon = iconMap[service.icon] || Brain;
                return (
                  <motion.div 
                    key={service.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`flex flex-col lg:flex-row items-center gap-20 lg:gap-32 mb-40 last:mb-0 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                  >
                      {/* Service Visual Hub */}
                      <div className="flex-1 w-full">
                         <div className="relative aspect-square max-w-lg mx-auto lg:mx-0 group">
                            <div className="absolute inset-0 rounded-[4rem] border border-border bg-card/60 backdrop-blur-3xl overflow-hidden p-8 shadow-sm dark:shadow-none">
                               <div className="relative w-full h-full rounded-[3rem] bg-secondary overflow-hidden flex items-center justify-center">
                                  {/* Background HUD Layers */}
                                  <motion.div 
                                     animate={{ rotate: 360 }}
                                     transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                     className="absolute inset-4 border border-border/30 rounded-full" 
                                  />
                                  <motion.div 
                                     animate={{ rotate: -360 }}
                                     transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                     className="absolute inset-16 border border-border/30 rounded-full" 
                                  />
                                  
                                  <div className={`w-32 h-32 rounded-[2.5rem] bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-[0_0_50px_rgba(79,70,229,0.3)] z-10 group-hover:scale-110 transition-transform duration-700`}>
                                     <Icon className="w-16 h-16 text-white" />
                                  </div>

                                  {/* Orbiting Particles */}
                                  {[...Array(4)].map((_, i) => (
                                    <motion.div
                                      key={i}
                                      animate={{ rotate: 360 }}
                                      transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}
                                      className="absolute inset-0"
                                    >
                                      <div className={`absolute top-1/2 left-0 w-2 h-2 rounded-full bg-gradient-to-br ${service.gradient}`} />
                                    </motion.div>
                                  ))}
                                </div>
                            </div>
                         </div>
                      </div>

                      {/* Service Content Layer */}
                      <div className="flex-1 text-left">
                         <div className="text-indigo-600 dark:text-indigo-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-4 font-bold">[ {service.meta || service.category} ]</div>
                         <span className="text-muted-foreground text-lg font-black uppercase tracking-widest block mb-4">{service.subtitle}</span>
                         <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter text-foreground uppercase">
                            {service.title}
                         </h2>
                         <p className="text-xl text-muted-foreground leading-relaxed font-medium mb-12">
                            {service.description}
                          </p>

                         <div className="grid sm:grid-cols-2 gap-6 mb-16">
                            {service.features?.map((feature: string) => (
                               <div key={feature} className="flex items-center gap-4 group/item">
                                  <div className="p-2 rounded-lg bg-secondary border border-border group-hover/item:border-indigo-500/50 transition-colors">
                                     <ChevronRight className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                                  </div>
                                  <span className="text-sm font-bold text-muted-foreground group-hover/item:text-foreground transition-colors">{feature}</span>
                                </div>
                            ))}
                         </div>

                         <div className="flex items-center gap-6">
                            <Button 
                              asChild
                              className={`h-20 px-12 bg-foreground text-background hover:bg-foreground/90 font-bold rounded-2xl shadow-2xl transition-all text-lg group border-0`}
                            >
                               <Link href="/contact" className="flex items-center">
                                  Request Intelligence Audit
                                  <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                               </Link>
                            </Button>
                            <div className="flex flex-col">
                               {service.results?.map((r: string) => (
                                  <span key={r} className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest mb-1 font-bold">• {r}</span>
                               ))}
                            </div>
                         </div>
                      </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </section>

        {/* Operational Deployment Lifecycle (Process) */}
        <section className="py-32 lg:py-56 relative z-10 bg-secondary/40 backdrop-blur-3xl border-y border-border overflow-hidden">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-32">
               <span className="text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-[0.4em] mb-6 block font-bold">The Pipeline</span>
               <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase text-foreground">
                  Tactical <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-indigo-400 dark:to-blue-400">Deployment</span>.
               </h2>
               <p className="text-muted-foreground text-xl lg:text-2xl font-medium leading-relaxed">
                  Our hyper-accelerated delivery lifecycle ensures your infrastructure is optimized and active in record cycles.
               </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-[3rem] overflow-hidden border border-border shadow-md dark:shadow-none">
              {processSteps.map((step, index) => (
                <div key={step.title} className="bg-card p-12 group hover:bg-secondary/40 transition-all duration-300 relative">
                   <div className="text-5xl font-black text-foreground/5 absolute top-10 right-10 group-hover:text-indigo-500/10 transition-colors pointer-events-none">0{index + 1}</div>
                   <div className="w-16 h-16 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 dark:border-indigo-500/20 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                      <step.icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                   </div>
                   <h3 className="text-2xl font-black text-foreground mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{step.title}</h3>
                   <p className="text-muted-foreground text-sm font-medium leading-relaxed">{step.description}</p>
                   
                   {/* Kinetic Indicator */}
                   <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Connection Hub CTA */}
        <section className="py-32 lg:py-56 relative z-10 px-6">
           <div className="container mx-auto max-w-5xl">
              <div className="relative rounded-[4rem] lg:rounded-[5rem] border border-border bg-card/60 backdrop-blur-3xl overflow-hidden p-1 shadow-md dark:shadow-none">
                 <div className="relative px-8 py-24 lg:px-24 lg:py-32 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-blue-500/10 pointer-events-none" />
                    <Server className="w-16 h-16 text-indigo-600/20 dark:text-indigo-400/20 mx-auto mb-10" />
                    
                    <h2 className="text-4xl md:text-7xl lg:text-9xl font-black text-foreground mb-10 tracking-tighter leading-[0.85] uppercase">
                       Establish <br />
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-400 to-emerald-400 dark:from-indigo-400 dark:via-blue-400 dark:to-emerald-400">Authority</span>.
                    </h2>
                    <p className="text-muted-foreground text-xl lg:text-3xl mb-16 max-w-3xl mx-auto font-medium leading-relaxed">
                       Don't just compete. Dominate your market sector with the world's most advanced technology infrastructure.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                       <Button 
                          asChild
                          className="h-24 px-16 bg-foreground text-background hover:bg-foreground/90 font-black rounded-[2rem] shadow-2xl transition-all text-2xl group border-0"
                       >
                          <Link href="/contact" className="flex items-center">
                             Request Operational Audit
                             <ArrowRight className="ml-4 w-8 h-8 group-hover:translate-x-3 transition-transform" />
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
