'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/context'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { LogOut, Settings, User, Loader2, Flame, Zap } from 'lucide-react'
import { getDepartmentStats } from '@/lib/esg-data'
import { UserRole } from '@/types/auth'

const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.ADMIN]: 'Administrator',
  [UserRole.ESG_MANAGER]: 'ESG Manager',
  [UserRole.DEPARTMENT_HEAD]: 'Department Head',
  [UserRole.EMPLOYEE]: 'Employee',
}

export function UserMenu() {
  const router = useRouter()
  const { user, logout, isLoading } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  if (!user) return null

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
      window.location.href = '/auth/login'
    } catch {
      setIsLoggingOut(false)
    }
  }

  const initials = user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
  const deptStats = getDepartmentStats(user.department)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
            <Avatar className="h-9 w-9 ring-2 ring-primary/30">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt={user.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">{initials}</AvatarFallback>
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel>
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 space-y-1">
              <p className="truncate text-sm font-semibold">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
              <div className="flex flex-wrap gap-1 pt-0.5">
                <Badge variant="secondary" className="text-[10px]">{ROLE_LABELS[user.role]}</Badge>
                <Badge variant="outline" className="text-[10px]">{user.department ?? 'Unassigned'}</Badge>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="grid grid-cols-3 gap-2 px-2 py-1.5">
          <div className="rounded-lg bg-muted/50 p-2 text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground"><Zap className="size-3" /> Level</div>
            <div className="font-numeric text-sm font-bold">{user.level ?? 1}</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-2 text-center">
            <div className="text-xs text-muted-foreground">XP</div>
            <div className="font-numeric text-sm font-bold">{(user.xp ?? 0).toLocaleString()}</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-2 text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground"><Flame className="size-3 text-warning" /> Streak</div>
            <div className="font-numeric text-sm font-bold">{user.streak ?? 0}d</div>
          </div>
        </div>
        <div className="mx-2 mb-1 rounded-lg border border-border bg-card p-2 text-xs">
          <span className="text-muted-foreground">Dept. ESG score: </span>
          <span className="font-semibold text-primary">{deptStats.score}/100</span>
          <span className="text-muted-foreground"> · Rank #{deptStats.rank}</span>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push('/profile')}><User className="mr-2 h-4 w-4" /><span>Profile</span></DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/settings')}><Settings className="mr-2 h-4 w-4" /><span>Settings</span></DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut || isLoading} className="text-destructive focus:text-destructive">
          {isLoggingOut ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-2 h-4 w-4" />}
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
