"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
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
  ArrowRight
} from "lucide-react"
import { DeepTechBackground } from "@/components/ui/deep-tech-background"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider"
import { Button } from "@/components/ui/button"

const contactInfo = [
  {
    icon: Globe,
    title: "Global Headquarters",
    details: ["123 Tech Innovation Hub", "Silicon Valley, CA 94025", "United States"],
    gradient: "from-indigo-600 via-blue-600 to-cyan-500",
    meta: "Operational Center"
  },
  {
    icon: Phone,
    title: "Secure Terminal",
    details: ["+1 (555) 123-4567", "+1 (555) 987-6543", "Toll Free: 1-800-NEXUS"],
    gradient: "from-rose-600 via-pink-600 to-orange-500",
    meta: "Voice Node"
  },
  {
    icon: Mail,
    title: "Encrypted Mail",
    details: ["hello@nexustech.com", "support@nexustech.com", "careers@nexustech.com"],
    gradient: "from-emerald-600 via-teal-600 to-cyan-500",
    meta: "Data Inbound"
  },
  {
    icon: Clock,
    title: "Node Availability",
    details: ["Monday - Friday: 9AM - 6PM", "Saturday: 10AM - 4PM", "Sunday: Offline"],
    gradient: "from-amber-500 via-orange-500 to-amber-600",
    meta: "Uptime Matrix"
  }
]

const offices = [
  {
    city: "San Francisco",
    country: "United States",
    address: "123 Tech Hub, CA 94025",
    phone: "+1 (555) 123-4567",
    email: "sf@nexustech.com",
    meta: "HQ"
  },
  {
    city: "London",
    country: "United Kingdom",
    address: "456 Innovation St, EC2A 4NE",
    phone: "+44 20 7123 4567",
    email: "london@nexustech.com",
    meta: "EMEA"
  },
  {
    city: "Singapore",
    country: "Singapore",
    address: "789 Digital Ave, 018956",
    phone: "+65 6123 4567",
    email: "sg@nexustech.com",
    meta: "APAC"
  },
  {
    city: "Dubai",
    country: "UAE",
    address: "101 Tech Park, DIFC",
    phone: "+971 4 123 4567",
    email: "dubai@nexustech.com",
    meta: "MENA"
  }
]

