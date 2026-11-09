"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// Step screens for the "How it works" section (home page).
// Each step is its own short, narrated sequence: the panel acts it out while a
// caption underneath says what is happening ("We text back in 9 seconds"), with
// progress dots. It plays once when `active` (the rocket parks on the step),
// then holds the finished state. Clean product style: white, hairline border,
// navy type, one blue accent. Example data only, never real client numbers.

const ease = [0.22, 1, 0.36, 1] as const;
const BLUE = "#0866FF";

/** Steps 0..steps-1 every `ms` while active, then holds on the finished state. */
function usePhase(active: boolean, steps: number, ms: number, startDelay = 450) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (reduce) {
      setPhase(steps - 1);
      return;
    }
    if (!active) {
      setPhase(0);
      return;
    }
    if (phase >= steps - 1) return;
    const t = window.setTimeout(() => setPhase((p) => p + 1), phase === 0 ? startDelay : ms);
    return () => window.clearTimeout(t);
  }, [active, phase, steps, ms, startDelay, reduce]);
  return phase;
}

/** Narration footer: the current beat's caption (cross-fades) + progress dots. */
function Narration({ captions, phase }: { captions: string[]; phase: number }) {
  const beats = captions.length - 1; // captions[0] is the idle line
  const i = Math.min(phase, beats);
  return (
    <div className="flex h-[46px] items-center justify-between gap-3 border-t border-[#EEF2F7] bg-[#FAFCFF] px-5">
      <div className="relative h-5 flex-1 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease }}
            className={`absolute inset-0 truncate text-[13px] leading-5 ${i === beats ? "font-semibold text-[#07143F]" : "text-[#46516B]"}`}
          >
            {captions[i]}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
        {Array.from({ length: beats }, (_, k) => (
          <span
            key={k}
            className={`h-1.5 rounded-full transition-all duration-300 ${k < i ? "w-1.5 bg-[#0866FF]" : k === i ? "w-4 bg-[#0866FF]" : "w-1.5 bg-[#D5DEEA]"}`}
          />
        ))}
      </div>
    </div>
  );
}

