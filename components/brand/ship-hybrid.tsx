"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// The QuickLaunchWeb ship: the premium textured model (Higgsfield image-to-3D), cut into
// live sections at runtime. Normalized to height 1, base at y = 0, centered on the body axis.
//
// Cutaway: when a step is opened, the ship stays solid except that step's section, which
// hands over to an exact wireframe (the real hull sliced into contour lines), so you can
// see the mechanism inside working:
//   0 Plan        nose cap   -> lifts and turns; a core spins inside gyro rings
//   1 Video       window band -> a camera barrel; the lens iris opens
//   2 Ads         hull door  -> bolts unscrew, the door swings aside, ad cards slide out of the bay
//   3 Testing     lower band -> three discs spin; one after another lights, the last one wins
//   4 Booked jobs legs       -> pistons push the ship up on its legs
// Sections are cut with clipping planes re-applied in world space every frame.

export const SHIP_URL = "/home/rocket-3d/rocket.glb";
const NOSE_CUT = 0.84;
const LEG_CUT = 0.15;
const PANEL = { y0: 0.31, y1: 0.55 };
const BLUE = "#2F7BFF";

/** Parts: height (0..1), angle around the body (0 = +z, toward +x), and the angle that faces the camera. */
export const PARTS = [
  { y: 0.92, angle: 0.5, face: 0.35, lift: 0.5 },
  { y: 0.69, angle: 0, face: 0, lift: 0 },
  { y: 0.43, angle: Math.PI / 2, face: 1.0, lift: 0 },
  { y: 0.23, angle: -0.9, face: -0.7, lift: 0 },
  { y: 0.08, angle: 0.35, face: 0.35, lift: 0 },
] as const;

type Key = "legs" | "bodyLow" | "bodyMid" | "door" | "bodyHigh" | "nose";
/** Which section turns to wireframe for each step, and the height band its wire draws across. */
//  partAt: seconds after the click when the part starts moving
//  xrayAt: seconds after the click when the section turns to x-ray (outer parts move first, then you see inside)
const CUTAWAY: { keys: Key[]; band: [number, number]; partAt: number; xrayAt: number }[] = [
  { keys: ["nose"], band: [NOSE_CUT, 1.01], partAt: 0.7, xrayAt: 1.6 },
  { keys: ["bodyHigh"], band: [PANEL.y1, NOSE_CUT], partAt: 1.2, xrayAt: 0.45 },
  { keys: ["bodyMid"], band: [PANEL.y0, PANEL.y1], partAt: 0.7, xrayAt: 2.0 },
  { keys: ["bodyLow"], band: [LEG_CUT, PANEL.y0], partAt: 1.2, xrayAt: 0.45 },
  { keys: ["legs"], band: [-0.01, LEG_CUT], partAt: 1.2, xrayAt: 0.45 },
];

/** 0..1 progress of x through [a, b]. */
const seg = (x: number, a: number, b: number) => Math.min(1, Math.max(0, (x - a) / (b - a)));
/** Smoothstep easing. */
const smooth = (x: number) => x * x * (3 - 2 * x);

/** Written by the parent: landing gear out (0..1) and touchdown suspension offset. */
export type ShipRig = { gear: number; compress: number };

type Profile = { r: (y: number) => number; bins: Float32Array };
const profileCache = new WeakMap<THREE.Object3D, { prof: Profile; s: number; c: THREE.Vector3; minY: number }>();

/** Body axis + radius along the height, measured from the model (median per slice, so legs don't skew it). */
function measure(scene: THREE.Object3D) {
  const hit = profileCache.get(scene);
  if (hit) return hit;
  scene.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(scene);
  const sz = box.getSize(new THREE.Vector3());
  const c = box.getCenter(new THREE.Vector3());
  const s = 1 / Math.max(sz.y, 1e-6);
  const v = new THREE.Vector3();
  const each = (fn: (x: number, y: number, z: number) => void) =>
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      const pos = m.geometry.attributes.position;
      const step = Math.max(1, Math.floor(pos.count / 60000));
      for (let i = 0; i < pos.count; i += step) {
        v.fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld);
        fn(v.x, (v.y - box.min.y) * s, v.z);
      }
    });
  // Body axis: the mean of the mid-body vertices (the bounding box is skewed by the legs).
  let ax = 0;
  let az = 0;
  let n = 0;
  each((x, y, z) => {
    if (y > 0.4 && y < 0.8) {
      ax += x;
      az += z;
      n++;
    }
  });
  if (n) {
    c.x = ax / n;
    c.z = az / n;
  }
  const N = 48;
  const buckets: number[][] = Array.from({ length: N }, () => []);
  each((x, y, z) => {
    const b = Math.min(N - 1, Math.max(0, Math.floor(y * N)));
    buckets[b].push(Math.hypot((x - c.x) * s, (z - c.z) * s));
  });
  const bins = new Float32Array(N);
  let last = 0.1;
  buckets.forEach((arr, i) => {
    if (arr.length) {
      arr.sort((a, b) => a - b);
      last = arr[Math.floor(arr.length * 0.5)];
    }
    bins[i] = last;
  });
  const sm = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    let a = 0;
    for (let j = -2; j <= 2; j++) a += bins[Math.min(N - 1, Math.max(0, i + j))];
    sm[i] = a / 5;
  }
  const ref = sm[Math.floor(N * 0.3)];
  for (let i = 0; i < Math.floor(N * 0.3); i++) sm[i] = Math.min(sm[i], ref * (0.92 + (i / (N * 0.3)) * 0.08));
  bins.set(sm);
  const r = (y: number) => {
    const f = Math.min(N - 1.001, Math.max(0, y * N - 0.5));
    const i = Math.floor(f);
    return bins[i] + (bins[i + 1] - bins[i]) * (f - i);
  };
  const out = { prof: { r, bins }, s, c, minY: box.min.y };
  profileCache.set(scene, out);
  return out;
}

