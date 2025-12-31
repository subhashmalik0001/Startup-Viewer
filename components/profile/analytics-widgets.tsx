"use client"

import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"

const engagementData = [
    { name: "Mon", matches: 6, views: 24 },
    { name: "Tue", matches: 8, views: 35 },
    { name: "Wed", matches: 12, views: 45 },
    { name: "Thu", matches: 9, views: 30 },
    { name: "Fri", matches: 15, views: 55 },
    { name: "Sat", matches: 10, views: 40 },
    { name: "Sun", matches: 18, views: 60 },
]

const recruitmentData = [
    { stage: "Applied", candidates: 153 },
    { stage: "Screening", candidates: 68 },
    { stage: "Interview", candidates: 25 },
    { stage: "Offer", candidates: 5 },
    { stage: "Hired", candidates: 2 },
]

export function EngagementChart() {
    return (
        <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementData}>
                    <defs>
                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorMatches" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                        contentStyle={{ backgroundColor: "#000", border: "none", borderRadius: "8px", color: "#fff" }}
                        itemStyle={{ color: "#fff" }}
                    />
                    <Area type="monotone" dataKey="views" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorViews)" strokeWidth={2} />
                    <Area type="monotone" dataKey="matches" stroke="#ec4899" fillOpacity={1} fill="url(#colorMatches)" strokeWidth={2} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export function RecruitmentFunnel() {
    return (
        <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={recruitmentData} layout="vertical" barSize={20}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.1} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="stage" type="category" width={80} fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                        contentStyle={{ backgroundColor: "#000", border: "none", borderRadius: "8px", color: "#fff" }}
                        cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                    />
                    <Bar dataKey="candidates" fill="#3b82f6" radius={[0, 4, 4, 0]} animationDuration={1500} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export function StatCard({ title, value, subtext, icon: Icon, delay = 0, trend }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
        >
            <Card className="glass border-border/50 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{title}</p>
                            <h3 className="text-2xl font-bold mt-2">{value}</h3>
                            {subtext && <p className="text-xs text-muted-foreground mt-1">{subtext}</p>}
                        </div>
                        <div className={`p-3 rounded-xl bg-primary/5 ${trend === 'up' ? 'text-green-500' : 'text-primary'}`}>
                            <Icon className="h-5 w-5" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
