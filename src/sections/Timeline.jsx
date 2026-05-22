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
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function Pill({ icon: Icon, text }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
      <Icon className="h-3.5 w-3.5 text-indigo-200" />
      <span className="pointer-events-none">{text}</span>
    </div>
  );
}

function TimelineCard({ icon: Icon, title, meta, submeta, bullets = [] }) {
  return (
    <motion.article
      variants={item}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:backdrop-blur"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent opacity-70" />
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-black/30">
          <Icon className="h-5 w-5 text-indigo-200" />
        </div>

        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-white">{title}</h3>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-white/60">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-white/40" />
              {meta}
            </span>

            {submeta && (
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-white/40" />
                {submeta}
              </span>
            )}
          </div>
        </div>
      </div>

      {bullets.length > 0 && (
        <div className="mt-5 space-y-3">
          {bullets.map((b) => (
            <div
              key={b}
              className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
            >
              <div className="grid h-6 w-6 place-items-center rounded-full bg-indigo-500/15 ring-1 ring-indigo-300/25">
                <CheckCircle2 className="h-4 w-4 text-indigo-300" />
              </div>

              <p className="text-sm text-white/70">{b}</p>
            </div>
          ))}
        </div>
      )}
    </motion.article>
  );
}

/* =========================
   🚀 iOS SMOOTH SLIDER (NEW)
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

    const threshold = 70;

    if (currentX.current < -threshold) go(page + 1);
    if (currentX.current > threshold) go(page - 1);

    currentX.current = 0;
  };

  return (
    <div className="mt-10 lg:hidden">
      {/* tabs */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-full border border-white/10 bg-black/30 p-1">
          <button
            onClick={() => go(0)}
            className={`px-4 py-2 text-sm rounded-full transition ${
              page === 0 ? "bg-white/10 text-white" : "text-white/60"
            }`}
          >
            Education
          </button>
          <button
            onClick={() => go(1)}
            className={`px-4 py-2 text-sm rounded-full transition ${
              page === 1 ? "bg-white/10 text-white" : "text-white/60"
            }`}
          >
            Experience
          </button>
        </div>
      </div>

      {/* SWIPE AREA */}
      <div className="mt-6 overflow-hidden">
        <div
          className="flex will-change-transform"
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
        >
          {/* PAGE 1 */}
          <div className="w-full flex-shrink-0 px-1">
            <h3 className="mb-6 text-lg font-semibold text-white/90">
              Education
            </h3>

            <div className="space-y-6">
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

          {/* PAGE 2 */}
          <div className="w-full flex-shrink-0 px-1">
            <h3 className="mb-6 text-lg font-semibold text-white/90">
              Experience
            </h3>

            <div className="space-y-6">
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
        <div className="flex gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2">
          {[0, 1].map((i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`h-2 w-2 rounded-full transition ${
                i === page ? "bg-white/80" : "bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========================= */

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="relative px-5 pt-12 md:px-10 md:py-16"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:60px_60px]" />

      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
            <Sparkles className="h-4 w-4 text-indigo-300" />
            Education • Experience
          </div>

          <h2 className="mt-4 text-3xl font-semibold text-white md:text-5xl">
            Timeline
          </h2>

          <p className="mt-3 max-w-2xl text-white/60">
            A quick look at my academic path and real-world roles.
          </p>
        </FadeUp>

        {/* MOBILE */}
        <MobileSectionSlider />

        {/* DESKTOP */}
        <div className="mt-10 hidden gap-6 lg:grid lg:grid-cols-2">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white/90">
              Education
            </h3>
            <div className="space-y-6">
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

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white/90">
              Experience
            </h3>
            <div className="space-y-6">
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