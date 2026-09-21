'use client'

import React, { useEffect, useRef } from 'react'

export function TechAmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth)
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight)

    const points: { x: number; y: number; originX: number; originY: number; vx: number; vy: number; radius: number }[] = []
    const spacing = 55
    const rows = Math.ceil(height / spacing) + 2
    const cols = Math.ceil(width / spacing) + 2

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * spacing + (r % 2 === 0 ? spacing / 2 : 0)
        const y = r * spacing
        points.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.5 + 1,
        })
      }
    }

    const mouse = { x: -1000, y: -1000, radius: 180 }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      width = canvas.width = canvas.parentElement.clientWidth
      height = canvas.height = canvas.parentElement.clientHeight
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    let t = 0
    const render = () => {
      t += 0.015
      ctx.clearRect(0, 0, width, height)

      // Connect neighbor dots
      ctx.lineWidth = 0.5
      for (let i = 0; i < points.length; i++) {
        const p = points[i]

        // Smooth wave floating
        const wave = Math.sin(t + p.originX * 0.005 + p.originY * 0.005) * 6
        p.x = p.originX + Math.cos(t * 0.8 + p.originY * 0.01) * 4
        p.y = p.originY + wave

        // Mouse repelling
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius
          p.x -= (dx / dist) * force * 20
          p.y -= (dy / dist) * force * 20
        }

        // Draw Dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = dist < mouse.radius ? 'rgba(79, 70, 229, 0.45)' : 'rgba(99, 102, 241, 0.18)'
        ctx.fill()

        // Draw connections for nearby points
        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j]
          const pdist = Math.hypot(p.x - p2.x, p.y - p2.y)
          if (pdist < spacing * 1.3) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - pdist / (spacing * 1.3)) * 0.12})`
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* Soft Light Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-indigo-200/40 via-cyan-100/40 to-purple-200/30 rounded-full blur-[120px]" />
    </div>
  )
}
