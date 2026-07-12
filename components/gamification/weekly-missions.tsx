'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DynamicButton } from '@/components/ui/dynamic-button'
import { Progress } from '@/components/ui/progress'
import { Calendar, Users, Zap, Flag, Target } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const weeklyMissions = [
  {
    id: 'w1',
    title: 'Carbon Calculator Challenge',
    description: 'Calculate emissions for 3 business activities',
    reward: 150,
    difficulty: 'Easy',
    progress: 2,
    total: 3,
    icon: '🧮',
    deadline: '3 days',
  },
  {
    id: 'w2',
    title: 'Sustainability Report Review',
    description: 'Review and sign off on weekly ESG report',
    reward: 200,
    difficulty: 'Medium',
    progress: 1,
    total: 1,
    icon: '📊',
    deadline: '2 days',
  },
  {
    id: 'w3',
    title: 'Green Team Building',
    description: 'Organize 1 team eco-friendly initiative',
    reward: 250,
    difficulty: 'Hard',
    progress: 0,
    total: 1,
    icon: '🌱',
    deadline: '5 days',
  },
  {
    id: 'w4',
    title: 'Knowledge Share Session',
    description: 'Attend or lead ESG training webinar',
    reward: 100,
    difficulty: 'Easy',
    progress: 1,
    total: 1,
    icon: '📚',
    deadline: '1 day',
    completed: true,
  },
]

const teamQuests = [
  {
    id: 'tq1',
    name: 'Plastic-Free Week',
    description: 'Department-wide challenge to reduce plastic waste by 50%',
    target: 'Reduce plastic consumption',
    participants: 45,
    progress: 65,
    reward: 500,
    endsIn: '4 days',
    team: 'All Departments',
    icon: '♻️',
  },
  {
    id: 'tq2',
    name: 'Carbon Neutral Commute',
    description: 'Use sustainable transport for all commutes this week',
    target: 'Switch to eco-friendly transport',
    participants: 128,
    progress: 82,
    reward: 400,
    endsIn: '2 days',
    team: 'Transportation',
    icon: '🚲',
  },
  {
    id: 'tq3',
    name: 'Energy Audit Challenge',
    description: 'Identify and report energy-saving opportunities',
    target: 'Find cost-saving initiatives',
    participants: 32,
    progress: 45,
    reward: 600,
    endsIn: '6 days',
    team: 'Operations',
    icon: '⚡',
  },
]

const difficultyColors = {
  Easy: 'bg-green-100 text-green-900',
  Medium: 'bg-yellow-100 text-yellow-900',
  Hard: 'bg-red-100 text-red-900',
}

export function WeeklyMissions() {
  const [acceptedMissions, setAcceptedMissions] = useState<string[]>([])
  const [completedQuests, setCompletedQuests] = useState<string[]>(['tq2'])

  const handleAcceptMission = async (missionId: string) => {
    setAcceptedMissions(prev => [...prev, missionId])
    await new Promise(resolve => setTimeout(resolve, 800))
  }

  const handleCompleteQuest = async (questId: string) => {
    setCompletedQuests(prev => [...prev, questId])
    await new Promise(resolve => setTimeout(resolve, 1200))
  }

  return (
    <Tabs defaultValue="missions" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="missions" className="flex gap-2">
          <Target className="w-4 h-4" />
          Weekly Missions
        </TabsTrigger>
        <TabsTrigger value="quests" className="flex gap-2">
          <Users className="w-4 h-4" />
          Team Quests
        </TabsTrigger>
      </TabsList>

      <TabsContent value="missions" className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-primary" />
            This Week's Missions
          </h3>
          <p className="text-sm text-muted-foreground">Complete missions to earn XP and climb the leaderboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {weeklyMissions.map((mission) => {
            const isCompleted = mission.progress === mission.total
            const isAccepted = acceptedMissions.includes(mission.id)

            return (
              <Card key={mission.id} className={`flex flex-col ${isCompleted ? 'opacity-75' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-3xl">{mission.icon}</div>
                    <Badge className={difficultyColors[mission.difficulty as keyof typeof difficultyColors]}>
                      {mission.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{mission.title}</CardTitle>
                  <CardDescription className="text-sm">{mission.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold">{mission.progress}/{mission.total}</span>
                    </div>
                    <Progress value={(mission.progress / mission.total) * 100} className="h-2" />
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {mission.deadline}
                    </div>
                    <div className="flex items-center gap-1 font-semibold text-primary">
                      <Zap className="w-4 h-4" />
                      +{mission.reward} XP
                    </div>
                  </div>

                  {!mission.completed && (
                    <DynamicButton
                      className="w-full mt-2"
                      size="sm"
                      isLoading={isAccepted}
                      successText="Accepted!"
                      onClick={() => handleAcceptMission(mission.id)}
                    >
                      {isAccepted ? 'Accepted' : 'Accept Mission'}
                    </DynamicButton>
                  )}
                  {mission.completed && (
                    <Badge variant="default" className="w-full text-center py-1 justify-center">
                      ✓ Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </TabsContent>

      <TabsContent value="quests" className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-primary" />
            Active Team Quests
          </h3>
          <p className="text-sm text-muted-foreground">Join your team to complete challenges and earn group rewards</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {teamQuests.map((quest) => {
            const isCompleted = completedQuests.includes(quest.id)

            return (
              <Card key={quest.id} className="flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex gap-3 flex-1">
                      <div className="text-3xl">{quest.icon}</div>
                      <div>
                        <CardTitle className="text-base">{quest.name}</CardTitle>
                        <CardDescription className="text-sm">{quest.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">{quest.team}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{quest.participants} team members contributing</span>
                      <span className="font-semibold">{quest.progress}% complete</span>
                    </div>
                    <Progress value={quest.progress} className="h-2.5" />
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center py-2 bg-muted/50 rounded-lg">
                    <div>
                      <div className="text-xs text-muted-foreground">Target</div>
                      <div className="font-semibold">{quest.target}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Reward</div>
                      <div className="font-semibold flex items-center justify-center gap-1">
                        <Zap className="w-3 h-3" /> {quest.reward}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Ends In</div>
                      <div className="font-semibold">{quest.endsIn}</div>
                    </div>
                  </div>

                  {!isCompleted ? (
                    <DynamicButton
                      className="w-full"
                      isLoading={isCompleted}
                      successText="Quest Completed!"
                      onClick={() => handleCompleteQuest(quest.id)}
                    >
                      {isCompleted ? 'Completed' : 'Join & Contribute'}
                    </DynamicButton>
                  ) : (
                    <Badge variant="default" className="w-full text-center py-2 justify-center">
                      ✓ Quest Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </TabsContent>
    </Tabs>
  )
}
