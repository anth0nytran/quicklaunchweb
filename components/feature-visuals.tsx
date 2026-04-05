"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

// =============================================================================
// Search Visual — clean typing + results
// =============================================================================

export function SearchVisual() {
  const [phase, setPhase] = useState(0);
  // 0=idle, 1..15=typing chars, 16/17/18=results, 19=hold, 20=fade
  const text = "plumber near me";

  useEffect(() => {
    let delay: number;
    if (phase === 0) delay = 600;
    else if (phase <= text.length) delay = 55 + Math.random() * 40; // typing speed
    else if (phase <= text.length + 3) delay = 500; // results stagger
    else if (phase === text.length + 4) delay = 3000; // hold
    else delay = 500; // fade + reset
    const t = setTimeout(() => setPhase(p => p >= text.length + 5 ? 0 : p + 1), delay);
    return () => clearTimeout(t);
  }, [phase, text.length]);

  const typedChars = Math.min(Math.max(phase - 0, 0), text.length);
  const resultsPhase = phase - text.length; // 1, 2, 3 = results appearing
  const show = phase >= 1 && phase <= text.length + 4;

  const results = [
    { platform: "Google Search", rank: "#1" },
    { platform: "Google Maps", rank: "#1" },
    { platform: "AI Search", rank: "Featured" },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center p-5">
      <motion.div
        className="w-full max-w-[228px]"
        animate={{ opacity: show ? 1 : 0 }}
        transition={{ duration: 0.4, ease }}
      >
        {/* Search bar */}
        <div className="rounded-lg bg-white/[0.05] border border-white/[0.08] px-3 py-2 flex items-center gap-2 mb-3">
          <svg className="h-3.5 w-3.5 text-white/20 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-[11px] text-white/45 font-mono">
            {text.slice(0, typedChars)}
            {phase >= 1 && phase <= text.length && (
              <motion.span
                className="inline-block w-[1px] h-[12px] bg-accent/70 ml-px align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              />
            )}
          </span>
        </div>

        {/* Results */}
        <div className="space-y-1.5">
          {results.map((r, i) => (
            <AnimatePresence key={r.platform}>
              {resultsPhase >= i + 1 && (
                <motion.div
                  className="rounded-lg bg-white/[0.03] border border-white/[0.06] px-3 py-2.5 flex items-center justify-between"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="h-2 w-2 rounded-full bg-accent/60" />
                    <div>
                      <p className="text-[11px] text-white/55 font-medium leading-none">{r.platform}</p>
                      <p className="text-[9px] text-white/25 mt-0.5">Your Business</p>
                    </div>
                  </div>
                  <motion.span
                    className="text-[9px] text-accent font-semibold px-1.5 py-0.5 rounded bg-accent/10"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    {r.rank}
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// =============================================================================
// Lead Visual — iPhone-style notification stack, all visible
// =============================================================================

const notifications = [
  { icon: "phone", label: "Missed call", detail: "Auto text-back sent", color: "text-red-400", dot: "bg-red-400" },
  { icon: "form", label: "New form lead", detail: "Replied in 3 seconds", color: "text-blue-400", dot: "bg-blue-400" },
  { icon: "moon", label: "After-hours msg", detail: "Auto response sent", color: "text-amber-400", dot: "bg-amber-400" },
  { icon: "clock", label: "Lead went quiet", detail: "Follow-up at 24h", color: "text-purple-400", dot: "bg-purple-400" },
];

const nIcons: Record<string, React.ReactNode> = {
  phone: <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
  form: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
  moon: <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />,
  clock: <><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></>,
};

export function LeadVisual() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showCheck, setShowCheck] = useState<Set<number>>(new Set());
  const [loopPhase, setLoopPhase] = useState<"building" | "holding" | "fading">("building");

  useEffect(() => {
    if (loopPhase === "building") {
      if (visibleCount < notifications.length) {
        const t = setTimeout(() => {
          setVisibleCount(c => c + 1);
          // Show checkmark for the previous one after a delay
          if (visibleCount > 0) {
            setTimeout(() => setShowCheck(s => new Set(s).add(visibleCount - 1)), 300);
          }
        }, visibleCount === 0 ? 500 : 900);
        return () => clearTimeout(t);
      } else {
        // Show last checkmark
        setTimeout(() => setShowCheck(s => new Set(s).add(notifications.length - 1)), 300);
        const t = setTimeout(() => setLoopPhase("holding"), 500);
        return () => clearTimeout(t);
      }
    }
    if (loopPhase === "holding") {
      const t = setTimeout(() => setLoopPhase("fading"), 3000);
      return () => clearTimeout(t);
    }
    if (loopPhase === "fading") {
      const t = setTimeout(() => {
        setVisibleCount(0);
        setShowCheck(new Set());
        setLoopPhase("building");
      }, 600);
      return () => clearTimeout(t);
    }
  }, [loopPhase, visibleCount]);

  const show = loopPhase !== "fading";

  return (
    <div className="absolute inset-0 flex items-center justify-center p-5">
      <motion.div
        className="w-full max-w-[228px] space-y-1.5"
        animate={{ opacity: show ? 1 : 0 }}
        transition={{ duration: 0.4, ease }}
      >
        {notifications.map((n, i) => (
          <AnimatePresence key={n.label}>
            {i < visibleCount && (
              <motion.div
                className="rounded-lg bg-white/[0.03] border border-white/[0.06] px-3 py-2 flex items-center gap-2.5"
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, ease }}
              >
                {/* Icon */}
                <div className="h-7 w-7 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0">
                  <svg className={`h-3 w-3 ${n.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    {nIcons[n.icon]}
                  </svg>
                </div>
                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className={`text-[10px] font-semibold ${n.color} leading-none`}>{n.label}</p>
                  <p className="text-[9px] text-white/30 mt-0.5">{n.detail}</p>
                </div>
                {/* Checkmark */}
                <motion.div
                  className="h-4 w-4 rounded-full bg-accent/15 flex items-center justify-center shrink-0"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: showCheck.has(i) ? 1 : 0,
                    opacity: showCheck.has(i) ? 1 : 0,
                  }}
                  transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <svg className="h-2.5 w-2.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </motion.div>
    </div>
  );
}

// =============================================================================
// Review Visual — continuous feed of reviews scrolling up, auto-reply appearing
// =============================================================================

const reviews = [
  "Best contractor I've ever hired",
  "Showed up on time, finished early",
  "Fixed our fence after the storm",
  "Great communication start to finish",
  "Already recommended to 3 neighbors",
  "On time, on budget. Will hire again",
  "Professional and easy to work with",
  "Best price and best quality in town",
];

const reviewNames = ["Mike R.", "Sarah T.", "James L.", "Ana M.", "David K.", "Chris P.", "Lisa W.", "Tom B."];

export function ReviewVisual() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let raf: number;
    let prev: number | null = null;
    const speed = 22; // px per second

    const tick = (ts: number) => {
      if (prev === null) prev = ts;
      const dt = (ts - prev) / 1000;
      prev = ts;
      setOffset(o => o + dt * speed);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const cardH = 72; // card height + gap
  const total = reviews.length * cardH;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Fade masks */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[rgb(18,18,21)] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[rgb(18,18,21)] to-transparent z-10 pointer-events-none" />

      <div className="absolute inset-0 flex justify-center px-5">
        <div className="w-full max-w-[228px] relative h-full">
          {/* Scrolling column */}
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="absolute left-0 right-0 space-y-2"
              style={{
                transform: `translateY(${-((offset % total)) + copy * total}px)`,
                willChange: "transform",
              }}
            >
              {reviews.map((text, i) => {
                // Calculate if this card is near the center of the viewport to show auto-reply
                const cardY = i * cardH - (offset % total) + copy * total;
                const nearCenter = cardY > 40 && cardY < 140;

                return (
                  <div
                    key={`${copy}-${i}`}
                    className="rounded-lg bg-white/[0.03] border border-white/[0.06] px-3 py-2.5"
                    style={{ height: cardH - 8 }}
                  >
                    {/* Stars + name */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex gap-px">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <svg key={s} className="h-2.5 w-2.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-[8px] text-white/25">{reviewNames[i]}</span>
                    </div>
                    {/* Review text */}
                    <p className="text-[10px] text-white/45 leading-snug">&ldquo;{text}&rdquo;</p>
                    {/* Auto-replied badge */}
                    <div
                      className="mt-1.5 flex items-center gap-1 transition-opacity duration-500"
                      style={{ opacity: nearCenter ? 1 : 0.15 }}
                    >
                      <div className="h-1 w-1 rounded-full bg-accent" />
                      <span className="text-[8px] text-accent font-medium">Auto-replied</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
