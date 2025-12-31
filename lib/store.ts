import { create } from "zustand"
import type { UserRole, Startup, Match, UserProfile } from "./types"
import { mockStartups, mockMatches } from "./mock-data"

interface AppState {
  role: UserRole
  setRole: (role: UserRole) => void
  currentView: "landing" | "swipe" | "dashboard" | "inbox" | "profile" | "discover" | "investor-dashboard"
  setCurrentView: (view: AppState["currentView"]) => void
  startups: Startup[]
  currentStartupIndex: number
  swipeRight: () => void
  swipeLeft: () => void
  superLike: () => void
  bookmark: () => void
  undo: () => void
  matches: Match[]
  swipeHistory: Array<{ startup: Startup; action: "right" | "left" | "super" }>
  likedStartups: Startup[]
  bookmarkedStartups: Startup[]
  selectedMatch: Match | null
  setSelectedMatch: (match: Match | null) => void
  investorFilters: {
    domains: string[]
    stage: string[]
  }
  setInvestorFilters: (filters: AppState["investorFilters"]) => void
  investorStatus: "unverified" | "pending" | "verified"
  setInvestorStatus: (status: AppState["investorStatus"]) => void
  addStartup: (startup: Startup) => void
  userProfile: UserProfile
  updateUserProfile: (profile: Partial<UserProfile>) => void
}

export const useAppStore = create<AppState>((set, get) => ({
  role: "viewer",
  setRole: (role) => set({ role }),
  currentView: "landing",
  setCurrentView: (view) => set({ currentView: view }),
  userProfile: {
    title: "Serial Entrepreneur",
    location: "San Francisco, CA",
    bio: "Building the next big thing. Passionate about AI and Fintech.",
    skills: ["React", "Node.js", "AI", "SaaS"],
    timezone: "UTC-8 (PST)",
    availability: "Open to Connect"
  },
  updateUserProfile: (profile) => set((state) => ({ userProfile: { ...state.userProfile, ...profile } })),
  startups: mockStartups,
  currentStartupIndex: 0,
  likedStartups: [],
  bookmarkedStartups: [],
  investorStatus: "unverified",
  setInvestorStatus: (status) => set({ investorStatus: status }),
  addStartup: (startup) => set((state) => ({ startups: [...state.startups, startup] })),

  bookmark: () => {
    const { currentStartupIndex, startups, bookmarkedStartups } = get()
    if (currentStartupIndex < startups.length) {
      const startup = startups[currentStartupIndex]
      // Prevent duplicates
      if (!bookmarkedStartups.find((s) => s.id === startup.id)) {
        set({ bookmarkedStartups: [...bookmarkedStartups, startup] })
      }
    }
  },

  swipeRight: () => {
    const { currentStartupIndex, startups, swipeHistory, likedStartups } = get()
    if (currentStartupIndex < startups.length) {
      const startup = startups[currentStartupIndex]
      set({
        swipeHistory: [...swipeHistory, { startup, action: "right" }],
        likedStartups: [...likedStartups, startup], // Add to liked list
        currentStartupIndex: currentStartupIndex + 1,
      })
    }
  },
  swipeLeft: () => {
    const { currentStartupIndex, startups, swipeHistory } = get()
    if (currentStartupIndex < startups.length) {
      set({
        swipeHistory: [...swipeHistory, { startup: startups[currentStartupIndex], action: "left" }],
        currentStartupIndex: currentStartupIndex + 1,
      })
    }
  },
  superLike: () => {
    const { currentStartupIndex, startups, swipeHistory, likedStartups } = get()
    if (currentStartupIndex < startups.length) {
      const startup = startups[currentStartupIndex]
      set({
        swipeHistory: [...swipeHistory, { startup, action: "super" }],
        likedStartups: [...likedStartups, startup], // Add to liked list
        currentStartupIndex: currentStartupIndex + 1,
      })
    }
  },
  undo: () => {
    const { swipeHistory, currentStartupIndex, likedStartups } = get()
    if (swipeHistory.length > 0) {
      const lastAction = swipeHistory[swipeHistory.length - 1]
      let newLikedStartups = likedStartups

      // Remove from liked list if undoing a right swipe or super like
      if (lastAction.action === "right" || lastAction.action === "super") {
        newLikedStartups = likedStartups.filter(s => s.id !== lastAction.startup.id)
      }

      set({
        swipeHistory: swipeHistory.slice(0, -1),
        currentStartupIndex: currentStartupIndex - 1,
        likedStartups: newLikedStartups,
      })
    }
  },
  matches: mockMatches,
  swipeHistory: [],
  selectedMatch: null,
  setSelectedMatch: (match) => set({ selectedMatch: match }),
  investorFilters: {
    domains: [],
    stage: [],
  },
  setInvestorFilters: (filters) => set({ investorFilters: filters }),
}))
