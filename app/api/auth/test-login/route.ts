import { NextRequest, NextResponse } from 'next/server'
import { validateCredentials } from '@/lib/auth/mock-accounts'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')
  const password = searchParams.get('password')

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

  // Create a redirect response with set-cookie headers (not ideal for localStorage, but for testing)
  const response = NextResponse.redirect(new URL('/dashboard', request.url), 302)
  
  // Add response headers with user data (to be read by client)
  response.headers.set('X-User-Data', JSON.stringify(user))

  return response
}
