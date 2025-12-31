"use client"

import { motion } from "framer-motion"
import { Zap, Rocket, TrendingUp, Users, Check, Lightbulb, Shield, Eye } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { LandingNavbar } from "./landing-navbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function HeroSection() {
  const { setCurrentView, setRole } = useAppStore()

  const handleRoleSelect = (role: "founder" | "investor" | "viewer") => {
    setRole(role)
    if (role === "founder" || role === "investor") {
      setCurrentView("dashboard")
    } else {
      setCurrentView("swipe")
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <LandingNavbar />

      {/* SECTION 1: HERO */}
      <div className="pt-32 pb-20 px-4 md:px-6 relative flex flex-col items-center justify-center min-h-[90vh]">
        {/* Connection Network Visual */}
        <div className="relative w-full max-w-4xl h-[300px] mb-12 hidden md:block">
          {/* Center Node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="h-24 w-24 bg-gradient-to-tr from-violet-500 to-fuchsia-500 rounded-3xl shadow-2xl flex items-center justify-center">
              <Check className="h-10 w-10 text-white stroke-[3]" />
            </div>
          </div>

          {/* Connecting Lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none stroke-border/50" strokeWidth="1.5">
            <path d="M 200 100 L 450 150" /> {/* Left Top to Center */}
            <path d="M 220 220 L 450 150" /> {/* Left Bottom to Center */}
            <path d="M 700 100 L 450 150" /> {/* Right Top to Center */}
            <path d="M 680 200 L 450 150" /> {/* Right Bottom to Center */}
          </svg>

          {/* Floating Nodes */}
          {/* Left Top - Idea */}
          <motion.div
            animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-16 left-[15%] bg-white dark:bg-card p-3 rounded-2xl shadow-lg border border-border/50"
          >
            <Lightbulb className="h-6 w-6 text-amber-500" />
          </motion.div>

          {/* Left Bottom - Fun bubble */}
          <motion.div
            animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute bottom-10 left-[20%] bg-blue-400 p-4 rounded-2xl shadow-lg text-white"
          >
            <Users className="h-5 w-5" />
          </motion.div>

          {/* Right Top - Security */}
          <motion.div
            animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
            className="absolute top-20 right-[20%] bg-orange-500 p-4 rounded-2xl shadow-lg text-white"
          >
            <Shield className="h-5 w-5" />
          </motion.div>

          {/* Right Bottom - Avatar */}
          <motion.div
            animate={{ y: [0, 6, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 1.5 }}
            className="absolute bottom-16 right-[15%] bg-white dark:bg-card p-2 rounded-2xl shadow-lg border border-border/50"
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </div>
          </motion.div>

          {/* Far Left Avatar */}
          <motion.div className="absolute top-1/2 left-0 -translate-y-1/2 bg-white dark:bg-card p-2 pr-4 rounded-xl shadow-md flex items-center gap-3 border border-border/50">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/avatar-founder.png" />
              <AvatarFallback className="bg-primary/10 text-primary">F</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">Founders</span>
          </motion.div>
        </div>

        <div className="text-center max-w-3xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6">
            All-in-one Startup <br /> platform
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
            CoreShift is a modern, all-in-one ecosystem connecting founders, investors, and talent perfectly to fit your business needs.
          </p>
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-4 rounded-2xl font-bold shadow-lg shadow-primary/25 transition-all hover:scale-105 active:scale-95">
            Request a Demo
          </button>
        </div>
      </div>

      {/* SECTION 2: BUILT FOR EVERYONE (Role Selection) */}
      <div className="py-24 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-card border border-border shadow-sm mb-4">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-foreground">CoreShift</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Built for everyone</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Thousands of businesses, from startups to enterprises, use CoreShift to handle their growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Founder Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => handleRoleSelect("founder")}
              className="group bg-white dark:bg-card rounded-[2rem] p-8 shadow-sm border border-border/50 cursor-pointer hover:shadow-xl hover:border-primary/50 transition-all"
            >
              <div className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 aspect-[4/3] flex items-center justify-center">
                {/* Mock Chart UI */}
                <div className="w-[80%] bg-white dark:bg-card rounded-xl shadow-lg p-4 flex gap-2 items-end h-[60%]">
                  <div className="w-full bg-indigo-200 h-[40%] rounded-t-sm" />
                  <div className="w-full bg-indigo-500 h-[70%] rounded-t-sm" />
                  <div className="w-full bg-purple-500 h-[50%] rounded-t-sm" />
                  <div className="w-full bg-pink-500 h-[90%] rounded-t-sm" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">For Founders</h3>
              <p className="text-muted-foreground leading-relaxed">
                One platform to manage your cap table, showcase your pitch deck, and track analytics.
              </p>
            </motion.div>

            {/* Investor Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => handleRoleSelect("investor")}
              className="group bg-white dark:bg-card rounded-[2rem] p-8 shadow-sm border border-border/50 cursor-pointer hover:shadow-xl hover:border-amber-500/50 transition-all"
            >
              <div className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 aspect-[4/3] flex items-center justify-center">
                <div className="bg-white dark:bg-card px-6 py-3 rounded-xl shadow-lg flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center text-white">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="h-2 w-20 bg-secondary mb-1.5 rounded-full" />
                    <div className="h-2 w-12 bg-secondary/50 rounded-full" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-amber-500 transition-colors">For Investors</h3>
              <p className="text-muted-foreground leading-relaxed">
                Access real-time deal flow, track portfolio performance, and connect with founders.
              </p>
            </motion.div>

            {/* Talent Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => handleRoleSelect("viewer")}
              className="group bg-white dark:bg-card rounded-[2rem] p-8 shadow-sm border border-border/50 cursor-pointer hover:shadow-xl hover:border-green-500/50 transition-all"
            >
              <div className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 aspect-[4/3] flex items-center justify-center">
                <div className="bg-white dark:bg-card p-4 rounded-xl shadow-lg rotate-3">
                  <div className="flex -space-x-3">
                    <div className="h-10 w-10 rounded-full bg-red-200 border-2 border-white" />
                    <div className="h-10 w-10 rounded-full bg-blue-200 border-2 border-white" />
                    <div className="h-10 w-10 rounded-full bg-green-200 border-2 border-white flex items-center justify-center text-xs font-bold">+5</div>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-emerald-500 transition-colors">For Talent</h3>
              <p className="text-muted-foreground leading-relaxed">
                Join the next unicorn. Find roles that match your skills at high-growth startups.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
