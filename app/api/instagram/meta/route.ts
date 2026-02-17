import { NextResponse } from 'next/server';
import {
  buildFbcFromFbclid,
  sendMetaConversionsEvents,
  type MetaEventInput,
} from '@/lib/meta/conversions';

export const runtime = 'nodejs';

const ALLOWED_EVENT_NAMES = new Set([
  'ViewContent',
  'Lead',
  'CompleteRegistration',
  'LeadSubmitted',
]);

const normalize = (value: unknown) =>
  typeof value === 'string' ? value.trim() : '';

const getClientIpAddress = (req: Request) => {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (!forwardedFor) return undefined;
  const first = forwardedFor.split(',')[0]?.trim();
  return first || undefined;
};

const getCustomData = (value: unknown) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return undefined;
  }

  const entries = Object.entries(value as Record<string, unknown>).filter(
    ([, item]) => item !== undefined && item !== null && item !== ''
  );

  return entries.length > 0 ? Object.fromEntries(entries) : undefined;
};

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
    if (!data || typeof data !== 'object') throw new Error();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid request body.' },
      { status: 400 }
    );
  }

  const eventName = normalize(data.eventName);
  if (!eventName || !ALLOWED_EVENT_NAMES.has(eventName)) {
    return NextResponse.json(
      { ok: false, error: 'Unsupported event name.' },
      { status: 400 }
    );
  }

  const eventId = normalize(data.eventId);
  if (!eventId) {
    return NextResponse.json(
      { ok: false, error: 'eventId is required.' },
      { status: 400 }
    );
  }

  const siteBaseUrl = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '');
  const eventSourceUrl =
    normalize(data.eventSourceUrl) ||
    (siteBaseUrl ? `${siteBaseUrl}/instagram` : undefined);

  const fbp = normalize(data.fbp);
  const fbc = normalize(data.fbc) || buildFbcFromFbclid(normalize(data.fbclid));
  const userAgent = req.headers.get('user-agent') || undefined;
  const ipAddress = getClientIpAddress(req);

  const event: MetaEventInput = {
    eventName,
    eventId,
    actionSource: 'website',
    eventSourceUrl,
    userData: {
      fbp: fbp || undefined,
      fbc: fbc || undefined,
      clientUserAgent: userAgent,
      clientIpAddress: ipAddress,
    },
    customData: getCustomData(data.customData),
  };

  const result = await sendMetaConversionsEvents([event]);
  if (!result.ok && !result.skipped) {
    console.warn('[IG Meta API] Failed to send event:', result.error || result.body);
  }

  return NextResponse.json(
    {
      ok: true,
      metaSent: result.ok,
      skipped: result.skipped || false,
      reason: result.reason || null,
    },
    { status: 200 }
  );
}
