"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let dotX: (v: number) => void;
    let dotY: (v: number) => void;

    let cleanup = () => {};

    import("gsap").then(({ gsap }) => {
      const dot = dotRef.current;
      if (!dot) return;

      gsap.set(dot, { xPercent: -50, yPercent: -50 });
      dotX = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3" });
      dotY = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3" });

      const move = (e: MouseEvent) => {
        dotX(e.clientX);
        dotY(e.clientY);
      };
      const over = (e: MouseEvent) => {
        if ((e.target as HTMLElement)?.closest("a,button,.tilt-card,[data-cursor-hover]")) {
          gsap.to(dot, { scale: 1.6, duration: 0.25 });
        }
      };
      const out = (e: MouseEvent) => {
        if ((e.target as HTMLElement)?.closest("a,button,.tilt-card,[data-cursor-hover]")) {
          gsap.to(dot, { scale: 1, duration: 0.25 });
        }
      };
      const down = () => gsap.to(dot, { scale: 0.7, duration: 0.15 });
      const up = () => gsap.to(dot, { scale: 1, duration: 0.2 });

      window.addEventListener("mousemove", move);
      document.addEventListener("mouseover", over);
      document.addEventListener("mouseout", out);
      document.addEventListener("mousedown", down);
      document.addEventListener("mouseup", up);

      cleanup = () => {
        window.removeEventListener("mousemove", move);
        document.removeEventListener("mouseover", over);
        document.removeEventListener("mouseout", out);
        document.removeEventListener("mousedown", down);
        document.removeEventListener("mouseup", up);
      };
    });

    document.body.classList.add("has-custom-cursor");
    return () => {
      cleanup();
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
