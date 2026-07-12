'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, UserRole, AuthContextType } from '@/types/auth'
import { validateCredentials, registerNewAccount } from './mock-accounts'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const sessionToken = localStorage.getItem('sessionToken')
    
    if (storedUser && sessionToken) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse stored user:', error)
        localStorage.removeItem('user')
        localStorage.removeItem('sessionToken')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Validate credentials against mock accounts
      const account = validateCredentials(email, password)
      
      if (!account) {
        throw new Error('Invalid email or password')
      }

      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: account.email,
        name: account.name,
        role: account.role,
        department: account.department,
        createdAt: new Date(),
      }

      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('sessionToken', `token_${Date.now()}`)
      
      // Update state
      setUser(user)
      return true
    } catch (error) {
      localStorage.removeItem('user')
      localStorage.removeItem('sessionToken')
      setUser(null)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (email: string, password: string, name: string, role: UserRole, department: string = 'Operations') => {
    setIsLoading(true)
    try {
      // Register new account
      const registered = registerNewAccount({
        email,
        password,
        name,
        role,
        department,
      })

      if (!registered) {
        throw new Error('Email already registered')
      }

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role,
        department,
        createdAt: new Date(),
      }

      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(newUser))
      localStorage.setItem('sessionToken', `token_${Date.now()}`)
      
      // Update state
      setUser(newUser)
      return true
    } catch (error) {
      localStorage.removeItem('user')
      localStorage.removeItem('sessionToken')
      setUser(null)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      localStorage.removeItem('user')
      localStorage.removeItem('sessionToken')
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const switchRole = async (newRole: UserRole) => {
    if (!user) return
    
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const updatedUser: User = {
        ...user,
        role: newRole,
      }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setUser(updatedUser)
    } finally {
      setIsLoading(false)
    }
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