/** Shared panel: label + mono meta, body, narration. Fixed width so every step lines up. */
function Panel({
  title,
  meta,
  captions,
  phase,
  children,
}: {
  title: string;
  meta: React.ReactNode;
  captions: string[];
  phase: number;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-[380px] overflow-hidden rounded-2xl border border-[#E3E9F2] bg-white text-left shadow-[0_1px_2px_rgba(7,20,63,0.04),0_24px_48px_-28px_rgba(7,20,63,0.28)]">
      <div className="flex h-[44px] items-center justify-between border-b border-[#EEF2F7] px-5">
        <p className="text-[13px] font-semibold tracking-[-0.01em] text-[#07143F]">{title}</p>
        <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[#8A94A8]">{meta}</div>
      </div>
      {children}
      <Narration captions={captions} phase={phase} />
    </div>
  );
}

function KitIcon({ name }: { name: string }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F1F6FF]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/home/icons/${name}.svg`} alt="" width={16} height={16} className="h-4 w-4" />
    </span>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span className={`relative h-[18px] w-8 shrink-0 rounded-full transition-colors duration-300 ${on ? "bg-[#0866FF]" : "bg-[#E3E9F2]"}`}>
      <motion.span
        className="absolute top-[2px] h-[14px] w-[14px] rounded-full bg-white shadow-[0_1px_2px_rgba(7,20,63,0.25)]"
        initial={false}
        animate={{ left: on ? 16 : 2 }}
        transition={{ duration: 0.3, ease }}
      />
    </span>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0" fill="none" stroke={BLUE} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 6.2 5 8.5l4.5-5" />
    </svg>
  );
}

// 1. We plan it with you: offer, ideal customer, then the setup switches on.
export function SetupVisual({ active }: { active: boolean }) {
  const items = [
    { icon: "lightbulb", label: "Your offer, sharpened" },
    { icon: "target", label: "The homeowner you want" },
    { icon: "ads", label: "Ads, lead form, text-back" },
    { icon: "calendar", label: "Your calendar" },
  ];
  const captions = [
    "It starts with one call with you",
    "We sharpen your offer together",
    "We pick the homeowner you want",
    "We build your ads, forms, and text-back",
    "We connect your calendar",
    "Ready to launch. That's week one.",
  ];
  const phase = usePhase(active, captions.length, 1250);
  return (
    <Panel title="Strategy & setup" meta="Week 1" captions={captions} phase={phase}>
      <ul className="divide-y divide-[#F1F4F8] px-5 py-1">
        {items.map((it, i) => {
          const on = i < phase;
          const now = i === phase - 1 && phase <= items.length;
          return (
            <li key={it.label} className="flex items-center gap-3 py-2.5">
              <KitIcon name={it.icon} />
              <span
                className={`flex-1 text-[14px] transition-colors duration-300 ${now ? "font-semibold text-[#07143F]" : on ? "text-[#07143F]" : "text-[#A3ADBF]"}`}
              >
                {it.label}
              </span>
              <Toggle on={on} />
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

// 2. We script, film, and shoot: angle -> script -> crew films on your job -> photos.
export function CreativeVisual({ active }: { active: boolean }) {
  const captions = [
    "Great ads start with a plan",
    "We plan the angle with you",
    "We write the script",
    "Our crew films you on a real job",
    "Plus photos for your ads and page",
    "Your ads are ready to test",
  ];
  const phase = usePhase(active, captions.length, 1500);
  const filming = phase >= 3;
  const script = [
    { k: "Hook", v: "Katy homeowners: roof over 15 years old?" },
    { k: "Proof", v: "Shot on a real job, with the real crew" },
    { k: "Offer", v: "Free inspection this week" },
  ];
  const [sec, setSec] = useState(0);
  useEffect(() => {
    if (phase !== 3) return;
    setSec(0);
    const t = window.setInterval(() => setSec((x) => x + 1), 200);
    return () => window.clearInterval(t);
  }, [phase]);
  return (
    <Panel title="Your ad creative" meta={filming ? "Film day" : "Script"} captions={captions} phase={phase}>
      <div className="px-5 pt-4">
        <div className="relative h-[150px] overflow-hidden rounded-xl border border-[#E3E9F2]">
          <AnimatePresence mode="wait" initial={false}>
            {!filming ? (
              <motion.div
                key="script"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-[#FAFCFF] p-3.5"
              >
                <motion.span
                  initial={false}
                  animate={{ opacity: phase >= 1 ? 1 : 0.3 }}
                  className="inline-flex rounded-full border border-[#D5E2F5] bg-white px-2 py-0.5 text-[11px] text-[#07143F]"
                >
                  Angle: older roofs in Katy
                </motion.span>
                <ul className="mt-2.5 space-y-1.5">
                  {script.map((l, i) => (
                    <motion.li
                      key={l.k}
                      initial={false}
                      animate={phase >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
                      transition={{ duration: 0.35, delay: phase >= 2 ? i * 0.25 : 0, ease }}
                      className="flex gap-2 text-[12px] leading-snug"
                    >
                      <span className="w-10 shrink-0 font-mono text-[10px] uppercase tracking-[0.08em] text-[#0866FF]">{l.k}</span>
                      <span className="text-[#07143F]">{l.v}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ) : (
              <motion.div
                key="film"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-[linear-gradient(135deg,#EAF1FB,#DCE7F6)]"
              >
                <svg viewBox="0 0 200 100" className="absolute inset-0 h-full w-full" fill="none" stroke="#9FB3CF" strokeWidth={1.4} strokeLinejoin="round">
                  <path d="M60 70 L100 42 L140 70" />
                  <path d="M70 70 V86 H130 V70" />
                  <path d="M0 86 H200" />
                </svg>
                {/* Viewfinder corners */}
                <span className="absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-white/90" />
                <span className="absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 border-white/90" />
                <span className="absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-white/90" />
                <span className="absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-white/90" />
                <span className="absolute left-1/2 top-3 inline-flex -translate-x-1/2 items-center gap-1.5 rounded bg-[#07143F] px-1.5 py-0.5 font-mono text-[10px] text-white">
                  <span className={`h-1.5 w-1.5 rounded-full bg-[#FF4D4F] ${phase === 3 ? "animate-pulse" : ""}`} />
                  {phase === 3 ? `REC 0:${String(Math.min(sec, 59)).padStart(2, "0")}` : "Wrapped"}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* Photo strip */}
      <div className="flex h-[58px] items-center gap-2 px-5">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            initial={false}
            animate={phase >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.3, delay: phase >= 4 ? i * 0.12 : 0, ease }}
            className="flex h-9 flex-1 items-center justify-center rounded-md border border-[#E3E9F2] bg-[linear-gradient(135deg,#EEF3FA,#DDE7F5)]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#9FB3CF" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 16 5-5 4 4 3-3 6 6" />
              <circle cx="16" cy="9" r="1.5" />
            </svg>
          </motion.span>
        ))}
        <motion.span
          initial={false}
          animate={{ opacity: phase >= 4 ? 1 : 0 }}
          className="shrink-0 font-mono text-[10.5px] text-[#46516B]"
        >
          +24 photos
        </motion.span>
      </div>
    </Panel>
  );
}

