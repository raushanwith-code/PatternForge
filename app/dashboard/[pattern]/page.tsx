import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getPattern, patterns } from "@/data/patterns";
import AuroraBackground from "@/components/AuroraBackground";
import Navbar from "@/components/Navbar";
import ProblemList from "@/components/ProblemList";

export function generateStaticParams() {
  return patterns.map((p) => ({ pattern: p.id }));
}

export default async function PatternPage({
  params,
}: {
  params: { pattern: string };
}) {
  const pattern = getPattern(params.pattern);
  if (!pattern) notFound();

  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string })?.id;

  let solvedSlugs: string[] = [];
  if (userId) {
    const rows = await prisma.progress.findMany({
      where: { userId, patternId: pattern.id },
      select: { problemId: true },
    });
    solvedSlugs = rows.map((r) => r.problemId);
  }

  return (
    <main className="relative min-h-screen">
      <AuroraBackground />
      <Navbar />

      <section className="mx-auto mt-14 w-[94%] max-w-4xl pb-32">
        <Link
          href="/dashboard"
          className="focus-ring inline-flex items-center gap-1 text-sm text-muted transition hover:text-ink"
        >
          <ChevronLeft size={15} /> All patterns
        </Link>

        <div className="mt-4 flex flex-col gap-2">
          <span className="font-mono text-xs text-cyan">
            arr[{String(pattern.index).padStart(2, "0")}]
          </span>
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">
            {pattern.name}
          </h1>
          <p className="max-w-xl text-sm text-muted">{pattern.tagline}</p>
        </div>

        <ProblemList
          patternId={pattern.id}
          problems={pattern.problems}
          initialSolved={solvedSlugs}
          isAuthenticated={Boolean(userId)}
        />
      </section>
    </main>
  );
}
