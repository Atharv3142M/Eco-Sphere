'use client'

import { usePathname } from 'next/navigation'
import { Search } from 'lucide-react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { UserMenu } from '@/components/user-menu'
import { ThemeToggle } from '@/components/theme-toggle'
import { NotificationsMenu } from '@/components/notifications-menu'
import { NAV_ITEMS } from '@/lib/nav'

function usePageTitle() {
  const pathname = usePathname()
  if (pathname === '/') return 'Dashboard'
  for (const item of NAV_ITEMS) {
    if (item.children) {
      const child = item.children.find((c) => pathname.startsWith(c.href))
      if (child) return `${item.label} · ${child.label}`
    }
    if (pathname.startsWith(item.href) && item.href !== '/') return item.label
  }
  return 'Dashboard'
}

export function TopBar() {
  const title = usePageTitle()

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b border-border bg-background/80 px-4 backdrop-blur-md">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-1 !h-5" />
      <h1 className="font-heading text-base font-semibold">{title}</h1>

      <div className="ml-auto flex items-center gap-1.5">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="h-9 w-56 rounded-lg border border-border bg-muted/40 pl-9 pr-3 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:bg-background"
          />
        </div>
        <ThemeToggle />
        <NotificationsMenu />
        <UserMenu />
      </div>
    </header>
  )
}
