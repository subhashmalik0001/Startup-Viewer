import type { Startup, Match, Message } from "./types"

export const mockStartups: Startup[] = [
  {
    id: "1",
    name: "NeuroPay",
    oneLiner:
      "AI-powered payment fraud detection that learns and adapts in real-time, reducing chargebacks by 94% while maintaining seamless user experience.",
    description:
      "NeuroPay uses advanced machine learning algorithms to analyze transaction patterns and detect fraudulent activities before they happen. Our system processes millions of transactions per second with sub-millisecond latency.",
    image: "/futuristic-fintech-app-with-neural-network-visuali.jpg",
    videoUrl: "/demo.mp4",
    tags: ["Fintech", "AI", "Security"],
    verified: true,
    ask: "$2M for 8%",
    equity: 8,
    fundingAmount: 2000000,
    hiring: ["ML Engineer", "Backend Developer"],
    stage: "mvp",
    team: [
      { name: "Sarah Chen", role: "CEO", avatar: "/professional-woman-headshot.png" },
      { name: "Marcus Johnson", role: "CTO", avatar: "/professional-man-headshot.png" },
    ],
    stats: { views: 12450, swipeRightRatio: 78, investorMatches: 24, talentApplications: 156 },
  },
  {
    id: "2",
    name: "GreenGrid",
    oneLiner:
      "Decentralized renewable energy marketplace connecting local producers with consumers, powered by blockchain for transparent carbon credit tracking.",
    description:
      "GreenGrid is revolutionizing the energy sector by creating a peer-to-peer energy trading platform. Homeowners with solar panels can sell excess energy directly to neighbors.",
    image: "/sustainable-energy-dashboard-with-green-accents-da.jpg",
    tags: ["CleanTech", "Blockchain", "Energy"],
    verified: true,
    ask: "$5M for 12%",
    equity: 12,
    fundingAmount: 5000000,
    hiring: ["Blockchain Developer"],
    stage: "scaling",
    team: [
      { name: "Emma Rodriguez", role: "CEO", avatar: "/latina-professional-headshot.png" },
      { name: "James Park", role: "COO", avatar: "/asian-man-professional-headshot.png" },
    ],
    stats: { views: 8920, swipeRightRatio: 82, investorMatches: 31, talentApplications: 89 },
  },
  {
    id: "3",
    name: "MindfulAI",
    oneLiner:
      "Personalized mental health companion using conversational AI and biometric data to provide 24/7 support and early intervention recommendations.",
    description:
      "MindfulAI combines the power of large language models with wearable device integration to create a truly personalized mental health experience.",
    image: "/mental-health-app-interface-calm-purple-gradients-.jpg",
    tags: ["HealthTech", "AI", "Wellness"],
    verified: false,
    ask: "$1.5M for 10%",
    equity: 10,
    fundingAmount: 1500000,
    hiring: ["UX Designer", "Data Scientist"],
    stage: "mvp",
    team: [{ name: "Dr. Lisa Wang", role: "CEO", avatar: "/doctor-woman-professional-headshot.jpg" }],
    stats: { views: 6780, swipeRightRatio: 71, investorMatches: 12, talentApplications: 234 },
  },
  {
    id: "4",
    name: "QuantumSecure",
    oneLiner:
      "Post-quantum cryptography solutions protecting enterprise data against future quantum computing threats. Military-grade security for the next era.",
    description:
      "As quantum computers become reality, current encryption will become obsolete. QuantumSecure provides quantum-resistant encryption algorithms.",
    image: "/cybersecurity-quantum-computing-interface-dark-neo.jpg",
    tags: ["Cybersecurity", "Quantum", "Enterprise"],
    verified: true,
    ask: "$10M for 15%",
    equity: 15,
    fundingAmount: 10000000,
    stage: "scaling",
    team: [
      { name: "Dr. Alex Thompson", role: "CEO", avatar: "/scientist-man-professional-headshot.jpg" },
      { name: "Nina Patel", role: "CTO", avatar: "/indian-woman-tech-professional-headshot.jpg" },
      { name: "Robert Kim", role: "CSO", avatar: "/korean-man-security-professional-headshot.jpg" },
    ],
    stats: { views: 15670, swipeRightRatio: 89, investorMatches: 45, talentApplications: 67 },
  },
  {
    id: "5",
    name: "FoodLoop",
    oneLiner:
      "B2B platform reducing food waste by connecting restaurants with surplus inventory to food banks and discount retailers in real-time.",
    description:
      "FoodLoop tackles the $1 trillion food waste problem by creating an efficient marketplace for surplus food inventory management.",
    image: "/food-sustainability-app-colorful-produce-dark-them.jpg",
    tags: ["FoodTech", "Sustainability", "Marketplace"],
    verified: false,
    ask: "$750K for 7%",
    equity: 7,
    fundingAmount: 750000,
    hiring: ["Sales Lead", "Mobile Developer"],
    stage: "idea",
    team: [{ name: "Carlos Martinez", role: "CEO", avatar: "/hispanic-man-entrepreneur-headshot.jpg" }],
    stats: { views: 3420, swipeRightRatio: 65, investorMatches: 8, talentApplications: 45 },
  },
  {
    id: "6",
    name: "BioSynth",
    oneLiner:
      "Automated protein engineering platform accelerating drug discovery by 10x using proprietary generative AI models developed at MIT.",
    description:
      "BioSynth is building the world's first fully automated wet-lab cloud for protein engineering. Our platform allows researchers to design, test, and manufacture novel proteins remotely.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=2070",
    tags: ["BioTech", "AI", "Health"],
    verified: true,
    ask: "$3M for 10%",
    equity: 10,
    fundingAmount: 3000000,
    hiring: ["Bioinformatics Engineer", "Lab Manager"],
    stage: "scaling",
    team: [
      { name: "Dr. Sarah Miller", role: "CEO", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" },
      { name: "David Chen", role: "CSO", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" }
    ],
    stats: { views: 5600, swipeRightRatio: 60, investorMatches: 15, talentApplications: 40 },
  },
  {
    id: "7",
    name: "SkillFlow",
    oneLiner:
      "Immersive language learning platform using VR and speech recognition to simulate real-world conversations and accelerate fluency.",
    description:
      "Forget flashcards. SkillFlow places you in virtual cafes, boardrooms, and street markets where you must converse with AI characters to progress. Learning by doing, from anywhere.",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=2078",
    tags: ["EdTech", "VR", "Consumer"],
    verified: false,
    ask: "$500K for 5%",
    equity: 5,
    fundingAmount: 500000,
    stage: "mvp",
    team: [
      { name: "Marco Rossi", role: "CEO", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200" }
    ],
    stats: { views: 8200, swipeRightRatio: 75, investorMatches: 5, talentApplications: 12 },
  },
  {
    id: "8",
    name: "Propel",
    oneLiner:
      "Fractional real estate investing for everyone. Own a piece of high-yield commercial properties starting with just $100.",
    description:
      "Propel lowers the barrier to entry for commercial real estate. We source, vet, and manage properties, allowing everyday investors to build a diversified portfolio with quarterly dividends.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070",
    tags: ["PropTech", "Fintech", "Investing"],
    verified: true,
    ask: "$8M for 20%",
    equity: 20,
    fundingAmount: 8000000,
    stage: "scaling",
    team: [
      { name: "Jennifer Wu", role: "CEO", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200" },
      { name: "Michael O'Neil", role: "COO", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200" }
    ],
    stats: { views: 21000, swipeRightRatio: 85, investorMatches: 50, talentApplications: 100 },
  },
  {
    id: "9",
    name: "PixelForge",
    oneLiner:
      "No-code game development engine enabling creators to build multiplayer 3D worlds in the browser without writing a single line of code.",
    description:
      "PixelForge democratizes game creation. Our drag-and-drop interface, powered by WebGPU, delivers console-quality graphics in the browser. Publish instantly to PC, Mobile, and Web.",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=2070",
    tags: ["Gaming", "No-Code", "Web3"],
    verified: true,
    ask: "$2.5M for 15%",
    equity: 15,
    fundingAmount: 2500000,
    hiring: ["Graphics Programmer", "Community Manager"],
    stage: "mvp",
    team: [
      { name: "Alex Mercer", role: "CTO", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200" }
    ],
    stats: { views: 45000, swipeRightRatio: 92, investorMatches: 18, talentApplications: 500 },
  },
]

export const mockMatches: Match[] = [
  {
    id: "m1",
    type: "investor",
    name: "Sequoia Capital",
    avatar: "/venture-capital-logo.png",
    startup: "NeuroPay",
    lastMessage: "We'd love to schedule a call to discuss your Series A plans.",
    timestamp: "2 hours ago",
    unread: true,
  },
  {
    id: "m2",
    type: "talent",
    name: "Jessica Lee",
    avatar: "/professional-woman-developer.png",
    lastMessage: "I'm very interested in the ML Engineer position!",
    timestamp: "5 hours ago",
    unread: true,
  },
  {
    id: "m3",
    type: "investor",
    name: "a]6z Ventures",
    avatar: "/tech-venture-capital-logo.jpg",
    startup: "GreenGrid",
    lastMessage: "Impressive traction. Can you share your pitch deck?",
    timestamp: "1 day ago",
    unread: false,
  },
]

export const mockMessages: Message[] = [
  {
    id: "msg1",
    senderId: "m1",
    content: "Hi! We've been following NeuroPay's progress and are very impressed.",
    timestamp: "10:30 AM",
  },
  {
    id: "msg2",
    senderId: "me",
    content: "Thank you! We're excited about the opportunity to connect.",
    timestamp: "10:45 AM",
  },
  {
    id: "msg3",
    senderId: "m1",
    content: "We'd love to schedule a call to discuss your Series A plans.",
    timestamp: "11:00 AM",
  },
]