export default function ContactPage() {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <SmoothScrollProvider>
      <Navigation />
      <main className="min-h-screen bg-[#010103] text-white">
        <div className="fixed inset-0 pointer-events-none z-0">
           <DeepTechBackground />
        </div>

        {/* Hero Section - Establish Connection */}
        <section className="relative pt-32 lg:pt-48 pb-20 z-10">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-12"
            >
               <Shield className="w-3 h-3" />
               Secure Engagement Protocol
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-7xl lg:text-[10rem] font-bold mb-12 tracking-tighter leading-[0.85]"
            >
              Establish <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">Connection</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl lg:text-3xl text-white/40 max-w-6xl mx-auto mb-16 leading-relaxed font-medium"
            >
              Initiate a strategic dialogue with our engineering department. Our tactical teams are standing by for global deployment.
            </motion.p>
          </div>
        </section>

        {/* Tactical Info Nodes */}
        <section className="pb-24 lg:pb-40 relative z-10">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="bg-[#05050a]/60 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 h-full flex flex-col hover:border-indigo-500/30 transition-all duration-500 overflow-hidden relative">
                    <div className={`absolute -inset-1 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-10 transition-opacity blur-2xl`} />
                    
                    <div className={`w-16 h-16 rounded-[1.2rem] bg-gradient-to-br ${info.gradient} flex items-center justify-center mb-10 group-hover:scale-110 transition-all duration-500 shadow-2xl relative z-10`}>
                      <info.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-emerald-400 font-mono text-[10px] uppercase tracking-widest mb-4 opacity-50 relative z-10">
                       [ {info.meta} ]
                    </div>
                    <h3 className="text-2xl font-bold mb-6 text-white group-hover:text-indigo-400 transition-colors relative z-10">
                      {info.title}
                    </h3>
                    <div className="space-y-2 relative z-10">
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-white/40 text-sm font-medium group-hover:text-white/60 transition-colors">
                           {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The Transmission Hub (Contact Form) */}
        <section className="py-24 relative z-10 bg-[#05050a]/40 backdrop-blur-3xl border-y border-white/5">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-20 lg:gap-32">
              {/* Terminal Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-8"
              >
                <div className="relative rounded-[3rem] border border-white/10 bg-[#010103]/60 p-1">
                  <div className="p-8 lg:p-16">
                    <div className="flex items-center gap-3 text-indigo-400 font-mono text-xs uppercase tracking-[0.4em] mb-10">
                       <Terminal className="w-4 h-4" /> Message Inbound
                    </div>
                    
                    {isSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20"
                      >
                        <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-10 border border-emerald-500/20">
                          <CheckCircle className="w-12 h-12 text-emerald-400" />
                        </div>
                        <h3 className="text-4xl font-bold mb-6">Transmission Received</h3>
                        <p className="text-white/40 text-xl font-medium mb-12">
                          Your data has been successfully securely transmitted to our intelligence hub.
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsSubmitted(false)
                            setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "", service: "" })
                          }}
                          className="h-16 px-12 border-white/10 text-white rounded-2xl font-bold hover:bg-white/5"
                        >
                          Establish New Uplink
                        </Button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-10">
                        <div className="grid md:grid-cols-2 gap-10">
                          <div className="space-y-4">
                            <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Operator Name</label>
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-8 text-white font-bold focus:outline-none focus:border-indigo-500/50 transition-all text-lg"
                              placeholder="Full Name"
                            />
                          </div>
                          <div className="space-y-4">
                            <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Communication Node</label>
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-8 text-white font-bold focus:outline-none focus:border-indigo-500/50 transition-all text-lg"
                              placeholder="Email Address"
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-10">
                          <div className="space-y-4">
                            <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Voice Channel</label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-8 text-white font-bold focus:outline-none focus:border-indigo-500/50 transition-all text-lg"
                              placeholder="Phone Number"
                            />
                          </div>
                          <div className="space-y-4">
                            <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Entity ID</label>
                            <input
                              type="text"
                              value={formData.company}
                              onChange={(e) => setFormData({...formData, company: e.target.value})}
                              className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-8 text-white font-bold focus:outline-none focus:border-indigo-500/50 transition-all text-lg"
                              placeholder="Company Name"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Sector Specification</label>
                          <select
                            value={formData.service}
                            onChange={(e) => setFormData({...formData, service: e.target.value})}
                            className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-8 text-white font-bold focus:outline-none focus:border-indigo-500/50 transition-all text-lg appearance-none cursor-pointer"
                          >
                            <option value="" className="bg-[#05050a]">Select Operation</option>
                            <option value="ai" className="bg-[#05050a]">AI & Machine Learning</option>
                            <option value="cloud" className="bg-[#05050a]">Cloud Solutions</option>
                            <option value="cyber" className="bg-[#05050a]">Cybersecurity</option>
                            <option value="data" className="bg-[#05050a]">Data Analytics</option>
                            <option value="web" className="bg-[#05050a]">Web Development</option>
                            <option value="mobile" className="bg-[#05050a]">Mobile Development</option>
                            <option value="other" className="bg-[#05050a]">Other Operations</option>
                          </select>
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Data Payload</label>
                          <textarea
                            required
                            rows={6}
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            className="w-full bg-white/5 border border-white/5 rounded-3xl p-8 text-white font-bold focus:outline-none focus:border-indigo-500/50 transition-all text-lg resize-none"
                            placeholder="Operational requirements..."
                          />
                        </div>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-20 bg-white text-black hover:bg-white/90 font-bold rounded-3xl transition-all shadow-2xl text-xl flex items-center justify-center gap-3 group disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="w-6 h-6 border-4 border-black/30 border-t-black rounded-full animate-spin" />
                              Transmitting...
                            </>
                          ) : (
                            <>
                              Initiate Transmission <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
                className="lg:col-span-4 space-y-10"
              >
                <div className="text-white/20 font-mono text-[10px] uppercase tracking-[0.4em] mb-4">Support Channels</div>
                <div className="space-y-6">
                   <div className="bg-[#05050a]/60 border border-white/5 rounded-[2.5rem] p-10 group hover:border-indigo-500/30 transition-all">
                      <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-8 border border-indigo-500/20">
                         <MessageSquare className="w-7 h-7 text-indigo-400 text-glow" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">Priority Support</h3>
                      <p className="text-white/40 text-sm font-medium mb-6 leading-relaxed">24/7 dedicated support line for enterprise audit partners.</p>
                      <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm tracking-widest uppercase group-hover:gap-4 transition-all">
                         Connect <ArrowRight className="w-4 h-4" />
                      </div>
                   </div>
                   <div className="bg-[#05050a]/60 border border-white/5 rounded-[2.5rem] p-10 group hover:border-emerald-500/30 transition-all">
                      <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/20">
                         <Fingerprint className="w-7 h-7 text-emerald-400 text-glow" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">Security Ops</h3>
                      <p className="text-white/40 text-sm font-medium mb-6 leading-relaxed">Emergency response node for rapid infrastructure recovery.</p>
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm tracking-widest uppercase group-hover:gap-4 transition-all">
                         Establish <ArrowRight className="w-4 h-4" />
                      </div>
                   </div>
                </div>

                {/* Social Hub */}
                <div className="bg-[#05050a]/40 border border-white/5 rounded-[2.5rem] p-10">
                   <h3 className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] mb-8">Base Socials</h3>
                   <div className="grid grid-cols-2 gap-4">
                      {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
                        <a
                          key={i}
                          href="#"
                          className="h-16 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-all group"
                        >
                          <Icon className="w-6 h-6 transition-transform group-hover:scale-125" />
                        </a>
                      ))}
                   </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Global Node Map (Offices) */}
        <section className="py-24 lg:py-40 relative z-10 border-b border-white/5">
          <div className="container mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <div className="text-indigo-400 font-mono text-xs uppercase tracking-[0.4em] mb-4">Strategic Mapping</div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400 text-glow">Node Network</span>.</h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {offices.map((office, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#05050a] border border-white/5 rounded-[2rem] p-10 hover:border-indigo-500/30 transition-all group"
                >
                  <div className="flex items-center justify-between mb-8">
                     <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">{office.city}</h3>
                     <span className="px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 font-mono text-[10px] uppercase tracking-widest">{office.meta}</span>
                  </div>
                  <div className="space-y-6">
                    <p className="flex items-start gap-4 text-white/40 text-sm font-medium leading-relaxed">
                      <MapPin className="w-5 h-5 mt-0.5 text-indigo-400" />
                      {office.address}
                    </p>
                    <p className="flex items-center gap-4 text-white/40 text-sm font-medium">
                      <Phone className="w-5 h-5 text-indigo-400" />
                      {office.phone}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tactical Map Frame */}
        <section className="py-24 relative z-10 px-6">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-[3rem] lg:rounded-[4rem] overflow-hidden border border-white/10 h-[600px] bg-[#05050a] p-1"
            >
              <div className="w-full h-full rounded-[2.8rem] lg:rounded-[3.8rem] overflow-hidden relative">
                 <iframe
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.6395295956!2d-122.08424678469231!3d37.422065479825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba02425dad8f%3A0x6c296c66619367e0!2sGoogleplex!5e0!3m2!1sen!2sus!4v1616642618500!5m2!1sen!2sus"
                   width="100%"
                   height="100%"
                   style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.6) contrast(1.2)" }}
                   allowFullScreen
                   loading="lazy"
                   className="grayscale opacity-50 contrast-125"
                 />
                 {/* Visual HUD Overlay */}
                 <div className="absolute inset-0 pointer-events-none border-[20px] border-[#010103]" />
                 <div className="absolute top-10 left-10 p-6 bg-[#010103]/80 backdrop-blur-md rounded-2xl border border-white/10 hidden lg:block">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                       <span className="text-white font-mono text-[10px] uppercase tracking-widest">Active Node: HQ-01</span>
                    </div>
                    <div className="text-white/40 font-mono text-[8px] leading-relaxed">
                       LAT: 37.4221 N<br />
                       LONG: 122.0841 W<br />
                       STATUS: ONLINE
                    </div>
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
