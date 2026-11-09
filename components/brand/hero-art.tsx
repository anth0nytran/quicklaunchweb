"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";

// Home hero scene. A real-photo plaza (Higgsfield) fills the hero; the QuickLaunchWeb ship
// stands on its pad.
// Speed (Core Web Vitals) first:
// - Phones never download the desktop plate (<picture> with a desktop-only source).
// - Desktop shows the still ship at once and swaps in the interactive 3D ship when the
//   browser is idle, so three.js never competes with the first paint.
// - Phones get the still on the page plus an "Explore the ship" button that opens a
//   full-screen 3D viewer; three.js downloads only when someone taps it.
// The plate is object-cover + centered; hero-rocket-3d.tsx maps the pad from the same
// plate, so keep PLATE there in sync with launchpad.webp.

const HeroRocket3D = dynamic(() => import("@/components/brand/hero-rocket-3d"), { ssr: false });

export const ROCKET_STILL = "/home/rocket-3d/rocket-still.webp";
const PLATE_LG = "/home/rocket-3d/launchpad.webp";
const PLATE_LG_1600 = "/home/rocket-3d/launchpad-1600.webp";
const PLATE_SM = "/home/rocket-3d/launchpad-sm.webp";
const PLATE_SM_640 = "/home/rocket-3d/launchpad-sm-640.webp";
const ROCKET_STILL_480 = "/home/rocket-3d/rocket-still-480.webp";
const BLANK = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

function canRun3D() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function useHero3D() {
  const [mode, setMode] = useState<"pending" | "3d" | "flat">("pending");
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const desktop = mq.matches;
    // crossing the desktop size later (window resized) re-decides live
    const onChange = () => {
      const f = new URLSearchParams(window.location.search).get("motion") === "1";
      const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches && !f;
      setMode((m) => (mq.matches && !r && m === "flat" && canRun3D() ? "3d" : m));
    };
    mq.addEventListener("change", onChange);
    const force = new URLSearchParams(window.location.search).get("motion") === "1";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches && !force;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (!(desktop && !reduce && !saveData && canRun3D())) return setMode("flat");
    // Wait for an idle moment after load so the 3D never slows the first paint.
    const start = () => setMode("3d");
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const kick = () => (w.requestIdleCallback ? w.requestIdleCallback(start, { timeout: 2500 }) : window.setTimeout(start, 1200));
    if (document.readyState === "complete") kick();
    else window.addEventListener("load", kick, { once: true });
  }, []);
  return mode;
}

