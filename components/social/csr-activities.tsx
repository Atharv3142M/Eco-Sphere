'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DynamicButton } from '@/components/ui/dynamic-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { Heart, Users, Calendar, MapPin, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { addActivity } from '@/lib/actions/handlers'

const INITIAL_ACTIVITIES = [
  {
    id: 'food-bank',
    title: 'Food Bank Drive',
    description: 'Collect and distribute food to local communities',
    category: 'Community Support',
    date: '2026-07-20',
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
    date: '2026-07-15',
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
    date: '2026-07-10',
    location: 'Coastal Area',
    participants: 78,
    impact: '2 tons waste collected',
    status: 'completed',
  },
]

const categoryColors: Record<string, string> = {
  'Community Support': 'bg-social/10 text-social',
  Education: 'bg-info/10 text-info',
  Environmental: 'bg-env/10 text-env',
  Health: 'bg-danger/10 text-danger',
}

export function CSRActivities() {
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES)
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Environmental',
    date: '',
    location: '',
  })

  const handleAddActivity = async () => {
    if (!form.title.trim() || !form.description.trim() || !form.date || !form.location.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      await addActivity(fd)

      setActivities((prev) => [
        {
          id: `activity-${Date.now()}`,
          title: form.title.trim(),
          description: form.description.trim(),
          category: form.category,
          date: form.date,
          location: form.location.trim(),
          participants: 0,
          impact: 'Pending',
          status: 'planned',
        },
        ...prev,
      ])

      toast.success('CSR activity created successfully')
      setForm({ title: '', description: '', category: 'Environmental', date: '', location: '' })
      setOpen(false)
    } catch {
      toast.error('Failed to create activity')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">CSR Activities</h2>
          <p className="mt-1 text-muted-foreground">
            Track and manage corporate social responsibility initiatives
          </p>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger render={<Button><Plus className="mr-2 size-4" />New Activity</Button>} />
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Add CSR Activity</SheetTitle>
              <SheetDescription>Create a new social responsibility initiative</SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Beach Clean-Up Initiative"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Input
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Brief description of the activity"
                />
              </div>
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {['Environmental', 'Education', 'Community Support', 'Health'].map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="City, venue, or online"
                />
              </div>
              <DynamicButton
                className="w-full"
                isLoading={isSubmitting}
                loadingText="Creating..."
                successText="Activity Added!"
                onClick={handleAddActivity}
              >
                Add Activity
              </DynamicButton>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <Card key={activity.id} className="transition hover:border-primary/40">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="size-5 text-social" />
                    {activity.title}
                  </CardTitle>
                  <CardDescription className="mt-2">{activity.description}</CardDescription>
                </div>
                <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                  {activity.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 grid grid-cols-2 gap-4 border-b border-border pb-4 md:grid-cols-4">
                <div>
                  <p className="mb-1 text-xs text-muted-foreground">Category</p>
                  <Badge className={categoryColors[activity.category] ?? ''}>{activity.category}</Badge>
                </div>
                <div>
                  <p className="mb-1 text-xs text-muted-foreground">Date</p>
                  <p className="flex items-center gap-2 text-sm">
                    <Calendar className="size-4" />
                    {new Date(activity.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-muted-foreground">Location</p>
                  <p className="flex items-center gap-2 text-sm">
                    <MapPin className="size-4" />
                    {activity.location}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-muted-foreground">Participants</p>
                  <p className="flex items-center gap-2 text-sm font-semibold">
                    <Users className="size-4" />
                    {activity.participants > 0 ? activity.participants : 'N/A'}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Social Impact</p>
                  <p className="font-semibold text-social">{activity.impact}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => toast.info(`Viewing ${activity.title}`)}>
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
