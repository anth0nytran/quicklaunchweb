// Real Meta ads results from client ad accounts we manage. Lifetime numbers,
// pulled from Meta Ads on 2026-10-22. "Leads" is Meta's lead count (forms +
// pixel leads) — calls and messages are NOT included, so true lead counts run
// higher than shown here.
//
// Shown by trade only, not by business name, until each client OKs it.
// TO REFRESH: re-pull spend + leads per account and update the rows below.

export type AdResult = {
  trade: string;
  /** e.g. "Houston insulation company" */
  label: string;
  spend: number;
  leads: number;
  /** Optional job photo under /public, shown on the home page results card. */
  image?: string;
};

export const adResults: AdResult[] = [
  { trade: "Insulation", label: "Houston insulation company", spend: 1752.69, leads: 61 },
  { trade: "Fencing & Ironwork", label: "Houston fence & ironwork company", spend: 1314.44, leads: 44 },
  { trade: "Electrical", label: "Houston electrician", spend: 3068.43, leads: 51 },
  { trade: "Painting", label: "Houston painting company", spend: 11222.92, leads: 102 },
  { trade: "Painting", label: "Houston house painter", spend: 4411.22, leads: 37 },
  { trade: "Roofing", label: "Houston roofer", spend: 1598.75, leads: 17 },
];

export const costPerLead = (r: AdResult) => r.spend / r.leads;

export const adTotals = {
  spend: adResults.reduce((sum, r) => sum + r.spend, 0),
  leads: adResults.reduce((sum, r) => sum + r.leads, 0),
  accounts: adResults.length,
};

/** The results we lead with on landing pages: lowest cost per lead first. */
export const featuredAdResults = [...adResults]
  .sort((a, b) => costPerLead(a) - costPerLead(b))
  .slice(0, 3);

export const formatUsd = (n: number, digits = 0) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
