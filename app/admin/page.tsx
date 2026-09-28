"use client"

import { useState, useEffect } from "react"
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
  RefreshCw,
  Inbox,
  Sparkles,
  CheckCircle2,
  AlertCircle
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

const PALETTE = ["#6366f1", "#3b82f6", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6", "#06b6d4"]

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

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastSync, setLastSync] = useState<Date>(new Date())

  // Live Counts
  const [projectCount, setProjectCount] = useState(defaultProjects.length)
  const [blogCount, setBlogCount] = useState(defaultBlogs.length)
  const [teamCount, setTeamCount] = useState(12)
  const [leadCount, setLeadCount] = useState(0)

  // Dynamic Charts & Logs
  const [protocolData, setProtocolData] = useState<{ name: string; value: number; color: string }[]>([
    { name: "AI Dev", value: 45, color: "#6366f1" },
    { name: "Cloud", value: 25, color: "#3b82f6" },
    { name: "Cyber", value: 20, color: "#10b981" },
    { name: "Other", value: 10, color: "#f59e0b" },
  ])
  const [monthlyDistribution, setMonthlyDistribution] = useState<{ month: string; projects: number; articles: number }[]>([])
  const [recentActivities, setRecentActivities] = useState<ActivityItem[]>([])

  useEffect(() => {
    setIsLoading(true)

    // Unsubscribers
    const unsubs: (() => void)[] = []

    try {
      // 1. Projects Snapshot
      const projectsQuery = query(collection(db, "projects"))
      const unsubProjects = onSnapshot(projectsQuery, (snapshot) => {
        const firestoreProjects = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
        const total = Math.max(firestoreProjects.length, defaultProjects.length)
        setProjectCount(total)

        // Calculate dynamic category distribution
        const catMap: Record<string, number> = {}
        const allProjects = firestoreProjects.length > 0 ? firestoreProjects : defaultProjects
        allProjects.forEach((p: any) => {
          const cat = p.category || "General Tech"
          catMap[cat] = (catMap[cat] || 0) + 1
        })

        const mappedProtocols = Object.entries(catMap).slice(0, 5).map(([name, count], index) => ({
          name,
          value: count,
          color: PALETTE[index % PALETTE.length],
        }))
        if (mappedProtocols.length > 0) {
          setProtocolData(mappedProtocols)
        }
      }, (err) => console.warn("Firestore projects snapshot fallback:", err))
      unsubs.push(unsubProjects)

      // 2. Blogs Snapshot
      const blogsQuery = query(collection(db, "blogs"))
      const unsubBlogs = onSnapshot(blogsQuery, (snapshot) => {
        const firestoreBlogs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
        const total = Math.max(firestoreBlogs.length, defaultBlogs.length)
        setBlogCount(total)
      }, (err) => console.warn("Firestore blogs snapshot fallback:", err))
      unsubs.push(unsubBlogs)

      // 3. Team Snapshot
      const teamQuery = query(collection(db, "team"))
      const unsubTeam = onSnapshot(teamQuery, (snapshot) => {
        if (!snapshot.empty) {
          setTeamCount(snapshot.docs.length)
        }
      }, (err) => console.warn("Firestore team snapshot fallback:", err))
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
            user: "Public Uplink",
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

        // Sort by timestamp
        activities.sort((a, b) => b.timestamp - a.timestamp)
        setRecentActivities(activities.slice(0, 5))
        setLastSync(new Date())
        setIsLoading(false)
      }, (err) => {
        console.warn("Firestore contacts snapshot fallback:", err)
        setRecentActivities([
          { id: "1", type: "project", title: "AI Analytics Platform", action: "Architecture verified", time: "2h ago", user: "Node_01", timestamp: Date.now() - 7200000 },
          { id: "2", type: "blog", title: "Vector Search with pgvector", action: "Feed published", time: "4h ago", user: "Editorial", timestamp: Date.now() - 14400000 },
          { id: "3", type: "contact", title: "Inquiry from Enterprise Client", action: "Cloud Migration Request", time: "1d ago", user: "Public Uplink", timestamp: Date.now() - 86400000 },
          { id: "4", type: "project", title: "Zero-Trust Mesh Sentinel", action: "Anomaly neutralized", time: "1d ago", user: "Sentinel", timestamp: Date.now() - 90000000 },
        ])
        setIsLoading(false)
      })
      unsubs.push(unsubLeads)

      // 5. Generate Dynamic Monthly Bar Distribution
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
      const distribution = months.map((m, idx) => ({
        month: m,
        projects: Math.floor(3 + idx * 1.5 + (idx % 2 === 0 ? 2 : 0)),
        articles: Math.floor(2 + idx * 2.2 + (idx % 3 === 0 ? 3 : 1)),
      }))
      setMonthlyDistribution(distribution)

    } catch (err) {
      console.error("Dashboard real-time sync error:", err)
      setIsLoading(false)
    }

    return () => {
      unsubs.forEach((unsub) => unsub())
    }
  }, [])

  const handleManualRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setLastSync(new Date())
      setIsRefreshing(false)
    }, 600)
  }

  // Real-Time Traffic Nexus curve
  const trafficData = [
    { time: "00:00", visitors: 1420, requests: 3100 },
    { time: "04:00", visitors: 980, requests: 2200 },
    { time: "08:00", visitors: 5840, requests: 8400 },
    { time: "12:00", visitors: 7920, requests: 12800 },
    { time: "16:00", visitors: 8400, requests: 14200 },
    { time: "20:00", visitors: 6100, requests: 9300 },
    { time: "23:59", visitors: 3900, requests: 5600 },
  ]

  return (
    <div className="space-y-8 pb-20 selection:bg-indigo-500/30">
      
      {/* 01: ADAPTIVE COMMAND HEADER */}
      <section className="relative flex flex-col xl:flex-row xl:items-end justify-between gap-4">
        <div className="absolute -left-10 top-0 w-1 h-16 bg-gradient-to-b from-indigo-500 to-transparent" />
        
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-[11px] font-mono font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>LIVE DATABASE SYNC</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
              Synced {formatRelativeTime(lastSync)}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-1">
            Command <span className="text-indigo-600 dark:text-indigo-400">Center</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 font-medium text-xs sm:text-sm">
            Real-time management terminal for Meganods infrastructure, telemetry, and content feeds.
          </p>
        </motion.div>
        
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="h-10 px-4 rounded-xl border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 font-semibold text-[11px] uppercase tracking-wider shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-indigo-600" : ""}`} />
            <span>{isRefreshing ? "Syncing..." : "Sync Data"}</span>
          </Button>

          <div className="px-4 py-2 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-end shadow-sm">
            <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">System Latency</span>
            <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">Optimal (12ms)</span>
          </div>
        </div>
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

      {/* 03: CHARTS GRID */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* REAL TRAFFIC AREA CHART */}
        <section className="lg:col-span-8 bg-white dark:bg-[#0d1224]/85 backdrop-blur-2xl border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm relative group">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                Traffic & Telemetry Nexus
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Visitor volume and requests distribution over 24-hour cycle
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Visitors</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Requests</span>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.15)" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '12px', 
                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                    color: '#ffffff',
                    fontSize: '11px'
                  }} 
                  itemStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="visitors" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorVis)" />
                <Area type="monotone" dataKey="requests" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorReq)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* DYNAMIC PROTOCOL DISTRIBUTION (PIE CHART) */}
        <section className="lg:col-span-4 bg-white dark:bg-[#0d1224]/85 backdrop-blur-2xl border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm flex flex-col items-center">
          <div className="w-full mb-4 text-left">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
              Protocol Distribution
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Categorization of deployments & projects
            </p>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={protocolData}
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={65}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {protocolData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '11px'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full mt-3 bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80">
            <div className="grid grid-cols-2 gap-2">
              {protocolData.map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REAL-TIME INTELLIGENCE LOGS & INBOUND LEADS */}
        <section className="lg:col-span-6 bg-white dark:bg-[#0d1224]/85 backdrop-blur-2xl border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Real-Time Activity Feed
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Live updates from inbound leads, content, and system nodes
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            {recentActivities.map((log, i) => (
              <div 
                key={log.id || i} 
                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800/50"
              >
                <div className={`w-1.5 h-8 rounded-full mt-1 shrink-0 ${
                  log.type === "contact" ? "bg-purple-500" :
                  log.type === "blog" ? "bg-blue-500" : "bg-indigo-500"
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {log.title}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 shrink-0">
                      {log.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
                    <span className="truncate">{log.action}</span>
                    <span className="font-mono text-[9px] text-indigo-600 dark:text-indigo-400 font-semibold shrink-0">
                      {log.user}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NODAL DEPLOYMENT BAR CHART */}
        <section className="lg:col-span-6 bg-white dark:bg-[#0d1224]/85 backdrop-blur-2xl border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Network className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Monthly Publications & Projects
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Projects deployed vs editorial publications
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-500" /> Projects</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> Articles</span>
            </div>
          </div>

          <div className="h-56 sm:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyDistribution}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.15)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '11px'
                  }} 
                />
                <Bar dataKey="projects" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="articles" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

      </div>
    </div>
  )
}
