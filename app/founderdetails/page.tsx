import { DashboardLayout } from "@/components/dashboard-layout"
import { FounderDashboard } from "@/components/dashboard/founder-dashboard"

export default function FounderDetailsPage() {
    return (
        <DashboardLayout>
            {/* Reusing FounderDashboard component which contains the form */}
            <FounderDashboard />
        </DashboardLayout>
    )
}
