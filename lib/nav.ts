import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  Leaf,
  Users,
  Scale,
  Trophy,
  Gift,
  FileBarChart,
  Settings,
} from 'lucide-react'
import type { Role } from './types'

export interface NavChild {
  label: string
  href: string
}

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  children?: NavChild[]
  /** roles that can see this item; omit for all roles */
  roles?: Role[]
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    label: 'Environmental',
    href: '/environmental',
    icon: Leaf,
    children: [
      { label: 'Carbon Overview', href: '/environmental/carbon' },
      { label: 'Emission Sources', href: '/environmental/sources' },
      { label: 'Goals', href: '/environmental/goals' },
      { label: 'Carbon Calculator', href: '/environmental/calculator' },
    ],
  },
  {
    label: 'Social',
    href: '/social',
    icon: Users,
    children: [
      { label: 'CSR Activities', href: '/social/activities' },
      { label: 'Participation', href: '/social/participation' },
      { label: 'Diversity', href: '/social/diversity' },
      { label: 'Training', href: '/social/training' },
    ],
  },
  {
    label: 'Governance',
    href: '/governance',
    icon: Scale,
    children: [
      { label: 'Policies', href: '/governance/policies' },
      { label: 'Audits', href: '/governance/audits' },
      { label: 'Compliance', href: '/governance/compliance' },
    ],
  },
  {
    label: 'Challenges',
    href: '/challenges',
    icon: Trophy,
    children: [
      { label: 'Active', href: '/challenges/active' },
      { label: 'Completed', href: '/challenges/completed' },
      { label: 'My Challenges', href: '/challenges/mine' },
    ],
  },
  {
    label: 'Rewards',
    href: '/rewards',
    icon: Gift,
  },
  {
    label: 'Reports',
    href: '/reports',
    icon: FileBarChart,
    roles: ['manager', 'officer', 'admin'],
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['admin'],
  },
]
