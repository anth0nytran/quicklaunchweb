"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Html, Lightformer } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import * as THREE from "three";
import { PARTS, ShipHybrid, partAnchor, useShipProfile, type ShipRig } from "@/components/brand/ship-hybrid";
import { useBooking } from "@/components/booking/booking-context";

// Interactive 3D hero ship (home page, desktop). Igloo-inspired.
// - The ship (Higgsfield image-to-3D GLB) lands on the launch pad painted in the hero's
//   plate (launchpad.webp, object-cover). The pad is mapped from the plate to the screen
//   and onto the 3D ground, so the ship always stands on it at any window size.
// - Intro: the ship lands (fade in high, controlled burn, touchdown pulse on the pad).
// - Each numbered tag is one step of what we do. Click one and:
//     the ship turns that part toward you, the hull goes to an x-ray wireframe,
//     the part opens, the whole scene zooms in on it (3D camera view offset + the same
//     zoom on the plate, so the ship never slides off its pad), and a panel slides in.
//   Close (X, Esc, click outside, or scroll) zooms back out. Next/Back walk the steps.
// - Scroll-linked lift-off: reads window.scrollY only; never blocks or hijacks scrolling.

/** Plate (launchpad.webp) aspect and the pad's center / left / right edge in plate fractions. */
export type PlateSpec = { aspect: number; cx: number; cy: number; left: number; right: number };
/** Desktop hero plate (launchpad.webp): aspect + the pad's center / left / right edge in plate fractions. */
export const PLATE: PlateSpec = { aspect: 3856 / 2160, cx: 0.717, cy: 0.714, left: 0.454, right: 0.979 };
/** Phone viewer plate (launchpad-sm.webp, a 4:3 crop around the pad). */
export const PLATE_SM: PlateSpec = { aspect: 4 / 3, cx: 0.502, cy: 0.54, left: -0.084, right: 1.087 };
/** Phone plate (plaza-portrait.webp, 2160x3856): the pad's center and rim. Keep in sync with the mobile CSS in globals.css. */
export const PLATE_PORTRAIT: PlateSpec = { aspect: 2160 / 3856, cx: 0.5, cy: 0.69, left: 0.02, right: 0.98 };
/** Ship height as a fraction of the pad's diameter. */
const SHIP_TO_PAD = 0.42;
/** Phone: ship size relative to the pad (matched to the still on the phone hero). */
const SHIP_SCALE_COMPACT = 1.7;
const INTRO_S = 2.6;
/** Start height of the landing, in ship heights above the pad. */
const DROP = 1.1;
/** How far the camera zooms in on an open part, and where on screen that part lands. */
const ZOOM = 1.45;
const FOCUS_AT = { x: 0.66, y: 0.56 };
/** Phone viewer: the part sits centered, above the step sheet. */
const FOCUS_AT_COMPACT = { x: 0.5, y: 0.24 };
const SHIP_MID = new THREE.Vector3(0, 0.5, 0);

/** The five steps, written so anyone gets it in one read. */
export const STEPS = [
  {
    n: "01",
    tag: "Plan",
    title: "We make a plan",
    line: "We talk with you. We learn what jobs you want and where.",
    points: ["We find what makes you the best pick.", "We pick the towns you want to work in.", "You get a clear plan before we spend a dollar."],
  },
  {
    n: "02",
    tag: "Video",
    title: "We film you",
    line: "Our crew comes to your job and films you at work.",
    points: ["We write the script for you.", "Real jobs. Real you. No actors.", "You get videos and photos to keep."],
  },
  {
    n: "03",
    tag: "Ads",
    title: "We run your ads",
    line: "We put your videos in front of homeowners near you.",
    points: ["Ads on Facebook and Instagram.", "Only in the towns you pick.", "We handle it. You keep working."],
  },
  {
    n: "04",
    tag: "Testing",
    title: "We test to find the winner",
    line: "We try different ads to see which one gets the most calls.",
    points: ["Each ad talks to a different kind of homeowner.", "We keep the ones that work.", "Then we keep making them better."],
  },
  {
    n: "05",
    tag: "Booked jobs",
    title: "You get booked jobs",
    line: "When a homeowner reaches out, we text them in seconds and book the job.",
    points: ["Our team books it, or your office does.", "It shows up on your calendar.", "We train your team to close more, the simple way."],
  },
] as const;

