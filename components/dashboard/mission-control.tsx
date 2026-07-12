'use client'

import { Leaf, Scale, Users, TrendingUp, TrendingDown } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { ScoreRing } from './score-ring'
import { AnimatedNumber } from './animated-number'
import { ESG_SCORE } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const MODULES = [
  {
    key: 'environmental',
    label: 'Environment',
    icon: Leaf,
    value: ESG_SCORE.environmental,
    delta: ESG_SCORE.environmentalDelta,
    color: 'var(--env)',
    href: '/environmental',
  },
  {
    key: 'social',
    label: 'Social',
    icon: Users,
    value: ESG_SCORE.social,
    delta: ESG_SCORE.socialDelta,
    color: 'var(--social)',
    href: '/social',
  },
  {
    key: 'governance',
    label: 'Governance',
    icon: Scale,
    value: ESG_SCORE.governance,
    delta: ESG_SCORE.governanceDelta,
    color: 'var(--gov)',
    href: '/governance',
  },
]

function DeltaPill({ delta }: { delta: number }) {
  const positive = delta >= 0
  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-medium',
        positive
          ? 'bg-success/10 text-success'
          : 'bg-danger/10 text-danger',
      )}
    >
      {positive ? (
        <TrendingUp className="size-3" />
      ) : (
        <TrendingDown className="size-3" />
      )}
      {positive ? '+' : ''}
      {delta}%
    </span>
  )
}

export function MissionControl() {
  return (
    <Card className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-accent/50 to-transparent" />
      <div className="relative flex flex-col items-center gap-8 px-6 py-8">
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Organization ESG Score
          </span>
        </div>

        {/* Central score */}
        <ScoreRing
          value={ESG_SCORE.overall}
          size={220}
          strokeWidth={16}
          decimals={1}
          color="var(--primary)"
        >
          <div className="flex flex-col items-center">
            <AnimatedNumber
              value={ESG_SCORE.overall}
              decimals={1}
              className="font-numeric text-5xl font-bold tabular-nums"
            />
            <span className="mt-1 text-sm font-medium text-muted-foreground">
              out of 100
            </span>
            <span className="mt-2">
              <DeltaPill delta={ESG_SCORE.deltaMonth} />
            </span>
          </div>
        </ScoreRing>

        {/* Connector */}
        <div className="grid w-full max-w-2xl grid-cols-3 gap-4">
          {MODULES.map((m) => (
            <a
              key={m.key}
              href={m.href}
              className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-4 text-center transition-colors hover:border-ring hover:bg-accent/40"
            >
              <ScoreRing
                value={m.value}
                size={84}
                strokeWidth={8}
                color={m.color}
              >
                <span className="font-numeric text-lg font-bold tabular-nums">
                  {m.value}
                </span>
              </ScoreRing>
              <div className="flex items-center gap-1.5">
                <m.icon className="size-4" style={{ color: m.color }} />
                <span className="text-sm font-medium">{m.label}</span>
              </div>
              <DeltaPill delta={m.delta} />
            </a>
          ))}
        </div>
      </div>
    </Card>
  )
}
