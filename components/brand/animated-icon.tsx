"use client";

import { useEffect, useRef, useState } from "react";

// A 3D icon (Higgsfield render) that plays a short seamless loop while it's on screen.
// Rendered on pure white, so it sits flush on white cards.
// Speed + correctness:
// - Server and first browser render are identical (a lazy-loaded still), so there's no
//   hydration mismatch. The video is added only after mount, once the icon scrolls into
//   view, and only if motion is allowed (`?motion=1` previews motion even with the OS
//   reduced-motion setting on, same as the hero).
// - Plays only while visible (battery), files are tiny (/public/icons3d/<name>.webp/.mp4).

export function AnimatedIcon({
  name,
  size = 96,
  className = "",
  offset = 0,
}: {
  name: string;
  size?: number;
  className?: string;
  /** seconds into the loop to start, so neighbours don't move in sync */
  offset?: number;
}) {
  const box = useRef<HTMLSpanElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [play, setPlay] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const force = new URLSearchParams(window.location.search).get("motion") === "1";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches && !force;
    if (reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setPlay(true);
          vid.current?.play().catch(() => {});
        } else vid.current?.pause();
      },
      { rootMargin: "120px 0px", threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const still = `/icons3d/${name}.webp`;
  return (
    <span ref={box} className={`relative block shrink-0 overflow-hidden rounded-2xl bg-white ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={still} alt="" width={size} height={size} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-contain" />
      {play && !failed && (
        <video
          ref={vid}
          src={`/icons3d/${name}.mp4`}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          onError={() => setFailed(true)}
          onLoadedMetadata={(e) => {
            const v = e.currentTarget;
            if (offset && v.duration) v.currentTime = offset % v.duration;
          }}
          className="absolute inset-0 h-full w-full object-contain"
        />
      )}
    </span>
  );
}
