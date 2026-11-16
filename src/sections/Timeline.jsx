// src/sections/Timeline.jsx
import { useState, useRef } from "react";
import { FadeUp } from "../components/Motion";
import { education, experience } from "../data/timeline";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const item = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 180, damping: 22 },
  },
};

function TimelineCard({ icon: Icon, title, meta, submeta, bullets = [] }) {
  return (
    <motion.article
      variants={item}
      whileHover={{
        y: -5,
        scale: 1.012,
        transition: { type: "spring", stiffness: 320, damping: 22 },
      }}
      className="card-surface cursor-default select-none group relative overflow-hidden rounded-3xl border border-slate-700/80 bg-[#131927] p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-indigo-400 hover:bg-[#192235] hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent opacity-80" />

      <div className="flex items-start gap-3.5 sm:gap-4">
        <div className="grid h-12 w-12 shrink-0 aspect-square place-items-center rounded-2xl border border-slate-700 bg-[#0e1424] text-indigo-300 shadow-inner group-hover:border-indigo-400 group-hover:text-white transition-colors">
          <Icon className="h-6 w-6 shrink-0" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-indigo-200 transition-colors">
            {title}
          </h3>

          <div className="mt-2.5 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <MapPin className="h-4 w-4 text-indigo-400 shrink-0" />
              <span>{meta}</span>
            </span>

            {submeta && (
              <span className="inline-flex items-center gap-1.5 font-medium text-slate-400">
                <Calendar className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>{submeta}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {bullets.length > 0 && (
        <div className="mt-5 space-y-2.5 pt-2 border-t border-slate-700/60">
          {bullets.map((b) => (
            <div
              key={b}
              className="flex items-start gap-3 rounded-2xl border border-slate-700/70 bg-[#0e1424] px-4 py-3"
            >
              <div className="mt-0.5 grid h-5 w-5 shrink-0 aspect-square place-items-center rounded-full bg-indigo-500/20 ring-1 ring-indigo-400/40 text-indigo-300">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>

              <p className="text-sm leading-relaxed text-slate-200">{b}</p>
            </div>
          ))}
        </div>
      )}
    </motion.article>
  );
}

/* =========================
   Mobile Slider
========================= */
function MobileSectionSlider() {
  const [page, setPage] = useState(0);

  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);

  const go = (next) => {
    setPage(Math.max(0, Math.min(1, next)));
  };

  const onPointerDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    currentX.current = e.clientX - startX.current;
  };

  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const threshold = 50;

    if (currentX.current < -threshold) go(page + 1);
    if (currentX.current > threshold) go(page - 1);

    currentX.current = 0;
  };

  const onTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    currentX.current = e.targetTouches[0].clientX - startX.current;
  };

  const onTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const threshold = 50;
    if (currentX.current < -threshold) go(page + 1);
    if (currentX.current > threshold) go(page - 1);
    currentX.current = 0;
  };

  return (
    <div className="mt-10 lg:hidden">
      {/* tabs */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-full border border-slate-700 bg-[#141b2d] p-1 backdrop-blur-md shadow-md">
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => go(0)}
            className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${
              page === 0
                ? "bg-indigo-600/30 border border-indigo-500/50 text-white shadow-sm"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Education
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => go(1)}
            className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${
              page === 1
                ? "bg-indigo-600/30 border border-indigo-500/50 text-white shadow-sm"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Experience
          </motion.button>
        </div>
      </div>

      {/* SWIPE AREA */}
      <div className="mt-6 overflow-hidden">
        <div
          className="flex will-change-transform touch-pan-y"
          style={{
            transform: `translate3d(${-page * 100}%, 0, 0)`,
            transition: isDragging.current
              ? "none"
              : "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* PAGE 1: Education */}
          <div className="w-full flex-shrink-0 px-1">
            <h3 className="font-display mb-5 text-xl font-bold text-white flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-sm">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span>Academic Background</span>
            </h3>

            <div className="space-y-4">
              {education.map((e) => (
                <TimelineCard
                  key={e.title}
                  icon={GraduationCap}
                  title={e.title}
                  meta={e.org}
                  submeta={e.year}
                />
              ))}
            </div>
          </div>

          {/* PAGE 2: Experience */}
          <div className="w-full flex-shrink-0 px-1">
            <h3 className="font-display mb-5 text-xl font-bold text-white flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm">
                <Briefcase className="h-5 w-5" />
              </div>
              <span>Professional Experience</span>
            </h3>

            <div className="space-y-4">
              {experience.map((x) => (
                <TimelineCard
                  key={x.title}
                  icon={Briefcase}
                  title={x.title}
                  meta={x.org}
                  submeta={x.date}
                  bullets={x.bullets}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* dots */}
      <div className="mt-6 flex justify-center">
        <div className="flex gap-2 rounded-full border border-slate-700 bg-[#141b2d] px-3.5 py-2 backdrop-blur-md shadow-md">
          {[0, 1].map((i) => (
            <motion.button
              key={i}
              onClick={() => go(i)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.8 }}
              animate={{
                scale: i === page ? 1.3 : 1,
                backgroundColor: i === page ? "#818cf8" : "rgba(255,255,255,0.35)",
              }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="h-2 w-2 rounded-full cursor-pointer"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="relative px-5 md:px-10 py-16 md:py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <h2 className="font-display text-3xl font-extrabold text-white md:text-5xl tracking-tight">
            Journey &amp; Experience
          </h2>

          <p className="mt-3 max-w-2xl text-slate-300 text-base leading-relaxed">
            A comprehensive overview of my academic foundation and hands-on engineering journey.
          </p>
        </FadeUp>

        {/* MOBILE SLIDER */}
        <MobileSectionSlider />

        {/* DESKTOP 2-COLUMN VIEW */}
        <div className="mt-12 hidden gap-8 lg:grid lg:grid-cols-2">
          {/* Column 1: Education */}
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-bold text-white flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/35 shadow-sm">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span>Education</span>
            </h3>
            <div className="space-y-5">
              {education.map((e) => (
                <TimelineCard
                  key={e.title}
                  icon={GraduationCap}
                  title={e.title}
                  meta={e.org}
                  submeta={e.year}
                />
              ))}
            </div>
          </div>

          {/* Column 2: Experience */}
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-bold text-white flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/35 shadow-sm">
                <Briefcase className="h-6 w-6" />
              </div>
              <span>Experience</span>
            </h3>
            <div className="space-y-5">
              {experience.map((x) => (
                <TimelineCard
                  key={x.title}
                  icon={Briefcase}
                  title={x.title}
                  meta={x.org}
                  submeta={x.date}
                  bullets={x.bullets}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
