# EcoSphere

**Enterprise ESG Management Platform**

EcoSphere is a production-ready Environmental, Social, and Governance (ESG) management platform built with Next.js. It helps organizations measure, manage, and improve sustainability performance through unified dashboards, operational tracking, governance workflows, and employee gamification.

Live demo: deployed on [Vercel](https://vercel.com) — set `NEXT_PUBLIC_APP_URL` in your environment for production links.

---

## Features

### Core Modules

| Module | Capabilities |
|--------|-------------|
| **Dashboard** | Overall ESG score, pillar breakdown, trends, live alerts, department rankings, goals progress, carbon footprint |
| **Environmental** | Carbon overview, emission sources, sustainability goals, carbon calculator |
| **Social** | CSR activities (CRUD), participation, diversity, training |
| **Governance** | Policies, audits, compliance tracking |
| **Gamification** | Department ESG leagues, weekly missions, team quests, streaks, secret achievements, monthly champion, CSR event calendar |
| **Reports** | Environmental, social, governance, and custom report builder |
| **Settings** | Admin configuration and notification preferences |

### Platform Highlights

- Dark & light mode with lime-green EcoSphere branding
- Responsive, mobile-friendly layout
- Role-based access control (Employee, Department Head, ESG Manager, Admin)
- Department-specific dashboard stats based on signup selection
- Dynamic action buttons with loading/success states
- In-app notifications
- Local-first auth with session cookies for middleware protection

---

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm, npm, or yarn

### Installation

```bash
git clone https://github.com/your-org/Eco-Sphere.git
cd Eco-Sphere
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo Accounts

| Email | Password | Role |
|-------|----------|------|
| admin@ecosphere.com | admin123 | Admin |
| manager@ecosphere.com | manager123 | ESG Manager |
| head@ecosphere.com | head123 | Department Head |
| employee@ecosphere.com | employee123 | Employee |

You can also sign up with any email and select your department — the dashboard will reflect your department's ESG stats.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4, shadcn/ui |
| Charts | Recharts |
| Auth | Client-side session + HTTP cookies |
| Deployment | Vercel |
| Analytics | Vercel Analytics |

---

## Project Structure

```
app/
  (app)/           # Authenticated routes (dashboard, modules, gamification)
  auth/            # Login & signup
  api/auth/        # Auth API routes
components/
  dashboard/       # Dashboard widgets
  gamification/    # Leagues, missions, streaks, champion
  environmental/   # Environmental module UI
  social/          # Social module UI
  governance/      # Governance module UI
lib/
  esg-data.ts      # Department scores, trends, alerts (demo data)
  auth/            # Auth context, mock accounts, session helpers
docs/              # Architecture, data model, deployment, API
```

---

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Data Model](docs/DATA_MODEL.md)
- [API Reference](docs/API.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Contributing](CONTRIBUTING.md)
- [Security Policy](SECURITY.md)
- [Changelog](CHANGELOG.md)

---

## ESG Scoring

Organization ESG score is a weighted average:

- Environmental: **40%**
- Social: **30%**
- Governance: **30%**

Department scores roll up to the organization dashboard. See [docs/DATA_MODEL.md](docs/DATA_MODEL.md) for the full entity model.

---

## Roadmap

- [ ] PostgreSQL + FastAPI backend integration
- [ ] Real-time WebSocket updates
- [ ] Offline PWA support
- [ ] AI ESG Copilot integration
- [ ] PDF/Excel report export

---

## License

See [LICENSE](LICENSE).

---

## Acknowledgements

Built for the EcoSphere ESG Management Platform challenge — integrating ERP operations with sustainability metrics, employee participation, and governance compliance.
