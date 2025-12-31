"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Upload, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

const steps = ["The Pitch", "The Visuals", "The Ask", "The Team"]

const domains = ["Fintech", "AI", "HealthTech", "CleanTech", "EdTech", "SaaS", "Marketplace", "Gaming"]

export function PostIdeaWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedDomains, setSelectedDomains] = useState<string[]>([])
  const [equity, setEquity] = useState([10])
  const [fundingAmount, setFundingAmount] = useState("")
  const [lookingForTeam, setLookingForTeam] = useState(false)

  const toggleDomain = (domain: string) => {
    setSelectedDomains((prev) => (prev.includes(domain) ? prev.filter((d) => d !== domain) : [...prev, domain]))
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  return (
    <Card className="glass border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Post New Idea</CardTitle>
        <div className="flex items-center gap-2 mt-4">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  index <= currentStep ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 w-8 mx-1 transition-colors ${index < currentStep ? "bg-primary" : "bg-secondary"}`}
                />
              )}
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-2">{steps[currentStep]}</p>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {currentStep === 0 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Startup Name</Label>
                  <Input id="name" placeholder="e.g., NeuroPay" className="bg-secondary/50 border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pitch">One-liner Pitch (60 words max)</Label>
                  <Textarea
                    id="pitch"
                    placeholder="Describe your startup in one compelling sentence..."
                    className="bg-secondary/50 border-border resize-none"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Domain Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {domains.map((domain) => (
                      <Badge
                        key={domain}
                        variant={selectedDomains.includes(domain) ? "default" : "outline"}
                        className={`cursor-pointer transition-colors ${
                          selectedDomains.includes(domain) ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                        }`}
                        onClick={() => toggleDomain(domain)}
                      >
                        #{domain}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}

            {currentStep === 1 && (
              <>
                <div className="space-y-2">
                  <Label>Cover Image/Video</Label>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Drag & drop or click to upload</p>
                    <p className="text-sm text-muted-foreground mt-1">PNG, JPG, MP4 up to 50MB</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Demo Video (Optional)</Label>
                  <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <p className="text-muted-foreground">Add a 2-minute demo video</p>
                  </div>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="space-y-4">
                  <Label>Equity Offering: {equity[0]}%</Label>
                  <Slider value={equity} onValueChange={setEquity} max={50} min={1} step={1} className="py-4" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="funding">Funding Amount</Label>
                  <Input
                    id="funding"
                    placeholder="e.g., $500,000"
                    value={fundingAmount}
                    onChange={(e) => setFundingAmount(e.target.value)}
                    className="bg-secondary/50 border-border"
                  />
                </div>
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Your Ask:</span> {fundingAmount || "$XXX"} for {equity[0]}% equity
                  </p>
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Looking for Team Members?</p>
                      <p className="text-sm text-muted-foreground">Enable to show hiring badges</p>
                    </div>
                  </div>
                  <Switch checked={lookingForTeam} onCheckedChange={setLookingForTeam} />
                </div>

                {lookingForTeam && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-2"
                  >
                    <Label htmlFor="roles">Open Positions (comma-separated)</Label>
                    <Input
                      id="roles"
                      placeholder="e.g., CTO, UX Designer, ML Engineer"
                      className="bg-secondary/50 border-border"
                    />
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="border-border bg-transparent"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          {currentStep === steps.length - 1 ? (
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Publish Idea</Button>
          ) : (
            <Button onClick={nextStep} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
