'use client'

import Link from 'next/link'
import { Leaf, Scale, Users, TrendingUp, TrendingDown } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { ScoreRing } from './score-ring'
import { AnimatedNumber } from './animated-number'
import { useAuth } from '@/lib/auth/context'
import { getDepartmentStats, getOrganizationScores } from '@/lib/esg-data'
import { cn } from '@/lib/utils'

function DeltaPill({ delta }: { delta: number }) {
  const positive = delta >= 0
  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium',
        positive ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger',
      )}
    >
      {positive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
      {positive ? '+' : ''}
      {delta}% vs last month
    </span>
  )
}

export function EsgScoreCards() {
  const { user } = useAuth()
  const org = getOrganizationScores()
  const dept = getDepartmentStats(user?.department)

  const modules = [
    {
      key: 'environmental',
      label: 'Environmental',
      icon: Leaf,
      value: org.environmental,
      delta: org.environmentalDelta,
      color: 'var(--env)',
      href: '/environmental',
    },
    {
      key: 'social',
      label: 'Social',
      icon: Users,
      value: org.social,
      delta: org.socialDelta,
      color: 'var(--social)',
      href: '/social',
    },
    {
      key: 'governance',
      label: 'Governance',
      icon: Scale,
      value: org.governance,
      delta: org.governanceDelta,
      color: 'var(--gov)',
      href: '/governance',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
      <Card className="relative overflow-hidden xl:col-span-2">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="relative flex flex-col items-center gap-4 p-6 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Overall ESG Score
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <AnimatedNumber
                value={org.overall}
                decimals={0}
                className="font-numeric text-4xl font-bold tabular-nums"
              />
              <span className="text-lg text-muted-foreground">/ 100</span>
            </div>
            <div className="mt-2">
              <DeltaPill delta={org.deltaMonth} />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Your department ({dept.name}): <strong className="text-foreground">{dept.score}</strong>
            </p>
          </div>
          <ScoreRing value={org.overall} size={140} strokeWidth={12} color="var(--primary)">
            <span className="font-numeric text-3xl font-bold">{Math.round(org.overall)}</span>
          </ScoreRing>
        </div>
      </Card>

      {modules.map((m) => (
        <Link key={m.key} href={m.href}>
          <Card className="group h-full transition-colors hover:border-primary/40 hover:bg-accent/20">
            <div className="flex flex-col items-center gap-3 p-5">
              <ScoreRing value={m.value} size={72} strokeWidth={7} color={m.color}>
                <span className="font-numeric text-base font-bold">{m.value}</span>
              </ScoreRing>
              <div className="flex items-center gap-1.5">
                <m.icon className="size-4" style={{ color: m.color }} />
                <span className="text-sm font-medium">{m.label}</span>
              </div>
              <DeltaPill delta={m.delta} />
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
