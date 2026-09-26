'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, ShieldCheck, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already acknowledged cookie preferences
    const consent = localStorage.getItem('meganods_cookie_consent')
    if (!consent) {
      // Small delay so it appears smoothly after initial load
      const timer = setTimeout(() => setIsVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem('meganods_cookie_consent', 'accepted_all')
    setIsVisible(false)
  }

  const handleAcceptEssential = () => {
    localStorage.setItem('meganods_cookie_consent', 'essential_only')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:max-w-md z-50 pointer-events-auto"
        role="dialog"
        aria-label="Cookie consent dialog"
      >
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-indigo-500/10 dark:shadow-black/50 text-slate-900 dark:text-foreground">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                <Cookie className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-white">Privacy & Cookie Preferences</h3>
                <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-wider font-bold">GDPR & AdSense Compliant</span>
              </div>
            </div>
            <button
              onClick={handleAcceptEssential}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
              aria-label="Close cookie consent banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium mb-6">
            We use cookies to analyze site traffic, personalize digital experiences, and serve relevant Google AdSense partner advertisements in accordance with our{' '}
            <Link href="/privacy" className="text-indigo-600 dark:text-indigo-400 font-bold underline hover:text-indigo-700">
              Privacy Policy
            </Link>.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <Button
              onClick={handleAcceptAll}
              className="flex-1 h-10 px-5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-500/20 border-0 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 mr-1.5" />
              Accept All
            </Button>
            <Button
              onClick={handleAcceptEssential}
              variant="outline"
              className="flex-1 h-10 px-4 rounded-xl border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              Essential Only
            </Button>
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  )
}
