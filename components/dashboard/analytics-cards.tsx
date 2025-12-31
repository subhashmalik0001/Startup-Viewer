"use client"

import { motion } from "framer-motion"
import { Eye, ThumbsUp, Briefcase, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    title: "Total Views",
    value: "12,450",
    change: "+12%",
    icon: Eye,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Approval Rate",
    value: "78%",
    change: "+5%",
    icon: ThumbsUp,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Investor Matches",
    value: "24",
    change: "+3",
    icon: Briefcase,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Applications",
    value: "156",
    change: "+18",
    icon: Users,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
]

export function AnalyticsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="glass border-border">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <span className="text-xs font-medium text-success">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
