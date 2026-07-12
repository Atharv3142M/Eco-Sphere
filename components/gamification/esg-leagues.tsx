'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Trophy, Flame, TrendingUp } from 'lucide-react'

const departments = [
  {
    rank: 1,
    name: 'Sustainability',
    score: 4850,
    change: '+120',
    members: 24,
    division: 'Platinum',
    emissions: 245,
    target: 200,
  },
  {
    rank: 2,
    name: 'Operations',
    score: 4720,
    change: '+95',
    members: 38,
    division: 'Platinum',
    emissions: 380,
    target: 350,
  },
  {
    rank: 3,
    name: 'HR',
    score: 4620,
    change: '+85',
    members: 22,
    division: 'Gold',
    emissions: 120,
    target: 100,
  },
  {
    rank: 4,
    name: 'Finance',
    score: 4510,
    change: '-15',
    members: 31,
    division: 'Gold',
    emissions: 290,
    target: 270,
  },
  {
    rank: 5,
    name: 'IT',
    score: 4380,
    change: '+45',
    members: 28,
    division: 'Silver',
    emissions: 450,
    target: 400,
  },
  {
    rank: 6,
    name: 'Marketing',
    score: 4120,
    change: '+20',
    members: 18,
    division: 'Silver',
    emissions: 210,
    target: 180,
  },
]

const divisionColors = {
  Platinum: 'from-blue-600 to-cyan-500',
  Gold: 'from-yellow-500 to-orange-400',
  Silver: 'from-gray-400 to-gray-300',
}

const divisionBgColors: Record<string, string> = {
  Platinum: 'bg-info/10 border-info/30',
  Gold: 'bg-warning/10 border-warning/30',
  Silver: 'bg-muted border-border',
}

export function ESGLeagues() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Trophy className="w-6 h-6 text-primary" />
          Department ESG Leagues
        </h2>
        <p className="text-muted-foreground mt-2">Monthly competition ranking by ESG score</p>
      </div>

      {/* Division Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['Platinum', 'Gold', 'Silver'].map((division) => (
          <Card key={division} className={`border-2 ${divisionBgColors[division as keyof typeof divisionBgColors]}`}>
            <CardHeader>
              <CardTitle className="text-lg">{division} Division</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r to-transparent bg-clip-text text-transparent" 
                   style={{backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`}}>
                {departments.filter(d => d.division === division).length} Teams
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {division === 'Platinum' && 'Elite performers with top ESG initiatives'}
                {division === 'Gold' && 'High achievers with strong progress'}
                {division === 'Silver' && 'Emerging leaders with growing impact'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Rankings */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Rankings</CardTitle>
          <CardDescription>Top performing departments by ESG score</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departments.map((dept) => {
              const emissionProgress = (dept.emissions / dept.target) * 100
              const isImproving = dept.change.startsWith('+')

              return (
                <div key={dept.rank} className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  {/* Rank Badge */}
                  <div className="text-center">
                    {dept.rank === 1 ? (
                      <Trophy className="w-6 h-6 text-yellow-500 mx-auto" />
                    ) : dept.rank === 2 ? (
                      <Trophy className="w-6 h-6 text-gray-400 mx-auto" />
                    ) : dept.rank === 3 ? (
                      <Trophy className="w-6 h-6 text-orange-600 mx-auto" />
                    ) : (
                      <div className="text-lg font-bold text-muted-foreground w-6">{dept.rank}</div>
                    )}
                  </div>

                  {/* Department Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{dept.name}</h3>
                      <Badge variant="outline">{dept.division}</Badge>
                      <Badge variant="secondary" className="text-xs">
                        {dept.members} members
                      </Badge>
                    </div>

                    {/* Emission Progress */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Emissions: {dept.emissions} mtCO₂e</span>
                        <span>Target: {dept.target} mtCO₂e</span>
                      </div>
                      <Progress value={emissionProgress} className="h-1.5" />
                    </div>
                  </div>

                  {/* Score & Change */}
                  <div className="text-right">
                    <div className="text-2xl font-bold">{dept.score}</div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${isImproving ? 'text-green-600' : 'text-red-600'}`}>
                      {isImproving ? <TrendingUp className="w-4 h-4" /> : <TrendingUp className="w-4 h-4 rotate-180" />}
                      {dept.change}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
