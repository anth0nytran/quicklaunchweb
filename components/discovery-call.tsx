"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { GlassCard, GlassPill, AmbientGlow } from "@/components/ui/glass";
import { useEventTracker } from "@/lib/analytics";

const InlineWidget = dynamic(
  () => import("react-calendly").then((m) => m.InlineWidget),
  { ssr: false }
);

export const DISCOVERY_CALENDLY_URL = "https://calendly.com/quicklaunchweb/15min";

// =============================================================================
// Qualifier questions
// Order matters: trade -> area -> current lead source -> volume -> bottleneck.
// Cheapest question first so the first tap costs nothing.
// =============================================================================

type Question = {
  id: string;
  label: string;
  help: string;
  options: { value: string; label: string; note?: string }[];
};

const QUESTIONS: Question[] = [
  {
    id: "trade",
    label: "What do you do?",
    help: "So we can show you what we run for your trade.",
    options: [
      { value: "roofing", label: "Roofing" },
      { value: "hvac", label: "HVAC" },
      { value: "plumbing_electrical", label: "Plumbing / Electrical" },
      { value: "remodeling", label: "Remodeling / Construction" },
      { value: "fencing_concrete", label: "Fencing / Concrete" },
      { value: "lawn_landscape", label: "Lawn / Landscaping" },
      { value: "pressure_washing", label: "Pressure Washing / Exterior" },
      { value: "pool", label: "Pool Service" },
      { value: "junk_tree", label: "Junk / Tree Removal" },
      { value: "other", label: "Something else" },
    ],
  },
  {
    id: "area",
    label: "Where do you work?",
    help: "We build around your area, not a whole state.",
    options: [
      { value: "houston", label: "Houston metro", note: "Our home turf" },
      { value: "houston_surrounding", label: "Katy, Cypress, Spring, Baytown, Conroe" },
      { value: "texas_other", label: "Elsewhere in Texas" },
      { value: "outside_texas", label: "Outside Texas" },
    ],
  },
  {
    id: "source",
    label: "Where do your jobs come from now?",
    help: "Be honest. It changes what we build first.",
    options: [
      { value: "word_of_mouth", label: "Word of mouth and referrals" },
      { value: "lead_marketplace", label: "Angi, Thumbtack, or HomeAdvisor" },
      { value: "google", label: "Google / my website" },
      { value: "social", label: "Facebook or Instagram" },
      { value: "nothing_consistent", label: "Nothing steady. It is up and down." },
    ],
  },
  {
    id: "revenue",
    label: "About how much do you make a month?",
    help: "This tells us if we can help you or not.",
    options: [
      { value: "under_10k", label: "Under $10k" },
      { value: "10k_30k", label: "$10k to $30k" },
      { value: "30k_75k", label: "$30k to $75k" },
      { value: "75k_plus", label: "$75k+" },
    ],
  },
  {
    id: "bottleneck",
    label: "What is your biggest problem?",
    help: "We go straight at this on the call.",
    options: [
      { value: "not_enough_leads", label: "Not enough leads coming in" },
      { value: "junk_leads", label: "Leads come in, but they only want cheap" },
      { value: "no_follow_up", label: "Leads come in and nobody follows up" },
      { value: "cant_close", label: "We show up to bid and lose the job" },
      { value: "cant_keep_up", label: "Too much work, not enough help" },
    ],
  },
];

// =============================================================================
// Discovery Call Section
// =============================================================================

// Class sets for the two looks: "dark" is the glass theme, "light" sits on the
// white home page.
const THEMES = {
  dark: {
    section: "",
    h2: "text-white",
    sub: "text-secondary",
    meta: "text-white/40",
    track: "bg-white/[0.06]",
    h3: "text-white",
    help: "text-muted",
    option:
      "border-white/[0.08] bg-white/[0.03] text-white/80 hover:border-white/[0.18] hover:bg-white/[0.06] hover:text-white",
    optionOn: "border-accent/50 bg-accent/[0.10] text-white",
    arrow: "text-white/20",
    back: "text-white/40 hover:text-white/70",
    chip: "border-white/[0.08] bg-white/[0.04] text-white/60",
    edit: "text-white/35 hover:text-white/70",
    frame: "border-white/[0.08] bg-white/[0.02]",
    calendly: { backgroundColor: "0d1330", textColor: "ffffff", primaryColor: "3b82f6" },
  },
  light: {
    section: "bg-[#EFF8FF]",
    h2: "text-[#07143F]",
    sub: "text-slate-600",
    meta: "text-slate-400",
    track: "bg-slate-100",
    h3: "text-[#07143F]",
    help: "text-slate-500",
    option:
      "border-[#E5EDF6] bg-white text-[#46516B] hover:border-[#0866FF]/40 hover:bg-[#EFF8FF] hover:text-[#07143F]",
    optionOn: "border-[#0866FF] bg-[#EFF8FF] text-[#07143F]",
    arrow: "text-slate-300",
    back: "text-slate-400 hover:text-slate-700",
    chip: "border-slate-200 bg-slate-50 text-slate-600",
    edit: "text-slate-400 hover:text-slate-700",
    frame: "border-slate-200 bg-white",
    calendly: { backgroundColor: "ffffff", textColor: "07143f", primaryColor: "0866ff" },
  },
};

