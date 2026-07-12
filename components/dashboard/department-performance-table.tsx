'use client'

import { ArrowDown, ArrowUp, Minus } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getDepartmentRankings } from '@/lib/esg-data'
import { cn } from '@/lib/utils'

export function DepartmentPerformanceTable() {
  const departments = getDepartmentRankings()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Performance</CardTitle>
        <CardDescription>ESG scores by department this quarter</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="pb-3 pr-4 font-medium">Department</th>
              <th className="pb-3 px-2 font-medium">Env</th>
              <th className="pb-3 px-2 font-medium">Social</th>
              <th className="pb-3 px-2 font-medium">Gov</th>
              <th className="pb-3 px-2 font-medium">Total</th>
              <th className="pb-3 pl-2 font-medium">Trend</th>
            </tr>
          </thead>
          <tbody>
            {departments.slice(0, 6).map((dept) => (
              <tr key={dept.name} className="border-b border-border/60 last:border-0">
                <td className="py-3 pr-4 font-medium">{dept.name}</td>
                <td className="px-2 tabular-nums text-env">{dept.environmental}</td>
                <td className="px-2 tabular-nums text-social">{dept.social}</td>
                <td className="px-2 tabular-nums text-gov">{dept.governance}</td>
                <td className="px-2 font-semibold tabular-nums">{dept.score}</td>
                <td className="pl-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      'gap-0.5 tabular-nums',
                      dept.trend > 0 && 'border-success/30 text-success',
                      dept.trend < 0 && 'border-danger/30 text-danger',
                    )}
                  >
                    {dept.trend > 0 ? (
                      <ArrowUp className="size-3" />
                    ) : dept.trend < 0 ? (
                      <ArrowDown className="size-3" />
                    ) : (
                      <Minus className="size-3" />
                    )}
                    {Math.abs(dept.trend)}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
