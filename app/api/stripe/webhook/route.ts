import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { Resend } from 'resend';
import { appendToGoogleSheet } from '@/lib/google-sheets';
import type Stripe from 'stripe';

export const runtime = 'nodejs';

// Disable Next.js body parsing — Stripe needs the raw body
export const dynamic = 'force-dynamic';

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#39;';
      default: return char;
    }
  });

const BRAND_PRIMARY = '#0f766e';
const BRAND_ACCENT = '#14b8a6';

const ENROLLMENT_HEADERS = [
  'Timestamp',
  'Name',
  'Email',
  'Plan',
  'Add-ons',
  'Amount',
  'Stripe Session ID',
];

const PLAN_LABELS = {
  starter: 'Starter',
  growth: 'Growth Engine',
  city_dominator: 'City Dominator',
} as const;

type KnownPlan = keyof typeof PLAN_LABELS;

type HydratedCheckoutSession = Stripe.Checkout.Session & {
  line_items?: Stripe.ApiList<Stripe.LineItem>;
};

function normalizePlanKey(value: string | null | undefined): KnownPlan | undefined {
  if (!value) return undefined;
  if (value === 'starter' || value === 'growth' || value === 'city_dominator') {
    return value;
  }
  return undefined;
}

function getSubscriptionMetadata(session: Stripe.Checkout.Session): Stripe.Metadata | null {
  const subscription = session.subscription;
  if (!subscription || typeof subscription === 'string') {
    return null;
  }
  return subscription.metadata ?? null;
}

function mergeMetadata(
  sessionMetadata: Stripe.Metadata | null,
  subscriptionMetadata: Stripe.Metadata | null
): Stripe.Metadata | null {
  const merged = {
    ...(subscriptionMetadata ?? {}),
    ...(sessionMetadata ?? {}),
  };

  return Object.keys(merged).length > 0 ? merged : null;
}

function getPlanPriceIds(): Record<KnownPlan, string[]> {
  return {
    starter: [
      process.env.STRIPE_PRICE_STARTER_MONTHLY,
      process.env.STRIPE_PRICE_STARTER_UPFRONT,
    ].filter(Boolean) as string[],
    growth: [
      process.env.STRIPE_PRICE_GROWTH_MONTHLY,
      process.env.STRIPE_PRICE_GROWTH_UPFRONT,
    ].filter(Boolean) as string[],
    city_dominator: [
      process.env.STRIPE_PRICE_CITY_DOMINATOR_MONTHLY,
      process.env.STRIPE_PRICE_CITY_DOMINATOR_UPFRONT,
    ].filter(Boolean) as string[],
  };
}

function inferPlanLabelFromLineItems(
  lineItems?: Stripe.ApiList<Stripe.LineItem>
): string | undefined {
  if (!lineItems?.data?.length) return undefined;

  const planPriceIds = getPlanPriceIds();

  for (const item of lineItems.data) {
    const description = item.description ?? '';
    const price = item.price;
    const priceId = price && typeof price !== 'string' ? price.id : typeof price === 'string' ? price : undefined;

    for (const [planKey, label] of Object.entries(PLAN_LABELS) as [KnownPlan, string][]) {
      if (description.includes(label)) {
        return label;
      }

      if (priceId && planPriceIds[planKey].includes(priceId)) {
        return label;
      }
    }
  }

  return undefined;
}

function resolvePlanLabel(
  session: HydratedCheckoutSession,
  metadata: Stripe.Metadata | null
): string {
  const normalizedPlan = normalizePlanKey(metadata?.plan);
  if (metadata?.planLabel) return metadata.planLabel;
  if (normalizedPlan) return PLAN_LABELS[normalizedPlan];

  const clientReferencePlan = normalizePlanKey(session.client_reference_id);
  if (clientReferencePlan) return PLAN_LABELS[clientReferencePlan];

  const inferredFromLineItems = inferPlanLabelFromLineItems(session.line_items);
  if (inferredFromLineItems) return inferredFromLineItems;

  return 'QuickLaunchWeb Plan';
}

function resolveBillingCycle(
  session: HydratedCheckoutSession,
  metadata: Stripe.Metadata | null
): 'monthly' | 'upfront' {
  if (metadata?.billingCycle === 'upfront') return 'upfront';
  if (metadata?.billingCycle === 'monthly') return 'monthly';

  const hasUpfrontLineItem = session.line_items?.data?.some((item) =>
    (item.description ?? '').includes('3 Month Prepay')
  );

  return hasUpfrontLineItem ? 'upfront' : 'monthly';
}

