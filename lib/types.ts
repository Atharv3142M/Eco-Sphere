export type Role = 'employee' | 'manager' | 'officer' | 'admin'

export interface RoleDef {
  id: Role
  label: string
  description: string
}

export type ModuleKey = 'environmental' | 'social' | 'governance'

export interface EsgScore {
  overall: number
  environmental: number
  social: number
  governance: number
  deltaMonth: number
  environmentalDelta: number
  socialDelta: number
  governanceDelta: number
}

export type InsightSeverity = 'info' | 'success' | 'warning' | 'danger'

export interface Insight {
  id: string
  severity: InsightSeverity
  title: string
  detail: string
  module: ModuleKey | 'gamification' | 'governance'
  time: string
}

export interface CarbonTrendPoint {
  month: string
  emissions: number
  target: number
  topSource: string
  topDepartment: string
  reason: string
}

export interface DepartmentRank {
  rank: number
  name: string
  score: number
  environmental: number
  social: number
  governance: number
  trend: number
}

export type NotificationKind =
  | 'challenge'
  | 'badge'
  | 'policy'
  | 'compliance'
  | 'reward'

export interface AppNotification {
  id: string
  kind: NotificationKind
  title: string
  detail: string
  time: string
  read: boolean
  priority: 'low' | 'medium' | 'high'
}
