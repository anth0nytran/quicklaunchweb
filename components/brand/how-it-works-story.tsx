"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Eyebrow, Reveal } from "@/components/brand/primitives";
import { container, primaryBtn, sectionH2 } from "@/components/brand/tokens";
import { STEP_VISUALS } from "@/components/brand/step-visuals";

// "How it works": the brand rocket (Higgsfield render, engine firing, looped)
// starts parked under the section heading. As you scroll it glides to each
// step and parks on top of that step's card for a stretch of scrolling (engine
// cut), which reveals the card and plays its sequence. Then it glides on. At the
// bottom it lands on the QuickLaunchWeb pad and the city behind powers on. Its
// position eases toward a line in the viewport: no pinning, no scroll-jacking.
// Layering: trail < step text < rocket < cards.
// Desktop only for the flight; reduced motion gets a still landing scene, mobile
// gets plain stacked steps (cards play when in view). All copy is real HTML.

export type StoryStep = { title: string; body: string };

const YOUR_PART = [
  "One strategy call. About an hour.",
  "Show up on one job. We film it.",
  "Nothing. We run the tests.",
  "Show up to the estimates.",
  "Read one page on Monday.",
];

const STAGE_H = 340;
// Half the scroll distance (px) the rocket stays parked on each card.
const DWELL = 150;
const ROCKET_W = 180;
const ROCKET_H = Math.round(ROCKET_W * 1.667);
// Rocket image anchor (the transform origin) sits at 30% of its height; the fins end at ~57%.
const ANCHOR_TO_FINS = Math.round(ROCKET_H * 0.27);
const THRUST_FRAMES = 24;
const thrustSrc = (i: number) => `/home/rocket-thrust/t-${String(i + 1).padStart(2, "0")}.webp?v=4`;

type Sample = { l: number; x: number; y: number };
type Geo = { w: number; h: number; d: string; startY: number; dockYs: number[]; landY: number };

/** Broadcasts how far the rocket has got: -1 = not started, 0..3 = reached step i, 4 = landed. */
function emitReached(n: number) {
  window.dispatchEvent(new CustomEvent("ql:reached", { detail: n }));
}

