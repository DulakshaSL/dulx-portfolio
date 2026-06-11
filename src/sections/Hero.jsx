// src/sections/Hero.jsx
import { FadeUp } from "../components/Motion";
import { profile } from "../data/profile";
import { ArrowDownRight, Github, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden px-5 pt-6 pb-14 md:px-10 md:pt-24 md:pb-20"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
        {/* TEXT */}
        <div className="order-2 md:order-1">
          <FadeUp>
            <div className="text-center md:text-left">
              <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-6xl">
                {profile.name}
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base md:mx-0">
                {profile.summary}
              </p>

              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row md:items-start md:justify-start">
<a
    href="#projects"
    className="
      group relative inline-flex w-full items-center justify-center gap-2
      rounded-2xl border border-white/10 bg-white/5 px-5 py-3
      text-sm font-medium text-white/80 backdrop-blur-md
      transition duration-300
      hover:border-violet-400/40 hover:text-white
      active:scale-[0.98]
      sm:w-auto overflow-hidden
    "
  >
    {/* neon glow */}
    <span
      className="
        absolute inset-0 -z-10 opacity-0 transition duration-500
        group-hover:opacity-100
        bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.45),transparent_70%)]
        blur-2xl
      "
    />

    {/* neon sweep */}
    <span
      className="
        absolute inset-0 -z-10 translate-x-[-130%]
        bg-gradient-to-r from-transparent via-violet-400/20 to-transparent
        group-hover:translate-x-[130%]
        transition-transform duration-700 ease-out
      "
    />

    View Projects
    <ArrowDownRight className="h-4 w-4" />
  </a>

  {/* GitHub (Neon Cyan) */}
  <a
    href={profile.github}
    target="_blank"
    rel="noreferrer"
    className="
      group relative inline-flex w-full items-center justify-center gap-2
      rounded-2xl border border-white/10 bg-white/5 px-5 py-3
      text-sm font-medium text-white/80 backdrop-blur-md
      transition duration-300
      hover:border-cyan-400/40 hover:text-white
      active:scale-[0.98]
      sm:w-auto overflow-hidden
    "
  >
    {/* neon glow */}
    <span
      className="
        absolute inset-0 -z-10 opacity-0 transition duration-500
        group-hover:opacity-100
        bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.40),transparent_70%)]
        blur-2xl
      "
    />

    {/* neon sweep */}
    <span
      className="
        absolute inset-0 -z-10 translate-x-[-130%]
        bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent
        group-hover:translate-x-[130%]
        transition-transform duration-700 ease-out
      "
    />

    <Github className="h-4 w-4" />
    GitHub
  </a>

              </div>

              <div className="mt-5 text-xs text-white/55 sm:text-sm">
                {profile.location} • {profile.email}
              </div>
            </div>
          </FadeUp>
        </div>

     {/* PHOTO */}
<div className="order-1 md:order-2">
  <FadeUp>
    <div className="relative flex justify-center md:justify-end">
      {/* ambient background glow */}
      <div className="pointer-events-none absolute -z-20 h-72 w-72 rounded-full bg-indigo-500/25 blur-3xl sm:h-80 sm:w-80 md:h-[520px] md:w-[520px]" />

      <motion.div
        className="relative flex items-center justify-center"
        whileHover={{ scale: 1.02 }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 18,
        }}
      >
        {/* animated neon ring */}
        <motion.div
          className="absolute inset-[-14px] rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* spinning gradient */}
          <div
            className="
              absolute inset-0 rounded-full
              bg-[conic-gradient(from_0deg,transparent_0deg,#8b5cf6_70deg,#06b6d4_140deg,#d946ef_220deg,transparent_320deg)]
              blur-md
              opacity-90
            "
          />

          {/* mask center */}
          <div className="absolute inset-[6px] rounded-full bg-[#070810]" />
        </motion.div>

        {/* image */}
        <img
          src={`${import.meta.env.BASE_URL}profile.jpeg`}
          alt="Profile"
          draggable={false}
          className="
            relative z-10
            h-60 w-60
            sm:h-64 sm:w-64
            md:h-[420px] md:w-[420px]
            rounded-full
            object-cover
            shadow-2xl
          "
        />

        {/* glossy overlay */}
        <div className="pointer-events-none absolute inset-0 z-20 rounded-full bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50" />
      </motion.div>
    </div>
  </FadeUp>
</div>
      </div>

      {/* scroll indicator */}
      <motion.a
        href="#projects"
        aria-label="Scroll to projects"
        className="absolute bottom-5 left-1/2 hidden h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 backdrop-blur transition hover:border-white/20 hover:text-white sm:inline-flex"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.a>
    </section>
  );
}