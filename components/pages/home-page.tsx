"use client";

import Link from "next/link";
import Image from "next/image";
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

// Why Us: each card answers a fear an owner has about agencies, in one line.
// Why Us: local first (the #1 reason owners pick us), then the fears an owner has about agencies.
const whyUs = [
  { icon: "map-pin", anim: "local", title: "We're local", body: "Our founder was born and raised in Houston. We meet you, film on your real jobs, and know which areas are worth your gas. Out of town? We fly out to film." },
  { icon: "shield", anim: "exclusive", title: "Only one per trade per area", body: "Once we take your trade in your area, we turn your competitors away. Ask if your spot is open." },
  { icon: "target", anim: "bigger", title: "Better jobs, not just more leads", body: "We aim at clients like your best ones. Fewer tire kickers, more jobs worth your time." },
  { icon: "lock", anim: "own", title: "You own everything", body: "Your ad account, your card, your videos. They stay yours, even if you leave." },
];

// Why It Works: side-by-side, one row per difference. Each row is a result the owner cares about.
// The team block in Why Us (photos in /public/home).
const team = [
  { name: "Anthony Tran", role: "Founder", photo: "/home/anthony.webp" },
  { name: "Ryan Buesa", role: "Growth Strategist", photo: "/home/ryan.webp" },
];

const compareRows: { most: string; ours: string }[] = [
  { most: "Agency in another state", ours: "Local team that comes to your job site" },
  { most: "Chase cheap leads", ours: "Go after more clients like your best ones" },
  { most: "Actors and stock photos", ours: "You and your crew on real jobs" },
  { most: "One ad for everyone", ours: "A callout for each kind of homeowner you want" },
  { most: "Leads sit for hours", ours: "Every lead gets a text in seconds" },
  { most: "Report clicks and views", ours: "Report booked jobs" },
];

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

          <Reveal className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <button type="button" onClick={() => book("services")} className={`${primaryBtn} w-full px-7 py-4 text-[16px] sm:w-auto`}>
              Get All of This: Book a Free Call <span aria-hidden="true">&rarr;</span>
            </button>
            <Link
              href="/houston-growth-engine"
              className={`group inline-flex items-center gap-2 rounded-lg text-[15px] font-bold text-[#0866FF] ${focusRing}`}
            >
              See every part
              <KitIcon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ===================== 3. WHY IT WORKS ===================== */}
      {/* One idea: most agencies chase cheap leads, we chase more of your best clients. A plain
          side-by-side anyone can read in 10 seconds, then one button into the booking quiz. */}
      <section className={`relative bg-white ${sectionPad}`}>
        <div className={`${container} relative`}>
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow>Why It Works</Eyebrow>
            <h2 className={`mt-3 ${sectionH2}`}>Most Agencies Chase Cheap Leads. We Chase Your Best Clients.</h2>
            <p className="mt-3 text-[16px] leading-[1.55] text-[#46516B] sm:text-[18px]">
              Cheap leads don&apos;t pick up and don&apos;t pay. So we find out who your best clients are, then put you in front of more people just like them.
            </p>
          </Reveal>

          <Reveal delay={0.06} className="mx-auto mt-10 max-w-4xl">
            <div className="overflow-hidden rounded-2xl border border-[#E5EDF6] bg-white shadow-[0_8px_30px_-16px_rgba(7,20,63,0.18)]">
              <div className="grid grid-cols-2 border-b border-[#E5EDF6] text-[12px] font-bold uppercase tracking-[0.16em] sm:text-[13px]">
                <p className="flex items-center gap-2 bg-[#F7F9FC] px-4 py-3.5 text-[#46516B] sm:px-6">
                  <DrawIcon name="x-circle" className="h-4 w-4 shrink-0 opacity-60" />
                  Most agencies
                </p>
                <p className="flex items-center gap-2 px-4 py-3.5 text-[#0866FF] sm:px-6">
                  <DrawIcon name="check-circle" delay={0.2} className="h-4 w-4 shrink-0" />
                  <span className="sm:hidden">Us</span>
                  <span className="hidden sm:inline">QuickLaunchWeb</span>
                </p>
              </div>
              <ul>
                {compareRows.map((r, i) => (
                  <li key={r.ours} className="grid grid-cols-2 border-b border-[#E5EDF6] last:border-b-0">
                    <p className="bg-[#F7F9FC] px-4 py-4 text-[15px] leading-[1.45] text-[#46516B] line-through decoration-[#46516B]/30 sm:px-6 sm:text-[16px]">{r.most}</p>
                    <p className="flex items-start gap-2.5 px-4 py-4 text-[15px] font-semibold leading-[1.45] text-[#07143F] sm:px-6 sm:text-[16px]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0866FF]/10">
                        <DrawIcon name="check" delay={0.3 + i * 0.12} className="h-3.5 w-3.5" />
                      </span>
                      {r.ours}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-9 flex flex-col items-center gap-3 text-center">
            <button type="button" onClick={() => book("why-it-works")} className={`${primaryBtn} w-full px-7 py-4 text-[16px] sm:w-auto`}>
              See If Your Area Is Open <span aria-hidden="true">&rarr;</span>
            </button>
            <p className="text-[14px] text-[#46516B]">We only take one business per trade in each area.</p>
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
            <h2 className={`mt-3 ${sectionH2}`}>Why Owners Pick Us</h2>
            <p className="mt-3 text-[16px] leading-[1.55] text-[#46516B] sm:text-[18px]">Most owners pick us for one reason: we&apos;re local. You can meet us, and we show up.</p>
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
          {/* The team: real faces behind the company (trust). Small, clean, official. */}
          <Reveal className="mx-auto mt-12 max-w-2xl">
            <figure className="rounded-2xl border border-[#E5EDF6] bg-white px-6 py-6 shadow-[0_10px_34px_-20px_rgba(7,20,63,0.25)] sm:px-8">
              <p className="text-center font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0866FF]">Meet the team</p>
              <ul className="mt-5 grid grid-cols-2 gap-4 sm:gap-6">
                {team.map((m) => (
                  <li key={m.name} className="flex flex-col items-center text-center sm:flex-row sm:gap-4 sm:text-left">
                    <Image
                      src={m.photo}
                      alt={`${m.name}, ${m.role} at QuickLaunchWeb`}
                      width={144}
                      height={144}
                      loading="lazy"
                      className="h-16 w-16 shrink-0 rounded-full object-cover ring-[3px] ring-white shadow-[0_0_0_1px_#DCE6F2,0_6px_18px_rgba(7,20,63,0.18)] sm:h-[72px] sm:w-[72px]"
                    />
                    <div className="mt-2.5 min-w-0 sm:mt-0">
                      <p className="text-[16px] font-extrabold leading-tight tracking-[-0.01em] text-[#07143F] sm:text-[17px]">{m.name}</p>
                      <p className="mt-0.5 text-[13px] text-[#46516B]">{m.role}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <blockquote className="mt-5 border-t border-[#EEF2F7] pt-4 text-center text-[15.5px] leading-[1.55] text-[#07143F]">
                Real people who know your market. If we can&apos;t help, we&apos;ll tell you straight.
              </blockquote>
            </figure>
          </Reveal>
          <Reveal className="mt-8 flex flex-col items-center gap-3 text-center">
            <button type="button" onClick={() => book("why-us")} className={`${primaryBtn} w-full px-7 py-4 text-[16px] sm:w-auto`}>
              Check My Area: Book a Free Call <span aria-hidden="true">&rarr;</span>
            </button>
            <p className="text-[14px] text-[#46516B]">3 quick questions, then pick a time. Under a minute.</p>
          </Reveal>
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
