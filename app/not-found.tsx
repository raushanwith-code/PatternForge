import Link from "next/link";
import { Compass } from "lucide-react";
import AuroraBackground from "@/components/AuroraBackground";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-4">
      <AuroraBackground />
      <div className="w-full max-w-md rounded-2xl glass-strong p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-violet/15 text-violet-soft">
          <Compass size={20} />
        </span>
        <p className="mt-4 font-mono text-xs text-cyan">404 // NOT_FOUND</p>
        <h1 className="mt-2 font-display text-xl font-semibold">
          This pattern doesn't exist.
        </h1>
        <p className="mt-2 text-sm text-muted">
          The page you're looking for isn't in the array. Check the URL or
          head back to your dashboard.
        </p>
        <Link
          href="/dashboard"
          className="focus-ring mt-6 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-violet to-cyan px-5 py-2.5 text-sm font-medium text-void transition hover:brightness-110"
        >
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}
