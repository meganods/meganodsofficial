'use client'

import { use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  Globe,
  Server,
  Activity,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  HelpCircle,
} from 'lucide-react'

import { TECHNOLOGIES_DATA, TechnologyDetail } from '@/lib/data/technologies'
import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'

export default function TechnologyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = use(params)
  const tech = TECHNOLOGIES_DATA.find((t) => t.slug === resolvedParams.slug)

  if (!tech) {
    notFound()
  }

  // Find related/other technologies for navigation
  const otherTechs = TECHNOLOGIES_DATA.filter((t) => t.slug !== tech.slug)

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navigation />

      <main className="flex-grow pt-24 sm:pt-28 pb-20">
        {/* Top Breadcrumb Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
            <Link
              href="/"
              className="hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500">Technologies</span>
            <span className="text-slate-300">/</span>
            <span className="text-blue-600 font-semibold truncate max-w-[200px] sm:max-w-none">
              {tech.title}
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 lg:mb-24">
          <div className="relative rounded-3xl bg-white border border-slate-200/80 shadow-xl overflow-hidden p-6 sm:p-10 lg:p-14">
            {/* Background Tech Mesh */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `radial-gradient(#2563eb 1px, transparent 1px)`,
                  backgroundSize: '28px 28px',
                }}
              />
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Headlines & Summary */}
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                  <span>{tech.badge}</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]"
                >
                  {tech.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-medium"
                >
                  {tech.description}
                </motion.p>

                {/* Quick Action CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-8 flex flex-wrap gap-4"
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Deploy This Architecture</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href="#architecture-section"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-semibold border border-slate-200 transition-all"
                  >
                    <span>Explore Specifications</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </a>
                </motion.div>
              </div>

              {/* Right Column: Interactive Image Preview */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="lg:col-span-5"
              >
                <div className="relative p-1 rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 shadow-2xl">
                  <div className="relative rounded-[22px] overflow-hidden aspect-[16/11] bg-slate-950">
                    <Image
                      src={tech.image}
                      alt={tech.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 font-semibold">
                        {tech.category}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-blue-600/80 backdrop-blur-md border border-blue-400/30 font-bold">
                        VERIFIED NODE
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Key Metrics Ribbon */}
            <div className="mt-12 pt-8 border-t border-slate-100 grid grid-cols-2 lg:grid-cols-4 gap-6">
              {tech.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60"
                >
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {metric.value}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-blue-700 mt-1">
                    {metric.label}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                    {metric.subtext}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deep Overview & Core Capabilities Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 lg:mb-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Technical Capabilities & Breakdown
            </h2>
            <p className="mt-3 text-slate-600 font-medium">
              Architected for enterprise resilience, deterministic accuracy, and unlimited horizontal scaling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {tech.coreCapabilities.map((cap, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group relative rounded-2xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-blue-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-sm mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                    {cap.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                  {cap.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* System Architecture Section */}
        <section
          id="architecture-section"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 lg:mb-24"
        >
          <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-10 lg:p-14 shadow-2xl relative overflow-hidden">
            {/* Background Glow Orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mb-12">
              <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">
                System Topology
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mt-2 tracking-tight">
                Architectural Layers & Pipelines
              </h2>
              <p className="mt-3 text-slate-300 font-normal">
                A multi-tiered stack designed for maximum fault tolerance, end-to-end encryption, and low-latency throughput.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tech.architectureLayers.map((layer, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md hover:bg-white/10 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block text-[11px] font-mono uppercase tracking-wider text-blue-400 font-bold mb-2">
                      {layer.layer}
                    </span>
                    <h3 className="text-base font-bold text-white mb-2">
                      {layer.name}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-6 font-light">
                      {layer.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-4 border-t border-white/10">
                    {layer.technologies.map((techItem, techIdx) => (
                      <div
                        key={techIdx}
                        className="flex items-center gap-2 text-xs text-slate-300"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{techItem}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Real-World Use Cases Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 lg:mb-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Enterprise Deployments & Impact
            </h2>
            <p className="mt-3 text-slate-600 font-medium">
              Proven results delivering measurable efficiency gains, zero-downtime reliability, and scalable digital infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tech.useCases.map((useCase, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 mb-4">
                    {useCase.industry}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {useCase.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {useCase.summary}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-blue-800">
                    Measurable Outcome
                  </p>
                  <p className="text-xs font-semibold text-blue-950 mt-1">
                    {useCase.result}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack Cloud */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 lg:mb-24">
          <div className="rounded-2xl bg-white border border-slate-200/80 p-8 sm:p-10 shadow-sm text-center">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Integrated Tooling & Framework Ecosystem
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 font-medium">
              Battle-tested frameworks and open protocols powering this architecture.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
              {tech.techStack.map((stackItem, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
                >
                  {stackItem}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        {tech.faqs.length > 0 && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 lg:mb-24">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Technical FAQ
              </h2>
              <p className="text-sm text-slate-500 mt-2">
                Common questions regarding implementation and security.
              </p>
            </div>

            <div className="space-y-4">
              {tech.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm"
                >
                  <h3 className="text-base font-bold text-slate-900 flex items-start gap-2.5">
                    <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed pl-7">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Explore Other Technologies Carousel Links */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Explore Other Technologies
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Discover the rest of the Meganods high-performance technology stack.
              </p>
            </div>
            <Link
              href="/"
              className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherTechs.map((other) => (
              <Link
                key={other.id}
                href={`/technologies/${other.slug}`}
                className="group rounded-2xl bg-white border border-slate-200/80 p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-blue-400 flex flex-col justify-between"
              >
                <div>
                  <div className="relative rounded-xl overflow-hidden aspect-[16/10] mb-4 bg-slate-900">
                    <Image
                      src={other.image}
                      alt={other.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                    {other.category}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1 group-hover:text-blue-600 transition-colors">
                    {other.title}
                  </h4>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-blue-600">
                  <span>View Documentation</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Global CTA Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
                Ready to Architect Your Solution with Meganods?
              </h2>
              <p className="mt-4 text-sm sm:text-base text-blue-100 font-medium">
                Our elite engineers and solutions architects collaborate directly with your team to implement scalable, custom digital solutions.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-xl bg-white text-blue-700 font-bold hover:bg-blue-50 transition-all shadow-lg hover:scale-105 active:scale-95"
                >
                  Schedule Engineering Consultation
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
