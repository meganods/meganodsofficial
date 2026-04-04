"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DeepTechBackground } from '@/components/ui/deep-tech-background'

const projects = [
  {
    id: 1,
    title: 'AI-Powered Healthcare Platform',
    category: 'Healthcare / AI',
    description: 'Revolutionary medical diagnosis system using machine learning for early disease detection.',
    images: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1581594658514-9988185bc032?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1532187863486-abf9d39d99c5?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=400',
    ],
    stats: { accuracy: '99.2%', users: '50K+' },
    gradient: 'from-indigo-600 to-cyan-500'
  },
  {
    id: 2,
    title: 'Smart City Infrastructure',
    category: 'IoT / Urban Tech',
    description: 'Integrated IoT solution managing traffic, utilities, and public services across metropolitan areas.',
    images: [
      'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1526666923948-b28675651f5e?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1496560235220-1526c33f5ea0?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400',
    ],
    stats: { cities: '12', sensors: '1M+' },
    gradient: 'from-cyan-600 to-blue-500'
  },
  {
    id: 3,
    title: 'FinTech Security Suite',
    category: 'Finance / Security',
    description: 'Enterprise-grade cybersecurity platform protecting billions in financial transactions.',
    images: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1539193143244-c83d9436d633?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1510511459019-5dee997ddfdf?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&q=80&w=400',
    ],
    stats: { protected: '$50B+', uptime: '99.99%' },
    gradient: 'from-emerald-600 to-teal-500'
  },
  {
    id: 4,
    title: 'E-Commerce AI Engine',
    category: 'Retail / ML',
    description: 'Personalized shopping experience platform with advanced recommendation algorithms.',
    images: [
      'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1523474253046-2cd2c78a0dbb?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1556742049-dec194076746?auto=format&fit=crop&q=80&w=400',
    ],
    stats: { conversion: '+40%', users: '10M+' },
    gradient: 'from-amber-600 to-orange-500'
  },
]

export function ProjectsPreviewSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden bg-[#010103]">
      <DeepTechBackground />

      <div className="relative container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block text-primary text-sm font-medium mb-4 uppercase tracking-widest"
            >
              • Our Projects
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold"
            >
              <span className="text-foreground">Featured </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Case Studies</span>
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
              className="border-white/10 hover:bg-white/5 text-white"
            >
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative"
            >
              <Link href={`/projects/${project.id}`}>
                <div className="bg-[#05050a]/80 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden h-full group-hover:border-indigo-500/30 transition-all duration-500">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {/* Background Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
                    
                    {/* 6-Image Project Grid with Gaps */}
                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-1.5 p-1.5 bg-[#010103]">
                       {project.images.map((img, i) => (
                          <div key={i} className="relative overflow-hidden rounded-lg">
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
                    
                    {/* Cinematic Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-transparent to-transparent opacity-60" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-10 transition-opacity pointer-events-none`} />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/10 text-white/70">
                        {project.category}
                      </span>
                    </div>

                    {/* Hover Arrow */}
                    <div className="absolute top-4 right-4 translate-x-10 group-hover:translate-x-0 transition-transform duration-500">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-2xl">
                        <ArrowUpRight className="w-5 h-5 text-black" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    {/* Stats */}
                    <div className="flex gap-6 border-t border-white/5 pt-4">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div key={key}>
                          <div className="text-lg font-bold text-white">{value}</div>
                          <div className="text-[10px] text-white/40 uppercase font-mono">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 relative rounded-[32px] overflow-hidden border border-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-emerald-500 opacity-90" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          
          <div className="relative px-8 py-12 lg:px-16 lg:py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl lg:text-4xl font-bold text-white mb-2 tracking-tight">
                Have a Project in Mind?
              </h3>
              <p className="text-white/80 text-lg">
                {"Let's collaborate and bring your vision to life today."}
              </p>
            </div>
            <Button 
              asChild
              size="lg"
              className="bg-white text-black hover:bg-white/90 font-bold rounded-2xl h-14 px-8 shadow-2xl"
            >
              <Link href="/contact">
                Start a Project
                <ExternalLink className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
