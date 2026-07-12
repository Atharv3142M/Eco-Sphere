"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { ArrowDown, ArrowUp, Minus } from "lucide-react"
import { getDepartmentRankings } from '@/lib/esg-data'

const rankStyles = [
  "bg-[oklch(0.85_0.15_90)] text-[oklch(0.35_0.1_90)]",
  "bg-muted text-muted-foreground",
  "bg-[oklch(0.8_0.09_50)] text-[oklch(0.35_0.08_50)]",
]

export function DepartmentRankings() {
  const departmentRankings = getDepartmentRankings()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Leaderboard</CardTitle>
        <CardDescription>Ranked by overall ESG score this quarter</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {departmentRankings.map((dept, i) => (
          <div key={dept.name} className="flex items-center gap-3">
            <div
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                rankStyles[i] ?? "bg-muted text-muted-foreground",
              )}
            >
              {i + 1}
            </div>
            <Avatar className="size-9">
              <AvatarFallback className="text-xs">
                {dept.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-medium">{dept.name}</span>
                <span className="text-sm font-semibold tabular-nums">{dept.score}</span>
              </div>
              <Progress value={dept.score} className="h-1.5" />
            </div>
            <Badge
              variant="outline"
              className={cn(
                "shrink-0 gap-0.5 tabular-nums",
                dept.trend > 0 && "text-eco-environment",
                dept.trend < 0 && "text-destructive",
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
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
