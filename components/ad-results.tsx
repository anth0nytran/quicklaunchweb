import { GlassCard } from "@/components/ui/glass";
import { adTotals, costPerLead, featuredAdResults, formatUsd } from "@/lib/adResults";

// Real Meta ads numbers from lib/adResults.ts. Used on the home page and the
// service landing pages.
export function AdResultsSection({
  id = "results",
  heading = "Real numbers from Houston ad accounts we run.",
}: {
  id?: string;
  heading?: string;
}) {
  const totals = [
    { value: `${adTotals.leads}+`, label: "Tracked leads" },
    { value: formatUsd(adTotals.spend), label: "Ad spend managed" },
    { value: `${adTotals.accounts}`, label: "Houston home service accounts" },
  ];

  return (
    <section id={id} className="relative scroll-mt-20 overflow-hidden px-6 py-14 md:py-16">
      <div className="relative z-10 mx-auto max-w-5xl">
        <p className="text-center text-[10px] uppercase tracking-[0.3em] text-accent/80">
          Results
        </p>
        <h2 className="mt-3 text-center text-3xl font-bold tracking-tight text-white text-balance md:text-4xl">
          {heading}
        </h2>

        <div className="mt-9 grid grid-cols-3 gap-3 md:gap-5">
          {totals.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] text-muted sm:text-xs">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {featuredAdResults.map((result) => (
            <GlassCard key={result.label} className="h-full border-white/[0.06] p-6">
              <p className="text-[10px] uppercase tracking-[0.25em] text-accent/80">
                {result.trade}
              </p>
              <p className="mt-3 text-3xl font-extrabold tracking-tight text-white">
                {formatUsd(costPerLead(result), 2)}
                <span className="ml-1 text-sm font-medium text-muted">per lead</span>
              </p>
              <p className="mt-2 text-sm text-secondary">
                {result.leads} leads for a {result.label}
              </p>
            </GlassCard>
          ))}
        </div>

        <p className="mt-5 text-center text-[11px] text-white/35">
          Lifetime Meta Ads numbers. Counts form leads only, not calls or messages.
        </p>
      </div>
    </section>
  );
}
