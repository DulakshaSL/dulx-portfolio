// src/sections/Hero.jsx
import { FadeUp } from "../components/Motion";
import { profile } from "../data/profile";
import { ArrowDownRight, Github, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative px-5 md:px-10 pt-6 md:pt-24 pb-14 md:pb-20"
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-12">
        {/* ✅ TEXT (desktop left) | (mobile second) */}
        <div className="order-2 md:order-1">
          <FadeUp>
            <div className="text-center md:text-left">
              <h1 className="mt-2 text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight text-white leading-tight">
                {profile.name}
              </h1>

              <p className="mt-4 max-w-xl mx-auto md:mx-0 text-white/60 leading-relaxed text-sm sm:text-base">
                {profile.summary}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-3">
                <a
                  href="#projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-black px-5 py-3 text-sm font-medium hover:opacity-90 transition"
                >
                  View Projects <ArrowDownRight className="h-4 w-4" />
                </a>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/80 hover:text-white hover:border-white/20 transition"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </div>

              <div className="mt-5 text-xs sm:text-sm text-white/55">
                {profile.location} • {profile.email}
              </div>
            </div>
          </FadeUp>
        </div>

        {/* ✅ PHOTO (desktop right) | (mobile first) */}
        <div className="order-1 md:order-2">
          <FadeUp>
            <div className="relative flex justify-center md:justify-end">
              <div className="pointer-events-none absolute -z-10 h-60 w-60 sm:h-72 sm:w-72 md:h-96 md:w-96 rounded-full bg-indigo-500/20 blur-3xl" />

              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}profile.jpeg`}
                  alt="Profile"
                  className="h-48 w-48 sm:h-56 sm:w-56 md:h-80 md:w-80 object-cover rounded-full border border-white/20 shadow-2xl"
                  draggable={false}
                />

                <div className="pointer-events-none absolute inset-0 rounded-full border border-white/10 ring-1 ring-indigo-400/30" />
                <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent opacity-40" />
              </motion.div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Animated scroll indicator (keeps desktop clean, shows from sm+) */}
      <motion.a
        href="#projects"
        aria-label="Scroll to projects"
        className="absolute left-1/2 bottom-5 -translate-x-1/2 hidden sm:inline-flex items-center justify-center h-11 w-11 rounded-full border border-white/10 bg-white/5 backdrop-blur text-white/75 hover:text-white hover:border-white/20 transition"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.a>
    </section>
  );
}
