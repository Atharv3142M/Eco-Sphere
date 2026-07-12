'use client'

import * as React from 'react'
import { Flame } from 'lucide-react'
import { CURRENT_USER } from '@/lib/mock-data'

function greeting(hour: number) {
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export function GreetingHeader() {
  const [salutation, setSalutation] = React.useState('Good morning')

  React.useEffect(() => {
    setSalutation(greeting(new Date().getHours()))
  }, [])

  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-pretty font-heading text-2xl font-semibold">
          {salutation}, {CURRENT_USER.firstName}
        </h2>
        <p className="text-sm text-muted-foreground">
          Here&apos;s how {CURRENT_USER.department} and your organization are
          tracking today.
        </p>
      </div>
      <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
        <Flame className="size-4 text-warning" />
        <span className="text-sm font-medium">
          {CURRENT_USER.streak}-day streak
        </span>
      </div>
    </div>
  )
}
