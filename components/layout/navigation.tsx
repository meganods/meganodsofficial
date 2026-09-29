"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Satellite, ArrowRight, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SubmenuItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

interface NavLink {
  href: string
  label: string
  index: string
  submenu?: SubmenuItem[]
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Home', index: '01' },
  { href: '/about', label: 'About', index: '02' },
  { href: '/services', label: 'Services', index: '03' },
  { href: '/projects', label: 'Projects', index: '04' },
  { href: '/team', label: 'Team', index: '05' },
  { href: '/blog', label: 'Insights', index: '06' },
]

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header className="relative w-full z-50 bg-white/95 dark:bg-background/95 backdrop-blur-md border-b border-slate-200/80 dark:border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-20">
            {/* Logo Hub */}
            <Link href="/" className="flex items-center gap-3.5 group relative z-10">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shrink-0">
                  <Image src="/logo.png" alt="MegaNods Logo" width={56} height={56} priority className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tighter leading-none text-[#154954] dark:text-[#42b4c7]">
                  MegaNods
                </span>
                <span className="text-[8.5px] font-mono text-slate-700 dark:text-slate-300 font-bold tracking-[0.25em] uppercase mt-1 hidden sm:block">
                  Innovating The Future Of Technology
                </span>
              </div>
            </Link>

            {/* Tactical Navigation Links */}
            <div className="hidden lg:flex items-center gap-1.5 xl:gap-3">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative group/nav"
                  onMouseEnter={() => link.submenu && setActiveSubmenu(link.href)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <Link
                    href={link.href}
                    className={`px-3 xl:px-4 py-2.5 rounded-xl text-[14px] xl:text-[15px] font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${pathname === link.href
                        ? 'text-slate-950 dark:text-white font-black'
                        : 'text-slate-800 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-white'
                       }`}
                  >
                    <span className="text-[11px] xl:text-[12px] font-mono text-indigo-600 font-bold group-hover/nav:text-indigo-700 transition-colors">{link.index}</span>
                    <span>{link.label}</span>
                    {link.submenu && <ChevronDown className="w-4 h-4 text-slate-700 group-hover/nav:text-indigo-600 group-hover/nav:rotate-180 transition-transform" />}
                  </Link>

                  {/* Under-glow Indicator */}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="nav-glow"
                      className="absolute bottom-0 left-3 right-3 xl:left-4 xl:right-4 h-[2.5px] bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 rounded-full"
                    />
                  )}

                  {/* Enhanced Submenu HUD */}
                  <AnimatePresence>
                    {link.submenu && activeSubmenu === link.href && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-0 mt-4 w-64 p-3 bg-white/95 dark:bg-card/95 backdrop-blur-3xl border border-slate-200 dark:border-border rounded-3xl shadow-2xl overflow-hidden z-50"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
                        {link.submenu.map((sublink) => (
                          <Link
                            key={sublink.href}
                            href={sublink.href}
                            className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[13px] font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-secondary transition-all group/sub"
                          >
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center group-hover/sub:border-indigo-500/50 transition-all">
                              <sublink.icon className="w-4 h-4 text-indigo-600 group-hover/sub:text-indigo-700" />
                            </div>
                            {sublink.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Desktop Actions (Search & Contact) */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open-search'))}
                aria-label="Search"
                className="h-11 px-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium flex items-center gap-2.5 transition-all cursor-pointer border border-slate-200/60 dark:border-slate-700/60 hover:scale-105 active:scale-95 shadow-2xs"
              >
                <Search className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs text-slate-500 font-sans hidden xl:inline">Search...</span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-500">
                  ⌘K
                </span>
              </button>

              <Link href="/contact">
                <Button
                  className="h-11 px-6 xl:px-7 bg-primary text-primary-foreground hover:bg-primary/90 font-extrabold rounded-2xl shadow-xl transition-all text-[13px] xl:text-[14px] uppercase tracking-wider group border-0 flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Contact
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Mobile Tactical Trigger & Search */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open-search'))}
                aria-label="Open Search"
                className="w-11 h-11 flex items-center justify-center rounded-2xl bg-secondary/80 border border-border/80 text-foreground cursor-pointer active:scale-95 transition-all"
              >
                <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
                className={`w-11 h-11 flex items-center justify-center rounded-2xl transition-all duration-300 cursor-pointer ${
                  isMobileMenuOpen 
                    ? 'bg-secondary border-border text-foreground rotate-90 scale-90' 
                    : 'bg-secondary/80 border-border/80 text-foreground'
                }`}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Cinematic Mobile HUD */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] lg:hidden overflow-hidden"
          >
            <div className="absolute inset-0 bg-background flex flex-col">
              {/* Top Header Row */}
              <div className="flex items-center justify-between px-10 pt-10 pb-6">
                <Link href="/" className="flex items-center gap-4" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                      <Image src="/logo.png" alt="Meganods Logo" width={48} height={48} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-lg font-bold tracking-tighter text-[#154954] dark:text-[#42b4c7]">
                    MegaNods
                  </span>
                </Link>
                
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-secondary border border-border text-foreground"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <motion.nav
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex-1 flex flex-col justify-center px-10 overflow-y-auto no-scrollbar py-8"
              >
                {/* Mobile Search Button */}
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    window.dispatchEvent(new CustomEvent('open-search'))
                  }}
                  className="mb-8 w-full p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-slate-500 font-medium text-sm cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Search className="w-5 h-5 text-indigo-600" />
                    <span>Search all services & articles...</span>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    ⌘K
                  </span>
                </button>

                <div className="flex flex-col gap-4 py-4">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`group flex items-center gap-6 text-5xl font-black tracking-tighter uppercase transition-all ${
                          pathname === link.href ? 'text-foreground' : 'text-foreground/30'
                        }`}
                      >
                        <span className="text-sm font-mono text-indigo-600 w-8">{link.index}</span>
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.nav>

              {/* Bottom Section */}
              <div className="px-10 pb-12 flex flex-col gap-8">
                <div className="h-px bg-border w-full" />
                
                <div className="flex items-center gap-4">
                  <Satellite className="w-5 h-5 text-indigo-500" />
                  <span className="text-[10px] font-mono text-foreground/40 uppercase tracking-[0.3em]">
                    Active Uplink: Established
                  </span>
                </div>

                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-base font-bold rounded-2xl shadow-xl transition-all uppercase hover:scale-[0.98] active:scale-95 border-0 flex items-center justify-center gap-2">
                    Contact Us
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <div className="mt-2">
                  <div className="w-12 h-12 flex items-center justify-center shrink-0">
                    <Image src="/logo.png" alt="Meganods Logo" width={48} height={48} className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
