'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingDown, Leaf, Target, Zap } from 'lucide-react'

const modules = [
  {
    title: 'Carbon Overview',
    description: 'View comprehensive emissions data and sustainability metrics',
    href: '/environmental/carbon',
    icon: TrendingDown,
    stats: '320 mtCO₂e/mo',
  },
  {
    title: 'Emission Sources',
    description: 'Detailed breakdown of emissions by facility and type',
    href: '/environmental/sources',
    icon: Leaf,
    stats: '5 major sources',
  },
  {
    title: 'Sustainability Goals',
    description: 'Track long-term targets and strategic initiatives',
    href: '/environmental/goals',
    icon: Target,
    stats: '4 active goals',
  },
  {
    title: 'Carbon Calculator',
    description: 'Calculate emissions from various activities',
    href: '/environmental/calculator',
    icon: Zap,
    stats: 'Interactive tool',
  },
]

export default function EnvironmentalPage() {
  return (
    <main className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Environmental Module</h1>
        <p className="text-foreground/60 mt-2">Manage carbon emissions and track sustainability progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((module) => {
          const Icon = module.icon
          return (
            <Card key={module.href} className="hover:border-primary/50 transition cursor-pointer">
              <Link href={module.href}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-environment/10 rounded-lg">
                        <Icon className="w-5 h-5 text-environment" />
                      </div>
                      <div>
                        <CardTitle>{module.title}</CardTitle>
                        <CardDescription className="mt-1">{module.description}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-environment">{module.stats}</p>
                    <Button variant="ghost" size="sm">
                      Explore →
                    </Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
          )
        })}
      </div>
    </main>
  )
}
