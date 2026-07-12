import { NextRequest, NextResponse } from 'next/server'
import { registerNewAccount } from '@/lib/auth/mock-accounts'
import { UserRole } from '@/types/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, role, department } = body

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Register new account
    const registered = registerNewAccount({
      email,
      password,
      name,
      role: (role as UserRole) || UserRole.EMPLOYEE,
      department: department || 'Operations',
    })

    if (!registered) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      )
    }

    const user = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role: (role as UserRole) || UserRole.EMPLOYEE,
      department: department || 'Operations',
      createdAt: new Date().toISOString(),
    }

    const response = NextResponse.json({
      success: true,
      user,
    })

    // Set session cookie
    const sessionToken = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    response.cookies.set({
      name: 'sessionToken',
      value: sessionToken,
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
