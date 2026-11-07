// Cookie / tracking consent. One small module used by the banner, the footer links,
// the forms, and (via lib/consent-server.ts) the API routes.
//
// Categories:
//   necessary  - always on (site works, security, this consent cookie, Stripe, Calendly booking)
//   analytics  - Google Analytics (gtag.js). Vercel Analytics is cookieless and always on.
//   ads        - Meta Pixel + Meta Conversions API ("targeted advertising" / "sale or share")
//
// The choice is stored in a first-party cookie (so the server can read it) and mirrored
// to localStorage. It expires after 12 months, then the banner asks again.
// A Global Privacy Control signal (navigator.globalPrivacyControl / Sec-GPC header)
// always turns "ads" off.
//
// Not legal advice: have a lawyer review before relying on it.

export const CONSENT_COOKIE = "ql_consent";
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 12 months

/** Fired on window when the visitor saves a choice. detail = ConsentState */
export const CONSENT_CHANGE_EVENT = "ql:consent-change";
/** Fired on window to reopen the preferences panel (footer links). */
export const CONSENT_OPEN_EVENT = "ql:consent-open";

export type ConsentMethod = "accept_all" | "reject_all" | "custom";

export type ConsentState = {
  v: number;
  /** Google Analytics */
  analytics: boolean;
  /** Meta Pixel + Conversions API */
  ads: boolean;
  /** Unix seconds when saved */
  ts: number;
  method: ConsentMethod;
  /** GPC was on when saved */
  gpc: boolean;
};

const isBrowser = () => typeof window !== "undefined" && typeof document !== "undefined";

/** Parse the cookie value. Shared with the server helper. Returns null when missing, bad, or expired. */
export function parseConsentValue(raw: string | undefined | null): ConsentState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as Partial<ConsentState>;
    if (!parsed || typeof parsed !== "object" || parsed.v !== CONSENT_VERSION) return null;
    const ts = Number(parsed.ts) || 0;
    if (!ts || Date.now() / 1000 - ts > CONSENT_MAX_AGE_SECONDS) return null;
    return {
      v: CONSENT_VERSION,
      analytics: parsed.analytics === true,
      ads: parsed.ads === true,
      ts,
      method: (parsed.method as ConsentMethod) || "custom",
      gpc: parsed.gpc === true,
    };
  } catch {
    return null;
  }
}

/** True when the browser sends a Global Privacy Control opt-out signal. */
export function isGpcEnabled(): boolean {
  if (!isBrowser()) return false;
  return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

function readCookie(name: string): string | null {
  if (!isBrowser()) return null;
  const match = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));
  return match ? match.slice(name.length + 1) : null;
}

/** The saved choice, or null if the visitor has not chosen yet (or it expired). */
export function readConsent(): ConsentState | null {
  if (!isBrowser()) return null;
  const fromCookie = parseConsentValue(readCookie(CONSENT_COOKIE));
  if (fromCookie) return applyGpc(fromCookie);
  try {
    const fromStorage = parseConsentValue(window.localStorage.getItem(CONSENT_COOKIE));
    if (fromStorage) {
      // Cookie was cleared but storage survived: restore the cookie so the server sees it too.
      writeCookie(fromStorage);
      return applyGpc(fromStorage);
    }
  } catch {
    /* storage blocked */
  }
  return null;
}

function applyGpc(state: ConsentState): ConsentState {
  return isGpcEnabled() ? { ...state, ads: false, gpc: true } : state;
}

function writeCookie(state: ConsentState) {
  const value = encodeURIComponent(JSON.stringify(state));
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${value}; Path=/; Max-Age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}

/** Save a choice. GPC always wins for ads. Fires CONSENT_CHANGE_EVENT. */
export function saveConsent(choice: { analytics: boolean; ads: boolean; method: ConsentMethod }): ConsentState {
  const gpc = isGpcEnabled();
  const state: ConsentState = {
    v: CONSENT_VERSION,
    analytics: choice.analytics,
    ads: gpc ? false : choice.ads,
    ts: Math.floor(Date.now() / 1000),
    method: choice.method,
    gpc,
  };
  if (!isBrowser()) return state;
  writeCookie(state);
  try {
    window.localStorage.setItem(CONSENT_COOKIE, encodeURIComponent(JSON.stringify(state)));
  } catch {
    /* storage blocked: the cookie is enough */
  }
  window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_CHANGE_EVENT, { detail: state }));
  return state;
}

/** True only if the visitor opted in to advertising and GPC is off. Pass this to /api/lead as `adConsent`. */
export function getAdConsent(): boolean {
  if (isGpcEnabled()) return false;
  return readConsent()?.ads === true;
}

/** True only if the visitor opted in to analytics. */
export function getAnalyticsConsent(): boolean {
  return readConsent()?.analytics === true;
}

/** Reopen the cookie / privacy choices panel (footer "Cookie settings" and "Your Privacy Choices"). */
export function openConsentPreferences() {
  if (!isBrowser()) return;
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}