/**
 * Wireframe that sits exactly on the hull: the real mesh is sliced by horizontal planes
 * (contour rings) and vertical planes through the body axis (meridians). Each segment is
 * filed under the section it belongs to, so its lines move with that section.
 */
function sliceWire(scene: THREE.Object3D, s: number, c: THREE.Vector3, minY: number, xc: number) {
  const tris: number[] = [];
  const v = new THREE.Vector3();
  scene.traverse((o) => {
    const m = o as THREE.Mesh;
    if (!m.isMesh) return;
    const pos = m.geometry.attributes.position;
    const idx = m.geometry.index;
    const count = idx ? idx.count : pos.count;
    for (let k = 0; k < count; k++) {
      v.fromBufferAttribute(pos, idx ? idx.getX(k) : k).applyMatrix4(m.matrixWorld);
      tris.push((v.x - c.x) * s, (v.y - minY) * s, (v.z - c.z) * s);
    }
  });
  const T = new Float32Array(tris);
  const out: Record<Key, number[]> = { legs: [], bodyLow: [], bodyMid: [], door: [], bodyHigh: [], nose: [] };
  const lift = (x: number, z: number) => {
    const r = Math.hypot(x, z) || 1;
    return [x + (x / r) * 0.002, z + (z / r) * 0.002];
  };
  const file = (ax: number, ay: number, az: number, bx: number, by: number, bz: number) => {
    const my = (ay + by) / 2;
    const mx = (ax + bx) / 2;
    const k: Key =
      my >= NOSE_CUT ? "nose" : my < LEG_CUT ? "legs" : my < PANEL.y0 ? "bodyLow" : my >= PANEL.y1 ? "bodyHigh" : mx > xc ? "door" : "bodyMid";
    const [a1, a2] = lift(ax, az);
    const [b1, b2] = lift(bx, bz);
    out[k].push(a1, ay, a2, b1, by, b2);
  };
  const slice = (nx: number, ny: number, nz: number, d: number) => {
    for (let i = 0; i < T.length; i += 9) {
      const da = T[i] * nx + T[i + 1] * ny + T[i + 2] * nz - d;
      const db = T[i + 3] * nx + T[i + 4] * ny + T[i + 5] * nz - d;
      const dc = T[i + 6] * nx + T[i + 7] * ny + T[i + 8] * nz - d;
      if ((da > 0 && db > 0 && dc > 0) || (da < 0 && db < 0 && dc < 0)) continue;
      const pts: number[] = [];
      const edge = (p: number, q: number, dp: number, dq: number) => {
        if (dp > 0 === dq > 0) return;
        const t = dp / (dp - dq);
        pts.push(T[p] + (T[q] - T[p]) * t, T[p + 1] + (T[q + 1] - T[p + 1]) * t, T[p + 2] + (T[q + 2] - T[p + 2]) * t);
      };
      edge(i, i + 3, da, db);
      edge(i + 3, i + 6, db, dc);
      edge(i + 6, i, dc, da);
      if (pts.length >= 6) file(pts[0], pts[1], pts[2], pts[3], pts[4], pts[5]);
    }
  };
  for (let j = 1; j < 64; j++) slice(0, 1, 0, j / 64); // contour rings
  for (let j = 0; j < 12; j++) {
    const a = (j / 12) * Math.PI; // 12 planes through the axis = 24 meridians
    slice(Math.cos(a), 0, -Math.sin(a), 0);
  }
  const geo = (a: number[]) => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(a, 3));
    return g;
  };
  return Object.fromEntries(Object.entries(out).map(([k, a]) => [k, geo(a)])) as Record<Key, THREE.BufferGeometry>;
}

