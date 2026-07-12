'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingDown, Leaf } from 'lucide-react'
import { useAuth } from '@/lib/auth/context'
import { getDepartmentStats } from '@/lib/esg-data'
import { Badge } from '@/components/ui/badge'

export function CarbonFootprintCard() {
  const { user } = useAuth()
  const dept = getDepartmentStats(user?.department)
  const reduction = 11.2

  return (
    <Card className="relative h-full overflow-hidden">
      <div className="pointer-events-none absolute -right-6 -top-6 size-32 rounded-full bg-primary/10" />
      <CardHeader>
        <CardTitle>Carbon Footprint</CardTitle>
        <CardDescription>{dept.name} department emissions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end gap-3">
          <div>
            <div className="font-numeric text-4xl font-bold">{dept.carbonTco2e}</div>
            <div className="text-sm text-muted-foreground">tCO₂e this month</div>
          </div>
          <div className="mb-1 flex size-14 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
            <Leaf className="size-7 text-primary" />
          </div>
        </div>
        <Badge variant="secondary" className="gap-1 text-success">
          <TrendingDown className="size-3.5" />
          ↓ {reduction}% vs last month
        </Badge>
        <p className="text-xs text-muted-foreground">
          Target: {(dept.carbonTco2e * 0.85).toFixed(1)} tCO₂e by year end
        </p>
      </CardContent>
    </Card>
  )
}