type Shared = {
  pointer: { x: number; y: number };
  drag: { active: boolean; vx: number; spin: number };
  scroll: number;
  thrust: number;
  introDone: boolean;
};

/** Plate fraction -> screen fraction for an object-cover, centered image in a W x H box. */
function plateToScreen(px: number, py: number, W: number, H: number, plate: PlateSpec = PLATE) {
  const dispH = Math.max(W / plate.aspect, H);
  const dispW = plate.aspect * dispH;
  return { x: ((W - dispW) / 2 + px * dispW) / W, y: ((H - dispH) / 2 + py * dispH) / H };
}

function Hotspot({
  position,
  outward,
  n,
  tag,
  visible,
  onOpen,
  onHover,
}: {
  position: THREE.Vector3;
  outward: THREE.Vector3;
  n: string;
  tag: string;
  visible: boolean;
  onOpen: () => void;
  onHover: (on: boolean) => void;
}) {
  const anchor = useRef<THREE.Group>(null);
  const el = useRef<HTMLDivElement>(null);
  const { camera } = useThree();
  const world = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const out = useMemo(() => new THREE.Vector3(), []);

  // Fade with how much the tag's side faces the camera.
  useFrame(() => {
    const a = anchor.current;
    const node = el.current;
    if (!a || !node || !a.parent) return;
    a.getWorldPosition(world);
    out.copy(outward).transformDirection(a.parent.matrixWorld);
    dir.copy(camera.position).sub(world).normalize();
    // visible unless the dot is right behind the ship
    let o = Math.max(0, Math.min(1, (out.dot(dir) + 0.75) / 0.3));
    if (!visible) o = 0;
    node.style.opacity = String(o);
    node.style.pointerEvents = o > 0.5 ? "auto" : "none";
  });

  return (
    <group ref={anchor} position={position}>
      <Html zIndexRange={[30, 0]} style={{ pointerEvents: "none", transform: "translate(-7px, -7px)" }}>
        <div ref={el} data-hotspot style={{ opacity: 0, transition: "opacity .35s" }} onPointerEnter={() => onHover(true)} onPointerLeave={() => onHover(false)}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className="group flex items-center focus:outline-none"
            aria-label={`Step ${n}: ${tag}. Open details`}
          >
            <span className="relative flex h-3.5 w-3.5 items-center justify-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#0866FF]/40 [animation-duration:2.6s]" />
              <span className="relative h-2.5 w-2.5 rounded-full border-2 border-white bg-[#0866FF] shadow-[0_0_10px_rgba(8,102,255,0.8)] transition-transform group-hover:scale-125" />
            </span>
            <span className="ml-2 h-px w-5 bg-[#07143F]/30 transition-all group-hover:w-7 group-hover:bg-[#0866FF]" />
            <span className="ml-1.5 whitespace-nowrap rounded-full border border-[#07143F]/10 bg-white/90 px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#07143F] shadow-[0_4px_14px_-6px_rgba(7,20,63,0.3)] backdrop-blur transition-colors group-hover:border-[#0866FF]/40 group-hover:text-[#0866FF]">
              <span className="text-[#0866FF]">{n}</span> {tag}
            </span>
          </button>
        </div>
      </Html>
    </group>
  );
}