/** The ship's measured radius profile (shared with the hotspot layout in the parent). */
export function useShipProfile() {
  const { scene } = useGLTF(SHIP_URL);
  return useMemo(() => measure(scene).prof, [scene]);
}

/** Hotspot anchor + outward direction for a part, in ship space. */
export function partAnchor(prof: Profile, i: number) {
  const p = PARTS[i];
  const out = new THREE.Vector3(Math.sin(p.angle), p.lift, Math.cos(p.angle)).normalize();
  const rr = prof.r(p.y) * (i === 0 ? 0.7 : 1.08) + 0.01;
  const pos = new THREE.Vector3(Math.sin(p.angle) * rr, p.y, Math.cos(p.angle) * rr);
  return { pos, out };
}

const plane = (x: number, y: number, z: number, c: number) => new THREE.Plane(new THREE.Vector3(x, y, z), c);

export function ShipHybrid({
  openIdx,
  mats,
  rig,
}: {
  openIdx: number | null;
  mats: React.MutableRefObject<THREE.Material[]>;
  rig?: React.MutableRefObject<ShipRig>;
}) {
  const { scene } = useGLTF(SHIP_URL);
  const upper = useRef<THREE.Group>(null);
  const legsG = useRef<THREE.Group>(null);
  const noseG = useRef<THREE.Group>(null);
  const hinge = useRef<THREE.Group>(null);
  const door = useRef<THREE.Group>(null);
  const bolts = useRef<THREE.Group>(null);
  const sweep = useRef<THREE.Mesh>(null);
  const collar = useRef<THREE.Mesh>(null);
  const wires = useRef<Partial<Record<Key, THREE.LineSegments | null>>>({});
  // inner mechanisms
  const plan = useRef<THREE.Group>(null);
  const core = useRef<THREE.MeshStandardMaterial>(null);
  const gyroA = useRef<THREE.Mesh>(null);
  const gyroB = useRef<THREE.Mesh>(null);
  const cam = useRef<THREE.Group>(null);
  const iris = useRef<THREE.Group>(null);
  const bay = useRef<THREE.Group>(null);
  const slot = useRef<THREE.MeshStandardMaterial>(null);
  const cards = useRef<THREE.Group>(null);
  const discs = useRef<THREE.Group>(null);
  const pistons = useRef<THREE.Group>(null);
  const st = useRef({ touched: false, wire: 0, since: 0, lastIdx: null as number | null, p: [0, 0, 0, 0, 0] });

  const built = useMemo(() => {
    const { prof, s, c, minY } = measure(scene);
    const src = scene.clone(true);
    const rp = prof.r((PANEL.y0 + PANEL.y1) / 2);
    const xc = rp * 0.66;
    const zE = Math.sqrt(Math.max(0, rp * rp - xc * xc));

    // Each section keeps the intersection of its half-spaces (three's default clipping).
    const pieces: Record<Key, THREE.Plane[]> = {
      legs: [plane(0, -1, 0, LEG_CUT)],
      bodyLow: [plane(0, 1, 0, -LEG_CUT), plane(0, -1, 0, PANEL.y0)],
      bodyMid: [plane(0, 1, 0, -PANEL.y0), plane(0, -1, 0, PANEL.y1), plane(-1, 0, 0, xc)],
      door: [plane(1, 0, 0, -xc), plane(0, 1, 0, -PANEL.y0), plane(0, -1, 0, PANEL.y1)],
      bodyHigh: [plane(0, 1, 0, -PANEL.y1), plane(0, -1, 0, NOSE_CUT)],
      nose: [plane(0, 1, 0, -NOSE_CUT)],
    };
    const world = Object.fromEntries(Object.entries(pieces).map(([k, ps]) => [k, ps.map((p) => p.clone())])) as Record<Key, THREE.Plane[]>;

    const allMats: THREE.Material[] = [];
    const matsBy = {} as Record<Key, THREE.Material[]>;
    const xrayU = {} as Record<Key, { value: number }>;
    const xrayObj = {} as Record<Key, THREE.Group>;
    const xrayMat = (k: Key) => {
      const u = (xrayU[k] = { value: 0 });
      const m = new THREE.MeshBasicMaterial({ color: "#3D86FF", transparent: true, depthWrite: false, side: THREE.DoubleSide, toneMapped: false });
      m.clippingPlanes = world[k];
      m.onBeforeCompile = (sh) => {
        sh.uniforms.uX = u;
        sh.vertexShader = sh.vertexShader
          .replace("#include <common>", "#include <common>\nvarying vec3 vN;\nvarying vec3 vV;")
          .replace("#include <project_vertex>", "#include <project_vertex>\nvN = normalize(normalMatrix * normal);\nvV = normalize(-mvPosition.xyz);");
        sh.fragmentShader = sh.fragmentShader
          .replace("#include <common>", "#include <common>\nvarying vec3 vN;\nvarying vec3 vV;\nuniform float uX;")
          .replace(
            "vec4 diffuseColor = vec4( diffuse, opacity );",
            "float fr = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.4);\nvec4 diffuseColor = vec4( mix(diffuse, vec3(0.85, 0.92, 1.0), fr * 0.5), (0.05 + fr * 0.7) * uX );"
          );
      };
      return m;
    };
    // Each section only keeps the triangles near it (clipping does the exact cut), so the GPU
    // draws about one ship's worth of triangles instead of six copies.
    const M = 0.025;
    const inSection = (k: Key, x: number, y: number) =>
      k === "legs" ? y < LEG_CUT + M
      : k === "bodyLow" ? y > LEG_CUT - M && y < PANEL.y0 + M
      : k === "bodyMid" ? y > PANEL.y0 - M && y < PANEL.y1 + M && x < xc + M
      : k === "door" ? y > PANEL.y0 - M && y < PANEL.y1 + M && x > xc - M
      : k === "bodyHigh" ? y > PANEL.y1 - M && y < NOSE_CUT + M
      : y > NOSE_CUT - M;
    const vv = new THREE.Vector3();
    const subset = (mesh: THREE.Mesh, k: Key) => {
      const geo = mesh.geometry;
      const pos = geo.attributes.position;
      const idx = geo.index;
      const n = idx ? idx.count : pos.count;
      const keep: number[] = [];
      const at = (q: number) => (idx ? idx.getX(q) : q);
      for (let q = 0; q < n; q += 3) {
        let cx = 0;
        let cy = 0;
        for (let e = 0; e < 3; e++) {
          vv.fromBufferAttribute(pos, at(q + e)).applyMatrix4(mesh.matrixWorld);
          cx += (vv.x - c.x) * s;
          cy += (vv.y - minY) * s;
        }
        if (inSection(k, cx / 3, cy / 3)) keep.push(at(q), at(q + 1), at(q + 2));
      }
      const g2 = new THREE.BufferGeometry();
      for (const name of Object.keys(geo.attributes)) g2.setAttribute(name, geo.attributes[name]);
      g2.setIndex(keep);
      return g2;
    };
    src.updateMatrixWorld(true);
    const make = (k: Key, outward = 1) => {
      const g = src.clone(true);
      g.updateMatrixWorld(true);
      g.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) m.geometry = subset(m, k);
      });
      g.position.set(-c.x, -minY, -c.z);
      const w = new THREE.Group();
      w.add(g);
      w.scale.setScalar(s * outward);
      g.traverse((o) => {
        const m = o as THREE.Mesh;
        if (!m.isMesh) return;
        const mat = (m.material as THREE.MeshStandardMaterial).clone();
        mat.metalness = 0.1;
        mat.roughness = 0.38;
        mat.metalnessMap = null;
        mat.color = new THREE.Color(1.0, 1.0, 1.01);
        mat.envMapIntensity = 0.9;
        mat.side = THREE.DoubleSide;
        mat.clippingPlanes = world[k];
        m.material = mat;
        m.castShadow = true;
        allMats.push(mat);
        (matsBy[k] ??= []).push(mat);
      });
      // matching x-ray shell (same geometry, same cut)
      const xg = g.clone(true); // same trimmed geometry
      const xw = new THREE.Group();
      xw.add(xg);
      xw.scale.setScalar(s * outward * 1.001);
      const xm = xrayMat(k);
      xg.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) {
          m.material = xm;
          m.castShadow = false;
        }
      });
      xw.visible = false;
      xrayObj[k] = xw;
      return w;
    };

    const wireGeo = sliceWire(scene, s, c, minY, xc);
    const revealLocal = [plane(0, -1, 0, 0), plane(0, 1, 0, 0)];
    const revealWorld = revealLocal.map((p) => p.clone());
    const wireMat = new THREE.LineBasicMaterial({ color: "#4A8EFF", transparent: true, opacity: 0, depthWrite: false, toneMapped: false, clippingPlanes: revealWorld });

    return {
      obj: {
        legs: make("legs"),
        bodyLow: make("bodyLow"),
        bodyMid: make("bodyMid"),
        door: make("door", 1.004),
        bodyHigh: make("bodyHigh"),
        nose: make("nose"),
      } as Record<Key, THREE.Group>,
      pieces,
      world,
      prof,
      rp,
      xc,
      zE,
      allMats,
      matsBy,
      xrayU,
      xrayObj,
      wireGeo,
      wireMat,
      revealLocal,
      revealWorld,
    };
  }, [scene]);

  useEffect(() => {
    mats.current = built.allMats;
  }, [built, mats]);

  useFrame((state, rawDt) => {
    const dt = Math.min(rawDt, 0.25); // real time, even on slow frames
    const t = state.clock.elapsedTime;
    const open = openIdx !== null;
    const S = st.current;
    const { pieces, world, prof } = built;
    const damp = (c: number, tgt: number, rate: number) => c + (tgt - c) * (1 - Math.exp(-rate * dt));

    // Sequence: ship turns + camera zooms, the section hands over to wireframe, then the mechanism works.
    if (open && S.lastIdx !== openIdx) {
      S.since = 0;
      S.wire = 0;
      S.lastIdx = openIdx;
    }
    if (!open) S.lastIdx = null;
    S.since += dt;
    const cut = open ? CUTAWAY[openIdx] : null;
    for (let i = 0; i < 5; i++) {
      const on = openIdx === i && S.since > CUTAWAY[i].partAt;
      S.p[i] = on ? Math.min(1, S.p[i] + dt / 1.8) : Math.max(0, S.p[i] - dt / 0.6);
    }
    const xrayOn = !!cut && S.since > cut.xrayAt;
    S.wire = xrayOn ? Math.min(1, S.wire + dt / 0.8) : Math.max(0, S.wire - dt / 0.45);
    const W = smooth(S.wire);

    // Only the open step's section fades out (and is switched off once gone); the rest stays solid.
    if (open) S.touched = true;
    if (S.touched) {
      let settled = true;
      (Object.keys(built.matsBy) as Key[]).forEach((k) => {
        const wired = !!cut?.keys.includes(k) && xrayOn;
        built.matsBy[k].forEach((m) => {
          const tgt = wired ? 0 : 1;
          let v = (m.userData.xr as number | undefined) ?? 1;
          v = damp(v, tgt, wired ? 5 : 7);
          if (Math.abs(v - tgt) < 0.01) v = tgt;
          if (v !== 1) settled = false;
          m.userData.xr = v;
          const fading = v < 1;
          if (m.transparent !== fading) m.needsUpdate = true;
          m.transparent = fading;
          m.opacity = v;
          m.depthWrite = !fading;
          m.visible = v > 0;
        });
      });
      if (!open && settled) S.touched = false;
    }

    // Wire: only the open section's lines, drawn bottom-to-top across its band.
    const band = cut?.band ?? [0, 1];
    const h = band[0] - 0.01 + W * (band[1] - band[0] + 0.03);
    built.revealLocal[0].constant = h; // keep y < h
    built.revealLocal[1].constant = -(band[0] - 0.01); // keep y > band bottom
    built.wireMat.opacity = Math.min(1, W * 1.6) * 0.5;
    (Object.keys(built.xrayObj) as Key[]).forEach((k) => {
      const on = !!cut?.keys.includes(k);
      built.xrayU[k].value = on ? W : 0;
      built.xrayObj[k].visible = on && S.wire > 0.003;
    });
    (Object.keys(wires.current) as Key[]).forEach((k) => {
      const l = wires.current[k];
      if (l) l.visible = !!cut?.keys.includes(k) && S.wire > 0.003;
    });
    if (sweep.current) {
      const sm = sweep.current.material as THREE.MeshBasicMaterial;
      sm.opacity = open && S.wire > 0 && S.wire < 1 ? 0.9 * Math.sin(Math.PI * S.wire) : 0;
      const yy = Math.min(band[1], Math.max(band[0], h));
      sweep.current.position.y = yy;
      sweep.current.scale.setScalar(prof.r(Math.min(0.99, Math.max(0.01, yy))) * 1.01);
    }
    const inner = (i: number) => (openIdx === i ? smooth(Math.min(1, S.wire * 1.4)) : 0) || (S.p[i] > 0 ? 1 : 0) * smooth(Math.min(1, S.p[i] * 4));

    // 01 Plan: wire nose cap lifts and turns; inside, the core glows and the gyro rings spin.
    const p0 = S.p[0];
    if (noseG.current) {
      noseG.current.position.y = 0.1 * smooth(seg(p0, 0.1, 0.55));
      noseG.current.rotation.y = Math.PI * 0.5 * smooth(seg(p0, 0.35, 0.9));
    }
    if (plan.current) {
      const a = inner(0);
      plan.current.visible = a > 0.01;
      plan.current.scale.setScalar(0.85 + 0.15 * a);
    }
    if (core.current) core.current.emissiveIntensity = 0.6 + 2.2 * smooth(seg(p0, 0.2, 0.7));
    if (gyroA.current) gyroA.current.rotation.x += dt * (0.6 + 2.2 * p0);
    if (gyroB.current) gyroB.current.rotation.y += dt * (0.8 + 2.6 * p0);

    // 02 Video: camera barrel inside the window band; the iris opens, the lens brightens.
    const p1 = S.p[1];
    if (cam.current) {
      const a = inner(1);
      cam.current.visible = a > 0.01;
      cam.current.position.z = -0.02 * (1 - a) + 0.015 * smooth(seg(p1, 0.1, 0.4)); // barrel racks forward
    }
    if (iris.current) {
      const o = smooth(seg(p1, 0.3, 0.95));
      iris.current.children.forEach((b) => {
        if (b.userData.blade !== undefined) {
          const blade = b.children[0];
          blade.rotation.z = 0.1 + o * 1.1;
          blade.position.x = o * 0.008;
        }
      });
      const glow = iris.current.getObjectByName("lensGlow") as THREE.Mesh | undefined;
      if (glow) (glow.material as THREE.MeshBasicMaterial).opacity = 0.1 + o * 0.8;
    }

    // 03 Ads: bolts unscrew and back out, the wire door pops and swings aside; ad cards slide out of the lit bay.
    const p2 = S.p[2];
    const unscrew = smooth(seg(p2, 0, 0.3));
    if (bolts.current) {
      bolts.current.visible = openIdx === 2 || p2 > 0;
      bolts.current.children.forEach((bg) => {
        const bolt = bg.children[0];
        bolt.rotation.x = -unscrew * Math.PI * 6;
        bolt.position.x = unscrew * 0.012;
        bolt.visible = p2 < 0.42;
      });
    }
    if (door.current) door.current.position.x = 0.006 * smooth(seg(p2, 0.3, 0.4));
    if (hinge.current) hinge.current.rotation.y = 1.35 * smooth(seg(p2, 0.38, 0.85));
    if (bay.current) bay.current.visible = p2 > 0.3;
    if (slot.current) slot.current.emissiveIntensity = 0.2 + (0.7 + Math.sin(t * 3) * 0.08) * smooth(seg(p2, 0.38, 0.7));
    if (cards.current) {
      cards.current.children.forEach((cd, i) => {
        const q = smooth(seg(p2, 0.6 + i * 0.1, 0.88 + i * 0.04));
        cd.position.x = q * (0.05 + i * 0.045);
        ((cd as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = q * (0.9 - i * 0.2);
      });
    }

    // 04 Testing: three discs spin at different speeds; each lights in turn, then the last one stays lit (the winner).
    const p3 = S.p[3];
    if (discs.current) {
      discs.current.visible = inner(3) > 0.01;
      const settle = seg(p3, 0.75, 1);
      discs.current.children.forEach((d, i) => {
        d.rotation.y += dt * (1.2 + i * 0.9) * (1 - settle * (i === 2 ? 0.7 : 0.3));
        const edge = d.children[1] as THREE.Mesh | undefined;
        if (edge) {
          const mm = edge.material as THREE.MeshBasicMaterial;
          const turn = Math.floor((t * 1.4) % 3) === i ? 1 : 0.15;
          mm.opacity = damp(mm.opacity, p3 < 0.75 ? turn * smooth(seg(p3, 0.05, 0.25)) : i === 2 ? 1 : 0.12, 10);
        }
      });
    }

    // Landing gear (driven by the parent): legs slide out of the hull before touchdown.
    const R = rig?.current;
    if (legsG.current) legsG.current.position.y = (1 - smooth(R ? R.gear : 1)) * 0.075;
    // 05 Booked jobs: pistons push the ship up on its legs (collar shows). Plus touchdown suspension.
    const lift4 = 0.045 * smooth(seg(S.p[4], 0.15, 0.75));
    if (upper.current) upper.current.position.y = lift4 + (R ? R.compress : 0);
    if (pistons.current) {
      pistons.current.visible = inner(4) > 0.01;
      pistons.current.children.forEach((pg) => {
        const rod = pg.children[1];
        if (rod) {
          rod.scale.y = 1 + lift4 / 0.06;
          rod.position.y = LEG_CUT - 0.03 + lift4 / 2;
        }
      });
    }
    if (collar.current) {
      const cm = collar.current.material as THREE.MeshStandardMaterial;
      cm.emissiveIntensity = 1.8 * smooth(seg(S.p[4], 0.3, 0.8));
      collar.current.scale.y = Math.max(0.001, lift4);
      collar.current.position.y = LEG_CUT + lift4 / 2;
      collar.current.visible = lift4 > 0.002;
    }

    // Re-apply the cut planes in world space from each section's own transform.
    const apply = (ls: THREE.Plane[], ws: THREE.Plane[], g: THREE.Object3D | null | undefined) => {
      if (!g) return;
      g.updateMatrixWorld();
      ls.forEach((p, i) => ws[i].copy(p).applyMatrix4(g.matrixWorld));
    };
    apply(pieces.legs, world.legs, legsG.current);
    apply(pieces.bodyLow, world.bodyLow, upper.current);
    apply(pieces.bodyMid, world.bodyMid, upper.current);
    apply(pieces.bodyHigh, world.bodyHigh, upper.current);
    apply(pieces.nose, world.nose, noseG.current);
    apply(pieces.door, world.door, door.current?.children[0]);
    apply(built.revealLocal, built.revealWorld, openIdx === 0 ? noseG.current : openIdx === 4 ? legsG.current : upper.current);
  });

  const { prof, rp, xc, zE, obj, wireGeo, wireMat } = built;
  const wire = (k: Key) => (
    <lineSegments
      ref={(l) => {
        wires.current[k] = l;
      }}
      geometry={wireGeo[k]}
      material={wireMat}
      visible={false}
    />
  );
  const yWin = PARTS[1].y;
  const rWin = prof.r(yWin);
  const lensR = rWin * 0.36;
  const pivot: [number, number, number] = [xc, 0, -zE]; // hinge on the far edge: the door swings aside, the bay faces you
  const aEdge = Math.acos(Math.min(1, xc / rp)) * 0.78;
  const boltSpots = [
    [-aEdge, PANEL.y0 + 0.025],
    [aEdge, PANEL.y0 + 0.025],
    [-aEdge, PANEL.y1 - 0.025],
    [aEdge, PANEL.y1 - 0.025],
  ] as const;
  const yPlan = 0.9;
  const rPlan = prof.r(yPlan);
  return (
    <group>
      <group ref={legsG}>
        <primitive object={obj.legs} />
        <primitive object={built.xrayObj.legs} />
        {wire("legs")}
        {/* 05: piston housings (stay with the legs) */}
      </group>
      {/* 05: hydraulic collar that shows when the ship rises on its legs */}
      <mesh ref={collar} position={[0, LEG_CUT, 0]} visible={false}>
        <cylinderGeometry args={[prof.r(LEG_CUT) * 0.96, prof.r(LEG_CUT) * 0.96, 1, 48, 1, true]} />
        <meshStandardMaterial color="#0A1A3F" emissive={BLUE} emissiveIntensity={0} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      {/* 05: pistons: housing at the base, rod pushes up into the hull */}
      <group ref={pistons} visible={false}>
        {[0, 1, 2, 3].map((i) => {
          const a = Math.PI / 4 + (i * Math.PI) / 2;
          const rr = prof.r(0.1) * 0.5;
          return (
            <group key={i} position={[Math.sin(a) * rr, 0, Math.cos(a) * rr]}>
              <mesh position={[0, 0.06, 0]}>
                <cylinderGeometry args={[0.014, 0.014, 0.09, 16]} />
                <meshStandardMaterial color="#3B4458" metalness={0.8} roughness={0.3} />
              </mesh>
              <mesh position={[0, LEG_CUT - 0.03, 0]}>
                <cylinderGeometry args={[0.007, 0.007, 0.06, 12]} />
                <meshStandardMaterial color="#DDE3EC" metalness={0.95} roughness={0.15} emissive={BLUE} emissiveIntensity={0.25} />
              </mesh>
            </group>
          );
        })}
      </group>

      <group ref={upper}>
        <primitive object={obj.bodyLow} />
        <primitive object={built.xrayObj.bodyLow} />
        {wire("bodyLow")}
        <primitive object={obj.bodyMid} />
        <primitive object={built.xrayObj.bodyMid} />
        {wire("bodyMid")}
        <primitive object={obj.bodyHigh} />
        <primitive object={built.xrayObj.bodyHigh} />
        {wire("bodyHigh")}

        {/* 01: core + gyro rings inside the nose */}
        <group ref={plan} position={[0, yPlan, 0]} visible={false}>
          <mesh>
            <sphereGeometry args={[rPlan * 0.32, 32, 16]} />
            <meshStandardMaterial ref={core} color="#0866FF" emissive="#0866FF" emissiveIntensity={0.6} toneMapped={false} />
          </mesh>
          <mesh ref={gyroA}>
            <torusGeometry args={[rPlan * 0.55, 0.004, 8, 96]} />
            <meshStandardMaterial color="#C9D3E2" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh ref={gyroB} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[rPlan * 0.68, 0.004, 8, 96]} />
            <meshStandardMaterial color="#8FB4FF" metalness={0.6} roughness={0.25} emissive={BLUE} emissiveIntensity={0.6} toneMapped={false} />
          </mesh>
        </group>
        <group ref={noseG}>
          <primitive object={obj.nose} />
          <primitive object={built.xrayObj.nose} />
          {wire("nose")}
        </group>

        {/* 02: camera barrel + lens iris behind the window band */}
        <group ref={cam} visible={false}>
          <group position={[0, yWin, 0]}>
            <mesh position={[0, 0, rWin * 0.45]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[lensR * 1.15, lensR * 1.3, rWin * 0.8, 32]} />
              <meshStandardMaterial color="#2A3346" metalness={0.75} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0, rWin * 0.45]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[lensR * 1.32, 0.003, 6, 64]} />
              <meshBasicMaterial color={BLUE} toneMapped={false} />
            </mesh>
            <group ref={iris} position={[0, 0, rWin * 0.86]}>
              <mesh name="lensGlow">
                <circleGeometry args={[lensR * 0.98, 48]} />
                <meshBasicMaterial color="#6FA4FF" transparent opacity={0.1} depthWrite={false} toneMapped={false} />
              </mesh>
              <mesh position={[0, 0, 0.001]}>
                <ringGeometry args={[lensR, lensR * 1.14, 64]} />
                <meshStandardMaterial color="#D8DEE8" metalness={0.85} roughness={0.22} />
              </mesh>
              {Array.from({ length: 7 }).map((_, i) => (
                <group key={i} userData={{ blade: i }} rotation={[0, 0, (i / 7) * Math.PI * 2]} position={[0, 0, 0.002 + i * 0.0002]}>
                  <mesh position={[lensR * 0.52, 0, 0]}>
                    <planeGeometry args={[lensR * 0.95, lensR * 0.34]} />
                    <meshStandardMaterial color="#1E2636" metalness={0.7} roughness={0.35} side={THREE.DoubleSide} />
                  </mesh>
                </group>
              ))}
            </group>
          </group>
        </group>

        {/* 03: lit bay behind the door; ad cards slide out of it */}
        <group ref={bay} visible={false}>
          {/* a dark recessed screen with a thin lit frame (the ad console) */}
          <mesh position={[xc - 0.008, (PANEL.y0 + PANEL.y1) / 2, 0]}>
            <boxGeometry args={[0.004, (PANEL.y1 - PANEL.y0) * 0.66, zE * 0.82]} />
            <meshStandardMaterial color="#0A1530" metalness={0.4} roughness={0.35} />
          </mesh>
          <mesh position={[xc - 0.005, (PANEL.y0 + PANEL.y1) / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[zE * 0.74, (PANEL.y1 - PANEL.y0) * 0.58]} />
            <meshStandardMaterial ref={slot} color="#0B2A6B" emissive="#1F6BFF" emissiveIntensity={0.3} toneMapped={false} />
          </mesh>
          <group ref={cards} position={[xc, (PANEL.y0 + PANEL.y1) / 2, 0]}>
            {[0, 1, 2].map((i) => (
              <mesh key={i} position={[0, (i - 1) * 0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[zE * 0.62, 0.03]} />
                <meshBasicMaterial color={i === 0 ? "#FFFFFF" : "#CFE0FF"} transparent opacity={0} side={THREE.DoubleSide} depthWrite={false} toneMapped={false} />
              </mesh>
            ))}
          </group>
        </group>
        <group ref={hinge} position={pivot}>
          <group ref={door}>
            <group position={[-pivot[0], 0, -pivot[2]]}>
              <primitive object={obj.door} />
              <primitive object={built.xrayObj.door} />
              {wire("door")}
              <group ref={bolts} visible={false}>
                {boltSpots.map(([a, y], i) => (
                  <group key={i} position={[Math.cos(a) * (rp + 0.004), y, Math.sin(a) * (rp + 0.004)]} rotation={[0, -a, 0]}>
                    <mesh rotation={[0, 0, Math.PI / 2]}>
                      <cylinderGeometry args={[0.0065, 0.0065, 0.006, 6]} />
                      <meshStandardMaterial color="#AEB7C6" metalness={0.9} roughness={0.25} />
                    </mesh>
                  </group>
                ))}
              </group>
            </group>
          </group>
        </group>

        {/* 04: three test discs inside the lower band */}
        <group ref={discs} visible={false}>
          {[0.19, 0.235, 0.28].map((y, i) => (
            <group key={y} position={[0, y, 0]}>
              <mesh>
                <cylinderGeometry args={[prof.r(y) * 0.68, prof.r(y) * 0.68, 0.012, 48]} />
                <meshStandardMaterial color="#C3CBD8" metalness={0.85} roughness={0.25} />
              </mesh>
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[prof.r(y) * 0.69, 0.0035, 6, 96]} />
                <meshBasicMaterial color={i === 2 ? "#0866FF" : "#7FB0FF"} transparent opacity={0} toneMapped={false} />
              </mesh>
              {/* a notch so the spin reads */}
              <mesh position={[prof.r(y) * 0.6, 0.007, 0]}>
                <boxGeometry args={[prof.r(y) * 0.12, 0.002, 0.008]} />
                <meshBasicMaterial color="#0866FF" toneMapped={false} />
              </mesh>
            </group>
          ))}
        </group>

        {/* the fine line that draws the wireframe */}
        <mesh ref={sweep} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1, 0.008, 6, 128]} />
          <meshBasicMaterial color="#A9C8FF" transparent opacity={0} depthWrite={false} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload(SHIP_URL);
