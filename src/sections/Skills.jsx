// src/sections/Skills.jsx
import { useMemo, useState } from "react";
import { FadeUp } from "../components/Motion";
import { skills } from "../data/skills";
import { Sparkles, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function LevelBadge({ level }) {
  const styles = {
    Strong:
      "bg-emerald-500/15 text-emerald-300 border border-emerald-400/40 shadow-[0_0_20px_rgba(16,185,129,0.25)]",
    Good:
      "bg-sky-500/15 text-sky-300 border border-sky-400/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]",
    Moderate:
      "bg-orange-500/15 text-orange-300 border border-orange-400/40 shadow-[0_0_20px_rgba(249,115,22,0.25)]",
  };

  return (
    <span
      className={`text-xs px-3 py-1 rounded-full border backdrop-blur ${styles[level]}`}
    >
      {level}
    </span>
  );
}

export default function Skills() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const pageSize = 2;
  const totalPages = Math.ceil(skills.length / pageSize);

  const current = useMemo(() => {
    const start = page * pageSize;
    return skills.slice(start, start + pageSize);
  }, [page]);

  const next = () => {
    setDirection(1);
    setPage((p) => (p + 1) % totalPages);
  };

  const prev = () => {
    setDirection(-1);
    setPage((p) => (p - 1 + totalPages) % totalPages);
  };

  return (
    <section id="skills" className="relative px-5 md:px-10 py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <FadeUp>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur">
              <Sparkles className="h-4 w-4 text-indigo-300" />
              Skills • Areas of Mastery
            </div>

            <h2 className="mt-4 text-3xl md:text-5xl font-semibold text-white">
              What I’m Strong At
            </h2>

            <p className="mt-3 text-white/60 max-w-3xl">
              My primary expertise is full-stack web application development,
              backed by strong database knowledge and applied machine learning integration.
            </p>
          </div>
        </FadeUp>

        {/* Slider */}
        <div className="relative mt-12">

          {/* Left Arrow */}
          {totalPages > 1 && (
            <button
              onClick={prev}
              className="absolute -left-16 top-1/2 -translate-y-1/2 z-20
                         h-12 w-12 rounded-full
                         border border-white/10
                         bg-white/5 backdrop-blur-xl
                         hover:bg-white/10 hover:border-white/20
                         transition-all duration-300
                         hover:scale-110 active:scale-95
                         flex items-center justify-center
                         text-white/80 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Right Arrow */}
          {totalPages > 1 && (
            <button
              onClick={next}
              className="absolute -right-16 top-1/2 -translate-y-1/2 z-20
                         h-12 w-12 rounded-full
                         border border-white/10
                         bg-white/5 backdrop-blur-xl
                         hover:bg-white/10 hover:border-white/20
                         transition-all duration-300
                         hover:scale-110 active:scale-95
                         flex items-center justify-center
                         text-white/80 hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}

          {/* Slide */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={page}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ type: "spring", stiffness: 70, damping: 18 }}
              className="grid gap-6 lg:grid-cols-2"
            >
              {current.map((s) => {
                const Icon = s.icon;

                return (
                  <article
                    key={s.title}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:border-white/20"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-black/30">
                          <Icon className="h-5 w-5 text-indigo-200" />
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-white">
                            {s.title}
                          </h3>
                          <p className="mt-2 text-sm text-white/60 leading-relaxed">
                            {s.description}
                          </p>
                        </div>
                      </div>

                      <LevelBadge level={s.level} />
                    </div>

                    {/* Feature rows */}
                    <div className="mt-6 space-y-3">
                      {s.items.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 text-sm text-white/70"
                        >
                          <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </article>
                );
              })}
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
