'use client'

import React, { useEffect, useRef } from 'react'

interface Point {
  x: number
  y: number
  age: number
}

export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mousePos = useRef({ x: -100, y: -100 })
  const trailPoints = useRef<Point[]>([])
  const isHoveringRef = useRef(false)
  const isClickingRef = useRef(false)
  const isVisibleRef = useRef(false)
  const isTextRef = useRef(false)
  const isRunningRef = useRef(false)

  useEffect(() => {
    // Only enable on desktop fine pointer devices
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })

    const startLoop = () => {
      if (!isRunningRef.current) {
        isRunningRef.current = true
        animationFrameId = requestAnimationFrame(render)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY
      isVisibleRef.current = true

      // Add trail point
      trailPoints.current.unshift({
        x: e.clientX,
        y: e.clientY,
        age: 0,
      })

      if (trailPoints.current.length > 18) {
        trailPoints.current.pop()
      }

      startLoop()
    }

    const handleMouseDown = () => {
      isClickingRef.current = true
      startLoop()
    }

    const handleMouseUp = () => {
      isClickingRef.current = false
      startLoop()
    }

    const handleMouseLeave = () => {
      isVisibleRef.current = false
      startLoop()
    }

    const handleMouseEnter = () => {
      isVisibleRef.current = true
      startLoop()
    }

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const isText =
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('[contenteditable="true"]')

      const isInteractive =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer')

      isTextRef.current = !!isText
      isHoveringRef.current = !!isInteractive
      startLoop()
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown, { passive: true })
    window.addEventListener('mouseup', handleMouseUp, { passive: true })
    document.body.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    document.body.addEventListener('mouseenter', handleMouseEnter, { passive: true })
    window.addEventListener('mouseover', handleOver, { passive: true })

    // Render loop - stays visible while mouse is inside viewport
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mx = mousePos.current.x
      const my = mousePos.current.y
      const points = trailPoints.current
      const isHovering = isHoveringRef.current
      const isClicking = isClickingRef.current
      const isVisible = isVisibleRef.current
      const isText = isTextRef.current

      // Age trail points
      for (let i = points.length - 1; i >= 0; i--) {
        points[i].age += 1
        if (points[i].age > 18) {
          points.splice(i, 1)
        }
      }

      // Draw trailing tail (only if not over text input)
      if (!isText && points.length > 1) {
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i]
          const p2 = points[i + 1]
          const progress = 1 - p1.age / 18
          const width = progress * (isHovering ? 8 : 5)

          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.strokeStyle = `rgba(79, 70, 229, ${progress * 0.45})`
          ctx.lineWidth = width
          ctx.lineCap = 'round'
          ctx.stroke()
        }

        // Particle sparks
        for (let i = 0; i < points.length; i += 2) {
          const p = points[i]
          const progress = 1 - p.age / 18
          ctx.beginPath()
          ctx.arc(p.x, p.y, progress * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(99, 102, 241, ${progress * 0.6})`
          ctx.fill()
        }
      }

      // Draw Cursor Reticle (only when visible and not over text input)
      if (isVisible && !isText && mx > 0 && my > 0) {
        const radius = isClicking ? 7 : isHovering ? 15 : 10
        const tickLength = isHovering ? 6 : 4
        const gap = radius + 2

        // Outer Ring
        ctx.beginPath()
        ctx.arc(mx, my, radius, 0, Math.PI * 2)
        ctx.strokeStyle = isHovering ? 'rgba(79, 70, 229, 0.95)' : 'rgba(99, 102, 241, 0.75)'
        ctx.lineWidth = isHovering ? 2 : 1.5
        ctx.stroke()

        // Subtle Inner Fill on Hover
        if (isHovering) {
          ctx.beginPath()
          ctx.arc(mx, my, radius, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(79, 70, 229, 0.12)'
          ctx.fill()
        }

        // Precision 4-Axis Cardinal Ticks (Top, Bottom, Left, Right)
        ctx.strokeStyle = isHovering ? '#4338ca' : '#6366f1'
        ctx.lineWidth = 1.5

        // Top Tick
        ctx.beginPath()
        ctx.moveTo(mx, my - gap)
        ctx.lineTo(mx, my - gap - tickLength)
        ctx.stroke()

        // Bottom Tick
        ctx.beginPath()
        ctx.moveTo(mx, my + gap)
        ctx.lineTo(mx, my + gap + tickLength)
        ctx.stroke()

        // Left Tick
        ctx.beginPath()
        ctx.moveTo(mx - gap, my)
        ctx.lineTo(mx - gap - tickLength, my)
        ctx.stroke()

        // Right Tick
        ctx.beginPath()
        ctx.moveTo(mx + gap, my)
        ctx.lineTo(mx + gap + tickLength, my)
        ctx.stroke()

        // Center Core Dot - High contrast on both light and dark themes
        const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
        ctx.beginPath()
        ctx.arc(mx, my, isClicking ? 3.5 : isHovering ? 3 : 2.5, 0, Math.PI * 2)
        ctx.fillStyle = isDark ? '#ffffff' : '#1e1b4b'
        ctx.shadowColor = '#6366f1'
        ctx.shadowBlur = 4
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // Loop continues while cursor is inside window so reticle never vanishes when stationary
      if (isVisible) {
        animationFrameId = requestAnimationFrame(render)
      } else {
        isRunningRef.current = false
      }
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseover', handleOver)
      cancelAnimationFrame(animationFrameId)
      isRunningRef.current = false
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[99999] h-full w-full"
    />
  )
}
