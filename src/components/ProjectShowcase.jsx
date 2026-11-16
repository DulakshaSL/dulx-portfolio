import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const withBase = (path) =>
  `${import.meta.env.BASE_URL}${String(path || "").replace(/^\/+/, "")}`;

export default function ProjectShowcase({
  images = [],
  intervalMs = 3500,
}) {
  const safeImages = useMemo(
    () => (Array.isArray(images) ? images.filter(Boolean) : []),
    [images]
  );

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const hasMany = safeImages.length > 1;

  useEffect(() => {
    if (!hasMany || paused) return;

    const t = setInterval(() => {
      setIndex((i) => (i + 1) % safeImages.length);
    }, intervalMs);

    return () => clearInterval(t);
  }, [hasMany, paused, safeImages.length, intervalMs]);

  useEffect(() => {
    if (index >= safeImages.length) {
      setIndex(0);
    }
  }, [safeImages.length, index]);

  const prev = () =>
    setIndex((i) => (i - 1 + safeImages.length) % safeImages.length);

  const next = () =>
    setIndex((i) => (i + 1) % safeImages.length);

  // swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;

    const diff = touchStartX.current - touchEndX.current;

    // minimum swipe distance
    if (Math.abs(diff) < 50) return;

    if (diff > 0) {
      next();
    } else {
      prev();
    }
  };

  if (safeImages.length === 0) {
    return (
      <div className="grid h-full w-full place-items-center rounded-2xl border border-slate-700/80 bg-[#131927]/60 text-xs text-slate-400">
        No preview available
      </div>
    );
  }

  const src = withBase(safeImages[index]);

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-2xl border border-slate-700/80 bg-[#0c111e]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* background image subtle ambience */}
      <img
        src={src}
        alt=""
        className="absolute inset-0 h-full w-full scale-105 object-cover opacity-15 blur-sm"
        draggable={false}
        loading="lazy"
        decoding="async"
      />

      {/* dark overlay */}
      <div className="absolute inset-0 bg-[#0b0f19]/50" />

      {/* animated image */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.img
          key={src}
          src={src}
          alt="Project screenshot"
          className="relative z-10 h-full w-full object-contain p-2"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{
            opacity: { duration: 0.35, ease: [0.25, 1, 0.35, 1] },
            scale: { duration: 0.4, ease: [0.25, 1, 0.35, 1] },
          }}
          draggable={false}
        />
      </AnimatePresence>

      {/* top gradient vignette */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0b0f19]/80 to-transparent" />

      {/* desktop navigation arrows */}
      {hasMany && (
        <>
          {/* previous */}
          <motion.button
            type="button"
            onClick={prev}
            whileHover={{ scale: 1.15, x: -2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-xl border border-slate-600 bg-[#141b2d]/95 p-2 text-slate-100 backdrop-blur-md transition-all hover:border-indigo-400 hover:bg-[#1d2740] hover:text-white md:flex cursor-pointer shadow-lg"
            aria-label="Previous screenshot"
          >
            <ChevronLeft className="h-4 w-4" />
          </motion.button>

          {/* next */}
          <motion.button
            type="button"
            onClick={next}
            whileHover={{ scale: 1.15, x: 2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-xl border border-slate-600 bg-[#141b2d]/95 p-2 text-slate-100 backdrop-blur-md transition-all hover:border-indigo-400 hover:bg-[#1d2740] hover:text-white md:flex cursor-pointer shadow-lg"
            aria-label="Next screenshot"
          >
            <ChevronRight className="h-4 w-4" />
          </motion.button>

          {/* dots indicator */}
          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full border border-slate-700 bg-[#141b2d]/95 px-3 py-1.5 backdrop-blur-md shadow-lg">
            {safeImages.map((_, i) => (
              <motion.button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.8 }}
                animate={{
                  scale: i === index ? 1.25 : 1,
                  backgroundColor: i === index ? "#818cf8" : "rgba(255,255,255,0.35)",
                }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="h-2 w-2 rounded-full cursor-pointer"
                aria-label={`Go to screenshot ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
