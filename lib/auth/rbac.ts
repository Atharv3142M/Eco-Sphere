import { UserRole } from '@/types/auth'

// Define permission matrix
const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  [UserRole.ADMIN]: [
    'view_dashboard',
    'view_environmental',
    'view_social',
    'view_governance',
    'view_challenges',
    'view_rewards',
    'view_reports',
    'manage_users',
    'manage_settings',
    'manage_goals',
    'export_reports',
    'create_challenges',
    'manage_rewards',
  ],
  [UserRole.ESG_MANAGER]: [
    'view_dashboard',
    'view_environmental',
    'view_social',
    'view_governance',
    'view_challenges',
    'view_rewards',
    'view_reports',
    'manage_goals',
    'export_reports',
    'create_challenges',
  ],
  [UserRole.DEPARTMENT_HEAD]: [
    'view_dashboard',
    'view_environmental',
    'view_social',
    'view_governance',
    'view_challenges',
    'view_rewards',
    'view_reports',
    'export_reports',
  ],
  [UserRole.EMPLOYEE]: [
    'view_dashboard',
    'view_environmental',
    'view_social',
    'view_challenges',
    'view_rewards',
    'view_reports',
  ],
}

export function hasPermission(role: UserRole, permission: string): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
}

export function hasAnyPermission(role: UserRole, permissions: string[]): boolean {
  return permissions.some(permission => hasPermission(role, permission))
}

export function hasAllPermissions(role: UserRole, permissions: string[]): boolean {
  return permissions.every(permission => hasPermission(role, permission))
}

export function canAccessRoute(role: UserRole, route: string): boolean {
  const routePermissionMap: Record<string, string> = {
    '/dashboard': 'view_dashboard',
    '/environmental': 'view_environmental',
    '/social': 'view_social',
    '/governance': 'view_governance',
    '/challenges': 'view_challenges',
    '/rewards': 'view_rewards',
    '/reports': 'view_reports',
    '/settings': 'manage_settings',
  }

  const requiredPermission = routePermissionMap[route]
  if (!requiredPermission) return true // Allow access to routes without explicit permission

  return hasPermission(role, requiredPermission)
}

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  [UserRole.ADMIN]: 4,
  [UserRole.ESG_MANAGER]: 3,
  [UserRole.DEPARTMENT_HEAD]: 2,
  [UserRole.EMPLOYEE]: 1,
}

export function canSwitchToRole(currentRole: UserRole, targetRole: UserRole): boolean {
  // Users can only switch to their own role or lower (in hierarchy)
  return ROLE_HIERARCHY[currentRole] >= ROLE_HIERARCHY[targetRole]
}
