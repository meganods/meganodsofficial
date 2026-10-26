"use client"

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Twitter, 
  Linkedin, 
  Github, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin,
  ArrowUpRight,
  Database,
  Satellite,
  Shield,
  Zap,
  Cpu,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { gtag_report_conversion } from '@/lib/gtag'

const footerLinks = {
  entity: [
    { label: 'Home', href: '/', id: '01' },
    { label: 'About Us', href: '/about', id: '02' },
    { label: 'Services', href: '/services', id: '03' },
    { label: 'Projects', href: '/projects', id: '04' },
    { label: 'Our Team', href: '/team', id: '05' },
    { label: 'Insights', href: '/blog', id: '06' },
    { label: 'Contact Us', href: '/contact', id: '07' },
  ],
  trustAndLegal: [
    { label: 'Privacy Policy', href: '/privacy', id: '01' },
    { label: 'Terms & Conditions', href: '/terms', id: '02' },
    { label: 'Cookie Policy', href: '/cookie-policy', id: '03' },
    { label: 'Contact Us', href: '/contact', id: '04' },
  ],
  operations: [
    { label: 'Engineering Insights', href: '/blog', id: '01' },
    { label: 'Project Portfolio', href: '/projects', id: '02' },
    { label: 'Technology Stack', href: '/technologies/neural-ai-cognitive-systems', id: '03' },
    { label: 'Client Support', href: '/contact', id: '04' },
  ],
}

