"use client"

import { InboxSidebar } from "./inbox-sidebar"
import { ChatWindow } from "./chat-window"
import { ContactPanel } from "./contact-panel"
import { useAppStore } from "@/lib/store"

export function InboxView() {
    const { selectedMatch } = useAppStore()

    return (
        <div className="flex h-full w-full bg-background overflow-hidden">
            {/* Sidebar List */}
            <div className="w-80 border-r border-border shrink-0 hidden md:block">
                <InboxSidebar />
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <ChatWindow />
            </div>

            {/* Right Contact Panel (Optional) */}
            {selectedMatch && (
                <div className="w-72 border-l border-border shrink-0 hidden xl:block bg-card/30">
                    <ContactPanel />
                </div>
            )}
        </div>
    )
}
