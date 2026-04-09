import type { Metadata } from "next";
import Link from "next/link";
import { BGPattern } from "@/components/ui/bg-pattern";
import { GlassCard, GlassButton, GlassDivider, AmbientGlow } from "@/components/ui/glass";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "SMS Disclosures | QuickLaunchWeb",
  description:
    "SMS opt-in disclosures, consent details, and messaging terms for the QuickLaunchWeb SMS Program.",
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
            <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">SMS Disclosures</h1>
            <p className="mt-3 text-sm text-secondary">
              Opt-in, messaging, and consent details for the QuickLaunchWeb SMS Program.
            </p>
          </div>
          <Link href="/">
            <GlassButton variant="ghost" size="md" className="w-full md:w-auto">
              Back to home
            </GlassButton>
          </Link>
        </div>

        <GlassCard variant="elevated" className="p-6 md:p-10">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 md:grid md:grid-cols-2 md:gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/50">Program name</p>
                <p className="text-sm text-white/90">QuickLaunchWeb SMS Program</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/50">Program operator</p>
                <p className="text-sm text-white/90">Anthony Tran (QuickLaunchWeb)</p>
              </div>
            </div>
            <div className="mt-4 space-y-4 md:mt-0">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/50">Support email</p>
                <p className="text-sm text-white/90">anthotranllc@gmail.com</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/50">Support page</p>
                <p className="text-sm text-white/90">quicklaunchweb.us/support</p>
              </div>
            </div>
          </div>

          <GlassDivider className="my-8" />

          <div className="space-y-10 text-[15px] text-secondary leading-relaxed">
            <section>
              <h2 className="text-base font-semibold text-white">What is the QuickLaunchWeb SMS Program?</h2>
              <p className="mt-3">
                QuickLaunchWeb is a platform that builds and operates websites and business communication tools for
                local service businesses. As the platform operator, QuickLaunchWeb sends transactional and informational
                SMS messages on behalf of its business clients. All messages are sent by QuickLaunchWeb — individual
                businesses do not independently send text messages.
              </p>
              <p className="mt-3">
                <span className="font-medium text-white">No marketing, promotional, or advertising messages are sent via SMS.</span>
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">Message Types</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>
                  <span className="font-medium text-white">Lead confirmations:</span> When you submit a lead form on a
                  QuickLaunchWeb-powered website and check the SMS consent checkbox, you receive a one-time confirmation
                  that the business received your request.
                </li>
                <li>
                  <span className="font-medium text-white">Lead alerts:</span> Business owners who subscribe to text
                  alerts receive an SMS notification when a new lead is submitted.
                </li>
                <li>
                  <span className="font-medium text-white">Review requests:</span> After a completed service, customers
                  who opted in to SMS via the website lead form may receive a one-time message inviting them to share
                  feedback.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">How You Opt In</h2>

              <h3 className="mt-5 text-sm font-semibold text-white">Consumers / Leads</h3>
              <p className="mt-2">
                Each QuickLaunchWeb-powered website includes a lead form with a phone number field and
                an <span className="font-medium text-white">unchecked</span> SMS consent checkbox. You must actively
                check the box to opt in. The checkbox text reads:
              </p>
              <div className="mt-2 rounded-lg border border-white/[0.08] bg-white/[0.03] p-3 text-sm italic text-white/70">
                &ldquo;I consent to receive SMS notifications, alerts &amp; occasional updates from QuickLaunchWeb.
                Message frequency may vary. Msg &amp; data rates may apply. Text HELP for assistance.
                You may reply STOP to unsubscribe at any time. See
                our <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.&rdquo;
              </div>
              <p className="mt-2">
                Consent is <span className="font-medium text-white">voluntary and not required</span> to submit the form
                or receive service. We capture and store proof of opt-in including timestamp, source page URL, phone
                number, and checkbox state.
              </p>

              <h3 className="mt-5 text-sm font-semibold text-white">Business Owners</h3>
              <p className="mt-2">
                Business owners opt in to SMS lead alerts during onboarding. When signing up for a QuickLaunchWeb plan
                that includes text alerts, they provide their mobile number and explicitly agree to receive SMS lead
                notifications by checking an SMS consent checkbox. The disclosure reads:
              </p>
              <div className="mt-2 rounded-lg border border-white/[0.08] bg-white/[0.03] p-3 text-sm italic text-white/70">
                &ldquo;I agree to receive SMS lead alert notifications from QuickLaunchWeb. Msg frequency varies. Msg &amp;
                data rates may apply. Reply STOP to opt out, HELP for help.
                See <span className="underline">Privacy Policy</span> &amp; <span className="underline">Terms</span>.&rdquo;
              </div>
              <p className="mt-2">
                SMS consent is not required to use our services.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">Message Frequency</h2>
              <p className="mt-3">
                Message frequency varies based on activity. Typically 1&ndash;5 messages per interaction.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">Message and Data Rates</h2>
              <p className="mt-3">
                Standard message and data rates from your mobile carrier may apply. QuickLaunchWeb is not responsible
                for carrier charges.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">Opt-Out</h2>
              <p className="mt-3">
                Reply <span className="font-medium text-white">STOP</span> to any message to immediately unsubscribe.
                You will receive a one-time confirmation and no further messages will be sent from that number.
              </p>
              <p className="mt-2">
                To re-subscribe, reply <span className="font-medium text-white">START</span>.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">Help</h2>
              <p className="mt-3">
                Reply <span className="font-medium text-white">HELP</span> to any message for assistance, or
                email <span className="font-medium text-white">anthotranllc@gmail.com</span>.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">Privacy</h2>
              <p className="mt-3">
                We do not sell, rent, or share your mobile phone number or SMS consent data with any third parties for
                marketing or promotional purposes. SMS consent and opt-in data is used solely for sending the
                transactional messages described on this page. Opt-in records are retained for compliance purposes.
              </p>
              <p className="mt-3">
                For full details, see our{" "}
                <Link href="/privacy" className="font-medium text-white underline underline-offset-2 hover:text-white/80">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms" className="font-medium text-white underline underline-offset-2 hover:text-white/80">
                  Terms of Service
                </Link>.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">Sample Messages</h2>
              <div className="mt-3 space-y-3">
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <p className="text-xs uppercase tracking-wider text-white/50 mb-2">Lead confirmation</p>
                  <p className="text-sm text-white/80">
                    Hi Alex &mdash; ABC Fencing received your request for fence installation. Someone will reach out
                    shortly. Reply STOP to opt out, HELP for help.
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <p className="text-xs uppercase tracking-wider text-white/50 mb-2">Lead alert</p>
                  <p className="text-sm text-white/80">
                    New lead for ABC Fencing: Alex &mdash; (480) 555-0176 &mdash; Fence Installation &mdash; Phoenix.
                    Reply STOP to opt out, HELP for help.
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <p className="text-xs uppercase tracking-wider text-white/50 mb-2">Review request</p>
                  <p className="text-sm text-white/80">
                    Hey Alex &mdash; thanks for choosing ABC Fencing! If you have a moment, we&rsquo;d love your
                    feedback: https://quicklaunchweb.us/r/abc123. Reply STOP to opt out, HELP for help.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
