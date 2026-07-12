'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Medal, TrendingUp } from 'lucide-react'
import { useAuth } from '@/lib/auth/context'

const BASE_LEADERBOARD = [
  { rank: 1, name: 'Daniel Rajput', seed: 'daniel', xp: 8750, level: 15, badges: 12, trend: 'up' as const, change: 2 },
  { rank: 2, name: 'Mike Rodriguez', seed: 'mike', xp: 8420, level: 14, badges: 11, trend: 'down' as const, change: 1 },
  { rank: 3, name: 'Emma Wilson', seed: 'emma', xp: 7890, level: 13, badges: 10, trend: 'up' as const, change: 3 },
  { rank: 4, name: 'Alex Johnson', seed: 'alex', xp: 7340, level: 12, badges: 9, trend: 'down' as const, change: 2 },
  { rank: 5, name: 'Lisa Anderson', seed: 'lisa', xp: 6890, level: 11, badges: 8, trend: 'up' as const, change: 1 },
  { rank: 6, name: 'James Park', seed: 'james', xp: 6450, level: 10, badges: 7, trend: 'stable' as const, change: 0 },
  { rank: 7, name: 'Diana Martinez', seed: 'diana', xp: 5980, level: 9, badges: 6, trend: 'down' as const, change: 1 },
  { rank: 8, name: 'Robert Kim', seed: 'robert', xp: 5420, level: 8, badges: 5, trend: 'up' as const, change: 2 },
]

export function Leaderboard() {
  const { user } = useAuth()

  const currentUserEntry = user
    ? {
        rank: 3,
        name: user.name,
        seed: user.email,
        xp: user.xp ?? 0,
        level: user.level ?? 1,
        badges: 6,
        trend: 'up' as const,
        change: 1,
      }
    : BASE_LEADERBOARD[2]

  const leaderboardData = BASE_LEADERBOARD.map((entry) =>
    user && entry.rank === currentUserEntry.rank
      ? { ...currentUserEntry, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}` }
      : { ...entry, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.seed}` },
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Global Leaderboard</h2>
        <p className="mt-1 text-muted-foreground">Top ESG champions in your organization — July 2026</p>
      </div>

      <Card className="border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Medal className="size-5" />Your Rank</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="size-12">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email ?? 'guest'}`} />
                <AvatarFallback>{currentUserEntry.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{currentUserEntry.name}</p>
                <p className="text-sm text-muted-foreground">Level {currentUserEntry.level}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 text-right">
              <div><p className="font-numeric text-2xl font-bold">{currentUserEntry.xp.toLocaleString()}</p><p className="text-xs text-muted-foreground">XP</p></div>
              <div><p className="font-numeric text-2xl font-bold">#{currentUserEntry.rank}</p><p className="text-xs text-muted-foreground">Rank</p></div>
              <div><p className="font-numeric text-2xl font-bold">{currentUserEntry.badges}</p><p className="text-xs text-muted-foreground">Badges</p></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
          <CardDescription>This month&apos;s leading ESG contributors</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {leaderboardData.map((entry) => (
            <div key={entry.rank} className="flex items-center justify-between rounded-lg border border-border p-3 transition hover:bg-accent/30">
              <div className="flex flex-1 items-center gap-3">
                <div className="w-8 text-center font-bold">
                  {entry.rank <= 3 ? ['🥇', '🥈', '🥉'][entry.rank - 1] : entry.rank}
                </div>
                <Avatar className="size-10">
                  <AvatarImage src={entry.avatar} />
                  <AvatarFallback>{entry.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{entry.name}{user?.name === entry.name ? ' (You)' : ''}</p>
                  <p className="text-xs text-muted-foreground">Level {entry.level}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="font-bold">{entry.xp.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">XP</p>
                </div>
                <span>🏅 {entry.badges}</span>
                {entry.trend === 'up' && <Badge className="gap-1"><TrendingUp className="size-3" />+{entry.change}</Badge>}
                {entry.trend === 'down' && <Badge variant="secondary">↓ {entry.change}</Badge>}
                {entry.trend === 'stable' && <Badge variant="outline">−</Badge>}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
