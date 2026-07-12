'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, AlertCircle, Clock, FileText } from 'lucide-react'

const audits = [
  {
    id: 'internal-q3',
    title: 'Q3 Internal Audit',
    type: 'Internal',
    status: 'completed',
    progress: 100,
    date: '2024-07-15',
    findings: 3,
    severity: 'low',
    auditor: 'Internal Audit Team',
  },
  {
    id: 'carbon',
    title: 'Carbon Accounting Audit',
    type: 'External',
    status: 'in-progress',
    progress: 65,
    date: 'In Progress',
    findings: 2,
    severity: 'medium',
    auditor: 'TUV SUD',
  },
  {
    id: 'compliance',
    title: 'ESG Compliance Review',
    type: 'External',
    status: 'scheduled',
    progress: 0,
    date: '2024-09-01',
    findings: 0,
    severity: 'none',
    auditor: 'Deloitte',
  },
  {
    id: 'supply-chain',
    title: 'Supply Chain Assessment',
    type: 'Internal',
    status: 'in-progress',
    progress: 45,
    date: 'In Progress',
    findings: 5,
    severity: 'medium',
    auditor: 'Compliance Team',
  },
  {
    id: 'data-privacy',
    title: 'Data Privacy Audit',
    type: 'External',
    status: 'completed',
    progress: 100,
    date: '2024-06-30',
    findings: 1,
    severity: 'low',
    auditor: 'CyberSecure Ltd',
  },
]

const severityConfig = {
  none: { color: 'text-environment', icon: CheckCircle2 },
  low: { color: 'text-environment', icon: CheckCircle2 },
  medium: { color: 'text-warning', icon: AlertCircle },
  high: { color: 'text-destructive', icon: AlertCircle },
}

export function Audits() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Audit Management</h2>
        <p className="text-foreground/60 mt-1">Track internal and external audits</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
            <p className="text-xs text-foreground/60 mt-2">audits</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">2</div>
            <p className="text-xs text-foreground/60 mt-2">audits</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1</div>
            <p className="text-xs text-foreground/60 mt-2">audits</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Findings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">11</div>
            <p className="text-xs text-foreground/60 mt-2">issues to address</p>
          </CardContent>
        </Card>
      </div>

      {/* Audits List */}
      <div className="space-y-4">
        {audits.map((audit) => {
          const config = severityConfig[audit.severity as keyof typeof severityConfig] || severityConfig.none
          const Icon = config.icon

          return (
            <Card key={audit.id}>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle>{audit.title}</CardTitle>
                      <Badge variant={audit.type === 'Internal' ? 'secondary' : 'default'}>
                        {audit.type}
                      </Badge>
                    </div>
                    <CardDescription>Auditor: {audit.auditor}</CardDescription>
                  </div>
                  <div className="text-right">
                    {audit.status === 'completed' ? (
                      <CheckCircle2 className="w-6 h-6 text-environment ml-auto mb-2" />
                    ) : audit.status === 'in-progress' ? (
                      <Clock className="w-6 h-6 text-warning ml-auto mb-2" />
                    ) : (
                      <Clock className="w-6 h-6 text-foreground/40 ml-auto mb-2" />
                    )}
                    <Badge variant={audit.status === 'completed' ? 'default' : audit.status === 'in-progress' ? 'secondary' : 'outline'}>
                      {audit.status === 'completed' ? 'Completed' : audit.status === 'in-progress' ? 'In Progress' : 'Scheduled'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress */}
                {audit.status !== 'scheduled' && (
                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Progress</span>
                      <span className="font-semibold">{audit.progress}%</span>
                    </div>
                    <Progress value={audit.progress} className="h-2" />
                  </div>
                )}

                {/* Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-border">
                  <div>
                    <p className="text-xs text-foreground/60">Date</p>
                    <p className="text-sm font-medium mt-1">{audit.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60">Findings</p>
                    <p className="text-sm font-medium mt-1">{audit.findings} issues</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60">Severity</p>
                    <div className={`flex items-center gap-1 text-sm font-medium mt-1 ${config.color}`}>
                      <Icon className="w-4 h-4" />
                      {audit.severity.charAt(0).toUpperCase() + audit.severity.slice(1)}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-1" />
                      Report
                    </Button>
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
