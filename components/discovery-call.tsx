"use client";

import { Fragment, useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { GlassCard, GlassPill, AmbientGlow } from "@/components/ui/glass";
import { useEventTracker } from "@/lib/analytics";
import { QUALIFIER_QUESTIONS, normalizeUsPhone, type QualifierQuestion } from "@/lib/leadQualifier";
import { FORM_PRIVACY_LINE, LEGAL_LINKS, SMS_CONSENT_TEXT } from "@/lib/legal";
import { getAdConsent } from "@/lib/consent";
import { useBookingContext, useRegisterBookingSource } from "@/components/booking/booking-context";

const InlineWidget = dynamic(
  () => import("react-calendly").then((m) => m.InlineWidget),
  { ssr: false }
);

export const DISCOVERY_CALENDLY_URL = "https://calendly.com/quicklaunchweb/15min";

// Qualifier questions live in lib/leadQualifier.ts (shared with /api/lead).
type Question = QualifierQuestion;
const QUESTIONS = QUALIFIER_QUESTIONS;
/** Questions + the name/mobile step. */
const TOTAL_STEPS = QUESTIONS.length + 1;

/** Short, friendly line above each question after the first. Index = step. */
const CHEERS = [
  "",
  "Great, thanks!",
  "Got it. You're moving fast.",
  "Halfway there.",
  "Almost done.",
  "Last tap. Then your info.",
];

/** Short pause so the tap shows as picked before the next screen. */
const ADVANCE_DELAY_MS = 160;

function getCookieValue(name: string): string {
  if (typeof document === "undefined") return "";
  // Only called with fixed names like "_fbp", so no regex escaping needed.
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
}

function createEventId(prefix: string): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

/** (832) 555-1234 as they type. */
function formatPhone(input: string) {
  let d = input.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  d = d.slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

// =============================================================================
// Qualifier state (shared by the inline #book section and the booking popup)
// =============================================================================

/**
 * All qualifier state + lead posting. `listen` turns on the Calendly "booked"
 * listener; only one live instance should listen so a booking is counted once.
 */
export function useQualifier(source: string, listen = true) {
  const { track } = useEventTracker();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [formError, setFormError] = useState("");
  const [errorField, setErrorField] = useState<"" | "firstName" | "phone">("");
  const [submitting, setSubmitting] = useState(false);
  const [contactDone, setContactDone] = useState(false);
  const [booked, setBooked] = useState(false);
  const leadSentRef = useRef(false);
  /** True once the visitor has tapped something; focus only moves after that. */
  const interactedRef = useRef(false);
  const advancingRef = useRef(false);

  const total = QUESTIONS.length;
  const onContactStep = step >= total && !contactDone;
  const isComplete = step >= total && contactDone;

  // Backup copy of the lead to the inbox (Web3Forms), in case the GHL webhook
  // is down or not set yet. Non-blocking.
  const emailLead = useCallback(
    async (finalAnswers: Record<string, string>, name: string, mobile: string, consent: boolean) => {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      if (!accessKey) return;
      try {
        const formData = new FormData();
        formData.append("access_key", accessKey);
        formData.append("subject", `Free call lead: ${name}`);
        formData.append("from_name", "QuickLaunchWeb Site");
        formData.append(
          "message",
          [
            `Name: ${name}`,
            `Mobile: ${mobile}`,
            `SMS consent: ${consent ? "yes" : "no"}`,
            `Page: ${source}`,
            "",
            ...QUESTIONS.map((q) => {
              const option = q.options.find((o) => o.value === finalAnswers[q.id]);
              return `${q.label}\n  -> ${option?.label ?? finalAnswers[q.id] ?? "n/a"}`;
            }),
          ].join("\n")
        );
        await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      } catch {
        // Non-blocking: the calendar is what matters.
      }
    },
    [source]
  );

  const answer = (question: Question, value: string) => {
    if (advancingRef.current) return;
    advancingRef.current = true;
    interactedRef.current = true;
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
    if (nextStep >= total) {
      track("qualifier_completed", {
        event_category: "lead_qualification",
        event_label: "contact_step_shown",
        ...next,
      });
    }
    window.setTimeout(() => {
      setStep(nextStep);
      advancingRef.current = false;
    }, ADVANCE_DELAY_MS);
  };

  const back = () => {
    interactedRef.current = true;
    setFormError("");
    setErrorField("");
    setStep((s) => Math.max(0, Math.min(s, total) - 1));
  };

  const editAnswers = () => {
    interactedRef.current = true;
    setContactDone(false);
    setStep(0);
  };

  const submitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    interactedRef.current = true;
    const name = firstName.trim();
    const digits = normalizeUsPhone(phone);
    if (!name) {
      setErrorField("firstName");
      return setFormError("Please add your first name.");
    }
    if (!digits) {
      setErrorField("phone");
      return setFormError("Please add a 10-digit mobile number, like (832) 555-1234.");
    }
    setFormError("");
    setErrorField("");
    setSubmitting(true);

    // One event_id for the browser pixel and the server event, so Meta counts one lead.
    const eventId = createEventId("lead");
    const query = new URLSearchParams(window.location.search);
    const fbclid = query.get("fbclid") || undefined;

    if (!leadSentRef.current) {
      leadSentRef.current = true;
      const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
      if (typeof fbq === "function") {
        fbq(
          "track",
          "Lead",
          { content_name: "free_call", lead_source: source, trade: answers.trade },
          { eventID: eventId }
        );
      }
      track("generate_lead", {
        event_category: "conversion",
        event_label: "free_call",
        sms_consent: smsConsent ? "yes" : "no",
        trade: answers.trade,
      });

      void emailLead(answers, name, digits, smsConsent);

      try {
        await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: name,
            phone: digits,
            smsConsent: smsConsent === true,
            adConsent: getAdConsent(),
            answers,
            source,
            eventId,
            eventSourceUrl: window.location.href,
            fbclid,
            fbp: getCookieValue("_fbp") || undefined,
            fbc: getCookieValue("_fbc") || undefined,
            utm: Object.fromEntries(
              ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]
                .map((k) => [k, query.get(k) || ""])
                .filter(([, v]) => v)
            ),
            website: honeypot,
          }),
        });
      } catch {
        // Never block the calendar on a network error.
      }
    }

    setSubmitting(false);
    setContactDone(true);
  };

  // Calendly posts a message when the booking lands.
  useEffect(() => {
    if (!listen) return;
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
          content_name: "free_call",
          content_type: "appointment",
        });
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [listen, answers.trade, answers.revenue, track]);

  const calendlyUtm = useMemo(
    () => ({
      utmSource: source,
      utmMedium: "discovery_qualifier",
      utmCampaign: answers.trade || "home_services",
      utmContent: [answers.area, answers.source, answers.spend, answers.job_size, answers.revenue]
        .filter(Boolean)
        .join("|"),
      utmTerm: answers.bottleneck || "",
    }),
    [answers, source]
  );

  // Calendly fills in the name. a1 = the first custom question on the Calendly
  // event, which should be the phone number question.
  const calendlyPrefill = useMemo(
    () => ({
      name: firstName.trim() || undefined,
      customAnswers: phone ? { a1: phone } : undefined,
    }),
    [firstName, phone]
  );

  return {
    source,
    step,
    total,
    answers,
    firstName,
    phone,
    smsConsent,
    honeypot,
    formError,
    errorField,
    submitting,
    contactDone,
    booked,
    onContactStep,
    isComplete,
    interactedRef,
    calendlyUtm,
    calendlyPrefill,
    answer,
    back,
    editAnswers,
    submitContact,
    setFirstName: (v: string) => {
      setFirstName(v);
      if (errorField === "firstName") {
        setFormError("");
        setErrorField("");
      }
    },
    setPhone: (v: string) => {
      setPhone(formatPhone(v));
      if (errorField === "phone") {
        setFormError("");
        setErrorField("");
      }
    },
    setSmsConsent,
    setHoneypot,
    track,
  };
}

