"use client"

import { Startup } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface BookmarkedStartupsProps {
    startups: Startup[]
}

export function BookmarkedStartups({ startups }: BookmarkedStartupsProps) {
    if (startups.length === 0) {
        return (
            <div className="text-center py-10 text-muted-foreground">
                <p>No bookmarks yet.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {startups.map((startup) => (
                <Card key={startup.id} className="overflow-hidden glass border-border group cursor-pointer hover:border-primary/50 transition-colors">
                    <div className="relative h-32 bg-muted">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${startup.image})` }} />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                        <div className="absolute bottom-3 left-3">
                            <h3 className="font-bold text-white text-lg drop-shadow-md">{startup.name}</h3>
                        </div>
                    </div>
                    <div className="p-3">
                        <p className="text-sm text-muted-foreground line-clamp-2">{startup.oneLiner}</p>
                    </div>
                </Card>
            ))}
        </div>
    )
}
