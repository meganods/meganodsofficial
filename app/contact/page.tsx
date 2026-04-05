"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Headphones,
  Globe,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  CheckCircle,
  Shield,
  Fingerprint,
  Zap,
  Terminal,
  Cpu,
  ArrowRight,
  Loader2,
  Database,
  ArrowUpRight,
  ArrowRight as LinkIcon
} from "lucide-react"
import Link from "next/link"
import { DeepTechBackground } from "@/components/ui/deep-tech-background"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";

export default function ContactPage() {
  const [settings, setSettings] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    service: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, "settings", "contact");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings(docSnap.data());
        }
      } catch (error) {
        console.error("CONTACT_SETTINGS_FETCH_ERROR:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await addDoc(collection(db, "leads"), {
        ...formData,
        status: "NEW", // NEW, IN_PROGRESS, RESOLVED, REJECTED
        timestamp: serverTimestamp(),
      });
      setIsSubmitted(true);
      toast.success("TRANSMISSION_SUCCESSFUL: DATA_ENCRYPTED_AND_STORED");
    } catch (error: any) {
      console.error("LEAD_SUBMISSION_ERROR:", error);
      toast.error(`TRANSMISSION_FAILURE: ${error.message}`);
    } finally {
      setIsSubmitting(false)
    }
  }

  // Define default structure if settings are missing
  const activeSettings = settings || {
    hero: {
      badge: "Secure Engagement Protocol",
      title: "Establish Connection.",
      subtitle: "Initiate a strategic dialogue with our engineering department. Our tactical teams are standing by for global deployment."
    },
    contactInfo: [
      { icon: 'Globe', title: "Global Headquarters", details: ["123 Tech Innovation Hub", "Silicon Valley, CA 94025", "United States"], gradient: "indigo", meta: "Operational Center" },
      { icon: 'Phone', title: "Secure Terminal", details: ["+1 (555) 123-4567", "+1 (555) 987-6543", "Toll Free: 1-800-NEXUS"], gradient: "rose", meta: "Voice Node" },
      { icon: 'Mail', title: "Encrypted Mail", details: ["hello@nexustech.com", "support@nexustech.com", "careers@nexustech.com"], gradient: "emerald", meta: "Data Inbound" },
      { icon: 'Clock', title: "Node Availability", details: ["Monday - Friday: 9AM - 6PM", "Saturday: 10AM - 4PM", "Sunday: Offline"], gradient: "amber", meta: "Uptime Matrix" }
    ],
    socials: {
      linkedin: "#",
      twitter: "#",
      facebook: "#",
      instagram: "#"
    },
    offices: [
      { city: "San Francisco", country: "United States", address: "123 Tech Hub, CA 94025", phone: "+1 (555) 123-4567", meta: "HQ" },
      { city: "London", country: "United Kingdom", address: "456 Innovation St, EC2A 4NE", phone: "+44 20 7123 4567", meta: "EMEA" },
      { city: "Singapore", country: "Singapore", address: "789 Digital Ave, 018956", phone: "+65 6123 4567", meta: "APAC" },
      { city: "Dubai", country: "UAE", address: "101 Tech Park, DIFC", phone: "+971 4 123 4567", meta: "MENA" }
    ],
    map: {
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.6395295956!2d-122.08424678469231!3d37.422065479825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba02425dad8f%3A0x6c296c66619367e0!2sGoogleplex!5e0!3m2!1sen!2sus!4v1616642618500!5m2!1sen!2sus",
      lat: "37.4221 N",
      long: "122.0841 W",
      nodeId: "HQ-01"
    }
  }

  const iconMap: any = { Globe, Phone, Mail, Clock, Cpu, MapPin }
  const gradientMap: any = {
    indigo: "from-indigo-600 via-blue-600 to-cyan-500",
    rose: "from-rose-600 via-pink-600 to-orange-500",
    emerald: "from-emerald-600 via-teal-600 to-cyan-500",
    amber: "from-amber-500 via-orange-500 to-amber-600"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#010103] flex flex-col items-center justify-center gap-6">
        <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
        <p className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.5em] animate-pulse">Establishing Operational Uplink...</p>
      </div>
    )
  }

  return (
    <SmoothScrollProvider>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-[#010103] text-slate-900 dark:text-white selection:bg-indigo-500/30 transition-colors duration-500">
        <div className="fixed inset-0 pointer-events-none z-0">
          <DeepTechBackground />
        </div>

        {/* Hero Section - Establish Connection */}
        <section className="relative pt-32 lg:pt-48 pb-20 z-10">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-indigo-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-12 shadow-2xl"
            >
              <Shield className="w-4 h-4" />
              {activeSettings.hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-7xl lg:text-8xl xl:text-[7.5rem] 2xl:text-[8.5rem] font-black mb-8 lg:mb-12 tracking-tighter leading-[0.85] uppercase break-words"
            >
              {activeSettings.hero.title.split('\n').map((line: string, i: number) => (
                <span key={i}>{line}<br /></span>
              ))}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">Connection</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl lg:text-3xl text-slate-500 dark:text-white/40 max-w-6xl mx-auto mb-16 leading-relaxed font-medium"
            >
              {activeSettings.hero.subtitle}
            </motion.p>
          </div>
        </section>

        {/* Tactical Info Nodes */}
        <section className="pb-24 lg:pb-40 relative z-10">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {activeSettings.contactInfo.map((info: any, index: number) => {
                const Icon = iconMap[info.icon] || Globe
                const grad = gradientMap[info.gradient] || gradientMap.indigo
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative"
                  >
                    <div className="bg-slate-50 dark:bg-[#05050a]/60 backdrop-blur-3xl border border-slate-200 dark:border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-10 h-full flex flex-col hover:border-indigo-500/30 transition-all duration-500 overflow-hidden relative shadow-xl dark:shadow-2xl">
                      <div className={`absolute -inset-1 bg-gradient-to-br ${grad} opacity-0 group-hover:opacity-10 transition-opacity blur-2xl pointer-events-none`} />

                      <div className={`w-20 h-20 rounded-[1.5rem] bg-gradient-to-br ${grad} flex items-center justify-center mb-10 group-hover:scale-110 transition-all duration-700 shadow-2xl relative z-10 border border-white/10 shadow-inner`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="text-emerald-400 font-mono text-[9px] uppercase tracking-[0.4em] mb-4 font-black opacity-60 relative z-10">
                        [ {info.meta} ]
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black mb-6 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors relative z-10 uppercase tracking-tighter leading-none">
                        {info.title}
                      </h3>
                      <div className="space-y-3 relative z-10">
                        {info.details.map((detail: string, i: number) => (
                          <p key={i} className="text-white/30 text-base font-medium group-hover:text-white/60 transition-colors leading-relaxed">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* The Transmission Hub (Contact Form) */}
        <section id="contact-form" className="py-20 lg:py-32 relative z-10 bg-slate-50/50 dark:bg-[#05050a]/40 backdrop-blur-3xl border-y border-slate-200 dark:border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Terminal Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-8"
              >
                <div className="relative rounded-[2.5rem] md:rounded-[4rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#010103]/60 p-1 shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-emerald-500/5 pointer-events-none" />
                  <div className="p-8 md:p-12 lg:p-16 xl:p-20 relative z-10">
                    <div className="flex items-center gap-4 text-indigo-400 font-mono text-xs uppercase tracking-[0.5em] mb-12 font-black leading-none">
                      <Terminal className="w-5 h-5" /> Message Inbound Protocol
                    </div>

                    {isSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20"
                      >
                        <div className="w-28 h-28 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-12 border border-emerald-500/20 shadow-2xl">
                          <CheckCircle className="w-14 h-14 text-emerald-400" />
                        </div>
                        <h3 className="text-5xl font-black mb-8 tracking-tighter uppercase leading-none">Transmission <span className="text-emerald-400">Received</span></h3>
                        <p className="text-white/30 text-xl font-medium mb-16 leading-relaxed max-w-2xl mx-auto">
                          Your data has been successfully securely encrypted and transmitted to our intelligence mesh for immediate audit.
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsSubmitted(false)
                            setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "", service: "" })
                          }}
                          className="h-20 px-16 border-white/10 text-white rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-white/5 shadow-2xl"
                        >
                          Establish New Uplink
                        </Button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
                        <div className="space-y-4">
                          <label className="text-[10px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-[0.4em] font-black pl-2">Operator Name</label>
                          <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full h-14 md:h-18 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl md:rounded-2xl px-6 md:px-8 text-slate-900 dark:text-white font-black focus:outline-none focus:border-indigo-500/50 transition-all text-lg md:text-xl shadow-inner placeholder:text-slate-400 dark:placeholder:text-white/10" placeholder="e.g. Alexander Mitchell" />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-[0.4em] font-black pl-2">Communication Node</label>
                          <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full h-14 md:h-18 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl md:rounded-2xl px-6 md:px-8 text-slate-900 dark:text-white font-black focus:outline-none focus:border-indigo-500/50 transition-all text-lg md:text-xl shadow-inner placeholder:text-slate-400 dark:placeholder:text-white/10" placeholder="node@protocol.com" />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-[0.4em] font-black pl-2">Voice Channel</label>
                          <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full h-14 md:h-18 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl md:rounded-2xl px-6 md:px-8 text-slate-900 dark:text-white font-black focus:outline-none focus:border-indigo-500/50 transition-all text-lg md:text-xl shadow-inner placeholder:text-slate-400 dark:placeholder:text-white/10" placeholder="+1 (555) 000-0000" />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-[0.4em] font-black pl-2">Entity ID</label>
                          <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full h-14 md:h-18 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl md:rounded-2xl px-6 md:px-8 text-slate-900 dark:text-white font-black focus:outline-none focus:border-indigo-500/50 transition-all text-lg md:text-xl shadow-inner placeholder:text-slate-400 dark:placeholder:text-white/10" placeholder="Organization" />
                        </div>
                        <div className="space-y-4 sm:col-span-2">
                          <label className="text-[10px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-[0.4em] font-black pl-2">Sector Specification</label>
                          <select value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className="w-full h-14 md:h-18 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl md:rounded-2xl px-6 md:px-8 text-slate-900 dark:text-white font-black focus:outline-none focus:border-indigo-500/50 transition-all text-lg md:text-xl appearance-none cursor-pointer shadow-inner">
                            <option value="" className="bg-white dark:bg-[#05050a] text-slate-900 dark:text-white">SELECT OPERATION SECTOR</option>
                            <option value="ai" className="bg-white dark:bg-[#05050a] text-slate-900 dark:text-white">AI & MACHINE LEARNING</option>
                            <option value="iot" className="bg-white dark:bg-[#05050a] text-slate-900 dark:text-white">IoT INFRASTRUCTURE</option>
                            <option value="cloud" className="bg-white dark:bg-[#05050a] text-slate-900 dark:text-white">CLOUD INFRASTRUCTURE</option>
                            <option value="cyber" className="bg-white dark:bg-[#05050a] text-slate-900 dark:text-white">CYBERSECURITY OPS</option>
                            <option value="data" className="bg-white dark:bg-[#05050a] text-slate-900 dark:text-white">DATA ANALYTICS</option>
                            <option value="web" className="bg-white dark:bg-[#05050a] text-slate-900 dark:text-white">ENTERPRISE WEB</option>
                            <option value="mobile" className="bg-white dark:bg-[#05050a] text-slate-900 dark:text-white">TACTICAL MOBILE</option>
                            <option value="other" className="bg-white dark:bg-[#05050a] text-slate-900 dark:text-white">CUSTOM PROTOCOL</option>
                          </select>
                        </div>
                        <div className="space-y-4 sm:col-span-2">
                          <label className="text-[10px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-[0.4em] font-black pl-2">Intelligence Payload</label>
                          <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500/50 transition-all text-lg md:text-xl resize-none shadow-inner placeholder:text-slate-400 dark:placeholder:text-white/10" placeholder="Operational requirements and mission parameters..." />
                        </div>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="sm:col-span-2 h-20 md:h-24 bg-indigo-600 dark:bg-white text-white dark:text-black hover:bg-indigo-700 dark:hover:bg-white/90 font-black rounded-2xl md:rounded-[2.5rem] transition-all shadow-2xl text-xl md:text-2xl flex items-center justify-center gap-6 group disabled:opacity-30 border-0 uppercase tracking-tighter"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-8 h-8 animate-spin" />
                              Transmitting Data...
                            </>
                          ) : (
                            <>
                              Initiate Transmission <Send className="w-8 h-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500" />
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Side Panels */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-4 space-y-12 lg:pt-10"
              >
                <div className="space-y-10">
                  <div className="text-white/20 font-mono text-[10px] uppercase tracking-[0.6em] mb-4 font-black">Support Channels</div>
                  <div className="space-y-8">
                    <div className="bg-slate-50 dark:bg-[#05050a]/60 backdrop-blur-3xl border border-slate-200 dark:border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-10 group hover:border-indigo-500/30 transition-all duration-700 shadow-xl dark:shadow-2xl">
                      <div className="w-16 h-16 md:w-18 md:h-18 bg-indigo-500/10 rounded-2xl md:rounded-[1.5rem] flex items-center justify-center mb-8 border border-indigo-500/20 shadow-2xl">
                        <MessageSquare className="w-8 h-8 md:w-9 md:h-9 text-indigo-400" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tighter uppercase leading-none text-slate-900 dark:text-white">Priority Support</h3>
                      <p className="text-slate-500 dark:text-white/30 text-sm md:text-base font-medium mb-8 leading-relaxed text-balance">24/7 dedicated tactical uplink for global audit partners and enterprise nodes.</p>
                      <Link href="#" className="inline-flex items-center gap-4 text-indigo-600 dark:text-indigo-400 font-black text-xs tracking-[0.2em] uppercase group-hover:gap-8 transition-all duration-500">
                        Establish Link <ArrowRight className="w-5 h-5 flex-shrink-0" />
                      </Link>
                    </div>
                    <div className="bg-slate-50 dark:bg-[#05050a]/60 backdrop-blur-3xl border border-slate-200 dark:border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-10 group hover:border-emerald-500/30 transition-all duration-700 shadow-xl dark:shadow-2xl">
                      <div className="w-16 h-16 md:w-18 md:h-18 bg-emerald-500/10 rounded-2xl md:rounded-[1.5rem] flex items-center justify-center mb-8 border border-emerald-500/20 shadow-2xl">
                        <Fingerprint className="w-8 h-8 md:w-9 md:h-9 text-emerald-400" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tighter uppercase leading-none text-slate-900 dark:text-white">Security Ops</h3>
                      <p className="text-slate-500 dark:text-white/30 text-sm md:text-base font-medium mb-8 leading-relaxed text-balance">Emergency response node for sub-millisecond infrastructure recovery and patches.</p>
                      <Link href="#" className="inline-flex items-center gap-4 text-emerald-600 dark:text-emerald-400 font-black text-xs tracking-[0.2em] uppercase group-hover:gap-8 transition-all duration-500">
                        Initiate Protocol <ArrowRight className="w-5 h-5 flex-shrink-0" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Social Hub */}
                <div className="bg-slate-50 dark:bg-[#05050a]/40 border border-slate-200 dark:border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-10 shadow-xl dark:shadow-2xl">
                  <h3 className="text-[10px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.6em] mb-8 font-black text-center">Global Social Mesh</h3>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { icon: Linkedin, color: "hover:bg-blue-600", url: activeSettings.socials.linkedin },
                      { icon: Twitter, color: "hover:bg-slate-900", url: activeSettings.socials.twitter },
                      { icon: Facebook, color: "hover:bg-indigo-600", url: activeSettings.socials.facebook },
                      { icon: Instagram, color: "hover:bg-rose-600", url: activeSettings.socials.instagram }
                    ].map((item, i) => (
                      <a
                        key={i}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`h-16 md:h-20 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl md:rounded-3xl flex items-center justify-center transition-all group ${item.color} shadow-inner`}
                      >
                        <item.icon className="w-6 h-6 md:w-8 md:h-8 text-slate-400 dark:text-white transition-transform duration-500 group-hover:scale-125 group-hover:text-white" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Global Node Map (Offices) */}
        <section className="py-32 lg:py-56 relative z-10 border-b border-white/5">
          <div className="container mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-32"
            >
              <div className="text-indigo-400 font-mono text-[10px] uppercase tracking-[0.5em] mb-6 font-black">Strategic Mapping</div>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400 text-glow">Node Network</span>.</h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {activeSettings.offices.map((office: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-50 dark:bg-[#05050a]/60 backdrop-blur-3xl border border-slate-200 dark:border-white/5 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-10 hover:border-indigo-500/30 transition-all group shadow-xl dark:shadow-2xl"
                >
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase tracking-tight leading-none">{office.city}</h3>
                    <span className="px-3 md:px-4 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-[9px] uppercase tracking-widest font-black border border-indigo-500/20">{office.meta}</span>
                  </div>
                  <div className="space-y-8">
                    <p className="flex items-start gap-5 text-white/30 text-base font-medium leading-relaxed">
                      <MapPin className="w-6 h-6 mt-0.5 text-indigo-400 flex-shrink-0" />
                      {office.address}
                    </p>
                    <p className="flex items-center gap-5 text-white/30 text-base font-medium">
                      <Phone className="w-6 h-6 text-indigo-400 flex-shrink-0" />
                      {office.phone}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tactical Map Frame */}
        <section className="py-24 lg:py-40 relative z-10 px-6">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-[4rem] lg:rounded-[6rem] overflow-hidden border border-white/5 h-[700px] bg-[#05050a] p-2 shadow-2xl"
            >
              <div className="w-full h-full rounded-[3.8rem] lg:rounded-[5.8rem] overflow-hidden relative shadow-inner">
                <iframe
                  src={activeSettings.map.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.6) contrast(1.2)" }}
                  allowFullScreen
                  loading="lazy"
                  className="grayscale opacity-50 contrast-125 transition-transform duration-1000"
                />
                {/* Visual HUD Overlay */}
                <div className="absolute inset-0 pointer-events-none border-[30px] border-[#010103]" />
                <div className="absolute top-16 left-16 p-10 bg-[#010103]/80 backdrop-blur-xl rounded-[2.5rem] border border-white/10 hidden lg:block shadow-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                    <span className="text-white font-mono text-xs uppercase tracking-[0.4em] font-black">Active Node: {activeSettings.map.nodeId}</span>
                  </div>
                  <div className="text-white/30 font-mono text-[10px] leading-relaxed font-black space-y-2 uppercase tracking-widest">
                    <div>LAT: {activeSettings.map.lat}</div>
                    <div>LONG: {activeSettings.map.long}</div>
                    <div className="text-indigo-400">STATUS: ONLINE</div>
                  </div>
                </div>

                {/* Decorative Corner Elements */}
                <div className="absolute top-10 right-10 flex gap-4 pointer-events-none">
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
