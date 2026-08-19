"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const javaSteps = [
  {
    file: "PickPattern.java",
    code: `// step 1 — pick a pattern
Pattern pattern = patterns[4];
String name = pattern.getName();

System.out.println(name);
// > "Cyclic Sort"`,
  },
  {
    file: "SolveLoop.java",
    code: `// step 2 — work the set
for (Problem p : pattern.getProblems()) {
    boolean solved = solve(p.getSlug());
    markComplete(p.getSlug(), solved);
}
// > 6 / 10 marked complete`,
  },
  {
    file: "TrackProgress.java",
    code: `// step 3 — watch it compound
double progress = totalSolved / 249.0;

render(progressBar, progress);
// > 74 problems solved · 30%`,
  },
];

function colorizeJava(code: string) {
  return code
    .replace(/(\/\/.*)/g, '<span class="text-muted">$1</span>')
    .replace(
      /\b(for|boolean|double|String)\b/g,
      '<span class="text-violet-soft">$1</span>'
    )
    .replace(/\b(System|render)\b/g, '<span class="text-cyan">$1</span>');
}

export default function Hero({
  total,
  patternCount,
}: {
  total: number;
  patternCount: number;
}) {
  const [typed, setTyped] = useState("");
  const [fileName, setFileName] = useState(javaSteps[0].file);
  const [stepIdx, setStepIdx] = useState(0);
  const timelineRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    import("gsap").then(({ gsap }) => {
      if (cancelled) return;

      function typeStep(index: number) {
        const step = javaSteps[index];
        setFileName(step.file);
        const counter = { n: 0 };
        timelineRef.current = gsap.to(counter, {
          n: step.code.length,
          duration: step.code.length * 0.02,
          ease: "none",
          onUpdate: () => setTyped(step.code.slice(0, Math.floor(counter.n))),
          onComplete: () => {
            gsap.delayedCall(1.8, () => {
              if (!cancelled) {
                const next = (index + 1) % javaSteps.length;
                setStepIdx(next);
                typeStep(next);
              }
            });
          },
        });
      }
      typeStep(0);
    });

    return () => {
      cancelled = true;
      timelineRef.current?.kill?.();
    };
  }, []);

  return (
    <section className="relative mx-auto mt-16 flex w-[94%] max-w-6xl flex-col items-center gap-14 pb-10 pt-10 lg:mt-24 lg:flex-row lg:items-start">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex-1 text-center lg:text-left"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 font-mono text-xs text-cyan"
        >
          <Sparkles size={12} /> 25 patterns · {total} curated problems
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
        >
          Stop grinding
          <br />
          random problems.
          <br />
          <span className="text-gradient">Start forging patterns.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted lg:mx-0"
        >
          {patternCount} core DSA patterns, each mapped to its sharpest LeetCode
          problems — up to 15 per pattern, {total} total. Learn the shape once,
          recognize it forever.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
        >
          <Link
            href="/signup"
            className="focus-ring group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet via-cyan to-magenta px-6 py-3 font-medium text-void transition hover:brightness-110 sm:w-auto"
          >
            Create free account
            <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href="/dashboard"
            className="focus-ring w-full rounded-xl border border-glass-border px-6 py-3 text-center font-medium text-ink/90 transition hover:bg-white/5 sm:w-auto"
          >
            Browse patterns
          </Link>
        </motion.div>

        <motion.div variants={item} className="mt-10 flex justify-center gap-8 lg:justify-start">
          {[
            ["249", "problems"],
            ["25", "patterns"],
            ["15", "max / pattern"],
          ].map(([n, l]) => (
            <div key={l}>
              <p className="font-display text-2xl font-semibold text-ink">{n}</p>
              <p className="font-mono text-xs text-muted">{l}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40, rotate: -2 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="w-full max-w-md flex-1"
      >
        <div className="overflow-hidden rounded-2xl glass-strong shadow-[0_0_60px_-15px_rgba(124,92,255,0.4)]">
          <div className="flex items-center gap-1.5 border-b border-glass-border px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-magenta/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-lime/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-cyan/70" />
            <span className="ml-2 font-mono text-[11px] text-muted">{fileName}</span>
            <span className="ml-auto flex gap-1.5">
              {javaSteps.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    i === stepIdx ? "bg-cyan" : "bg-glass-border"
                  }`}
                />
              ))}
            </span>
          </div>
          <pre className="min-h-[220px] overflow-x-auto p-5 font-mono text-[12.5px] leading-6 text-ink/90">
            <code
              dangerouslySetInnerHTML={{
                __html: colorizeJava(typed) + '<span class="mono-cursor"></span>',
              }}
            />
          </pre>
        </div>
      </motion.div>
    </section>
  );
}