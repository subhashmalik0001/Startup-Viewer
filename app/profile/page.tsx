import { DashboardLayout } from "@/components/dashboard-layout"
import { ProfileView } from "@/components/profile/profile-view"

import { auth } from "@/auth"

export default async function ProfilePage() {
    const session = await auth()
    const role = (session?.user?.role as "founder" | "investor" | "viewer") || "viewer"

    return (
        <DashboardLayout userRole={role}>
            <ProfileView />
        </DashboardLayout>
    )
}
