"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
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
    <section id="how-it-works" className="relative px-6 py-24 md:py-32 allow-motion">
      <AmbientGlow color="accent" position="center" intensity="subtle" />
      <BGPattern variant="dots" mask="fade-center" size={32} fill="rgba(255,255,255,0.03)" />
      
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left side - Steps */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              From zero to live in<br />
              <span className="text-muted">three simple steps.</span>
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
                    className={`flex gap-5 w-full text-left transition-all duration-300 ${
                      isActive ? "opacity-100" : "opacity-50 hover:opacity-75"
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
                      <div className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transition-all duration-300 ${
                        isActive 
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
                      <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                        isActive ? "text-white" : "text-white/70"
                      }`}>
                        {item.title}
                      </h3>
                      <p className={`mt-1 text-sm transition-colors duration-300 ${
                        isActive ? "text-secondary" : "text-muted"
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

  const year = useMemo(() => new Date().getFullYear(), []);

  // Open upsell modal
  const openUpsellModal = (plan: Plan) => {
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
      setShowUpsellModal(false);
      startCheckout(selectedPlan);
    }
  }, [addOns.hasDomain, addOns.domainRouting, selectedPlan, startCheckout]);

  const submitCustomRequest = useCallback(async () => {
    setCustomError("");
    setCustomSuccess("");

    const name = customForm.name.trim();
    const email = customForm.email.trim().toLowerCase();

    if (!name) {
      setCustomError("Please enter your name.");
      return;
    }

    if (!isValidEmail(email)) {
      setCustomError("Please enter a valid email address.");
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

      setCustomSuccess("Thanks! We'll reach out to book a call.");
      setCustomForm(createEmptyCustomForm());
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          setCustomError("Request timed out. Please try again.");
        } else {
          setCustomError(error.message || "Failed to send request. Please try again.");
        }
      } else {
        setCustomError("An unexpected error occurred. Please try again.");
      }
      console.error("Custom request error:", error);
    } finally {
      setCustomLoading(false);
    }
  }, [customForm]);


  // ==========================================================================
  // Feature data
  // ==========================================================================
  const features = [
    {
      title: "Mobile First Design",
      desc: "Built for customers on their phones: tap-to-call, quick quote requests, and clear next steps.",
      icon: featureIcons.mobile,
    },
    {
      title: "Lightning Fast",
      desc: "Fast load speeds so visitors don't bounce before contacting you.",
      icon: featureIcons.lightning,
    },
    {
      title: "SEO Optimized",
      desc: "Structured for local search so you show up when people look for your services in your city.",
      icon: featureIcons.search,
    },
  ];

  const deliverables = [
    { label: "01", title: "Mobile-first design", detail: "Tap-to-call ready" },
    { label: "02", title: "Quote form", detail: "Straight to your inbox" },
    { label: "03", title: "Local SEO foundation", detail: "Built for local search" },
    { label: "04", title: "Speed + SSL", detail: "Fast, secure delivery" },
    { label: "05", title: "Launched in 48 hours", detail: "Live and ready to share" },
    { label: "06", title: "Ongoing support", detail: "Edits, fixes, updates" },
  ];

  const customWebsiteFeatures = [
    "Full multi-page websites",
    "Custom design system + branding",
    "API integrations + automations",
    "Ecommerce + payments",
    "Dashboards or client portals",
    "CRM + Booking setup",
    "Advanced SEO + analytics",
  ];

  const steps = [
    { step: "01", title: "Subscribe & Start", desc: "Choose your plan in under a minute. We start immediately - no back-and-forth needed." },
    { step: "02", title: "Fill Out The Form", desc: "Send your services, service area, photos, and contact info. Simple and quick." },
    { step: "03", title: "We Build, Launch & Support", desc: "Your site goes live in 48 hours. We keep it updated, fast, and converting." },
  ];

  const faqs = [
    // Pricing & Billing
    { 
      q: "Is the website really free?", 
      a: "Yes. The build fee is waived when you start a plan. You only pay monthly for hosting + support.",
      category: "pricing"
    },
    { 
      q: "What's the catch?", 
      a: "No catch. It's simple: $0 down to build, then $99/mo (or $149/mo) to keep it live, supported, and updated.",
      category: "pricing"
    },
    { 
      q: "Why do you charge monthly?", 
      a: "Because most \"one-time websites\" get outdated fast. Monthly covers hosting, fixes, and support so your site stays fast and working.",
      category: "pricing"
    },
    { 
      q: "Can I cancel anytime?", 
      a: "Yes. No contracts. Cancel anytime through the Stripe portal (or email support if needed).",
      category: "pricing"
    },
    { 
      q: "What happens if I cancel?", 
      a: "We stop billing you going forward, and your hosted site may be taken offline after your billing period ends.",
      category: "pricing"
    },
    // Plans & What's Included
    { 
      q: "What do I get with Starter vs Pro?", 
      a: "Starter ($99/mo): 1-page site + local SEO foundation + 1 content update/month.\nPro ($149/mo): 3-page site + stronger local structure + priority queue + 3 content updates/month.",
      category: "plans"
    },
    { 
      q: "What counts as a \"content update\"?", 
      a: "Small changes like text edits, photo swaps, button/link updates, hours, services, or adding a testimonial.",
      category: "plans"
    },
    { 
      q: "What's not included?", 
      a: "Big changes like new pages beyond your plan, full redesigns, custom features, ecommerce, or integrations. If you need that, we'll quote it as a project.",
      category: "plans"
    },
    { 
      q: "Can I request changes anytime?", 
      a: "Yes — submit requests through our support form. Plans include monthly content updates, and Pro is handled faster via priority queue.",
      category: "plans"
    },
    // Getting Started
    { 
      q: "How fast can you launch it?", 
      a: "Typically 48 hours after you send your business details (services, contact info, photos/logo).",
      category: "getting-started"
    },
    { 
      q: "Do I need a domain?", 
      a: "Yes — you'll need a domain (like yourbusiness.com). If you don't have one, we'll send a quick guide to buy it.",
      category: "getting-started"
    },
    { 
      q: "Can you connect my domain for me?", 
      a: "Yes. If you already have a domain, you can either:\n\nDo it yourself (free) with our instructions, or\n\nWe connect it for you ($99 one-time)",
      category: "getting-started"
    },
    // How It Works
    { 
      q: "How do leads come in?", 
      a: "Through tap-to-call buttons and form submissions on your website.",
      category: "how-it-works"
    },
    { 
      q: "Where do form submissions go?", 
      a: "By default, form leads go straight to your email so you can respond fast.",
      category: "how-it-works"
    },
    { 
      q: "Do you offer text message lead alerts?", 
      a: "Yes — add Instant Lead Texts to get new leads texted to your phone instantly.",
      category: "how-it-works"
    },
    { 
      q: "Can you add Google Analytics / tracking?", 
      a: "Yes. We can add Umami or Google Analytics—especially for Pro. If you have tracking scripts, we'll plug them in.",
      category: "how-it-works"
    },
    // Results & Ownership
    { 
      q: "Do I own the website?", 
      a: "You own your business info and branding, but the website is provided as a subscription service while active. If you want full ownership, you can request a website buyout.",
      category: "results"
    },
    { 
      q: "Do you do SEO?", 
      a: "We build every site with a local SEO foundation (fast load, clean structure, service keywords). We don't promise rankings, but we set you up correctly from day one.",
      category: "results"
    },
    { 
      q: "Will this get me more clients?", 
      a: "That's the goal — we build your site to convert visitors into clients and inquiries. Results depend on your market, offer, competition, and follow-up.",
      category: "results"
    },
    { 
      q: "Who is this best for?", 
      a: "Local service businesses that want a clean website fast that helps drive clients and inquiries (HVAC, roofing, salons, medspas, dentists, auto, contractors, and more).",
      category: "results"
    },
  ];

  const faqCategories = [
    { id: "all", label: "All Questions" },
    { id: "pricing", label: "Pricing & Billing" },
    { id: "plans", label: "Plans & What's Included" },
    { id: "getting-started", label: "Getting Started" },
    { id: "how-it-works", label: "How It Works" },
    { id: "results", label: "Ownership & SEO" },
  ];

  const stats = [
    { value: "FREE", label: "Website Build" },
    { value: "48h", label: "Launch Time" },
    { value: "$99", label: "/mo Hosting" },
    { value: "∞", label: "Cancel Anytime" },
  ];

  // ==========================================================================
  // Render
  // ==========================================================================
  return (
    <div className="flex min-h-screen flex-col font-sans relative">
      {/* ===== Navbar ===== */}
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6 md:pt-6">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] px-5 py-3 shadow-glass">
          {/* Inner highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-t-2xl" />
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 font-bold tracking-tight">
            <span className="text-accent font-black text-lg">QL</span>
            <span className="text-white/20 font-light">|</span>
            <span className="text-white/90">QuickLaunchWeb</span>
          </Link>
          
          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
            <Link href="#features" className="hover:text-white transition-colors duration-200">Features</Link>
            <Link href="#work" className="hover:text-white transition-colors duration-200">Work</Link>
            <Link href="#how-it-works" className="hover:text-white transition-colors duration-200">How it Works</Link>
            <Link href="#pricing" className="hover:text-white transition-colors duration-200">Pricing</Link>
            <Link href="#faq" className="hover:text-white transition-colors duration-200">FAQ</Link>
          </div>

          {/* CTA */}
          <GlassButton
            variant="secondary"
            size="sm"
            onClick={() => openUpsellModal("starter")}
          >
            Start My Free Website
          </GlassButton>
        </nav>
      </header>

      <main className="flex-1">
        {/* ===== Hero Section ===== */}
        <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-32 md:pb-40 md:pt-52 min-h-screen bg-[#020202]">
          {/* Experience Hero Background */}
          <ExperienceHeroBackground />

          <div className="relative z-10 flex flex-col items-center">
            {/* Status pill */}
            <GlassPill variant="accent" pulse className="mb-10">
            NO SETUP FEES & CANCEL ANYTIME
            </GlassPill>

            {/* Headline */}
            <h1 className="mx-auto max-w-4xl text-center text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl text-balance">
            Free Website. More Clients.{" "}
              <span 
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(to right, rgb(var(--color-accent-rgb)), rgb(var(--color-accent-gradient-to)))'
                }}
              >
                <br/>Live in 48 Hours<br/>
              </span>
            </h1>
            
            {/* Subhead */}
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-secondary md:text-xl text-balance leading-relaxed">
              We build it for <span className="text-white font-semibold">$0 down</span>. You only pay{" "}
              <span className="text-white font-semibold">$99/mo</span> for hosting + support.
              <br className="hidden md:block" />
              <span className="text-white font-semibold">Try it for 30 days — if you don’t love it, cancel anytime.</span>{" "}
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted">
              Simple: we waive the build fee and keep earning your business monthly.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <GlassButton
                variant="primary"
                size="lg"
                onClick={() => openUpsellModal("starter")}
                loading={loadingPlan === "starter"}
                icon={<ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                className="group"
              >
                Start My Free Website
              </GlassButton>
              <GlassButton
                variant="ghost"
                size="lg"
                onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
              >
                See Plans
              </GlassButton>
            </div>

            {/* Stats row */}
            <div className="mt-20 flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-accent">{stat.value}</p>
                  <p className="text-xs text-muted uppercase tracking-widest mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Features Section ===== */}
        <section id="features" className="relative px-6 py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />
          <GlassDivider className="absolute top-0 left-0 right-0" />
          
          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="mb-16 md:text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                Built to convert <span className="text-accent">clicks into clients</span>.
              </h2>
              <p className="mt-4 text-lg text-secondary md:mx-auto md:max-w-2xl">
                We don&apos;t just build websites; we build revenue engines.
                Every site is optimized for speed, SEO, and lead generation.
              </p>
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

        {/* ===== 48 Hours Section ===== */}
        <section id="deliverables" className="relative px-6 pb-20 pt-10 md:pb-24 md:pt-12">
          <AmbientGlow color="accent" position="center" intensity="subtle" className="opacity-40" />

          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <p className="text-[11px] uppercase tracking-[0.4em] text-accent/80">
                    Launch timeline
                  </p>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">
                    What You Get in <span className="text-accent">48 Hours</span>
                  </h2>
                  <p className="mt-4 text-lg text-secondary">
                    A live website built to win clients.
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

        {/* ===== Social Proof Section ===== */}
        <SocialProofSection />

        {/* ===== How It Works Section ===== */}
        <HowItWorksSection steps={steps} />

        {/* ===== Pricing Section ===== */}
        <section id="pricing" className="relative px-6 py-24 md:py-32">
          <GlassDivider className="absolute top-0 left-0 right-0" />
          <AmbientGlow color="accent" position="top" intensity="subtle" className="-top-20" />
          
          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="mb-16 md:text-center">
              <p className="text-sm font-medium text-accent uppercase tracking-wider mb-4">
                Stop paying $1,000+ upfront
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                Free website. Just pay hosting.
              </h2>
              <p className="mt-4 text-lg text-secondary max-w-2xl mx-auto">
                Most designers charge $500–$2,000 upfront. We don&apos;t. Monthly fee covers hosting,
                maintenance, and keeping your site converting.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3 lg:gap-10 max-w-6xl mx-auto">
              {/* Starter Plan */}
              <GlassCard hover className="flex flex-col p-8">
                <div className="mb-6">
                  <p className="text-xs text-muted uppercase tracking-wider">Basic Presence</p>
                  <h3 className="text-xl font-semibold text-white mt-1">Starter</h3>
                  <p className="mt-4 text-xs uppercase tracking-wider text-muted">TYPICAL BUILD FEE</p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-2xl md:text-3xl font-semibold text-white/60 line-through">$799</span>
                    <GlassPill variant="accent" className="text-[11px] py-0.5 px-2 uppercase tracking-wider">
                      WAIVED
                    </GlassPill>
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-wider text-accent">Only pay hosting + support</p>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-5xl md:text-6xl font-bold text-white tracking-tight">$99</span>
                    <span className="text-secondary">/mo</span>
                  </div>
                  <p className="mt-2 text-sm text-muted">
                  Basic presence website built to turn visitors into leads. Hosting + support included. Cancel anytime.
                  </p>
                </div>

                <ul className="mb-8 flex-1 space-y-3 text-sm text-secondary">
                  {[
                    "Free build (waived)",
                    "Hosting + site care included",
                    "Mobile-first conversion layout",
                    "Speed optimization",
                    "Local SEO foundation",
                    "1 Content Update / month",
                    "Cancel anytime. No contracts.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckIcon className="h-5 w-5 text-accent shrink-0" />
                      {item === "1 Content Update / month" ? (
                        <span className="font-bold">{item}</span>
                      ) : (
                        item
                      )}
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
                  <p className="mt-4 text-xs uppercase tracking-wider text-muted">TYPICAL BUILD FEE</p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-2xl md:text-3xl font-semibold text-white/60 line-through">$1,499</span>
                    <GlassPill variant="accent" className="text-[11px] py-0.5 px-2 uppercase tracking-wider">
                    WAIVED
                    </GlassPill>
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-wider text-accent">BEST FOR GROWTH + LOCAL SEO</p>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-5xl md:text-6xl font-bold text-white tracking-tight">$149</span>
                    <span className="text-secondary">/mo</span>
                  </div>
                  <p className="mt-2 text-sm text-muted">
                  More pages + stronger structure for multi-service businesses. Priority support and faster updates. Cancel anytime.
                  </p>
                </div>

                <ul className="mb-8 flex-1 space-y-3 text-sm text-secondary">
                  {[
                    "Everything in Starter",
                    "3 pages (Home + Services + Contact)",
                    "Enhanced local SEO structure",
                    "Call + form tracking installed",
                    "Google Analytics / Umami included",
                    "Priority build queue (24–48h edits)",
                    "3 Content Updates / month",
                    "Cancel anytime. No contracts.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckIcon className="h-5 w-5 text-accent shrink-0" />
                      {item === "3 Content Updates / month" || item === "Priority build queue (24–48h edits)" ? (
                        <span className="font-bold">{item}</span>
                      ) : (
                        item
                      )}
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
                  <p className="mt-4 text-xs uppercase tracking-wider text-muted">TYPICAL BUILD FEE</p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-2xl md:text-3xl font-semibold text-white/60">Scope</span>
                    <GlassPill variant="accent" className="text-[11px] py-0.5 px-2 uppercase tracking-wider">
                      Call Required
                    </GlassPill>
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-wider text-accent">Project pricing</p>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-5xl md:text-6xl font-bold text-white tracking-tight">Quote</span>
                    <span className="text-secondary">/project</span>
                  </div>
                  <p className="mt-2 text-sm text-muted">
                  For ecommerce, integrations, booking systems, portals, and automation. One call, clear scope, fixed quote.
                  </p>
                </div>

                <ul className="mb-8 flex-1 space-y-3 text-sm text-secondary">
                  {customWebsiteFeatures.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckIcon className="h-5 w-5 text-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <GlassButton
                  variant="secondary"
                  size="lg"
                  onClick={openCustomModal}
                  className="w-full"
                >
                  Book a Call
                </GlassButton>
              </GlassCard>
            </div>

            <div className="mt-10 text-center">
              <p className="text-xs text-muted">
                No setup fees. No long-term commitments. Just results-driven websites you can keep or cancel.
              </p>
              <p className="mt-3 text-sm text-secondary">
                <span className="font-semibold text-white">Love-It-Or-Cancel Guarantee:</span> Try it for 30 days. If you don&apos;t love it, cancel anytime. No contracts. No pressure.
              </p>
            </div>
          </div>
        </section>

        {/* ===== FAQ Section ===== */}
        <section id="faq" className="relative px-6 py-24 md:py-32">
          <BGPattern variant="dots" mask="fade-center" size={32} fill="rgba(255,255,255,0.03)" />
          
          <div className="relative z-10 mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-white md:text-4xl">
              Frequently Asked Questions
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
                    className={`px-4 py-1.5 transition-all duration-200 relative whitespace-nowrap flex-shrink-0 ${
                      faqCategory === cat.id
                        ? "text-accent font-semibold"
                        : "text-secondary hover:text-white"
                    } ${
                      index < faqCategories.length - 1 
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
                High-converting, mobile-first websites built fast for local businesses.
              </p>
              <p className="mt-3 text-xs text-muted">
                Built for speed. Focused on clients.
              </p>
            </div>
            
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Explore</h4>
              <ul className="mt-4 space-y-3">
                <li><Link href="#features" className="text-sm text-secondary hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#work" className="text-sm text-secondary hover:text-white transition-colors">Recent Work</Link></li>
                <li><Link href="#how-it-works" className="text-sm text-secondary hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="#pricing" className="text-sm text-secondary hover:text-white transition-colors">Pricing</Link></li>
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

      {/* ===== Upsell Modal (Radix Dialog) ===== */}
      <Dialog open={showUpsellModal} onOpenChange={setShowUpsellModal}>
        <DialogContent>
          <DialogCloseButton />
          
          <DialogHeader>
            <DialogTitle>
              Customize Your {selectedPlan === "pro" ? "Pro" : "Starter"} Plan
            </DialogTitle>
            <DialogDescription>
              Answer a quick question and choose any add-ons.
            </DialogDescription>
          </DialogHeader>

          {/* Domain Question */}
          <div className="mb-6">
            <p className="text-sm font-medium text-white mb-3">
              Do you have your own domain? <span className="text-accent">*</span>
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setAddOns({ ...addOns, hasDomain: true, domainRouting: null })}
                className={`flex-1 rounded-xl border py-3 text-sm font-medium transition-all duration-200 ${
                  addOns.hasDomain === true
                    ? "border-accent/50 bg-accent/10 text-accent"
                    : "border-white/[0.08] bg-white/[0.03] text-secondary hover:bg-white/[0.06] hover:border-white/[0.15]"
                }`}
              >
                Yes, I have one
              </button>
              <button
                onClick={() => setAddOns({ ...addOns, hasDomain: false, domainRouting: null })}
                className={`flex-1 rounded-xl border py-3 text-sm font-medium transition-all duration-200 ${
                  addOns.hasDomain === false
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
            <GlassCard className="mb-6 p-4">
              <p className="text-sm font-medium text-white mb-3">
                Who will connect your domain? <span className="text-accent">*</span>
              </p>
              <div className="space-y-2">
                <GlassSelect
                  selected={addOns.domainRouting === "us"}
                  onClick={() => setAddOns({ ...addOns, domainRouting: "us" })}
                  label="We handle it"
                  description="We set it up and verify it works."
                  price="$99 one-time"
                  priceColor="accent"
                />
                <GlassSelect
                  selected={addOns.domainRouting === "self"}
                  onClick={() => setAddOns({ ...addOns, domainRouting: "self" })}
                  label="I'll do it myself"
                  description="We'll send you simple instructions."
                  price="Free"
                  priceColor="success"
                />
              </div>
            </GlassCard>
          )}

          {addOns.hasDomain === false && (
            <div className="mb-6 rounded-xl border border-accent/30 bg-accent/10 p-4">
              <p className="text-sm text-accent">
                No problem — we&apos;ll send a quick guide to buy a domain (2 minutes).
                <br />
                After you buy it, we can connect it for <span className="text-white font-semibold">$99</span> — or you can do it yourself free.
              </p>
            </div>
          )}

          {/* Add-ons */}
          <div className="mb-6">
            <p className="text-sm font-medium text-white mb-3">Optional Add-ons</p>
            <div className="space-y-2">
              <GlassSelect
                selected={addOns.textAlerts}
                onClick={() => setAddOns({ ...addOns, textAlerts: !addOns.textAlerts })}
                label="Instant Lead Texts"
                description="Get texted instantly when a lead comes in."
                price="+$29/mo"
                priceColor="accent"
              />
              <GlassSelect
                selected={addOns.unlimitedEdits}
                onClick={() => setAddOns({ ...addOns, unlimitedEdits: !addOns.unlimitedEdits })}
                label="Monthly Conversion Boost"
                description="1 monthly upgrade to help you get more leads."
                price="+$49/mo"
                priceColor="accent"
              />
              <GlassSelect
                selected={addOns.googleBoost}
                onClick={() => setAddOns({ ...addOns, googleBoost: !addOns.googleBoost })}
                label="Google Business Boost"
                description="Optimize your Google profile to get more inbound clients."
                price="$199 one-time"
                priceColor="accent"
              />
            </div>
          </div>

          {/* Total & Continue */}
          <GlassDivider className="mb-4" />
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-secondary">Monthly Total</span>
            <span className="text-2xl font-bold text-white">${calculateTotal().monthly}/mo</span>
          </div>
          {calculateTotal().oneTime > 0 && (
            <div className="flex items-center justify-between mb-4 text-sm">
              <span className="text-muted">+ One-time</span>
              <span className="text-secondary">${calculateTotal().oneTime}</span>
            </div>
          )}
          
          {checkoutError && (
            <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {checkoutError}
            </div>
          )}
          
          <GlassButton
            variant="primary"
            size="lg"
            onClick={handleUpsellContinue}
            loading={loadingPlan !== null}
            className="w-full"
          >
            Continue to Checkout
          </GlassButton>
          <p className="text-xs text-muted text-center mt-3">
            You&apos;ll be redirected to Stripe for secure payment.
          </p>
        </DialogContent>
      </Dialog>

      {/* ===== Custom Website Modal ===== */}
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
      </Dialog>
    </div>
  );
}
