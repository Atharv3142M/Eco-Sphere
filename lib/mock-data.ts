import type {
  AppNotification,
  CarbonTrendPoint,
  DepartmentRank,
  EsgScore,
  Insight,
  RoleDef,
} from './types'

export const CURRENT_USER = {
  name: 'Sarah Chen',
  firstName: 'Sarah',
  initials: 'SC',
  title: 'Sustainability Lead',
  department: 'Finance',
  level: 16,
  xp: 12480,
  streak: 19,
}

export const ROLES: RoleDef[] = [
  {
    id: 'employee',
    label: 'Employee',
    description: 'Join challenges, upload proof, redeem rewards',
  },
  {
    id: 'manager',
    label: 'Department Manager',
    description: 'Monitor department score, approve submissions',
  },
  {
    id: 'officer',
    label: 'ESG Officer',
    description: 'Carbon tracking, goals, reports, compliance',
  },
  {
    id: 'admin',
    label: 'Administrator',
    description: 'Configure factors, policies, rewards, users',
  },
]

export const ESG_SCORE: EsgScore = {
  overall: 87.4,
  environmental: 82,
  social: 91,
  governance: 89,
  deltaMonth: 4.2,
  environmentalDelta: 6,
  socialDelta: 2,
  governanceDelta: 1,
}

export const INSIGHTS: Insight[] = [
  {
    id: 'i1',
    severity: 'warning',
    title: 'Department A emissions increased',
    detail: 'Manufacturing emissions up 12% vs last month',
    module: 'environmental',
    time: '2h ago',
  },
  {
    id: 'i2',
    severity: 'success',
    title: 'Sales won the Green Challenge',
    detail: 'Zero Plastic Week completed by 24 members',
    module: 'gamification',
    time: '5h ago',
  },
  {
    id: 'i3',
    severity: 'info',
    title: '31 employees acknowledged policy',
    detail: 'Updated Data Privacy Policy acceptance',
    module: 'governance',
    time: 'Today',
  },
  {
    id: 'i4',
    severity: 'danger',
    title: '2 compliance issues overdue',
    detail: 'Audit findings past their due date',
    module: 'governance',
    time: 'Today',
  },
  {
    id: 'i5',
    severity: 'success',
    title: 'Carbon reduced by 18%',
    detail: 'Quarter-over-quarter reduction across fleet',
    module: 'environmental',
    time: 'Yesterday',
  },
]

export const CARBON_TREND: CarbonTrendPoint[] = [
  {
    month: 'Jan',
    emissions: 620,
    target: 600,
    topSource: 'Manufacturing',
    topDepartment: 'Operations',
    reason: 'Peak production cycle',
  },
  {
    month: 'Feb',
    emissions: 540,
    target: 580,
    topSource: 'Fleet',
    topDepartment: 'Logistics',
    reason: 'Expanded delivery routes',
  },
  {
    month: 'Mar',
    emissions: 470,
    target: 560,
    topSource: 'Purchases',
    topDepartment: 'Procurement',
    reason: 'Bulk raw material orders',
  },
  {
    month: 'Apr',
    emissions: 430,
    target: 540,
    topSource: 'Fleet',
    topDepartment: 'Logistics',
    reason: 'Route optimization rollout',
  },
  {
    month: 'May',
    emissions: 390,
    target: 520,
    topSource: 'Manufacturing',
    topDepartment: 'Operations',
    reason: 'Efficiency upgrades',
  },
  {
    month: 'Jun',
    emissions: 355,
    target: 500,
    topSource: 'Expenses',
    topDepartment: 'Sales',
    reason: 'Reduced business travel',
  },
]

export const DEPARTMENT_RANKS: DepartmentRank[] = [
  {
    rank: 1,
    name: 'Finance',
    score: 94,
    environmental: 90,
    social: 96,
    governance: 96,
    trend: 3,
  },
  {
    rank: 2,
    name: 'HR',
    score: 91,
    environmental: 85,
    social: 98,
    governance: 90,
    trend: 2,
  },
  {
    rank: 3,
    name: 'Marketing',
    score: 88,
    environmental: 84,
    social: 92,
    governance: 88,
    trend: 1,
  },
  {
    rank: 4,
    name: 'IT',
    score: 84,
    environmental: 82,
    social: 85,
    governance: 85,
    trend: -1,
  },
  {
    rank: 5,
    name: 'Operations',
    score: 79,
    environmental: 72,
    social: 84,
    governance: 81,
    trend: -2,
  },
]

export const NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    kind: 'challenge',
    title: 'Challenge approved',
    detail: 'Your Zero Plastic Week proof was approved (+350 XP)',
    time: '10m ago',
    read: false,
    priority: 'medium',
  },
  {
    id: 'n2',
    kind: 'badge',
    title: 'Badge unlocked',
    detail: 'You earned the Carbon Cutter badge',
    time: '1h ago',
    read: false,
    priority: 'low',
  },
  {
    id: 'n3',
    kind: 'compliance',
    title: 'Compliance issue overdue',
    detail: 'Audit finding AUD-204 is past its due date',
    time: '3h ago',
    read: false,
    priority: 'high',
  },
  {
    id: 'n4',
    kind: 'policy',
    title: 'Policy acknowledgement reminder',
    detail: 'Please review and accept the Data Privacy Policy',
    time: 'Today',
    read: true,
    priority: 'medium',
  },
  {
    id: 'n5',
    kind: 'reward',
    title: 'Reward redeemed',
    detail: 'Coffee Coupon redeemed for 200 XP',
    time: 'Yesterday',
    read: true,
    priority: 'low',
  },
]
