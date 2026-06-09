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

const footerLinks = {
  company: [
    { label: 'About Node', href: '/about', id: '01' },
    { label: 'Operational Team', href: '/team', id: '02' },
    { label: 'Career Mesh', href: '/careers', id: '03' },
    { label: 'Terminal Connect', href: '/contact', id: '04' },
  ],
  services: [
    { label: 'Neural AI', href: '/services#ai', id: '05' },
    { label: 'Cloud Fabric', href: '/services#cloud', id: '06' },
    { label: 'Cyber Defense', href: '/services#cyber', id: '07' },
    { label: 'High-Freq Data', href: '/services#data', id: '08' },
  ],
  resources: [
    { label: 'Intelligence Feed', href: '/blog', id: '09' },
    { label: 'Audit Portfolio', href: '/projects', id: '10' },
    { label: 'Technical Docs', href: '/docs', id: '11' },
    { label: 'Support Uplink', href: '/support', id: '12' },
  ],
}

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-indigo-500 hover:border-indigo-500/50' },
  { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-indigo-600 hover:border-indigo-600/50' },
  { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-foreground hover:border-foreground/50' },
  { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-500 hover:border-pink-500/50' },
]

export function Footer() {
  return (
    <footer className="relative bg-background border-t border-border overflow-hidden">
      {/* Cinematic HUD Overlays */}
      <div className="absolute inset-0 grid-pattern opacity-[0.03] dark:opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[800px] h-[400px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[800px] h-[400px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Background Large Text Logo */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none select-none">
         <span className="text-[10rem] md:text-[18rem] font-bold text-foreground/[0.015] dark:text-white/[0.02] tracking-tighter leading-none whitespace-nowrap">
            Meganods
         </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-16">
        {/* Newsletter - The Neural Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-card/40 backdrop-blur-3xl border border-border rounded-[3rem] p-1 lg:p-1.5 mb-32 group hover:border-indigo-500/30 transition-all duration-700 overflow-hidden shadow-sm dark:shadow-none"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 dark:from-indigo-500/10 to-transparent pointer-events-none" />
          <div className="relative p-10 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                 <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <Database className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                 </div>
                 <span className="text-indigo-600 dark:text-indigo-400 font-mono text-[10px] uppercase tracking-[0.4em]">Neural Feed v1.0</span>
              </div>
              <h3 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tighter text-foreground">
                Connect your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400 dark:from-indigo-400 dark:to-blue-400">Intelligence Node</span>.
              </h3>
              <p className="text-muted-foreground text-xl font-medium max-w-xl mx-auto lg:mx-0">Receive the latest technical audits and operational updates directly to your terminal.</p>
            </div>
            
            <div className="w-full lg:w-auto">
               <form className="flex flex-col sm:flex-row gap-4 p-2 bg-card/85 backdrop-blur-3xl border border-border rounded-3xl lg:rounded-[2.5rem] w-full lg:w-[500px] shadow-lg">
                 <input
                   type="email"
                   placeholder="Terminal Email..."
                   className="flex-1 bg-transparent px-8 py-5 text-foreground font-bold placeholder:text-foreground/20 outline-none text-lg"
                 />
                 <Button
                   type="submit"
                   className="px-10 py-5 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-2xl lg:rounded-[2rem] transition-all text-lg shadow-2xl flex items-center justify-center gap-3 group border-0"
                 >
                   Establish <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                 </Button>
               </form>
               <div className="mt-6 flex items-center justify-center lg:justify-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-foreground/30 dark:text-white/30 uppercase tracking-widest whitespace-nowrap">Secure Subscription active</span>
               </div>
            </div>
          </div>
        </motion.div>

        {/* Global Catalog Mapping */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-12 lg:gap-24 mb-32">
          {/* Brand Vector */}
          <div className="col-span-2 lg:col-span-4">
            <Link href="/" className="flex items-center gap-4 mb-10 group">
              <div className="relative w-12 h-12">
                 <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-indigo-500/30 rounded-xl" 
                 />
                  <div className="absolute inset-1.5 bg-card rounded-lg border border-border flex items-center justify-center shadow-2xl font-black text-xl text-foreground group-hover:text-indigo-600 transition-colors">
                     M
                  </div>
              </div>
              <span className="text-3xl font-black tracking-tighter leading-none text-foreground">
                Mega<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">nods</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-lg leading-relaxed font-medium mb-12 max-w-sm">
              Empowering global entities with disruptive neural technology and high-fidelity operational infrastructure.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center text-foreground/40 transition-all shadow-md group ${social.color}`}
                >
                  <social.icon className="w-6 h-6 group-hover:scale-125 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Catalog Columns */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.4em] mb-10">Entity</h4>
            <ul className="space-y-6">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-end gap-3 text-foreground/50 hover:text-indigo-600 dark:hover:text-white transition-all group font-bold tracking-tight text-lg"
                  >
                    <span className="text-[9px] font-mono text-foreground/15 mb-1">{link.id}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.4em] mb-10">Protocols</h4>
            <ul className="space-y-6">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-end gap-3 text-foreground/50 hover:text-indigo-600 dark:hover:text-white transition-all group font-bold tracking-tight text-lg"
                  >
                    <span className="text-[9px] font-mono text-foreground/15 mb-1">{link.id}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.4em] mb-10">Operations</h4>
            <ul className="space-y-6">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-end gap-3 text-foreground/50 hover:text-indigo-600 dark:hover:text-white transition-all group font-bold tracking-tight text-lg"
                  >
                    <span className="text-[9px] font-mono text-foreground/15 mb-1">{link.id}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.4em] mb-10">Terminal</h4>
            <ul className="space-y-8">
              <li>
                 <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-mono text-foreground/30 dark:text-white/20 uppercase tracking-widest">Global Mail</span>
                    <a href="mailto:contact@meganods.com" className="text-xl font-bold text-foreground hover:text-indigo-600 transition-colors">contact@meganods.com</a>
                 </div>
              </li>
              <li>
                 <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-mono text-foreground/30 dark:text-white/20 uppercase tracking-widest">Base Phone</span>
                    <a href="tel:+918796140682" className="text-xl font-bold text-foreground hover:text-indigo-600 transition-colors">+91 8796140682</a>
                 </div>
              </li>
              <li>
                 <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-mono text-foreground/30 dark:text-white/20 uppercase tracking-widest">HQ Sector</span>
                    <span className="text-sm font-bold text-muted-foreground">OC-821 8th Floor, Gaur City Centre, Greater Noida West, Uttar Pradesh.</span>
                 </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Operational Status Bar */}
        <div className="pt-20 border-t border-border flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-8">
             <p className="text-foreground/30 dark:text-white/20 text-[10px] font-mono uppercase tracking-[0.3em]">
               © {new Date().getFullYear()} Meganods. All systems operational.
             </p>
             <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                   <span className="text-[9px] font-mono text-foreground/30 dark:text-white/20 uppercase tracking-widest">Global Mesh: Active</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                   <span className="text-[9px] font-mono text-foreground/30 dark:text-white/20 uppercase tracking-widest">Lat: -0.002ms</span>
                </div>
             </div>
          </div>
          
          <div className="flex gap-8">
            {['Privacy', 'Terms', 'License'].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-[10px] font-mono text-foreground/30 dark:text-white/20 uppercase tracking-[0.3em] hover:text-foreground transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
