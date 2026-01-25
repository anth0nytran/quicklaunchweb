import { NextRequest, NextResponse } from "next/server";
import { getDemoAuthConfig, getDemoCookieName, sanitizeNextPath, verifyDemoAuthToken } from "@/lib/demo-auth";

const LOGIN_PATH = "/demo/login";

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const config = getDemoAuthConfig();
  const token = req.cookies.get(getDemoCookieName())?.value;
  const isAuthed = config && token ? await verifyDemoAuthToken(token, config.secret) : null;

  if (pathname === LOGIN_PATH || pathname === `${LOGIN_PATH}/`) {
    if (isAuthed) {
      const nextParam = req.nextUrl.searchParams.get("next") ?? "/demo";
      return NextResponse.redirect(new URL(sanitizeNextPath(nextParam), req.url));
    }
    return NextResponse.next();
  }

  if (isAuthed) {
    return NextResponse.next();
  }

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = LOGIN_PATH;
  loginUrl.search = "";
  loginUrl.searchParams.set("next", `${pathname}${search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/demo/:path*"],
};