async function hydrateCheckoutSession(
  session: Stripe.Checkout.Session
): Promise<HydratedCheckoutSession> {
  if (!session.id || session.id === 'test_session') {
    return session as HydratedCheckoutSession;
  }

  try {
    const [fullSession, lineItems] = await Promise.all([
      stripe.checkout.sessions.retrieve(session.id, {
        expand: ['subscription'],
      }),
      stripe.checkout.sessions.listLineItems(session.id, {
        limit: 20,
        expand: ['data.price'],
      }),
    ]);

    return {
      ...fullSession,
      line_items: lineItems,
    };
  } catch (err) {
    console.error('[Stripe Webhook] Failed to hydrate checkout session:', err);
    return session as HydratedCheckoutSession;
  }
}

function formatAddOns(metadata: Stripe.Metadata | null): string {
  if (!metadata) return 'None';
  const addons: string[] = [];
  if (metadata.textAlerts === 'true') addons.push('Text Alerts');
  if (metadata.googleBoost === 'true') addons.push('Google Business Setup');
  if (metadata.photoShoot === 'true') addons.push('Photo Shoot');
  if (metadata.adCreative === 'true') addons.push('Ad Creative Package');
  if (metadata.brandPackage === 'true') addons.push('Brand Content Package');
  if (metadata.adsCall === 'true') addons.push('Ads Consultation');
  if (metadata.domainRouting && metadata.domainRouting !== 'none') addons.push('Domain Routing');
  if (metadata.hasDomain === 'true') addons.push('Has Domain');
  return addons.length > 0 ? addons.join(', ') : 'None';
}

function formatAmount(cents: number | null): string {
  if (cents == null) return '$0.00';
  return `$${(cents / 100).toFixed(2)}`;
}

function buildInternalEmailHtml(
  name: string,
  email: string,
  plan: string,
  addOns: string,
  amount: string,
  sessionId: string,
  timestamp: string,
  metadata: Stripe.Metadata | null
): string {
  return `
  <div style="background-color:#0a0a0c;margin:0;padding:24px 12px;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#f1f5f9;">
    <span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">
      New enrollment from ${escapeHtml(name)} — ${escapeHtml(plan)} plan
    </span>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:580px;margin:0 auto;background:#111113;border:1px solid #222;border-radius:16px;overflow:hidden;">
      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg, ${BRAND_PRIMARY}, #0d9488);padding:18px 20px;border-bottom:3px solid ${BRAND_ACCENT};">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="font-size:16px;font-weight:800;color:#ffffff;letter-spacing:0.5px;">
                Quick<span style="color:#5eead4;">Launch</span>Web
              </td>
              <td align="right">
                <span style="display:inline-block;background:#10b981;color:#fff;font-weight:800;font-size:10px;padding:6px 10px;border-radius:999px;letter-spacing:1.2px;">NEW ENROLLMENT</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Summary -->
      <tr>
        <td style="padding:24px 20px 14px;">
          <div style="font-size:24px;font-weight:800;line-height:1.2;margin:0 0 4px;color:#ffffff;">${escapeHtml(name)}</div>
          <div style="font-size:15px;color:${BRAND_ACCENT};font-weight:700;margin:0 0 2px;">${escapeHtml(plan)} Plan</div>
          <div style="font-size:13px;color:#94a3b8;">${escapeHtml(amount)} &nbsp;·&nbsp; ${escapeHtml(timestamp)}</div>
        </td>
      </tr>

      <!-- Action buttons -->
      <tr>
        <td style="padding:4px 20px 20px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding:0 4px 8px 0;width:50%;">
                <a href="mailto:${escapeHtml(email)}" style="display:block;background:${BRAND_ACCENT};color:#000;text-decoration:none;font-weight:800;font-size:14px;text-align:center;padding:14px 12px;border-radius:10px;">
                  Email ${escapeHtml(name.split(' ')[0])}
                </a>
              </td>
              <td style="padding:0 0 8px 4px;width:50%;">
                <a href="https://dashboard.stripe.com/payments" style="display:block;background:#1e293b;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;text-align:center;padding:14px 12px;border-radius:10px;border:1px solid #334155;">
                  Stripe Dashboard
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Enrollment details -->
      <tr>
        <td style="padding:0 20px 20px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #1e293b;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="background:#0f172a;padding:12px 16px;font-weight:800;font-size:12px;letter-spacing:1px;text-transform:uppercase;border-bottom:1px solid #1e293b;color:${BRAND_ACCENT};">Enrollment Details</td>
            </tr>
            <tr>
              <td style="padding:0 16px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size:14px;">
                  <tr>
                    <td style="padding:12px 0;color:#64748b;width:130px;border-bottom:1px solid #1a1a1f;">Name</td>
                    <td style="padding:12px 0;color:#ffffff;font-weight:700;border-bottom:1px solid #1a1a1f;">${escapeHtml(name)}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;color:#64748b;border-bottom:1px solid #1a1a1f;">Email</td>
                    <td style="padding:12px 0;border-bottom:1px solid #1a1a1f;">
                      <a href="mailto:${escapeHtml(email)}" style="color:${BRAND_ACCENT};text-decoration:none;font-weight:700;">${escapeHtml(email)}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;color:#64748b;border-bottom:1px solid #1a1a1f;">Plan</td>
                    <td style="padding:12px 0;color:#ffffff;font-weight:700;border-bottom:1px solid #1a1a1f;">${escapeHtml(plan)}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;color:#64748b;border-bottom:1px solid #1a1a1f;">Add-ons</td>
                    <td style="padding:12px 0;color:#cbd5e1;font-weight:600;border-bottom:1px solid #1a1a1f;">${escapeHtml(addOns)}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;color:#64748b;border-bottom:1px solid #1a1a1f;">Amount</td>
                    <td style="padding:12px 0;color:#10b981;font-weight:800;font-size:16px;border-bottom:1px solid #1a1a1f;">${escapeHtml(amount)}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;color:#64748b;">Session ID</td>
                    <td style="padding:12px 0;color:#94a3b8;font-size:12px;font-family:monospace;word-break:break-all;">${escapeHtml(sessionId)}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      ${metadata ? `
      <!-- Metadata -->
      <tr>
        <td style="padding:0 20px 20px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #1e293b;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="background:#0f172a;padding:12px 16px;font-weight:800;font-size:12px;letter-spacing:1px;text-transform:uppercase;border-bottom:1px solid #1e293b;color:#64748b;">Session Metadata</td>
            </tr>
            <tr>
              <td style="padding:0 16px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size:13px;">
                  ${Object.entries(metadata).map(([key, val]) => `
                  <tr>
                    <td style="padding:10px 0;color:#64748b;width:130px;border-bottom:1px solid #1a1a1f;">${escapeHtml(key)}</td>
                    <td style="padding:10px 0;color:#cbd5e1;border-bottom:1px solid #1a1a1f;">${escapeHtml(String(val))}</td>
                  </tr>`).join('')}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      ` : ''}

      <!-- Footer -->
      <tr>
        <td style="padding:0 20px 22px;">
          <div style="border-left:3px solid ${BRAND_ACCENT};padding:12px;background:#0c0c0f;border-radius:8px;font-size:12px;color:#64748b;line-height:1.5;">
            This enrollment was processed via <strong style="color:#94a3b8;">Stripe Checkout</strong>.
            <span style="display:block;margin-top:4px;color:#475569;">Begin onboarding within 24 hours.</span>
          </div>
        </td>
      </tr>
    </table>
  </div>`;
}

