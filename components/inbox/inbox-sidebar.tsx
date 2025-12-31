"use client"

import { Search, Archive, UserCircle, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils"

export function InboxSidebar() {
    const { matches, selectedMatch, setSelectedMatch } = useAppStore()

    return (
        <div className="flex flex-col h-full border-r border-border bg-card/50">
            <div className="p-4 space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search" className="pl-9 bg-secondary/50" />
                </div>

                <Tabs defaultValue="active" className="w-full">
                    <TabsList className="w-full grid grid-cols-2">
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="archived">Archived</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="px-2 space-y-1">
                    {matches.map((match) => (
                        <button
                            key={match.id}
                            onClick={() => setSelectedMatch(match)}
                            className={cn(
                                "w-full flex items-start gap-3 p-3 rounded-lg transition-colors text-left",
                                selectedMatch?.id === match.id ? "bg-primary/10" : "hover:bg-secondary/50"
                            )}
                        >
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={match.avatar} />
                                <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 overflow-hidden">
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className={cn("font-medium truncate", selectedMatch?.id === match.id && "text-primary")}>
                                        {match.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                                        {match.timestamp || "10:42 AM"}
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground truncate">
                                    {match.lastMessage || "Hey! I saw your pitch deck..."}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
