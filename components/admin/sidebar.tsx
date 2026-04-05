"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  FileText,
  Users,
  Building2,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Bell,
  Search,
  Terminal,
  Cpu,
  Globe,
  Zap,
  ExternalLink,
  Sun,
  Moon,
  Activity,
  ShieldAlert,
  Command,
  Database,
  Cloud,
  MessageSquare,
  Star
} from "lucide-react"
import { Button } from "@/components/ui/button"

const menuItems = [
  { icon: LayoutDashboard, label: "Command Center", href: "/admin", index: "01", sub: "Operational Stats" },
  { icon: FolderKanban, label: "Project Nodes", href: "/admin/projects", index: "02", sub: "Case Studies" },
  { icon: Wrench, label: "Protocol Services", href: "/admin/services", index: "03", sub: "Global Capabilities" },
  { icon: FileText, label: "Intelligence Hub", href: "/admin/blog", index: "04", sub: "Editorial Feed" },
  { icon: Users, label: "Operational Hubs", href: "/admin/team", index: "05", sub: "Personnel Nodes" },
  { icon: Star, label: "Testimonial Matrix", href: "/admin/testimonials", index: "06", sub: "Client Audits" },
  { icon: MessageSquare, label: "Communication Hub", href: "/admin/contact", index: "07", sub: "Settings & Leads" },
  { icon: Building2, label: "Entity Profile", href: "/admin/about", index: "08", sub: "Structural Identity" },
  { icon: Settings, label: "System Config", href: "/admin/config", index: "09", sub: "Global Protocols" },
]

interface AdminSidebarProps {
  children: React.ReactNode
}

