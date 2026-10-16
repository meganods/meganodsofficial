"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ShootingStar {
  id: number
  x: number
  y: number
  angle: number
  scale: number
  speed: number
  delay: number
}

export function ShootingStars() {
  const [stars, setStars] = useState<ShootingStar[]>([])

  useEffect(() => {
    const createStar = (): ShootingStar => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 50,
      angle: 45 + Math.random() * 20,
      scale: 0.5 + Math.random() * 0.5,
      speed: 1 + Math.random() * 2,
      delay: Math.random() * 2
    })

    // Initial stars
    setStars(Array.from({ length: 3 }, createStar))

    const interval = setInterval(() => {
      setStars(prev => {
        const newStars = prev.filter(() => Math.random() > 0.3)
        if (newStars.length < 5) {
          newStars.push(createStar())
        }
        return newStars
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Static stars background */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`static-${i}`}
            className="absolute w-0.5 h-0.5 bg-indigo-500/20 dark:bg-white/20 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Shooting stars */}
      <AnimatePresence>
        {stars.map(star => (
          <motion.div
            key={star.id}
            initial={{ 
              x: `${star.x}vw`, 
              y: `${star.y}vh`, 
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              x: `${star.x + 30}vw`, 
              y: `${star.y + 30}vh`, 
              opacity: [0, 1, 1, 0],
              scale: star.scale
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: star.speed,
              delay: star.delay,
              ease: "linear"
            }}
            className="absolute"
            style={{
              transform: `rotate(${star.angle}deg)`
            }}
          >
            <div className="relative">
              {/* Star head */}
              <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_6px_2px_rgba(255,255,255,0.6)]" />
              {/* Star tail */}
              <div 
                className="absolute top-0 right-full w-20 h-px"
                style={{
                  background: "linear-gradient(to left, rgba(255,255,255,0.8), rgba(0,255,255,0.4), transparent)"
                }}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Ambient glow spots */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
    </div>
  )
}

export function StarField() {
  const [mounted, setMounted] = useState(false)
  const [stars, setStars] = useState<any[]>([])

  useEffect(() => {
    setMounted(true)
    const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 25 : 50
    const newStars = Array.from({ length: count }).map(() => ({
      size: Math.random() * 2 + 0.5,
      duration: 3 + Math.random() * 4,
      left: Math.random() * 100,
      top: Math.random() * 100,
      color: Math.random() > 0.5 ? "0, 255, 255" : "168, 85, 247",
      opacity: 0.1 + Math.random() * 0.3,
      delay: Math.random() * 3
    }))
    setStars(newStars)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Particle field - GPU composited CSS */}
      <div className="absolute inset-0">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: star.size,
              height: star.size,
              left: `${star.left}%`,
              top: `${star.top}%`,
              background: `rgba(${star.color}, ${star.opacity})`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Moving shooting stars */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute"
          style={{
            left: `${-10 + Math.random() * 50}%`,
            top: `${Math.random() * 40}%`
          }}
          animate={{
            x: ["0vw", "120vw"],
            y: ["0vh", "60vh"],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            repeatDelay: 5 + Math.random() * 10,
            delay: i * 3,
            ease: "linear"
          }}
        >
          <div className="relative rotate-45">
            <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_3px_rgba(0,255,255,0.8)]" />
            <div 
              className="absolute top-1/2 right-full -translate-y-1/2 w-32 h-0.5"
              style={{
                background: "linear-gradient(to left, rgba(255,255,255,1), rgba(0,255,255,0.6), transparent)"
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
