"use client";

import Image from "next/image";
import { useBooking } from "@/components/brand/brand-shell";
import { Eyebrow, KitIcon, Reveal, container, outlineBtn, sectionH2, sectionPad } from "@/components/brand/primitives";
import { adTotals, costPerLead, featuredAdResults, formatUsd } from "@/lib/adResults";
import { socialClients } from "@/lib/socialClients";
import { ClientLogoWall } from "@/components/brand/client-logo-grid";

// Proof: real Meta ad numbers (lib/adResults.ts, labeled with the pull date),
// the Houston businesses we work with, and approved client quotes only.
// Never show an empty or "coming soon" section here.

/** Kit trade icon file (in /public/home/icons) for a trade name. Matches loosely, so "Fencing & Ironwork" → fencing. */
const TRADE_ICONS: [RegExp, string][] = [
  [/roof/i, "trade-roofing"],
  [/paint/i, "trade-painting"],
  [/electric/i, "trade-electrical"],
  [/insulat/i, "trade-insulation"],
  [/fenc|iron/i, "trade-fencing"],
  [/hvac|air|heat/i, "trade-hvac"],
  [/plumb/i, "trade-plumbing"],
  [/remodel|construct/i, "trade-remodeling"],
  [/concrete/i, "trade-concrete"],
  [/landscap|lawn/i, "trade-landscaping"],
  [/pool/i, "trade-pool"],
  [/pressure|wash/i, "trade-pressure-washing"],
  [/entertain|event/i, "star"],
];

export function tradeIconName(trade: string) {
  return TRADE_ICONS.find(([re]) => re.test(trade))?.[1] ?? "wrench";
}

const tradeTints: Record<string, string> = {
  Insulation: "from-sky-100 via-blue-100 to-blue-200",
  "Fencing & Ironwork": "from-slate-100 via-slate-200 to-slate-300",
  Electrical: "from-amber-50 via-orange-100 to-orange-200",
  Painting: "from-rose-50 via-pink-100 to-rose-200",
  Roofing: "from-indigo-50 via-blue-100 to-indigo-200",
};

