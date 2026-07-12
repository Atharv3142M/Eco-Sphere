'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Settings, Users, Bell, Shield, Database, Zap } from 'lucide-react'

const settings = [
  {
    id: 'users',
    title: 'User Management',
    description: 'Manage roles, permissions, and access levels',
    icon: Users,
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Configure alerts and communication settings',
    icon: Bell,
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Configure authentication and security policies',
    icon: Shield,
  },
  {
    id: 'integrations',
    title: 'Integrations',
    description: 'Connect external services and APIs',
    icon: Database,
  },
  {
    id: 'system',
    title: 'System Configuration',
    description: 'Configure organization settings and policies',
    icon: Zap,
  },
  {
    id: 'audit',
    title: 'Audit Log',
    description: 'View system activity and audit trail',
    icon: Settings,
  },
]

export function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Settings</h1>
        <p className="text-foreground/60 mt-2">Manage system configuration and organization settings</p>
      </div>

      {/* Configuration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {settings.map((setting) => {
          const Icon = setting.icon
          return (
            <Card key={setting.id} className="hover:border-primary/50 transition cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-governance/10 rounded-lg">
                      <Icon className="w-5 h-5 text-governance" />
                    </div>
                    <div>
                      <CardTitle>{setting.title}</CardTitle>
                      <CardDescription className="mt-1">{setting.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm">
                  Configure →
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-foreground/60 mb-2">Database</p>
              <Badge className="bg-environment text-white">Operational</Badge>
            </div>
            <div>
              <p className="text-sm text-foreground/60 mb-2">API</p>
              <Badge className="bg-environment text-white">Operational</Badge>
            </div>
            <div>
              <p className="text-sm text-foreground/60 mb-2">Storage</p>
              <Badge className="bg-environment text-white">Operational</Badge>
            </div>
            <div>
              <p className="text-sm text-foreground/60 mb-2">Authentication</p>
              <Badge className="bg-environment text-white">Operational</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Organization Info */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Organization Name</label>
            <p className="text-foreground/60 mt-1">EcoSphere Inc.</p>
          </div>
          <div>
            <label className="text-sm font-medium">Total Users</label>
            <p className="text-foreground/60 mt-1">850 employees</p>
          </div>
          <div>
            <label className="text-sm font-medium">Plan</label>
            <p className="text-foreground/60 mt-1">Enterprise</p>
          </div>
          <div>
            <label className="text-sm font-medium">Support</label>
            <p className="text-foreground/60 mt-1">Premium 24/7 Support</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
