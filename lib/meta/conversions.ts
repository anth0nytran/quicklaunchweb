import { createHash } from 'crypto';

export type MetaUserDataInput = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  gender?: string;
  dateOfBirth?: string;
  externalId?: string;
  fbp?: string;
  fbc?: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
};

export type MetaEventInput = {
  eventName: string;
  eventTime?: number;
  eventId?: string;
  actionSource?: string;
  eventSourceUrl?: string;
  userData?: MetaUserDataInput;
  customData?: Record<string, unknown>;
  attributionData?: Record<string, unknown>;
  originalEventData?: Record<string, unknown>;
};

export type MetaSendResult = {
  ok: boolean;
  skipped?: boolean;
  reason?: string;
  status?: number;
  body?: unknown;
  error?: string;
};

const DEFAULT_GRAPH_VERSION = 'v20.0';

const normalize = (value?: string) => value?.trim() || '';

const normalizeLower = (value?: string) => normalize(value).toLowerCase();

const hashSha256 = (value: string) =>
  createHash('sha256').update(value).digest('hex');

const cleanObject = (value: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(value).filter(
      ([, item]) => item !== undefined && item !== null && item !== ''
    )
  );

const normalizePhone = (value?: string) => {
  const digits = normalize(value).replace(/\D/g, '');
  if (!digits) return '';
  if (digits.length === 10) return `1${digits}`;
  return digits;
};

const normalizeDateOfBirth = (value?: string) =>
  normalize(value).replace(/[^\d]/g, '');

const hashOptional = (value?: string) => {
  const normalized = normalizeLower(value);
  return normalized ? hashSha256(normalized) : undefined;
};

const hashOptionalPhone = (value?: string) => {
  const normalized = normalizePhone(value);
  return normalized ? hashSha256(normalized) : undefined;
};

const hashOptionalBirthdate = (value?: string) => {
  const normalized = normalizeDateOfBirth(value);
  return normalized ? hashSha256(normalized) : undefined;
};

const buildUserData = (input: MetaUserDataInput = {}) => {
  const emailHash = hashOptional(input.email);
  const phoneHash = hashOptionalPhone(input.phone);
  const firstNameHash = hashOptional(input.firstName);
  const lastNameHash = hashOptional(input.lastName);
  const cityHash = hashOptional(input.city);
  const stateHash = hashOptional(input.state);
  const zipHash = hashOptional(input.zipCode);
  const countryHash = hashOptional(input.country);
  const genderHash = hashOptional(input.gender);
  const dobHash = hashOptionalBirthdate(input.dateOfBirth);
  const externalIdHash = hashOptional(input.externalId);

  return cleanObject({
    em: emailHash ? [emailHash] : undefined,
    ph: phoneHash ? [phoneHash] : undefined,
    fn: firstNameHash,
    ln: lastNameHash,
    ct: cityHash,
    st: stateHash,
    zp: zipHash,
    country: countryHash,
    ge: genderHash,
    db: dobHash,
    external_id: externalIdHash ? [externalIdHash] : undefined,
    fbp: normalize(input.fbp),
    fbc: normalize(input.fbc),
    client_ip_address: normalize(input.clientIpAddress),
    client_user_agent: normalize(input.clientUserAgent),
  });
};

const buildMetaEventPayload = (event: MetaEventInput) => {
  const userData = buildUserData(event.userData);
  return cleanObject({
    event_name: event.eventName,
    event_time: event.eventTime || Math.floor(Date.now() / 1000),
    event_id: normalize(event.eventId),
    action_source: event.actionSource || 'website',
    event_source_url: normalize(event.eventSourceUrl),
    user_data: Object.keys(userData).length ? userData : undefined,
    custom_data: event.customData,
    attribution_data: event.attributionData,
    original_event_data: event.originalEventData,
  });
};

const getMetaConfig = () => ({
  pixelId: normalize(
    process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID
  ),
  accessToken: normalize(process.env.META_CONVERSIONS_API_TOKEN),
  graphVersion: normalize(process.env.META_GRAPH_API_VERSION) || DEFAULT_GRAPH_VERSION,
  testEventCode: normalize(process.env.META_TEST_EVENT_CODE),
});

export const buildFbcFromFbclid = (
  fbclid?: string,
  timestampMs = Date.now()
) => {
  const cleanFbclid = normalize(fbclid);
  if (!cleanFbclid) return undefined;
  return `fb.1.${timestampMs}.${cleanFbclid}`;
};

export async function sendMetaConversionsEvents(
  events: MetaEventInput[]
): Promise<MetaSendResult> {
  const normalizedEvents = events
    .filter((event) => normalize(event.eventName).length > 0)
    .map((event) => buildMetaEventPayload(event));

  if (normalizedEvents.length === 0) {
    return { ok: false, skipped: true, reason: 'no_events' };
  }

  const config = getMetaConfig();
  if (!config.pixelId || !config.accessToken) {
    return { ok: false, skipped: true, reason: 'missing_meta_credentials' };
  }

  const payload = {
    data: normalizedEvents,
    ...(config.testEventCode ? { test_event_code: config.testEventCode } : {}),
  };

  const endpoint = `https://graph.facebook.com/${config.graphVersion}/${config.pixelId}/events?access_token=${encodeURIComponent(config.accessToken)}`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const body = await response.json().catch(() => null);
    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        body,
        error: `Meta CAPI request failed (${response.status}).`,
      };
    }

    return { ok: true, status: response.status, body };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown Meta CAPI error.',
    };
  }
}
