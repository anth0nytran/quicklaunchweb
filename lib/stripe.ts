import Stripe from "stripe";

// =============================================================================
// Stripe SDK Configuration
// =============================================================================

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// Validate Stripe secret key exists and has correct format
if (!stripeSecretKey) {
  throw new Error(
    "Missing STRIPE_SECRET_KEY environment variable. " +
      "Add it to your .env.local file."
  );
}

// Validate key format (should start with sk_test_ or sk_live_)
if (!stripeSecretKey.startsWith("sk_test_") && !stripeSecretKey.startsWith("sk_live_")) {
  throw new Error(
    "Invalid STRIPE_SECRET_KEY format. " +
      "Key should start with 'sk_test_' (test mode) or 'sk_live_' (production)."
  );
}

// Warn if using test keys in production
if (
  process.env.NODE_ENV === "production" &&
  stripeSecretKey.startsWith("sk_test_")
) {
  console.warn(
    "⚠️ WARNING: Using Stripe TEST keys in production. " +
      "Switch to LIVE keys for real payments."
  );
}

// Initialize Stripe client
export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2023-10-16",
  typescript: true,
  // Add app info for Stripe dashboard tracking
  appInfo: {
    name: "QuickLaunchWeb",
    version: "1.0.0",
  },
  // Set reasonable timeouts
  timeout: 30000, // 30 seconds
  maxNetworkRetries: 2,
});