// 3. We test until one wins: several ads, each speaking to a different homeowner.
export function TestVisual({ active }: { active: boolean }) {
  const captions = [
    "We don't guess. We test.",
    "We launch several ads at once",
    "Each one speaks to a different homeowner",
    "We cut the ones that don't book jobs",
    "We remix the winner and test again",
    "Testing finds your winning ad",
  ];
  const phase = usePhase(active, captions.length, 1500);
  const ads = [
    { id: "A", who: "Older homes", score: 0.35 },
    { id: "B", who: "Storm damage", score: 0.92 },
    { id: "C", who: "New homeowners", score: 0.5 },
  ];
  const winner = phase >= 3;
  return (
    <Panel
      title="Ad tests"
      meta={<span className={`transition-colors duration-300 ${phase >= 5 ? "text-[#0866FF]" : ""}`}>{phase >= 5 ? "Winner found" : "Weeks 2 to 4"}</span>}
      captions={captions}
      phase={phase}
    >
      <ul className="space-y-2 px-5 py-3.5">
        {ads.map((ad, i) => {
          const isWin = ad.id === "B";
          const paused = winner && !isWin;
          return (
            <motion.li
              key={ad.id}
              initial={false}
              animate={{ opacity: phase >= 1 ? (paused ? 0.45 : 1) : 0, y: phase >= 1 ? 0 : 6 }}
              transition={{ duration: 0.35, delay: phase === 1 ? i * 0.15 : 0, ease }}
              className={`rounded-lg border px-3 py-2 transition-colors duration-300 ${winner && isWin ? "border-[#BFD5FF] bg-[#F1F6FF]" : "border-[#E3E9F2] bg-white"}`}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-semibold text-[#07143F]">Ad {ad.id}</span>
                <motion.span initial={false} animate={{ opacity: phase >= 2 ? 1 : 0 }} className="text-[12px] text-[#46516B]">
                  for {ad.who}
                </motion.span>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.08em]">
                  {winner ? (isWin ? <span className="text-[#0866FF]">Winner</span> : <span className="text-[#A3ADBF]">Paused</span>) : <span className="text-[#8A94A8]">Testing</span>}
                </span>
              </div>
              <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-[#EEF2F7]">
                <motion.div
                  className={`h-full rounded-full ${isWin ? "bg-[#0866FF]" : "bg-[#9FB3CF]"}`}
                  initial={false}
                  animate={{ width: phase >= 2 ? `${ad.score * 100}%` : "6%" }}
                  transition={{ duration: 0.9, ease }}
                />
              </div>
            </motion.li>
          );
        })}
        {/* The remix of the winner joins the next round. */}
        <motion.li
          initial={false}
          animate={phase >= 4 ? { opacity: 1, height: 34 } : { opacity: 0, height: 0 }}
          transition={{ duration: 0.4, ease }}
          className="flex items-center gap-2 overflow-hidden rounded-lg border border-dashed border-[#BFD5FF] px-3"
        >
          <span className="font-mono text-[11px] font-semibold text-[#0866FF]">Ad B2</span>
          <span className="text-[12px] text-[#46516B]">new hook, same winning angle</span>
        </motion.li>
      </ul>
    </Panel>
  );
}

// 4. Leads get booked (by our team or the client's own office): lead -> text back -> call -> on your calendar -> closing training.
export function BookedVisual({ active }: { active: boolean }) {
  const captions = [
    "A homeowner sees your ad",
    "A new lead comes in",
    "We text them back in 9 seconds",
    "Our team calls, or your office does",
    "The estimate lands on your calendar",
    "And we train you to close more of them",
  ];
  const phase = usePhase(active, captions.length, 1600);
  const hours = ["8 AM", "9 AM", "10 AM", "11 AM"];
  const lead = [
    null,
    { t: "New lead · Mike R. · Roof replacement", done: false },
    { t: "Texted back in 9 sec", done: true },
    { t: "Called · real homeowner, wants a quote", done: true },
    { t: "Called · real homeowner, wants a quote", done: true },
    { t: "Called · real homeowner, wants a quote", done: true },
  ][Math.min(phase, 5)];
  return (
    <Panel title="Tuesday" meta="Your calendar" captions={captions} phase={phase}>
      <div className="relative px-5 pb-2 pt-1">
        {hours.map((h) => (
          <div key={h} className="flex h-[44px] items-start border-t border-[#F1F4F8] first:border-t-0">
            <span className="w-12 pt-1.5 font-mono text-[10.5px] text-[#A3ADBF]">{h}</span>
          </div>
        ))}
        {/* The lead's status, updating beat by beat. */}
        <div className="absolute left-[76px] right-5 top-[8px] h-[30px]">
          <AnimatePresence mode="wait" initial={false}>
            {lead && (
              <motion.div
                key={lead.t}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: phase >= 4 ? 0.55 : 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.3, ease }}
                className="flex h-full items-center gap-2 rounded-lg border border-[#E3E9F2] bg-white px-2.5"
              >
                {lead.done ? <Check /> : <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-[#0866FF]" />}
                <p className="truncate text-[12px] text-[#46516B]">{lead.t}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* The booked estimate slides into the 9 AM slot. */}
        <motion.div
          initial={false}
          animate={phase >= 4 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.97 }}
          transition={{ duration: 0.5, ease }}
          className="absolute left-[76px] right-5 top-[50px] rounded-lg border border-[#CFE0FF] border-l-[3px] border-l-[#0866FF] bg-[#F1F6FF] px-3 py-2"
        >
          <p className="text-[13px] font-semibold text-[#07143F]">Estimate · Roof replacement</p>
          <p className="mt-0.5 text-[11.5px] text-[#46516B]">Mike R. · Katy · confirmed homeowner</p>
        </motion.div>
        {/* Then: we train the client and their team to close more estimates. */}
        <motion.div
          initial={false}
          animate={phase >= 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.45, ease }}
          className="absolute left-[76px] right-5 top-[140px] flex items-center gap-2.5 rounded-lg border border-[#E3E9F2] bg-white px-3 py-2"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/home/icons/book.svg" alt="" width={16} height={16} className="h-4 w-4" />
          <div className="leading-tight">
            <p className="text-[12.5px] font-semibold text-[#07143F]">Closing training</p>
            <p className="text-[11px] text-[#46516B]">Win more estimates, the simple way</p>
          </div>
        </motion.div>
      </div>
    </Panel>
  );
}

