"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// A 3D icon (Higgsfield render) that plays a short seamless loop while it's on screen.
// Rendered on pure white, so it sits flush on white cards. Reduced motion: the still only.
// Files: /public/icons3d/<name>.webp (still) and /public/icons3d/<name>.mp4 (loop).

export function AnimatedIcon({ name, size = 96, className = "", offset = 0 }: { name: string; size?: number; className?: string; /** seconds into the loop to start, so neighbours don't move in sync */ offset?: number }) {
  const osReduce = useReducedMotion();
  // `?motion=1` previews the motion even when the OS asks for reduced motion (same as the hero).
  const [force, setForce] = useState(false);
  useEffect(() => setForce(new URLSearchParams(window.location.search).get("motion") === "1"), []);
  const reduce = osReduce && !force;
  const ref = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(true);

  // Only play while visible (saves battery on phones).
  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.2 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);

  const still = `/icons3d/${name}.webp`;
  return (
    <span className={`relative block shrink-0 overflow-hidden rounded-2xl bg-white ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      {reduce || !hasVideo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={still} alt="" width={size} height={size} loading="lazy" className="h-full w-full object-contain" />
      ) : (
        <video
          ref={ref}
          src={`/icons3d/${name}.mp4`}
          poster={still}
          muted
          loop
          playsInline
          preload="none"
          onError={() => setHasVideo(false)}
          onLoadedMetadata={(e) => {
            const v = e.currentTarget;
            if (offset && v.duration) v.currentTime = offset % v.duration;
          }}
          className="h-full w-full object-contain"
        />
      )}
    </span>
  );
}