export function AdminSidebar({ children }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin/login")
  }

  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <div className={`min-h-screen w-full flex relative overflow-x-hidden selection:bg-indigo-500/30 ${isDarkMode ? "bg-[#010103] text-white" : "bg-slate-50 text-slate-900"}`}>
      {/* Cinematic HUD Backgrounds */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {isDarkMode ? (
          <>
            <div className="absolute inset-0 grid-pattern opacity-[0.03]" />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
            <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px]" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#e0e7ff_0%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#f1f5f9_0%,transparent_50%)]" />
            <div className="absolute inset-0 opacity-[0.05] grid-pattern-light" />
          </>
        )}
      </div>

      {/* Desktop Sidebar HUD */}
      <aside
        className={`hidden lg:flex flex-col transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-50 border-r ${isDarkMode
            ? "bg-[#05050a]/60 backdrop-blur-3xl border-white/[0.03]"
            : "bg-white/80 backdrop-blur-3xl border-slate-200"
          } ${isCollapsed ? "w-24" : "w-80"
          }`}
      >
        <div className={`absolute inset-0 pointer-events-none ${isDarkMode ? "bg-gradient-to-b from-indigo-500/[0.02] to-transparent" : "bg-gradient-to-b from-slate-50/50 to-transparent"}`} />

        {/* Sidebar Header */}
        <div className={`p-8 border-b relative overflow-hidden group/header ${isDarkMode ? "border-white/[0.03] bg-[#05050a]/40" : "border-slate-100 bg-white/50"}`}>
          <Link href="/admin" className="flex items-center gap-5 group">
            <div className="relative w-12 h-12 flex-shrink-0">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className={`absolute inset-0 border rounded-2xl transition-all duration-500 ${isDarkMode ? "border-indigo-500/30 group-hover/header:border-indigo-500/60" : "border-indigo-200 group-hover/header:border-indigo-400"}`}
              />
              <div className={`absolute inset-1.5 rounded-xl border flex items-center justify-center shadow-2xl overflow-hidden transition-all duration-500 ${isDarkMode ? "bg-[#010103] border-white/10 group-hover/header:scale-95" : "bg-white border-slate-100 shadow-xl group-hover/header:scale-95"}`}>
                <img src="/WhatsApp Image 2026-04-04 at 12.39.24 PM.jpeg" alt="MN" className={`w-full h-full object-contain ${isDarkMode ? "grayscale opacity-50 contrast-150" : ""}`} />
              </div>
            </div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col"
              >
                <span className={`text-2xl font-black tracking-tighter leading-none flex items-center gap-1 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                  Mega<span className="text-indigo-500">nods</span>
                  <div className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse mt-3" />
                </span>
                <span className={`text-[8px] font-mono tracking-[0.4em] uppercase mt-2.5 font-bold ${isDarkMode ? "text-white/30" : "text-slate-400"}`}>Operational HUD v4.5</span>
              </motion.div>
            )}
          </Link>
        </div>

        {/* Navigation Grid */}
        <nav className="flex-1 p-6 space-y-1.5 overflow-y-auto custom-scrollbar relative px-6">
          <div className={`text-[9px] font-mono uppercase tracking-[0.5em] mb-10 pl-6 ${isDarkMode ? "text-white/10" : "text-slate-300"}`}>Internal Registry</div>
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-5 px-6 py-4 rounded-[1.5rem] transition-all duration-500 group relative ${isActive
                    ? isDarkMode
                      ? "bg-white/5 border border-white/10 text-white shadow-2xl shadow-indigo-500/10 scale-[1.02]"
                      : "bg-indigo-50 border border-indigo-100 text-indigo-700 shadow-xl shadow-indigo-600/5 scale-[1.02]"
                    : isDarkMode
                      ? "text-white/30 hover:text-white/60 hover:bg-white/[0.03] border border-transparent"
                      : "text-slate-400 hover:text-slate-900 hover:bg-slate-100/60 border border-transparent"
                  }`}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 transition-all duration-500 ${isActive ? "text-indigo-500 scale-110" : "group-hover:scale-110"}`} />
                {!isCollapsed && (
                  <div className="flex flex-col min-w-0">
                    <span className={`text-[11px] font-bold uppercase tracking-widest truncate transition-colors ${isActive ? "text-slate-900 dark:text-white" : ""}`}>{item.label}</span>
                    <span className={`text-[7px] font-mono transition-colors mt-0.5 tracking-widest ${isActive ? "text-indigo-400" : isDarkMode ? "text-white/10" : "text-slate-300"}`}>{item.sub}</span>
                  </div>
                )}
                {isActive && (
                  <div className="absolute right-6 flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-indigo-500" />
                    <div className="w-1 h-1 rounded-full bg-indigo-400/50" />
                  </div>
                )}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-v2"
                    className="absolute left-0 w-1.5 h-10 bg-indigo-500 rounded-full"
                    style={{ boxShadow: '0 0 15px rgba(99, 102, 241, 0.6)' }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className={`p-8 border-t relative space-y-4 ${isDarkMode ? "border-white/[0.03] bg-[#05050a]/40" : "border-slate-100 bg-white/50"}`}>
          <div className="flex gap-4">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`flex-1 h-14 flex items-center justify-center rounded-[1.25rem] transition-all ${isDarkMode ? "bg-white/5 border border-white/5 text-white/20 hover:text-white hover:bg-white/10" : "bg-slate-50 border border-slate-100 text-slate-300 hover:text-slate-900 hover:bg-slate-100"}`}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
            <button
              onClick={handleLogout}
              className={`h-14 flex items-center justify-center gap-3 rounded-[1.25rem] transition-all font-mono text-[10px] uppercase tracking-widest ${isCollapsed ? "w-14" : "flex-[2]"} ${isDarkMode ? "bg-red-500/5 border border-red-500/10 text-red-500/40 hover:text-red-500 hover:bg-red-500/10" : "bg-red-50 border border-red-100 text-red-400 hover:text-red-600 hover:bg-red-100"}`}
            >
              <LogOut className="w-4 h-4" />
              {!isCollapsed && <span className="font-bold">Terminate</span>}
            </button>
          </div>
          {!isCollapsed && (
            <div className={`p-4 rounded-2xl text-center border ${isDarkMode ? "bg-indigo-500/5 border-indigo-500/10" : "bg-indigo-50/50 border-indigo-100"}`}>
              <div className={`text-[8px] font-mono uppercase tracking-[0.3em] font-bold ${isDarkMode ? "text-indigo-400/60" : "text-indigo-400"}`}>Stability Index</div>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="w-full h-1 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "98%" }} className="h-full bg-indigo-500" />
                </div>
                <span className="text-[10px] font-mono font-bold text-indigo-500">98%</span>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Terminal */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-700 relative z-10 overflow-hidden">
        {/* Tactical Top Bar */}
        <header className={`h-20 lg:h-24 border-b backdrop-blur-3xl flex items-center justify-between px-6 lg:px-12 sticky top-0 z-[40] transition-all ${isDarkMode ? "bg-[#010103]/60 border-white/[0.03]" : "bg-white/80 border-slate-200 shadow-sm"}`}>
          <div className="flex items-center gap-4 lg:gap-10">
            <div className="lg:hidden flex items-center">
              <button onClick={() => setIsMobileOpen(true)} className={`p-3 rounded-2xl border ${isDarkMode ? "bg-white/5 border-white/10 text-white" : "bg-white border-slate-200 text-slate-900 shadow-sm"}`}>
                <Menu className="w-5 h-5" />
              </button>
            </div>

            <Link href="/admin" className="lg:hidden flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 p-0.5">
                <div className={`w-full h-full rounded-[9px] flex items-center justify-center font-black text-[10px] ${isDarkMode ? "bg-[#010103] text-white" : "bg-white text-indigo-600"}`}>MN</div>
              </div>
            </Link>

            <div className="relative group hidden md:block">
              <Search className={`absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isDarkMode ? "text-white/10 group-focus-within:text-indigo-400" : "text-slate-400"}`} />
              <input
                type="text"
                placeholder="Access System Repositories..."
                className={`w-64 lg:w-96 h-12 lg:h-14 rounded-2xl pl-12 lg:pl-14 pr-6 text-xs font-medium focus:outline-none transition-all ${isDarkMode ? "bg-white/[0.03] border border-white/[0.05] text-white placeholder:text-white/10 focus:border-indigo-500/30 focus:bg-white/[0.05]" : "bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white"}`}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/10">
                <Command className="w-2.5 h-2.5 text-white/20" />
                <span className="text-[9px] font-mono text-white/20">K</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-8">
            <div className={`hidden sm:flex items-center gap-4 lg:gap-8 pr-4 lg:pr-10 border-r ${isDarkMode ? "border-white/5" : "border-slate-200"}`}>
              <div className="hidden xl:flex flex-col items-end">
                <span className="text-[10px] font-mono font-black text-indigo-500 uppercase tracking-[0.2em]">Global Uptime</span>
                <span className={`text-[9px] font-mono uppercase tracking-widest mt-0.5 ${isDarkMode ? "text-white/20" : "text-slate-400"}`}>Nodes Synchronized</span>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-emerald-500/20 blur-md rounded-full" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse relative z-10" />
              </div>
            </div>

            <div className="flex items-center gap-2 lg:gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center rounded-xl lg:rounded-[1.25rem] border transition-all duration-500 ${isDarkMode ? "bg-white/5 border-white/5 text-white/20 hover:text-white hover:bg-white/10 hover:border-white/10" : "bg-white border-slate-200 text-slate-400 hover:text-indigo-500 shadow-sm"}`}
              >
                {isDarkMode ? <Sun className="w-4 h-4 lg:w-5 lg:h-5" /> : <Moon className="w-4 h-4 lg:w-5 lg:h-5" />}
              </button>

              <div className="flex items-center gap-2 lg:gap-3">
                <button className={`w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center rounded-xl lg:rounded-[1.25rem] border transition-all relative ${isDarkMode ? "bg-white/5 border-white/5 text-white/20 hover:text-white hover:bg-white/10" : "bg-white border-slate-200 text-slate-400 hover:text-indigo-500 shadow-sm"}`}>
                  <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span className="absolute top-2.5 right-2.5 lg:top-4 lg:right-4 w-1.5 h-1.5 lg:w-2 lg:h-2 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,1)]" />
                </button>

                <Link href="/" target="_blank" className="hidden xs:block">
                  <button className={`w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center rounded-xl lg:rounded-[1.25rem] border transition-all ${isDarkMode ? "bg-white/5 border-white/5 text-white/20 hover:text-white hover:bg-white/10" : "bg-white border-slate-200 text-slate-400 hover:text-indigo-500 shadow-sm"}`}>
                    <ExternalLink className="w-4 h-4 lg:w-5 lg:h-5" />
                  </button>
                </Link>
              </div>

              <div className={`hidden sm:block w-px h-8 lg:h-10 ${isDarkMode ? "bg-white/10" : "bg-slate-200"} mx-1 lg:mx-2`} />

              <div className="flex items-center gap-2 lg:gap-4 group cursor-pointer">
                <div className="hidden md:flex flex-col items-end">
                  <span className={`text-[11px] font-black uppercase tracking-wider ${isDarkMode ? "text-white" : "text-slate-900"}`}>Admin</span>
                  <span className="text-[9px] font-mono text-indigo-500 font-bold uppercase tracking-widest leading-none">Level 04</span>
                </div>
                <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-700 p-0.5 shadow-lg lg:shadow-[0_10px_30px_rgba(79,70,229,0.3)] transition-transform group-hover:scale-105 duration-500">
                  <div className={`w-full h-full rounded-[9px] lg:rounded-[14px] flex items-center justify-center font-black text-xs lg:text-lg ${isDarkMode ? "bg-[#010103] text-white" : "bg-white text-indigo-600"}`}>A</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Global Catalog Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-12 relative custom-scrollbar">
          <div className="max-w-[1600px] mx-auto pb-24">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Protocol Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/90 backdrop-blur-md z-[90]"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-[85%] max-w-[340px] bg-[#05050a] border-r border-white/10 z-[100] flex flex-col"
            >
              <div className="p-10 border-b border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-black tracking-tighter text-white">Mega<span className="text-indigo-500">nods</span></div>
                  <div className="text-[8px] font-mono text-indigo-500 tracking-[0.4em] uppercase mt-2">Mobile Client</div>
                </div>
                <button onClick={() => setIsMobileOpen(false)} className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              <nav className="flex-1 p-8 space-y-3 overflow-y-auto">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-5 px-6 py-5 rounded-[1.5rem] transition-all ${pathname === item.href
                        ? "bg-indigo-600 text-white shadow-2xl shadow-indigo-600/30 font-bold"
                        : "text-white/30 bg-white/5"
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <div>
                      <div className="text-xs uppercase tracking-widest">{item.label}</div>
                      <div className="text-[7px] font-mono opacity-50 mt-1">{item.sub}</div>
                    </div>
                  </Link>
                ))}
              </nav>
              <div className="p-8 border-t border-white/5 space-y-4">
                <button onClick={handleLogout} className="w-full h-16 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3">
                  <LogOut className="w-4 h-4" /> Terminate Session
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
