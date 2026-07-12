'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calculator, Plus, Trash2 } from 'lucide-react'

const activityTypes = [
  { id: 'business-travel', name: 'Business Travel', unit: 'miles', factor: 0.00024 },
  { id: 'electricity', name: 'Electricity', unit: 'kWh', factor: 0.000385 },
  { id: 'natural-gas', name: 'Natural Gas', unit: 'therms', factor: 0.0053 },
  { id: 'vehicle-fuel', name: 'Vehicle Fuel', unit: 'gallons', factor: 0.00887 },
  { id: 'waste-disposal', name: 'Waste Disposal', unit: 'tons', factor: 0.667 },
  { id: 'water', name: 'Water Usage', unit: 'gallons', factor: 0.00000168 },
]

interface Calculation {
  id: string
  type: string
  value: number
  emissions: number
  date: string
}

export function CarbonCalculator() {
  const [calculations, setCalculations] = useState<Calculation[]>([
    {
      id: '1',
      type: 'business-travel',
      value: 500,
      emissions: 0.12,
      date: '2024-07-10',
    },
    {
      id: '2',
      type: 'electricity',
      value: 1000,
      emissions: 0.385,
      date: '2024-07-09',
    },
  ])

  const [selectedType, setSelectedType] = useState('business-travel')
  const [inputValue, setInputValue] = useState('')

  const handleCalculate = () => {
    if (!inputValue || isNaN(Number(inputValue))) return

    const activity = activityTypes.find((a) => a.id === selectedType)
    if (!activity) return

    const value = Number(inputValue)
    const emissions = value * activity.factor

    const newCalculation: Calculation = {
      id: Date.now().toString(),
      type: selectedType,
      value,
      emissions,
      date: new Date().toISOString().split('T')[0],
    }

    setCalculations([newCalculation, ...calculations])
    setInputValue('')
  }

  const handleDelete = (id: string) => {
    setCalculations(calculations.filter((c) => c.id !== id))
  }

  const totalEmissions = calculations.reduce((sum, c) => sum + c.emissions, 0)
  const activity = activityTypes.find((a) => a.id === selectedType)

  return (
    <div className="space-y-6">
      {/* Calculator Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Emissions Calculator
          </CardTitle>
          <CardDescription>Calculate emissions from various activities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Activity Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            >
              {activityTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Quantity ({activity?.unit})
            </label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCalculate()
              }}
            />
          </div>

          {inputValue && activity && (
            <div className="p-3 bg-environment/5 border border-environment/20 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/70">Estimated Emissions:</span>
                <span className="text-lg font-bold text-environment">{(Number(inputValue) * activity.factor).toFixed(3)} mtCO₂e</span>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={handleCalculate} className="flex-1" variant="default">
              <Plus className="w-4 h-4 mr-2" />
              Add Activity
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Total Tracked Emissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-4xl font-bold text-environment">{totalEmissions.toFixed(3)}</p>
            <p className="text-foreground/60 mt-2">mtCO₂e from {calculations.length} activities</p>
          </div>
        </CardContent>
      </Card>

      {/* History */}
      <Card>
        <CardHeader>
          <CardTitle>Calculation History</CardTitle>
          <CardDescription>Track all calculated emissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {calculations.map((calc) => {
              const activityName = activityTypes.find((a) => a.id === calc.type)?.name
              const unit = activityTypes.find((a) => a.id === calc.type)?.unit

              return (
                <div key={calc.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-background/50 transition">
                  <div className="flex-1">
                    <p className="font-medium">{activityName}</p>
                    <p className="text-sm text-foreground/60">
                      {calc.value} {unit} • {new Date(calc.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-bold text-environment">{calc.emissions.toFixed(3)}</p>
                      <p className="text-xs text-foreground/60">mtCO₂e</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(calc.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
