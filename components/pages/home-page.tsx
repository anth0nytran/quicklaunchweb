"use client";

import Link from "next/link";
import { DiscoveryCallSection } from "@/components/discovery-call";
import { BrandShell, CtaBand, useBooking } from "@/components/brand/brand-shell";
import { ResultsSection } from "@/components/brand/results";
import { ClientLogoGrid } from "@/components/brand/client-logo-grid";
import { HeroScene, HeroSceneMobile, useHero3D } from "@/components/brand/hero-art";
import { HowItWorksCutaway } from "@/components/brand/how-it-works-cutaway";
import { AnimatedIcon } from "@/components/brand/animated-icon";
import {
  Backdrop,
  Eyebrow,
  DrawIcon,
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
import { usePageTracker, useEventTracker } from "@/lib/analytics";

// Home page. Copy rules: 3rd-grade reading level, short lines, plain words.
// The promise is more calls, more booked jobs, more money. Video of the real
// contractor on the real job is HOW. Price is only on the call. No guarantee.
// Only real numbers (lib/adResults.ts). Never say "call center": say "our team".
// Section order: hero, what we do, why it works, how it works, proof, why us,
// FAQ, book a call.

// =============================================================================
// Content
// =============================================================================

const heroChecks = ["Houston-based", "One business per trade per area", "You own your ad account"];

// anim: the animated 3D icon (public/icons3d/<anim>.mp4 + .webp)
const services: { anim: string; title: string; body: string; href?: string }[] = [
  { anim: "camera", title: "Videos", body: "We film you on your real jobs." },
  { anim: "ads", title: "Facebook & Instagram Ads", body: "We show your videos to Houston homeowners." },
  { anim: "google", title: "Google", body: "Homeowners find you on Google and Maps.", href: "/services/web-design" },
  { anim: "booked", title: "Our Team Books Your Leads", body: "We call, check, and book the job for you." },
  { anim: "texts", title: "Follow-Up Texts", body: "Every lead gets a text in 60 seconds." },
  { anim: "website", title: "Website & CRM", body: "One place to see every lead and every job.", href: "/services/automations" },
];

const whyUs = [
  { icon: "map-pin", anim: "local", title: "Houston-based", body: "We live here and know which areas are worth your gas. Out of town? We fly out to film." },
  { icon: "shield", anim: "exclusive", title: "One business per trade per area", body: "We won't run ads for the guy down the street." },
  { icon: "lock", anim: "own", title: "You own your ad account", body: "Your ads. Your card. You see every dollar." },
  { icon: "target", anim: "bigger", title: "Built for bigger jobs", body: "We aim your ads at jobs worth your time." },
];

const mostAds = ["Stock photos", "Actors reading a script", "Nobody knows who shows up", "Homeowners scroll past"];
const ourAds = ["You, on your real job", "Your crew, your trucks, your work", "Homeowners know who is coming", "They trust you before you call"];

// =============================================================================
// Sections (inside BrandShell so they can use useBooking)
// =============================================================================

function HomeSections() {
  const book = useBooking();
  const { track } = useEventTracker();

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const hero3d = useHero3D();

  return (
    <>
      {/* ===================== 1. HERO ===================== */}
      {/* A place, not a picture with text on it: the plaza plate has a blank glass sign on the left and the
          launch pad on the right. On desktop the headline is placed onto that sign (measured from the plate),
          the buttons stand on the plaza in front of it, and the ship lands on the pad. Phones stack simply. */}
      <section data-hero-stage className="ql-hero relative overflow-hidden bg-[#E9E9E6] lg:h-[min(100vh,56vw)] lg:bg-white">
        <HeroScene mode={hero3d} />
        <HeroSceneMobile />
        <div className={`${container} lg:max-w-none lg:px-0`}>
          {/* Fine scan lines across the sign's glass (desktop). */}
          <div aria-hidden="true" className="ql-sign-rect ql-holo-scan ql-sign-flicker pointer-events-none hidden lg:block" />
          {/* On the glass sign (desktop) / top of the stack (phones). Real HTML for SEO. */}
          <div className="ql-sign ql-hero-copy">
            {/* The eyebrow lives inside the H1 so the heading carries the target phrase
                ("Houston marketing for home service businesses") without changing the look. */}
            <h1 className="text-[36px] font-extrabold leading-[1.05] tracking-[-0.035em] text-[#07143F] sm:text-[46px]">
              <span className="ql-sign-eyebrow mb-3 block text-[11px] font-semibold uppercase leading-normal tracking-[0.2em] text-[#46516B]">
                Houston marketing for home service businesses
              </span>
              {/* Rocket wordplay: launch / land, same promise (calls, booked jobs, money). */}
              <span className="block">Launch More Calls.</span>
              <span className="block">Land More Jobs.</span>
              <span className="block text-[#0866FF]">Make More Money.</span>
            </h1>
            <p className="mt-4 max-w-[30rem] text-[17px] leading-[1.5] text-[#46516B] sm:text-[18px]">
              We film your work, run your ads, and book the jobs for you.
            </p>
          </div>

          {/* In front of the sign, on the plaza (desktop) / under the copy (phones). */}
          <div className="ql-sign-cta ql-hero-copy mt-7 lg:mt-0">
            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => book("hero")} className={`${primaryBtn} whitespace-nowrap px-7 py-4 text-[16px]`}>
                Book a Free Call
                <KitIcon name="arrow-right" white className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button type="button" onClick={() => scrollTo("results")} className={`${outlineBtn} whitespace-nowrap bg-white/85 px-7 py-4 text-[16px] backdrop-blur`}>
                See Our Clients
                <KitIcon name="arrow-right" className="h-4 w-4" />
              </button>
            </div>
            <ul className="mt-5 hidden flex-wrap gap-x-5 gap-y-2.5 xl:flex">
              {heroChecks.map((item) => (
                <li key={item} className="flex items-center gap-2 text-[15px] font-medium text-[#46516B]">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0866FF]/10">
                    <KitIcon name="check" className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===================== TRUST LINE: client logos ===================== */}
      <section className="bg-gradient-to-b from-[#F7FBFF] to-white py-9 sm:py-10" aria-label="Houston businesses we've helped">
        <div className={container}>
          <ul className="mb-7 flex flex-wrap justify-center gap-x-4 gap-y-2 xl:hidden">
            {heroChecks.map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-[13.5px] font-medium text-[#46516B]">
                <KitIcon name="check" className="h-3.5 w-3.5" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-[#46516B] sm:text-[12px]">
            Houston businesses we&apos;ve helped
          </p>
          <ClientLogoGrid className="mt-7" />
        </div>
      </section>

      {/* ===================== 2. WHAT WE DO ===================== */}
      <section id="services" className={`relative scroll-mt-20 overflow-hidden bg-white ${sectionPad}`}>
        <Backdrop variant="dots" />
        <div className={`${container} relative`}>
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow>What We Do</Eyebrow>
            <h2 className={`mt-3 ${sectionH2}`}>We Do the Marketing. You Do the Work.</h2>
            <p className="mt-3 text-[16px] leading-[1.55] text-[#46516B] sm:text-[18px]">
              Everything it takes to turn a stranger into a booked job.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const inner = (
                <>
                  <AnimatedIcon name={s.anim} size={76} offset={i * 0.8} className="-my-2 -ml-2" />
                  <div>
                    <h3 className="text-[19px] font-extrabold tracking-[-0.02em]">{s.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-[1.55] text-[#46516B]">{s.body}</p>
                    {s.href && (
                      <span className="mt-2 inline-flex items-center gap-1.5 text-[14px] font-bold text-[#0866FF]">
                        Learn more
                        <KitIcon name="arrow-right" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    )}
                  </div>
                </>
              );
              const card =
                "group flex h-full items-start gap-4 rounded-xl border border-[#E5EDF6] bg-white p-6 shadow-[0_8px_30px_-16px_rgba(7,20,63,0.18)]";
              return (
                <li key={s.title}>
                  <Reveal delay={i * 0.04} className="h-full">
                    {s.href ? (
                      <Link
                        href={s.href}
                        className={`${card} transition-all duration-300 hover:-translate-y-1 hover:border-[#0866FF]/30 ${focusRing}`}
                      >
                        {inner}
                      </Link>
                    ) : (
                      <div className={card}>{inner}</div>
                    )}
                  </Reveal>
                </li>
              );
            })}
          </ul>

          <Reveal className="mt-10 text-center">
            <Link
              href="/houston-growth-engine"
              className={`group inline-flex items-center gap-2 rounded-lg text-[16px] font-bold text-[#0866FF] ${focusRing}`}
            >
              See every part of the Houston Growth Engine
              <KitIcon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ===================== 3. WHY IT WORKS ===================== */}
      <section className={`relative overflow-hidden bg-gradient-to-b from-white via-[#EFF8FF] to-white ${sectionPad}`}>
        <Backdrop variant="glow" />
        <div className={`${container} relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14`}>
          <Reveal>
            <Eyebrow>Why It Works</Eyebrow>
            <h2 className={`mt-3 ${sectionH2}`}>Homeowners Trust a Face.</h2>
            <div className="mt-5 space-y-2 text-[17px] leading-[1.55] text-[#46516B] sm:text-[18px]">
              <p>People hire who they trust.</p>
              <p>So we film you. The real you. On the real job.</p>
              <p>No actors. No stock photos.</p>
              <p className="font-semibold text-[#07143F]">Homeowners see your work and your face. Then they call.</p>
            </div>
          </Reveal>
          <Reveal delay={0.07}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[#E5EDF6] bg-[#F7F9FC] p-6">
                <p className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.18em] text-[#46516B]">
                  <DrawIcon name="x-circle" className="h-5 w-5 opacity-60" />
                  Most ads
                </p>
                <ul className="mt-4 space-y-3">
                  {mostAds.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] leading-[1.5] text-[#46516B]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#46516B]/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border-2 border-[#0866FF]/40 bg-white p-6 shadow-[0_20px_50px_-24px_rgba(8,102,255,0.35)]">
                <p className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.18em] text-[#0866FF]">
                  <DrawIcon name="check-circle" delay={0.2} className="h-5 w-5" />
                  Our ads
                </p>
                <ul className="mt-4 space-y-3">
                  {ourAds.map((item, i) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] font-medium leading-[1.5] text-[#07143F]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0866FF]/10">
                        <DrawIcon name="check" delay={0.4 + i * 0.15} className="h-3.5 w-3.5" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== 4. HOW IT WORKS (the ship, step by step) ===================== */}
      <HowItWorksCutaway />

      {/* ===================== 5. PROOF ===================== */}
      <ResultsSection />

      {/* ===================== 6. WHY US ===================== */}
      <section className={`relative overflow-hidden bg-white ${sectionPad}`}>
        <div className={`${container} relative`}>
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow>Why Us</Eyebrow>
            <h2 className={`mt-3 ${sectionH2}`}>Why Houston Owners Pick Us</h2>
          </Reveal>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={i * 0.05} className="h-full">
                  <div className="h-full rounded-xl border border-[#E5EDF6] bg-white p-6 shadow-[0_8px_30px_-16px_rgba(7,20,63,0.18)]">
                    <AnimatedIcon name={item.anim} size={76} offset={i * 0.8} className="-ml-2 -mt-2" />
                    <h3 className="mt-2 text-[18px] font-extrabold tracking-[-0.02em]">{item.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-[1.55] text-[#46516B]">{item.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />

      {/* ===================== 7. FAQ ===================== */}
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

      {/* ===================== 8. BOOK A CALL ===================== */}
      <DiscoveryCallSection theme="light" />
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
