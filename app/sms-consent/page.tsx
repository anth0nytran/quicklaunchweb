import type { Metadata } from "next";
import Link from "next/link";
import { BrandShell } from "@/components/brand/brand-shell";
import { Eyebrow } from "@/components/brand/primitives";
import { buildPageMetadata } from "@/lib/seo";
import { focusRing, container, pageH1, bodyText } from "@/components/brand/tokens";

export const metadata: Metadata = buildPageMetadata({
  title: "SMS Disclosures | QuickLaunchWeb",
  description:
    "SMS opt-in disclosures, consent details, and messaging terms for the QuickLaunchWeb SMS Program.",
  path: "/sms-consent",
});

const legalH2 =
  "scroll-mt-28 text-[22px] font-extrabold leading-[1.25] tracking-[-0.02em] text-[#07143F] sm:text-[24px]";
const tocLink = `block rounded-md py-1 text-[15px] leading-[1.4] text-[#46516B] transition-colors hover:text-[#0866FF] ${focusRing}`;

export default function SmsConsentPage() {
  return (
    <BrandShell stickyCta={false}>
      <section className="bg-gradient-to-b from-[#EFF8FF] to-[#f7fbff] pb-10 pt-[104px] sm:pb-14 sm:pt-28 lg:pt-32">
        <div className={container}>
          <div className="mx-auto max-w-[760px]">
            <Eyebrow>Legal</Eyebrow>
            <h1 className={`mt-4 ${pageH1}`}>SMS Disclosures</h1>
            <p className={`mt-4 max-w-[40rem] ${bodyText}`}>Opt-in, messaging, and consent details for the QuickLaunchWeb SMS Program.</p>
          </div>
        </div>
      </section>

      <section className="bg-white pb-16 pt-10 sm:pb-24 sm:pt-14">
        <div className={container}>
          <article className="mx-auto max-w-[760px]">
          <div className="rounded-xl border border-[#E5EDF6] bg-[#F7FBFF] p-5 sm:p-6 md:grid md:grid-cols-2 md:gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#46516B]">Program name</p>
                <p className="mt-0.5 text-[15px] font-medium text-[#07143F]">QuickLaunchWeb SMS Program</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#46516B]">Program operator</p>
                <p className="mt-0.5 text-[15px] font-medium text-[#07143F]">Anthony Tran (QuickLaunchWeb)</p>
              </div>
            </div>
            <div className="mt-4 space-y-4 md:mt-0">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#46516B]">Support email</p>
                <p className="mt-0.5 text-[15px] font-medium text-[#07143F]">anthotranllc@gmail.com</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#46516B]">Support page</p>
                <p className="mt-0.5 text-[15px] font-medium text-[#07143F]">quicklaunchweb.us/support</p>
              </div>
            </div>
          </div>

          <nav aria-label="Contents" className="mt-8 rounded-xl border border-[#E5EDF6] bg-white p-5 shadow-[0_4px_20px_-10px_rgba(7,20,63,0.12)] sm:p-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#46516B]">On this page</p>
              <ol className="mt-3 grid gap-x-8 gap-y-1 sm:grid-cols-2">
                <li>
                  <a href="#what-is-the-quicklaunchweb-sms-program" className={tocLink}>
                    What is the QuickLaunchWeb SMS Program?
                  </a>
                </li>
                <li>
                  <a href="#message-types" className={tocLink}>
                    Message Types
                  </a>
                </li>
                <li>
                  <a href="#how-you-opt-in" className={tocLink}>
                    How You Opt In
                  </a>
                </li>
                <li>
                  <a href="#message-frequency" className={tocLink}>
                    Message Frequency
                  </a>
                </li>
                <li>
                  <a href="#message-and-data-rates" className={tocLink}>
                    Message and Data Rates
                  </a>
                </li>
                <li>
                  <a href="#opt-out" className={tocLink}>
                    Opt-Out
                  </a>
                </li>
                <li>
                  <a href="#help" className={tocLink}>
                    Help
                  </a>
                </li>
                <li>
                  <a href="#privacy" className={tocLink}>
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#sample-messages" className={tocLink}>
                    Sample Messages
                  </a>
                </li>
              </ol>
            </nav>

            <hr className="my-10 border-[#E5EDF6] sm:my-12" />

          <div className="space-y-12 text-[16px] leading-[1.7] text-[#46516B] sm:text-[17px]">
            <section>
              <h2 id="what-is-the-quicklaunchweb-sms-program" className={legalH2}>What is the QuickLaunchWeb SMS Program?</h2>
              <p className="mt-3">
                QuickLaunchWeb is a platform that builds and operates websites and business communication tools for
                local service businesses. As the platform operator, QuickLaunchWeb sends transactional and informational
                SMS messages on behalf of its business clients. All messages are sent by QuickLaunchWeb — individual
                businesses do not independently send text messages.
              </p>
              <p className="mt-3">
                <span className="font-semibold text-[#07143F]">No marketing, promotional, or advertising messages are sent via SMS.</span>
              </p>
            </section>

            <section>
              <h2 id="message-types" className={legalH2}>Message Types</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-[#0866FF]">
                <li>
                  <span className="font-semibold text-[#07143F]">Lead confirmations:</span> When you submit a lead form on a
                  QuickLaunchWeb-powered website and check the SMS consent checkbox, you receive a one-time confirmation
                  that the business received your request.
                </li>
                <li>
                  <span className="font-semibold text-[#07143F]">Lead alerts:</span> Business owners who subscribe to text
                  alerts receive an SMS notification when a new lead is submitted.
                </li>
                <li>
                  <span className="font-semibold text-[#07143F]">Review requests:</span> After a completed service, customers
                  who opted in to SMS via the website lead form may receive a one-time message inviting them to share
                  feedback.
                </li>
              </ul>
            </section>

            <section>
              <h2 id="how-you-opt-in" className={legalH2}>How You Opt In</h2>

              <h3 className="mt-7 text-[18px] font-bold text-[#07143F]">Consumers / Leads</h3>
              <p className="mt-2">
                Each QuickLaunchWeb-powered website includes a lead form with a phone number field and
                an <span className="font-semibold text-[#07143F]">unchecked</span> SMS consent checkbox. You must actively
                check the box to opt in. The checkbox text reads:
              </p>
              <div className="mt-3 rounded-r-xl border-l-4 border-[#0866FF] bg-[#EFF8FF] px-4 py-3 text-[15px] italic leading-[1.6] text-[#46516B]">
                &ldquo;I consent to receive SMS notifications, alerts &amp; occasional updates from QuickLaunchWeb.
                Message frequency may vary. Msg &amp; data rates may apply. Text HELP for assistance.
                You may reply STOP to unsubscribe at any time. See
                our <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.&rdquo;
              </div>
              <p className="mt-2">
                Consent is <span className="font-semibold text-[#07143F]">voluntary and not required</span> to submit the form
                or receive service. We capture and store proof of opt-in including timestamp, source page URL, phone
                number, and checkbox state.
              </p>

              <h3 className="mt-7 text-[18px] font-bold text-[#07143F]">Business Owners</h3>
              <p className="mt-2">
                Business owners opt in to SMS lead alerts during onboarding. When signing up for a QuickLaunchWeb plan
                that includes text alerts, they provide their mobile number and explicitly agree to receive SMS lead
                notifications by checking an SMS consent checkbox. The disclosure reads:
              </p>
              <div className="mt-3 rounded-r-xl border-l-4 border-[#0866FF] bg-[#EFF8FF] px-4 py-3 text-[15px] italic leading-[1.6] text-[#46516B]">
                &ldquo;I agree to receive SMS lead alert notifications from QuickLaunchWeb. Msg frequency varies. Msg &amp;
                data rates may apply. Reply STOP to opt out, HELP for help.
                See <span className="underline">Privacy Policy</span> &amp; <span className="underline">Terms</span>.&rdquo;
              </div>
              <p className="mt-2">
                SMS consent is not required to use our services.
              </p>
            </section>

            <section>
              <h2 id="message-frequency" className={legalH2}>Message Frequency</h2>
              <p className="mt-3">
                Message frequency varies based on activity. Typically 1&ndash;5 messages per interaction.
              </p>
            </section>

            <section>
              <h2 id="message-and-data-rates" className={legalH2}>Message and Data Rates</h2>
              <p className="mt-3">
                Standard message and data rates from your mobile carrier may apply. QuickLaunchWeb is not responsible
                for carrier charges.
              </p>
            </section>

            <section>
              <h2 id="opt-out" className={legalH2}>Opt-Out</h2>
              <p className="mt-3">
                Reply <span className="font-semibold text-[#07143F]">STOP</span> to any message to immediately unsubscribe.
                You will receive a one-time confirmation and no further messages will be sent from that number.
              </p>
              <p className="mt-2">
                To re-subscribe, reply <span className="font-semibold text-[#07143F]">START</span>.
              </p>
            </section>

            <section>
              <h2 id="help" className={legalH2}>Help</h2>
              <p className="mt-3">
                Reply <span className="font-semibold text-[#07143F]">HELP</span> to any message for assistance, or
                email <span className="font-semibold text-[#07143F]">anthotranllc@gmail.com</span>.
              </p>
            </section>

            <section>
              <h2 id="privacy" className={legalH2}>Privacy</h2>
              <p className="mt-3">
                We do not sell, rent, or share your mobile phone number or SMS consent data with any third parties for
                marketing or promotional purposes. SMS consent and opt-in data is used solely for sending the
                transactional messages described on this page. Opt-in records are retained for compliance purposes.
              </p>
              <p className="mt-3">
                For full details, see our{" "}
                <Link href="/privacy" className="font-medium text-[#0866FF] underline underline-offset-2 hover:text-[#0753CF]">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms" className="font-medium text-[#0866FF] underline underline-offset-2 hover:text-[#0753CF]">
                  Terms of Service
                </Link>.
              </p>
            </section>

            <section>
              <h2 id="sample-messages" className={legalH2}>Sample Messages</h2>
              <div className="mt-3 space-y-3">
                <div className="rounded-xl border border-[#E5EDF6] bg-[#F7FBFF] p-4">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0866FF]">Lead confirmation</p>
                  <p className="text-[15px] leading-[1.6] text-[#07143F]">
                    Hi Alex &mdash; ABC Fencing received your request for fence installation. Someone will reach out
                    shortly. Reply STOP to opt out, HELP for help.
                  </p>
                </div>
                <div className="rounded-xl border border-[#E5EDF6] bg-[#F7FBFF] p-4">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0866FF]">Lead alert</p>
                  <p className="text-[15px] leading-[1.6] text-[#07143F]">
                    New lead for ABC Fencing: Alex &mdash; (480) 555-0176 &mdash; Fence Installation &mdash; Phoenix.
                    Reply STOP to opt out, HELP for help.
                  </p>
                </div>
                <div className="rounded-xl border border-[#E5EDF6] bg-[#F7FBFF] p-4">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0866FF]">Review request</p>
                  <p className="text-[15px] leading-[1.6] text-[#07143F]">
                    Hey Alex &mdash; thanks for choosing ABC Fencing! If you have a moment, we&rsquo;d love your
                    feedback: https://quicklaunchweb.us/r/abc123. Reply STOP to opt out, HELP for help.
                  </p>
                </div>
              </div>
            </section>
          </div>
          </article>
        </div>
      </section>
    </BrandShell>
  );
}
