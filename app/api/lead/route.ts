import { NextRequest, NextResponse } from "next/server";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { buildFbcFromFbclid, sendMetaConversionsEvents } from "@/lib/meta/conversions";
import { hasAdConsent } from "@/lib/consent-server";
import { QUALIFIER_QUESTIONS, SMS_CONSENT_TEXT, normalizeUsPhone, qualifierLabel } from "@/lib/leadQualifier";

// Free call lead (components/discovery-call.tsx).
// 1. Validate input  2. Forward JSON to GHL (GHL_LEAD_WEBHOOK_URL)
// 3. Send a server-side Meta "Lead" event that shares event_id with the
//    browser fbq('track','Lead') so Meta dedupes the two. ONLY when the visitor
//    opted in to advertising (cookie banner) and no Global Privacy Control signal.
// The visitor always gets to the calendar: a GHL or Meta failure is logged,
// not returned as an error.

export const runtime = "nodejs";

const MAX_BODY_BYTES = 8_000;
const EVENT_ID_RE = /^[A-Za-z0-9_.:-]{8,100}$/;

const str = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const limited = rateLimit({ key: `lead:${ip}`, limit: 5, windowMs: 10 * 60 * 1000 });
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many tries. Please wait a few minutes." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfter ?? 60) } }
    );
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Request too large." }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request." }, { status: 400 });
  }

  // Honeypot: real people never fill this hidden field. Pretend it worked.
  if (str(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const firstName = str(body.firstName, 60);
  const phone = normalizeUsPhone(str(body.phone, 30));
  const errors: string[] = [];
  if (!firstName || !/^[\p{L}][\p{L}\p{M}' .-]*$/u.test(firstName)) errors.push("firstName");
  if (!phone) errors.push("phone");

  // Every answer must be one of the known options. Unknown keys are dropped.
  const answersIn = (body.answers && typeof body.answers === "object" ? body.answers : {}) as Record<string, unknown>;
  const answers: Record<string, string> = {};
  for (const q of QUALIFIER_QUESTIONS) {
    const value = str(answersIn[q.id], 40);
    if (!value) continue;
    if (!q.options.some((o) => o.value === value)) errors.push(`answers.${q.id}`);
    else answers[q.id] = value;
  }

  if (errors.length) {
    return NextResponse.json({ ok: false, error: "Please check your info.", fields: errors }, { status: 400 });
  }

  const smsConsent = body.smsConsent === true;
  const eventIdIn = str(body.eventId, 100);
  const eventId = EVENT_ID_RE.test(eventIdIn)
    ? eventIdIn
    : `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  const eventSourceUrl = str(body.eventSourceUrl, 500);
  const pageSource = str(body.source, 60) || "website";
  // Consent gate: no ad consent (or GPC on) = no Meta CAPI and no Meta click IDs stored.
  // Client sends `adConsent: getAdConsent()` (lib/consent); the ql_consent cookie is checked too.
  const adConsent = hasAdConsent(req, body.adConsent);
  const fbclid = adConsent ? str(body.fbclid, 500) : "";
  const fbp = adConsent ? req.cookies.get("_fbp")?.value || str(body.fbp, 200) || undefined : undefined;
  const fbc = adConsent
    ? req.cookies.get("_fbc")?.value || str(body.fbc, 600) || buildFbcFromFbclid(fbclid) || undefined
    : undefined;
  const userAgent = req.headers.get("user-agent") || undefined;

  const utmIn = (body.utm && typeof body.utm === "object" ? body.utm : {}) as Record<string, unknown>;
  const utm = Object.fromEntries(
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]
      .map((k) => [k, str(utmIn[k], 200)])
      .filter(([, v]) => v)
  );

  const submittedAt = new Date().toISOString();
  const ghlPayload = {
    first_name: firstName,
    phone: `+1${phone}`,
    sms_consent: smsConsent,
    sms_consent_text: smsConsent ? SMS_CONSENT_TEXT : "",
    offer: "Free Call",
    source: pageSource,
    page_url: eventSourceUrl,
    submitted_at: submittedAt,
    ...Object.fromEntries(QUALIFIER_QUESTIONS.map((q) => [q.id, answers[q.id] ?? ""])),
    ...Object.fromEntries(QUALIFIER_QUESTIONS.map((q) => [`${q.id}_label`, qualifierLabel(q.id, answers[q.id]) ?? ""])),
    ...utm,
    fbclid,
    fbp: fbp ?? "",
    fbc: fbc ?? "",
    meta_event_id: eventId,
    ad_consent: adConsent,
  };

  const ghlUrl = process.env.GHL_LEAD_WEBHOOK_URL?.trim();

  const ghlTask = (async () => {
    if (!ghlUrl) {
      console.warn("[api/lead] GHL_LEAD_WEBHOOK_URL not set; skipping GHL forward.", { source: pageSource });
      return "skipped" as const;
    }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    try {
      const res = await fetch(ghlUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ghlPayload),
        signal: controller.signal,
        cache: "no-store",
      });
      if (!res.ok) {
        console.error("[api/lead] GHL webhook failed", res.status);
        return "failed" as const;
      }
      return "sent" as const;
    } catch (error) {
      console.error("[api/lead] GHL webhook error", error instanceof Error ? error.message : error);
      return "failed" as const;
    } finally {
      clearTimeout(timer);
    }
  })();

  const sendMeta = () => sendMetaConversionsEvents([
    {
      eventName: "Lead",
      eventId,
      actionSource: "website",
      eventSourceUrl: eventSourceUrl || undefined,
      userData: {
        phone,
        firstName,
        country: "us",
        fbp,
        fbc,
        clientIpAddress: ip !== "unknown" ? ip : undefined,
        clientUserAgent: userAgent,
      },
      customData: {
        content_name: "free_call",
        lead_source: pageSource,
        trade: answers.trade,
        area: answers.area,
        revenue: answers.revenue,
      },
    },
  ]).then((result) => {
    if (result.skipped) console.warn("[api/lead] Meta CAPI skipped:", result.reason);
    else if (!result.ok) console.error("[api/lead] Meta CAPI failed", result.status, result.error);
    return result.ok ? "sent" : result.skipped ? "skipped" : "failed";
  });
  const metaTask = adConsent ? sendMeta() : Promise.resolve("skipped_no_consent" as const);

  const [ghl, meta] = await Promise.all([ghlTask, metaTask]);
  return NextResponse.json({ ok: true, ghl, meta, eventId });
}
