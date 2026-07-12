import type {
  AppNotification,
  EsgScore,
  Insight,
  RoleDef,
} from './types'

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
  overall: 91,
  environmental: 86,
  social: 91,
  governance: 89,
  deltaMonth: 12,
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
