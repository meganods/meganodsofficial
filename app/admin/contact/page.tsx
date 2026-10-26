"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Terminal, 
  Settings, 
  Inbox, 
  Save, 
  Plus, 
  Trash2, 
  Globe, 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram,
  CheckCircle,
  X,
  Loader2,
  ExternalLink,
  MessageSquare,
  Cpu,
  Shield,
  ArrowUpRight,
  FileSpreadsheet,
  Download
} from "lucide-react"
import { db } from "@/lib/firebase"
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  deleteDoc,
  updateDoc,
  serverTimestamp
} from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function AdminContactPage() {
  const [activeTab, setActiveTab] = useState<"settings" | "leads">("settings")
  const [settings, setSettings] = useState<any>(null)
  const [leads, setLeads] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Fetch Settings
    const fetchSettings = async () => {
      const docRef = doc(db, "settings", "contact");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSettings(docSnap.data());
      } else {
        // Fallback for UI if seed hasn't run
        setSettings({
            hero: { badge: "", title: "", subtitle: "" },
            contactInfo: [],
            socials: { linkedin: "", twitter: "", facebook: "", instagram: "" },
            offices: [],
            map: { embedUrl: "", lat: "", long: "", nodeId: "" }
        });
      }
      setIsLoading(false);
    }
    fetchSettings();

    // Subscribe to Leads
    const q = query(collection(db, "leads"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLeads(leadsData);
    });

    return () => unsubscribe();
  }, [])

  const handleUpdateSettings = async () => {
    setIsSaving(true);
    try {
      await setDoc(doc(db, "settings", "contact"), {
        ...settings,
        updatedAt: serverTimestamp()
      });
      toast.success("CONTACT_PROTOCOL_UPDATED");
    } catch (error: any) {
      toast.error(`PATCH_FAILED: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  }

  const handleDeleteLead = async (id: string) => {
    if(!confirm("TERMINATE_LEAD_DATA?")) return;
    try {
      await deleteDoc(doc(db, "leads", id));
      toast.success("LEAD_REMOVED_FROM_REGISTRY");
    } catch (error: any) {
      toast.error(`PURGE_ERROR: ${error.message}`);
    }
  }

  const handleUpdateLeadStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, "leads", id), { status });
      toast.success(`LEAD_STATUS_PATCHED: ${status}`);
    } catch (error: any) {
      toast.error(`STATUS_UPDATE_FAILURE: ${error.message}`);
    }
  }

  const handleExportCSV = () => {
    if (leads.length === 0) {
      toast.error("NO_LEAD_DATA_AVAILABLE_TO_EXPORT");
      return;
    }

    const headers = [
      "Lead ID",
      "Date & Time",
      "Source",
      "Name",
      "Email",
      "Phone",
      "Company / Entity",
      "Service Requested",
      "Status",
      "Requirements / Message"
    ];

    const escapeCSV = (str: any) => {
      if (!str) return '""';
      return `"${String(str).replace(/"/g, '""')}"`;
    };

    const rows = leads.map((lead) => {
      const dateStr = lead.timestamp?.toDate 
        ? new Date(lead.timestamp.toDate()).toLocaleString() 
        : (lead.createdAt || 'N/A');

      return [
        escapeCSV(lead.id),
        escapeCSV(dateStr),
        escapeCSV(lead.source || 'CONTACT_PAGE'),
        escapeCSV(lead.name),
        escapeCSV(lead.email),
        escapeCSV(lead.phone || 'N/A'),
        escapeCSV(lead.company || 'N/A'),
        escapeCSV(lead.service || 'General'),
        escapeCSV(lead.status || 'NEW'),
        escapeCSV(lead.message ? lead.message.replace(/\r?\n|\r/g, ' ') : '')
      ].join(',');
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `meganods-leads-spreadsheet-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("SPREADSHEET_EXPORTED_SUCCESSFULLY");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#010103] flex flex-col items-center justify-center gap-6">
        <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
        <div className="text-[10px] font-mono text-indigo-400 dark:text-indigo-400 uppercase tracking-[0.5em] animate-pulse">Initializing Communication HUD...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#010103] text-slate-900 dark:text-white p-8 lg:p-12 selection:bg-indigo-500/30 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-4">
               <Shield className="w-4 h-4" /> Operational Command
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-none">Communication <br /><span className="text-slate-200 dark:text-white/20">Registry</span></h1>
          </div>
          <div className="flex bg-slate-50 dark:bg-[#05050a]/60 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-2xl p-1">
             <button
               onClick={() => setActiveTab("settings")}
               className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all ${activeTab === 'settings' ? 'bg-indigo-600 dark:bg-white text-white dark:text-black shadow-2xl' : 'text-slate-400 dark:text-white/40 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/5'}`}
             >
               <Settings className="w-4 h-4" /> Operational Settings
             </button>
             <button
               onClick={() => setActiveTab("leads")}
               className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all ${activeTab === 'leads' ? 'bg-indigo-600 dark:bg-white text-white dark:text-black shadow-2xl' : 'text-slate-400 dark:text-white/40 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/5'}`}
             >
               <Inbox className="w-4 h-4" /> Inbound leads 
               {leads.length > 0 && <span className="ml-2 px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[8px] font-black">{leads.length}</span>}
             </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === "settings" ? (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Hero & Meta Tab */}
              <div className="grid lg:grid-cols-2 gap-12">
                 <div className="bg-slate-50 dark:bg-[#05050a]/40 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-10 space-y-8 shadow-sm">
                    <div className="flex items-center gap-3 text-slate-400 dark:text-white/40 font-mono text-[10px] uppercase tracking-widest mb-4">
                       <Terminal className="w-4 h-4" /> Hero Configuration
                    </div>
                    <div className="space-y-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-mono text-slate-300 dark:text-white/20 uppercase tracking-widest">Protocol Badge</label>
                          <input 
                            type="text" 
                            value={settings?.hero?.badge} 
                            onChange={(e) => setSettings({...settings, hero: {...settings.hero, badge: e.target.value}})}
                            className="w-full h-14 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-6 font-bold focus:outline-none focus:border-indigo-500/50 text-slate-900 dark:text-white"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-mono text-slate-300 dark:text-white/20 uppercase tracking-widest">Terminal Title</label>
                          <textarea 
                            value={settings?.hero?.title} 
                            onChange={(e) => setSettings({...settings, hero: {...settings.hero, title: e.target.value}})}
                            className="w-full h-32 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-6 py-4 font-bold focus:outline-none focus:border-indigo-500/50 resize-none text-slate-900 dark:text-white"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-mono text-slate-300 dark:text-white/20 uppercase tracking-widest">Sub-Operational Briefing</label>
                          <textarea 
                            value={settings?.hero?.subtitle} 
                            onChange={(e) => setSettings({...settings, hero: {...settings.hero, subtitle: e.target.value}})}
                            className="w-full h-32 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-6 py-4 font-bold focus:outline-none focus:border-indigo-500/50 resize-none text-slate-900 dark:text-white"
                          />
                       </div>
                    </div>
                 </div>

                 {/* Social Hub Tab */}
                 <div className="bg-slate-50 dark:bg-[#05050a]/40 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-10 space-y-8 shadow-sm">
                    <div className="flex items-center gap-3 text-slate-400 dark:text-white/40 font-mono text-[10px] uppercase tracking-widest mb-4">
                       <Globe className="w-4 h-4" /> Global Social Mesh
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-[10px] font-mono text-slate-300 dark:text-white/20 uppercase tracking-widest">LinkedIn Uplink</label>
                          <input 
                            type="text" 
                            value={settings?.socials?.linkedin} 
                            onChange={(e) => setSettings({...settings, socials: {...settings.socials, linkedin: e.target.value}})}
                            className="w-full h-14 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-6 font-bold text-slate-900 dark:text-white"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-mono text-slate-300 dark:text-white/20 uppercase tracking-widest">Twitter/X Uplink</label>
                          <input 
                            type="text" 
                            value={settings?.socials?.twitter} 
                            onChange={(e) => setSettings({...settings, socials: {...settings.socials, twitter: e.target.value}})}
                            className="w-full h-14 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-6 font-bold text-slate-900 dark:text-white"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-mono text-slate-300 dark:text-white/20 uppercase tracking-widest">Facebook Uplink</label>
                          <input 
                            type="text" 
                            value={settings?.socials?.facebook} 
                            onChange={(e) => setSettings({...settings, socials: {...settings.socials, facebook: e.target.value}})}
                            className="w-full h-14 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-6 font-bold text-slate-900 dark:text-white"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-mono text-slate-300 dark:text-white/20 uppercase tracking-widest">Instagram Uplink</label>
                          <input 
                            type="text" 
                            value={settings?.socials?.instagram} 
                            onChange={(e) => setSettings({...settings, socials: {...settings.socials, instagram: e.target.value}})}
                            className="w-full h-14 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-6 font-bold text-slate-900 dark:text-white"
                          />
                       </div>
                    </div>
                    
                    {/* Map Settings */}
                    <div className="pt-8 border-t border-slate-200 dark:border-white/5 space-y-6">
                        <div className="flex items-center gap-3 text-slate-400 dark:text-white/40 font-mono text-[10px] uppercase tracking-widest">
                           <MapPin className="w-4 h-4" /> Tactical Map Parameters
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-mono text-slate-300 dark:text-white/20 uppercase tracking-widest">Embed URL (Google Maps)</label>
                           <input 
                             type="text" 
                             value={settings?.map?.embedUrl} 
                             onChange={(e) => setSettings({...settings, map: {...settings.map, embedUrl: e.target.value}})}
                             className="w-full h-14 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-6 font-bold text-slate-900 dark:text-white"
                           />
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                           <div className="space-y-2">
                              <label className="text-[10px] font-mono text-slate-300 dark:text-white/20 uppercase tracking-widest">Node ID</label>
                              <input type="text" value={settings?.map?.nodeId} onChange={(e) => setSettings({...settings, map: {...settings.map, nodeId: e.target.value}})} className="w-full h-14 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 font-bold text-slate-900 dark:text-white" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-mono text-slate-300 dark:text-white/20 uppercase tracking-widest">LAT</label>
                              <input type="text" value={settings?.map?.lat} onChange={(e) => setSettings({...settings, map: {...settings.map, lat: e.target.value}})} className="w-full h-14 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 font-bold text-slate-900 dark:text-white" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-mono text-slate-300 dark:text-white/20 uppercase tracking-widest">LONG</label>
                              <input type="text" value={settings?.map?.long} onChange={(e) => setSettings({...settings, map: {...settings.map, long: e.target.value}})} className="w-full h-14 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 font-bold text-slate-900 dark:text-white" />
                           </div>
                        </div>
                    </div>
                 </div>
              </div>

              {/* Office Grid Editor */}
              <div className="bg-slate-50 dark:bg-[#05050a]/40 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-10 space-y-10 shadow-sm">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-slate-400 dark:text-white/40 font-mono text-[10px] uppercase tracking-widest">
                       <MapPin className="w-5 h-5" /> Global Node Network (Offices)
                    </div>
                    <Button
                      onClick={() => {
                        const newOffices = [...(settings?.offices || []), { city: "New Hub", country: "", address: "", phone: "", meta: "NODE" }]
                        setSettings({...settings, offices: newOffices})
                      }}
                      className="bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white rounded-xl h-10 px-6 font-bold text-[10px] border border-slate-200 dark:border-white/10 uppercase tracking-widest shadow-sm"
                    >
                      <Plus className="w-3 h-3 mr-2" /> Add Office Node
                    </Button>
                 </div>
                 
                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {settings?.offices?.map((office: any, idx: number) => (
                      <div key={idx} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-8 relative group shadow-sm">
                        <button 
                          onClick={() => {
                             const newOffices = settings.offices.filter((_: any, i: number) => i !== idx);
                             setSettings({...settings, offices: newOffices});
                          }}
                          className="absolute top-6 right-6 p-2 text-slate-300 dark:text-white/20 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        
                        <div className="space-y-6">
                           <div className="grid grid-cols-2 gap-4">
                              <input type="text" placeholder="City" value={office.city} onChange={(e) => {
                                 const newOffices = [...settings.offices];
                                 newOffices[idx].city = e.target.value;
                                 setSettings({...settings, offices: newOffices});
                              }} className="w-full bg-transparent border-b border-slate-200 dark:border-white/10 focus:border-indigo-600 dark:focus:border-indigo-500 outline-none pb-2 font-bold text-xl uppercase tracking-tighter text-slate-900 dark:text-white" />
                              <input type="text" placeholder="Meta (e.g. HQ)" value={office.meta} onChange={(e) => {
                                 const newOffices = [...settings.offices];
                                 newOffices[idx].meta = e.target.value;
                                 setSettings({...settings, offices: newOffices});
                              }} className="w-full bg-transparent border-b border-slate-200 dark:border-white/10 focus:border-indigo-600 dark:focus:border-indigo-500 outline-none pb-2 text-[10px] font-mono uppercase text-indigo-600 dark:text-indigo-400" />
                           </div>
                           <textarea placeholder="Address" value={office.address} onChange={(e) => {
                                 const newOffices = [...settings.offices];
                                 newOffices[idx].address = e.target.value;
                                 setSettings({...settings, offices: newOffices});
                              }} className="w-full bg-transparent border-b border-slate-200 dark:border-white/10 focus:border-indigo-600 dark:focus:border-indigo-500 outline-none pb-2 text-sm text-slate-500 dark:text-white/40 h-20 resize-none" />
                           <input type="tel" placeholder="Phone" value={office.phone} onChange={(e) => {
                                 const newOffices = [...settings.offices];
                                 newOffices[idx].phone = e.target.value;
                                 setSettings({...settings, offices: newOffices});
                              }} className="w-full bg-transparent border-b border-slate-200 dark:border-white/10 focus:border-indigo-600 dark:focus:border-indigo-500 outline-none pb-2 text-sm font-medium text-slate-900 dark:text-white" />
                        </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Action Bar */}
              <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50">
                <Button
                  onClick={handleUpdateSettings}
                  disabled={isSaving}
                  className="bg-indigo-600 dark:bg-white text-white dark:text-black hover:bg-indigo-700 dark:hover:bg-white/90 h-20 px-16 rounded-full font-black uppercase text-xs tracking-[0.5em] shadow-2xl group flex items-center gap-6"
                >
                  {isSaving ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6 group-hover:scale-125 transition-transform" />}
                  {isSaving ? "PATCHING..." : "DEPLOY CHANGES"}
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="leads"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Pipeline Header with Export Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-[#05050a]/40 border border-slate-200 dark:border-white/5 shadow-sm">
                <div>
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-mono text-[10px] uppercase tracking-widest font-bold mb-1">
                    <Shield className="w-3.5 h-3.5" /> Automated Lead Telemetry
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                    Inbound Pipeline Registry
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-white/40 mt-0.5">
                    Live capture from Website Visitor Popup and Contact Page.
                  </p>
                </div>
                <Button
                  onClick={handleExportCSV}
                  className="h-12 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2.5 border-0 cursor-pointer self-start sm:self-auto"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Export Spreadsheet (CSV)</span>
                </Button>
              </div>

              <div className="bg-slate-50 dark:bg-[#05050a]/40 border border-slate-200 dark:border-white/5 rounded-[3rem] overflow-hidden shadow-xl dark:shadow-2xl">
                 <div className="overflow-x-auto">
                    <table className="w-full">
                       <thead>
                          <tr className="border-b border-slate-200 dark:border-white/5 bg-slate-100/50 dark:bg-white/[0.02]">
                             <th className="px-10 py-8 text-left text-[10px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-widest font-black">Lead Registry</th>
                             <th className="px-10 py-8 text-left text-[10px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-widest font-black">Entity Details</th>
                             <th className="px-10 py-8 text-left text-[10px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-widest font-black">Communication Node</th>
                             <th className="px-10 py-8 text-left text-[10px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-widest font-black">Payload Sector</th>
                             <th className="px-10 py-8 text-left text-[10px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-widest font-black">Operational Status</th>
                             <th className="px-10 py-8 text-right text-[10px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-widest font-black">Maintenance</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                          {leads.map((lead) => (
                             <tr key={lead.id} className="group hover:bg-white dark:hover:bg-white/[0.02] transition-all">
                                <td className="px-10 py-10">
                                   <div className="flex flex-col gap-1.5">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase">{lead.name}</span>
                                        {lead.source === 'WEBSITE_POPUP' ? (
                                          <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono text-[8px] font-black tracking-widest border border-purple-500/20">
                                            POPUP
                                          </span>
                                        ) : (
                                          <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-[8px] font-black tracking-widest border border-indigo-500/20">
                                            FORM
                                          </span>
                                        )}
                                      </div>
                                      <span className="text-[10px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-widest">{lead.timestamp ? new Date(lead.timestamp?.toDate()).toLocaleString() : 'SYSTEM_PENDING'}</span>
                                   </div>
                                </td>
                                <td className="px-10 py-10">
                                   <div className="flex flex-col gap-1">
                                      <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest leading-none">{lead.company || 'INDEPENDENT'}</span>
                                      <span className="text-xs text-slate-500 dark:text-white/30 font-medium">{lead.phone || 'NO_VOICE_LINK'}</span>
                                   </div>
                                </td>
                                <td className="px-10 py-10">
                                   <div className="flex items-center gap-3">
                                      <a href={`mailto:${lead.email}`} className="text-sm font-bold text-slate-600 dark:text-white/60 hover:text-indigo-600 dark:hover:text-white transition-colors">{lead.email}</a>
                                      <ArrowUpRight className="w-4 h-4 text-slate-200 dark:text-white/10 group-hover:text-indigo-500 transition-colors" />
                                   </div>
                                </td>
                                <td className="px-10 py-10">
                                   <span className="px-4 py-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-[9px] uppercase tracking-widest font-black border border-indigo-500/20">
                                      {lead.service || 'GENERAL'}
                                   </span>
                                </td>
                                <td className="px-10 py-10">
                                   <select 
                                     value={lead.status} 
                                     onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                                     className={`bg-transparent font-black text-[9px] uppercase tracking-widest focus:outline-none cursor-pointer ${
                                       lead.status === 'NEW' ? 'text-emerald-600 dark:text-emerald-400' :
                                       lead.status === 'IN_PROGRESS' ? 'text-amber-600 dark:text-amber-400' :
                                       lead.status === 'RESOLVED' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-white/20'
                                     }`}
                                   >
                                      <option value="NEW" className="bg-white dark:bg-[#05050a] text-emerald-600 dark:text-emerald-400 font-black">NEW_TRANSMISSION</option>
                                      <option value="IN_PROGRESS" className="bg-white dark:bg-[#05050a] text-amber-600 dark:text-amber-400 font-black">AUDITING</option>
                                      <option value="RESOLVED" className="bg-white dark:bg-[#05050a] text-blue-600 dark:text-blue-400 font-black">RESOLVED</option>
                                      <option value="REJECTED" className="bg-white dark:bg-[#05050a] text-red-600 dark:text-red-400 font-black">TERMINATED</option>
                                   </select>
                                </td>
                                <td className="px-10 py-10 text-right">
                                   <div className="flex justify-end gap-2 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                                      <Button
                                        onClick={() => {
                                            alert(`MISSION_MESSAGE:\n\n"${lead.message}"`)
                                        }}
                                        className="w-12 h-12 rounded-xl bg-white dark:bg-white/5 hover:bg-indigo-600 text-slate-400 hover:text-white transition-all p-0 border border-slate-200 dark:border-white/10"
                                      >
                                         <MessageSquare className="w-5 h-5" />
                                      </Button>
                                      <Button
                                        onClick={() => handleDeleteLead(lead.id)}
                                        className="w-12 h-12 rounded-xl bg-white dark:bg-white/5 hover:bg-red-600 text-slate-400 hover:text-white transition-all p-0 border border-slate-200 dark:border-white/10"
                                      >
                                         <Trash2 className="w-5 h-5" />
                                      </Button>
                                   </div>
                                </td>
                             </tr>
                          ))}
                          {leads.length === 0 && (
                            <tr>
                               <td colSpan={6} className="px-10 py-40 text-center">
                                  <div className="flex flex-col items-center gap-6 opacity-20">
                                     <Cpu className="w-20 h-20 text-slate-900 dark:text-white" />
                                     <p className="font-mono text-sm uppercase tracking-[1em] text-slate-900 dark:text-white">No Inbound Data Detected</p>
                                  </div>
                               </td>
                            </tr>
                          )}
                       </tbody>
                    </table>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
