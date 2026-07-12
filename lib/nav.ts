import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  Leaf,
  Users,
  Scale,
  FileBarChart,
  Settings,
  Gamepad2,
  Bell,
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
  roles?: Role[]
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
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
    label: 'Game On',
    href: '/gamification',
    icon: Gamepad2,
    children: [
      { label: 'Overview', href: '/gamification' },
      { label: 'ESG Leagues', href: '/gamification/leagues' },
      { label: 'Weekly Missions', href: '/gamification/missions' },
      { label: 'Streaks & Achievements', href: '/gamification/streaks' },
      { label: 'Champion & Events', href: '/gamification/champion' },
      { label: 'Challenges', href: '/challenges' },
      { label: 'Rewards', href: '/rewards' },
    ],
  },
  {
    label: 'Reports',
    href: '/reports',
    icon: FileBarChart,
    roles: ['manager', 'officer', 'admin'],
  },
  {
    label: 'Alerts',
    href: '/governance/compliance',
    icon: Bell,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['admin'],
  },
]