function Ship({
  shared,
  openIdx,
  setOpenIdx,
  stage,
  onReady,
  onLanded,
  plate,
  compact,
  skipIntro = false,
}: {
  shared: React.MutableRefObject<Shared>;
  openIdx: number | null;
  setOpenIdx: (i: number | null) => void;
  stage: React.MutableRefObject<HTMLElement | null>;
  onReady?: () => void;
  onLanded?: () => void;
  plate: PlateSpec;
  compact: boolean;
  skipIntro?: boolean;
}) {
  const { camera, size } = useThree();
  const focusAt = compact ? FOCUS_AT_COMPACT : FOCUS_AT;
  const base = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);
  const [introDone, setIntroDone] = useState(false);
  const introT = useRef(skipIntro ? 0.999 : -0.45); // waits for the sign to light up first
  const hovering = useRef(false);
  const prof = useShipProfile();
  const shipMats = useRef<THREE.Material[]>([]);
  // Landing gear (0 = stowed, 1 = out) and touchdown suspension (spring offset + velocity).
  const rig = useRef<ShipRig>({ gear: 0, compress: 0 });
  const spring = useRef({ v: 0 });
  const view = useRef({ z: 1, x: 0, y: 0 });
  const baseCam = useMemo(() => new THREE.PerspectiveCamera(), []);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  // Soft ground shadow (radial blob) we can tighten as the ship lands.
  const shadowTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d")!;
    const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, "rgba(7,20,63,0.55)");
    grad.addColorStop(0.5, "rgba(7,20,63,0.22)");
    grad.addColorStop(1, "rgba(7,20,63,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }, []);
  const shadow = useRef<THREE.Mesh>(null);

  // Stand the ship on the plate's pad: map the pad (center + edges) to the screen,
  // project onto the ground plane (y = 0), and scale the ship to the pad's diameter.
  useEffect(() => {
    const ray = new THREE.Raycaster();
    const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    camera.clearViewOffset();
    camera.updateMatrixWorld();
    const hit = (fx: number, fy: number) => {
      const p = plateToScreen(fx, fy, size.width, size.height, plate);
      ray.setFromCamera(new THREE.Vector2(p.x * 2 - 1, -(p.y * 2 - 1)), camera);
      const v = new THREE.Vector3();
      return ray.ray.intersectPlane(ground, v) ? v : null;
    };
    const c = hit(plate.cx, plate.cy);
    const l = hit(plate.left, plate.cy);
    const r = hit(plate.right, plate.cy);
    if (c && l && r && base.current) {
      base.current.position.copy(c);
      base.current.scale.setScalar(l.distanceTo(r) * SHIP_TO_PAD * (compact ? SHIP_SCALE_COMPACT : 1));
    }
    view.current = { z: 1, x: 0, y: 0 };
  }, [camera, size.width, size.height, plate, compact]);

  const spots = useMemo(() => PARTS.map((_, i) => partAnchor(prof, i)), [prof]);

  useFrame((_, dt) => {
    const g = spin.current;
    const t = tilt.current;
    const b = base.current;
    if (!g || !t || !b) return;
    const S = shared.current;
    const open = openIdx !== null;

    // Landing intro: fade in high, descend on a controlled burn, ease into touchdown.
    let hover = 0;
    if (!introDone) {
      introT.current = Math.min(1, introT.current + dt / INTRO_S);
      const p = Math.max(0, introT.current);
      const e = 0.88 * (1 - Math.pow(1 - p, 3)) + 0.12 * p;
      hover = (1 - e) * DROP;
      const g = Math.min(1, Math.max(0, (p - 0.35) / 0.4));
      rig.current.gear = g * g * (3 - 2 * g);
      const fade = Math.min(1, p / 0.22);
      shipMats.current.forEach((m) => {
        m.transparent = true;
        m.opacity = fade;
      });
      S.thrust = introT.current < 0 ? 0 : Math.max(0, 1 - e) * 0.9 + (p < 0.95 ? 0.15 : 0);
      if (p >= 1) {
        shipMats.current.forEach((m) => {
          m.opacity = 1;
          m.transparent = false;
          m.needsUpdate = true;
        });
        S.thrust = 0;
        S.introDone = true;
        rig.current.gear = 1;
        spring.current.v = -0.32; // touchdown: the hull settles on its legs
        setIntroDone(true);
        onLanded?.();
      }
    } else {
      S.thrust = S.scroll > 0.02 ? 0.3 + S.scroll * 0.7 : 0;
    }

    // Suspension: a stiff, well-damped spring so the touchdown settles once, cleanly.
    {
      const R = rig.current;
      const a = -260 * R.compress - 22 * spring.current.v;
      spring.current.v += a * dt;
      R.compress = Math.max(-0.02, Math.min(0.01, R.compress + spring.current.v * dt));
    }

    // Turn: open part swings to face the camera; otherwise slow showroom turn + drag.
    if (open) {
      b.updateMatrixWorld();
      const camAngle = Math.atan2(camera.position.x - b.position.x, camera.position.z - b.position.z);
      const target = camAngle - PARTS[openIdx].face;
      let d = target - S.drag.spin;
      d = Math.atan2(Math.sin(d), Math.cos(d));
      S.drag.spin += d * (1 - Math.exp(-dt * 3.4));
      S.drag.vx = 0;
    } else {
      if (!S.drag.active) S.drag.vx *= 0.94;
      // phones: no idle turn, so every dot stays where you can tap it
      S.drag.spin += S.drag.vx + (hovering.current || compact ? 0 : dt * 0.08);
    }
    g.rotation.y = S.drag.spin;
    const lean = open ? 0 : 0.03 + S.scroll * 0.08;
    t.rotation.x += (S.pointer.y * lean - t.rotation.x) * 0.06;
    t.rotation.z += (-S.pointer.x * lean - t.rotation.z) * 0.06;
    const lift = Math.pow(S.scroll, 1.4) * 2.2;
    t.position.y = introDone ? t.position.y + (lift - t.position.y) * 0.08 : hover;

    if (shadow.current) {
      const h = Math.max(0, t.position.y);
      const m = shadow.current.material as THREE.MeshBasicMaterial;
      m.opacity = Math.max(0, 0.5 - h * 0.4);
      shadow.current.scale.setScalar(1 + h * 0.8);
    }

    // Zoom: crop the camera's view around the open part (a real lens-style zoom that keeps
    // the 3D matched to the flat plate), and apply the exact same crop to the plate.
    const W = size.width;
    const H = size.height;
    const V = view.current;
    if (open) {
      baseCam.copy(camera as THREE.PerspectiveCamera);
      baseCam.clearViewOffset();
      tmp.copy(spots[openIdx].pos).lerp(SHIP_MID, compact ? 0.15 : 0.65);
      g.localToWorld(tmp);
      tmp.project(baseCam);
      const fx = (tmp.x * 0.5 + 0.5) * W;
      const fy = (-tmp.y * 0.5 + 0.5) * H;
      const w = W / ZOOM;
      const h = H / ZOOM;
      const tx = Math.min(W - w, Math.max(0, fx - focusAt.x * w));
      const ty = Math.min(H - h, Math.max(0, fy - focusAt.y * h));
      const kz = 1 - Math.exp(-dt * 3.2);
      V.z += (ZOOM - V.z) * kz;
      V.x += (tx - V.x) * kz;
      V.y += (ty - V.y) * kz;
    } else if (V.z > 1.0005) {
      // Zoom back out around the same spot.
      const fx = V.x + (focusAt.x * W) / V.z;
      const fy = V.y + (focusAt.y * H) / V.z;
      V.z += (1 - V.z) * (1 - Math.exp(-dt * 4.2));
      if (V.z < 1.002) V.z = 1;
      V.x = Math.min(W - W / V.z, Math.max(0, fx - (focusAt.x * W) / V.z));
      V.y = Math.min(H - H / V.z, Math.max(0, fy - (focusAt.y * H) / V.z));
    }
    const cam = camera as THREE.PerspectiveCamera;
    const el = stage.current;
    if (V.z > 1.0005) {
      cam.setViewOffset(W, H, V.x, V.y, W / V.z, H / V.z);
      if (el) {
        el.style.setProperty("--hz", `translate(${-V.x * V.z}px, ${-V.y * V.z}px) scale(${V.z})`);
        el.dataset.zoom = open ? "1" : "0";
      }
    } else if (cam.view?.enabled) {
      V.z = 1;
      V.x = V.y = 0;
      cam.clearViewOffset();
      if (el) {
        el.style.removeProperty("--hz");
        el.dataset.zoom = "0";
      }
    }
  });

  return (
    <group ref={base}>
      <group ref={tilt}>
        <group ref={spin}>
          <ShipHybrid openIdx={openIdx} mats={shipMats} rig={rig} />
          {spots.map(({ pos, out }, i) => (
            <Hotspot
              key={STEPS[i].n}
              position={pos}
              outward={out}
              n={STEPS[i].n}
              tag={STEPS[i].tag}
              visible={introDone && openIdx === null}
              onHover={(on) => {
                hovering.current = on;
              }}
              onOpen={() => setOpenIdx(i)}
            />
          ))}
        </group>
        <Plume shared={shared} />
      </group>
      <ContactShadows position={[0, 0.002, 0]} scale={1.2} far={0.45} blur={2.2} opacity={0.55} resolution={512} color="#0B1633" />
      <mesh ref={shadow} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, 0]}>
        <planeGeometry args={[0.66, 0.66]} />
        <meshBasicMaterial map={shadowTex} transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

