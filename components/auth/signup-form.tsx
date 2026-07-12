'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth/context'
import { UserRole } from '@/types/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Loader2 } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

const DEPARTMENTS = [
  'Operations',
  'Finance',
  'HR',
  'Marketing',
  'IT',
  'Sales',
  'Legal',
  'Sustainability',
]

export function SignupForm() {
  const router = useRouter()
  const { signup, isLoading } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: UserRole.EMPLOYEE,
    department: 'Operations',
  })
  const [error, setError] = useState('')

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.email || !formData.password || !formData.name) {
      setError('Please fill in all fields')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      await signup(
        formData.email,
        formData.password,
        formData.name,
        formData.role,
        formData.department
      )
      // Redirect after signup is complete
      setTimeout(() => {
        router.push('/dashboard')
      }, 500)
    } catch (err) {
      setError('Failed to create account')
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-2">
        <CardTitle>Join EcoSphere</CardTitle>
        <CardDescription>
          Create an account to start managing ESG performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={formData.role} onValueChange={(value) => handleChange('role', value)}>
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={UserRole.EMPLOYEE}>Employee</SelectItem>
                  <SelectItem value={UserRole.DEPARTMENT_HEAD}>Department Head</SelectItem>
                  <SelectItem value={UserRole.ESG_MANAGER}>ESG Manager</SelectItem>
                  <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select value={formData.department} onValueChange={(value) => handleChange('department', value)}>
                <SelectTrigger id="department">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>

          <div className="text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
