"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ExternalLink, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import type { Problem } from "@/data/patterns";

const difficultyStyle: Record<Problem["difficulty"], string> = {
  Easy: "text-lime border-lime/30 bg-lime/10",
  Medium: "text-cyan border-cyan/30 bg-cyan/10",
  Hard: "text-magenta border-magenta/30 bg-magenta/10",
};

export default function ProblemList({
  patternId,
  problems,
  initialSolved,
  isAuthenticated,
}: {
  patternId: string;
  problems: Problem[];
  initialSolved: string[];
  isAuthenticated: boolean;
}) {
  const [solved, setSolved] = useState<Set<string>>(new Set(initialSolved));
  const [pending, setPending] = useState<string | null>(null);

  const pct = useMemo(
    () => Math.round((solved.size / problems.length) * 100),
    [solved, problems.length]
  );

  async function toggle(slug: string) {
    if (!isAuthenticated) {
      toast.error("Sign in to track your progress.");
      return;
    }

    const wasSolved = solved.has(slug);
    const next = new Set(solved);
    wasSolved ? next.delete(slug) : next.add(slug);
    setSolved(next);
    setPending(slug);

    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problemId: slug, patternId }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }
    } catch {
      // roll back on failure
      const rollback = new Set(solved);
      setSolved(rollback);
      toast.error("Couldn't save that. Try again.");
    } finally {
      setPending(null);
    }
  }

  return (
    <div className="mt-8">
      <div className="mb-6 flex items-center gap-4">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="h-full rounded-full bg-gradient-to-r from-violet via-cyan to-magenta"
          />
        </div>
        <span className="font-mono text-xs text-muted">
          {solved.size}/{problems.length}
        </span>
      </div>

      <ul className="space-y-2.5">
        {problems.map((problem, i) => {
          const isSolved = solved.has(problem.slug);
          const isPending = pending === problem.slug;

          return (
            <motion.li
              key={problem.slug}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.6) }}
              className={`group flex items-center gap-3 rounded-xl border px-4 py-3.5 transition ${
                isSolved
                  ? "border-lime/25 bg-lime/[0.04]"
                  : "border-glass-border bg-white/[0.02] hover:bg-white/[0.04]"
              }`}
            >
              <button
                onClick={() => toggle(problem.slug)}
                aria-pressed={isSolved}
                aria-label={isSolved ? `Mark ${problem.title} as unsolved` : `Mark ${problem.title} as solved`}
                className={`focus-ring flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition ${
                  isSolved
                    ? "border-lime bg-lime text-void"
                    : "border-glass-border text-transparent hover:border-cyan"
                }`}
              >
                {isPending ? (
                  <Loader2 size={13} className="animate-spin text-ink" />
                ) : (
                  <Check size={13} strokeWidth={3} />
                )}
              </button>

              <span className="w-6 shrink-0 font-mono text-[11px] text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span
                className={`flex-1 text-sm ${
                  isSolved ? "text-muted line-through decoration-lime/50" : "text-ink"
                }`}
              >
                {problem.title}
              </span>

              <span
                className={`hidden rounded-full border px-2 py-0.5 font-mono text-[10px] sm:inline-block ${
                  difficultyStyle[problem.difficulty]
                }`}
              >
                {problem.difficulty}
              </span>

              <a
                href={`https://leetcode.com/problems/${problem.slug}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-white/5 hover:text-cyan"
                aria-label={`Open ${problem.title} on LeetCode`}
              >
                <ExternalLink size={15} />
              </a>
            </motion.li>
          );
        })}
      </ul>

      <AnimatePresence>
        {!isAuthenticated && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 rounded-lg border border-violet/30 bg-violet/10 px-4 py-3 text-center text-xs text-violet-soft"
          >
            Sign in to save your progress across sessions.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
