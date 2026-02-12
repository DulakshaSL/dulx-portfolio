export default function Hero() {
  return (
    <section id="home" className="px-5 md:px-10 pt-14 md:pt-24 pb-12 md:pb-16">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-12">

        {/* LEFT CONTENT */}
        <FadeUp>
          <div className="text-center md:text-left">

            <h1 className="mt-4 text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight text-white leading-tight">
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

        {/* RIGHT PHOTO SECTION */}
        <FadeUp>
          <div className="relative flex justify-center md:justify-end mt-10 md:mt-0">

            {/* Glow */}
            <div className="absolute -z-10 h-60 w-60 sm:h-72 sm:w-72 md:h-96 md:w-96 rounded-full bg-indigo-500/20 blur-3xl"></div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative"
            >
              <img
                src={`${import.meta.env.BASE_URL}profile.jpeg`}
                alt="Profile"
                className="h-48 w-48 sm:h-56 sm:w-56 md:h-80 md:w-80 object-cover rounded-full border border-white/20 shadow-2xl"
              />

              <div className="absolute inset-0 rounded-full border border-white/10 ring-1 ring-indigo-400/30"></div>
            </motion.div>

          </div>
        </FadeUp>

      </div>
    </section>
  );
}
