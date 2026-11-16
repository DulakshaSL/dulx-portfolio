// src/sections/Services.jsx
import { useState, useRef, useEffect } from "react";
import { services } from "../data/services";
import { FadeUp } from "../components/Motion";
import { motion, AnimatePresence } from "framer-motion";
import ContentSamplesModal from "../components/ContentSamplesModal";
import {
  GraduationCap,
  PenTool,
  Globe,
  Laptop,
  CheckCircle2,
  ArrowUpRight,
  MessageSquare,
  Sparkles,
  BookOpen,
  Play,
  Film,
} from "lucide-react";

const iconMap = {
  GraduationCap,
  PenTool,
  Globe,
  Laptop,
};

export default function Services() {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(1);
  const [samplesModalOpen, setSamplesModalOpen] = useState(false);

  const totalServices = services.length;
  const currentService = services[activeTab];
  const CurrentIcon = iconMap[currentService.iconName] || Sparkles;

  const prevService = () => {
    setDirection(-1);
    setActiveTab((prev) => (prev - 1 + totalServices) % totalServices);
  };

  const nextService = () => {
    setDirection(1);
    setActiveTab((prev) => (prev + 1) % totalServices);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === "ArrowLeft") prevService();
      if (e.key === "ArrowRight") nextService();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalServices]);

  // Touch swipe handling for mobile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      nextService();
    } else if (diff < -50) {
      prevService();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Framer Motion slide variants
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.99,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 240, damping: 26, mass: 0.8 },
        opacity: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      scale: 0.99,
      transition: {
        x: { type: "spring", stiffness: 240, damping: 26, mass: 0.8 },
        opacity: { duration: 0.22, ease: "easeIn" },
        scale: { duration: 0.22, ease: "easeIn" },
      },
    }),
  };

  return (
    <section id="services" className="relative px-5 md:px-10 py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl overflow-visible">
        {/* Section Header */}
        <FadeUp>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Services &amp; Solutions
            </h2>
            <p className="mt-3 text-slate-300 text-base leading-relaxed">
              Specialized technical writing, high-impact content, and production-grade full-stack web engineering delivered to standard.
            </p>
          </div>
        </FadeUp>

        {/* Interactive Service Switcher Tabs - Centered & Matching Style */}
        <FadeUp delay={0.05}>
          {/* DESKTOP TABS: Centered & Spacious */}
          <div className="mb-8 hidden md:flex justify-center">
            <div className="flex gap-2 p-1.5 rounded-2xl border border-slate-800/80 bg-[#101626]/80 backdrop-blur-md shadow-sm max-w-full">
              {services.map((item, index) => {
                const TabIcon = iconMap[item.iconName] || Sparkles;
                const isSelected = activeTab === index;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setDirection(index > activeTab ? 1 : -1);
                      setActiveTab(index);
                    }}
                    className={`relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 select-none cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? "text-white"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <TabIcon
                        className={`h-4 w-4 transition-colors ${
                          isSelected ? "text-indigo-400" : "text-slate-500"
                        }`}
                      />
                      <span>{item.shortName}</span>
                    </span>

                    {isSelected && (
                      <motion.div
                        layoutId="activeServiceTabDesktop"
                        className="absolute inset-0 rounded-xl bg-[#1a233a] border border-slate-700/80 shadow-sm"
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* MOBILE TABS: Clean 3-col segmented bar fitting 100% of phone screen without overflow */}
          <div className="mb-6 flex md:hidden px-1">
            <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl border border-slate-800/90 bg-[#101626]/95 backdrop-blur-md shadow-sm w-full">
              {services.map((item, index) => {
                const TabIcon = iconMap[item.iconName] || Sparkles;
                const isSelected = activeTab === index;
                // Compact mobile labels to fit screen cleanly
                const mobileLabel =
                  index === 0 ? "Web Apps" : index === 1 ? "Academic" : "Content";

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setDirection(index > activeTab ? 1 : -1);
                      setActiveTab(index);
                    }}
                    className={`relative flex items-center justify-center gap-1.5 py-2.5 px-1.5 rounded-xl text-xs font-semibold transition-all duration-200 select-none cursor-pointer text-center ${
                      isSelected
                        ? "text-white font-bold"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-1.5 truncate">
                      <TabIcon
                        className={`h-3.5 w-3.5 shrink-0 transition-colors ${
                          isSelected ? "text-indigo-400" : "text-slate-500"
                        }`}
                      />
                      <span className="truncate">{mobileLabel}</span>
                    </span>

                    {isSelected && (
                      <motion.div
                        layoutId="activeServiceTabMobile"
                        className="absolute inset-0 rounded-xl bg-[#1a233a] border border-slate-700/80 shadow-sm"
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </FadeUp>

        {/* 2-Column Split Showcase Card: Left Image | Right Details */}
        <FadeUp delay={0.1}>
          <div
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              <motion.div
                key={activeTab}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="card-surface relative overflow-hidden rounded-3xl border border-slate-700/80 bg-[#131927] p-5 sm:p-7 md:p-8 lg:p-10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] cursor-default select-none touch-pan-y"
              >
                {/* Top Subtle Hairline Gradient Beam */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent opacity-80" />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-stretch">
                  {/* LEFT COLUMN: Dedicated Service Visual / Custom Portrait Image (Compact on mobile, full height on desktop) */}
                  <div className="md:col-span-5 lg:col-span-5 flex flex-col">
                    <div className="relative w-full h-44 sm:h-52 md:h-full md:min-h-full overflow-hidden rounded-2xl select-none">
                      {currentService.image ? (
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.img
                            key={`${currentService.id}-image`}
                            src={`${import.meta.env.BASE_URL}${currentService.image.replace(/^\/+/, "")}`}
                            alt={currentService.title}
                            className="h-full w-full object-cover rounded-2xl shadow-lg"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.01 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            draggable={false}
                          />
                        </AnimatePresence>
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm text-slate-500 bg-[#0c111e] rounded-2xl">
                          No preview image available
                        </div>
                      )}
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Service Details, Deliverables & Scope, & Action CTA */}
                  <div className="md:col-span-7 lg:col-span-7 flex flex-col justify-start">
                    <div>
                      {/* Service Title */}
                      <h3 className="font-display text-2xl lg:text-3xl font-bold text-white tracking-tight">
                        {currentService.title}
                      </h3>

                      {/* Full-Width Legible Description */}
                      <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-300">
                        {currentService.description}
                      </p>

                      {/* Key Deliverables & Scope Checklist */}
                      <div className="mt-6 space-y-3">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-display">
                          Key Deliverables &amp; Scope
                        </h4>

                        <div className="space-y-2">
                          {currentService.deliverables.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-3 rounded-xl border border-slate-700/60 bg-[#0e1424]/80 p-2.5 hover:border-slate-600 transition-colors"
                            >
                              <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                              </div>
                              <p className="text-xs sm:text-sm leading-relaxed text-slate-200">
                                {item}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action CTA Buttons - tightly coupled below deliverables with no excess whitespace */}
                    <div className="mt-6 pt-5 border-t border-slate-700/60 flex flex-wrap items-center gap-3">
                      {/* Prominent "See Samples" Button for Content Creation */}
                      {currentService.videoSamples && currentService.videoSamples.length > 0 && (
                        <motion.button
                          type="button"
                          onClick={() => setSamplesModalOpen(true)}
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.96 }}
                          transition={{ type: "spring", stiffness: 350, damping: 20 }}
                          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 border border-cyan-400/40 px-5 py-3 text-sm font-semibold text-white shadow-[0_4px_18px_rgba(6,182,212,0.35)] hover:shadow-[0_6px_26px_rgba(6,182,212,0.55)] transition-all cursor-pointer"
                        >
                          <Play className="h-4 w-4 fill-white" />
                          <span>See Samples</span>
                        </motion.button>
                      )}

                      <motion.a
                        href={`https://wa.me/94722061858?text=${encodeURIComponent(
                          currentService.whatsappMessage
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: "spring", stiffness: 350, damping: 20 }}
                        className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#4338ca] border border-indigo-400/40 px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(79,70,229,0.35)] hover:shadow-[0_6px_28px_rgba(79,70,229,0.55)] hover:border-indigo-300 transition-all cursor-pointer"
                      >
                        <MessageSquare className="h-4 w-4 text-indigo-200" />
                        <span>{currentService.ctaText}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-80" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </FadeUp>

        {/* Content Samples Video Player Modal */}
        <ContentSamplesModal
          open={samplesModalOpen}
          onClose={() => setSamplesModalOpen(false)}
          videos={currentService.videoSamples || []}
        />
      </div>
    </section>
  );
}
