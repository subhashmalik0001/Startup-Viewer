import { auth } from "@/auth"
import { DashboardLayout } from "@/components/dashboard-layout"
import { InvestorDashboard } from "@/components/dashboard/investor-dashboard"
import { FounderDashboard } from "@/components/dashboard/founder-dashboard"

export default async function DashboardPage() {
    const session = await auth()
    const role = session?.user?.role || "viewer"

    return (
        <DashboardLayout>
            {role === "investor" ? (
                <InvestorDashboard />
            ) : role === "founder" ? (
                // If founder goes to /dashboard, maybe show stats vs form? 
                // For now reuse FounderDashboard or a Stats view if separated later.
                <FounderDashboard />
            ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                    Access Denied or Unknown Role
                </div>
            )}
        </DashboardLayout>
    )
}
