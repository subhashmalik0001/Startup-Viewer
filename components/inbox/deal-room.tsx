import { InboxSidebar } from "./inbox-sidebar"
import { ChatWindow } from "./chat-window"
import { ContactPanel } from "./contact-panel"

export function DealRoom() {
  return (
    <div className="flex h-full bg-background overflow-hidden">
      {/* Left Sidebar - Conversation List */}
      <div className="w-[320px] flex-shrink-0 flex flex-col h-full border-r border-border">
        <InboxSidebar />
      </div>

      {/* Center - Chat Area */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        <ChatWindow />
      </div>

      {/* Right Sidebar - Details (Hidden on small screens) */}
      <div className="w-[300px] flex-shrink-0 hidden xl:flex flex-col h-full border-l border-border">
        <ContactPanel />
      </div>
    </div>
  )
}
