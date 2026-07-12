'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts'
import { Users, Briefcase, TrendingUp } from 'lucide-react'

const genderData = [
  { name: 'Female', value: 45, color: '#EC4899' },
  { name: 'Male', value: 50, color: '#3B82F6' },
  { name: 'Non-binary', value: 5, color: '#10B981' },
]

const ageData = [
  { range: '18-25', count: 120 },
  { range: '26-35', count: 280 },
  { range: '36-45', count: 210 },
  { range: '46-55', count: 150 },
  { range: '55+', count: 90 },
]

const ethnicity = [
  { group: 'Asian', percentage: 32, color: '#1FA971' },
  { group: 'Hispanic/Latino', percentage: 18, color: '#2563EB' },
  { group: 'African American', percentage: 14, color: '#7C3AED' },
  { group: 'White', percentage: 28, color: '#F59E0B' },
  { group: 'Other', percentage: 8, color: '#8B5CF6' },
]

const leadership = [
  { role: 'Executive', female: 40, male: 60 },
  { role: 'Manager', female: 48, male: 52 },
  { role: 'Senior Specialist', female: 55, male: 45 },
  { role: 'Specialist', female: 50, male: 50 },
]

export function Diversity() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="w-4 h-4" />
              Total Workforce
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">850</div>
            <p className="text-xs text-foreground/60 mt-2">employees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Female Leadership
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-social">40%</div>
            <p className="text-xs text-foreground/60 mt-2">executive level</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Diverse Hires
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-environment">62%</div>
            <p className="text-xs text-foreground/60 mt-2">last 12 months</p>
          </CardContent>
        </Card>
      </div>

      {/* Gender Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Gender Distribution</CardTitle>
          <CardDescription>Workforce composition by gender</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={genderData} cx="50%" cy="50%" labelLine={false} label={(entry) => `${entry.name} ${entry.value}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-4 flex flex-col justify-center">
              {genderData.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between mb-2">
                    <p className="font-medium">{item.name}</p>
                    <p className="font-bold">{item.value}%</p>
                  </div>
                  <Progress value={item.value} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Age Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Age Distribution</CardTitle>
          <CardDescription>Workforce breakdown by age range</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="range" stroke="var(--color-foreground-muted)" />
              <YAxis stroke="var(--color-foreground-muted)" />
              <Tooltip contentStyle={{ backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)' }} />
              <Bar dataKey="count" fill="var(--color-social)" name="Employees" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Ethnicity Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Ethnic Diversity</CardTitle>
          <CardDescription>Representation across ethnic backgrounds</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {ethnicity.map((item) => (
            <div key={item.group}>
              <div className="flex justify-between mb-2">
                <p className="font-medium">{item.group}</p>
                <p className="font-bold">{item.percentage}%</p>
              </div>
              <Progress value={item.percentage} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Leadership Diversity */}
      <Card>
        <CardHeader>
          <CardTitle>Leadership Gender Representation</CardTitle>
          <CardDescription>Female/Male ratio by role level</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={leadership}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="role" stroke="var(--color-foreground-muted)" />
              <YAxis stroke="var(--color-foreground-muted)" />
              <Tooltip contentStyle={{ backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)' }} />
              <Legend />
              <Bar dataKey="female" fill="var(--color-social)" name="Female %" />
              <Bar dataKey="male" fill="var(--color-primary)" name="Male %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
