import type { Metadata } from "next";
import Link from "next/link";
import { BGPattern } from "@/components/ui/bg-pattern";
import { GlassCard, GlassButton, GlassDivider, AmbientGlow } from "@/components/ui/glass";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "SMS Consent & Disclosures | QuickLaunchWeb",
  description:
    "SMS opt-in disclosures for the QuickLaunchWeb Lead Notifications program. Learn how we use SMS, how to opt in and out, and your rights.",
  path: "/sms-consent",
});

export default function SmsConsentPage() {
  return (
    <main className="relative min-h-screen px-6 py-24 md:py-32">
      <BGPattern variant="dots" mask="fade-center" size={32} fill="rgba(255,255,255,0.03)" />
      <AmbientGlow color="accent" position="top" intensity="subtle" className="-top-20" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">Legal</p>
            <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">SMS Consent &amp; Disclosures</h1>
            <p className="mt-3 text-sm text-secondary">
              How we use SMS, how you opt in, and how to opt out.
            </p>
          </div>
          <Link href="/">
            <GlassButton variant="ghost" size="md" className="w-full md:w-auto">
              Back to home
            </GlassButton>
          </Link>
        </div>

        <GlassCard variant="elevated" className="p-6 md:p-10">
          {/* Program info box */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 md:grid md:grid-cols-2 md:gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/50">Program Name</p>
                <p className="text-sm text-white/90">QuickLaunchWeb SMS Program</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/50">Operated By</p>
                <p className="text-sm text-white/90">Anthony Tran (QuickLaunchWeb)</p>
              </div>
            </div>
            <div className="mt-4 space-y-4 md:mt-0">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/50">Support Email</p>
                <p className="text-sm text-white/90">anthotranllc@gmail.com</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/50">Support Form</p>
                <p className="text-sm text-white/90">quicklaunchweb.us/support</p>
              </div>
            </div>
          </div>

          <GlassDivider className="my-8" />

          <div className="space-y-10 text-[15px] text-secondary leading-relaxed">
            {/* Program overview */}
            <section>
              <h2 className="text-base font-semibold text-white">Program Overview</h2>
              <p className="mt-3">
                The <span className="font-medium text-white">QuickLaunchWeb SMS Program</span> sends
                transactional and informational SMS (text) messages related to lead form submissions and
                review requests. Messages are sent to three groups:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>
                  <span className="font-medium text-white">Consumers / Leads:</span> When you submit a lead form on
                  a QuickLaunchWeb-powered website and opt in to SMS, you will receive a confirmation message letting
                  you know the business received your request and will contact you shortly.
                </li>
                <li>
                  <span className="font-medium text-white">Business Owners / Staff:</span> When you sign up for a
                  QuickLaunchWeb plan that includes text alerts, or enable text alerts in your account, you will
                  receive SMS notifications when a new lead is submitted, including the lead&rsquo;s name, phone
                  number, service requested, and optionally a link to view the lead.
                </li>
                <li>
                  <span className="font-medium text-white">Review Request Recipients:</span> After a completed service,
                  the business may send you a one-time text message with a link to share your feedback about your
                  experience. This message is triggered manually by the business owner — it is not automated marketing.
                </li>
              </ul>
              <p className="mt-3">
                All messages are informational and transactional only. <span className="font-medium text-white">No
                marketing messages will be sent via SMS.</span>
              </p>
            </section>

            {/* How consumers opt in */}
            <section>
              <h2 className="text-base font-semibold text-white">How Consumers Opt In</h2>
              <p className="mt-3">
                On each QuickLaunchWeb-powered client website, the lead form includes:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>A phone number field</li>
                <li>
                  An <span className="font-medium text-white">unchecked</span> SMS consent checkbox (not pre-checked;
                  the user must actively check it)
                </li>
                <li>
                  Disclosure language next to the checkbox that reads:{" "}
                  <span className="italic text-white/70">
                    &ldquo;I agree to receive SMS notifications about my request. Msg frequency varies.
                    Msg &amp; data rates may apply. Reply STOP to opt out, HELP for help.
                    Privacy Policy &amp; Terms.&rdquo;
                  </span>
                </li>
                <li>Clickable links to the Privacy Policy and Terms of Service within the consent text</li>
              </ul>
              <p className="mt-3">
                We capture and store proof of opt-in, including: timestamp, source page URL, submitted phone number,
                and the consent checkbox state.
              </p>
              <p className="mt-3 font-medium text-white">
                Consent is not required to submit the form or receive service. The SMS checkbox is optional.
              </p>
            </section>

            {/* How business owners opt in */}
            <section>
              <h2 className="text-base font-semibold text-white">How Business Owners Opt In</h2>
              <p className="mt-3">
                Business owners and their staff opt in to receive lead alert text messages through one of the
                following methods:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>
                  <span className="font-medium text-white">During onboarding:</span> When a business owner subscribes
                  to a QuickLaunchWeb plan that includes Instant Text Alerts, they provide their mobile phone number
                  and agree to receive SMS lead notifications as part of the service setup.
                </li>
                <li>
                  <span className="font-medium text-white">In account settings:</span> Business owners can enable or
                  disable text alert notifications and update their mobile number at any time by contacting support.
                </li>
              </ul>
              <p className="mt-3 font-medium text-white">
                Consent is not a condition of purchase. Business owners can use QuickLaunchWeb services without
                enabling SMS alerts.
              </p>
            </section>

            {/* How review request recipients opt in */}
            <section>
              <h2 className="text-base font-semibold text-white">How Review Request Recipients Opt In</h2>
              <p className="mt-3">
                Customers provide their phone number directly to the business during a service engagement
                (in person, by phone, or through an online booking). After service is completed, the business
                owner manually triggers a one-time review request SMS through the QuickLaunchWeb platform.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>
                  The message includes a link to a short feedback page and clear opt-out instructions
                  (reply STOP to opt out).
                </li>
                <li>
                  Only one review request message is sent per service interaction. No follow-up marketing
                  messages are sent.
                </li>
                <li>
                  Recipients can reply STOP at any time to opt out of future messages from that number.
                </li>
              </ul>
              <p className="mt-3 font-medium text-white">
                Review request messages are transactional, not marketing. They are sent only after a completed
                service and are manually triggered by the business owner.
              </p>
            </section>

            {/* Message details */}
            <section>
              <h2 className="text-base font-semibold text-white">Message Details</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>
                  <span className="font-medium text-white">Message frequency:</span> Varies based on activity.
                  Typically 1&ndash;3 messages per customer interaction.
                </li>
                <li>
                  <span className="font-medium text-white">Message and data rates:</span> Standard message and data
                  rates from your mobile carrier may apply. QuickLaunchWeb is not responsible for carrier charges.
                </li>
                <li>
                  <span className="font-medium text-white">Supported carriers:</span> Major US carriers are supported,
                  including AT&amp;T, T-Mobile, Verizon, and Sprint. Service availability may vary by carrier.
                </li>
              </ul>
            </section>

            {/* Sample messages */}
            <section>
              <h2 className="text-base font-semibold text-white">Sample Messages</h2>
              <div className="mt-3 space-y-3">
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <p className="text-xs uppercase tracking-wider text-white/50 mb-2">To consumer (lead confirmation)</p>
                  <p className="text-sm text-white/80">
                    Hi John &mdash; we received your request for ABC Fencing. Someone will reach out shortly.
                    Reply STOP to opt out, HELP for help.
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <p className="text-xs uppercase tracking-wider text-white/50 mb-2">To consumer (follow-up)</p>
                  <p className="text-sm text-white/80">
                    ABC Fencing: Thanks for reaching out. We&rsquo;ll contact you soon about your fence installation.
                    Reply STOP to opt out, HELP for help.
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <p className="text-xs uppercase tracking-wider text-white/50 mb-2">To business owner (new lead alert)</p>
                  <p className="text-sm text-white/80">
                    New lead: John &mdash; (555) 123-4567 &mdash; Fence Installation &mdash; Houston.
                    Reply STOP to opt out, HELP for help.
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <p className="text-xs uppercase tracking-wider text-white/50 mb-2">To business owner (lead link)</p>
                  <p className="text-sm text-white/80">
                    ABC Fencing &mdash; new lead received from John. View: https://app.example.com/leads/123.
                    Reply STOP to opt out, HELP for help.
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <p className="text-xs uppercase tracking-wider text-white/50 mb-2">To business owner (reminder)</p>
                  <p className="text-sm text-white/80">
                    Reminder: you still have 1 new lead from John. View: https://app.example.com/leads/123.
                    Reply STOP to opt out, HELP for help.
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <p className="text-xs uppercase tracking-wider text-white/50 mb-2">To customer (review request)</p>
                  <p className="text-sm text-white/80">
                    Hey John &mdash; thanks for choosing ABC Fencing! If you have a moment, we&rsquo;d love your feedback:
                    https://quicklaunchweb.us/r/abc123. Reply STOP to opt out, HELP for help.
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <p className="text-xs uppercase tracking-wider text-white/50 mb-2">To customer (review request — alternate)</p>
                  <p className="text-sm text-white/80">
                    ABC Fencing values your opinion! Share your experience:
                    https://quicklaunchweb.us/r/abc123. Reply STOP to opt out, HELP for help.
                  </p>
                </div>
              </div>
            </section>

            {/* Opt out */}
            <section>
              <h2 className="text-base font-semibold text-white">How to Opt Out</h2>
              <p className="mt-3">
                You can opt out of SMS messages at any time:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>
                  <span className="font-medium text-white">Reply STOP</span> to any message to immediately
                  unsubscribe. You will receive a one-time confirmation and no further messages will be sent.
                </li>
                <li>
                  <span className="font-medium text-white">Reply HELP</span> to any message for assistance,
                  or email anthotranllc@gmail.com.
                </li>
                <li>
                  <span className="font-medium text-white">Reply START</span> to re-subscribe if you previously
                  opted out.
                </li>
              </ul>
            </section>

            {/* Data and privacy */}
            <section>
              <h2 className="text-base font-semibold text-white">Data and Privacy</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>
                  We do <span className="font-medium text-white">not</span> sell, rent, or share your mobile phone
                  number or SMS consent data with any third parties for their marketing purposes.
                </li>
                <li>
                  SMS consent and opt-in data is used solely for the purpose of sending the transactional messages
                  described on this page.
                </li>
                <li>
                  For complete details on how we collect, use, and protect your data, see our{" "}
                  <a href="/privacy" className="text-accent underline">Privacy Policy</a>.
                </li>
                <li>
                  For the full terms governing our services including SMS, see our{" "}
                  <a href="/terms" className="text-accent underline">Terms of Service</a>.
                </li>
              </ul>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-base font-semibold text-white">Contact</h2>
              <p className="mt-3">
                If you have questions about our SMS program, need help opting out, or want to exercise your data
                rights, contact us:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>Email: anthotranllc@gmail.com</li>
                <li>Support form: <a href="/support" className="text-accent underline">quicklaunchweb.us/support</a></li>
                <li>Reply HELP to any SMS message</li>
              </ul>
            </section>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
