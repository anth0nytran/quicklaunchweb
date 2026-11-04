"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import {
  HERO_ART,
  HERO_CHART_PATHS,
} from "@/components/brand/hero-chart-paths";

// Home hero art with live-feeling overlays, layered on the flat /public/home/hero.png.
//
// What the flat PNG allows (see website-assets/README-LLM.md):
//  - Rocket, chart lines, card labels and the phone's "New Lead" screen are baked
//    into the image, so they are NOT moved or redrawn here.
//  - Added on top: count-up numbers in the empty space under each card label, a dot
//    that rides each baked chart line while its number counts, a soft endpoint pulse,
//    and cloud-puff exhaust leaving the baked rocket's nozzle.
// When a cleaned base (no rocket, blank cards) + separate rocket.png exist, the rocket
// hover and SVG line drawing can be added without duplicating anything.

// =============================================================================
// Edit numbers here
// =============================================================================

export const HERO_DASHBOARD = {
  /** Shown on the screen. Required while any value below is illustrative. */
  label: "Example dashboard",
  durationMs: 2400,
  staggerMs: 150,
  metrics: [
    { key: "leads", value: 312, format: "number" },
    { key: "booked", value: 47, format: "number" },
    { key: "revenue", value: 38500, format: "currency" },
  ] as {
    key: keyof typeof HERO_CHART_PATHS;
    value: number;
    format: "number" | "currency" | "percent";
    decimals?: number;
  }[],
};

// Where each number sits (image pixel space, top-left of the text box).
const NUMBER_POS: Record<
  keyof typeof HERO_CHART_PATHS,
  { x: number; y: number }
> = {
  leads: { x: 390, y: 400 },
  booked: { x: 703, y: 414 },
  revenue: { x: 373, y: 596 },
};

/** Center of the baked rocket's nozzle, and the direction its flame points (unit vector). */
const NOZZLE = { x: 1142, y: 232 };
const EXHAUST_DIR = { x: -0.56, y: 0.83 };

// =============================================================================
// Helpers
// =============================================================================

const pct = (v: number, of: number) => `${(v / of) * 100}%`;
/** Image px → container-query width units, so overlays scale with the art. */
const cqw = (px: number) => `${(px / HERO_ART.width) * 100}cqw`;

