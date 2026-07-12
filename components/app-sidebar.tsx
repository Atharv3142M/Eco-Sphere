'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Sparkles } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { NAV_ITEMS } from '@/lib/nav'
import { useRole } from '@/components/role-provider'
import { CURRENT_USER } from '@/lib/mock-data'

function isActivePath(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

export function AppSidebar() {
  const pathname = usePathname()
  const { role } = useRole()
  const { setOpenMobile } = useSidebar()

  const items = NAV_ITEMS.filter(
    (item) => !item.roles || item.roles.includes(role),
  )

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2.5 px-2 py-2">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="size-5" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-heading text-base font-semibold">
              EcoSphere
            </span>
            <span className="text-xs text-muted-foreground">
              ESG Management
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {items.map((item) => {
              const active = isActivePath(pathname, item.href)

              if (!item.children) {
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={active}
                      tooltip={item.label}
                      render={
                        <Link
                          href={item.href}
                          onClick={() => setOpenMobile(false)}
                        />
                      }
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              }

              const groupActive =
                active ||
                item.children.some((c) => isActivePath(pathname, c.href))

              return (
                <Collapsible
                  key={item.href}
                  defaultOpen={groupActive}
                  className="group/collapsible"
                  render={<SidebarMenuItem />}
                >
                  <CollapsibleTrigger
                    render={
                      <SidebarMenuButton isActive={active} tooltip={item.label}>
                        <item.icon />
                        <span>{item.label}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    }
                  />
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.children.map((child) => (
                        <SidebarMenuSubItem key={child.href}>
                          <SidebarMenuSubButton
                            isActive={isActivePath(pathname, child.href)}
                            render={
                              <Link
                                href={child.href}
                                onClick={() => setOpenMobile(false)}
                              />
                            }
                          >
                            <span>{child.label}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-3 rounded-xl px-2 py-2">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent font-numeric text-sm font-semibold text-accent-foreground">
            {CURRENT_USER.initials}
          </div>
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-sm font-medium">
              {CURRENT_USER.name}
            </span>
            <span className="truncate text-xs text-muted-foreground">
              Level {CURRENT_USER.level} · {CURRENT_USER.xp.toLocaleString()} XP
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
