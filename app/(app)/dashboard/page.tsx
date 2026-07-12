'use client'

import { GreetingHeader } from '@/components/dashboard/greeting-header'
import { EsgScoreCards } from '@/components/dashboard/esg-score-cards'
import { EsgTrendChart } from '@/components/dashboard/esg-trend-chart'
import { ImpactDrivers } from '@/components/dashboard/impact-drivers'
import { LiveAlerts } from '@/components/dashboard/live-alerts'
import { DepartmentPerformanceTable } from '@/components/dashboard/department-performance-table'
import { GoalsProgress } from '@/components/dashboard/goals-progress'
import { CarbonFootprintCard } from '@/components/dashboard/carbon-footprint-card'
import { DepartmentRankings } from '@/components/dashboard/department-rankings'

export default function DashboardPage() {
  return (
    <main className="flex flex-col gap-6 p-4 md:p-6">
      <GreetingHeader />
      <EsgScoreCards />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <EsgTrendChart />
        </div>
        <LiveAlerts />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <ImpactDrivers />
        <GoalsProgress />
        <CarbonFootprintCard />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DepartmentPerformanceTable />
        <DepartmentRankings />
      </div>
    </main>
  )
}
