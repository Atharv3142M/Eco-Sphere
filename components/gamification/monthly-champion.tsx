'use client'

import { useAuth } from '@/lib/auth/context'
import { getUserGamificationStats } from '@/lib/esg-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar, Crown, Users, Target, MapPin, Clock, Flame } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const currentChampionFallback = {
  name: 'Daniel Rajput',
  role: 'ESG Manager',
  department: 'Sustainability',
  points: 4850,
  achievements: 8,
  streak: 47,
  initiatives: 5,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=champion',
  badges: ['Carbon Crusader', 'Team Player', 'Net Zero Champion'],
  quote: 'Every small action counts towards our sustainability goals!',
}

const previousChampions = [
  { month: 'June 2026', name: 'Marcus Johnson', department: 'Operations', points: 4720 },
  { month: 'May 2026', name: 'Elena Rodriguez', department: 'Finance', points: 4580 },
  { month: 'April 2026', name: 'David Kim', department: 'HR', points: 4410 },
]

const events = [
  { id: 'e1', name: 'Tree Planting Drive', description: 'Join us for a day of environmental restoration', date: '20 Jul 2026', time: '9:00 AM - 2:00 PM', location: 'Central Park, Bangalore', icon: '🌳', participants: 64, category: 'Environmental', status: 'Upcoming' },
  { id: 'e2', name: 'Sustainability Lunch & Learn', description: 'Expert panel discussing net-zero transition strategies', date: '18 Jul 2026', time: '12:00 PM - 1:00 PM', location: 'Main Conference Room', icon: '📚', participants: 128, category: 'Learning', status: 'Upcoming' },
  { id: 'e3', name: 'Beach Cleanup Initiative', description: 'Coastal cleanup and marine conservation effort', date: '26 Jul 2026', time: '8:00 AM - 12:00 PM', location: 'Ocean Beach', icon: '🏖️', participants: 92, category: 'Community', status: 'Upcoming' },
  { id: 'e4', name: 'Carbon Accounting Workshop', description: 'Learn to calculate and manage corporate emissions', date: '15 Jul 2026', time: '2:00 PM - 4:00 PM', location: 'Online - Zoom', icon: '📊', participants: 156, category: 'Learning', status: 'Upcoming' },
  { id: 'e5', name: 'Green Commute Challenge', description: 'Challenge your team to use eco-friendly transportation', date: '7 - 14 Jul 2026', time: 'All day', location: 'Company-wide', icon: '🚲', participants: 243, category: 'Challenge', status: 'Active' },
]

const eventColors: Record<string, string> = {
  Environmental: 'bg-env/15 text-env border border-env/30',
  Learning: 'bg-info/15 text-info border border-info/30',
  Community: 'bg-gov/15 text-gov border border-gov/30',
  Challenge: 'bg-warning/15 text-warning border border-warning/30',
}

export function MonthlySustainabilityChampion() {
  const { user } = useAuth()
  const stats = getUserGamificationStats(user?.id, user?.department)
  const currentChampion = user
    ? {
        ...currentChampionFallback,
        name: user.name,
        role: user.role.replace('_', ' '),
        department: user.department ?? 'Operations',
        points: user.xp ?? stats.xp,
        streak: user.streak ?? stats.streak,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
      }
    : currentChampionFallback

  return (
    <Tabs defaultValue="champion" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="champion" className="flex gap-2">
          <Crown className="w-4 h-4" />
          Champion
        </TabsTrigger>
        <TabsTrigger value="calendar" className="flex gap-2">
          <Calendar className="w-4 h-4" />
          Events
        </TabsTrigger>
      </TabsList>

      <TabsContent value="champion" className="space-y-6">
        {/* Current Champion */}
        <Card className="border-2 border-warning/40 bg-warning/5">
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <Crown className="w-6 h-6 text-yellow-500" />
              <CardTitle>July 2026 Champion</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <Avatar className="h-24 w-24 border-4 border-yellow-400">
                <AvatarImage src={currentChampion.avatar} alt={currentChampion.name} />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-2xl font-bold">{currentChampion.name}</h3>
                  <p className="text-foreground/60">{currentChampion.role} • {currentChampion.department}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-3">
                  <div className="text-center p-2 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{currentChampion.points}</div>
                    <div className="text-xs text-muted-foreground">Points</div>
                  </div>
                  <div className="text-center p-2 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold">{currentChampion.achievements}</div>
                    <div className="text-xs text-muted-foreground">Achievements</div>
                  </div>
                  <div className="text-center p-2 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center gap-1">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="text-2xl font-bold">{currentChampion.streak}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Day Streak</div>
                  </div>
                  <div className="text-center p-2 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{currentChampion.initiatives}</div>
                    <div className="text-xs text-muted-foreground">Initiatives</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {currentChampion.badges.map((badge) => (
                    <Badge key={badge} className="bg-yellow-500">
                      ⭐ {badge}
                    </Badge>
                  ))}
                </div>

                <blockquote className="italic text-muted-foreground pl-4 border-l-4 border-yellow-400">
                  "{currentChampion.quote}"
                </blockquote>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Previous Champions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Previous Champions</CardTitle>
            <CardDescription>Our ESG champions from recent months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {previousChampions.map((champion, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div>
                    <p className="font-semibold">{champion.name}</p>
                    <p className="text-sm text-muted-foreground">{champion.department}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground mb-1">{champion.month}</div>
                    <Badge variant="secondary">{champion.points} pts</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="calendar" className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-primary" />
            CSR & ESG Event Calendar
          </h3>
          <p className="text-sm text-muted-foreground">Upcoming sustainability events and initiatives</p>
        </div>

        <div className="space-y-3">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex gap-4 p-4">
                  <div className="text-3xl flex-shrink-0">{event.icon}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-semibold text-sm leading-tight">{event.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <Badge className={eventColors[event.category as keyof typeof eventColors]}>
                          {event.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span>{event.date} • {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3 flex-shrink-0" />
                        <span>{event.participants} registered</span>
                      </div>
                    </div>
                  </div>

                  <Badge variant={event.status === 'Upcoming' ? 'outline' : 'default'} className="flex-shrink-0">
                    {event.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
