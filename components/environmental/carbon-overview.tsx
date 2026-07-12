'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingDown, AlertCircle, CheckCircle } from 'lucide-react'

const carbonData = [
  { month: 'Jan', emissions: 620, target: 600, reduction: 0 },
  { month: 'Feb', emissions: 540, target: 580, reduction: 13 },
  { month: 'Mar', emissions: 470, target: 560, reduction: 24 },
  { month: 'Apr', emissions: 430, target: 540, reduction: 31 },
  { month: 'May', emissions: 390, target: 520, reduction: 37 },
  { month: 'Jun', emissions: 355, target: 500, reduction: 43 },
  { month: 'Jul', emissions: 340, target: 480, reduction: 45 },
  { month: 'Aug', emissions: 320, target: 460, reduction: 48 },
]

const sourceBreakdown = [
  { name: 'Manufacturing', value: 42, emissions: 134 },
  { name: 'Fleet', value: 28, emissions: 89 },
  { name: 'Energy', value: 18, emissions: 57 },
  { name: 'Purchases', value: 8, emissions: 25 },
  { name: 'Waste', value: 4, emissions: 13 },
]

export function CarbonOverview() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground/70">Current Emissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">320</div>
            <p className="text-xs text-foreground/60 mt-2">mtCO₂e/month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground/70">YTD Reduction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-environment">48%</div>
            <p className="text-xs text-foreground/60 mt-2">vs baseline</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground/70">Target (2030)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">200</div>
            <p className="text-xs text-foreground/60 mt-2">mtCO₂e/month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground/70">On Track</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-8 h-8 text-environment" />
              <span className="text-sm">Yes</span>
            </div>
            <p className="text-xs text-foreground/60 mt-2">Beating goal</p>
          </CardContent>
        </Card>
      </div>

      {/* Emissions Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Emissions Trajectory</CardTitle>
          <CardDescription>Actual vs target emissions over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={carbonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-foreground-muted)" />
              <YAxis stroke="var(--color-foreground-muted)" />
              <Tooltip contentStyle={{ backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)' }} />
              <Legend />
              <Line type="monotone" dataKey="emissions" stroke="var(--color-environment)" strokeWidth={2} name="Actual" />
              <Line type="monotone" dataKey="target" stroke="var(--color-foreground-muted)" strokeWidth={2} strokeDasharray="5 5" name="Target" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Emission Sources */}
      <Card>
        <CardHeader>
          <CardTitle>Emission Sources Breakdown</CardTitle>
          <CardDescription>Current month composition by source</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sourceBreakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-foreground-muted)" />
              <YAxis stroke="var(--color-foreground-muted)" />
              <Tooltip contentStyle={{ backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)' }} />
              <Bar dataKey="emissions" fill="var(--color-environment)" name="mtCO₂e" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Source Details */}
      <Card>
        <CardHeader>
          <CardTitle>Source Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sourceBreakdown.map((source) => (
              <div key={source.name} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium">{source.name}</p>
                  <p className="text-sm text-foreground/60">{source.value}% of total</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-environment">{source.emissions}</p>
                  <p className="text-xs text-foreground/60">mtCO₂e</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
