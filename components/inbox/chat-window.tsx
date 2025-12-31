"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, FileText, Phone, Video, Search, Paperclip, Smile } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAppStore } from "@/lib/store"
import { mockMessages } from "@/lib/mock-data"

export function ChatWindow() {
  const { selectedMatch, role } = useAppStore()
  const [message, setMessage] = useState("")

  if (!selectedMatch) {
    return (
      <div className="flex-1 flex items-center justify-center text-center p-8 bg-secondary/5">
        <div>
          <div className="h-20 w-20 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl grayscale opacity-50">👋</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Welcome to your Inbox</h3>
          <p className="text-muted-foreground">Select a conversation from the sidebar to start chatting.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-background/50">
      {/* Chat header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={selectedMatch.avatar || "/placeholder.svg"} alt={selectedMatch.name} />
            <AvatarFallback>{selectedMatch.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold text-foreground">{selectedMatch.name}</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> Online
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {mockMessages.map((msg, index) => {
          const isMe = msg.senderId === "me"
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-end gap-2 max-w-[70%] ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                {!isMe && (
                  <Avatar className="h-6 w-6 mb-1">
                    <AvatarImage src={selectedMatch.avatar} />
                    <AvatarFallback>{selectedMatch.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`p-4 rounded-2xl shadow-sm ${isMe
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-white dark:bg-secondary border border-border rounded-bl-none text-foreground"
                    }`}
                >
                  <p className="leading-relaxed">{msg.content}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Input */}
      <div className="p-4 bg-background">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setMessage("")
          }}
          className="flex gap-2 items-center bg-secondary/30 p-2 rounded-xl border border-border focus-within:ring-2 ring-primary/20 transition-all"
        >
          <Button type="button" size="icon" variant="ghost" className="text-muted-foreground hover:text-foreground">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/50"
          />
          <Button type="button" size="icon" variant="ghost" className="text-muted-foreground hover:text-foreground">
            <Smile className="h-4 w-4" />
          </Button>
          <Button type="submit" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
