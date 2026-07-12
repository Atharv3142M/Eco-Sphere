'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, Eye, Share2, BarChart3, Plus } from 'lucide-react'

const reports = [
  {
    id: 'annual-esg-2024',
    title: 'Annual ESG Report 2024',
    type: 'Annual',
    date: '2024-07-10',
    status: 'published',
    pages: 48,
    sections: ['Environment', 'Social', 'Governance'],
  },
  {
    id: 'q2-sustainability',
    title: 'Q2 Sustainability Report',
    type: 'Quarterly',
    date: '2024-07-01',
    status: 'published',
    pages: 24,
    sections: ['Carbon', 'CSR', 'Governance'],
  },
  {
    id: 'carbon-footprint',
    title: 'Carbon Footprint Analysis',
    type: 'Custom',
    date: '2024-06-28',
    status: 'draft',
    pages: 18,
    sections: ['Emissions', 'Sources', 'Reduction'],
  },
  {
    id: 'diversity-report',
    title: 'Diversity & Inclusion Report',
    type: 'Annual',
    date: '2024-05-15',
    status: 'published',
    pages: 32,
    sections: ['Demographics', 'Leadership', 'Goals'],
  },
]

export function ReportBuilder() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">ESG Reports</h2>
          <p className="text-foreground/60 mt-1">Build and manage ESG reports</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Report
        </Button>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-governance/10 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-governance" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle>{report.title}</CardTitle>
                      <Badge variant={report.status === 'published' ? 'default' : 'secondary'}>
                        {report.status === 'published' ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                    <CardDescription>{report.type} Report • Generated {new Date(report.date).toLocaleDateString()}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 pb-4 border-b border-border">
                <div>
                  <p className="text-xs text-foreground/60">Pages</p>
                  <p className="text-sm font-medium mt-1">{report.pages}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/60">Sections</p>
                  <p className="text-sm font-medium mt-1">{report.sections.length}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-foreground/60 mb-2">Includes</p>
                  <div className="flex flex-wrap gap-1">
                    {report.sections.map((section) => (
                      <Badge key={section} variant="outline" className="text-xs">
                        {section}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" size="sm" title="View">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" title="Share">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" title="Download">
                    <Download className="w-4 h-4" />
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
