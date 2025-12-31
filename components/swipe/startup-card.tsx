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

  const [isMuted, setIsMuted] = useState(false)

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

      <div className="relative w-full h-full bg-black overflow-hidden group">
        {startup.pitch_video_url ? (
          <>
            <video
              src={startup.pitch_video_url}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted={isMuted} // Controlled by state
              playsInline
            />
            {/* Volume Toggle Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsMuted(!isMuted)
              }}
              className="absolute bottom-6 right-6 p-3 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors z-[60]"
            >
              {isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
              )}
            </button>
          </>
        ) : (
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${startup.image})` }} />
        )}
      </div>
    </motion.div>
  )
}
