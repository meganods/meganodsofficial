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
  { href: '/contact', label: 'Contact', index: '07' },
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
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${isScrolled
            ? 'py-4'
            : 'py-8'
          }`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className={`relative flex items-center justify-between px-8 h-20 rounded-[2rem] border transition-all duration-700 ${isScrolled
              ? 'bg-[#05050a]/60 backdrop-blur-3xl border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]'
              : 'bg-transparent border-transparent'
            }`}>
            {/* Logo Hub */}
            <Link href="/" className="flex items-center gap-4 group relative z-10">
              <div className="relative w-12 h-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-indigo-500/30 rounded-xl"
                />
                <div className="absolute inset-1.5 bg-[#010103] rounded-lg border border-white/10 flex items-center justify-center font-black text-xl text-white group-hover:text-indigo-400 transition-colors shadow-2xl">
                  M
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tighter leading-none text-white">
                  Mega<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">nods</span>
                </span>
                <span className="text-[8px] font-mono text-white/30 tracking-[0.4em] uppercase mt-1 hidden sm:block">Deep Tech Systems</span>
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
                        ? 'text-white'
                        : 'text-white/40 hover:text-white'
                      }`}
                  >
                    <span className="text-[9px] font-mono text-indigo-400/50 group-hover/nav:text-indigo-400 transition-colors">{link.index}</span>
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
                        className="absolute top-full left-0 mt-4 w-64 p-3 bg-[#05050a]/90 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
                        {link.submenu.map((sublink) => (
                          <Link
                            key={sublink.href}
                            href={sublink.href}
                            className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[10px] font-bold text-white/40 uppercase tracking-widest hover:text-white hover:bg-white/5 transition-all group/sub"
                          >
                            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center group-hover/sub:border-indigo-500/30 transition-all">
                              <sublink.icon className="w-4 h-4 text-indigo-400/50 group-hover/sub:text-indigo-400" />
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
                  className="h-12 px-8 bg-white text-black hover:bg-white/90 font-bold rounded-2xl shadow-xl transition-all text-xs uppercase tracking-widest group border-0"
                >
                  Establish Hub
                  <Terminal className="ml-3 w-4 h-4 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Mobile Tactical Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white"
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
            <div className="absolute inset-0 bg-[#010103]/95 backdrop-blur-3xl" />

            {/* Visual HUD grid */}
            <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />

            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative h-full w-full flex flex-col justify-center px-10"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={`group flex items-end gap-6 text-5xl md:text-7xl font-black tracking-tighter uppercase transition-all ${pathname === link.href
                          ? 'text-white'
                          : 'text-white/20 hover:text-white'
                        }`}
                    >
                      <span className="text-xl font-mono text-indigo-500 mb-2 md:mb-4">{link.index}</span>
                      {link.label}
                      <span className="w-0 group-hover:w-20 h-2 bg-indigo-500 rounded-full transition-all duration-500" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-20 border-t border-white/10 pt-10 flex flex-col gap-8"
              >
                <div className="flex items-center gap-4">
                  <Satellite className="w-6 h-6 text-indigo-400" />
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em]">Active Uplink: Established</span>
                </div>
                <Link href="/contact" className="w-full">
                  <Button
                    className="w-full h-20 bg-white text-black text-2xl font-black rounded-[2rem] shadow-2xl transition-all uppercase"
                  >
                    Establish Hub
                  </Button>
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
