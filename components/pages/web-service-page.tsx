"use client";

import { usePathname } from "next/navigation";
import { forwardRef, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, useReducedMotion } from "framer-motion";
import { SocialProofSection } from "@/components/social-proof";
import { clientLogos } from "@/components/client-logos";
import { SearchVisual, LeadVisual, ReviewVisual } from "@/components/feature-visuals";
import { BrandShell, useBooking } from "@/components/brand/brand-shell";
import { DiscoveryCallSection } from "@/components/discovery-call";
import { Eyebrow, IconCircle, IconTile, KitIcon, Reveal } from "@/components/brand/primitives";
import { container, focusRing, outlineBtn, primaryBtn, sectionH2, sectionPad } from "@/components/brand/tokens";
import { FAQSchema } from "@/components/FAQSchema";
import { faqs, faqCategories } from "@/lib/faqData";
import { usePageTracker, useCheckoutTracker, useEventTracker, useFormTracker } from "@/lib/analytics";

// AI Search & SEO (website + local SEO subscription) page, light rebrand.
// Visual language follows components/pages/home-page.tsx. The primary path on
// this page is a booked call (#book, DiscoveryCallSection); self-serve stays as
// the secondary path: plan picker -> upsell quiz -> Stripe checkout.

type Plan = "starter" | "growth" | "city_dominator";

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

type CustomForm = {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  details: string;
};

const createEmptyCustomForm = (): CustomForm => ({
  name: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  details: "",
});

const PLAN_DETAILS = {
  starter: {
    label: "Starter",
    monthlyPrice: 99,
    upfrontPrice: 297,
  },
  growth: {
    label: "Growth Engine",
    monthlyPrice: 199,
    upfrontPrice: 597,
  },
  city_dominator: {
    label: "City Dominator",
    monthlyPrice: 399,
    upfrontPrice: 1197,
  },
} as const satisfies Record<
  Plan,
  {
    label: string;
    monthlyPrice: number;
    upfrontPrice: number;
  }
>;

// =============================================================================
// Validation Helpers
// =============================================================================

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

function normalizeWebsite(website: string): string {
  if (!website.trim()) return "";
  const trimmed = website.trim();
  // If it already starts with http:// or https://, return as is
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  // Otherwise, add https://
  return `https://${trimmed}`;
}


// =============================================================================
// Brand UI helpers (local: the shared glass/dialog components stay dark for
// other pages, so this page gets its own light versions)
// =============================================================================

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

/** Small blue check in a pale circle (matches CheckList in primitives). */
function CheckDot({ className = "" }: { className?: string }) {
  return (
    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0866FF]/10 ${className}`}>
      <KitIcon name="check" className="h-3.5 w-3.5" />
    </span>
  );
}

// Data uses a few legacy names; map them to expansion-kit icons.
const ICON_ALIASES: Record<string, string> = {
  smartphone: "phone",
  form: "quote-document",
};

/** 48px blue tile with a kit icon. */
function BrandIconTile({ name }: { name: string }) {
  return <IconTile name={ICON_ALIASES[name] ?? name} />;
}

function Spinner({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-5 w-5 animate-spin ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

/** Primary / outline brand button with optional loading state. */
function BrandButton({
  variant = "primary",
  loading = false,
  className = "",
  children,
  disabled,
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "outline"; loading?: boolean }) {
  const base = variant === "primary" ? primaryBtn : outlineBtn;
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`${base} px-6 py-3.5 text-[16px] disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}

/**
 * "Book a call" button. Must render inside <BrandShell>: useBooking() reads its
 * context, tracks cta_click with `location`, and opens the booking popup.
 */
function BookButton({
  location,
  className = "",
  children,
}: {
  location: string;
  className?: string;
  children: React.ReactNode;
}) {
  const book = useBooking();
  return (
    <button type="button" onClick={() => book(location)} className={className}>
      {children}
    </button>
  );
}

/** Small text action for the self-serve path ("or start now"). */
const startNowLink = `rounded-lg px-2 py-1 text-[14px] font-semibold text-[#46516B] underline decoration-[#0866FF]/40 underline-offset-4 transition-colors hover:text-[#0866FF] hover:decoration-[#0866FF] disabled:cursor-not-allowed disabled:opacity-60 ${focusRing}`;

