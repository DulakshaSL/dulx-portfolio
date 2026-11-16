// src/components/SectionDivider.jsx
export default function SectionDivider() {
  return (
    <div className="relative mx-auto max-w-7xl px-5 md:px-10 py-5 pointer-events-none select-none" aria-hidden="true">
      {/* Clean hairline divider without blur bubbles */}
      <div className="relative flex items-center justify-center">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        <div className="absolute h-px w-1/3 bg-gradient-to-r from-transparent via-indigo-500/50 via-cyan-400/40 to-transparent" />
      </div>
    </div>
  );
}
