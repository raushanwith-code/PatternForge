"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { UserPlus, Mail, Lock, User, Loader2 } from "lucide-react";
import AuroraBackground from "@/components/AuroraBackground";
import Navbar from "@/components/Navbar";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Couldn't create your account.");
        toast.error(data.error ?? "Sign up failed.");
        return;
      }

      const signInRes = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (signInRes?.error) {
        toast.success("Account created — please sign in.");
        router.push("/signin");
        return;
      }

      toast.success("Account created. Let's go.");
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
            <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-magenta to-violet text-void">
              <UserPlus size={18} />
            </span>
            <h1 className="mt-4 font-display text-2xl font-semibold">Create your account</h1>
            <p className="mt-1 text-sm text-muted">249 problems, 25 patterns, one dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-muted">
                Name
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-glass-border bg-white/5 px-3 py-2.5 focus-within:border-cyan/60">
                <User size={15} className="text-muted" />
                <input
                  id="name"
                  required
                  minLength={2}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted/60"
                  placeholder="Ada Lovelace"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-muted">
                Email
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-glass-border bg-white/5 px-3 py-2.5 focus-within:border-cyan/60">
                <Mail size={15} className="text-muted" />
                <input
                  id="email"
                  type="email"
                  required
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
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted/60"
                  placeholder="At least 8 characters"
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
              className="focus-ring flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-magenta to-violet py-2.5 font-medium text-void transition hover:brightness-110 disabled:opacity-60"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />}
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link href="/signin" className="text-cyan hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
