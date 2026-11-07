// Shared legal / consent wording. One source of truth so every form says the same thing.
// Not legal advice: have a lawyer review before relying on it.
//
// NOTE: components/discovery-call.tsx currently renders SMS_CONSENT_TEXT from
// lib/leadQualifier.ts (owned by another workstream). Point that file at this one
// (`export { SMS_CONSENT_TEXT } from "@/lib/legal"`) so the form, /sms-consent and the
// GHL consent record all use the same words.

export const LEGAL_BUSINESS_NAME = "QuickLaunchWeb";
export const LEGAL_OWNER_NAME = "Anthony Tran";
export const LEGAL_PHONE_DISPLAY = "832-552-3458";
export const LEGAL_EMAIL = "anthotranllc@gmail.com";
export const LEGAL_CITY_STATE = "Houston, Texas";
/** Policy effective date shown on /privacy, /terms and /sms-consent. */
export const LEGAL_EFFECTIVE_DATE = "November 7, 2026";
/** SMS program name used in 10DLC registration and on /sms-consent. */
export const SMS_PROGRAM_NAME = "QuickLaunchWeb Lead Follow-Up";

/**
 * TCPA / A2P 10DLC consent for calls and texts. Shown next to an UNCHECKED checkbox.
 * Names the one seller, says it may be automated, says consent is optional and not a
 * condition of purchase, and gives frequency, rates, STOP and HELP.
 * The form must also link the Privacy Policy and SMS Terms next to it.
 */
export const SMS_CONSENT_TEXT =
  "Yes, QuickLaunchWeb may call and text me at this number, including with automated technology, about my free call, appointment reminders, and its marketing services. Consent is not a condition of any purchase or of booking a call. Message frequency varies. Message and data rates may apply. Reply STOP to opt out, HELP for help.";

/** Short line under a form submit button. */
export const FORM_PRIVACY_LINE =
  "We don't sell your info for money, and we never share your mobile number with third parties for their marketing. See our Privacy Policy, SMS Terms, and Your Privacy Choices.";

/** Results / testimonial disclaimer (FTC). */
export const RESULTS_DISCLAIMER =
  "Results vary. Example numbers are for illustration. Past results are not a guarantee of future results.";

export const LEGAL_LINKS = {
  privacy: "/privacy",
  terms: "/terms",
  sms: "/sms-consent",
} as const;
