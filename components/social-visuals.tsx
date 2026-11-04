"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const pop = [0.34, 1.56, 0.64, 1] as const;

// Shared loop timer. Returns a phase counter that advances on the given step
// delays and wraps back to 0, so every visual runs the same way.
function useLoop(delays: number[]) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setTimeout(
      () => setPhase((p) => (p + 1) % delays.length),
      delays[phase] ?? 1000
    );
    return () => clearTimeout(t);
  }, [phase, delays]);
  return phase;
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full w-[132px] overflow-hidden rounded-[18px] border border-white/[0.12] bg-black/50 shadow-[0_0_40px_-12px_rgba(0,0,0,0.9)]">
      <div className="absolute left-1/2 top-1.5 z-20 h-1 w-8 -translate-x-1/2 rounded-full bg-white/15" />
      {children}
    </div>
  );
}

// =============================================================================
// 01 — Posts: a reel plays, then a picture ad, engagement ticking up
// =============================================================================

const POSTS_DELAYS = [3200, 3200];

export function PostsVisual() {
  const phase = useLoop(POSTS_DELAYS);
  const showingReel = phase === 0;
  const showingStatic = phase === 1;

  return (
    <div className="absolute inset-0 flex items-center justify-center p-5">
      <div className="flex h-full max-h-[190px] items-center gap-3">
        <PhoneFrame>
          <div className="flex h-full flex-col px-2 pb-2 pt-5">
            <AnimatePresence mode="wait">
              {showingReel && (
                <motion.div
                  key="reel"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease }}
                  className="relative flex-1 overflow-hidden rounded-lg border border-white/[0.08] bg-gradient-to-br from-accent/25 via-white/[0.04] to-transparent"
                >
                  <span className="absolute left-1.5 top-1.5 rounded bg-black/50 px-1 py-px text-[7px] font-semibold tracking-wide text-white/70">
                    REEL
                  </span>
                  <motion.div
                    className="absolute left-1/2 top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/85"
                    animate={{ scale: [1, 1.12, 1], opacity: [0.9, 1, 0.9] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <svg viewBox="0 0 24 24" className="ml-0.5 h-3 w-3 fill-black">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-accent"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.4, ease: "linear" }}
                  />
                </motion.div>
              )}

              {showingStatic && (
                <motion.div
                  key="static"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease }}
                  className="relative flex-1 overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.04]"
                >
                  <span className="absolute left-1.5 top-1.5 rounded bg-black/50 px-1 py-px text-[7px] font-semibold tracking-wide text-white/70">
                    PHOTO
                  </span>
                  <div className="absolute inset-x-2 bottom-2 space-y-1">
                    <div className="h-1.5 w-full rounded-full bg-white/20" />
                    <div className="h-1.5 w-2/3 rounded-full bg-white/10" />
                  </div>
                  <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center">
                    <div className="h-8 w-14 rounded bg-gradient-to-br from-white/25 to-white/5" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Engagement row */}
            <div className="mt-2 flex items-center gap-2">
              {["heart", "chat"].map((icon, i) => (
                <motion.div
                  key={icon}
                  className="flex items-center gap-1"
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <svg
                    className={`h-2.5 w-2.5 ${i === 0 ? "text-accent" : "text-white/35"}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {i === 0 ? (
                      <path d="M12 21s-7-4.35-9.33-8.4A5.4 5.4 0 0112 6.1a5.4 5.4 0 019.33 6.5C19 16.65 12 21 12 21z" />
                    ) : (
                      <path d="M4 4h16v10H7l-3 3V4z" />
                    )}
                  </svg>
                  <span className="font-mono text-[8px] text-white/45">
                    {i === 0 ? (showingStatic ? "412" : "268") : showingStatic ? "37" : "24"}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </PhoneFrame>

        {/* Weekly cadence rail */}
        <div className="hidden flex-col gap-1.5 sm:flex">
          {["Mon", "Wed", "Fri"].map((day, i) => (
            <motion.div
              key={day}
              className="flex items-center gap-1.5 rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-1.5"
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease }}
            >
              <div className="h-1.5 w-1.5 rounded-full bg-accent/70" />
              <span className="text-[8px] font-medium text-white/50">{day}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// 02 — Ads: targeting radius over a map grid, leads landing
// =============================================================================

const ADS_DELAYS = [700, 1400, 1400, 1400, 1800];

export function AdsVisual() {
  const phase = useLoop(ADS_DELAYS);
  const leadCount = Math.max(0, phase - 1);

  return (
    <div className="absolute inset-0 flex items-center justify-center p-5">
      <div className="relative h-[172px] w-full max-w-[230px] overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02]">
        {/* Map grid */}
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        {/* Targeting radius */}
        <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
          {[0, 1].map((ring) => (
            <motion.div
              key={ring}
              className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40"
              animate={{ scale: [0.6, 1.8], opacity: [0.6, 0] }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                delay: ring * 1.3,
                ease: "easeOut",
              }}
            />
          ))}
          <div className="relative h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_2px_rgb(var(--color-accent-rgb))]" />
        </div>

        {/* Lead pins */}
        {[
          { top: "22%", left: "22%" },
          { top: "60%", left: "76%" },
          { top: "72%", left: "30%" },
        ].map((pos, i) => (
          <AnimatePresence key={i}>
            {leadCount > i && (
              <motion.div
                className="absolute flex items-center gap-1"
                style={pos}
                initial={{ opacity: 0, y: -8, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.45, ease: pop }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                <span className="rounded bg-black/60 px-1 py-px text-[7px] font-medium text-white/70">
                  Lead
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        ))}

        {/* Counter bar */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/[0.08] bg-black/40 px-3 py-2 backdrop-blur-sm">
          <span className="text-[8px] uppercase tracking-[0.2em] text-white/35">
            Leads today
          </span>
          <motion.span
            key={leadCount}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: pop }}
            className="font-mono text-sm font-bold text-accent"
          >
            {leadCount}
          </motion.span>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// 03 — Profile: an empty page fills in and gets verified
// =============================================================================

const PROFILE_DELAYS = [700, 900, 900, 900, 2400];

export function ProfileVisual() {
  const phase = useLoop(PROFILE_DELAYS);

  return (
    <div className="absolute inset-0 flex items-center justify-center p-5">
      <div className="w-full max-w-[184px] rounded-xl border border-white/[0.08] bg-white/[0.02] p-2.5">
        {/* Header */}
        <div className="flex items-center gap-2.5">
          <motion.div
            className="relative h-8 w-8 shrink-0 rounded-full border border-white/[0.12] bg-white/[0.05]"
            animate={{
              borderColor:
                phase >= 1 ? "rgba(var(--color-accent-rgb),0.5)" : "rgba(255,255,255,0.12)",
            }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence>
              {phase >= 2 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.35, ease: pop }}
                  className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-2 w-2 stroke-black"
                    fill="none"
                    strokeWidth={4}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="min-w-0 flex-1 space-y-1.5">
            <motion.div
              className="h-1.5 rounded-full bg-white/25"
              animate={{ width: phase >= 1 ? "78%" : "40%" }}
              transition={{ duration: 0.5, ease }}
            />
            <motion.div
              className="h-1.5 rounded-full bg-white/10"
              animate={{ width: phase >= 1 ? "56%" : "24%" }}
              transition={{ duration: 0.5, delay: 0.06, ease }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-2.5 grid grid-cols-3 gap-1.5">
          {[
            { label: "Posts", from: "0", to: "48" },
            { label: "Reviews", from: "2", to: "61" },
            { label: "Calls", from: "—", to: "↑" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] px-1 py-1 text-center"
            >
              <motion.p
                key={`${stat.label}-${phase >= 3}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05, ease }}
                className={`font-mono text-[10px] font-bold ${
                  phase >= 3 ? "text-accent" : "text-white/40"
                }`}
              >
                {phase >= 3 ? stat.to : stat.from}
              </motion.p>
              <p className="mt-0.5 text-[7px] text-white/30">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Grid fills in */}
        <div className="mt-2 grid grid-cols-3 gap-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="h-6 rounded-sm"
              animate={{
                backgroundColor:
                  phase >= 4
                    ? "rgba(var(--color-accent-rgb),0.22)"
                    : "rgba(255,255,255,0.04)",
              }}
              transition={{ duration: 0.4, delay: i * 0.05, ease }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// 04 — Catch every lead: missed call, auto text back, booked
// =============================================================================

const CATCH_STEPS = [
  { label: "Missed call", detail: "3:42 PM", tone: "text-red-400", dot: "bg-red-400" },
  { label: "Text sent back", detail: "In 8 seconds", tone: "text-accent", dot: "bg-accent" },
  { label: "They replied", detail: "“Can you come Tue?”", tone: "text-white/60", dot: "bg-white/40" },
];

const CATCH_DELAYS = [1100, 1100, 1100, 2600];

export function CatchLeadVisual() {
  const phase = useLoop(CATCH_DELAYS);
  const visible = Math.min(phase + 1, CATCH_STEPS.length);
  const booked = phase >= CATCH_STEPS.length;

  return (
    <div className="absolute inset-0 flex items-center justify-center p-5">
      <div className="w-full max-w-[214px] space-y-1.5">
        {CATCH_STEPS.map((step, i) => (
          <AnimatePresence key={step.label}>
            {visible > i && (
              <motion.div
                initial={{ opacity: 0, x: 14, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.42, ease }}
                className="flex items-center gap-2.5 rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-2"
              >
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${step.dot}`} />
                <div className="min-w-0 flex-1">
                  <p className={`text-[10px] font-medium leading-none ${step.tone}`}>
                    {step.label}
                  </p>
                  <p className="mt-1 truncate text-[8px] text-white/30">{step.detail}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}

        <AnimatePresence>
          {booked && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, ease: pop }}
              className="flex items-center justify-center gap-2 rounded-lg border border-accent/30 bg-accent/[0.10] px-2.5 py-2.5"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-3 w-3 stroke-accent"
                fill="none"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[10px] font-semibold text-accent">Estimate booked</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// =============================================================================
// Timeline visuals — one per day of the 7-day launch
// =============================================================================

const KICKOFF_BUBBLES = [
  { side: "left", w: "68%" },
  { side: "right", w: "52%" },
  { side: "left", w: "58%" },
];
const KICKOFF_DELAYS = [700, 900, 900, 2600];

export function DayKickoffVisual() {
  const bubbles = KICKOFF_BUBBLES;
  const phase = useLoop(KICKOFF_DELAYS);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6">
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className={`flex w-full ${b.side === "right" ? "justify-end" : "justify-start"}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: phase >= i ? 1 : 0, y: phase >= i ? 0 : 10 }}
          transition={{ duration: 0.4, ease }}
        >
          <div
            className={`rounded-2xl px-3 py-2.5 ${
              b.side === "right"
                ? "rounded-br-sm bg-accent/15 border border-accent/25"
                : "rounded-bl-sm bg-white/[0.05] border border-white/[0.08]"
            }`}
            style={{ width: b.w }}
          >
            <div className="h-1.5 w-full rounded-full bg-white/20" />
            <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-white/10" />
          </div>
        </motion.div>
      ))}
      <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-white/30">30 minutes</p>
    </div>
  );
}

const BUILD_DELAYS = [500, 500, 500, 500, 500, 500, 2400];

export function DayBuildVisual() {
  const phase = useLoop(BUILD_DELAYS);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
      <div className="grid w-full max-w-[180px] grid-cols-3 gap-1.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.div
            key={i}
            className="aspect-square rounded-md border border-white/[0.06]"
            animate={{
              backgroundColor:
                i < phase
                  ? "rgba(var(--color-accent-rgb),0.20)"
                  : "rgba(255,255,255,0.03)",
              scale: i === phase - 1 ? [0.85, 1] : 1,
            }}
            transition={{ duration: 0.35, ease: pop }}
          />
        ))}
      </div>
      <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-white/30">
        Posts + ads built
      </p>
    </div>
  );
}

