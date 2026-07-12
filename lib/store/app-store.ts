'use client'

export interface StoredChallenge {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  duration: string
  participants: number
  progress: number
  reward: number
  status: 'active' | 'upcoming' | 'completed'
  createdAt: string
  createdBy?: string
}

export interface StoredReport {
  id: string
  title: string
  type: string
  date: string
  status: 'published' | 'draft'
  pages: number
  sections: string[]
  fileName?: string
  fileSize?: number
}

export interface StoredRedemption {
  id: string
  rewardId: string
  rewardName: string
  cost: number
  date: string
}

const KEYS = {
  challenges: 'ecosphere_challenges',
  reports: 'ecosphere_reports',
  redemptions: 'ecosphere_redemptions',
} as const

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(value))
}

export const DEFAULT_CHALLENGES: StoredChallenge[] = [
  {
    id: 'carbon-reduction',
    title: 'Carbon Reduction Champion',
    description: 'Reduce personal carbon footprint by 25%',
    category: 'Environmental',
    difficulty: 'hard',
    duration: '30 days',
    participants: 234,
    progress: 68,
    reward: 250,
    status: 'active',
    createdAt: '2026-06-01',
  },
  {
    id: 'volunteer-hours',
    title: 'Volunteer Heroes',
    description: 'Complete 10 hours of volunteer work',
    category: 'Social',
    difficulty: 'medium',
    duration: '60 days',
    participants: 156,
    progress: 45,
    reward: 150,
    status: 'active',
    createdAt: '2026-06-01',
  },
  {
    id: 'policy-compliance',
    title: 'Policy Compliance',
    description: 'Complete all mandatory compliance training',
    category: 'Governance',
    difficulty: 'easy',
    duration: '14 days',
    participants: 789,
    progress: 92,
    reward: 50,
    status: 'active',
    createdAt: '2026-05-15',
  },
]

export const DEFAULT_REPORTS: StoredReport[] = [
  {
    id: 'annual-esg-2026',
    title: 'Annual ESG Report 2026',
    type: 'Annual',
    date: '2026-07-01',
    status: 'published',
    pages: 48,
    sections: ['Environment', 'Social', 'Governance'],
  },
  {
    id: 'q2-sustainability',
    title: 'Q2 Sustainability Report',
    type: 'Quarterly',
    date: '2026-06-30',
    status: 'published',
    pages: 24,
    sections: ['Carbon', 'CSR', 'Governance'],
  },
]

export function getChallenges(): StoredChallenge[] {
  const stored = read<StoredChallenge[] | null>(KEYS.challenges, null)
  if (!stored) {
    write(KEYS.challenges, DEFAULT_CHALLENGES)
    return DEFAULT_CHALLENGES
  }
  return stored
}

export function saveChallenge(challenge: StoredChallenge) {
  const list = getChallenges()
  write(KEYS.challenges, [challenge, ...list])
}

export function getReports(): StoredReport[] {
  const stored = read<StoredReport[] | null>(KEYS.reports, null)
  if (!stored) {
    write(KEYS.reports, DEFAULT_REPORTS)
    return DEFAULT_REPORTS
  }
  return stored
}

export function saveReport(report: StoredReport) {
  const list = getReports()
  write(KEYS.reports, [report, ...list])
}

export function getRedemptions(userId: string): StoredRedemption[] {
  const all = read<Record<string, StoredRedemption[]>>(KEYS.redemptions, {})
  return all[userId] ?? []
}

export function addRedemption(userId: string, redemption: StoredRedemption) {
  const all = read<Record<string, StoredRedemption[]>>(KEYS.redemptions, {})
  all[userId] = [redemption, ...(all[userId] ?? [])]
  write(KEYS.redemptions, all)
}

export const APP_DATE = new Date('2026-07-12')

export function formatAppDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
