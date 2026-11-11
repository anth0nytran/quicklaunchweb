"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BGPattern } from "@/components/ui/bg-pattern";
import {
  GlassCard,
  GlassButton,
  GlassPill,
  AmbientGlow,
} from "@/components/ui/glass";
import { ExperienceHeroBackground } from "@/components/ui/experience-hero";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ProgressRingCSS } from "@/components/ui/progress-ring";
import {
  PostsVisual,
  AdsVisual,
  ProfileVisual,
  CatchLeadVisual,
  DayKickoffVisual,
  DayBuildVisual,
  DaySystemVisual,
  DayLiveVisual,
} from "@/components/social-visuals";
import { DiscoveryCallSection } from "@/components/discovery-call";
import { AdResultsSection } from "@/components/ad-results";
import { SiteFooter } from "@/components/site-footer";
import { Navigation } from "@/components/Navigation";
import { socialFaqs } from "@/lib/socialFaqData";
import { socialClients } from "@/lib/socialClients";
import { usePageTracker, useEventTracker } from "@/lib/analytics";

// =============================================================================
// Icons
// =============================================================================

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

// =============================================================================
// Content
// =============================================================================

const navLinks = [
  { name: "Results", href: "#results" },
  { name: "Facebook Ads", href: "/services/facebook-ads" },
  { name: "Video", href: "/services/video-production" },
  { name: "Web Services", href: "/services/web-design" },
  { name: "FAQ", href: "#faq" },
];

const heroBullets = [
  "We film your videos and run your Facebook ads.",
  "You call the leads. Or we call them for you.",
  "Houston-based. One business per trade per area.",
];

const problems = [
  "Some months are packed. Some are dead. You never know which.",
  "Angi sells the same lead to five guys. Now you fight on price.",
  "A lead calls while you are on a roof. They call the next guy.",
];

const whatWeDo = [
  {
    number: "01",
    title: "We make your posts",
    body: "You send clips and photos from your phone. We turn them into videos and picture ads and post them every week.",
  },
  {
    number: "02",
    title: "We run your ads",
    body: "Facebook and Instagram ads that go to homeowners near you. We make them. You own the ad account.",
  },
  {
    number: "03",
    title: "We fix your pages",
    body: "Instagram, Facebook, and your Google page. Cleaned up so you look like the best choice in town.",
  },
  {
    number: "04",
    title: "We catch every lead",
    body: "Miss a call and they get a text right away. Fill out a form and they hear back in seconds.",
  },
];

const leadOptions = [
  {
    tag: "Option 1",
    title: "You call your own leads",
    body: "Every lead goes straight to your phone the second it comes in. You call them. You book the job. You keep it simple.",
    points: ["Leads hit your phone right away", "You stay in control", "Costs less"],
    featured: false,
  },
  {
    tag: "Option 2",
    title: "We call your leads for you",
    body: "Our team calls every lead. We make sure they own the home, live in your area, and have the money to pay. Then we put the estimate on your calendar.",
    points: [
      "We call, text, and follow up",
      "We check they can afford it",
      "You just show up and close",
    ],
    featured: true,
  },
];

const days = [
  {
    day: "Day 1",
    title: "We talk",
    body: "30 minutes. You tell us what you do and where you work. That is your part.",
  },
  {
    day: "Days 2–5",
    title: "We build it",
    body: "We fix your pages. We make your first videos and picture ads.",
  },
  {
    day: "Day 6",
    title: "We turn it on",
    body: "Text-back, instant replies, follow-ups. No lead gets dropped.",
  },
  {
    day: "Day 7",
    title: "You go live",
    body: "Ads are running. Posts are up. Leads start coming in.",
  },
];


const promises = [
  "Live in 7 days or your first month is free.",
  "We will not work with your competitor.",
  "You own your ads, your pages, and your leads.",
];

// =============================================================================
// Motion helpers
// =============================================================================

const heroItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

