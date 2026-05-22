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
      <div className="grid h-full w-full place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-xs text-white/50">
        Add screenshots in /public/shots/...
      </div>
    );
  }

  const src = withBase(safeImages[index]);

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* blurred background */}
      <img
        src={src}
        alt=""
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-2xl"
        draggable={false}
        loading="lazy"
        decoding="async"
      />

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* animated image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={src}
          src={src}
          alt="Project screenshot"
          className="relative z-10 h-full w-full object-contain"
          initial={{ opacity: 0, x: 14, scale: 1.01 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -14, scale: 1.01 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          draggable={false}
        />
      </AnimatePresence>

      {/* top gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/55 to-transparent" />

      {/* desktop arrows only */}
      {hasMany && (
        <>
          {/* previous */}
          <button
            type="button"
            onClick={prev}
            className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-xl border border-white/10 bg-black/40 p-2 text-white/80 backdrop-blur-sm transition hover:border-white/20 hover:text-white md:flex"
            aria-label="Previous screenshot"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* next */}
          <button
            type="button"
            onClick={next}
            className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-xl border border-white/10 bg-black/40 p-2 text-white/80 backdrop-blur-sm transition hover:border-white/20 hover:text-white md:flex"
            aria-label="Next screenshot"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* dots */}
          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-sm">
            {safeImages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full transition ${
                  i === index
                    ? "bg-white/80"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to screenshot ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}