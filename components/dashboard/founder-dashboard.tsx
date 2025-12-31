"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, X, Upload, DollarSign, Users, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useAppStore } from "@/lib/store"
import type { Startup } from "@/lib/types"

export function FounderDashboard() {
  const { addStartup, setCurrentView } = useAppStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    oneLiner: "",
    description: "",
    image: "", // We can keep this for fallback or remove
    askAmount: "",
    equity: "",
    stage: "idea" as "idea" | "mvp" | "scaling",
  })
  const [videoFile, setVideoFile] = useState<File | null>(null) // New state for video file

  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [hiring, setHiring] = useState<string[]>([])
  const [currentRole, setCurrentRole] = useState("")
  const [registrationType, setRegistrationType] = useState("msme")
  const [registrationNumber, setRegistrationNumber] = useState("")

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault()
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()])
      }
      setCurrentTag("")
    }
  }

  const handleAddRole = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentRole.trim()) {
      e.preventDefault()
      if (!hiring.includes(currentRole.trim())) {
        setHiring([...hiring, currentRole.trim()])
      }
      setCurrentRole("")
    }
  }

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag))
  const removeRole = (role: string) => setHiring(hiring.filter((r) => r !== role))

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.stage === "scaling" && !registrationNumber) {
      alert("Please provide your business registration number to verify your Scaling startup.")
      return
    }

    setIsSubmitting(true)

    // Use FormData for file upload
    const data = new FormData()
    data.append("name", formData.name)
    data.append("oneLiner", formData.oneLiner)
    data.append("description", formData.description)
    // Add default image if no video or as persistent fallback
    data.append("image", "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=2070")
    data.append("stage", formData.stage)
    data.append("equity", formData.equity)
    data.append("fundingAmount", formData.askAmount?.replace(/[^0-9]/g, "") || "0")
    if (formData.askAmount) {
      data.append("ask", `${formData.askAmount} for ${formData.equity}%`)
    }

    data.append("tags", JSON.stringify(tags))
    data.append("hiring", JSON.stringify(hiring))
    data.append("team", JSON.stringify([{ name: "You (Founder)", role: "CEO", avatar: "/placeholder.svg" }]))
    data.append("verified", "false")
    data.append("isUserCreated", "true")

    if (videoFile) {
      data.append("video", videoFile)
    }

    try {
      // Note: Do NOT set Content-Type header when using FormData; browser sets it with boundary
      const response = await fetch("http://localhost:4000/startups", {
        method: "POST",
        body: data,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create startup")
      }

      const createdStartup = await response.json()
      addStartup(createdStartup)

      alert("Startup Published Successfully! Switching to Swipe View.")
      setCurrentView("swipe")

    } catch (error) {
      console.error(error)
      alert("Failed to publish startup. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Founder Dashboard</h1>
          <p className="text-muted-foreground mt-1">Pitch your startup to thousands of investors and talent.</p>
        </div>
        <Button onClick={() => setCurrentView("swipe")} variant="outline">
          View Live Deck
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass border-border">
            <CardHeader>
              <CardTitle>Startup Details</CardTitle>
              <CardDescription>Public information visible on your card.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Startup Name</Label>
                  <Input
                    placeholder="e.g. Acme AI"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>One-Liner Hook</Label>
                  <Input
                    placeholder="The Uber for... (Max 100 chars)"
                    maxLength={100}
                    value={formData.oneLiner}
                    onChange={e => setFormData({ ...formData, oneLiner: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Pitch / Description</Label>
                  <Textarea
                    placeholder="Tell your story..."
                    className="min-h-[120px]"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Stage</Label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.stage}
                      onChange={e => setFormData({ ...formData, stage: e.target.value as any })}
                    >
                      <option value="idea">Idea Phase</option>
                      <option value="mvp">MVP</option>
                      <option value="scaling">Scaling</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Pitch Video</Label>
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground">Upload a short pitch video (MP4, max 50MB)</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Industry Tags (Press Enter)</Label>
                  <div className="flex bg-background border border-input rounded-md px-3 py-2 flex-wrap gap-2 focus-within:ring-2 ring-primary/20">
                    {tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        {tag}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                      </Badge>
                    ))}
                    <input
                      className="bg-transparent outline-none flex-1 min-w-[80px] text-sm"
                      placeholder="Add tag..."
                      value={currentTag}
                      onChange={e => setCurrentTag(e.target.value)}
                      onKeyDown={handleAddTag}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-secondary/30 space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <DollarSign className="h-4 w-4" /> Fundraising (Optional)
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Ask Amount ($)</Label>
                      <Input
                        placeholder="e.g. 1,000,000"
                        value={formData.askAmount}
                        onChange={e => setFormData({ ...formData, askAmount: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Equity Offered (%)</Label>
                      <Input
                        type="number"
                        placeholder="e.g. 10"
                        value={formData.equity}
                        onChange={e => setFormData({ ...formData, equity: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-secondary/30 space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Users className="h-4 w-4" /> Hiring Needs (Optional)
                  </h3>
                  <div className="space-y-2">
                    <Label>Roles (Press Enter)</Label>
                    <div className="flex bg-background border border-input rounded-md px-3 py-2 flex-wrap gap-2 focus-within:ring-2 ring-primary/20">
                      {hiring.map(role => (
                        <Badge key={role} className="gap-1 bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20">
                          {role}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeRole(role)} />
                        </Badge>
                      ))}
                      <input
                        className="bg-transparent outline-none flex-1 min-w-[80px] text-sm"
                        placeholder="Add role..."
                        value={currentRole}
                        onChange={e => setCurrentRole(e.target.value)}
                        onKeyDown={handleAddRole}
                      />
                    </div>

                    {formData.stage === "scaling" && (
                      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-4 animate-in fade-in slide-in-from-top-4">
                        <h3 className="font-semibold flex items-center gap-2 text-amber-600 dark:text-amber-500">
                          <Target className="h-4 w-4" /> Business Registration (Required)
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Since you are scaling, we need to verify your business entity.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Registration Type</Label>
                            <select
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              value={registrationType}
                              onChange={(e) => setRegistrationType(e.target.value)}
                            >
                              <option value="msme">MSME / Udyam</option>
                              <option value="gst">GST Certificate</option>
                              <option value="llp">LLP Incorporation</option>
                              <option value="pvtltd">Private Limited (CIN)</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label>Registration Number</Label>
                            <Input
                              placeholder="e.g. UDYAM-XX-00-0000000"
                              value={registrationNumber}
                              onChange={(e) => setRegistrationNumber(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Uploading Video & Publishing..." : "Publish Startup"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Stats / Preview Side */}
        <div className="space-y-6">
          <Card className="glass border-border">
            <CardHeader>
              <CardTitle className="text-lg">Your Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
                <span className="text-muted-foreground text-sm">Total Views</span>
                <span className="font-mono font-bold">0</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
                <span className="text-muted-foreground text-sm">Matches</span>
                <span className="font-mono font-bold">0</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
                <span className="text-muted-foreground text-sm">Ranking</span>
                <span className="font-mono font-bold">-</span>
              </div>
              <Button variant="ghost" className="w-full text-xs text-muted-foreground" onClick={() => setCurrentView("profile")}>
                View Analytics Report
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <Target className="h-5 w-5 text-primary" />
                <h4 className="font-semibold text-primary">Pro Tip</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Great choice! Startups with a video pitch are 3x more likely to get matched with top-tier investors.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
