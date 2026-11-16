import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, CheckCircle2 } from "lucide-react";
import ProjectShowcase from "./ProjectShowcase";

export default function ProjectModal({ open, project, onClose }) {
  // close on ESC
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  // lock body scroll
  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && project && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* backdrop */}
          <motion.button
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-default"
            onClick={onClose}
            aria-label="Close modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* modal */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 240, damping: 26, mass: 0.85 }}
            className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl border border-slate-700/80 bg-[#111625]/98 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
          >
            {/* top glow line */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 via-cyan-400/40 to-transparent" />

            {/* header */}
            <div className="flex flex-col gap-5 border-b border-slate-750/80 border-slate-700/80 p-5 sm:p-6 md:p-7 lg:flex-row lg:items-start lg:justify-between">
              {/* left */}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  {project.featured && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-3 py-1 text-[11px] font-semibold text-indigo-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                      Featured Project
                    </span>
                  )}

                  <h3 className="font-display truncate text-xl font-bold text-white md:text-2xl">
                    {project.title}
                  </h3>
                </div>

                <p className="mt-1 text-sm text-slate-300 md:text-base">
                  {project.subtitle}
                </p>

                {/* stack chips */}
                <div className="mt-3.5 flex flex-wrap gap-2 select-none">
                  {(project.stack || []).map((s) => (
                    <span
                      key={s}
                      className="pointer-events-none rounded-lg border border-slate-700 bg-[#0e1424] px-3 py-1 text-xs font-semibold text-slate-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* actions */}
              <div className="flex flex-wrap items-center gap-2.5">
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-[#161f33] px-4 py-2 text-sm font-semibold text-slate-200 transition-all hover:border-indigo-400 hover:bg-[#1d2944] hover:text-white"
                  >
                    <Github className="h-4 w-4" />
                    <span>GitHub</span>
                  </motion.a>
                )}

                {project.live && (
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:opacity-95"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Live Demo</span>
                  </motion.a>
                )}

                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-[#161f33] p-2 text-slate-300 transition-colors hover:border-slate-500 hover:text-white cursor-pointer"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
            </div>

            {/* content */}
            <div className="grid gap-6 p-5 sm:p-6 md:p-7 lg:grid-cols-[1.05fr_0.95fr]">
              {/* highlights */}
              <div className="space-y-4">
                <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-300">
                  Key Highlights &amp; Architecture
                </h4>

                <div className="space-y-3">
                  {(project.bullets || []).map((b) => (
                    <div
                      key={b}
                      className="flex items-start gap-3 rounded-2xl border border-slate-700/70 bg-[#141b2d]/80 px-4 py-3.5 hover:border-slate-600 transition-colors"
                    >
                      <div className="mt-0.5 grid h-6 w-6 shrink-0 aspect-square place-items-center rounded-full bg-indigo-500/20 ring-1 ring-indigo-400/40 text-indigo-300">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>

                      <p className="text-sm leading-relaxed text-slate-200">
                        {b}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* showcase */}
              <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-700/80 bg-[#0c111e]">
                <ProjectShowcase
                  images={project.screens || []}
                  intervalMs={3500}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
