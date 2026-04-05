"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AdminSidebar } from "@/components/admin/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  
  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem("adminAuth")
    
    if (pathname !== "/admin/login") {
      if (authStatus !== "true") {
        router.push("/admin/login")
        setIsAuthorized(false)
      } else {
        setIsAuthorized(true)
      }
    } else {
      setIsAuthorized(true)
    }
  }, [pathname, router])

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  // Prevent flash of protected content
  if (isAuthorized === false && pathname !== "/admin/login") {
    return null
  }

  return <AdminSidebar>{children}</AdminSidebar>
}
