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
    userRole?: "founder" | "investor" | "viewer"
}

export function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
    const { fetchStartups, setRole } = useAppStore()

    // Fetch startups on mount
    useEffect(() => {
        useAppStore.getState().fetchStartups()
        if (userRole) {
            useAppStore.setState({ role: userRole })
        }
    }, [userRole])

    return (
        <div className="flex h-screen w-full bg-background overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 md:pl-20 pb-20 md:pb-0 transition-all duration-300">
                <div className="h-full w-full overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
