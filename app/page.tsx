"use client";

import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BGPattern } from "@/components/ui/bg-pattern";
import { SocialProofSection } from "@/components/social-proof";
import { SearchVisual, LeadVisual, ReviewVisual } from "@/components/feature-visuals";
import {
  GlassCard,
  GlassButton,
  GlassInput,
  GlassPill,
  GlassSelect,
  GlassDivider,
  AmbientGlow,
} from "@/components/ui/glass";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogCloseButton,
} from "@/components/ui/dialog";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ExperienceHeroBackground } from "@/components/ui/experience-hero";
import { GlobeBackground } from "@/components/ui/globe-background";
import { FAQSchema } from "@/components/FAQSchema";
import { faqs, faqCategories } from "@/lib/faqData";
import { usePageTracker, useCheckoutTracker, useEventTracker, useFormTracker } from "@/lib/analytics";
import { Navigation } from "@/components/Navigation";
import { motion, AnimatePresence, useInView } from "framer-motion";

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
// Icon Components
// =============================================================================

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

// Feature icons
const featureIcons = {
  trust: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 4v5c0 5-3.5 8.5-7 9.5-3.5-1-7-4.5-7-9.5V7l7-4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 12.5l1.5 1.5 3.5-4" />
    </svg>
  ),
  mobile: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  star: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.5l2.18 4.42 4.88.71-3.53 3.44.83 4.86L11.48 14.7 7.12 16.93l.83-4.86L4.42 8.63l4.88-.71L11.48 3.5z" />
    </svg>
  ),
  lightning: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  search: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
};

const defaultPageCopy = {
  analyticsTitle: "QuickLaunchWeb - Homepage",
  pageType: "homepage",
  scrollPath: "/",
  heroPill: "MORE JOBS. ZERO ADS.",
  heroHeading: (
    <>
      The system that keeps
      <br className="hidden md:block" />
      {" "}your{" "}
      <span
        className="text-transparent bg-clip-text"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(var(--color-accent-rgb)), rgb(var(--color-accent-gradient-to)))",
        }}
      >
        phone ringing.
      </span>
    </>
  ),
  heroBullets: [
    "Google, Maps, AI search — you show up everywhere.",
    "Missed calls, follow-ups, quotes — all handled.",
    "Reviews build while you're on the job.",
  ],
  features: [
    {
      title: "You show up everywhere people search",
      desc: "Google, Maps, ChatGPT, Siri — when someone looks for what you do, your name comes up. Not your competitor who paid for ads.",
      icon: featureIcons.search,
    },
    {
      title: "No lead slips through the cracks",
      desc: "Miss a call? They get texted back. Fill out a form? They hear from you in seconds. Go quiet? We follow up automatically.",
      icon: featureIcons.trust,
    },
    {
      title: "Reviews come in while you sleep",
      desc: "After every job, a review request goes out. When it comes in, we reply for you. Your reputation builds itself.",
      icon: featureIcons.star,
    },
  ],
  featureHeading: (
    <>
      Someone is searching for what you do <span className="text-accent">right now</span>.
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
    { label: "01", title: "You show up when people search your service", detail: "Google, AI search, Maps" },
    { label: "02", title: "People call or request a quote instantly", detail: "Tap-to-call + forms ready" },
    { label: "03", title: "Leads get followed up automatically", detail: "Missed calls, after-hours, follow-ups" },
    { label: "04", title: "Reviews come in without you chasing anyone", detail: "Automated requests + replies" },
    { label: "05", title: "You rank in more cities over time", detail: "Dedicated pages that bring in new calls" },
    { label: "06", title: "Everything stays running and improving", detail: "We manage it all, you do the work" },
  ],
  deliverablesHeading: (
    <>
      Here is what happens when you <span className="text-accent">turn this on</span>.
    </>
  ),
  deliverablesDescription:
    "More calls. More reviews. More jobs. All on autopilot.",
  steps: [
    { step: "01", title: "Pick the plan that fits", desc: "Start simple or choose the level that matches where you want to grow." },
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
    "We build the system that gets local businesses more calls, more reviews, and more jobs — without paying for ads.",
  footerTagline: "More calls. More jobs. Less chasing.",
};

