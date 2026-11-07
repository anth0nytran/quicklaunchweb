"use client";

import { createContext, useContext, useEffect } from "react";
import type { Qualifier } from "@/components/discovery-call";

// Shared booking state for pages inside <BrandShell>.
// - book(location): opens the full-screen booking popup (tracks cta_click).
// - qualifier: the one qualifier state the popup and the inline #book section share,
//   so a visitor never answers twice and only one lead / Calendly listener exists.
// - registerSource: the inline #book section tells the shell its page source
//   (e.g. "website_growth_engine") so popup bookings keep the same utm_source.

export type BookingContextValue = {
  book: (location: string) => void;
  modalOpen: boolean;
  qualifier: Qualifier | null;
  registerSource: (source: string) => () => void;
};

export const BookingContext = createContext<BookingContextValue | null>(null);

/** Returns book(location): opens the booking popup. Outside BrandShell it falls back to the home page's #book. */
export function useBooking() {
  const ctx = useContext(BookingContext);
  return (
    ctx?.book ??
    ((/* location */) => {
      const target = document.getElementById("book");
      if (target) target.scrollIntoView({ behavior: "smooth" });
      else window.location.href = "/#book";
    })
  );
}

export function useBookingContext() {
  return useContext(BookingContext);
}

/** Lets an inline #book section set the page source the popup uses. */
export function useRegisterBookingSource(source: string) {
  const ctx = useContext(BookingContext);
  const register = ctx?.registerSource;
  useEffect(() => (register ? register(source) : undefined), [register, source]);
}
