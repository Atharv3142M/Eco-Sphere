import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_PATHS = ['/auth/login', '/auth/signup']
const AUTH_API_PREFIX = '/api/auth/'

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('sessionToken')?.value
  const pathname = request.nextUrl.pathname

  const isAuthenticated = Boolean(sessionToken)
  const isPublicRoute =
    PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`)) ||
    pathname.startsWith(AUTH_API_PREFIX)

  if (!isPublicRoute && pathname !== '/' && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (isAuthenticated && pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.svg).*)'],
}
