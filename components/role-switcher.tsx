'use client'

import React, { useState } from 'react'
import { ChevronsUpDown, UserCog, Loader2 } from 'lucide-react'
import { useAuth } from '@/lib/auth/context'
import { UserRole } from '@/types/auth'
import { canSwitchToRole } from '@/lib/auth/rbac'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const ROLE_LABELS: Record<UserRole, { label: string; description: string }> = {
  [UserRole.ADMIN]: {
    label: 'Administrator',
    description: 'Full platform access and management',
  },
  [UserRole.ESG_MANAGER]: {
    label: 'ESG Manager',
    description: 'Manage ESG programs and reports',
  },
  [UserRole.DEPARTMENT_HEAD]: {
    label: 'Department Head',
    description: 'View and manage department data',
  },
  [UserRole.EMPLOYEE]: {
    label: 'Employee',
    description: 'View dashboards and participate',
  },
}

export function RoleSwitcher() {
  const { user, switchRole, isLoading } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [switching, setSwitching] = useState(false)

  if (!user) return null

  const currentRoleLabel = ROLE_LABELS[user.role]
  const availableRoles = Object.values(UserRole).filter((role) => canSwitchToRole(user.role, role))

  const handleRoleSwitch = async (newRole: UserRole) => {
    if (newRole === user.role) return

    setSwitching(true)
    try {
      await switchRole(newRole)
      setIsOpen(false)
    } finally {
      setSwitching(false)
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        className="inline-flex h-7 items-center gap-2 rounded-lg border border-border bg-background px-2.5 text-sm hover:bg-muted disabled:opacity-50"
        disabled={isLoading || switching}
      >
        <UserCog className="size-4" />
        <span className="hidden text-sm sm:inline">{currentRoleLabel.label}</span>
        <ChevronsUpDown className="size-4 opacity-60" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={user.role} onValueChange={(value) => handleRoleSwitch(value as UserRole)}>
          {availableRoles.map((role) => {
            const roleInfo = ROLE_LABELS[role]
            const isSelected = role === user.role

            return (
              <DropdownMenuRadioItem
                key={role}
                value={role}
                className="items-start py-2 cursor-pointer"
                disabled={switching}
              >
                <div className="flex flex-col gap-0.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{roleInfo.label}</span>
                    {isSelected && switching && <Loader2 className="h-3 w-3 animate-spin" />}
                  </div>
                  <span className="text-xs text-muted-foreground">{roleInfo.description}</span>
                </div>
              </DropdownMenuRadioItem>
            )
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
