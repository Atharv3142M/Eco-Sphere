import type { DepartmentRank, EsgScore, Insight } from './types'

export const DEPARTMENTS = [
  'Operations',
  'Finance',
  'HR',
  'Marketing',
  'IT',
  'Sales',
  'Legal',
  'Sustainability',
  'Manufacturing',
] as const

export type DepartmentName = (typeof DEPARTMENTS)[number]

export interface DepartmentStats extends DepartmentRank {
  employees: number
  carbonTco2e: number
  goalsProgress: number
}

const DEPARTMENT_DATA: Record<string, DepartmentStats> = {
  Operations: {
    rank: 5,
    name: 'Operations',
    score: 79,
    environmental: 72,
    social: 84,
    governance: 81,
    trend: -2,
    employees: 142,
    carbonTco2e: 380,
    goalsProgress: 68,
  },
  Finance: {
    rank: 1,
    name: 'Finance',
    score: 94,
    environmental: 90,
    social: 96,
    governance: 96,
    trend: 3,
    employees: 68,
    carbonTco2e: 125.4,
    goalsProgress: 82,
  },
  HR: {
    rank: 2,
    name: 'HR',
    score: 91,
    environmental: 85,
    social: 98,
    governance: 90,
    trend: 2,
    employees: 45,
    carbonTco2e: 89,
    goalsProgress: 78,
  },
  Marketing: {
    rank: 3,
    name: 'Marketing',
    score: 88,
    environmental: 84,
    social: 92,
    governance: 88,
    trend: 1,
    employees: 52,
    carbonTco2e: 112,
    goalsProgress: 74,
  },
  IT: {
    rank: 4,
    name: 'IT',
    score: 84,
    environmental: 82,
    social: 85,
    governance: 85,
    trend: -1,
    employees: 78,
    carbonTco2e: 210,
    goalsProgress: 71,
  },
  Sales: {
    rank: 6,
    name: 'Sales',
    score: 76,
    environmental: 70,
    social: 80,
    governance: 78,
    trend: 0,
    employees: 95,
    carbonTco2e: 156,
    goalsProgress: 65,
  },
  Legal: {
    rank: 7,
    name: 'Legal',
    score: 86,
    environmental: 78,
    social: 88,
    governance: 92,
    trend: 1,
    employees: 28,
    carbonTco2e: 45,
    goalsProgress: 80,
  },
  Sustainability: {
    rank: 1,
    name: 'Sustainability',
    score: 96,
    environmental: 98,
    social: 94,
    governance: 95,
    trend: 4,
    employees: 24,
    carbonTco2e: 32,
    goalsProgress: 92,
  },
  Manufacturing: {
    rank: 8,
    name: 'Manufacturing',
    score: 71,
    environmental: 65,
    social: 76,
    governance: 72,
    trend: -3,
    employees: 210,
    carbonTco2e: 520,
    goalsProgress: 58,
  },
  Management: {
    rank: 3,
    name: 'Management',
    score: 89,
    environmental: 86,
    social: 90,
    governance: 91,
    trend: 2,
    employees: 15,
    carbonTco2e: 28,
    goalsProgress: 85,
  },
}

export function getDepartmentStats(department?: string): DepartmentStats {
  if (department && DEPARTMENT_DATA[department]) {
    return DEPARTMENT_DATA[department]
  }
  return DEPARTMENT_DATA.Operations
}

export function getOrganizationScores(): EsgScore {
  const depts = Object.values(DEPARTMENT_DATA)
  const avg = (key: keyof Pick<DepartmentStats, 'environmental' | 'social' | 'governance'>) =>
    Math.round(depts.reduce((s, d) => s + d[key], 0) / depts.length)

  const environmental = avg('environmental')
  const social = avg('social')
  const governance = avg('governance')
  const overall = Math.round(environmental * 0.4 + social * 0.3 + governance * 0.3)

  return {
    overall,
    environmental,
    social,
    governance,
    deltaMonth: 4.2,
    environmentalDelta: 6,
    socialDelta: 2,
    governanceDelta: 1,
  }
}

export function getDepartmentRankings(): DepartmentStats[] {
  return Object.values(DEPARTMENT_DATA)
    .sort((a, b) => b.score - a.score)
    .map((d, i) => ({ ...d, rank: i + 1 }))
}

export const ESG_TREND = [
  { month: 'Feb', overall: 82, environmental: 78, social: 85, governance: 83 },
  { month: 'Mar', overall: 84, environmental: 80, social: 86, governance: 84 },
  { month: 'Apr', overall: 86, environmental: 81, social: 88, governance: 86 },
  { month: 'May', overall: 88, environmental: 83, social: 89, governance: 87 },
  { month: 'Jun', overall: 89, environmental: 84, social: 90, governance: 88 },
  { month: 'Jul', overall: 91, environmental: 86, social: 91, governance: 89 },
]

export const IMPACT_DRIVERS = [
  { name: 'Renewable Energy Usage', impact: 12, module: 'environmental' as const },
  { name: 'Employee Participation', impact: 9, module: 'social' as const },
  { name: 'Policy Compliance', impact: 8, module: 'governance' as const },
  { name: 'Carbon Reduction', impact: 7, module: 'environmental' as const },
  { name: 'CSR Activities', impact: 6, module: 'social' as const },
]

export const LIVE_ALERTS: Insight[] = [
  {
    id: 'a1',
    severity: 'danger',
    title: 'Compliance issue opened',
    detail: 'Audit finding AUD-204 requires immediate attention',
    module: 'governance',
    time: '10m ago',
  },
  {
    id: 'a2',
    severity: 'success',
    title: 'CSR Activity Approved',
    detail: 'Beach Clean-Up Initiative approved by ESG Manager',
    module: 'social',
    time: '1h ago',
  },
  {
    id: 'a3',
    severity: 'warning',
    title: 'Emissions threshold warning',
    detail: 'Manufacturing department approaching monthly limit',
    module: 'environmental',
    time: '3h ago',
  },
  {
    id: 'a4',
    severity: 'success',
    title: 'Badge unlocked',
    detail: 'Carbon Cutter badge awarded to 3 employees',
    module: 'gamification',
    time: 'Today',
  },
]

export const carbonTrend = [
  { month: 'Feb', actual: 540, target: 580 },
  { month: 'Mar', actual: 470, target: 560 },
  { month: 'Apr', actual: 430, target: 540 },
  { month: 'May', actual: 390, target: 520 },
  { month: 'Jun', actual: 355, target: 500 },
  { month: 'Jul', actual: 325, target: 480 },
]

export function getUserGamificationStats(userId?: string, department?: string) {
  const dept = getDepartmentStats(department)
  const hash = (userId ?? 'default').split('').reduce((a, c) => a + c.charCodeAt(0), 0)

  return {
    level: 8 + (hash % 12),
    xp: 3200 + (hash % 8000),
    streak: 5 + (hash % 25),
    badges: 3 + (hash % 8),
    departmentRank: dept.rank,
    departmentScore: dept.score,
    goalsProgress: dept.goalsProgress,
    carbonTco2e: dept.carbonTco2e,
  }
}