function buildClientWelcomeHtml(name: string, plan: string): string {
  const cleanName = name.trim();
  const firstName =
    cleanName && cleanName !== 'Unknown' ? cleanName.split(' ')[0] || cleanName : 'there';
  const planReference =
    plan === 'QuickLaunchWeb Plan' ? 'your QuickLaunchWeb plan' : `the ${plan} plan`;
  return `
  <div style="font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.8;color:#222222;">
    <p>Dear ${escapeHtml(firstName)},</p>

    <p>Thank you for starting <strong>${escapeHtml(planReference)}</strong>. I look forward to working with you on your new website.</p>

    <p>To get started, please follow these next steps:</p>

    <p>
      <strong>1. Fill out the intake form:</strong> Please complete <a href="https://forms.gle/qHZgmrfHCC9Zvbt46" style="color:${BRAND_PRIMARY};">this form</a> within the next 24–48 hours. This will help us speed up your website delivery.<br/><br/>
      <strong>2. Review your preview link:</strong> Once we receive your information, we will begin working on your request. We will then send you a preview link so you can iterate through drafts with us.<br/><br/>
      <strong>3. Finalize and launch:</strong> After the design is finalized, we will schedule a meeting for the domain transfer, and your website will go live.
    </p>

    <p>If you have any questions in the meantime, please feel free to respond to this email, text me at <a href="tel:+18325523458" style="color:${BRAND_PRIMARY};">832-552-3458</a>, or <a href="https://calendly.com/quicklaunchweb/15-minute-support-call" style="color:${BRAND_PRIMARY};">schedule a quick call</a>. I am available Monday through Friday, from 9:00 AM to 6:00 PM CST.</p>

    <p>
      Best regards,<br/>
      <strong>Anthony Tran</strong><br/>
      <span style="color:#555555;">Founder, QuickLaunchWeb</span><br/>
      <a href="tel:+18325523458" style="color:#555555;text-decoration:none;">832-552-3458</a> &middot; <a href="https://quicklaunchweb.us" style="color:${BRAND_PRIMARY};text-decoration:none;">quicklaunchweb.us</a>
    </p>
  </div>`;
}

