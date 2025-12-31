"use client"

import { ReactNode, useEffect } from "react"
import { Sidebar } from "@/components/navigation/sidebar"
import { SwipeInterface } from "@/components/swipe/swipe-interface"
import { DiscoverView } from "@/components/discover/discover-view"
import { InboxView } from "@/components/inbox/inbox-view"
import { ProfileView } from "@/components/profile/profile-view"
import { useAppStore } from "@/lib/store"

interface DashboardLayoutProps {
    children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const { currentView, fetchStartups } = useAppStore()

    useEffect(() => {
        fetchStartups()
    }, [fetchStartups])

    return (
        <div className="flex h-screen w-full bg-background overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 pl-20 transition-all duration-300">
                <div className="h-full w-full overflow-y-auto">
                    {currentView === "swipe" ? (
                        <div className="h-full w-full max-w-2xl mx-auto flex flex-col justify-center">
                            <SwipeInterface />
                        </div>
                    ) : currentView === "discover" ? (
                        <DiscoverView />
                    ) : currentView === "inbox" ? (
                        <InboxView />
                    ) : currentView === "profile" ? (
                        <ProfileView />
                    ) : (
                        <>
                            {/* If view is dashboard, render children (the specific role dashboard) */}
                            {(currentView === "dashboard" || currentView === "landing" || currentView === "investor-dashboard") && children}

                            {/* Placeholders for other views if needed, or default back to dashboard/children */}
                            {/* For now, we assume 'dashboard' is the default view passed as children */}
                            {currentView !== "swipe" && currentView !== "dashboard" && currentView !== "landing" && currentView !== "investor-dashboard" && currentView !== "discover" && currentView !== "inbox" && currentView !== "profile" && (
                                <div className="flex items-center justify-center h-full text-muted-foreground">
                                    {currentView.charAt(0).toUpperCase() + currentView.slice(1)} View (Coming Soon)
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}
