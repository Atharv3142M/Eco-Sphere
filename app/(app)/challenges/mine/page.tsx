'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { BookOpen, Zap } from 'lucide-react'

const myChallenges = [
  {
    id: 'carbon-reduction',
    title: 'Carbon Reduction Champion',
    progress: 68,
    daysLeft: 9,
    xpReward: 250,
    status: 'in-progress',
  },
  {
    id: 'volunteer-hours',
    title: 'Volunteer Heroes',
    progress: 45,
    daysLeft: 34,
    xpReward: 150,
    status: 'in-progress',
  },
  {
    id: 'energy-efficiency',
    title: 'Energy Efficiency Expert',
    progress: 56,
    daysLeft: 22,
    xpReward: 200,
    status: 'in-progress',
  },
  {
    id: 'mentor',
    title: 'Sustainability Mentor',
    progress: 22,
    daysLeft: 64,
    xpReward: 300,
    status: 'in-progress',
  },
  {
    id: 'water-saving',
    title: 'Water Conservation Expert',
    progress: 0,
    daysLeft: 45,
    xpReward: 180,
    status: 'not-started',
  },
  {
    id: 'waste-reduction',
    title: 'Zero Waste Champion',
    progress: 32,
    daysLeft: 28,
    xpReward: 220,
    status: 'in-progress',
  },
]

export default function MyChallengesPage() {
  const inProgress = myChallenges.filter((c) => c.status === 'in-progress').length
  const notStarted = myChallenges.filter((c) => c.status === 'not-started').length

  return (
    <main className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">My Challenges</h1>
        <p className="text-foreground/60 mt-2">Track your personal ESG challenge progress</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{inProgress}</div>
            <p className="text-xs text-foreground/60 mt-2">active challenges</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Not Started</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{notStarted}</div>
            <p className="text-xs text-foreground/60 mt-2">available to join</p>
          </CardContent>
        </Card>
      </div>

      {/* Challenges List */}
      <div className="space-y-4">
        {myChallenges.map((challenge) => (
          <Card key={challenge.id} className={challenge.status === 'not-started' ? 'opacity-70' : ''}>
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <CardTitle>{challenge.title}</CardTitle>
                  </div>
                  <CardDescription>{challenge.daysLeft} days remaining</CardDescription>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 font-bold text-primary">
                    <Zap className="w-4 h-4" />
                    +{challenge.xpReward}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Progress</span>
                    <span className="font-semibold">{challenge.progress}%</span>
                  </div>
                  <Progress value={challenge.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <Badge variant={challenge.status === 'in-progress' ? 'secondary' : 'outline'}>
                    {challenge.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                  </Badge>
                  <Button variant="outline" size="sm">
                    {challenge.status === 'in-progress' ? 'Continue' : 'Join Challenge'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
