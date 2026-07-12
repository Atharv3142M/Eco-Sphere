'use client'

import { GreetingHeader } from '@/components/dashboard/greeting-header'
import { MissionControl } from '@/components/dashboard/mission-control'
import { CarbonTrend } from '@/components/dashboard/carbon-trend'
import { DepartmentRankings } from '@/components/dashboard/department-rankings'
import { InsightsPanel } from '@/components/dashboard/insights-panel'

export default function DashboardPage() {
  return (
    <main className="flex flex-col gap-6 p-6">
      <GreetingHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <MissionControl />
        </div>
        
        <div className="lg:col-span-2">
          <CarbonTrend />
        </div>
        
        <div className="lg:col-span-1">
          <InsightsPanel />
        </div>
        
        <div className="lg:col-span-3">
          <DepartmentRankings />
        </div>
      </div>
    </main>
  )
}
