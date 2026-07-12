'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Trophy } from 'lucide-react'

const completed = [
  { title: 'Policy Compliance', completedDate: '2024-06-30', xpEarned: 50, difficulty: 'easy' },
  { title: 'First Steps', completedDate: '2024-06-15', xpEarned: 100, difficulty: 'medium' },
  { title: 'Carbon Conscious', completedDate: '2024-05-20', xpEarned: 200, difficulty: 'hard' },
  { title: 'Volunteer Hero', completedDate: '2024-05-01', xpEarned: 150, difficulty: 'medium' },
  { title: 'Green Guardian', completedDate: '2024-04-10', xpEarned: 175, difficulty: 'hard' },
  { title: 'Team Player', completedDate: '2024-03-25', xpEarned: 120, difficulty: 'medium' },
]

export default function CompletedPage() {
  const totalXP = completed.reduce((sum, c) => sum + c.xpEarned, 0)

  return (
    <main className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Completed Challenges</h1>
        <p className="text-foreground/60 mt-2">Your achievements and earned rewards</p>
      </div>

      <Card className="bg-primary/5 border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Total XP Earned
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-primary">{totalXP}</p>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {completed.map((item, idx) => (
          <Card key={idx}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-environment" />
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-xs text-foreground/60">Completed {new Date(item.completedDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge>{item.difficulty}</Badge>
                  <p className="font-bold text-primary text-lg">+{item.xpEarned}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