export type Qualifier = ReturnType<typeof useQualifier>;

// =============================================================================
// Looks
// =============================================================================

// Class sets for the two looks: "dark" is the glass theme, "light" sits on the
// white brand pages and the booking popup.
const THEMES = {
  dark: {
    section: "",
    h2: "text-white",
    sub: "text-secondary",
    meta: "text-white/50",
    track: "bg-white/[0.08]",
    h3: "text-white",
    help: "text-white/60",
    cheer: "text-accent",
    option:
      "border-white/[0.10] bg-white/[0.03] text-white/85 [@media(hover:hover)]:hover:border-white/[0.22] [@media(hover:hover)]:hover:bg-white/[0.06] [@media(hover:hover)]:hover:text-white",
    optionOn: "border-accent bg-accent/[0.14] text-white",
    dot: "border-white/25",
    dotOn: "border-accent bg-accent",
    back: "text-white/60 hover:text-white hover:bg-white/[0.06]",
    chip: "border-white/[0.08] bg-white/[0.04] text-white/60",
    edit: "text-white/50 hover:text-white/80",
    frame: "border-white/[0.08] bg-white/[0.02]",
    ring: "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/40",
    link: "text-white/80 underline",
    calendly: { backgroundColor: "0d1330", textColor: "ffffff", primaryColor: "3b82f6" },
  },
  light: {
    section: "bg-[#EFF8FF]",
    h2: "text-[#07143F]",
    sub: "text-slate-600",
    meta: "text-slate-500",
    track: "bg-slate-100",
    h3: "text-[#07143F]",
    help: "text-[#46516B]",
    cheer: "text-[#0866FF]",
    option:
      "border-[#DCE6F2] bg-white text-[#07143F] [@media(hover:hover)]:hover:border-[#0866FF]/50 [@media(hover:hover)]:hover:bg-[#F5FAFF]",
    optionOn: "border-[#0866FF] bg-[#EFF8FF] text-[#07143F] shadow-[0_0_0_1px_#0866FF]",
    dot: "border-slate-300",
    dotOn: "border-[#0866FF] bg-[#0866FF]",
    back: "text-[#46516B] hover:text-[#07143F] hover:bg-slate-100",
    chip: "border-slate-200 bg-slate-50 text-slate-600",
    edit: "text-slate-500 hover:text-slate-800",
    frame: "border-slate-200 bg-white",
    ring: "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0866FF]/30 focus-visible:ring-offset-2",
    link: "font-semibold text-[#0866FF] underline underline-offset-2",
    calendly: { backgroundColor: "ffffff", textColor: "07143f", primaryColor: "0866ff" },
  },
};

