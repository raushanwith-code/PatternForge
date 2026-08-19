"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";
import AuroraBackground from "@/components/AuroraBackground";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[APP_ERROR]", error);
  }, [error]);

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4">
      <AuroraBackground />
      <div className="w-full max-w-md rounded-2xl glass-strong p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-magenta/15 text-magenta">
          <AlertTriangle size={20} />
        </span>
        <h1 className="mt-4 font-display text-xl font-semibold">
          Something broke the pattern.
        </h1>
        <p className="mt-2 text-sm text-muted">
          An unexpected error interrupted this page. It's been logged — try
          again, or head back to the dashboard.
        </p>
        {error.digest && (
          <p className="mt-2 font-mono text-[11px] text-muted/70">
            ref: {error.digest}
          </p>
        )}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="focus-ring flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet to-cyan px-5 py-2.5 text-sm font-medium text-void transition hover:brightness-110"
          >
            <RotateCcw size={14} /> Try again
          </button>
          <Link
            href="/dashboard"
            className="focus-ring rounded-lg border border-glass-border px-5 py-2.5 text-sm text-ink/90 transition hover:bg-white/5"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
