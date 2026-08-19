export default function Loading() {
  return (
    <main className="relative min-h-screen">
      <div className="mx-auto mt-14 w-[94%] max-w-6xl pb-32">
        <div className="mb-10 h-16 w-64 animate-pulse rounded-xl bg-white/5" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-44 animate-pulse rounded-2xl border border-glass-border bg-white/[0.03]"
              style={{ animationDelay: `${i * 80}ms` }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
