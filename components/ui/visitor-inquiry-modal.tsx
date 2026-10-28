'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Send,
  Sparkles,
  CheckCircle2,
  Globe,
  Smartphone,
  Bot,
  Cpu,
  Cloud,
  MessageSquare,
  Loader2,
  ShieldCheck,
  User,
  Mail,
  Phone,
  ArrowRight,
  FileText,
  Lock,
  Zap,
  Check,
  ChevronDown,
  Layers
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { gtag_report_conversion } from '@/lib/gtag'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const SERVICE_OPTIONS = [
  { id: 'Website Development', label: 'Web & Cloud App Development' },
  { id: 'Mobile App Development', label: 'Mobile App Development (iOS & Android)' },
  { id: 'AI & Automation', label: 'AI, Machine Learning & Automation' },
  { id: 'Custom Software', label: 'Custom Enterprise Software / SaaS' },
  { id: 'Cloud Solutions', label: 'Cloud Solutions & DevOps Mesh' },
  { id: 'Consultation', label: 'Technical Consultation & Architecture' },
]

export function VisitorInquiryModal() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedLeadId, setSubmittedLeadId] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Website Development',
    message: '',
  })

  // Close custom dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    // Never show on admin pages
    if (pathname && pathname.startsWith('/admin')) {
      return
    }

    // Trigger popup after 3 seconds on every page load/refresh
    const timer = setTimeout(() => {
      setIsSubmitted(false)
      setIsOpen(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [pathname])

  const handleDismiss = () => {
    setIsOpen(false)
    setIsSubmitted(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error('Please provide your name, email, and mobile/WhatsApp number.')
      return
    }

    setIsSubmitting(true)

    const leadId = `MN-${Date.now().toString().slice(-6)}`
    setSubmittedLeadId(leadId)
    const timestampStr = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })

    try {
      // 1. Sync to Google Sheet Webhook immediately
      const webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL
      if (webhookUrl) {
        fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({
            id: leadId,
            timestamp: timestampStr,
            source: 'WEBSITE_POPUP',
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            phone: formData.phone.trim(),
            service: formData.service,
            message: formData.message.trim() || 'Direct inquiry via welcome consultation popup',
            status: 'NEW',
          }),
        }).catch((err) => console.error('Google Sheet sync error:', err))
      }

      // 2. Save to Firestore Database
      try {
        await addDoc(collection(db, 'leads'), {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          company: 'Website Visitor',
          service: formData.service,
          message: formData.message.trim() || 'Direct inquiry via welcome consultation popup',
          source: 'WEBSITE_POPUP',
          status: 'NEW',
          timestamp: serverTimestamp(),
        })
      } catch (dbErr) {
        // Silent catch for firestore permission if rules pending
      }

      // 3. Fire Google Ads conversion
      gtag_report_conversion()

      setIsSubmitted(true)
      // Reset form fields for subsequent visits
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Website Development',
        message: '',
      })
      toast.success('Your message has been received! We will get back to you shortly.')
    } catch (err: any) {
      console.error('Popup submission error:', err)
      toast.error('Could not submit inquiry. Please try again or use our contact page.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Backdrop with sophisticated blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleDismiss}
          className="fixed inset-0 bg-slate-950/65 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[480px] rounded-[28px] sm:rounded-[32px] bg-white/95 dark:bg-[#07070f]/95 border border-slate-200/90 dark:border-white/10 shadow-[0_25px_70px_rgba(15,23,42,0.22)] dark:shadow-[0_25px_80px_rgba(79,70,229,0.18)] backdrop-blur-2xl overflow-hidden z-10 text-slate-900 dark:text-white"
        >
          {/* Top Decorative Gradient Accent Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          {/* Ambient Lighting Background Accents */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-indigo-500/15 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-emerald-500/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={handleDismiss}
            aria-label="Close modal"
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all cursor-pointer z-30 group"
          >
            <X className="w-4 h-4 transition-transform group-hover:rotate-90 duration-200" />
          </button>

          {isSubmitted ? (
            /* Clean & Simple Success State with OK button */
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 px-6 sm:px-8 text-center flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 dark:text-emerald-400 mb-4 shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
                Message Received!
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-white/60 max-w-xs leading-relaxed mb-3 font-medium">
                Your message has been received. We will get back to you shortly.
              </p>

              <p className="text-xs text-slate-500 dark:text-white/40 mb-6 font-medium">
                For immediate assistance: <br />
                <a href="tel:+918796140682" onClick={() => gtag_report_conversion()} className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">+91 8796140682</a>
                {' / '}
                <a href="tel:+917838130064" onClick={() => gtag_report_conversion()} className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">+91 78381 30064</a>
                {' / '}
                <a href="tel:+917428128001" onClick={() => gtag_report_conversion()} className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">+91 7428 128 001</a>
              </p>

              <Button
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  setIsSubmitted(false)
                }}
                className="w-full max-w-[160px] h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-indigo-600/25 border-0 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                OK
              </Button>
            </motion.div>
          ) : (
            /* Inquiry Form */
            <div className="p-6 sm:p-7">
              {/* Centered Stylish Header */}
              <div className="mb-6 text-center">
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white inline-flex items-center justify-center gap-1.5">
                  <span>Connect With</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-300 dark:to-pink-400">
                    Us
                  </span>
                  <Sparkles className="w-4 h-4 text-indigo-500 inline-block ml-0.5" />
                </h3>
                <div className="w-10 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mx-auto mt-2 opacity-80" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* 1. Full Name */}
                <div>
                  <label className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-slate-600 dark:text-white/60 font-bold mb-1.5">
                    <span>Full Name</span>
                    <span className="text-indigo-600 dark:text-indigo-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-white/30" />
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-11 pl-10 pr-3 rounded-xl bg-slate-50/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-400 dark:placeholder:text-white/20"
                    />
                  </div>
                </div>

                {/* 2. Work Email */}
                <div>
                  <label className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-slate-600 dark:text-white/60 font-bold mb-1.5">
                    <span>Work Email</span>
                    <span className="text-indigo-600 dark:text-indigo-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-white/30" />
                    <input
                      type="email"
                      required
                      placeholder="Your Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-11 pl-10 pr-3 rounded-xl bg-slate-50/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-400 dark:placeholder:text-white/20"
                    />
                  </div>
                </div>

                {/* 3. Mobile Number / WhatsApp (Mandatory) */}
                <div>
                  <label className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-slate-600 dark:text-white/60 font-bold mb-1.5">
                    <span>Mobile Number / WhatsApp</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-[9px] bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">
                      MANDATORY *
                    </span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-white/30" />
                    <input
                      type="tel"
                      required
                      placeholder="Your Mobile Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-11 pl-10 pr-3 rounded-xl bg-slate-50/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-400 dark:placeholder:text-white/20"
                    />
                  </div>
                </div>

                {/* 4. Primary Area of Interest (Custom Downward Dropdown) */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-600 dark:text-white/60 font-bold mb-1.5">
                    Primary Area of Interest
                  </label>
                  <div ref={dropdownRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen((prev) => !prev)}
                      className="w-full h-11 pl-10 pr-10 rounded-xl bg-slate-50/90 dark:bg-[#0a0a14] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs sm:text-sm font-medium flex items-center justify-between text-left focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer"
                    >
                      <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-white/30 pointer-events-none" />
                      <span className="truncate">
                        {SERVICE_OPTIONS.find((item) => item.id === formData.service)?.label || formData.service}
                      </span>
                      <ChevronDown
                        className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-white/40 transition-transform duration-200 pointer-events-none ${isDropdownOpen ? 'rotate-180 text-indigo-500' : ''
                          }`}
                      />
                    </button>

                    {/* Dropdown Menu - Always opens DOWNWARDS */}
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1.5 py-1.5 rounded-xl bg-white dark:bg-[#0c0c18] border border-slate-200 dark:border-white/15 shadow-2xl z-50 max-h-52 overflow-y-auto backdrop-blur-2xl">
                        {SERVICE_OPTIONS.map((item) => {
                          const isSelected = formData.service === item.id
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, service: item.id })
                                setIsDropdownOpen(false)
                              }}
                              className={`w-full px-3.5 py-2.5 text-left text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer ${isSelected
                                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
                                : 'text-slate-700 dark:text-white/80 hover:bg-slate-100 dark:hover:bg-white/5'
                                }`}
                            >
                              <span className="truncate pr-2">{item.label}</span>
                              {isSelected && <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* 5. Brief Scope / Timeline (Optional) */}
                <div>
                  <label className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-slate-600 dark:text-white/60 font-bold mb-1.5">
                    <span>Project Vision / Timeline</span>
                    <span className="text-slate-400 font-normal normal-case text-[10px]">Optional</span>
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 dark:text-white/30" />
                    <textarea
                      rows={2}
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none placeholder:text-slate-400 dark:placeholder:text-white/20"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-1">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-indigo-600/25 border-0 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Submit</span>
                    )}
                  </Button>
                </div>

                {/* Trust Footer Signals */}
                <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-slate-500 dark:text-white/40 pt-1">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-indigo-500" />
                    <span>NDA Protected</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-500" />
                    <span>Avg. Response &lt; 2h</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    <span>Zero Spam</span>
                  </span>
                </div>

                {/* Direct Dial Assistance */}
                <div className="pt-2 text-center border-t border-slate-100 dark:border-white/5">
                  <p className="text-[11px] text-slate-500 dark:text-white/40">
                    Need instant consultation? Call{' '}
                    <a
                      href="tel:+918796140682"
                      onClick={() => gtag_report_conversion()}
                      className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline whitespace-nowrap"
                    >
                      +91 8796140682
                    </a>
                    {', '}
                    <a
                      href="tel:+917838130064"
                      onClick={() => gtag_report_conversion()}
                      className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline whitespace-nowrap"
                    >
                      +91 78381 30064
                    </a>
                    {' or '}
                    <a
                      href="tel:+917428128001"
                      onClick={() => gtag_report_conversion()}
                      className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline whitespace-nowrap"
                    >
                      +91 7428 128 001
                    </a>
                  </p>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
