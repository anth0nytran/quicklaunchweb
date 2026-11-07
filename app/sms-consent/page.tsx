import type { Metadata } from "next";
import Link from "next/link";
import { BrandShell } from "@/components/brand/brand-shell";
import { Eyebrow } from "@/components/brand/primitives";
import { buildPageMetadata } from "@/lib/seo";
import { focusRing, container, pageH1, bodyText } from "@/components/brand/tokens";
import {
  LEGAL_BUSINESS_NAME,
  LEGAL_EFFECTIVE_DATE,
  LEGAL_EMAIL,
  LEGAL_OWNER_NAME,
  LEGAL_PHONE_DISPLAY,
  SMS_PROGRAM_NAME,
} from "@/lib/legal";
// The exact words shown next to the checkbox on the live free-call form.
import { SMS_CONSENT_TEXT as LIVE_FORM_CONSENT_TEXT } from "@/lib/leadQualifier";

// SMS program terms for carriers / A2P 10DLC review and for people we text.
// Keep this page in sync with the 10DLC campaign registration in HighLevel.
// Not legal advice: have a lawyer review before relying on it.

export const metadata: Metadata = buildPageMetadata({
  title: "SMS Terms | QuickLaunchWeb",
  description:
    "QuickLaunchWeb text message program terms: how you opt in, message types, frequency, rates, STOP and HELP, and how we protect your number.",
  path: "/sms-consent",
});

const legalH2 =
  "scroll-mt-28 text-[22px] font-extrabold leading-[1.25] tracking-[-0.02em] text-[#07143F] sm:text-[24px]";
const legalH3 = "mt-7 text-[18px] font-bold text-[#07143F]";
const tocLink = `block rounded-md py-1 text-[15px] leading-[1.4] text-[#46516B] transition-colors hover:text-[#0866FF] ${focusRing}`;
const list = "mt-3 list-disc space-y-2 pl-5 marker:text-[#0866FF]";
const strong = "font-semibold text-[#07143F]";
const link = "font-medium text-[#0753CF] underline underline-offset-2 hover:text-[#07143F]";
const quote =
  "mt-3 rounded-r-xl border-l-4 border-[#0866FF] bg-[#EFF8FF] px-4 py-3 text-[15px] italic leading-[1.6] text-[#46516B]";

const sections = [
  ["program", "The program"],
  ["message-types", "Messages you may get"],
  ["how-you-opt-in", "How you opt in"],
  ["frequency-and-rates", "Frequency and rates"],
  ["opt-out", "STOP, HELP, and START"],
  ["carriers", "Carriers"],
  ["privacy", "Your number and privacy"],
  ["sample-messages", "Sample messages"],
  ["contact", "Contact"],
] as const;

const samples = [
  {
    label: "Free call confirmation",
    text: "QuickLaunchWeb: Hi Alex, thanks for booking your free call for Thu 2:00 PM. We'll call you at this number. Reply STOP to opt out, HELP for help.",
  },
  {
    label: "Appointment reminder",
    text: "QuickLaunchWeb: Reminder, your free call is in 1 hour. Need a new time? Reply here. Reply STOP to opt out.",
  },
  {
    label: "Follow-up about our services",
    text: "QuickLaunchWeb: Hi Alex, Anthony here. Want the ad plan we talked about for your roofing company? Reply YES and I'll send it. Reply STOP to opt out.",
  },
  {
    label: "Lead alert (client business owner)",
    text: "QuickLaunchWeb: New lead for ABC Fencing: Alex, (480) 555-0176, fence install, Katy. Reply STOP to opt out, HELP for help.",
  },
];