function Flight({ wrapRef, fly }: { wrapRef: React.RefObject<HTMLDivElement>; fly: boolean }) {
  const [geo, setGeo] = useState<Geo | null>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const samplesRef = useRef<Sample[]>([]);

  // Path in real pixels: launch point (under the heading) -> above each card -> down onto the pad.
  useEffect(() => {
    if (!fly) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const build = () => {
      const box = wrap.getBoundingClientRect();
      const launch = wrap.querySelector<HTMLElement>("[data-launch]");
      const lr = launch?.getBoundingClientRect();
      const start = { x: box.width / 2, y: lr ? lr.bottom - box.top + 80 : 0 };
      // Measure each card at rest (its stage is never transformed; the card is centred in it),
      // so the scroll-linked drift at build time doesn't skew the dock points.
      const pts = Array.from(wrap.querySelectorAll<HTMLElement>("[data-screen]")).map((stage) => {
        const r = stage.getBoundingClientRect();
        const card = stage.querySelector<HTMLElement>("[data-card]");
        const cardTop = r.top - box.top + r.height / 2 - (card?.offsetHeight ?? 300) / 2;
        // Docked just above the card: whole body in the clear, fins + flame tucked behind the top edge.
        return { x: r.left - box.left + r.width / 2, y: cardTop - ANCHOR_TO_FINS + 14 };
      });
      if (!pts.length) return;
      const dockYs = pts.map((p) => p.y);
      const pad = wrap.querySelector<HTMLElement>("[data-pad]");
      if (pad) {
        const pr = pad.getBoundingClientRect();
        // Landing surface centre of the pad render is ~42% down the image.
        pts.push({ x: pr.left - box.left + pr.width / 2, y: pr.top - box.top + pr.height * 0.42 - ANCHOR_TO_FINS });
      } else {
        pts.push({ x: box.width / 2, y: box.height - 200 });
      }
      let prev = start;
      let d = `M ${prev.x} ${prev.y}`;
      for (const pt of pts) {
        const dy = pt.y - prev.y;
        // Short smooth dip off the card it was on, then a long swing across the open
        // middle, dropping onto the next card from straight above (arrives upright).
        d += ` C ${prev.x} ${prev.y + dy * 0.2}, ${pt.x} ${pt.y - dy * 0.68}, ${pt.x} ${pt.y}`;
        prev = pt;
      }
      setGeo({ w: box.width, h: box.height, d, startY: start.y, dockYs, landY: pts[pts.length - 1].y });
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [fly, wrapRef]);

  // Sample the path (y only increases along it, so lookups are a binary search).
  useEffect(() => {
    const path = pathRef.current;
    if (!path || !geo) return;
    const len = path.getTotalLength();
    const n = 1200;
    samplesRef.current = Array.from({ length: n + 1 }, (_, i) => {
      const l = (len * i) / n;
      const pt = path.getPointAtLength(l);
      return { l, x: pt.x, y: pt.y };
    });
    if (trailRef.current) {
      trailRef.current.style.strokeDasharray = `${len} ${len}`;
      trailRef.current.style.strokeDashoffset = `${len}`;
    }
  }, [geo]);

  // Scroll -> rocket. A continuous rAF loop eases toward the target, so the
  // rocket glides (it keeps settling for a moment after you stop scrolling).
  useEffect(() => {
    if (!fly || !geo) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    let raf = 0;
    let running = false;
    let curL = -1;
    let angle = 0;
    let reached = -2;
    let engineOff = false;
    // Piecewise map from scroll position to path height with a flat step at each dock.
    const knotsIn: number[] = [geo.startY];
    const knotsOut: number[] = [geo.startY];
    geo.dockYs.forEach((dy) => {
      knotsIn.push(dy - DWELL, dy + DWELL);
      knotsOut.push(dy, dy);
    });
    knotsIn.push(geo.landY);
    knotsOut.push(geo.landY);
    for (let i = 1; i < knotsIn.length; i++) knotsIn[i] = Math.max(knotsIn[i], knotsIn[i - 1] + 1);
    const dwellMap = (v: number) => {
      if (v <= knotsIn[0]) return knotsOut[0];
      for (let i = 1; i < knotsIn.length; i++) {
        if (v <= knotsIn[i]) {
          const t = (v - knotsIn[i - 1]) / (knotsIn[i] - knotsIn[i - 1]);
          const e = t * t * (3 - 2 * t); // ease in/out between stops
          return knotsOut[i - 1] + (knotsOut[i] - knotsOut[i - 1]) * e;
        }
      }
      return knotsOut[knotsOut.length - 1];
    };
    const byY = (y: number) => {
      const s = samplesRef.current;
      let lo = 0;
      let hi = s.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (s[mid].y < y) lo = mid + 1;
        else hi = mid;
      }
      return s[lo];
    };
    const byL = (l: number) => {
      const s = samplesRef.current;
      const total = s[s.length - 1].l || 1;
      return s[Math.min(s.length - 1, Math.max(0, Math.round((l / total) * (s.length - 1))))];
    };
    const tick = () => {
      const s = samplesRef.current;
      const rocket = rocketRef.current;
      if (!s.length || !rocket) {
        running = false;
        return;
      }
      const total = s[s.length - 1].l;
      const dockLs = geo.dockYs.map((y) => byY(y).l);
      // Tracking line at 48% of the viewport; before it reaches the launch point the rocket waits.
      const track = Math.max(geo.startY, window.innerHeight * 0.48 - wrap.getBoundingClientRect().top);
      // Dwell: the rocket parks on each card for 2*DWELL px of scrolling, then glides to the next.
      const targetL = byY(dwellMap(track)).l;
      curL = curL < 0 ? targetL : curL + (targetL - curL) * 0.06;
      const p = byL(curL);
      const q = byL(curL + 10);
      const r = byL(Math.max(0, curL - 10));
      const landed = curL > total - 6;
      // The page scrolls up past the rocket, so on screen it climbs: nose up, leaning the way it travels.
      const want = curL < 2 || landed ? 0 : (Math.atan2(-(q.y - r.y) * 0.35, q.x - r.x) * 180) / Math.PI + 90;
      angle += (want - angle) * 0.12;
      rocket.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -30%) rotate(${angle}deg)`;
      if (trailRef.current) trailRef.current.style.strokeDashoffset = `${total - curL}`;

      // Which step has the rocket arrived at? (Arrival reveals that step's card.)
      let n = -1;
      dockLs.forEach((l, i) => {
        if (curL >= l - 8) n = i;
      });
      if (landed) n = dockLs.length;
      if (n !== reached) {
        reached = n;
        wrap.dataset.landed = landed ? "true" : "false";
        emitReached(n);
      }
      // Engine cuts while parked on a card or on the pad; fires again when it moves on.
      const parked = landed || dockLs.some((l) => Math.abs(curL - l) < 6);
      if (parked !== engineOff) {
        engineOff = parked;
        if (imgRef.current) imgRef.current.style.clipPath = parked ? "inset(0 0 44.5% 0)" : "inset(0 0 0% 0)";
      }

      if (Math.abs(targetL - curL) > 0.3 || Math.abs(want - angle) > 0.2) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };
    const kick = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      cancelAnimationFrame(raf);
    };
  }, [fly, geo, wrapRef]);

  // Engine thrust loop: plays only while the section is on screen.
  useEffect(() => {
    if (!fly) return;
    for (let i = 0; i < THRUST_FRAMES; i++) new Image().src = thrustSrc(i);
    const el = wrapRef.current;
    let timer = 0;
    let f = 0;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(timer);
      if (!e.isIntersecting) return;
      timer = window.setInterval(() => {
        f = (f + 1) % THRUST_FRAMES;
        if (imgRef.current) imgRef.current.src = thrustSrc(f);
      }, 1000 / 24);
    });
    if (el) io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [fly, wrapRef]);

  if (!fly || !geo) return null;
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {/* Trail sits under the step text; the rocket flies above the text but under the cards. */}
      <svg width={geo.w} height={geo.h} className="absolute inset-0 z-0 overflow-visible">
        <defs>
          <linearGradient id="ql-trail" x1="0" y1="0" x2="0" y2={geo.h} gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#0866FF" stopOpacity="0.2" />
            <stop offset="1" stopColor="#0866FF" stopOpacity="0.75" />
          </linearGradient>
        </defs>
        <path ref={pathRef} d={geo.d} fill="none" stroke="#C9D6E8" strokeWidth={1.5} strokeDasharray="2 8" strokeLinecap="round" />
        <path ref={trailRef} d={geo.d} fill="none" stroke="url(#ql-trail)" strokeWidth={2.5} strokeLinecap="round" />
      </svg>
      <div
        ref={rocketRef}
        className="absolute left-0 top-0 z-[5]"
        style={{ width: ROCKET_W, transformOrigin: "50% 30%", willChange: "transform" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={thrustSrc(0)}
          alt=""
          width={ROCKET_W}
          height={ROCKET_H}
          className="block h-auto w-full"
          style={{ transition: "clip-path .5s cubic-bezier(.22,1,.36,1)" }}
        />
      </div>
    </div>
  );
}

/** Bottom of the section: the QuickLaunchWeb pad in front of a city that powers on when the rocket lands. */
function LandingScene({ still }: { still: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const sp = useSpring(scrollYProgress, { stiffness: 80, damping: 22 });
  const cityY = useTransform(sp, [0, 1], [90, 0]);
  const farY = useTransform(sp, [0, 1], [140, 0]);
  return (
    <div ref={ref} className="pointer-events-none absolute inset-x-0 bottom-0 z-0 hidden h-[520px] lg:block" aria-hidden="true">
      {/* Far haze layer (slowest): a soft blue glow that brightens on landing. */}
      <motion.div
        style={still ? undefined : { y: farY }}
        className="absolute inset-x-[10%] bottom-[60px] h-[260px] rounded-[50%] bg-[radial-gradient(closest-side,rgba(8,102,255,0.16),transparent)] opacity-40 transition-opacity duration-1000 group-data-[landed=true]:opacity-100"
      />
      {/* City: unlit and lit renders crossfade when the rocket lands. */}
      <motion.div
        style={{
          ...(still ? {} : { y: cityY }),
          x: "-50%",
          maskImage: "linear-gradient(to top, #000 22%, transparent 60%)",
          WebkitMaskImage: "linear-gradient(to top, #000 22%, transparent 60%)",
        }}
        className="absolute bottom-[96px] left-1/2 w-[1120px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/home/how/city.webp" alt="" width={1120} height={480} className="block h-auto w-full opacity-60" loading="lazy" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/home/how/city-lit.webp"
          alt=""
          width={1120}
          height={480}
          loading="lazy"
          className="absolute inset-0 block h-auto w-full opacity-0 transition-opacity duration-[1400ms] ease-out group-data-[landed=true]:opacity-100"
        />
      </motion.div>
      {/* Ground: the city's base fades into the section background, so there is no hard edge. */}
      <div className="absolute inset-x-0 bottom-0 h-[250px] bg-[linear-gradient(to_top,#fff_0%,#fff_52%,rgba(255,255,255,0)_100%)]" />
      {/* Ground glow under the pad. */}
      <div className="absolute bottom-[-10px] left-1/2 h-[120px] w-[760px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(8,102,255,0.14),transparent)]" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        data-pad
        src="/home/how/pad.webp"
        alt=""
        width={420}
        height={238}
        loading="lazy"
        className="absolute bottom-[10px] left-1/2 block h-auto w-[420px] -translate-x-1/2 drop-shadow-[0_24px_30px_rgba(7,20,63,0.18)] transition-[filter] duration-700 group-data-[landed=true]:drop-shadow-[0_0_40px_rgba(8,102,255,0.45)]"
      />
      {still && (
        // Reduced motion: no flight, just the rocket parked on the pad (engine off).
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={thrustSrc(0)}
          alt=""
          width={ROCKET_W}
          height={ROCKET_H}
          className="absolute bottom-[5px] left-1/2 block h-auto -translate-x-1/2"
          style={{ width: ROCKET_W, clipPath: "inset(0 0 44.5% 0)" }}
        />
      )}
    </div>
  );
}

function StepRow({ step, i, total, fly }: { step: StoryStep; i: number; total: number; fly: boolean }) {
  const rowRef = useRef<HTMLLIElement>(null);
  const [inView, setInView] = useState(false);
  const [reached, setReached] = useState(-1);
  const Visual = STEP_VISUALS[i];
  const flip = i % 2 === 1;
  // With the flight, a step reveals when the rocket parks on it; otherwise when it scrolls into view.
  const done = fly ? reached >= i : inView;
  const here = fly && reached === i;

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "-25% 0px -25% 0px" });
    io.observe(el);
    const onReached = (e: Event) => setReached((e as CustomEvent<number>).detail);
    window.addEventListener("ql:reached", onReached);
    return () => {
      io.disconnect();
      window.removeEventListener("ql:reached", onReached);
    };
  }, []);

  return (
    <li ref={rowRef} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
      <div className={`relative z-[1] transition-opacity duration-700 ${fly && !done ? "opacity-45" : "opacity-100"} ${flip ? "lg:order-2" : ""}`}>
        <p className="flex items-center gap-2 font-mono text-[12px] font-semibold tracking-[0.14em]">
          <span
            className={`inline-flex h-6 items-center justify-center rounded-full px-2.5 transition-colors duration-500 ${
              done ? "bg-[#0866FF] text-white" : "bg-[#E8F0FE] text-[#0866FF]"
            }`}
          >
            STEP 0{i + 1}
          </span>
          <span className="text-[#A3ADBF]">/ 0{total}</span>
        </p>
        <h3 className="mt-3 text-[24px] font-extrabold leading-tight tracking-[-0.02em] text-[#07143F] sm:text-[30px]">{step.title}</h3>
        <p className="mt-3 max-w-md text-[16px] leading-[1.6] text-[#46516B] sm:text-[17px]">{step.body}</p>
        <p className="mt-5 inline-flex flex-wrap items-center gap-x-2 rounded-lg border border-[#E3E9F2] bg-white px-3 py-2 text-[14px] text-[#46516B]">
          <span className="font-semibold text-[#07143F]">Your part:</span> {YOUR_PART[i]}
        </p>
      </div>
      <div data-screen className={`relative flex items-center justify-center ${flip ? "lg:order-1" : ""}`} aria-hidden="true">
        <div className="hidden lg:block" style={{ height: STAGE_H }} />
        <div className="relative z-20 flex w-full justify-center lg:absolute lg:inset-0 lg:items-center">
          {/* Before the rocket arrives the card waits dimmed; it reveals the moment the rocket parks on it. */}
          <div
            data-card
            className={`relative w-full max-w-[380px] rounded-2xl transition-[opacity,transform,filter,box-shadow] duration-700 ease-out ${
              fly && !done ? "translate-y-2 scale-[0.97] opacity-40 grayscale" : "opacity-100"
            } ${here ? "shadow-[0_0_0_1.5px_rgba(8,102,255,0.5),0_28px_60px_-28px_rgba(8,102,255,0.5)]" : ""}`}
          >
            <Visual active={done} />
          </div>
        </div>
      </div>
    </li>
  );
}

export function HowItWorksStory({ steps }: { steps: StoryStep[] }) {
  const flightRef = useRef<HTMLDivElement>(null);
  const [fly, setFly] = useState(false);
  const [scene, setScene] = useState(false);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    // `?motion=1` previews the full flight even when the OS asks for reduced motion.
    const force = new URLSearchParams(window.location.search).get("motion") === "1";
    const ok =
      desktop &&
      (force || !window.matchMedia("(prefers-reduced-motion: reduce)").matches) &&
      !(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    setFly(ok);
    // The landing scene shows on every desktop; without the flight it's a still (rocket parked, city lit).
    setScene(desktop);
  }, []);

  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-white via-[#F1F7FF] to-white py-16 sm:py-20 lg:pb-0 lg:pt-24"
      aria-labelledby="how-title"
    >
      {/* Faint dot grid, fading out at the edges (same family as the hero). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage: "radial-gradient(#D5E0EF 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(70% 60% at 50% 45%, #000 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(70% 60% at 50% 45%, #000 30%, transparent 100%)",
        }}
      />
      <div className={`${container} relative`}>
        <div ref={flightRef} data-landed={scene && !fly ? "true" : "false"} className="group relative">
          {scene && <LandingScene still={!fly} />}
          <Flight wrapRef={flightRef} fly={fly} />
          <Reveal className="relative z-10 mx-auto max-w-2xl text-center">
            <Eyebrow>How It Works</Eyebrow>
            <h2 id="how-title" className={`mt-3 text-[#07143F] ${sectionH2}`}>Five Steps to Launch.</h2>
            <p data-launch className="mx-auto mt-3 max-w-xl text-[16px] leading-[1.5] text-[#46516B] sm:text-[18px]">
              About an hour of your time the first week. We do the rest.
            </p>
          </Reveal>
          <ol className="relative mt-12 space-y-16 pb-10 lg:mt-[240px] lg:space-y-24 lg:pb-[330px]">
            {steps.map((step, i) => (
              <StepRow key={step.title} step={step} i={i} total={steps.length} fly={fly} />
            ))}
          </ol>
          {/* Next step at the payoff moment: beside the pad on desktop (fades in on touchdown), after the steps on phones. */}
          <div
            className={`relative z-10 mt-2 text-center transition-all duration-700 lg:absolute lg:bottom-[70px] lg:left-0 lg:mt-0 lg:max-w-[330px] lg:rounded-2xl lg:bg-white/75 lg:p-5 lg:text-left lg:backdrop-blur-sm ${
              fly ? "lg:translate-y-3 lg:opacity-0 lg:group-data-[landed=true]:translate-y-0 lg:group-data-[landed=true]:opacity-100" : ""
            }`}
          >
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0866FF]">Your turn</p>
            <p className="mt-2 text-[22px] font-extrabold leading-tight tracking-[-0.02em] text-[#07143F]">Ready to launch?</p>
            <p className="mt-2 text-[15px] leading-[1.5] text-[#46516B]">On a free call we map your offer, your areas, and your first ads.</p>
            <a href="#book" className={`${primaryBtn} mt-5 px-6 py-3 text-[15px]`}>
              Book a Free Call
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
