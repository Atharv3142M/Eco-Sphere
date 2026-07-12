'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth/context'
import { getDepartmentStats, getUserGamificationStats } from '@/lib/esg-data'
import { UserRole } from '@/types/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DynamicButton } from '@/components/ui/dynamic-button'
import { Flame, Zap, Trophy, Building2 } from 'lucide-react'
import { toast } from 'sonner'
import { DEPARTMENTS } from '@/lib/esg-data'

const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.ADMIN]: 'Administrator',
  [UserRole.ESG_MANAGER]: 'ESG Manager',
  [UserRole.DEPARTMENT_HEAD]: 'Department Head',
  [UserRole.EMPLOYEE]: 'Employee',
}

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const [name, setName] = useState(user?.name ?? '')
  const [department, setDepartment] = useState(user?.department ?? 'Operations')
  const [isSaving, setIsSaving] = useState(false)

  if (!user) return null

  const stats = getUserGamificationStats(user.id, user.department)
  const deptStats = getDepartmentStats(user.department)
  const initials = user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error('Name is required')
      return
    }
    setIsSaving(true)
    try {
      await updateProfile({ name: name.trim(), department })
      toast.success('Profile updated successfully')
    } catch {
      toast.error('Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">Profile</h1>
        <p className="mt-1 text-muted-foreground">Manage your account and ESG participation</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Avatar className="size-20 ring-4 ring-primary/20">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} />
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge>{ROLE_LABELS[user.role]}</Badge>
                <Badge variant="outline">{user.department}</Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger id="department">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DynamicButton isLoading={isSaving} successText="Saved!" onClick={handleSave}>
            Save Changes
          </DynamicButton>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Zap, label: 'Level', value: user.level ?? stats.level },
          { icon: Trophy, label: 'XP', value: (user.xp ?? stats.xp).toLocaleString() },
          { icon: Flame, label: 'Streak', value: `${user.streak ?? stats.streak} days` },
          { icon: Building2, label: 'Dept. Score', value: `${deptStats.score}/100` },
        ].map(({ icon: Icon, label, value }) => (
          <Card key={label}>
            <CardContent className="flex items-center gap-3 pt-6">
              <div className="rounded-lg bg-primary/10 p-2">
                <Icon className="size-5 text-primary" />
              </div>
              <div>
                <div className="font-numeric text-xl font-bold">{value}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Department ESG Breakdown</CardTitle>
          <CardDescription>Your department&apos;s current performance</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border p-4 text-center">
            <div className="text-2xl font-bold text-env">{deptStats.environmental}</div>
            <div className="text-sm text-muted-foreground">Environmental</div>
          </div>
          <div className="rounded-lg border border-border p-4 text-center">
            <div className="text-2xl font-bold text-social">{deptStats.social}</div>
            <div className="text-sm text-muted-foreground">Social</div>
          </div>
          <div className="rounded-lg border border-border p-4 text-center">
            <div className="text-2xl font-bold text-gov">{deptStats.governance}</div>
            <div className="text-sm text-muted-foreground">Governance</div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
