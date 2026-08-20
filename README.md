# ⚡🚀 **PatternForge — DSA Nexus 2099**

🌐 **Live Demo:** 👉 [patternforge-ehdt.onrender.com](https://patternforge-ehdt.onrender.com)

> 🧠 **25 DSA Patterns · 249 Curated LeetCode Problems**  
> 🔐 Real Authentication · 📊 Progress Tracking · 🎨 Futuristic Glassmorphic UI


Stop memorizing solutions. Start recognizing patterns.  
25 core DSA patterns · 249 curated LeetCode problems · Real progress tracking

🚀 Tech Stack
Next.js 14 — App Router, Server Components, Middleware

NextAuth.js — Credentials auth (bcrypt + JWT)

Prisma + SQLite — Local DB, zero config

Tailwind CSS — Glassmorphism + aurora gradients

Framer Motion — Page transitions, scroll reveals

Zod — API validation

react-hot-toast — Toast notifications

✨ Features
🔐 Secure auth (sign up / sign in / protected routes)

🧠 25 patterns × 249 LeetCode problems

📊 Per‑user progress tracking (persisted in DB)

🎨 Futuristic 2099 UI — glass panels, aurora background, hover states

⚠️ Robust error handling (error.tsx, not-found.tsx, loading.tsx)

♿ Accessibility: focus rings, ARIA labels, reduced motion

🛠️ Getting Started
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
  page.tsx                  → landing page
  (auth)/signin/page.tsx    → sign in
  (auth)/signup/page.tsx    → sign up
  dashboard/page.tsx        → pattern overview (protected)
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
🌐 Deployment Notes
🛡️ Offline email/password auth

🗄️ SQLite for dev → PostgreSQL for scale

🔄 Easy swap to OAuth providers later

💡 PatternForge = futuristic coding dojo.  
Aurora vibes + glassmorphic UI + real progress tracking = 🔥 startup‑grade product.
