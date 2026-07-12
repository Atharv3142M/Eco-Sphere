'use client'

import { CarbonCalculator } from '@/components/environmental/carbon-calculator'

export default function CalculatorPage() {
  return (
    <main className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Carbon Calculator</h1>
        <p className="text-foreground/60 mt-2">Calculate emissions from various activities</p>
      </div>
      <CarbonCalculator />
    </main>
  )
}
