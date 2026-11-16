// src/sections/Hero.jsx
import { FadeUp } from "../components/Motion";
import { profile } from "../data/profile";
import { ArrowDownRight, Github, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden px-5 md:px-10 pt-10 pb-16 md:pt-20 md:pb-24"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
        {/* TEXT CONTENT - Clean, direct, high contrast */}
        <div className="order-2 md:order-1">
          <FadeUp>
            <div className="text-center md:text-left">
              {/* Main Headline */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Hi, I'm{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-200 to-cyan-300">
                  {profile.name.trim()}
                </span>
              </h1>

              {/* Subheading / Tagline */}
              <p className="mt-4 text-xl sm:text-2xl font-semibold text-indigo-300 font-display">
                Full-Stack Developer &amp; Creative Technologist
              </p>

              {/* Summary Paragraph with High Contrast & Readability */}
              <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-200 md:mx-0">
                {profile.summary}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row md:items-start md:justify-start">
                {/* View Projects (Refined Royal Indigo CTA) */}
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 380, damping: 20 }}
                  className="
                    group relative inline-flex w-full items-center justify-center gap-2.5
                    rounded-2xl bg-gradient-to-r from-[#4f46e5] to-[#4338ca] border border-indigo-400/40 px-7 py-3.5
                    text-base font-semibold text-white shadow-[0_4px_20px_rgba(79,70,229,0.35)]
                    hover:shadow-[0_6px_28px_rgba(79,70,229,0.55)] hover:border-indigo-300 transition-all duration-300
                    sm:w-auto overflow-hidden cursor-pointer
                  "
                >
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span>View Projects</span>
                  <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 text-indigo-200" />
                </motion.a>

                {/* GitHub Profile (Crisp Glass CTA) */}
                <motion.a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 380, damping: 20 }}
                  className="
                    group relative inline-flex w-full items-center justify-center gap-2.5
                    rounded-2xl border border-slate-700 bg-[#141b2d] px-7 py-3.5
                    text-base font-semibold text-slate-100 backdrop-blur-xl
                    transition-all duration-300
                    hover:border-cyan-400 hover:bg-[#1a233a] hover:text-white
                    sm:w-auto cursor-pointer shadow-sm
                  "
                >
                  <Github className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6 text-slate-300 group-hover:text-cyan-300" />
                  <span>GitHub Profile</span>
                </motion.a>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* PHOTO WITH CREATIVE CIRCLE SHAPE CUTOUT DESIGN & ANIMATED ELECTRIC RING */}
        <div className="order-1 md:order-2">
          <FadeUp delay={0.1}>
            <div className="relative flex justify-center md:justify-end">
              <div className="relative select-none p-3">
                {/* Outer Delicate Orbit Ring (Smooth clockwise rotation with dashed hairline & satellite beads strictly on the circular track) */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                  className="pointer-events-none absolute -inset-3 rounded-full border border-indigo-500/30 [border-style:dashed]"
                >
                  {/* Indigo Satellite Bead at top of circle */}
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-indigo-400 shadow-[0_0_12px_#818cf8]" />
                  {/* Cyan Satellite Bead at bottom of circle */}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
                </motion.div>

                {/* Main Circle Frame with Animated Rotating Electric Conic Gradient Bezel */}
                <motion.div
                  whileHover={{ scale: 1.025 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="relative z-10 rounded-full p-[3px] overflow-hidden [transform:translateZ(0)] [mask-image:-webkit-radial-gradient(white,black)] shadow-[0_20px_50px_rgba(0,0,0,0.65)] group"
                >
                  {/* Rotating Conic Gradient Beam - Perfectly circular & matching size with zero corner bleed */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#6366f1_0%,#a855f7_32%,#06b6d4_68%,#6366f1_100%)] opacity-90 group-hover:opacity-100 transition-opacity"
                  />

                  {/* Inner Dark Card Bevel & Portrait Image */}
                  <div className="relative rounded-full overflow-hidden bg-[#0c101a] p-1">
                    <img
                      src={`${import.meta.env.BASE_URL}profile.jpg`}
                      alt="Dulaksha Wijesinghe"
                      draggable={false}
                      className="
                        h-64 w-64
                        sm:h-72 sm:w-72
                        md:h-[360px] md:w-[360px]
                        lg:h-[390px] lg:w-[390px]
                        rounded-full
                        object-cover
                        transition-transform duration-700 ease-out
                        group-hover:scale-105
                      "
                    />

                    {/* Subtle top glass vignette overlay */}
                    <div className="pointer-events-none absolute inset-1 rounded-full bg-gradient-to-t from-[#0b0f19]/35 via-transparent to-white/10" />
                  </div>
                </motion.div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Modern Scroll Indicator */}
      <motion.a
        href="#projects"
        aria-label="Scroll to projects"
        className="absolute bottom-4 left-1/2 hidden h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-slate-700 bg-[#121828] text-slate-200 backdrop-blur-md transition-colors hover:border-indigo-400 hover:text-white sm:inline-flex shadow-sm"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.15, y: -2 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 350, damping: 20 }}
      >
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="h-5 w-5 text-indigo-300" />
        </motion.span>
      </motion.a>
    </section>
  );
}
