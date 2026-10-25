// src/components/Navbar.jsx
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Home,
  Briefcase,
  Sparkles,
  GraduationCap,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home", desc: "Overview & Intro", icon: Home },
  { name: "Projects", href: "#projects", desc: "Featured Works & AI", icon: Briefcase },
  { name: "Skills", href: "#skills", desc: "Mastery & Tech Stack", icon: Sparkles },
  { name: "Timeline", href: "#timeline", desc: "Education & Career", icon: GraduationCap },
  { name: "Contact", href: "#contact", desc: "Get In Touch", icon: Mail },
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
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative text-white/60 hover:text-white transition duration-300 group"
              >
                {item.name}
                <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Mobile hamburger button with animated transition */}
          <button
            type="button"
            className="md:hidden relative inline-flex items-center justify-center h-11 w-11 rounded-2xl border border-white/10 bg-white/5 text-white/80 hover:text-white hover:border-white/20 active:scale-95 transition backdrop-blur-md"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Modern Mobile Overlay Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.button
              className="absolute inset-0 bg-black/65 backdrop-blur-md"
              onClick={close}
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modern Drawer Sheet */}
            <motion.aside
              className="absolute right-0 top-0 h-full w-full sm:w-[380px] max-w-[90vw] flex flex-col border-l border-white/10 bg-[#070810]/95 backdrop-blur-2xl shadow-2xl overflow-hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
            >
              {/* Ambient gradient glow inside the drawer */}
              <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
                <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
                <div className="absolute top-1/2 -left-20 h-48 w-48 rounded-full bg-fuchsia-500/15 blur-3xl" />
                <div className="absolute -bottom-20 right-0 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl" />
              </div>

              {/* Drawer Top Header: Clean close button */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
                  Menu
                </span>
                <button
                  onClick={close}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-white/10 bg-white/5 text-white/70 hover:text-white hover:border-white/20 active:scale-95 transition"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Interactive Navigation Cards */}
              <div className="flex-1 overflow-y-auto px-5 py-6 space-y-3">
                {navLinks.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={close}
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: 0.05 * i }}
                      className="group relative flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 transition duration-200 hover:border-indigo-400/40 hover:bg-white/[0.07] active:scale-[0.98]"
                    >
                      {/* Neon gradient sweep on hover */}
                      <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent" />

                      <div className="relative flex items-center gap-3.5 min-w-0">
                        {/* Icon Container matching Skills & Timeline style */}
                        <div className="grid h-11 w-11 shrink-0 aspect-square place-items-center rounded-xl border border-white/10 bg-black/40 text-indigo-300 transition duration-200 group-hover:border-indigo-400/40 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(99,102,241,0.30)]">
                          <Icon className="h-5 w-5 shrink-0" />
                        </div>

                        <div className="min-w-0">
                          <span className="text-base font-semibold text-white tracking-wide block">
                            {item.name}
                          </span>
                          <p className="text-xs text-white/50 truncate mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      <ArrowUpRight className="relative h-4 w-4 shrink-0 text-white/35 transition duration-200 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