const houstonPageCopy = {
  analyticsTitle: "QuickLaunchWeb - Houston Web Design for Contractors",
  pageType: "local_landing",
  scrollPath: "/houston-web-design-for-contractors",
  heroPill: "HOUSTON WEB DESIGN FOR CONTRACTORS THAT GETS CALLS.",
  heroHeading: (
    <>
      Houston Web Design for Contractors
      <span
        className="text-transparent bg-clip-text"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(var(--color-accent-rgb)), rgb(var(--color-accent-gradient-to)))",
        }}
      >
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
      icon: featureIcons.mobile,
    },
    {
      title: "Fast on phones",
      desc: "Most people search on a phone. A slow site can cost you the job.",
      icon: featureIcons.lightning,
    },
    {
      title: "Made for Houston search",
      desc: "A good Houston contractor website shows what you do, where you work, and why people should trust you.",
      icon: featureIcons.search,
    },
  ],
  featureHeading: (
    <>
      Houston web design should <span className="text-accent">get calls</span>.
      <br />It should not just <span className="text-accent">look nice</span>.
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
    { label: "01", title: "Easy to use on every phone", detail: "Tap-to-call ready" },
    { label: "02", title: "Quote requests go right to you", detail: "Quote form included" },
    { label: "03", title: "Built for Houston search", detail: "Local SEO foundation" },
    { label: "04", title: "Loads fast", detail: "Speed + SSL included" },
    { label: "05", title: "Live in 48 hours", detail: "Launched in 48 hours" },
    { label: "06", title: "We keep it updated", detail: "Ongoing support" },
  ],
  deliverablesHeading: (
    <>
      In <span className="text-accent">48 Hours</span>, People Can Start Calling
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
// Progress Ring Component
// =============================================================================

function ProgressRingCSS({
  isActive = false,
  isPast = false,
  duration = 5000,
  size = 48,
  strokeWidth = 2,
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
    <svg
      width={size}
      height={size}
      className={`absolute inset-0 -rotate-90 transition-opacity duration-300 ${isActive || isPast ? 'opacity-100' : 'opacity-40'}`}
    >
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={strokeWidth}
      />
      {/* Progress circle - CSS animated */}
      {(isActive || isPast) && (
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgb(var(--color-accent-rgb))"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={isPast ? 0 : circumference}
          strokeLinecap="round"
          className={isActive ? 'animate-ringFill' : ''}
          style={isActive ? {
            '--ring-duration': `${duration}ms`,
            '--circumference': circumference,
          } as React.CSSProperties : undefined}
        />
      )}
    </svg>
  );
}

// =============================================================================
// Step Visual Components (CSS Animation Based - No JS re-renders)
// =============================================================================

function CheckoutVisualCSS({ isActive }: { isActive: boolean }) {
  if (!isActive) return null;

  return (
    <div className="absolute inset-0 animate-stageFloat">
      <div className="absolute inset-0 flex flex-col animate-fadeIn">
        {/* Gradient background */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 animate-glowPulse"
            style={{
              background: 'radial-gradient(circle at 50% 30%, rgba(var(--color-accent-rgb), 0.08), transparent 60%)'
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4">
          <p className="text-xs text-muted uppercase tracking-wider mb-4 animate-slideDown" style={{ animationDelay: '0.2s' }}>
            Choose Your Plan
          </p>

          {/* Plan cards - both visible from start */}
          <div className="w-full max-w-[280px] animate-stackFloat">
            <div className="space-y-2.5 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
              {/* Starter Plan */}
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition-all duration-500 animate-starterFade" style={{ animationDelay: '0.9s', animationFillMode: 'both' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Starter</p>
                    <p className="text-xs text-muted">1-page site</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-white">$99</span>
                    <span className="text-muted text-xs">/mo</span>
                  </div>
                </div>
              </div>

              {/* Growth Engine - Gets selected */}
              <div className="animate-proBreath" style={{ animationDelay: '1.1s' }}>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 relative overflow-hidden pro-card animate-proSelect" style={{ animationDelay: '0.9s', animationFillMode: 'both' }}>
                  <div className="relative flex items-center justify-between pr-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-white">Growth</p>
                        <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-accent text-black">
                          POPULAR
                        </span>
                      </div>
                      <p className="text-xs text-muted">5-page + SEO system</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-accent">$199</span>
                      <span className="text-muted text-xs">/mo</span>
                    </div>
                  </div>

                  {/* Checkmark */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-accent flex items-center justify-center opacity-0 scale-0 animate-checkPop" style={{ animationDelay: '1.2s', animationFillMode: 'both' }}>
                    <svg className="h-3 w-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-4 space-y-1.5 w-full max-w-[280px]">
            {['5-page website + SEO', 'Reviews automation', 'Cancel anytime'].map((item, i) => (
              <div key={item} className="flex items-center gap-2 text-xs text-secondary opacity-0 animate-slideRight" style={{ animationDelay: `${1.5 + i * 0.25}s`, animationFillMode: 'both' }}>
                <div className="h-1 w-1 rounded-full bg-accent" />
                {item}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-5 w-full max-w-[280px] opacity-0 animate-slideUp" style={{ animationDelay: '2.25s', animationFillMode: 'both' }}>
            <div className="animate-ctaBreath" style={{ animationDelay: '2.6s' }}>
              <div className="animate-press" style={{ animationDelay: '3.9s', animationFillMode: 'both' }}>
                <div className="h-11 rounded-full bg-accent flex items-center justify-center text-sm font-semibold text-black shadow-lg shadow-accent/20 animate-buttonGlow" style={{ animationDelay: '2.45s' }}>
                  <span>Continue to Checkout</span>
                  <svg className="h-4 w-4 ml-1 opacity-0 animate-arrowSlide" style={{ animationDelay: '2.6s', animationFillMode: 'both' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Stripe badge */}
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-muted opacity-0 animate-fadeIn" style={{ animationDelay: '3.4s', animationFillMode: 'both' }}>
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
            </svg>
            Secured by Stripe
          </div>
        </div>
      </div>
    </div>
  );
}

function FormVisualCSS({ isActive }: { isActive: boolean }) {
  if (!isActive) return null;

  return (
    <div className="absolute inset-0 animate-stageFloat">
      <div className="absolute inset-0 flex flex-col animate-fadeIn">
        {/* Gradient background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.07),transparent_60%)] animate-glowPulse" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-[280px] animate-formFloat">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between opacity-0 animate-slideDown" style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
              <span className="text-sm font-medium text-white">Business Details</span>
              <span className="text-xs text-muted bg-white/5 px-2 py-0.5 rounded-full">Step 2 of 3</span>
            </div>

            {/* Progress bar - starts hidden, animates fill */}
            <div className="h-1.5 w-full rounded-full bg-white/[0.12] mb-5 overflow-hidden opacity-0 animate-fadeIn" style={{ animationDelay: '0.25s', animationFillMode: 'both' }}>
              <div
                className="h-full w-full rounded-full origin-left animate-progressFill"
                style={{
                  animationDelay: '0.3s',
                  background: 'linear-gradient(to right, rgb(var(--color-accent-rgb)), rgb(var(--color-accent-gradient-to)))'
                }}
              />
            </div>

            {/* Form fields */}
            <div className="space-y-3">
              {/* Field 1 */}
              <div className="opacity-0 animate-slideRight" style={{ animationDelay: '0.55s', animationFillMode: 'both' }}>
                <label className="text-[10px] text-muted mb-1 block uppercase tracking-wider">Business Name</label>
                <div className="h-9 rounded-lg border border-white/[0.1] bg-white/[0.03] px-3 flex items-center animate-fieldFocus" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
                  <span
                    className="text-sm text-white animate-typeText1 typing-caret"
                    style={{ animationDelay: '0.85s', '--type-width': '15ch', '--type-steps': 15, '--caret-delay': '0.85s', '--caret-duration': '1.4s' } as React.CSSProperties}
                  >
                    Mike&apos;s Plumbing
                  </span>
                </div>
              </div>

              {/* Field 2 */}
              <div className="opacity-0 animate-slideRight" style={{ animationDelay: '1.25s', animationFillMode: 'both' }}>
                <label className="text-[10px] text-muted mb-1 block uppercase tracking-wider">Services</label>
                <div className="h-9 rounded-lg border border-white/[0.1] bg-white/[0.03] px-3 flex items-center animate-fieldFocus" style={{ animationDelay: '1.4s', animationFillMode: 'both' }}>
                  <span
                    className="text-sm text-white animate-typeText2 typing-caret"
                    style={{ animationDelay: '1.55s', '--type-width': '32ch', '--type-steps': 32, '--caret-delay': '1.55s', '--caret-duration': '1.7s' } as React.CSSProperties}
                  >
                    Repairs, Installation, Emergency
                  </span>
                </div>
              </div>

              {/* Field 3 */}
              <div className="opacity-0 animate-slideRight" style={{ animationDelay: '2.05s', animationFillMode: 'both' }}>
                <label className="text-[10px] text-muted mb-1 block uppercase tracking-wider">Phone</label>
                <div className="h-9 rounded-lg border border-white/[0.1] bg-white/[0.03] px-3 flex items-center animate-fieldFocus" style={{ animationDelay: '2.2s', animationFillMode: 'both' }}>
                  <span
                    className="text-sm text-white animate-typeText3 typing-caret"
                    style={{ animationDelay: '2.35s', '--type-width': '14ch', '--type-steps': 14, '--caret-delay': '2.35s', '--caret-duration': '1.3s' } as React.CSSProperties}
                  >
                    (555) 123-4567
                  </span>
                </div>
              </div>

              {/* Photos */}
              <div className="opacity-0 animate-slideUp" style={{ animationDelay: '2.6s', animationFillMode: 'both' }}>
                <label className="text-[10px] text-muted mb-1 block uppercase tracking-wider">Photos</label>
                <div className="h-14 rounded-lg border border-dashed border-white/[0.12] bg-white/[0.02] overflow-hidden animate-photosComplete" style={{ animationDelay: '3.4s', animationFillMode: 'both' }}>
                  <div className="h-full flex items-center justify-center gap-2 px-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-8 w-8 rounded-lg border border-white/20 opacity-0 scale-50 animate-photosPop photo-thumb" style={{ animationDelay: `${2.75 + i * 0.18}s`, animationFillMode: 'both' }} />
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-green-400 text-xs opacity-0 animate-fadeIn" style={{ animationDelay: '3.55s', animationFillMode: 'both' }}>
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      3 uploaded
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-4 opacity-0 animate-slideUp" style={{ animationDelay: '3.15s', animationFillMode: 'both' }}>
              <div className="animate-press" style={{ animationDelay: '3.85s', animationFillMode: 'both' }}>
                <div
                  className="h-10 rounded-full bg-white/[0.08] text-white/60 flex items-center justify-center text-sm font-medium animate-submitReady"
                  style={{ animationDelay: '3.45s', animationFillMode: 'both' }}
                >
                  <span>Submit Details</span>
                  <svg className="h-4 w-4 ml-1 opacity-0 animate-arrowSlide" style={{ animationDelay: '3.6s', animationFillMode: 'both' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LaunchedVisualCSS({ isActive }: { isActive: boolean }) {
  if (!isActive) return null;

  return (
    <div className="absolute inset-0 animate-stageFloat">
      <div className="absolute inset-0 flex flex-col overflow-hidden animate-fadeIn">
        {/* Gradient background */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 30% 20%, rgba(var(--color-accent-rgb), 0.07), transparent 50%)'
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.06),transparent_50%)] opacity-0 animate-greenGlow" style={{ animationDelay: '2s', animationFillMode: 'both' }} />
        </div>

        {/* Browser */}
        <div className="absolute inset-x-4 top-4 bottom-28 animate-browserFloat" style={{ animationDelay: '0.6s' }}>
          <div className="absolute inset-0 rounded-t-lg bg-white/[0.03] border-t border-l border-r border-white/[0.08] overflow-hidden backdrop-blur-sm opacity-0 animate-browserSlide" style={{ animationDelay: '0.25s', animationFillMode: 'both' }}>
            <div className="h-7 border-b border-white/[0.05] flex items-center px-3 gap-1.5 bg-black/30">
              <div className="h-2 w-2 rounded-full bg-red-500/50" />
              <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
              <div className="h-2 w-2 rounded-full bg-green-500/50" />
              <div className="flex-1 mx-2">
                <div className="h-3 bg-white/[0.05] rounded-full max-w-[100px] overflow-hidden animate-urlBar" style={{ animationDelay: '0.85s', animationFillMode: 'both' }}>
                  <span className="text-[8px] text-green-400 font-mono flex items-center justify-center h-full opacity-0 animate-fadeIn" style={{ animationDelay: '1s', animationFillMode: 'both' }}>yourbusiness.com</span>
                </div>
              </div>
            </div>

            {/* Browser content - GPU accelerated with scaleX */}
            <div className="p-3 space-y-2">
              <div className="h-3 rounded bg-white/[0.08] w-2/3 origin-left animate-contentReveal1" style={{ animationDelay: '1.05s', animationFillMode: 'both' }} />
              <div className="h-12 rounded-lg bg-white/[0.05] opacity-0 animate-contentReveal2" style={{ animationDelay: '1.4s', animationFillMode: 'both' }} />
              <div className="grid grid-cols-2 gap-1.5">
                <div className="h-8 rounded bg-white/[0.04] opacity-0 animate-contentReveal3" style={{ animationDelay: '1.75s', animationFillMode: 'both' }} />
                <div className="h-8 rounded bg-white/[0.04] opacity-0 animate-contentReveal3" style={{ animationDelay: '1.9s', animationFillMode: 'both' }} />
              </div>
              <div className="h-6 rounded-full bg-accent/20 w-1/2 origin-left animate-contentReveal4" style={{ animationDelay: '2.1s', animationFillMode: 'both' }} />
            </div>
          </div>
        </div>

        {/* Success card */}
        <div className="absolute bottom-3 right-3 left-3 animate-cardFloat" style={{ animationDelay: '2.7s' }}>
          <div className="rounded-xl border border-white/[0.1] bg-[rgba(10,10,12,0.97)] backdrop-blur-xl p-3 opacity-0 animate-cardSlideUp" style={{ animationDelay: '2.45s', animationFillMode: 'both' }}>
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center animate-successIcon" style={{ animationDelay: '2.7s', animationFillMode: 'both' }}>
                <svg className="h-4 w-4 text-white/40 animate-checkScale" style={{ animationDelay: '2.9s', animationFillMode: 'both' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white/50 animate-textBright" style={{ animationDelay: '3s', animationFillMode: 'both' }}>Website Launched</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/30 animate-dotPulse" style={{ animationDelay: '3.2s', animationFillMode: 'both' }} />
                  <p className="text-[10px] text-muted font-mono truncate">yourbusiness.com</p>
                </div>
              </div>

              <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-white/10 text-white/40 animate-liveBadge" style={{ animationDelay: '3.3s', animationFillMode: 'both' }}>
                LIVE
              </span>
            </div>

            {/* Scores */}
            <div className="mt-2.5 grid grid-cols-2 gap-2 opacity-0 animate-fadeIn" style={{ animationDelay: '3.1s', animationFillMode: 'both' }}>
              <div className="rounded-lg bg-white/[0.04] p-2 text-center animate-scoreGlow1" style={{ animationDelay: '3.3s', animationFillMode: 'both' }}>
                <p className="text-[8px] text-muted uppercase tracking-wider">Speed</p>
                <p className="text-lg font-bold text-white animate-countUp1" style={{ animationDelay: '3.4s' }}>99</p>
              </div>
              <div className="rounded-lg bg-white/[0.04] p-2 text-center animate-scoreGlow2" style={{ animationDelay: '3.3s', animationFillMode: 'both' }}>
                <p className="text-[8px] text-muted uppercase tracking-wider">SEO</p>
                <p className="text-lg font-bold text-white animate-countUp2" style={{ animationDelay: '3.55s' }}>100</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Feature Card Visuals
// =============================================================================

// Feature visuals imported from components/feature-visuals.tsx

// =============================================================================
// How It Works Section Component
// =============================================================================

function HowItWorksSection({ steps }: { steps: { step: string; title: string; desc: string }[] }) {
  const [activeStep, setActiveStep] = useState(0);
  const [animationKey, setAnimationKey] = useState(0); // Forces CSS animation restart
  const CYCLE_DURATION = 6000; // 6 seconds per step

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
      setAnimationKey((prev) => prev + 1); // Restart CSS animations
    }, CYCLE_DURATION);

    return () => clearInterval(stepInterval);
  }, []);

  const visuals = [
    <CheckoutVisualCSS key={`checkout-${animationKey}`} isActive={activeStep === 0} />,
    <FormVisualCSS key={`form-${animationKey}`} isActive={activeStep === 1} />,
    <LaunchedVisualCSS key={`launched-${animationKey}`} isActive={activeStep === 2} />,
  ];

  return (
    <section id="how-it-works" className="relative px-6 pt-16 pb-20 md:pt-20 md:pb-24 allow-motion overflow-hidden">
      <AmbientGlow color="accent" position="center" intensity="subtle" />
      <BGPattern variant="dots" mask="fade-center" size={32} fill="rgba(255,255,255,0.03)" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left side - Steps */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              3 steps. 48 hours.<br />
              <span className="text-muted">Your phone starts ringing.</span>
            </h2>
            <div className="mt-12 space-y-8">
              {steps.map((item, i) => {
                const isActive = i === activeStep;
                const isPast = i < activeStep;

                return (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveStep(i);
                      setAnimationKey((prev) => prev + 1);
                    }}
                    className={`flex gap-5 w-full text-left transition-all duration-300 ${isActive ? "opacity-100" : "opacity-50 hover:opacity-75"
                      }`}
                  >
                    {/* Step indicator with progress ring */}
                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
                      <ProgressRingCSS
                        isActive={isActive}
                        isPast={isPast}
                        duration={CYCLE_DURATION}
                        key={`ring-${i}-${animationKey}`}
                      />
                      <div className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transition-all duration-300 ${isActive
                        ? "border-accent/50 bg-accent/10 text-accent"
                        : isPast
                          ? "border-accent/30 bg-accent/5 text-accent/70"
                          : "border-white/[0.15] bg-white/[0.03] text-white/60"
                        }`}>
                        {item.step}
                      </div>
                    </div>

                    {/* Step content */}
                    <div className="flex-1 pt-1">
                      <h3 className={`text-lg font-semibold transition-colors duration-300 ${isActive ? "text-white" : "text-white/70"
                        }`}>
                        {item.title}
                      </h3>
                      <p className={`mt-1 text-sm transition-colors duration-300 ${isActive ? "text-secondary" : "text-muted"
                        }`}>
                        {item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right side - Visual showcase */}
          <GlassCard variant="elevated" className="p-3">
            <div className="aspect-[4/5] w-full rounded-xl bg-base overflow-hidden relative">
              {/* Visuals - only render active one for performance */}
              {visuals[activeStep]}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// Main Component
// =============================================================================

export default function HomePage() {
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

  // Mobile sticky CTA state
  const [showMobileCTA, setShowMobileCTA] = useState(false);

  // Scroll depth tracking
  const scrollTrackedRef = useRef<Set<number>>(new Set());

  const year = useMemo(() => new Date().getFullYear(), []);

  // Scroll depth tracking (25%, 50%, 75%, 90%)
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = ((scrollTop + windowHeight) / documentHeight) * 100;

      const thresholds = [25, 50, 75, 90];
      thresholds.forEach((threshold) => {
        if (scrollPercentage >= threshold && !scrollTrackedRef.current.has(threshold)) {
          scrollTrackedRef.current.add(threshold);
          track('scroll_depth', {
            scroll_depth: threshold,
            page_path: pageCopy.scrollPath,
            event_category: 'engagement',
            event_label: `${threshold}%`,
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pageCopy.scrollPath, track]);

  // Mobile Sticky CTA scroll direction tracking
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show when scrolling down past the hero section (e.g., 300px)
      if (currentScrollY > 300 && currentScrollY > lastScrollY) {
        setShowMobileCTA(true);
      } else if (currentScrollY < lastScrollY) {
        // Hide when scrolling back up
        setShowMobileCTA(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // ==========================================================================
  // Render
  // ==========================================================================
  return (
    <div className="flex min-h-screen flex-col font-sans relative overflow-x-hidden">
      <FAQSchema />
      {/* ===== Navbar ===== */}
      <Navigation onOpenUpsellModal={openUpsellModal} onOpenPlanPicker={openPlanPicker} />

      <main className="flex-1">
        {/* ===== Hero Section ===== */}
        <section className="relative flex h-dvh flex-col overflow-hidden bg-[#080e24] px-6 pb-3 pt-24 md:px-12 md:pb-4 md:pt-40 lg:px-20">
          {/* Experience Hero Background */}
          {isHoustonLanding ? <GlobeBackground /> : <ExperienceHeroBackground />}

          <div className="relative z-10 flex w-full max-w-6xl flex-col items-start">
            {/* Status pill */}
            <GlassPill
              variant="accent"
              pulse
              className="mb-6 inline-flex items-center rounded-full px-4 py-2 text-[10px] font-semibold tracking-wide md:mb-8 md:px-5 md:py-2 md:text-sm"
            >
              <span>{pageCopy.heroPill}</span>
            </GlassPill>

            {/* Headline */}
            <h1 className="max-w-4xl text-left text-4xl/[1.05] font-extrabold tracking-tight text-white sm:text-5xl/[1.05] md:text-6xl/[1.05] lg:text-7xl/[1.05]" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
              {pageCopy.heroHeading}
            </h1>

            {/* Subhead - Left-aligned bullet points */}
            <div className="mt-6 w-full max-w-xl md:mt-8">
              <ul className="space-y-3 text-[15px] font-medium text-white/80 md:text-base lg:text-lg">
                {pageCopy.heroBullets.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckIcon className="h-5 w-5 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex w-full flex-col gap-4 sm:flex-row sm:items-center md:mt-10">
              <GlassButton
                variant="primary"
                size="lg"
                onClick={() => {
                  track('cta_click', {
                    cta_text: 'Get Started',
                    cta_location: 'hero',
                    event_category: 'engagement',
                    event_label: 'hero_primary_cta',
                  });
                  openPlanPicker();
                }}
                icon={<ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                className="group w-full sm:w-auto text-base py-4 md:py-4 md:px-8"
              >
                Get Started
              </GlassButton>
              <GlassButton
                variant="ghost"
                size="lg"
                onClick={() => {
                  track('cta_click', {
                    cta_text: 'See Recent Launches',
                    cta_location: 'hero',
                    destination_url: '#work',
                    event_category: 'engagement',
                    event_label: 'hero_secondary_cta',
                  });
                  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto text-base py-4 md:py-4 md:px-8"
              >
                See Recent Launches
              </GlassButton>
            </div>
            <p className="mt-5 text-[13px] text-white/40 sm:text-sm">
              Start in 60 seconds. No sales calls. No runaround.
            </p>
          </div>

          {/* Client logo marquee — pinned to bottom of hero, full width, centered */}
          <div className="relative z-10 mt-auto w-full">
            <div className="border-t border-white/[0.08] pt-4 pb-2">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 text-center mb-3">
                Businesses We&apos;ve Helped
              </p>

              <style dangerouslySetInnerHTML={{ __html: `
                @keyframes logo-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .logo-marquee-track { display: flex; width: max-content; animation: logo-scroll 75s linear infinite; }
              `}} />
              <div className="relative overflow-hidden">
                <div className="logo-marquee-track allow-motion">
                  {[0, 1].map((copy) => (
                    <div key={copy} className="flex shrink-0 items-center gap-14 md:gap-20 px-7 md:px-10" aria-hidden={copy === 1 ? "true" : undefined}>
                      {[
                        { src: "/logos/optimized/alvarez-pool.png", alt: "Alvarez Pool Service", w: "w-[75px] md:w-[95px]", width: 240, height: 182 },
                        { src: "/logos/optimized/3d-fencing.png", alt: "3D Fencing", w: "w-[160px] md:w-[200px]", h: "h-[60px] md:h-[72px]", width: 344, height: 180 },
                        { src: "/logos/optimized/cuervo-homes.png", alt: "Cuervo Homes", w: "w-[120px] md:w-[150px]", h: "h-[70px] md:h-[85px]", width: 120, height: 180 },
                        { src: "/logos/madenewpressure.svg", alt: "Made New Pressure Washing", w: "w-[75px] md:w-[95px]", width: 112, height: 96, unoptimized: true },
                        { src: "/logos/optimized/landeros-electrical.png", alt: "Landeros Electrical", w: "w-[95px] md:w-[125px]", width: 260, height: 159 },
                        { src: "/logos/optimized/apex-epoxy.png", alt: "Apex Epoxy & Surface Systems", w: "w-[85px] md:w-[105px]", width: 223, height: 180 },
                        { src: "/logos/optimized/jimenez-tree-pro.png", alt: "Jimenez Tree Pro", w: "w-[70px] md:w-[85px]", width: 200, height: 200 },
                        { src: "/logos/optimized/one-stop-outdoor.png", alt: "One Stop Outdoor Construction", w: "w-[105px] md:w-[135px]", width: 300, height: 132 },
                        { src: "/logos/optimized/elite-home-repairs.png", alt: "Elite Home Repairs", w: "w-[105px] md:w-[135px]", width: 300, height: 164 },
                        { src: "/logos/optimized/jack-sold-by-toro.png", alt: "The Toro Group", w: "w-[70px] md:w-[85px]", width: 200, height: 200 },
                        { src: "/logos/jnornamentaldesign.svg", alt: "JN Ornamental Design", w: "w-[70px] md:w-[85px]", width: 96, height: 96, unoptimized: true },
                        { src: "/logos/optimized/mcmillian-junk-removal.png", alt: "McMillian Junk Removal", w: "w-[95px] md:w-[115px]", width: 239, height: 180 },
                        { src: "/logos/optimized/tomi.png", alt: "Tomi Jewelry", w: "w-[65px] md:w-[80px]", width: 180, height: 180 },
                        { src: "/logos/optimized/jimenez-junk-removal.png", alt: "Jimenez Junk Removal", w: "w-[115px] md:w-[145px]", width: 320, height: 98 },
                        { src: "/logos/optimized/becreativesco.jpg", alt: "Becreativesco", w: "w-[85px] md:w-[105px]", width: 240, height: 171 },
                      ].map((logo) => (
                        <div key={logo.alt} className={`flex items-center justify-center ${logo.h || "h-[40px] md:h-[48px]"} ${logo.w} shrink-0`}>
                          <Image
                            src={logo.src}
                            alt={logo.alt}
                            width={logo.width}
                            height={logo.height}
                            sizes="(min-width: 768px) 200px, 160px"
                            unoptimized={logo.unoptimized}
                            className="max-w-full max-h-full object-contain opacity-75"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ===== Social Proof Section (moved up — proof first) ===== */}
        <SocialProofSection />

        {/* Divider */}
        <div className="mx-auto max-w-5xl px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        {/* ===== How It Works Section ===== */}
        <HowItWorksSection steps={steps} />

        {/* ===== Features Section ===== */}
        <section id="features" className="relative px-6 pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />
          <GlassDivider className="absolute top-0 left-0 right-0" />

          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="mb-14 md:text-center">
              <h2 className="mx-auto max-w-5xl text-3xl font-bold tracking-tight text-white text-balance md:text-5xl">
                {pageCopy.featureHeading}
              </h2>
              <p className="mt-4 text-lg text-secondary text-balance md:mx-auto md:max-w-3xl">
                {pageCopy.featureDescription}
              </p>
              <div className="mt-10 md:mx-auto md:max-w-3xl">
                <p className="mb-6 text-xs uppercase tracking-[0.35em] text-accent/80 font-bold text-center">Best for</p>
                <div className="mx-auto flex max-w-md flex-col gap-4 text-left">
                  {pageCopy.bestFor.map((item) => (
                    <div
                      key={item}
                      className="group flex items-start gap-3"
                    >
                      <div className="flex shrink-0 items-center justify-center rounded-full bg-accent/10 border border-accent/20 h-5 w-5 mt-0.5">
                        <CheckIcon className="h-3 w-3 text-accent transition-transform group-hover:scale-110" />
                      </div>
                      <span className="text-[14px] sm:text-[15px] font-medium text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3 md:gap-8">
              {features.map((feature, i) => (
                <GlassCard
                  key={i}
                  hover
                  className="flex flex-col p-0 relative overflow-hidden group border-white/[0.06]"
                >
                  {/* Animated visual */}
                  <div className="relative h-48 sm:h-56 overflow-hidden border-b border-white/[0.06] bg-white/[0.01]">
                    {i === 0 && <SearchVisual />}
                    {i === 1 && <LeadVisual />}
                    {i === 2 && <ReviewVisual />}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6 sm:p-8">
                    <h3 className="text-xl font-bold tracking-tight text-white leading-[1.2]">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-[1.7] text-secondary">
                      {feature.desc}
                    </p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="mx-auto max-w-5xl px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        {/* ===== 48 Hours Section ===== */}
        <section id="deliverables" className="relative px-6 pb-16 pt-16 md:pb-20 md:pt-20 overflow-hidden">
          <AmbientGlow color="accent" position="center" intensity="subtle" className="opacity-40" />

          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <p className="text-[11px] uppercase tracking-[0.4em] text-accent/80">
                    What Happens When You Start
                  </p>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">
                    {pageCopy.deliverablesHeading}
                  </h2>
                  <p className="mt-4 text-lg text-secondary">
                    {pageCopy.deliverablesDescription}
                  </p>
                  <p className="mt-2 text-xs text-muted">
                    Delivery starts after your details are submitted.
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">
                    delivery window
                  </p>
                  <p className="mt-2 font-mono text-3xl text-white/90 tracking-[0.18em]">
                    24-48h
                  </p>
                </div>
              </div>

              <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
                {deliverables.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <span className="mt-1 text-[9px] font-mono tracking-[0.25em] text-white/20">
                      {item.label}
                    </span>
                    <div className="space-y-1 max-w-md">
                      <p className="text-lg font-medium text-white/85 tracking-tight md:text-xl text-balance">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted/80 leading-relaxed md:text-sm">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== Pricing Section ===== */}
        <section id="pricing" className="relative px-6 pt-20 pb-24 md:pt-24 md:pb-32 overflow-hidden">
          <GlassDivider className="absolute top-0 left-0 right-0" />
          <AmbientGlow color="accent" position="top" intensity="subtle" className="-top-20" />

          <div className="relative z-10 mx-auto max-w-7xl">
            {/* Heading */}
            <div className="mb-12 md:text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                {pageCopy.pricingHeading}
              </h2>
              <p className="mt-4 text-lg text-secondary max-w-2xl mx-auto">
                {pageCopy.pricingDescription}
              </p>
            </div>

            {/* Value Stack — full-width moment, no card box */}
            <div className="mb-16 max-w-2xl mx-auto">
              <p className="text-[11px] text-white/30 uppercase tracking-[0.25em] font-bold text-center mb-6">What this system would cost you piece by piece</p>

              {/* Value items — single column, each line carries weight */}
              <div className="space-y-2.5 mb-6">
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
                  <div key={i} className="flex items-center justify-between gap-4 group">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-5 h-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                        <CheckIcon className="h-3 w-3 text-accent" />
                      </div>
                      <span className="text-[13px] sm:text-[14px] text-white/70">{row.item}</span>
                    </div>
                    <div className="h-px flex-1 bg-white/[0.04] min-w-[20px]" />
                    <span className="text-[13px] text-white/30 line-through whitespace-nowrap shrink-0 font-medium">{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Total line */}
              <div className="flex items-center justify-between border-t border-white/[0.06] pt-4 mb-8">
                <span className="text-[11px] text-white/40 uppercase tracking-[0.2em] font-bold">Total value</span>
                <span className="text-lg text-white/30 line-through font-bold">$18,000+/yr</span>
              </div>

            </div>

            {/* Plan Cards */}
            <div className="grid gap-8 lg:grid-cols-3 lg:gap-10 max-w-6xl mx-auto">
              {/* Starter Plan */}
              <GlassCard hover className="flex flex-col p-8">
                <div className="mb-6">
                  <p className="text-xs text-muted uppercase tracking-wider">Stop losing jobs to how you look</p>
                  <h3 className="text-xl font-semibold text-white mt-1">Starter</h3>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-xl text-white/50 line-through">$799</span>
                    <GlassPill variant="accent" className="text-[11px] py-0.5 px-2 uppercase tracking-wider">
                      BUILD WAIVED
                    </GlassPill>
                  </div>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">$99</span>
                    <span className="text-secondary">/mo</span>
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    Free custom website + the system that gets you calls — without paying for ads.
                  </p>
                </div>

                <ul className="mb-8 flex-1 space-y-2.5 text-sm text-secondary">
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
                    <li key={i} className="flex items-center gap-2.5">
                      <CheckIcon className="h-4 w-4 text-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <GlassButton
                  variant="secondary"
                  size="lg"
                  onClick={() => openUpsellModal("starter")}
                  loading={loadingPlan === "starter"}
                  className="w-full"
                >
                  Choose Starter
                </GlassButton>
              </GlassCard>

              {/* Growth Engine Plan */}
              <GlassCard variant="elevated" glow className="relative flex flex-col p-8 border-accent/30">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <GlassPill variant="accent" className="bg-accent text-black border-accent shadow-glow hover:bg-accent">
                    Most Popular
                  </GlassPill>
                </div>

                <div className="mb-6">
                  <p className="text-xs text-muted uppercase tracking-wider">Get found first. Get the call.</p>
                  <h3 className="text-xl font-semibold text-white mt-1">Growth Engine</h3>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-xl text-white/50 line-through">$1,999</span>
                    <GlassPill variant="accent" className="text-[11px] py-0.5 px-2 uppercase tracking-wider">
                      BUILD WAIVED
                    </GlassPill>
                  </div>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">$199</span>
                    <span className="text-secondary">/mo</span>
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    People search your service, find you first, and call you — not your competitor.
                  </p>
                </div>

                <ul className="mb-8 flex-1 space-y-2.5 text-sm text-secondary">
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
                    <li key={i} className="flex items-center gap-2.5">
                      <CheckIcon className="h-4 w-4 text-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <GlassButton
                  variant="primary"
                  size="lg"
                  onClick={() => openUpsellModal("growth")}
                  loading={loadingPlan === "growth"}
                  className="w-full"
                >
                  Choose Growth Engine
                </GlassButton>
              </GlassCard>

              {/* City Dominator */}
              <GlassCard hover className="flex flex-col p-8">
                <div className="mb-6">
                  <p className="text-xs text-muted uppercase tracking-wider">Every lead caught. Every city.</p>
                  <h3 className="text-xl font-semibold text-white mt-1">City Dominator</h3>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-xl text-white/50 line-through">$3,999</span>
                    <GlassPill variant="accent" className="text-[11px] py-0.5 px-2 uppercase tracking-wider">
                      BUILD WAIVED
                    </GlassPill>
                  </div>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">$399</span>
                    <span className="text-secondary">/mo</span>
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    Every lead caught, followed up, and tracked. You just do the work.
                  </p>
                </div>

                <ul className="mb-8 flex-1 space-y-2.5 text-sm text-secondary">
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
                    <li key={i} className="flex items-center gap-2.5">
                      <CheckIcon className="h-4 w-4 text-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <GlassButton
                  variant="secondary"
                  size="lg"
                  onClick={() => {
                    track('cta_click', {
                      cta_text: 'Choose City Dominator',
                      cta_location: 'pricing_dominator',
                      event_category: 'engagement',
                      event_label: 'dominator_checkout',
                    });
                    openUpsellModal("city_dominator");
                  }}
                  loading={loadingPlan === "city_dominator"}
                  className="w-full"
                >
                  Choose City Dominator
                </GlassButton>
              </GlassCard>
            </div>

            {/* Bottom strip — ROI + Guarantee + Call CTA — all compact */}
            <div className="mt-12 max-w-3xl mx-auto text-center space-y-6">
              <p className="text-base md:text-lg font-bold text-white leading-snug">
                One good job pays for this. <span className="text-accent">The real cost</span> is every call you are losing right now.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-secondary">
                <span className="flex items-center gap-1.5">
                  <CheckIcon className="h-4 w-4 text-accent" />
                  48h launch or first month free
                </span>
                <span className="hidden sm:block text-white/20">|</span>
                <span className="flex items-center gap-1.5">
                  <CheckIcon className="h-4 w-4 text-accent" />
                  No contracts
                </span>
                <span className="hidden sm:block text-white/20">|</span>
                <span className="flex items-center gap-1.5">
                  <CheckIcon className="h-4 w-4 text-accent" />
                  Cancel anytime
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 pt-2">
                <p className="text-sm text-white/40">Want help picking the right plan?</p>
                <a
                  href="https://calendly.com/quicklaunchweb/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    track('cta_click', {
                      cta_text: 'Book a quick call',
                      cta_location: 'pricing_bottom',
                      event_category: 'engagement',
                      event_label: 'pricing_book_call_cta',
                    });
                  }}
                >
                  <GlassButton
                    variant="ghost"
                    size="md"
                    icon={<ArrowRightIcon className="h-4 w-4" />}
                  >
                    Book a Quick Call
                  </GlassButton>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAQ Section ===== */}
        <section id="faq" className="relative px-6 pt-16 pb-24 md:pt-20 md:pb-32 overflow-hidden">
          <BGPattern variant="dots" mask="fade-center" size={32} fill="rgba(255,255,255,0.03)" />

          <div className="relative z-10 mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-white md:text-4xl">
              {pageCopy.faqHeading}
            </h2>

            {/* Search Bar - Sticky on scroll */}
            <div className="sticky top-4 z-20 mb-8">
              <div className="relative">
                <GlassCard className="p-4">
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5 text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search questions..."
                      value={faqSearch}
                      onChange={(e) => setFaqSearch(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-muted text-sm"
                    />
                    {faqSearch && (
                      <button
                        onClick={() => setFaqSearch("")}
                        className="text-muted hover:text-white transition-colors"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </GlassCard>
              </div>
            </div>

            {/* Category Filters */}
            <div className="mb-8 w-full overflow-hidden">
              <div className="flex items-center gap-0 text-sm overflow-x-auto scrollbar-hide pb-2 w-full max-w-full">
                {faqCategories.map((cat, index) => (
                  <button
                    key={cat.id}
                    onClick={() => setFaqCategory(cat.id)}
                    className={`px-4 py-1.5 transition-all duration-200 relative whitespace-nowrap flex-shrink-0 ${faqCategory === cat.id
                      ? "text-accent font-semibold"
                      : "text-secondary hover:text-white"
                      } ${index < faqCategories.length - 1
                        ? "border-r border-white/10"
                        : ""
                      }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtered FAQ List */}
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
                  <GlassCard className="p-8 text-center">
                    <p className="text-secondary">No questions found. Try adjusting your search or category filter.</p>
                  </GlassCard>
                );
              }

              return (
                <div className="space-y-3">
                  {filteredFaqs.map((item, i) => (
                    <details
                      key={i}
                      className="group rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm transition-all duration-200 open:bg-white/[0.05] hover:border-white/[0.12] hover:bg-white/[0.03]"
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
                      <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-white text-sm list-none">
                        <span className="pr-4">{item.q}</span>
                        <ChevronDownIcon className="h-4 w-4 text-muted transition-transform duration-200 group-open:rotate-180 shrink-0" />
                      </summary>
                      <div className="px-5 pb-5 text-sm text-secondary whitespace-pre-line leading-relaxed">
                        {item.a}
                      </div>
                    </details>
                  ))}
                </div>
              );
            })()}
          </div>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="relative border-t border-white/[0.06] bg-gradient-to-b from-transparent via-white/[0.01] to-transparent py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 md:grid-cols-[1.3fr_0.7fr_1fr]">
            <div>
              <Link href="/" className="flex items-center gap-1.5 font-bold tracking-tight">
                <span className="text-accent font-black text-xl">QL</span>
                <span className="text-white/20 font-light">|</span>
                <span className="text-white/90 text-lg">QuickLaunchWeb</span>
              </Link>
              <p className="mt-4 max-w-sm text-sm text-secondary leading-relaxed">
                {pageCopy.footerDescription}
              </p>
              <p className="mt-3 text-xs text-muted">
                {pageCopy.footerTagline}
              </p>
            </div>

            <div>
              <h2 className="text-xs font-semibold text-white uppercase tracking-wider">Explore</h2>
              <ul className="mt-4 space-y-3">
                <li><Link href="#features" className="text-sm text-secondary hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#work" className="text-sm text-secondary hover:text-white transition-colors">Recent Work</Link></li>
                <li><Link href="#how-it-works" className="text-sm text-secondary hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="#pricing" className="text-sm text-secondary hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/guides" className="text-sm text-secondary hover:text-white transition-colors">Guides</Link></li>
                <li><Link href="#faq" className="text-sm text-secondary hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/support" className="text-sm text-secondary hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-semibold text-white uppercase tracking-wider">Account</h2>
              <p className="mt-4 text-sm text-secondary leading-relaxed">
                Manage billing and subscriptions through Stripe.
              </p>
              <a
                href="https://billing.stripe.com/p/login/4gMbJ1dxi6CffXsg6R4c800"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open the Stripe customer portal"
                className="mt-4 inline-flex w-full items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.05] px-4 py-2 text-sm font-medium text-white/90 transition-all duration-200 ease-smooth hover:bg-white/[0.10] hover:border-white/[0.15] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Open Customer Portal
              </a>
              <p className="mt-3 text-[11px] text-muted">Use the email from your checkout.</p>
            </div>
          </div>

          <GlassDivider className="my-10" />

          <div className="flex flex-col items-center justify-between gap-4 md:flex-row text-muted">
            <p className="text-xs">(c) {year} QuickLaunchWeb. All rights reserved.</p>
            <div className="flex items-center gap-4 text-xs">
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/privacy#sms" className="hover:text-white transition-colors">SMS</Link>
              <Link href="/support" className="hover:text-white transition-colors">Support</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== Mobile Sticky CTA ===== */}
      <AnimatePresence>
        {showMobileCTA && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
            className="fixed bottom-6 inset-x-0 z-50 flex justify-center md:hidden pointer-events-none"
          >
            <div className="pointer-events-auto">
              <button
                onClick={() => {
                  track('cta_click', {
                    cta_text: 'Get Started',
                    cta_location: 'mobile_sticky',
                    event_category: 'engagement',
                    event_label: 'mobile_sticky_cta',
                  });
                  openPlanPicker();
                }}
                className="group flex items-center gap-2 rounded-full border border-white/[0.15] bg-black/60 px-6 py-3 text-sm font-medium text-white shadow-[0_0_30px_-5px_var(--color-accent)] backdrop-blur-md transition-all ease-smooth active:scale-95"
              >
                Get Started
                <svg className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Plan Picker Modal ===== */}
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
        <DialogContent className="max-w-md sm:max-w-lg p-0 overflow-hidden">
          <DialogCloseButton />

          <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-5 sm:pb-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white">Pick your plan</h3>
              <p className="mt-1.5 text-sm text-muted">Choose the one that fits where you are right now. You can upgrade anytime.</p>
            </div>

            <div className="space-y-4">
              {/* Starter */}
              <button
                onClick={() => {
                  setShowPlanPicker(false);
                  openUpsellModal("starter");
                }}
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5 text-left transition-all duration-200 hover:bg-white/[0.06] hover:border-white/[0.15] active:scale-[0.98]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-white text-base">Starter</p>
                    <p className="text-[13px] text-white/50 mt-1">Look professional. Start getting calls.</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-white">$99<span className="text-sm font-normal text-white/40">/mo</span></p>
                  </div>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {[
                    "Custom website that makes people call you",
                    "Shows up on Google searches",
                    "Hosting, speed, and security handled",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-white/40">
                      <CheckIcon className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </button>

              {/* Growth Engine — highlighted */}
              <button
                onClick={() => {
                  setShowPlanPicker(false);
                  openUpsellModal("growth");
                }}
                className="w-full rounded-xl border border-accent/40 bg-accent/[0.08] p-4 sm:p-5 text-left transition-all duration-200 hover:bg-accent/[0.12] hover:border-accent/50 active:scale-[0.98] relative"
              >
                <div className="absolute -top-2.5 left-4">
                  <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold text-black uppercase tracking-wider">Most Popular</span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-white text-base">Growth Engine</p>
                    <p className="text-[13px] text-white/50 mt-1">Get found first on Google. Get the call.</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-white">$199<span className="text-sm font-normal text-white/40">/mo</span></p>
                  </div>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {[
                    "Rank when people search your service + city",
                    "Google Business Profile fully built out",
                    "Reviews come in on autopilot after every job",
                    "Show up in AI search — ChatGPT, Siri, Google AI",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-white/40">
                      <CheckIcon className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </button>

              {/* City Dominator */}
              <button
                onClick={() => {
                  setShowPlanPicker(false);
                  openUpsellModal("city_dominator");
                }}
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5 text-left transition-all duration-200 hover:bg-white/[0.06] hover:border-white/[0.15] active:scale-[0.98]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-white text-base">City Dominator</p>
                    <p className="text-[13px] text-white/50 mt-1">Every lead caught. Every city covered.</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-white">$399<span className="text-sm font-normal text-white/40">/mo</span></p>
                  </div>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {[
                    "Missed calls get texted back automatically",
                    "Every lead tracked and followed up for you",
                    "New city pages every month to expand your reach",
                    "Full CRM — know exactly where every job comes from",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-white/40">
                      <CheckIcon className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </button>
            </div>

            <p className="mt-5 text-center text-xs text-muted">
              All plans include a free custom website. No contracts.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* ===== Upsell Modal — Quiz Flow ===== */}
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
        <DialogContent className="max-w-lg p-0 overflow-hidden">
          <DialogCloseButton />

          {/* Step label header */}
          <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-0">
            <div className="flex items-center gap-3 text-xs text-muted">
              <span className={upsellStep >= 1 ? "text-accent font-medium" : ""}>Setup</span>
              <span className="text-white/20">—</span>
              <span className={upsellStep >= 2 ? "text-accent font-medium" : ""}>Extras</span>
              <span className="text-white/20">—</span>
              <span className={upsellStep >= 3 ? "text-accent font-medium" : ""}>Checkout</span>
            </div>
          </div>

          <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-4">

          {/* Step 1: Domain */}
          {upsellStep === 1 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-white">Do you have a website address?</h3>
                <p className="mt-1 text-sm text-muted">Like <span className="text-white/60">yourbusiness.com</span></p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    track('checkout_domain_answered', {
                      plan: selectedPlan || 'unknown',
                      has_domain: true,
                      funnel_stage: 'checkout_setup',
                      event_category: 'checkout',
                    });
                    setAddOns({ ...addOns, hasDomain: true, domainRouting: null });
                  }}
                  className={`flex-1 rounded-xl border py-3.5 text-sm font-medium transition-all duration-200 ${addOns.hasDomain === true
                    ? "border-accent/50 bg-accent/10 text-accent"
                    : "border-white/[0.08] bg-white/[0.03] text-secondary hover:bg-white/[0.06] hover:border-white/[0.15]"
                    }`}
                >
                  Yes, I have one
                </button>
                <button
                  onClick={() => {
                    track('checkout_domain_answered', {
                      plan: selectedPlan || 'unknown',
                      has_domain: false,
                      funnel_stage: 'checkout_setup',
                      event_category: 'checkout',
                    });
                    setAddOns({ ...addOns, hasDomain: false, domainRouting: null });
                  }}
                  className={`flex-1 rounded-xl border py-3.5 text-sm font-medium transition-all duration-200 ${addOns.hasDomain === false
                    ? "border-accent/50 bg-accent/10 text-accent"
                    : "border-white/[0.08] bg-white/[0.03] text-secondary hover:bg-white/[0.06] hover:border-white/[0.15]"
                    }`}
                >
                  Not yet
                </button>
              </div>

              {addOns.hasDomain === true && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-white">Want us to set it up for you?</p>
                  <GlassSelect
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
                    priceColor="accent"
                  />
                  <GlassSelect
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
                    priceColor="success"
                  />
                </div>
              )}

              {addOns.hasDomain === false && (
                <p className="text-sm text-accent">
                  No worries — we&apos;ll send you a quick guide to get one. It only takes a couple minutes.
                </p>
              )}

              {checkoutError && (
                <p className="text-sm text-red-400">{checkoutError}</p>
              )}

              <GlassButton
                variant="primary"
                size="lg"
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
              </GlassButton>
            </div>
          )}

          {/* Step 2: Add-ons */}
          {upsellStep === 2 && (
            <div className="space-y-0">
              {/* YOUR PRICE — big, unmissable */}
              <div className="text-center pb-5">
                <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-1">Your price</p>
                <p className="text-3xl font-bold text-white tracking-tight">${selectedPlanDetails ? selectedPlanDetails.monthlyPrice : 0}<span className="text-base font-normal text-white/40">/mo</span></p>
                <p className="text-sm text-white/50 mt-1">{selectedPlanDetails?.label} plan — website included free</p>
              </div>

              {/* Hard visual break */}
              <div className="border-t border-dashed border-white/[0.12] pt-5 space-y-4">
                <div>
                  <p className="text-xs font-medium text-white/40 uppercase tracking-wider">Optional extras</p>
                  <p className="text-xs text-white/30 mt-0.5">You don&apos;t need any of these. Your price above stays the same.</p>
                </div>

                <div className="space-y-2">
                  {/* Starter add-ons */}
                  {selectedPlan === "starter" && (
                    <>
                      <GlassSelect
                        selected={addOns.textAlerts}
                        onClick={() => {
                          const newValue = !addOns.textAlerts;
                          trackAddonToggled('Instant Lead Texts', 29, newValue ? 'added' : 'removed', 'starter');
                          setAddOns({ ...addOns, textAlerts: newValue });
                        }}
                        label="Instant Lead Texts"
                        description="When someone reaches out, they get a text back right away and you get notified."
                        price="+ $29/mo"
                        priceColor="accent"
                      />
                      <GlassSelect
                        selected={addOns.googleBoost}
                        onClick={() => {
                          const newValue = !addOns.googleBoost;
                          trackAddonToggled('Google Business Setup', 199, newValue ? 'added' : 'removed', 'starter');
                          setAddOns({ ...addOns, googleBoost: newValue });
                        }}
                        label="Google Business Setup"
                        description="We build out your full Google Business Profile so you show up on Google Maps."
                        price="$199 (just once)"
                        priceColor="accent"
                      />
                      <GlassSelect
                        selected={addOns.photoShoot}
                        onClick={() => {
                          const newValue = !addOns.photoShoot;
                          trackAddonToggled('Professional Photo Shoot', 299, newValue ? 'added' : 'removed', 'starter');
                          setAddOns({ ...addOns, photoShoot: newValue });
                        }}
                        label="Professional Photo Shoot"
                        description="We send a photographer to your job site. Pro photos for your website and Google profile."
                        price="$299 (just once)"
                        priceColor="accent"
                      />
                    </>
                  )}

                  {/* Growth add-ons */}
                  {selectedPlan === "growth" && (
                    <>
                      <GlassSelect
                        selected={addOns.photoShoot}
                        onClick={() => {
                          const newValue = !addOns.photoShoot;
                          trackAddonToggled('Professional Photo Shoot', 299, newValue ? 'added' : 'removed', 'growth');
                          setAddOns({ ...addOns, photoShoot: newValue });
                        }}
                        label="Professional Photo Shoot"
                        description="We send a photographer to your job site. Pro photos for your website and Google profile."
                        price="$299 (just once)"
                        priceColor="accent"
                      />
                      <GlassSelect
                        selected={addOns.adCreative}
                        onClick={() => {
                          const newValue = !addOns.adCreative;
                          trackAddonToggled('Ad Creative Package', 499, newValue ? 'added' : 'removed', 'growth');
                          setAddOns({ ...addOns, adCreative: newValue });
                        }}
                        label="Ad Creative Package"
                        description="3 short videos + scripts you can use for ads, social posts, or anything else. Shot and edited by us."
                        price="$499 (just once)"
                        priceColor="accent"
                      />
                    </>
                  )}

                  {/* City Dominator add-ons */}
                  {selectedPlan === "city_dominator" && (
                    <>
                      <GlassSelect
                        selected={addOns.brandPackage}
                        onClick={() => {
                          const newValue = !addOns.brandPackage;
                          trackAddonToggled('Brand Content Package', 799, newValue ? 'added' : 'removed', 'city_dominator');
                          setAddOns({ ...addOns, brandPackage: newValue });
                        }}
                        label="Brand Content Package"
                        description="Full photo shoot + 3 videos + ad creatives. Everything you need to look like the top company in your area."
                        price="$799 (just once)"
                        priceColor="accent"
                      />
                      <GlassSelect
                        selected={addOns.adsCall}
                        onClick={() => {
                          const newValue = !addOns.adsCall;
                          trackAddonToggled('Ads Consultation', 0, newValue ? 'added' : 'removed', 'city_dominator');
                          setAddOns({ ...addOns, adsCall: newValue });
                        }}
                        label="Want even more leads?"
                        description="Book a quick call about running Facebook or Google ads. We'll put together a plan for you."
                        price="Free"
                        priceColor="success"
                      />
                    </>
                  )}
                </div>

                {/* Running total */}
                {calculateTotal().oneTime > 0 && (
                  <div className="border-t border-white/[0.08] pt-3 space-y-1.5">
                    {addOns.textAlerts && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-accent font-semibold">With extras, you&apos;ll pay</span>
                        <span className="text-accent text-base font-bold">${calculateTotal().monthly}/mo</span>
                      </div>
                    )}
                    {addOns.domainRouting === "us" && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted">Domain setup (charged once)</span>
                        <span className="text-white/60">$99</span>
                      </div>
                    )}
                    {addOns.googleBoost && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted">Google Business Setup (charged once)</span>
                        <span className="text-white/60">$199</span>
                      </div>
                    )}
                    {addOns.photoShoot && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted">Photo Shoot (charged once)</span>
                        <span className="text-white/60">$299</span>
                      </div>
                    )}
                    {addOns.adCreative && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted">Ad Creative Package (charged once)</span>
                        <span className="text-white/60">$499</span>
                      </div>
                    )}
                    {addOns.brandPackage && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted">Brand Content Package (charged once)</span>
                        <span className="text-white/60">$799</span>
                      </div>
                    )}
                  </div>
                )}
                {addOns.textAlerts && calculateTotal().oneTime === 0 && (
                  <div className="border-t border-white/[0.08] pt-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-accent font-semibold">With extras, you&apos;ll pay</span>
                      <span className="text-accent text-base font-bold">${calculateTotal().monthly}/mo</span>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-1">
                  <button
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
                    className="rounded-xl border border-white/[0.08] bg-white/[0.03] py-3 px-4 sm:px-5 text-sm font-medium text-secondary transition-all duration-200 hover:bg-white/[0.06]"
                  >
                    Back
                  </button>
                  <GlassButton
                    variant="primary"
                    size="lg"
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
                  </GlassButton>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Summary + Billing + Checkout */}
          {upsellStep === 3 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-white">Here&apos;s what you&apos;re paying</h3>
                <p className="mt-1 text-sm text-muted">This is everything. No surprises, no extra charges.</p>
              </div>

              {/* Monthly price breakdown */}
              <div className="space-y-2.5">
                <p className="text-xs font-medium text-white/40 uppercase tracking-wider">Your monthly price</p>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-white">{selectedPlanDetails ? selectedPlanDetails.label : "Starter"} plan</span>
                  <span className="text-white font-medium tabular-nums">${selectedPlanDetails ? selectedPlanDetails.monthlyPrice : 0}</span>
                </div>

                {addOns.textAlerts && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">Instant Lead Texts</span>
                    <span className="text-white/70 tabular-nums">$29</span>
                  </div>
                )}
                {addOns.textAlerts && (
                  <div className="border-t border-white/[0.1] pt-2 flex items-center justify-between text-sm">
                    <span className="text-white font-semibold">Total</span>
                    <span className="text-white font-bold tabular-nums">${calculateTotal().monthly}/mo</span>
                  </div>
                )}
              </div>

              {/* Billing choice — clean radio-style options */}
              <div className="border-t border-white/[0.1] pt-4 space-y-2">
                <p className="text-sm font-medium text-white">How would you like to pay?</p>

                {/* Monthly option */}
                <button
                  onClick={() => {
                    track('checkout_billing_cycle_selected', {
                      plan: selectedPlan || 'unknown',
                      billing_cycle: 'monthly',
                      funnel_stage: 'checkout_summary',
                      event_category: 'checkout',
                    });
                    setAddOns({ ...addOns, billingCycle: "monthly" });
                  }}
                  className={`w-full flex items-start gap-3 rounded-lg p-3 text-left transition-all duration-200 ${addOns.billingCycle === "monthly"
                    ? "bg-white/[0.05]"
                    : "hover:bg-white/[0.03]"
                    }`}
                >
                  <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${addOns.billingCycle === "monthly" ? "border-accent" : "border-white/30"}`}>
                    {addOns.billingCycle === "monthly" && <div className="h-2 w-2 rounded-full bg-accent" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${addOns.billingCycle === "monthly" ? "text-white" : "text-white/80"}`}>Month-to-month</span>
                      <span className={`text-sm font-bold tabular-nums ${addOns.billingCycle === "monthly" ? "text-white" : "text-white/80"}`}>
                        ${calculateTotal().monthly}/mo
                      </span>
                    </div>
                    <p className="text-xs text-muted mt-0.5">Cancel anytime, no commitment</p>
                  </div>
                </button>

                {/* Upfront option */}
                <button
                  onClick={() => {
                    track('checkout_billing_cycle_selected', {
                      plan: selectedPlan || 'unknown',
                      billing_cycle: 'upfront',
                      funnel_stage: 'checkout_summary',
                      event_category: 'checkout',
                    });
                    setAddOns({ ...addOns, billingCycle: "upfront" });
                  }}
                  className={`w-full flex items-start gap-3 rounded-lg p-3 text-left transition-all duration-200 ${addOns.billingCycle === "upfront"
                    ? "bg-white/[0.05]"
                    : "hover:bg-white/[0.03]"
                    }`}
                >
                  <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${addOns.billingCycle === "upfront" ? "border-accent" : "border-white/30"}`}>
                    {addOns.billingCycle === "upfront" && <div className="h-2 w-2 rounded-full bg-accent" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${addOns.billingCycle === "upfront" ? "text-white" : "text-white/80"}`}>Pay 3 months, get 1 free</span>
                        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">Save ${calculateTotal().upfrontSavings}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted mt-0.5">
                      ${calculateTotal().monthly} x 3 = ${calculateTotal().upfrontTotal} · Then ${calculateTotal().monthly}/mo from month 5
                    </p>
                  </div>
                </button>
              </div>

              {/* Due today breakdown — always visible, clearly separated */}
              <div className="border-t border-white/[0.1] pt-4 space-y-2">
                <p className="text-xs font-medium text-white/40 uppercase tracking-wider">Due today</p>

                {addOns.billingCycle === "monthly" ? (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">First month</span>
                    <span className="text-white tabular-nums">${calculateTotal().monthly}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">3 months upfront</span>
                    <span className="text-white tabular-nums">${calculateTotal().upfrontTotal}</span>
                  </div>
                )}

                {addOns.domainRouting === "us" && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">Domain setup <span className="text-white/30">(once)</span></span>
                    <span className="text-white/70 tabular-nums">$99</span>
                  </div>
                )}
                {addOns.googleBoost && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">Google Business Setup <span className="text-white/30">(once)</span></span>
                    <span className="text-white/70 tabular-nums">$199</span>
                  </div>
                )}
                {addOns.photoShoot && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">Photo Shoot <span className="text-white/30">(once)</span></span>
                    <span className="text-white/70 tabular-nums">$299</span>
                  </div>
                )}
                {addOns.adCreative && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">Ad Creative Package <span className="text-white/30">(once)</span></span>
                    <span className="text-white/70 tabular-nums">$499</span>
                  </div>
                )}
                {addOns.brandPackage && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">Brand Content Package <span className="text-white/30">(once)</span></span>
                    <span className="text-white/70 tabular-nums">$799</span>
                  </div>
                )}

                <div className="border-t border-white/[0.1] pt-2 flex items-center justify-between">
                  <span className="text-sm font-bold text-accent">Total charged today</span>
                  <span className="text-xl font-bold text-accent tabular-nums">
                    ${(addOns.billingCycle === "upfront" ? calculateTotal().upfrontTotal : calculateTotal().monthly) + calculateTotal().oneTime}
                  </span>
                </div>

                {addOns.billingCycle === "monthly" && (
                  <p className="text-xs text-white/30">Then ${calculateTotal().monthly}/mo after that. Cancel anytime.</p>
                )}
                {addOns.billingCycle === "upfront" && (
                  <p className="text-xs text-white/30">Month 4 is free. Then ${calculateTotal().monthly}/mo from month 5.</p>
                )}
              </div>

              {checkoutError && (
                <p className="text-sm text-red-400">{checkoutError}</p>
              )}

              {/* Checkout button + trust */}
              <div className="pt-2 space-y-3">
                <div className="flex gap-3">
                  <button
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
                    className="rounded-xl border border-white/[0.08] bg-white/[0.03] py-3 px-4 sm:px-5 text-sm font-medium text-secondary transition-all duration-200 hover:bg-white/[0.06]"
                  >
                    Back
                  </button>
                  <GlassButton
                    variant="primary"
                    size="lg"
                    className="flex-1"
                    onClick={handleUpsellContinue}
                    loading={loadingPlan !== null}
                  >
                    Go to payment — ${(addOns.billingCycle === "upfront"
                      ? calculateTotal().upfrontTotal
                      : calculateTotal().monthly
                    ) + calculateTotal().oneTime}
                  </GlassButton>
                </div>

                <div className="flex items-center justify-center gap-4 text-[11px] text-white/30">
                  <div className="flex items-center gap-1">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>256-bit SSL</span>
                  </div>
                  <span className="text-white/15">|</span>
                  <span>Powered by Stripe</span>
                  <span className="text-white/15">|</span>
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          )}

          </div>
        </DialogContent>
      </Dialog>

      {/* ===== Custom Website Modal ===== */}
      < Dialog
        open={showCustomModal}
        onOpenChange={(open) => {
          setShowCustomModal(open);
          if (!open) {
            setCustomError("");
            setCustomSuccess("");
          }
        }
        }
      >
        <DialogContent>
          <DialogCloseButton />

          <DialogHeader>
            <DialogTitle>Custom Website Request</DialogTitle>
            <DialogDescription>
              Tell us what you need and we&apos;ll reach out to book a call.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitCustomRequest();
            }}
            className="space-y-3"
          >
            <GlassInput
              type="text"
              value={customForm.name}
              onChange={(e) =>
                setCustomForm((prev) => ({ ...prev, name: e.target.value }))
              }
              onFocus={trackCustomFormStart}
              placeholder="Full Name *"
            />
            <GlassInput
              type="email"
              value={customForm.email}
              onChange={(e) =>
                setCustomForm((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="Email *"
            />
            <GlassInput
              type="tel"
              value={customForm.phone}
              onChange={(e) =>
                setCustomForm((prev) => ({ ...prev, phone: e.target.value }))
              }
              placeholder="Phone (optional)"
            />
            <GlassInput
              type="text"
              value={customForm.company}
              onChange={(e) =>
                setCustomForm((prev) => ({ ...prev, company: e.target.value }))
              }
              placeholder="Company (optional)"
            />
            <GlassInput
              type="text"
              value={customForm.website}
              onChange={(e) =>
                setCustomForm((prev) => ({ ...prev, website: e.target.value }))
              }
              placeholder="Current Website (e.g., example.com or www.example.com)"
            />
            <textarea
              value={customForm.details}
              onChange={(e) =>
                setCustomForm((prev) => ({ ...prev, details: e.target.value }))
              }
              placeholder="Project details, goals, and required integrations"
              rows={4}
              className="w-full rounded-xl border bg-white/[0.03] backdrop-blur-sm px-4 py-3 text-sm text-white placeholder:text-white/30 border-white/[0.08] hover:border-white/[0.15] focus:border-accent/50 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-accent/20 focus:ring-offset-0 transition-all duration-200 ease-smooth"
            />

            {customError && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {customError}
              </div>
            )}
            {customSuccess && (
              <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                {customSuccess}
              </div>
            )}

            <GlassButton
              variant="primary"
              size="lg"
              type="submit"
              loading={customLoading}
              className="w-full"
            >
              Request a Call
            </GlassButton>
          </form>

          <p className="text-xs text-muted text-center mt-3">
            We will reply within 1 business day.
          </p>
        </DialogContent>
      </Dialog >
    </div >
  );
}
