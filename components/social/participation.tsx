'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CheckCircle2, Clock, UploadCloud } from 'lucide-react'

const participations = [
  {
    id: '1',
    activity: 'Food Bank Drive',
    date: '2024-07-20',
    hours: 4,
    role: 'Volunteer',
    proof: 'Submitted',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    name: 'Alex Johnson',
  },
  {
    id: '2',
    activity: 'STEM Education Program',
    date: '2024-07-15',
    hours: 6,
    role: 'Mentor',
    proof: 'Pending',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    name: 'Sarah Chen',
  },
  {
    id: '3',
    activity: 'Beach Clean-Up Initiative',
    date: '2024-07-10',
    hours: 3,
    role: 'Volunteer',
    proof: 'Submitted',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
    name: 'Mike Rodriguez',
  },
  {
    id: '4',
    activity: 'Health & Wellness Fair',
    date: 'TBD',
    hours: 0,
    role: 'Volunteer',
    proof: 'Not Started',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
    name: 'Emma Wilson',
  },
]

export function Participation() {
  const totalHours = participations.filter((p) => p.proof !== 'Not Started').reduce((sum, p) => sum + p.hours, 0)
  const submittedProof = participations.filter((p) => p.proof === 'Submitted').length

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-social">{totalHours}</div>
            <p className="text-xs text-foreground/60 mt-2">volunteer hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Participations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{participations.length}</div>
            <p className="text-xs text-foreground/60 mt-2">total activities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Proof Submitted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-environment">{submittedProof}</div>
            <p className="text-xs text-foreground/60 mt-2">verified records</p>
          </CardContent>
        </Card>
      </div>

      {/* Participation History */}
      <Card>
        <CardHeader>
          <CardTitle>Participation History</CardTitle>
          <CardDescription>Track employee participation and proof of contribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {participations.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-background/50 transition">
                <div className="flex items-center gap-3 flex-1">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={p.avatar} />
                    <AvatarFallback>{p.name.split(' ')[0][0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{p.name}</p>
                    <p className="text-sm text-foreground/60">{p.activity}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold">{p.hours} hrs</p>
                    <p className="text-xs text-foreground/60">{p.role}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {p.proof === 'Submitted' ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-environment" />
                        <Badge variant="default">Verified</Badge>
                      </>
                    ) : p.proof === 'Pending' ? (
                      <>
                        <Clock className="w-5 h-5 text-warning" />
                        <Badge variant="secondary">Pending</Badge>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-5 h-5 text-foreground/40" />
                        <Badge variant="outline">Not Started</Badge>
                      </>
                    )}
                  </div>

                  <Button variant="ghost" size="sm">
                    {p.proof === 'Not Started' ? 'Upload' : 'View'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
