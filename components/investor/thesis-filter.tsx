"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Filter, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"

const domainOptions = ["Fintech", "AI", "HealthTech", "CleanTech", "EdTech", "SaaS", "Cybersecurity", "Blockchain"]
const stageOptions = ["Idea Phase", "MVP", "Scaling", "Series A"]

export function ThesisFilter() {
  const { investorFilters, setInvestorFilters } = useAppStore()
  const [isOpen, setIsOpen] = useState(false)

  const toggleDomain = (domain: string) => {
    const newDomains = investorFilters.domains.includes(domain)
      ? investorFilters.domains.filter((d) => d !== domain)
      : [...investorFilters.domains, domain]
    setInvestorFilters({ ...investorFilters, domains: newDomains })
  }

  const toggleStage = (stage: string) => {
    const newStages = investorFilters.stage.includes(stage)
      ? investorFilters.stage.filter((s) => s !== stage)
      : [...investorFilters.stage, stage]
    setInvestorFilters({ ...investorFilters, stage: newStages })
  }

  const clearFilters = () => {
    setInvestorFilters({ domains: [], stage: [] })
  }

  const activeFilterCount = investorFilters.domains.length + investorFilters.stage.length

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="border-primary/50 text-primary hover:bg-primary/10"
      >
        <Filter className="h-4 w-4 mr-2" />
        Thesis Filter
        {activeFilterCount > 0 && (
          <Badge className="ml-2 bg-primary text-primary-foreground">{activeFilterCount}</Badge>
        )}
      </Button>

      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 glass border-l border-border p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Investment Thesis</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Domains</h3>
                <div className="flex flex-wrap gap-2">
                  {domainOptions.map((domain) => (
                    <Badge
                      key={domain}
                      variant={investorFilters.domains.includes(domain) ? "default" : "outline"}
                      className={`cursor-pointer transition-colors ${
                        investorFilters.domains.includes(domain)
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      }`}
                      onClick={() => toggleDomain(domain)}
                    >
                      {domain}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Stage</h3>
                <div className="flex flex-wrap gap-2">
                  {stageOptions.map((stage) => (
                    <Badge
                      key={stage}
                      variant={investorFilters.stage.includes(stage) ? "default" : "outline"}
                      className={`cursor-pointer transition-colors ${
                        investorFilters.stage.includes(stage)
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      }`}
                      onClick={() => toggleStage(stage)}
                    >
                      {stage}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={clearFilters}>
                Clear All
              </Button>
              <Button className="flex-1 bg-primary text-primary-foreground" onClick={() => setIsOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </>
  )
}
