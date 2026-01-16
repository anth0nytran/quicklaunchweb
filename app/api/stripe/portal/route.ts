import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

// =============================================================================
// Configuration
// =============================================================================

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

// =============================================================================
// Validation Helpers
// =============================================================================

function sanitizeEmail(email: unknown): string | undefined {
  if (typeof email !== "string") return undefined;
  const trimmed = email.trim().toLowerCase();
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed) || trimmed.length > 254) return undefined;
  return trimmed;
}

function sanitizeCustomerId(customerId: unknown): string | undefined {
  if (typeof customerId !== "string") return undefined;
  const trimmed = customerId.trim();
  // Stripe customer IDs start with "cus_" and are alphanumeric
  if (!/^cus_[a-zA-Z0-9]+$/.test(trimmed) || trimmed.length > 50)
    return undefined;
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
    // Parse and validate body
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

    const email = sanitizeEmail(body?.email);
    const customerId = sanitizeCustomerId(body?.customerId);

    // Require either email or customerId
    if (!email && !customerId) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400, headers }
      );
    }

    let customer = customerId;

    // Look up customer by email if no customer ID provided
    if (!customer && email) {
      const customers = await stripe.customers.list({
        email,
        limit: 1,
      });
      customer = customers.data[0]?.id;
    }

    if (!customer) {
      return NextResponse.json(
        {
          error:
            "No subscription found for this email. Please use the email from your checkout.",
        },
        { status: 404, headers }
      );
    }

    // Create billing portal session
    const session = await stripe.billingPortal.sessions.create({
      customer,
      return_url: `${siteUrl}/?portal=1`,
    });

    if (!session.url) {
      throw new Error("Stripe did not return a portal URL");
    }

    return NextResponse.json({ url: session.url }, { headers });
  } catch (error) {
    // Log error securely (don't expose to client)
    console.error("Stripe portal error:", {
      message: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { error: "Unable to access subscription portal. Please try again." },
      { status: 500, headers }
    );
  }
}

// Reject other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}
