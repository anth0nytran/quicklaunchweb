"use client";

import Image from "next/image";
import { KitIcon, Reveal } from "@/components/brand/primitives";
import { container } from "@/components/brand/tokens";
import { adTotals, costPerLead, featuredAdResults, formatUsd } from "@/lib/adResults";

// Visual "flair" pieces that give sections depth instead of flat white.
// Art comes from the supplied kit: cloud-band.png / cloud-corner.png were cut
// from footer.png (rocket excluded), rocket.png is the kit's standalone rocket.

/** Soft cloud band pinned to the bottom of a `relative overflow-hidden` section. */
export function CloudBand({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-0 ${className}`}
      style={flip ? { transform: "scaleY(-1)", top: 0, bottom: "auto" } : undefined}
      aria-hidden="true"
    >
      <Image
        src="/home/cloud-band.png"
        alt=""
        width={2400}
        height={197}
        sizes="100vw"
        className="h-auto w-full min-w-[900px] object-cover object-bottom opacity-90"
      />
    </div>
  );
}

/** Cloud cluster for a section corner. */
export function CloudCorner({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/home/cloud-corner.png"
      alt=""
      aria-hidden="true"
      width={370}
      height={405}
      className={`pointer-events-none absolute z-0 h-auto ${className}`}
      // The art was cut from a larger image, so fade its cut edges out.
      style={{
        maskImage: "linear-gradient(to bottom, black 55%, transparent 100%), linear-gradient(to right, transparent 0%, black 30%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
        maskComposite: "intersect",
      }}
    />
  );
}

/** The kit's standalone rocket, for decoration in sections without hero art. */
export function FloatingRocket({ className = "" }: { className?: string }) {
  return (
    <div className={`ql-float pointer-events-none absolute z-0 ${className}`} aria-hidden="true">
      <Image src="/home/rocket.png" alt="" width={1324} height={1106} sizes="220px" className="h-auto w-full" />
    </div>
  );
}

/** Dark navy band with big real numbers. Breaks up the white and leads with proof. */
export function StatsBand() {
  const best = featuredAdResults[0];
  const stats = [
    { value: `${adTotals.leads}+`, label: "Leads tracked for Houston home service businesses" },
    { value: formatUsd(adTotals.spend), label: "In Meta ad spend managed" },
    { value: formatUsd(costPerLead(best), 2), label: `Best cost per lead (${best.trade.toLowerCase()})` },
    { value: "7 days", label: "From strategy call to ads live" },
  ];
  return (
    <section className="relative overflow-hidden bg-[#07143F] py-14 sm:py-16">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#0866FF]/30 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-sky-400/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)",
            backgroundSize: "26px 26px",
          }}
        />
      </div>
      <div className={`${container} relative`}>
        <p className="text-center text-[12px] font-semibold uppercase tracking-[0.25em] text-sky-300">
          Real numbers from the Houston ad accounts we run
        </p>
        <dl className="mt-9 grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="px-3 text-center lg:px-6">
              <dd className="bg-gradient-to-b from-white to-sky-200 bg-clip-text text-[34px] font-extrabold tracking-[-0.04em] text-transparent sm:text-[46px]">
                {s.value}
              </dd>
              <dt className="mx-auto mt-2 max-w-[220px] text-[13px] leading-snug text-white/70 sm:text-[14px]">{s.label}</dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

const TRADES = [
  "roofing", "painting", "electrical", "insulation", "fencing", "hvac",
  "plumbing", "remodeling", "concrete", "landscaping", "pool", "pressure-washing",
];
const tradeLabel = (t: string) =>
  t === "hvac" ? "HVAC" : t.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

/** Slow scrolling strip of the trades we serve (kit trade icons). */
/** Static, centered row of trade pills. Use under a moving logo marquee so only one thing scrolls. */
export function TradeRow() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3" aria-label="Trades we work with">
      {TRADES.map((t) => (
        <li
          key={t}
          className="flex items-center gap-2 rounded-full border border-[#E5EDF6] bg-white px-3.5 py-2 text-[13px] font-semibold text-[#07143F] shadow-[0_4px_14px_-8px_rgba(7,20,63,0.2)] sm:text-[14px]"
        >
          <KitIcon name={`trade-${t}`} className="h-5 w-5" />
          {tradeLabel(t)}
        </li>
      ))}
    </ul>
  );
}

export function TradeMarquee() {
  const row = [...TRADES, ...TRADES];
  return (
    <div className="relative overflow-hidden py-2" aria-label="Trades we work with">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#EFF8FF] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#EFF8FF] to-transparent" />
      <ul className="ql-marquee flex w-max gap-4">
        {row.map((t, i) => (
          <li
            key={`${t}-${i}`}
            aria-hidden={i >= TRADES.length ? "true" : undefined}
            className="flex items-center gap-2.5 rounded-full border border-[#E5EDF6] bg-white px-4 py-2.5 text-[14px] font-semibold text-[#07143F] shadow-[0_4px_14px_-8px_rgba(7,20,63,0.2)]"
          >
            <KitIcon name={`trade-${t}`} className="h-6 w-6" />
            {tradeLabel(t)}
          </li>
        ))}
      </ul>
    </div>
  );
}
