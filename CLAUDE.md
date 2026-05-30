# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server on port 9002 (Turbopack)
npm run build        # Production build (sets NODE_ENV=production)
npm run start        # Run production server
npm run lint         # Next.js ESLint
npm run typecheck    # TypeScript check without emitting (tsc --noEmit)
```

No test runner is configured in this project.

## Architecture

**Framework**: Next.js 15 with App Router and Server Components. Turbopack is used in dev.

**Routing**: File-based via `src/app/`. Key routes:
- `/` — Landing page (hero, featured classes, benefits)
- `/classes` — Browse and filter fitness classes
- `/pricing` — Subscription tier selection
- `/dashboard` — User dashboard with mock bookings and activity chart
- `/login` — Auth page (UI only, no backend)

**Component model**: Server Components by default. Add `'use client'` only for interactivity. Forms use React Hook Form + Zod validation with Next.js Server Actions (`src/app/actions.ts`).

**State management**: No global state library. Local React state + server actions handle all data flow. `useFormState`/`useFormStatus` from `react-dom` integrate with server actions.

**Data**: All data is currently mocked in components — no backend API calls are wired up yet. `docs/backend.json` defines the intended backend schema.

**AI**: Google Genkit (`src/ai/genkit.ts`) uses Gemini 2.5 Flash for fitness recommendations. Flows live in `src/ai/flows/`. Currently returns mock data; real invocation is stubbed out.

**UI components**: shadcn/ui (Radix UI primitives + Tailwind). Add new components via `npx shadcn@latest add <component>`. Components land in `src/components/ui/`.

**Styling**: Tailwind CSS with HSL CSS variables for theming. Dark mode via the `dark` class. Custom fonts: Michroma (`--font-headline`), Roboto (`--font-body`). Complex animations use GSAP + `split-type`.

**Path alias**: `@/*` maps to `src/*`.

## Key conventions

- `src/lib/utils.ts` exports `cn()` — always use it for conditional Tailwind class merging.
- Images use Next.js `<Image>` with remote patterns allowed for `placehold.co`, `unsplash.com`, `picsum.photos`, and `i.ibb.co`.
- `next.config.ts` currently ignores TypeScript and ESLint errors during build — do not rely on this; run `typecheck` and `lint` manually.
- Dashboard layout (`src/app/dashboard/layout.tsx`) wraps all `/dashboard/*` routes with a sidebar; add new dashboard pages as siblings there.
