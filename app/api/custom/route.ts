import { NextRequest, NextResponse } from "next/server";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const { ok, retryAfter } = rateLimit({
    key: `custom:${ip}`,
    limit: 10,
    windowMs: 60_000,
  });

  if (!ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: retryAfter ? { "Retry-After": String(retryAfter) } : undefined,
      }
    );
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function GET(req: NextRequest) {
  const ip = getClientIp(req);
  const { ok, retryAfter } = rateLimit({
    key: `custom:${ip}`,
    limit: 10,
    windowMs: 60_000,
  });

  if (!ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: retryAfter ? { "Retry-After": String(retryAfter) } : undefined,
      }
    );
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
