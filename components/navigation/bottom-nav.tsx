"use client"

import { Home, Search, MessageSquare, LayoutDashboard, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/lib/store"

export function BottomNav() {
  const { currentView, setCurrentView, role } = useAppStore()

  const navItems = [
    { id: "swipe" as const, icon: Home, label: "Home" },
    { id: "discover" as const, icon: Search, label: "Discover" },
    { id: "inbox" as const, icon: MessageSquare, label: "Inbox" },
    ...(role === "founder" ? [{ id: "dashboard" as const, icon: LayoutDashboard, label: "Dashboard" }] : []),
    { id: "profile" as const, icon: User, label: "Profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong md:hidden">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
              currentView === item.id ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