/** Exhaust: fires during the landing burn and on lift-off, off while parked. */
function Plume({ shared }: { shared: React.MutableRefObject<Shared> }) {
  const COUNT = 200;
  const points = useRef<THREE.Points>(null);
  const data = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const life = new Float32Array(COUNT);
    const vel = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      life[i] = Math.random();
      pos[i * 3 + 1] = -100;
    }
    return { pos, col, life, vel };
  }, []);
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d")!;
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.35, "rgba(255,255,255,0.5)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }, []);
  const hot = useMemo(() => new THREE.Color("#FFF6E0"), []);
  const fire = useMemo(() => new THREE.Color("#FF9A3D"), []);
  const bg = useMemo(() => new THREE.Color("#F4F8FF"), []);
  const tmp = useMemo(() => new THREE.Color(), []);

  useFrame((_, dt) => {
    const p = points.current;
    if (!p) return;
    const th = shared.current.thrust;
    const on = th > 0.02;
    const power = 0.6 + th * 1.8;
    const { pos, col, life, vel } = data;
    for (let i = 0; i < COUNT; i++) {
      life[i] += dt * (2.2 + (i % 7) * 0.1);
      if (life[i] >= 1) {
        life[i] = 0;
        if (!on) {
          pos[i * 3 + 1] = -100;
          continue;
        }
        const a = Math.random() * Math.PI * 2;
        const r = Math.random() * 0.04;
        pos[i * 3] = Math.cos(a) * r;
        pos[i * 3 + 1] = 0.08;
        pos[i * 3 + 2] = Math.sin(a) * r;
        vel[i * 3] = Math.cos(a) * 0.08 * Math.random();
        vel[i * 3 + 1] = -(0.5 + Math.random() * 0.35) * power;
        vel[i * 3 + 2] = Math.sin(a) * 0.08 * Math.random();
      }
      pos[i * 3] += vel[i * 3] * dt;
      pos[i * 3 + 1] += vel[i * 3 + 1] * dt;
      pos[i * 3 + 2] += vel[i * 3 + 2] * dt;
      const l = life[i];
      if (l < 0.3) tmp.copy(hot).lerp(fire, l / 0.3);
      else tmp.copy(fire).lerp(bg, (l - 0.3) / 0.7);
      col[i * 3] = tmp.r;
      col[i * 3 + 1] = tmp.g;
      col[i * 3 + 2] = tmp.b;
    }
    p.geometry.attributes.position.needsUpdate = true;
    p.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.pos, 3]} />
        <bufferAttribute attach="attributes-color" args={[data.col, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.07} map={tex} vertexColors transparent opacity={0.95} depthWrite={false} sizeAttenuation />
    </points>
  );
}

