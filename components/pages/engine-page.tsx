"use client";

import Link from "next/link";
import { DiscoveryCallSection } from "@/components/discovery-call";
import { BrandShell, CtaBand, PageHero } from "@/components/brand/brand-shell";
import { ResultsSection, ResultsStatCard } from "@/components/brand/results";
import { ClientLogoStrip } from "@/components/brand/client-logo-grid";
import { Backdrop, Eyebrow, IconCircle, IconTile, KitIcon, Reveal } from "@/components/brand/primitives";
import { container, focusRing, sectionH2, sectionPad } from "@/components/brand/tokens";
import { engine } from "@/lib/engineData";
import { socialFaqs } from "@/lib/socialFaqData";
import { usePageTracker, useEventTracker } from "@/lib/analytics";

// The flagship offer page. Same plain voice as the home page (3rd-grade level).
// Order: the promise, the usual way vs. the Engine, each part in detail, who
// it's for, real numbers, how it starts, then the call. Copy lives in
// lib/engineData.ts. Price stays off the site.

const stepIcons = ["calendar", "target", "rocket", "growth"];

function Sections() {
  const { track } = useEventTracker();

  return (
    <>
      <PageHero
        eyebrow="Done-for-you video ads for Houston home services"
        eyebrowInHeading
        title={
          <>
            More Calls. More Booked Jobs. <span className="text-[#0866FF]">More Money.</span>
          </>
        }
        intro={
          <p>
            We film you on your real jobs. We run your Facebook and Instagram ads. Every lead gets a text in
            60 seconds. Then our team calls and books the job for you.
          </p>
        }
        art={<ResultsStatCard />}
        secondary={{ label: "See What's Inside", href: "#inside" }}
      >
        <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
          {["Houston-based", "One business per trade per area", "Live in 7 days"].map((item) => (
            <li key={item} className="flex items-center gap-2 text-[15px] font-medium text-[#46516B]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0866FF]/10">
                <KitIcon name="check" className="h-3.5 w-3.5" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </PageHero>

      <ClientLogoStrip />

      {/* ===================== OLD WAY vs ENGINE ===================== */}
      <section className={`relative overflow-hidden bg-white ${sectionPad}`}>
        <Backdrop variant="dots" />
        <div className={`${container} relative`}>
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow>Sound Familiar?</Eyebrow>
            <h2 className={`mt-3 ${sectionH2}`}>Leads Don&apos;t Pay the Bills. Booked Jobs Do.</h2>
            <p className="mt-4 text-[16px] leading-[1.6] text-[#46516B] sm:text-[18px]">
              Most marketing stops at the lead. We don&apos;t. We take it all the way to your calendar.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-xl border border-[#E5EDF6] bg-[#F7F9FC] p-6 sm:p-8">
                <p className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.18em] text-[#46516B]">
                  <KitIcon name="x-circle" className="h-5 w-5 opacity-60" />
                  The usual way
                </p>
                <ul className="mt-5 space-y-3.5">
                  {engine.oldWay.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] leading-[1.55] text-[#46516B] sm:text-[16px]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#46516B]/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full rounded-xl border-2 border-[#0866FF]/40 bg-white p-6 shadow-[0_20px_50px_-24px_rgba(8,102,255,0.35)] sm:p-8">
                <p className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.18em] text-[#0866FF]">
                  <KitIcon name="check-circle" className="h-5 w-5" />
                  The Houston Growth Engine
                </p>
                <ul className="mt-5 space-y-3.5">
                  {engine.newWay.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] font-medium leading-[1.55] text-[#07143F] sm:text-[16px]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0866FF]/10">
                        <KitIcon name="check" className="h-3.5 w-3.5" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== WHAT'S INSIDE ===================== */}
      <section id="inside" className={`relative scroll-mt-20 overflow-hidden bg-[#EFF8FF] ${sectionPad}`}>
        <Backdrop variant="glow" />
        <div className={`${container} relative`}>
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow>What&apos;s Inside the Engine</Eyebrow>
            <h2 className={`mt-3 ${sectionH2}`}>Five Parts. One Job: Fill Your Calendar.</h2>
            <p className="mt-4 text-[16px] leading-[1.6] text-[#46516B] sm:text-[18px]">
              Each part fixes a spot where you lose money. Together they turn a stranger into a booked job.
            </p>
          </Reveal>

          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {engine.parts.map((part, i) => (
              <li key={part.title} className={i === 0 ? "lg:col-span-1" : ""}>
                <Reveal delay={i * 0.05} className="h-full">
                  <article className="flex h-full flex-col rounded-xl border border-[#E5EDF6] bg-white p-6 shadow-[0_8px_30px_-16px_rgba(7,20,63,0.2)] sm:p-7">
                    <div className="flex items-center gap-4">
                      <IconTile name={part.icon} />
                      <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0866FF]">
                        Part {i + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 text-[20px] font-extrabold leading-snug tracking-[-0.02em]">{part.title}</h3>
                    <p className="mt-2 text-[15px] leading-[1.6] text-[#46516B]">{part.body}</p>
                    <ul className="mt-5 space-y-2 border-t border-[#E5EDF6] pt-5">
                      {part.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-[14px] text-[#07143F]">
                          <KitIcon name="check" className="mt-0.5 h-4 w-4 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              </li>
            ))}
            {/* Sixth tile: the scarcity rule, so the grid closes cleanly */}
            <li>
              <Reveal delay={0.25} className="h-full">
                <div className="flex h-full flex-col justify-between rounded-xl bg-gradient-to-br from-[#0753CF] to-[#0866FF] p-6 text-white shadow-[0_20px_50px_-24px_rgba(8,102,255,0.6)] sm:p-7">
                  <div>
                    <KitIcon name="map-pin" white className="h-9 w-9" />
                    <h3 className="mt-5 text-[22px] font-extrabold leading-snug tracking-[-0.02em]">
                      One business per trade, per area.
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.6] text-white/85">
                      We won&apos;t run ads for the guy down the street. If your trade is taken in your area,
                      it&apos;s taken.
                    </p>
                  </div>
                  <p className="mt-6 text-[14px] font-semibold text-white">Ask on your free call if your area is open.</p>
                </div>
              </Reveal>
            </li>
          </ol>
        </div>
      </section>

      {/* ===================== FOR / NOT FOR ===================== */}
      <section className={`relative overflow-hidden bg-white ${sectionPad}`}>
        <div className={`${container} relative`}>
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow>Is This for You?</Eyebrow>
            <h2 className={`mt-3 ${sectionH2}`}>This Is Not for Everyone. On Purpose.</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-xl border border-[#E5EDF6] bg-white p-6 shadow-[0_4px_20px_-10px_rgba(7,20,63,0.12)] sm:p-8">
                <h3 className="flex items-center gap-2.5 text-[18px] font-extrabold">
                  <KitIcon name="check-circle" className="h-6 w-6" />
                  It&apos;s a fit if
                </h3>
                <ul className="mt-5 space-y-3">
                  {engine.forYou.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] leading-[1.55] text-[#07143F] sm:text-[16px]">
                      <KitIcon name="check" className="mt-1 h-4 w-4 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full rounded-xl border border-[#E5EDF6] bg-[#F7F9FC] p-6 sm:p-8">
                <h3 className="flex items-center gap-2.5 text-[18px] font-extrabold text-[#46516B]">
                  <KitIcon name="x-circle" className="h-6 w-6 opacity-60" />
                  It&apos;s not a fit if
                </h3>
                <ul className="mt-5 space-y-3">
                  {engine.notForYou.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] leading-[1.55] text-[#46516B] sm:text-[16px]">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#46516B]/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ResultsSection />

      {/* ===================== PROCESS ===================== */}
      <section className={`relative overflow-hidden bg-white ${sectionPad}`}>
        <Backdrop variant="dots" />
        <div className={`${container} relative`}>
          <Reveal className="text-center">
            <Eyebrow>How It Starts</Eyebrow>
            <h2 className={`mt-3 ${sectionH2}`}>Live in 7 Days. About an Hour of Your Time.</h2>
          </Reveal>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {engine.steps.map((step, i) => (
              <li key={step.title} className="relative">
                <Reveal delay={i * 0.07} className="flex items-start gap-4">
                  <IconCircle name={stepIcons[i] ?? "check"} />
                  <div className="lg:pr-6">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#0866FF]">{step.label}</p>
                    <h3 className="mt-1 text-[17px] font-bold">{step.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-[1.5] text-[#46516B]">{step.body}</p>
                  </div>
                </Reveal>
                {i < engine.steps.length - 1 && (
                  <KitIcon name="arrow-right" className="absolute -right-1 top-5 hidden h-5 w-5 lg:block" />
                )}
              </li>
            ))}
          </ol>

          {/* The other two offers */}
          <Reveal className="mt-14 grid gap-5 md:grid-cols-2">
            {[
              {
                icon: "search",
                title: "Want to show up on Google too?",
                body: "Our AI Search & SEO plans put you on Google, Maps, and ChatGPT.",
                href: "/services/web-design",
                label: "See AI Search & SEO",
              },
              {
                icon: "automation",
                title: "Losing time to busywork?",
                body: "We find the busywork. Then we build tools that do it for you.",
                href: "/services/automations",
                label: "See Automations",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-start gap-4 rounded-xl border border-[#E5EDF6] bg-[#EFF8FF] p-6 transition-colors hover:border-[#0866FF]/40 ${focusRing}`}
              >
                <IconTile name={item.icon} />
                <div>
                  <h3 className="text-[17px] font-bold">{item.title}</h3>
                  <p className="mt-1 text-[15px] leading-[1.55] text-[#46516B]">{item.body}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-[15px] font-bold text-[#0866FF]">
                    {item.label}
                    <KitIcon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand
        location="engine_cta_band"
        title="Ready for More Booked Jobs?"
        subtitle="Book a free call. We'll tell you if your trade and area are open."
      />

      <DiscoveryCallSection
        theme="light"
        source="website_growth_engine"
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
                      page_path: engine.path,
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
                  <h3>{item.q}</h3>
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

export default function EnginePage() {
  usePageTracker("QuickLaunchWeb - Houston Growth Engine", "growth_engine");
  return (
    <BrandShell pagePath={engine.path}>
      <Sections />
    </BrandShell>
  );
}
