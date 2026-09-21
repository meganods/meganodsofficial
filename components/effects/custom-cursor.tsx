'use client'

import React, { useEffect, useRef, useState } from 'react'

interface Point {
  x: number
  y: number
  age: number
}

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mousePos = useRef({ x: -100, y: -100 })
  const trailPoints = useRef<Point[]>([])

  useEffect(() => {
    // Only enable on desktop fine pointers
    if (window.matchMedia('(pointer: coarse)').matches) return

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
    window.addEventListener('resize', handleResize)

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY
      if (!isVisible) setIsVisible(true)

      // Add trail point
      trailPoints.current.unshift({
        x: e.clientX,
        y: e.clientY,
        age: 0,
      })

      if (trailPoints.current.length > 20) {
        trailPoints.current.pop()
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Detect clickable element hovers
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const isInteractive =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer')

      setIsHovering(!!isInteractive)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.body.addEventListener('mouseleave', handleMouseLeave)
    document.body.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseover', handleOver)

    // Render loop for the trailing tail effect & custom cursor
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mx = mousePos.current.x
      const my = mousePos.current.y

      // Update and draw trailing comet tail
      const points = trailPoints.current
      for (let i = points.length - 1; i >= 0; i--) {
        points[i].age += 1
        if (points[i].age > 20) {
          points.splice(i, 1)
          continue
        }
      }

      if (points.length > 1) {
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i]
          const p2 = points[i + 1]
          const progress = 1 - p1.age / 20
          const width = progress * (isHovering ? 9 : 6)

          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.strokeStyle = `rgba(79, 70, 229, ${progress * 0.45})`
          ctx.lineWidth = width
          ctx.lineCap = 'round'
          ctx.stroke()
        }

        // Draw trail particle sparks
        for (let i = 0; i < points.length; i += 2) {
          const p = points[i]
          const progress = 1 - p.age / 20
          ctx.beginPath()
          ctx.arc(p.x, p.y, progress * 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(99, 102, 241, ${progress * 0.6})`
          ctx.fill()
        }
      }

      // Draw Custom Futuristic Cursor (Tech Precision HUD Reticle & Core)
      if (mx > 0 && my > 0) {
        const radius = isClicking ? 6 : isHovering ? 15 : 10
        const tickLength = isHovering ? 6 : 4
        const gap = radius + 2

        // Outer Glow Aura
        ctx.beginPath()
        ctx.arc(mx, my, radius, 0, Math.PI * 2)
        ctx.strokeStyle = isHovering ? 'rgba(99, 102, 241, 0.9)' : 'rgba(99, 102, 241, 0.45)'
        ctx.lineWidth = isHovering ? 2 : 1.5
        ctx.shadowColor = 'rgba(79, 70, 229, 0.7)'
        ctx.shadowBlur = isHovering ? 12 : 6
        ctx.stroke()
        ctx.shadowBlur = 0

        // Subtle Inner Fill when hovering
        if (isHovering) {
          ctx.beginPath()
          ctx.arc(mx, my, radius, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(79, 70, 229, 0.12)'
          ctx.fill()
        }

        // Precision 4-Axis Cardinal Ticks (Top, Bottom, Left, Right)
        ctx.strokeStyle = isHovering ? '#4f46e5' : '#6366f1'
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

        // Center High-Glow Core Dot
        ctx.beginPath()
        ctx.arc(mx, my, isClicking ? 3.5 : isHovering ? 3 : 2.5, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.shadowColor = '#6366f1'
        ctx.shadowBlur = 6
        ctx.fill()
        ctx.shadowBlur = 0
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseover', handleOver)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isVisible, isHovering, isClicking])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[99999] h-full w-full"
    />
  )
}
