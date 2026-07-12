import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Sparkles,
  XCircle,
  type LucideIcon,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { INSIGHTS } from '@/lib/mock-data'
import type { InsightSeverity } from '@/lib/types'
import { cn } from '@/lib/utils'

const SEVERITY: Record<
  InsightSeverity,
  { icon: LucideIcon; className: string }
> = {
  info: { icon: Info, className: 'bg-info/10 text-info' },
  success: { icon: CheckCircle2, className: 'bg-success/10 text-success' },
  warning: { icon: AlertTriangle, className: 'bg-warning/10 text-warning' },
  danger: { icon: XCircle, className: 'bg-danger/10 text-danger' },
}

export function InsightsPanel() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          Quick Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {INSIGHTS.map((insight) => {
          const { icon: Icon, className } = SEVERITY[insight.severity]
          return (
            <div
              key={insight.id}
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
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="text-sm font-medium leading-snug">
                  {insight.title}
                </span>
                <span className="text-xs leading-relaxed text-muted-foreground">
                  {insight.detail}
                </span>
                <span className="text-[11px] text-muted-foreground/70">
                  {insight.time}
                </span>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
