import { auth } from "@/auth"
import { DashboardLayout } from "@/components/dashboard-layout"
import { SwipeInterface } from "@/components/swipe/swipe-interface"

export default async function HomePage() {
    const session = await auth()
    const role = (session?.user?.role as "founder" | "investor" | "viewer") || "viewer"

    return (
        <DashboardLayout userRole={role}>
            <div className="h-full w-full max-w-2xl mx-auto flex flex-col justify-center">
                <SwipeInterface />
            </div>
        </DashboardLayout>
    )
}
