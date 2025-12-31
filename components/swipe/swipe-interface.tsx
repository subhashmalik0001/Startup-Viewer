"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { StartupCard } from "./startup-card"
import { SwipeActions } from "./swipe-actions"
import { StartupDetailsModal } from "./startup-details-modal"
import { useAppStore } from "@/lib/store"
import type { Startup } from "@/lib/types"

export function SwipeInterface() {
  const { startups, currentStartupIndex, swipeLeft, swipeRight, superLike, undo, bookmark, swipeHistory } = useAppStore()
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const currentStartup = startups[currentStartupIndex]
  const isComplete = currentStartupIndex >= startups.length

  const handleViewDetails = () => {
    if (currentStartup) {
      setSelectedStartup(currentStartup)
      setIsModalOpen(true)
    }
  }

  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-6">
        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-6">
          <span className="text-4xl">🎉</span>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{"You've seen all startups!"}</h2>
        <p className="text-muted-foreground mb-6">Check back later for new opportunities.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-8">
      {/* Cards stack */}
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence>
          {startups
            .slice(currentStartupIndex, currentStartupIndex + 2)
            .reverse()
            .map((startup, index) => (
              <StartupCard
                key={startup.id}
                startup={startup}
                onSwipeLeft={swipeLeft}
                onSwipeRight={swipeRight}
                onSuperLike={superLike}
                onViewDetails={handleViewDetails}
              />
            ))}
        </AnimatePresence>
      </div>

      {/* Actions */}
      <SwipeActions
        onSwipeLeft={swipeLeft}
        onSwipeRight={swipeRight}
        onSuperLike={superLike}
        onUndo={undo}
        onBookmark={bookmark}
        canUndo={swipeHistory.length > 0}
      />

      {/* Details Modal */}
      <StartupDetailsModal startup={selectedStartup} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
