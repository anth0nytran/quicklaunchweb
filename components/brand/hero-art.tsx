"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Home hero scene. A generated launch-pad environment plate (Higgsfield) fills the
// hero; the QuickLaunchWeb ship stands on its pad.
// - Desktop with motion: the interactive 3D ship (three.js, loaded only there).
// - Everyone else (phones, reduced motion, Save-Data, no WebGL): the still ship
//   composited on the same plate. `?motion=1` previews 3D even with reduced motion.
// The plate is object-cover + centered; hero-rocket-3d.tsx maps the pad from the
// same plate, so keep PLATE there in sync with launchpad.webp.

const HeroRocket3D = dynamic(() => import("@/components/brand/hero-rocket-3d"), { ssr: false });

export const ROCKET_STILL = "/home/rocket-3d/rocket-still.webp";
const PLATE_LG = "/home/rocket-3d/launchpad.webp";
const PLATE_SM = "/home/rocket-3d/launchpad-sm.webp";

export function useHero3D() {
  const [mode, setMode] = useState<"pending" | "3d" | "flat">("pending");
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    const force = new URLSearchParams(window.location.search).get("motion") === "1";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches && !force;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }
    setMode(desktop && !reduce && !saveData && webgl ? "3d" : "flat");
  }, []);
  return mode;
}

/** Still ship standing on the plate's pad (pad center ~64.7% / 54.5% of the plate). */
function StillShipOnPad({ hidden = false }: { hidden?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={ROCKET_STILL}
      alt=""
      className={`pointer-events-none absolute left-[71.7%] top-[71.4%] h-[40%] w-auto -translate-x-1/2 -translate-y-[88%] drop-shadow-[0_18px_18px_rgba(7,20,63,0.25)] transition-opacity duration-700 ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
    />
  );
}

/** Plate (launchpad.webp) aspect and the glass sign's rect in plate fractions. Keep in sync with the plate. */
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {/* --hz is set by the 3D scene while it zooms in on a part, so the plate zooms with it. */}
      <img
        src={PLATE_LG}
        alt=""
        className="ql-hero-plate pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        style={{ transform: "var(--hz, none)", transformOrigin: "0 0" }}
      />
      {mode !== "pending" && <StillShipOnPad hidden={mode === "3d" && ready} />}
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

/** Phones / tablets: the pad cropped around the ship, below the copy. */
export function HeroSceneMobile() {
  return (
    <div className="relative mx-auto mt-8 aspect-[4/3] w-full max-w-[560px] overflow-hidden rounded-2xl lg:hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={PLATE_SM} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ROCKET_STILL}
        alt="The QuickLaunchWeb ship on its launch pad"
        className="absolute left-1/2 top-[58%] h-[70%] w-auto -translate-x-1/2 -translate-y-[88%] drop-shadow-[0_14px_14px_rgba(7,20,63,0.25)]"
      />
    </div>
  );
}
