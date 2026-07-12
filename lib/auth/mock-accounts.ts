import { UserRole } from '@/types/auth'
import {
  DEMO_ACCOUNTS,
  getAllAccounts,
  registerNewAccount as registerStored,
  validateCredentials as validateStored,
  type StoredAccount,
} from './account-store'

export type MockAccount = StoredAccount

export const MOCK_ACCOUNTS = DEMO_ACCOUNTS

export function validateCredentials(email: string, password: string): MockAccount | null {
  if (typeof window !== 'undefined') {
    return validateStored(email, password)
  }
  const account = DEMO_ACCOUNTS.find(
    (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password,
  )
  return account ?? null
}

export function registerNewAccount(
  account: Omit<MockAccount, 'password'> & { password: string },
): boolean {
  if (typeof window === 'undefined') return false
  const result = registerStored({
    ...account,
    email: account.email.toLowerCase(),
  })
  return result.ok
}

export { getAllAccounts }
