"use client"

import { Home, Search, MessageSquare, User, Settings, Zap, LayoutDashboard, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/lib/store"

export function Sidebar() {
  const { currentView, setCurrentView, role } = useAppStore()

  const navItems = [
    { id: "swipe" as const, icon: Home, label: "Swipe" },
    { id: "discover" as const, icon: Search, label: "Discover" },
    { id: "inbox" as const, icon: MessageSquare, label: "Inbox" },
    ...(role === "founder" || role === "investor" ? [{ id: "dashboard" as const, icon: LayoutDashboard, label: "Dashboard" }] : []),
    { id: "profile" as const, icon: User, label: "Profile" },
  ]

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 bg-card/80 backdrop-blur-xl border-r border-border z-50 flex flex-col items-center py-6 shadow-sm transition-all duration-300">
      {/* Logo */}
      <div className="mb-8 p-3 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25 cursor-pointer hover:scale-105 transition-transform" onClick={() => setCurrentView("landing")}>
        <Zap className="h-6 w-6 text-primary-foreground" />
        {/* Tooltip */}
        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-foreground text-background text-xs font-medium rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
          Home
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 w-full space-y-4 px-2">
        {navItems.map((item) => {
          const isActive = currentView === item.id
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as any)}
              className={cn(
                "relative group w-full p-3 rounded-2xl transition-all duration-300 flex items-center justify-center",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-6 w-6 transition-transform group-hover:scale-110", isActive && "animate-pulse")} />

              {/* Tooltip Label */}
              <div className="absolute left-full ml-4 px-3 py-1.5 bg-foreground text-background text-sm font-medium rounded-lg opacity-0 -translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap shadow-xl z-50 flex items-center">
                {item.label}
                {/* Arrow */}
                <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-foreground" />
              </div>
            </button>
          )
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="space-y-4 px-2 w-full flex flex-col items-center pb-4 border-t border-border/50 pt-4">
        <a href="/login" className="p-3 rounded-2xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all group relative flex justify-center w-full">
          <User className="h-6 w-6 transition-transform group-hover:scale-110" />
          <div className="absolute left-full ml-4 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 translate-x-1">Log In</div>
        </a>
        <a href="/signup" className="p-3 rounded-2xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all group relative flex justify-center w-full">
          <Zap className="h-6 w-6 transition-transform group-hover:scale-110" />
          <div className="absolute left-full ml-4 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 translate-x-1">Sign Up</div>
        </a>
        <button className="p-3 rounded-2xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all group relative flex justify-center w-full">
          <Settings className="h-6 w-6 transition-transform group-hover:scale-110" />
          <div className="absolute left-full ml-4 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 translate-x-1">Settings</div>
        </button>
      </div>
    </aside>
  )
}
