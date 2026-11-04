"use client";

import Link from "next/link";
import { DiscoveryCallSection } from "@/components/discovery-call";
import { BrandShell, CtaBand, PageHero } from "@/components/brand/brand-shell";
import {
  Eyebrow,
  IconCircle,
  IconTile,
  KitIcon,
  Reveal,
  container,
  focusRing,
  sectionH2,
  sectionPad,
} from "@/components/brand/primitives";
import { usePageTracker, useEventTracker } from "@/lib/analytics";
import { automationsFaqs, automationsPath, buildItems } from "@/lib/automationsContent";

// /services/automations — offer #3. Diagnose first, then automate what makes or
// saves the owner money. Copy and FAQ data live in lib/automationsContent.ts.

const heroBullets = [
  "Starts with a look at how your business actually runs",
  "A custom plan, not a one-size-fits-all software package",
  "Built around the tools you already use where possible",
  "We support and improve it after it's live",
];

const planItems = [
  { icon: "phone-message", label: "Text back every missed call" },
  { icon: "message", label: "Follow up on estimates that go quiet" },
  { icon: "star", label: "Ask happy customers for reviews" },
  { icon: "quote-document", label: "Speed up quoting with a custom tool" },
  { icon: "calendar", label: "Book jobs straight to your calendar" },
];

const steps = [
  {
    icon: "search",
    title: "Diagnosis Call",
    body: "We walk through how leads come in, how you follow up, quote, schedule, and get paid, and find where time and jobs slip away.",
  },
  {
    icon: "lightbulb",
    title: "Custom Plan",
    body: "You get a plan of what to automate, in what order, and what each piece should make or save you.",
  },
  {
    icon: "wrench",
    title: "We Build It",
    body: "We set it up, connect it to your phone, calendar, and tools, and test it before it touches a customer.",
  },
  {
    icon: "growth",
    title: "We Support & Improve It",
    body: "We stay on it. As your business changes, we fix, adjust, and add to what we built.",
  },
];

const problems = [
  {
    title: "Missed Calls",
    body: "You're on a job, the phone rings, and that customer calls the next company on Google before you can call back.",
    fix: "e.g. a missed call gets a text back in seconds",
  },
  {
    title: "Slow Follow-Up",
    body: "Estimates go out and nobody follows up. Leads go cold while you're busy running jobs.",
    fix: "e.g. automatic follow-up texts after an estimate is sent",
  },
  {
    title: "Manual Quoting & Scheduling",
    body: "Evenings spent building quotes by hand and playing phone tag to get jobs on the calendar.",
    fix: "e.g. a quoting tool and online booking built for your trade",
  },
  {
    title: "Double Data Entry",
    body: "The same customer info typed into your phone, your CRM, your invoicing, and a spreadsheet.",
    fix: "e.g. connecting your tools so info is entered once",
  },
];

const otherOffers = [
  {
    icon: "rocket",
    eyebrow: "Offer 1",
    title: "Houston Growth Engine",
    body: "Ads, content, and follow-up working together to bring in more calls and booked jobs.",
    href: "/houston-growth-engine",
    label: "See the Growth Engine",
  },
  {
    icon: "search",
    eyebrow: "Offer 2",
    title: "AI Search & SEO",
    body: "A website built to show up on Google, Maps, and AI search, and turn visitors into calls.",
    href: "/services/web-design",
    label: "See AI Search & SEO",
  },
];