/** Still ship standing on the plate's pad. */
function StillShipOnPad({ hidden = false }: { hidden?: boolean }) {
  return (
    // Desktop-only source: phones get a 1px placeholder and don't fetch this.
    <picture>
      <source media="(min-width: 1024px)" srcSet={ROCKET_STILL} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
      src={BLANK}
      alt=""
      fetchPriority="high"
      className={`ql-d-ship pointer-events-none absolute w-auto drop-shadow-[0_18px_18px_rgba(7,20,63,0.25)] transition-opacity duration-700 ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
      />
    </picture>
  );
}

/** Plate (launchpad.webp) aspect and the glass sign's rect in plate fractions. Keep in sync with the plate
 *  and with the .ql-sign rules in globals.css (which place the copy with pure CSS, no layout shift). */
const PLATE_ASPECT = 3856 / 2160;
export const SIGN = { x0: 0.036, y0: 0.348, x1: 0.371, y1: 0.679 };

/** The sign's rect in px inside a W x H box showing the plate object-cover + centered. */
export function signRect(W: number, H: number) {
  const dispH = Math.max(W / PLATE_ASPECT, H);
  const dispW = dispH * PLATE_ASPECT;
  const ox = (W - dispW) / 2;
  const oy = (H - dispH) / 2;
  return {
    left: ox + SIGN.x0 * dispW,
    top: oy + SIGN.y0 * dispH,
    width: (SIGN.x1 - SIGN.x0) * dispW,
    height: (SIGN.y1 - SIGN.y0) * dispH,
  };
}

/** Desktop: full-bleed plate (glass sign left, pad right) + ship (3D or still). Fills its positioned parent. */
export function HeroScene({ mode }: { mode: "pending" | "3d" | "flat" }) {
  const [ready, setReady] = useState(false);
  return (
    <div className="absolute inset-0 hidden lg:block">
      {/* --hz is set by the 3D scene while it zooms in on a part, so the plate zooms with it.
          Desktop-only source: phones get a 1px placeholder and never fetch the big plate. */}
      <picture>
        <source media="(min-width: 1024px)" srcSet={`${PLATE_LG_1600} 1600w, ${PLATE_LG} 2560w`} sizes="100vw" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BLANK}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="ql-hero-plate pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
          style={{ transform: "var(--hz, none)", transformOrigin: "0 0" }}
        />
      </picture>
      <StillShipOnPad hidden={mode === "3d" && ready} />
      {mode === "3d" && (
        <div className="absolute inset-0">
          <HeroRocket3D onReady={() => window.setTimeout(() => setReady(true), 200)} />
        </div>
      )}
      {/* Fade to white at the bottom ends the hero cleanly. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />
    </div>
  );
}

const PLAZA_PORTRAIT = "/home/rocket-3d/plaza-portrait.webp";
const PLAZA_PORTRAIT_750 = "/home/rocket-3d/plaza-portrait-750.webp";

/** The phone scene: the vertical plaza filling the screen. Placement of everything on it is pure CSS
 *  (.ql-m-* in globals.css), so the hero, the still ship and the 3D view line up pixel for pixel. */
function PhonePlaza({ priority = false }: { priority?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={PLAZA_PORTRAIT}
      srcSet={`${PLAZA_PORTRAIT_750} 750w, ${PLAZA_PORTRAIT} 1170w`}
      sizes="100vw"
      alt=""
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className="ql-hero-plate pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
      style={{ transform: "var(--hz, none)", transformOrigin: "0 0" }}
    />
  );
}

/** Phones: stepping into the scene. Opens over the hero with the same plaza and the ship in the same
 *  spot, so the text simply clears away and the ship comes alive. three.js loads only now. */
function MobileShipViewer({ onClose }: { onClose: () => void }) {
  const [plateSpec, setPlateSpec] = useState<import("@/components/brand/hero-rocket-3d").PlateSpec | null>(null);
  const [live, setLive] = useState(false);
  useEffect(() => {
    // tablets and sideways phones show the whole photo (CSS: object-fit contain), so the 3D must use the same fit
    const contain = window.matchMedia("(min-width: 640px), (orientation: landscape)").matches;
    import("@/components/brand/hero-rocket-3d").then((m) => setPlateSpec({ ...m.PLATE_PORTRAIT, fit: contain ? "contain" : "cover" }));
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Explore the QuickLaunchWeb ship"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="fixed inset-x-0 top-0 z-[2147483000] h-[100svh] overflow-hidden bg-[#E9E9E6] text-[#07143F]"
      // Portaled into <body>, outside BrandShell, so set the brand font here.
      style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
    >
      <div data-hero-stage className="ql-m-stage absolute inset-0">
        <PhonePlaza />
        {/* the ship flies back in from the top and lands on the pad (the hero's ship just launched away) */}
        {plateSpec && <HeroRocket3D plate={plateSpec} compact onExit={onClose} onReady={() => window.setTimeout(() => setLive(true), 250)} />}
        {!live && (
          <p className="ql-m-pill absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/85 px-4 py-2 text-[13px] font-semibold text-[#07143F]/70 backdrop-blur">
            Incoming…
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={onClose}
        data-hotspot
        className="absolute right-4 top-[max(16px,env(safe-area-inset-top))] z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#07143F] shadow-md backdrop-blur"
        aria-label="Close and go back"
      >
        <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M5 5l10 10M15 5L5 15" />
        </svg>
      </button>
    </motion.div>
  );
}

/** Phones / tablets: the hero IS the scene. Full-screen vertical plaza behind the copy, a big ship on the
 *  pad; tap the ship to step in and play with it. Renders behind the hero copy (absolute, inset-0). */
export function HeroSceneMobile() {
  const [open, setOpen] = useState(false);
  const [can3d, setCan3d] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setCan3d(canRun3D());
    setMounted(true);
  }, []);
  // Step in: back to the top first so the scene lines up exactly with the viewer, then open.
  const enter = () => {
    const go = () => {
      document.documentElement.dataset.exploring = "1"; // CSS launches the ship up and out, text clears
      window.setTimeout(() => setOpen(true), 520);
    };
    if (window.scrollY > 4) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.setTimeout(go, 450);
    } else go();
  };
  const leave = () => {
    delete document.documentElement.dataset.exploring;
    setOpen(false);
  };
  // Depth as you scroll: --hp goes 0 -> 1 over the first screen (CSS moves the layers at different rates).
  useEffect(() => {
    if (window.matchMedia("(min-width: 1024px), (prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => root.style.setProperty("--hp", String(Math.min(1, window.scrollY / window.innerHeight))));
    };
    window.addEventListener("scroll", on, { passive: true });
    on();
    return () => {
      window.removeEventListener("scroll", on);
      cancelAnimationFrame(raf);
    };
  }, []);
  // Warm up the 3D code the moment a finger touches the button (saves a beat on open).
  const warm = () => void import("@/components/brand/hero-rocket-3d");
  return (
    <>
      {/* back layer: the plaza (the headline is printed on its glass, between the layers) */}
      <div className="ql-m-stage absolute inset-0 lg:hidden">
        <PhonePlaza priority />
      </div>
      {/* front layer: the ship stands in front of the sign */}
      <div className="ql-m-stage ql-m-fg pointer-events-none absolute inset-0 z-20 lg:hidden">
        <button
          type="button"
          onClick={can3d ? enter : undefined}
          onPointerDown={can3d ? warm : undefined}
          className="ql-m-ship pointer-events-auto absolute block"
          aria-label={can3d ? "Explore the QuickLaunchWeb ship in 3D" : "The QuickLaunchWeb ship on its launch pad"}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ROCKET_STILL_480}
            srcSet={`${ROCKET_STILL_480} 319w, ${ROCKET_STILL} 680w`}
            sizes="45vw"
            alt=""
            decoding="async"
            className="h-full w-auto drop-shadow-[0_14px_14px_rgba(7,20,63,0.25)]"
          />
        </button>
        {can3d && (
          <button
            type="button"
            onClick={enter}
            onPointerDown={warm}
            className="ql-m-pill ql-hero-copy pointer-events-auto absolute left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-white/90 px-4 py-2 text-[13.5px] font-semibold text-[#07143F] shadow-[0_8px_24px_-12px_rgba(7,20,63,0.45)] backdrop-blur"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#0866FF]/50" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-[#0866FF]" />
            </span>
            Tap the ship to explore
          </button>
        )}
      </div>
      {/* Rendered straight into <body> so nothing on the page (header, sticky button) can sit on top of it. */}
      {mounted && createPortal(<AnimatePresence>{open && <MobileShipViewer onClose={leave} />}</AnimatePresence>, document.body)}
    </>
  );
}
