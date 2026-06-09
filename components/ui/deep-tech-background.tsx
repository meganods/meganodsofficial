"use client"

import { motion } from 'framer-motion'

export function DeepTechBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none opacity-80" style={{ zIndex: 0 }}>
      {/* 1. Underlying Base Grid (Blueprint) */}
      <div className="absolute inset-0 opacity-[0.22]" style={{
        backgroundImage: `
          linear-gradient(rgba(129,140,248,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(129,140,248,0.5) 1px, transparent 1px)
        `,
        backgroundSize: '52px 52px',
      }} />

      {/* 2. Vibrant Color Blurs (User Core Design) */}
      <div className="absolute inset-0 mix-blend-multiply dark:mix-blend-screen opacity-[0.25] dark:opacity-90">
         {/* Top Left: Lime/Emerald Glow */}
         <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-[rgba(27,245,172,0.4)] dark:bg-[rgba(27,245,172,0.6)] rounded-full blur-[140px]" />
         
         {/* Bottom Right: Cyan/Blue Glow */}
         <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-[rgba(18,188,218,0.4)] dark:bg-[rgba(18,188,218,0.6)] rounded-full blur-[140px]" />

         {/* Center Bottom: Indigo/Violet Core */}
         <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-[rgba(78,70,229,0.3)] dark:bg-[rgba(78,70,229,0.5)] rounded-full blur-[160px]" />
      </div>

      {/* 3. Subtle Detail Layer (Plus Markers) */}
      <div className="absolute inset-0 opacity-[0.15]" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(129,140,248,0.4) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(129,140,248,0.4) 1px, transparent 1px)
        `,
        backgroundSize: '208px 208px',
        backgroundPosition: '104px 104px',
      }} />

      {/* 4. Depth Mask */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(255,255,255,0.05) 70%, var(--background) 95%)',
      }} />
    </div>
  )
}
