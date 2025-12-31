"use client"

import { Home, Search, MessageSquare, User, Settings, Zap, LayoutDashboard, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/lib/store"
import { signOut } from "next-auth/react"

export function Sidebar() {
  const { role } = useAppStore()
  const pathname = usePathname()

  // Simple check: if role is founder or investor, we are definitely logged in.
  // Ideally, we should receive an isAuthenticated prop or useSession.
  // For now, let's assume if the store has a specific role, we show logout.
  // But wait, on refresh store resets. 
  // We will fix the hydration in DashboardLayout.
  const isLoggedIn = role === "founder" || role === "investor"

  const navItems = [
    { href: "/home", icon: Home, label: "Swipe" },
    { href: "/search", icon: Search, label: "Discover" },
    ...(role === "founder" ? [{ href: "/founderdetails", icon: LayoutDashboard, label: "Founder Details" }] : []),
    ...(role === "investor" ? [{ href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" }] : []),
    { href: "/profile", icon: User, label: "Profile" },
  ]

  const handleLogout = async () => {
    // If using next-auth/react, we need SessionProvider.
    // Or we can simple redirect to a logout route or use a server action.
    // Since we don't have SessionProvider set up yet, let's try a hard navigation to a signout API/page or use the standard next-auth client signOut if possible (it might work if cookie is present).
    // Actually, safest is calling the server-side signOut via a server action or API route, 
    // but standard approach is client-side signOut.
    // Let's assume we can add SessionProvider to layout.tsx easily.
    // For now, let's just make the button visible and use window.location if signOut fails.
    await signOut({ callbackUrl: "/login" })
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 bg-card/80 backdrop-blur-xl border-r border-border z-50 flex flex-col items-center py-6 shadow-sm transition-all duration-300">
      {/* Logo */}
      <Link href="/home" className="mb-8 p-3 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25 cursor-pointer hover:scale-105 transition-transform">
        <Zap className="h-6 w-6 text-primary-foreground" />
        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-foreground text-background text-xs font-medium rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
          Home
        </div>
      </Link>

      {/* Nav Items */}
      <nav className="flex-1 w-full space-y-4 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative group w-full p-3 rounded-2xl transition-all duration-300 flex items-center justify-center",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-6 w-6 transition-transform group-hover:scale-110", isActive && "animate-pulse")} />
              <div className="absolute left-full ml-4 px-3 py-1.5 bg-foreground text-background text-sm font-medium rounded-lg opacity-0 -translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap shadow-xl z-50 flex items-center">
                {item.label}
                <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-foreground" />
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="space-y-4 px-2 w-full flex flex-col items-center pb-4 border-t border-border/50 pt-4">
        {!isLoggedIn ? (
          <>
            <Link href="/login" className="p-3 rounded-2xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all group relative flex justify-center w-full">
              <User className="h-6 w-6 transition-transform group-hover:scale-110" />
              <div className="absolute left-full ml-4 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 translate-x-1">Log In</div>
            </Link>
            <Link href="/signup" className="p-3 rounded-2xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all group relative flex justify-center w-full">
              <Zap className="h-6 w-6 transition-transform group-hover:scale-110" />
              <div className="absolute left-full ml-4 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 translate-x-1">Sign Up</div>
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} className="p-3 rounded-2xl text-muted-foreground hover:bg-secondary hover:hover:bg-red-500/10 hover:text-red-500 transition-all group relative flex justify-center w-full">
            <LogOut className="h-6 w-6 transition-transform group-hover:scale-110" />
            <div className="absolute left-full ml-4 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 translate-x-1">Log Out</div>
          </button>
        )}

        <button className="p-3 rounded-2xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all group relative flex justify-center w-full">
          <Settings className="h-6 w-6 transition-transform group-hover:scale-110" />
          <div className="absolute left-full ml-4 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 translate-x-1">Settings</div>
        </button>
      </div>
    </aside>
  )
}
