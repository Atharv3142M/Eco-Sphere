'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DynamicButton } from '@/components/ui/dynamic-button'
import { CheckCircle2, Clock, UploadCloud } from 'lucide-react'
import { useAuth } from '@/lib/auth/context'
import { toast } from 'sonner'

type ProofStatus = 'Submitted' | 'Pending' | 'Not Started'

interface ParticipationRecord {
  id: string
  activity: string
  date: string
  hours: number
  role: string
  proof: ProofStatus
  name: string
  email?: string
}

const INITIAL: ParticipationRecord[] = [
  { id: '1', activity: 'Food Bank Drive', date: '2026-07-05', hours: 4, role: 'Volunteer', proof: 'Submitted', name: 'Alex Johnson' },
  { id: '2', activity: 'STEM Education Program', date: '2026-07-08', hours: 6, role: 'Mentor', proof: 'Pending', name: 'Mike Rodriguez' },
  { id: '3', activity: 'Beach Clean-Up Initiative', date: '2026-07-02', hours: 3, role: 'Volunteer', proof: 'Submitted', name: 'Emma Wilson' },
]

export function Participation() {
  const { user } = useAuth()
  const [participations, setParticipations] = useState<ParticipationRecord[]>(() => {
    const list = [...INITIAL]
    if (user) {
      list.unshift({
        id: 'me',
        activity: 'Health & Wellness Fair',
        date: '2026-07-12',
        hours: 0,
        role: 'Volunteer',
        proof: 'Not Started',
        name: user.name,
        email: user.email,
      })
    }
    return list
  })

  const totalHours = participations.filter((p) => p.proof !== 'Not Started').reduce((sum, p) => sum + p.hours, 0)
  const submittedProof = participations.filter((p) => p.proof === 'Submitted').length

  const handleUpload = async (id: string) => {
    setParticipations((prev) =>
      prev.map((p) => (p.id === id ? { ...p, proof: 'Pending' as ProofStatus, hours: p.hours || 2 } : p)),
    )
    toast.success('Proof uploaded — awaiting approval')
  }

  const handleView = (activity: string) => {
    toast.info(`Viewing participation record for ${activity}`)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm font-medium">Total Hours</CardTitle></CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-social">{totalHours}</div>
            <p className="mt-2 text-xs text-muted-foreground">volunteer hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm font-medium">Participations</CardTitle></CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{participations.length}</div>
            <p className="mt-2 text-xs text-muted-foreground">total activities</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm font-medium">Proof Submitted</CardTitle></CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-env">{submittedProof}</div>
            <p className="mt-2 text-xs text-muted-foreground">verified records</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Participation History</CardTitle>
          <CardDescription>Track employee participation and proof of contribution</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {participations.map((p) => {
            const isMe = user?.email === p.email || user?.name === p.name
            const seed = p.email ?? p.name
            return (
              <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border p-3 transition hover:bg-accent/30">
                <div className="flex flex-1 items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`} />
                    <AvatarFallback>{p.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{p.name}{isMe ? ' (You)' : ''}</p>
                    <p className="text-sm text-muted-foreground">{p.activity} · {new Date(p.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold">{p.hours} hrs</p>
                    <p className="text-xs text-muted-foreground">{p.role}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {p.proof === 'Submitted' && (<><CheckCircle2 className="size-5 text-env" /><Badge>Verified</Badge></>)}
                    {p.proof === 'Pending' && (<><Clock className="size-5 text-warning" /><Badge variant="secondary">Pending</Badge></>)}
                    {p.proof === 'Not Started' && (<><UploadCloud className="size-5 text-muted-foreground" /><Badge variant="outline">Not Started</Badge></>)}
                  </div>
                  {p.proof === 'Not Started' ? (
                    <DynamicButton variant="ghost" size="sm" successText="Uploaded!" onClick={() => handleUpload(p.id)}>Upload</DynamicButton>
                  ) : (
                    <Button variant="ghost" size="sm" onClick={() => handleView(p.activity)}>View</Button>
                  )}
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
