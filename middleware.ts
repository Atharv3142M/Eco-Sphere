import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('sessionToken')?.value
  const pathname = request.nextUrl.pathname

  // Check if user is authenticated
  const isAuthenticated = !!sessionToken || typeof window !== 'undefined' && localStorage.getItem('sessionToken')

  // Public routes that don't require authentication
  const publicRoutes = ['/auth/login', '/auth/signup', '/']

  // Check if current route is public
  const isPublicRoute = publicRoutes.includes(pathname)

  // Redirect to login if accessing protected route without auth
  if (!isPublicRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Redirect to dashboard if accessing auth pages while authenticated
  if (isPublicRoute && isAuthenticated && pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
