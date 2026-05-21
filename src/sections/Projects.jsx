// src/sections/Projects.jsx
import { useEffect, useMemo, useState } from "react";
import { projects } from "../data/projects";
import { FadeUp } from "../components/Motion";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import ProjectModal from "../components/ProjectModal";

export default function Projects() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  // slider
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  

  // swipe
  const [dragX, setDragX] = useState(0);

  // responsive page size (mobile 1, desktop 3)
  const [pageSize, setPageSize] = useState(() =>
    typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 3
  );

  const list = useMemo(() => projects || [], []);

  useEffect(() => {
    const onResize = () => setPageSize(window.innerWidth < 768 ? 1 : 3);
    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const totalPages = Math.max(1, Math.ceil(list.length / pageSize));

  const current = useMemo(() => {
    const start = page * pageSize;
    return list.slice(start, start + pageSize);
  }, [list, page, pageSize]);

  // keep page valid if list/pagesize changes
  useEffect(() => {
    if (page > totalPages - 1) setPage(totalPages - 1);
  }, [totalPages, page]);

  const openModal = (p) => {
    setActive(p);
    setOpen(true);
    setPaused(true);
  };

  const closeModal = () => {
    setOpen(false);
    setActive(null);
    setPaused(false);
  };

  const prevPage = () => {
    setDirection(-1);
    setPage((p) => (p - 1 + totalPages) % totalPages);
  };

  const nextPage = () => {
    setDirection(1);
    setPage((p) => (p + 1) % totalPages);
  };

  


  const SWIPE_THRESHOLD = 60;

  return (
    <section id="projects"   className="relative px-5 md:px-10 pt-6 md:pt-36 pb-20">
      {/* AI background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="absolute -top-24 left-10 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute top-20 right-10 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl overflow-visible">
        {/* Heading */}
        <FadeUp>
          <header className="select-none cursor-default">
            <h2 className="mt-12 text-3xl md:text-5xl font-semibold text-white pointer-events-none">
              Featured Projects
            </h2>

            <p className="mt-3 text-white/60 max-w-2xl pointer-events-none">
              Full-stack projects focused on real-world solutions, integrating scalable
              architecture with applied AI and machine learning.
            </p>
          </header>
        </FadeUp>

        {/* Slider */}
        <FadeUp>
          <div
  className="relative mt-7 md:overflow-visible overflow-x-clip"
  onMouseEnter={() => setPaused(true)}
  onMouseLeave={() => !open && setPaused(false)}
>

            <div className="relative">
              {/* Desktop arrows only */}
              {totalPages > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevPage}
                    aria-label="Previous projects"
                    className="
                      hidden md:flex
                      absolute -left-16 top-1/2 -translate-y-1/2 z-20
                      h-12 w-12 rounded-full
                      border border-white/10 bg-white/5 backdrop-blur-xl
                      hover:bg-white/10 hover:border-white/20
                      transition-all duration-300 hover:scale-110 active:scale-95
                      items-center justify-center
                      text-white/80 hover:text-white
                    "
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    onClick={nextPage}
                    aria-label="Next projects"
                    className="
                      hidden md:flex
                      absolute -right-16 top-1/2 -translate-y-1/2 z-20
                      h-12 w-12 rounded-full
                      border border-white/10 bg-white/5 backdrop-blur-xl
                      hover:bg-white/10 hover:border-white/20
                      transition-all duration-300 hover:scale-110 active:scale-95
                      items-center justify-center
                      text-white/80 hover:text-white
                    "
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Slide */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${page}-${pageSize}`}
                  initial={{ opacity: 0, x: direction > 0 ? 90 : -90 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -90 : 90 }}
                  transition={{ type: "spring", stiffness: 80, damping: 18 }}
                  className={`grid gap-4 ${
                    pageSize === 1
                      ? "grid-cols-1 max-w-[560px] mx-auto"
                      : "lg:grid-cols-3"
                  }`}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.12}
                  onDrag={(_, info) => setDragX(info.offset.x)}
                  onDragEnd={() => {
                    if (dragX > SWIPE_THRESHOLD) prevPage();
                    else if (dragX < -SWIPE_THRESHOLD) nextPage();
                    setDragX(0);
                  }}
                >
                  {current.map((p, i) => (
                    <motion.div
                      key={p.title}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.05 }}
                      whileHover={{
                        scale: 1.02,
                        transition: { type: "spring", stiffness: 90, damping: 22 },
                      }}
                      className="group transform-gpu will-change-transform text-left relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition hover:border-white/20"
                    >
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent opacity-60" />
                      <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-white/5 blur-3xl" />

                      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 aspect-[16/10]">
                        {p.screens?.[0] ? (
                          <>
                            <img
                              src={`${import.meta.env.BASE_URL}${p.screens[0]}`}
                              alt=""
                              className="absolute inset-0 h-full w-full object-cover blur-xl scale-105 opacity-25"
                              draggable={false}
                              loading="lazy"
                              decoding="async"
                            />
                            <div className="absolute inset-0 bg-black/30" />
                            <img
                              src={`${import.meta.env.BASE_URL}${p.screens[0]}`}
                              alt={`${p.title} screenshot`}
                              className="relative z-10 h-full w-full object-contain"
                              draggable={false}
                              loading="lazy"
                              decoding="async"
                            />
                          </>
                        ) : (
                          <div className="h-full w-full grid place-items-center text-xs text-white/45">
                            Add screenshots in /public/shots/...
                          </div>
                        )}
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/55 to-transparent" />
                      </div>

                      <div className="mt-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="text-base font-semibold text-white truncate pointer-events-none">
                              {p.title}
                            </h3>
                            <p className="mt-1 text-sm text-white/60 line-clamp-2 pointer-events-none">
                              {p.subtitle}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => openModal(p)}
                            className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white/80 hover:text-white hover:border-white/20 transition cursor-pointer"
                            aria-label={`View ${p.title} case study`}
                          >
                            View
                            <ArrowUpRight className="h-4 w-4 opacity-80" />
                          </button>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2 select-none">
                          {(p.stack || []).slice(0, 4).map((s) => (
                            <span
                              key={s}
                              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70 pointer-events-none"
                            >
                              {s}
                            </span>
                          ))}
                          {(p.stack || []).length > 4 && (
                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/60 pointer-events-none">
                              +{p.stack.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Dots */}
              {totalPages > 1 && (
                <div className="mt-5 flex justify-center">
                  <div className="flex gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 backdrop-blur">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setDirection(i > page ? 1 : -1);
                          setPage(i);
                        }}
                        className={`h-2 w-2 rounded-full transition ${
                          i === page ? "bg-white/80" : "bg-white/25 hover:bg-white/45"
                        }`}
                        aria-label={`Go to page ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile hint */}
              {totalPages > 1 && (
                <div className="mt-3 text-center text-xs text-white/45 md:hidden">
                  Swipe left/right to browse
                </div>
              )}
            </div>
          </div>
        </FadeUp>
      </div>

      <ProjectModal open={open} project={active} onClose={closeModal} />
    </section>
  );
}