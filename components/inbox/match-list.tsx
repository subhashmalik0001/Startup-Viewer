"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils"

export function MatchList() {
  const { matches, selectedMatch, setSelectedMatch } = useAppStore()

  return (
    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
      {matches.map((match, index) => (
        <motion.button
          key={match.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => setSelectedMatch(match)}
          className={cn(
            "relative flex-shrink-0 transition-transform hover:scale-105",
            selectedMatch?.id === match.id && "scale-105",
          )}
        >
          <Avatar
            className={cn(
              "h-16 w-16 ring-2 ring-offset-2 ring-offset-background",
              match.type === "investor" ? "ring-amber-500" : "ring-primary",
            )}
          >
            <AvatarImage src={match.avatar || "/placeholder.svg"} alt={match.name} />
            <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
          </Avatar>
          {match.unread && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-destructive border-2 border-background" />
          )}
          <p className="text-xs text-muted-foreground mt-1 text-center truncate w-16">{match.name.split(" ")[0]}</p>
        </motion.button>
      ))}
    </div>
  )
}
