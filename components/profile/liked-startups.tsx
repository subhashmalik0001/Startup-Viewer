"use client"

import { Startup } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface LikedStartupsProps {
    startups: Startup[]
}

export function LikedStartups({ startups }: LikedStartupsProps) {
    if (startups.length === 0) {
        return (
            <div className="text-center py-10 text-muted-foreground">
                <p>No liked startups yet. get swiping!</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            {startups.map((startup) => (
                <Card key={startup.id} className="overflow-hidden glass border-border">
                    <div className="flex">
                        <div className="flex-1 p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg">{startup.name}</h3>
                                <Badge variant="outline" className="text-xs">{startup.stage}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{startup.oneLiner}</p>
                            <div className="flex flex-wrap gap-1">
                                {startup.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-xs bg-secondary/50 px-2 py-0.5 rounded-md text-muted-foreground">#{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
}
