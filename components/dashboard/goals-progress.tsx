'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/lib/auth/context'
import { getDepartmentStats, getOrganizationScores } from '@/lib/esg-data'
import { Leaf, Users, Scale } from 'lucide-react'

export function GoalsProgress() {
  const { user } = useAuth()
  const dept = getDepartmentStats(user?.department)
  const org = getOrganizationScores()

  const goals = [
    { label: 'Environmental', value: Math.round(dept.environmental * 0.9), icon: Leaf, color: 'text-env' },
    { label: 'Social', value: Math.round(dept.social * 0.85), icon: Users, color: 'text-social' },
    { label: 'Governance', value: Math.round(dept.governance * 0.88), icon: Scale, color: 'text-gov' },
  ]

  const overall = Math.round((goals[0].value + goals[1].value + goals[2].value) / 3)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Goals Progress</CardTitle>
        <CardDescription>{dept.name} department sustainability targets</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <div className="relative flex size-36 items-center justify-center">
          <svg className="size-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/30" />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${overall * 2.64} 264`}
            />
          </svg>
          <div className="absolute text-center">
            <div className="font-numeric text-3xl font-bold">{overall}%</div>
            <div className="text-xs text-muted-foreground">Overall</div>
          </div>
        </div>
        <div className="grid w-full grid-cols-3 gap-3 text-center">
          {goals.map((g) => (
            <div key={g.label} className="rounded-lg border border-border bg-muted/30 p-2">
              <g.icon className={`mx-auto mb-1 size-4 ${g.color}`} />
              <div className="font-numeric text-lg font-bold">{g.value}%</div>
              <div className="text-[10px] text-muted-foreground">{g.label}</div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground">
          Organization avg. ESG: {org.overall}/100
        </p>
      </CardContent>
    </Card>
  )
}
