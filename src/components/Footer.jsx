// src/components/Footer.jsx
import { ArrowUp, Github, Mail, Code2 } from "lucide-react";
import { profile } from "../data/profile";
import { motion } from "framer-motion";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-slate-800 bg-[#080c14]/95 px-5 md:px-10 py-10 overflow-hidden">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand & Status */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <a
            href="#home"
            className="flex items-center gap-2 text-base font-semibold text-white group"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Code2 className="h-4 w-4" />
            </div>
            <span className="font-display font-bold">Dulaksha<span className="text-indigo-400">.dev</span></span>
          </a>

          <span className="hidden sm:inline text-white/20">&bull;</span>

          <p className="text-xs sm:text-sm text-slate-300">
            &copy; {new Date().getFullYear()} Dulaksha Wijesinghe. All rights reserved.
          </p>
        </div>

        {/* Right: Socials & Back to Top */}
        <div className="flex items-center gap-3">
          <motion.a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700 bg-[#141b2d] text-slate-200 hover:text-white hover:border-slate-500 transition-colors cursor-pointer"
            aria-label="GitHub Profile"
          >
            <Github className="h-4 w-4" />
          </motion.a>

          <motion.a
            href={`mailto:${profile.email}`}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700 bg-[#141b2d] text-slate-200 hover:text-white hover:border-slate-500 transition-colors cursor-pointer"
            aria-label="Email Me"
          >
            <Mail className="h-4 w-4" />
          </motion.a>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-500/40 bg-indigo-500/20 text-indigo-200 hover:text-white hover:border-indigo-400 hover:bg-indigo-500/30 transition-colors cursor-pointer shadow-sm"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
