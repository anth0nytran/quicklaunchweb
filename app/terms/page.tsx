import type { Metadata } from "next";
import Link from "next/link";
import { BGPattern } from "@/components/ui/bg-pattern";
import { GlassCard, GlassButton, GlassDivider, AmbientGlow } from "@/components/ui/glass";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service | QuickLaunchWeb",
  description:
    "Read the QuickLaunchWeb terms of service for subscriptions, website delivery, billing, and support.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main className="relative min-h-screen px-6 py-24 md:py-32">
      <BGPattern variant="dots" mask="fade-center" size={32} fill="rgba(255,255,255,0.03)" />
      <AmbientGlow color="accent" position="top" intensity="subtle" className="-top-20" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">Legal</p>
            <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">Terms of Service</h1>
            <p className="mt-3 text-sm text-secondary">
              Please read these terms carefully before using QuickLaunchWeb.
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
            Disclaimer: This document is provided for informational purposes only and does not constitute legal advice.
            Because laws vary by jurisdiction and circumstances, consult a qualified attorney to review these terms and
            ensure compliance with applicable laws.
          </div>

          <GlassDivider className="my-8" />

          <div className="space-y-10 text-[15px] text-secondary leading-relaxed">
            <section>
              <h2 className="text-base font-semibold text-white">1. Agreement to Terms</h2>
              <p className="mt-3">
                By purchasing, accessing, or using any service offered by QuickLaunchWeb ("QuickLaunchWeb," "we," "us," or
                "our"), you ("you," "your," or "Client") agree to be bound by these Terms of Service ("Terms"). If you do
                not agree to these Terms, do not purchase, access, or use the services. These Terms incorporate our Privacy
                Policy, Acceptable Use Policy, and any service-specific terms posted on our website.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">2. What We Provide</h2>
              <p className="mt-3">
                QuickLaunchWeb offers subscription plans for professionally built websites aimed at local business marketing.
                Each subscription includes a template-based website build, secure hosting with SSL, basic maintenance to keep
                the site live and functioning, and basic search-engine optimization (SEO). A free initial build is offered
                with an active subscription. Optional add-ons (such as analytics) may be available. We focus on creating
                conversion-oriented websites, but results depend on many factors outside our control; we do not guarantee
                leads, clients, bookings, revenue, return on investment, ranking positions, or any specific outcome.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">3. Subscription Plans and Pricing</h2>
              <p className="mt-3">
                Our Starter, Growth Engine, and City Dominator plans, described on the pricing and checkout pages, define
                the features available to you. Subscription fees are billed monthly in advance and renew automatically
                until you cancel. By subscribing, you authorize QuickLaunchWeb (via our payment processor) to charge your
                payment method on a recurring basis.
              </p>
              <p className="mt-3">
                Early adopters keep their rate. We do not currently increase subscription fees for existing subscribers.
                Early adopters will keep their rate for as long as they remain on their plan. If we introduce new tiers or
                services that require a different rate, you will have the option to upgrade; we will not automatically change
                your pricing. If we ever need to increase fees in the future, we will provide at least 30 days prior notice by
                email or through your account. Continued use of the services after the effective date of a price change
                constitutes acceptance.
              </p>
              <h3 className="mt-6 text-sm font-semibold text-white">3.1 Free Build Offer</h3>
              <p className="mt-2">
                Our "free build" means we waive the initial website build fee so long as your subscription remains active.
                The monthly subscription fee still applies. We may decline free builds if we determine that your business is
                not a good fit, if onboarding information is incomplete, or if you violate our policies.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">4. Payment Terms and Refunds</h2>
              <p className="mt-3">
                All payments are non-refundable, including partial months and unused service time. You may cancel your
                subscription at any time to stop future billing (see Section 6). In some jurisdictions, you may have
                statutory rights to refunds or cancellation. Nothing in these Terms is intended to limit any non-waivable
                rights.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">5. Service Scope</h2>
              <p className="mt-3">
                You agree that the services provided under your plan include only the features listed on the pricing and
                checkout page. The Starter plan ($99/mo) includes a custom-built one-page website, hosting and security,
                basic local SEO, a contact form, and 1 content update per month. The Growth Engine plan ($199/mo) adds
                service pages, full SEO and AI search setup, Google Business Profile setup, review reply automation, a
                review request link, 1 blog post per month, a monthly ranking snapshot, and 2 content updates. The City
                Dominator plan ($399/mo) adds everything in Growth Engine plus a full CRM, missed call text-back, instant
                lead reply with auto follow-ups, after-hours auto-reply, automated review requests, 2 city pages and 2
                blog posts per month, a 12-month city growth plan, priority edits, and 4 content updates. Features not
                expressly included in your plan (for example, custom design, advanced animations, ecommerce, or complex
                integrations) fall outside the subscription and may be quoted separately.
              </p>
              <h3 className="mt-6 text-sm font-semibold text-white">5.1 Support and Content Updates (Fair Use)</h3>
              <p className="mt-2">
                Support is provided primarily through our support form; urgent matters may be submitted via email. We aim to
                respond as quickly as possible but do not guarantee specific response times. Content updates are small
                changes such as updating text, swapping images, or adjusting links. Requests outside the scope of content
                updates, including new pages beyond your plan, full redesigns, custom features, or complex SEO campaigns, are
                not included and may incur additional charges.
              </p>
              <h3 className="mt-6 text-sm font-semibold text-white">5.2 Response Times</h3>
              <p className="mt-2">
                After receiving all required onboarding assets (for example, logo, services, contact information), we aim to
                deliver an initial website draft within 48 hours. This is a target, not a guarantee. Delays may occur if
                assets are missing, revisions are requested, or circumstances beyond our control occur.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">6. Cancellation</h2>
              <p className="mt-3">
                You may cancel your subscription at any time through the Stripe customer portal or by emailing support.
                Cancellation will be effective at the end of the current billing period. After cancellation, recurring
                charges will stop and access to your website may end on your next renewal date. We recommend you download or
                request any data you need before your subscription ends.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">7. Ownership, Licensing, and Data Portability</h2>
              <h3 className="mt-3 text-sm font-semibold text-white">7.1 Website Ownership</h3>
              <p className="mt-2">
                While your subscription is active, you receive a non-exclusive, non-transferable license to use the website
                created by QuickLaunchWeb for your business purposes. The underlying templates, code, and proprietary
                materials remain our property and are protected by intellectual property law. You may not copy, resell, or
                sublicense the website without our consent. Your original content (for example, text and images you supply)
                remains your property.
              </p>
              <h3 className="mt-6 text-sm font-semibold text-white">7.2 Hosting and Access</h3>
              <p className="mt-2">
                We host and operate your website on Vercel or a similar hosting platform. If your subscription lapses or is
                canceled, hosting may be terminated and the site may go offline. We are under no obligation to provide files
                or exports unless you complete a buyout (Section 7.3) or unless required by law. However, upon written
                request before cancellation, we will provide a reasonable opportunity to export your own content (such as
                text and images) in a commonly used format.
              </p>
              <h3 className="mt-6 text-sm font-semibold text-white">7.3 Website Buyout</h3>
              <p className="mt-2">
                You may request to purchase your website at any time. If approved, we will provide a written quote
                specifying the buyout price. Ownership transfers only after full payment and confirmation. The buyout price
                depends on the complexity of your site and may include the cost of third-party licenses or assets.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">8. Analytics and Tracking</h2>
              <p className="mt-3">
                If you opt in, we will implement analytics scripts (for example, Umami, Vercel Analytics, or Google
                Analytics) to track site performance. You are responsible for providing valid tracking IDs and ensuring you
                have the right to use those tools. You must ensure your use of analytics complies with applicable laws,
                including cookie-consent requirements (see our Privacy Policy for details). We are not responsible for
                marketing platform policies or tracking accuracy.
              </p>
            </section>

            <section id="sms">
              <h2 className="text-base font-semibold text-white">9. SMS/Text Messaging Terms</h2>

              <h3 className="mt-3 text-sm font-semibold text-white">9.1 Platform Operator</h3>
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

              <h3 className="mt-6 text-sm font-semibold text-white">9.2 Consent</h3>
              <p className="mt-2">
                By opting in to receive text messages — whether as a consumer submitting a lead form, a business
                owner enabling lead alert notifications, or a customer receiving a review request — you consent to
                receive transactional and informational SMS messages as described in this section. No marketing,
                promotional, or advertising messages will be sent via SMS.
              </p>
              <p className="mt-2">
                Consumers opt in through an unchecked SMS consent checkbox on each QuickLaunchWeb-powered lead form.
                The checkbox includes disclosure language with links to our Privacy Policy and Terms of Service.
                Business owners opt in during onboarding or by enabling text alerts through our support form. Review
                request recipients receive a one-time message after providing their phone number to the business
                during a service engagement.
              </p>
              <p className="mt-2">
                We capture and store proof of opt-in including timestamp, source page URL, phone number, and consent
                checkbox state. Consent to receive SMS is not a condition of any purchase or service.
              </p>

              <h3 className="mt-6 text-sm font-semibold text-white">9.3 Message Types</h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>Lead submission confirmations sent to consumers who opt in via a lead form.</li>
                <li>Lead alert notifications sent to business owners and staff.</li>
                <li>Missed call text-back messages sent to consumers when a call is not answered.</li>
                <li>Automated follow-up messages sent to leads who have not yet been contacted.</li>
                <li>After-hours auto-reply messages sent to consumers who reach out outside business hours.</li>
                <li>Review requests — a one-time SMS after a completed service inviting the customer to share
                  feedback. The message includes a link to a short feedback page and opt-out instructions.</li>
              </ul>

              <h3 className="mt-6 text-sm font-semibold text-white">9.4 Message Frequency and Costs</h3>
              <p className="mt-2">
                Message frequency varies based on activity. Typically 1&ndash;5 messages per customer interaction.
                Standard message and data rates from your mobile carrier may apply. QuickLaunchWeb is not responsible
                for carrier charges. Major US carriers are supported including AT&amp;T, T-Mobile, Verizon, and
                Sprint. Service availability may vary by carrier.
                Carriers are not liable for delayed or undelivered messages.
              </p>

              <h3 className="mt-6 text-sm font-semibold text-white">9.5 Opt-Out, Help, and Re-Subscribe</h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>Reply <span className="font-medium text-white">STOP</span> to any message to immediately
                  unsubscribe. You will receive a one-time confirmation and no further messages will be sent from
                  that number.</li>
                <li>Reply <span className="font-medium text-white">HELP</span> to any message for assistance, or
                  email anthotranllc@gmail.com.</li>
                <li>Reply <span className="font-medium text-white">START</span> to re-subscribe if you previously
                  opted out.</li>
              </ul>

              <h3 className="mt-6 text-sm font-semibold text-white">9.6 SMS Data</h3>
              <p className="mt-2">
                We do not sell, rent, or share your mobile phone number or SMS consent data with any third parties
                for their marketing purposes. SMS consent and opt-in data is used solely for sending the
                transactional messages described in this section. For full details on how we handle your data, see
                our <a href="/privacy#sms" className="text-accent underline">Privacy Policy</a>.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">10. Acceptable Use Policy</h2>
              <p className="mt-3">
                You agree not to use our services for illegal activity, fraud, or misleading business practices; to
                distribute malware or phishing attacks; to send spam; or to harass or threaten others. We reserve the right
                to refuse service, suspend your website, or terminate your subscription for violations. You are responsible
                for the content you publish on your website and for complying with all applicable laws, regulations, and
                advertising policies.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">11. Modifications, Suspension, and Force Majeure</h2>
              <p className="mt-3">
                We may update, modify, or discontinue any part of the services at any time to improve quality or maintain
                operations. We may suspend service for nonpayment, chargebacks, abuse, or policy violations. We are not
                liable for delays or failure to perform due to causes beyond our reasonable control, including natural
                disasters, power failures, third-party hosting outages, labor disputes, government actions, or network
                interruptions ("Force Majeure"). During such events, we will make reasonable efforts to resume service.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">12. No Guarantees; Disclaimer</h2>
              <p className="mt-3">
                The services are provided "as is" without warranties of any kind. QuickLaunchWeb does not guarantee
                specific results, leads, revenue, or ROI. To the fullest extent permitted by law, we expressly disclaim all
                warranties, whether express, implied, or statutory, including warranties of merchantability, fitness for a
                particular purpose, non-infringement, and quiet enjoyment.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">13. Limitation of Liability</h2>
              <p className="mt-3">
                To the maximum extent permitted by law, QuickLaunchWeb shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, or for any loss of profits or revenue, arising out of or in
                connection with these Terms or the services. Our total liability for any claim relating to the services
                shall not exceed the amount you paid us in the 30 days preceding the event giving rise to the claim.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">14. Indemnification</h2>
              <p className="mt-3">
                You agree to defend, indemnify, and hold harmless QuickLaunchWeb and its affiliates, officers, and employees
                from any claims, losses, damages, liabilities, and expenses (including reasonable attorneys' fees) arising
                from: (a) your content or business operations; (b) your breach of these Terms; or (c) your violation of any
                law or regulation. We will notify you of any such claim and provide reasonable cooperation at your expense.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">15. Accessibility</h2>
              <p className="mt-3">
                QuickLaunchWeb strives to build websites that are easy to use, but we cannot guarantee full compliance with
                the Americans with Disabilities Act (ADA) or other accessibility regulations. Clients are responsible for
                verifying that their websites meet accessibility requirements applicable to their industry or jurisdiction.
                If you require specific accessibility features, please let us know during onboarding so we can evaluate
                feasibility.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">16. Dispute Resolution and Governing Law</h2>
              <h3 className="mt-3 text-sm font-semibold text-white">16.1 Informal Resolution</h3>
              <p className="mt-2">
                Before filing a claim, you agree to contact us by email and allow 30 days for us to try to resolve the
                dispute.
              </p>
              <h3 className="mt-6 text-sm font-semibold text-white">16.2 Arbitration and Class-Action Waiver</h3>
              <p className="mt-2">
                If we cannot resolve the dispute informally, we both agree to resolve any remaining dispute through binding
                arbitration administered by the American Arbitration Association under its Consumer Arbitration Rules. The
                arbitration will take place in Texas unless you and QuickLaunchWeb agree otherwise. You and QuickLaunchWeb
                each waive the right to bring or participate in class actions, class arbitrations, or consolidated
                proceedings to the fullest extent permitted by law. Either party may bring an individual action in small
                claims court if the claim qualifies.
              </p>
              <h3 className="mt-6 text-sm font-semibold text-white">16.3 Governing Law</h3>
              <p className="mt-2">
                These Terms are governed by the laws of the State of Texas, without regard to its conflict-of-law principles.
                You consent to the exclusive jurisdiction of the state and federal courts located in Texas to resolve any
                dispute not subject to arbitration.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">17. Changes to Terms</h2>
              <p className="mt-3">
                We may update these Terms from time to time. If we make material changes, we will notify you by email or
                through our website and indicate the new effective date. Your continued use of the services after the
                changes take effect constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">18. Contact</h2>
              <p className="mt-3">
                If you have any questions about these Terms, please contact Anthony Tran at anthotranllc@gmail.com or through
                the support form on our website.
              </p>
            </section>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
