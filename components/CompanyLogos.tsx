"use client";

import { motion } from "framer-motion";

const companies: [string, string][] = [
  ["Amazon", "#FF9900"],
  ["Google", "#4285F4"],
  ["Meta", "#0668E1"],
  ["Microsoft", "#00A4EF"],
  ["Apple", "#A2AAAD"],
  ["Netflix", "#E50914"],
  ["Uber", "#FFFFFF"],
  ["Bloomberg", "#22D3EE"],
];

export default function CompanyLogos() {
  return (
    <div className="py-8 text-center">
      <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        Curated from questions asked at
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {companies.map(([name, color], i) => (
          <motion.span
            key={name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="inline-flex items-center gap-2 rounded-lg glass px-4 py-2 font-display text-sm font-semibold text-ink"
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: color, boxShadow: `0 0 8px 1px ${color}` }}
            />
            {name}
          </motion.span>
        ))}
      </div>
    </div>
  );
}