const socialLinks = [
  { icon: Twitter, href: 'https://x.com/MegaNods33550', label: 'X (Twitter)', color: 'hover:text-indigo-600 hover:border-indigo-600' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/meganods-08b7b5400/', label: 'LinkedIn', color: 'hover:text-indigo-600 hover:border-indigo-600' },
  { icon: Instagram, href: 'https://www.instagram.com/mega.nods/', label: 'Instagram', color: 'hover:text-pink-600 hover:border-pink-600' },
]

export function Footer() {
  return (
    <footer className="relative bg-white dark:bg-background border-t border-slate-200 dark:border-border overflow-hidden text-slate-900 dark:text-foreground">
      {/* Cinematic HUD Overlays */}
      <div className="absolute inset-0 grid-pattern opacity-[0.03] dark:opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[800px] h-[400px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[800px] h-[400px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Background Large Text Logo */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none select-none">
         <span className="text-[10rem] md:text-[18rem] font-bold text-slate-900/[0.02] dark:text-white/[0.02] tracking-tighter leading-none whitespace-nowrap">
            MegaNods
         </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16">
        {/* Newsletter - The Neural Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white/90 dark:bg-card/40 backdrop-blur-3xl border border-slate-200 dark:border-border rounded-[3rem] p-1 lg:p-1.5 mb-24 group hover:border-indigo-500/40 transition-all duration-700 overflow-hidden shadow-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 dark:from-indigo-500/10 to-transparent pointer-events-none" />
          <div className="relative p-8 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                 <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center">
                    <Database className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                 </div>
                 <span className="text-indigo-600 dark:text-indigo-400 font-mono text-xs sm:text-sm uppercase tracking-[0.3em] font-extrabold">Neural Feed v1.0</span>
              </div>
              <h3 className="text-3xl lg:text-5xl font-black mb-4 tracking-tight text-slate-900 dark:text-foreground">
                Connect your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400 dark:from-indigo-400 dark:to-blue-400">Intelligence Node</span>.
              </h3>
              <p className="text-slate-800 dark:text-slate-200 text-base sm:text-lg font-semibold max-w-xl mx-auto lg:mx-0">Receive the latest technical audits and operational updates directly to your terminal.</p>
            </div>
            
            <div className="w-full lg:w-auto">
               <form className="flex flex-col sm:flex-row gap-3 p-2 bg-white dark:bg-card/85 backdrop-blur-3xl border border-slate-200 dark:border-border rounded-2xl lg:rounded-[2rem] w-full lg:w-[480px] shadow-lg">
                 <input
                   type="email"
                   placeholder="Terminal Email..."
                   className="flex-1 bg-transparent px-6 py-4 text-slate-900 dark:text-foreground font-bold placeholder:text-slate-400 outline-none text-base"
                 />
                 <Button
                   type="submit"
                   className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl lg:rounded-[1.5rem] transition-all text-base shadow-xl flex items-center justify-center gap-2 group border-0"
                 >
                   Subscribe <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </Button>
               </form>
               <div className="mt-4 flex items-center justify-center lg:justify-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-slate-900 dark:text-slate-300 font-bold uppercase tracking-wider whitespace-nowrap">Secure Subscription active</span>
               </div>
            </div>
          </div>
        </motion.div>

        {/* Global Catalog Mapping */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.2fr] gap-10 lg:gap-8 xl:gap-12 mb-24 w-full items-start">
          {/* Brand Vector */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3.5 mb-6 group">
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                  <Image src="/logo.png" alt="MegaNods Logo" width={48} height={48} className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl sm:text-3xl font-black tracking-tight leading-none text-[#154954] dark:text-[#42b4c7]">
                MegaNods
              </span>
            </Link>
            <p className="text-slate-900 dark:text-slate-200 text-sm sm:text-base leading-relaxed font-semibold mb-8 max-w-sm">
              Empowering global entities with disruptive neural technology and high-fidelity operational infrastructure.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`w-11 h-11 rounded-xl bg-slate-50 dark:bg-card border border-slate-200 dark:border-border flex items-center justify-center text-slate-900 dark:text-slate-100 transition-all shadow-sm group ${social.color}`}
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 1: ENTITY */}
          <div className="w-full">
            <h4 className="text-xs sm:text-sm font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.25em] font-black mb-6">
              Entity
            </h4>
            <ul className="space-y-3.5">
              {footerLinks.entity.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group font-bold tracking-tight text-sm sm:text-[15px]"
                  >
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-semibold">{link.id}</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: TRUST */}
          <div className="w-full">
            <h4 className="text-xs sm:text-sm font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.25em] font-black mb-6">
              Trust
            </h4>
            <ul className="space-y-3.5">
              {footerLinks.trustAndLegal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group font-bold tracking-tight text-sm sm:text-[15px]"
                  >
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-semibold">{link.id}</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: OPERATIONS */}
          <div className="w-full">
            <h4 className="text-xs sm:text-sm font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.25em] font-black mb-6">
              Operations
            </h4>
            <ul className="space-y-3.5">
              {footerLinks.operations.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group font-bold tracking-tight text-sm sm:text-[15px]"
                  >
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-semibold">{link.id}</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: TERMINAL */}
          <div className="w-full">
            <h4 className="text-xs sm:text-sm font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.25em] font-black mb-6">
              Terminal
            </h4>
            <ul className="space-y-4">
              <li>
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono text-slate-900 dark:text-slate-300 font-extrabold uppercase tracking-widest">Global Mail</span>
                    <a 
                      href="mailto:admin@meganods.com" 
                      onClick={() => gtag_report_conversion()}
                      className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 hover:text-indigo-600 transition-colors break-all"
                    >
                      admin@meganods.com
                    </a>
                 </div>
              </li>
              <li>
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono text-slate-900 dark:text-slate-300 font-extrabold uppercase tracking-widest">Base Phone</span>
                    <a 
                      href="tel:+918796140682" 
                      onClick={() => gtag_report_conversion()}
                      className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 hover:text-indigo-600 transition-colors whitespace-nowrap"
                    >
                      +91 8796140682
                    </a>
                 </div>
              </li>
              <li>
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono text-slate-900 dark:text-slate-300 font-extrabold uppercase tracking-widest">HQ Sector</span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-200 leading-relaxed">OC-821 8th Floor, Gaur City Centre, Greater Noida West, Uttar Pradesh.</span>
                 </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Operational Status Bar */}
        <div className="pt-12 border-t border-slate-200 dark:border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
             <p className="text-slate-900 dark:text-slate-200 text-xs font-mono font-bold uppercase tracking-[0.2em]">
               © {new Date().getFullYear()} MegaNods. All systems operational.
             </p>
             <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500" />
                   <span className="text-[10px] font-mono text-slate-900 dark:text-slate-200 font-bold uppercase tracking-wider">Global Mesh: Active</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-blue-500" />
                   <span className="text-[10px] font-mono text-slate-900 dark:text-slate-200 font-bold uppercase tracking-wider">Edge Latency: &lt; 45ms</span>
                </div>
             </div>
          </div>
          
          <div className="flex flex-wrap gap-4 sm:gap-6">
            {[
              { label: 'Privacy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
              { label: 'Cookie Policy', href: '/cookie-policy' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs font-mono text-slate-900 dark:text-slate-100 font-bold uppercase tracking-widest hover:text-indigo-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
