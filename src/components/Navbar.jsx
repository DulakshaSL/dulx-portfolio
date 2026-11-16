// src/components/Navbar.jsx
import { useEffect, useState } from "react";
import {
  X,
  Home,
  Briefcase,
  Sparkles,
  GraduationCap,
  Mail,
  ArrowUpRight,
  Code2,
  MessageSquare,
  PhoneCall,
  Layers,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home", id: "home", desc: "Overview & Intro", icon: Home },
  { name: "Projects", href: "#projects", id: "projects", desc: "Featured Works & AI", icon: Briefcase },
  { name: "Services", href: "#services", id: "services", desc: "Solutions & Offerings", icon: Layers },
  { name: "Skills", href: "#skills", id: "skills", desc: "Mastery & Tech Stack", icon: Sparkles },
  { name: "Timeline", href: "#timeline", id: "timeline", desc: "Education & Career", icon: GraduationCap },
  { name: "Contact", href: "#contact", id: "contact", desc: "Get In Touch", icon: Mail },
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
};

const drawerVariants = {
  hidden: {
    x: "100%",
    boxShadow: "0 0 0 rgba(0,0,0,0)",
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 240,
      mass: 0.85,
    },
  },
  visible: {
    x: "0%",
    boxShadow: "-16px 0 60px rgba(0,0,0,0.85)",
    transition: {
      type: "spring",
      damping: 28,
      stiffness: 220,
      mass: 0.85,
      staggerChildren: 0.035,
    },
  },
  exit: {
    x: "100%",
    boxShadow: "0 0 0 rgba(0,0,0,0)",
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 260,
      mass: 0.85,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: 18,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 24,
      stiffness: 220,
      mass: 0.7,
    },
  },
  exit: {
    opacity: 0,
    x: 12,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Monitor scroll for shadow, blur & active section spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionIds = ["home", "projects", "services", "skills", "timeline", "contact"];
      const scrollPos = window.scrollY + 140;

      // When near bottom of page, activate contact
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        setActiveSection("contact");
        return;
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-800 bg-[#0b0f19]/95 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            : "border-b border-slate-800/60 bg-[#0b0f19]/80 backdrop-blur-xl"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* Logo with Creative Monogram Accent */}
          <a
            href="#home"
            className="group flex items-center gap-2.5 text-lg font-semibold tracking-wide text-white transition select-none"
            onClick={close}
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[#141b2d] border border-slate-700 group-hover:border-indigo-400 transition-all duration-300 shadow-sm">
              <Code2 className="h-4 w-4 text-indigo-400 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            </div>
            <div className="font-display">
              <span className="text-white font-bold tracking-tight">Dulaksha</span>
              <span className="text-indigo-400 font-semibold ml-1">.dev</span>
            </div>
          </a>

          {/* Desktop nav with active section mark (no dot) */}
          <nav className="hidden md:flex items-center gap-1.5 p-1.5 rounded-2xl border border-slate-800/80 bg-[#101626]/80 backdrop-blur-md shadow-sm">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 select-none ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>

                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-xl bg-[#1a233a] border border-slate-700/80 shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Let's Talk button linked to WhatsApp with calling attention animation */}
          <div className="hidden md:flex items-center">
            <motion.a
              href="https://wa.me/94722061858"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="group relative inline-flex items-center gap-2 rounded-xl border border-indigo-500/40 bg-[#131a2d] px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-indigo-400 hover:bg-[#1a233d] hover:shadow-[0_0_22px_rgba(99,102,241,0.3)] shadow-sm cursor-pointer"
            >
              {/* Calling vibration attention animation */}
              <motion.span
                animate={{
                  rotate: [0, -18, 18, -14, 14, -8, 8, 0],
                  scale: [1, 1.15, 1.15, 1.15, 1.15, 1.08, 1.08, 1],
                }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  repeatDelay: 2.2,
                  ease: "easeInOut",
                }}
                className="text-emerald-400 inline-flex items-center"
              >
                <PhoneCall className="h-3.5 w-3.5" />
              </motion.span>

              <span>Let's Talk</span>

              <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 transition-transform duration-300 group-hover:text-indigo-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          </div>

          {/* Mobile hamburger button */}
          <motion.button
            type="button"
            className="md:hidden relative inline-flex items-center justify-center h-11 w-11 rounded-2xl border border-slate-700 bg-[#141b2d] text-slate-200 hover:text-white hover:border-indigo-400 active:scale-95 transition-colors backdrop-blur-md overflow-hidden group cursor-pointer shadow-sm"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
          >
            <div className="relative w-5 h-4 flex flex-col justify-between items-center">
              <motion.span
                animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="w-5 h-[2px] bg-white rounded-full origin-center"
              />
              <motion.span
                animate={open ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className="w-3.5 h-[2px] bg-indigo-300 rounded-full self-start"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="w-5 h-[2px] bg-white rounded-full origin-center"
              />
            </div>
          </motion.button>
        </div>
      </header>

      {/* Modern Mobile Overlay Drawer (NO bubbles) */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] md:hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Backdrop */}
            <motion.button
              variants={backdropVariants}
              className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-default"
              onClick={close}
              aria-label="Close menu"
            />

            {/* Drawer Sheet */}
            <motion.aside
              variants={drawerVariants}
              drag="x"
              dragConstraints={{ left: 0, right: 300 }}
              dragElastic={{ left: 0.05, right: 0.5 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > 80 || info.velocity.x > 300) {
                  close();
                }
              }}
              className="absolute right-0 top-0 h-full w-full sm:w-[380px] max-w-[90vw] flex flex-col border-l border-slate-700 bg-[#0d1220] backdrop-blur-2xl overflow-hidden touch-pan-y"
            >
              {/* Subtle drag hint indicator pill on mobile */}
              <div className="absolute left-2 top-1/2 -translate-y-1/2 h-12 w-1 rounded-full bg-white/20 pointer-events-none sm:hidden" />

              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
                <span className="text-sm font-semibold tracking-wide text-white font-display">
                  Menu
                </span>
                <motion.button
                  onClick={close}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-slate-700 bg-[#141b2d] text-slate-300 hover:text-white hover:border-slate-500 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Interactive Staggered Navigation Cards */}
              <div className="flex-1 overflow-y-auto px-5 py-6 space-y-3">
                {navLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={close}
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.02,
                        x: 4,
                        transition: { type: "spring", stiffness: 350, damping: 22 },
                      }}
                      whileTap={{
                        scale: 0.97,
                        transition: { type: "spring", stiffness: 350, damping: 22 },
                      }}
                      className={`group relative flex items-center justify-between rounded-2xl border p-3.5 transition-all duration-200 shadow-sm ${
                        isActive
                          ? "border-indigo-400/80 bg-[#172138] shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                          : "border-slate-700 bg-[#131927] hover:border-indigo-400 hover:bg-[#1a233a]"
                      }`}
                    >
                      <div className="relative flex items-center gap-3.5 min-w-0">
                        {/* Icon Container */}
                        <div
                          className={`grid h-11 w-11 shrink-0 aspect-square place-items-center rounded-xl border transition-all duration-300 shadow-sm ${
                            isActive
                              ? "border-indigo-400 bg-indigo-500/20 text-white"
                              : "border-slate-700 bg-[#0e1424] text-indigo-300 group-hover:scale-105 group-hover:border-indigo-400 group-hover:text-white"
                          }`}
                        >
                          <Icon className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:rotate-6" />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-base font-semibold text-white tracking-wide block transition-colors duration-200 font-display">
                              {item.name}
                            </span>
                            {isActive && (
                              <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded-full border border-cyan-500/30">
                                Active
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-300 truncate mt-0.5 transition-colors duration-200">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      <ArrowUpRight className={`relative h-4 w-4 shrink-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110 ${
                        isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-indigo-300"
                      }`} />
                    </motion.a>
                  );
                })}
              </div>

              {/* Drawer Footer CTA: Let's Talk on WhatsApp */}
              <div className="p-5 border-t border-slate-800 bg-[#0b0f19]">
                <a
                  href="https://wa.me/94722061858"
                  target="_blank"
                  rel="noreferrer"
                  onClick={close}
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#4f46e5] to-[#4338ca] border border-indigo-400/40 shadow-[0_4px_20px_rgba(79,70,229,0.35)] hover:shadow-[0_6px_28px_rgba(79,70,229,0.55)] transition-all"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Let's Talk on WhatsApp</span>
                </a>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