// 5. Every Monday: the report arrives, numbers count up, the trend draws.
export function ReportVisual({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const captions = [
    "Every Monday morning",
    "Your report lands in your inbox",
    "Leads, booked jobs, and revenue",
    "See exactly what your ads brought in",
  ];
  const phase = usePhase(active, captions.length, 1700);
  const rows = [
    { label: "Leads", value: 42, fmt: (n: number) => `${Math.round(n)}` },
    { label: "Booked", value: 14, fmt: (n: number) => `${Math.round(n)}` },
    { label: "Revenue", value: 38500, fmt: (n: number) => `$${(Math.round(n / 100) / 10).toFixed(1)}k` },
  ];
  const counting = phase >= 2;
  const [p, setP] = useState(0);
  useEffect(() => {
    if (reduce) return setP(1);
    if (!counting) return setP(0);
    let raf = 0;
    let t0 = 0;
    const loop = (now: number) => {
      if (!t0) t0 = now;
      const t = Math.min((now - t0) / 1600, 1);
      setP(1 - Math.pow(1 - t, 3));
      if (t < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [counting, reduce]);
  const line = "M0 52 C 20 48, 30 40, 50 42 S 80 30, 100 30 S 140 14, 160 18 S 190 6, 200 4";
  return (
    <Panel
      title="Monday report"
      meta={
        <span className={`transition-colors duration-300 ${phase >= 1 ? "text-[#0866FF]" : ""}`}>{phase >= 1 ? "New · 8:00 AM" : "Example"}</span>
      }
      captions={captions}
      phase={phase}
    >
      <motion.div initial={false} animate={{ opacity: phase >= 1 ? 1 : 0.35 }} transition={{ duration: 0.4 }}>
        <div className="grid grid-cols-3 divide-x divide-[#EEF2F7] border-b border-[#EEF2F7]">
          {rows.map((r, i) => (
            <div key={r.label} className={`px-5 py-3 transition-colors duration-500 ${phase >= 3 && i === 1 ? "bg-[#F1F6FF]" : ""}`}>
              <p className="text-[11px] text-[#8A94A8]">{r.label}</p>
              <p className="mt-0.5 text-[19px] font-bold tabular-nums tracking-[-0.01em] text-[#07143F]">{r.fmt(r.value * p)}</p>
            </div>
          ))}
        </div>
        <div className="px-5 pb-3 pt-4">
          <svg viewBox="0 0 200 60" className="h-[72px] w-full overflow-visible" fill="none">
            {[15, 30, 45].map((y) => (
              <path key={y} d={`M0 ${y} H200`} stroke="#EEF2F7" strokeWidth={1} />
            ))}
            <path d={`${line} L200 60 L0 60 Z`} fill={BLUE} opacity={0.06 * p} />
            <path d={line} stroke={BLUE} strokeWidth={2} strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - p} />
            <circle cx={200} cy={4} r={3.5} fill={BLUE} opacity={p > 0.97 ? 1 : 0} style={{ transition: "opacity .3s" }} />
          </svg>
          <div className="mt-1 flex justify-between font-mono text-[10px] text-[#A3ADBF]">
            <span>Week 1</span>
            <span>This week</span>
          </div>
        </div>
      </motion.div>
    </Panel>
  );
}

export const STEP_VISUALS = [SetupVisual, CreativeVisual, TestVisual, BookedVisual, ReportVisual];
