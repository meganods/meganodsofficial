"use client"

import { motion } from "framer-motion"

interface AnimatedIconProps {
  className?: string
}

export function BrainIcon({ className = "w-8 h-8" }: AnimatedIconProps) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      whileHover={{ scale: 1.1 }}
    >
      <motion.path
        d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M16 8V5c0-1.1.9-2 2-2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.path
        d="M12 13h4"
        animate={{ x: [0, 2, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.path
        d="M12 18h6a2 2 0 0 1 2 2v1"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
      <motion.path
        d="M12 8h8"
        animate={{ x: [0, 3, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.path
        d="M20.5 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <motion.path
        d="M16.5 13a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
      />
      <motion.path
        d="M20.5 21a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
      />
      <motion.path
        d="M18.5 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.9 }}
      />
    </motion.svg>
  )
}

export function CloudIcon({ className = "w-8 h-8" }: AnimatedIconProps) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      whileHover={{ scale: 1.1 }}
    >
      <motion.path
        d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M22 10a3 3 0 0 0-3-3h-2.207a5.502 5.502 0 0 0-10.702.5"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.svg>
  )
}

export function ShieldIcon({ className = "w-8 h-8" }: AnimatedIconProps) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      whileHover={{ scale: 1.1 }}
    >
      <motion.path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"
        animate={{ 
          filter: ["drop-shadow(0 0 0px currentColor)", "drop-shadow(0 0 8px currentColor)", "drop-shadow(0 0 0px currentColor)"]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.path
        d="m9 12 2 2 4-4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
      />
    </motion.svg>
  )
}

export function ChartIcon({ className = "w-8 h-8" }: AnimatedIconProps) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      whileHover={{ scale: 1.1 }}
    >
      <motion.path
        d="M3 3v18h18"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.path
        d="m19 9-5 5-4-4-3 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatDelay: 2 }}
      />
    </motion.svg>
  )
}

export function CodeIcon({ className = "w-8 h-8" }: AnimatedIconProps) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      whileHover={{ scale: 1.1 }}
    >
      <motion.polyline
        points="16 18 22 12 16 6"
        animate={{ x: [0, 2, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.polyline
        points="8 6 2 12 8 18"
        animate={{ x: [0, -2, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.line
        x1="12"
        y1="2"
        x2="12"
        y2="22"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </motion.svg>
  )
}

export function MobileIcon({ className = "w-8 h-8" }: AnimatedIconProps) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      whileHover={{ scale: 1.1 }}
    >
      <motion.rect
        width="14"
        height="20"
        x="5"
        y="2"
        rx="2"
        ry="2"
        animate={{ 
          boxShadow: ["0 0 0 rgba(0,255,255,0)", "0 0 10px rgba(0,255,255,0.5)", "0 0 0 rgba(0,255,255,0)"]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.path
        d="M12 18h.01"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </motion.svg>
  )
}

export function NetworkIcon({ className = "w-8 h-8" }: AnimatedIconProps) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      whileHover={{ scale: 1.1 }}
    >
      <motion.circle
        cx="12"
        cy="12"
        r="2"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.path
        d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.svg>
  )
}

export function GearIcon({ className = "w-8 h-8" }: AnimatedIconProps) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      whileHover={{ scale: 1.1 }}
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </motion.svg>
  )
}

export function DatabaseIcon({ className = "w-8 h-8" }: AnimatedIconProps) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      whileHover={{ scale: 1.1 }}
    >
      <motion.ellipse
        cx="12"
        cy="5"
        rx="9"
        ry="3"
        animate={{ scaleX: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.path
        d="M3 5V19A9 3 0 0 0 21 19V5"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.path
        d="M3 12A9 3 0 0 0 21 12"
        animate={{ y: [0, -1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.svg>
  )
}

export function RocketIcon({ className = "w-8 h-8" }: AnimatedIconProps) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      whileHover={{ scale: 1.1 }}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </motion.svg>
  )
}

export function LightbulbIcon({ className = "w-8 h-8" }: AnimatedIconProps) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      whileHover={{ scale: 1.1 }}
    >
      <motion.path
        d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
        animate={{ 
          filter: ["drop-shadow(0 0 0px #00FFFF)", "drop-shadow(0 0 6px #00FFFF)", "drop-shadow(0 0 0px #00FFFF)"]
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </motion.svg>
  )
}

export function CpuIcon({ className = "w-8 h-8" }: AnimatedIconProps) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      whileHover={{ scale: 1.1 }}
    >
      <motion.rect
        width="16"
        height="16"
        x="4"
        y="4"
        rx="2"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.rect
        width="6"
        height="6"
        x="9"
        y="9"
        rx="1"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.path
        d="M15 2v2"
        animate={{ scaleY: [1, 1.3, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
      />
      <motion.path
        d="M15 20v2"
        animate={{ scaleY: [1, 1.3, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1, delay: 0.1 }}
      />
      <motion.path
        d="M9 2v2"
        animate={{ scaleY: [1, 1.3, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1, delay: 0.2 }}
      />
      <motion.path
        d="M9 20v2"
        animate={{ scaleY: [1, 1.3, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1, delay: 0.3 }}
      />
      <path d="M20 9h2" />
      <path d="M20 14h2" />
      <path d="M2 9h2" />
      <path d="M2 14h2" />
    </motion.svg>
  )
}
