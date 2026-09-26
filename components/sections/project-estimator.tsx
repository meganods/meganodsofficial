'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Cpu,
  Globe,
  Smartphone,
  Layers,
  Sparkles,
  ShieldCheck,
  Zap,
  Clock,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  Send,
  Loader2,
  Lock,
  FileCheck2,
  Sliders,
  Check
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { toast } from 'sonner'

interface PlatformOption {
  id: string
  title: string
  subtitle: string
  icon: React.ElementType
  baseWeeks: number
  baseCost: number
  stack: string[]
}

const platforms: PlatformOption[] = [
  {
    id: 'ai-automation',
    title: 'AI & Cognitive Systems',
    subtitle: 'Custom LLM fine-tuning, RAG pipelines & autonomous agents',
    icon: Cpu,
    baseWeeks: 3,
    baseCost: 3500,
    stack: ['Python', 'FastAPI', 'PyTorch', 'PgVector', 'LangGraph'],
  },
  {
    id: 'web-platform',
    title: 'High-Speed Web / SaaS',
    subtitle: 'Next.js 15, React Server Components & Decoupled CMS',
    icon: Globe,
    baseWeeks: 3,
    baseCost: 2800,
    stack: ['Next.js 15', 'TypeScript', 'TailwindCSS', 'PostgreSQL', 'Node.js'],
  },
  {
    id: 'mobile-app',
    title: 'Mobile Application',
    subtitle: 'Cross-platform iOS & Android native-feel apps',
    icon: Smartphone,
    baseWeeks: 4,
    baseCost: 3200,
    stack: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'GraphQL'],
  },
  {
    id: 'cloud-security',
    title: 'Cloud Mesh & DevOps',
    subtitle: 'Kubernetes orchestration, Zero-Trust & edge deployment',
    icon: Layers,
    baseWeeks: 4,
    baseCost: 4000,
    stack: ['Kubernetes', 'Docker', 'AWS / GCP', 'Terraform', 'eBPF'],
  },
]

const scopes = [
  {
    id: 'mvp',
    title: 'MVP / Prototype',
    desc: 'Rapid feature validation & core product loop for early traction',
    multiplier: 1.0,
    weeksAdd: 0,
    badge: 'Fast-Track',
  },
  {
    id: 'full-product',
    title: 'Full Production Build',
    desc: 'Complete architecture, polished UX, integrations & scalability',
    multiplier: 1.7,
    weeksAdd: 3,
    badge: 'Popular',
  },
  {
    id: 'enterprise',
    title: 'Enterprise Architecture',
    desc: 'High-concurrency microservices, SOC-2 readiness & dedicated SLA',
    multiplier: 2.6,
    weeksAdd: 6,
    badge: 'Full Scale',
  },
]

const addOnFeatures = [
  { id: 'feat-ai-chat', label: 'AI Chat / Vector Search', weeks: 1, cost: 800, icon: Cpu },
  { id: 'feat-auth-rbac', label: 'Auth & Multi-Tenant RBAC', weeks: 0.5, cost: 450, icon: Lock },
  { id: 'feat-payments', label: 'Stripe / Payment Gateway', weeks: 0.5, cost: 500, icon: DollarSign },
  { id: 'feat-realtime', label: 'Real-Time Sync / Websockets', weeks: 1, cost: 750, icon: Zap },
  { id: 'feat-devops', label: 'Automated CI/CD & Kubernetes', weeks: 1, cost: 900, icon: Layers },
  { id: 'feat-analytics', label: 'Custom Admin & Analytics Dashboard', weeks: 1, cost: 650, icon: Sliders },
]

const timelineSpeeds = [
  { id: 'speed-fast', label: 'Fast-Track Sprint', desc: 'Accelerated dedicated team (2–4 weeks)', multiplier: 1.15, weeksFactor: 0.75 },
  { id: 'speed-standard', label: 'Standard Agile', desc: 'Balanced iterative milestone cadence', multiplier: 1.0, weeksFactor: 1.0 },
  { id: 'speed-strategic', label: 'Phased Enterprise', desc: 'Comprehensive staged rollout with governance', multiplier: 0.95, weeksFactor: 1.3 },
]

