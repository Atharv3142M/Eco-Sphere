'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, AlertCircle, Clock, Target } from 'lucide-react'

const goals = [
  {
    id: 'net-zero-2030',
    title: 'Net-Zero Emissions (2030)',
    description: 'Achieve net-zero Scope 1 & 2 emissions',
    target: 0,
    current: 320,
    status: 'on-track',
    progress: 65,
    initiatives: 5,
    deadline: '2030',
    lastUpdate: '2 days ago',
    initiatives_list: [
      { name: 'Renewable energy transition', status: 'in-progress', progress: 75 },
      { name: 'Fleet electrification', status: 'in-progress', progress: 45 },
      { name: 'Facility upgrades', status: 'completed', progress: 100 },
      { name: 'Supplier engagement', status: 'in-progress', progress: 60 },
      { name: 'Carbon offset program', status: 'planned', progress: 0 },
    ],
  },
  {
    id: 'scope3-reduction',
    title: 'Scope 3 Emissions Reduction',
    description: 'Reduce purchased goods emissions by 50%',
    target: 50,
    current: 89,
    status: 'on-track',
    progress: 44,
    initiatives: 3,
    deadline: '2028',
    lastUpdate: '1 week ago',
    initiatives_list: [
      { name: 'Supplier decarbonization', status: 'in-progress', progress: 40 },
      { name: 'Material substitution', status: 'in-progress', progress: 50 },
      { name: 'Logistics optimization', status: 'in-progress', progress: 35 },
    ],
  },
  {
    id: 'renewable-energy',
    title: 'Renewable Energy Target',
    description: '100% renewable electricity by 2027',
    target: 100,
    current: 62,
    status: 'on-track',
    progress: 62,
    initiatives: 2,
    deadline: '2027',
    lastUpdate: '3 days ago',
    initiatives_list: [
      { name: 'Solar panel installation', status: 'in-progress', progress: 70 },
      { name: 'Wind energy contracts', status: 'in-progress', progress: 55 },
    ],
  },
  {
    id: 'water-reduction',
    title: 'Water Usage Reduction',
    description: 'Reduce water consumption by 40%',
    target: 40,
    current: 28,
    status: 'at-risk',
    progress: 70,
    initiatives: 2,
    deadline: '2026',
    lastUpdate: '5 days ago',
    initiatives_list: [
      { name: 'Water recycling systems', status: 'planned', progress: 0 },
      { name: 'Facility audits', status: 'in-progress', progress: 80 },
    ],
  },
]

const statusConfig = {
  'on-track': { icon: CheckCircle2, color: 'text-environment', badge: 'On Track' },
  'at-risk': { icon: AlertCircle, color: 'text-warning', badge: 'At Risk' },
  'completed': { icon: CheckCircle2, color: 'text-environment', badge: 'Completed' },
}

export function SustainabilityGoals() {
  return (
    <div className="space-y-6">
      {goals.map((goal) => {
        const config = statusConfig[goal.status as keyof typeof statusConfig]
        const StatusIcon = config.icon

        return (
          <Card key={goal.id}>
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle>{goal.title}</CardTitle>
                    <Badge variant={goal.status === 'on-track' ? 'default' : 'destructive'}>
                      {config.badge}
                    </Badge>
                  </div>
                  <CardDescription>{goal.description}</CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">{goal.progress}%</p>
                  <p className="text-xs text-foreground/60">Complete</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <Progress value={goal.progress} className="h-3" />
                <div className="flex justify-between mt-2 text-xs text-foreground/60">
                  <span>Target: {goal.target}</span>
                  <span>Current: {goal.current}</span>
                  <span>Deadline: {goal.deadline}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Initiatives */}
              <div>
                <h4 className="text-sm font-semibold mb-3">Strategic Initiatives</h4>
                <div className="space-y-3">
                  {goal.initiatives_list.map((initiative, idx) => (
                    <div key={idx} className="p-3 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm">{initiative.name}</p>
                        <Badge variant={initiative.status === 'completed' ? 'default' : initiative.status === 'in-progress' ? 'secondary' : 'outline'}>
                          {initiative.status === 'in-progress'
                            ? 'In Progress'
                            : initiative.status === 'completed'
                              ? 'Completed'
                              : 'Planned'}
                        </Badge>
                      </div>
                      <Progress value={initiative.progress} className="h-2" />
                      <p className="text-xs text-foreground/60 mt-2">{initiative.progress}% complete</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meta Info */}
              <div className="pt-3 border-t border-border">
                <p className="text-xs text-foreground/60">Last updated {goal.lastUpdate}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
