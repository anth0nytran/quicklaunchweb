"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { DiscoveryCallSection } from "@/components/discovery-call";
import { BrandShell, CtaBand, useBooking } from "@/components/brand/brand-shell";
import { ResultsSection, tradeIconName } from "@/components/brand/results";
import { HeroDashboard } from "@/components/brand/hero-dashboard";
import { CloudBand, CloudCorner, TradeMarquee } from "@/components/brand/flair";
import {
  Backdrop,
  Eyebrow,
  IconCircle,
  IconTile,
  KitIcon,
  Reveal,
  container,
  focusRing,
  outlineBtn,
  primaryBtn,
  sectionH2,
  sectionPad,
} from "@/components/brand/primitives";
import { socialFaqs } from "@/lib/socialFaqData";
import { socialClients } from "@/lib/socialClients";
import { usePageTracker, useEventTracker } from "@/lib/analytics";

// Home page — the template for the light rebrand. Layout follows the approved
// mockup; artwork, icons, palette, and type come from website-assets/README-LLM.md.
// Shared frame (header, footer, CTA band, booking) lives in components/brand.

// =============================================================================
// Content
// =============================================================================

const heroChecks = ["Houston only", "Booked jobs, not just leads", "Bigger, higher-end jobs"];

/** The three offers. The Engine is the flagship; the other two support it. */
const offers = {
  engine: {
    eyebrow: "Our flagship",
    title: "Houston Growth Engine",
    body: "Video, Meta ads, instant follow-up, and our team qualifying and booking your estimates. One system, measured in booked jobs and revenue.",
    points: [
      "Content that sells before you show up",
      "Ads aimed at bigger tickets",
      "Every lead texted in seconds",
      "We qualify and book the estimate",
    ],
    href: "/houston-growth-engine",
    cta: "See the Engine",
  },
  others: [
    {
      icon: "search",
      eyebrow: "Get found",
      title: "AI Search & SEO",
      body: "Show up on Google, Google Maps, and AI search like ChatGPT when Houston homeowners look for your trade. Three packages.",
      href: "/services/web-design",
      cta: "See the packages",
    },
    {
      icon: "automation",
      eyebrow: "Save time, make money",
      title: "Automations & Software",
      body: "We diagnose how your business runs, then build the automations, AI receptionist, or custom software that makes or saves you money.",
      href: "/services/automations",
      cta: "See automations",
    },
  ],
};

const steps = [
  {
    icon: "calendar",
    title: "Strategy Call",
    body: "We learn about your business, your goals, and find the biggest growth opportunities.",
  },
  {
    icon: "target",
    title: "Build Your System",
    body: "We make your videos and ads, and set up lead forms, follow-up, and booking.",
  },
  {
    icon: "growth",
    title: "Get More Leads",
    body: "Your business starts getting more calls, form submissions, and booked jobs.",
  },
  {
    icon: "rocket",
    title: "Grow & Scale",
    body: "We optimize, scale what's working, and help you hit your next level of growth.",
  },
];

// =============================================================================
// Sections (inside BrandShell so they can use useBooking)
// =============================================================================

