import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { logCheckoutEvent, logErrorEvent } from "@/lib/analytics/server";

// =============================================================================
// Configuration
// =============================================================================

const siteUrl = (() => {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!value && process.env.NODE_ENV === "production") {
    throw new Error("Missing NEXT_PUBLIC_SITE_URL in production.");
  }

  const fallbackUrl = "http://localhost:3000";
  const resolved = value || fallbackUrl;

  if (process.env.NODE_ENV !== "production") {
    try {
      const parsed = new URL(resolved);
      if (
        parsed.protocol === "https:" &&
        ["localhost", "127.0.0.1", "::1"].includes(parsed.hostname)
      ) {
        parsed.protocol = "http:";
        return parsed.toString().replace(/\/$/, "");
      }
    } catch {
      return fallbackUrl;
    }
  }

  return resolved;
})();

const VALID_PLANS = ["starter", "growth", "city_dominator"] as const;
type ValidPlan = (typeof VALID_PLANS)[number];

type BillingCycle = "monthly" | "upfront";

type AddOns = {
  billingCycle: BillingCycle;
  hasDomain: boolean | null;
  domainRouting: "us" | "self" | null;
  textAlerts: boolean;
  googleBoost: boolean;
  photoShoot: boolean;
  adCreative: boolean;
  brandPackage: boolean;
  adsCall: boolean;
};

const PLAN_CONFIG: Record<
  ValidPlan,
  {
    label: string;
    upfrontLabel: string;
    recurringLabel: string;
    monthlyPriceEnv: string;
    upfrontPriceEnv: string;
  }
> = {
  starter: {
    label: "Starter",
    upfrontLabel: "Starter - 3 Month Prepay",
    recurringLabel: "Starter - Monthly Subscription",
    monthlyPriceEnv: "STRIPE_PRICE_STARTER_MONTHLY",
    upfrontPriceEnv: "STRIPE_PRICE_STARTER_UPFRONT",
  },
  growth: {
    label: "Growth Engine",
    upfrontLabel: "Growth Engine - 3 Month Prepay",
    recurringLabel: "Growth Engine - Monthly Subscription",
    monthlyPriceEnv: "STRIPE_PRICE_GROWTH_MONTHLY",
    upfrontPriceEnv: "STRIPE_PRICE_GROWTH_UPFRONT",
  },
  city_dominator: {
    label: "City Dominator",
    upfrontLabel: "City Dominator - 3 Month Prepay",
    recurringLabel: "City Dominator - Monthly Subscription",
    monthlyPriceEnv: "STRIPE_PRICE_CITY_DOMINATOR_MONTHLY",
    upfrontPriceEnv: "STRIPE_PRICE_CITY_DOMINATOR_UPFRONT",
  },
};

const RECURRING_ADDON_CONFIG = {
  textAlerts: {
    label: "Instant Lead Texts",
    monthlyAmountCents: 2900,
    envName: "STRIPE_PRICE_TEXT_ALERTS",
    monthlyDescription: "Monthly lead text notifications.",
  },
} as const;

const ONE_TIME_ADDON_CONFIG = {
  domainRouting: {
    label: "Domain Connection Service",
    description: "One-time setup fee for domain connection and verification.",
    envName: "STRIPE_PRICE_DOMAIN_ROUTING",
  },
  googleBoost: {
    label: "Google Business Setup",
    description: "One-time setup for Google Business Profile and Maps optimization.",
    envName: "STRIPE_PRICE_GOOGLE_BOOST",
  },
  photoShoot: {
    label: "Professional Photo Shoot",
    description: "Professional on-site photography for website and Google profile.",
    envName: "STRIPE_PRICE_PHOTO_SHOOT",
  },
  adCreative: {
    label: "Ad Creative Package",
    description: "3 short videos + scripts for ads and social media.",
    envName: "STRIPE_PRICE_AD_CREATIVE",
  },
  brandPackage: {
    label: "Brand Content Package",
    description: "Full photo shoot + 3 videos + ad creatives bundle.",
    envName: "STRIPE_PRICE_BRAND_PACKAGE",
  },
} as const;

// =============================================================================
// Validation Helpers
// =============================================================================

function isValidPlan(plan: unknown): plan is ValidPlan {
  return typeof plan === "string" && VALID_PLANS.includes(plan as ValidPlan);
}

function sanitizeEmail(email: unknown): string | undefined {
  if (typeof email !== "string") return undefined;
  const trimmed = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed) || trimmed.length > 254) return undefined;
  return trimmed;
}

