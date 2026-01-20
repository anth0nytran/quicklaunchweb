import { NextRequest } from "next/server";

type RateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
};

type RateLimitResult = {
  ok: boolean;
  retryAfter?: number;
};

type RateLimitEntry = {
  count: number;
  start: number;
};

const storeKey = "__rateLimitStore";
const store = (globalThis as Record<string, unknown>)[storeKey] as Map<string, RateLimitEntry> | undefined;

const rateLimitStore =
  store ||
  (() => {
    const nextStore = new Map<string, RateLimitEntry>();
    (globalThis as Record<string, unknown>)[storeKey] = nextStore;
    return nextStore;
  })();

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const [first] = forwarded.split(",");
    return first.trim();
  }
  return req.headers.get("x-real-ip") || req.ip || "unknown";
}

export function rateLimit({ key, limit, windowMs }: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now - entry.start > windowMs) {
    rateLimitStore.set(key, { count: 1, start: now });
    return { ok: true };
  }

  entry.count += 1;

  if (entry.count > limit) {
    const retryAfterMs = entry.start + windowMs - now;
    return { ok: false, retryAfter: Math.max(1, Math.ceil(retryAfterMs / 1000)) };
  }

  return { ok: true };
}
