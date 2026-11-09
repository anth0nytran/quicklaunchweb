"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DiscoveryCallSection } from "@/components/discovery-call";
import { BrandShell, CtaBand, useBooking } from "@/components/brand/brand-shell";
import { ResultsSection } from "@/components/brand/results";
import { ClientLogoGrid } from "@/components/brand/client-logo-grid";
import { HeroDashboard } from "@/components/brand/hero-dashboard";
import { CloudBand, CloudCorner } from "@/components/brand/flair";
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

const heroChecks = ["Houston only", "One business per trade per area", "You own your ad account"];

const services: { icon: string; title: string; body: string; href?: string }[] = [
  { icon: "video-camera", title: "Videos", body: "We film you on your real jobs." },
  { icon: "ads", title: "Facebook & Instagram Ads", body: "We show your videos to Houston homeowners." },
  { icon: "search", title: "Google", body: "Homeowners find you on Google and Maps.", href: "/services/web-design" },
  { icon: "calendar", title: "Our Team Books Your Leads", body: "We call, check, and book the job for you." },
  { icon: "phone-message", title: "Follow-Up Texts", body: "Every lead gets a text in 60 seconds." },
  { icon: "website", title: "Website & CRM", body: "One place to see every lead and every job.", href: "/services/automations" },
];

const steps = [
  { icon: "rocket", title: "We Set It Up", body: "Your ads, your texts, your calendar. We do it all." },
  { icon: "video-camera", title: "We Film and Run Ads", body: "We film you on a job. Then your ads go live." },
  { icon: "calendar", title: "Our Team Books the Jobs", body: "We text every lead. We call. We book it." },
  { icon: "growth", title: "Every Monday, You See It", body: "Calls, jobs, and money made. On one page." },
];

const whyUs = [
  { icon: "map-pin", title: "Houston only", body: "We live here. We know which areas are worth your gas." },
  { icon: "shield", title: "One business per trade per area", body: "We won't run ads for the guy down the street." },
  { icon: "lock", title: "You own your ad account", body: "Your ads. Your card. You see every dollar." },
  { icon: "target", title: "Built for bigger jobs", body: "We aim your ads at jobs worth your time." },
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

  return (
    <>
      {/* ===================== 1. HERO ===================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EFF8FF] to-[#f7fbff] pb-16 pt-[104px] sm:pt-28 lg:pb-28 lg:pt-32">
        <Backdrop variant="dots" />
        <CloudBand className="opacity-60" />
        <div className={`${container} relative z-10 grid items-center gap-10 md:grid-cols-[1fr_1fr] lg:grid-cols-[1.05fr_1fr] lg:gap-8 xl:grid-cols-[1.2fr_1fr]`}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* The eyebrow lives inside the H1 so the heading carries the target phrase
                ("Houston marketing for home service businesses") without changing the look. */}
            <h1 className="text-[40px] font-extrabold leading-[1.07] tracking-[-0.04em] sm:text-[50px] lg:text-[52px] xl:text-[56px] 2xl:text-[60px]">
              <span className="mb-4 block text-[12px] font-semibold uppercase leading-normal tracking-[0.2em] text-[#46516B]">
                Houston marketing for home service businesses
              </span>
              More Calls. <br />
              More Booked Jobs. <br />
              <span className="text-[#0866FF]">More Money.</span>
            </h1>

            <p className="mt-5 max-w-[34rem] text-[18px] leading-[1.55] text-[#46516B] sm:text-[19px]">
              We film you on the job, run your ads, and our team books the jobs for you. Houston only.
            </p>

            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
              <button type="button" onClick={() => book("hero")} className={`${primaryBtn} px-7 py-4 text-[16px]`}>
                Book a Free Call
                <KitIcon name="arrow-right" white className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button type="button" onClick={() => scrollTo("results")} className={`${outlineBtn} px-7 py-4 text-[16px]`}>
                See Our Clients
                <KitIcon name="arrow-right" className="h-4 w-4" />
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

      {/* ===================== TRUST LINE: client logos ===================== */}
      <section className="border-y border-[#E5EDF6] bg-[#EFF8FF] py-9 sm:py-10" aria-label="Houston businesses we've helped">
        <div className={container}>
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-[#46516B] sm:text-[12px]">
            Houston businesses we&apos;ve helped
          </p>
          <ClientLogoGrid className="mt-7" />
        </div>
      </section>

      {/* ===================== 2. WHAT WE DO ===================== */}
      <section id="services" className={`relative scroll-mt-20 overflow-hidden bg-white ${sectionPad}`}>
        <Backdrop variant="dots" />
        <CloudCorner className="-right-12 top-16 hidden w-48 opacity-40 xl:block" />
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
                  <IconTile name={s.icon} />
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
      <section className={`relative overflow-hidden bg-[#EFF8FF] ${sectionPad}`}>
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
                  <KitIcon name="x-circle" className="h-5 w-5 opacity-60" />
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
                  <KitIcon name="check-circle" className="h-5 w-5" />
                  Our ads
                </p>
                <ul className="mt-4 space-y-3">
                  {ourAds.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] font-medium leading-[1.5] text-[#07143F]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0866FF]/10">
                        <KitIcon name="check" className="h-3.5 w-3.5" />
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

      {/* ===================== 4. HOW IT WORKS ===================== */}
      <section id="how-it-works" className={`relative scroll-mt-20 overflow-hidden bg-white ${sectionPad}`}>
        <Backdrop variant="dots" />
        <div className={`${container} relative`}>
          <Reveal className="text-center">
            <Eyebrow>How It Works</Eyebrow>
            <h2 className={`mt-3 ${sectionH2}`}>Four Simple Steps.</h2>
            <p className="mx-auto mt-3 max-w-2xl text-[16px] leading-[1.5] text-[#46516B] sm:text-[18px]">
              About an hour of your time the first week. We do the rest.
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
                    <p className="mt-1.5 text-[15px] leading-[1.5] text-[#46516B]">{step.body}</p>
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
                    <IconCircle name={item.icon} />
                    <h3 className="mt-4 text-[18px] font-extrabold tracking-[-0.02em]">{item.title}</h3>
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
