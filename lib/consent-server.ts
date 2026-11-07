// Server-side read of the visitor's advertising consent (for Meta Conversions API).
// Used by app/api/lead and app/api/instagram/meta. Not legal advice.

import { CONSENT_COOKIE, parseConsentValue } from "@/lib/consent";

type RequestLike = {
  headers: Headers;
};

function readCookieHeader(headers: Headers, name: string): string | null {
  const header = headers.get("cookie");
  if (!header) return null;
  const match = header.split(/;\s*/).find((row) => row.startsWith(`${name}=`));
  return match ? match.slice(name.length + 1) : null;
}

/**
 * True only when the visitor opted in to advertising:
 *  - a Sec-GPC: 1 header always means NO
 *  - an explicit `adConsent: false` in the body means NO
 *  - otherwise the saved consent cookie must say ads = true
 *    (or the client sent `adConsent: true` and no cookie says otherwise)
 */
export function hasAdConsent(req: RequestLike, bodyFlag?: unknown): boolean {
  if (req.headers.get("sec-gpc") === "1") return false;
  if (bodyFlag === false) return false;
  const saved = parseConsentValue(readCookieHeader(req.headers, CONSENT_COOKIE));
  if (saved) return saved.ads && !saved.gpc;
  return bodyFlag === true;
}
