'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trophy, Target, Flame, Crown, Gift, Users } from 'lucide-react'
import { useAuth } from '@/lib/auth/context'
import { getUserGamificationStats } from '@/lib/esg-data'

const modules = [
  {
    title: 'ESG Leagues',
    description: 'Department vs department rankings and divisions',
    href: '/gamification/leagues',
    icon: Users,
  },
  {
    title: 'Weekly Missions',
    description: 'Complete missions and team quests for XP',
    href: '/gamification/missions',
    icon: Target,
  },
  {
    title: 'Streaks & Achievements',
    description: 'Track streaks and unlock secret badges',
    href: '/gamification/streaks',
    icon: Flame,
  },
  {
    title: 'Monthly Champion',
    description: 'Sustainability champion and CSR event calendar',
    href: '/gamification/champion',
    icon: Crown,
  },
  {
    title: 'Challenges',
    description: 'Active sustainability challenges',
    href: '/challenges',
    icon: Trophy,
  },
  {
    title: 'Rewards',
    description: 'Redeem XP for incentives',
    href: '/rewards',
    icon: Gift,
  },
]

export default function GamificationPage() {
  const { user } = useAuth()
  const stats = getUserGamificationStats(user?.id, user?.department)

  return (
    <main className="flex flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">Game On Hub</h1>
        <p className="mt-2 text-muted-foreground">
          Engage your team with leagues, missions, streaks, and rewards
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: 'Level', value: user?.level ?? stats.level },
          { label: 'XP', value: (user?.xp ?? stats.xp).toLocaleString() },
          { label: 'Streak', value: `${user?.streak ?? stats.streak} days` },
          { label: 'Dept. Rank', value: `#${stats.departmentRank}` },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6 text-center">
              <div className="font-numeric text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => {
          const Icon = module.icon
          return (
            <Card key={module.href} className="transition-colors hover:border-primary/40">
              <Link href={module.href}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <CardDescription className="mt-1">{module.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" size="sm" className="text-primary">
                    Explore →
                  </Button>
                </CardContent>
              </Link>
            </Card>
          )
        })}
      </div>
    </main>
  )
}
