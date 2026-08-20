⚡ PatternForge — DSA Nexus 2099
🚀 Live Demo: patternforge-ehdt.onrender.com

Stop memorizing solutions. Start recognizing patterns.
Stop grinding random problems. Start forging patterns.

🛠️ Tech Stack
⚛️ Next.js 14 — App Router, Server Components, Middleware

🔐 NextAuth.js — Email/password auth (bcrypt + JWT)

🗄️ Prisma + SQLite — Zero‑config local DB

🎨 Tailwind CSS — Glassmorphism + aurora gradients

🎬 Framer Motion — Page‑load choreography, scroll reveals

✅ Zod — API route validation

🔔 react-hot-toast — Success/error notifications

✨ Features
🔐 Secure auth: Sign up, Sign in, protected /dashboard/* routes

🧠 25 DSA patterns × 249 LeetCode problems (max 15 per pattern)

📊 Per‑user progress tracking with animated progress bars

🎨 Futuristic 2099 UI — glass panels, aurora background, marquee, hover states

⚠️ Robust error handling: error.tsx, not-found.tsx, loading.tsx, inline form errors

♿ Accessibility: focus rings, ARIA labels, reduced motion support

🚀 Getting Started
bash
# 1. Install dependencies
npm install

# 2. Copy env file and set secret
cp .env.example .env
openssl rand -base64 32   # generate NEXTAUTH_SECRET

# 3. Create local SQLite DB
npm run db:push

# 4. Run dev server
npm run dev
👉 Visit: http://localhost:3000

📂 Project Structure
Code
app/
  page.tsx                  → landing page (hero, marquee, preview)
  (auth)/signin/page.tsx    → sign in
  (auth)/signup/page.tsx    → sign up
  dashboard/page.tsx        → pattern overview grid (protected)
  dashboard/[pattern]/page.tsx → problem list (protected)
  api/auth/[...nextauth]/   → NextAuth handler
  api/auth/register/        → sign-up endpoint
  api/progress/             → solved-problem tracking
  error.tsx / not-found.tsx / dashboard/loading.tsx
components/
  Navbar, Hero, AuroraBackground, DashboardGrid, ProblemList, Providers
data/patterns.ts            → 25 patterns × 249 problems dataset
lib/auth.ts, lib/prisma.ts
prisma/schema.prisma
🧩 Dataset
Each pattern has:

id, name, tagline

problems[] → { title, slug, difficulty }

Slug maps directly to: https://leetcode.com/problems/<slug>/

Easy to extend — just edit data/patterns.ts

🌐 Deployment Notes
🛡️ Auth uses email + password → fully offline/self‑hosted

🔄 Swap in Google/GitHub OAuth later if needed

🗄️ SQLite for dev/small deploys → switch to PostgreSQL for scale

💡 PatternForge is not just another DSA platform — it’s a futuristic coding dojo.  
Aurora vibes + glassmorphic UI + real progress tracking = 🔥 startup‑grade product.