function PlanCard() {
  return (
    <div className="rounded-2xl border border-[#E5EDF6] bg-white p-5 shadow-[0_24px_60px_-28px_rgba(7,20,63,0.35)] sm:p-7">
      <div className="flex items-center gap-3 border-b border-[#E5EDF6] pb-4">
        <IconTile name="automation" />
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#0866FF]">Example</p>
          <p className="text-[18px] font-extrabold tracking-[-0.02em]">Your Automation Plan</p>
        </div>
      </div>
      <ul className="mt-4 space-y-3">
        {planItems.map((item, i) => (
          <li
            key={item.label}
            className="flex items-center gap-3 rounded-xl border border-[#E5EDF6] bg-[#f7fbff] px-3.5 py-3"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EFF8FF] p-2">
              <KitIcon name={item.icon} className="h-full w-full" />
            </span>
            <span className="min-w-0 flex-1 text-[15px] font-semibold leading-snug">{item.label}</span>
            {i < 3 ? (
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0866FF]">
                <KitIcon name="check" white className="h-3.5 w-3.5" />
              </span>
            ) : (
              <span className="shrink-0 rounded-full border border-[#0866FF]/25 px-2.5 py-0.5 text-[12px] font-semibold text-[#0866FF]">
                Next
              </span>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-4 flex items-start gap-2 text-[13px] leading-[1.5] text-[#46516B]">
        <KitIcon name="info" className="mt-0.5 h-4 w-4 shrink-0" />
        Every plan is built from your diagnosis call. Yours will look different.
      </p>
    </div>
  );
}

function Sections() {
  const { track } = useEventTracker();

  return (
    <>
      <PageHero
        eyebrow="Automations & Custom Software"
        title={
          <>
            We Diagnose Your Business First. Then We{" "}
            <span className="text-[#0866FF]">Automate What Makes or Saves You Money</span>.
          </>
        }
        intro={
          <p>
            No guessing and no software you don&apos;t need. We start with a call to see how your
            business runs, find where you&apos;re losing time and jobs, and build a custom plan to fix it.
          </p>
        }
        primaryLabel="Book a Diagnosis Call"
        art={<PlanCard />}
      >
        <ul className="mt-7 space-y-2.5">
          {heroBullets.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[15px] font-medium text-[#46516B]">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0866FF]/10">
                <KitIcon name="check" className="h-3.5 w-3.5" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </PageHero>

      {/* ===================== HOW IT WORKS ===================== */}
      <section id="how-it-works" className={`scroll-mt-20 bg-white ${sectionPad}`}>
        <div className={container}>
          <Reveal className="text-center">
            <Eyebrow>How It Works</Eyebrow>
            <h2 className={`mt-3 ${sectionH2}`}>Diagnose, Plan, Build, Improve</h2>
            <p className="mx-auto mt-3 max-w-2xl text-[16px] leading-[1.5] text-[#46516B] sm:text-[18px]">
              We don&apos;t sell you a tool and walk away. We figure out what&apos;s worth automating first.
            </p>
          </Reveal>

          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, i) => (
              <li key={step.title} className="relative">
                <Reveal delay={i * 0.07} className="flex items-start gap-4">
                  <IconCircle name={step.icon} />
                  <div className="lg:pr-6">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#0866FF]">Step {i + 1}</p>
                    <h3 className="mt-1 text-[17px] font-bold">{step.title}</h3>
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

      {/* ===================== WHAT WE BUILD ===================== */}
      <section id="what-we-build" className={`scroll-mt-20 bg-[#EFF8FF] ${sectionPad}`}>
        <div className={container}>
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow>What We Build</Eyebrow>
            <h2 className={`mt-3 ${sectionH2}`}>Automations and Software Built Around Your Business</h2>
            <p className="mx-auto mt-3 max-w-2xl text-[16px] leading-[1.5] text-[#46516B] sm:text-[18px]">
              Your plan pulls from four kinds of work. Most owners start with one or two.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {buildItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="flex h-full flex-col gap-4 rounded-xl border border-[#E5EDF6] bg-white p-6 shadow-[0_4px_20px_-10px_rgba(7,20,63,0.12)] sm:flex-row sm:p-7">
                  <IconTile name={item.icon} />
                  <div className="min-w-0">
                    <h3 className="text-[19px] font-bold">{item.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-[1.5] text-[#46516B]">{item.body}</p>
                    <ul className="mt-4 space-y-2">
                      {item.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-[15px] leading-[1.5] text-[#07143F]">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0866FF]/10">
                            <KitIcon name="check" className="h-3.5 w-3.5" />
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WHERE OWNERS LOSE MONEY ===================== */}
      <section className={`bg-white ${sectionPad}`}>
        <div className={`${container} grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-14`}>
          <Reveal className="lg:sticky lg:top-28">
            <Eyebrow>The Problem</Eyebrow>
            <h2 className={`mt-3 ${sectionH2}`}>Where Home Service Owners Lose Money</h2>
            <p className="mt-5 text-[16px] leading-[1.6] text-[#46516B] sm:text-[17px]">
              Most of it isn&apos;t the work itself. It&apos;s the stuff around the work: calls you can&apos;t
              answer, follow-ups that never happen, and hours of admin after the crew goes home.
            </p>
            <p className="mt-4 text-[16px] leading-[1.6] text-[#46516B] sm:text-[17px]">
              The diagnosis call finds which of these is costing you the most, so that&apos;s what gets fixed first.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {problems.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <div className="flex h-full flex-col rounded-xl border border-[#E5EDF6] bg-white p-6 shadow-[0_4px_20px_-10px_rgba(7,20,63,0.12)]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EFF8FF] p-2.5">
                    <KitIcon name="x-circle" className="h-full w-full" />
                  </span>
                  <h3 className="mt-4 text-[18px] font-bold">{p.title}</h3>
                  <p className="mt-1.5 flex-1 text-[15px] leading-[1.5] text-[#46516B]">{p.body}</p>
                  <p className="mt-4 flex items-start gap-2 rounded-lg bg-[#EFF8FF] px-3 py-2.5 text-[14px] font-medium leading-[1.45] text-[#07143F]">
                    <KitIcon name="lightning" className="mt-0.5 h-4 w-4 shrink-0" />
                    {p.fix}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== OTHER OFFERS ===================== */}
      <section className={`border-t border-[#E5EDF6] bg-[#EFF8FF] ${sectionPad}`}>
        <div className={container}>
          <Reveal className="text-center">
            <Eyebrow>Our Other Offers</Eyebrow>
            <h2 className={`mt-3 ${sectionH2}`}>Need More Leads Coming In Too?</h2>
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
            {otherOffers.map((o, i) => (
              <Reveal key={o.href} delay={i * 0.05}>
                <Link
                  href={o.href}
                  className={`group flex h-full gap-4 rounded-xl border border-[#E5EDF6] bg-white p-6 shadow-[0_4px_20px_-10px_rgba(7,20,63,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(7,20,63,0.25)] sm:p-7 ${focusRing}`}
                >
                  <IconTile name={o.icon} />
                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#46516B]">{o.eyebrow}</p>
                    <h3 className="mt-1 text-[19px] font-bold">{o.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-[1.5] text-[#46516B]">{o.body}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[15px] font-bold text-[#0866FF]">
                      {o.label}
                      <KitIcon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        location="automations_cta_band"
        title="Find Out What's Worth Automating in Your Business"
        subtitle="Book a diagnosis call. We'll map out what to automate first and why."
        buttonLabel="Book a Diagnosis Call"
      />

      <DiscoveryCallSection
        theme="light"
        source="website_automations"
        eyebrow="BOOK YOUR DIAGNOSIS CALL"
        subheading="Takes 30 seconds. Then pick a time and we'll look at how your business runs."
        heading={
          <>
            A Few Quick Questions. Then <span className="text-[#0866FF]">Pick a Time</span>.
          </>
        }
      />

      {/* ===================== FAQ ===================== */}
      <section id="faq" className={`scroll-mt-20 bg-white ${sectionPad}`}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal className="text-center">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className={`mt-3 ${sectionH2}`}>Questions Owners Ask About Automation</h2>
          </Reveal>

          <div className="mt-10 space-y-3">
            {automationsFaqs.map((item, i) => (
              <details
                key={item.q}
                className="group rounded-xl border border-[#E5EDF6] bg-white transition-all open:shadow-[0_10px_30px_-14px_rgba(7,20,63,0.2)]"
                onToggle={(e) => {
                  if ((e.target as HTMLDetailsElement).open) {
                    track("faq_expanded", {
                      question: item.q,
                      question_index: i,
                      page_path: automationsPath,
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
                <div className="px-5 pb-6 text-[15px] leading-[1.6] text-[#46516B] sm:px-6 sm:text-base">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default function AutomationsPage() {
  usePageTracker("Automations & Software", "automations");
  return (
    <BrandShell pagePath={automationsPath}>
      <Sections />
    </BrandShell>
  );
}