type Theme = (typeof THEMES)["light"];

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
    <div className={`rounded-2xl border border-slate-200 bg-white shadow-xl shadow-blue-900/[0.06] ${className}`}>
      {children}
    </div>
  );
}

/** FORM_PRIVACY_LINE with "Privacy Policy" and "SMS Terms" turned into links (new tab, so progress is kept). */
function PrivacyLine({ className, linkClass }: { className: string; linkClass: string }) {
  const links: Record<string, string> = {
    "Privacy Policy": LEGAL_LINKS.privacy,
    "SMS Terms": LEGAL_LINKS.sms,
  };
  const parts = FORM_PRIVACY_LINE.split(/(Privacy Policy|SMS Terms)/);
  const found = parts.some((p) => links[p]);
  const link = (label: string, href: string) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {label}
    </a>
  );
  return (
    <p className={className}>
      {parts.map((part, i) => (
        <Fragment key={i}>{links[part] ? link(part, links[part]) : part}</Fragment>
      ))}
      {!found && (
        <>
          {" "}
          {link("Privacy Policy", LEGAL_LINKS.privacy)} · {link("SMS Terms", LEGAL_LINKS.sms)}
        </>
      )}
    </p>
  );
}

function Progress({ t, stepNumber, label }: { t: Theme; stepNumber: number; label?: string }) {
  const pct = Math.round((stepNumber / TOTAL_STEPS) * 100);
  return (
    <div className="mb-5">
      <div className={`flex items-center justify-between text-[13px] font-semibold ${t.meta}`}>
        <span>{label ?? `Step ${stepNumber} of ${TOTAL_STEPS}`}</span>
        <span aria-hidden="true">{pct}%</span>
      </div>
      <div
        className={`mt-2 h-2 w-full overflow-hidden rounded-full ${t.track}`}
        role="progressbar"
        aria-label="Progress"
        aria-valuemin={0}
        aria-valuemax={TOTAL_STEPS}
        aria-valuenow={stepNumber}
        aria-valuetext={`Step ${stepNumber} of ${TOTAL_STEPS}`}
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-300 ease-out motion-reduce:transition-none"
          style={{ width: `${Math.max(pct, 6)}%` }}
        />
      </div>
    </div>
  );
}

