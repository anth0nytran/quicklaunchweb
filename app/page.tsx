"use client";

import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BGPattern } from "@/components/ui/bg-pattern";
import { SocialProofSection } from "@/components/social-proof";
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

type Plan = "starter" | "pro";

type AddOns = {
  hasDomain: boolean | null;
  domainRouting: "us" | "self" | null;
  textAlerts: boolean;
  unlimitedEdits: boolean;
  googleBoost: boolean;
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
  mobile: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
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
  heroPill: "48-HOUR WEBSITES FOR CONTRACTORS. $0 TO BUILD.",
  heroHeading: (
    <>
      Every Day Without a Website,{" "}
      <span
        className="text-transparent bg-clip-text"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(var(--color-accent-rgb)), rgb(var(--color-accent-gradient-to)))",
        }}
      >
        <br className="hidden md:block" />
        You're Paying Your Competitors.
      </span>
    </>
  ),
  heroBullets: [
    "Built by hand. Live in 48 hours. Not a template.",
    "Tap-to-call + quote forms that ring your phone.",
    "$99/mo. One job covers the whole year. Cancel anytime.",
  ],
  features: [
    {
      title: "One Tap to Call You.",
      desc: "If people can't call you in 3 seconds, they leave. Your site has tap-to-call, quote forms, and zero dead ends.",
      icon: featureIcons.mobile,
    },
    {
      title: "Loads Fast. Keeps Customers.",
      desc: "Slow sites lose money. Every extra second costs you 7 out of 100 visitors. Your site loads in under 2 seconds.",
      icon: featureIcons.lightning,
    },
    {
      title: "Show Up When People Search",
      desc: "When someone Googles \"contractor near me\" — you show up. Not the guy who paid $3,000 for a worse site.",
      icon: featureIcons.search,
    },
  ],
  featureHeading: (
    <>
      A pretty website is <span className="text-accent">worthless</span>.
      <br />One that books jobs <span className="text-accent">isn't</span>.
    </>
  ),
  featureDescription:
    "Most designers build something nice to look at. We build something that makes your phone ring.",
  bestFor: [
    "Contractors & home service pros",
    "Local businesses that want more calls",
    "Anyone tired of a site that does nothing",
  ],
  deliverables: [
    { label: "01", title: "Works on every phone — that's where your customers are", detail: "Tap-to-call ready" },
    { label: "02", title: "Messages go right to your inbox", detail: "Quote form included" },
    { label: "03", title: "Google finds you before the other guy", detail: "Local SEO built in" },
    { label: "04", title: "Opens fast — no waiting, no spinning wheel", detail: "Speed + SSL included" },
    { label: "05", title: "Live and landing you jobs while you sleep", detail: "Launched in 48 hours" },
    { label: "06", title: "We keep it running. You do the work.", detail: "Ongoing support" },
  ],
  deliverablesHeading: (
    <>
      In <span className="text-accent">48 Hours</span>, You're Taking Calls
    </>
  ),
  deliverablesDescription:
    "No \"we'll have mockups in 2 weeks.\" Your site is live and getting leads while your competitors are still picking fonts.",
  steps: [
    { step: "01", title: "Pick a Plan (60 seconds)", desc: "No pitches. No \"discovery calls.\" Pick your plan, pay, and we start building that day." },
    { step: "02", title: "Send Us the Basics", desc: "Your services, area, photos, and contact info. Takes 5 minutes. That's the last thing you do." },
    { step: "03", title: "We Launch. You Get Customers.", desc: "48 hours later your site is live on Google. We handle the rest — you just answer the phone." },
  ],
  stats: [
    { value: "FREE", label: "Website Build" },
    { value: "48h", label: "Launch Time" },
    { value: "$99", label: "/mo Hosting" },
    { value: "Unlimited", label: "Cancel Anytime" },
  ],
  pricingEyebrow:
    "You wouldn't pay $2,000 for a sign that doesn't bring in foot traffic",
  pricingHeading: "$0 to build. $99/mo to keep it making you money.",
  pricingDescription:
    "Most agencies charge $1,500+ upfront for a site that just sits there. We build yours free. You only pay if it's working. Cancel the second it's not.",
  proHelperHeading: "Go Pro if you want to win more jobs:",
  proHelperItems: [
    "You offer multiple services (rank for all of them)",
    "You want to outrank competitors on Google",
    "You want to know exactly where leads come from",
  ],
  starterHelperHeading: "Starter works if:",
  starterHelperItems: [
    "You just need something live that gets calls",
    "You want the lowest monthly investment",
  ],
  guidesHeading: "Free Playbooks That Actually Work",
  guidesDescription:
    "No fluff. No sign-up walls. Short guides that show you how to get more customers.",
  faqHeading: "Frequently Asked Questions",
  footerDescription:
    "Websites that make local businesses money. Built in 48 hours. No upfront cost.",
  footerTagline: "Your next customer is Googling you right now.",
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
    "$99/mo. If it does not help, cancel",
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
  pricingHeading: "$0 down. $99/mo. Get a site that helps you win more jobs.",
  pricingDescription:
    "Most agencies ask for a big payment first. We build your site first. Then you pay monthly.",
  proHelperHeading: "Go Pro if:",
  proHelperItems: [
    "You want more than one page",
    "You offer more than one service",
    "You want call and form tracking",
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

              {/* Pro Plan - Gets selected */}
              <div className="animate-proBreath" style={{ animationDelay: '1.1s' }}>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 relative overflow-hidden pro-card animate-proSelect" style={{ animationDelay: '0.9s', animationFillMode: 'both' }}>
                  <div className="relative flex items-center justify-between pr-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-white">Pro</p>
                        <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-accent text-black">
                          POPULAR
                        </span>
                      </div>
                      <p className="text-xs text-muted">3-page site</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-accent">$149</span>
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
            {['3-page website', 'Free build included', 'Cancel anytime'].map((item, i) => (
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
    <section id="how-it-works" className="relative px-6 pt-16 pb-20 md:pt-20 md:pb-24 allow-motion">
      <AmbientGlow color="accent" position="center" intensity="subtle" />
      <BGPattern variant="dots" mask="fade-center" size={32} fill="rgba(255,255,255,0.03)" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left side - Steps */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              3 steps. 48 hours.<br />
              <span className="text-muted">You&apos;re live.</span>
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
    hasDomain: null,
    domainRouting: null,
    textAlerts: false,
    unlimitedEdits: false,
    googleBoost: false,
  });
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customForm, setCustomForm] = useState<CustomForm>(createEmptyCustomForm());
  const [customLoading, setCustomLoading] = useState(false);
  const [customError, setCustomError] = useState("");
  const [customSuccess, setCustomSuccess] = useState("");

  // FAQ search and filter state
  const [faqSearch, setFaqSearch] = useState("");
  const [faqCategory, setFaqCategory] = useState("all");

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

  // Open upsell modal
  const openUpsellModal = (plan: Plan) => {
    trackPlanSelected(plan, 'homepage_pricing');
    setSelectedPlan(plan);
    setCheckoutError("");
    setAddOns({
      hasDomain: null,
      domainRouting: null,
      textAlerts: false,
      unlimitedEdits: false,
      googleBoost: false,
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
    const basePrices = { starter: 99, pro: 149 };
    let monthly = selectedPlan ? basePrices[selectedPlan] : 0;

    if (addOns.textAlerts) monthly += 29;
    if (addOns.unlimitedEdits) monthly += 49;

    let oneTime = addOns.googleBoost ? 199 : 0;
    if (addOns.domainRouting === "us") oneTime += 99;

    return { monthly, oneTime };
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

    if (addOns.hasDomain === null) {
      setCheckoutError("Please select whether you have a domain.");
      return;
    }
    if (addOns.hasDomain && addOns.domainRouting === null) {
      setCheckoutError("Please select who will handle domain routing.");
      return;
    }
    if (selectedPlan) {
      // Track checkout initiation with add-ons and total value
      const { monthly, oneTime } = calculateTotal();
      const selectedAddons = [];
      if (addOns.textAlerts) selectedAddons.push('text_alerts');
      if (addOns.unlimitedEdits) selectedAddons.push('unlimited_edits');
      if (addOns.googleBoost) selectedAddons.push('google_boost');
      if (addOns.domainRouting === 'us') selectedAddons.push('domain_routing');

      trackCheckoutInitiated(selectedPlan, monthly + oneTime, selectedAddons);

      setShowUpsellModal(false);
      startCheckout(selectedPlan);
    }
  }, [addOns, selectedPlan, startCheckout, calculateTotal, trackCheckoutInitiated]);

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

  const customWebsiteFeatures = [
    "Full multi-page website",
    "Custom design + your branding",
    "Tools that talk to each other",
    "Online store + payments",
    "Client logins or dashboards",
    "Booking + CRM setup",
    "SEO + tracking built in",
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
    <div className="flex min-h-screen flex-col font-sans relative">
      <FAQSchema />
      {/* ===== Navbar ===== */}
      <Navigation onOpenUpsellModal={openUpsellModal} />

      <main className="flex-1">
        {/* ===== Hero Section ===== */}
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#020202] px-4 pb-16 pt-24 md:px-6 md:pb-28 md:pt-52">
          {/* Experience Hero Background */}
          {isHoustonLanding ? <GlobeBackground /> : <ExperienceHeroBackground />}

          <div className="relative z-10 flex w-full max-w-full flex-col items-center">
            {/* Status pill */}
            <GlassPill
              variant="accent"
              pulse
              className="mb-8 inline-flex max-w-[calc(100%-1rem)] sm:max-w-full items-center rounded-2xl px-3 py-2 text-center text-[10px] font-semibold tracking-wide leading-relaxed whitespace-normal md:mb-10 md:rounded-full md:px-5 md:py-2 md:text-sm md:leading-normal"
            >
              <span className="flex-1 text-balance">
                {pageCopy.heroPill}
              </span>
            </GlassPill>

            {/* Headline */}
            <h1 className="mx-auto max-w-5xl px-0 text-center text-4xl/tight font-extrabold tracking-tight text-white text-balance sm:text-5xl md:text-6xl lg:text-7xl">
              {pageCopy.heroHeading}
            </h1>

            {/* Subhead - Centered bullet points */}
            <div className="mx-auto mt-6 w-full max-w-2xl px-2 md:mt-8 md:px-0">
              <ul className="space-y-4 text-sm font-medium text-white/80 md:text-base lg:text-lg">
                {pageCopy.heroBullets.map((item, idx) => (
                  <li key={idx} className="flex items-start justify-start gap-3 md:items-center md:justify-center text-left md:text-center">
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent md:mt-0" />
                    <span className="text-balance">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex w-full max-w-[calc(100%-2rem)] flex-col items-stretch gap-4 sm:max-w-none sm:flex-row sm:justify-center">
              <GlassButton
                variant="primary"
                size="lg"
                onClick={() => {
                  track('cta_click', {
                    cta_text: 'Start My Free Website',
                    cta_location: 'hero',
                    event_category: 'engagement',
                    event_label: 'hero_primary_cta',
                  });
                  openUpsellModal("starter");
                }}
                loading={loadingPlan === "starter"}
                icon={<ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                className="group w-full sm:w-auto text-base py-4 md:py-4 md:px-8"
              >
                Start My Free Website
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
            <p className="mt-6 max-w-xs text-balance text-center text-[13px] text-muted sm:max-w-none sm:text-sm">
              60 seconds to start. No sales calls. No hoops.
            </p>

            {/* Client logo marquee - Static Layout */}
            <div className="mt-14 pt-8 border-t border-white/[0.06] w-full relative">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted text-center mb-6">
                Recent Launches
              </p>

              {/* Fade masks for horizontal scrolling on mobile */}
              <div className="absolute left-0 top-[60px] bottom-0 w-8 bg-gradient-to-r from-[#020202] to-transparent z-10 pointer-events-none md:hidden" />
              <div className="absolute right-0 top-[60px] bottom-0 w-8 bg-gradient-to-l from-[#020202] to-transparent z-10 pointer-events-none md:hidden" />

              <div className="w-full">
                <div className="flex flex-nowrap w-full items-center md:justify-between gap-5 md:gap-5 overflow-x-auto scrollbar-hide px-4 py-2 md:px-0 md:py-0">
                  {[
                    { src: "/logos/elitehomerepairs.png", alt: "Elite Home Repairs", hasBg: false, h: "h-8 md:h-9", mw: "max-w-[70px] md:max-w-[85px]" },
                    { src: "/logos/madenewpressure.svg", alt: "Made New Pressure Washing", hasBg: false, h: "h-10 md:h-12", mw: "max-w-[70px] md:max-w-[85px]" },
                    { src: "/logos/jnornamentaldesign.svg", alt: "JN Ornamental Design", hasBg: false, h: "h-10 md:h-12", mw: "max-w-[70px] md:max-w-[85px]" },
                    { src: "/logos/3dfencing.png", alt: "3D Fencing", hasBg: false, h: "h-8 md:h-9", mw: "max-w-[70px] md:max-w-[85px]" },
                    { src: "/logos/anpaintingrenovations.png", alt: "AN Painting Renovations", hasBg: true, h: "h-10 md:h-12", mw: "max-w-[70px] md:max-w-[85px]" },
                    { src: "/logos/alvarez_pool_logo_transparent.png", alt: "Alvarez Pool Service", hasBg: false, h: "h-10 md:h-12", mw: "max-w-[70px] md:max-w-[85px]" },
                    { src: "/logos/jimenezjunkremoval.png", alt: "Jimenez Junk Removal", hasBg: false, h: "h-6 md:h-7", mw: "max-w-[90px] md:max-w-[100px]" },
                    { src: "/logos/JimenezTreePro.png", alt: "Jimenez Tree Pro", hasBg: false, h: "h-10 md:h-12", mw: "max-w-[70px] md:max-w-[85px]" },
                    { src: "/logos/mcmillianjunkremoval.png", alt: "McMillian Junk Removal", hasBg: true, h: "h-10 md:h-12", mw: "max-w-[70px] md:max-w-[85px]" },
                    { src: "/logos/landeroselectrical.png", alt: "Landeros Electrical", hasBg: false, h: "h-8 md:h-10", mw: "max-w-[70px] md:max-w-[85px]" },
                    { src: "/logos/jacksoldbytoro.png", alt: "The Toro Group", hasBg: false, h: "h-10 md:h-12", mw: "max-w-[70px] md:max-w-[85px]" },
                    { src: "/logos/tomi.png", alt: "Tomi Jewelry", hasBg: false, h: "h-10 md:h-12", mw: "max-w-[70px] md:max-w-[85px]" },
                    { src: "/logos/becreativesco.jpg", alt: "Becreativesco", hasBg: true, h: "h-10 md:h-10", mw: "max-w-[70px] md:max-w-[85px]" },
                  ].map((logo) => (
                    <div key={logo.alt} className="flex items-center justify-center shrink-0 w-auto">
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className={`${logo.h} ${logo.mw} w-auto object-contain opacity-70 ${logo.hasBg ? "rounded" : ""}`}
                      />
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
            <div className="mb-16 md:text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                {pageCopy.featureHeading}
              </h2>
              <p className="mt-4 text-lg text-secondary md:mx-auto md:max-w-2xl">
                {pageCopy.featureDescription}
              </p>
              <div className="mt-6 md:mx-auto md:max-w-4xl">
                <p className="text-xs uppercase tracking-widest text-muted mb-4">Best for</p>
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-secondary">
                  {pageCopy.bestFor.map((item) => (
                    <span key={item} className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-accent" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3 md:gap-8">
              {features.map((feature, i) => (
                <SpotlightCard
                  key={i}
                  className="p-8 border-white/[0.08] bg-white/[0.03] backdrop-blur-md"
                  spotlightColor="rgba(var(--color-accent-rgb), 0.15)"
                >
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="text-secondary leading-relaxed">{feature.desc}</p>
                </SpotlightCard>
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
                    Launch timeline
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
              <p className="text-[11px] text-white/30 uppercase tracking-[0.25em] font-bold text-center mb-6">What this would cost you anywhere else</p>

              {/* Value items — single column, each line carries weight */}
              <div className="space-y-2.5 mb-6">
                {[
                  { item: 'Custom website (not a template)', value: '$3,000–5,000' },
                  { item: 'Works on phones + tap-to-call', value: '$500' },
                  { item: 'Shows up on Google', value: '$1,500' },
                  { item: 'Hosting + security', value: '$300/yr' },
                  { item: 'Updates + support', value: '$200/mo' },
                  { item: 'Quote forms that send you leads', value: '$500' },
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
                <span className="text-lg text-white/30 line-through font-bold">$5,800+</span>
              </div>

            </div>

            {/* Plan Cards */}
            <div className="grid gap-8 lg:grid-cols-3 lg:gap-10 max-w-6xl mx-auto">
              {/* Starter Plan */}
              <GlassCard hover className="flex flex-col p-8">
                <div className="mb-6">
                  <p className="text-xs text-muted uppercase tracking-wider">Basic Presence</p>
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
                    One page. Makes your phone ring. Cancel anytime.
                  </p>
                </div>

                <ul className="mb-8 flex-1 space-y-2.5 text-sm text-secondary">
                  {[
                    "Free build (waived)",
                    "Hosting + site care included",
                    "Built for phones first",
                    "Fast load speed",
                    "Shows up on Google",
                    "1 content change / month",
                    "6-month site checkup",
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
                  Start My Free Website
                </GlassButton>
              </GlassCard>

              {/* Pro Plan */}
              <GlassCard variant="elevated" glow className="relative flex flex-col p-8 border-accent/30">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <GlassPill variant="accent" className="bg-accent text-black border-accent shadow-glow">
                    Best Value
                  </GlassPill>
                </div>

                <div className="mb-6">
                  <p className="text-xs text-muted uppercase tracking-wider">3-Page Lead System</p>
                  <h3 className="text-xl font-semibold text-white mt-1">Pro</h3>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-xl text-white/50 line-through">$1,499</span>
                    <GlassPill variant="accent" className="text-[11px] py-0.5 px-2 uppercase tracking-wider">
                      BUILD WAIVED
                    </GlassPill>
                  </div>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">$149</span>
                    <span className="text-secondary">/mo</span>
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    3 pages. More services. Rank higher. Cancel anytime.
                  </p>
                </div>

                <ul className="mb-8 flex-1 space-y-2.5 text-sm text-secondary">
                  {[
                    "Everything in Starter",
                    "3 pages (Home + Services + Contact)",
                    "Stronger Google rankings",
                    "Call + form tracking set up",
                    "See where your leads come from",
                    "Faster edits (24-48h turnaround)",
                    "3 content changes / month",
                    "Site checkup every quarter",
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
                  onClick={() => openUpsellModal("pro")}
                  loading={loadingPlan === "pro"}
                  className="w-full"
                >
                  Start My Free Website
                </GlassButton>
              </GlassCard>

              {/* Custom Website */}
              <GlassCard hover className="flex flex-col p-8">
                <div className="mb-6">
                  <p className="text-xs text-muted uppercase tracking-wider">Full-Service</p>
                  <h3 className="text-xl font-semibold text-white mt-1">Project Website</h3>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-xl text-white/50">Scope-based</span>
                    <GlassPill variant="accent" className="text-[11px] py-0.5 px-2 uppercase tracking-wider">
                      Call Required
                    </GlassPill>
                  </div>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">Quote</span>
                    <span className="text-secondary">/project</span>
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    Online stores, portals, custom tools. One call. Fixed price.
                  </p>
                </div>

                <ul className="mb-8 flex-1 space-y-2.5 text-sm text-secondary">
                  {customWebsiteFeatures.map((item, i) => (
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
                      cta_text: 'Book a Call',
                      cta_location: 'pricing_custom',
                      event_category: 'engagement',
                      event_label: 'custom_quote_cta',
                    });
                    openCustomModal();
                  }}
                  className="w-full"
                >
                  Book a Call
                </GlassButton>
              </GlassCard>
            </div>

            {/* Bottom strip — ROI + Guarantee + Call CTA — all compact */}
            <div className="mt-12 max-w-3xl mx-auto text-center space-y-6">
              <p className="text-base md:text-lg font-bold text-white leading-snug">
                Your average job is $2,500. <span className="text-accent">One extra job</span> from your website covers the entire year.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-secondary">
                <span className="flex items-center gap-1.5">
                  <CheckIcon className="h-4 w-4 text-accent" />
                  48h launch or first month free
                </span>
                <span className="hidden sm:block text-white/20">·</span>
                <span className="flex items-center gap-1.5">
                  <CheckIcon className="h-4 w-4 text-accent" />
                  No contracts
                </span>
                <span className="hidden sm:block text-white/20">·</span>
                <span className="flex items-center gap-1.5">
                  <CheckIcon className="h-4 w-4 text-accent" />
                  Cancel anytime
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 pt-2">
                <p className="text-sm text-white/40">Want us to walk you through it?</p>
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
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Explore</h4>
              <ul className="mt-4 space-y-3">
                <li><Link href="#features" className="text-sm text-secondary hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#work" className="text-sm text-secondary hover:text-white transition-colors">Recent Work</Link></li>
                <li><Link href="#how-it-works" className="text-sm text-secondary hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="#pricing" className="text-sm text-secondary hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/guides" className="text-sm text-secondary hover:text-white transition-colors">Guides</Link></li>
                <li><Link href="#faq" className="text-sm text-secondary hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Account</h4>
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
                    cta_text: 'Start My Free Website',
                    cta_location: 'mobile_sticky',
                    event_category: 'engagement',
                    event_label: 'mobile_sticky_cta',
                  });
                  openUpsellModal("starter");
                }}
                className="group flex items-center gap-2 rounded-full border border-white/[0.15] bg-black/60 px-6 py-3 text-sm font-medium text-white shadow-[0_0_30px_-5px_var(--color-accent)] backdrop-blur-md transition-all ease-smooth active:scale-95"
              >
                Start My Free Website
                <svg className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Upsell Modal (Radix Dialog) ===== */}
      <Dialog open={showUpsellModal} onOpenChange={setShowUpsellModal}>
        <DialogContent className="max-w-4xl">
          <DialogCloseButton />

          <DialogHeader>
            <DialogTitle>
              Customize Your {selectedPlan === "pro" ? "Pro" : "Starter"} Plan
            </DialogTitle>
            <DialogDescription>
              Quick choices, optional upgrades. You can change later.
            </DialogDescription>
          </DialogHeader>


          <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4 md:pr-2">
              {/* Domain Question */}
              <div>
                <p className="text-sm font-medium text-white mb-3">
                  Do you already own a domain? <span className="text-accent">*</span>
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setAddOns({ ...addOns, hasDomain: true, domainRouting: null })}
                    className={`flex-1 rounded-xl border py-3 text-sm font-medium transition-all duration-200 ${addOns.hasDomain === true
                      ? "border-accent/50 bg-accent/10 text-accent"
                      : "border-white/[0.08] bg-white/[0.03] text-secondary hover:bg-white/[0.06] hover:border-white/[0.15]"
                      }`}
                  >
                    Yes, I have one
                  </button>
                  <button
                    onClick={() => setAddOns({ ...addOns, hasDomain: false, domainRouting: null })}
                    className={`flex-1 rounded-xl border py-3 text-sm font-medium transition-all duration-200 ${addOns.hasDomain === false
                      ? "border-accent/50 bg-accent/10 text-accent"
                      : "border-white/[0.08] bg-white/[0.03] text-secondary hover:bg-white/[0.06] hover:border-white/[0.15]"
                      }`}
                  >
                    No, I need one
                  </button>
                </div>
              </div>

              {/* Domain Routing */}
              {addOns.hasDomain === true && (
                <GlassCard className="p-4">
                  <p className="text-sm font-medium text-white mb-3">
                    Who should connect your domain? <span className="text-accent">*</span>
                  </p>
                  <div className="space-y-2">
                    <GlassSelect
                      selected={addOns.domainRouting === "us"}
                      onClick={() => setAddOns({ ...addOns, domainRouting: "us" })}
                      label="We handle it"
                      description="We connect it and verify it works. Normally $99."
                      price="$99 one-time"
                      priceColor="accent"
                    />
                    <GlassSelect
                      selected={addOns.domainRouting === "self"}
                      onClick={() => setAddOns({ ...addOns, domainRouting: "self" })}
                      label="I'll do it"
                      description="Simple step-by-step instructions."
                      price="Free"
                      priceColor="success"
                    />
                  </div>
                </GlassCard>
              )}

              {addOns.hasDomain === false && (
                <div className="rounded-xl border border-accent/30 bg-accent/10 p-4">
                  <p className="text-sm text-accent">
                    We&apos;ll send a quick guide to buy a domain (2 minutes).
                    After you buy it, we can connect it for <span className="text-white font-semibold">$99</span> or you can do it yourself free.
                  </p>
                </div>
              )}

              {/* Add-ons */}
              <div>
                <p className="text-sm font-medium text-white mb-3">Optional Add-ons</p>
                <div className="space-y-2">
                  <GlassSelect
                    selected={addOns.textAlerts}
                    onClick={() => {
                      const newValue = !addOns.textAlerts;
                      trackAddonToggled('Instant Lead Texts', 29, newValue ? 'added' : 'removed', selectedPlan || 'starter');
                      setAddOns({ ...addOns, textAlerts: newValue });
                    }}
                    label="Instant Lead Texts"
                    description="Automated text response system for new leads."
                    details={
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Setup of automated SMS reply workflow.</li>
                        <li>Notification routing to your phone and email.</li>
                        <li>Custom message configuration for your brand.</li>
                      </ul>
                    }
                    price="+$29/mo"
                    priceColor="accent"
                  />
                  <GlassSelect
                    selected={addOns.unlimitedEdits}
                    onClick={() => {
                      const newValue = !addOns.unlimitedEdits;
                      trackAddonToggled('Monthly Conversion Boost', 49, newValue ? 'added' : 'removed', selectedPlan || 'starter');
                      setAddOns({ ...addOns, unlimitedEdits: newValue });
                    }}
                    label="Monthly Conversion Boost"
                    description="We use real data to turn more of your visitors into paying customers every month."
                    details={
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Visitor heatmap & click tracking analysis.</li>
                        <li>Data-backed design & copy adjustments.</li>
                        <li>Monthly performance growth report.</li>
                      </ul>
                    }
                    price="+$49/mo"
                    priceColor="accent"
                  />
                  <GlassSelect
                    selected={addOns.googleBoost}
                    onClick={() => {
                      const newValue = !addOns.googleBoost;
                      trackAddonToggled('Google Business Boost', 199, newValue ? 'added' : 'removed', selectedPlan || 'starter');
                      setAddOns({ ...addOns, googleBoost: newValue });
                    }}
                    label="Google Business Boost"
                    description="Complete setup and optimization of your Google Maps presence."
                    details={
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Google Business Profile verification & setup.</li>
                        <li>Optimization of business categories and description.</li>
                        <li>Creation of direct 'Review Us' link & QR code.</li>
                      </ul>
                    }
                    price={
                      <span className="inline-flex items-center gap-2">
                        <span className="text-white/40 line-through decoration-2 decoration-white/40 text-xs">$499</span>
                        <span className="text-accent font-bold">$199 one-time</span>
                      </span>
                    }
                    priceColor="default"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-wider text-white/50">Your total</p>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary">{selectedPlan === "pro" ? "Pro" : "Starter"} plan</span>
                    <span className="text-white">${selectedPlan === "pro" ? 149 : 99}/mo</span>
                  </div>
                  {addOns.textAlerts && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-secondary">Instant Lead Texts</span>
                      <span className="text-white">+$29/mo</span>
                    </div>
                  )}
                  {addOns.unlimitedEdits && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-secondary">Monthly Conversion Boost</span>
                      <span className="text-white">+$49/mo</span>
                    </div>
                  )}
                </div>

                <GlassDivider className="my-4" />

                {addOns.domainRouting === "us" || addOns.googleBoost ? (
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-wider text-white/40">One-time</p>
                    {addOns.domainRouting === "us" && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-secondary">Domain connection</span>
                        <span className="text-white">+$99</span>
                      </div>
                    )}
                    {addOns.googleBoost && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-secondary">Google Business Boost</span>
                        <span className="text-white">+$199</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-muted">No one-time add-ons selected.</p>
                )}

                <GlassDivider className="my-4" />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary">Monthly total</span>
                  <span className="text-2xl font-semibold text-white">${calculateTotal().monthly}/mo</span>
                </div>
                {calculateTotal().oneTime > 0 && (
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted">One-time total</span>
                    <span className="text-secondary">${calculateTotal().oneTime}</span>
                  </div>
                )}

                {checkoutError && (
                  <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {checkoutError}
                  </div>
                )}

                <GlassButton
                  variant="primary"
                  size="lg"
                  onClick={handleUpsellContinue}
                  loading={loadingPlan !== null}
                  className="mt-4 w-full"
                >
                  Continue to Checkout
                </GlassButton>
                <p className="mt-3 text-xs text-muted text-center">
                  Secure Stripe checkout.
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog >

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
