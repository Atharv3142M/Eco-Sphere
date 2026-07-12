'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { DynamicButton } from '@/components/ui/dynamic-button'
import { Settings, Users, Bell, Shield, Database, Zap, Plus, Trash2 } from 'lucide-react'
import { getAllAccounts, registerNewAccount, deleteAccount, type StoredAccount } from '@/lib/auth/account-store'
import { UserRole } from '@/types/auth'
import { useAuth } from '@/lib/auth/context'
import { DEPARTMENTS } from '@/lib/esg-data'
import { toast } from 'sonner'

const settingsCards = [
  { id: 'users', title: 'User Management', description: 'Manage roles, permissions, and access levels', icon: Users },
  { id: 'notifications', title: 'Notifications', description: 'Configure alerts and communication settings', icon: Bell },
  { id: 'security', title: 'Security', description: 'Configure authentication and security policies', icon: Shield },
  { id: 'integrations', title: 'Integrations', description: 'Connect external services and APIs', icon: Database },
  { id: 'system', title: 'System Configuration', description: 'Configure organization settings and policies', icon: Zap },
  { id: 'audit', title: 'Audit Log', description: 'View system activity and audit trail', icon: Settings },
]

export function AdminSettings() {
  const { user } = useAuth()
  const [accounts, setAccounts] = useState<StoredAccount[]>([])
  const [userSheetOpen, setUserSheetOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: UserRole.EMPLOYEE,
    department: 'Operations',
  })

  useEffect(() => {
    setAccounts(getAllAccounts())
  }, [])

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast.error('All fields are required')
      throw new Error('Validation failed')
    }
    const result = registerNewAccount(newUser)
    if (!result.ok) {
      toast.error(result.error)
      throw new Error(result.error)
    }
    setAccounts(getAllAccounts())
    setNewUser({ name: '', email: '', password: '', role: UserRole.EMPLOYEE, department: 'Operations' })
    setUserSheetOpen(false)
    toast.success('User added successfully')
  }

  const handleDeleteUser = (email: string) => {
    if (deleteAccount(email)) {
      setAccounts(getAllAccounts())
      toast.success('User removed')
    } else {
      toast.error('Cannot delete demo accounts')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Settings</h1>
        <p className="mt-2 text-muted-foreground">Manage system configuration and organization settings</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {settingsCards.map((setting) => {
          const Icon = setting.icon
          return (
            <Card key={setting.id} className="transition hover:border-primary/40">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gov/10 p-2">
                    <Icon className="size-5 text-gov" />
                  </div>
                  <div>
                    <CardTitle>{setting.title}</CardTitle>
                    <CardDescription className="mt-1">{setting.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" onClick={() => toast.info(`${setting.title} configuration opened`)}>
                  Configure →
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2"><Users className="size-5" />User Management</CardTitle>
            <CardDescription>{accounts.length} registered accounts</CardDescription>
          </div>
          <Sheet open={userSheetOpen} onOpenChange={setUserSheetOpen}>
            <SheetTrigger render={<Button size="sm"><Plus className="mr-2 size-4" />Add User</Button>} />
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add New User</SheetTitle>
                <SheetDescription>Create a new platform account</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="space-y-2"><Label>Name</Label><Input value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} /></div>
                <div className="space-y-2"><Label>Email</Label><Input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} /></div>
                <div className="space-y-2"><Label>Password</Label><Input type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} /></div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select value={newUser.role} onValueChange={(v) => setNewUser({ ...newUser, role: v as UserRole })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.values(UserRole).map((r) => (
                        <SelectItem key={r} value={r}>{r.replace('_', ' ')}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select value={newUser.department} onValueChange={(v) => setNewUser({ ...newUser, department: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <DynamicButton className="w-full" onClick={handleAddUser}>Add User</DynamicButton>
              </div>
            </SheetContent>
          </Sheet>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3 px-2">Email</th>
                  <th className="pb-3 px-2">Role</th>
                  <th className="pb-3 px-2">Department</th>
                  <th className="pb-3 pl-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((acc) => (
                  <tr key={acc.email} className="border-b border-border/60">
                    <td className="py-3 pr-4 font-medium">{acc.name}</td>
                    <td className="px-2 text-muted-foreground">{acc.email}</td>
                    <td className="px-2"><Badge variant="secondary">{acc.role.replace('_', ' ')}</Badge></td>
                    <td className="px-2">{acc.department}</td>
                    <td className="pl-2">
                      {acc.email !== user?.email && !acc.email.endsWith('@ecosphere.com') ? (
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(acc.email)}>
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      ) : (
                        <Badge variant="outline" className="text-xs">Demo</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>System Status</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {['Database', 'API', 'Storage', 'Authentication'].map((s) => (
              <div key={s}>
                <p className="mb-2 text-sm text-muted-foreground">{s}</p>
                <Badge className="bg-success text-success-foreground">Operational</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