function formatValue(
  value: number,
  format: "number" | "currency" | "percent",
  decimals = 0,
) {
  if (format === "currency") {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }
  if (format === "percent") return `${value.toFixed(decimals)}%`;
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/** Point at fraction t (0–1) of a polyline's length. */
function pointAt(
  points: [number, number][],
  lengths: number[],
  t: number,
): [number, number] {
  const total = lengths[lengths.length - 1];
  const target = t * total;
  let i = 1;
  while (i < lengths.length && lengths[i] < target) i++;
  if (i >= points.length) return points[points.length - 1];
  const seg = lengths[i] - lengths[i - 1] || 1;
  const f = (target - lengths[i - 1]) / seg;
  const [x0, y0] = points[i - 1];
  const [x1, y1] = points[i];
  return [x0 + (x1 - x0) * f, y0 + (y1 - y0) * f];
}

// Fixed pool of exhaust puffs: [delay fraction, sideways jitter px, size px, travel px, pale-blue?]
const PUFFS: [number, number, number, number, boolean][] = [
  [0 / 7, -6, 70, 100, false],
  [1 / 7, 7, 60, 92, true],
  [2 / 7, -2, 76, 104, false],
  [3 / 7, 9, 62, 96, true],
  [4 / 7, -8, 68, 98, false],
  [5 / 7, 3, 74, 102, true],
  [6 / 7, -4, 60, 94, false],
];
const PUFF_SECONDS = 1.8;

// =============================================================================
// Component
// =============================================================================

export function HeroDashboard() {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState<number[]>(() =>
    HERO_DASHBOARD.metrics.map(() => 0),
  );
  const [done, setDone] = useState(false);
  const [paused, setPaused] = useState(false);

  const paths = useMemo(
    () =>
      HERO_DASHBOARD.metrics.map((m) => {
        const points = HERO_CHART_PATHS[m.key];
        const lengths = [0];
        for (let i = 1; i < points.length; i++) {
          const [x0, y0] = points[i - 1];
          const [x1, y1] = points[i];
          lengths.push(lengths[i - 1] + Math.hypot(x1 - x0, y1 - y0));
        }
        return { points, lengths };
      }),
    [],
  );

  // Start once, when the hero first scrolls into view. Pause loops when offscreen or tab hidden.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let visible = true;
    const sync = () =>
      setPaused(!visible || document.visibilityState === "hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (entry.isIntersecting) setStarted(true);
        sync();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  // Count-up + line-riding dots, once per page load.
  useEffect(() => {
    if (!started) return;
    const n = HERO_DASHBOARD.metrics.length;
    if (reduceMotion) {
      setProgress(Array(n).fill(1));
      setDone(true);
      return;
    }
    const { durationMs, staggerMs } = HERO_DASHBOARD;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const next = HERO_DASHBOARD.metrics.map((_, i) =>
        Math.min(1, Math.max(0, (now - t0 - i * staggerMs) / durationMs)),
      );
      setProgress(next.map(easeOutCubic));
      if (next.every((p) => p >= 1)) {
        setDone(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, reduceMotion]);

  const { width: W, height: H } = HERO_ART;

  return (
    <div
      ref={rootRef}
      className="ql-hero relative w-full"
      data-paused={paused ? "true" : "false"}
      style={{ containerType: "inline-size" }}
    >
      {/* Art box: overlays are positioned against exactly the image area. */}
      <div className="relative">
        <Image
          src="/home/hero.png"
          alt=""
          width={W}
          height={H}
          priority
          sizes="(min-width: 1024px) 620px, (min-width: 768px) 50vw, 100vw"
          className="h-auto w-full object-contain"
        />

        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          {/* Exhaust: fixed pool of puffs leaving the baked nozzle, opposite the rocket's heading.
            Rendered for everyone so server and client HTML match; globals.css hides it under
            prefers-reduced-motion. */}
          <div
            className="absolute"
            style={{ left: pct(NOZZLE.x, W), top: pct(NOZZLE.y, H) }}
          >
            {PUFFS.map(([delay, jitter, size, travel, blue], i) => {
              // Start a little past the nozzle so puffs never sit on the rocket body.
              const startOffset = 22;
              const perp = { x: EXHAUST_DIR.y, y: -EXHAUST_DIR.x };
              const sx = EXHAUST_DIR.x * startOffset;
              const sy = EXHAUST_DIR.y * startOffset;
              const ex = EXHAUST_DIR.x * travel + perp.x * jitter * 2.2;
              const ey = EXHAUST_DIR.y * travel + perp.y * jitter * 2.2;
              return (
                <span
                  key={i}
                  className="ql-anim ql-puff absolute left-0 top-0 rounded-full"
                  style={
                    {
                      width: cqw(size),
                      height: cqw(size),
                      // Same soft white-to-pale-blue shading as the painted clouds.
                      background: blue
                        ? "radial-gradient(circle at 36% 30%, #ffffff 0%, #e6f0ff 30%, #c4dbfa 56%, rgba(160,195,245,0.55) 66%, rgba(160,195,245,0) 72%)"
                        : "radial-gradient(circle at 36% 30%, #ffffff 0%, #f2f7ff 34%, #d3e4fb 58%, rgba(176,206,247,0.5) 67%, rgba(176,206,247,0) 73%)",
                      "--sx": cqw(sx),
                      "--sy": cqw(sy),
                      "--ex": cqw(ex),
                      "--ey": cqw(ey),
                      animation: `ql-puff ${PUFF_SECONDS}s cubic-bezier(0.2, 0.6, 0.35, 1) ${-(1 - delay) * PUFF_SECONDS}s infinite`,
                    } as React.CSSProperties
                  }
                />
              );
            })}
          </div>

          {/* Label: these are illustrative numbers, not a live feed */}
          <span
            className="ql-hero-pill absolute -translate-y-1/2 whitespace-nowrap rounded-full bg-[#EFF8FF] font-semibold uppercase text-[#0866FF]"
            style={{
              right: pct(W - 1008, W),
              top: pct(320, H),
              fontSize: "max(8px, 1.05cqw)",
              letterSpacing: "0.08em",
              padding: "0.35em 0.8em",
            }}
          >
            {HERO_DASHBOARD.label}
          </span>

          {/* Count-up numbers. Final value is rendered invisibly underneath so width never changes. */}
          {HERO_DASHBOARD.metrics.map((m, i) => {
            const pos = NUMBER_POS[m.key];
            const final = formatValue(m.value, m.format, m.decimals);
            const current = formatValue(
              m.format === "number" && !m.decimals
                ? Math.round(m.value * progress[i])
                : m.value * progress[i],
              m.format,
              m.decimals,
            );
            return (
              <span
                key={m.key}
                className="absolute grid font-extrabold leading-none text-[#07143F]"
                style={{
                  left: pct(pos.x, W),
                  top: pct(pos.y, H),
                  fontSize: cqw(30),
                  letterSpacing: "-0.03em",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <span className="invisible col-start-1 row-start-1">
                  {final}
                </span>
                <span className="col-start-1 row-start-1">{current}</span>
              </span>
            );
          })}

          {/* Dots riding the baked chart lines, then a soft endpoint pulse */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {paths.map(({ points, lengths }, i) => {
              const p = progress[i];
              const [x, y] = pointAt(points, lengths, p);
              const visible = started && (p > 0 || done);
              return (
                <g
                  key={HERO_DASHBOARD.metrics[i].key}
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: "opacity 300ms",
                  }}
                >
                  {done && (
                    <circle
                      className="ql-anim ql-dot-pulse"
                      cx={x}
                      cy={y}
                      r={7}
                      fill="#0866FF"
                      style={{ animationDelay: `${i * 0.4}s` }}
                    />
                  )}
                  <circle
                    cx={x}
                    cy={y}
                    r={6.5}
                    fill="#0866FF"
                    stroke="#ffffff"
                    strokeWidth={2.5}
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <p className="ql-hero-caption mt-1 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0866FF]">
        {HERO_DASHBOARD.label}
      </p>
    </div>
  );
}
