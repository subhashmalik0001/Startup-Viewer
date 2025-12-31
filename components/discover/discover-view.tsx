"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { mockStartups } from "@/lib/mock-data"
import { useAppStore } from "@/lib/store"
import { ThesisFilter } from "@/components/investor/thesis-filter"

const categories = ["All", "Fintech", "AI", "HealthTech", "CleanTech", "Cybersecurity"]

export function DiscoverView() {
  const { role } = useAppStore()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredStartups = mockStartups.filter((startup) => {
    const matchesCategory = selectedCategory === "All" || startup.tags.includes(selectedCategory)
    const matchesSearch =
      startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup.oneLiner.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Discover</h1>
        {role === "investor" && <ThesisFilter />}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search startups..."
          className="pl-10 bg-secondary/50 border-border"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={`cursor-pointer whitespace-nowrap transition-colors ${
              selectedCategory === category ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Results grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStartups.map((startup, index) => (
          <motion.div
            key={startup.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass border-border hover:border-primary/50 transition-all cursor-pointer overflow-hidden">
              <div className="h-32 bg-cover bg-center relative" style={{ backgroundImage: `url(${startup.image})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-foreground">{startup.name}</h3>
                  {startup.verified && (
                    <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">Verified</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{startup.oneLiner}</p>
                <div className="flex flex-wrap gap-1">
                  {startup.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
