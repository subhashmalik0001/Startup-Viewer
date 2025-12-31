"use client"

import { motion, AnimatePresence } from "framer-motion"

import { useAppStore } from "@/lib/store"
import { Sidebar } from "@/components/navigation/sidebar"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { HeroSection } from "@/components/landing/hero-section"
import { SwipeInterface } from "@/components/swipe/swipe-interface"
import { FounderDashboard } from "@/components/dashboard/founder-dashboard"
import { InvestorDashboard } from "@/components/dashboard/investor-dashboard"
import { DealRoom } from "@/components/inbox/deal-room"
import { DiscoverView } from "@/components/discover/discover-view"
import { ProfileView } from "@/components/profile/profile-view"

export default function Home() {
  const { currentView, role } = useAppStore()

  // Define transition variants
  const pageVariants = {
    initial: { opacity: 0, scale: 0.98 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.02 }
  }

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {currentView === "landing" ? (
          <motion.div
            key="landing"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <HeroSection />
          </motion.div>
        ) : (
          <motion.div
            key="app-shell"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex min-h-screen"
          >
            <Sidebar />
            <main className="flex-1 md:ml-20 pb-20 md:pb-0 transition-all duration-300">
              <div className="h-screen overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentView}
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="h-full"
                  >
                    {currentView === "swipe" && <SwipeInterface />}
                    {currentView === "dashboard" && (role === "investor" ? <InvestorDashboard /> : <FounderDashboard />)}
                    {currentView === "inbox" && <DealRoom />}
                    {currentView === "discover" && <DiscoverView />}
                    {currentView === "profile" && <ProfileView />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </main>
            <BottomNav />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
