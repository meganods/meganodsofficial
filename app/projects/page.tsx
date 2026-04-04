"use client"

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider'
import { Button } from '@/components/ui/button'
import { DeepTechBackground } from '@/components/ui/deep-tech-background'
import { ArrowRight, ArrowUpRight, ExternalLink, Filter, Layers, Zap, Shield, Cpu, Globe, Rocket } from 'lucide-react'

const categories = ['All', 'AI/ML', 'Cloud', 'Cybersecurity', 'Data Analytics', 'IoT', 'Automation']

const projects = [
  {
    id: 1,
    title: 'AI-Powered Healthcare Platform',
    category: 'AI/ML',
    industry: 'Healthcare',
    description: 'Revolutionary medical diagnosis system using machine learning for early disease detection with 99.2% accuracy.',
    images: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1581594658514-9988185bc032?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1532187863486-abf9d39d99c5?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=400',
    ],
    results: ['99.2% Accuracy', '70% Faster'],
    technologies: ['TensorFlow', 'Python', 'AWS'],
    gradient: 'from-indigo-600 to-cyan-500',
    featured: true,
    meta: "MedCore AI"
  },
  {
    id: 2,
    title: 'Smart City Infrastructure',
    category: 'IoT',
    industry: 'Government',
    description: 'Integrated IoT solution managing traffic, utilities, and public services across metropolitan areas.',
    images: [
      'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1526666923948-b28675651f5e?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1496560235220-1526c33f5ea0?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400',
    ],
    results: ['30% Reduction', '12 Cities'],
    technologies: ['Azure IoT', 'Node.js', 'React'],
    gradient: 'from-cyan-600 to-blue-500',
    featured: true,
    meta: "Urban Nodes"
  },
  {
    id: 3,
    title: 'FinTech Security Suite',
    category: 'Cybersecurity',
    industry: 'Finance',
    description: 'Enterprise-grade cybersecurity platform protecting billions in financial transactions daily.',
    images: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1539193143244-c83d9436d633?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1510511459019-5dee997ddfdf?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&q=80&w=400',
    ],
    results: ['$50B+ Protected', 'Zero Breaches'],
    technologies: ['Go', 'K8s', 'Python'],
    gradient: 'from-emerald-600 to-teal-500',
    featured: true,
    meta: "Cyber Shield"
  },
]

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const filteredProjects = activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory)

  return (
    <SmoothScrollProvider>
      <Navigation />
      <main className="min-h-screen bg-[#010103] text-white">
        <div className="fixed inset-0 pointer-events-none z-0">
           <DeepTechBackground />
        </div>

        {/* Hero Section - Architecture Portfolio */}
        <section className="relative pt-32 lg:pt-48 pb-20 z-10 text-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-12"
            >
               <Rocket className="w-3 h-3" />
               Global Operational Map
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-7xl lg:text-[10rem] font-bold mb-12 tracking-tighter leading-[0.85]"
            >
              Enterprise <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">Case Studies</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl lg:text-3xl text-white/40 max-w-6xl mx-auto mb-16 leading-relaxed font-medium"
            >
              A visual chronicle of disruptive engineering. Explore our global deployments across healthcare, urban infrastructure, and high-finance security.
            </motion.p>
        </section>

        {/* Tactical Filter Bar */}
        <section className="sticky top-[80px] z-50 bg-[#010103]/60 backdrop-blur-3xl border-y border-white/5 py-6">
          <div className="container mx-auto px-6 overflow-x-auto no-scrollbar">
            <div className="flex gap-4 min-w-max justify-center items-center">
              <Filter className="w-5 h-5 text-emerald-400 mr-2" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                    activeCategory === category
                      ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                      : "bg-[#05050a] border-white/10 text-white/40 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Deployment Cards */}
        <section className="py-24 lg:py-40 relative z-10">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <Link href={`/projects/${project.id}`}>
                    <div className="bg-[#05050a]/80 backdrop-blur-xl border border-white/10 rounded-[3.5rem] overflow-hidden p-1.5 hover:border-emerald-500/30 transition-all duration-500">
                      {/* Internal 6-Image Grid */}
                      <div className="relative aspect-[16/10] overflow-hidden rounded-[3rem] bg-black">
                        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-2 p-2">
                          {project.images.map((img, i) => (
                             <div key={i} className="relative overflow-hidden rounded-xl bg-[#010103]">
                                <motion.img
                                  src={img}
                                  alt={`${project.title} detail ${i}`}
                                  className="w-full h-full object-cover transition-transform duration-700"
                                  initial={{ scale: 1.2 }}
                                  whileHover={{ scale: 1 }}
                                />
                             </div>
                          ))}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-transparent to-transparent opacity-80 pointer-events-none" />
                        <div className="absolute top-8 left-8 flex gap-3">
                           <span className="px-4 py-1.5 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-xl">
                              {project.category}
                           </span>
                           {project.featured && (
                             <span className="px-4 py-1.5 bg-white/10 border border-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-lg">
                                Priority Audit
                             </span>
                           )}
                        </div>
                        <div className="absolute bottom-10 left-10 right-10">
                           <div className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.3em] mb-4">[ {project.meta} ]</div>
                           <h3 className="text-4xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight tracking-tighter">
                             {project.title}
                           </h3>
                        </div>
                      </div>
                      
                      {/* Project Performance Footer */}
                      <div className="p-12">
                         <p className="text-white/40 text-lg font-medium leading-relaxed mb-10 line-clamp-2">
                           {project.description}
                         </p>
                         <div className="flex flex-wrap items-center justify-between gap-6 pt-10 border-t border-white/5">
                            <div className="flex gap-4">
                               {project.results.map(result => (
                                 <div key={result} className="px-4 py-2 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                                    {result}
                                 </div>
                               ))}
                            </div>
                            <div className="flex items-center gap-4">
                               <div className="flex -space-x-4">
                                  {project.technologies.map((t, i) => (
                                    <div key={i} className="w-10 h-10 rounded-full bg-[#010103] border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/40 uppercase">
                                       {t.substring(0, 1)}
                                    </div>
                                  ))}
                               </div>
                               <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                                  <ArrowUpRight className="w-7 h-7" />
                               </div>
                            </div>
                         </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study CTA */}
        <section className="py-32 lg:py-56 relative z-10 px-6">
           <div className="container mx-auto max-w-5xl">
              <div className="relative rounded-[3rem] lg:rounded-[4rem] border border-white/10 bg-[#05050a]/40 backdrop-blur-3xl overflow-hidden p-1">
                 <div className="relative px-8 py-24 lg:px-24 lg:py-32 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10 pointer-events-none" />
                    <Layers className="w-16 h-16 text-emerald-400/20 mx-auto mb-10" />
                    
                    <h2 className="text-4xl md:text-7xl lg:text-9xl font-bold text-white mb-10 tracking-tighter leading-[0.85]">
                       Ready for <br />
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">Total Scale</span>.
                    </h2>
                    <p className="text-white/40 text-xl lg:text-3xl mb-16 max-w-3xl mx-auto font-medium leading-relaxed">
                       Deploy our engineering department to your unique organizational challenges today.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                       <Button 
                          asChild
                          className="h-20 px-12 bg-white text-black hover:bg-white/90 font-bold rounded-3xl shadow-2xl transition-all text-xl group"
                       >
                          <Link href="/contact">
                             Request Operational Audit
                             <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
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
