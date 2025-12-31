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

      <div className="flex flex-col md:flex-row h-full">
        {/* Left Column: Image/Media */}
        <div className="relative h-1/2 md:h-full md:w-5/12 bg-muted">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${startup.image})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 md:from-transparent md:bg-gradient-to-r md:to-background/20" />

          <div className="absolute top-4 left-4 z-10">
            {startup.verified && (
              <Badge className="bg-primary/90 text-primary-foreground border-none backdrop-blur-md">
                <BadgeCheck className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4 z-10 md:hidden">
            <h2 className="text-2xl font-bold text-white mb-1 shadow-black/50 drop-shadow-md">{startup.name}</h2>
            <p className="text-white/90 text-sm line-clamp-2 shadow-black/50 drop-shadow-md">{startup.oneLiner}</p>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="flex-1 p-6 md:p-8 flex flex-col h-1/2 md:h-full overflow-y-auto bg-card">
          <div className="hidden md:flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">{startup.name}</h2>
              <p className="text-lg text-muted-foreground">{startup.oneLiner}</p>
            </div>
            <Badge variant="outline" className="px-3 py-1 text-sm">
              {startup.stage === "idea" ? "Idea Phase" : startup.stage === "mvp" ? "MVP" : "Scaling"}
            </Badge>
          </div>

          <div className="space-y-6 flex-1">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">About</h3>
              <p className="text-foreground leading-relaxed">{startup.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {startup.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="px-3 py-1">
                  #{tag}
                </Badge>
              ))}
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Team</h3>
              <div className="flex flex-wrap gap-4">
                {startup.team.map((member) => (
                  <div key={member.name} className="flex items-center gap-3 p-2 rounded-xl bg-secondary/30 border border-border">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      {member.avatar ? <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" /> : <span className="text-xs font-bold">{member.name[0]}</span>}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Role Specific Actions */}
            {role === "investor" && startup.ask && (
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between mt-auto">
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">Investment Ask</p>
                  <p className="text-2xl font-bold text-primary">{startup.ask}</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium">
                  <Lock className="h-4 w-4" />
                  Pitch Deck
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
