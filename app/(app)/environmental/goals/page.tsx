'use client'

import { SustainabilityGoals } from '@/components/environmental/sustainability-goals'

export default function GoalsPage() {
  return (
    <main className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Sustainability Goals</h1>
        <p className="text-foreground/60 mt-2">Long-term targets and strategic initiatives</p>
      </div>
      <SustainabilityGoals />
    </main>
  )
}
