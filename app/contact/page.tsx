"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Globe,
  CheckCircle,
  Shield,
  Terminal,
  Loader2,
  Check
} from "lucide-react"
import Link from "next/link"
import { DeepTechBackground } from "@/components/ui/deep-tech-background"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";

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

    try {
      await addDoc(collection(db, "leads"), {
        ...formData,
        status: "NEW",
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

  const servicesList = [
    "Website Development",
    "E-Commerce Development",
    "Mobile App Development",
    "SaaS Development",
    "ERP & CRM Solutions",
    "Custom Software Development",
    "Business Automation Solutions",
    "UI/UX Design",
    "API Integrations",
    "Cloud Solutions & Deployment"
  ]

  return (
    <SmoothScrollProvider>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-[#010103] text-slate-900 dark:text-white selection:bg-indigo-500/30 transition-colors duration-500 relative overflow-x-hidden">
        <div className="fixed inset-0 pointer-events-none z-0">
          <DeepTechBackground />
        </div>

        {/* Global Layout Container */}
        <div className="relative z-10 pt-28 sm:pt-36 lg:pt-44 pb-20 sm:pb-28 lg:pb-36 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
            
            {/* Left Column: Contact Information & Services */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 flex flex-col justify-between"
            >
              <div className="space-y-6 sm:space-y-8">
                {/* Security Protocol Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-indigo-500 dark:text-indigo-400 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.25em] shadow-xs max-w-full">
                  <Shield className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Operational Uplink Protocol</span>
                </div>

                {/* Main Heading & Tagline */}
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 tracking-tight uppercase leading-tight text-slate-900 dark:text-white">
                    Meganods <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-400">IT Solutions</span>.
                  </h1>
                  <p className="text-xs sm:text-sm md:text-base text-slate-500 dark:text-white/45 font-medium leading-relaxed">
                    Building Websites, Mobile Apps & Business Automation Solutions.
                  </p>
                </div>

                {/* Key Contact Nodes */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3.5 p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 shadow-inner">
                    <Globe className="w-5 h-5 text-indigo-500 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-[9px] sm:text-[10px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-0.5 font-semibold">Web Interface</div>
                      <a href="https://www.meganods.com" target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors break-all">
                        www.meganods.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 shadow-inner">
                    <Mail className="w-5 h-5 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-[9px] sm:text-[10px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-0.5 font-semibold">Secure Mailbox</div>
                      <a href="mailto:admin@meganods.com" className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors break-all">
                        admin@meganods.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 shadow-inner">
                    <Phone className="w-5 h-5 text-rose-500 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-[9px] sm:text-[10px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-0.5 font-semibold">Voice Node</div>
                      <a href="tel:+918796140682" className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-rose-500 dark:hover:text-rose-400 transition-colors">
                        +91 8796140682
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 shadow-inner">
                    <MapPin className="w-5 h-5 text-amber-500 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-[9px] sm:text-[10px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-0.5 font-semibold">HQ Sector</div>
                      <p className="text-xs sm:text-sm md:text-base font-bold text-slate-800 dark:text-white/80 leading-relaxed">
                        OC-821 8th Floor, Gaur City Centre,<br />
                        Greater Noida West, Uttar Pradesh, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Capabilities List */}
              <div className="mt-8 sm:mt-12 space-y-4 sm:space-y-6">
                <div className="text-[9px] sm:text-[10px] font-mono text-indigo-500 dark:text-indigo-400 uppercase tracking-[0.3em] font-black">
                  [ Capabilities Protocol ]
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                  {servicesList.map((service, index) => (
                    <div key={index} className="flex items-center gap-2.5 text-slate-700 dark:text-white/60 font-semibold text-xs sm:text-sm">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                      </div>
                      <span className="truncate">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <div className="relative rounded-[2rem] sm:rounded-[3rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#010103]/60 p-1 shadow-xl overflow-hidden h-full flex flex-col justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-emerald-500/5 pointer-events-none" />
                <div className="p-5 sm:p-8 md:p-10 lg:p-12 relative z-10 h-full flex flex-col justify-center">
                  {!isSubmitted && (
                    <div className="flex items-center gap-3 text-indigo-500 dark:text-indigo-400 font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] mb-6 sm:mb-8 font-black leading-none">
                      <Terminal className="w-4 h-4 animate-pulse shrink-0" /> Message Inbound Protocol
                    </div>
                  )}

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center my-auto py-8 sm:py-12 flex flex-col items-center justify-center min-h-[360px] sm:min-h-[420px]"
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-5 border border-emerald-500/20 shadow-xl">
                        <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500 dark:text-emerald-400" />
                      </div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[9px] uppercase tracking-widest font-bold mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        Status: Confirmed
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black mb-3 tracking-tight uppercase leading-tight text-slate-900 dark:text-white">
                        Transmission <span className="text-emerald-500 dark:text-emerald-400">Received</span>
                      </h3>
                      <p className="text-slate-500 dark:text-white/45 text-xs sm:text-sm font-medium mb-8 leading-relaxed max-w-sm mx-auto">
                        Your message has been securely sent. A member of our engineering team will reach out to you shortly.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsSubmitted(false)
                          setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "", service: "" })
                        }}
                        className="h-12 px-8 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl font-bold uppercase text-xs tracking-wider hover:bg-slate-50 dark:hover:bg-white/5 transition-all shadow-sm cursor-pointer mx-auto"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[9px] sm:text-[10px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] font-bold pl-1">Operator Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full h-12 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl px-4 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500/50 transition-all text-sm shadow-inner placeholder:text-slate-400 dark:placeholder:text-white/20"
                          placeholder="e.g. John Doe"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] sm:text-[10px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] font-bold pl-1">Communication Node</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full h-12 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl px-4 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500/50 transition-all text-sm shadow-inner placeholder:text-slate-400 dark:placeholder:text-white/20"
                          placeholder="admin@meganods.com"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] sm:text-[10px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] font-bold pl-1">Voice Channel</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full h-12 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl px-4 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500/50 transition-all text-sm shadow-inner placeholder:text-slate-400 dark:placeholder:text-white/20"
                          placeholder="+91 XXXXXXXXXX"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] sm:text-[10px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] font-bold pl-1">Entity ID</label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full h-12 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl px-4 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500/50 transition-all text-sm shadow-inner placeholder:text-slate-400 dark:placeholder:text-white/20"
                          placeholder="Organization"
                        />
                      </div>
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-[9px] sm:text-[10px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] font-bold pl-1">Sector Specification</label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full h-12 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl px-4 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500/50 transition-all text-xs sm:text-sm appearance-none cursor-pointer shadow-inner"
                        >
                          <option value="" className="bg-white dark:bg-[#05050a] text-slate-900 dark:text-white">SELECT OPERATION SECTOR</option>
                          <option value="web" className="bg-white dark:bg-[#05050a] text-slate-900 dark:text-white">WEBSITE DEVELOPMENT</option>
                          <option value="ecommerce" className="bg-white dark:bg-[#05050a] text-slate-900 dark:text-white">E-COMMERCE DEVELOPMENT</option>
                          <option value="mobile" className="bg-white dark:bg-[#05050a] text-slate-900 dark:text-white">MOBILE APP DEVELOPMENT</option>
                          <option value="saas" className="bg-white dark:bg-[#05050a] text-slate-900 dark:text-white">SAAS DEVELOPMENT</option>
                          <option value="erp_crm" className="bg-white dark:bg-[#05050a] text-slate-900 dark:text-white">ERP & CRM SOLUTIONS</option>
                          <option value="custom" className="bg-white dark:bg-[#05050a] text-slate-900 dark:text-white">CUSTOM SOFTWARE DEVELOPMENT</option>
                          <option value="automation" className="bg-white dark:bg-[#05050a] text-slate-900 dark:text-white">BUSINESS AUTOMATION SOLUTIONS</option>
                          <option value="uiux" className="bg-white dark:bg-[#05050a] text-slate-900 dark:text-white">UI/UX DESIGN</option>
                          <option value="api" className="bg-white dark:bg-[#05050a] text-slate-900 dark:text-white">API INTEGRATIONS</option>
                          <option value="cloud" className="bg-white dark:bg-[#05050a] text-slate-900 dark:text-white">CLOUD SOLUTIONS & DEPLOYMENT</option>
                        </select>
                      </div>
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-[9px] sm:text-[10px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] font-bold pl-1">Intelligence Payload</label>
                        <textarea
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl p-4 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-indigo-500/50 transition-all text-sm resize-none shadow-inner placeholder:text-slate-400 dark:placeholder:text-white/20"
                          placeholder="Describe your project requirements and scope..."
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="sm:col-span-2 h-12 sm:h-14 bg-indigo-600 dark:bg-white text-white dark:text-black hover:bg-indigo-700 dark:hover:bg-white/90 font-bold rounded-xl transition-all shadow-md text-xs sm:text-sm flex items-center justify-center gap-3 group disabled:opacity-30 border-0 uppercase tracking-wider cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Transmitting Data...</span>
                          </>
                        ) : (
                          <>
                            <span>Initiate Transmission</span>
                            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
