"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { day: "Mon", views: 240, matches: 12 },
  { day: "Tue", views: 380, matches: 18 },
  { day: "Wed", views: 520, matches: 24 },
  { day: "Thu", views: 410, matches: 15 },
  { day: "Fri", views: 650, matches: 32 },
  { day: "Sat", views: 780, matches: 28 },
  { day: "Sun", views: 590, matches: 22 },
]

export function EngagementChart() {
  return (
    <Card className="glass border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Weekly Engagement</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.65 0.25 265)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.65 0.25 265)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorMatches" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.55 0.28 300)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.55 0.28 300)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" stroke="oklch(0.65 0.02 270)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="oklch(0.65 0.02 270)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.12 0.015 270)",
                border: "1px solid oklch(0.25 0.03 270)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "oklch(0.95 0.01 270)" }}
            />
            <Area
              type="monotone"
              dataKey="views"
              stroke="oklch(0.65 0.25 265)"
              fillOpacity={1}
              fill="url(#colorViews)"
            />
            <Area
              type="monotone"
              dataKey="matches"
              stroke="oklch(0.55 0.28 300)"
              fillOpacity={1}
              fill="url(#colorMatches)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
