'use client'

import { useTheme } from 'next-themes'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts'
import { ESG_TREND } from '@/lib/esg-data'

const chartConfig = {
  overall: { label: 'Overall', color: 'var(--primary)' },
  environmental: { label: 'Environmental', color: 'var(--env)' },
  social: { label: 'Social', color: 'var(--social)' },
  governance: { label: 'Governance', color: 'var(--gov)' },
} satisfies ChartConfig

export function EsgTrendChart() {
  const { resolvedTheme } = useTheme()
  const gridColor = resolvedTheme === 'dark' ? '#2a2a2a' : '#e5e7eb'
  const textColor = resolvedTheme === 'dark' ? '#9ca3af' : '#6b7280'

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>ESG Score Trend</CardTitle>
          <CardDescription>Performance across all pillars — last 6 months</CardDescription>
        </div>
        <Select defaultValue="6m">
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6m">Last 6 Months</SelectItem>
            <SelectItem value="3m">Last 3 Months</SelectItem>
            <SelectItem value="1y">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <LineChart data={ESG_TREND} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} stroke={gridColor} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke={textColor} />
            <YAxis domain={[70, 100]} tickLine={false} axisLine={false} width={32} fontSize={12} stroke={textColor} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Line type="monotone" dataKey="overall" stroke="var(--primary)" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="environmental" stroke="var(--env)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="social" stroke="var(--social)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="governance" stroke="var(--gov)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