/** Selectable option card used inside the checkout quiz (replaces GlassSelect). */
function OptionCard({
  selected,
  onClick,
  label,
  description,
  price,
  priceTone = "blue",
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  description?: React.ReactNode;
  price?: React.ReactNode;
  priceTone?: "blue" | "green";
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`w-full rounded-xl border p-4 text-left transition-all duration-200 ${focusRing} ${
        selected
          ? "border-[#0866FF] bg-[#EFF8FF] shadow-[0_0_0_1px_#0866FF]"
          : "border-[#E5EDF6] bg-white hover:border-[#0866FF]/50 hover:bg-[#F7FBFF]"
      }`}
    >
      <span className="flex items-start justify-between gap-3">
        <span className="flex items-start gap-2.5">
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
              selected ? "border-[#0866FF] bg-[#0866FF] text-white" : "border-[#C9D6E8] bg-white"
            }`}
          >
            {selected && <CheckIcon className="h-3 w-3" />}
          </span>
          <span className="font-semibold text-[#07143F]">{label}</span>
        </span>
        {price && (
          <span className={`shrink-0 text-right text-sm font-bold ${priceTone === "green" ? "text-emerald-700" : "text-[#0866FF]"}`}>
            {price}
          </span>
        )}
      </span>
      {description && <span className="mt-1.5 block pl-[30px] text-[13px] leading-[1.5] text-[#46516B]">{description}</span>}
    </button>
  );
}

const inputClass = `w-full rounded-xl border border-[#E5EDF6] bg-white px-4 py-3 text-[15px] text-[#07143F] placeholder:text-[#46516B]/60 transition-colors hover:border-[#0866FF]/40 focus:border-[#0866FF] focus:outline-none focus:ring-4 focus:ring-[#0866FF]/15`;

// Light modal built on the same Radix primitives as components/ui/dialog.
const Dialog = DialogPrimitive.Root;

const DialogContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { label: string }
>(({ className = "", children, label, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-[60] bg-[#07143F]/55 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    <DialogPrimitive.Content
      ref={ref}
      aria-describedby={undefined}
      className={`ql-brand fixed left-1/2 top-1/2 z-[60] max-h-[88vh] w-[calc(100%-1.5rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-[#E5EDF6] bg-white text-[#07143F] shadow-[0_30px_80px_-20px_rgba(7,20,63,0.45)] duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:max-h-[90vh] sm:w-full ${className}`}
      style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
      {...props}
    >
      <DialogPrimitive.Title className="sr-only">{label}</DialogPrimitive.Title>
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = "BrandDialogContent";

function DialogCloseButton() {
  return (
    <DialogPrimitive.Close
      className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-lg text-[#46516B] transition-colors hover:bg-[#EFF8FF] hover:text-[#07143F] ${focusRing}`}
    >
      <KitIcon name="close" className="h-5 w-5" />
      <span className="sr-only">Close</span>
    </DialogPrimitive.Close>
  );
}

// =============================================================================
// Page copy
// =============================================================================

const defaultPageCopy = {
  analyticsTitle: "QuickLaunchWeb - Web Services",
  pageType: "service_page",
  scrollPath: "/services/web-design",
  bookingSource: "website_ai_search_seo",
  heroPill: "AI SEARCH & SEO FOR HOUSTON CONTRACTORS",
  heroHeading: (
    <>
      Get found when Houston searches for{" "}
      <span className="text-[#0866FF]">
        your trade.
      </span>
    </>
  ),
  heroIntro:
    "Homeowners look for contractors on Google, on Google Maps, and more and more by asking AI assistants like ChatGPT, Gemini, and Siri. We set your business up to show up in all three, starting with a fast website that does the selling once they land on it.",
  heroBullets: [
    "Local SEO for Google search and Google Maps, plus your Google Business Profile.",
    "Content built so AI assistants like ChatGPT, Gemini, and Siri can understand and recommend you.",
    "A fast, phone-first website as the foundation. Built free with every plan.",
  ],
  features: [
    {
      title: "You show up everywhere people search",
      desc: "Google, Maps, ChatGPT, Siri — when someone looks for what you do, your name comes up. Not your competitor who paid for ads.",
      icon: "search",
    },
    {
      title: "No lead slips through the cracks",
      desc: "Miss a call? They get texted back. Fill out a form? They hear from you in seconds. Go quiet? We follow up automatically.",
      icon: "phone-message",
    },
    {
      title: "Reviews come in while you sleep",
      desc: "After every job, a review request goes out. When it comes in, we reply for you. Your reputation builds itself.",
      icon: "star",
    },
  ],
  featureHeading: (
    <>
      Someone is searching for what you do <span className="text-[#0866FF]">right now</span>.
      <br />They will call whoever shows up first.
    </>
  ),
  featureDescription:
    "Google, Google Maps, ChatGPT, Siri — people search everywhere now. We make sure you show up in all of them, and that when they find you, they pick up the phone. No ads. Just the system running.",
  bestFor: [
    "Local service businesses that want more calls without ads",
    "Owners losing jobs to competitors who just look better online",
    "Businesses tired of relying on word-of-mouth alone",
  ],
  deliverables: [
    { label: "01", title: "You show up when people search your service", icon: "search", detail: "Google, AI search, Maps" },
    { label: "02", title: "People call or request a quote instantly", icon: "smartphone", detail: "Tap-to-call + forms ready" },
    { label: "03", title: "Leads get followed up automatically", icon: "phone-message", detail: "Missed calls, after-hours, follow-ups" },
    { label: "04", title: "Reviews come in without you chasing anyone", icon: "star", detail: "Automated requests + replies" },
    { label: "05", title: "You rank in more cities over time", icon: "growth", detail: "Dedicated pages that bring in new calls" },
    { label: "06", title: "Everything stays running and improving", icon: "wrench", detail: "We manage it all, you do the work" },
  ],
  deliverablesHeading: (
    <>
      Here is what happens when you <span className="text-[#0866FF]">turn this on</span>.
    </>
  ),
  deliverablesDescription:
    "More calls. More reviews. More jobs. All on autopilot.",
  steps: [
    { step: "01", title: "Book a free strategy call", desc: "We look at how you show up on Google, Maps, and AI search today, then pick the plan that fits." },
    { step: "02", title: "Send us the basics", desc: "What you do, where you work, your photos, and how people should reach you." },
    { step: "03", title: "Your system goes live in 48 hours", desc: "We build everything out and launch it. You start getting calls, not invoices." },
  ],
  stats: [
    { value: "48h", label: "Launch" },
    { value: "Google", label: "Rankings" },
    { value: "Reviews", label: "Automated" },
    { value: "Anytime", label: "Cancel" },
  ],
  pricingEyebrow:
    "Free website included. You pay for the system.",
  pricingHeading: "Pick the level that fits right now.",
  pricingDescription:
    "Every plan includes a free custom-built website. You just pay monthly for the system that keeps you ranking, getting reviews, and bringing in calls — without paying for ads.",
  growthHelperHeading: "Go Growth Engine if:",
  growthHelperItems: [
    "You want to show up on Google and get more calls",
    "You want reviews coming in without chasing people",
    "You want a system that works while you are on a job",
  ],
  starterHelperHeading: "Starter makes sense if:",
  starterHelperItems: [
    "You just need to look legit online so people stop passing you up",
    "You want something simple that gets people to call",
  ],
  guidesHeading: "Free guides to help you win more local jobs",
  guidesDescription:
    "Short, useful guides on getting more calls, ranking higher, and building a business people trust.",
  faqHeading: "Questions Before You Start",
  footerDescription:
    "Book a free 15-minute call. We'll show you where you stand on Google, Maps, and AI search, and what we'd fix first.",
  footerTagline: "Show up when Houston searches for what you do.",
};

const houstonPageCopy = {
  analyticsTitle: "QuickLaunchWeb - Houston Web Design for Contractors",
  pageType: "local_landing",
  scrollPath: "/houston-web-design-for-contractors",
  bookingSource: "website_houston_web_design",
  heroIntro: null as string | null,
  heroPill: "HOUSTON WEB DESIGN FOR CONTRACTORS THAT GETS CALLS.",
  heroHeading: (
    <>
      Houston Web Design for Contractors{" "}
      <span className="text-[#0866FF]">
        <br className="hidden md:block" />
        That Gets You More Calls.
      </span>
    </>
  ),
  heroBullets: [
    "Built for Houston contractors and home service businesses",
    "Tap-to-call and fast quote forms help people reach you fast",
    "Starting at $99/mo. Cancel anytime.",
  ],
  features: [
    {
      title: "Easy to call",
      desc: "If people cannot call fast, they leave. We make calls and quote forms easy to find.",
      icon: "smartphone",
    },
    {
      title: "Fast on phones",
      desc: "Most people search on a phone. A slow site can cost you the job.",
      icon: "speed",
    },
    {
      title: "Made for Houston search",
      desc: "A good Houston contractor website shows what you do, where you work, and why people should trust you.",
      icon: "map-pin",
    },
  ],
  featureHeading: (
    <>
      Houston web design should <span className="text-[#0866FF]">get calls</span>.
      <br />It should not just <span className="text-[#0866FF]">look nice</span>.
    </>
  ),
  featureDescription:
    "We build websites for Houston contractors and home service businesses. The goal is simple: help more people call you.",
  bestFor: [
    "Houston contractors",
    "Home service businesses",
    "Owners who want a site fast",
  ],
  deliverables: [
    { label: "01", title: "Easy to use on every phone", icon: "smartphone", detail: "Tap-to-call ready" },
    { label: "02", title: "Quote requests go right to you", icon: "form", detail: "Quote form included" },
    { label: "03", title: "Built for Houston search", icon: "map-pin", detail: "Local SEO foundation" },
    { label: "04", title: "Loads fast", icon: "lightning", detail: "Speed + SSL included" },
    { label: "05", title: "Live in 48 hours", icon: "rocket", detail: "Launched in 48 hours" },
    { label: "06", title: "We keep it updated", icon: "wrench", detail: "Ongoing support" },
  ],
  deliverablesHeading: (
    <>
      In <span className="text-[#0866FF]">48 Hours</span>, People Can Start Calling
    </>
  ),
  deliverablesDescription:
    "You do not wait weeks. We build your Houston contractor website fast so people can call you.",
  steps: [
    { step: "01", title: "Pick a plan", desc: "Choose the plan that fits. We start the same day." },
    { step: "02", title: "Send your details", desc: "Send your services, photos, service area, and contact info." },
    { step: "03", title: "Go live fast", desc: "Your site goes live in 48 hours so people can call you." },
  ],
  stats: [
    { value: "FREE", label: "Build" },
    { value: "48h", label: "Launch" },
    { value: "Houston", label: "City" },
    { value: "Cancel", label: "Anytime" },
  ],
  pricingEyebrow:
    "A Houston contractor website should help you get jobs.",
  pricingHeading: "$0 down. Plans starting at $99/mo.",
  pricingDescription:
    "Most agencies ask for a big payment first. We build your site first — and make Google send you customers. Cancel anytime.",
  growthHelperHeading: "Go Growth if:",
  growthHelperItems: [
    "You want SEO, reviews automation, and blog content",
    "You offer more than one service",
    "You want a full 5-page site with lead tracking",
  ],
  starterHelperHeading: "Starter works if:",
  starterHelperItems: [
    "You need a simple site fast",
    "You want the lowest monthly cost",
  ],
  guidesHeading: "Simple Guides for More Local Jobs",
  guidesDescription:
    "Short guides that show what helps a Houston contractor website get more calls.",
  faqHeading: "Questions Houston Contractors Ask",
  footerDescription:
    "Houston web design for contractors and home service businesses. Built fast. No upfront cost.",
  footerTagline: "Your next Houston customer may be searching right now.",
};

// =============================================================================
// How It Works — step list + light product mockups (framer-motion only, so
// MotionConfig reducedMotion="user" in BrandShell applies)
// =============================================================================

const easeOut = [0.22, 1, 0.36, 1] as const;

function ProgressRing({
  isActive = false,
  isPast = false,
  duration = 5000,
  size = 56,
  strokeWidth = 2.5,
}: {
  isActive?: boolean;
  isPast?: boolean;
  duration?: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  return (
    <svg width={size} height={size} className="absolute inset-0 -rotate-90" aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#E5EDF6" strokeWidth={strokeWidth} />
      {(isActive || isPast) && (
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#0866FF"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={isPast ? 0 : circumference}
          strokeLinecap="round"
          className={isActive ? "animate-ringFill" : ""}
          style={
            isActive
              ? ({ "--ring-duration": `${duration}ms`, "--circumference": circumference } as React.CSSProperties)
              : undefined
          }
        />
      )}
    </svg>
  );
}

function Appear({ delay = 0, className, children }: { delay?: number; className?: string; children?: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CheckoutVisual() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-5">
      <Appear>
        <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[#46516B]">Choose Your Plan</p>
      </Appear>
      <div className="w-full max-w-[290px] space-y-2.5">
        <Appear delay={0.15} className="rounded-xl border border-[#E5EDF6] bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[#07143F]">Starter</p>
              <p className="text-xs text-[#46516B]">1-page site</p>
            </div>
            <p>
              <span className="text-xl font-extrabold text-[#07143F]">$99</span>
              <span className="text-xs text-[#46516B]">/mo</span>
            </p>
          </div>
        </Appear>
        <Appear delay={0.3}>
          <motion.div
            initial={{ borderColor: "#E5EDF6", boxShadow: "0 0 0 0 rgba(8,102,255,0)" }}
            animate={{ borderColor: "#0866FF", boxShadow: "0 12px 30px -12px rgba(8,102,255,0.45)" }}
            transition={{ duration: 0.4, delay: 0.9 }}
            className="relative rounded-xl border-2 bg-white p-4"
          >
            <div className="flex items-center justify-between pr-7">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-[#07143F]">Growth</p>
                  <span className="rounded-full bg-[#0866FF] px-1.5 py-0.5 text-[9px] font-bold text-white">POPULAR</span>
                </div>
                <p className="text-xs text-[#46516B]">5-page + SEO system</p>
              </div>
              <p>
                <span className="text-xl font-extrabold text-[#0866FF]">$199</span>
                <span className="text-xs text-[#46516B]">/mo</span>
              </p>
            </div>
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.1 }}
              className="absolute right-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-[#0866FF] text-white"
            >
              <CheckIcon className="h-3 w-3" />
            </motion.span>
          </motion.div>
        </Appear>
      </div>
      <div className="mt-4 w-full max-w-[290px] space-y-1.5">
        {["5-page website + SEO", "Reviews automation", "Cancel anytime"].map((item, i) => (
          <Appear key={item} delay={1.3 + i * 0.15} className="flex items-center gap-2 text-xs text-[#46516B]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0866FF]" />
            {item}
          </Appear>
        ))}
      </div>
      <Appear delay={1.9} className="mt-5 w-full max-w-[290px]">
        <div className="flex h-11 items-center justify-center gap-1.5 rounded-xl bg-[#0866FF] text-sm font-bold text-white shadow-[0_10px_25px_-10px_rgba(8,102,255,0.7)]">
          Continue to Checkout
          <KitIcon name="arrow-right" white className="h-4 w-4" />
        </div>
      </Appear>
      <Appear delay={2.3} className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#46516B]">
        <KitIcon name="lock" className="h-3.5 w-3.5" />
        Secured by Stripe
      </Appear>
    </div>
  );
}

function FormVisual() {
  const fields = [
    { label: "Business Name", value: "Mike's Plumbing" },
    { label: "Services", value: "Repairs, Installation, Emergency" },
    { label: "Phone", value: "(555) 123-4567" },
  ];
  return (
    <div className="flex h-full flex-col items-center justify-center p-5">
      <div className="w-full max-w-[290px]">
        <Appear className="mb-3 flex items-center justify-between">
          <span className="text-sm font-bold text-[#07143F]">Business Details</span>
          <span className="rounded-full bg-[#EFF8FF] px-2 py-0.5 text-xs font-medium text-[#0866FF]">Step 2 of 3</span>
        </Appear>
        <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-[#E5EDF6]">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "66%" }}
            transition={{ duration: 1.2, delay: 0.2, ease: easeOut }}
            className="h-full rounded-full bg-[#0866FF]"
          />
        </div>
        <div className="space-y-3">
          {fields.map((f, i) => (
            <Appear key={f.label} delay={0.4 + i * 0.35}>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#46516B]">{f.label}</p>
              <div className="flex h-9 items-center rounded-lg border border-[#E5EDF6] bg-white px-3 text-sm text-[#07143F]">
                {f.value}
              </div>
            </Appear>
          ))}
          <Appear delay={1.5}>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#46516B]">Photos</p>
            <div className="flex h-14 items-center justify-center gap-3 rounded-lg border border-emerald-300 bg-emerald-50 px-3">
              <div className="flex -space-x-2">
                {["from-sky-200 to-blue-300", "from-amber-100 to-orange-200", "from-slate-200 to-slate-300"].map((tint) => (
                  <span key={tint} className={`h-8 w-8 rounded-lg border-2 border-white bg-gradient-to-br ${tint}`} />
                ))}
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
                <CheckIcon className="h-3 w-3" />3 uploaded
              </span>
            </div>
          </Appear>
        </div>
        <Appear delay={1.9} className="mt-4">
          <div className="flex h-10 items-center justify-center gap-1.5 rounded-xl bg-[#0866FF] text-sm font-bold text-white">
            Submit Details
            <KitIcon name="arrow-right" white className="h-4 w-4" />
          </div>
        </Appear>
      </div>
    </div>
  );
}

function LaunchedVisual() {
  return (
    <div className="flex h-full flex-col p-4">
      <Appear className="flex-1 overflow-hidden rounded-t-lg border border-b-0 border-[#E5EDF6] bg-white shadow-sm">
        <div className="flex h-7 items-center gap-1.5 border-b border-[#E5EDF6] bg-[#F5F9FF] px-3">
          <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
          <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
          <span className="h-2 w-2 rounded-full bg-[#28C840]" />
          <span className="mx-2 flex h-3.5 max-w-[120px] flex-1 items-center justify-center rounded-full bg-emerald-50 font-mono text-[8px] text-emerald-700">
            yourbusiness.com
          </span>
        </div>
        <div className="space-y-2 p-3">
          <Appear delay={0.3} className="h-3 w-2/3 rounded bg-[#07143F]/15" />
          <Appear delay={0.5} className="h-14 rounded-lg bg-gradient-to-br from-[#EFF8FF] to-[#dbeafe]" />
          <div className="grid grid-cols-2 gap-1.5">
            <Appear delay={0.7} className="h-8 rounded bg-[#EFF8FF]" />
            <Appear delay={0.8} className="h-8 rounded bg-[#EFF8FF]" />
          </div>
          <Appear delay={0.95} className="h-6 w-1/2 rounded-full bg-[#0866FF]" />
          <Appear delay={1.05} className="space-y-1.5 pt-2">
            <div className="h-2 w-full rounded bg-[#07143F]/10" />
            <div className="h-2 w-5/6 rounded bg-[#07143F]/10" />
            <div className="h-2 w-2/3 rounded bg-[#07143F]/10" />
          </Appear>
        </div>
      </Appear>
      <Appear delay={1.3} className="-mt-6 rounded-xl border border-[#E5EDF6] bg-white p-3 shadow-[0_18px_40px_-18px_rgba(7,20,63,0.35)]">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <CheckIcon className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-[#07143F]">Website Launched</p>
            <p className="flex items-center gap-1.5 truncate font-mono text-[10px] text-[#46516B]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              yourbusiness.com
            </p>
          </div>
          <span className="rounded-full bg-emerald-500 px-1.5 py-0.5 text-[9px] font-bold text-white">LIVE</span>
        </div>
        <div className="mt-2.5 grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-[#EFF8FF] p-2 text-center">
            <p className="text-[8px] font-semibold uppercase tracking-wider text-[#46516B]">Speed</p>
            <p className="text-lg font-extrabold text-[#0866FF]">99</p>
          </div>
          <div className="rounded-lg bg-emerald-50 p-2 text-center">
            <p className="text-[8px] font-semibold uppercase tracking-wider text-[#46516B]">SEO</p>
            <p className="text-lg font-extrabold text-emerald-700">100</p>
          </div>
        </div>
      </Appear>
    </div>
  );
}

const stepIcons = ["target", "calendar", "rocket"];

// These client logos are white artwork (made for the old dark theme), so they sit on a navy chip.
const DARK_BG_LOGOS = new Set([
  "/logos/optimized/cuervo-homes.png",
  "/logos/optimized/jack-sold-by-toro.png",
  "/logos/optimized/tomi.png",
]);

function HowItWorksSection({ steps }: { steps: { step: string; title: string; desc: string }[] }) {
  const [activeStep, setActiveStep] = useState(0);
  const [animationKey, setAnimationKey] = useState(0); // remounts the visual to replay it
  const reduceMotion = useReducedMotion();
  const CYCLE_DURATION = 6000; // 6 seconds per step

  useEffect(() => {
    if (reduceMotion) return; // no auto-advance for reduced-motion users; steps stay clickable
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
      setAnimationKey((prev) => prev + 1);
    }, CYCLE_DURATION);
    return () => clearInterval(stepInterval);
  }, [reduceMotion, animationKey]);

  const visuals = [
    <CheckoutVisual key={`checkout-${animationKey}`} />,
    <FormVisual key={`form-${animationKey}`} />,
    <LaunchedVisual key={`launched-${animationKey}`} />,
  ];

  return (
    <section id="how-it-works" className={`scroll-mt-24 bg-[#EFF8FF] ${sectionPad}`}>
      <div className={`${container} grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16`}>
        <div>
          <Eyebrow>How It Works</Eyebrow>
          <h2 className={`mt-3 ${sectionH2}`}>
            3 steps. 48 hours.
            <br />
            <span className="text-[#0866FF]">Your phone starts ringing.</span>
          </h2>
          <ol className="mt-8 space-y-3">
            {steps.map((item, i) => {
              const isActive = i === activeStep;
              const isPast = i < activeStep;
              return (
                <li key={item.step}>
                  <button
                    type="button"
                    aria-current={isActive ? "step" : undefined}
                    onClick={() => {
                      setActiveStep(i);
                      setAnimationKey((prev) => prev + 1);
                    }}
                    className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all duration-300 sm:p-5 ${focusRing} ${
                      isActive
                        ? "border-[#E5EDF6] bg-white shadow-[0_8px_30px_-14px_rgba(7,20,63,0.2)]"
                        : "border-transparent hover:bg-white/60"
                    }`}
                  >
                    <span className="relative flex h-14 w-14 shrink-0 items-center justify-center">
                      <ProgressRing isActive={isActive} isPast={isPast} duration={CYCLE_DURATION} key={`ring-${i}-${animationKey}`} />
                      <IconCircle name={stepIcons[i] ?? "check"} className="!h-11 !w-11 !p-2.5" />
                    </span>
                    <span className="flex-1 pt-1">
                      <span className="block text-[17px] font-bold text-[#07143F]">
                        {item.step}. {item.title}
                      </span>
                      <span className="mt-1 block text-[15px] leading-[1.5] text-[#46516B]">{item.desc}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="rounded-xl border border-[#E5EDF6] bg-white p-3 shadow-[0_18px_50px_-24px_rgba(7,20,63,0.3)]">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-gradient-to-b from-[#F5F9FF] to-[#EFF8FF] sm:aspect-square" aria-hidden="true">
            {visuals[activeStep]}
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// Main Component
// =============================================================================

export default function WebServicePage() {
  const pathname = usePathname();
  const isHoustonLanding = pathname === "/houston-web-design-for-contractors";
  const pageCopy = isHoustonLanding ? houstonPageCopy : defaultPageCopy;

  // Analytics hooks
  usePageTracker(pageCopy.analyticsTitle, pageCopy.pageType);
  const { trackPlanSelected, trackAddonToggled, trackCheckoutInitiated } = useCheckoutTracker();
  const { track } = useEventTracker();
  const { trackFormStart: trackCustomFormStart, trackFormSubmit: trackCustomFormSubmit, trackFormError: trackCustomFormError } = useFormTracker('custom_quote', 'homepage_modal');

  const [loadingPlan, setLoadingPlan] = useState<Plan | null>(null);
  const [checkoutError, setCheckoutError] = useState("");

  // Upsell Modal State
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [addOns, setAddOns] = useState<AddOns>({
    billingCycle: "monthly",
    hasDomain: null,
    domainRouting: null,
    textAlerts: false,
    googleBoost: false,
    photoShoot: false,
    adCreative: false,
    brandPackage: false,
    adsCall: false,
  });
  const [upsellStep, setUpsellStep] = useState(1);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customForm, setCustomForm] = useState<CustomForm>(createEmptyCustomForm());
  const [customLoading, setCustomLoading] = useState(false);
  const [customError, setCustomError] = useState("");
  const [customSuccess, setCustomSuccess] = useState("");

  // FAQ search and filter state
  const [faqSearch, setFaqSearch] = useState("");
  const [faqCategory, setFaqCategory] = useState("all");

  const selectedPlanDetails = selectedPlan ? PLAN_DETAILS[selectedPlan] : null;

  // Plan picker modal state (shown before upsell for generic CTAs)
  const [showPlanPicker, setShowPlanPicker] = useState(false);

  // Mobile sticky CTA: BrandShell's own "Book a Free Call" button.

  // Open plan picker (for generic CTAs that don't specify a plan)
  const openPlanPicker = () => {
    track('cta_click', {
      cta_text: 'plan_picker_opened',
      cta_location: 'generic_cta',
      event_category: 'engagement',
    });
    track('checkout_modal_opened', {
      modal_name: 'plan_picker',
      funnel_stage: 'plan_selection',
      event_category: 'checkout',
    });
    setShowPlanPicker(true);
  };

  // Open upsell modal
  const openUpsellModal = (plan: Plan) => {
    trackPlanSelected(plan, 'homepage_pricing');
    track('checkout_modal_step_viewed', {
      plan,
      step_name: 'setup',
      step_number: 1,
      funnel_stage: 'checkout_setup',
      event_category: 'checkout',
    });
    setSelectedPlan(plan);
    setCheckoutError("");
    setUpsellStep(1);
    setAddOns({
      billingCycle: "monthly",
      hasDomain: null,
      domainRouting: null,
      textAlerts: false,
      googleBoost: false,
      photoShoot: false,
      adCreative: false,
      brandPackage: false,
      adsCall: false,
    });
    setShowUpsellModal(true);
  };

  const openCustomModal = () => {
    setCustomForm(createEmptyCustomForm());
    setCustomError("");
    setCustomSuccess("");
    setShowCustomModal(true);
  };

  // Calculate monthly total based on selections
  const calculateTotal = () => {
    let monthly = selectedPlanDetails ? selectedPlanDetails.monthlyPrice : 0;

    if (addOns.textAlerts) monthly += 29;

    let oneTime = 0;
    if (addOns.domainRouting === "us") oneTime += 99;
    if (addOns.googleBoost) oneTime += 199;
    if (addOns.photoShoot) oneTime += 299;
    if (addOns.adCreative) oneTime += 499;
    if (addOns.brandPackage) oneTime += 799;

    const isUpfront = addOns.billingCycle === "upfront";
    const upfrontTotal = isUpfront ? monthly * 3 : 0;
    const upfrontSavings = isUpfront ? monthly : 0;

    return { monthly, oneTime, isUpfront, upfrontTotal, upfrontSavings };
  };

  const getSelectedAddons = () => {
    const selectedAddons = [];
    if (addOns.billingCycle === 'upfront') selectedAddons.push('upfront_billing');
    if (addOns.textAlerts) selectedAddons.push('text_alerts');
    if (addOns.googleBoost) selectedAddons.push('google_boost');
    if (addOns.photoShoot) selectedAddons.push('photo_shoot');
    if (addOns.adCreative) selectedAddons.push('ad_creative');
    if (addOns.brandPackage) selectedAddons.push('brand_package');
    if (addOns.adsCall) selectedAddons.push('ads_call');
    if (addOns.domainRouting === 'us') selectedAddons.push('domain_routing');

    return selectedAddons;
  };

  // Proceed to Stripe checkout with add-ons
  const startCheckout = useCallback(async (plan: Plan) => {
    setLoadingPlan(plan);
    setCheckoutError("");

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const res = await fetch(`/api/stripe/checkout?plan=${plan}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addOns }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || `Server error (${res.status})`);
      }

      if (!data?.url || typeof data.url !== "string") {
        throw new Error("Invalid checkout response.");
      }

      window.location.href = data.url;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          setCheckoutError("Request timed out. Please try again.");
        } else {
          setCheckoutError(error.message);
        }
      } else {
        setCheckoutError("An unexpected error occurred. Please try again.");
      }
      console.error("Checkout error:", error);
    } finally {
      setLoadingPlan(null);
    }
  }, [addOns]);

  const handleUpsellContinue = useCallback(() => {
    setCheckoutError("");

    if (selectedPlan) {
      const { monthly, oneTime } = calculateTotal();
      const selectedAddons = getSelectedAddons();

      track('checkout_modal_step_completed', {
        plan: selectedPlan,
        step_name: 'summary',
        step_number: 3,
        funnel_stage: 'stripe_redirect',
        billing_cycle: addOns.billingCycle,
        total_value: monthly + oneTime,
        addons: selectedAddons,
        event_category: 'checkout',
      });
      trackCheckoutInitiated(selectedPlan, monthly + oneTime, selectedAddons);

      setShowUpsellModal(false);
      startCheckout(selectedPlan);
    }
  }, [addOns, selectedPlan, startCheckout, calculateTotal, trackCheckoutInitiated, track]);

  const submitCustomRequest = useCallback(async () => {
    setCustomError("");
    setCustomSuccess("");

    const name = customForm.name.trim();
    const email = customForm.email.trim().toLowerCase();

    if (!name) {
      const errorMsg = "Please enter your name.";
      setCustomError(errorMsg);
      trackCustomFormError(errorMsg);
      return;
    }

    if (!isValidEmail(email)) {
      const errorMsg = "Please enter a valid email address.";
      setCustomError(errorMsg);
      trackCustomFormError(errorMsg);
      return;
    }

    setCustomLoading(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      // Use web3forms to send email
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      if (!accessKey) {
        throw new Error("Web3Forms access key is not configured.");
      }

      const formData = new FormData();
      formData.append("access_key", accessKey);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", customForm.phone.trim());
      formData.append("company", customForm.company.trim());
      // Normalize website URL - add https:// if missing, but keep it optional
      const website = customForm.website.trim();
      formData.append("website", website ? normalizeWebsite(website) : "");
      formData.append("message", customForm.details.trim());
      formData.append("subject", "Custom Website Request - QuickLaunchWeb");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data?.message || `Server error (${res.status})`);
      }

      // Track successful form submission
      trackCustomFormSubmit();

      setCustomSuccess("Thanks! We'll reach out to book a call.");
      setCustomForm(createEmptyCustomForm());
    } catch (error) {
      let errorMsg = "An unexpected error occurred. Please try again.";
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          errorMsg = "Request timed out. Please try again.";
        } else {
          errorMsg = error.message || "Failed to send request. Please try again.";
        }
      }
      setCustomError(errorMsg);
      trackCustomFormError(errorMsg);
      console.error("Custom request error:", error);
    } finally {
      setCustomLoading(false);
    }
  }, [customForm, trackCustomFormSubmit, trackCustomFormError]);


  // ==========================================================================
  // Feature data
  // ==========================================================================
  const features = pageCopy.features;
  /*
    {
      title: "One Tap to Call You. Zero Friction.",
      desc: "Most people leave a site if they can't call or message you in 3 seconds. Your site has tap-to-call, quick quote forms, and no dead ends.",
      icon: featureIcons.mobile,
    },
    {
      title: "Loads Fast. Doesn't Lose You Money.",
      desc: "Slow sites lose customers. For every extra second it takes to load, you lose 7 out of 100 people. Your site loads in under 2 seconds.",
      icon: featureIcons.lightning,
    },
    {
      title: "Show Up First When Locals Search",
      desc: "When someone searches \"plumber near me\" or \"contractor in [your city]\" — you show up. Not your competitor who paid $3,000 for a worse site.",
      icon: featureIcons.search,
    },
  ];

  */

  const deliverables = pageCopy.deliverables;
  /*
    { label: "01", title: "Works on every phone (because that's where your customers are)", detail: "Tap-to-call ready" },
    { label: "02", title: "Customer messages go straight to your inbox", detail: "Quote form included" },
    { label: "03", title: "Google finds you before your competition", detail: "Local SEO foundation" },
    { label: "04", title: "Opens fast — no waiting, no spinning wheel", detail: "Speed + SSL included" },
    { label: "05", title: "Live and getting you customers while you sleep", detail: "Launched in 48 hours" },
    { label: "06", title: "We maintain it. You focus on doing the actual work.", detail: "Ongoing support" },
  ];

  */

  const cityDominatorFeatures = [
    "Everything in Growth Engine",
    "Full CRM — track every lead",
    "Missed call text-back — automatic",
    "Instant lead reply — they hear from you in seconds",
    "Auto follow-up at 24h + 72h",
    "After-hours auto-reply",
    "Auto review requests — hands-free",
    "2 new city pages / month",
    "2 blog posts / month",
    "12-month city growth plan",
    "Priority edits — 24h turnaround",
    "4 site updates / month",
  ];

  const steps = pageCopy.steps;
  /*
    { step: "01", title: "Pick a Plan (60 seconds)", desc: "No proposals. No \"discovery calls.\" Pick your plan, pay, we start building the same day." },
    { step: "02", title: "Send Us the Basics", desc: "Your services, area, photos, contact info. Takes 5 minutes. That's the last thing you do." },
    { step: "03", title: "We Launch. You Get Customers.", desc: "48 hours later your site is live and showing up on Google. We handle updates, speed, and search rankings — you just answer the phone." },
  ];

  */

  const stats = pageCopy.stats;
  /*
    { value: "FREE", label: "Website Build" },
    { value: "48h", label: "Launch Time" },
    { value: "$99", label: "/mo Hosting" },
    { value: "Unlimited", label: "Cancel Anytime" },
  ];

  */


  const scrollToId = (id: string) => (e: React.MouseEvent) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth" });
  };

  const subNav = [
    { id: "work", label: "Recent Work" },
    { id: "how-it-works", label: "How It Works" },
    { id: "features", label: "Features" },
    { id: "pricing", label: "Pricing" },
    { id: "faq", label: "FAQ" },
  ];

  const planCardClass =
    "relative flex flex-col rounded-xl border border-[#E5EDF6] bg-white p-6 shadow-[0_8px_30px_-14px_rgba(7,20,63,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(7,20,63,0.25)] sm:p-8";
  const buildWaivedPill =
    "rounded-full bg-[#EFF8FF] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#0866FF]";
  const pickerCardClass = `relative w-full rounded-xl border p-4 text-left transition-all duration-200 active:scale-[0.99] sm:p-5 ${focusRing}`;
  const backBtnClass = `rounded-xl border-2 border-[#E5EDF6] bg-white px-4 py-3 text-sm font-bold text-[#46516B] transition-colors hover:border-[#0866FF]/40 hover:text-[#07143F] sm:px-5 ${focusRing}`;
  const summaryLabel = "text-[11px] font-semibold uppercase tracking-[0.15em] text-[#46516B]";

  // ==========================================================================
  // Render
  // ==========================================================================
  return (
    <BrandShell pagePath={pageCopy.scrollPath}>
      <FAQSchema />

      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EFF8FF] to-[#f7fbff] pb-10 pt-[104px] sm:pt-28 lg:pb-14 lg:pt-32">
        <div className={`${container} relative grid items-center gap-10 md:grid-cols-[1.15fr_1fr] lg:grid-cols-[1.25fr_1fr] lg:gap-12`}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow className="!text-[#46516B]">{pageCopy.heroPill}</Eyebrow>

            <h1 className="mt-4 text-[36px] font-extrabold leading-[1.07] tracking-[-0.04em] sm:text-[46px] lg:text-[52px] xl:text-[56px]">
              {pageCopy.heroHeading}
            </h1>

            {pageCopy.heroIntro && (
              <p className="mt-5 max-w-[38rem] text-[17px] leading-[1.55] text-[#46516B] sm:text-[18px]">
                {pageCopy.heroIntro}
              </p>
            )}

            <ul className="mt-6 space-y-3">
              {pageCopy.heroBullets.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[16px] font-medium leading-[1.5] text-[#46516B] sm:text-[17px]">
                  <CheckDot className="mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <BookButton location="hero" className={`${primaryBtn} px-7 py-4 text-[16px]`}>
                Book a Free Call
                <KitIcon name="arrow-right" white className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </BookButton>
              <button
                type="button"
                onClick={() => {
                  track('cta_click', {
                    cta_text: 'Ready now? Pick a plan',
                    cta_location: 'hero',
                    event_category: 'engagement',
                    event_label: 'hero_plan_picker_cta',
                  });
                  openPlanPicker();
                }}
                className={`${outlineBtn} px-5 py-3 text-[15px]`}
              >
                Ready now? Pick a plan
              </button>
            </div>
            <p className="mt-5 text-[14px] text-[#46516B]">
              Free 15-minute call. No obligation.{" "}
              <a
                href="#work"
                onClick={(e) => {
                  track('cta_click', {
                    cta_text: 'See Recent Launches',
                    cta_location: 'hero',
                    destination_url: '#work',
                    event_category: 'engagement',
                    event_label: 'hero_secondary_cta',
                  });
                  scrollToId("work")(e);
                }}
                className={`rounded font-semibold text-[#0866FF] underline decoration-[#0866FF]/40 underline-offset-4 hover:decoration-[#0866FF] ${focusRing}`}
              >
                See recent launches
              </a>
            </p>
          </motion.div>

          {/* Hero art (expansion kit) + plans at a glance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-[600px]"
          >
            <Image
              src="/home/website-maps.png"
              alt=""
              width={1400}
              height={936}
              priority
              sizes="(min-width: 1024px) 560px, (min-width: 768px) 45vw, 100vw"
              className="h-auto w-full object-contain"
            />
            <div className="mx-auto -mt-2 max-w-[520px] rounded-xl border border-[#E5EDF6] bg-white p-4 shadow-[0_18px_40px_-24px_rgba(7,20,63,0.35)] sm:p-5">
              <p className="flex items-center gap-2 text-[14px] font-semibold">
                <KitIcon name="check-circle" className="h-5 w-5 shrink-0" />
                Free website included. No contracts.
              </p>
              <ul className="mt-3 grid grid-cols-3 gap-2 text-center">
                {(Object.keys(PLAN_DETAILS) as Plan[]).map((plan) => (
                  <li
                    key={plan}
                    className={`rounded-lg px-2 py-2.5 ${plan === "growth" ? "bg-[#0866FF] text-white" : "bg-[#EFF8FF]"}`}
                  >
                    <p className={`text-[11px] font-semibold uppercase tracking-wider ${plan === "growth" ? "text-white/85" : "text-[#46516B]"}`}>
                      {PLAN_DETAILS[plan].label}
                    </p>
                    <p className="text-[18px] font-extrabold leading-tight">
                      ${PLAN_DETAILS[plan].monthlyPrice}
                      <span className={`text-[12px] font-medium ${plan === "growth" ? "text-white/85" : "text-[#46516B]"}`}>/mo</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* In-page sub-nav */}
        <nav aria-label="On this page" className={`${container} relative mt-10 lg:mt-14`}>
          <ul className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
            {subNav.map((item) => (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  onClick={scrollToId(item.id)}
                  className={`inline-flex items-center rounded-full border border-[#E5EDF6] bg-white px-4 py-2 text-[14px] font-semibold text-[#46516B] shadow-sm transition-colors hover:border-[#0866FF] hover:bg-[#EFF8FF] hover:text-[#0866FF] ${focusRing}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {/* ===================== CLIENT LOGOS ===================== */}
      <section className="border-y border-[#E5EDF6] bg-[#EFF8FF] py-9 sm:py-10" aria-label="Businesses we've helped">
        <div className={container}>
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-[#46516B] sm:text-[12px]">
            Businesses We&apos;ve Helped
          </p>
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-12">
            {clientLogos.map((logo) => (
              <li
                key={logo.alt}
                className={`flex shrink-0 items-center justify-center ${
                  DARK_BG_LOGOS.has(logo.src)
                    ? "h-[52px] w-[96px] rounded-lg bg-[#07143F] px-3 py-1.5 md:h-[60px] md:w-[110px]"
                    : `${logo.h || "h-[40px] md:h-[48px]"} ${logo.w}`
                }`}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  sizes="(min-width: 768px) 200px, 160px"
                  unoptimized={logo.unoptimized}
                  className="h-auto max-h-full w-auto max-w-full object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===================== RECENT WORK / TESTIMONIALS (#work) ===================== */}
      <SocialProofSection />

      {/* ===================== HOW IT WORKS ===================== */}
      <HowItWorksSection steps={steps} />

      {/* ===================== FEATURES ===================== */}
      <section id="features" className={`scroll-mt-24 bg-white ${sectionPad}`}>
        <div className={container}>
          <Reveal className="text-center">
            <Eyebrow>Features</Eyebrow>
            <h2 className={`mx-auto mt-3 max-w-4xl text-balance ${sectionH2}`}>{pageCopy.featureHeading}</h2>
            <p className="mx-auto mt-4 max-w-3xl text-balance text-[16px] leading-[1.55] text-[#46516B] sm:text-[18px]">
              {pageCopy.featureDescription}
            </p>
          </Reveal>

          <Reveal className="mx-auto mt-8 max-w-xl rounded-xl border border-[#E5EDF6] bg-[#F7FBFF] p-5 sm:p-6">
            <p className="text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0866FF]">Best for</p>
            <ul className="mt-4 space-y-2.5">
              {pageCopy.bestFor.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] font-medium leading-[1.5] text-[#07143F]">
                  <CheckDot className="mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map((feature, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#E5EDF6] bg-white shadow-[0_4px_20px_-10px_rgba(7,20,63,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(7,20,63,0.25)]">
                  <div className="relative h-48 overflow-hidden border-b border-[#E5EDF6] bg-[#F5F9FF] sm:h-56" aria-hidden="true">
                    {i === 0 && <SearchVisual />}
                    {i === 1 && <LeadVisual />}
                    {i === 2 && <ReviewVisual />}
                  </div>
                  <div className="flex flex-1 gap-4 p-6 sm:p-7">
                    <BrandIconTile name={feature.icon} />
                    <div>
                      <h3 className="text-[18px] font-bold leading-[1.25]">{feature.title}</h3>
                      <p className="mt-2 text-[15px] leading-[1.6] text-[#46516B]">{feature.desc}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== DELIVERABLES (48 hours) ===================== */}
      <section id="deliverables" className={`scroll-mt-24 bg-[#EFF8FF] ${sectionPad}`}>
        <div className={container}>
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Eyebrow>What Happens When You Start</Eyebrow>
              <h2 className={`mt-3 ${sectionH2}`}>{pageCopy.deliverablesHeading}</h2>
              <p className="mt-4 text-[16px] leading-[1.55] text-[#46516B] sm:text-[18px]">{pageCopy.deliverablesDescription}</p>
              <p className="mt-2 text-[13px] text-[#46516B]/80">Delivery starts after your details are submitted.</p>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-[#E5EDF6] bg-white px-5 py-4 shadow-[0_4px_20px_-10px_rgba(7,20,63,0.12)] md:text-right">
              <IconCircle name="calendar" className="!h-12 !w-12 !p-3 md:order-2" />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#46516B]">delivery window</p>
                <p className="mt-1 text-[28px] font-extrabold tracking-[-0.02em] text-[#0866FF]">24-48h</p>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((item, i) => (
              <Reveal key={item.label} delay={(i % 3) * 0.05}>
                <div className="flex h-full gap-4 rounded-xl border border-[#E5EDF6] bg-white p-5 shadow-[0_4px_20px_-10px_rgba(7,20,63,0.12)] sm:p-6">
                  <BrandIconTile name={item.icon} />
                  <div className="min-w-0">
                    <p className="text-[12px] font-bold tracking-[0.15em] text-[#0866FF]">{item.label}</p>
                    <h3 className="mt-1 text-balance text-[17px] font-bold leading-[1.3]">{item.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-[1.5] text-[#46516B]">{item.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PRICING ===================== */}
      <section id="pricing" className={`scroll-mt-24 bg-white ${sectionPad}`}>
        <div className={container}>
          <Reveal className="text-center">
            <Eyebrow>{pageCopy.pricingEyebrow}</Eyebrow>
            <h2 className={`mt-3 ${sectionH2}`}>{pageCopy.pricingHeading}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-[1.55] text-[#46516B] sm:text-[18px]">
              {pageCopy.pricingDescription}
            </p>
          </Reveal>

          {/* Value stack */}
          <Reveal className="mx-auto mt-10 max-w-2xl rounded-xl border border-[#E5EDF6] bg-[#F7FBFF] p-5 sm:p-8">
            <p className="mb-5 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#46516B]">
              What this system would cost you piece by piece
            </p>
            <ul className="space-y-2.5">
              {[
                { item: 'Professional website build', value: '$3,000-5,000' },
                { item: 'SEO + AI search setup', value: '$2,500' },
                { item: 'Google Business Profile setup', value: '$500' },
                { item: 'Google review auto-replies', value: '$100/mo' },
                { item: 'Review request system', value: '$100/mo' },
                { item: 'CRM + lead tracking', value: '$200/mo' },
                { item: 'Missed call text-back', value: '$75/mo' },
                { item: 'Auto lead follow-ups', value: '$75/mo' },
                { item: 'Monthly blog content', value: '$200/mo' },
                { item: 'Hosting + support + updates', value: '$300/mo' },
              ].map((row, i) => (
                <li key={i} className="flex items-center justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-2.5">
                    <CheckDot />
                    <span className="text-[14px] text-[#07143F] sm:text-[15px]">{row.item}</span>
                  </span>
                  <span className="hidden h-px min-w-[20px] flex-1 border-t border-dashed border-[#C9D6E8] sm:block" />
                  <span className="shrink-0 whitespace-nowrap text-[14px] font-medium text-[#46516B] line-through">{row.value}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center justify-between border-t border-[#E5EDF6] pt-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#46516B]">Total value</span>
              <span className="text-lg font-bold text-[#46516B] line-through">$18,000+/yr</span>
            </div>
          </Reveal>

          {/* Plan cards */}
          <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {/* Starter */}
            <div className={planCardClass}>
              <div className="mb-6">
                <p className="text-[12px] font-semibold uppercase tracking-wider text-[#46516B]">Stop losing jobs to how you look</p>
                <h3 className="mt-1 text-[22px] font-extrabold">Starter</h3>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-xl text-[#46516B]/70 line-through">$799</span>
                  <span className={buildWaivedPill}>BUILD WAIVED</span>
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-[44px] font-extrabold leading-none tracking-[-0.03em] md:text-5xl">$99</span>
                  <span className="text-[#46516B]">/mo</span>
                </div>
                <p className="mt-3 text-[14px] leading-[1.5] text-[#46516B]">
                  Free custom website + the system that gets you calls — without paying for ads.
                </p>
              </div>
              <ul className="mb-8 flex-1 space-y-2.5">
                {[
                  "Free custom-built website",
                  "Looks great on phones",
                  "Hosting, speed, security — handled",
                  "Contact form → leads to your email",
                  "Listed on Google",
                  "Fast load times — no waiting",
                  "SSL secure — that little lock icon",
                  "Built to make people call you",
                  "1 update / month",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px] leading-[1.5] text-[#46516B]">
                    <CheckDot />
                    {item}
                  </li>
                ))}
              </ul>
              <BookButton location="pricing_starter" className={`${outlineBtn} w-full px-6 py-3.5 text-[16px]`}>
                Book a Call
              </BookButton>
              <button
                type="button"
                onClick={() => openUpsellModal("starter")}
                disabled={loadingPlan === "starter"}
                className={`${startNowLink} mx-auto mt-3`}
              >
                {loadingPlan === "starter" ? "Starting…" : <>or start now<span className="sr-only"> with the Starter plan</span></>}
              </button>
            </div>

            {/* Growth Engine — featured */}
            <div className={`${planCardClass} border-2 !border-[#0866FF] shadow-[0_24px_60px_-28px_rgba(8,102,255,0.55)] md:col-span-2 md:mx-auto md:w-full md:max-w-md lg:col-span-1 lg:max-w-none lg:-translate-y-2 lg:hover:-translate-y-3`}>
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#0866FF] px-4 py-1 text-[12px] font-bold uppercase tracking-wider text-white shadow-[0_8px_20px_-8px_rgba(8,102,255,0.8)]">
                Most Popular
              </span>
              <div className="mb-6">
                <p className="text-[12px] font-semibold uppercase tracking-wider text-[#46516B]">Get found first. Get the call.</p>
                <h3 className="mt-1 text-[22px] font-extrabold">Growth Engine</h3>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-xl text-[#46516B]/70 line-through">$1,999</span>
                  <span className={buildWaivedPill}>BUILD WAIVED</span>
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-[44px] font-extrabold leading-none tracking-[-0.03em] text-[#0866FF] md:text-5xl">$199</span>
                  <span className="text-[#46516B]">/mo</span>
                </div>
                <p className="mt-3 text-[14px] leading-[1.5] text-[#46516B]">
                  People search your service, find you first, and call you — not your competitor.
                </p>
              </div>
              <ul className="mb-8 flex-1 space-y-2.5">
                {[
                  "Everything in Starter",
                  "A page for every service you offer",
                  "SEO — rank when people search your city",
                  "AI search ready — ChatGPT, Siri, Google AI",
                  "Google Business Profile — fully set up",
                  "Auto-reply to every Google review",
                  "Review request link after every job",
                  "1 blog post + monthly report",
                  "2 updates / month",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px] leading-[1.5] text-[#46516B]">
                    <CheckDot />
                    {item}
                  </li>
                ))}
              </ul>
              <BookButton location="pricing_growth" className={`${primaryBtn} w-full px-6 py-3.5 text-[16px]`}>
                Book a Call
                <KitIcon name="arrow-right" white className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </BookButton>
              <button
                type="button"
                onClick={() => openUpsellModal("growth")}
                disabled={loadingPlan === "growth"}
                className={`${startNowLink} mx-auto mt-3`}
              >
                {loadingPlan === "growth" ? "Starting…" : <>or start now<span className="sr-only"> with the Growth Engine plan</span></>}
              </button>
            </div>

            {/* City Dominator */}
            <div className={planCardClass}>
              <div className="mb-6">
                <p className="text-[12px] font-semibold uppercase tracking-wider text-[#46516B]">Every lead caught. Every city.</p>
                <h3 className="mt-1 text-[22px] font-extrabold">City Dominator</h3>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-xl text-[#46516B]/70 line-through">$3,999</span>
                  <span className={buildWaivedPill}>BUILD WAIVED</span>
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-[44px] font-extrabold leading-none tracking-[-0.03em] md:text-5xl">$399</span>
                  <span className="text-[#46516B]">/mo</span>
                </div>
                <p className="mt-3 text-[14px] leading-[1.5] text-[#46516B]">
                  Every lead caught, followed up, and tracked. You just do the work.
                </p>
              </div>
              <ul className="mb-8 flex-1 space-y-2.5">
                {[
                  "Everything in Growth Engine",
                  "Full CRM — track every lead",
                  "Missed call text-back — automatic",
                  "Instant lead reply + auto follow-ups",
                  "After-hours auto-reply",
                  "Auto review requests — hands-free",
                  "2 new city pages + 2 blog posts / month",
                  "12-month city growth plan",
                  "Priority edits + 4 updates / month",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px] leading-[1.5] text-[#46516B]">
                    <CheckDot />
                    {item}
                  </li>
                ))}
              </ul>
              <BookButton location="pricing_city_dominator" className={`${outlineBtn} w-full px-6 py-3.5 text-[16px]`}>
                Book a Call
              </BookButton>
              <button
                type="button"
                onClick={() => {
                  track('cta_click', {
                    cta_text: 'Choose City Dominator',
                    cta_location: 'pricing_dominator',
                    event_category: 'engagement',
                    event_label: 'dominator_checkout',
                  });
                  openUpsellModal("city_dominator");
                }}
                disabled={loadingPlan === "city_dominator"}
                className={`${startNowLink} mx-auto mt-3`}
              >
                {loadingPlan === "city_dominator" ? "Starting…" : <>or start now<span className="sr-only"> with the City Dominator plan</span></>}
              </button>
            </div>
          </div>

          {checkoutError && !showUpsellModal && (
            <p role="alert" className="mx-auto mt-6 max-w-xl rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
              {checkoutError}
            </p>
          )}

          {/* ROI + guarantee + call */}
          <div className="mx-auto mt-12 max-w-3xl space-y-6 text-center">
            <p className="text-[17px] font-bold leading-snug sm:text-[19px]">
              One good job pays for this. <span className="text-[#0866FF]">The real cost</span> is every call you are losing right now.
            </p>
            <ul className="flex flex-col items-center justify-center gap-3 text-[15px] text-[#46516B] sm:flex-row sm:gap-6">
              {["48h launch or first month free", "No contracts", "Cancel anytime"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckDot />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col items-center gap-3 pt-2">
              <p className="text-[14px] text-[#46516B]">Want help picking the right plan?</p>
              <BookButton location="pricing_bottom" className={`${outlineBtn} px-6 py-3 text-[15px]`}>
                Book a Quick Call
                <KitIcon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </BookButton>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== BOOK A CALL (id="book", target of useBooking) ===================== */}
      <DiscoveryCallSection
        theme="light"
        source={pageCopy.bookingSource}
        eyebrow="BOOK YOUR FREE CALL"
        heading={
          <>
            See how you show up on <span className="text-[#0866FF]">Google, Maps, and AI search</span>.
          </>
        }
        subheading="A few quick questions, then pick a time. On the call we look at where you stand today and which plan fits. No obligation."
      />

      {/* ===================== FAQ ===================== */}
      <section id="faq" className={`scroll-mt-24 bg-[#EFF8FF] ${sectionPad}`}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal className="text-center">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className={`mt-3 ${sectionH2}`}>{pageCopy.faqHeading}</h2>
          </Reveal>

          {/* Search */}
          <div className="sticky top-[84px] z-20 mt-8 lg:top-24">
            <label className="flex items-center gap-3 rounded-xl border border-[#E5EDF6] bg-white px-4 py-3 shadow-[0_8px_24px_-14px_rgba(7,20,63,0.25)] focus-within:border-[#0866FF] focus-within:ring-4 focus-within:ring-[#0866FF]/15">
              <KitIcon name="search" className="h-5 w-5 shrink-0" />
              <span className="sr-only">Search questions</span>
              <input
                type="search"
                placeholder="Search questions..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="min-w-0 flex-1 border-none bg-transparent text-[15px] text-[#07143F] outline-none placeholder:text-[#46516B]/70 [&::-webkit-search-cancel-button]:hidden"
              />
              {faqSearch && (
                <button
                  type="button"
                  onClick={() => setFaqSearch("")}
                  className={`rounded-md p-1 text-[#46516B] transition-colors hover:text-[#07143F] ${focusRing}`}
                  aria-label="Clear search"
                >
                  <KitIcon name="close" className="h-4 w-4" />
                </button>
              )}
            </label>
          </div>

          {/* Category filters */}
          <div className="mt-5 w-full overflow-hidden">
            <div className="scrollbar-hide flex w-full max-w-full gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter questions by category">
              {faqCategories.map((cat) => {
                const active = faqCategory === cat.id;
                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setFaqCategory(cat.id)}
                    aria-pressed={active}
                    className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[14px] font-semibold transition-colors ${focusRing} ${
                      active
                        ? "border-[#0866FF] bg-[#0866FF] text-white"
                        : "border-[#E5EDF6] bg-white text-[#46516B] hover:border-[#0866FF]/50 hover:text-[#0866FF]"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filtered FAQ list */}
          <div className="mt-5">
            {(() => {
              const filteredFaqs = faqs.filter((item) => {
                const matchesCategory = faqCategory === "all" || item.category === faqCategory;
                const matchesSearch =
                  !faqSearch ||
                  item.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
                  item.a.toLowerCase().includes(faqSearch.toLowerCase());
                return matchesCategory && matchesSearch;
              });

              if (filteredFaqs.length === 0) {
                return (
                  <div className="rounded-xl border border-[#E5EDF6] bg-white p-8 text-center">
                    <p className="text-[#46516B]">No questions found. Try adjusting your search or category filter.</p>
                  </div>
                );
              }

              return (
                <div className="space-y-3">
                  {filteredFaqs.map((item, i) => (
                    <details
                      key={i}
                      className="group rounded-xl border border-[#E5EDF6] bg-white transition-all open:shadow-[0_10px_30px_-14px_rgba(7,20,63,0.2)]"
                      onToggle={(e) => {
                        const details = e.target as HTMLDetailsElement;
                        if (details.open) {
                          track('faq_expanded', {
                            question: item.q,
                            question_index: i,
                            action: 'expanded',
                            event_category: 'engagement',
                            event_label: item.q.substring(0, 50),
                          });
                        }
                      }}
                    >
                      <summary
                        className={`flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl p-5 text-left text-[16px] font-semibold sm:p-6 sm:text-[17px] ${focusRing}`}
                      >
                        {item.q}
                        <KitIcon name="chevron-down" className="h-5 w-5 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                      </summary>
                      <div className="whitespace-pre-line px-5 pb-6 text-[15px] leading-[1.6] text-[#46516B] sm:px-6 sm:text-base">
                        {item.a}
                      </div>
                    </details>
                  ))}
                </div>
              );
            })()}
          </div>

          {/* Existing customers: Stripe portal (moved from the old page footer) */}
          <div className="mt-10 flex flex-col items-center gap-4 rounded-xl border border-[#E5EDF6] bg-white p-5 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="text-[15px] font-bold">Account</p>
              <p className="mt-0.5 text-[14px] text-[#46516B]">
                Manage billing and subscriptions through Stripe. Use the email from your checkout.
              </p>
            </div>
            <a
              href="https://billing.stripe.com/p/login/4gMbJ1dxi6CffXsg6R4c800"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open the Stripe customer portal"
              className={`${outlineBtn} shrink-0 px-5 py-2.5 text-[14px]`}
            >
              Open Customer Portal
            </a>
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA (book a call; self-serve secondary) ===================== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0753CF] via-[#0866FF] to-[#2b7bff]">
        <Image
          src="/home/footer.png"
          alt=""
          width={1400}
          height={597}
          sizes="420px"
          className="pointer-events-none absolute bottom-0 right-0 hidden h-auto w-[340px] md:block lg:w-[420px]"
        />
        <div className={`${container} relative flex flex-col items-center gap-7 py-12 text-center sm:py-14 lg:flex-row lg:justify-between lg:text-left`}>
          <div className="max-w-xl">
            <h2 className="text-[26px] font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-[32px]">{pageCopy.footerTagline}</h2>
            <p className="mt-2 text-[17px] text-white/85">{pageCopy.footerDescription}</p>
          </div>
          <div className="flex shrink-0 flex-col items-center gap-3 lg:mr-[280px]">
            <BookButton
              location="final_cta"
              className="group inline-flex items-center gap-2.5 whitespace-nowrap rounded-xl bg-white px-8 py-4 text-[16px] font-bold text-[#0866FF] shadow-xl shadow-[#07143F]/25 transition-all hover:bg-[#EFF8FF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 active:scale-[0.98]"
            >
              Book a Free Call
              <KitIcon name="arrow-right" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </BookButton>
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-[13px] text-white/85">
              {["No obligation", "No contracts", "Cancel anytime"].map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <KitIcon name="check" white className="h-3.5 w-3.5" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                track('cta_click', {
                  cta_text: 'Ready now? Pick a plan',
                  cta_location: 'final_cta',
                  event_category: 'engagement',
                  event_label: 'final_cta',
                });
                openPlanPicker();
              }}
              className="rounded-lg px-2 py-1 text-[14px] font-semibold text-white underline decoration-white/50 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
            >
              Ready now? Pick a plan and start today
            </button>
          </div>
        </div>
      </section>

      {/* ===================== PLAN PICKER MODAL ===================== */}
      <Dialog
        open={showPlanPicker}
        onOpenChange={(open) => {
          if (!open) {
            track('checkout_modal_closed', {
              modal_name: 'plan_picker',
              funnel_stage: 'plan_selection',
              event_category: 'checkout',
            });
          }
          setShowPlanPicker(open);
        }}
      >
        <DialogContent label="Pick your plan" className="max-w-md sm:max-w-lg">
          <DialogCloseButton />
          <div className="px-5 pb-5 pt-6 sm:px-6 sm:pb-6">
            <div className="mb-6 pr-8 text-center sm:pr-0">
              <h3 className="text-[22px] font-extrabold tracking-[-0.02em]">Pick your plan</h3>
              <p className="mt-1.5 text-[14px] text-[#46516B]">Choose the one that fits where you are right now. You can upgrade anytime.</p>
            </div>

            <div className="space-y-4">
              {/* Starter */}
              <button
                type="button"
                onClick={() => {
                  setShowPlanPicker(false);
                  openUpsellModal("starter");
                }}
                className={`${pickerCardClass} border-[#E5EDF6] bg-white hover:border-[#0866FF]/50 hover:bg-[#F7FBFF]`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-bold">Starter</p>
                    <p className="mt-1 text-[13px] text-[#46516B]">Look professional. Start getting calls.</p>
                  </div>
                  <p className="shrink-0 text-right text-lg font-extrabold">$99<span className="text-sm font-medium text-[#46516B]">/mo</span></p>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {[
                    "Custom website that makes people call you",
                    "Shows up on Google searches",
                    "Hosting, speed, and security handled",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] text-[#46516B]">
                      <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0866FF]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </button>

              {/* Growth Engine — highlighted */}
              <button
                type="button"
                onClick={() => {
                  setShowPlanPicker(false);
                  openUpsellModal("growth");
                }}
                className={`${pickerCardClass} border-2 border-[#0866FF] bg-[#EFF8FF] hover:bg-[#E3F1FF]`}
              >
                <span className="absolute -top-3 left-4 rounded-full bg-[#0866FF] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Most Popular
                </span>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-bold">Growth Engine</p>
                    <p className="mt-1 text-[13px] text-[#46516B]">Get found first on Google. Get the call.</p>
                  </div>
                  <p className="shrink-0 text-right text-lg font-extrabold text-[#0866FF]">$199<span className="text-sm font-medium text-[#46516B]">/mo</span></p>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {[
                    "Rank when people search your service + city",
                    "Google Business Profile fully built out",
                    "Reviews come in on autopilot after every job",
                    "Show up in AI search — ChatGPT, Siri, Google AI",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] text-[#46516B]">
                      <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0866FF]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </button>

              {/* City Dominator */}
              <button
                type="button"
                onClick={() => {
                  setShowPlanPicker(false);
                  openUpsellModal("city_dominator");
                }}
                className={`${pickerCardClass} border-[#E5EDF6] bg-white hover:border-[#0866FF]/50 hover:bg-[#F7FBFF]`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-bold">City Dominator</p>
                    <p className="mt-1 text-[13px] text-[#46516B]">Every lead caught. Every city covered.</p>
                  </div>
                  <p className="shrink-0 text-right text-lg font-extrabold">$399<span className="text-sm font-medium text-[#46516B]">/mo</span></p>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {[
                    "Missed calls get texted back automatically",
                    "Every lead tracked and followed up for you",
                    "New city pages every month to expand your reach",
                    "Full CRM — know exactly where every job comes from",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] text-[#46516B]">
                      <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0866FF]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </button>
            </div>

            <p className="mt-5 text-center text-[13px] text-[#46516B]">
              All plans include a free custom website. No contracts.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* ===================== UPSELL MODAL — QUIZ FLOW ===================== */}
      <Dialog
        open={showUpsellModal}
        onOpenChange={(open) => {
          if (!open) {
            track('checkout_modal_closed', {
              modal_name: 'upsell_checkout',
              plan: selectedPlan || 'unknown',
              step_number: upsellStep,
              funnel_stage: upsellStep === 1 ? 'checkout_setup' : upsellStep === 2 ? 'addon_selection' : 'checkout_summary',
              event_category: 'checkout',
            });
          }
          setShowUpsellModal(open);
        }}
      >
        <DialogContent label={`${selectedPlanDetails?.label ?? "Plan"} checkout`} className="max-w-lg">
          <DialogCloseButton />

          {/* Step label header */}
          <div className="px-5 pb-0 pt-6 sm:px-6">
            <ol className="flex items-center gap-2 pr-10 text-[12px] font-semibold text-[#46516B]" aria-label="Checkout steps">
              {["Setup", "Extras", "Checkout"].map((label, i) => (
                <li key={label} className="flex items-center gap-2" aria-current={upsellStep === i + 1 ? "step" : undefined}>
                  {i > 0 && <span className="h-px w-4 bg-[#C9D6E8]" aria-hidden="true" />}
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${
                      upsellStep >= i + 1 ? "bg-[#0866FF] text-white" : "bg-[#E5EDF6] text-[#46516B]"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className={upsellStep >= i + 1 ? "text-[#0866FF]" : ""}>{label}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
            {/* Step 1: Domain */}
            {upsellStep === 1 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-[19px] font-bold">Do you have a website address?</h3>
                  <p className="mt-1 text-[14px] text-[#46516B]">Like <span className="font-semibold text-[#07143F]">yourbusiness.com</span></p>
                </div>

                <div className="flex gap-3">
                  {[
                    { value: true, label: "Yes, I have one" },
                    { value: false, label: "Not yet" },
                  ].map((opt) => (
                    <button
                      type="button"
                      key={opt.label}
                      aria-pressed={addOns.hasDomain === opt.value}
                      onClick={() => {
                        track('checkout_domain_answered', {
                          plan: selectedPlan || 'unknown',
                          has_domain: opt.value,
                          funnel_stage: 'checkout_setup',
                          event_category: 'checkout',
                        });
                        setAddOns({ ...addOns, hasDomain: opt.value, domainRouting: null });
                      }}
                      className={`flex-1 rounded-xl border py-3.5 text-sm font-bold transition-all duration-200 ${focusRing} ${
                        addOns.hasDomain === opt.value
                          ? "border-[#0866FF] bg-[#EFF8FF] text-[#0866FF] shadow-[0_0_0_1px_#0866FF]"
                          : "border-[#E5EDF6] bg-white text-[#46516B] hover:border-[#0866FF]/50 hover:text-[#07143F]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {addOns.hasDomain === true && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Want us to set it up for you?</p>
                    <OptionCard
                      selected={addOns.domainRouting === "us"}
                      onClick={() => {
                        track('checkout_domain_routing_selected', {
                          plan: selectedPlan || 'unknown',
                          domain_routing: 'us',
                          funnel_stage: 'checkout_setup',
                          event_category: 'checkout',
                        });
                        setAddOns({ ...addOns, domainRouting: "us" });
                      }}
                      label="Yes, do it for me"
                      description="We handle everything so you don't have to."
                      price="$99 (just once)"
                    />
                    <OptionCard
                      selected={addOns.domainRouting === "self"}
                      onClick={() => {
                        track('checkout_domain_routing_selected', {
                          plan: selectedPlan || 'unknown',
                          domain_routing: 'self',
                          funnel_stage: 'checkout_setup',
                          event_category: 'checkout',
                        });
                        setAddOns({ ...addOns, domainRouting: "self" });
                      }}
                      label="I can do it myself"
                      description="We'll send you easy step-by-step instructions."
                      price="Free"
                      priceTone="green"
                    />
                  </div>
                )}

                {addOns.hasDomain === false && (
                  <p className="rounded-lg bg-[#EFF8FF] px-4 py-3 text-sm text-[#0753CF]">
                    No worries — we&apos;ll send you a quick guide to get one. It only takes a couple minutes.
                  </p>
                )}

                {checkoutError && (
                  <p role="alert" className="text-sm font-medium text-red-600">{checkoutError}</p>
                )}

                <BrandButton
                  className="w-full"
                  onClick={() => {
                    setCheckoutError("");
                    if (addOns.hasDomain === null) {
                      setCheckoutError("Pick one to continue.");
                      return;
                    }
                    if (addOns.hasDomain && addOns.domainRouting === null) {
                      setCheckoutError("Let us know who sets up your domain.");
                      return;
                    }
                    track('checkout_modal_step_completed', {
                      plan: selectedPlan || 'unknown',
                      step_name: 'setup',
                      step_number: 1,
                      has_domain: addOns.hasDomain,
                      domain_routing: addOns.domainRouting || 'none',
                      funnel_stage: 'checkout_setup',
                      event_category: 'checkout',
                    });
                    track('checkout_modal_step_viewed', {
                      plan: selectedPlan || 'unknown',
                      step_name: 'extras',
                      step_number: 2,
                      funnel_stage: 'addon_selection',
                      event_category: 'checkout',
                    });
                    setUpsellStep(2);
                  }}
                >
                  Continue
                </BrandButton>
              </div>
            )}

            {/* Step 2: Add-ons */}
            {upsellStep === 2 && (
              <div>
                {/* Your price */}
                <div className="rounded-xl bg-[#EFF8FF] px-4 py-5 text-center">
                  <p className={`mb-1 ${summaryLabel}`}>Your price</p>
                  <p className="text-[32px] font-extrabold leading-none tracking-[-0.02em]">
                    ${selectedPlanDetails ? selectedPlanDetails.monthlyPrice : 0}
                    <span className="text-base font-medium text-[#46516B]">/mo</span>
                  </p>
                  <p className="mt-2 text-sm text-[#46516B]">{selectedPlanDetails?.label} plan — website included free</p>
                </div>

                <div className="mt-5 space-y-4 border-t border-dashed border-[#C9D6E8] pt-5">
                  <div>
                    <p className={summaryLabel}>Optional extras</p>
                    <p className="mt-0.5 text-[13px] text-[#46516B]">You don&apos;t need any of these. Your price above stays the same.</p>
                  </div>

                  <div className="space-y-2">
                    {/* Starter add-ons */}
                    {selectedPlan === "starter" && (
                      <>
                        <OptionCard
                          selected={addOns.textAlerts}
                          onClick={() => {
                            const newValue = !addOns.textAlerts;
                            trackAddonToggled('Instant Lead Texts', 29, newValue ? 'added' : 'removed', 'starter');
                            setAddOns({ ...addOns, textAlerts: newValue });
                          }}
                          label="Instant Lead Texts"
                          description="When someone reaches out, they get a text back right away and you get notified."
                          price="+ $29/mo"
                        />
                        <OptionCard
                          selected={addOns.googleBoost}
                          onClick={() => {
                            const newValue = !addOns.googleBoost;
                            trackAddonToggled('Google Business Setup', 199, newValue ? 'added' : 'removed', 'starter');
                            setAddOns({ ...addOns, googleBoost: newValue });
                          }}
                          label="Google Business Setup"
                          description="We build out your full Google Business Profile so you show up on Google Maps."
                          price="$199 (just once)"
                        />
                        <OptionCard
                          selected={addOns.photoShoot}
                          onClick={() => {
                            const newValue = !addOns.photoShoot;
                            trackAddonToggled('Professional Photo Shoot', 299, newValue ? 'added' : 'removed', 'starter');
                            setAddOns({ ...addOns, photoShoot: newValue });
                          }}
                          label="Professional Photo Shoot"
                          description="We send a photographer to your job site. Pro photos for your website and Google profile."
                          price="$299 (just once)"
                        />
                      </>
                    )}

                    {/* Growth add-ons */}
                    {selectedPlan === "growth" && (
                      <>
                        <OptionCard
                          selected={addOns.photoShoot}
                          onClick={() => {
                            const newValue = !addOns.photoShoot;
                            trackAddonToggled('Professional Photo Shoot', 299, newValue ? 'added' : 'removed', 'growth');
                            setAddOns({ ...addOns, photoShoot: newValue });
                          }}
                          label="Professional Photo Shoot"
                          description="We send a photographer to your job site. Pro photos for your website and Google profile."
                          price="$299 (just once)"
                        />
                        <OptionCard
                          selected={addOns.adCreative}
                          onClick={() => {
                            const newValue = !addOns.adCreative;
                            trackAddonToggled('Ad Creative Package', 499, newValue ? 'added' : 'removed', 'growth');
                            setAddOns({ ...addOns, adCreative: newValue });
                          }}
                          label="Ad Creative Package"
                          description="3 short videos + scripts you can use for ads, social posts, or anything else. Shot and edited by us."
                          price="$499 (just once)"
                        />
                      </>
                    )}

                    {/* City Dominator add-ons */}
                    {selectedPlan === "city_dominator" && (
                      <>
                        <OptionCard
                          selected={addOns.brandPackage}
                          onClick={() => {
                            const newValue = !addOns.brandPackage;
                            trackAddonToggled('Brand Content Package', 799, newValue ? 'added' : 'removed', 'city_dominator');
                            setAddOns({ ...addOns, brandPackage: newValue });
                          }}
                          label="Brand Content Package"
                          description="Full photo shoot + 3 videos + ad creatives. Everything you need to look like the top company in your area."
                          price="$799 (just once)"
                        />
                        <OptionCard
                          selected={addOns.adsCall}
                          onClick={() => {
                            const newValue = !addOns.adsCall;
                            trackAddonToggled('Ads Consultation', 0, newValue ? 'added' : 'removed', 'city_dominator');
                            setAddOns({ ...addOns, adsCall: newValue });
                          }}
                          label="Want even more leads?"
                          description="Book a quick call about running Facebook or Google ads. We'll put together a plan for you."
                          price="Free"
                          priceTone="green"
                        />
                      </>
                    )}
                  </div>

                  {/* Running total */}
                  {calculateTotal().oneTime > 0 && (
                    <div className="space-y-1.5 border-t border-[#E5EDF6] pt-3">
                      {addOns.textAlerts && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold text-[#0866FF]">With extras, you&apos;ll pay</span>
                          <span className="text-base font-bold text-[#0866FF]">${calculateTotal().monthly}/mo</span>
                        </div>
                      )}
                      {addOns.domainRouting === "us" && (
                        <div className="flex items-center justify-between text-[13px] text-[#46516B]">
                          <span>Domain setup (charged once)</span>
                          <span className="font-semibold text-[#07143F]">$99</span>
                        </div>
                      )}
                      {addOns.googleBoost && (
                        <div className="flex items-center justify-between text-[13px] text-[#46516B]">
                          <span>Google Business Setup (charged once)</span>
                          <span className="font-semibold text-[#07143F]">$199</span>
                        </div>
                      )}
                      {addOns.photoShoot && (
                        <div className="flex items-center justify-between text-[13px] text-[#46516B]">
                          <span>Photo Shoot (charged once)</span>
                          <span className="font-semibold text-[#07143F]">$299</span>
                        </div>
                      )}
                      {addOns.adCreative && (
                        <div className="flex items-center justify-between text-[13px] text-[#46516B]">
                          <span>Ad Creative Package (charged once)</span>
                          <span className="font-semibold text-[#07143F]">$499</span>
                        </div>
                      )}
                      {addOns.brandPackage && (
                        <div className="flex items-center justify-between text-[13px] text-[#46516B]">
                          <span>Brand Content Package (charged once)</span>
                          <span className="font-semibold text-[#07143F]">$799</span>
                        </div>
                      )}
                    </div>
                  )}
                  {addOns.textAlerts && calculateTotal().oneTime === 0 && (
                    <div className="border-t border-[#E5EDF6] pt-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-[#0866FF]">With extras, you&apos;ll pay</span>
                        <span className="text-base font-bold text-[#0866FF]">${calculateTotal().monthly}/mo</span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        track('checkout_modal_step_viewed', {
                          plan: selectedPlan || 'unknown',
                          step_name: 'setup',
                          step_number: 1,
                          funnel_stage: 'checkout_setup',
                          navigation_direction: 'back',
                          event_category: 'checkout',
                        });
                        setUpsellStep(1);
                      }}
                      className={backBtnClass}
                    >
                      Back
                    </button>
                    <BrandButton
                      className="flex-1"
                      onClick={() => {
                        const { monthly, oneTime } = calculateTotal();
                        const selectedAddons = getSelectedAddons();
                        track('checkout_modal_step_completed', {
                          plan: selectedPlan || 'unknown',
                          step_name: 'extras',
                          step_number: 2,
                          addons: selectedAddons,
                          addon_count: selectedAddons.length,
                          total_value: monthly + oneTime,
                          funnel_stage: 'addon_selection',
                          event_category: 'checkout',
                        });
                        track('checkout_modal_step_viewed', {
                          plan: selectedPlan || 'unknown',
                          step_name: 'summary',
                          step_number: 3,
                          billing_cycle: addOns.billingCycle,
                          total_value: monthly + oneTime,
                          funnel_stage: 'checkout_summary',
                          event_category: 'checkout',
                        });
                        setUpsellStep(3);
                      }}
                    >
                      {calculateTotal().oneTime > 0 || addOns.textAlerts || addOns.adsCall ? "Continue" : "No thanks, skip"}
                    </BrandButton>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Summary + Billing + Checkout */}
            {upsellStep === 3 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-[19px] font-bold">Here&apos;s what you&apos;re paying</h3>
                  <p className="mt-1 text-[14px] text-[#46516B]">This is everything. No surprises, no extra charges.</p>
                </div>

                {/* Monthly price breakdown */}
                <div className="space-y-2.5">
                  <p className={summaryLabel}>Your monthly price</p>
                  <div className="flex items-center justify-between text-sm">
                    <span>{selectedPlanDetails ? selectedPlanDetails.label : "Starter"} plan</span>
                    <span className="font-semibold tabular-nums">${selectedPlanDetails ? selectedPlanDetails.monthlyPrice : 0}</span>
                  </div>
                  {addOns.textAlerts && (
                    <div className="flex items-center justify-between text-sm text-[#46516B]">
                      <span>Instant Lead Texts</span>
                      <span className="tabular-nums">$29</span>
                    </div>
                  )}
                  {addOns.textAlerts && (
                    <div className="flex items-center justify-between border-t border-[#E5EDF6] pt-2 text-sm">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold tabular-nums">${calculateTotal().monthly}/mo</span>
                    </div>
                  )}
                </div>

                {/* Billing choice */}
                <div role="radiogroup" aria-labelledby="billing-choice-label" className="space-y-2 border-t border-[#E5EDF6] pt-4">
                  <p id="billing-choice-label" className="mb-2 text-sm font-semibold">How would you like to pay?</p>

                  {/* Monthly option */}
                  <button
                    type="button"
                    role="radio"
                    aria-checked={addOns.billingCycle === "monthly"}
                    onClick={() => {
                      track('checkout_billing_cycle_selected', {
                        plan: selectedPlan || 'unknown',
                        billing_cycle: 'monthly',
                        funnel_stage: 'checkout_summary',
                        event_category: 'checkout',
                      });
                      setAddOns({ ...addOns, billingCycle: "monthly" });
                    }}
                    className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 ${focusRing} ${
                      addOns.billingCycle === "monthly"
                        ? "border-[#0866FF] bg-[#EFF8FF]"
                        : "border-[#E5EDF6] bg-white hover:border-[#0866FF]/50"
                    }`}
                  >
                    <span className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${addOns.billingCycle === "monthly" ? "border-[#0866FF]" : "border-[#C9D6E8]"}`}>
                      {addOns.billingCycle === "monthly" && <span className="h-2 w-2 rounded-full bg-[#0866FF]" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between">
                        <span className="text-sm font-semibold">Month-to-month</span>
                        <span className="text-sm font-bold tabular-nums">${calculateTotal().monthly}/mo</span>
                      </span>
                      <span className="mt-0.5 block text-xs text-[#46516B]">Cancel anytime, no commitment</span>
                    </span>
                  </button>

                  {/* Upfront option */}
                  <button
                    type="button"
                    role="radio"
                    aria-checked={addOns.billingCycle === "upfront"}
                    onClick={() => {
                      track('checkout_billing_cycle_selected', {
                        plan: selectedPlan || 'unknown',
                        billing_cycle: 'upfront',
                        funnel_stage: 'checkout_summary',
                        event_category: 'checkout',
                      });
                      setAddOns({ ...addOns, billingCycle: "upfront" });
                    }}
                    className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 ${focusRing} ${
                      addOns.billingCycle === "upfront"
                        ? "border-[#0866FF] bg-[#EFF8FF]"
                        : "border-[#E5EDF6] bg-white hover:border-[#0866FF]/50"
                    }`}
                  >
                    <span className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${addOns.billingCycle === "upfront" ? "border-[#0866FF]" : "border-[#C9D6E8]"}`}>
                      {addOns.billingCycle === "upfront" && <span className="h-2 w-2 rounded-full bg-[#0866FF]" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold">Pay 3 months, get 1 free</span>
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">Save ${calculateTotal().upfrontSavings}</span>
                      </span>
                      <span className="mt-0.5 block text-xs text-[#46516B]">
                        ${calculateTotal().monthly} x 3 = ${calculateTotal().upfrontTotal} · Then ${calculateTotal().monthly}/mo from month 5
                      </span>
                    </span>
                  </button>
                </div>

                {/* Due today */}
                <div className="space-y-2 rounded-xl bg-[#F7FBFF] p-4">
                  <p className={summaryLabel}>Due today</p>
                  {addOns.billingCycle === "monthly" ? (
                    <div className="flex items-center justify-between text-sm text-[#46516B]">
                      <span>First month</span>
                      <span className="font-semibold tabular-nums text-[#07143F]">${calculateTotal().monthly}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-sm text-[#46516B]">
                      <span>3 months upfront</span>
                      <span className="font-semibold tabular-nums text-[#07143F]">${calculateTotal().upfrontTotal}</span>
                    </div>
                  )}
                  {addOns.domainRouting === "us" && (
                    <div className="flex items-center justify-between text-sm text-[#46516B]">
                      <span>Domain setup <span className="text-[#46516B]/70">(once)</span></span>
                      <span className="tabular-nums">$99</span>
                    </div>
                  )}
                  {addOns.googleBoost && (
                    <div className="flex items-center justify-between text-sm text-[#46516B]">
                      <span>Google Business Setup <span className="text-[#46516B]/70">(once)</span></span>
                      <span className="tabular-nums">$199</span>
                    </div>
                  )}
                  {addOns.photoShoot && (
                    <div className="flex items-center justify-between text-sm text-[#46516B]">
                      <span>Photo Shoot <span className="text-[#46516B]/70">(once)</span></span>
                      <span className="tabular-nums">$299</span>
                    </div>
                  )}
                  {addOns.adCreative && (
                    <div className="flex items-center justify-between text-sm text-[#46516B]">
                      <span>Ad Creative Package <span className="text-[#46516B]/70">(once)</span></span>
                      <span className="tabular-nums">$499</span>
                    </div>
                  )}
                  {addOns.brandPackage && (
                    <div className="flex items-center justify-between text-sm text-[#46516B]">
                      <span>Brand Content Package <span className="text-[#46516B]/70">(once)</span></span>
                      <span className="tabular-nums">$799</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between border-t border-[#E5EDF6] pt-2">
                    <span className="text-sm font-bold text-[#0866FF]">Total charged today</span>
                    <span className="text-xl font-extrabold tabular-nums text-[#0866FF]">
                      ${(addOns.billingCycle === "upfront" ? calculateTotal().upfrontTotal : calculateTotal().monthly) + calculateTotal().oneTime}
                    </span>
                  </div>
                  {addOns.billingCycle === "monthly" && (
                    <p className="text-xs text-[#46516B]">Then ${calculateTotal().monthly}/mo after that. Cancel anytime.</p>
                  )}
                  {addOns.billingCycle === "upfront" && (
                    <p className="text-xs text-[#46516B]">Month 4 is free. Then ${calculateTotal().monthly}/mo from month 5.</p>
                  )}
                </div>

                {checkoutError && (
                  <p role="alert" className="text-sm font-medium text-red-600">{checkoutError}</p>
                )}

                {/* Checkout button + trust */}
                <div className="space-y-3 pt-1">
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        track('checkout_modal_step_viewed', {
                          plan: selectedPlan || 'unknown',
                          step_name: 'extras',
                          step_number: 2,
                          funnel_stage: 'addon_selection',
                          navigation_direction: 'back',
                          event_category: 'checkout',
                        });
                        setUpsellStep(2);
                      }}
                      className={backBtnClass}
                    >
                      Back
                    </button>
                    <BrandButton className="flex-1" onClick={handleUpsellContinue} loading={loadingPlan !== null}>
                      Go to payment — ${(addOns.billingCycle === "upfront"
                        ? calculateTotal().upfrontTotal
                        : calculateTotal().monthly
                      ) + calculateTotal().oneTime}
                    </BrandButton>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12px] text-[#46516B]">
                    <span className="flex items-center gap-1">
                      <KitIcon name="lock" className="h-3.5 w-3.5" />
                      256-bit SSL
                    </span>
                    <span aria-hidden="true" className="text-[#C9D6E8]">|</span>
                    <span>Powered by Stripe</span>
                    <span aria-hidden="true" className="text-[#C9D6E8]">|</span>
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* ===================== CUSTOM WEBSITE MODAL ===================== */}
      <Dialog
        open={showCustomModal}
        onOpenChange={(open) => {
          setShowCustomModal(open);
          if (!open) {
            setCustomError("");
            setCustomSuccess("");
          }
        }}
      >
        <DialogContent label="Custom Website Request" className="max-w-lg p-5 sm:p-6">
          <DialogCloseButton />

          <div className="mb-6 pr-10">
            <h3 className="text-[22px] font-extrabold tracking-[-0.02em]">Custom Website Request</h3>
            <p className="mt-1 text-[14px] text-[#46516B]">Tell us what you need and we&apos;ll reach out to book a call.</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitCustomRequest();
            }}
            className="space-y-3"
          >
            <input
              type="text"
              aria-label="Full Name"
              value={customForm.name}
              onChange={(e) => setCustomForm((prev) => ({ ...prev, name: e.target.value }))}
              onFocus={trackCustomFormStart}
              placeholder="Full Name *"
              className={inputClass}
            />
            <input
              type="email"
              aria-label="Email"
              value={customForm.email}
              onChange={(e) => setCustomForm((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="Email *"
              className={inputClass}
            />
            <input
              type="tel"
              aria-label="Phone (optional)"
              value={customForm.phone}
              onChange={(e) => setCustomForm((prev) => ({ ...prev, phone: e.target.value }))}
              placeholder="Phone (optional)"
              className={inputClass}
            />
            <input
              type="text"
              aria-label="Company (optional)"
              value={customForm.company}
              onChange={(e) => setCustomForm((prev) => ({ ...prev, company: e.target.value }))}
              placeholder="Company (optional)"
              className={inputClass}
            />
            <input
              type="text"
              aria-label="Current Website (optional)"
              value={customForm.website}
              onChange={(e) => setCustomForm((prev) => ({ ...prev, website: e.target.value }))}
              placeholder="Current Website (e.g., example.com or www.example.com)"
              className={inputClass}
            />
            <textarea
              aria-label="Project details"
              value={customForm.details}
              onChange={(e) => setCustomForm((prev) => ({ ...prev, details: e.target.value }))}
              placeholder="Project details, goals, and required integrations"
              rows={4}
              className={inputClass}
            />

            {customError && (
              <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {customError}
              </div>
            )}
            {customSuccess && (
              <div role="status" className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                {customSuccess}
              </div>
            )}

            <BrandButton type="submit" loading={customLoading} className="w-full">
              Request a Call
            </BrandButton>
          </form>

          <p className="mt-3 text-center text-xs text-[#46516B]">We will reply within 1 business day.</p>
        </DialogContent>
      </Dialog>
    </BrandShell>
  );
}
