"use client"

import { motion } from "framer-motion"
import { X, Heart, Star, Undo2, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SwipeActionsProps {
  onSwipeLeft: () => void
  onSwipeRight: () => void
  onSuperLike: () => void
  onUndo: () => void
  onBookmark: () => void
  canUndo: boolean
}

export function SwipeActions({ onSwipeLeft, onSwipeRight, onSuperLike, onUndo, onBookmark, canUndo }: SwipeActionsProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          size="lg"
          variant="outline"
          className="h-14 w-14 rounded-full border-destructive/50 text-destructive hover:bg-destructive/20 hover:text-destructive bg-transparent"
          onClick={onSwipeLeft}
        >
          <X className="h-6 w-6" />
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          size="lg"
          variant="outline"
          className="h-12 w-12 rounded-full border-amber-500/50 text-amber-500 hover:bg-amber-500/20 bg-transparent"
          onClick={onUndo}
          disabled={!canUndo}
        >
          <Undo2 className="h-5 w-5" />
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          size="lg"
          variant="outline"
          className="h-12 w-12 rounded-full border-blue-500/50 text-blue-500 hover:bg-blue-500/20 bg-transparent"
          onClick={onBookmark}
        >
          <Bookmark className="h-5 w-5" />
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          size="lg"
          variant="outline"
          className="h-14 w-14 rounded-full border-primary/50 text-primary hover:bg-primary/20 bg-transparent"
          onClick={onSuperLike}
        >
          <Star className="h-6 w-6" />
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          size="lg"
          variant="outline"
          className="h-14 w-14 rounded-full border-success/50 text-success hover:bg-success/20 hover:text-success bg-transparent"
          onClick={onSwipeRight}
        >
          <Heart className="h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  )
}
