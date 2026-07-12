import { UserRole } from '@/types/auth'

export interface MockAccount {
  email: string
  password: string
  name: string
  role: UserRole
  department: string
}

// Mock accounts for testing - all roles available
export const MOCK_ACCOUNTS: MockAccount[] = [
  {
    email: 'admin@ecosphere.com',
    password: 'admin123',
    name: 'Admin User',
    role: UserRole.ADMIN,
    department: 'Management',
  },
  {
    email: 'manager@ecosphere.com',
    password: 'manager123',
    name: 'Sarah Manager',
    role: UserRole.ESG_MANAGER,
    department: 'Sustainability',
  },
  {
    email: 'head@ecosphere.com',
    password: 'head123',
    name: 'John Head',
    role: UserRole.DEPARTMENT_HEAD,
    department: 'Operations',
  },
  {
    email: 'employee@ecosphere.com',
    password: 'employee123',
    name: 'Emily Employee',
    role: UserRole.EMPLOYEE,
    department: 'Finance',
  },
]

// Registered accounts (user signup storage)
export const REGISTERED_ACCOUNTS = new Map<string, MockAccount>()

// Initialize with mock accounts
MOCK_ACCOUNTS.forEach(account => {
  REGISTERED_ACCOUNTS.set(account.email.toLowerCase(), account)
})

export function validateCredentials(email: string, password: string): MockAccount | null {
  const account = REGISTERED_ACCOUNTS.get(email.toLowerCase())
  if (!account || account.password !== password) {
    return null
  }
  return account
}

export function registerNewAccount(account: Omit<MockAccount, 'password'> & { password: string }): boolean {
  const emailLower = account.email.toLowerCase()
  
  // Check if account already exists
  if (REGISTERED_ACCOUNTS.has(emailLower)) {
    return false
  }
  
  // Register new account
  REGISTERED_ACCOUNTS.set(emailLower, {
    email: account.email,
    password: account.password,
    name: account.name,
    role: account.role,
    department: account.department,
  })
  
  return true
}