// =============================================================================
// Reveal wrapper
// =============================================================================

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// 7-Day stepper — auto-advances, same pattern as the web services page
// =============================================================================

const DAY_CYCLE_MS = 5500;

function SevenDaySection() {
  const [activeDay, setActiveDay] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActiveDay((prev) => (prev + 1) % days.length);
      setAnimationKey((k) => k + 1);
    }, DAY_CYCLE_MS);
    return () => clearInterval(id);
  }, [paused]);

  const visuals = [
    <DayKickoffVisual key={`kickoff-${animationKey}`} />,
    <DayBuildVisual key={`build-${animationKey}`} />,
    <DaySystemVisual key={`system-${animationKey}`} />,
    <DayLiveVisual key={`live-${animationKey}`} />,
  ];

  const selectDay = (i: number) => {
    setActiveDay(i);
    setAnimationKey((k) => k + 1);
  };

  return (
    <section
      id="days"
      className="allow-motion relative scroll-mt-20 overflow-hidden px-6 py-16 md:py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AmbientGlow color="accent" position="center" intensity="subtle" />
      <BGPattern variant="dots" mask="fade-center" size={32} fill="rgba(255,255,255,0.03)" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Steps */}
          <div>
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                Live in <span className="text-accent">7 days</span>.
                <br />
                <span className="text-muted">About an hour of your time.</span>
              </h2>
            </Reveal>

            <div className="mt-9 space-y-5 md:mt-11 md:space-y-7">
              {days.map((item, i) => {
                const isActive = i === activeDay;
                const isPast = i < activeDay;

                return (
                  <button
                    key={item.day}
                    type="button"
                    onClick={() => selectDay(i)}
                    aria-current={isActive ? "step" : undefined}
                    className={`flex w-full gap-4 text-left transition-all duration-300 sm:gap-5 ${
                      isActive ? "opacity-100" : "opacity-50 hover:opacity-80"
                    }`}
                  >
                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
                      <ProgressRingCSS
                        key={`ring-${i}-${animationKey}`}
                        isActive={isActive && !paused}
                        isPast={isPast}
                        duration={DAY_CYCLE_MS}
                      />
                      <div
                        className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border text-[11px] font-bold transition-all duration-300 ${
                          isActive
                            ? "border-accent/50 bg-accent/10 text-accent"
                            : isPast
                              ? "border-accent/30 bg-accent/5 text-accent/70"
                              : "border-white/[0.15] bg-white/[0.03] text-white/60"
                        }`}
                      >
                        {i + 1}
                      </div>
                    </div>

                    <div className="flex-1 pt-1.5">
                      <p
                        className={`font-mono text-[11px] font-bold tracking-[0.12em] transition-colors duration-300 ${
                          isActive ? "text-accent" : "text-white/35"
                        }`}
                      >
                        {item.day}
                      </p>
                      <h3
                        className={`mt-1 text-lg font-semibold transition-colors duration-300 ${
                          isActive ? "text-white" : "text-white/70"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`mt-1 text-sm leading-relaxed transition-colors duration-300 ${
                          isActive ? "text-secondary" : "text-muted"
                        }`}
                      >
                        {item.body}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Visual panel */}
          <Reveal delay={0.1}>
            <GlassCard variant="elevated" className="p-3">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-base sm:aspect-[5/4] lg:aspect-[4/5]">
                {visuals[activeDay]}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// Page
// =============================================================================

export default function SocialMarketingPage() {
  usePageTracker("QuickLaunchWeb - Social Media Marketing (Houston)", "homepage");
  const { track } = useEventTracker();

  const [showMobileCTA, setShowMobileCTA] = useState(false);
  const scrollTrackedRef = useRef<Set<number>>(new Set());

  const clientsWithQuotes = socialClients.filter((c) => c.quote);

  useEffect(() => {
    const handleScroll = () => {
      const pct =
        ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100;
      [25, 50, 75, 90].forEach((threshold) => {
        if (pct >= threshold && !scrollTrackedRef.current.has(threshold)) {
          scrollTrackedRef.current.add(threshold);
          track("scroll_depth", {
            scroll_depth: threshold,
            page_path: "/",
            event_category: "engagement",
            event_label: `${threshold}%`,
          });
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [track]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > 400 && y > lastScrollY) setShowMobileCTA(true);
      else if (y < lastScrollY) setShowMobileCTA(false);
      lastScrollY = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToBooking = (location: string) => {
    track("cta_click", {
      cta_text: "Get My Free Ad Plan",
      cta_location: location,
      event_category: "engagement",
      event_label: `${location}_cta`,
    });
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden font-sans">
      <Navigation links={navLinks} ctaLabel="Get My Free Ad Plan" ctaHref="#book" />

      <main className="flex-1">
        {/* ===================== HERO ===================== */}
        <section className="relative flex min-h-dvh flex-col justify-center overflow-hidden bg-[#080e24] px-6 pb-16 pt-28 md:px-12 md:pb-20 md:pt-32 lg:px-20">
          <ExperienceHeroBackground />

          <motion.div
            className="relative z-10 flex w-full max-w-5xl flex-col items-start"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
            }}
          >
            <motion.div variants={heroItem}>
            <GlassPill
              variant="accent"
              pulse
              className="mb-6 inline-flex items-center rounded-full px-4 py-2 text-[10px] font-semibold tracking-wide md:text-xs"
            >
              <span>HOUSTON HOME SERVICES</span>
            </GlassPill>
            </motion.div>

            <motion.h1
              variants={heroItem}
              className="max-w-3xl text-left text-4xl/[1.05] font-extrabold tracking-tight text-white sm:text-5xl/[1.05] md:text-6xl/[1.05] lg:text-7xl/[1.05]"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
            >
              We get you{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgb(var(--color-accent-rgb)), rgb(var(--color-accent-gradient-to)))",
                }}
              >
                more jobs
              </span>{" "}
              in 7 days.
            </motion.h1>

            <motion.ul
              variants={heroItem}
              className="mt-6 w-full max-w-lg space-y-2.5 text-[15px] font-medium text-white/85 md:mt-7 md:text-lg"
            >
              {heroBullets.map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.1, duration: 0.45, ease: "easeOut" }}
                >
                  <CheckIcon className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              variants={heroItem}
              className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-center"
            >
              <GlassButton
                variant="primary"
                size="lg"
                onClick={() => goToBooking("hero")}
                icon={<ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                className="group w-full text-base sm:w-auto md:px-8 md:py-4"
              >
                Get My Free Ad Plan
              </GlassButton>
              <GlassButton
                variant="ghost"
                size="lg"
                onClick={() => {
                  track("cta_click", {
                    cta_text: "See what we do",
                    cta_location: "hero",
                    event_category: "engagement",
                  });
                  document.getElementById("what-we-do")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full text-base sm:w-auto md:px-8 md:py-4"
              >
                See what we do
              </GlassButton>
            </motion.div>

            <motion.p
              variants={heroItem}
              className="mt-5 text-[13px] text-white/60 sm:text-sm"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
            >
              30 minutes. You get your free plan. That is it.
            </motion.p>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-6 z-10 hidden justify-center md:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            aria-hidden="true"
          >
            <motion.div
              className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="h-1.5 w-1 rounded-full bg-white/50" />
            </motion.div>
          </motion.div>
        </section>

        {/* ===================== PROOF ===================== */}
        <section id="proof" className="relative scroll-mt-20 overflow-hidden px-6 py-14 md:py-16">
          <div className="relative z-10 mx-auto max-w-5xl">
            <Reveal>
              <p className="text-center text-[10px] uppercase tracking-[0.3em] text-white/35">
                Houston businesses we run social and ads for
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 md:gap-x-12">
                {socialClients.map((client) => (
                  <div key={client.name} className="flex items-center gap-2.5">
                    {client.logo && (
                      <Image
                        src={client.logo}
                        alt={client.name}
                        width={32}
                        height={32}
                        unoptimized
                        className="h-7 w-7 object-contain opacity-70"
                      />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-white/85">{client.name}</p>
                      <p className="text-[11px] text-muted">
                        {client.trade}
                        {client.result ? ` · ${client.result}` : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {clientsWithQuotes.length > 0 && (
              <div
                className={`mt-10 grid gap-4 ${
                  clientsWithQuotes.length === 1
                    ? "mx-auto max-w-2xl"
                    : "md:grid-cols-2"
                }`}
              >
                {clientsWithQuotes.map((client, i) => (
                  <Reveal key={client.name} delay={i * 0.06}>
                    <GlassCard className="h-full p-6 border-white/[0.06]">
                      <p className="text-[15px] leading-[1.7] text-white/80">
                        &ldquo;{client.quote}&rdquo;
                      </p>
                      <p className="mt-4 text-sm font-semibold text-white">{client.name}</p>
                      <p className="text-[11px] text-muted">
                        {client.trade} · {client.city}
                      </p>
                    </GlassCard>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ===================== RESULTS ===================== */}
        <AdResultsSection />

        <div className="mx-auto max-w-5xl px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        {/* ===================== PROBLEM ===================== */}
        <section className="relative overflow-hidden px-6 py-16 md:py-20">
          <BGPattern variant="dots" mask="fade-edges" size={32} fill="rgba(255,255,255,0.03)" />

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight text-white text-balance md:text-5xl">
                Word of mouth is <span className="text-accent">slow</span>.
              </h2>

              <ul className="mx-auto mt-8 max-w-xl space-y-4 text-left">
                {problems.map((problem) => (
                  <li key={problem} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="text-[16px] leading-relaxed text-white/75 md:text-lg">
                      {problem}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-lg font-medium text-white/90 md:text-xl">
                You do good work. People just do not know you yet.
              </p>
            </Reveal>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        {/* ===================== WHAT WE DO ===================== */}
        <section id="what-we-do" className="relative scroll-mt-20 overflow-hidden px-6 py-16 md:py-20">
          <AmbientGlow color="accent" position="top" intensity="subtle" className="-top-20" />

          <div className="relative z-10 mx-auto max-w-5xl">
            <Reveal>
              <h2 className="text-center text-3xl font-bold tracking-tight text-white text-balance md:text-5xl">
                Here is what we do for you.
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 md:gap-6">
              {whatWeDo.map((item, i) => (
                <Reveal key={item.number} delay={i * 0.05}>
                  <GlassCard
                    hover
                    className="group flex h-full flex-col overflow-hidden border-white/[0.06] p-0"
                  >
                    {/* Animated visual */}
                    <div className="allow-motion relative h-44 overflow-hidden border-b border-white/[0.06] bg-white/[0.01] sm:h-52">
                      {i === 0 && <PostsVisual />}
                      {i === 1 && <AdsVisual />}
                      {i === 2 && <ProfileVisual />}
                      {i === 3 && <CatchLeadVisual />}
                      <span className="absolute right-3 top-3 font-mono text-xl font-bold text-white/[0.10]">
                        {item.number}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <h3 className="text-xl font-bold tracking-tight text-white">{item.title}</h3>
                      <p className="mt-2 text-[15px] leading-[1.65] text-secondary">{item.body}</p>
                    </div>
                  </GlassCard>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-5 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6">
                <p className="text-[15px] leading-[1.7] text-white/80">
                  <span className="font-semibold text-white">
                    You on camera works best.
                  </span>{" "}
                  People hire the guy they trust, and nothing builds trust like the owner talking.
                  Do not want to be on camera? That is fine. We run picture ads for plenty of our
                  guys and they do great.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        {/* ===================== LEAD OPTIONS ===================== */}
        <section className="relative overflow-hidden px-6 py-16 md:py-20">
          <div className="relative z-10 mx-auto max-w-5xl">
            <Reveal>
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] text-accent/80">
                  You pick one
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white text-balance md:text-5xl">
                  Who calls the leads?
                </h2>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {leadOptions.map((option, i) => (
                <Reveal key={option.title} delay={i * 0.06}>
                  <SpotlightCard
                    className={`relative h-full rounded-2xl border p-6 backdrop-blur-sm transition-colors duration-300 sm:p-8 ${
                      option.featured
                        ? "border-accent/30 bg-accent/[0.04] hover:border-accent/50"
                        : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.14]"
                    }`}
                  >
                    <p className="text-[10px] uppercase tracking-[0.3em] text-accent/80">
                      {option.tag}
                    </p>
                    <h3 className="mt-3 text-xl font-bold tracking-tight text-white md:text-2xl">
                      {option.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.65] text-secondary">{option.body}</p>

                    <ul className="mt-5 space-y-2.5">
                      {option.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/10">
                            <CheckIcon className="h-2.5 w-2.5 text-accent" />
                          </span>
                          <span className="text-[14px] text-white/75">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <p className="mt-6 text-center text-sm text-muted">
                Not sure which one? We will help you pick on the call.
              </p>
            </Reveal>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        {/* ===================== 7 DAYS ===================== */}
        <SevenDaySection />

        {/* ===================== PROMISES ===================== */}
        <section className="relative overflow-hidden px-6 py-14 md:py-16">
          <AmbientGlow color="accent" position="center" intensity="subtle" className="opacity-40" />

          <div className="relative z-10 mx-auto max-w-4xl">
            <Reveal>
              <div className="grid gap-4 rounded-2xl border border-accent/20 bg-accent/[0.04] p-6 sm:p-8 md:grid-cols-3">
                {promises.map((promise) => (
                  <div key={promise} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/15">
                      <CheckIcon className="h-3 w-3 text-accent" />
                    </span>
                    <span className="text-[15px] font-medium leading-snug text-white/90">
                      {promise}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===================== BOOKING ===================== */}
        <DiscoveryCallSection />

        {/* ===================== FAQ ===================== */}
        <section id="faq" className="relative scroll-mt-20 overflow-hidden px-6 py-16 md:py-20">
          <BGPattern variant="dots" mask="fade-center" size={32} fill="rgba(255,255,255,0.03)" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-white md:text-4xl">
              Questions
            </h2>

            <div className="space-y-2.5">
              {socialFaqs.map((item, i) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm transition-all duration-200 open:bg-white/[0.05] hover:border-white/[0.12]"
                  onToggle={(e) => {
                    if ((e.target as HTMLDetailsElement).open) {
                      track("faq_expanded", {
                        question: item.q,
                        question_index: i,
                        action: "expanded",
                        event_category: "engagement",
                        event_label: item.q.substring(0, 50),
                      });
                    }
                  }}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between p-5 text-sm font-medium text-white">
                    <span className="pr-4">{item.q}</span>
                    <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="whitespace-pre-line px-5 pb-5 text-sm leading-relaxed text-secondary">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-10 text-center">
              <GlassButton
                variant="primary"
                size="lg"
                onClick={() => goToBooking("faq")}
                icon={<ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                className="group"
              >
                Get My Free Ad Plan
              </GlassButton>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      {/* ===================== MOBILE STICKY CTA ===================== */}
      <AnimatePresence>
        {showMobileCTA && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
            className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center md:hidden"
          >
            <button
              onClick={() => goToBooking("mobile_sticky")}
              className="pointer-events-auto group flex items-center gap-2 rounded-full border border-white/[0.15] bg-black/60 px-6 py-3 text-sm font-medium text-white shadow-[0_0_30px_-5px_var(--color-accent)] backdrop-blur-md transition-all ease-smooth active:scale-95"
            >
              Get My Free Ad Plan
              <ArrowRightIcon className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
