"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Play, BadgeCheck, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Startup } from "@/lib/types"

interface StartupDetailsModalProps {
  startup: Startup | null
  isOpen: boolean
  onClose: () => void
}

export function StartupDetailsModal({ startup, isOpen, onClose }: StartupDetailsModalProps) {
  if (!startup) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[85vh] z-50 rounded-2xl glass border border-border overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-50"
                style={{ backgroundImage: `url(${startup.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />

              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 rounded-full glass"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>

              {/* Demo video button */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-foreground">{startup.name}</h2>
                  {startup.verified && <BadgeCheck className="h-6 w-6 text-primary" />}
                </div>
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Play className="h-4 w-4 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">About</h3>
                <p className="text-foreground leading-relaxed">{startup.description}</p>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Industry</h3>
                <div className="flex flex-wrap gap-2">
                  {startup.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Team */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Team</h3>
                <div className="grid grid-cols-2 gap-4">
                  {startup.team.map((member) => (
                    <div key={member.name} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                      <Avatar>
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Investment Details */}
              {startup.ask && (
                <div className="p-4 rounded-xl glass border border-primary/30">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    Investment Opportunity
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Asking</p>
                      <p className="text-xl font-bold text-primary">{startup.ask}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Stage</p>
                      <p className="text-xl font-bold text-foreground capitalize">{startup.stage}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border flex gap-3">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
                Close
              </Button>
              <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Website
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
