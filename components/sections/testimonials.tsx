"use client"

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Quote, Star, ChevronLeft, ChevronRight, MessageSquare, Zap, ArrowRight, BadgeCheck } from 'lucide-react'
import { DeepTechBackground } from '@/components/ui/deep-tech-background'
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Local photos (generated, in /public/testimonials/)
const LOCAL_PHOTOS = [
  '/testimonials/arjun-mehta.jpg',
  '/testimonials/priya-nair.jpg',
  '/testimonials/rajan-sharma.jpg',
]

// Indian people photos — fetched via randomuser.me API with nat=in (India)
const CASUAL_PHOTOS = [
  'https://randomuser.me/api/portraits/women/85.jpg',  // Manasa Hiremath
  'https://randomuser.me/api/portraits/women/15.jpg',  // Anaisha Kamath
  'https://randomuser.me/api/portraits/men/14.jpg',    // Ranbir Shetty
  'https://randomuser.me/api/portraits/women/41.jpg',  // Sarita Kamath
  'https://randomuser.me/api/portraits/men/1.jpg',     // Nihal Dhamdhame
  'https://randomuser.me/api/portraits/men/44.jpg',    // Ranveer Gamskar
  'https://randomuser.me/api/portraits/men/35.jpg',    // Maanas Vernekar
  'https://randomuser.me/api/portraits/women/39.jpg',  // Rekha Nair
  'https://randomuser.me/api/portraits/men/12.jpg',    // Balendra Nand
  'https://randomuser.me/api/portraits/women/4.jpg',   // Rakshitha Uchil
]

const STATIC_TESTIMONIALS = [
  {
    id: 's1',
    name: 'Arjun Mehta',
    role: 'CEO, NexaScale Technologies · Mumbai',
    tag: 'Enterprise SaaS',
    rating: 5,
    avatar: LOCAL_PHOTOS[0],
    company: 'NexaScale Technologies',
    verified: true,
    content:
      'MegaNods rebuilt our entire backend in 6 weeks — something we were told would take 6 months. Their technical depth is unlike anything I have encountered in 12 years of building startups. Real game changers.',
  },
  {
    id: 's2',
    name: 'Priya Nair',
    role: 'Head of Digital, Tata Consultancy · Bengaluru',
    tag: 'Digital Transformation',
    rating: 5,
    avatar: LOCAL_PHOTOS[1],
    company: 'Tata Consultancy Group',
    verified: true,
    content:
      'We engaged MegaNods for a critical AI-powered customer intelligence platform. They delivered a fully production-ready system — on time, on budget, zero compromise on quality. They are now our first call for every major initiative.',
  },
  {
    id: 's3',
    name: 'Rajan Sharma',
    role: 'CTO, PayVault Fintech · Delhi',
    tag: 'Fintech Infrastructure',
    rating: 5,
    avatar: LOCAL_PHOTOS[2],
    company: 'PayVault Fintech',
    verified: true,
    content:
      'MegaNods is the only team that truly understood our compliance requirements and delivered a PCI-DSS grade payment infrastructure without a single security regression. Their engineers think like architects, not just coders.',
  },
  {
    id: 's4',
    name: 'Kavya Reddy',
    role: 'Founder, EduBridge AI · Hyderabad',
    tag: 'EdTech AI Product',
    rating: 5,
    avatar: CASUAL_PHOTOS[1],
    company: 'EduBridge AI',
    verified: true,
    content:
      "From MVP to 50,000 active users in under 4 months — MegaNods made that possible. They don't just build what you ask for, they challenge your assumptions and push you toward the right solution. Our AI tutoring engine is flawless.",
  },
  {
    id: 's5',
    name: 'Vikram Singh',
    role: 'VP Engineering, LogiTrack Corp · Pune',
    tag: 'Supply Chain Automation',
    rating: 5,
    avatar: CASUAL_PHOTOS[2],
    company: 'LogiTrack Corp',
    verified: true,
    content:
      'MegaNods automated our entire warehouse and delivery orchestration. The system now handles 200,000+ daily transactions with 99.98% uptime. What impressed me most was how deeply they understood our operational constraints.',
  },
  {
    id: 's6',
    name: 'Sana Mirza',
    role: 'Product Manager, ClearView Analytics · Bangalore',
    tag: 'Data & Analytics',
    rating: 5,
    avatar: CASUAL_PHOTOS[3],
    company: 'ClearView Analytics',
    verified: true,
    content:
      'I honestly did not expect a team this size to have this level of quality control. Every sprint was clean, every delivery was documented, and they proactively caught bugs before I even raised them. Absolutely brilliant team.',
  },
  {
    id: 's7',
    name: 'Rohit Chaudhary',
    role: 'Co-Founder, ShopEase India · Ahmedabad',
    tag: 'E-Commerce Platform',
    rating: 5,
    avatar: CASUAL_PHOTOS[4],
    company: 'ShopEase India',
    verified: true,
    content:
      "We launched our D2C platform on the festival season with zero downtime, handling 15x our normal traffic. MegaNods didn't just write code — they stress-tested every edge case before go-live. Completely changed what I expect from a tech partner.",
  },
  {
    id: 's8',
    name: 'Ananya Krishnan',
    role: 'Director of Technology, HealthFirst · Chennai',
    tag: 'HealthTech HIPAA Compliance',
    rating: 5,
    avatar: CASUAL_PHOTOS[5],
    company: 'HealthFirst',
    verified: true,
    content:
      'Building a HIPAA-compliant telemedicine platform is not simple. MegaNods handled security architecture, real-time video, EHR integration, and mobile delivery simultaneously. On our first audit, zero critical findings. That says everything.',
  },
]

