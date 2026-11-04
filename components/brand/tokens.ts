// Brand class-name tokens and colors as plain strings. Kept out of
// primitives.tsx (a "use client" module) so server components can import them:
// a server component importing a value from a client module gets a reference
// placeholder, not the string, and renders class="[object Object]".

export const NAVY = "#07143F";
export const BLUE = "#0866FF";

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0866FF]/30 focus-visible:ring-offset-2";

export const primaryBtn = `group inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#0866FF] font-bold text-white shadow-[0_10px_25px_-10px_rgba(8,102,255,0.7)] transition-all hover:bg-[#0753CF] active:scale-[0.98] ${focusRing}`;
export const outlineBtn = `group inline-flex items-center justify-center gap-2.5 rounded-xl border-2 border-[#0866FF]/30 bg-white font-bold text-[#0866FF] transition-all hover:border-[#0866FF] hover:bg-[#EFF8FF] active:scale-[0.98] ${focusRing}`;

export const sectionH2 = "text-[28px] font-extrabold leading-[1.15] tracking-[-0.03em] sm:text-[36px]";
export const pageH1 = "text-[36px] font-extrabold leading-[1.08] tracking-[-0.04em] sm:text-[46px] lg:text-[54px]";
export const bodyText = "text-[16px] leading-[1.55] text-[#46516B] sm:text-[17px]";
export const card =
  "rounded-xl border border-[#E5EDF6] bg-white shadow-[0_4px_20px_-10px_rgba(7,20,63,0.12)]";
export const container = "mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8";
export const sectionPad = "py-12 sm:py-20";
