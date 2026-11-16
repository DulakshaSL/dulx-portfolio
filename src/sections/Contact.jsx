// src/sections/Contact.jsx
import { useState } from "react";
import { FadeUp } from "../components/Motion";
import { profile } from "../data/profile";
import { motion } from "framer-motion";
import { Mail, Github, MapPin, Phone, Copy, Check, Send } from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative px-5 md:px-10 py-16 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-5xl">
        <FadeUp>
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="card-surface cursor-default select-none relative overflow-hidden rounded-3xl border border-slate-700/80 bg-gradient-to-b from-[#141b2d] to-[#0e1424] p-8 sm:p-12 md:p-16 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-colors duration-300 hover:border-indigo-400"
          >
            {/* Top delicate luminous gradient beam */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 via-cyan-400/40 to-transparent" />

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              {/* Main Headline */}
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Let's Build Something{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-200 to-cyan-300">
                  Remarkable
                </span>
              </h2>

              <p className="mt-4 text-base md:text-lg text-slate-200 leading-relaxed">
                Whether you have an ambitious product to launch, a full-stack role to fill, or need an end-to-end web system with applied AI &mdash; let's connect.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
                {/* Direct Email */}
                <motion.a
                  href={`mailto:${profile.email}`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 380, damping: 20 }}
                  className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#4f46e5] to-[#4338ca] border border-indigo-400/40 px-7 py-3.5 text-base font-semibold text-white shadow-[0_4px_20px_rgba(79,70,229,0.35)] hover:shadow-[0_6px_28px_rgba(79,70,229,0.55)] hover:border-indigo-300 transition-all cursor-pointer"
                >
                  <Send className="h-4 w-4 text-indigo-200 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span>Email Me Directly</span>
                </motion.a>

                {/* Copy Email Button */}
                <motion.button
                  type="button"
                  onClick={handleCopyEmail}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 380, damping: 20 }}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-[#161f33] px-6 py-3.5 text-base font-semibold text-slate-100 backdrop-blur-xl transition-all hover:border-indigo-400 hover:bg-[#1d2944] hover:text-white cursor-pointer shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span className="text-emerald-300 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-slate-400" />
                      <span>Copy Address</span>
                    </>
                  )}
                </motion.button>

                {/* GitHub */}
                <motion.a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 380, damping: 20 }}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-[#161f33] px-6 py-3.5 text-base font-semibold text-slate-100 backdrop-blur-xl transition-all hover:border-cyan-400 hover:bg-[#1d2944] hover:text-white cursor-pointer shadow-sm"
                >
                  <Github className="h-4 w-4 text-slate-300" />
                  <span>GitHub</span>
                </motion.a>
              </div>

              {/* Contact Information Chips */}
              <div className="mt-10 pt-8 border-t border-slate-700/70 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="rounded-2xl border border-slate-700/70 bg-[#0e1424] p-4 flex flex-col items-center justify-center shadow-sm">
                  <Mail className="h-5 w-5 text-indigo-400 mb-1.5" />
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Email</span>
                  <span className="text-sm text-slate-200 font-medium mt-0.5 truncate max-w-full">
                    {profile.email}
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-700/70 bg-[#0e1424] p-4 flex flex-col items-center justify-center shadow-sm">
                  <Phone className="h-5 w-5 text-cyan-400 mb-1.5" />
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Phone</span>
                  <span className="text-sm text-slate-200 font-medium mt-0.5">
                    {profile.phone}
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-700/70 bg-[#0e1424] p-4 flex flex-col items-center justify-center shadow-sm">
                  <MapPin className="h-5 w-5 text-purple-400 mb-1.5" />
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Location</span>
                  <span className="text-sm text-slate-200 font-medium mt-0.5">
                    {profile.location}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </FadeUp>
      </div>
    </section>
  );
}
