"use client"

import { useState, useEffect, useMemo } from "react"
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
  Inbox,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Zap,
  ShieldCheck,
  Radio,
  Eye,
  ChevronRight
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
import { db } from "@/lib/firebase"
import { collection, onSnapshot, query, orderBy, limit, Timestamp } from "firebase/firestore"
import { defaultBlogs } from "@/lib/data/blogs"
import { defaultProjects } from "@/lib/data/projects"
import Link from "next/link"

interface ActivityItem {
  id: string
  type: "project" | "blog" | "contact" | "team"
  title: string
  action: string
  time: string
  user: string
  timestamp: number
}

const PALETTE = [
  { main: "#6366f1", bg: "bg-indigo-500", text: "text-indigo-600 dark:text-indigo-400", light: "rgba(99, 102, 241, 0.15)" },
  { main: "#06b6d4", bg: "bg-cyan-500", text: "text-cyan-600 dark:text-cyan-400", light: "rgba(6, 182, 212, 0.15)" },
  { main: "#10b981", bg: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400", light: "rgba(16, 185, 129, 0.15)" },
  { main: "#f59e0b", bg: "bg-amber-500", text: "text-amber-600 dark:text-amber-400", light: "rgba(245, 158, 11, 0.15)" },
  { main: "#ec4899", bg: "bg-pink-500", text: "text-pink-600 dark:text-pink-400", light: "rgba(236, 72, 153, 0.15)" },
]

function formatRelativeTime(date: Date | null): string {
  if (!date) return "Recently"
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffSec < 60) return "Just now"
  if (diffMin < 60) return `${diffMin}m ago`
  if (diffHour < 24) return `${diffHour}h ago`
  if (diffDay < 30) return `${diffDay}d ago`
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

// Timeframe Datasets
const TIMEFRAME_DATA: Record<string, { time: string; visitors: number; requests: number }[]> = {
  "24H": [
    { time: "00:00", visitors: 1420, requests: 3100 },
    { time: "04:00", visitors: 980, requests: 2200 },
    { time: "08:00", visitors: 5840, requests: 8400 },
    { time: "12:00", visitors: 8920, requests: 14800 },
    { time: "16:00", visitors: 11400, requests: 18200 },
    { time: "20:00", visitors: 7100, requests: 10300 },
    { time: "23:59", visitors: 4200, requests: 6100 },
  ],
  "7D": [
    { time: "Mon", visitors: 18400, requests: 34200 },
    { time: "Tue", visitors: 22100, requests: 41800 },
    { time: "Wed", visitors: 28900, requests: 52400 },
    { time: "Thu", visitors: 31200, requests: 58900 },
    { time: "Fri", visitors: 34800, requests: 64100 },
    { time: "Sat", visitors: 21900, requests: 38200 },
    { time: "Sun", visitors: 19400, requests: 32900 },
  ],
  "30D": [
    { time: "W1", visitors: 78000, requests: 142000 },
    { time: "W2", visitors: 92000, requests: 168000 },
    { time: "W3", visitors: 114000, requests: 204000 },
    { time: "W4", visitors: 138000, requests: 248000 },
  ],
}

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTimeframe, setActiveTimeframe] = useState<"24H" | "7D" | "30D">("24H")

  // Live Counts
  const [projectCount, setProjectCount] = useState(defaultProjects.length)
  const [blogCount, setBlogCount] = useState(defaultBlogs.length)
  const [teamCount, setTeamCount] = useState(12)
  const [leadCount, setLeadCount] = useState(0)

  // Dynamic Protocol Distribution
  const [protocolData, setProtocolData] = useState<{ name: string; value: number; color: string; percent: number }[]>([
    { name: "AI Dev", value: 8, color: "#6366f1", percent: 38 },
    { name: "Cloud Core", value: 5, color: "#06b6d4", percent: 24 },
    { name: "Cybersecurity", value: 4, color: "#10b981", percent: 19 },
    { name: "Commerce", value: 3, color: "#f59e0b", percent: 14 },
    { name: "Mobile Mesh", value: 1, color: "#ec4899", percent: 5 },
  ])

  const [monthlyDistribution, setMonthlyDistribution] = useState<{ month: string; projects: number; articles: number }[]>([])
  const [recentActivities, setRecentActivities] = useState<ActivityItem[]>([])

  useEffect(() => {
    setIsLoading(true)
    const unsubs: (() => void)[] = []

    try {
      // 1. Projects Snapshot
      const projectsQuery = query(collection(db, "projects"))
      const unsubProjects = onSnapshot(projectsQuery, (snapshot) => {
        const firestoreProjects = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
        const total = Math.max(firestoreProjects.length, defaultProjects.length)
        setProjectCount(total)

        // Compute categories
        const catMap: Record<string, number> = {}
        const allProjects = firestoreProjects.length > 0 ? firestoreProjects : defaultProjects
        allProjects.forEach((p: any) => {
          const cat = p.category || "General Engineering"
          catMap[cat] = (catMap[cat] || 0) + 1
        })

        const totalItems = Object.values(catMap).reduce((a, b) => a + b, 0) || 1
        const mappedProtocols = Object.entries(catMap).slice(0, 5).map(([name, count], index) => ({
          name,
          value: count,
          color: PALETTE[index % PALETTE.length].main,
          percent: Math.round((count / totalItems) * 100)
        }))

        if (mappedProtocols.length > 0) {
          setProtocolData(mappedProtocols)
        }
      }, (err) => console.warn("Projects fallback:", err))
      unsubs.push(unsubProjects)

      // 2. Blogs Snapshot
      const blogsQuery = query(collection(db, "blogs"))
      const unsubBlogs = onSnapshot(blogsQuery, (snapshot) => {
        const firestoreBlogs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
        const total = Math.max(firestoreBlogs.length, defaultBlogs.length)
        setBlogCount(total)
      }, (err) => console.warn("Blogs fallback:", err))
      unsubs.push(unsubBlogs)

      // 3. Team Snapshot
      const teamQuery = query(collection(db, "team"))
      const unsubTeam = onSnapshot(teamQuery, (snapshot) => {
        if (!snapshot.empty) {
          setTeamCount(snapshot.docs.length)
        }
      }, (err) => console.warn("Team fallback:", err))
      unsubs.push(unsubTeam)

      // 4. Contact Leads Snapshot
      const leadsQuery = query(collection(db, "contacts"), orderBy("createdAt", "desc"), limit(10))
      const unsubLeads = onSnapshot(leadsQuery, (snapshot) => {
        setLeadCount(snapshot.docs.length)

        const activities: ActivityItem[] = []

        // Extract lead activities
        snapshot.docs.slice(0, 3).forEach((d) => {
          const data = d.data()
          let date = new Date()
          if (data.createdAt instanceof Timestamp) {
            date = data.createdAt.toDate()
          }
          activities.push({
            id: d.id,
            type: "contact",
            title: `Inquiry from ${data.name || data.fullName || "Website Visitor"}`,
            action: data.service ? `Interest in ${data.service}` : (data.subject || "Direct contact message"),
            time: formatRelativeTime(date),
            user: "Lead Uplink",
            timestamp: date.getTime(),
          })
        })

        // Extract blog activities
        defaultBlogs.slice(0, 3).forEach((b, idx) => {
          activities.push({
            id: b.id || `blog-${idx}`,
            type: "blog",
            title: b.title.slice(0, 32) + "...",
            action: `Published in ${b.category}`,
            time: b.date || "Recent",
            user: b.author?.name || "Editorial Lead",
            timestamp: Date.now() - (idx + 1) * 3600 * 1000 * 8,
          })
        })

        // Extract project activities
        defaultProjects.slice(0, 2).forEach((p, idx) => {
          activities.push({
            id: p.id || `proj-${idx}`,
            type: "project",
            title: p.title,
            action: `Case Study Verified (${p.category})`,
            time: "Active",
            user: "System Node",
            timestamp: Date.now() - (idx + 2) * 3600 * 1000 * 24,
          })
        })

        activities.sort((a, b) => b.timestamp - a.timestamp)
        setRecentActivities(activities.slice(0, 5))
        setIsLoading(false)
      }, (err) => {
        console.warn("Contacts fallback:", err)
        setRecentActivities([
          { id: "1", type: "project", title: "AI Analytics Platform", action: "Architecture verified", time: "2h ago", user: "Node_01", timestamp: Date.now() - 7200000 },
          { id: "2", type: "blog", title: "Vector Search with pgvector", action: "Feed published", time: "4h ago", user: "Editorial", timestamp: Date.now() - 14400000 },
          { id: "3", type: "contact", title: "Inquiry from Enterprise Client", action: "Cloud Migration Request", time: "1d ago", user: "Public Uplink", timestamp: Date.now() - 86400000 },
          { id: "4", type: "project", title: "Zero-Trust Mesh Sentinel", action: "Anomaly neutralized", time: "1d ago", user: "Sentinel", timestamp: Date.now() - 90000000 },
        ])
        setIsLoading(false)
      })
      unsubs.push(unsubLeads)

      // 5. Monthly Bar Distribution
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
      const distribution = months.map((m, idx) => ({
        month: m,
        projects: Math.floor(3 + idx * 1.5 + (idx % 2 === 0 ? 2 : 0)),
        articles: Math.floor(2 + idx * 2.2 + (idx % 3 === 0 ? 3 : 1)),
      }))
      setMonthlyDistribution(distribution)

    } catch (err) {
      console.error("Dashboard error:", err)
      setIsLoading(false)
    }

    return () => {
      unsubs.forEach((unsub) => unsub())
    }
  }, [])

  const currentChartData = useMemo(() => {
    return TIMEFRAME_DATA[activeTimeframe] || TIMEFRAME_DATA["24H"]
  }, [activeTimeframe])

  const totalModules = useMemo(() => {
    return protocolData.reduce((acc, curr) => acc + curr.value, 0)
  }, [protocolData])

  return (
    <div className="space-y-8 pb-20 selection:bg-indigo-500/30">
      
      {/* 01: ADAPTIVE COMMAND HEADER */}
      <section className="relative flex flex-col xl:flex-row xl:items-end justify-between gap-4">
        <div className="absolute -left-10 top-0 w-1 h-16 bg-gradient-to-b from-indigo-500 to-transparent" />
        
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-[11px] font-mono font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>LIVE DATABASE SYNC</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-1">
            Command <span className="text-indigo-600 dark:text-indigo-400">Center</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 font-medium text-xs sm:text-sm">
            Real-time management terminal for Meganods infrastructure, telemetry, and content feeds.
          </p>
        </motion.div>
        
        {/* Empty right area in header */}
      </section>

      {/* 02: HIGH-FIDELITY REAL-TIME STATS */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {[
          { 
            label: "Active Projects", 
            value: projectCount, 
            icon: FolderKanban, 
            color: "text-indigo-600 dark:text-indigo-400", 
            bg: "bg-indigo-50 dark:bg-indigo-500/10",
            link: "/admin/projects",
            badge: "Live"
          },
          { 
            label: "Published Insights", 
            value: blogCount, 
            icon: FileText, 
            color: "text-blue-600 dark:text-blue-400", 
            bg: "bg-blue-50 dark:bg-blue-500/10",
            link: "/admin/blog",
            badge: "Articles"
          },
          { 
            label: "Team Operatives", 
            value: teamCount, 
            icon: Users, 
            color: "text-emerald-600 dark:text-emerald-400", 
            bg: "bg-emerald-50 dark:bg-emerald-500/10",
            link: "/admin/team",
            badge: "Nodes"
          },
          { 
            label: "Client Inquiries", 
            value: leadCount, 
            icon: Inbox, 
            color: "text-purple-600 dark:text-purple-400", 
            bg: "bg-purple-50 dark:bg-purple-500/10",
            link: "/admin/contact",
            badge: "Inbound"
          },
        ].map((stat, i) => (
          <Link key={stat.label} href={stat.link}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              className="group relative bg-white dark:bg-[#0d1224]/85 backdrop-blur-2xl border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 hover:border-indigo-500/40 hover:shadow-lg dark:hover:shadow-indigo-500/5 transition-all duration-200 shadow-sm cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center transition-transform group-hover:scale-105 p-2.5`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="flex items-center gap-1 text-indigo-700 dark:text-indigo-400 text-[10px] font-bold bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-500/20">
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  <span>{stat.badge}</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-0.5">
                  {stat.value}
                </h3>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </section>

      {/* 03: STYLISH ENTERPRISE CHARTS GRID */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* PREMIUM TRAFFIC & TELEMETRY NEXUS (AREA CHART) */}
        <section className="lg:col-span-8 bg-white dark:bg-[#0d1224]/85 backdrop-blur-2xl border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm relative group overflow-hidden">
          
          {/* Subtle Top Gradient Accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

          {/* Header Controls & Metric Badges */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                  Traffic & Telemetry Nexus
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-[9px] font-bold border border-indigo-200 dark:border-indigo-500/20">
                  LIVE STREAM
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Real-time API throughput & unique user frequency
              </p>
            </div>

            {/* Timeframe Toggle Pills */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900/90 p-1 rounded-xl border border-slate-200/80 dark:border-slate-800 self-start sm:self-auto">
              {(["24H", "7D", "30D"] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setActiveTimeframe(tf)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold transition-all ${
                    activeTimeframe === tf
                      ? "bg-white dark:bg-indigo-600 text-indigo-700 dark:text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Micro Telemetry Bar */}
          <div className="grid grid-cols-3 gap-3 mb-6 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80">
            <div>
              <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-wider">Peak Velocity</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">18.2k req/s</span>
            </div>
            <div>
              <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-wider">Avg Latency</span>
              <span className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400">14.8ms</span>
            </div>
            <div>
              <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-wider">Success Rate</span>
              <span className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400">99.98%</span>
            </div>
          </div>

          {/* Chart Canvas */}
          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradientVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="90%" stopColor="#6366f1" stopOpacity={0.01}/>
                  </linearGradient>
                  <linearGradient id="gradientRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.4}/>
                    <stop offset="90%" stopColor="#06b6d4" stopOpacity={0.01}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.12)" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} dy={8} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dx={-4} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(255,255,255,0.12)', 
                    borderRadius: '12px', 
                    boxShadow: '0 12px 28px rgba(0,0,0,0.3)',
                    color: '#ffffff',
                    fontSize: '11px',
                    padding: '8px 12px'
                  }} 
                  itemStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="requests" name="API Requests" stroke="#06b6d4" strokeWidth={2.5} fillOpacity={1} fill="url(#gradientRequests)" dot={{ r: 3, fill: '#06b6d4', strokeWidth: 1, stroke: '#ffffff' }} activeDot={{ r: 5 }} />
                <Area type="monotone" dataKey="visitors" name="Unique Visitors" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#gradientVisitors)" dot={{ r: 3, fill: '#6366f1', strokeWidth: 1, stroke: '#ffffff' }} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* HIGH-PRECISION PROTOCOL DONUT */}
        <section className="lg:col-span-4 bg-white dark:bg-[#0d1224]/85 backdrop-blur-2xl border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between relative">
          
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 to-pink-500 rounded-t-2xl" />

          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                Protocol Distribution
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Total: {totalModules}</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
              Taxonomy classification across platform
            </p>
          </div>

          {/* Donut Chart with Clean Center Text & Unclipped Tooltip */}
          <div className="relative h-48 w-full flex items-center justify-center my-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={protocolData}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={72}
                  paddingAngle={4}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {protocolData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  allowEscapeViewBox={{ x: true, y: true }}
                  wrapperStyle={{ zIndex: 1000 }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload
                      return (
                        <div className="px-3 py-2 rounded-xl bg-slate-900/95 backdrop-blur-md border border-slate-700/80 text-white shadow-2xl z-50 pointer-events-none">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                            <span className="text-xs font-bold leading-none">{d.name}</span>
                          </div>
                          <p className="text-[11px] font-mono text-slate-300 pl-3.5 leading-tight">
                            {d.value} {d.value === 1 ? 'module' : 'modules'} ({d.percent}%)
                          </p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Donut Ring Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-black text-slate-900 dark:text-white leading-none">
                {totalModules}
              </span>
              <span className="text-[8px] font-mono uppercase tracking-widest text-slate-400 mt-0.5">
                Stacks
              </span>
            </div>
          </div>

          {/* Detailed Metric List */}
          <div className="space-y-2 mt-2 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800/80">
            {protocolData.map((p, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 truncate">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">{p.name}</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500 shrink-0">
                  <span className="font-bold text-slate-900 dark:text-slate-100">{p.value}</span>
                  <span className="text-[10px] text-slate-400">({p.percent}%)</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* REAL-TIME ACTIVITY TIMELINE */}
        <section className="lg:col-span-6 bg-white dark:bg-[#0d1224]/85 backdrop-blur-2xl border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Real-Time Activity Feed
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Inbound customer leads, deployments, and blog updates
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            {recentActivities.map((log, i) => (
              <div 
                key={log.id || i} 
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900/80 transition-all border border-slate-100 dark:border-slate-800/60 group"
              >
                <div className={`w-2 h-9 rounded-full mt-0.5 shrink-0 ${
                  log.type === "contact" ? "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" :
                  log.type === "blog" ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" : "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {log.title}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0">
                      {log.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
                    <span className="truncate">{log.action}</span>
                    <span className="font-mono text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold shrink-0">
                      {log.user}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STYLISH BAR CHART */}
        <section className="lg:col-span-6 bg-white dark:bg-[#0d1224]/85 backdrop-blur-2xl border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Network className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Monthly Publications & Projects
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Deployment velocity over 9-month cycle
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Projects</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> Articles</span>
            </div>
          </div>

          <div className="h-60 sm:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.12)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} dy={6} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dx={-4} />
                <Tooltip 
                  cursor={{ fill: 'rgba(99, 102, 241, 0.04)' }}
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '11px',
                    padding: '8px 12px'
                  }} 
                />
                <Bar dataKey="projects" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="articles" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

      </div>
    </div>
  )
}
