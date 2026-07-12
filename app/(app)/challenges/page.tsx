'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trophy, CheckSquare, BookOpen } from 'lucide-react'

const modules = [
  {
    title: 'Active Challenges',
    description: 'Current ESG challenges and competitions',
    href: '/challenges/active',
    icon: Trophy,
    stats: '5 active',
  },
  {
    title: 'Completed Challenges',
    description: 'Challenges you&apos;ve successfully completed',
    href: '/challenges/completed',
    icon: CheckSquare,
    stats: '12 completed',
  },
  {
    title: 'My Challenges',
    description: 'Your personal challenge progress',
    href: '/challenges/mine',
    icon: BookOpen,
    stats: '8 in progress',
  },
]

export default function ChallengesPage() {
  return (
    <main className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Challenges Hub</h1>
        <p className="text-foreground/60 mt-2">Engage with gamified ESG challenges</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((module) => {
          const Icon = module.icon
          return (
            <Card key={module.href} className="hover:border-primary/50 transition cursor-pointer">
              <Link href={module.href}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{module.title}</CardTitle>
                        <CardDescription className="mt-1">{module.description}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-primary">{module.stats}</p>
                    <Button variant="ghost" size="sm">
                      Explore →
                    </Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
          )
        })}
      </div>
    </main>
  )
}