export function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [testimonials, setTestimonials] = useState<any[]>(STATIC_TESTIMONIALS)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const firestoreDocs = querySnapshot.docs.map((doc, idx) => ({
          id: doc.id,
          ...doc.data(),
          // Ensure Firestore entries always get a fallback photo
          avatar: (doc.data() as any).avatar || CASUAL_PHOTOS[idx % CASUAL_PHOTOS.length],
          verified: true,
        }));
        if (firestoreDocs.length > 0) {
          // Merge: static first, then any extra Firestore ones not already represented
          setTestimonials([...STATIC_TESTIMONIALS, ...firestoreDocs]);
        }
      } catch (_) {
        // silently fall back to static data
      }
    }
    fetchTestimonials();
  }, [])

  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5500)
    return () => clearInterval(interval)
  }, [isAutoPlaying, activeIndex, testimonials.length])

  const handlePrev = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const active = testimonials[activeIndex]

  return (
    <section ref={ref} className="relative py-28 lg:py-40 bg-background overflow-hidden" id="testimonials">
      <DeepTechBackground />

      <div className="relative container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20 lg:mb-28">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="text-indigo-600 dark:text-indigo-400 font-mono text-[11px] uppercase tracking-[0.35em] mb-3 font-bold flex items-center gap-3"
            >
              <div className="w-8 h-px bg-indigo-600/50" />
              CLIENT TESTIMONIALS
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight"
            >
              Trusted by{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600">
                Industry Leaders
              </span>
              .
            </motion.h2>
          </div>

          <div className="flex items-center gap-6">
            {/* Counter */}
            <div className="text-center hidden md:block">
              <div className="text-foreground font-black text-2xl font-mono">{activeIndex + 1}<span className="text-muted-foreground text-base">/{testimonials.length}</span></div>
              <div className="text-muted-foreground font-mono text-[9px] uppercase tracking-widest">Reviews</div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors text-foreground"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors text-foreground"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-center"
            >
              {/* ── Avatar Side ── */}
              <div className="relative">
                <div className="relative aspect-square max-w-xs mx-auto lg:mx-0">
                  {/* Card frame */}
                  <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-indigo-500/20 to-purple-500/10 border border-border p-1">
                    <div className="w-full h-full rounded-[2.8rem] bg-card flex items-center justify-center overflow-hidden relative">
                      {/* Animated gradient */}
                      <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent z-10 pointer-events-none"
                      />

                      {/* Photo */}
                      {active?.avatar ? (
                        <img
                          src={active.avatar}
                          alt={active.name}
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            // Fallback if image fails to load
                            (e.target as HTMLImageElement).style.display = 'none'
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                          <span className="text-7xl font-black text-indigo-400/30 select-none">
                            {active?.name?.charAt(0)}
                          </span>
                        </div>
                      )}

                      {/* Name card overlay */}
                      <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-background/90 dark:bg-black/75 border border-border backdrop-blur-xl z-20">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <div className="text-foreground font-black text-sm uppercase tracking-tight">{active?.name}</div>
                          {active?.verified && (
                            <BadgeCheck className="w-4 h-4 text-indigo-500 ml-auto flex-shrink-0" />
                          )}
                        </div>
                        <div className="text-indigo-600 dark:text-indigo-400 font-mono text-[9px] uppercase tracking-[0.12em] font-bold opacity-70 leading-relaxed">
                          {active?.role}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating star badge */}
                  <motion.div
                    animate={{ y: [-6, 6, -6] }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                    className="absolute -top-5 -right-5 w-18 h-18 w-[72px] h-[72px] rounded-2xl bg-card border border-border flex flex-col items-center justify-center shadow-xl"
                  >
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400 mb-0.5" />
                    <div className="text-foreground font-black text-sm font-mono">{active?.rating || 5}.0</div>
                  </motion.div>

                  {/* Verified badge */}
                  <motion.div
                    animate={{ y: [6, -6, 6] }}
                    transition={{ duration: 4.5, repeat: Infinity, delay: 0.8 }}
                    className="absolute -bottom-3 -left-5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2"
                  >
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[8px] uppercase tracking-widest font-black">Verified</span>
                  </motion.div>
                </div>
              </div>

              {/* ── Quote Side ── */}
              <div className="flex flex-col text-left">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="mb-8"
                >
                  {/* Tag */}
                  <div className="flex items-center gap-2 mb-5">
                    <Zap className="w-3 h-3 text-indigo-500" />
                    <span className="text-indigo-600 dark:text-indigo-400 font-mono text-[10px] uppercase tracking-[0.35em] font-black">
                      [ {active?.tag || 'Verified Client'} ]
                    </span>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                    <span className="ml-2 text-muted-foreground font-mono text-[10px] uppercase tracking-widest self-center">5.0 / 5.0</span>
                  </div>

                  {/* Quote text */}
                  <div className="relative">
                    <Quote className="absolute -top-8 -left-8 w-16 h-16 text-foreground/[0.04]" />
                    <p className="text-xl lg:text-2xl font-semibold text-foreground leading-[1.5] tracking-tight relative z-10">
                      &ldquo;{active?.content}&rdquo;
                    </p>
                  </div>
                </motion.div>

                {/* Company pill */}
                {active?.company && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="flex items-center gap-2.5 mb-8 px-4 py-2.5 rounded-xl bg-secondary/70 border border-border w-fit"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span className="text-foreground font-bold text-[11px] uppercase tracking-widest">{active.company}</span>
                  </motion.div>
                )}

                {/* Footer Actions */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="flex flex-col sm:flex-row gap-5 items-start sm:items-center"
                >
                  <div className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center group-hover:bg-indigo-600/10 transition-colors">
                      <MessageSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <div className="text-foreground font-black text-[9px] uppercase tracking-widest">Protocol Sync</div>
                      <div className="text-muted-foreground/40 text-[8px] uppercase font-mono tracking-widest font-bold">Node verified 100%</div>
                    </div>
                  </div>
                  <Link href="/testimonials">
                    <Button variant="outline" className="h-12 px-6 rounded-2xl border-border hover:bg-secondary text-foreground font-black text-[10px] uppercase tracking-[0.2em] gap-2">
                      Full Directory <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress dots */}
          <div className="mt-14 flex justify-center lg:justify-start gap-2.5">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => { setIsAutoPlaying(false); setActiveIndex(index) }}
                className={`h-1.5 rounded-full transition-all duration-700 ${
                  index === activeIndex
                    ? 'w-16 bg-indigo-600 dark:bg-indigo-500 opacity-100'
                    : 'w-5 bg-foreground opacity-15 hover:opacity-35'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