function HomeSections() {
  const book = useBooking();
  const { track } = useEventTracker();
  const clientsWithQuotes = socialClients.filter((c) => c.quote);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EFF8FF] to-[#f7fbff] pb-16 pt-[104px] sm:pt-28 lg:pb-28 lg:pt-32">
        <Backdrop variant="dots" />
        <CloudBand className="opacity-60" />
        <div className={`${container} relative z-10 grid items-center gap-10 md:grid-cols-[1fr_1fr] lg:grid-cols-[1.05fr_1fr] lg:gap-8 xl:grid-cols-[1.2fr_1fr]`}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow className="!text-[#46516B]">Marketing for Houston home service businesses</Eyebrow>

            <h1 className="mt-4 text-[38px] font-extrabold leading-[1.07] tracking-[-0.04em] sm:text-[48px] lg:text-[50px] xl:text-[52px] 2xl:text-[58px]">
              More Calls. More <br className="hidden xl:block" />
              <span className="xl:whitespace-nowrap">
                Booked Jobs. <span className="text-[#0866FF]">Less Chasing.</span>
              </span>
            </h1>

            <p className="mt-5 max-w-[34rem] text-[17px] leading-[1.55] text-[#46516B] sm:text-[18px]">
              We&apos;re a Houston team that measures success in booked jobs and revenue, not lead
              counts. Our Houston Growth Engine brings home service businesses bigger, higher-end jobs,
              booked right onto the calendar.
            </p>

            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
              <button type="button" onClick={() => book("hero")} className={`${primaryBtn} px-7 py-4 text-[16px]`}>
                Book a Free Strategy Call
                <KitIcon name="arrow-right" white className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button type="button" onClick={() => scrollTo("results")} className={`${outlineBtn} px-7 py-4 text-[16px]`}>
                See Our Work
                <KitIcon name="play" className="h-4 w-4" />
              </button>
            </div>

            <ul className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
              {heroChecks.map((item) => (
                <li key={item} className="flex items-center gap-2 text-[15px] font-medium text-[#46516B]">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0866FF]/10">
                    <KitIcon name="check" className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-[660px] xl:-mr-6 xl:w-[calc(100%+24px)] xl:max-w-none"
          >
            <HeroDashboard />
          </motion.div>
        </div>
      </section>

      {/* ===================== CLIENTS ===================== */}
      <section className="border-y border-[#E5EDF6] bg-[#EFF8FF] py-9 sm:py-10">
        <div className={container}>
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-[#46516B] sm:text-[12px]">
            Houston businesses we work with
          </p>
          <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 lg:grid-cols-4">
            {socialClients.map((client) => {
              return (
                <li key={client.name} className="flex items-center justify-center gap-2.5">
                  <KitIcon name={tradeIconName(client.trade)} className="h-8 w-8 shrink-0" />
                  <div className="leading-none">
                    <p className="text-[13px] font-extrabold uppercase tracking-[0.06em] text-[#46516B] sm:text-[14px]">
                      {client.name}
                    </p>
                    <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#46516B]/70 sm:text-[10px]">
                      {client.trade}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-8">
            <TradeMarquee />
          </div>
        </div>
      </section>

      {/* ===================== OFFERS ===================== */}
      <section id="services" className={`relative scroll-mt-20 overflow-hidden bg-white ${sectionPad}`}>
        <Backdrop variant="dots" />
        <CloudCorner className="-right-12 top-16 hidden w-48 opacity-40 xl:block" />
        <div className={`${container} relative`}>
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow>What We Do</Eyebrow>
            <h2 className={`mt-3 ${sectionH2}`}>One Engine That Books Jobs. Two Ways to Power It Up.</h2>
            <p className="mt-3 text-[16px] leading-[1.55] text-[#46516B] sm:text-[18px]">
              Every service starts with a free strategy call. We&apos;ll tell you which one actually fits your
              business.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:grid-rows-2">
            {/* Flagship */}
            <Reveal className="lg:row-span-2">
              <Link
                href={offers.engine.href}
                className={`group relative flex h-full flex-col overflow-hidden rounded-xl bg-gradient-to-br from-[#0753CF] via-[#0866FF] to-[#2b7bff] p-7 text-white shadow-[0_24px_60px_-28px_rgba(8,102,255,0.7)] sm:p-9 ${focusRing}`}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-25"
                  aria-hidden="true"
                  style={{
                    backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
                    backgroundSize: "24px 24px",
                    maskImage: "linear-gradient(135deg, transparent 20%, black 90%)",
                    WebkitMaskImage: "linear-gradient(135deg, transparent 20%, black 90%)",
                  }}
                />
                <div className="relative flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 p-2.5">
                    <KitIcon name="rocket" white className="h-full w-full" />
                  </span>
                  <span className="rounded-full bg-white/15 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.18em]">
                    {offers.engine.eyebrow}
                  </span>
                </div>
                <h3 className="relative mt-6 text-[28px] font-extrabold leading-tight tracking-[-0.03em] sm:text-[34px]">
                  {offers.engine.title}
                </h3>
                <p className="relative mt-3 max-w-xl text-[16px] leading-[1.6] text-white/85 sm:text-[17px]">
                  {offers.engine.body}
                </p>
                <ul className="relative mt-6 grid flex-1 content-start gap-3 sm:grid-cols-2">
                  {offers.engine.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 rounded-lg bg-white/10 px-3.5 py-3 text-[15px] font-medium">
                      <KitIcon name="check" white className="mt-0.5 h-4 w-4 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
                <span className="relative mt-8 inline-flex w-fit items-center gap-2.5 rounded-xl bg-white px-6 py-3.5 text-[16px] font-bold text-[#0866FF] transition-colors group-hover:bg-[#EFF8FF]">
                  {offers.engine.cta}
                  <KitIcon name="arrow-right" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>

            {/* Supporting offers */}
            {offers.others.map((offer, i) => (
              <Reveal key={offer.title} delay={0.06 + i * 0.06}>
                <Link
                  href={offer.href}
                  className={`group flex h-full gap-5 rounded-xl border border-[#E5EDF6] bg-white p-6 shadow-[0_8px_30px_-16px_rgba(7,20,63,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0866FF]/30 sm:p-7 ${focusRing}`}
                >
                  <IconTile name={offer.icon} />
                  <div className="flex flex-col">
                    <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#0866FF]">{offer.eyebrow}</p>
                    <h3 className="mt-1 text-[21px] font-extrabold tracking-[-0.02em]">{offer.title}</h3>
                    <p className="mt-2 flex-1 text-[15px] leading-[1.6] text-[#46516B]">{offer.body}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[15px] font-bold text-[#0866FF]">
                      {offer.cta}
                      <KitIcon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ResultsSection />

      {/* ===================== PROCESS ===================== */}
      <section id="how-it-works" className={`relative scroll-mt-20 overflow-hidden bg-white ${sectionPad}`}>
        <Backdrop variant="glow" />
        <div className={`${container} relative`}>
          <Reveal className="text-center">
            <Eyebrow>How It Works</Eyebrow>
            <h2 className={`mt-3 ${sectionH2}`}>A Simple Process. Real Results.</h2>
            <p className="mx-auto mt-3 max-w-2xl text-[16px] leading-[1.5] text-[#46516B] sm:text-[18px]">
              We make it easy to get started and start seeing results — without the stress.
            </p>
          </Reveal>

          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, i) => (
              <li key={step.title} className="relative">
                <Reveal delay={i * 0.07} className="flex items-start gap-4">
                  <IconCircle name={step.icon} />
                  <div className="lg:pr-6">
                    <h3 className="text-[17px] font-bold">
                      {i + 1}. {step.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-[1.5] text-[#46516B]">{step.body}</p>
                  </div>
                </Reveal>
                {i < steps.length - 1 && (
                  <KitIcon name="arrow-right" className="absolute -right-1 top-5 hidden h-5 w-5 lg:block" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===================== TESTIMONIALS (approved quotes only) ===================== */}
      {clientsWithQuotes.length > 0 && (
        <section className={`relative overflow-hidden bg-[#EFF8FF] ${sectionPad}`}>
          <Backdrop variant="dots" />
          <div
            className={`${container} relative ${
              clientsWithQuotes.length < 3 ? "grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12" : ""
            }`}
          >
            <Reveal
              className={
                clientsWithQuotes.length < 3
                  ? "flex flex-col gap-4"
                  : "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
              }
            >
              <div>
                <Eyebrow className="!text-[#46516B]">What Our Clients Say</Eyebrow>
                <h2 className={`mt-3 ${sectionH2}`}>Real Business Owners. Real Results.</h2>
              </div>
              <button
                type="button"
                onClick={() => scrollTo("results")}
                className={`group inline-flex items-center gap-2 rounded-lg text-[15px] font-bold text-[#0866FF] ${focusRing}`}
              >
                Case Studies Coming Soon
                <KitIcon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Reveal>

            <div
              className={
                clientsWithQuotes.length < 3 ? "grid gap-6" : "mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              }
            >
              {clientsWithQuotes.map((client, i) => (
                <Reveal key={client.name} delay={i * 0.06}>
                  <figure className="flex h-full gap-4 rounded-xl border border-[#E5EDF6] bg-white p-6 shadow-[0_8px_30px_-14px_rgba(7,20,63,0.15)]">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EFF8FF] p-2.5">
                      <KitIcon name="quote" className="h-full w-full" />
                    </span>
                    <div className="flex flex-col">
                      <blockquote
                        className={`leading-[1.6] ${
                          clientsWithQuotes.length < 3 ? "text-[17px] text-[#07143F] sm:text-[19px]" : "text-[15px] text-[#46516B]"
                        }`}
                      >
                        &ldquo;{client.quote}&rdquo;
                      </blockquote>
                      <figcaption className="mt-5 flex items-center gap-3">
                        {client.photo ? (
                          <Image
                            src={client.photo}
                            alt={client.person ?? client.name}
                            width={48}
                            height={48}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        ) : (
                          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0866FF] text-lg font-bold text-white">
                            {(client.person ?? client.name).charAt(0)}
                          </span>
                        )}
                        <div className="leading-snug">
                          <p className="text-[15px] font-bold">{client.person ?? client.name}</p>
                          <p className="text-[13px] text-[#46516B]">{client.person ? client.name : client.trade}</p>
                          <p className="text-[13px] text-[#46516B]">{client.city}</p>
                        </div>
                      </figcaption>
                    </div>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />

      {/* ===================== BOOKING ===================== */}
      <DiscoveryCallSection
        theme="light"
        eyebrow="BOOK YOUR FREE STRATEGY CALL"
        heading={
          <>
            5 Quick Questions. Then <span className="text-[#0866FF]">Pick a Time</span>.
          </>
        }
      />

      {/* ===================== FAQ ===================== */}
      <section id="faq" className={`scroll-mt-20 bg-white ${sectionPad}`}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal className="text-center">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className={`mt-3 ${sectionH2}`}>Questions Owners Ask Us</h2>
          </Reveal>

          <div className="mt-10 space-y-3">
            {socialFaqs.map((item, i) => (
              <details
                key={item.q}
                className="group rounded-xl border border-[#E5EDF6] bg-white transition-all open:shadow-[0_10px_30px_-14px_rgba(7,20,63,0.2)]"
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
        </div>
      </section>
    </>
  );
}

export default function HomePage() {
  usePageTracker("QuickLaunchWeb - Home (Facebook Ads & Video, Houston)", "homepage");
  return (
    <BrandShell pagePath="/">
      <HomeSections />
    </BrandShell>
  );
}
