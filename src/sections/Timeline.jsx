// src/sections/Timeline.jsx
import { useState } from "react";
import { FadeUp } from "../components/Motion";
import { education, experience } from "../data/timeline";
import { motion, AnimatePresence } from "framer-motion";
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
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
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
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
    >
      {/* premium highlight lines */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* soft blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* header */}
      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-black/30">
          <Icon className="h-5 w-5 text-indigo-200" />
        </div>

        <div className="min-w-0">
          <h3 className="text-white font-semibold text-lg leading-tight">
            {title}
          </h3>

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

      {/* feature rows */}
      {bullets.length > 0 && (
        <div className="mt-5 space-y-3">
          {bullets.map((b) => (
            <div
              key={b}
              className="group/row relative flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur transition hover:bg-white/[0.06] hover:border-white/20"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover/row:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-indigo-500/15 ring-1 ring-indigo-300/25">
                <CheckCircle2 className="h-4 w-4 text-indigo-300" />
              </div>

              <p className="text-sm text-white/70 leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
      )}
    </motion.article>
  );
}

/** Mobile: slide between Education & Experience (2 slides total) */
function MobileSectionSlider() {
  const [page, setPage] = useState(0); // 0=Education, 1=Experience
  const [direction, setDirection] = useState(1);
  const total = 2;

  const go = (next) => {
    setDirection(next > page ? 1 : -1);
    setPage(next);
  };

  const onSwipe = (offsetX) => {
    if (offsetX < -35 && page < total - 1) go(page + 1);
    if (offsetX > 35 && page > 0) go(page - 1);
  };

  return (
    <div className="mt-10 lg:hidden">
      {/* top switch pills */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-full border border-white/10 bg-black/30 p-1 backdrop-blur">
          <button
            type="button"
            onClick={() => go(0)}
            className={`px-4 py-2 text-sm rounded-full transition ${
              page === 0
                ? "bg-white/10 text-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            Education
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className={`px-4 py-2 text-sm rounded-full transition ${
              page === 1
                ? "bg-white/10 text-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            Experience
          </button>
        </div>
      </div>

      {/* slide */}
      <div className="relative mt-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={page}
            initial={{ opacity: 0, x: direction > 0 ? 70 : -70 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -70 : 70 }}
            transition={{ type: "spring", stiffness: 95, damping: 18 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => onSwipe(info.offset.x)}
            className="touch-pan-y"
          >
            {page === 0 ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-white/90 font-semibold text-lg">Education</h3>
                  <Pill icon={GraduationCap} text="Academic Path" />
                </div>

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
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-white/90 font-semibold text-lg">Experience</h3>
                  <Pill icon={Briefcase} text="Work Roles" />
                </div>

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
            )}
          </motion.div>
        </AnimatePresence>

        {/* dots */}
        <div className="mt-6 flex justify-center">
          <div className="flex gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 backdrop-blur">
            {[0, 1].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                className={`h-2 w-2 rounded-full transition ${
                  i === page ? "bg-white/80" : "bg-white/25 hover:bg-white/45"
                }`}
                aria-label={i === 0 ? "Show Education" : "Show Experience"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Timeline() {
  return (
    <section id="timeline" className="relative px-5 pt-12 md:pd-0 md:px-10 pb-0 py-16 md:pt-26 md:py-15">
      {/* subtle startup background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:60px_60px]" />
        <div className="absolute -top-24 left-10 h-80 w-80 rounded-full bg-indigo-500/15 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-fuchsia-500/12 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur">
            <Sparkles className="h-4 w-4 text-indigo-300" />
            Education • Experience
          </div>

          <h2 className="mt-4 text-3xl md:text-5xl font-semibold text-white">
            Timeline
          </h2>
          <p className="mt-3 text-white/60 max-w-2xl">
            A quick look at my academic path and real-world roles.
          </p>
        </FadeUp>

        {/* ✅ MOBILE: 2 slides (Education / Experience) */}
        <MobileSectionSlider />

        {/* ✅ DESKTOP: keep exactly as before */}
        <div className="mt-10 hidden lg:grid gap-6 lg:grid-cols-2">
          {/* Education column */}
          <div className="relative space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-white/90 font-semibold text-lg">Education</h3>
              <Pill icon={GraduationCap} text="Academic Path" />
            </div>

            <div className="pointer-events-none absolute left-6 top-14 bottom-0 w-px bg-gradient-to-b from-indigo-400/0 via-indigo-400/25 to-indigo-400/0" />

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ staggerChildren: 0.08, delayChildren: 0.05 }}
              className="space-y-6"
            >
              {education.map((e) => (
                <div key={e.title} className="relative pl-14">
                  <div className="absolute left-[18px] top-8 h-3 w-3 rounded-full bg-indigo-300/70 shadow-[0_0_0_6px_rgba(99,102,241,0.12)]" />
                  <TimelineCard
                    icon={GraduationCap}
                    title={e.title}
                    meta={e.org}
                    submeta={e.year}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Experience column */}
          <div className="relative space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-white/90 font-semibold text-lg">Experience</h3>
              <Pill icon={Briefcase} text="Work Roles" />
            </div>

            <div className="pointer-events-none absolute left-6 top-14 bottom-0 w-px bg-gradient-to-b from-fuchsia-400/0 via-fuchsia-400/20 to-fuchsia-400/0" />

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ staggerChildren: 0.08, delayChildren: 0.05 }}
              className="space-y-6"
            >
              {experience.map((x) => (
                <div key={x.title} className="relative pl-14">
                  <div className="absolute left-[18px] top-8 h-3 w-3 rounded-full bg-fuchsia-300/70 shadow-[0_0_0_6px_rgba(217,70,239,0.10)]" />
                  <TimelineCard
                    icon={Briefcase}
                    title={x.title}
                    meta={x.org}
                    submeta={x.date}
                    bullets={x.bullets}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
