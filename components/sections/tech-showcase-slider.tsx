'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Cpu,
  Cloud,
  ShieldCheck,
  Bot,
  Layers,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from 'lucide-react'

import { TECHNOLOGIES_DATA } from '@/lib/data/technologies'

const ICON_MAP: Record<string, typeof Cpu> = {
  'neural-ai-cognitive-systems': Cpu,
  'distributed-cloud-edge-mesh': Cloud,
  'zero-trust-cyber-shield': ShieldCheck,
  'spatial-robotics-vision-ai': Bot,
  'hyper-scale-web-mobile-frameworks': Layers,
}

export function TechShowcaseSlider() {
  const router = useRouter()
  const [activeVirtualIndex, setActiveVirtualIndex] = useState(1000)
  const totalSlides = TECHNOLOGIES_DATA.length
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Endless auto rotation every 3 seconds (strictly monotonic forward loop)
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveVirtualIndex((prev) => prev + 1)
    }, 3000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [totalSlides])

  const nextSlide = () => {
    setActiveVirtualIndex((prev) => prev + 1)
  }

  const prevSlide = () => {
    setActiveVirtualIndex((prev) => prev - 1)
  }

  const currentRealIndex = ((activeVirtualIndex % totalSlides) + totalSlides) % totalSlides

  const goToSlide = (targetRealIndex: number) => {
    let diff = targetRealIndex - currentRealIndex
    if (diff <= 0) diff += totalSlides
    setActiveVirtualIndex((prev) => prev + diff)
  }

  // Display offsets to show 5 cards at any time (-2, -1, 0, 1, 2)
  const visibleOffsets = [-2, -1, 0, 1, 2]

  const handleCardClick = (virtualKey: number, slug: string, isCenter: boolean) => {
    if (isCenter) {
      router.push(`/technologies/${slug}`)
    } else {
      setActiveVirtualIndex(virtualKey)
    }
  }

  return (
    <section
      id="tech-slider-section"
      className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-slate-50/70 via-white to-slate-50/50 border-y border-slate-200/80"
    >
      {/* Background Decorative Tech Grid & Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(#2563eb 1px, transparent 1px), radial-gradient(#6366f1 1px, #ffffff 1px)`,
            backgroundSize: '32px 32px',
            backgroundPosition: '0 0, 16px 16px',
          }}
        />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold tracking-wide uppercase shadow-sm mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>Next-Gen Tech Infrastructure</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight"
          >
            Cutting-Edge <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Technology Spectrum</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-600 font-medium"
          >
            Click any technology to explore in-depth architectural specifications, live metrics, and real-world enterprise deployments.
          </motion.p>
        </div>

        {/* Carousel Showcase Container */}
        <div className="relative h-[490px] sm:h-[530px] lg:h-[580px] flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence initial={false}>
              {visibleOffsets.map((offset) => {
                const virtualKey = activeVirtualIndex + offset
                const realIndex = ((virtualKey % totalSlides) + totalSlides) % totalSlides
                const slide = TECHNOLOGIES_DATA[realIndex]

                const isCenter = offset === 0
                const isLeft = offset === -1
                const isRight = offset === 1
                const isFarLeft = offset <= -2
                const isFarRight = offset >= 2

                // Calculate positions and scales
                let translateX = '0%'
                let scale = 1
                let zIndex = 10
                let opacity = 1

                if (isCenter) {
                  translateX = '0%'
                  scale = 1.08 // Centered card gets enlarged automatically!
                  zIndex = 30
                  opacity = 1
                } else if (isLeft) {
                  translateX = '-78%'
                  scale = 0.88
                  zIndex = 20
                  opacity = 0.65
                } else if (isRight) {
                  translateX = '78%'
                  scale = 0.88
                  zIndex = 20
                  opacity = 0.65
                } else if (isFarLeft) {
                  translateX = '-140%'
                  scale = 0.72
                  zIndex = 10
                  opacity = 0.15
                } else if (isFarRight) {
                  translateX = '140%'
                  scale = 0.72
                  zIndex = 10
                  opacity = 0.15
                }

                const IconComponent = ICON_MAP[slide.slug] || Cpu

                return (
                  <motion.div
                    key={virtualKey}
                    initial={{
                      x: offset > 0 ? '140%' : '-140%',
                      scale: 0.72,
                      opacity: 0,
                    }}
                    animate={{
                      x: translateX,
                      scale: scale,
                      opacity: opacity,
                      zIndex: zIndex,
                    }}
                    exit={{
                      x: offset < 0 ? '-140%' : '140%',
                      scale: 0.72,
                      opacity: 0,
                      zIndex: 5,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 280,
                      damping: 28,
                      mass: 0.8,
                    }}
                    onClick={() => handleCardClick(virtualKey, slide.slug, isCenter)}
                    className={`absolute w-[88vw] max-w-[340px] sm:max-w-none sm:w-[460px] lg:w-[580px] cursor-pointer select-none transition-shadow duration-500 rounded-3xl ${
                      isCenter ? 'pointer-events-auto' : 'pointer-events-auto hover:opacity-90'
                    }`}
                    style={{
                      perspective: '1200px',
                    }}
                  >
                    {/* Animated Border Container */}
                    <div
                      className={`relative p-[3px] rounded-3xl transition-all duration-700 ${
                        isCenter
                          ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-2xl ring-4 ring-blue-500/20'
                          : 'bg-slate-200/90 shadow-md hover:border-slate-300'
                      }`}
                      style={{
                        boxShadow: isCenter
                          ? `0 25px 50px -12px ${slide.glowColor}, 0 0 0 1px rgba(99, 102, 241, 0.3)`
                          : undefined,
                      }}
                    >
                      {/* Pulsing Animated Border Wave for Center Card */}
                      {isCenter && (
                        <div className="absolute -inset-[3px] rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-60 blur-sm animate-pulse -z-10" />
                      )}

                      {/* Card Inner Content */}
                      <div className="relative overflow-hidden rounded-[22px] bg-slate-900 min-h-[370px] sm:min-h-0 sm:aspect-[16/10] flex flex-col justify-between group">
                        {/* Tech Background Image */}
                        <div className="absolute inset-0 overflow-hidden">
                          <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className={`object-cover transition-transform duration-700 ease-out ${
                              isCenter ? 'scale-105 filter brightness-100 group-hover:scale-110' : 'scale-100 filter brightness-75'
                            }`}
                            loading="lazy"
                            sizes="(max-width: 768px) 90vw, 600px"
                          />
                          {/* Gradient Overlays for High Legibility */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
                          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent" />
                        </div>

                        {/* Top Header Overlay Badges */}
                        <div className="relative p-4 sm:p-5 flex items-center justify-between z-10 shrink-0">
                          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/15 text-white shadow-lg">
                            <IconComponent className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-blue-400" />
                            <span className="text-[11px] sm:text-xs font-semibold tracking-wide">{slide.category}</span>
                          </div>

                          {isCenter ? (
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-blue-600 backdrop-blur-md text-white border border-blue-400/40 text-[10px] sm:text-[11px] font-bold shadow-lg"
                            >
                              <span>EXPLORE</span>
                              <ExternalLink className="w-3 h-3" />
                            </motion.div>
                          ) : (
                            <span className="text-[10px] text-slate-300/80 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm">
                              Tap to view
                            </span>
                          )}
                        </div>

                        {/* Bottom Info Overlay */}
                        <div className="relative z-10 p-4 sm:p-7 text-white mt-auto">
                          {/* Title */}
                          <h3 className="text-base sm:text-2xl font-bold tracking-tight text-white mb-1.5 sm:mb-2 leading-snug drop-shadow-md flex items-center justify-between group-hover:text-blue-200 transition-colors">
                            <span>{slide.title}</span>
                            {isCenter && (
                              <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 text-blue-400 transform group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
                            )}
                          </h3>

                          {/* Description */}
                          <p
                            className={`text-xs sm:text-sm text-slate-200 line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4 leading-relaxed drop-shadow ${
                              !isCenter && 'opacity-80'
                            }`}
                          >
                            {slide.description}
                          </p>

                          {/* Quick Metrics / Tags Pill List */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                              {slide.coreCapabilities.slice(0, 2).map((cap, capIdx) => (
                                <span
                                  key={capIdx}
                                  className={`text-[9px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md font-medium backdrop-blur-md border transition-colors ${
                                    isCenter
                                      ? 'bg-white/15 border-white/25 text-white'
                                      : 'bg-black/30 border-white/10 text-slate-300'
                                  }`}
                                >
                                  {cap.title}
                                </span>
                              ))}
                            </div>

                            {isCenter && (
                              <span className="hidden sm:inline-flex text-xs font-bold text-blue-300 underline underline-offset-4 shrink-0">
                                Open Details Page →
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* Desktop Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevSlide()
            }}
            aria-label="Previous Slide"
            className="hidden sm:flex absolute left-4 z-40 p-3 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-xl border border-slate-200/80 backdrop-blur-md transition-all hover:scale-110 active:scale-95 focus:outline-none"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              nextSlide()
            }}
            aria-label="Next Slide"
            className="hidden sm:flex absolute right-4 z-40 p-3 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-xl border border-slate-200/80 backdrop-blur-md transition-all hover:scale-110 active:scale-95 focus:outline-none"
          >
            <ChevronRight className="w-5 h-5 text-slate-700" />
          </button>
        </div>

        {/* Carousel Pagination Dots & Mobile Navigation Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevSlide()
            }}
            aria-label="Previous Slide"
            className="sm:hidden p-2.5 rounded-full bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-md border border-slate-200 dark:border-slate-700 active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1">
            {TECHNOLOGIES_DATA.map((_, dotIdx) => {
              const isActive = dotIdx === currentRealIndex
              return (
                <button
                  key={dotIdx}
                  onClick={() => goToSlide(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className="p-2 flex items-center justify-center focus:outline-none"
                >
                  <span
                    className={`block transition-all duration-300 rounded-full ${
                      isActive
                        ? 'w-8 sm:w-9 h-2 sm:h-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 ring-2 ring-blue-500/30'
                        : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                </button>
              )
            })}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              nextSlide()
            }}
            aria-label="Next Slide"
            className="sm:hidden p-2.5 rounded-full bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-md border border-slate-200 dark:border-slate-700 active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
