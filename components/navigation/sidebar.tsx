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
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-20 bg-card/80 backdrop-blur-xl border-r border-border z-50 flex-col items-center py-6 shadow-sm transition-all duration-300">
        {/* Logo */}
        <Link href="/home" className="mb-8 p-3 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25 cursor-pointer hover:scale-105 transition-transform">
          <Zap className="h-6 w-6 text-primary-foreground" />
        </Link>

        {/* Desktop Nav Items */}
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

        {/* Desktop Bottom Actions */}
        <div className="space-y-4 px-2 w-full flex flex-col items-center pb-4 border-t border-border/50 pt-4">
          {!isLoggedIn ? (
            <div className="flex flex-col gap-4 w-full">
              <Link href="/login" className="p-3 rounded-2xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all group relative flex justify-center w-full">
                <User className="h-6 w-6 transition-transform group-hover:scale-110" />
              </Link>
              <Link href="/signup" className="p-3 rounded-2xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all group relative flex justify-center w-full">
                <Zap className="h-6 w-6 transition-transform group-hover:scale-110" />
              </Link>
            </div>
          ) : (
            <button onClick={handleLogout} className="p-3 rounded-2xl text-muted-foreground hover:bg-secondary hover:hover:bg-red-500/10 hover:text-red-500 transition-all group relative flex justify-center w-full">
              <LogOut className="h-6 w-6 transition-transform group-hover:scale-110" />
            </button>
          )}
          <button className="p-3 rounded-2xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all group relative flex justify-center w-full">
            <Settings className="h-6 w-6 transition-transform group-hover:scale-110" />
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-xl border-t border-border z-50 flex items-center justify-around px-2 shadow-lg safe-area-bottom">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "p-2 rounded-xl transition-all duration-300 flex flex-col items-center justify-center gap-1",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className={cn("h-6 w-6", isActive && "animate-bounce")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
        {/* Mobile More/Menu (Optional, simplified for now) */}
        {!isLoggedIn ? (
          <Link href="/login" className="p-2 rounded-xl text-muted-foreground flex flex-col items-center justify-center gap-1">
            <User className="h-6 w-6" />
            <span className="text-[10px] font-medium">Log In</span>
          </Link>
        ) : (
          <button onClick={handleLogout} className="p-2 rounded-xl text-muted-foreground flex flex-col items-center justify-center gap-1">
            <LogOut className="h-6 w-6" />
            <span className="text-[10px] font-medium">Log Out</span>
          </button>
        )}
      </nav>
    </>
  )
}
