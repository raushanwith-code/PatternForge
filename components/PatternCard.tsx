"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { Pattern } from "@/data/patterns";

export default function PatternCard({
  pattern,
  href,
  solved,
  total,
  ghost = false,
}: {
  pattern: Pick<Pattern, "id" | "index" | "name" | "tagline" | "color">;
  href: string;
  solved?: number;
  total: number;
  ghost?: boolean;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const pct = solved !== undefined ? Math.round((solved / total) * 100) : 0;

  const [c1, c2] = colorStops(pattern.color);

  useEffect(() => {
    if (ghost) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const card = cardRef.current;
    if (!card) return;

    let rotX: (v: number) => void;
    let rotY: (v: number) => void;
    let liftY: (v: number) => void;
    let cleanup = () => {};

    import("gsap").then(({ gsap }) => {
      gsap.set(card, { transformPerspective: 900 });
      rotX = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3.out" });
      rotY = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3.out" });
      liftY = gsap.quickTo(card, "y", { duration: 0.5, ease: "power3.out" });

      const move = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const maxTilt = 14;
        rotY((px - 0.5) * maxTilt * 2);
        rotX(-(py - 0.5) * maxTilt * 2);
        liftY(-6);
        card.style.setProperty("--mx", `${px * 100}%`);
        card.style.setProperty("--my", `${py * 100}%`);
        card.classList.add("tilting");
      };
      const leave = () => {
        rotX(0);
        rotY(0);
        liftY(0);
        card.classList.remove("tilting");
      };

      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);
      cleanup = () => {
        card.removeEventListener("mousemove", move);
        card.removeEventListener("mouseleave", leave);
      };
    });

    return () => cleanup();
  }, [ghost]);

  return (
    <Link
      ref={cardRef}
      href={href}
      data-cursor-hover
      style={{ "--c1": c1, "--c2": c2 } as React.CSSProperties}
      className={`tilt-card group relative block h-full overflow-hidden rounded-2xl glass p-6 ${
        ghost ? "pointer-events-none select-none" : ""
      }`}
    >
      {!ghost && (
        <>
          <div className="card-light" />
          <div className="card-orb">
            <i style={{ background: `radial-gradient(circle, #fff, ${c1} 60%, transparent 75%)` }} />
          </div>
        </>
      )}
      <div
        className={`absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${pattern.color} opacity-20 blur-2xl transition group-hover:opacity-40`}
      />

      <div className="relative z-[2] flex items-start justify-between">
        <span className="font-mono text-xs text-muted">
          arr[{String(pattern.index).padStart(2, "0")}]
        </span>
        {solved !== undefined && (
          <span className="font-mono text-[11px] text-lime">
            O({solved}/{total})
          </span>
        )}
      </div>

      <h3 className="relative z-[2] mt-2 font-display text-lg font-semibold">{pattern.name}</h3>
      <p className="relative z-[2] mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
        {pattern.tagline}
      </p>

      <div className="relative z-[2] mt-5 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${pattern.color} transition-[width] duration-700 ease-out`}
          style={{ width: `${solved !== undefined ? pct : 0}%` }}
        />
      </div>
      <div className="relative z-[2] mt-2 flex justify-between font-mono text-[10px] text-muted">
        <span>{solved !== undefined ? `${pct}% complete` : "\u00b7\u00b7 % complete"}</span>
        <span>{total} problems</span>
      </div>
    </Link>
  );
}

function colorStops(colorClass: string): [string, string] {
  // colorClass looks like "from-violet to-cyan" - map to real hex for the CSS vars
  const map: Record<string, string> = {
    violet: "#7C5CFF",
    cyan: "#22D3EE",
    magenta: "#FF3EA5",
    lime: "#B4FF6B",
  };
  const parts = colorClass.match(/from-(\w+).*to-(\w+)/);
  if (!parts) return ["#7C5CFF", "#22D3EE"];
  return [map[parts[1]] ?? "#7C5CFF", map[parts[2]] ?? "#22D3EE"];
}
