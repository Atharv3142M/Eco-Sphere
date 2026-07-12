export type FeatureStatus = 'done' | 'partial' | 'planned'

export interface FeatureItem {
  name: string
  status: FeatureStatus
  href?: string
}

export interface FeatureSection {
  title: string
  items: FeatureItem[]
}

export const FEATURE_SECTIONS: FeatureSection[] = [
  {
    title: 'Environmental',
    items: [
      { name: 'Emission Factors', status: 'partial', href: '/environmental/sources' },
      { name: 'Carbon Overview & Tracking', status: 'done', href: '/environmental/carbon' },
      { name: 'Sustainability Goals', status: 'done', href: '/environmental/goals' },
      { name: 'Carbon Calculator', status: 'done', href: '/environmental/calculator' },
      { name: 'Environmental Dashboard', status: 'done', href: '/environmental' },
      { name: 'Auto Emission Calculation', status: 'planned' },
      { name: 'Product ESG Profiles', status: 'planned' },
    ],
  },
  {
    title: 'Social',
    items: [
      { name: 'CSR Activities', status: 'done', href: '/social/activities' },
      { name: 'Employee Participation', status: 'done', href: '/social/participation' },
      { name: 'Evidence Upload', status: 'done', href: '/social/participation' },
      { name: 'Diversity Metrics', status: 'partial', href: '/social/diversity' },
      { name: 'Training Completion', status: 'partial', href: '/social/training' },
      { name: 'Approval Workflow', status: 'partial' },
    ],
  },
  {
    title: 'Governance',
    items: [
      { name: 'ESG Policies', status: 'done', href: '/governance/policies' },
      { name: 'Audits', status: 'done', href: '/governance/audits' },
      { name: 'Compliance Issues', status: 'done', href: '/governance/compliance' },
      { name: 'Policy Acknowledgements', status: 'partial' },
      { name: 'Overdue Detection & Alerts', status: 'done', href: '/governance/compliance' },
    ],
  },
  {
    title: 'Game On (Gamification)',
    items: [
      { name: 'Challenges + Create Challenge', status: 'done', href: '/challenges/active' },
      { name: 'XP System & Leaderboards', status: 'done', href: '/gamification' },
      { name: 'Reward Redemption', status: 'done', href: '/rewards' },
      { name: 'Department ESG Leagues', status: 'done', href: '/gamification/leagues' },
      { name: 'Weekly Missions & Team Quests', status: 'done', href: '/gamification/missions' },
      { name: 'ESG Streaks & Secret Achievements', status: 'done', href: '/gamification/streaks' },
      { name: 'Monthly Champion & CSR Calendar', status: 'done', href: '/gamification/champion' },
      { name: 'Badge Auto Award', status: 'planned' },
    ],
  },
  {
    title: 'Dashboard & Reports',
    items: [
      { name: 'Organization ESG Dashboard', status: 'done', href: '/dashboard' },
      { name: 'Department Scores & Rankings', status: 'done', href: '/dashboard' },
      { name: 'Custom Report Builder + Upload', status: 'done', href: '/reports' },
      { name: 'Export PDF / Excel / CSV', status: 'partial', href: '/reports' },
      { name: 'BRSR / GRI Report Generation', status: 'planned' },
    ],
  },
  {
    title: 'Settings & Admin',
    items: [
      { name: 'User Management', status: 'done', href: '/settings' },
      { name: 'Role-based Access', status: 'done' },
      { name: 'Notification Settings', status: 'partial', href: '/settings' },
      { name: 'Department & Category Config', status: 'planned' },
    ],
  },
  {
    title: 'Winning Features (Phase 3–4)',
    items: [
      { name: 'AI ESG Copilot', status: 'partial' },
      { name: 'Carbon Forecasting (6 months)', status: 'planned' },
      { name: 'Sustainability Simulator', status: 'planned' },
      { name: 'AI Proof Verification', status: 'planned' },
      { name: 'Sankey / Heatmap Visualizations', status: 'planned' },
      { name: 'Supplier Emissions Map', status: 'planned' },
      { name: 'Smart Priority Notifications', status: 'partial' },
    ],
  },
  {
    title: 'UI/UX',
    items: [
      { name: 'Dark & Light Mode', status: 'done' },
      { name: 'Neon Green Enterprise Theme', status: 'done' },
      { name: 'Fully Responsive Layout', status: 'done' },
      { name: 'PWA / Offline-first', status: 'planned' },
    ],
  },
]

export function countByStatus(status: FeatureStatus) {
  return FEATURE_SECTIONS.flatMap((s) => s.items).filter((i) => i.status === status).length
}
