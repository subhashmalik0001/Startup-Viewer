export type UserRole = "viewer" | "founder" | "investor"

export interface Startup {
  id: string
  name: string
  oneLiner: string
  description: string
  image: string
  videoUrl?: string
  tags: string[]
  verified: boolean
  ask?: string
  equity?: number
  fundingAmount?: number
  hiring?: string[]
  stage: "idea" | "mvp" | "scaling"
  team: TeamMember[]
  stats: {
    views: number
    swipeRightRatio: number
    investorMatches: number
    talentApplications: number
  }
  isUserCreated?: boolean
}

export interface TeamMember {
  name: string
  role: string
  avatar: string
}

export interface Match {
  id: string
  type: "investor" | "talent"
  name: string
  avatar: string
  startup?: string
  lastMessage?: string
  timestamp: string
  unread: boolean
}

export interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
}

export interface UserProfile {
  title: string
  location: string
  bio: string
  skills: string[]
  linkedin?: string
  timezone?: string
  availability?: string
}
