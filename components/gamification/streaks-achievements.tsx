'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Flame, Award, Lock, Sparkles, Trophy, Star } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const streaks = [
  {
    id: 's1',
    name: 'Daily Login',
    description: 'Log in and engage with ESG dashboard',
    current: 47,
    record: 127,
    icon: Flame,
    color: 'text-orange-500',
  },
  {
    id: 's2',
    name: 'Eco Warrior',
    description: 'Complete sustainability actions',
    current: 12,
    record: 45,
    icon: Sparkles,
    color: 'text-green-500',
  },
  {
    id: 's3',
    name: 'Carbon Tracker',
    description: 'Log carbon reduction activities',
    current: 8,
    record: 33,
    icon: Trophy,
    color: 'text-blue-500',
  },
]

const achievements = [
  {
    id: 'a1',
    name: 'First Step',
    description: 'Complete your first ESG action',
    icon: '🌱',
    unlocked: true,
    unlockedDate: '2024-06-01',
    rarity: 'Common',
  },
  {
    id: 'a2',
    name: 'Carbon Crusader',
    description: 'Reduce carbon emissions by 25%',
    icon: '🔋',
    unlocked: true,
    unlockedDate: '2024-06-15',
    rarity: 'Rare',
  },
  {
    id: 'a3',
    name: 'Team Player',
    description: 'Complete 10 team quests',
    icon: '👥',
    unlocked: true,
    unlockedDate: '2024-07-01',
    rarity: 'Rare',
  },
  {
    id: 'a4',
    name: 'Green Thumb',
    description: 'Plant 100 trees through ESG program',
    icon: '🌳',
    unlocked: false,
    progress: 67,
    total: 100,
    rarity: 'Epic',
  },
  {
    id: 'a5',
    name: 'Net Zero Navigator',
    description: 'Achieve company net-zero target',
    icon: '🎯',
    unlocked: false,
    progress: 42,
    total: 100,
    rarity: 'Legendary',
  },
  {
    id: 'a6',
    name: 'Secret: Sustainability Sage',
    description: 'Unlock by completing all ESG training courses',
    icon: '🔮',
    unlocked: false,
    isSecret: true,
    rarity: 'Secret',
  },
  {
    id: 'a7',
    name: 'Secret: Weekend Warrior',
    description: 'Unlock by completing activities on 5 weekends',
    icon: '⚔️',
    unlocked: false,
    isSecret: true,
    rarity: 'Secret',
  },
  {
    id: 'a8',
    name: 'Perfect Week',
    description: 'Complete all weekly missions for 4 consecutive weeks',
    icon: '✨',
    unlocked: false,
    progress: 2,
    total: 4,
    rarity: 'Epic',
  },
]

const rarityColors = {
  Common: 'bg-gray-100 text-gray-900',
  Rare: 'bg-blue-100 text-blue-900',
  Epic: 'bg-purple-100 text-purple-900',
  Legendary: 'bg-yellow-100 text-yellow-900',
  Secret: 'bg-indigo-100 text-indigo-900',
}

const rarityBorders = {
  Common: 'border-gray-300',
  Rare: 'border-blue-300',
  Epic: 'border-purple-300',
  Legendary: 'border-yellow-300',
  Secret: 'border-indigo-300',
}

export function StreaksAchievements() {
  const unlockedAchievements = achievements.filter(a => a.unlocked).length
  const totalAchievements = achievements.length

  return (
    <Tabs defaultValue="streaks" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="streaks" className="flex gap-2">
          <Flame className="w-4 h-4" />
          Streaks
        </TabsTrigger>
        <TabsTrigger value="achievements" className="flex gap-2">
          <Award className="w-4 h-4" />
          Achievements
        </TabsTrigger>
      </TabsList>

      <TabsContent value="streaks" className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-orange-500" />
            Your Streaks
          </h3>
          <p className="text-sm text-muted-foreground">Keep your streaks alive by staying consistent</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {streaks.map((streak) => {
            const Icon = streak.icon
            const streakPercentage = (streak.current / streak.record) * 100

            return (
              <Card key={streak.id} className="relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 text-4xl">
                  <Icon className="w-16 h-16" />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${streak.color}`} />
                    <CardTitle className="text-base">{streak.name}</CardTitle>
                  </div>
                  <CardDescription className="text-xs">{streak.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <div className="text-3xl font-bold">{streak.current}</div>
                      <div className="text-xs text-muted-foreground">Days</div>
                    </div>
                    <Progress value={streakPercentage} className="h-2" />
                    <div className="text-xs text-muted-foreground text-right mt-1">
                      Record: {streak.record} days
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="bg-primary/5 border-primary/30">
          <CardHeader>
            <CardTitle className="text-base">Streak Tips</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2 text-muted-foreground">
            <p>• Log in daily to maintain your streaks</p>
            <p>• Complete at least one ESG action per day</p>
            <p>• Sunday reminders help keep you on track</p>
            <p>• A missed day resets your streak, but you can start a new one!</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="achievements" className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-primary" />
            Achievements & Badges
          </h3>
          <p className="text-sm text-muted-foreground">
            {unlockedAchievements} of {totalAchievements} unlocked
          </p>
        </div>

        <Progress value={(unlockedAchievements / totalAchievements) * 100} className="h-3" />

        <Tabs defaultValue="unlocked" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="unlocked">
              Unlocked ({unlockedAchievements})
            </TabsTrigger>
            <TabsTrigger value="locked">
              Locked ({totalAchievements - unlockedAchievements})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="unlocked" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {achievements
                .filter(a => a.unlocked)
                .map((achievement) => (
                  <Card key={achievement.id} className={`border-2 ${rarityBorders[achievement.rarity as keyof typeof rarityBorders]}`}>
                    <CardContent className="pt-6 text-center space-y-3">
                      <div className="text-4xl">{achievement.icon}</div>
                      <div>
                        <h4 className="font-semibold text-sm">{achievement.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                      </div>
                      <div className="flex gap-2 justify-center">
                        <Badge className={rarityColors[achievement.rarity as keyof typeof rarityColors]} variant="outline">
                          {achievement.rarity}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {achievement.unlockedDate}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="locked" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {achievements
                .filter(a => !a.unlocked)
                .map((achievement) => (
                  <Card key={achievement.id} className={`border-2 opacity-60 ${rarityBorders[achievement.rarity as keyof typeof rarityBorders]}`}>
                    <CardContent className="pt-6 text-center space-y-3">
                      <div className="relative">
                        <div className="text-4xl opacity-50">{achievement.icon}</div>
                        {achievement.isSecret ? (
                          <Lock className="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
                        ) : null}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{achievement.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {achievement.isSecret ? '???' : achievement.description}
                        </p>
                      </div>
                      {!achievement.isSecret && 'progress' in achievement && (
                        <div className="space-y-1">
                          <Progress value={(achievement.progress / achievement.total) * 100} className="h-1.5" />
                          <div className="text-xs text-muted-foreground">
                            {achievement.progress} / {achievement.total}
                          </div>
                        </div>
                      )}
                      <Badge className={rarityColors[achievement.rarity as keyof typeof rarityColors]} variant="outline">
                        {achievement.rarity}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </TabsContent>
    </Tabs>
  )
}
