"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { Terminal, LogOut, LayoutGrid } from "lucide-react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-4 z-50 mx-auto flex w-[94%] max-w-6xl items-center justify-between rounded-2xl glass px-5 py-3"
    >
      <Link href="/" className="flex items-center gap-2 group">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet to-cyan text-void">
          <Terminal size={16} strokeWidth={2.5} />
        </span>
        <span className="font-display text-[15px] font-semibold tracking-tight">
          Pattern<span className="text-gradient">Forge</span>
        </span>
        <span className="hidden font-mono text-[10px] text-muted sm:inline">/2099</span>
      </Link>

      <nav className="flex items-center gap-2 sm:gap-4">
        {status === "authenticated" ? (
          <>
            <Link
              href="/dashboard"
              className="focus-ring flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-ink/80 transition hover:bg-white/5 hover:text-ink"
            >
              <LayoutGrid size={14} /> Dashboard
            </Link>
                        <span className="hidden items-center gap-2 rounded-full border border-glass-border bg-white/5 px-3 py-1.5 md:flex">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet to-magenta text-[10px] font-semibold text-white">
                {session.user?.name?.slice(0, 2).toUpperCase() || "U"}
              </span>
              <span className="text-sm">
                Hey, <b>{session.user?.name || "there"}</b> 👋
              </span>
            </span>
           
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="focus-ring flex items-center gap-1.5 rounded-lg border border-glass-border bg-white/5 px-3 py-1.5 text-sm text-ink transition hover:bg-white/10"
            >
              <LogOut size={14} /> Sign out
            </button>
          </>
        ) : (
          <>
            <Link
              href="/signin"
              className="focus-ring rounded-lg px-3 py-1.5 text-sm text-ink/80 transition hover:bg-white/5 hover:text-ink"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="focus-ring rounded-lg bg-gradient-to-r from-violet to-cyan px-4 py-1.5 text-sm font-medium text-void transition hover:brightness-110"
            >
              Get started
            </Link>
          </>
        )}
      </nav>
    </motion.header>
  );
}
