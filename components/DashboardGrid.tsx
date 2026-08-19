"use client";

import { motion } from "framer-motion";
import type { Pattern } from "@/data/patterns";
import PatternCard from "@/components/PatternCard";

export default function DashboardGrid({
  patterns,
  solvedByPattern,
}: {
  patterns: Pattern[];
  solvedByPattern: Record<string, number>;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1400 }}>
      {patterns.map((p, i) => {
        const solved = solvedByPattern[p.id] ?? 0;

        return (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <PatternCard
              pattern={p}
              href={`/dashboard/${p.id}`}
              solved={solved}
              total={p.problems.length}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
