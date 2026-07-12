'use client'

import { EmissionSources } from '@/components/environmental/emission-sources'

export default function SourcesPage() {
  return (
    <main className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Emission Sources</h1>
        <p className="text-foreground/60 mt-2">Detailed breakdown of emissions by source and facility</p>
      </div>
      <EmissionSources />
    </main>
  )
}
