'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, Users, Calendar, MapPin, Plus } from 'lucide-react'

const activities = [
  {
    id: 'food-bank',
    title: 'Food Bank Drive',
    description: 'Collect and distribute food to local communities',
    category: 'Community Support',
    date: '2024-07-20',
    location: 'Central Distribution Center',
    participants: 45,
    impact: '500 meals provided',
    status: 'ongoing',
  },
  {
    id: 'education',
    title: 'STEM Education Program',
    description: 'Mentorship and workshops for underprivileged youth',
    category: 'Education',
    date: '2024-07-15',
    location: 'Local Schools',
    participants: 32,
    impact: '120 students reached',
    status: 'active',
  },
  {
    id: 'environmental',
    title: 'Beach Clean-Up Initiative',
    description: 'Environmental conservation and ocean cleanup',
    category: 'Environmental',
    date: '2024-07-10',
    location: 'Coastal Area',
    participants: 78,
    impact: '2 tons waste collected',
    status: 'completed',
  },
  {
    id: 'health',
    title: 'Health & Wellness Fair',
    description: 'Free health screenings and wellness education',
    category: 'Health',
    date: '2024-08-05',
    location: 'Community Center',
    participants: 0,
    impact: 'TBD',
    status: 'planned',
  },
]

const categoryColors = {
  'Community Support': 'bg-social/10 text-social',
  'Education': 'bg-blue-500/10 text-blue-500',
  'Environmental': 'bg-environment/10 text-environment',
  'Health': 'bg-rose-500/10 text-rose-500',
}

export function CSRActivities() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">CSR Activities</h2>
          <p className="text-foreground/60 mt-1">Track and manage corporate social responsibility initiatives</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Activity
        </Button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <Card key={activity.id} className="hover:border-primary/50 transition">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-social" />
                    {activity.title}
                  </CardTitle>
                  <CardDescription className="mt-2">{activity.description}</CardDescription>
                </div>
                <Badge variant={activity.status === 'completed' ? 'default' : activity.status === 'active' || activity.status === 'ongoing' ? 'secondary' : 'outline'}>
                  {activity.status === 'ongoing'
                    ? 'Ongoing'
                    : activity.status === 'active'
                      ? 'Active'
                      : activity.status === 'completed'
                        ? 'Completed'
                        : 'Planned'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b border-border">
                <div>
                  <p className="text-xs text-foreground/60 mb-1">Category</p>
                  <Badge className={`${categoryColors[activity.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-900'}`}>
                    {activity.category}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-foreground/60 mb-1">Date</p>
                  <p className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4" />
                    {new Date(activity.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-foreground/60 mb-1">Location</p>
                  <p className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4" />
                    {activity.location}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-foreground/60 mb-1">Participants</p>
                  <p className="flex items-center gap-2 text-sm font-semibold">
                    <Users className="w-4 h-4" />
                    {activity.participants > 0 ? activity.participants : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-foreground/60">Social Impact</p>
                  <p className="font-semibold text-social">{activity.impact}</p>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
