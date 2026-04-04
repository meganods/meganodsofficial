"use client"

import { motion } from "framer-motion"
import {
  BarChart3,
  Users,
  FolderKanban,
  FileText,
  TrendingUp,
  TrendingDown,
  Eye,
  MessageSquare,
  ArrowRight,
  Calendar,
  Clock
} from "lucide-react"
import Link from "next/link"

const stats = [
  {
    label: "Total Projects",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: FolderKanban,
    color: "from-cyan-500 to-blue-500"
  },
  {
    label: "Blog Posts",
    value: "68",
    change: "+8%",
    trend: "up",
    icon: FileText,
    color: "from-purple-500 to-pink-500"
  },
  {
    label: "Team Members",
    value: "15",
    change: "+2",
    trend: "up",
    icon: Users,
    color: "from-emerald-500 to-teal-500"
  },
  {
    label: "Page Views",
    value: "45.2K",
    change: "+23%",
    trend: "up",
    icon: Eye,
    color: "from-amber-500 to-orange-500"
  }
]

const recentActivity = [
  {
    type: "project",
    title: "AI Analytics Platform",
    action: "was updated",
    time: "2 hours ago",
    user: "John M."
  },
  {
    type: "blog",
    title: "Cloud Migration Guide",
    action: "was published",
    time: "4 hours ago",
    user: "Sarah C."
  },
  {
    type: "team",
    title: "New team member",
    action: "Emily Johnson joined",
    time: "Yesterday",
    user: "Admin"
  },
  {
    type: "comment",
    title: "New inquiry",
    action: "received from contact form",
    time: "Yesterday",
    user: "System"
  },
  {
    type: "project",
    title: "E-commerce Platform",
    action: "was created",
    time: "2 days ago",
    user: "Michael T."
  }
]

const quickActions = [
  { label: "Add Project", href: "/admin/projects", icon: FolderKanban },
  { label: "Write Blog Post", href: "/admin/blog", icon: FileText },
  { label: "Add Team Member", href: "/admin/team", icon: Users },
  { label: "View Messages", href: "/admin/settings", icon: MessageSquare }
]

const chartData = [
  { month: "Jan", visitors: 2400 },
  { month: "Feb", visitors: 1398 },
  { month: "Mar", visitors: 9800 },
  { month: "Apr", visitors: 3908 },
  { month: "May", visitors: 4800 },
  { month: "Jun", visitors: 3800 },
  { month: "Jul", visitors: 4300 }
]

const maxVisitors = Math.max(...chartData.map(d => d.visitors))

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold"
        >
          Dashboard
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground mt-1"
        >
          Welcome back! Here&apos;s what&apos;s happening with your website.
        </motion.p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stat.trend === "up" ? "text-emerald-500" : "text-red-500"
              }`}>
                {stat.trend === "up" ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {stat.change}
              </div>
            </div>
            <h3 className="text-3xl font-bold">{stat.value}</h3>
            <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Analytics Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-card border border-border rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Website Analytics</h3>
              <p className="text-sm text-muted-foreground">Monthly visitors overview</p>
            </div>
            <select className="px-3 py-1.5 bg-background border border-border rounded-lg text-sm">
              <option>Last 7 months</option>
              <option>Last 12 months</option>
              <option>This year</option>
            </select>
          </div>

          {/* Simple Bar Chart */}
          <div className="flex items-end justify-between h-48 gap-2">
            {chartData.map((data, index) => (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.visitors / maxVisitors) * 100}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  className="w-full bg-gradient-to-t from-primary to-secondary rounded-t-lg min-h-[20px]"
                />
                <span className="text-xs text-muted-foreground">{data.month}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-8 mt-6 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Visitors</span>
            </div>
            <div className="text-sm">
              <span className="font-semibold">30.4K</span>
              <span className="text-muted-foreground ml-1">total this period</span>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold mb-6">Quick Actions</h3>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center justify-between p-3 bg-background border border-border rounded-xl hover:border-primary/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <action.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-sm">{action.label}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-card border border-border rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <button className="text-sm text-primary hover:underline">View all</button>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 hover:bg-muted/50 rounded-xl transition-colors"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                activity.type === "project" ? "bg-cyan-500/10 text-cyan-500" :
                activity.type === "blog" ? "bg-purple-500/10 text-purple-500" :
                activity.type === "team" ? "bg-emerald-500/10 text-emerald-500" :
                "bg-amber-500/10 text-amber-500"
              }`}>
                {activity.type === "project" ? <FolderKanban className="w-5 h-5" /> :
                 activity.type === "blog" ? <FileText className="w-5 h-5" /> :
                 activity.type === "team" ? <Users className="w-5 h-5" /> :
                 <MessageSquare className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activity.time}
                </p>
                <p className="text-xs text-muted-foreground">{activity.user}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Upcoming Tasks */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card border border-border rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Upcoming Tasks</h3>
          </div>
          <div className="space-y-3">
            {[
              { task: "Review new project proposals", due: "Today", priority: "high" },
              { task: "Update team profiles", due: "Tomorrow", priority: "medium" },
              { task: "Write monthly blog post", due: "This week", priority: "low" },
              { task: "Review client feedback", due: "Next week", priority: "medium" }
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-background border border-border rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 rounded border-border" />
                  <span className="text-sm">{item.task}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    item.priority === "high" ? "bg-red-500/10 text-red-500" :
                    item.priority === "medium" ? "bg-amber-500/10 text-amber-500" :
                    "bg-emerald-500/10 text-emerald-500"
                  }`}>
                    {item.due}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-card border border-border rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Performance Overview</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: "Page Load Speed", value: 92, color: "from-emerald-500 to-teal-500" },
              { label: "SEO Score", value: 88, color: "from-cyan-500 to-blue-500" },
              { label: "Accessibility", value: 95, color: "from-purple-500 to-pink-500" },
              { label: "Best Practices", value: 90, color: "from-amber-500 to-orange-500" }
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">{item.label}</span>
                  <span className="text-sm font-semibold">{item.value}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
