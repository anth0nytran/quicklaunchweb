import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

// =============================================================================
// Configuration
// =============================================================================

const siteUrl = (() => {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!value && process.env.NODE_ENV === "production") {
    throw new Error("Missing NEXT_PUBLIC_SITE_URL in production.");
  }
  return value || "http://localhost:3000";
})();

const VALID_PLANS = ["starter", "pro"] as const;
type ValidPlan = (typeof VALID_PLANS)[number];

type AddOns = {
  hasDomain: boolean | null;
  domainRouting: "us" | "self" | null;
  textAlerts: boolean;
  unlimitedEdits: boolean;
  googleBoost: boolean;
};

// =============================================================================
// Validation Helpers
// =============================================================================

function isValidPlan(plan: unknown): plan is ValidPlan {
  return typeof plan === "string" && VALID_PLANS.includes(plan as ValidPlan);
}

function sanitizeEmail(email: unknown): string | undefined {
  if (typeof email !== "string") return undefined;
  const trimmed = email.trim().toLowerCase();
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed) || trimmed.length > 254) return undefined;
  return trimmed;
}

function validateAddOns(addOns: unknown): AddOns {
  const defaults: AddOns = {
    hasDomain: null,
    domainRouting: null,
    textAlerts: false,
    unlimitedEdits: false,
    googleBoost: false,
  };

  if (!addOns || typeof addOns !== "object") return defaults;

  const obj = addOns as Record<string, unknown>;

  return {
    hasDomain:
      obj.hasDomain === true || obj.hasDomain === false ? obj.hasDomain : null,
    domainRouting:
      obj.domainRouting === "us" || obj.domainRouting === "self"
        ? obj.domainRouting
        : null,
    textAlerts: obj.textAlerts === true,
    unlimitedEdits: obj.unlimitedEdits === true,
    googleBoost: obj.googleBoost === true,
  };
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
    const ip = getClientIp(req);
    const { ok, retryAfter } = rateLimit({
      key: `stripe-checkout:${ip}`,
      limit: 10,
      windowMs: 60_000,
    });

    if (!ok) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            ...headers,
            ...(retryAfter ? { "Retry-After": String(retryAfter) } : {}),
          },
        }
      );
    }

    // Validate plan parameter
    const plan = req.nextUrl.searchParams.get("plan");
    if (!isValidPlan(plan)) {
      return NextResponse.json(
        { error: "Invalid plan. Must be 'starter' or 'pro'." },
        { status: 400, headers }
      );
    }

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
    const addOns = validateAddOns(body?.addOns);

    // Get base plan price ID
    const priceId =
      plan === "starter"
        ? process.env.STRIPE_PRICE_STARTER_MONTHLY
        : process.env.STRIPE_PRICE_PRO_MONTHLY;

    if (!priceId) {
      console.error(`Missing price configuration for plan: ${plan}`);
      return NextResponse.json(
        { error: "Service configuration error. Please contact support." },
        { status: 500, headers }
      );
    }

    // Build line items array
    const lineItems: { price: string; quantity: number }[] = [
      { price: priceId, quantity: 1 },
    ];

    // Add domain routing if selected ($99 one-time)
    if (
      addOns.domainRouting === "us" &&
      process.env.STRIPE_PRICE_DOMAIN_ROUTING
    ) {
      lineItems.push({
        price: process.env.STRIPE_PRICE_DOMAIN_ROUTING,
        quantity: 1,
      });
    }

    // Add text alerts if selected ($29/mo)
    if (addOns.textAlerts && process.env.STRIPE_PRICE_TEXT_ALERTS) {
      lineItems.push({
        price: process.env.STRIPE_PRICE_TEXT_ALERTS,
        quantity: 1,
      });
    }

    // Add unlimited edits if selected ($99/mo)
    if (addOns.unlimitedEdits && process.env.STRIPE_PRICE_UNLIMITED_EDITS) {
      lineItems.push({
        price: process.env.STRIPE_PRICE_UNLIMITED_EDITS,
        quantity: 1,
      });
    }

    // Add Google Boost if selected ($199 one-time)
    if (addOns.googleBoost && process.env.STRIPE_PRICE_GOOGLE_BOOST) {
      lineItems.push({
        price: process.env.STRIPE_PRICE_GOOGLE_BOOST,
        quantity: 1,
      });
    }

    // Build URLs
    const successUrl = `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${siteUrl}/cancel`;

    // Debug logging
    console.log("Checkout config:", {
      siteUrl,
      successUrl,
      cancelUrl,
      priceId,
      lineItemsCount: lineItems.length,
    });

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      customer_email: email || undefined,
      // Store add-on selections in metadata for reference
      metadata: {
        plan,
        hasDomain: String(addOns.hasDomain),
        domainRouting: addOns.domainRouting || "none",
        textAlerts: String(addOns.textAlerts),
        unlimitedEdits: String(addOns.unlimitedEdits),
        googleBoost: String(addOns.googleBoost),
      },
    });

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL");
    }

    return NextResponse.json({ url: session.url }, { headers });
  } catch (error) {
    // Log error securely (don't expose to client)
    console.error("Stripe checkout error:", {
      message: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { error: "Unable to create checkout session. Please try again." },
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
