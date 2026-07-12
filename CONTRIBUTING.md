# Contributing to EcoSphere

Thank you for your interest in contributing to EcoSphere.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/Eco-Sphere.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature-name`
5. Run the dev server: `npm run dev`

## Development Guidelines

### Code Style

- Use TypeScript for all new files
- Follow existing component patterns (shadcn/ui + Tailwind)
- Keep components focused and colocated with their feature
- Use `'use client'` only when client interactivity is required

### Commits

Use clear, descriptive commit messages:

```
feat: add department filter to reports
fix: resolve dashboard redirect after signup
docs: update deployment guide
```

### Pull Requests

1. Ensure `npm run build` passes
2. Test auth flows (login, signup, logout)
3. Verify responsive layout on mobile viewport
4. Update documentation if adding features or changing APIs
5. Fill in the PR template with summary and test plan

## Reporting Issues

Include:

- Steps to reproduce
- Expected vs actual behavior
- Browser and OS
- Screenshots if UI-related

## Feature Requests

Open an issue describing the use case, expected behavior, and how it aligns with ESG platform goals.
