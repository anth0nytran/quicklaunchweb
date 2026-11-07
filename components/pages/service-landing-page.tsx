"use client";

import Image from "next/image";
import Link from "next/link";
import { DiscoveryCallSection } from "@/components/discovery-call";
import { BrandShell, CtaBand, PageHero } from "@/components/brand/brand-shell";
import { ResultsSection, ResultsStatCard, tradeIconName } from "@/components/brand/results";
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
import { serviceAreas } from "@/components/site-footer";
import { usePageTracker, useEventTracker } from "@/lib/analytics";
import type { ServiceLanding } from "@/lib/serviceLandingData";

// Template for the SEO service landing pages (/services/facebook-ads,
// /services/video-production) in the light brand. Content lives in
// lib/serviceLandingData.ts; frame + shared sections in components/brand.

const stepIcons = ["calendar", "target", "growth", "rocket"];

function Sections({ content }: { content: ServiceLanding }) {
  const { track } = useEventTracker();

  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        title={
          <>
            {content.h1.lead} <span className="text-[#0866FF]">{content.h1.accent}</span>
            {content.h1.tail ? ` ${content.h1.tail}` : "."}
          </>
        }
        intro={<p>{content.intro}</p>}
        art={
          content.slug === "facebook-ads" ? (
            <Image
              src="/home/hero.png"
              alt=""
              width={1400}
              height={918}
              priority
              sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw"
              className="h-auto w-full object-contain"
            />
          ) : (
            <ResultsStatCard />
          )
        }
        secondary={{ label: "Who We Work With", href: "#results" }}
      >
        <ul className="mt-7 space-y-2.5">
          {content.heroBullets.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-[15px] font-medium text-[#46516B]">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0866FF]/10">
                <KitIcon name="check" className="h-3.5 w-3.5" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </PageHero>

      <ResultsSection />

      {/* ===================== INCLUDED ===================== */}
      <section className={`bg-white ${sectionPad}`}>
        <div className={container}>
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow>What You Get</Eyebrow>
            <h2 className={`mt-3 ${sectionH2}`}>{content.included.title}</h2>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.included.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.04}>
                <div className="flex h-full gap-4 rounded-xl border border-[#E5EDF6] bg-white p-6 shadow-[0_4px_20px_-10px_rgba(7,20,63,0.12)]">
                  <IconTile name={item.icon} />
                  <div>
                    <h3 className="text-[18px] font-bold">{item.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-[1.5] text-[#46516B]">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== EXPLAINER ===================== */}
      <section className={`bg-[#EFF8FF] ${sectionPad}`}>
        <div className={`${container} grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14`}>
          <Reveal>
            <Eyebrow>{content.explainer.eyebrow}</Eyebrow>
            <h2 className={`mt-3 ${sectionH2}`}>{content.explainer.title}</h2>
            {content.explainer.paragraphs.map((p) => (
              <p key={p} className="mt-5 text-[16px] leading-[1.6] text-[#46516B] sm:text-[17px]">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="space-y-4 rounded-xl border border-[#E5EDF6] bg-white p-6 shadow-[0_8px_30px_-14px_rgba(7,20,63,0.15)] sm:p-8">
              {content.explainer.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0866FF]/10">
                    <KitIcon name="check" className="h-4 w-4" />
                  </span>
                  <span className="text-[15px] leading-[1.55] text-[#07143F] sm:text-[16px]">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ===================== STEPS ===================== */}
      <section className={`bg-white ${sectionPad}`}>
        <div className={container}>
          <Reveal className="text-center">
            <Eyebrow>How It Works</Eyebrow>
            <h2 className={`mt-3 ${sectionH2}`}>Live in 7 Days. About an Hour of Your Time.</h2>
          </Reveal>

          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {content.steps.map((step, i) => (
              <li key={step.title} className="relative">
                <Reveal delay={i * 0.07} className="flex items-start gap-4">
                  <IconCircle name={stepIcons[i] ?? "check"} />
                  <div className="lg:pr-6">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#0866FF]">{step.label}</p>
                    <h3 className="mt-1 text-[17px] font-bold">{step.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-[1.5] text-[#46516B]">{step.body}</p>
                  </div>
                </Reveal>
                {i < content.steps.length - 1 && (
                  <KitIcon name="arrow-right" className="absolute -right-1 top-5 hidden h-5 w-5 lg:block" />
                )}
              </li>
            ))}
          </ol>

          {/* Cross-link to the sibling service */}
          <Reveal className="mt-14">
            <div className="flex flex-col gap-5 rounded-xl border border-[#0866FF]/20 bg-[#EFF8FF] p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <Eyebrow>{content.crossLink.eyebrow}</Eyebrow>
                <h2 className="mt-2 text-[22px] font-extrabold tracking-[-0.02em]">{content.crossLink.title}</h2>
                <p className="mt-2 text-[15px] leading-[1.55] text-[#46516B]">{content.crossLink.body}</p>
              </div>
              <Link
                href={content.crossLink.href}
                className={`group inline-flex shrink-0 items-center gap-2 rounded-lg text-[15px] font-bold text-[#0866FF] ${focusRing}`}
              >
                {content.crossLink.label}
                <KitIcon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />

      <DiscoveryCallSection
        theme="light"
        source={`website_${content.slug}`}
      />

      {/* ===================== FAQ ===================== */}
      <section id="faq" className={`scroll-mt-20 bg-white ${sectionPad}`}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal className="text-center">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className={`mt-3 ${sectionH2}`}>Questions Owners Ask Us</h2>
          </Reveal>

          <div className="mt-10 space-y-3">
            {content.faqs.map((item, i) => (
              <details
                key={item.q}
                className="group rounded-xl border border-[#E5EDF6] bg-white transition-all open:shadow-[0_10px_30px_-14px_rgba(7,20,63,0.2)]"
                onToggle={(e) => {
                  if ((e.target as HTMLDetailsElement).open) {
                    track("faq_expanded", {
                      question: item.q,
                      question_index: i,
                      page_path: content.path,
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

      {/* ===================== TRADES + AREAS ===================== */}
      <section className="border-t border-[#E5EDF6] bg-[#EFF8FF] py-12">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-[20px] font-extrabold tracking-[-0.02em]">{content.chips.title}</h2>
          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {content.chips.items.map((chip) => (
              <li
                key={chip}
                className="flex items-center gap-2 rounded-full border border-[#E5EDF6] bg-white py-1.5 pl-2.5 pr-3.5 text-[13px] font-medium text-[#46516B]"
              >
                <KitIcon name={tradeIconName(chip)} className="h-5 w-5" />
                {chip}
              </li>
            ))}
          </ul>
          <p className="mt-6 flex items-start justify-center gap-2 text-[13px] leading-relaxed text-[#46516B]">
            <KitIcon name="map-pin" className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
            Serving {serviceAreas.join(", ")}, and the rest of the Houston metro. One business per trade
            per area.
            </span>
          </p>
        </div>
      </section>
    </>
  );
}

export default function ServiceLandingPage({ content }: { content: ServiceLanding }) {
  usePageTracker(content.trackerName, content.slug);
  return (
    <BrandShell pagePath={content.path}>
      <Sections content={content} />
    </BrandShell>
  );
}
