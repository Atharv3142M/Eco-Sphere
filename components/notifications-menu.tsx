'use client'

import * as React from 'react'
import {
  AlertTriangle,
  Award,
  Bell,
  FileText,
  Gift,
  Trophy,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { NOTIFICATIONS } from '@/lib/mock-data'
import type { AppNotification, NotificationKind } from '@/lib/types'
import { cn } from '@/lib/utils'

const KIND_ICON: Record<NotificationKind, LucideIcon> = {
  challenge: Trophy,
  badge: Award,
  policy: FileText,
  compliance: AlertTriangle,
  reward: Gift,
}

const PRIORITY_STYLES: Record<AppNotification['priority'], string> = {
  high: 'bg-danger/10 text-danger',
  medium: 'bg-info/10 text-info',
  low: 'bg-muted text-muted-foreground',
}

export function NotificationsMenu() {
  const [items, setItems] = React.useState<AppNotification[]>(NOTIFICATIONS)
  const unread = items.filter((n) => !n.read).length

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Notifications${unread ? `, ${unread} unread` : ''}`}
            className="relative"
          >
            <Bell />
            {unread > 0 && (
              <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-danger text-[10px] font-semibold text-danger-foreground">
                {unread}
              </span>
            )}
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-[22rem] p-0">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex flex-col">
            <span className="font-heading text-sm font-semibold">
              Notifications
            </span>
            <span className="text-xs text-muted-foreground">
              {unread} unread
            </span>
          </div>
          <Button
            variant="ghost"
            size="xs"
            onClick={markAllRead}
            disabled={unread === 0}
          >
            Mark all read
          </Button>
        </div>
        <ScrollArea className="h-80">
          <ul className="flex flex-col">
            {items.map((n) => {
              const Icon = KIND_ICON[n.kind]
              return (
                <li
                  key={n.id}
                  className={cn(
                    'flex gap-3 border-t border-border px-4 py-3 transition-colors',
                    !n.read && 'bg-accent/40',
                  )}
                >
                  <span
                    className={cn(
                      'flex size-9 shrink-0 items-center justify-center rounded-full [&_svg]:size-4',
                      PRIORITY_STYLES[n.priority],
                    )}
                  >
                    <Icon />
                  </span>
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-medium">
                        {n.title}
                      </span>
                      {!n.read && (
                        <span className="size-2 shrink-0 rounded-full bg-primary" />
                      )}
                    </div>
                    <span className="text-xs leading-relaxed text-muted-foreground">
                      {n.detail}
                    </span>
                    <span className="text-[11px] text-muted-foreground/80">
                      {n.time}
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
