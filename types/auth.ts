export enum UserRole {
  ADMIN = 'admin',
  ESG_MANAGER = 'esg_manager',
  DEPARTMENT_HEAD = 'department_head',
  EMPLOYEE = 'employee',
}

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  department?: string
  avatar?: string
  level?: number
  xp?: number
  streak?: number
  createdAt: Date | string
}

export interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string, role: UserRole, department?: string) => Promise<void>
  logout: () => Promise<void>
  switchRole: (role: UserRole) => Promise<void>
  updateProfile: (updates: Partial<User>) => Promise<void>
}
