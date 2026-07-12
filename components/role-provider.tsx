'use client'

import * as React from 'react'
import type { Role } from '@/lib/types'

interface RoleContextValue {
  role: Role
  setRole: (role: Role) => void
}

const RoleContext = React.createContext<RoleContextValue | null>(null)

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = React.useState<Role>('officer')

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
