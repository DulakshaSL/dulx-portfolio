// src/components/Navbar.jsx
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  ["Home", "#home"],
  ["Projects", "#projects"],
  ["Skills", "#skills"],
  ["Timeline", "#timeline"],
  ["Contact", "#contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Close on desktop resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <div className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <a
            href="#home"
            className="text-lg font-semibold tracking-wide text-white transition"
            onClick={close}
          >
            <span className="text-white/50">Dulx</span>
            <span className="text-white">Portfolio</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
            {links.map(([t, href]) => (
              <a
                key={t}
                href={href}
                className="relative text-white/60 hover:text-white transition duration-300 group"
              >
                {t}
                <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center h-11 w-11 rounded-2xl border border-white/10 bg-white/5 text-white/80 hover:text-white hover:border-white/20 transition"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* ✅ Mobile overlay drawer (does NOT push content) */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <button
              className="absolute inset-0 bg-black/55 backdrop-blur-sm"
              onClick={close}
              aria-label="Close menu"
            />

            {/* Drawer */}
            <motion.aside
              className="absolute right-0 top-0 h-full w-[84%] max-w-sm border-l border-white/10 bg-[#070810]/80 backdrop-blur-xl shadow-2xl"
              initial={{ x: 320, opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 320, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
                <div className="text-base font-semibold text-white">
                  <span className="text-white/50">Dulx</span>
                  <span className="text-white">Portfolio</span>
                </div>

                <button
                  onClick={close}
                  className="inline-flex items-center justify-center h-11 w-11 rounded-2xl border border-white/10 bg-white/5 text-white/80 hover:text-white hover:border-white/20 transition"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Links */}
              <div className="p-4">
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-2">
                  {links.map(([t, href], i) => (
                    <motion.a
                      key={t}
                      href={href}
                      onClick={close}
                      className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-white/75 hover:text-white hover:bg-white/5 transition"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: 0.05 * i }}
                    >
                      <span>{t}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-400 opacity-70" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
