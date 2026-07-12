'use client'

import * as React from 'react'
import { Flame, CalendarDays } from 'lucide-react'
import { useAuth } from '@/lib/auth/context'
import { getDepartmentStats } from '@/lib/esg-data'

function greeting(hour: number) {
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export function GreetingHeader() {
  const { user } = useAuth()
  const [salutation, setSalutation] = React.useState('Hello')

  React.useEffect(() => {
    setSalutation(greeting(new Date().getHours()))
  }, [])

  const firstName = user?.name.split(' ')[0] ?? 'there'
  const department = user?.department ?? 'your department'
  const deptStats = getDepartmentStats(user?.department)
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-2xl font-semibold md:text-3xl">
          {salutation}, {firstName} 👋
        </h2>
        <p className="text-sm text-muted-foreground">
          Here&apos;s what&apos;s happening with {department} and your organization today.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground sm:flex">
          <CalendarDays className="size-4 text-primary" />
          {today}
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
          <Flame className="size-4 text-warning" />
          <span className="text-sm font-medium">{user?.streak ?? 0}-day streak</span>
        </div>
        <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
          Dept. score: {deptStats.score}/100
        </div>
      </div>
    </div>
  )
}
