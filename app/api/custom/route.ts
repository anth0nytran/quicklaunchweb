import { NextRequest, NextResponse } from "next/server";

// =============================================================================
// Validation Helpers
// =============================================================================

function sanitizeRequiredText(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, maxLength);
}

function sanitizeOptionalText(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, maxLength);
}

function sanitizeEmail(email: unknown): string | undefined {
  if (typeof email !== "string") return undefined;
  const trimmed = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed) || trimmed.length > 254) return undefined;
  return trimmed;
}

// =============================================================================
// Security Headers
// =============================================================================

function securityHeaders() {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Cache-Control": "no-store, no-cache, must-revalidate",
  };
}

// =============================================================================
// Route Handler
// =============================================================================

export async function POST(req: NextRequest) {
  const headers = securityHeaders();

  try {
    let body: Record<string, unknown> = {};
    try {
      const text = await req.text();
      if (text) {
        body = JSON.parse(text);
      }
    } catch {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400, headers }
      );
    }

    const name = sanitizeRequiredText(body?.name, 100);
    const email = sanitizeEmail(body?.email);
    const phone = sanitizeOptionalText(body?.phone, 50);
    const company = sanitizeOptionalText(body?.company, 100);
    const website = sanitizeOptionalText(body?.website, 200);
    const details = sanitizeOptionalText(body?.details, 2000);

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400, headers }
      );
    }

    console.log("Custom website request received:", {
      name,
      email,
      phone,
      company,
      website,
      details,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true }, { headers });
  } catch (error) {
    console.error("Custom request error:", {
      message: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { error: "Unable to submit request. Please try again." },
      { status: 500, headers }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}
