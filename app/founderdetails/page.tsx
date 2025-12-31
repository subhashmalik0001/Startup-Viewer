import { DashboardLayout } from "@/components/dashboard-layout"
import { FounderDashboard } from "@/components/dashboard/founder-dashboard"

import { auth } from "@/auth"

export default async function FounderDetailsPage() {
    const session = await auth()
    const role = (session?.user?.role as "founder" | "investor" | "viewer") || "viewer"

    return (
        <DashboardLayout userRole={role}>
            {/* Reusing FounderDashboard component which contains the form */}
            <FounderDashboard />
        </DashboardLayout>
    )
}
