# Architecture

## Overview

EcoSphere is a Next.js full-stack application using the App Router with a client-side auth layer and server actions for mutations. The current deployment uses demo/mock data with a clear path to backend integration.

## System Layers

```
┌─────────────────────────────────────────────────────────┐
│                    Browser (React)                       │
│  Dashboard · Modules · Gamification · Profile            │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│              Next.js App Router (Middleware)               │
│  Session cookie check · Route protection                   │
└────────────────────────┬────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
   API Routes      Server Actions     Static Assets
   /api/auth/*     lib/actions/*      public/
```

## Authentication Flow

1. User submits credentials on `/auth/login` or `/auth/signup`
2. Credentials validated against mock account store (`lib/auth/mock-accounts.ts`)
3. Session token stored in `localStorage` and HTTP cookie (`sessionToken`)
4. Middleware reads cookie for server-side route protection
5. `AuthProvider` hydrates user state on client mount
6. `AuthGuard` wraps authenticated layout and redirects unauthenticated users

## Role-Based Access

| App Role | Nav Role | Access |
|----------|----------|--------|
| employee | employee | Dashboard, modules, gamification |
| department_head | manager | + Reports |
| esg_manager | officer | + Reports |
| admin | admin | + Settings |

Navigation filtering is handled in `lib/nav.ts` and `components/role-provider.tsx`.

## Data Flow (Current)

- **Read**: `lib/esg-data.ts` provides department scores, trends, alerts
- **Write**: Server actions in `lib/actions/handlers.ts` (console log + revalidate tags)
- **User state**: `AuthProvider` + localStorage persistence

## Future Backend Integration

Recommended stack (from problem statement):

- **API**: FastAPI (Python)
- **Database**: PostgreSQL
- **Auth**: JWT with refresh tokens
- **Real-time**: WebSockets or SSE for live dashboard updates

Replace `lib/esg-data.ts` reads with API calls and persist server actions to database.

## Key Directories

| Path | Purpose |
|------|---------|
| `app/(app)/` | Protected application pages |
| `components/dashboard/` | Dashboard visualization components |
| `components/gamification/` | Leagues, missions, streaks, champion |
| `lib/esg-data.ts` | Centralized ESG demo data |
| `lib/auth/` | Authentication logic |
| `middleware.ts` | Route protection |

## Theming

CSS variables in `app/globals.css` define light/dark palettes. Primary accent is lime green (`#84cc16`) matching the EcoSphere brand mockup. Theme toggled via `next-themes` in `components/theme-toggle.tsx`.
