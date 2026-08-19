import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { patterns, totalProblems } from "@/data/patterns";
import AuroraBackground from "@/components/AuroraBackground";
import Navbar from "@/components/Navbar";
import DashboardGrid from "@/components/DashboardGrid";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string })?.id;

  let solvedByPattern: Record<string, number> = {};
  let totalSolved = 0;

  if (userId) {
    const rows = await prisma.progress.groupBy({
      by: ["patternId"],
      where: { userId },
      _count: { problemId: true },
    });
    solvedByPattern = Object.fromEntries(
      rows.map((r) => [r.patternId, r._count.problemId])
    );
    totalSolved = rows.reduce((sum, r) => sum + r._count.problemId, 0);
  }

  return (
    <main className="relative min-h-screen">
      <AuroraBackground />
      <Navbar />

      <section className="mx-auto mt-14 w-[94%] max-w-6xl pb-32">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
              /dashboard
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              Your pattern map
            </h1>
            <p className="mt-2 max-w-lg text-sm text-muted">
              {totalSolved} of {totalProblems} problems solved. Pick a pattern to
              drill into its curated problem set.
            </p>
          </div>
          <div className="glass rounded-xl px-5 py-3 text-right">
            <p className="font-display text-2xl font-semibold text-gradient">
              {Math.round((totalSolved / totalProblems) * 100) || 0}%
            </p>
            <p className="font-mono text-[11px] text-muted">overall progress</p>
          </div>
        </div>

        <DashboardGrid patterns={patterns} solvedByPattern={solvedByPattern} />
      </section>
    </main>
  );
}
