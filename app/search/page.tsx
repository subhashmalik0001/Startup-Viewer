import { DashboardLayout } from "@/components/dashboard-layout"
import { DiscoverView } from "@/components/discover/discover-view"

import { auth } from "@/auth"

export default async function SearchPage() {
    const session = await auth()
    const role = (session?.user?.role as "founder" | "investor" | "viewer") || "viewer"

    return (
        <DashboardLayout userRole={role}>
            <DiscoverView />
        </DashboardLayout>
    )
}
