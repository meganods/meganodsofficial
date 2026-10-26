'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Send, 
  Sparkles, 
  CheckCircle, 
  Globe, 
  Smartphone, 
  Bot, 
  Cpu, 
  Cloud, 
  MessageSquare,
  Loader2,
  ShieldCheck
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { gtag_report_conversion } from '@/lib/gtag'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const SERVICE_OPTIONS = [
  { id: 'Website Development', label: 'Website / Web App', icon: Globe },
  { id: 'Mobile App Development', label: 'Mobile App (iOS/Android)', icon: Smartphone },
  { id: 'AI & Automation', label: 'AI & Machine Learning', icon: Bot },
  { id: 'Custom Software', label: 'Custom Software / SaaS', icon: Cpu },
  { id: 'Cloud Solutions', label: 'Cloud & Infrastructure', icon: Cloud },
  { id: 'Consultation', label: 'Technical Consultation', icon: MessageSquare },
]

export function VisitorInquiryModal() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Website Development',
    message: '',
  })

  useEffect(() => {
    // Never show on admin pages
    if (pathname && pathname.startsWith('/admin')) {
      return
    }

    // Check if user has already submitted or recently dismissed
    try {
      const alreadySubmitted = localStorage.getItem('meganods_popup_submitted')
      if (alreadySubmitted === 'true') {
        return
      }

      const dismissedUntil = localStorage.getItem('meganods_popup_dismissed_until')
      if (dismissedUntil && Date.now() < parseInt(dismissedUntil, 10)) {
        return
      }

      // Show popup after 3 seconds of browsing
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 3000)

      return () => clearTimeout(timer)
    } catch {
      // LocalStorage access may fail in restricted/incognito modes
    }
  }, [pathname])

  const handleDismiss = () => {
    setIsOpen(false)
    try {
      // Don't show again for 24 hours if dismissed
      const oneDayLater = Date.now() + 24 * 60 * 60 * 1000
      localStorage.setItem('meganods_popup_dismissed_until', oneDayLater.toString())
    } catch {
      // Ignore storage errors
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error('Please provide your name, email, and mobile number.')
      return
    }

    setIsSubmitting(true)

    const leadId = `LEAD-${Date.now()}`
    const timestampStr = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })

    try {
      // 1. Sync to Google Sheet Webhook immediately (guaranteed delivery)
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
            message: formData.message.trim() || 'Direct inquiry via welcome popup',
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
          message: formData.message.trim() || 'Direct inquiry via welcome popup',
          source: 'WEBSITE_POPUP',
          status: 'NEW',
          timestamp: serverTimestamp(),
        })
      } catch (dbErr) {
        console.warn('Firestore write warning (verify firestore rules):', dbErr)
      }

      // 3. Fire Google Ads conversion
      gtag_report_conversion()

      setIsSubmitted(true)

      try {
        localStorage.setItem('meganods_popup_submitted', 'true')
      } catch {
        // Ignore storage errors
      }

      toast.success('Your inquiry has been received! Our engineering team will contact you shortly.')

      // Auto close after 2.5 seconds
      setTimeout(() => {
        setIsOpen(false)
      }, 2500)
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleDismiss}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#06060c] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden p-6 sm:p-8 z-10 text-slate-900 dark:text-white"
        >
          {/* Ambient Corner Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-emerald-500/10 to-transparent blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={handleDismiss}
            aria-label="Close modal"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer z-20"
          >
            <X className="w-4 h-4" />
          </button>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 text-center flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 dark:text-emerald-400 mb-4 shadow-lg">
                <CheckCircle className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-2">
                Inquiry Received!
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-white/60 max-w-xs leading-relaxed">
                Thank you for reaching out. A Meganods technical consultant will review your project scope and connect with you shortly.
              </p>
            </motion.div>
          ) : (
            <div>
              {/* Badge & Title */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-mono text-[10px] uppercase tracking-widest font-bold w-fit mb-3">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>Project Consultation</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-tight mb-1">
                Have a Project in Mind?
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-white/50 mb-6 font-medium leading-relaxed">
                Tell us about your requirements and get a free architectural roadmap & estimate.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-white/40 font-bold mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-white/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-white/40 font-bold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-white/20"
                    />
                  </div>
                </div>

                {/* Mobile / WhatsApp */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-white/40 font-bold mb-1">
                    Mobile Number / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-white/20"
                  />
                </div>

                {/* Service Selection Chips */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-white/40 font-bold mb-2">
                    What service are you looking for?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {SERVICE_OPTIONS.map((item) => {
                      const Icon = item.icon
                      const isSelected = formData.service === item.id
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, service: item.id })}
                          className={`flex items-center gap-2 p-2.5 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                              : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-white/70 hover:border-indigo-500/40'
                          }`}
                        >
                          <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-indigo-500'}`} />
                          <span className="truncate">{item.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Brief Message (Optional) */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-white/40 font-bold mb-1">
                    Brief Scope / Timeline <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us a little about your project goals or timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-indigo-500 transition-colors resize-none placeholder:text-slate-400 dark:placeholder:text-white/20"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-indigo-500/20 border-0 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Get Free Estimate & Proposal</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-slate-400 dark:text-white/30 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>100% confidential. No spam, ever.</span>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
