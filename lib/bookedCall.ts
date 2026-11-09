// One-time hand-off from the booking flow to /call-booked.
//
// Why: the "booked" conversion (GA discovery_call_booked + Meta Schedule) must
// fire exactly once per real booking. The qualifier saves a pending token when
// Calendly confirms, then redirects. /call-booked fires only if that token is
// there and that booking was never counted. Refresh, back button, or someone
// typing the URL = no conversion.
//
// Storage can throw (private mode, blocked site data), so every call is guarded.

export const BOOKED_PATH = "/call-booked";

const PENDING_KEY = "ql_booked_pending";
const COUNTED_KEY = "ql_booked_counted";

export type PendingBooking = {
  /** Calendly invitee URI (unique per booking) or a generated id. */
  id: string;
  firstName?: string;
  trade?: string;
  revenue?: string;
  source?: string;
  ts: number;
};

export function savePendingBooking(booking: PendingBooking): boolean {
  try {
    sessionStorage.setItem(PENDING_KEY, JSON.stringify(booking));
    return true;
  } catch {
    return false;
  }
}

/** Reads and removes the pending booking, so it can only be used once. */
export function takePendingBooking(): PendingBooking | null {
  try {
    const raw = sessionStorage.getItem(PENDING_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(PENDING_KEY);
    const parsed = JSON.parse(raw) as PendingBooking;
    // Ignore stale tokens (more than 30 minutes old).
    if (!parsed?.id || Date.now() - parsed.ts > 30 * 60 * 1000) return null;
    return parsed;
  } catch {
    return null;
  }
}

function readCounted(): string[] {
  try {
    const raw = localStorage.getItem(COUNTED_KEY);
    const list = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(list) ? list.filter((v): v is string => typeof v === "string") : [];
  } catch {
    return [];
  }
}

export function wasBookingCounted(id: string): boolean {
  return readCounted().includes(id);
}

export function markBookingCounted(id: string) {
  try {
    const list = readCounted().filter((v) => v !== id);
    list.push(id);
    localStorage.setItem(COUNTED_KEY, JSON.stringify(list.slice(-20)));
  } catch {
    // If storage is blocked, the pending token was already removed, so a refresh still won't re-fire.
  }
}

/** Stable Meta event_id for a booking, so browser + any server event dedupe. */
export function scheduleEventId(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (Math.imul(31, h) + id.charCodeAt(i)) | 0;
  return `schedule_${(h >>> 0).toString(36)}`;
}