function BackButton({ t, onClick }: { t: Theme; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`-ml-2 inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-3 text-[15px] font-semibold transition-colors ${t.back} ${t.ring}`}
    >
      <span aria-hidden="true">&larr;</span> Back
    </button>
  );
}

// =============================================================================
// Qualifier body (one screen at a time). Used inline and in the popup.
// =============================================================================

export function QualifierFlow({
  q,
  theme = "light",
  inModal = false,
}: {
  q: Qualifier;
  theme?: "dark" | "light";
  inModal?: boolean;
}) {
  const light = theme === "light";
  const t = THEMES[theme];
  const uid = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const current = QUESTIONS[q.step];
  const screenKey = q.isComplete ? "calendar" : q.onContactStep ? "contact" : `q${q.step}`;

  // New screen: move focus to its heading (keyboard + screen readers land on
  // the new question) and bring the card into view if it scrolled off.
  useEffect(() => {
    if (!q.interactedRef.current) return;
    const root = rootRef.current;
    if (root) {
      const top = root.getBoundingClientRect().top;
      if (top < 0 || top > window.innerHeight * 0.6) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        root.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      }
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [screenKey, q.interactedRef]);

  const announcement = q.isComplete
    ? q.booked
      ? "You are booked. Check your email for the details."
      : "Thanks. Now pick a time on the calendar."
    : q.onContactStep
      ? `Step ${TOTAL_STEPS} of ${TOTAL_STEPS}. Last step: your name and mobile number.`
      : current
        ? `Step ${q.step + 1} of ${TOTAL_STEPS}. ${current.label}`
        : "";

  const inputCls = (invalid: boolean) =>
    light
      ? `w-full min-h-[56px] rounded-xl border bg-white px-4 text-[17px] text-[#07143F] placeholder:text-slate-400 focus:border-[#0866FF] focus:outline-none focus:ring-4 focus:ring-[#0866FF]/20 ${
          invalid ? "border-red-500" : "border-[#DCE6F2]"
        }`
      : `w-full min-h-[56px] rounded-xl border bg-white/[0.04] px-4 text-[17px] text-white placeholder:text-white/30 focus:border-accent/60 focus:outline-none focus:ring-4 focus:ring-accent/30 ${
          invalid ? "border-red-400" : "border-white/[0.12]"
        }`;

  const summary = QUESTIONS.map((question) => {
    const option = question.options.find((o) => o.value === q.answers[question.id]);
    return option?.label;
  }).filter(Boolean) as string[];

  const headingCls = `text-[22px] font-extrabold leading-tight tracking-[-0.02em] focus:outline-none md:text-[26px] ${t.h3}`;
  const errId = `${uid}-err`;

  return (
    <div ref={rootRef} className={inModal ? "scroll-mt-4" : "mt-10 scroll-mt-24"} data-qualifier-screen={screenKey}>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>

      {/* ---- One question per screen ---- */}
      {!q.isComplete && !q.onContactStep && current && (
        <Surface light={light} className="p-5 sm:p-8">
          <Progress t={t} stepNumber={q.step + 1} />

          {q.step > 0 && CHEERS[q.step] && (
            <p className={`mb-1.5 text-[15px] font-semibold ${t.cheer}`}>{CHEERS[q.step]}</p>
          )}
          <h3 id={`${uid}-q`} ref={headingRef} tabIndex={-1} className={headingCls}>
            {current.label}
          </h3>
          <p id={`${uid}-help`} className={`mt-2 text-[16px] ${t.help}`}>
            {current.help}
          </p>

          <div
            role="group"
            aria-labelledby={`${uid}-q`}
            aria-describedby={`${uid}-help`}
            className="mt-6 grid gap-3 sm:grid-cols-2"
          >
            {current.options.map((option) => {
              const selected = q.answers[current.id] === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => q.answer(current, option.value)}
                  className={`group flex min-h-[60px] items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-[17px] font-semibold transition-colors duration-150 active:scale-[0.98] motion-reduce:active:scale-100 ${
                    selected ? t.optionOn : t.option
                  } ${t.ring}`}
                >
                  <span
                    aria-hidden="true"
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${selected ? t.dotOn : t.dot}`}
                  >
                    {selected && <span className="h-2 w-2 rounded-full bg-white" />}
                  </span>
                  <span className="flex-1">
                    {option.label}
                    {option.note && (
                      <span className={`ml-2 text-[13px] font-medium ${t.cheer}`}>{option.note}</span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex min-h-[44px] items-center justify-between">
            {q.step > 0 ? <BackButton t={t} onClick={q.back} /> : <span />}
            <span className={`text-[13px] ${t.meta}`}>Tap an answer to keep going</span>
          </div>
        </Surface>
      )}

      {/* ---- Name + mobile (before the calendar, so no lead is lost) ---- */}
      {q.onContactStep && (
        <Surface light={light} className="p-5 sm:p-8">
          <Progress t={t} stepNumber={TOTAL_STEPS} label={`Step ${TOTAL_STEPS} of ${TOTAL_STEPS} · Last one`} />

          <p className={`mb-1.5 text-[15px] font-semibold ${t.cheer}`}>You did it! Just one more thing.</p>
          <h3 ref={headingRef} tabIndex={-1} className={headingCls}>
            Last step: where should we text your call details?
          </h3>
          <p className={`mt-2 text-[16px] ${t.help}`}>
            We only use this for your call. Want texts too? Check the box below.
          </p>

          <form onSubmit={q.submitContact} noValidate className="relative mt-6 grid gap-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <label htmlFor={`${uid}-name`} className={`text-[15px] font-bold ${t.h3}`}>
                  First name
                </label>
                <input
                  id={`${uid}-name`}
                  type="text"
                  name="firstName"
                  autoComplete="given-name"
                  autoCapitalize="words"
                  enterKeyHint="next"
                  maxLength={60}
                  required
                  aria-invalid={q.errorField === "firstName" || undefined}
                  aria-describedby={q.errorField === "firstName" ? errId : undefined}
                  value={q.firstName}
                  onChange={(e) => q.setFirstName(e.target.value)}
                  placeholder="Mike"
                  className={inputCls(q.errorField === "firstName")}
                />
              </div>
              <div className="grid gap-1.5">
                <label htmlFor={`${uid}-phone`} className={`text-[15px] font-bold ${t.h3}`}>
                  Mobile number
                </label>
                <input
                  id={`${uid}-phone`}
                  type="tel"
                  name="phone"
                  inputMode="tel"
                  autoComplete="tel-national"
                  enterKeyHint="done"
                  required
                  aria-invalid={q.errorField === "phone" || undefined}
                  aria-describedby={q.errorField === "phone" ? errId : undefined}
                  value={q.phone}
                  onChange={(e) => q.setPhone(e.target.value)}
                  placeholder="(832) 555-1234"
                  className={inputCls(q.errorField === "phone")}
                />
              </div>
            </div>

            {/* Honeypot: hidden from people, bots fill it in. */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={q.honeypot}
              onChange={(e) => q.setHoneypot(e.target.value)}
              className="absolute -left-[9999px] h-px w-px opacity-0"
              aria-hidden="true"
            />

            {/* Optional SMS consent. Unchecked by default; booking works either way. */}
            <div className="flex items-start gap-3">
              <input
                id={`${uid}-sms`}
                type="checkbox"
                name="smsConsent"
                checked={q.smsConsent}
                onChange={(e) => q.setSmsConsent(e.target.checked)}
                className={`mt-0.5 h-6 w-6 shrink-0 cursor-pointer rounded border-slate-300 accent-[#0866FF] ${t.ring}`}
              />
              <label htmlFor={`${uid}-sms`} className={`cursor-pointer text-[13px] leading-[1.6] ${t.help}`}>
                <span className={`font-semibold ${t.h3}`}>Optional: </span>
                {SMS_CONSENT_TEXT}
              </label>
            </div>

            <p
              id={errId}
              role="alert"
              className={`text-[15px] font-semibold ${light ? "text-red-600" : "text-red-300"} ${q.formError ? "" : "sr-only"}`}
            >
              {q.formError}
            </p>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <BackButton t={t} onClick={q.back} />
              <button
                type="submit"
                disabled={q.submitting}
                className={`inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-[#0866FF] px-7 text-[17px] font-bold text-white shadow-[0_10px_25px_-10px_rgba(8,102,255,0.7)] transition-colors hover:bg-[#0753CF] disabled:opacity-60 sm:w-auto ${t.ring}`}
              >
                {q.submitting ? "One sec..." : "Show Me the Calendar"}
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>

            <PrivacyLine className={`text-center text-[13px] sm:text-right ${t.help}`} linkClass={t.link} />
          </form>
        </Surface>
      )}

      {/* ---- Calendar ---- */}
      {q.isComplete && (
        <Surface light={light} className="p-4 sm:p-6">
          <h3 ref={headingRef} tabIndex={-1} className={headingCls}>
            {q.booked ? "You're on the calendar!" : `Thanks${q.firstName.trim() ? `, ${q.firstName.trim()}` : ""}! Pick a time.`}
          </h3>
          <p className={`mt-2 text-[16px] ${t.help}`}>
            {q.booked
              ? "Check your email for the details. Talk soon."
              : "You talk to Anthony, not a sales team. We look at your trade and area and tell you straight if we can help."}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {summary.map((label) => (
              <span key={label} className={`rounded-full border px-3 py-1 text-[12px] ${t.chip}`}>
                {label}
              </span>
            ))}
            <button
              type="button"
              onClick={q.editAnswers}
              className={`min-h-[32px] rounded px-1 text-[13px] underline underline-offset-2 transition-colors ${t.edit} ${t.ring}`}
            >
              Change answers
            </button>
          </div>

          <div className={`mt-4 overflow-hidden rounded-xl border ${t.frame}`}>
            <InlineWidget
              url={DISCOVERY_CALENDLY_URL}
              utm={q.calendlyUtm}
              prefill={q.calendlyPrefill}
              styles={{ height: "700px", width: "100%" }}
              pageSettings={{
                hideGdprBanner: true,
                ...t.calendly,
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
              }}
            />
          </div>

          <p className={`mt-4 text-center text-[14px] ${t.help}`}>
            Rather text?{" "}
            <a
              href="sms:+18325523458"
              className="font-semibold text-accent hover:underline"
              onClick={() =>
                q.track("cta_click", {
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
      )}
    </div>
  );
}

// =============================================================================
// Discovery Call Section (inline #book fallback on each page)
// =============================================================================

export function DiscoveryCallSection({
  eyebrow = "BOOK YOUR FREE CALL",
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
  const booking = useBookingContext();
  useRegisterBookingSource(source);
  // Inside BrandShell the popup and this section share one state. Outside it
  // (older pages) the section keeps its own.
  const shared = booking?.qualifier ?? null;
  const local = useQualifier(source, !shared);
  const q = shared ?? local;
  const isComplete = q.isComplete;

  return (
    <section
      id="book"
      className={`relative scroll-mt-24 px-4 pt-20 pb-24 sm:px-6 md:pt-24 md:pb-32 overflow-hidden ${t.section}`}
    >
      {!light && <AmbientGlow color="accent" position="top" intensity="subtle" className="-top-24" />}

      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="text-center">
          {light ? (
            <span className="mb-5 inline-flex rounded-full bg-blue-100 px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] text-blue-700">
              {isComplete ? "LAST STEP: PICK A TIME" : eyebrow}
            </span>
          ) : (
            <GlassPill
              variant="accent"
              className="mb-5 inline-flex px-4 py-1.5 text-[10px] font-semibold tracking-[0.2em]"
            >
              {isComplete ? "LAST STEP: PICK A TIME" : eyebrow}
            </GlassPill>
          )}
          <h2 className={`text-3xl font-bold tracking-tight text-balance md:text-5xl ${t.h2}`}>
            {heading ?? (
              <>
                {QUESTIONS.length} Quick Taps. <span className="text-accent">Then Pick a Time.</span>
              </>
            )}
          </h2>
          <p className={`mx-auto mt-4 max-w-xl text-lg text-balance ${t.sub}`}>
            {subheading ?? "It takes about 1 minute. It tells us if we can help. Then you pick a time for your free call."}
          </p>
        </div>

        {/* While the popup is open it shows this same flow; don't mount it twice. */}
        {booking?.modalOpen ? (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
            Your booking is open in the popup.
          </div>
        ) : (
          <QualifierFlow q={q} theme={theme} />
        )}
      </div>
    </section>
  );
}
