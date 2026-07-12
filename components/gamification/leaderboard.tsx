'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Medal, TrendingUp } from 'lucide-react'

const leaderboardData = [
  {
    rank: 1,
    name: 'Sarah Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    xp: 8750,
    level: 15,
    badges: 12,
    trend: 'up',
    change: 2,
  },
  {
    rank: 2,
    name: 'Mike Rodriguez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
    xp: 8420,
    level: 14,
    badges: 11,
    trend: 'down',
    change: 1,
  },
  {
    rank: 3,
    name: 'Emma Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
    xp: 7890,
    level: 13,
    badges: 10,
    trend: 'up',
    change: 3,
  },
  {
    rank: 4,
    name: 'Alex Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    xp: 7340,
    level: 12,
    badges: 9,
    trend: 'down',
    change: 2,
  },
  {
    rank: 5,
    name: 'Lisa Anderson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa',
    xp: 6890,
    level: 11,
    badges: 8,
    trend: 'up',
    change: 1,
  },
  {
    rank: 6,
    name: 'James Park',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james',
    xp: 6450,
    level: 10,
    badges: 7,
    trend: 'stable',
    change: 0,
  },
  {
    rank: 7,
    name: 'Diana Martinez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=diana',
    xp: 5980,
    level: 9,
    badges: 6,
    trend: 'down',
    change: 1,
  },
  {
    rank: 8,
    name: 'Robert Kim',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=robert',
    xp: 5420,
    level: 8,
    badges: 5,
    trend: 'up',
    change: 2,
  },
]

const getRankMedal = (rank: number) => {
  switch (rank) {
    case 1:
      return '🥇'
    case 2:
      return '🥈'
    case 3:
      return '🥉'
    default:
      return ''
  }
}

export function Leaderboard() {
  const currentUser = leaderboardData[2]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Global Leaderboard</h2>
        <p className="text-foreground/60 mt-1">Top ESG champions in your organization</p>
      </div>

      {/* Your Rank Card */}
      <Card className="border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Medal className="w-5 h-5" />
            Your Rank
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback>{currentUser.name.split(' ')[0][0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{currentUser.name}</p>
                <p className="text-sm text-foreground/60">Level {currentUser.level}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 text-right">
              <div>
                <p className="text-2xl font-bold">{currentUser.xp}</p>
                <p className="text-xs text-foreground/60">XP</p>
              </div>
              <div>
                <p className="text-2xl font-bold">#{currentUser.rank}</p>
                <p className="text-xs text-foreground/60">Rank</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{currentUser.badges}</p>
                <p className="text-xs text-foreground/60">Badges</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
          <CardDescription>This month&apos;s leading ESG contributors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {leaderboardData.map((user) => (
              <div key={user.rank} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-background/50 transition">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 text-center font-bold">
                    {user.rank <= 3 ? (
                      <span className="text-lg">{getRankMedal(user.rank)}</span>
                    ) : (
                      <span className="text-lg">{user.rank}</span>
                    )}
                  </div>

                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.split(' ')[0][0]}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-foreground/60">Level {user.level}</p>
                  </div>
                </div>

                <div className="flex items-center gap-8 text-right">
                  <div>
                    <p className="font-bold">{user.xp}</p>
                    <p className="text-xs text-foreground/60">XP</p>
                  </div>

                  <div className="flex items-center gap-1">
                    {user.badges > 0 && (
                      <>
                        <span className="text-lg">🏅</span>
                        <span className="text-sm font-medium">{user.badges}</span>
                      </>
                    )}
                  </div>

                  <div className="w-16 flex items-center justify-end">
                    {user.trend === 'up' && (
                      <Badge variant="default" className="gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +{user.change}
                      </Badge>
                    )}
                    {user.trend === 'down' && (
                      <Badge variant="secondary" className="gap-1">
                        ↓ {user.change}
                      </Badge>
                    )}
                    {user.trend === 'stable' && (
                      <Badge variant="outline">−</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
