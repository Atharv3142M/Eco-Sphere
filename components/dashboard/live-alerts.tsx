'use client'

import Link from 'next/link'
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  XCircle,
  type LucideIcon,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LIVE_ALERTS } from '@/lib/esg-data'
import type { InsightSeverity } from '@/lib/types'
import { cn } from '@/lib/utils'

const SEVERITY: Record<InsightSeverity, { icon: LucideIcon; className: string }> = {
  info: { icon: Info, className: 'bg-info/15 text-info' },
  success: { icon: CheckCircle2, className: 'bg-success/15 text-success' },
  warning: { icon: AlertTriangle, className: 'bg-warning/15 text-warning' },
  danger: { icon: XCircle, className: 'bg-danger/15 text-danger' },
}

export function LiveAlerts() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Live Alerts</CardTitle>
        <Link href="/governance/compliance" className="text-xs font-medium text-primary hover:underline">
          View all →
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {LIVE_ALERTS.map((alert) => {
          const { icon: Icon, className } = SEVERITY[alert.severity]
          return (
            <div
              key={alert.id}
              className="flex gap-3 rounded-xl border border-border p-3 transition-colors hover:bg-accent/30"
            >
              <span
                className={cn(
                  'flex size-8 shrink-0 items-center justify-center rounded-full [&_svg]:size-4',
                  className,
                )}
              >
                <Icon />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium">{alert.title}</p>
                <p className="text-xs text-muted-foreground">{alert.detail}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground/70">{alert.time}</p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
