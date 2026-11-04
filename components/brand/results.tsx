"use client";

import Image from "next/image";
import { useBooking } from "@/components/brand/brand-shell";
import { Eyebrow, KitIcon, Reveal, container, outlineBtn, sectionH2, sectionPad } from "@/components/brand/primitives";
import { costPerLead, featuredAdResults, formatUsd } from "@/lib/adResults";
import { socialClients } from "@/lib/socialClients";

// Results section + hero proof card. Numbers are on hold ("coming soon");
// ResultCards (lib/adResults.ts) is kept for when we publish them again.

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
                  Meta ads for a {result.label}, straight from their ad account.
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

export function ResultsSection({ id = "results" }: { id?: string }) {
  const book = useBooking();
  return (
    <section id={id} className={`scroll-mt-20 bg-[#EFF8FF] ${sectionPad}`}>
      <div className={`${container} grid gap-10 lg:grid-cols-[0.8fr_2fr] lg:items-center`}>
        <Reveal>
          <Eyebrow>Results</Eyebrow>
          <h2 className={`mt-3 ${sectionH2}`}>
            Case Studies
            <br />
            Coming Soon.
          </h2>
          <p className="mt-4 text-[16px] leading-[1.55] text-[#46516B] sm:text-[17px]">
            We&apos;re putting together the full numbers from the Houston businesses we work with. In the
            meantime, book a call and we&apos;ll walk you through what we&apos;re running for your trade.
          </p>
          <button
            type="button"
            onClick={() => book("results")}
            className={`${outlineBtn} mt-7 !border-[#0866FF] px-6 py-3.5 text-[16px]`}
          >
            Book a Free Strategy Call
            <KitIcon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </Reveal>
        <Reveal delay={0.07}>
          <div className="rounded-xl border border-[#E5EDF6] bg-white p-6 shadow-[0_8px_30px_-14px_rgba(7,20,63,0.18)] sm:p-8">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0866FF]">
              Houston businesses we work with
            </p>
            <ul className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {socialClients.map((client) => (
                <li key={client.name} className="flex items-center gap-3">
                  <KitIcon name={tradeIconName(client.trade)} className="h-8 w-8 shrink-0" />
                  <div className="leading-tight">
                    <p className="text-[15px] font-extrabold text-[#07143F]">{client.name}</p>
                    <p className="text-[12px] text-[#46516B]">{client.trade}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Compact proof card for an inner-page hero's right column. */
export function ResultsStatCard() {
  return (
    <div className="rounded-xl border border-[#E5EDF6] bg-white p-6 shadow-[0_20px_50px_-24px_rgba(7,20,63,0.35)] sm:p-8">
      <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0866FF]">Who we work with</p>
      <p className="mt-2 text-[15px] text-[#46516B]">Houston businesses we run marketing for today.</p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {socialClients.map((client) => (
          <li key={client.name} className="flex items-center gap-2.5">
            <KitIcon name={tradeIconName(client.trade)} className="h-6 w-6 shrink-0" />
            <span className="text-[14px] font-bold leading-tight text-[#07143F]">{client.name}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 border-t border-[#E5EDF6] pt-4 text-[13px] font-semibold text-[#46516B]">
        Case studies and numbers coming soon.
      </p>
    </div>
  );
}
