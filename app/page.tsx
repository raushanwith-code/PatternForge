import Link from "next/link";
import AuroraBackground from "@/components/AuroraBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PatternCard from "@/components/PatternCard";
import CompanyLogos from "@/components/CompanyLogos";
import { patterns, totalProblems } from "@/data/patterns";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <AuroraBackground />
      <Navbar />
      <Hero total={totalProblems} patternCount={patterns.length} />

      {/* marquee of patterns */}
      <section className="relative mt-8 overflow-hidden border-y border-glass-border py-4">
        <div className="flex w-max animate-marquee gap-8 font-mono text-sm text-muted">
          {[...patterns, ...patterns].map((p, i) => (
            <span key={i} className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-cyan">arr[{String(p.index).padStart(2, "0")}]</span>
              {p.name}
              <span className="text-glass-border">///</span>
            </span>
          ))}
        </div>
      </section>

      <CompanyLogos />

      {/* pattern grid preview */}
      <section className="mx-auto mt-24 w-[94%] max-w-6xl pb-32">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
              const patterns = [...]
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Every pattern, indexed.
            </h2>
          </div>
          <Link
            href="/dashboard"
            className="focus-ring hidden items-center gap-1 rounded-lg border border-glass-border px-4 py-2 text-sm text-ink/80 transition hover:bg-white/5 sm:flex"
          >
            View all <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1400 }}>
          {patterns.slice(0, 6).map((p) => (
            <PatternCard
              key={p.id}
              pattern={p}
              href="/dashboard"
              total={p.problems.length}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/dashboard"
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet via-cyan to-magenta px-6 py-3 font-medium text-void transition hover:brightness-110"
          >
            Unlock all {patterns.length} patterns <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      <footer className="relative border-t border-glass-border py-8 text-center font-mono text-xs text-muted">
        PatternForge — built for engineers who'd rather understand O(n) than memorize 2000 problems.
      </footer>
    </main>
  );
}