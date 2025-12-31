"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BadgeCheck, Eye, Zap, MessageSquare, Briefcase, MapPin, Clock, Star, Link as LinkIcon, Mail, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAppStore } from "@/lib/store"
import { LikedStartups } from "./liked-startups"
import { BookmarkedStartups } from "./bookmarked-startups"
import { EngagementChart, RecruitmentFunnel, StatCard } from "./analytics-widgets"
import { useSession } from "next-auth/react"
import { EditProfileDialog } from "./edit-profile-dialog"

import { useEffect } from "react"

export function ProfileView() {
  const { role, setRole, likedStartups, bookmarkedStartups, startups, setCurrentView, userProfile, fetchUserProfile } = useAppStore()
  const { data: session } = useSession()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const displayName = session?.user?.name || session?.user?.email?.split('@')[0] || "User"
  const displayEmail = session?.user?.email || ""
  const displayImage = session?.user?.image || "/unique-profile-pic.png" // Fallback

  useEffect(() => {
    // @ts-ignore
    if (session?.user?.id) {
      // @ts-ignore
      fetchUserProfile(session.user.id)
    }
  }, [session, fetchUserProfile])

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-[1400px] mx-auto h-full overflow-y-auto pb-24">
      {/* Header Breadcrumb or Title */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setRole(role === "founder" ? "investor" : "founder")}>
            Switch to {role === "founder" ? "Investor" : "Founder"} View
          </Button>
          <Button onClick={() => setIsEditDialogOpen(true)}>Edit Profile</Button>
        </div>
      </div>

      <EditProfileDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN - PROFILE CARD */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-6">
          <Card className="overflow-hidden border-border bg-card shadow-sm">
            <div className="h-32 bg-gradient-to-r from-violet-500 to-fuchsia-500 relative">
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white border border-white/30">
                {role === "investor" ? "Verified Investor" : "Pro Member"}
              </div>
            </div>
            <CardContent className="pt-0 relative">
              <div className="flex justify-between items-end -mt-12 mb-4 px-2">
                <Avatar className="h-24 w-24 ring-4 ring-card shadow-lg">
                  <AvatarImage src={displayImage} alt="Profile" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">{displayName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="mb-2">
                  <BadgeCheck className="h-8 w-8 text-blue-500 fill-white" />
                </div>
              </div>

              <div className="px-2 mb-6">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">{displayName}</h2>
                <p className="text-primary font-medium mb-1">{userProfile.title}</p>
                <p className="text-xs text-muted-foreground mb-4">{userProfile.bio}</p>

                <div className="flex flex-wrap gap-2 mt-4 mb-6">
                  {userProfile.skills.map(skill => (
                    <Badge key={skill} variant="secondary" className="px-2 py-0.5 text-xs text-muted-foreground bg-secondary/50 border-secondary">{skill}</Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 bg-secondary/20 rounded-xl mb-6">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> Location</p>
                    <p className="text-sm font-medium">{userProfile.location}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> Timezone</p>
                    <p className="text-sm font-medium">{userProfile.timezone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Briefcase className="h-3 w-3" /> Availability</p>
                    <p className="text-sm font-medium">{userProfile.availability}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="h-3 w-3" /> Contact</p>
                    <p className="text-sm font-medium truncate">{displayEmail}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">My Startups</h3>
                    {role === "founder" && (
                      <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => setCurrentView("dashboard")}>
                        <Plus className="h-3 w-3 mr-1" /> Add New
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    {startups.filter(s => s.isUserCreated).length > 0 ? (
                      startups.filter(s => s.isUserCreated).map((startup) => (
                        <div key={startup.id} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer group">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary overflow-hidden">
                            {startup.image ? <img src={startup.image} alt={startup.name} className="h-full w-full object-cover" /> : startup.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm flex items-center gap-2">
                              {startup.name}
                              {startup.verified && <BadgeCheck className="h-3 w-3 text-blue-500" />}
                            </p>
                            <p className="text-xs text-muted-foreground truncate max-w-[200px]">{startup.oneLiner}</p>
                          </div>
                          <div className="text-xs font-mono text-muted-foreground bg-background/50 px-2 py-1 rounded">
                            {startup.stage}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 bg-secondary/20 rounded-xl border border-dashed border-border">
                        <p className="text-sm text-muted-foreground mb-2">No active startups</p>
                        {role === "founder" && (
                          <Button variant="outline" size="sm" onClick={() => setCurrentView("dashboard")}>
                            Launch Your First
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <Button className="w-full mt-6 gap-2">
                  <LinkIcon className="h-4 w-4" /> View Public Portfolio
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN - ANALYTICS & WIDGETS */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">

          {/* Top Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard title="Profile Views" value="2,543" subtext="+12% from last week" icon={Eye} trend="up" delay={0.1} />
            <StatCard title="Matches" value={likedStartups.length} subtext="Total connections made" icon={Zap} trend="up" delay={0.2} />
            {role === "founder" ? (
              <>
                <StatCard title="Applications" value="128" subtext="Talent interest" icon={Briefcase} trend="up" delay={0.3} />
                <StatCard title="Investor Interest" value="15" subtext="Startups bookmarked you" icon={Star} trend="up" delay={0.4} />
              </>
            ) : (
              <>
                <StatCard title="Investments" value="3" subtext="Active deals" icon={Briefcase} trend="up" delay={0.3} />
                <StatCard title="Deal Flow" value="45" subtext="Startups reviewed" icon={Star} trend="up" delay={0.4} />
              </>
            )}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Engagement Chart */}
            <Card className="md:col-span-1 shadow-sm border-border">
              <CardHeader>
                <CardTitle className="text-lg">Engagement Overview</CardTitle>
                <CardDescription>Profile views vs. match rate over time</CardDescription>
              </CardHeader>
              <CardContent>
                <EngagementChart />
              </CardContent>
            </Card>

            {/* Recruitment/Funnel Chart or Score */}
            <div className="space-y-6">
              {/* Score Card */}
              <Card className="shadow-sm border-border">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Overall Profile Score</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-3xl font-bold">86</h3>
                      <span className="text-sm text-green-500 font-medium">High Potential</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Top 10% of founders in your region</p>
                  </div>

                  <div className="relative h-20 w-20 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path className="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                      <path className="text-primary" strokeDasharray="86, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                    </svg>
                    <span className="absolute font-bold text-lg">86</span>
                  </div>
                </CardContent>
              </Card>

              {/* Funnel */}
              <Card className="shadow-sm border-border flex-1">
                <CardHeader>
                  <CardTitle className="text-lg">Recruitment Pipeline</CardTitle>
                  <CardDescription>Active candidates by stage</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecruitmentFunnel />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom Activity Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Recent Matches (Liked)</h3>
                <Button variant="ghost" size="sm" className="text-primary">View All</Button>
              </div>
              <div className="bg-card rounded-xl border border-border overflow-hidden min-h-[300px]">
                {likedStartups.length > 0 ? (
                  <LikedStartups startups={likedStartups.slice(0, 3)} />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                    <Zap className="h-12 w-12 mb-4 opacity-20" />
                    <p>No matches yet. Start swiping!</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Saved for Later</h3>
                <Button variant="ghost" size="sm" className="text-primary">View All</Button>
              </div>
              <div className="bg-card rounded-xl border border-border overflow-hidden min-h-[300px]">
                {bookmarkedStartups.length > 0 ? (
                  <BookmarkedStartups startups={bookmarkedStartups.slice(0, 3)} />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                    <BadgeCheck className="h-12 w-12 mb-4 opacity-20" />
                    <p>No saved startups.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
