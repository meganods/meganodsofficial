"use client"

import { motion } from "framer-motion"
import {
  Users,
  FolderKanban,
  FileText,
  TrendingUp,
  Activity,
  ArrowUpRight,
  Terminal,
  Calendar,
  Clock,
  Network,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts"

// --- REAL DATA CONSTANTS ---
const trafficData = [
  { time: "00:00", visitors: 2400, requests: 4000 },
  { time: "04:00", visitors: 1398, requests: 3000 },
  { time: "08:00", visitors: 9800, requests: 2000 },
  { time: "12:00", visitors: 3908, requests: 2780 },
  { time: "16:00", visitors: 4800, requests: 1890 },
  { time: "20:00", visitors: 3800, requests: 2390 },
  { time: "23:59", visitors: 4300, requests: 3490 },
]

const protocolData = [
  { name: "AI Dev", value: 45, color: "#6366f1" },
  { name: "Cloud", value: 25, color: "#3b82f6" },
  { name: "Cyber", value: 20, color: "#10b981" },
  { name: "Other", value: 10, color: "#f59e0b" },
]

const projectDistribution = [
  { month: "Jan", active: 4, completed: 2 },
  { month: "Feb", active: 5, completed: 3 },
  { month: "Mar", active: 8, completed: 1 },
  { month: "Apr", active: 7, completed: 4 },
  { month: "May", active: 10, completed: 5 },
  { month: "Jun", active: 12, completed: 6 },
]

const recentActivity = [
  { type: "project", title: "AI Analytics Platform", action: "Architecture verified", time: "2h ago", user: "Node_01" },
  { type: "blog", title: "Cloud Migration Protocol", action: "Feed published", time: "4h ago", user: "Node_04" },
  { type: "team", title: "Emily Johnson", action: "Uplink established", time: "1d ago", user: "System" },
  { type: "security", title: "Gateway Shield", action: "Anomaly neutralized", time: "1d ago", user: "Sentinel" }
]

export default function AdminDashboard() {
  return (
    <div className="space-y-12 pb-24">
      
      {/* 01: ADAPTIVE COMMAND HEADER */}
      <section className="relative flex flex-col xl:flex-row xl:items-end justify-between gap-8">
        <div className="absolute -left-10 top-0 w-1 h-20 bg-gradient-to-b from-indigo-500 to-transparent" />
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
           <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_10px_#6366f1]" />
              <span className="text-[10px] font-mono text-indigo-500 uppercase tracking-[0.5em] font-extrabold px-3 py-1 bg-indigo-500/5 rounded-full border border-indigo-100 dark:border-indigo-500/20">Operational Root Master</span>
           </div>
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white mb-2">Command <span className="text-indigo-500 underline decoration-indigo-500/30 underline-offset-[12px]">Center</span></h1>
           <p className="text-slate-400 dark:text-white/20 font-mono text-[10px] uppercase tracking-[0.4em]">Administrative Terminal Alpha v4.2 // Dual Environment Ready</p>
        </motion.div>
        
        <div className="flex flex-wrap gap-4">
           <div className="px-8 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-3xl flex flex-col items-end shadow-xl shadow-slate-200/20 dark:shadow-none">
              <span className="text-[8px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] mb-1">Infrastructure Load</span>
              <span className="text-2xl font-black text-emerald-500">Normal_0.024</span>
           </div>
        </div>
      </section>

      {/* 02: HIGH-FIDELITY STATS */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Project Tasks", value: "32", icon: FolderKanban, color: "text-indigo-500", bg: "bg-indigo-500/5" },
          { label: "Blog Intelligence", value: "256", icon: FileText, color: "text-blue-500", bg: "bg-blue-500/5" },
          { label: "Operational Uplinks", value: "18", icon: Users, color: "text-emerald-500", bg: "bg-emerald-500/5" },
          { label: "System Latency Mesh", value: "4ms", icon: Activity, color: "text-amber-500", bg: "bg-amber-500/5" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-white dark:bg-[#05050a]/40 backdrop-blur-3xl border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 hover:border-indigo-500/30 transition-all duration-500 shadow-xl dark:shadow-none"
          >
             <div className="flex items-center justify-between mb-8">
                <div className={`w-14 h-14 rounded-2xl ${stat.bg} border border-indigo-500/10 flex items-center justify-center transition-transform group-hover:scale-110`}>
                   <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <div className="flex items-center gap-1.5 text-emerald-500 text-[10px] font-bold bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10">
                   <TrendingUp className="w-3.5 h-3.5" /> +12%
                </div>
             </div>
             <div>
                <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-1">{stat.value}</h3>
                <p className="text-[9px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-[0.4em]">{stat.label}</p>
             </div>
          </motion.div>
        ))}
      </section>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* 03: REAL TRAFFIC AREA CHART */}
        <section className="lg:col-span-8 bg-white dark:bg-[#05050a]/40 backdrop-blur-3xl border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 shadow-xl dark:shadow-none relative group">
           <div className="flex items-center justify-between mb-12">
              <div>
                 <h3 className="text-xs font-bold text-slate-900 dark:text-white tracking-[0.3em] uppercase">Traffic Nexus</h3>
                 <span className="text-[8px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.4em]">Real-time visitor frequency data</span>
              </div>
           </div>

           <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={trafficData}>
                    <defs>
                       <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                       </linearGradient>
                       <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: '12px'}} 
                      itemStyle={{ fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="visitors" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorVis)" />
                    <Area type="monotone" dataKey="requests" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorReq)" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </section>

        {/* 04: REAL PROTOCOL PIE CHART */}
        <section className="lg:col-span-4 bg-white dark:bg-[#05050a]/40 backdrop-blur-3xl border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 shadow-xl dark:shadow-none flex flex-col items-center">
           <h3 className="text-[10px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.4em] mb-12 self-start underline decoration-indigo-500/50 underline-offset-8">Protocol Distro</h3>
           <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie
                      data={protocolData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                       {protocolData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                    </Pie>
                    <Tooltip />
                 </PieChart>
              </ResponsiveContainer>
           </div>
           <div className="w-full mt-8 bg-slate-50 dark:bg-white/5 p-6 rounded-[2rem] border border-slate-100 dark:border-white/5">
              <div className="grid grid-cols-2 gap-4">
                 {protocolData.map((p, i) => (
                    <div key={i} className="flex items-center gap-3">
                       <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                       <span className="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-widest">{p.name}</span>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* 05: LOGS & TASKS */}
        <section className="lg:col-span-6 bg-white dark:bg-[#05050a]/40 backdrop-blur-3xl border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 shadow-xl dark:shadow-none">
           <div className="flex items-center gap-4 mb-10">
              <Terminal className="w-5 h-5 text-indigo-500" />
              <h3 className="text-xs font-bold text-slate-900 dark:text-white tracking-[0.3em] uppercase">Intelligence Logs</h3>
           </div>
           <div className="space-y-6">
              {recentActivity.map((log, i) => (
                <div key={i} className="flex items-center gap-6 group">
                   <div className="w-1.5 h-12 rounded-full bg-slate-100 dark:bg-white/10 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1/2 bg-indigo-500" />
                   </div>
                   <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                         <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">{log.title}</h4>
                         <span className="text-[8px] font-mono text-slate-400 dark:text-white/20">{log.time}</span>
                      </div>
                      <p className="text-[10px] font-medium text-slate-500 dark:text-white/30 uppercase tracking-[0.2em]">{log.action}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* 06: REAL DISTRIBUTION BAR CHART */}
        <section className="lg:col-span-6 bg-white dark:bg-[#05050a]/40 backdrop-blur-3xl border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 shadow-xl dark:shadow-none">
           <div className="flex items-center gap-4 mb-10">
              <Network className="w-5 h-5 text-blue-500" />
              <h3 className="text-xs font-bold text-slate-900 dark:text-white tracking-[0.3em] uppercase">Nodal Deployment</h3>
           </div>
           <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={projectDistribution}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                    <Tooltip 
                      cursor={{fill: 'rgba(0,0,0,0.02)'}}
                      contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="active" fill="#6366f1" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="completed" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </section>

      </div>
    </div>
  )
}
