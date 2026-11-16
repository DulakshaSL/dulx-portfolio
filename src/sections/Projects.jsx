// src/sections/Projects.jsx
import { useState, useEffect, useRef } from "react";
import { projects } from "../data/projects";
import { FadeUp } from "../components/Motion";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Github,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

// Mobile-optimized Project Card
function MobileProjectCard({ project }) {
  const [activeImg, setActiveImg] = useState(0);
  const screens = project?.screens || [];

  const prevImg = (e) => {
    e.stopPropagation();
    setActiveImg((prev) => (prev - 1 + screens.length) % screens.length);
  };

  const nextImg = (e) => {
    e.stopPropagation();
    setActiveImg((prev) => (prev + 1) % screens.length);
  };

  return (
    <article
      className="card-surface cursor-default select-none snap-center shrink-0 w-full
                 relative overflow-hidden rounded-3xl border border-slate-700/80 bg-[#131927]
                 p-5 sm:p-6 backdrop-blur-xl shadow-lg"
    >
      {/* Top Subtle Hairline Gradient Beam */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent opacity-80" />

      {/* Header Row: Title & Subtitle on left, GitHub icon button in top right corner to save space */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-xl font-bold text-white tracking-tight leading-snug">
            {project.title}
          </h3>
          <p className="mt-0.5 text-xs font-medium text-indigo-300">
            {project.subtitle}
          </p>
        </div>

        {/* GitHub button placed right side corner of title matching - text removed to save space */}
        {project.github && (
          <motion.a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-indigo-400/40 bg-gradient-to-r from-[#4f46e5] to-[#4338ca] text-white shadow-sm hover:border-indigo-300 transition-all cursor-pointer"
            aria-label={`View ${project.title} on GitHub`}
          >
            <Github className="h-4 w-4" />
          </motion.a>
        )}
      </div>

      {/* Screenshot Showcase */}
      <div className="mt-4 relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-700/70 bg-[#0c111e] shadow-inner select-none">
        {screens.length > 0 ? (
          <>
            <img
              src={`${import.meta.env.BASE_URL}${screens[activeImg]}`}
              alt={`${project.title} screenshot ${activeImg + 1}`}
              className="h-full w-full object-contain p-2"
              loading="lazy"
              draggable={false}
            />

            {/* If multiple screenshots, show subtle mini arrows & dots */}
            {screens.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImg}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-7 w-7 items-center justify-center rounded-lg border border-slate-600 bg-[#141b2d]/90 text-slate-200 active:scale-90 shadow cursor-pointer"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={nextImg}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-7 w-7 items-center justify-center rounded-lg border border-slate-600 bg-[#141b2d]/90 text-slate-200 active:scale-90 shadow cursor-pointer"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>

                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 rounded-full border border-slate-700 bg-[#0e1424]/90 px-2 py-1 shadow">
                  {screens.map((_, sIdx) => (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImg(sIdx);
                      }}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        sIdx === activeImg ? "w-4 bg-indigo-400" : "w-1.5 bg-slate-600"
                      }`}
                      aria-label={`Go to screenshot ${sIdx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
            No preview available
          </div>
        )}
      </div>

      {/* Tech Stack Chips */}
      <div className="mt-3.5 flex flex-wrap gap-1.5 select-none">
        {(project.stack || []).map((tech) => (
          <span
            key={tech}
            className="rounded-lg border border-slate-700 bg-[#0e1424] px-2 py-0.5 text-[11px] font-medium text-slate-200"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Key Features & Architecture Bullets */}
      <div className="mt-4 space-y-2">
        {(project.bullets || []).map((bullet, bIdx) => (
          <div key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
            <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 mt-0.5 shrink-0" />
            <span className="leading-relaxed">{bullet}</span>
          </div>
        ))}
      </div>

      {/* Live Demo button if available */}
      {project.live && (
        <div className="mt-4 pt-3.5 border-t border-slate-700/60">
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-[#141b2d] px-4 py-2 text-xs font-semibold text-slate-100 hover:border-cyan-400 hover:text-white transition-all shadow-sm"
          >
            <span>Live Demo</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      )}
    </article>
  );
}

export default function Projects() {
  const [projectIndex, setProjectIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Mobile swipe carousel state (matching What I Excel At)
  const mobileScrollerRef = useRef(null);
  const [mobileProjectIndex, setMobileProjectIndex] = useState(0);

  const totalProjects = projects.length;
  const currentProject = projects[projectIndex];
  const screens = currentProject?.screens || [];

  // Reset desktop active image index when switching projects
  useEffect(() => {
    setActiveImageIndex(0);
  }, [projectIndex]);

  // Auto-cycle through project screenshots on desktop
  useEffect(() => {
    if (screens.length <= 1 || paused) return;

    const timer = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % screens.length);
    }, 3800);

    return () => clearInterval(timer);
  }, [screens.length, paused, projectIndex]);

  // Mobile scroll listener for native smooth snap tracking
  useEffect(() => {
    const el = mobileScrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const children = Array.from(el.children);
      if (!children.length) return;
      const left = el.scrollLeft;
      const card = children[0];
      const cardWidth = card ? card.offsetWidth + 16 : (el.clientWidth || 1);
      const idx = Math.round(left / cardWidth);
      setMobileProjectIndex(Math.max(0, Math.min(idx, children.length - 1)));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToMobileProject = (idx) => {
    const el = mobileScrollerRef.current;
    if (!el) return;
    const card = el.children[0];
    const cardWidth = card ? card.offsetWidth + 16 : el.clientWidth;
    el.scrollTo({ left: idx * cardWidth, behavior: "smooth" });
  };

  const prevProject = () => {
    setDirection(-1);
    setProjectIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  };

  const nextProject = () => {
    setDirection(1);
    setProjectIndex((prev) => (prev + 1) % totalProjects);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + screens.length) % screens.length);
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % screens.length);
  };

  // Keyboard navigation for projects (desktop)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === "ArrowLeft") prevProject();
      if (e.key === "ArrowRight") nextProject();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalProjects]);

  // Framer Motion slide variants for desktop showcase
  const projectSlideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.985,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 220, damping: 26, mass: 0.8 },
        opacity: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      scale: 0.985,
      transition: {
        x: { type: "spring", stiffness: 220, damping: 26, mass: 0.8 },
        opacity: { duration: 0.25, ease: "easeIn" },
        scale: { duration: 0.25, ease: "easeIn" },
      },
    }),
  };

  return (
    <section id="projects" className="relative px-5 md:px-10 py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl overflow-visible">
        {/* Section Header */}
        <FadeUp>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10">
            <div>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                Featured Projects
              </h2>
              <p className="mt-3 text-slate-300 max-w-2xl text-base leading-relaxed">
                Full-stack applications engineered for real-world reliability, combining robust backend logic with intuitive interfaces and applied AI.
              </p>
            </div>

            {/* Desktop / Tablet Modern Navigation Controls with Current of Total Projects (Desktop only) */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-2xl border border-slate-700/80 bg-[#141b2d] px-4 py-2.5 shadow-sm mr-1">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold font-display">
                  Project
                </span>
                <span className="text-base font-bold text-white font-mono">
                  {String(projectIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-slate-500 font-mono">/</span>
                <span className="text-sm font-medium text-slate-400 font-mono">
                  {String(totalProjects).padStart(2, "0")}
                </span>
              </div>

              <motion.button
                type="button"
                onClick={prevProject}
                whileHover={{ scale: 1.08, x: -2 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-700 bg-[#141b2d] text-slate-200 hover:text-white hover:border-indigo-400 hover:bg-[#1a233a] transition-all cursor-pointer shadow-sm"
                aria-label="Previous project"
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>

              <motion.button
                type="button"
                onClick={nextProject}
                whileHover={{ scale: 1.08, x: 2 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-700 bg-[#141b2d] text-slate-200 hover:text-white hover:border-indigo-400 hover:bg-[#1a233a] transition-all cursor-pointer shadow-sm"
                aria-label="Next project"
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </FadeUp>

        {/* ============================================================== */}
        {/* MOBILE VIEW: Ultra-smooth native scroll snap with dot indicator */}
        {/* ============================================================== */}
        <div className="block md:hidden">
          <div
            ref={mobileScrollerRef}
            className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {projects.map((proj) => (
              <MobileProjectCard key={proj.title} project={proj} />
            ))}
          </div>

          {/* Mobile project dot indicators with smooth active pill animation */}
          {projects.length > 1 && (
            <div className="mt-5 flex justify-center">
              <div className="flex gap-2 rounded-full border border-slate-700 bg-[#141b2d] px-3.5 py-2 backdrop-blur-md shadow-md">
                {projects.map((_, i) => (
                  <motion.button
                    key={i}
                    type="button"
                    onClick={() => scrollToMobileProject(i)}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.8 }}
                    animate={{
                      scale: i === mobileProjectIndex ? 1.3 : 1,
                      backgroundColor:
                        i === mobileProjectIndex ? "#818cf8" : "rgba(255,255,255,0.35)",
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 22 }}
                    className="h-2 w-2 rounded-full cursor-pointer"
                    aria-label={`Go to project ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* DESKTOP VIEW: 2-Column Showcase Carousel with Full Features    */}
        {/* ============================================================== */}
        <div className="hidden md:block">
          <FadeUp delay={0.1}>
            <div
              className="relative"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.div
                  key={projectIndex}
                  custom={direction}
                  variants={projectSlideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="card-surface relative overflow-hidden rounded-3xl border border-slate-700/80 bg-[#131927] p-8 lg:p-10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] cursor-default select-none"
                >
                  {/* Top Subtle Hairline Gradient Beam */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent opacity-80" />

                  {/* 2-Column Showcase: Left Image Carousel | Right Features & Details */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-center">
                    {/* LEFT COLUMN: Large Interactive Screenshot Showcase */}
                    <div className="md:col-span-6 lg:col-span-7">
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-700/70 bg-[#0c111e] shadow-inner select-none">
                        {screens.length > 0 ? (
                          <>
                            {/* Animated Active Screenshot Display */}
                            <AnimatePresence mode="popLayout" initial={false}>
                              <motion.img
                                key={`${projectIndex}-${activeImageIndex}`}
                                src={`${import.meta.env.BASE_URL}${screens[activeImageIndex]}`}
                                alt={`${currentProject.title} screenshot ${activeImageIndex + 1}`}
                                className="h-full w-full object-contain p-2 md:p-3 relative z-10"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.01 }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                draggable={false}
                              />
                            </AnimatePresence>

                            {/* Top & bottom subtle gradient shades */}
                            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0c111e]/80 to-transparent z-10" />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0c111e]/80 to-transparent z-10" />

                            {/* Screenshot Navigation Arrows inside image */}
                            {screens.length > 1 && (
                              <>
                                <motion.button
                                  type="button"
                                  onClick={prevImage}
                                  whileHover={{ scale: 1.15, x: -2 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-xl border border-slate-600 bg-[#141b2d]/90 text-slate-200 hover:text-white hover:border-indigo-400 hover:bg-[#1a233a] backdrop-blur-md transition-all cursor-pointer shadow-md"
                                  aria-label="Previous screenshot"
                                >
                                  <ChevronLeft className="h-4 w-4" />
                                </motion.button>

                                <motion.button
                                  type="button"
                                  onClick={nextImage}
                                  whileHover={{ scale: 1.15, x: 2 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-xl border border-slate-600 bg-[#141b2d]/90 text-slate-200 hover:text-white hover:border-indigo-400 hover:bg-[#1a233a] backdrop-blur-md transition-all cursor-pointer shadow-md"
                                  aria-label="Next screenshot"
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </motion.button>
                              </>
                            )}

                            {/* Screenshot dots indicator on image bottom */}
                            {screens.length > 1 && (
                              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2 rounded-full border border-slate-700 bg-[#0e1424]/90 px-3 py-1.5 backdrop-blur-md shadow-md">
                                {screens.map((_, idx) => (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveImageIndex(idx);
                                    }}
                                    className={`h-2 rounded-full transition-all cursor-pointer ${
                                      idx === activeImageIndex
                                        ? "w-5 bg-indigo-400"
                                        : "w-2 bg-slate-600 hover:bg-slate-400"
                                    }`}
                                    aria-label={`Go to screenshot ${idx + 1}`}
                                  />
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                            No screenshots available
                          </div>
                        )}
                      </div>
                    </div>

                    {/* RIGHT COLUMN: Project Features, Tech Stack & Action Details */}
                    <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-between">
                      <div>
                        {/* Project Title & Subtitle */}
                        <h3 className="font-display text-2xl lg:text-3xl font-bold text-white tracking-tight">
                          {currentProject.title}
                        </h3>

                        <p className="mt-1 text-base font-medium text-indigo-300">
                          {currentProject.subtitle}
                        </p>

                        {/* Tech Stack Chips */}
                        <div className="mt-4 flex flex-wrap gap-1.5 select-none">
                          {(currentProject.stack || []).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-lg border border-slate-700 bg-[#0e1424] px-2.5 py-1 text-xs font-medium text-slate-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Key Features & Architecture Bullets */}
                        <div className="mt-6 space-y-3">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-display">
                            Key Features &amp; Architecture
                          </h4>
                          <div className="space-y-2.5">
                            {(currentProject.bullets || []).map((bullet, bIdx) => (
                              <div
                                key={bIdx}
                                className="flex items-start gap-3 rounded-xl border border-slate-700/60 bg-[#0e1424]/80 p-3 hover:border-slate-600 transition-colors"
                              >
                                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300">
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                </div>
                                <p className="text-sm leading-relaxed text-slate-200">
                                  {bullet}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Desktop Action Buttons */}
                      <div className="mt-8 pt-6 border-t border-slate-700/60 flex flex-wrap items-center gap-3">
                        {currentProject.github && (
                          <motion.a
                            href={currentProject.github}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.96 }}
                            transition={{ type: "spring", stiffness: 350, damping: 20 }}
                            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#4338ca] border border-indigo-400/40 px-5 py-3 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(79,70,229,0.35)] hover:shadow-[0_6px_28px_rgba(79,70,229,0.55)] hover:border-indigo-300 transition-all cursor-pointer"
                          >
                            <Github className="h-4 w-4" />
                            <span>View on GitHub</span>
                            <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                          </motion.a>
                        )}

                        {currentProject.live && (
                          <motion.a
                            href={currentProject.live}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.96 }}
                            transition={{ type: "spring", stiffness: 350, damping: 20 }}
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-[#141b2d] px-5 py-3 text-sm font-semibold text-slate-100 hover:border-cyan-400 hover:text-white transition-all cursor-pointer shadow-sm"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
