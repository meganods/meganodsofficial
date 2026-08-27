"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Satellite, Terminal, Shield, Zap, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '/', label: 'Home', index: '01' },
  { href: '/about', label: 'About', index: '02' },
  {
    href: '/services',
    label: 'Services',
    index: '03',
    submenu: [
      { href: '/services#ai', label: 'AI Solutions', icon: Target },
      { href: '/services#cloud', label: 'Cloud Core', icon: Zap },
      { href: '/services#cyber', label: 'Security', icon: Shield },
    ]
  },
  { href: '/projects', label: 'Projects', index: '04' },
  { href: '/team', label: 'Nodes', index: '05' },
  { href: '/blog', label: 'Insights', index: '06' },
  { href: '/testimonials', label: 'Matrix', index: '07' },
  { href: '/contact', label: 'Contact', index: '08' },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed left-0 right-0 z-[100] transition-all duration-700 ${
          isScrolled 
            ? 'top-4' 
            : 'top-2.5 md:top-8'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className={`relative flex items-center justify-between px-8 h-20 rounded-[2rem] border transition-all duration-700 ${isScrolled
               ? 'bg-background/80 backdrop-blur-3xl border-border/40 shadow-xl shadow-slate-200/50 dark:shadow-[0_0_40px_rgba(0,0,0,0.5)]'
               : 'bg-transparent border-transparent'
             }`}>
            {/* Logo Hub */}
            <Link href="/" className="flex items-center gap-4 group relative z-10">
              <div className="relative w-14 h-14 flex items-center justify-center bg-white rounded-xl shadow-lg border border-border overflow-hidden shrink-0">
                  <img src="/logo.jpeg" alt="Meganods" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tighter leading-none text-foreground">
                  Mega<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">nods</span>
                </span>
                <span className="text-[8px] font-mono text-foreground/30 tracking-[0.4em] uppercase mt-1 hidden sm:block">Innovating the Future of Technology</span>
              </div>
            </Link>

            {/* Tactical Navigation Links */}
            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative group/nav"
                  onMouseEnter={() => link.submenu && setActiveSubmenu(link.href)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <Link
                    href={link.href}
                    className={`px-5 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-500 flex items-center gap-3 ${pathname === link.href
                        ? 'text-foreground'
                        : 'text-foreground/45 hover:text-foreground'
                       }`}
                  >
                    <span className="text-[9px] font-mono text-indigo-500/50 group-hover/nav:text-indigo-500 transition-colors">{link.index}</span>
                    {link.label}
                    {link.submenu && <ChevronDown className="w-3.5 h-3.5 opacity-40 group-hover/nav:rotate-180 transition-transform" />}
                  </Link>

                  {/* Under-glow Indicator */}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="nav-glow"
                      className="absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-80"
                    />
                  )}

                  {/* Enhanced Submenu HUD */}
                  <AnimatePresence>
                    {link.submenu && activeSubmenu === link.href && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-0 mt-4 w-64 p-3 bg-card backdrop-blur-3xl border border-border rounded-3xl shadow-xl overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
                        {link.submenu.map((sublink) => (
                          <Link
                            key={sublink.href}
                            href={sublink.href}
                            className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[10px] font-bold text-foreground/50 uppercase tracking-widest hover:text-foreground hover:bg-secondary transition-all group/sub"
                          >
                            <div className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center group-hover/sub:border-indigo-500/30 transition-all">
                              <sublink.icon className="w-4 h-4 text-indigo-500/75 group-hover/sub:text-indigo-600" />
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

            {/* Portal Actions */}
            <div className="hidden lg:flex items-center gap-6">
              <Link href="/contact">
                <Button
                  className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-2xl shadow-xl transition-all text-xs uppercase tracking-widest group border-0"
                >
                  Establish Hub
                  <Terminal className="ml-3 w-4 h-4 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Mobile Tactical Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 ${
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
      </motion.header>

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
                  <div className="relative w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow-md border border-border overflow-hidden shrink-0">
                      <img src="/logo.jpeg" alt="Meganods" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-lg font-bold tracking-tighter text-foreground">
                    Mega<span className="text-indigo-600">nods</span>
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
                  <Button className="w-full h-20 bg-primary text-primary-foreground hover:bg-primary/90 text-xl font-black rounded-3xl shadow-2xl transition-all uppercase hover:scale-[0.98] active:scale-95 border-0">
                    Establish Hub
                  </Button>
                </Link>

                <div className="mt-4">
                  <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center bg-white overflow-hidden shrink-0 shadow-md">
                    <img src="/logo.jpeg" alt="Meganods" className="w-full h-full object-cover scale-110" />
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
