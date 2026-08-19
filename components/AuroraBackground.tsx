export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-void">
      {/* base grid */}
      <div className="absolute inset-0 bg-grid-lines bg-grid opacity-60 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)]" />

      {/* aurora blobs */}
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-violet/40 blur-[110px] animate-pulse-glow" />
      <div className="absolute top-1/3 -right-32 h-[480px] w-[480px] rounded-full bg-cyan/30 blur-[110px] animate-float-slow" />
      <div className="absolute bottom-[-160px] left-1/4 h-[560px] w-[560px] rounded-full bg-magenta/25 blur-[120px] animate-float" />

      {/* scanline sheen */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void/90" />

      {/* vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_220px_60px_rgba(5,6,10,0.9)]" />
    </div>
  );
}
