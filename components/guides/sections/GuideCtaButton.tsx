"use client";

import Link from "next/link";
import { useBooking } from "@/components/brand/brand-shell";
import { KitIcon, outlineBtn, primaryBtn } from "@/components/brand/primitives";

const BOOK_LABEL = "Book a Free Strategy Call";

/**
 * Guide CTA button. With no href it is "Book a Free Strategy Call" (via useBooking);
 * an explicit href is kept as a brand-styled link with its own label.
 * Callers pass hrefs through ctaHref() so old website-offer links become bookings.
 */
export function GuideCtaButton({
  href,
  label,
  location,
  variant = "primary",
  className = "",
}: {
  href?: string;
  label?: string;
  location: string;
  variant?: "primary" | "outline";
  className?: string;
}) {
  const book = useBooking();
  const base = `${variant === "primary" ? primaryBtn : outlineBtn} px-6 py-3.5 text-[16px] ${className}`;
  const arrow = (
    <KitIcon
      name="arrow-right"
      white={variant === "primary"}
      className="h-4 w-4 transition-transform group-hover:translate-x-1"
    />
  );

  if (!href) {
    return (
      <button type="button" onClick={() => book(location)} className={base}>
        {BOOK_LABEL}
        {arrow}
      </button>
    );
  }

  return (
    <Link href={href} className={base}>
      {label ?? BOOK_LABEL}
      {arrow}
    </Link>
  );
}
