"use client";

// Cookie banner + preferences panel + the ONLY place Google Analytics and the
// Meta Pixel get loaded. Nothing from Google or Meta loads until the visitor
// opts in to that category. Global Privacy Control always keeps ads off.
// Vercel Analytics (cookieless, no cross-site tracking) is loaded separately in app/layout.tsx.

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  CONSENT_OPEN_EVENT,
  type ConsentMethod,
  type ConsentState,
  isGpcEnabled,
  readConsent,
  saveConsent,
} from "@/lib/consent";

type Props = {
  gaId?: string;
  pixelId?: string;
};

type AnyFn = (...args: unknown[]) => void;
type TrackingWindow = Window & {
  dataLayer?: unknown[];
  gtag?: unknown;
  fbq?: unknown;
  _fbq?: unknown;
  [key: `ga-disable-${string}`]: boolean | undefined;
};

const win = () => window as unknown as TrackingWindow;

// ---------------------------------------------------------------------------
// Loaders (run only after consent)
// ---------------------------------------------------------------------------

function ensureGtagStub(): AnyFn {
  const w = win();
  w.dataLayer = w.dataLayer || [];
  if (typeof w.gtag !== "function") {
    // gtag.js needs the real `arguments` object, not an array.
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
    };
  }
  return w.gtag as AnyFn;
}

function googleConsent(analytics: boolean, ads: boolean) {
  const v = (on: boolean) => (on ? "granted" : "denied");
  return {
    analytics_storage: v(analytics),
    ad_storage: v(ads),
    ad_user_data: v(ads),
    ad_personalization: v(ads),
  };
}

function loadGoogleAnalytics(id: string, ads: boolean) {
  const gtag = ensureGtagStub();
  // Consent Mode v2: everything denied by default, then updated to the visitor's choice.
  gtag("consent", "default", {
    ...googleConsent(false, false),
    functionality_storage: "granted",
    security_storage: "granted",
  });
  gtag("set", "ads_data_redaction", !ads);
  gtag("consent", "update", googleConsent(true, ads));
  gtag("js", new Date());
  gtag("config", id, { anonymize_ip: true, cookie_flags: "SameSite=None;Secure" });

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  s.dataset.consent = "analytics";
  document.head.appendChild(s);
}

function loadMetaPixel(id: string) {
  const w = win();
  if (typeof w.fbq !== "function") {
    // Standard Meta base code, unrolled.
    const n = function (...args: unknown[]) {
      const self = n as unknown as { callMethod?: AnyFn; queue: unknown[] };
      if (self.callMethod) self.callMethod(...args);
      else self.queue.push(args);
    } as unknown as AnyFn & { push: unknown; loaded: boolean; version: string; queue: unknown[] };
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    w.fbq = n;
    if (!w._fbq) w._fbq = n;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    s.dataset.consent = "ads";
    document.head.appendChild(s);
  }
  const fbq = w.fbq as AnyFn;
  fbq("consent", "grant");
  fbq("init", id);
  fbq("track", "PageView");
}