/** The step panel that slides in while zoomed on a part. */
function StepPanel({ idx, onClose, onGo, onBook, compact = false }: { idx: number; onClose: () => void; onGo: (i: number) => void; onBook: () => void; compact?: boolean }) {
  const s = STEPS[idx];
  const last = idx === STEPS.length - 1;
  return (
    <motion.div
      key="panel"
      data-hotspot
      role="dialog"
      aria-label={`Step ${s.n}: ${s.title}`}
      initial={compact ? { opacity: 0, y: 40 } : { opacity: 0, x: -28 }}
      animate={compact ? { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.45, ease: [0.22, 1, 0.36, 1] } } : { opacity: 1, x: 0, transition: { delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
      exit={compact ? { opacity: 0, y: 30, transition: { duration: 0.2 } } : { opacity: 0, x: -20, transition: { duration: 0.25 } }}
      onPointerDown={(e) => e.stopPropagation()}
      className={compact ? "absolute inset-x-3 bottom-[max(12px,env(safe-area-inset-bottom))] z-40 max-h-[44%] cursor-default overflow-y-auto rounded-2xl" : "absolute left-[6%] top-1/2 z-40 w-[400px] max-w-[38vw] cursor-default"}
      style={compact ? undefined : { y: "-50%" }}
    >
      <div className={`relative overflow-hidden rounded-2xl border border-white/70 bg-white/80 ${compact ? "p-5" : "p-7"} shadow-[0_40px_80px_-40px_rgba(7,20,63,0.55),0_0_0_1px_rgba(8,102,255,0.06)] backdrop-blur-xl`}>
        {/* thin blue scan line across the top, like the hologram sign */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#0866FF] to-transparent" />
        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0866FF]">
            Step {s.n} <span className="text-[#46516B]">/ 05</span>
          </p>
          <button
            type="button"
            onClick={onClose}
            className="-mr-2 flex h-8 w-8 items-center justify-center rounded-full text-[#46516B] transition-colors hover:bg-[#07143F]/5 hover:text-[#07143F]"
            aria-label="Close"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.28 }}>
            <h3 className={`mt-2 font-extrabold leading-[1.1] tracking-[-0.02em] text-[#07143F] ${compact ? "text-[22px]" : "mt-3 text-[28px]"}`}>{s.title}</h3>
            <p className={`text-[#46516B] ${compact ? "mt-1.5 text-[15px] leading-[1.45]" : "mt-2.5 text-[16px] leading-[1.5]"}`}>{s.line}</p>
            <ul className={compact ? "hidden" : "mt-5 space-y-2.5"}>
              {s.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[15px] font-medium text-[#07143F]">
                  <span className="mt-[3px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#0866FF]/10">
                    <svg viewBox="0 0 16 16" className="h-3 w-3 text-[#0866FF]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3.5 8.5l3 3 6-7" />
                    </svg>
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>

        {/* Progress: five dots, one per step */}
        <div className={`flex items-center gap-1.5 ${compact ? "mt-4" : "mt-6"}`}>
          {STEPS.map((st, i) => (
            <button
              key={st.n}
              type="button"
              onClick={() => onGo(i)}
              aria-label={`Go to step ${st.n}: ${st.tag}`}
              className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-[#0866FF]" : "w-1.5 bg-[#07143F]/15 hover:bg-[#07143F]/30"}`}
            />
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2.5">
          {last ? (
            <button
              type="button"
              onClick={onBook}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#0866FF] px-5 py-3 text-[15px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(8,102,255,0.8)] transition-colors hover:bg-[#0757DB]"
            >
              Book a Free Call <span aria-hidden="true">&rarr;</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onGo(idx + 1)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#07143F] px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#0B1F5C]"
            >
              Next: {STEPS[idx + 1].tag} <span aria-hidden="true">&rarr;</span>
            </button>
          )}
          {idx > 0 && !compact && (
            <button
              type="button"
              onClick={() => onGo(idx - 1)}
              className="rounded-full border border-[#07143F]/12 bg-white px-4 py-3 text-[15px] font-semibold text-[#07143F] transition-colors hover:border-[#07143F]/25"
            >
              Back
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function HeroRocket3D({
  onReady,
  plate = PLATE,
  compact = false,
  skipIntro = false,
}: {
  onReady?: () => void;
  /** which backdrop the ship stands on (desktop hero plate or the phone viewer crop) */
  plate?: PlateSpec;
  /** phone viewer: centered zoom, step panel as a bottom sheet, lighter rendering */
  compact?: boolean;
  /** start with the ship already landed (phone: picks up exactly where the still was) */
  skipIntro?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLElement | null>(null);
  const shared = useRef<Shared>({ pointer: { x: 0, y: 0 }, drag: { active: false, vx: 0, spin: compact ? -0.15 : 2.2 } /* phones: dots face you from the start */, scroll: 0, thrust: 0, introDone: false });
  const [visible, setVisible] = useState(true);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [landed, setLanded] = useState(false);
  const [hintPos, setHintPos] = useState<{ left: number; top: number } | null>(null);
  const openRef = useRef<number | null>(null);
  openRef.current = openIdx;
  const book = useBooking();

  const close = useCallback(() => setOpenIdx(null), []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    stage.current = el.closest("[data-hero-stage]");
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    let lastX = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      shared.current.pointer.x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
      shared.current.pointer.y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
      if (shared.current.drag.active) {
        shared.current.drag.vx = (e.clientX - lastX) * 0.006;
        lastX = e.clientX;
      }
    };
    const onDown = (e: PointerEvent) => {
      shared.current.drag.active = true;
      lastX = e.clientX;
    };
    const onUp = () => {
      shared.current.drag.active = false;
    };
    const onScroll = () => {
      const h = el.getBoundingClientRect();
      shared.current.scroll = Math.max(0, Math.min(1, -h.top / (h.height * 0.85)));
      if (shared.current.scroll > 0.06 && openRef.current !== null) setOpenIdx(null);
    };
    const place = () => {
      const r = el.getBoundingClientRect();
      const p = plateToScreen(plate.cx, plate.cy + 0.2, r.width, r.height, plate);
      setHintPos({ left: p.x * r.width, top: Math.min(r.height - 64, p.y * r.height) });
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(el);
    window.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // "See it move on the ship" buttons further down the page: scroll up and open that step.
  useEffect(() => {
    const onOpen = (e: Event) => {
      const i = (e as CustomEvent<number>).detail;
      window.scrollTo({ top: 0, behavior: "smooth" });
      // open once we're back at the top (scrolling away closes it, so wait for the scroll to finish)
      const start = performance.now();
      const wait = () => {
        if (window.scrollY < 20) window.setTimeout(() => setOpenIdx(i), 250);
        else if (performance.now() - start < 3000) window.setTimeout(wait, 80);
      };
      wait();
    };
    window.addEventListener("ql-ship-open", onOpen);
    return () => window.removeEventListener("ql-ship-open", onOpen);
  }, []);

  // While a part is open: click outside, Esc, or arrow keys.
  useEffect(() => {
    if (openIdx === null) return;
    const onDown = (e: PointerEvent) => {
      if (!(e.target as HTMLElement)?.closest?.("[data-hotspot]")) setOpenIdx(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
      if (e.key === "ArrowRight") setOpenIdx((i) => (i === null ? i : Math.min(STEPS.length - 1, i + 1)));
      if (e.key === "ArrowLeft") setOpenIdx((i) => (i === null ? i : Math.max(0, i - 1)));
    };
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [openIdx]);

  return (
    <>
      <div ref={wrapRef} className={`absolute inset-0 ${openIdx === null ? "cursor-grab active:cursor-grabbing" : ""}`} >
        <Canvas
          frameloop={visible ? "always" : "never"}
          dpr={compact ? [1, 1.5] : [1, 2]}
          // High 3/4 camera to match the environment plate's angle.
          camera={{ position: [0, 2.4, 9.5], fov: 30 }}
          onCreated={({ gl, camera }) => {
            gl.localClippingEnabled = true;
            camera.lookAt(0, 0, 0);
            camera.updateMatrixWorld();
          }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          {/* Match the plate: soft overcast daylight. A big bright sky from above, warm stone bounce
              from below, no hard sun (the photo has no hard shadows). */}
          <hemisphereLight args={["#F2F5FA", "#CFC6B8", 1.15]} />
          <directionalLight position={[2, 9, 3]} intensity={0.9} color="#F6F8FC" />
          <directionalLight position={[-6, 3, 5]} intensity={0.35} color="#E6ECF5" />
          <Suspense fallback={null}>
            <Ship shared={shared} openIdx={openIdx} setOpenIdx={setOpenIdx} stage={stage} onReady={onReady} onLanded={() => setLanded(true)} plate={plate} compact={compact} skipIntro={skipIntro} />
            <Environment resolution={256}>
              {/* overcast sky dome + ground bounce, for soft reflections on the hull */}
              <Lightformer form="rect" intensity={1.6} position={[0, 6, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[14, 14, 1]} color="#F4F7FC" />
              <Lightformer form="rect" intensity={0.7} position={[0, 1.5, 6]} scale={[12, 3, 1]} color="#EEF2F8" />
              <Lightformer form="rect" intensity={0.45} position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[14, 14, 1]} color="#D9D1C4" />
            </Environment>
          </Suspense>
        </Canvas>
      </div>

      {/* "What do I do here?" A plain hint under the ship once it lands. */}
      {hintPos && (
        <div
          className={`pointer-events-none absolute z-20 -translate-x-1/2 transition-all duration-500 ${landed && openIdx === null ? "opacity-100" : "translate-y-2 opacity-0"}`}
          style={{ left: hintPos.left, top: hintPos.top }}
        >
          <div className="flex items-center gap-2 whitespace-nowrap rounded-full border border-[#07143F]/10 bg-white/85 px-4 py-2 text-[13.5px] font-semibold text-[#07143F] shadow-[0_8px_24px_-12px_rgba(7,20,63,0.35)] backdrop-blur">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#0866FF]/50" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-[#0866FF]" />
            </span>
            {compact ? "Tap a dot to see how we get you jobs" : "Click a dot on the ship to see how we get you jobs"}
          </div>
        </div>
      )}

      <AnimatePresence>
        {openIdx !== null && (
          <StepPanel
            compact={compact}
            idx={openIdx}
            onClose={close}
            onGo={(i) => setOpenIdx(i)}
            onBook={() => {
              setOpenIdx(null);
              book("hero-ship");
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
