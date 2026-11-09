"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

// Reusable motion pieces for the brand pages. Subtle by default: they add depth,
// they don't perform. All of them switch off under prefers-reduced-motion.

/**
 * Scroll parallax. Moves its children `distance` px (negative = up, faster than
 * the page; positive = down, slower) while the element scrolls from its start
 * position to leaving the top of the viewport. Wrap a whole layer (e.g. the hero
 * art plus its overlays) so everything inside stays aligned.
 */
export function Parallax({
  children,
  distance = -40,
  className = "",
}: {
  children: React.ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Spring smooths wheel/trackpad steps so the drift feels glassy, not jumpy.
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const y = useTransform(smooth, [0, 1], [0, distance]);

  return (
    <motion.div ref={ref} style={reduce ? undefined : { y, willChange: "transform" }} className={className}>
      {children}
    </motion.div>
  );
}

/** Slow idle float (a few px, no rotation). Pairs with Parallax for a "breathing" hero. */
export function IdleFloat({
  children,
  className = "",
  seconds = 7,
}: {
  children: React.ReactNode;
  className?: string;
  seconds?: number;
}) {
  return (
    <div className={`ql-drift ${className}`} style={{ animationDuration: `${seconds}s` }}>
      {children}
    </div>
  );
}

/** Shared: arm on mount (hide), flip to drawn when scrolled into view. Off for reduced motion. */
function useDrawOnView<T extends Element>() {
  const ref = useRef<T>(null);
  const [armed, setArmed] = useState(false);
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setArmed(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        requestAnimationFrame(() => requestAnimationFrame(() => setDrawn(true)));
      },
      { rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const cls = `${armed ? "ql-line-armed" : ""} ${drawn ? "is-drawn" : ""}`;
  return { ref, cls };
}

/**
 * Hand-drawn swoosh under a word. Wrap the word: <DrawUnderline>More Money.</DrawUnderline>.
 * Decorative only (aria-hidden), sits behind the text.
 */
export function DrawUnderline({
  children,
  delay = 0.6,
  color = "#0866FF",
}: {
  children: React.ReactNode;
  delay?: number;
  color?: string;
}) {
  const { ref, cls } = useDrawOnView<SVGPathElement>();
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 300 20"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -bottom-[0.14em] left-[2%] h-[0.28em] w-[96%] overflow-visible"
      >
        <path
          ref={ref}
          pathLength={1}
          d="M4 14 C 60 6, 140 4, 210 8 S 280 12, 296 6"
          fill="none"
          stroke={color}
          strokeOpacity={0.35}
          strokeWidth={7}
          strokeLinecap="round"
          className={cls}
          style={{ "--draw-delay": `${delay}s` } as React.CSSProperties}
        />
      </svg>
    </span>
  );
}

/**
 * Connector line that draws left to right on view (e.g. between process steps).
 * Absolutely position it with className; it stretches to its box.
 */
export function DrawLine({ className = "", delay = 0.2 }: { className?: string; delay?: number }) {
  const { ref, cls } = useDrawOnView<SVGPathElement>();
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 100 4"
      preserveAspectRatio="none"
      className={`pointer-events-none overflow-visible ${className}`}
    >
      {/* Faint track so the line has somewhere to "draw" along. */}
      <path d="M0 2 H100" stroke="#0866FF" strokeOpacity={0.12} strokeWidth={2} vectorEffect="non-scaling-stroke" />
      <path
        ref={ref}
        pathLength={1}
        d="M0 2 H100"
        fill="none"
        stroke="#0866FF"
        strokeOpacity={0.55}
        strokeWidth={2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className={cls}
        style={{ "--draw-delay": `${delay}s` } as React.CSSProperties}
      />
    </svg>
  );
}
