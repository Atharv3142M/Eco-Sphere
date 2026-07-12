'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, UserRole, AuthContextType } from '@/types/auth'
import { validateCredentials, registerNewAccount } from './mock-accounts'
import { stableUserId, updateAccount } from './account-store'
import { getUserGamificationStats } from '@/lib/esg-data'
import {
  clearSessionCookie,
  createSessionToken,
  setSessionCookie,
} from './session'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function enrichUser(user: User): User {
  const stats = getUserGamificationStats(user.id, user.department)
  return {
    ...user,
    level: user.level ?? stats.level,
    xp: user.xp !== undefined && user.xp !== null ? user.xp : stats.xp,
    streak: user.streak ?? stats.streak,
  }
}

function persistUser(user: User, token: string) {
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('sessionToken', token)
  setSessionCookie(token)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const sessionToken = localStorage.getItem('sessionToken')

    if (storedUser && sessionToken) {
      try {
        const parsed = JSON.parse(storedUser) as User
        setUser(enrichUser(parsed))
        setSessionCookie(sessionToken)
      } catch {
        localStorage.removeItem('user')
        localStorage.removeItem('sessionToken')
        clearSessionCookie()
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const account = validateCredentials(email, password)
      if (!account) throw new Error('Invalid email or password')

      const existingRaw = localStorage.getItem('user')
      let preserved: Partial<User> = {}
      if (existingRaw) {
        try {
          const existing = JSON.parse(existingRaw) as User
          if (existing.email.toLowerCase() === email.toLowerCase()) {
            preserved = { xp: existing.xp, level: existing.level, streak: existing.streak }
          }
        } catch { /* ignore */ }
      }

      const nextUser = enrichUser({
        id: stableUserId(account.email),
        email: account.email,
        name: account.name,
        role: account.role,
        department: account.department,
        createdAt: new Date().toISOString(),
        ...preserved,
      })

      const token = createSessionToken()
      persistUser(nextUser, token)
      setUser(nextUser)
    } catch (error) {
      localStorage.removeItem('user')
      localStorage.removeItem('sessionToken')
      clearSessionCookie()
      setUser(null)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (
    email: string,
    password: string,
    name: string,
    role: UserRole,
    department: string = 'Operations',
  ) => {
    setIsLoading(true)
    try {
      const registered = registerNewAccount({ email, password, name, role, department })
      if (!registered) throw new Error('Email already registered')

      const nextUser = enrichUser({
        id: stableUserId(email),
        email: email.toLowerCase(),
        name,
        role,
        department,
        createdAt: new Date().toISOString(),
      })

      const token = createSessionToken()
      persistUser(nextUser, token)
      setUser(nextUser)
    } catch (error) {
      localStorage.removeItem('user')
      localStorage.removeItem('sessionToken')
      clearSessionCookie()
      setUser(null)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      localStorage.removeItem('user')
      localStorage.removeItem('sessionToken')
      clearSessionCookie()
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const switchRole = async (newRole: UserRole) => {
    if (!user) return
    setIsLoading(true)
    try {
      const updatedUser = enrichUser({ ...user, role: newRole })
      updateAccount(user.email, { role: newRole })
      const token = localStorage.getItem('sessionToken') ?? createSessionToken()
      persistUser(updatedUser, token)
      setUser(updatedUser)
    } finally {
      setIsLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return
    const updatedUser = enrichUser({ ...user, ...updates })
    if (updates.name || updates.department) {
      updateAccount(user.email, {
        name: updates.name ?? user.name,
        department: updates.department ?? user.department ?? 'Operations',
      })
    }
    const token = localStorage.getItem('sessionToken') ?? createSessionToken()
    persistUser(updatedUser, token)
    setUser(updatedUser)
  }

  const deductXp = async (amount: number) => {
    if (!user) throw new Error('Not authenticated')
    const currentXp = user.xp ?? 0
    if (currentXp < amount) throw new Error('Insufficient XP')
    await updateProfile({ xp: currentXp - amount })
  }

  const addXp = async (amount: number) => {
    if (!user) throw new Error('Not authenticated')
    await updateProfile({ xp: (user.xp ?? 0) + amount })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        switchRole,
        updateProfile,
        deductXp,
        addXp,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
