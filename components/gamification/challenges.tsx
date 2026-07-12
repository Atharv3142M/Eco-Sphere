'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Trophy, Zap, Users, Award, Plus } from 'lucide-react'

const challenges = [
  {
    id: 'carbon-reduction',
    title: 'Carbon Reduction Champion',
    description: 'Reduce personal carbon footprint by 25%',
    category: 'Environmental',
    difficulty: 'hard',
    duration: '30 days',
    participants: 234,
    progress: 68,
    reward: 250,
    icon: Zap,
    status: 'active',
  },
  {
    id: 'volunteer-hours',
    title: 'Volunteer Heroes',
    description: 'Complete 10 hours of volunteer work',
    category: 'Social',
    difficulty: 'medium',
    duration: '60 days',
    participants: 156,
    progress: 45,
    reward: 150,
    icon: Users,
    status: 'active',
  },
  {
    id: 'policy-compliance',
    title: 'Policy Compliance',
    description: 'Complete all mandatory compliance training',
    category: 'Governance',
    difficulty: 'easy',
    duration: '14 days',
    participants: 789,
    progress: 92,
    reward: 50,
    icon: Award,
    status: 'active',
  },
  {
    id: 'sustainability-mentor',
    title: 'Sustainability Mentor',
    description: 'Mentor 3 colleagues on ESG practices',
    category: 'Environmental',
    difficulty: 'hard',
    duration: '90 days',
    participants: 67,
    progress: 22,
    reward: 300,
    icon: Trophy,
    status: 'upcoming',
  },
  {
    id: 'energy-efficiency',
    title: 'Energy Efficiency Expert',
    description: 'Identify and implement 5 energy-saving measures',
    category: 'Environmental',
    difficulty: 'medium',
    duration: '45 days',
    participants: 112,
    progress: 56,
    reward: 200,
    icon: Zap,
    status: 'active',
  },
]

const difficultyColors = {
  easy: 'bg-environment/10 text-environment',
  medium: 'bg-warning/10 text-warning',
  hard: 'bg-destructive/10 text-destructive',
}

export function Challenges() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Active Challenges</h2>
          <p className="text-foreground/60 mt-1">Engage with gamified ESG challenges</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Challenge
        </Button>
      </div>

      <div className="space-y-4">
        {challenges.map((challenge) => {
          const Icon = challenge.icon

          return (
            <Card key={challenge.id} className={`${challenge.status === 'upcoming' ? 'opacity-60' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle>{challenge.title}</CardTitle>
                        <Badge variant={challenge.status === 'active' ? 'secondary' : 'outline'}>
                          {challenge.status === 'active' ? 'Active' : 'Upcoming'}
                        </Badge>
                      </div>
                      <CardDescription>{challenge.description}</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{challenge.reward}</p>
                    <p className="text-xs text-foreground/60">XP Reward</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Progress</span>
                    <span className="font-semibold">{challenge.progress}%</span>
                  </div>
                  <Progress value={challenge.progress} className="h-2" />
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-2 border-t border-border">
                  <div>
                    <p className="text-xs text-foreground/60">Category</p>
                    <Badge variant="outline" className="mt-1">
                      {challenge.category}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60">Difficulty</p>
                    <Badge className={`mt-1 ${difficultyColors[challenge.difficulty as keyof typeof difficultyColors]}`}>
                      {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60">Duration</p>
                    <p className="text-sm font-medium mt-1">{challenge.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60">Participants</p>
                    <p className="text-sm font-medium mt-1 flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {challenge.participants}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      {challenge.status === 'active' ? 'View' : 'Learn More'}
                    </Button>
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
