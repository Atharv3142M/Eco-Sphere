import { UserRole } from '@/types/auth'

export interface StoredAccount {
  email: string
  password: string
  name: string
  role: UserRole
  department: string
}

const ACCOUNTS_KEY = 'ecosphere_registered_accounts'

export const DEMO_ACCOUNTS: StoredAccount[] = [
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

function readCustomAccounts(): StoredAccount[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY)
    return raw ? (JSON.parse(raw) as StoredAccount[]) : []
  } catch {
    return []
  }
}

function writeCustomAccounts(accounts: StoredAccount[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
}

export function getAllAccounts(): StoredAccount[] {
  const custom = readCustomAccounts()
  const demoEmails = new Set(DEMO_ACCOUNTS.map((a) => a.email.toLowerCase()))
  const merged = [
    ...DEMO_ACCOUNTS,
    ...custom.filter((a) => !demoEmails.has(a.email.toLowerCase())),
  ]
  return merged
}

export function validateCredentials(email: string, password: string): StoredAccount | null {
  const account = getAllAccounts().find(
    (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password,
  )
  return account ?? null
}

export function registerNewAccount(
  account: StoredAccount,
): { ok: true } | { ok: false; error: string } {
  const emailLower = account.email.toLowerCase()
  const exists = getAllAccounts().some((a) => a.email.toLowerCase() === emailLower)
  if (exists) return { ok: false, error: 'Email already registered' }

  const custom = readCustomAccounts()
  custom.push({ ...account, email: account.email.toLowerCase() })
  writeCustomAccounts(custom)
  return { ok: true }
}

export function updateAccount(email: string, updates: Partial<StoredAccount>) {
  const emailLower = email.toLowerCase()
  const isDemo = DEMO_ACCOUNTS.some((a) => a.email.toLowerCase() === emailLower)
  if (isDemo) return false

  const custom = readCustomAccounts()
  const idx = custom.findIndex((a) => a.email.toLowerCase() === emailLower)
  if (idx === -1) return false
  custom[idx] = { ...custom[idx], ...updates, email: emailLower }
  writeCustomAccounts(custom)
  return true
}

export function deleteAccount(email: string): boolean {
  const emailLower = email.toLowerCase()
  if (DEMO_ACCOUNTS.some((a) => a.email.toLowerCase() === emailLower)) return false
  const custom = readCustomAccounts().filter((a) => a.email.toLowerCase() !== emailLower)
  writeCustomAccounts(custom)
  return true
}

export function stableUserId(email: string) {
  return `user_${email.toLowerCase().replace(/[^a-z0-9]/g, '_')}`
}
