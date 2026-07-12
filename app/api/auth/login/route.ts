import { NextRequest, NextResponse } from 'next/server'
import { validateCredentials } from '@/lib/auth/mock-accounts'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const account = validateCredentials(email, password)

    if (!account) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    const user = {
      id: Math.random().toString(36).substr(2, 9),
      email: account.email,
      name: account.name,
      role: account.role,
      department: account.department,
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
      httpOnly: false, // Allow JavaScript access for localStorage sync
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
