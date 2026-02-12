import { FadeUp } from "../components/Motion";
import { profile } from "../data/profile";
import { ArrowDownRight, Github } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="home" className="px-5 md:px-10 pt-16 md:pt-24 pb-16">
      <div className="mx-auto max-w-7xl grid md:grid-cols-2 items-center gap-12">

        {/* LEFT CONTENT */}
        <FadeUp>
          <div>
         
            <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight text-white leading-tight">
              {profile.name}
            </h1>

            <p className="mt-5 max-w-xl text-white/60 leading-relaxed">
              {profile.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-2xl bg-white text-black px-5 py-3 text-sm font-medium hover:opacity-90 transition"
              >
                View Projects <ArrowDownRight className="h-4 w-4" />
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/80 hover:text-white hover:border-white/20 transition"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            </div>

            <div className="mt-6 text-sm text-white/55">
              {profile.location} • {profile.email}
            </div>
          </div>
        </FadeUp>

        {/* RIGHT PHOTO SECTION */}
        <FadeUp>
          <div className="relative flex justify-center md:justify-end">

            {/* Glow background */}
            <div className="absolute -z-10 h-72 w-72 md:h-96 md:w-96 rounded-full bg-indigo-500/20 blur-3xl"></div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative"
            >
              <img
                src="/profile.jpeg"
                alt="Profile"
                className="h-64 w-64 md:h-100 md:w-100 object-cover rounded-full border border-white/20 shadow-2xl"
              />

              {/* Outer ring glow */}
              <div className="absolute inset-0 rounded-full border border-white/10 ring-1 ring-indigo-400/30"></div>
            </motion.div>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
