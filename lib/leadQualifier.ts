// Qualifier questions for the free call (the site booking form).
// Shared by components/discovery-call.tsx (the form) and app/api/lead/route.ts
// (which checks every answer against these values).
// One tap per screen, easiest first: trade -> area -> job size -> ad spend ->
// revenue -> biggest problem. Then first name + mobile, then the calendar.
// Option values are the stable ids GHL / Meta see. Change labels freely; change
// values only together with any GHL workflow that reads them.

export type QualifierQuestion = {
  id: string;
  label: string;
  help: string;
  options: { value: string; label: string; note?: string }[];
};

export const QUALIFIER_QUESTIONS: QualifierQuestion[] = [
  {
    id: "trade",
    label: "What kind of work do you do?",
    help: "Tap one. We know what works for each trade.",
    options: [
      { value: "roofing", label: "Roofing" },
      { value: "hvac", label: "HVAC" },
      { value: "plumbing_electrical", label: "Plumbing or Electrical" },
      { value: "remodeling", label: "Remodeling or Building" },
      { value: "painting", label: "Painting" },
      { value: "fencing_concrete", label: "Fencing or Concrete" },
      { value: "lawn_landscape", label: "Lawn or Landscaping" },
      { value: "pressure_washing", label: "Pressure Washing" },
      { value: "pool", label: "Pool Service" },
      { value: "other", label: "Something else" },
    ],
  },
  {
    id: "area",
    label: "Where are most of your jobs?",
    help: "We look at your part of town, not the whole state.",
    options: [
      { value: "houston", label: "Houston", note: "Our home turf" },
      { value: "houston_surrounding", label: "Katy, Cypress, Spring, Conroe, or Baytown" },
      { value: "texas_other", label: "Somewhere else in Texas" },
      { value: "outside_texas", label: "Outside Texas" },
    ],
  },
  {
    id: "job_size",
    label: "What is a normal job worth?",
    help: "A rough guess is fine.",
    options: [
      { value: "under_1k", label: "Under $1,000" },
      { value: "1k_3k", label: "$1,000 to $3,000" },
      { value: "3k_8k", label: "$3,000 to $8,000" },
      { value: "8k_plus", label: "$8,000 or more" },
    ],
  },
  {
    id: "spend",
    label: "How much do you spend on ads or leads each month?",
    help: "Add up Angi, Google, Facebook, and flyers. A guess is fine.",
    options: [
      { value: "none", label: "$0 right now" },
      { value: "under_1k", label: "Under $1,000" },
      { value: "1k_3k", label: "$1,000 to $3,000" },
      { value: "3k_5k", label: "$3,000 to $5,000" },
      { value: "5k_plus", label: "$5,000 or more" },
    ],
  },
  {
    id: "revenue",
    label: "About how much does your business bring in each month?",
    help: "A ballpark is fine. We keep it private.",
    options: [
      { value: "under_10k", label: "Under $10,000" },
      { value: "10k_30k", label: "$10,000 to $30,000" },
      { value: "30k_60k", label: "$30,000 to $60,000" },
      { value: "60k_100k", label: "$60,000 to $100,000" },
      { value: "100k_plus", label: "$100,000 or more" },
    ],
  },
  {
    id: "bottleneck",
    label: "What is the biggest thing holding you back?",
    help: "We start the call right here.",
    options: [
      { value: "not_enough_leads", label: "Not enough calls coming in" },
      { value: "shared_leads", label: "I pay for leads other guys get too" },
      { value: "junk_leads", label: "Leads only want the cheapest price" },
      { value: "no_follow_up", label: "Leads come in, but nobody calls them back" },
      { value: "cant_close", label: "We give a price and lose the job" },
      { value: "cant_keep_up", label: "Too much work, not enough help" },
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
