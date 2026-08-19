import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#05060A",
        surface: "#0B0D14",
        glass: "rgba(255,255,255,0.045)",
        "glass-border": "rgba(255,255,255,0.09)",
        ink: "#F5F7FF",
        muted: "#8892B0",
        violet: {
          DEFAULT: "#7C5CFF",
          soft: "#9C87FF",
        },
        cyan: {
          DEFAULT: "#22D3EE",
        },
        magenta: {
          DEFAULT: "#FF3EA5",
        },
        lime: {
          DEFAULT: "#B4FF6B",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "aurora-1": "radial-gradient(circle at 20% 20%, rgba(124,92,255,0.35), transparent 45%)",
        "aurora-2": "radial-gradient(circle at 80% 30%, rgba(34,211,238,0.30), transparent 45%)",
        "aurora-3": "radial-gradient(circle at 50% 80%, rgba(255,62,165,0.28), transparent 50%)",
        "grid-lines": "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "42px 42px",
      },
      animation: {
        float: "float 9s ease-in-out infinite",
        "float-slow": "float 14s ease-in-out infinite",
        drift: "drift 26s linear infinite",
        "pulse-glow": "pulse-glow 3.2s ease-in-out infinite",
        blink: "blink 1.1s steps(1) infinite",
        "spin-slow": "spin 18s linear infinite",
        marquee: "marquee 32s linear infinite",
        rise: "rise 0.7s cubic-bezier(0.16,1,0.3,1) both",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-22px) translateX(10px)" },
        },
        drift: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.55", filter: "blur(60px)" },
          "50%": { opacity: "0.9", filter: "blur(80px)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
