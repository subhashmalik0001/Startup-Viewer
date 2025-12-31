"use client"

import { Zap } from "lucide-react"

export function LandingNavbar() {
    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
            <div className="bg-background/80 backdrop-blur-lg border border-border shadow-sm rounded-full px-6 py-3 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary fill-primary" />
                    <span className="font-bold text-lg tracking-tight">CoreShift</span>
                </div>

                {/* Center Links - Hidden on mobile */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Product</a>
                    <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
                    <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
                    <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Resources</a>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <a href="/login" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Sign in</a>
                    <button className="bg-foreground text-background hover:bg-foreground/90 px-5 py-2 rounded-full text-sm font-medium transition-colors">
                        Request a Demo
                    </button>
                </div>
            </div>
        </nav>
    )
}
