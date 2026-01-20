import Link from "next/link";
import { BGPattern } from "@/components/ui/bg-pattern";
import { GlassCard, GlassButton, GlassDivider, AmbientGlow } from "@/components/ui/glass";

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
                <p className="text-sm text-white/90">January 2026</p>
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
                Our Starter and Pro plans, described on the pricing and checkout pages, define the features available to you.
                Subscription fees are billed monthly in advance and renew automatically until you cancel. By subscribing,
                you authorize QuickLaunchWeb (via our payment processor) to charge your payment method on a recurring basis.
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
                checkout page. For example, the Starter plan includes a one-page conversion-focused website, hosting and
                basic maintenance, basic local SEO, and simple copywriting. The Pro plan includes up to three pages and
                enhanced local SEO. Features not expressly included (for example, custom design, advanced animations, CRM
                integrations, or marketing automation) fall outside the subscription and may be quoted separately.
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

            <section>
              <h2 className="text-base font-semibold text-white">9. Acceptable Use Policy</h2>
              <p className="mt-3">
                You agree not to use our services for illegal activity, fraud, or misleading business practices; to
                distribute malware or phishing attacks; to send spam; or to harass or threaten others. We reserve the right
                to refuse service, suspend your website, or terminate your subscription for violations. You are responsible
                for the content you publish on your website and for complying with all applicable laws, regulations, and
                advertising policies.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">10. Modifications, Suspension, and Force Majeure</h2>
              <p className="mt-3">
                We may update, modify, or discontinue any part of the services at any time to improve quality or maintain
                operations. We may suspend service for nonpayment, chargebacks, abuse, or policy violations. We are not
                liable for delays or failure to perform due to causes beyond our reasonable control, including natural
                disasters, power failures, third-party hosting outages, labor disputes, government actions, or network
                interruptions ("Force Majeure"). During such events, we will make reasonable efforts to resume service.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">11. No Guarantees; Disclaimer</h2>
              <p className="mt-3">
                The services are provided "as is" without warranties of any kind. QuickLaunchWeb does not guarantee
                specific results, leads, revenue, or ROI. To the fullest extent permitted by law, we expressly disclaim all
                warranties, whether express, implied, or statutory, including warranties of merchantability, fitness for a
                particular purpose, non-infringement, and quiet enjoyment.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">12. Limitation of Liability</h2>
              <p className="mt-3">
                To the maximum extent permitted by law, QuickLaunchWeb shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, or for any loss of profits or revenue, arising out of or in
                connection with these Terms or the services. Our total liability for any claim relating to the services
                shall not exceed the amount you paid us in the 30 days preceding the event giving rise to the claim.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">13. Indemnification</h2>
              <p className="mt-3">
                You agree to defend, indemnify, and hold harmless QuickLaunchWeb and its affiliates, officers, and employees
                from any claims, losses, damages, liabilities, and expenses (including reasonable attorneys' fees) arising
                from: (a) your content or business operations; (b) your breach of these Terms; or (c) your violation of any
                law or regulation. We will notify you of any such claim and provide reasonable cooperation at your expense.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">14. Accessibility</h2>
              <p className="mt-3">
                QuickLaunchWeb strives to build websites that are easy to use, but we cannot guarantee full compliance with
                the Americans with Disabilities Act (ADA) or other accessibility regulations. Clients are responsible for
                verifying that their websites meet accessibility requirements applicable to their industry or jurisdiction.
                If you require specific accessibility features, please let us know during onboarding so we can evaluate
                feasibility.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">15. Dispute Resolution and Governing Law</h2>
              <h3 className="mt-3 text-sm font-semibold text-white">15.1 Informal Resolution</h3>
              <p className="mt-2">
                Before filing a claim, you agree to contact us by email and allow 30 days for us to try to resolve the
                dispute.
              </p>
              <h3 className="mt-6 text-sm font-semibold text-white">15.2 Arbitration and Class-Action Waiver</h3>
              <p className="mt-2">
                If we cannot resolve the dispute informally, we both agree to resolve any remaining dispute through binding
                arbitration administered by the American Arbitration Association under its Consumer Arbitration Rules. The
                arbitration will take place in Texas unless you and QuickLaunchWeb agree otherwise. You and QuickLaunchWeb
                each waive the right to bring or participate in class actions, class arbitrations, or consolidated
                proceedings to the fullest extent permitted by law. Either party may bring an individual action in small
                claims court if the claim qualifies.
              </p>
              <h3 className="mt-6 text-sm font-semibold text-white">15.3 Governing Law</h3>
              <p className="mt-2">
                These Terms are governed by the laws of the State of Texas, without regard to its conflict-of-law principles.
                You consent to the exclusive jurisdiction of the state and federal courts located in Texas to resolve any
                dispute not subject to arbitration.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">16. Changes to Terms</h2>
              <p className="mt-3">
                We may update these Terms from time to time. If we make material changes, we will notify you by email or
                through our website and indicate the new effective date. Your continued use of the services after the
                changes take effect constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">17. Contact</h2>
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
