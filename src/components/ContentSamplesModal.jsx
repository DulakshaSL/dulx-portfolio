// src/components/ContentSamplesModal.jsx
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";

export default function ContentSamplesModal({ open, onClose, videos = [] }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeVideo = videos[selectedIdx] || videos[0];

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Pause video when modal is closed
  useEffect(() => {
    if (!open && videoRef.current) {
      videoRef.current.pause();
    }
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && activeVideo && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-3 sm:p-5 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop (covers everything including sticky header) */}
          <motion.button
            type="button"
            className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-default border-0 p-0 m-0 w-full h-full"
            onClick={onClose}
            aria-label="Close modal overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Card with Video Player */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.85 }}
            className="relative my-auto flex flex-col w-full max-w-3xl max-h-[92vh] rounded-2xl sm:rounded-3xl border border-slate-700/80 bg-[#0f1422] shadow-[0_25px_70px_rgba(0,0,0,0.95)] backdrop-blur-2xl overflow-hidden select-none z-10"
          >
            {/* Top Subtle Cyan/Indigo Gradient Bezel */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 via-indigo-400/70 to-transparent" />

            {/* Modal Header: Title Name & Short Description on Top, Close (X) on Right */}
            <div className="border-b border-slate-800/90 px-5 sm:px-7 py-3.5 sm:py-4 bg-[#131929]/95 shrink-0">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg sm:text-2xl font-bold text-white tracking-tight leading-snug">
                    {activeVideo.title}
                  </h3>
                  {activeVideo.description && (
                    <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                      {activeVideo.description}
                    </p>
                  )}
                </div>

                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.08, rotate: 90 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-[#161f33] text-slate-300 hover:border-slate-500 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </div>

              {/* Video Switcher Tabs (when 2 or more videos are present) */}
              {videos.length > 1 && (
                <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-800/80">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold font-display mr-1">
                    Select Sample:
                  </span>
                  {videos.map((vid, idx) => {
                    const isCurrent = selectedIdx === idx;
                    return (
                      <button
                        key={vid.id || idx}
                        type="button"
                        onClick={() => setSelectedIdx(idx)}
                        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isCurrent
                            ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-sm"
                            : "bg-[#111726] text-slate-400 hover:text-white border border-slate-800"
                        }`}
                      >
                        <Play className="h-3 w-3 fill-current" />
                        <span>{vid.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Body: Responsive Video Player adapting cleanly to portrait and landscape */}
            <div className="overflow-hidden p-3 sm:p-5 bg-[#080c16] flex-1 flex items-center justify-center min-h-0">
              <div className="relative w-full max-h-[58vh] sm:max-h-[64vh] flex items-center justify-center rounded-xl sm:rounded-2xl overflow-hidden bg-black border border-slate-800/80 shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
                <video
                  ref={videoRef}
                  key={activeVideo.url}
                  src={activeVideo.url}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="max-h-[58vh] sm:max-h-[64vh] w-auto max-w-full object-contain bg-black mx-auto"
                >
                  Your browser does not support HTML5 video.
                </video>
              </div>
            </div>

            {/* Modal Footer: Clean Close Button */}
            <div className="flex items-center justify-end border-t border-slate-800/90 px-5 sm:px-6 py-2.5 bg-[#131929]/80 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-xl border border-slate-700 bg-[#161f33] text-xs sm:text-sm font-semibold text-slate-200 hover:text-white hover:border-slate-500 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
