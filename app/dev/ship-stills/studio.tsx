"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { PARTS, ShipHybrid, type ShipRig } from "@/components/brand/ship-hybrid";

// ?step=0..4 opens that step's cutaway; ?step=-1 is the closed ship. Square, transparent.
export default function Studio() {
  const [step, setStep] = useState<number | null>(null);
  const mats = useRef<THREE.Material[]>([]);
  const rig = useRef<ShipRig>({ gear: 1, compress: 0 });
  useEffect(() => {
    const q = Number(new URLSearchParams(window.location.search).get("step") ?? "-1");
    // open after a beat so the cutaway sequence plays (and settles) like it does in the hero
    const t = window.setTimeout(() => setStep(q), 300);
    return () => window.clearTimeout(t);
  }, []);
  const idx = step !== null && step >= 0 ? step : null;
  const face = idx !== null ? PARTS[idx].face : 0.6;
  return (
    <div style={{ width: 1200, height: 1200, background: "transparent" }}>
      <Canvas
        dpr={1}
        gl={{ preserveDrawingBuffer: true, alpha: true, antialias: true }}
        camera={{ position: [0, 0.78, 3.1], fov: 26 }}
        onCreated={({ gl, camera }) => {
          gl.localClippingEnabled = true;
          gl.setClearColor(0x000000, 0);
          camera.lookAt(0, 0.5, 0);
        }}
      >
        <hemisphereLight args={["#F2F5FA", "#CFC6B8", 1.15]} />
        <directionalLight position={[2, 9, 3]} intensity={0.9} color="#F6F8FC" />
        <directionalLight position={[-6, 3, 5]} intensity={0.35} color="#E6ECF5" />
        <Suspense fallback={null}>
          <group rotation={[0, -face, 0]}>
            <ShipHybrid openIdx={idx} mats={mats} rig={rig} />
          </group>
          <ContactShadows position={[0, 0.001, 0]} scale={1.4} far={0.5} blur={2.4} opacity={0.5} resolution={1024} color="#0B1633" />
          <Environment resolution={256}>
            <Lightformer form="rect" intensity={1.6} position={[0, 6, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[14, 14, 1]} color="#F4F7FC" />
            <Lightformer form="rect" intensity={0.7} position={[0, 1.5, 6]} scale={[12, 3, 1]} color="#EEF2F8" />
            <Lightformer form="rect" intensity={0.45} position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[14, 14, 1]} color="#D9D1C4" />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}
