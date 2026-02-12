// src/sections/Timeline.jsx
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

      {/* soft blob */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* header */}
      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-black/30">
          <Icon className="h-5 w-5 text-indigo-200" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-white font-semibold text-lg leading-tight">
              {title}
            </h3>
          </div>

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

      {/* modern feature rows */}
      {bullets.length > 0 && (
        <div className="mt-5 space-y-3">
          {bullets.map((b) => (
            <div
              key={b}
              className="group/row relative flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur transition hover:bg-white/[0.06] hover:border-white/20"
            >
              {/* shine sweep */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover/row:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-indigo-500/15 ring-1 ring-indigo-300/25">
                <CheckCircle2 className="h-4 w-4 text-indigo-300" />
              </div>

              <p className="text-sm text-white/70 leading-relaxed">
                {b}
              </p>
            </div>
          ))}
        </div>
      )}
    </motion.article>
  );
}

export default function Timeline() {
  return (
    <section id="timeline" className="relative px-5 md:px-10 py-16 md:py-15">
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

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Education column */}
          <div className="relative space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-white/90 font-semibold text-lg">Education</h3>
              <Pill icon={GraduationCap} text="Academic Path" />
            </div>

            {/* vertical rail */}
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
                  {/* node */}
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

            {/* vertical rail */}
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
                  {/* node */}
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