function deleteCookies(prefixes: string[]) {
  const host = window.location.hostname;
  const parts = host.split(".");
  const domains = [""];
  for (let i = 0; i < parts.length - 1; i++) domains.push(`; Domain=.${parts.slice(i).join(".")}`);
  document.cookie.split("; ").forEach((row) => {
    const name = row.split("=")[0];
    if (!prefixes.some((p) => name === p || name.startsWith(p))) return;
    domains.forEach((d) => {
      document.cookie = `${name}=; Max-Age=0; Path=/${d}`;
    });
  });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ConsentManager({ gaId, pixelId }: Props) {
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [gpc, setGpc] = useState(false);
  const [draft, setDraft] = useState({ analytics: false, ads: false });
  const loaded = useRef({ ga: false, pixel: false });
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  const apply = useCallback(
    (state: ConsentState | null) => {
      const analytics = state?.analytics === true;
      const ads = state?.ads === true && !isGpcEnabled();
      const w = win();

      // Google Analytics
      if (gaId) {
        if (analytics && !loaded.current.ga) {
          w[`ga-disable-${gaId}`] = false;
          loadGoogleAnalytics(gaId, ads);
          loaded.current.ga = true;
        } else if (loaded.current.ga) {
          w[`ga-disable-${gaId}`] = !analytics;
          (w.gtag as AnyFn)("consent", "update", googleConsent(analytics, ads));
        }
        if (!analytics) deleteCookies(["_ga", "_gid", "_gat"]);
      }

      // Meta Pixel
      if (pixelId) {
        if (ads && !loaded.current.pixel) {
          loadMetaPixel(pixelId);
          loaded.current.pixel = true;
        } else if (loaded.current.pixel) {
          (w.fbq as AnyFn)("consent", ads ? "grant" : "revoke");
        }
      }
      if (!ads) deleteCookies(["_fbp", "_fbc"]);
    },
    [gaId, pixelId]
  );

  // First load: read the saved choice.
  useEffect(() => {
    const saved = readConsent();
    setGpc(isGpcEnabled());
    setConsent(saved);
    setBannerOpen(!saved);
    apply(saved);
    setReady(true);
  }, [apply]);

  // Footer links reopen the panel.
  useEffect(() => {
    const open = () => {
      const current = readConsent();
      setDraft({ analytics: current?.analytics ?? false, ads: current?.ads ?? false });
      setPrefsOpen(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, []);

  // Single-page navigation: tell the pixel about the new page.
  useEffect(() => {
    if (lastPath.current === null) {
      lastPath.current = pathname;
      return;
    }
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    const fbq = win().fbq;
    if (loaded.current.pixel && consent?.ads && typeof fbq === "function") {
      (fbq as AnyFn)("track", "PageView");
    }
  }, [pathname, consent]);

  const choose = useCallback(
    (choice: { analytics: boolean; ads: boolean; method: ConsentMethod }) => {
      const state = saveConsent(choice);
      setConsent(state);
      setBannerOpen(false);
      setPrefsOpen(false);
      apply(state);
    },
    [apply]
  );

  const acceptAll = () => choose({ analytics: true, ads: true, method: "accept_all" });
  const rejectAll = () => choose({ analytics: false, ads: false, method: "reject_all" });
  const openPrefs = () => {
    setDraft({ analytics: consent?.analytics ?? false, ads: consent?.ads ?? false });
    setPrefsOpen(true);
  };

  if (!ready) return null;

  return (
    <>
      {bannerOpen && !prefsOpen && (
        <ConsentBanner gpc={gpc} onAccept={acceptAll} onReject={rejectAll} onChoose={openPrefs} />
      )}
      {prefsOpen && (
        <PreferencesDialog
          gpc={gpc}
          draft={draft}
          setDraft={setDraft}
          onSave={() => choose({ analytics: draft.analytics, ads: draft.ads, method: "custom" })}
          onAccept={acceptAll}
          onReject={rejectAll}
          onClose={() => setPrefsOpen(false)}
        />
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Banner
// ---------------------------------------------------------------------------

const btnBase =
  "inline-flex min-h-[40px] items-center justify-center rounded-lg px-3 text-[14px] font-semibold sm:px-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

function ConsentBanner({
  gpc,
  onAccept,
  onReject,
  onChoose,
}: {
  gpc: boolean;
  onAccept: () => void;
  onReject: () => void;
  onChoose: () => void;
}) {
  const ref = useRef<HTMLElement>(null);

  // While the banner is open, flag it on <body> and publish its height so other fixed
  // bottom UI (e.g. the mobile sticky "Book a Free Call" button) can hide or lift above it:
  //   body[data-cookie-banner="open"]   and   var(--cookie-banner-h)
  useEffect(() => {
    const el = ref.current;
    const root = document.documentElement;
    document.body.dataset.cookieBanner = "open";
    const setH = () => root.style.setProperty("--cookie-banner-h", `${(el?.offsetHeight ?? 0) + 16}px`);
    setH();
    const ro = typeof ResizeObserver !== "undefined" && el ? new ResizeObserver(setH) : null;
    if (ro && el) ro.observe(el);
    return () => {
      ro?.disconnect();
      delete document.body.dataset.cookieBanner;
      root.style.removeProperty("--cookie-banner-h");
    };
  }, []);

  return (
    <section
      ref={ref}
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-[680px] rounded-2xl border border-white/10 bg-[#07143F] p-3.5 text-white shadow-[0_18px_50px_-12px_rgba(7,20,63,0.55)] sm:p-5"
      style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
    >
      <p className="hidden text-[15px] font-bold leading-snug sm:block">Cookies, your call</p>
      <p className="text-[13px] leading-[1.5] text-white/85 sm:mt-1.5 sm:leading-[1.55]">
        We use cookies for analytics (Google) and to measure our ads (Meta).
        <span className="hidden sm:inline"> Necessary cookies keep the site working.</span> Change it anytime in
        Cookie settings.{" "}
        <a href="/privacy#cookies" className="font-medium text-[#EFF8FF] underline underline-offset-2">
          Privacy Policy
        </a>
      </p>
      {gpc && (
        <p className="mt-2 text-[12px] leading-[1.5] text-[#EFF8FF]">
          Your browser sent a Global Privacy Control signal, so ad tracking stays off.
        </p>
      )}
      <div className="mt-2.5 grid grid-cols-2 gap-2 sm:mt-3 sm:flex sm:items-center">
        <button
          type="button"
          onClick={onAccept}
          className={`${btnBase} bg-[#0866FF] text-white hover:bg-[#0753CF] focus-visible:ring-[#EFF8FF] focus-visible:ring-offset-[#07143F]`}
        >
          Accept all
        </button>
        <button
          type="button"
          onClick={onReject}
          className={`${btnBase} border border-white/40 bg-white/5 text-white hover:bg-white/15 focus-visible:ring-[#EFF8FF] focus-visible:ring-offset-[#07143F]`}
        >
          Reject non-essential
        </button>
        <button
          type="button"
          onClick={onChoose}
          className={`${btnBase} col-span-2 min-h-[32px] text-[#EFF8FF] underline underline-offset-2 hover:text-white focus-visible:ring-[#EFF8FF] focus-visible:ring-offset-[#07143F] sm:ml-auto sm:min-h-[40px]`}
        >
          Choose
        </button>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Preferences dialog
// ---------------------------------------------------------------------------

function PreferencesDialog({
  gpc,
  draft,
  setDraft,
  onSave,
  onAccept,
  onReject,
  onClose,
}: {
  gpc: boolean;
  draft: { analytics: boolean; ads: boolean };
  setDraft: (d: { analytics: boolean; ads: boolean }) => void;
  onSave: () => void;
  onAccept: () => void;
  onReject: () => void;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus in, Escape out, Tab stays inside, focus goes back where it came from.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>("button, a[href], input:not([disabled])")
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-[#07143F]/50 p-4 sm:items-center">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-title"
        aria-describedby="consent-desc"
        className="max-h-[90vh] w-full max-w-[580px] overflow-y-auto rounded-2xl bg-white p-5 text-[#07143F] shadow-2xl sm:p-6"
        style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="consent-title" className="text-[18px] font-extrabold leading-tight">
            Your privacy choices
          </h2>
          <button
            type="button"
            data-autofocus
            onClick={onClose}
            aria-label="Close privacy choices"
            className="-mr-1 -mt-1 rounded-md px-2 py-1 text-[20px] leading-none text-[#46516B] hover:text-[#07143F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0866FF]"
          >
            &times;
          </button>
        </div>
        <p id="consent-desc" className="mt-2 text-[14px] leading-[1.55] text-[#46516B]">
          Pick what we can use. Turning off Advertising is how you opt out of the &ldquo;sale&rdquo; or
          &ldquo;sharing&rdquo; of your info for targeted ads under US state privacy laws (including Texas and
          California). Your choice is saved on this browser for 12 months.
        </p>

        <ul className="mt-4 divide-y divide-[#E5EDF6] rounded-xl border border-[#E5EDF6]">
          <ToggleRow
            id="consent-necessary"
            title="Necessary"
            body="Keeps the site secure and working, remembers this choice, and runs booking (Calendly) and checkout (Stripe). Always on."
            checked
            disabled
          />
          <ToggleRow
            id="consent-analytics"
            title="Analytics"
            body="Google Analytics cookies that show us which pages people use. We don't use it to identify you."
            checked={draft.analytics}
            onChange={(v) => setDraft({ ...draft, analytics: v })}
          />
          <ToggleRow
            id="consent-ads"
            title="Advertising and marketing"
            body="Meta Pixel and Meta Conversions API. Lets Meta (Facebook/Instagram) measure our ads and show you our ads elsewhere. If you turn this off we don't send your visit or form details to Meta."
            checked={gpc ? false : draft.ads}
            disabled={gpc}
            note={gpc ? "Off because your browser sent a Global Privacy Control signal." : undefined}
            onChange={(v) => setDraft({ ...draft, ads: v })}
          />
        </ul>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onSave}
            className={`${btnBase} flex-1 whitespace-nowrap bg-[#07143F] text-white hover:bg-[#0d1f5c] focus-visible:ring-[#0866FF] focus-visible:ring-offset-white`}
          >
            Save my choices
          </button>
          <button
            type="button"
            onClick={onReject}
            className={`${btnBase} flex-1 whitespace-nowrap border border-[#C9D6E8] text-[#07143F] hover:bg-[#EFF8FF] focus-visible:ring-[#0866FF] focus-visible:ring-offset-white`}
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={onAccept}
            className={`${btnBase} flex-1 whitespace-nowrap bg-[#0866FF] text-white hover:bg-[#0753CF] focus-visible:ring-[#0866FF] focus-visible:ring-offset-white`}
          >
            Accept all
          </button>
        </div>
        <p className="mt-3 text-[12px] leading-[1.5] text-[#46516B]">
          Details in our{" "}
          <a href="/privacy" className="font-medium text-[#0753CF] underline underline-offset-2">
            Privacy Policy
          </a>
          . To ask us to access, correct, or delete your info, email anthotranllc@gmail.com.
        </p>
      </div>
    </div>
  );
}

function ToggleRow({
  id,
  title,
  body,
  checked,
  disabled,
  note,
  onChange,
}: {
  id: string;
  title: string;
  body: string;
  checked: boolean;
  disabled?: boolean;
  note?: string;
  onChange?: (value: boolean) => void;
}) {
  return (
    <li className="flex items-start justify-between gap-4 p-4">
      <div>
        <label htmlFor={id} className="text-[14px] font-bold">
          {title}
        </label>
        <p id={`${id}-desc`} className="mt-1 text-[13px] leading-[1.5] text-[#46516B]">
          {body}
        </p>
        {note && <p className="mt-1 text-[12px] font-medium text-[#0753CF]">{note}</p>}
      </div>
      <span className="relative mt-0.5 inline-flex shrink-0">
        <input
          id={id}
          type="checkbox"
          role="switch"
          aria-describedby={`${id}-desc`}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          className="peer h-6 w-11 cursor-pointer appearance-none rounded-full bg-[#C9D6E8] transition-colors checked:bg-[#0866FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0866FF] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5"
        />
      </span>
    </li>
  );
}
