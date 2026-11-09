"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, MotionConfig, useReducedMotion } from "framer-motion";
import { Menu } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { CloudBand } from "@/components/brand/flair";
import { Parallax } from "@/components/brand/motion";
import { useEventTracker } from "@/lib/analytics";
import { BRAND_VARS, Backdrop, NAVY, KitIcon, focusRing, primaryBtn, container } from "@/components/brand/primitives";
import { BookingContext, useBooking, type BookingContextValue } from "@/components/booking/booking-context";
import { BookingModal } from "@/components/booking/booking-modal";
import { useQualifier } from "@/components/discovery-call";

export { useBooking };

// Page frame for the light rebrand: header, footer, CTA band, sticky mobile
// CTA, brand font + colors. Wrap a page's sections in <BrandShell>.

type NavLink = { name: string; href: string };

/** Top menu: the three offers, then proof and learning. Keep it flat, no dropdowns. */
const mainLinks: (NavLink & { match: (path: string) => boolean; homeAnchor?: string })[] = [
  { name: "The Engine", href: "/houston-growth-engine", match: (p) => p.startsWith("/houston-growth-engine") },
  {
    name: "AI Search & SEO",
    href: "/services/web-design",
    match: (p) => p.startsWith("/services/web-design") || p === "/houston-web-design-for-contractors",
  },
  { name: "Automations", href: "/services/automations", match: (p) => p.startsWith("/services/automations") },
  { name: "Clients", href: "/#results", match: () => false, homeAnchor: "results" },
  { name: "Guides", href: "/guides", match: (p) => p.startsWith("/guides") },
];

// =============================================================================
// Booking — every "Book a Free Call" goes through here
// =============================================================================

// useBooking() (re-exported above) returns book(location), which opens the
// full-screen booking popup. See components/booking/.

/** True for links that point at this page's (or the home page's) #book section. */
function isBookHref(anchor: HTMLAnchorElement) {
  const raw = anchor.getAttribute("href") || "";
  if (!raw.endsWith("#book")) return false;
  try {
    const url = new URL(anchor.href, window.location.href);
    return url.origin === window.location.origin && url.pathname === window.location.pathname;
  } catch {
    return false;
  }
}

// =============================================================================
// Header
// =============================================================================

const navItem = `rounded-lg px-3.5 py-2 text-[15px] font-medium transition-colors hover:bg-[#EFF8FF] hover:text-[#0866FF] ${focusRing}`;
const navActive = "bg-[#EFF8FF] font-semibold text-[#0866FF]";
const navIdle = "text-[#46516B]";

function SiteHeader({ onBook }: { onBook: (location: string) => void }) {
  const pathname = usePathname() || "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Home-page anchors: smooth scroll when we're already home, otherwise navigate.
  const homeAnchor = (id: string) => (e: React.MouseEvent) => {
    setMenuOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const mobileLink = "border-b border-[#E5EDF6] py-3.5 text-left text-lg font-semibold";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled || menuOpen ? "shadow-[0_1px_0_#E5EDF6,0_8px_24px_-12px_rgba(7,20,63,0.15)]" : ""
      }`}
    >
      <div className={`${container} flex h-[72px] items-center justify-between gap-4 lg:h-20`}>
        <Link href="/" className={`shrink-0 rounded-lg ${focusRing}`}>
          <Image
            src="/home/logo.png"
            alt="QuickLaunchWeb"
            width={687}
            height={215}
            priority
            className="h-auto w-[170px] sm:w-[210px] lg:w-[230px]"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {mainLinks.map((link) => {
            const active = link.match(pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={link.homeAnchor ? homeAnchor(link.homeAnchor) : undefined}
                aria-current={active ? "page" : undefined}
                className={`${navItem} ${active ? navActive : navIdle}`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onBook("header")}
            className={`${primaryBtn} hidden px-5 py-3 text-[15px] sm:inline-flex`}
          >
            Book a Free Call
            <KitIcon name="arrow-right" white className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className={`flex h-11 w-11 items-center justify-center rounded-xl text-[#07143F] hover:bg-[#EFF8FF] lg:hidden ${focusRing}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <KitIcon name="close" className="h-6 w-6" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-[#E5EDF6] bg-white lg:hidden"
            aria-label="Mobile"
          >
            <div className={`${container} flex flex-col py-4`}>
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={link.homeAnchor ? homeAnchor(link.homeAnchor) : () => setMenuOpen(false)}
                  className={mobileLink}
                >
                  {link.name}
                </Link>
              ))}
              <Link href="/support" onClick={() => setMenuOpen(false)} className={mobileLink}>
                Support
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onBook("mobile_menu");
                }}
                className={`${primaryBtn} mt-5 px-5 py-4 text-base`}
              >
                Book a Free Call
                <KitIcon name="arrow-right" white className="h-4 w-4" />
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

// =============================================================================
// CTA band (blue, animated rocket scene bottom right)
// =============================================================================