export function ResultCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {featuredAdResults.map((result, i) => {
        return (
          <Reveal key={result.label} delay={i * 0.07}>
            <article className="flex h-full flex-col rounded-xl border border-[#E5EDF6] bg-white p-3 shadow-[0_8px_30px_-14px_rgba(7,20,63,0.18)]">
              <div className="relative h-36 overflow-hidden rounded-lg sm:h-40">
                {result.image ? (
                  <Image src={result.image} alt={`${result.trade} job`} fill sizes="300px" className="object-cover" />
                ) : (
                  <div
                    className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${
                      tradeTints[result.trade] ?? "from-blue-50 to-blue-200"
                    }`}
                  >
                    <KitIcon name={tradeIconName(result.trade)} className="h-14 w-14 opacity-70" />
                  </div>
                )}
                <span className="absolute bottom-2.5 left-2.5 rounded-full bg-[#0866FF] px-3 py-1 text-[12px] font-semibold text-white shadow">
                  {result.trade}
                </span>
              </div>
              <div className="flex flex-1 flex-col px-2 pb-1 pt-4">
                <h3 className="text-[18px] font-extrabold leading-snug">
                  {result.leads} Leads at {formatUsd(costPerLead(result), 2)} Each
                </h3>
                <p className="mt-1.5 flex-1 text-[14px] leading-[1.5] text-[#46516B]">
                  Facebook and Instagram ads for a {result.label}. Straight from their ad account.
                </p>
                <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-1 rounded-lg bg-[#EFF8FF] px-2 py-3 text-center">
                  <div>
                    <p className="text-[17px] font-extrabold">{formatUsd(result.spend)}</p>
                    <p className="text-[11px] leading-tight text-[#46516B]">Ad spend</p>
                  </div>
                  <KitIcon name="arrow-right" className="h-4 w-4" />
                  <div>
                    <p className="text-[17px] font-extrabold">{result.leads}</p>
                    <p className="text-[11px] leading-tight text-[#46516B]">Leads</p>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}

/** Where the numbers come from. Shown next to every adResults number. */
export const AD_RESULTS_NOTE =
  "Facebook and Instagram lead counts from Meta. Lifetime totals for Houston ad accounts we run, pulled Oct 22, 2026. Calls and texts are not counted. Leads are not the same as booked jobs.";

const adTotalStats = [
  { value: `${adTotals.leads}`, label: "Leads from Facebook and Instagram" },
  { value: formatUsd(adTotals.spend), label: "Ad money we managed" },
  { value: `${adTotals.accounts}`, label: "Houston ad accounts" },
];

export function ResultsSection({ id = "results" }: { id?: string }) {
  const book = useBooking();
  const quotes = socialClients.filter((c) => c.quote);
  return (
    <section id={id} className={`scroll-mt-20 bg-[#EFF8FF] ${sectionPad}`}>
      <div className={container}>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>Our Clients</Eyebrow>
          <h2 className={`mt-3 ${sectionH2}`}>Real Houston Businesses. Real Jobs.</h2>
          <p className="mt-4 text-[16px] leading-[1.55] text-[#46516B] sm:text-[17px]">
            Here are some of the businesses we help.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6">
          <Reveal className="min-w-0">
            <div className="rounded-xl border border-[#E5EDF6] bg-white px-5 py-8 shadow-[0_8px_30px_-14px_rgba(7,20,63,0.18)] sm:px-10 sm:py-10">
              <ClientLogoWall />
            </div>
          </Reveal>
          {quotes.length > 0 && (
            <Reveal delay={0.07}>
              <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
                {quotes.map((client) => (
                  <figure
                    key={client.name}
                    className="flex flex-col rounded-xl border border-[#E5EDF6] bg-white p-6 shadow-[0_8px_30px_-14px_rgba(7,20,63,0.18)] sm:p-8"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF8FF] p-2.5">
                      <KitIcon name="quote" className="h-full w-full" />
                    </span>
                    <blockquote className="mt-4 text-[17px] leading-[1.6] text-[#07143F] sm:text-[19px]">
                      &ldquo;{client.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-5 text-[14px] text-[#46516B]">
                      <span className="font-bold text-[#07143F]">{client.person ?? client.name}</span>
                      {" · "}
                      {client.person ? client.name : client.trade}, {client.city}
                    </figcaption>
                  </figure>
                ))}
                <button
                  type="button"
                  onClick={() => book("results")}
                  className={`${outlineBtn} mx-auto !border-[#0866FF] px-6 py-3.5 text-[16px]`}
                >
                  Book a Free Call
                  <KitIcon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

const WHAT_YOU_GET = [
  { icon: "play", text: "We film you on your real jobs" },
  { icon: "growth", text: "We run your Facebook and Instagram ads" },
  { icon: "check-circle", text: "Every lead gets a fast text back" },
  { icon: "check", text: "Our team calls and books the job" },
  { icon: "star", text: "Every Monday you see calls, jobs, and money made" },
];

/** Compact card for an inner-page hero's right column: what the client gets (no client numbers). */
export function ResultsStatCard() {
  return (
    <div className="rounded-xl border border-[#E5EDF6] bg-white p-6 shadow-[0_20px_50px_-24px_rgba(7,20,63,0.35)] sm:p-8">
      <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0866FF]">What you get</p>
      <p className="mt-2 text-[15px] text-[#46516B]">We do it all for you.</p>
      <ul className="mt-5 space-y-3.5">
        {WHAT_YOU_GET.map((item) => (
          <li key={item.text} className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EFF8FF] p-1.5">
              <KitIcon name={item.icon} className="h-full w-full" />
            </span>
            <span className="text-[15px] font-semibold leading-tight text-[#07143F]">{item.text}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 border-t border-[#E5EDF6] pt-4 text-[13px] leading-[1.5] text-[#46516B]">
        Houston only. One business per trade per area.
      </p>
    </div>
  );
}
