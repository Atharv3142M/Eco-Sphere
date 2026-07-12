'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FEATURE_SECTIONS, countByStatus } from '@/lib/features-status'
import { CheckCircle2, Circle, Clock, ExternalLink } from 'lucide-react'

const STATUS_CONFIG = {
  done: { label: 'Done', icon: CheckCircle2, className: 'bg-success/15 text-success border-success/30' },
  partial: { label: 'Partial', icon: Clock, className: 'bg-warning/15 text-warning border-warning/30' },
  planned: { label: 'Planned', icon: Circle, className: 'bg-muted text-muted-foreground border-border' },
}

export default function FeaturesPage() {
  const done = countByStatus('done')
  const partial = countByStatus('partial')
  const planned = countByStatus('planned')
  const total = done + partial + planned

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold">Feature Roadmap</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Complete feature list from the EcoSphere problem statement — mandatory modules, winning differentiators, and stretch goals.
          </p>
        </div>
        <Link href="/FEATURES.md" target="_blank" className="text-sm font-medium text-primary hover:underline">
          Open FEATURES.md specification →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: 'Implemented', value: done, color: 'text-success' },
          { label: 'Partial', value: partial, color: 'text-warning' },
          { label: 'Planned', value: planned, color: 'text-muted-foreground' },
          { label: 'Total', value: total, color: 'text-primary' },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="pt-6 text-center">
              <div className={`font-numeric text-3xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6">
        {FEATURE_SECTIONS.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>
                {section.items.filter((i) => i.status === 'done').length} of {section.items.length} complete
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.items.map((item) => {
                  const cfg = STATUS_CONFIG[item.status]
                  const Icon = cfg.icon
                  return (
                    <li
                      key={item.name}
                      className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`size-4 shrink-0 ${item.status === 'done' ? 'text-success' : item.status === 'partial' ? 'text-warning' : 'text-muted-foreground'}`} />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={cfg.className}>{cfg.label}</Badge>
                        {item.href && (
                          <Link href={item.href} className="text-muted-foreground hover:text-primary">
                            <ExternalLink className="size-4" />
                          </Link>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
