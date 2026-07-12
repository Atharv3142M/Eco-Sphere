'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Factory, Truck, Zap, Package, Trash2, TrendingUp, TrendingDown } from 'lucide-react'

const emissionSources = [
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    icon: Factory,
    emissions: 134,
    percentage: 42,
    trend: -12,
    status: 'improving',
    breakdown: [
      { facility: 'Factory A', emissions: 67, trend: -15 },
      { facility: 'Factory B', emissions: 45, trend: -8 },
      { facility: 'Factory C', emissions: 22, trend: -5 },
    ],
  },
  {
    id: 'fleet',
    name: 'Fleet & Logistics',
    icon: Truck,
    emissions: 89,
    percentage: 28,
    trend: -18,
    status: 'improving',
    breakdown: [
      { facility: 'Delivery Fleet', emissions: 56, trend: -20 },
      { facility: 'Business Travel', emissions: 22, trend: -12 },
      { facility: 'Commuting', emissions: 11, trend: -8 },
    ],
  },
  {
    id: 'energy',
    name: 'Energy & Utilities',
    icon: Zap,
    emissions: 57,
    percentage: 18,
    trend: -8,
    status: 'stable',
    breakdown: [
      { facility: 'Electricity', emissions: 38, trend: -10 },
      { facility: 'Natural Gas', emissions: 14, trend: -3 },
      { facility: 'Steam', emissions: 5, trend: -2 },
    ],
  },
  {
    id: 'purchases',
    name: 'Purchased Goods & Services',
    icon: Package,
    emissions: 25,
    percentage: 8,
    trend: -5,
    status: 'stable',
    breakdown: [
      { facility: 'Raw Materials', emissions: 15, trend: -6 },
      { facility: 'Services', emissions: 7, trend: -2 },
      { facility: 'Packaging', emissions: 3, trend: -1 },
    ],
  },
  {
    id: 'waste',
    name: 'Waste & Recycling',
    icon: Trash2,
    emissions: 13,
    percentage: 4,
    trend: -20,
    status: 'improving',
    breakdown: [
      { facility: 'Landfill Waste', emissions: 8, trend: -25 },
      { facility: 'Recycling', emissions: 3, trend: -10 },
      { facility: 'Wastewater', emissions: 2, trend: -8 },
    ],
  },
]

export function EmissionSources() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {emissionSources.map((source) => {
          const Icon = source.icon
          const isImproving = source.trend < 0
          const TrendIcon = isImproving ? TrendingDown : TrendingUp

          return (
            <Card key={source.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-environment/10 rounded-lg">
                      <Icon className="w-5 h-5 text-environment" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {source.name}
                        <Badge variant={source.status === 'improving' ? 'default' : 'secondary'}>
                          {source.status === 'improving' ? 'Improving' : 'Stable'}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{source.percentage}% of total emissions</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{source.emissions}</p>
                    <p className="text-xs text-foreground/60">mtCO₂e/mo</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Monthly Target</span>
                    <span className={`text-sm font-medium flex items-center gap-1 ${isImproving ? 'text-environment' : 'text-warning'}`}>
                      <TrendIcon className="w-4 h-4" />
                      {Math.abs(source.trend)}%
                    </span>
                  </div>
                  <Progress value={source.percentage} className="h-2" />
                </div>

                {/* Breakdown Table */}
                <div>
                  <h4 className="text-sm font-semibold mb-3">Facility Breakdown</h4>
                  <div className="space-y-2">
                    {source.breakdown.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-3 gap-2 text-sm p-2 bg-background/50 rounded">
                        <div className="font-medium">{item.facility}</div>
                        <div className="text-right">
                          <span className="font-semibold">{item.emissions}</span>
                          <span className="text-foreground/60"> mtCO₂e</span>
                        </div>
                        <div className={`text-right flex items-center justify-end gap-1 ${item.trend < 0 ? 'text-environment' : 'text-warning'}`}>
                          <TrendingDown className="w-3 h-3" />
                          {Math.abs(item.trend)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
