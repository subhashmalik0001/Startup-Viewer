import { DashboardLayout } from "@/components/dashboard-layout"
import { SwipeInterface } from "@/components/swipe/swipe-interface"

export default function HomePage() {
    return (
        <DashboardLayout>
            <div className="h-full w-full max-w-2xl mx-auto flex flex-col justify-center">
                <SwipeInterface />
            </div>
        </DashboardLayout>
    )
}