export function ProjectEstimator() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('web-platform')
  const [selectedScope, setSelectedScope] = useState<string>('full-product')
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['feat-auth-rbac', 'feat-analytics'])
  const [selectedTimeline, setSelectedTimeline] = useState<string>('speed-standard')

  // Lead Form State
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [clientCompany, setClientCompany] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [clientNotes, setClientNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Toggle add-on
  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  // Real-time calculation calculations
  const calculation = useMemo(() => {
    const platform = platforms.find((p) => p.id === selectedPlatform) || platforms[0]
    const scope = scopes.find((s) => s.id === selectedScope) || scopes[1]
    const speed = timelineSpeeds.find((t) => t.id === selectedTimeline) || timelineSpeeds[1]

    let addonCost = 0
    let addonWeeks = 0
    selectedAddons.forEach((addonId) => {
      const match = addOnFeatures.find((f) => f.id === addonId)
      if (match) {
        addonCost += match.cost
        addonWeeks += match.weeks
      }
    })

    const rawWeeks = (platform.baseWeeks + scope.weeksAdd + addonWeeks) * speed.weeksFactor
    const minWeeks = Math.max(2, Math.round(rawWeeks * 0.85))
    const maxWeeks = Math.max(minWeeks + 1, Math.round(rawWeeks * 1.15))

    const rawCost = (platform.baseCost * scope.multiplier + addonCost) * speed.multiplier
    const minCost = Math.round(rawCost * 0.88 / 100) * 100
    const maxCost = Math.round(rawCost * 1.12 / 100) * 100

    return {
      platform,
      scope,
      speed,
      minWeeks,
      maxWeeks,
      minCost,
      maxCost,
      stack: platform.stack,
    }
  }, [selectedPlatform, selectedScope, selectedAddons, selectedTimeline])

  const handleSubmitEstimate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientEmail.trim() || !clientName.trim()) {
      toast.error('Please provide your name and email.')
      return
    }

    setIsSubmitting(true)
    try {
      await addDoc(collection(db, 'leads'), {
        name: clientName,
        email: clientEmail,
        phone: clientPhone,
        company: clientCompany,
        notes: clientNotes,
        type: 'ESTIMATOR_SPEC',
        estimatedPlatform: calculation.platform.title,
        estimatedScope: calculation.scope.title,
        estimatedTimeline: `${calculation.minWeeks} – ${calculation.maxWeeks} Weeks`,
        estimatedInvestment: `$${calculation.minCost.toLocaleString()} – $${calculation.maxCost.toLocaleString()}`,
        selectedAddons,
        timestamp: serverTimestamp(),
        status: 'NEW',
      })

      setIsSubmitted(true)
      toast.success('Project specification submitted! Our team will reach out within 24 hours.')
    } catch (err: any) {
      console.error('ESTIMATOR_SUBMISSION_ERROR:', err)
      toast.error('Unable to send transmission. Please email admin@meganods.com directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full bg-slate-50 dark:bg-card/40 border border-slate-200 dark:border-border rounded-3xl lg:rounded-[2.5rem] p-6 sm:p-10 lg:p-14 shadow-xl relative overflow-hidden" id="estimator">
      {/* Background ambient accents */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge & Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-widest font-bold mb-4">
          <Sliders className="w-3.5 h-3.5" />
          Interactive Project Estimator
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-foreground tracking-tight leading-tight">
          Calculate Your Scope & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Timeline</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-3 font-medium">
          Select your engineering requirements below for an instant timeline and milestone estimate.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* LEFT / MAIN CALCULATOR CONTROLS (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* STEP 1: Platform Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">1</span>
              <span>Select Core Solution</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {platforms.map((p) => {
                const Icon = p.icon
                const isSelected = selectedPlatform === p.id
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPlatform(p.id)}
                    className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white dark:bg-slate-900 border-indigo-600 shadow-md ring-2 ring-indigo-500/20'
                        : 'bg-white/80 dark:bg-card border-slate-200 dark:border-border hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-600" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{p.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">{p.subtitle}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* STEP 2: Project Scope */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">2</span>
              <span>Project Architecture Scope</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {scopes.map((s) => {
                const isSelected = selectedScope === s.id
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedScope(s.id)}
                    className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white dark:bg-slate-900 border-indigo-600 shadow-md ring-2 ring-indigo-500/20'
                        : 'bg-white/80 dark:bg-card border-slate-200 dark:border-border hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                        {s.badge}
                      </span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{s.title}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">{s.desc}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* STEP 3: Add-on Capabilities (Multi-select) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">3</span>
              <span>Select Key Modules & Integrations</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {addOnFeatures.map((feat) => {
                const isChecked = selectedAddons.includes(feat.id)
                const Icon = feat.icon
                return (
                  <button
                    key={feat.id}
                    type="button"
                    onClick={() => toggleAddon(feat.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isChecked
                        ? 'bg-indigo-50/60 dark:bg-indigo-950/40 border-indigo-400 text-indigo-950 dark:text-indigo-100 shadow-xs'
                        : 'bg-white/80 dark:bg-card border-slate-200 dark:border-border text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isChecked ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <span className="text-xs font-semibold truncate">{feat.label}</span>
                    </div>
                    <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${isChecked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'}`}>
                      {isChecked && <Check className="w-3 h-3" />}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* STEP 4: Delivery Velocity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">4</span>
              <span>Target Delivery Velocity</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {timelineSpeeds.map((speed) => {
                const isSelected = selectedTimeline === speed.id
                return (
                  <button
                    key={speed.id}
                    type="button"
                    onClick={() => setSelectedTimeline(speed.id)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white dark:bg-slate-900 border-indigo-600 shadow-md ring-2 ring-indigo-500/20'
                        : 'bg-white/80 dark:bg-card border-slate-200 dark:border-border hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100">{speed.label}</h4>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                    </div>
                    <p className="text-[10px] text-slate-500 leading-snug">{speed.desc}</p>
                  </button>
                )
              })}
            </div>
          </div>

        </div>

        {/* RIGHT / ESTIMATE HUD & LEAD TRANSMISSION CARD (5 Cols) */}
        <div className="lg:col-span-5 sticky top-28 space-y-6">
          
          {/* Real-Time Calculation HUD */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-2xl border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-indigo-500/20 to-transparent rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Live Architecture Estimate
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                SLA Guarantee
              </span>
            </div>

            {/* Metrics display */}
            <div className="space-y-5">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Estimated Delivery Timeline
                </span>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-baseline gap-2">
                  <span>{calculation.minWeeks} – {calculation.maxWeeks}</span>
                  <span className="text-lg font-medium text-slate-400">Weeks</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Estimated Milestone Investment
                </span>
                <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent tracking-tight">
                  ${calculation.minCost.toLocaleString()} – ${calculation.maxCost.toLocaleString()}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 font-mono">
                  Billed in milestone-verified sprints. Fixed-price contracts available.
                </p>
              </div>

              {/* Recommended Stack */}
              <div className="pt-4 border-t border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2 font-bold">
                  Recommended Tech Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {calculation.stack.map((tech) => (
                    <span key={tech} className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Guarantees */}
            <div className="mt-6 pt-5 border-t border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Intellectual Property & Source Code Ownership</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>NDA Protected & 30-Day Post-Launch Support</span>
              </div>
            </div>
          </div>

          {/* 1-Click Specification Submission Form */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-border shadow-lg">
            {isSubmitted ? (
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white">Specification Received!</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Our lead architect will review your configuration and send a formal statement of work within 24 hours.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2 text-xs font-mono"
                >
                  Adjust Estimate
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmitEstimate} className="space-y-4">
                <div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white mb-1">Lock in This Estimate</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Receive a detailed breakdown and book a 15-min discovery call.</p>
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Your Name *"
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium outline-none focus:border-indigo-500 transition-colors"
                  />

                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="Work Email *"
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium outline-none focus:border-indigo-500 transition-colors"
                  />

                  <div className="grid grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      value={clientCompany}
                      onChange={(e) => setClientCompany(e.target.value)}
                      placeholder="Company / Org"
                      className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium outline-none focus:border-indigo-500 transition-colors"
                    />
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="Phone / WhatsApp"
                      className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <textarea
                    rows={2}
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    placeholder="Brief project details or questions (optional)..."
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium outline-none focus:border-indigo-500 transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 text-xs sm:text-sm cursor-pointer border-0 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Specification...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Spec & Request Proposal</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  )
}
