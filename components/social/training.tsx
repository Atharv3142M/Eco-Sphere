'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { BookOpen, Award, Clock, Users } from 'lucide-react'

const trainings = [
  {
    id: 'esg-fundamentals',
    title: 'ESG Fundamentals',
    description: 'Understanding Environmental, Social, and Governance principles',
    category: 'Mandatory',
    duration: '2 hours',
    enrolled: 342,
    completed: 289,
    status: 'active',
    deadline: '2024-08-31',
  },
  {
    id: 'sustainability',
    title: 'Sustainability in Business',
    description: 'How companies drive sustainable growth',
    category: 'Professional Development',
    duration: '3 hours',
    enrolled: 156,
    completed: 98,
    status: 'active',
    deadline: '2024-09-30',
  },
  {
    id: 'diversity',
    title: 'Diversity, Equity & Inclusion',
    description: 'Creating an inclusive workplace culture',
    category: 'Mandatory',
    duration: '1.5 hours',
    enrolled: 850,
    completed: 723,
    status: 'active',
    deadline: '2024-08-15',
  },
  {
    id: 'data-privacy',
    title: 'Data Privacy & Security',
    description: 'Protecting customer and company data',
    category: 'Mandatory',
    duration: '1 hour',
    enrolled: 850,
    completed: 801,
    status: 'completed',
    deadline: '2024-07-01',
  },
  {
    id: 'ethics',
    title: 'Business Ethics & Compliance',
    description: 'Ethical decision-making in business',
    category: 'Mandatory',
    duration: '2 hours',
    enrolled: 200,
    completed: 45,
    status: 'upcoming',
    deadline: '2024-09-15',
  },
]

const categoryBadges = {
  'Mandatory': 'default',
  'Professional Development': 'secondary',
}

export function Training() {
  const totalEnrolled = trainings.reduce((sum, t) => sum + t.enrolled, 0)
  const totalCompleted = trainings.reduce((sum, t) => sum + t.completed, 0)

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Total Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{trainings.length}</div>
            <p className="text-xs text-foreground/60 mt-2">available programs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="w-4 h-4" />
              Total Enrolled
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalEnrolled}</div>
            <p className="text-xs text-foreground/60 mt-2">enrollments across all</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Award className="w-4 h-4" />
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-social">{Math.round((totalCompleted / totalEnrolled) * 100)}%</div>
            <p className="text-xs text-foreground/60 mt-2">{totalCompleted} completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Training Courses */}
      <div className="space-y-4">
        {trainings.map((training) => {
          const completionRate = Math.round((training.completed / training.enrolled) * 100)

          return (
            <Card key={training.id}>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle>{training.title}</CardTitle>
                      <Badge variant={categoryBadges[training.category as keyof typeof categoryBadges] || 'outline'}>
                        {training.category}
                      </Badge>
                    </div>
                    <CardDescription>{training.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-social">{completionRate}%</p>
                    <p className="text-xs text-foreground/60">complete</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>{training.completed}</span>
                    <span className="text-foreground/60">of {training.enrolled}</span>
                  </div>
                  <Progress value={completionRate} className="h-2" />
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-border">
                  <div>
                    <p className="text-xs text-foreground/60">Duration</p>
                    <p className="text-sm font-medium flex items-center gap-1 mt-1">
                      <Clock className="w-4 h-4" />
                      {training.duration}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60">Status</p>
                    <Badge variant={training.status === 'completed' ? 'default' : training.status === 'active' ? 'secondary' : 'outline'} className="mt-1">
                      {training.status === 'active' ? 'Active' : training.status === 'completed' ? 'Completed' : 'Upcoming'}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60">Deadline</p>
                    <p className="text-sm font-medium mt-1">{new Date(training.deadline).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-end">
                    <Button variant="outline" size="sm" className="w-full">
                      {training.status === 'completed' ? 'Review' : 'Enroll'}
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
