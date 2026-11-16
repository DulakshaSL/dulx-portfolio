// src/sections/Skills.jsx
import { useMemo, useRef, useState, useEffect } from "react";
import { FadeUp } from "../components/Motion";
import { skills } from "../data/skills";
import { Sparkles, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function LevelBadge({ level }) {
  const styles = {
    Strong:
      "bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-sm",
    Good:
      "bg-cyan-500/15 text-cyan-300 border-cyan-500/40 shadow-sm",
    Moderate:
      "bg-purple-500/15 text-purple-300 border-purple-500/40 shadow-sm",
  };

  return (
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-full border backdrop-blur-md inline-flex items-center gap-1.5 select-none ${
        styles[level] || styles.Good
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {level}
    </span>
  );
}

const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? 65 : -65,
    opacity: 0,
    scale: 0.985,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 190, damping: 25, mass: 0.8 },
      opacity: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
      scale: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
    },
  },
  exit: (dir) => ({
    x: dir > 0 ? -65 : 65,
    opacity: 0,
    scale: 0.985,
    transition: {
      x: { type: "spring", stiffness: 190, damping: 25, mass: 0.8 },
      opacity: { duration: 0.28, ease: "easeIn" },
      scale: { duration: 0.28, ease: "easeIn" },
    },
  }),
};

