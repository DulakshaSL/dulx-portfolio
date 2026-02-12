import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, CheckCircle2 } from "lucide-react";
import ProjectShowcase from "./ProjectShowcase";

export default function ProjectModal({ open, project, onClose }) {
  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Lock scroll when modal open
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
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* backdrop */}
          <button
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close modal"
          />

          {/* modal */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#070810]/80 shadow-2xl backdrop-blur"
          >
            {/* top gradient line */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/45 to-transparent" />

            {/* header */}
            <div className="flex items-start justify-between gap-4 p-5 md:p-6 border-b border-white/10">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  {project.featured && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-300/70" />
                      Featured
                    </span>
                  )}
                  <h3 className="text-xl md:text-2xl font-semibold text-white truncate">
                    {project.title}
                  </h3>
                </div>
                <p className="mt-1 text-white/60">{project.subtitle}</p>

                {/* stack chips */}
                <div className="mt-3 flex flex-wrap gap-2 select-none">
                  {(project.stack || []).map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 pointer-events-none"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/80 hover:text-white hover:border-white/20 transition"
                  >
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                )}

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:text-white hover:border-white/20 transition"
                  >
                    <ExternalLink className="h-4 w-4" /> Live
                  </a>
                )}

                <button
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-black/30 p-2 text-white/70 hover:text-white hover:border-white/20 transition"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* content */}
            <div className="grid gap-6 p-5 md:p-6 lg:grid-cols-[1.05fr_0.95fr]">
              {/* left: bullets */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white/80">
                  Key highlights
                </h4>

                <div className="space-y-3">
                  {(project.bullets || []).map((b) => (
                    <div
                      key={b}
                      className="group/item relative flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:bg-white/[0.06] hover:border-white/20 cursor-default select-none"
                    >
                      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      <div className="mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-indigo-500/15 ring-1 ring-indigo-300/25">
                        <CheckCircle2 className="h-4 w-4 text-indigo-300" />
                      </div>
                      <p className="text-sm text-white/70 leading-relaxed pointer-events-none">
                        {b}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* right: showcase */}
              <div className="aspect-[16/10] w-full">
                <ProjectShowcase images={project.screens || []} intervalMs={3500} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