function validateAddOns(addOns: unknown): AddOns {
  const defaults: AddOns = {
    billingCycle: "monthly",
    hasDomain: null,
    domainRouting: null,
    textAlerts: false,
    googleBoost: false,
    photoShoot: false,
    adCreative: false,
    brandPackage: false,
    adsCall: false,
  };

  if (!addOns || typeof addOns !== "object") return defaults;

  const obj = addOns as Record<string, unknown>;

  return {
    billingCycle: obj.billingCycle === "upfront" ? "upfront" : "monthly",
    hasDomain:
      obj.hasDomain === true || obj.hasDomain === false ? obj.hasDomain : null,
    domainRouting:
      obj.domainRouting === "us" || obj.domainRouting === "self"
        ? obj.domainRouting
        : null,
    textAlerts: obj.textAlerts === true,
    googleBoost: obj.googleBoost === true,
    photoShoot: obj.photoShoot === true,
    adCreative: obj.adCreative === true,
    brandPackage: obj.brandPackage === true,
    adsCall: obj.adsCall === true,
  };
}

function getRequiredPriceId(envName: string): string {
  const value = process.env[envName];
  if (!value) {
    throw new Error(`Missing required Stripe price configuration: ${envName}`);
  }
  return value;
}

function getTrialEndTimestamp() {
  const trialEnd = new Date();
  trialEnd.setMonth(trialEnd.getMonth() + 4);
  return Math.floor(trialEnd.getTime() / 1000);
}

function formatAmount(amountCents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amountCents / 100);
}

async function retrieveConfiguredPrice(
  envName: string,
  expectedType: "one_time" | "recurring"
) {
  const priceId = getRequiredPriceId(envName);
  const price = await stripe.prices.retrieve(priceId);

  if (!price.active) {
    throw new Error(`Stripe price is inactive: ${envName}`);
  }

  if (price.unit_amount == null) {
    throw new Error(`Stripe price is missing unit_amount: ${envName}`);
  }

  const isRecurring = Boolean(price.recurring);
  if (expectedType === "one_time" && isRecurring) {
    throw new Error(`Expected one-time Stripe price but received recurring price: ${envName}`);
  }

  if (expectedType === "recurring" && !isRecurring) {
    throw new Error(`Expected recurring Stripe price but received one-time price: ${envName}`);
  }

  return price;
}

function buildInlineLineItemFromPrice(
  price: Stripe.Price,
  {
    name,
    description,
    recurring,
  }: {
    name: string;
    description: string;
    recurring: boolean;
  }
): Stripe.Checkout.SessionCreateParams.LineItem {
  const priceData: Stripe.Checkout.SessionCreateParams.LineItem.PriceData = {
    currency: price.currency,
    product_data: {
      name,
      description,
    },
    unit_amount: price.unit_amount ?? undefined,
  };

  if (price.tax_behavior && price.tax_behavior !== "unspecified") {
    priceData.tax_behavior = price.tax_behavior;
  }

  if (recurring) {
    if (!price.recurring) {
      throw new Error("Recurring price data expected but missing.");
    }

    priceData.recurring = {
      interval: price.recurring.interval,
      ...(price.recurring.interval_count
        ? { interval_count: price.recurring.interval_count }
        : {}),
    };
  }

  return {
    price_data: priceData,
    quantity: 1,
  };
}

function buildInlineOneTimeAmountLineItem(
  {
    name,
    description,
    amountCents,
    currency,
  }: {
    name: string;
    description: string;
    amountCents: number;
    currency: string;
  }
): Stripe.Checkout.SessionCreateParams.LineItem {
  return {
    price_data: {
      currency,
      product_data: {
        name,
        description,
      },
      unit_amount: amountCents,
    },
    quantity: 1,
  };
}

