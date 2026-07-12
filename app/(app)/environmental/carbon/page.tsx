'use client'

import { CarbonOverview } from '@/components/environmental/carbon-overview'

export default function EnvironmentalPage() {
  return (
    <main className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Environmental</h1>
        <p className="text-foreground/60 mt-2">Track carbon emissions and sustainability progress</p>
      </div>
      <CarbonOverview />
    </main>
  )
}
