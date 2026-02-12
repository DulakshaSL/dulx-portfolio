import { FadeUp } from "../components/Motion";
import { profile } from "../data/profile";

export default function Contact() {
  return (
    <section id="contact" className="px-5 md:px-10 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <FadeUp>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 md:p-10 backdrop-blur shadow-glow">
            <h2 className="text-3xl md:text-5xl font-semibold text-white">Let’s build something</h2>
            <p className="mt-3 text-white/60 max-w-2xl">
              Open for internships / junior roles and freelance builds.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="rounded-2xl bg-white text-black px-5 py-3 text-sm font-medium hover:opacity-90 transition"
              >
                Email Me
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/80 hover:text-white hover:border-white/20 transition"
              >
                GitHub
              </a>
            </div>

            <div className="mt-6 text-sm text-white/55">
              {profile.phone} • {profile.location}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
