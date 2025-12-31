"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ShieldCheck, Upload, Building2, BadgeCheck, Clock, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppStore } from "@/lib/store"

export function InvestorDashboard() {
    const { investorStatus, setInvestorStatus } = useAppStore()
    const [isUploading, setIsUploading] = useState(false)

    const handleVerificationStart = () => {
        setIsUploading(true)
        // Simulate upload and verification process
        setTimeout(() => {
            setInvestorStatus("pending")
            setIsUploading(false)
        }, 2000)
    }

    // Simulate admin approval after some time if pending
    useEffect(() => {
        if (investorStatus === "pending") {
            const timer = setTimeout(() => {
                setInvestorStatus("verified")
            }, 5000) // Auto-verify after 5s for demo
            return () => clearTimeout(timer)
        }
    }, [investorStatus, setInvestorStatus])

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-8 pb-24">
            <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold gradient-text">Investor Portal</h1>
                <p className="text-muted-foreground mt-1">Manage your deal flow and verification status.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 glass border-border">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShieldCheck className="h-6 w-6 text-primary" />
                            Verification Status
                        </CardTitle>
                        <CardDescription>
                            To access DealFlow™ and view detailed metrics, we need to verify your accreditation.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Status Steps */}
                        <div className="flex items-center justify-between relative">
                            {/* Connecting Line */}
                            <div className="absolute left-0 top-1/2 w-full h-1 bg-border -z-10" />

                            <div className="flex flex-col items-center gap-2 bg-background p-2 z-10">
                                <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${investorStatus === "unverified" ? "border-primary bg-primary text-white" : "border-primary bg-primary text-white"}`}>
                                    1
                                </div>
                                <span className="text-xs font-medium">Register</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 bg-background p-2 z-10">
                                <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${investorStatus === "pending" || investorStatus === "verified" ? "border-primary bg-primary text-white" : "border-muted-foreground bg-background"}`}>
                                    2
                                </div>
                                <span className="text-xs font-medium">Upload Docs</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 bg-background p-2 z-10">
                                <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${investorStatus === "verified" ? "border-success bg-success text-white" : "border-muted-foreground bg-background"}`}>
                                    3
                                </div>
                                <span className="text-xs font-medium">Verify</span>
                            </div>
                        </div>

                        {/* Action Area */}
                        <div className="p-6 rounded-xl bg-secondary/30 border border-border text-center">
                            {investorStatus === "unverified" && (
                                <div className="space-y-4">
                                    <Building2 className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                                    <h3 className="font-semibold">Upload Accreditation Documents</h3>
                                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                                        Please upload a copy of your firm's registration or proof of accreditation (e.g. 506(c) letter).
                                    </p>
                                    <Button onClick={handleVerificationStart} disabled={isUploading}>
                                        {isUploading ? "Uploading..." : "Start Verification"} <Upload className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            )}

                            {investorStatus === "pending" && (
                                <div className="space-y-4">
                                    <Clock className="h-12 w-12 mx-auto text-amber-500 animate-pulse" />
                                    <h3 className="font-semibold text-amber-500">Verification in Progress</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Our team is reviewing your documents. This typically takes 24-48 hours.
                                    </p>
                                    <div className="text-xs text-muted-foreground">(Demo: Auto-approving in 5s...)</div>
                                </div>
                            )}

                            {investorStatus === "verified" && (
                                <div className="space-y-4">
                                    <BadgeCheck className="h-16 w-16 mx-auto text-primary drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                                    <h3 className="text-xl font-bold gradient-text">You are Verified!</h3>
                                    <p className="text-sm text-muted-foreground">
                                        You now have full access to pitch decks, detailed financials, and direct founder messaging.
                                    </p>
                                    <Button className="bg-success hover:bg-success/90 text-white">
                                        Access Deal Room
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass border-border">
                    <CardHeader>
                        <CardTitle>Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Deals Reviewed</span>
                            <span className="font-bold">0</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Term Sheets</span>
                            <span className="font-bold">0</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
