"use client"

import { motion } from "framer-motion"
import { MoreVertical, Eye, Heart, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockStartups } from "@/lib/mock-data"

const stageColors = {
  idea: "bg-chart-4/20 text-chart-4 border-chart-4/30",
  mvp: "bg-primary/20 text-primary border-primary/30",
  scaling: "bg-success/20 text-success border-success/30",
}

export function ProjectList() {
  return (
    <Card className="glass border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-foreground">My Projects</CardTitle>
        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
          + New Project
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockStartups.slice(0, 3).map((startup, index) => (
          <motion.div
            key={startup.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            <div
              className="h-12 w-12 rounded-xl bg-cover bg-center"
              style={{ backgroundImage: `url(${startup.image})` }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-foreground truncate">{startup.name}</h3>
                <Badge className={stageColors[startup.stage]} variant="outline">
                  {startup.stage === "idea" ? "Idea" : startup.stage === "mvp" ? "MVP" : "Scaling"}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {startup.stats.views.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {startup.stats.swipeRightRatio}%
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {startup.stats.investorMatches}
                </span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}