function buildSubmitMessage({
  isUpfront,
  dueTodayCents,
  recurringStartCents,
  currency,
}: {
  isUpfront: boolean;
  dueTodayCents: number;
  recurringStartCents: number;
  currency: string;
}) {
  if (isUpfront) {
    return `Today you pay ${formatAmount(dueTodayCents, currency)} for months 1-3. Month 4 is free. ${formatAmount(recurringStartCents, currency)}/month starts in month 5.`;
  }

  return `Today you start your monthly plan at ${formatAmount(recurringStartCents, currency)}/month.`;
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

    const plan = req.nextUrl.searchParams.get("plan");
    if (!isValidPlan(plan)) {
      return NextResponse.json(
        { error: "Invalid plan. Must be 'starter', 'growth', or 'city_dominator'." },
        { status: 400, headers }
      );
    }

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
    const isUpfront = addOns.billingCycle === "upfront";
    const planConfig = PLAN_CONFIG[plan];
    const monthlyPlanPrice = await retrieveConfiguredPrice(
      planConfig.monthlyPriceEnv,
      "recurring"
    );
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    let recurringStartCents = monthlyPlanPrice.unit_amount ?? 0;
    let dueTodayCents = 0;

    let trialEndTimestamp: number | undefined;
    if (isUpfront) {
      const upfrontPlanPrice = await retrieveConfiguredPrice(
        planConfig.upfrontPriceEnv,
        "one_time"
      );
      dueTodayCents += upfrontPlanPrice.unit_amount ?? 0;
      lineItems.push(
        buildInlineLineItemFromPrice(upfrontPlanPrice, {
          name: planConfig.upfrontLabel,
          description: "Pays for months 1-3. Month 4 is free.",
          recurring: false,
        })
      );
      trialEndTimestamp = getTrialEndTimestamp();
    }

    lineItems.push(
      buildInlineLineItemFromPrice(monthlyPlanPrice, {
        name: planConfig.recurringLabel,
        description: isUpfront
          ? `Starts in month 5 at ${formatAmount(recurringStartCents, monthlyPlanPrice.currency)}/month. Cancel anytime.`
          : `${formatAmount(recurringStartCents, monthlyPlanPrice.currency)}/month. Cancel anytime.`,
        recurring: true,
      })
    );
    dueTodayCents += isUpfront ? 0 : recurringStartCents;

    if (addOns.domainRouting === "us") {
      const domainRoutingPrice = await retrieveConfiguredPrice(
        ONE_TIME_ADDON_CONFIG.domainRouting.envName,
        "one_time"
      );
      dueTodayCents += domainRoutingPrice.unit_amount ?? 0;
      lineItems.push(
        buildInlineLineItemFromPrice(domainRoutingPrice, {
          name: ONE_TIME_ADDON_CONFIG.domainRouting.label,
          description: ONE_TIME_ADDON_CONFIG.domainRouting.description,
          recurring: false,
        })
      );
    }

    if (addOns.googleBoost) {
      const googleBoostPrice = await retrieveConfiguredPrice(
        ONE_TIME_ADDON_CONFIG.googleBoost.envName,
        "one_time"
      );
      dueTodayCents += googleBoostPrice.unit_amount ?? 0;
      lineItems.push(
        buildInlineLineItemFromPrice(googleBoostPrice, {
          name: ONE_TIME_ADDON_CONFIG.googleBoost.label,
          description: ONE_TIME_ADDON_CONFIG.googleBoost.description,
          recurring: false,
        })
      );
    }

    if (addOns.photoShoot) {
      const photoShootPrice = await retrieveConfiguredPrice(
        ONE_TIME_ADDON_CONFIG.photoShoot.envName,
        "one_time"
      );
      dueTodayCents += photoShootPrice.unit_amount ?? 0;
      lineItems.push(
        buildInlineLineItemFromPrice(photoShootPrice, {
          name: ONE_TIME_ADDON_CONFIG.photoShoot.label,
          description: ONE_TIME_ADDON_CONFIG.photoShoot.description,
          recurring: false,
        })
      );
    }

    if (addOns.adCreative) {
      const adCreativePrice = await retrieveConfiguredPrice(
        ONE_TIME_ADDON_CONFIG.adCreative.envName,
        "one_time"
      );
      dueTodayCents += adCreativePrice.unit_amount ?? 0;
      lineItems.push(
        buildInlineLineItemFromPrice(adCreativePrice, {
          name: ONE_TIME_ADDON_CONFIG.adCreative.label,
          description: ONE_TIME_ADDON_CONFIG.adCreative.description,
          recurring: false,
        })
      );
    }

    if (addOns.brandPackage) {
      const brandPackagePrice = await retrieveConfiguredPrice(
        ONE_TIME_ADDON_CONFIG.brandPackage.envName,
        "one_time"
      );
      dueTodayCents += brandPackagePrice.unit_amount ?? 0;
      lineItems.push(
        buildInlineLineItemFromPrice(brandPackagePrice, {
          name: ONE_TIME_ADDON_CONFIG.brandPackage.label,
          description: ONE_TIME_ADDON_CONFIG.brandPackage.description,
          recurring: false,
        })
      );
    }

    let recurringCurrency = monthlyPlanPrice.currency;
    if (addOns.textAlerts) {
      const textAlertsPrice = await retrieveConfiguredPrice(
        RECURRING_ADDON_CONFIG.textAlerts.envName,
        "recurring"
      );
      const monthlyAddonAmount = textAlertsPrice.unit_amount ?? 0;
      recurringCurrency = textAlertsPrice.currency;

      if (isUpfront) {
        const prepayAmount = monthlyAddonAmount * 3;
        dueTodayCents += prepayAmount;
        lineItems.push(
          buildInlineOneTimeAmountLineItem({
            name: `${RECURRING_ADDON_CONFIG.textAlerts.label} - 3 Month Prepay`,
            description: "Pays for months 1-3. Monthly billing starts in month 5.",
            amountCents: prepayAmount,
            currency: textAlertsPrice.currency,
          })
        );
      }

      lineItems.push(
        buildInlineLineItemFromPrice(textAlertsPrice, {
          name: `${RECURRING_ADDON_CONFIG.textAlerts.label} - Monthly Add-on`,
          description: isUpfront
            ? `Starts in month 5 at ${formatAmount(monthlyAddonAmount, textAlertsPrice.currency)}/month.`
            : `${formatAmount(monthlyAddonAmount, textAlertsPrice.currency)}/month with your plan.`,
          recurring: true,
        })
      );
      recurringStartCents += monthlyAddonAmount;
      dueTodayCents += isUpfront ? 0 : monthlyAddonAmount;
    }

    const successUrl = `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${siteUrl}/cancel`;

    const sessionMetadata: Stripe.MetadataParam = {
      plan,
      planLabel: planConfig.label,
      billingCycle: addOns.billingCycle,
      hasDomain: String(addOns.hasDomain),
      domainRouting: addOns.domainRouting || "none",
      textAlerts: String(addOns.textAlerts),
      googleBoost: String(addOns.googleBoost),
      photoShoot: String(addOns.photoShoot),
      adCreative: String(addOns.adCreative),
      brandPackage: String(addOns.brandPackage),
      adsCall: String(addOns.adsCall),
      analytics_source: "quicklaunchweb",
      analytics_timestamp: new Date().toISOString(),
      offer: isUpfront ? "3_month_prepay_1_month_free" : "monthly",
      trialEnd:
        isUpfront && trialEndTimestamp
          ? new Date(trialEndTimestamp * 1000).toISOString()
          : "none",
    };

    const subscriptionMetadata: Stripe.MetadataParam = {
      plan,
      planLabel: planConfig.label,
      billingCycle: addOns.billingCycle,
      hasDomain: String(addOns.hasDomain),
      domainRouting: addOns.domainRouting || "none",
      textAlerts: String(addOns.textAlerts),
      googleBoost: String(addOns.googleBoost),
      photoShoot: String(addOns.photoShoot),
      adCreative: String(addOns.adCreative),
      brandPackage: String(addOns.brandPackage),
      adsCall: String(addOns.adsCall),
      offer: isUpfront ? "3_month_prepay_1_month_free" : "monthly",
      trialEnd:
        isUpfront && trialEndTimestamp
          ? new Date(trialEndTimestamp * 1000).toISOString()
          : "none",
    };

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "subscription",
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      customer_email: email || undefined,
      client_reference_id: plan,
      metadata: sessionMetadata,
      subscription_data: {
        metadata: subscriptionMetadata,
        ...(isUpfront && trialEndTimestamp
          ? {
              trial_end: trialEndTimestamp,
            }
          : {}),
      },
      custom_text: {
        submit: {
          message: buildSubmitMessage({
            isUpfront,
            dueTodayCents,
            recurringStartCents,
            currency: recurringCurrency,
          }),
        },
      },
    };

    console.log("Checkout config:", {
      siteUrl,
      successUrl,
      cancelUrl,
      plan,
      billingCycle: addOns.billingCycle,
      lineItemsCount: lineItems.length,
      hasTrial: Boolean(trialEndTimestamp),
    });

    const session = await stripe.checkout.sessions.create(sessionParams);

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL");
    }

    const selectedAddons: string[] = [];
    if (isUpfront) selectedAddons.push("upfront_billing");
    if (addOns.textAlerts) selectedAddons.push("text_alerts");
    if (addOns.googleBoost) selectedAddons.push("google_boost");
    if (addOns.photoShoot) selectedAddons.push("photo_shoot");
    if (addOns.adCreative) selectedAddons.push("ad_creative");
    if (addOns.brandPackage) selectedAddons.push("brand_package");
    if (addOns.adsCall) selectedAddons.push("ads_call");
    if (addOns.domainRouting === "us") selectedAddons.push("domain_routing");

    await logCheckoutEvent(
      session.id,
      plan,
      session.amount_total ? session.amount_total / 100 : 0,
      selectedAddons
    );

    return NextResponse.json({ url: session.url }, { headers });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    console.error("Stripe checkout error:", {
      message: errorMessage,
      timestamp: new Date().toISOString(),
    });

    await logErrorEvent("checkout_error", errorMessage, {
      endpoint: "/api/stripe/checkout",
    });

    return NextResponse.json(
      { error: "Unable to create checkout session. Please try again." },
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