// Track processed events in-memory to handle Stripe retries.
// This works per-instance; for multi-instance deployments, duplicates are
// still safe because emails and sheet appends are idempotent enough.
const processedEvents = new Set<string>();
const MAX_PROCESSED_CACHE = 1000;

export async function POST(req: Request) {
  const rawBody = await req.text();

  // ── Dev-only: allow unsigned test payloads ──
  if (process.env.NODE_ENV !== 'production' && req.headers.get('x-stripe-test') === 'true') {
    console.warn('[Stripe Webhook] DEV MODE — skipping signature verification');
    const session = JSON.parse(rawBody);
    return handleCheckoutCompleted(session);
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('[Stripe Webhook] Missing STRIPE_WEBHOOK_SECRET');
    return NextResponse.json({ error: 'Server misconfigured.' }, { status: 500 });
  }

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header.' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error('[Stripe Webhook] Signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 });
  }

  // Idempotency: skip duplicate events from Stripe retries
  if (processedEvents.has(event.id)) {
    console.warn(`[Stripe Webhook] Duplicate event ${event.id}, skipping.`);
    return NextResponse.json({ received: true });
  }
  processedEvents.add(event.id);
  if (processedEvents.size > MAX_PROCESSED_CACHE) {
    const first = processedEvents.values().next().value;
    if (first) processedEvents.delete(first);
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true });
  }

  return handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const hydratedSession = await hydrateCheckoutSession(session);
  const clientEmail =
    hydratedSession.customer_details?.email || hydratedSession.customer_email || '';
  const clientName = hydratedSession.customer_details?.name || 'Unknown';
  const amount = formatAmount(hydratedSession.amount_total);
  const metadata = mergeMetadata(
    hydratedSession.metadata ?? null,
    getSubscriptionMetadata(hydratedSession)
  );
  const planLabel = resolvePlanLabel(hydratedSession, metadata);
  const billingCycle = resolveBillingCycle(hydratedSession, metadata);
  const billingSuffix = billingCycle === 'upfront' ? ' (Upfront Offer)' : '';
  const plan = `${planLabel}${billingSuffix}`;
  const addOns = formatAddOns(metadata);
  const sessionId = hydratedSession.id || 'test_session';

  if (planLabel === 'QuickLaunchWeb Plan') {
    console.error('[Stripe Webhook] Could not resolve plan label from checkout session.', {
      sessionId,
      metadata,
      clientReferenceId: hydratedSession.client_reference_id,
      lineItems: hydratedSession.line_items?.data?.map((item) => ({
        description: item.description,
        priceId:
          item.price && typeof item.price !== 'string' ? item.price.id : item.price,
      })),
    });
  }

  const timestamp = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  }).format(new Date());

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.LEAD_FROM_EMAIL || 'QuickLaunchWeb <leads@quicklaunchweb.us>';
  const internalTo = process.env.INTERNAL_ALERT_EMAIL || process.env.LEAD_TO_EMAIL;

  // ── 1. Internal alert email ──
  if (resendApiKey && internalTo) {
    try {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: fromEmail,
        to: internalTo,
        subject: `New enrollment: ${clientName} — ${plan}`,
        html: buildInternalEmailHtml(
          clientName, clientEmail, plan, addOns, amount, sessionId, timestamp, metadata
        ),
        replyTo: clientEmail || undefined,
      });
    } catch (err) {
      console.error('[Stripe Webhook] Internal email failed:', err);
    }
  }

  // ── 2. Client welcome email ──
  if (resendApiKey && clientEmail) {
    try {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: fromEmail,
        to: clientEmail,
        subject: 'QuickLaunchWeb - Website Next Steps',
        html: buildClientWelcomeHtml(clientName, plan),
        replyTo: internalTo || undefined,
      });
    } catch (err) {
      console.error('[Stripe Webhook] Client email failed:', err);
    }
  }

  // ── 3. Google Sheets append ──
  try {
    await appendToGoogleSheet('Enrollments', ENROLLMENT_HEADERS, [
      timestamp,
      clientName,
      clientEmail,
      plan,
      addOns,
      amount,
      sessionId,
    ]);
  } catch (err) {
    console.error('[Stripe Webhook] Google Sheets append failed:', err);
  }

  return NextResponse.json({ received: true });
}
