"use client"

import { motion, useMotionValue, useTransform, type PanInfo } from "framer-motion"
import { BadgeCheck, Lock, Briefcase } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Startup } from "@/lib/types"
import { useAppStore } from "@/lib/store"
import { useState } from "react"

interface StartupCardProps {
  startup: Startup
  onSwipeLeft: () => void
  onSwipeRight: () => void
  onSuperLike: () => void
  onViewDetails: () => void
}

export function StartupCard({ startup, onSwipeLeft, onSwipeRight, onSuperLike, onViewDetails }: StartupCardProps) {
  const { role } = useAppStore()
  const [exitX, setExitX] = useState(0)

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-300, 0, 300], [-25, 0, 25])
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0.5, 1, 1, 1, 0.5])

  const greenGlow = useTransform(x, [0, 150], [0, 1])
  const redGlow = useTransform(x, [-150, 0], [1, 0])

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 100
    if (info.offset.x > threshold) {
      setExitX(500)
      onSwipeRight()
    } else if (info.offset.x < -threshold) {
      setExitX(-500)
      onSwipeLeft()
    }
  }

  return (
    <motion.div
      className="absolute w-full h-full max-w-6xl shadow-2xl rounded-3xl cursor-grab active:cursor-grabbing bg-card border border-border overflow-hidden"
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      animate={{ x: exitX }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onClick={onViewDetails}
    >
      {/* Glow effects */}
      <motion.div
        className="absolute inset-0 rounded-3xl glow-green pointer-events-none z-50"
        style={{ opacity: greenGlow }}
      />
      <motion.div className="absolute inset-0 rounded-3xl glow-red pointer-events-none z-50" style={{ opacity: redGlow }} />

      <div className="relative w-full h-full bg-black overflow-hidden">
        {startup.video ? (
          <video
            src={startup.video}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${startup.image})` }} />
        )}

        {/* Minimal gradient for depth if needed, but keeping it clean for 'video only' */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" /> */}

        {/* Optional: Verified Badge - keeping it very subtle or removing if strict "only video". 
            User said "only the video not show other info like startup info and all" 
            I will remove it to be safe and strictly follow "only the video" 
        */}
      </div>
    </motion.div>
  )
}
