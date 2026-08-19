"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { LogIn, Mail, Lock, Loader2 } from "lucide-react";
import AuroraBackground from "@/components/AuroraBackground";
import Navbar from "@/components/Navbar";

export default function SignInPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.email || !form.password) {
      setError("Enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error === "CredentialsSignin" ? "Invalid email or password." : res.error);
        toast.error("Sign in failed.");
        return;
      }

      toast.success("Welcome back.");
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Network hiccup — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col">
      <AuroraBackground />
      <Navbar />

      <div className="flex flex-1 items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md rounded-2xl glass-strong p-8"
        >
          <div className="mb-6 text-center">
            <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet to-cyan text-void">
              <LogIn size={18} />
            </span>
            <h1 className="mt-4 font-display text-2xl font-semibold">Welcome back</h1>
            <p className="mt-1 text-sm text-muted">Sign in to pick up where you left off.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-muted">
                Email
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-glass-border bg-white/5 px-3 py-2.5 focus-within:border-cyan/60">
                <Mail size={15} className="text-muted" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted/60"
                  placeholder="you@domain.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-muted">
                Password
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-glass-border bg-white/5 px-3 py-2.5 focus-within:border-cyan/60">
                <Lock size={15} className="text-muted" />
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted/60"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-magenta/30 bg-magenta/10 px-3 py-2 text-xs text-magenta"
                role="alert"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="focus-ring flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet to-cyan py-2.5 font-medium text-void transition hover:brightness-110 disabled:opacity-60"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            No account yet?{" "}
            <Link href="/signup" className="text-cyan hover:underline">
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
