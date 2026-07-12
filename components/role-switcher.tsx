'use client'

import { ChevronsUpDown, UserCog } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRole } from '@/components/role-provider'
import { ROLES } from '@/lib/mock-data'
import type { Role } from '@/lib/types'

export function RoleSwitcher() {
  const { role, setRole } = useRole()
  const active = ROLES.find((r) => r.id === role)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="sm" className="gap-2">
            <UserCog data-icon="inline-start" />
            <span className="hidden sm:inline">{active?.label}</span>
            <ChevronsUpDown data-icon="inline-end" className="opacity-60" />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel>Preview as role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={role}
          onValueChange={(value) => setRole(value as Role)}
        >
          {ROLES.map((r) => (
            <DropdownMenuRadioItem
              key={r.id}
              value={r.id}
              className="items-start py-2"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">{r.label}</span>
                <span className="text-xs text-muted-foreground">
                  {r.description}
                </span>
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
