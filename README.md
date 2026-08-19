# PatternForge — DSA Nexus 2099

🚀 **Live Demo:** [patternforge-ehdt.onrender.com](https://patternforge-ehdt.onrender.com)

A full-stack Next.js 14 e-learning platform for interview prep: **25 DSA patterns**,
**249 curated LeetCode problems** (max 15 per pattern), real authentication, per-user
progress tracking, and a glassmorphic, aurora-animated "2099" UI built with
Tailwind CSS + Framer Motion.

## Stack

- **Next.js 14** (App Router, Server Components, Route Handlers, Middleware)
- **NextAuth.js** — email/password auth (Credentials provider, bcrypt-hashed, JWT sessions)
- **Prisma + SQLite** — zero-config local database, no external service needed
- **Tailwind CSS** — custom token system (colors, glass utilities, aurora gradients)
- **Framer Motion** — page-load choreography, scroll reveals, progress bar animation
- **Zod** — request validation on every API route
- **react-hot-toast** — toast notifications for success/error states

## Features

- 🔐 Real auth: sign up, sign in, protected `/dashboard/*` routes via middleware
- 🧠 25 patterns × up to 15 problems each = 249 direct LeetCode links
- ✅ Per-user progress tracking (checkbox toggles persist to the database)
- 🎨 Fully transparent glassmorphic UI, animated aurora background, marquee, hover states
- ⚠️ Proper error handling: `error.tsx`, `not-found.tsx`, `loading.tsx`, try/catch +
  validated responses on every API route, inline form errors
- ♿ Accessible: visible focus rings, `aria-pressed`/`aria-label` on interactive controls,
  `prefers-reduced-motion` respected

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in a real secret
cp .env.example .env
# generate one with: openssl rand -base64 32

# 3. Create the local SQLite database
npm run db:push

# 4. Run the dev server
npm run dev
Visit http://localhost:3000.

Project structure
Code
app/
  page.tsx                  → landing page (hero, marquee, pattern preview)
  (auth)/signin/page.tsx    → sign in
  (auth)/signup/page.tsx    → sign up
  dashboard/page.tsx        → pattern overview grid (protected)
  dashboard/[pattern]/page.tsx → problem list for one pattern (protected)
  api/auth/[...nextauth]/   → NextAuth handler
  api/auth/register/        → sign-up endpoint (zod-validated, bcrypt hash)
  api/progress/             → GET/POST solved-problem tracking
  error.tsx / not-found.tsx / dashboard/loading.tsx
components/
  Navbar, Hero, AuroraBackground, DashboardGrid, ProblemList, Providers
data/patterns.ts            → the 25 patterns × 249 problems dataset
lib/auth.ts, lib/prisma.ts
prisma/schema.prisma
