// Qualifier questions for the free call (the site booking form).
// Shared by components/discovery-call.tsx (the form) and app/api/lead/route.ts
// (which checks every answer against these values).
// The free offer is "Your Free Local Ad Plan" (competitor ads, best-client map, job math,
// first 3 ads written). Five one-tap answers (Hormozi-style application: need, situation,
// budget), each with a plain "why we ask":
// trade -> area (to pull competitor ads) -> goal -> where jobs come from now -> ad budget,
// then first name + mobile (+ optional "biggest headache"), then the calendar.
// Option values are the stable ids GHL / Meta see. Change labels freely; change
// values only together with any GHL workflow that reads them.

export type QualifierQuestion = {
  id: string;
  label: string;
  help: string;
  /** "tiles" = compact icon grid (trade); default = one answer per row. */
  layout?: "tiles";
  options: { value: string; label: string; note?: string; icon?: string }[];
};

export const QUALIFIER_QUESTIONS: QualifierQuestion[] = [
  {
    id: "trade",
    label: "What kind of work do you do?",
    help: "We build your plan for your trade.",
    layout: "tiles",
    options: [
      { value: "roofing", label: "Roofing", icon: "trade-roofing" },
      { value: "hvac", label: "HVAC", icon: "trade-hvac" },
      { value: "plumbing_electrical", label: "Plumbing / Electrical", icon: "trade-plumbing" },
      { value: "remodeling", label: "Remodeling", icon: "trade-remodeling" },
      { value: "painting", label: "Painting", icon: "trade-painting" },
      { value: "fencing_concrete", label: "Fencing / Concrete", icon: "trade-fencing" },
      { value: "lawn_landscape", label: "Landscaping", icon: "trade-landscaping" },
      { value: "pressure_washing", label: "Pressure Washing", icon: "trade-pressure-washing" },
      { value: "pool", label: "Pool Service", icon: "trade-pool" },
      { value: "other", label: "Something else", icon: "wrench" },
    ],
  },
  {
    id: "area",
    label: "Where are most of your jobs?",
    help: "So we can pull the ads running in your area. We're Houston-based and fly out to film.",
    options: [
      { value: "houston", label: "Houston" },
      { value: "houston_surrounding", label: "Houston suburbs", note: "Katy, Cypress, Spring, Sugar Land" },
      { value: "texas_other", label: "Somewhere else in Texas" },
      { value: "outside_texas", label: "Outside Texas", note: "We'll come to you" },
    ],
  },
  {
    id: "goal",
    label: "What do you want more of?",
    help: "Your plan is built around this.",
    options: [
      { value: "more_jobs", label: "More jobs" },
      { value: "bigger_jobs", label: "Bigger, better-paying jobs" },
      { value: "steady_work", label: "Steady work all year" },
      { value: "own_leads", label: "My own leads", note: "Stop paying for shared leads" },
    ],
  },
  {
    id: "lead_source",
    label: "Where do most of your jobs come from now?",
    help: "So we know what to beat.",
    options: [
      { value: "referrals", label: "Referrals and word of mouth" },
      { value: "lead_sites", label: "Angi, Thumbtack, or HomeAdvisor" },
      { value: "google", label: "Google" },
      { value: "meta_ads", label: "Facebook or Instagram ads" },
      { value: "outbound", label: "Door knocking or yard signs" },
    ],
  },
  {
    id: "ad_budget",
    label: "How much could you put into ads each month?",
    help: "A ballpark is fine. It stays private and helps us size your plan.",
    options: [
      { value: "not_yet", label: "I don't run ads yet" },
      { value: "under_1k", label: "Under $1,000" },
      { value: "1k_2_5k", label: "$1,000 to $2,500" },
      { value: "2_5k_5k", label: "$2,500 to $5,000" },
      { value: "5k_plus", label: "$5,000 or more" },
    ],
  },
];

/** "trade" -> "Roofing" etc. Returns undefined for unknown values. */
export function qualifierLabel(questionId: string, value: string | undefined) {
  if (!value) return undefined;
  return QUALIFIER_QUESTIONS.find((q) => q.id === questionId)?.options.find((o) => o.value === value)?.label;
}

/** Digits only, US 10-digit. Accepts a leading 1. Returns "" when invalid. */
export function normalizeUsPhone(input: string) {
  const digits = (input || "").replace(/\D/g, "");
  const ten = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  if (ten.length !== 10 || /^[01]/.test(ten)) return "";
  return ten;
}

// The consent wording lives in lib/legal.ts so the form shows (and /api/lead
// records) the exact same text.
export { SMS_CONSENT_TEXT } from "@/lib/legal";
