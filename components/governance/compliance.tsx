'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react'

const regulations = [
  {
    id: 'iso-14001',
    name: 'ISO 14001',
    description: 'Environmental Management System',
    status: 'compliant',
    progress: 100,
    lastAudit: '2024-06-15',
    nextAudit: '2025-06-15',
  },
  {
    id: 'gdpr',
    name: 'GDPR',
    description: 'General Data Protection Regulation',
    status: 'compliant',
    progress: 100,
    lastAudit: '2024-05-20',
    nextAudit: '2024-12-01',
  },
  {
    id: 'soc-2',
    name: 'SOC 2 Type II',
    description: 'Security and Data Protection',
    status: 'compliant',
    progress: 98,
    lastAudit: '2024-04-10',
    nextAudit: '2025-04-10',
  },
  {
    id: 'sec-regulations',
    name: 'SEC Regulations',
    description: 'Securities and Exchange Commission',
    status: 'non-compliant',
    progress: 65,
    lastAudit: '2024-03-01',
    nextAudit: '2024-08-15',
  },
  {
    id: 'california-privacy',
    name: 'California Privacy Act',
    description: 'CCPA Compliance',
    status: 'compliant',
    progress: 100,
    lastAudit: '2024-07-01',
    nextAudit: '2024-11-01',
  },
  {
    id: 'esg-reporting',
    name: 'ESG Reporting Standards',
    description: 'GRI, SASB, TCFD Standards',
    status: 'partial',
    progress: 78,
    lastAudit: '2024-06-30',
    nextAudit: '2024-12-30',
  },
]

const statusConfig = {
  compliant: { icon: CheckCircle2, color: 'text-environment', badge: 'Compliant' },
  'non-compliant': { icon: AlertCircle, color: 'text-destructive', badge: 'Non-Compliant' },
  partial: { icon: AlertCircle, color: 'text-warning', badge: 'Partial' },
}

export function Compliance() {
  const compliant = regulations.filter((r) => r.status === 'compliant').length
  const nonCompliant = regulations.filter((r) => r.status === 'non-compliant').length
  const partial = regulations.filter((r) => r.status === 'partial').length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Compliance Dashboard</h2>
        <p className="text-foreground/60 mt-1">Track regulatory compliance across the organization</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Compliant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-environment" />
              <div>
                <p className="text-3xl font-bold">{compliant}</p>
                <p className="text-xs text-foreground/60 mt-1">regulations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Non-Compliant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-8 h-8 text-destructive" />
              <div>
                <p className="text-3xl font-bold">{nonCompliant}</p>
                <p className="text-xs text-foreground/60 mt-1">regulations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Partial</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="w-8 h-8 text-warning" />
              <div>
                <p className="text-3xl font-bold">{partial}</p>
                <p className="text-xs text-foreground/60 mt-1">regulations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Matrix */}
      <div className="space-y-4">
        {regulations.map((regulation) => {
          const config = statusConfig[regulation.status as keyof typeof statusConfig]
          const Icon = config.icon

          return (
            <Card key={regulation.id}>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={`w-5 h-5 ${config.color}`} />
                      <CardTitle>{regulation.name}</CardTitle>
                      <Badge variant={regulation.status === 'compliant' ? 'default' : regulation.status === 'non-compliant' ? 'destructive' : 'secondary'}>
                        {config.badge}
                      </Badge>
                    </div>
                    <CardDescription>{regulation.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{regulation.progress}%</p>
                    <p className="text-xs text-foreground/60">compliant</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <Progress value={regulation.progress} className="h-2" />
                </div>

                {/* Audit Info */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2 border-t border-border">
                  <div>
                    <p className="text-xs text-foreground/60">Last Audit</p>
                    <p className="text-sm font-medium mt-1">{new Date(regulation.lastAudit).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60">Next Audit</p>
                    <p className="text-sm font-medium mt-1">{new Date(regulation.nextAudit).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-end">
                    <div className={`inline-block px-3 py-1 rounded text-sm font-medium ${regulation.status === 'compliant' ? 'bg-environment/10 text-environment' : regulation.status === 'non-compliant' ? 'bg-destructive/10 text-destructive' : 'bg-warning/10 text-warning'}`}>
                      {regulation.status === 'compliant' ? '✓ In Good Standing' : regulation.status === 'non-compliant' ? '⚠ Action Required' : '◐ In Progress'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
