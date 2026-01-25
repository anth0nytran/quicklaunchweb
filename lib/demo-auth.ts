const DEMO_COOKIE_NAME = "demo_auth_v2";
const DEMO_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 12;
const DEMO_COOKIE_MAX_AGE_MS = DEMO_COOKIE_MAX_AGE_SECONDS * 1000;
const DEFAULT_NEXT_PATH = "/demo";
const ALLOWED_NEXT_PATH_PREFIXES = ["/demo"];
const encoder = new TextEncoder();
const decoder = new TextDecoder();

export type DemoAuthConfig = {
  user: string;
  pass: string;
  secret: string;
};

type DemoAuthPayload = {
  sub: string;
  iat: number;
  exp: number;
};

export function getDemoAuthConfig(): DemoAuthConfig | null {
  const user = process.env.DEMO_USER?.trim();
  const pass = process.env.DEMO_PASS?.trim();
  const secret = process.env.DEMO_AUTH_SECRET?.trim();

  if (!user || !pass || !secret) {
    return null;
  }

  return { user, pass, secret };
}

export function getDemoCookieName() {
  return DEMO_COOKIE_NAME;
}

export function getDemoCookieMaxAgeSeconds() {
  return DEMO_COOKIE_MAX_AGE_SECONDS;
}

export function sanitizeNextPath(nextValue?: string): string {
  if (!nextValue || typeof nextValue !== "string") {
    return DEFAULT_NEXT_PATH;
  }

  if (nextValue.startsWith("//") || nextValue.includes("\\")) {
    return DEFAULT_NEXT_PATH;
  }

  if (!ALLOWED_NEXT_PATH_PREFIXES.some((prefix) => nextValue.startsWith(prefix))) {
    return DEFAULT_NEXT_PATH;
  }

  return nextValue;
}

export function safeEqual(a: string, b: string): boolean {
  const aBytes = encoder.encode(a);
  const bBytes = encoder.encode(b);

  if (aBytes.length !== bBytes.length) {
    return false;
  }

  let diff = 0;
  for (let i = 0; i < aBytes.length; i += 1) {
    diff |= aBytes[i] ^ bBytes[i];
  }

  return diff === 0;
}

function bytesToBase64(bytes: Uint8Array): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64");
  }

  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

function base64ToBytes(base64: string): Uint8Array {
  if (typeof Buffer !== "undefined") {
    return Uint8Array.from(Buffer.from(base64, "base64"));
  }

  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function base64UrlEncode(input: string | Uint8Array): string {
  const bytes = typeof input === "string" ? encoder.encode(input) : input;
  const base64 = bytesToBase64(bytes);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(input: string): Uint8Array {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  return base64ToBytes(padded);
}

async function hmacSha256(message: string, secret: string): Promise<string> {
  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await globalThis.crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return base64UrlEncode(new Uint8Array(signature));
}

export async function createDemoAuthToken(user: string, secret: string): Promise<string> {
  const now = Date.now();
  const payload: DemoAuthPayload = {
    sub: user,
    iat: now,
    exp: now + DEMO_COOKIE_MAX_AGE_MS,
  };
  const body = base64UrlEncode(JSON.stringify(payload));
  const signature = await hmacSha256(body, secret);
  return `${body}.${signature}`;
}

export async function verifyDemoAuthToken(
  token: string,
  secret: string
): Promise<DemoAuthPayload | null> {
  const [body, signature] = token.split(".");
  if (!body || !signature) {
    return null;
  }

  const expected = await hmacSha256(body, secret);
  if (!safeEqual(signature, expected)) {
    return null;
  }

  try {
    const payload = JSON.parse(decoder.decode(base64UrlDecode(body))) as DemoAuthPayload;
    if (!payload || typeof payload.exp !== "number" || typeof payload.sub !== "string") {
      return null;
    }
    if (payload.exp <= Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
