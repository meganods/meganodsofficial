"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Quote, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, Lock, Layers } from 'lucide-react'
import Link from 'next/link'

export function TrustQuoteSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })

  return (
    <section 
      ref={sectionRef} 
      className="relative py-12 md:py-16 overflow-hidden bg-background"
    >
      {/* Subtle ambient glow behind quote card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[700px] h-[220px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative mx-auto px-6 lg:px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-card/75 dark:bg-card/60 backdrop-blur-2xl border border-border/80 hover:border-indigo-500/30 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl shadow-slate-200/50 dark:shadow-[0_0_40px_rgba(0,0,0,0.3)] transition-all duration-500 overflow-hidden"
        >
          {/* Subtle top accent gradient */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-400" />
          
          {/* Subtle decorative watermark */}
          <div className="absolute top-4 right-6 pointer-events-none select-none opacity-5 dark:opacity-10">
            <Quote className="w-24 h-24 text-indigo-600 dark:text-indigo-400 rotate-12" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10">
            {/* Left / Main Quote Content */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
                  Our Engineering Creed
                </span>
              </div>

              <blockquote className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight leading-snug text-slate-900 dark:text-white">
                &ldquo;Great technology isn&rsquo;t just built with code &mdash; it is founded on{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 dark:from-indigo-400 dark:via-purple-400 dark:to-teal-300">
                  unshakable trust
                </span>
                , transparent architecture, and engineering that empowers your business to believe in what&rsquo;s next.&rdquo;
              </blockquote>

              <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>MegaNods Engineering & Leadership</span>
                </div>
                <span className="text-border hidden sm:inline">•</span>
                <span className="font-mono text-muted-foreground text-[11px] tracking-wide">
                  100% Delivery Integrity · 35+ Shipped Platforms
                </span>
              </div>
            </div>

            {/* Right Action Button */}
            <div className="shrink-0 w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-4 sm:pt-0 border-t sm:border-t-0 border-border/60">
              <Link href="/about" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto h-11 px-6 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-2xl shadow-md transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-105 active:scale-95 cursor-pointer">
                  <span>Our Philosophy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest hidden sm:block">
                Zero Tech-Debt
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
