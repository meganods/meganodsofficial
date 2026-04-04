"use client"

import { usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  return <AdminSidebar>{children}</AdminSidebar>
}