const SYSTEM_ROWS = ["Missed-call text", "Instant reply", "Follow-up", "Review request"];
const SYSTEM_DELAYS = [600, 700, 700, 700, 700, 2200];

export function DaySystemVisual() {
  const rows = SYSTEM_ROWS;
  const phase = useLoop(SYSTEM_DELAYS);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6">
      {rows.map((row, i) => {
        const on = phase > i;
        return (
          <div
            key={row}
            className="flex w-full max-w-[190px] items-center justify-between rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-2"
          >
            <span className="text-[9px] text-white/55">{row}</span>
            <motion.span
              className="relative flex h-3.5 w-6 shrink-0 items-center rounded-full px-0.5"
              animate={{
                backgroundColor: on
                  ? "rgba(var(--color-accent-rgb),0.45)"
                  : "rgba(255,255,255,0.10)",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.span
                className="h-2.5 w-2.5 rounded-full bg-white"
                animate={{ x: on ? 10 : 0 }}
                transition={{ duration: 0.3, ease: pop }}
              />
            </motion.span>
          </div>
        );
      })}
    </div>
  );
}

const LIVE_DELAYS = [700, 900, 900, 900, 2400];

export function DayLiveVisual() {
  const phase = useLoop(LIVE_DELAYS);
  const count = Math.max(0, phase - 1);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
      <motion.div
        className="relative flex h-20 w-20 items-center justify-center rounded-full border border-accent/30 bg-accent/[0.08]"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.span
          className="absolute inset-0 rounded-full border border-accent/40"
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.span
          key={count}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35, ease: pop }}
          className="font-mono text-2xl font-bold text-accent"
        >
          {count}
        </motion.span>
      </motion.div>
      <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">
        New leads this week
      </p>
    </div>
  );
}
