'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DynamicButton } from '@/components/ui/dynamic-button'
import { Trophy, Zap, Users, Award, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '@/lib/auth/context'
import {
  getChallenges,
  saveChallenge,
  type StoredChallenge,
  APP_DATE,
} from '@/lib/store/app-store'

const ICONS = { Trophy, Zap, Users, Award }

const difficultyColors: Record<string, string> = {
  easy: 'bg-env/15 text-env border border-env/30',
  medium: 'bg-warning/15 text-warning border border-warning/30',
  hard: 'bg-danger/15 text-danger border border-danger/30',
}

export function Challenges() {
  const { user } = useAuth()
  const [challenges, setChallenges] = useState<StoredChallenge[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Environmental',
    difficulty: 'medium' as StoredChallenge['difficulty'],
    duration: '30 days',
    reward: '150',
  })

  useEffect(() => {
    setChallenges(getChallenges())
  }, [])

  const handleCreate = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      toast.error('Title and description are required')
      throw new Error('Validation failed')
    }

    const challenge: StoredChallenge = {
      id: `challenge-${Date.now()}`,
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      difficulty: form.difficulty,
      duration: form.duration,
      participants: 1,
      progress: 0,
      reward: parseInt(form.reward, 10) || 100,
      status: 'active',
      createdAt: APP_DATE.toISOString().slice(0, 10),
      createdBy: user?.name,
    }

    saveChallenge(challenge)
    setChallenges(getChallenges())
    setForm({ title: '', description: '', category: 'Environmental', difficulty: 'medium', duration: '30 days', reward: '150' })
    setOpen(false)
    toast.success('Challenge created successfully!')
  }

  const handleJoin = (title: string) => {
    toast.success(`Joined "${title}"! Upload proof when complete.`)
  }

  const iconForCategory = (category: string) => {
    if (category === 'Social') return Users
    if (category === 'Governance') return Award
    return Zap
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Active Challenges</h2>
          <p className="mt-1 text-muted-foreground">Engage with gamified ESG challenges</p>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger render={<Button><Plus className="mr-2 size-4" />Create Challenge</Button>} />
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Create New Challenge</SheetTitle>
              <SheetDescription>Launch a sustainability challenge for your organization</SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ch-title">Title *</Label>
                <Input id="ch-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Zero Plastic Week" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ch-desc">Description *</Label>
                <Input id="ch-desc" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Eliminate single-use plastic for one week" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['Environmental', 'Social', 'Governance'].map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <Select value={form.difficulty} onValueChange={(v) => setForm({ ...form, difficulty: v as StoredChallenge['difficulty'] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['easy', 'medium', 'hard'].map((d) => (
                        <SelectItem key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ch-duration">Duration</Label>
                  <Input id="ch-duration" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ch-reward">XP Reward</Label>
                  <Input id="ch-reward" type="number" value={form.reward} onChange={(e) => setForm({ ...form, reward: e.target.value })} />
                </div>
              </div>
              <DynamicButton className="w-full" loadingText="Creating..." successText="Created!" onClick={handleCreate}>
                Create Challenge
              </DynamicButton>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="space-y-4">
        {challenges.map((challenge) => {
          const Icon = iconForCategory(challenge.category)
          return (
            <Card key={challenge.id} className={challenge.status === 'upcoming' ? 'opacity-60' : ''}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <div>
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <CardTitle>{challenge.title}</CardTitle>
                        <Badge variant={challenge.status === 'active' ? 'secondary' : 'outline'}>
                          {challenge.status === 'active' ? 'Active' : 'Upcoming'}
                        </Badge>
                        {challenge.createdBy && (
                          <Badge variant="outline" className="text-xs">by {challenge.createdBy}</Badge>
                        )}
                      </div>
                      <CardDescription>{challenge.description}</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{challenge.reward}</p>
                    <p className="text-xs text-muted-foreground">XP Reward</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-semibold">{challenge.progress}%</span>
                  </div>
                  <Progress value={challenge.progress} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-border pt-2 md:grid-cols-5">
                  <div>
                    <p className="text-xs text-muted-foreground">Category</p>
                    <Badge variant="outline" className="mt-1">{challenge.category}</Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Difficulty</p>
                    <Badge className={`mt-1 ${difficultyColors[challenge.difficulty]}`}>
                      {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="mt-1 text-sm font-medium">{challenge.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Participants</p>
                    <p className="mt-1 flex items-center gap-1 text-sm font-medium">
                      <Users className="size-4" />{challenge.participants}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <DynamicButton variant="outline" size="sm" successText="Joined!" onClick={() => handleJoin(challenge.title)}>
                      {challenge.status === 'active' ? 'Join Challenge' : 'Learn More'}
                    </DynamicButton>
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