export default function SmsConsentPage() {
  return (
    <BrandShell stickyCta={false}>
      <section className="bg-gradient-to-b from-[#EFF8FF] to-[#f7fbff] pb-10 pt-[104px] sm:pb-14 sm:pt-28 lg:pt-32">
        <div className={container}>
          <div className="mx-auto max-w-[760px]">
            <Eyebrow>Legal</Eyebrow>
            <h1 className={`mt-4 ${pageH1}`}>SMS Terms</h1>
            <p className={`mt-4 max-w-[40rem] ${bodyText}`}>
              How our text messages work, how to stop them, and how we protect your number.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white pb-16 pt-10 sm:pb-24 sm:pt-14">
        <div className={container}>
          <article className="mx-auto max-w-[760px]">
            <div className="rounded-xl border border-[#E5EDF6] bg-[#F7FBFF] p-5 sm:p-6 md:grid md:grid-cols-2 md:gap-6">
              <div className="space-y-4">
                <Fact label="Program name" value={SMS_PROGRAM_NAME} />
                <Fact label="Sender" value={`${LEGAL_BUSINESS_NAME} (${LEGAL_OWNER_NAME})`} />
              </div>
              <div className="mt-4 space-y-4 md:mt-0">
                <Fact label="Help" value={`Reply HELP, email ${LEGAL_EMAIL}, or call ${LEGAL_PHONE_DISPLAY}`} />
                <Fact label="Effective date" value={LEGAL_EFFECTIVE_DATE} />
              </div>
            </div>

            <nav
              aria-label="Contents"
              className="mt-8 rounded-xl border border-[#E5EDF6] bg-white p-5 shadow-[0_4px_20px_-10px_rgba(7,20,63,0.12)] sm:p-6"
            >
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#46516B]">On this page</p>
              <ol className="mt-3 grid gap-x-8 gap-y-1 sm:grid-cols-2">
                {sections.map(([id, title]) => (
                  <li key={id}>
                    <a href={`#${id}`} className={tocLink}>
                      {title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <hr className="my-10 border-[#E5EDF6] sm:my-12" />

            <div className="space-y-12 text-[16px] leading-[1.7] text-[#46516B] sm:text-[17px]">
              <section>
                <h2 id="program" className={legalH2}>The program</h2>
                <p className="mt-3">
                  The {SMS_PROGRAM_NAME} program is run by {LEGAL_BUSINESS_NAME}, a marketing agency in Houston, Texas.
                  We text people who ask us for a free call or contact us about our services, and we send lead alerts to
                  business owners who are our clients. We send our texts through HighLevel (LeadConnector) and its
                  carrier partners.
                </p>
              </section>

              <section>
                <h2 id="message-types" className={legalH2}>Messages you may get</h2>
                <ul className={list}>
                  <li>
                    <span className={strong}>About your request:</span> confirmations, reminders, and changes for your
                    free call or appointment, and replies to your questions.
                  </li>
                  <li>
                    <span className={strong}>Follow-up:</span> a check-in if we couldn&apos;t reach you, and information
                    about our marketing services and offers. These are marketing texts, and we only send them if you
                    agreed to them.
                  </li>
                  <li>
                    <span className={strong}>Client lead alerts:</span> if you are a client who turned on text alerts, a
                    text when your business gets a new lead.
                  </li>
                  <li>
                    <span className={strong}>Texts for our client businesses:</span> we also run texting for some
                    client businesses (for example, a reply after you fill out their website form or after a missed
                    call, appointment follow-ups, and a one-time review request after a completed job). These texts name
                    the business, follow these same rules, and only go to people who gave that business their number
                    and agreed to texts.
                  </li>
                </ul>
                <p className="mt-3">Some texts may be sent automatically.</p>
              </section>

              <section>
                <h2 id="how-you-opt-in" className={legalH2}>How you opt in</h2>
                <h3 className={legalH3}>People who contact us</h3>
                <p className="mt-2">
                  Our free-call form has a phone field and a consent checkbox that is{" "}
                  <span className={strong}>unchecked</span> until you check it. Checking it is optional. You can book a
                  call and buy from us without it. The checkbox currently reads:
                </p>
                <blockquote className={quote}>&ldquo;{LIVE_FORM_CONSENT_TEXT}&rdquo;</blockquote>
                <p className="mt-2">
                  Links to our Privacy Policy and these SMS Terms sit next to the checkbox. We save proof of your consent:
                  the time, the page, your number, and the words you agreed to.
                </p>
                <p className="mt-2">
                  If you only book through our calendar and don&apos;t check the box, we only text you about that
                  appointment (if you asked for text reminders), not marketing.
                </p>
                <h3 className={legalH3}>Customers of our client businesses</h3>
                <p className="mt-2">
                  Lead forms we build for clients use the same kind of unchecked, optional checkbox, naming the business
                  and linking its privacy policy and these terms. Calling a client business does not sign you up for
                  marketing texts. A missed-call text only answers the call you just made.
                </p>
                <h3 className={legalH3}>Client business owners</h3>
                <p className="mt-2">
                  Clients who want text lead alerts give us their mobile number and agree to receive them during
                  onboarding. It is not required to use our services.
                </p>
              </section>

              <section>
                <h2 id="frequency-and-rates" className={legalH2}>Frequency and rates</h2>
                <p className="mt-3">
                  Message frequency varies. Most people get 1 to 6 texts about a request. Client lead alerts depend on how
                  many leads come in. <span className={strong}>Message and data rates may apply</span>, based on your
                  mobile plan. We do not charge for texts.
                </p>
              </section>

              <section>
                <h2 id="opt-out" className={legalH2}>STOP, HELP, and START</h2>
                <ul className={list}>
                  <li>
                    Reply <span className={strong}>STOP</span> (or END, CANCEL, UNSUBSCRIBE, QUIT) at any time. You&apos;ll
                    get one text confirming you&apos;re opted out, then no more texts. You can also tell us on a call or
                    by email.
                  </li>
                  <li>
                    Reply <span className={strong}>HELP</span> for help, or email {LEGAL_EMAIL}, or call{" "}
                    {LEGAL_PHONE_DISPLAY}.
                  </li>
                  <li>
                    Reply <span className={strong}>START</span> to opt back in.
                  </li>
                </ul>
              </section>

              <section>
                <h2 id="carriers" className={legalH2}>Carriers</h2>
                <p className="mt-3">
                  Carriers (such as AT&amp;T, T-Mobile, and Verizon) are not liable for delayed or undelivered messages.
                  Delivery is not guaranteed.
                </p>
              </section>

              <section>
                <h2 id="privacy" className={legalH2}>Your number and privacy</h2>
                <p className="mt-3">
                  <span className={strong}>
                    No mobile information will be sold or shared with third parties or affiliates for marketing or
                    promotional purposes.
                  </span>{" "}
                  Text messaging opt-in data and consent are never shared with anyone except the providers that deliver
                  our texts (HighLevel, its carriers, and messaging aggregators).
                </p>
                <p className="mt-3">
                  See our{" "}
                  <Link href="/privacy" className={link}>
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms" className={link}>
                    Terms of Service
                  </Link>{" "}
                  for more.
                </p>
              </section>

              <section>
                <h2 id="sample-messages" className={legalH2}>Sample messages</h2>
                <div className="mt-3 space-y-3">
                  {samples.map((s) => (
                    <div key={s.label} className="rounded-xl border border-[#E5EDF6] bg-[#F7FBFF] p-4">
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0753CF]">{s.label}</p>
                      <p className="text-[15px] leading-[1.6] text-[#07143F]">{s.text}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 id="contact" className={legalH2}>Contact</h2>
                <p className="mt-3">
                  {LEGAL_BUSINESS_NAME}, Houston, Texas. Email {LEGAL_EMAIL}. Phone / text {LEGAL_PHONE_DISPLAY}.
                </p>
              </section>
            </div>
          </article>
        </div>
      </section>
    </BrandShell>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#46516B]">{label}</p>
      <p className="mt-0.5 text-[15px] font-medium text-[#07143F]">{value}</p>
    </div>
  );
}
