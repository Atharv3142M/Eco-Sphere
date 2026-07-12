import type { ReactNode } from 'react'
import { RoleProvider } from '@/components/role-provider'
import { AppSidebar } from '@/components/app-sidebar'
import { TopBar } from '@/components/top-bar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <RoleProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <TopBar />
          <div className="flex-1">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </RoleProvider>
  )
}