function Surface({
  light,
  className,
  children,
}: {
  light: boolean;
  className: string;
  children: React.ReactNode;
}) {
  if (!light) return <GlassCard className={className}>{children}</GlassCard>;
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white shadow-xl shadow-blue-900/[0.06] ${className}`}
    >
      {children}
    </div>
  );
}

export function DiscoveryCallSection({
  eyebrow = "Step 1 of 2",
  heading,
  subheading,
  source = "website",
  theme = "dark",
}: {
  eyebrow?: string;
  heading?: React.ReactNode;
  subheading?: string;
  /** Sent to Calendly as utm_source so bookings show which page they came from. */
  source?: string;
  theme?: "dark" | "light";
}) {
  const light = theme === "light";
  const t = THEMES[theme];
  const { track } = useEventTracker();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [booked, setBooked] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const leadSentRef = useRef(false);

  const total = QUESTIONS.length;
  const isComplete = step >= total;
  const current = QUESTIONS[step];
  const progress = Math.min(100, Math.round((step / total) * 100));

  // Forward the answers to the inbox as soon as the qualifier is finished, so a
  // lead that never reaches the calendar is still a lead.
  const sendPartialLead = useCallback(async (finalAnswers: Record<string, string>) => {
    if (leadSentRef.current) return;
    leadSentRef.current = true;

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) return;

    try {
      const formData = new FormData();
      formData.append("access_key", accessKey);
      formData.append("subject", "Discovery Call Qualifier Completed");
      formData.append("from_name", "QuickLaunchWeb Site");
      formData.append(
        "message",
        QUESTIONS.map((q) => {
          const value = finalAnswers[q.id];
          const option = q.options.find((o) => o.value === value);
          return `${q.label}\n  -> ${option?.label ?? value ?? "n/a"}`;
        }).join("\n\n")
      );
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
    } catch {
      // Non-blocking: the calendar is what matters.
    }
  }, []);

  const answer = (question: Question, value: string) => {
    const next = { ...answers, [question.id]: value };
    setAnswers(next);
    track("qualifier_answered", {
      question_id: question.id,
      answer: value,
      step_number: step + 1,
      event_category: "lead_qualification",
      event_label: `${question.id}:${value}`,
    });

    const nextStep = step + 1;
    setStep(nextStep);

    if (nextStep >= total) {
      track("qualifier_completed", {
        event_category: "lead_qualification",
        event_label: "calendar_revealed",
        trade: next.trade,
        area: next.area,
        source: next.source,
        revenue: next.revenue,
        bottleneck: next.bottleneck,
      });
      void sendPartialLead(next);
      window.setTimeout(() => {
        calendarRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  // Calendly posts a message when the booking lands.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e?.data?.event !== "calendly.event_scheduled") return;
      setBooked(true);
      track("discovery_call_booked", {
        event_category: "conversion",
        event_label: "calendly_scheduled",
        trade: answers.trade,
        revenue: answers.revenue,
      });
      const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
      if (typeof fbq === "function") {
        fbq("track", "Schedule", {
          content_name: "discovery_call",
          content_type: "appointment",
        });
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [answers.trade, answers.revenue, track]);

  const calendlyUtm = useMemo(
    () => ({
      utmSource: source,
      utmMedium: "discovery_qualifier",
      utmCampaign: answers.trade || "home_services",
      utmContent: [answers.area, answers.source, answers.revenue].filter(Boolean).join("|"),
      utmTerm: answers.bottleneck || "",
    }),
    [answers, source]
  );

  const summary = QUESTIONS.map((q) => {
    const option = q.options.find((o) => o.value === answers[q.id]);
    return option?.label;
  }).filter(Boolean) as string[];

  return (
    <section
      id="book"
      className={`relative scroll-mt-24 px-6 pt-20 pb-24 md:pt-24 md:pb-32 overflow-hidden ${t.section}`}
    >
      {!light && <AmbientGlow color="accent" position="top" intensity="subtle" className="-top-24" />}

      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="text-center">
          {light ? (
            <span className="mb-5 inline-flex rounded-full bg-blue-100 px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] text-blue-700">
              {isComplete ? "LAST STEP — PICK A TIME" : eyebrow}
            </span>
          ) : (
            <GlassPill
              variant="accent"
              className="mb-5 inline-flex px-4 py-1.5 text-[10px] font-semibold tracking-[0.2em]"
            >
              {isComplete ? "LAST STEP — PICK A TIME" : eyebrow}
            </GlassPill>
          )}
          <h2 className={`text-3xl font-bold tracking-tight text-balance md:text-5xl ${t.h2}`}>
            {heading ?? (
              <>
                5 quick questions. Then <span className="text-accent">pick a time</span>.
              </>
            )}
          </h2>
          <p className={`mx-auto mt-4 max-w-xl text-lg text-balance ${t.sub}`}>
            {subheading ??
              "We only take a few businesses per trade in Houston. This takes 30 seconds and tells us if we can help you."}
          </p>
        </div>

        {/* ---- Qualifier ---- */}
        {!isComplete && current && (
          <Surface light={light} className="mt-10 p-6 sm:p-8">
            {/* Progress */}
            <div className="mb-6">
              <div className={`flex items-center justify-between text-[11px] uppercase tracking-[0.25em] ${t.meta}`}>
                <span>
                  Question {step + 1} of {total}
                </span>
                <span>{progress}%</span>
              </div>
              <div className={`mt-2 h-1 w-full overflow-hidden rounded-full ${t.track}`}>
                <div
                  className="h-full rounded-full bg-accent transition-all duration-300 ease-out"
                  style={{ width: `${Math.max(progress, 6)}%` }}
                />
              </div>
            </div>

            <h3 className={`text-xl font-bold tracking-tight md:text-2xl ${t.h3}`}>
              {current.label}
            </h3>
            <p className={`mt-2 text-sm ${t.help}`}>{current.help}</p>

            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {current.options.map((option) => {
                const selected = answers[current.id] === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => answer(current, option.value)}
                    className={`group flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left text-[14px] font-medium transition-all duration-200 active:scale-[0.98] ${
                      selected ? t.optionOn : t.option
                    }`}
                  >
                    <span>
                      {option.label}
                      {option.note && (
                        <span className="ml-2 text-[11px] font-normal text-accent/80">
                          {option.note}
                        </span>
                      )}
                    </span>
                    <span className={`transition-transform group-hover:translate-x-0.5 ${t.arrow}`}>
                      &rarr;
                    </span>
                  </button>
                );
              })}
            </div>

            {step > 0 && (
              <button
                type="button"
                onClick={back}
                className={`mt-6 text-xs transition-colors ${t.back}`}
              >
                &larr; Back
              </button>
            )}
          </Surface>
        )}

        {/* ---- Calendar ---- */}
        {isComplete && (
          <div ref={calendarRef} className="mt-10 scroll-mt-24">
            <Surface light={light} className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                {summary.map((label) => (
                  <span
                    key={label}
                    className={`rounded-full border px-3 py-1 text-[11px] ${t.chip}`}
                  >
                    {label}
                  </span>
                ))}
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className={`text-[11px] underline-offset-2 transition-colors hover:underline ${t.edit}`}
                >
                  edit
                </button>
              </div>

              <p className={`mt-4 text-sm ${t.sub}`}>
                {booked
                  ? "You are on the calendar. Check your email for the confirmation. Talk soon."
                  : "Pick a time below. 15 minutes with Anthony. Not a sales team. We look at your numbers and tell you straight if we can help."}
              </p>

              <div className={`mt-4 overflow-hidden rounded-xl border ${t.frame}`}>
                <InlineWidget
                  url={DISCOVERY_CALENDLY_URL}
                  utm={calendlyUtm}
                  styles={{ height: "700px", width: "100%" }}
                  pageSettings={{
                    hideGdprBanner: true,
                    ...t.calendly,
                    hideEventTypeDetails: false,
                    hideLandingPageDetails: false,
                  }}
                />
              </div>

              <p className={`mt-4 text-center text-[12px] ${t.help}`}>
                Prefer to text?{" "}
                <a
                  href="sms:+18325523458"
                  className="text-accent hover:underline"
                  onClick={() =>
                    track("cta_click", {
                      cta_text: "text_us",
                      cta_location: "discovery_call",
                      event_category: "engagement",
                    })
                  }
                >
                  832-552-3458
                </a>
              </p>
            </Surface>
          </div>
        )}
      </div>
    </section>
  );
}
