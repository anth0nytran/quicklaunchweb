import type { Metadata } from "next";
import Link from "next/link";
import { BGPattern } from "@/components/ui/bg-pattern";
import { GlassCard, GlassButton, GlassDivider, AmbientGlow } from "@/components/ui/glass";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy | QuickLaunchWeb",
  description:
    "Read how QuickLaunchWeb collects, uses, shares, and protects your information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen px-6 py-24 md:py-32">
      <BGPattern variant="dots" mask="fade-center" size={32} fill="rgba(255,255,255,0.03)" />
      <AmbientGlow color="accent" position="top" intensity="subtle" className="-top-20" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">Legal</p>
            <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">Privacy Policy</h1>
            <p className="mt-3 text-sm text-secondary">
              How we collect, use, share, and protect your information.
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
                <p className="text-[10px] uppercase tracking-wider text-white/50">Last updated</p>
                <p className="text-sm text-white/90">April 2026</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/50">Owner / Operator</p>
                <p className="text-sm text-white/90">Anthony Tran (QuickLaunchWeb, we, us)</p>
              </div>
            </div>
            <div className="mt-4 space-y-4 md:mt-0">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/50">Website</p>
                <p className="text-sm text-white/90">quicklaunchweb.us</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/50">Support Form</p>
                <p className="text-sm text-white/90">quicklaunchweb.us/support</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/50">Support Email</p>
                <p className="text-sm text-white/90">anthotranllc@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-xs text-muted leading-relaxed">
            Disclaimer: This policy is provided for informational purposes only and does not constitute legal advice.
            Privacy laws vary by jurisdiction; consult a qualified attorney to ensure compliance.
          </div>

          <GlassDivider className="my-8" />

          <div className="space-y-10 text-[15px] text-secondary leading-relaxed">
            <section>
              <h2 className="text-base font-semibold text-white">1. Introduction</h2>
              <p className="mt-3">
                This Privacy Policy explains how QuickLaunchWeb collects, uses, shares, and safeguards personal information
                in connection with our website and services. By using our website or purchasing our services, you agree to
                the collection and use of information in accordance with this policy. We serve customers around the world
                but primarily in the United States, and we comply with applicable privacy laws in the jurisdictions where we
                operate.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">2. Information We Collect</h2>
              <p className="mt-3">We collect the following categories of information:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>
                  <span className="font-medium text-white">Information you provide:</span> Name, email address, phone number,
                  business name and address, logo, photos, services offered, and other onboarding details.
                </li>
                <li>
                  <span className="font-medium text-white">Payment information:</span> Stripe processes subscription payments
                  on our behalf. We do not store full payment card numbers on our servers.
                </li>
                <li>
                  <span className="font-medium text-white">Analytics and usage data:</span> Device type, browser type, pages
                  viewed, and time spent on pages via tools like Umami, Vercel Analytics, or Google Analytics.
                </li>
                <li>
                  <span className="font-medium text-white">Cookies and similar technologies:</span> We and our partners use
                  cookies to operate the site and analyze traffic.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">3. How We Use Information</h2>
              <p className="mt-3">We use personal information for the following purposes:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>
                  <span className="font-medium text-white">Provide services:</span> Build, host, and maintain your website,
                  process payments via Stripe, and deliver support.
                </li>
                <li>
                  <span className="font-medium text-white">Communicate:</span> Contact you about onboarding, updates, support
                  requests, and marketing offers (you may opt out at any time).
                </li>
                <li>
                  <span className="font-medium text-white">Improve and secure:</span> Analyze usage, improve the experience,
                  and protect against fraud and abuse.
                </li>
                <li>
                  <span className="font-medium text-white">Legal compliance:</span> Comply with legal obligations, enforce our
                  Terms, resolve disputes, and protect our rights.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">4. Legal Bases for Processing (EU/UK users)</h2>
              <p className="mt-3">If you are located in the EEA or United Kingdom, we process personal data based on:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>
                  <span className="font-medium text-white">Contractual necessity:</span> To provide the services you request.
                </li>
                <li>
                  <span className="font-medium text-white">Legitimate interests:</span> To improve services, prevent fraud,
                  and maintain security.
                </li>
                <li>
                  <span className="font-medium text-white">Consent:</span> For non-essential cookies and marketing
                  communications.
                </li>
                <li>
                  <span className="font-medium text-white">Legal obligations:</span> To comply with applicable laws and
                  regulations.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">5. Sharing Your Information</h2>
              <p className="mt-3">
                We do not sell your personal information. We may share information with trusted third parties, including:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>
                  <span className="font-medium text-white">Payment processors:</span> Stripe, to process subscription
                  payments.
                </li>
                <li>
                  <span className="font-medium text-white">Hosting and infrastructure:</span> Vercel and similar providers.
                </li>
                <li>
                  <span className="font-medium text-white">Analytics providers:</span> Umami, Vercel Analytics, or Google
                  Analytics.
                </li>
                <li>
                  <span className="font-medium text-white">Service partners:</span> Optional add-on services you request.
                </li>
                <li>
                  <span className="font-medium text-white">Compliance and legal:</span> If required by law or to protect
                  rights, property, or safety.
                </li>
              </ul>
              <p className="mt-3">
                These third parties process personal data on our behalf and are bound by contractual obligations to keep
                information confidential and use it only for disclosed purposes.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">6. Cookies and Tracking Technologies</h2>
              <p className="mt-3">
                We use cookies and similar technologies to operate our website, remember preferences, and analyze traffic.
                Some cookies are essential for the site to function; others are used for analytics and marketing.
              </p>
              <p className="mt-3">
                If you are located in a jurisdiction that requires cookie consent, we will display a cookie notice and allow
                you to accept or decline non-essential cookies. At present we do not show a cookie banner, but as we expand
                internationally we may implement one. You can also modify cookie settings in your browser, though disabling
                cookies may affect site functionality.
              </p>
            </section>

            <section id="sms">
              <h2 className="text-base font-semibold text-white">7. SMS/Text Messaging</h2>

              <h3 className="mt-6 text-sm font-semibold text-white">7.1 Platform Operator Disclosure</h3>
              <p className="mt-2">
                <span className="font-medium text-white">Program Name:</span> QuickLaunchWeb SMS Program
              </p>
              <p className="mt-2">
                QuickLaunchWeb is a platform that builds, hosts, and operates websites and business communication
                tools for local service businesses. As the platform operator, QuickLaunchWeb is the sole sender of
                all SMS messages across every client website and business account on our platform. Each business
                client may be assigned a dedicated phone number for their SMS communications, but all phone numbers
                are owned, registered, and operated by QuickLaunchWeb under a single brand registration. The
                individual business does not independently send text messages — QuickLaunchWeb sends all messages on
                their behalf through our platform.
              </p>

              <h3 className="mt-6 text-sm font-semibold text-white">7.2 Message Types and Purpose</h3>
              <p className="mt-2">
                All SMS messages sent through our platform are <span className="font-medium text-white">transactional
                and informational only</span>. We do not send marketing, promotional, or advertising messages via SMS.
                Message types include:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>
                  <span className="font-medium text-white">Lead confirmations (to consumers):</span> When you submit a
                  lead form on a QuickLaunchWeb-powered website and opt in to SMS, you receive a confirmation that the
                  business received your request.
                </li>
                <li>
                  <span className="font-medium text-white">Lead alerts (to business owners/staff):</span> When a new
                  lead is submitted, the business owner or designated staff receives an SMS notification with the
                  lead details.
                </li>
                <li>
                  <span className="font-medium text-white">Missed call text-back (to consumers):</span> If a consumer
                  calls a business and the call is not answered, an automated text is sent to the caller letting them
                  know the business will follow up.
                </li>
                <li>
                  <span className="font-medium text-white">Auto follow-ups (to consumers):</span> Automated follow-up
                  messages sent to leads who have not yet been contacted, to ensure no inquiry goes unanswered.
                </li>
                <li>
                  <span className="font-medium text-white">Review requests (to customers):</span> After a completed
                  service, a one-time SMS inviting the customer to share feedback about their experience. This message
                  includes a link to a short feedback page.
                </li>
              </ul>

              <h3 className="mt-6 text-sm font-semibold text-white">7.3 How You Opt In</h3>
              <p className="mt-2 font-medium text-white">Consumers / Leads:</p>
              <p className="mt-1">
                Each QuickLaunchWeb-powered website includes a lead form with a phone number field and
                an <span className="font-medium text-white">unchecked</span> SMS consent checkbox (not pre-checked).
                The disclosure language next to the checkbox reads:
              </p>
              <div className="mt-2 rounded-lg border border-white/[0.08] bg-white/[0.03] p-3 text-sm italic text-white/70">
                &ldquo;I consent to receive SMS notifications, alerts &amp; occasional updates from QuickLaunchWeb.
                Message frequency may vary. Msg &amp; data rates may apply. Text HELP for assistance.
                You may reply STOP to unsubscribe at any time. Privacy Policy &amp; Terms.&rdquo;
              </div>
              <p className="mt-2">
                The Privacy Policy and Terms links are clickable. We capture and store proof of opt-in including
                timestamp, source page URL, phone number, and checkbox state.
              </p>
              <p className="mt-3 font-medium text-white">Business Owners / Staff:</p>
              <p className="mt-1">
                Business owners opt in during onboarding when they subscribe to a plan that includes text alerts.
                They provide their mobile number and explicitly agree to receive SMS lead notifications by checking
                an SMS consent checkbox. The disclosure reads: &ldquo;I agree to receive SMS lead alert notifications
                from QuickLaunchWeb. Msg frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out,
                HELP for help. See Privacy Policy &amp; Terms.&rdquo; SMS consent is not required to use our services.
              </p>
              <p className="mt-3 font-medium text-white">Review Request Recipients:</p>
              <p className="mt-1">
                Review request messages are only sent to customers who have already opted in to SMS through the
                website lead form consent checkbox described above. After a completed service, the business owner
                may trigger a one-time review request through the QuickLaunchWeb platform. The message includes
                opt-out instructions (reply STOP). Only one review request is sent per service interaction. No
                review request messages are sent to customers who did not opt in via the lead form.
              </p>
              <p className="mt-3 font-medium text-white">
                Consent to receive SMS is not a condition of any purchase or service. You may use our services,
                submit lead forms, or receive services without opting in to SMS.
              </p>

              <h3 className="mt-6 text-sm font-semibold text-white">7.4 Message Frequency and Costs</h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>
                  <span className="font-medium text-white">Frequency:</span> Message frequency varies based on
                  activity. Typically 1&ndash;5 messages per customer interaction.
                </li>
                <li>
                  <span className="font-medium text-white">Message and data rates:</span> Standard message and data
                  rates from your mobile carrier may apply. QuickLaunchWeb is not responsible for carrier charges.
                </li>
                <li>
                  <span className="font-medium text-white">Supported carriers:</span> Major US carriers including
                  AT&amp;T, T-Mobile, Verizon, and Sprint. Service availability may vary by carrier.
                </li>
              </ul>

              <h3 className="mt-6 text-sm font-semibold text-white">7.5 Opt-Out and Help</h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>
                  <span className="font-medium text-white">Opt-out:</span> Reply <span className="font-medium text-white">STOP</span> to
                  any message to immediately unsubscribe. You will receive a one-time confirmation and no further
                  messages will be sent from that number.
                </li>
                <li>
                  <span className="font-medium text-white">Help:</span> Reply <span className="font-medium text-white">HELP</span> to
                  any message for assistance, or email anthotranllc@gmail.com.
                </li>
                <li>
                  <span className="font-medium text-white">Re-subscribe:</span> Reply <span className="font-medium text-white">START</span> to
                  re-subscribe if you previously opted out.
                </li>
              </ul>

              <h3 className="mt-6 text-sm font-semibold text-white">7.6 SMS Data and Privacy</h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>
                  We do <span className="font-medium text-white">not</span> sell, rent, or share your mobile phone
                  number or SMS consent data with any third parties for their marketing purposes.
                </li>
                <li>
                  SMS consent and opt-in data is used solely for sending the transactional messages described in this
                  section.
                </li>
                <li>
                  Opt-in records (timestamp, source URL, phone number, consent state) are retained for compliance
                  purposes and are available upon request.
                </li>
                <li>
                  All the above categories exclude text messaging originator opt-in data and consent; this
                  information will not be shared with any third parties, excluding aggregators and providers
                  of the Text Message services.
                </li>
              </ul>

              <h3 className="mt-6 text-sm font-semibold text-white">7.7 Sample Messages</h3>
              <div className="mt-3 space-y-3">
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <p className="text-xs uppercase tracking-wider text-white/50 mb-2">Lead confirmation (to consumer)</p>
                  <p className="text-sm text-white/80">
                    Hi John &mdash; we received your request for ABC Fencing. Someone will reach out shortly.
                    Reply STOP to opt out, HELP for help.
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <p className="text-xs uppercase tracking-wider text-white/50 mb-2">Missed call text-back (to consumer)</p>
                  <p className="text-sm text-white/80">
                    Hi, you just called ABC Fencing. Sorry we missed you! We&rsquo;ll get back to you shortly. If
                    you&rsquo;d like, reply with details about what you need.
                    Reply STOP to opt out, HELP for help.
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <p className="text-xs uppercase tracking-wider text-white/50 mb-2">Lead alert (to business owner)</p>
                  <p className="text-sm text-white/80">
                    New lead: John &mdash; (555) 123-4567 &mdash; Fence Installation &mdash; Houston.
                    Reply STOP to opt out, HELP for help.
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <p className="text-xs uppercase tracking-wider text-white/50 mb-2">Review request (to customer)</p>
                  <p className="text-sm text-white/80">
                    Hey John &mdash; thanks for choosing ABC Fencing! If you have a moment, we&rsquo;d love your
                    feedback: https://quicklaunchweb.us/r/abc123.
                    Reply STOP to opt out, HELP for help.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">8. Data Retention</h2>
              <p className="mt-3">
                We retain personal information for as long as necessary to fulfill the purposes described in this policy and
                to comply with legal obligations. Because we maintain only a small database, we may store data until the
                database reaches capacity. If we plan to delete data because our database is full, we will provide notice so
                you can request a copy of your data. You may request deletion of your personal information at any time, and
                we will delete it as soon as practicable, subject to legal obligations. Upon request, we will export your
                data and then remove it from our systems.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">9. Your Rights and Choices</h2>
              <p className="mt-3">Depending on your location, you may have the following rights:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>
                  <span className="font-medium text-white">Access:</span> Request a copy of the personal information we hold.
                </li>
                <li>
                  <span className="font-medium text-white">Correction:</span> Request corrections to inaccurate information.
                </li>
                <li>
                  <span className="font-medium text-white">Deletion:</span> Request deletion of your personal data, subject to
                  legal exceptions.
                </li>
                <li>
                  <span className="font-medium text-white">Opt-out of marketing:</span> Unsubscribe from marketing emails.
                </li>
                <li>
                  <span className="font-medium text-white">Opt-out of SMS:</span> Reply STOP to any text message to
                  unsubscribe from SMS communications.
                </li>
                <li>
                  <span className="font-medium text-white">Opt-out of cookies:</span> Decline non-essential cookies where
                  required.
                </li>
                <li>
                  <span className="font-medium text-white">Data portability:</span> EEA/UK users may request a transfer of
                  personal data.
                </li>
                <li>
                  <span className="font-medium text-white">Do Not Sell/Share (California residents):</span> We do not sell
                  personal information. If we later share personal data for cross-context behavioral advertising, we will
                  provide notice and an opt-out mechanism as required by CCPA/CPRA.
                </li>
              </ul>
              <p className="mt-3">
                To exercise these rights, contact us at anthotranllc@gmail.com. We may need to verify your identity before
                processing your request.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">10. Children&#39;s Privacy</h2>
              <p className="mt-3">
                Our services are intended for adults and businesses, not for children under 13. We do not knowingly collect
                personal information from children under 13. If we become aware that a child has provided us with personal
                information, we will delete it. If you believe a child has provided us with personal information, please
                contact us.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">11. International Data Transfers</h2>
              <p className="mt-3">
                QuickLaunchWeb is based in the United States and serves customers globally. By using our services, you
                understand that your information may be transferred to, stored in, and processed in the U.S. or other
                countries. These countries may have data-protection laws that are different from those of your jurisdiction.
                If you are in the EEA/UK, we rely on standard contractual clauses or other legal mechanisms to lawfully
                transfer your personal data.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">12. Data Security</h2>
              <p className="mt-3">
                We implement reasonable technical and organizational measures to protect personal information, including
                encryption in transit, restricted access, regular backups, and secure hosting. However, no method of
                transmission or storage is completely secure, so we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">13. Changes to This Policy</h2>
              <p className="mt-3">
                We may update this Privacy Policy from time to time. We will notify you of material changes by posting the
                new policy on our website and updating the "Last updated" date. In some cases, we may also send an email
                notification. Your continued use of our services after changes take effect signifies acceptance of the
                updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">14. Contact Us</h2>
              <p className="mt-3">
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact Anthony Tran
                at anthotranllc@gmail.com or via our support form.
              </p>
            </section>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