/**
 * Layered CTA art: rocket (flies in on view, then bobs and
 * drifts up with scroll) → clouds (front). Decorative; reduced motion = static.
 */
function CtaRocketScene() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[360px] md:block lg:w-[460px]" aria-hidden="true">

      <Parallax distance={-16} className="absolute bottom-[24%] right-[20%] w-[140px] lg:w-[165px]">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -70, y: 70 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="ql-float">
            <Image src="/home/rocket.png" alt="" width={1324} height={1106} sizes="185px" className="h-auto w-full" />
          </div>
        </motion.div>
      </Parallax>

      {/* Front clouds (same art as the hero's cloud band), faded in from the left so they never sit under the button. */}
      <Image
        src="/home/cloud-band.png"
        alt=""
        width={2400}
        height={197}
        sizes="800px"
        className="absolute -bottom-1 right-0 h-auto w-[200%] max-w-none opacity-95"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 45%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 45%)",
        }}
      />
    </div>
  );
}

export function CtaBand({
  title = "Ready for More Calls and More Booked Jobs?",
  subtitle = "Book a free call. We'll tell you straight if we can help.",
  location = "cta_band",
  buttonLabel = "Book a Free Call",
}: {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  /** Analytics cta_location, so bands on different pages can be told apart. */
  location?: string;
}) {
  const book = useBooking();
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#0753CF] via-[#0866FF] to-[#2b7bff]">
      <CtaRocketScene />
      <div className={`${container} relative flex flex-col items-center gap-7 py-12 text-center sm:py-14 lg:flex-row lg:justify-between lg:text-left`}>
        <div>
          <h2 className="text-[26px] font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-[32px]">{title}</h2>
          <p className="mt-2 text-[17px] text-white/85">{subtitle}</p>
        </div>
        <div className="flex shrink-0 flex-col items-center gap-3 lg:mr-[280px]">
          <button
            type="button"
            onClick={() => book(location)}
            className="group inline-flex items-center gap-2.5 whitespace-nowrap rounded-xl bg-white px-8 py-4 text-[16px] font-bold text-[#0866FF] shadow-xl shadow-[#07143F]/25 transition-all hover:bg-[#EFF8FF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 active:scale-[0.98]"
          >
            {buttonLabel}
            <KitIcon name="arrow-right" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-[13px] text-white/85">
            {["100% Free", "No Pressure", "Houston-Based"].map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <KitIcon name="check" white className="h-3.5 w-3.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// Shell
// =============================================================================

export function BrandShell({
  children,
  pagePath,
  stickyCta = true,
}: {
  children: React.ReactNode;
  /** Used in analytics events. Defaults to the current path. */
  pagePath?: string;
  /** Show the floating "Book a Free Call" button on phones. */
  stickyCta?: boolean;
}) {
  const pathname = usePathname() || "/";
  const path = pagePath ?? pathname;
  const { track } = useEventTracker();
  const [showMobileCTA, setShowMobileCTA] = useState(false);
  const scrollTrackedRef = useRef<Set<number>>(new Set());

  // One booking popup per page. Its qualifier state is shared with the inline
  // #book section (if the page has one), so nobody answers twice.
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingSource, setBookingSource] = useState("website");
  const qualifier = useQualifier(bookingSource);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const openBooking = useCallback(() => {
    const active = document.activeElement;
    returnFocusRef.current = active instanceof HTMLElement && active !== document.body ? active : null;
    setBookingOpen(true);
  }, []);

  const book = useCallback(
    (location: string) => {
      track("cta_click", {
        cta_text: "Book a Free Call",
        cta_location: location,
        page_path: path,
        event_category: "engagement",
        event_label: `${location}_cta`,
      });
      openBooking();
    },
    [track, path, openBooking]
  );

  const onBookingOpenChange = useCallback((open: boolean) => {
    setBookingOpen(open);
    // Drop a #book hash so a refresh doesn't pop the booking open again.
    if (!open && window.location.hash === "#book") {
      window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
    }
  }, []);

  const onBookingCloseAutoFocus = useCallback((e: Event) => {
    const target = returnFocusRef.current;
    if (target && target.isConnected) {
      e.preventDefault();
      target.focus({ preventScroll: true });
    }
    returnFocusRef.current = null;
  }, []);

  // Radix locks <body>; this site scrolls on <html>, so lock that too.
  useEffect(() => {
    if (!bookingOpen) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, [bookingOpen]);

  const registerSource = useCallback((source: string) => {
    setBookingSource(source);
    return () => setBookingSource((current) => (current === source ? "website" : current));
  }, []);

  // Links to "#book" (old guide CTAs, emails, other pages linking to "/#book")
  // open the popup instead of jumping to the bottom of the page.
  useEffect(() => {
    if (window.location.hash === "#book") {
      book("url_hash");
    }
    const onHash = () => {
      if (window.location.hash === "#book") book("url_hash");
    };
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target === "_blank") return;
      if (!isBookHref(anchor)) return;
      e.preventDefault();
      book(anchor.dataset.ctaLocation || "book_link");
    };
    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once per page; `book` only changes with path.
  }, []);

  const bookingValue = useMemo<BookingContextValue>(
    () => ({ book, modalOpen: bookingOpen, qualifier, registerSource }),
    [book, bookingOpen, qualifier, registerSource]
  );

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > 500 && y > lastScrollY) setShowMobileCTA(true);
      else if (y < lastScrollY) setShowMobileCTA(false);
      lastScrollY = y;

      const pct = ((y + window.innerHeight) / document.documentElement.scrollHeight) * 100;
      [25, 50, 75, 90].forEach((threshold) => {
        if (pct >= threshold && !scrollTrackedRef.current.has(threshold)) {
          scrollTrackedRef.current.add(threshold);
          track("scroll_depth", {
            scroll_depth: threshold,
            page_path: path,
            event_category: "engagement",
            event_label: `${threshold}%`,
          });
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [track, path]);

  return (
    <BookingContext.Provider value={bookingValue}>
      <MotionConfig reducedMotion="user">
        <div
          className="ql-brand relative flex min-h-screen flex-col overflow-x-clip bg-white antialiased"
          style={{ ...BRAND_VARS, color: NAVY, fontFamily: "var(--font-inter), Arial, sans-serif" }}
        >
          <SiteHeader onBook={book} />
          <main className="flex-1">{children}</main>
          <div className="bg-[#07143F]">
            <SiteFooter />
          </div>

          <AnimatePresence>
            {stickyCta && showMobileCTA && (
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 60, opacity: 0 }}
                transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
                className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 sm:hidden [body[data-cookie-banner=open]_&]:hidden"
              >
                <button
                  type="button"
                  onClick={() => book("mobile_sticky")}
                  className={`${primaryBtn} pointer-events-auto w-full max-w-sm px-6 py-4 text-base shadow-2xl`}
                >
                  Book a Free Call
                  <KitIcon name="arrow-right" white className="h-5 w-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <BookingModal
          open={bookingOpen}
          onOpenChange={onBookingOpenChange}
          qualifier={qualifier}
          onCloseAutoFocus={onBookingCloseAutoFocus}
        />
      </MotionConfig>
    </BookingContext.Provider>
  );
}

/** Light page hero for inner pages: eyebrow, H1, intro, CTAs, optional art on the right. */
export function PageHero({
  eyebrow,
  title,
  intro,
  art,
  primaryLabel = "Book a Free Call",
  secondary,
  children,
  eyebrowInHeading = false,
}: {
  eyebrow: string;
  /** Render the eyebrow inside the H1 (same look) so the heading carries the page's target phrase. */
  eyebrowInHeading?: boolean;
  title: React.ReactNode;
  intro?: React.ReactNode;
  art?: React.ReactNode;
  primaryLabel?: string;
  secondary?: { label: string; href: string };
  children?: React.ReactNode;
}) {
  const book = useBooking();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#EFF8FF] to-[#f7fbff] pb-16 pt-[104px] sm:pt-28 lg:pb-28 lg:pt-32">
      <Backdrop variant="dots" />
      <CloudBand className="opacity-60" />
      <div className={`${container} relative z-10 grid items-center gap-10 ${art ? "md:grid-cols-2 lg:grid-cols-[1.1fr_1fr]" : ""}`}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={art ? "" : "max-w-3xl"}
        >
          {eyebrowInHeading ? (
            <h1 className="text-[36px] font-extrabold leading-[1.08] tracking-[-0.04em] sm:text-[46px] lg:text-[52px]">
              <span className="mb-4 block text-[12px] font-semibold uppercase leading-normal tracking-[0.2em] text-[#46516B]">
                {eyebrow}
              </span>
              {title}
            </h1>
          ) : (
            <>
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#46516B]">{eyebrow}</p>
              <h1 className="mt-4 text-[36px] font-extrabold leading-[1.08] tracking-[-0.04em] sm:text-[46px] lg:text-[52px]">
                {title}
              </h1>
            </>
          )}
          {intro && <div className="mt-5 max-w-[36rem] text-[17px] leading-[1.55] text-[#46516B] sm:text-[18px]">{intro}</div>}
          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
            <button type="button" onClick={() => book("hero")} className={`${primaryBtn} px-7 py-4 text-[16px]`}>
              {primaryLabel}
              <KitIcon name="arrow-right" white className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            {secondary && (
              <Link
                href={secondary.href}
                className={`group inline-flex items-center justify-center gap-2.5 rounded-xl border-2 border-[#0866FF]/30 bg-white px-7 py-4 text-[16px] font-bold text-[#0866FF] transition-all hover:border-[#0866FF] hover:bg-[#EFF8FF] ${focusRing}`}
              >
                {secondary.label}
                <KitIcon name="play" className="h-4 w-4" />
              </Link>
            )}
          </div>
          {children}
        </motion.div>
        {art && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-[620px]"
          >
            {art}
          </motion.div>
        )}
      </div>
    </section>
  );
}
