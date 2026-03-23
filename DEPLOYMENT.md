# QuickLaunchWeb - Production Deployment Checklist

## 🚀 Vercel Deployment Guide

### Prerequisites

1. **Stripe Account** with products created
2. **Vercel Account** connected to your GitHub repository
3. **Domain** (optional but recommended)

---

## ✅ Pre-Deployment Checklist

### 1. Environment Variables (Required)

Set these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Your production URL (no trailing slash) | `https://quicklaunchweb.com` |
| `STRIPE_SECRET_KEY` | Stripe secret key (starts with `sk_live_`) | `sk_live_xxx` |
| `STRIPE_PRICE_STARTER_MONTHLY` | Starter plan price ID ($99/mo) | `price_xxx` |
| `STRIPE_PRICE_GROWTH_MONTHLY` | Growth Engine plan price ID ($199/mo) | `price_xxx` |
| `STRIPE_PRICE_TEXT_ALERTS` | Text alerts add-on ($29/mo) | `price_xxx` |
| `STRIPE_PRICE_UNLIMITED_EDITS` | Unlimited edits add-on ($99/mo) | `price_xxx` |
| `STRIPE_PRICE_DOMAIN_ROUTING` | Domain connection ($99 one-time) | `price_xxx` |
| `STRIPE_PRICE_DOMAIN_REGISTRATION` | Domain registration ($50/year) | `price_xxx` |
| `STRIPE_PRICE_GOOGLE_BOOST` | Google boost ($199 one-time) | `price_xxx` |

### 2. Stripe Configuration

#### Create Products in Stripe Dashboard

1. Go to [Stripe Dashboard](https://dashboard.stripe.com) → Products
2. Create the following products:

**Recurring (Monthly) Products:**
- Starter Plan: $99/month
- Growth Engine Plan: $199/month
- Text Alerts: $29/month
- Unlimited Edits: $99/month

**One-Time Products:**
- Domain Connection: $99 (one-time)
- Domain Registration: $50 (one-time)
- Google Business Boost: $199 (one-time)

3. Copy each Price ID (starts with `price_`) to your environment variables

#### Configure Customer Portal

1. Go to Stripe Dashboard → Settings → Billing → Customer portal
2. Enable: Invoices, Payment methods, Subscription cancellation
3. Set return URL to: `https://your-domain.com/?portal=1`

### 3. Vercel Project Settings

1. **Framework Preset:** Next.js (auto-detected)
2. **Build Command:** `npm run build` (default)
3. **Output Directory:** `.next` (default)
4. **Install Command:** `npm install` (default)

---

## 🔒 Security Implemented

### API Routes
- ✅ Input validation and sanitization
- ✅ Email format validation
- ✅ Plan parameter validation
- ✅ Request body parsing error handling
- ✅ Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- ✅ Method validation (POST only)
- ✅ 30-second request timeout

### Next.js Config
- ✅ Strict Transport Security (HSTS)
- ✅ X-Frame-Options: DENY (clickjacking protection)
- ✅ X-Content-Type-Options: nosniff
- ✅ Referrer-Policy: strict-origin-when-cross-origin
- ✅ Permissions-Policy (disabled unused features)
- ✅ Removed X-Powered-By header
- ✅ React Strict Mode enabled

### Client-Side
- ✅ Email validation before API calls
- ✅ Request abort on timeout
- ✅ Error boundary handling
- ✅ User-friendly error messages

---

## 📋 Post-Deployment Steps

### 1. Test Checkout Flow
- [ ] Test Starter plan checkout
- [ ] Test Pro plan checkout
- [ ] Test all add-ons
- [ ] Verify success page displays
- [ ] Verify cancel page displays

### 2. Test Customer Portal
- [ ] Enter a test email and verify portal access
- [ ] Test subscription management

### 3. Verify SEO & Performance
- [ ] Run Lighthouse audit (aim for 90+ scores)
- [ ] Check meta tags with social media debuggers
- [ ] Test on mobile devices

### 4. Set Up Monitoring (Recommended)
- [ ] Enable Vercel Analytics
- [ ] Set up error monitoring (Sentry, LogRocket)
- [ ] Configure uptime monitoring

---

## 🔧 Troubleshooting

### "Invalid plan or missing price configuration"
- Ensure all `STRIPE_PRICE_*` environment variables are set in Vercel
- Restart the deployment after adding variables

### "Customer not found"
- User must use the same email from their checkout
- Verify customer exists in Stripe Dashboard

### Checkout not redirecting
- Check browser console for errors
- Verify `NEXT_PUBLIC_SITE_URL` matches your domain exactly
- Check Stripe Dashboard → Logs for API errors

### CORS errors
- Next.js API routes should handle CORS automatically
- If issues persist, check for proxy/CDN configuration

---

## 📊 Stripe Webhook Setup (Optional but Recommended)

For production, set up webhooks to handle:
- Subscription cancellations
- Payment failures
- Invoice updates

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.com/api/stripe/webhook`
3. Select events: `customer.subscription.*`, `invoice.*`
4. Copy webhook secret and add `STRIPE_WEBHOOK_SECRET` to Vercel

---

## 🎯 Performance Optimizations Included

- ✅ Next.js App Router (server components)
- ✅ Image optimization with next/image
- ✅ Font optimization with next/font
- ✅ Static generation where possible
- ✅ Gzip compression enabled
- ✅ ETags for caching
- ✅ Package import optimization

---

## 📝 Notes

- Keep `STRIPE_SECRET_KEY` secure - never commit to git
- Use Stripe test keys for development, live keys for production
- Monitor Stripe Dashboard for failed payments
- Set up email notifications in Stripe for important events
