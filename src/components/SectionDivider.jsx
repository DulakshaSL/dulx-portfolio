// src/components/SectionDivider.jsx
export default function SectionDivider() {
  return (
    <div className="relative mx-auto max-w-7xl px-5 md:px-10 pointer-events-none select-none" aria-hidden="true">
      {/* Subtle hairline gradient divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {/* Multi-color gradient beam matching palette */}
      <div className="mx-auto h-[1px] w-2/3 -mt-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 via-purple-500/35 to-transparent blur-[1px]" />
      {/* Soft ambient glow wash */}
      <div className="mx-auto h-3 w-1/2 -mt-1.5 bg-gradient-to-r from-transparent via-indigo-500/15 via-cyan-500/10 to-transparent blur-md" />
    </div>
  );
}