export default function Skills() {
  // Desktop slider state
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

  // Mobile swipe carousel
  const scrollerRef = useRef(null);
  const [mobileIndex, setMobileIndex] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const children = Array.from(el.children);
      if (!children.length) return;
      const left = el.scrollLeft;
      const card = children[0];
      const cardWidth = card ? card.offsetWidth + 16 : (el.clientWidth || 1);
      const idx = Math.round(left / cardWidth);
      setMobileIndex(Math.max(0, Math.min(idx, children.length - 1)));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToMobile = (idx) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.children[0];
    const cardWidth = card ? card.offsetWidth + 16 : el.clientWidth;
    el.scrollTo({ left: idx * cardWidth, behavior: "smooth" });
  };

  return (
    <section
      id="skills"
      className="relative px-5 md:px-10 py-16 md:py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <FadeUp>
          <div>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              What I Excel At
            </h2>

            <p className="mt-3 text-slate-300 max-w-3xl text-base leading-relaxed">
              My core capability spans production-grade full-stack web applications, backed by disciplined database modeling and applied machine learning integration.
            </p>
          </div>
        </FadeUp>

        {/* ===================== */}
        {/* MOBILE (swipe, clean dots) */}
        {/* ===================== */}
        <div className="mt-10 md:hidden">
          <div
            ref={scrollerRef}
            className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {skills.map((s) => {
              const Icon = s.icon;
              return (
                <motion.article
                  key={s.title}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="card-surface cursor-default select-none snap-center shrink-0 w-full
                             group relative overflow-hidden rounded-3xl
                             border border-slate-700/80 bg-[#131927] p-5 sm:p-6 backdrop-blur-xl
                             transition-all duration-300 hover:border-indigo-400 shadow-lg"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent" />

                  {/* Card Header: Icon & Title on left, Badge on right */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="grid h-11 w-11 shrink-0 aspect-square place-items-center rounded-2xl border border-slate-700 bg-[#0e1424] text-indigo-300 shadow-inner">
                        <Icon className="h-5 w-5 shrink-0" />
                      </div>

                      <h3 className="font-display text-base sm:text-lg font-bold text-white leading-tight">
                        {s.title}
                      </h3>
                    </div>

                    <div className="shrink-0">
                      <LevelBadge level={s.level} />
                    </div>
                  </div>

                  {/* Description: Full-width text below header, perfectly readable */}
                  <p className="mt-3.5 text-sm text-slate-300 leading-relaxed">
                    {s.description}
                  </p>

                  <div className="mt-6 space-y-2.5">
                    {s.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 text-sm text-slate-200"
                      >
                        <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {s.chips && s.chips.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-slate-700/70 flex flex-wrap gap-1.5">
                      {s.chips.map((chip) => (
                        <span
                          key={chip}
                          className="rounded-lg border border-slate-700 bg-[#0e1424] px-2.5 py-1 text-[11px] font-semibold text-slate-200"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.article>
              );
            })}
          </div>

          {/* Mobile dots (Clickable pagination) */}
          {skills.length > 1 && (
            <div className="mt-5 flex justify-center">
              <div className="flex gap-2 rounded-full border border-slate-700 bg-[#141b2d] px-3.5 py-2 backdrop-blur-md shadow-md">
                {skills.map((_, i) => (
                  <motion.button
                    key={i}
                    type="button"
                    onClick={() => scrollToMobile(i)}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.8 }}
                    animate={{
                      scale: i === mobileIndex ? 1.3 : 1,
                      backgroundColor: i === mobileIndex ? "#818cf8" : "rgba(255,255,255,0.35)",
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 22 }}
                    className="h-2 w-2 rounded-full cursor-pointer"
                    aria-label={`Go to skill ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ===================== */}
        {/* DESKTOP (carousel + 2 per slide) */}
        {/* ===================== */}
        <div className="relative mt-12 hidden md:block">
          {/* Left Arrow */}
          {totalPages > 1 && (
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.12, x: -3 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              aria-label="Previous skills"
              className="absolute -left-16 top-1/2 -translate-y-1/2 z-20
                         h-12 w-12 rounded-full
                         border border-slate-700
                         bg-[#141b2d] backdrop-blur-xl
                         hover:bg-[#1d2740] hover:border-indigo-400
                         flex items-center justify-center
                         text-slate-200 hover:text-white transition-all cursor-pointer shadow-lg"
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
          )}

          {/* Right Arrow */}
          {totalPages > 1 && (
            <motion.button
              onClick={next}
              whileHover={{ scale: 1.12, x: 3 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              aria-label="Next skills"
              className="absolute -right-16 top-1/2 -translate-y-1/2 z-20
                         h-12 w-12 rounded-full
                         border border-slate-700
                         bg-[#141b2d] backdrop-blur-xl
                         hover:bg-[#1d2740] hover:border-indigo-400
                         flex items-center justify-center
                         text-slate-200 hover:text-white transition-all cursor-pointer shadow-lg"
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          )}

          {/* Slide */}
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full grid gap-6 lg:grid-cols-2"
            >
              {current.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.article
                    key={s.title}
                    whileHover={{
                      y: -6,
                      scale: 1.015,
                      transition: { type: "spring", stiffness: 280, damping: 22 },
                    }}
                    className="card-surface cursor-default select-none group relative overflow-hidden rounded-3xl border border-slate-700/80 bg-[#131927] p-7 backdrop-blur-xl transition-all duration-300 hover:border-indigo-400 hover:bg-[#192235] hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent" />

                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 min-w-0">
                          <div className="grid h-12 w-12 shrink-0 aspect-square place-items-center rounded-2xl border border-slate-700 bg-[#0e1424] text-indigo-300 shadow-inner group-hover:border-indigo-400 group-hover:text-white transition-colors">
                            <Icon className="h-6 w-6 shrink-0" />
                          </div>

                          <div className="min-w-0">
                            <h3 className="font-display text-xl font-bold text-white group-hover:text-indigo-200 transition-colors">
                              {s.title}
                            </h3>
                            <p className="mt-1.5 text-sm text-slate-300 leading-relaxed">
                              {s.description}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0">
                          <LevelBadge level={s.level} />
                        </div>
                      </div>

                      <div className="mt-6 space-y-3">
                        {s.items.map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-3 text-sm text-slate-200"
                          >
                            <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {s.chips && s.chips.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-slate-700/70 flex flex-wrap gap-2 select-none">
                        {s.chips.map((chip) => (
                          <span
                            key={chip}
                            className="rounded-lg border border-slate-700 bg-[#0e1424] px-3 py-1 text-xs font-semibold text-slate-200"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.article>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
