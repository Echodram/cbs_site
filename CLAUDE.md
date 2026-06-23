# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Institut Biblique Lumière des Nations** — a fullstack Next.js 14 website with a public-facing site and a protected admin dashboard. Backend is entirely Supabase (PostgreSQL + Auth + Storage); there is no separate API server.

A secondary related project lives at `/home/lenovo/nextjs_cbs` (appears to be a base template).

## Commands

```bash
npm run dev      # Dev server at http://localhost:3000
npm run build    # Production build
npm start        # Run production build
npm run lint     # ESLint check
```

No test suite is configured.

## Environment Setup

Copy `.env.example` to `.env.local` and fill in:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Both variables are public (browser-exposed). Supabase Row-Level Security enforces auth at the database level.

## Database Setup

Run the three SQL migrations in order via the Supabase SQL editor:
1. `supabase/migrations/001_initial_schema.sql` — tables
2. `supabase/migrations/002_rls_policies.sql` — RLS policies
3. `supabase/migrations/003_storage.sql` — image storage buckets

Admin users must be created directly in the Supabase Dashboard (no signup UI).

## Architecture

### Routing

Uses Next.js 14 **App Router**. All routes under `/admin/*` are protected by `middleware.ts` (delegates to `lib/supabase/middleware.ts`) which checks for an active Supabase session.

**Public routes:** `/`, `/a-propos`, `/blog`, `/blog/[slug]`, `/evenements`, `/evenements/[id]`, `/contact`

**Protected routes:** `/admin/login`, `/admin/dashboard`, `/admin/blog`, `/admin/blog/nouveau`, `/admin/blog/[id]`, `/admin/evenements`, `/admin/evenements/[id]`, `/admin/messages`, `/admin/parametres`

### Data Access Pattern

No REST API routes. Data flows via:
- **Server Components** → `lib/supabase/server.ts` (cookie-based SSR client) → Supabase PostgREST
- **Client Components** → `lib/supabase/client.ts` (browser client)
- **Mutations** → Next.js Server Actions (`'use server'`) → Supabase mutations

Service modules in `lib/supabase/` (articles, events, messages, settings) contain all Supabase CRUD logic.

### Auth

`@supabase/ssr` is used for SSR-safe cookie-based auth. Two client factories:
- `lib/supabase/server.ts` — for Server Components, Route Handlers, Server Actions
- `lib/supabase/client.ts` — for Client Components (`'use client'`)

The `useAuth` hook (`lib/hooks/useAuth.ts`) handles client-side session state and sign-in/out.

### Database Tables

| Table | Purpose |
|-------|---------|
| `articles` | Blog posts; `slug` is unique; `content` is Tiptap HTML; `status` is `published` or `draft` |
| `events` | Events; stored as date/time strings |
| `messages` | Contact form submissions; `read` boolean |
| `settings` | Key-value store (`key` PK, `value` JSONB) for site configuration |

### Forms

All forms use **React Hook Form** + **Zod** for validation. Rich text fields use the Tiptap editor (`components/admin/RichTextEditor.tsx`). Image uploads go to Supabase Storage (`components/admin/ImageUpload.tsx`).

### Styling

**Tailwind CSS** with a custom brand palette:
- `brand-brown` `#4A2C0A` — headers, nav, footer
- `brand-gold` `#F0C040` — buttons, accents
- `brand-cream` `#FAF5EE` — page backgrounds
- `brand-brown-light` `#6B4C2A` — hover states
- `brand-brown-dark` `#2E1A05` — body text

Fonts: **Playfair Display** (serif, headings) and **Inter** (sans-serif, body), loaded via Next.js Font Optimization. Use CSS variables `--font-playfair` and `--font-inter`.

### Path Alias

`@/*` resolves to the project root (e.g., `@/lib/supabase/client` → `./lib/supabase/client`).
