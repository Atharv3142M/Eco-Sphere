'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Leaf, Sparkles } from 'lucide-react'
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
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { NAV_ITEMS } from '@/lib/nav'
import { useRole } from '@/components/role-provider'

function isActivePath(pathname: string, href: string) {
  if (href === '/dashboard') return pathname === '/dashboard' || pathname === '/'
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
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <Link href="/dashboard" className="flex items-center gap-2.5" onClick={() => setOpenMobile(false)}>
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[0_0_20px_rgba(132,204,22,0.25)]">
            <Leaf className="size-5" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-heading text-sm font-bold italic tracking-wide">
              ECOSPHERE
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Sustain today. Impact tomorrow.
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {items.map((item) => {
              const active = isActivePath(pathname, item.href)
              const alertCount = item.label === 'Governance' ? 5 : undefined

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
                      {alertCount ? (
                        <Badge className="ml-auto bg-primary text-primary-foreground">{alertCount}</Badge>
                      ) : null}
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

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-3">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <span className="text-xs font-semibold">ESG Copilot</span>
            <Badge variant="secondary" className="ml-auto text-[10px]">BETA</Badge>
          </div>
          <p className="mb-3 text-[11px] leading-relaxed text-muted-foreground">
            Ask AI about your ESG metrics, compliance, and sustainability goals.
          </p>
          <Button size="sm" className="h-8 w-full text-xs" variant="secondary">
            Ask Copilot
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
