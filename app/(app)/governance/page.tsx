'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, CheckSquare, Shield } from 'lucide-react'

const modules = [
  {
    title: 'Policies',
    description: 'Corporate policies and governance documents',
    href: '/governance/policies',
    icon: FileText,
    stats: '5 policies',
  },
  {
    title: 'Audits',
    description: 'Internal and external audit management',
    href: '/governance/audits',
    icon: CheckSquare,
    stats: '5 audits',
  },
  {
    title: 'Compliance',
    description: 'Regulatory compliance tracking',
    href: '/governance/compliance',
    icon: Shield,
    stats: '6 regulations',
  },
]

export default function GovernancePage() {
  return (
    <main className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Governance Module</h1>
        <p className="text-foreground/60 mt-2">Manage policies, audits, and regulatory compliance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((module) => {
          const Icon = module.icon
          return (
            <Card key={module.href} className="hover:border-primary/50 transition cursor-pointer">
              <Link href={module.href}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-governance/10 rounded-lg">
                        <Icon className="w-5 h-5 text-governance" />
                      </div>
                      <div>
                        <CardTitle>{module.title}</CardTitle>
                        <CardDescription className="mt-1">{module.description}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-governance">{module.stats}</p>
                    <Button variant="ghost" size="sm">
                      Explore →
                    </Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
          )
        })}
      </div>
    </main>
  )
}
