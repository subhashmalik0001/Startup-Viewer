"use client"

import { Phone, Mail, Clock, MapPin, MoreHorizontal, Bell, Archive, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAppStore } from "@/lib/store"

export function ContactPanel() {
    const { selectedMatch } = useAppStore()

    if (!selectedMatch) return null

    return (
        <div className="flex flex-col h-full border-l border-border bg-card/50 w-[300px]">
            <div className="p-6 flex flex-col items-center border-b border-border relative">
                <div className="absolute top-4 right-4">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </Button>
                </div>

                <Avatar className="h-20 w-20 mb-4 ring-4 ring-secondary">
                    <AvatarImage src={selectedMatch.avatar} />
                    <AvatarFallback>{selectedMatch.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="font-bold text-lg text-foreground">{selectedMatch.name}</h2>
                <p className="text-sm text-muted-foreground mb-4 capitalize">{selectedMatch.type}</p>

                <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-primary/20 text-primary hover:bg-primary/10">
                        <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-primary/20 text-primary hover:bg-primary/10">
                        <Mail className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">About</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="truncate">contact@{selectedMatch.name.split(' ')[0].toLowerCase()}.com</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>San Francisco, CA</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>Local time: 10:42 AM</span>
                        </div>
                    </div>
                </div>

                <Separator />

                <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Settings</h3>
                    <div className="space-y-1">
                        <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                            <Bell className="h-4 w-4 mr-3" /> Notifications
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                            <Archive className="h-4 w-4 mr-3" /> Archive Chat
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4 mr-3" /> Delete Conversation
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
