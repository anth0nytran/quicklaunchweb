import { NextRequest, NextResponse } from "next/server";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import {
  createDemoAuthToken,
  getDemoAuthConfig,
  getDemoCookieMaxAgeSeconds,
  getDemoCookieName,
  sanitizeNextPath,
  safeEqual,
} from "@/lib/demo-auth";

const LOGIN_RATE_LIMIT = 8;
const LOGIN_RATE_WINDOW_MS = 60_000;

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const { ok, retryAfter } = rateLimit({
    key: `demo-login:${ip}`,
    limit: LOGIN_RATE_LIMIT,
    windowMs: LOGIN_RATE_WINDOW_MS,
  });

  if (!ok) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again shortly." },
      {
        status: 429,
        headers: retryAfter ? { "Retry-After": String(retryAfter) } : undefined,
      }
    );
  }

  const body = await req.json().catch(() => ({}));
  const username = typeof body?.username === "string" ? body.username.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const nextPath = typeof body?.next === "string" ? body.next : undefined;

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
  }

  const config = getDemoAuthConfig();
  if (!config) {
    return NextResponse.json({ error: "Demo access is not configured." }, { status: 500 });
  }

  if (!safeEqual(username, config.user) || !safeEqual(password, config.pass)) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const token = await createDemoAuthToken(config.user, config.secret);
  const redirectTo = sanitizeNextPath(nextPath);

  const response = NextResponse.json({ ok: true, redirectTo }, { headers: { "Cache-Control": "no-store" } });
  response.cookies.set({
    name: getDemoCookieName(),
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/demo",
    maxAge: getDemoCookieMaxAgeSeconds(),
  });

  return response;
}
