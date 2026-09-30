"use client"

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const animId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(animId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Automatically reset scroll to top on every route transition
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    }
  }, [pathname])

  return <>{children}</>
}
