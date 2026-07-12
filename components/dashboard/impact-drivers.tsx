'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { IMPACT_DRIVERS } from '@/lib/esg-data'

const moduleColors = {
  environmental: 'bg-env',
  social: 'bg-social',
  governance: 'bg-gov',
}

export function ImpactDrivers() {
  const maxImpact = Math.max(...IMPACT_DRIVERS.map((d) => d.impact))

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Top ESG Impact Drivers</CardTitle>
        <CardDescription>Positive contributors this month</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {IMPACT_DRIVERS.map((driver) => (
          <div key={driver.name} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="truncate pr-2">{driver.name}</span>
              <span className="shrink-0 font-semibold text-success">+{driver.impact}</span>
            </div>
            <Progress
              value={(driver.impact / maxImpact) * 100}
              className={`h-2 ${moduleColors[driver.module]}`}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
