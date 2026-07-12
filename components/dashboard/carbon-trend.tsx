"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { TrendingDown } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { carbonTrend } from "@/lib/mock-data"

const chartConfig = {
  actual: {
    label: "Actual Emissions",
    color: "var(--chart-1)",
  },
  target: {
    label: "Target",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

export function CarbonTrend() {
  const first = carbonTrend[0].actual
  const last = carbonTrend[carbonTrend.length - 1].actual
  const change = Math.round(((last - first) / first) * 100)

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <CardTitle>Carbon Emissions Trend</CardTitle>
          <CardDescription>
            Monthly tCO2e — actual vs. reduction target
          </CardDescription>
        </div>
        <Badge variant="secondary" className="gap-1 text-eco-environment">
          <TrendingDown className="size-3.5" />
          {change}% YTD
        </Badge>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[240px] w-full">
          <AreaChart data={carbonTrend} margin={{ left: 4, right: 8, top: 8 }}>
            <defs>
              <linearGradient id="fillActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-actual)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--color-actual)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={36}
              fontSize={12}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="target"
              type="monotone"
              stroke="var(--color-target)"
              strokeDasharray="5 5"
              strokeWidth={2}
              fill="none"
            />
            <Area
              dataKey="actual"
              type="monotone"
              stroke="var(--color-actual)"
              strokeWidth={2.5}
              fill="url(#fillActual)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
