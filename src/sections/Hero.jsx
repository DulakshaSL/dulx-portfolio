import { FadeUp } from "../components/Motion";
import { profile } from "../data/profile";
import { ArrowDownRight, Github } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const profileSrc = `${import.meta.env.BASE_URL}profile.jpeg`;

  return (
    <section id="home" className="px-5 md:px-10 pt-14 md:pt-24 pb-14 md:pb-20">
      <div className="mx-auto max-w-7xl grid gap-10 md:gap-12 md:grid-cols-2 items-center">
        {/* RIGHT PHOTO (shows first on mobile) */}
        <FadeUp>
          <div className="relative order-1 md:order-2 flex justify-center md:justify-end">
            {/* Glow background */}
            <div className="pointer-events-none absolute -z-10 h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96 rounded-full bg-indigo-500/20 blur-3xl" />

            <motion.div
              className="relative"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 180, damping: 16 }}
            >
              <img
                src={profileSrc}
                alt="Profile"
                className="
                  h-52 w-52
                  sm:h-64 sm:w-64
                  md:h-80 md:w-80
                  object-cover rounded-full
                  border border-white/20 shadow-2xl
                "
                draggable={false}
              />

              {/* Outer ring glow */}
              <div className="pointer-events-none absolute inset-0 rounded-full border border-white/10 ring-1 ring-indigo-400/30" />

              {/* subtle highlight */}
              <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent opacity-40" />
            </motion.div>
          </div>
        </FadeUp>

        {/* LEFT CONTENT */}
        <FadeUp>
          <div className="order-2 md:order-1 text-center md:text-left">
            <h1 className="mt-2 text-4xl md:text-6xl font-semibold tracking-tight text-white leading-tight">
              {profile.name}
            </h1>

            <p className="mt-4 md:mt-5 max-w-xl mx-auto md:mx-0 text-white/60 leading-relaxed">
              {profile.summary}
            </p>

            {/* Buttons */}
            <div className="mt-7 md:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:flex md:flex-wrap md:gap-3">
              <a
                href="#projects"
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-2xl bg-white text-black
                  px-5 py-3 text-sm font-medium
                  hover:opacity-90 transition
                "
              >
                View Projects <ArrowDownRight className="h-4 w-4" />
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-2xl border border-white/10 bg-white/5
                  px-5 py-3 text-sm text-white/80
                  hover:text-white hover:border-white/20 transition
                "
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            </div>

            <div className="mt-5 md:mt-6 text-sm text-white/55">
              {profile.location} • {profile.email}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
