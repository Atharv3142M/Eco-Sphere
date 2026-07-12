'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, Eye, Download, AlertCircle } from 'lucide-react'

const policies = [
  {
    id: 'sustainability',
    title: 'Corporate Sustainability Policy',
    description: 'Guidelines for environmental and social responsibility',
    status: 'active',
    version: '2.1',
    updated: '2024-06-15',
    views: 342,
    approved: true,
  },
  {
    id: 'ethics',
    title: 'Business Ethics & Compliance',
    description: 'Code of conduct and ethical guidelines',
    status: 'active',
    version: '3.0',
    updated: '2024-05-20',
    views: 521,
    approved: true,
  },
  {
    id: 'data-privacy',
    title: 'Data Privacy & Protection',
    description: 'GDPR and data handling procedures',
    status: 'active',
    version: '2.5',
    updated: '2024-04-10',
    views: 189,
    approved: true,
  },
  {
    id: 'supply-chain',
    title: 'Supplier Code of Conduct',
    description: 'Requirements for supply chain partners',
    status: 'pending-review',
    version: '1.8',
    updated: '2024-07-01',
    views: 45,
    approved: false,
  },
  {
    id: 'whistleblower',
    title: 'Whistleblower Protection Policy',
    description: 'Safe reporting channels and protections',
    status: 'active',
    version: '1.3',
    updated: '2024-03-15',
    views: 278,
    approved: true,
  },
]

export function Policies() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Policy Center</h2>
        <p className="text-foreground/60 mt-1">Management and tracking of corporate policies</p>
      </div>

      <div className="space-y-4">
        {policies.map((policy) => (
          <Card key={policy.id} className={`${!policy.approved ? 'border-warning/50' : ''}`}>
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-governance" />
                  <div>
                    <CardTitle>{policy.title}</CardTitle>
                    <CardDescription>{policy.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!policy.approved && <AlertCircle className="w-5 h-5 text-warning" />}
                  <Badge variant={policy.status === 'active' ? 'default' : 'secondary'}>
                    {policy.status === 'active' ? 'Active' : 'Pending Review'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 pb-4 border-b border-border">
                <div>
                  <p className="text-xs text-foreground/60">Version</p>
                  <p className="text-sm font-medium mt-1">{policy.version}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/60">Updated</p>
                  <p className="text-sm font-medium mt-1">{new Date(policy.updated).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/60">Views</p>
                  <div className="flex items-center gap-1 text-sm font-medium mt-1">
                    <Eye className="w-4 h-4" />
                    {policy.views}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-foreground/60">Status</p>
                  <p className="text-sm font-medium mt-1">{policy.approved ? 'Approved' : 'Review'}</p>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
