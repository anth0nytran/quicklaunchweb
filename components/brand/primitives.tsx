"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { KIT_ICON_SVGS } from "@/lib/kitIconSvgs";

// Light brand system (the redesign). Palette, type, and icons come from
// website-assets/README-LLM.md; icons are the kit SVGs copied to /public/home/icons.
// Every rebranded page renders inside <BrandShell>, which applies these.

/** Re-points the shared --color-accent tokens to brand blue for embedded legacy components. */
export const BRAND_VARS = {
  "--color-accent": "8 102 255",
  "--color-accent-hover": "7 83 207",
  "--color-accent-rgb": "8, 102, 255",
  "--color-accent-hover-rgb": "7, 83, 207",
  "--color-accent-gradient-to": "56, 189, 248",
} as React.CSSProperties;

// Plain string tokens live in tokens.ts so server components can import them;
// re-exported here so client code can keep importing from one place.
export {
  NAVY,
  BLUE,
  focusRing,
  primaryBtn,
  outlineBtn,
  sectionH2,
  pageH1,
  bodyText,
  card,
  container,
  sectionPad,
} from "@/components/brand/tokens";

const ICON = (name: string) => `/home/icons/${name}.svg`;

/** Kit icon as an image. `white` turns the blue SVG white for blue tiles/buttons. */
export function KitIcon({
  name,
  className = "",
  white = false,
}: {
  name: string;
  className?: string;
  white?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={ICON(name)}
      alt=""
      aria-hidden="true"
      className={className}
      style={white ? { filter: "brightness(0) invert(1)" } : undefined}
    />
  );
}

/**
 * Kit icon that draws itself stroke by stroke when it scrolls into view (the
 * "hand-drawn" look). Server HTML is fully drawn, so no-JS and reduced-motion
 * visitors just see the icon; JS arms it (hides strokes) then draws on view.
 * Data comes from lib/kitIconSvgs.ts (node tools/build-kit-icons.mjs).
 */
export function DrawIcon({
  name,
  className = "",
  white = false,
  delay = 0,
}: {
  name: string;
  className?: string;
  white?: boolean;
  /** Seconds to wait before drawing (stagger icons in a row). */
  delay?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [armed, setArmed] = useState(false);
  const [drawn, setDrawn] = useState(false);
  const icon = KIT_ICON_SVGS[name];
  // Stable object: a new {__html} each render makes React rebuild the shapes,
  // which skips the draw transition (they'd appear already drawn).
  const html = useMemo(() => (icon ? { __html: icon.inner } : undefined), [icon]);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setArmed(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        // Next frame, so the hidden (armed) state paints first and the draw transitions.
        requestAnimationFrame(() => requestAnimationFrame(() => setDrawn(true)));
      },
      { rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!icon) return <KitIcon name={name} white={white} className={className} />;

  return (
    <svg
      ref={ref}
      viewBox={icon.viewBox}
      fill="none"
      stroke={white ? "#FFFFFF" : "#0866FF"}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`${armed ? "ql-draw-armed" : ""} ${drawn ? "is-drawn" : ""} ${className}`}
      style={{ "--draw-delay": `${delay}s` } as React.CSSProperties}
      dangerouslySetInnerHTML={html}
    />
  );
}

/** White icon in a 48px blue rounded tile (services). */
export function IconTile({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0866FF] p-2.5 shadow-[0_10px_20px_-10px_rgba(8,102,255,0.8)] ${className}`}
    >
      <DrawIcon name={name} white className="h-full w-full" />
    </span>
  );
}

/** Blue icon in a 56px pale circle (process steps). */
export function IconCircle({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#EFF8FF] p-3.5 ${className}`}>
      <DrawIcon name={name} className="h-full w-full" />
    </span>
  );
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0866FF] ${className}`}>
      {children}
    </p>
  );
}

export function CheckList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((item, i) => (
        <li key={item} className="flex items-start gap-2.5 text-[15px] leading-[1.5] text-[#46516B]">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0866FF]/10">
            <DrawIcon name="check" delay={0.1 + i * 0.12} className="h-3.5 w-3.5" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      // Starts mostly visible: content never depends on the animation firing.
      initial={{ opacity: 0.35, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Decorative section backdrop: soft brand-blue glows + a faint dot grid, so wide
 * sections don't read as flat empty white. Put inside a `relative overflow-hidden`
 * section, before the content. Purely decorative (aria-hidden).
 */
export function Backdrop({
  variant = "glow",
  className = "",
}: {
  variant?: "glow" | "dots" | "glow-dots";
  className?: string;
}) {
  const glow = variant === "glow" || variant === "glow-dots";
  const dots = variant === "dots" || variant === "glow-dots";
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {glow && (
        <>
          <div className="absolute -left-40 top-[-10%] h-[520px] w-[520px] rounded-full bg-[#0866FF]/[0.07] blur-3xl" />
          <div className="absolute -right-32 bottom-[-15%] h-[460px] w-[460px] rounded-full bg-sky-300/[0.18] blur-3xl" />
        </>
      )}
      {dots && (
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(8,102,255,0.13) 1px, transparent 0)",
            backgroundSize: "26px 26px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      )}
    </div>
  );
}
