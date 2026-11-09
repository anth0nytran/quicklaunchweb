// Qualifier questions for the free call (the site booking form).
// Shared by components/discovery-call.tsx (the form) and app/api/lead/route.ts
// (which checks every answer against these values).
// Kept to the three answers that shape the call (Hormozi-style application):
// what they do, where they are (Houston-based, but we fly out to film anywhere),
// and whether they can afford it. Ad spend, job size and "biggest problem" are asked on the call.
// Order: trade -> area -> revenue, then first name + mobile, then the calendar.
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
    help: "We tailor the call to your trade.",
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
    help: "We're based in Houston. Outside Houston? We fly out to film.",
    options: [
      { value: "houston", label: "Houston" },
      { value: "houston_surrounding", label: "Houston suburbs", note: "Katy, Cypress, Spring, Sugar Land" },
      { value: "texas_other", label: "Somewhere else in Texas" },
      { value: "outside_texas", label: "Outside Texas", note: "We'll come to you" },
    ],
  },
  {
    id: "revenue",
    label: "About how much does the business bring in each month?",
    help: "A ballpark is fine. It stays private and helps us plan the right budget.",
    options: [
      { value: "under_10k", label: "Under $10,000" },
      { value: "10k_30k", label: "$10,000 to $30,000" },
      { value: "30k_60k", label: "$30,000 to $60,000" },
      { value: "60k_100k", label: "$60,000 to $100,000" },
      { value: "100k_plus", label: "$100,000 or more" },
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
