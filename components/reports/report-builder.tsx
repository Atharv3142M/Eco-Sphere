'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DynamicButton } from '@/components/ui/dynamic-button'
import { Download, Eye, Share2, BarChart3, Plus, Upload, FileText } from 'lucide-react'
import { toast } from 'sonner'
import {
  getReports,
  saveReport,
  formatAppDate,
  APP_DATE,
  type StoredReport,
} from '@/lib/store/app-store'

export function ReportBuilder() {
  const [reports, setReports] = useState<StoredReport[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title: '', type: 'Custom', sections: 'Environment, Social, Governance' })
  const [file, setFile] = useState<File | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setReports(getReports())
  }, [])

  const handleCreate = async () => {
    if (!form.title.trim()) {
      toast.error('Report title is required')
      throw new Error('Validation failed')
    }

    const report: StoredReport = {
      id: `report-${Date.now()}`,
      title: form.title.trim(),
      type: form.type,
      date: APP_DATE.toISOString().slice(0, 10),
      status: file ? 'published' : 'draft',
      pages: file ? Math.max(1, Math.round(file.size / 5000)) : 12,
      sections: form.sections.split(',').map((s) => s.trim()).filter(Boolean),
      fileName: file?.name,
      fileSize: file?.size,
    }

    saveReport(report)
    setReports(getReports())
    setForm({ title: '', type: 'Custom', sections: 'Environment, Social, Governance' })
    setFile(null)
    setOpen(false)
    toast.success(file ? 'Report uploaded and published!' : 'Report draft created!')
  }

  const handleDownload = (report: StoredReport) => {
    const content = `EcoSphere ESG Report\nTitle: ${report.title}\nType: ${report.type}\nDate: ${report.date}\nSections: ${report.sections.join(', ')}\n${report.fileName ? `File: ${report.fileName}` : ''}`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${report.title.replace(/\s+/g, '-').toLowerCase()}.txt`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Report downloaded')
  }

  const handleShare = (report: StoredReport) => {
    navigator.clipboard.writeText(`${report.title} — EcoSphere ESG Report (${formatAppDate(report.date)})`)
    toast.success('Report link copied to clipboard')
  }

  const handleView = (report: StoredReport) => {
    toast.info(`Opening "${report.title}"${report.fileName ? ` (${report.fileName})` : ''}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">ESG Reports</h2>
          <p className="mt-1 text-muted-foreground">Build, upload, and manage ESG reports</p>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger render={<Button><Plus className="mr-2 size-4" />Create Report</Button>} />
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Create Report</SheetTitle>
              <SheetDescription>Generate a new report or upload an existing document</SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="r-title">Report Title *</Label>
                <Input id="r-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Q3 ESG Summary 2026" />
              </div>
              <div className="space-y-2">
                <Label>Report Type</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {['Annual', 'Quarterly', 'Custom', 'BRSR/GRI'].map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="r-sections">Sections (comma-separated)</Label>
                <Input id="r-sections" value={form.sections} onChange={(e) => setForm({ ...form, sections: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Upload Report (PDF, Excel, CSV)</Label>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.xlsx,.xls,.csv,.doc,.docx"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
                <Button type="button" variant="outline" className="w-full" onClick={() => fileRef.current?.click()}>
                  <Upload className="mr-2 size-4" />
                  {file ? file.name : 'Choose file to upload'}
                </Button>
                {file && (
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB · {file.type || 'document'}
                  </p>
                )}
              </div>
              <DynamicButton className="w-full" loadingText="Creating..." successText="Report Created!" onClick={handleCreate}>
                {file ? 'Upload & Publish' : 'Create Draft'}
              </DynamicButton>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-gov/10 p-2">
                  <BarChart3 className="size-5 text-gov" />
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <CardTitle>{report.title}</CardTitle>
                    <Badge variant={report.status === 'published' ? 'default' : 'secondary'}>
                      {report.status === 'published' ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                  <CardDescription>
                    {report.type} Report · {formatAppDate(report.date)}
                    {report.fileName && ` · ${report.fileName}`}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 grid grid-cols-2 gap-4 border-b border-border pb-4 md:grid-cols-5">
                <div>
                  <p className="text-xs text-muted-foreground">Pages</p>
                  <p className="mt-1 text-sm font-medium">{report.pages}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Sections</p>
                  <p className="mt-1 text-sm font-medium">{report.sections.length}</p>
                </div>
                <div className="col-span-2">
                  <p className="mb-2 text-xs text-muted-foreground">Includes</p>
                  <div className="flex flex-wrap gap-1">
                    {report.sections.map((section) => (
                      <Badge key={section} variant="outline" className="text-xs">{section}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" size="sm" title="View" onClick={() => handleView(report)}>
                    <Eye className="size-4" />
                  </Button>
                  <Button variant="outline" size="sm" title="Share" onClick={() => handleShare(report)}>
                    <Share2 className="size-4" />
                  </Button>
                  <Button variant="outline" size="sm" title="Download" onClick={() => handleDownload(report)}>
                    <Download className="size-4" />
                  </Button>
                </div>
              </div>
              {report.fileName && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="size-4" />
                  Attached: {report.fileName}
                  {report.fileSize && ` (${(report.fileSize / 1024).toFixed(1)} KB)`}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
