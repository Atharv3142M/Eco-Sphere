# Data Model

Based on the EcoSphere ESG Management Platform problem statement.

## Master Data

| Entity | Purpose | Key Fields |
|--------|---------|------------|
| Department | Org hierarchy & ESG ownership | Name, Code, Head, Parent, Employee Count, Status |
| Category | Shared categories (CSR, Challenges) | Name, Type, Status |
| Emission Factor | Carbon calculation values | Factor value, Unit, Source |
| Product ESG Profile | Product-linked ESG info | Product ID, Scores, Certifications |
| Environmental Goal | Sustainability targets | Title, Target, Deadline, Department |
| ESG Policy | Governance policies | Title, Version, Content, Status |
| Badge | Employee achievements | Name, Description, Unlock Rule, Icon |
| Reward | Redeemable incentives | Name, Points Required, Stock, Status |

## Transactional Data

| Entity | Purpose | Key Fields |
|--------|---------|------------|
| Carbon Transaction | Calculated emissions | Source, Amount, Factor, Date, Department |
| CSR Activity | Social initiatives | Title, Category, Date, Location, Status |
| Employee Participation | CSR involvement | Employee, Activity, Proof, Approval, Points |
| Challenge | Sustainability challenges | Title, Category, XP, Difficulty, Deadline, Status |
| Challenge Participation | Challenge progress | Challenge, Employee, Progress, Proof, XP |
| Policy Acknowledgement | Policy acceptance | Employee, Policy, Date |
| Audit | Governance audits | Title, Date, Findings, Status |
| Compliance Issue | Violations | Audit, Severity, Owner, Due Date, Status |
| Department Score | Aggregated ESG performance | Department, Env/Social/Gov Scores, Total |

## Scoring Workflow

```
Operational Data → Carbon Transactions
                → Employee Participation / Challenge Participation
                → Policy Acknowledgements / Audits
                          ↓
              Environmental / Social / Governance Scores
                          ↓
              Department Total Score
                          ↓
              Overall ESG Score (40/30/30 weighted)
                          ↓
              Dashboard & Reports
```

## Current Implementation

The demo app implements this model conceptually via:

- `lib/esg-data.ts` — department scores, trends, rankings
- `components/social/csr-activities.tsx` — CSR activity CRUD (client state)
- `components/gamification/*` — challenges, missions, streaks, leagues
- `lib/actions/handlers.ts` — server action stubs for mutations

## Department Data (Demo)

Departments with pre-configured scores: Operations, Finance, HR, Marketing, IT, Sales, Legal, Sustainability, Manufacturing.

User signup department selection maps to `getDepartmentStats(department)` for personalized dashboard metrics.
