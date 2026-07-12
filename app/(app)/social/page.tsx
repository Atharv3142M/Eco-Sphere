'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Users, Briefcase, BookOpen } from 'lucide-react'

const modules = [
  {
    title: 'CSR Activities',
    description: 'Corporate social responsibility initiatives and programs',
    href: '/social/activities',
    icon: Heart,
    stats: '4 active programs',
  },
  {
    title: 'Participation',
    description: 'Employee participation tracking and proof management',
    href: '/social/participation',
    icon: Users,
    stats: '13 total hours',
  },
  {
    title: 'Diversity',
    description: 'Workforce diversity metrics and representation',
    href: '/social/diversity',
    icon: Briefcase,
    stats: '850 employees',
  },
  {
    title: 'Training',
    description: 'ESG and compliance training programs',
    href: '/social/training',
    icon: BookOpen,
    stats: '5 courses',
  },
]

export default function SocialPage() {
  return (
    <main className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Social Module</h1>
        <p className="text-foreground/60 mt-2">Manage CSR initiatives, diversity, and employee development</p>
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
                      <div className="p-2 bg-social/10 rounded-lg">
                        <Icon className="w-5 h-5 text-social" />
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
                    <p className="text-sm font-medium text-social">{module.stats}</p>
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
