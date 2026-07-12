'use client'

import React, { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/context'
import { canAccessRoute } from '@/lib/auth/rbac'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface ProtectedRouteProps {
  children: ReactNode
  requiredPermissions?: string[]
  fallback?: ReactNode
  route?: string
}

export function ProtectedRoute({
  children,
  requiredPermissions,
  fallback,
  route,
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  if (!user) {
    router.push('/auth/login')
    return null
  }

  // Check route access
  if (route && !canAccessRoute(user.role, route)) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                Access Denied
              </CardTitle>
              <CardDescription>
                You don&apos;t have permission to access this page
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertDescription>
                  Your current role ({user.role}) doesn&apos;t have access to this resource. 
                  Contact your administrator if you need access.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      )
    )
  }

  return <>{children}</>
}
