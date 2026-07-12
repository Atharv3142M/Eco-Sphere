'use client'

import * as React from 'react'
import type { Role } from '@/lib/types'
import { UserRole } from '@/types/auth'
import { useAuth } from '@/lib/auth/context'

interface RoleContextValue {
  role: Role
  setRole: (role: Role) => void
}

const RoleContext = React.createContext<RoleContextValue | null>(null)

function mapUserRoleToNavRole(role?: UserRole): Role {
  switch (role) {
    case UserRole.ADMIN:
      return 'admin'
    case UserRole.ESG_MANAGER:
      return 'officer'
    case UserRole.DEPARTMENT_HEAD:
      return 'manager'
    default:
      return 'employee'
  }
}

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [role, setRole] = React.useState<Role>('employee')

  React.useEffect(() => {
    if (user?.role) {
      setRole(mapUserRoleToNavRole(user.role))
    }
  }, [user?.role])

  const value = React.useMemo(() => ({ role, setRole }), [role])

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
}

export function useRole() {
  const ctx = React.useContext(RoleContext)
  if (!ctx) {
    throw new Error('useRole must be used within a RoleProvider')
  }
  return ctx
}
