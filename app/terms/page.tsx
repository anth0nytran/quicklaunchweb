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
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 text-sm text-secondary md:grid md:grid-cols-2 md:gap-6">
            <div className="space-y-2">
              <p><span className="text-white font-medium">Effective Date:</span> October 2025</p>
              <p><span className="text-white font-medium">Owner/Operator:</span> Anthony Tran (QuickLaunchWeb, we, us)</p>
            </div>
            <div className="mt-4 space-y-2 md:mt-0">
              <p><span className="text-white font-medium">Website:</span> quicklaunchweb.us</p>
              <p><span className="text-white font-medium">Support Form:</span> quicklaunchweb.us/support</p>
              <p><span className="text-white font-medium">Support Email:</span> anthotranllc@gmail.com</p>
            </div>
          </div>

          <GlassDivider className="my-8" />

          <div className="space-y-10 text-sm text-secondary leading-relaxed">
            <section>
              <h2 className="text-base font-semibold text-white">1) Agreement to Terms</h2>
              <p className="mt-3">
                By purchasing, accessing, or using QuickLaunchWeb services, you agree to these Terms
                of Service (Terms). If you do not agree, do not use the service.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">2) What We Provide</h2>
              <p className="mt-3">QuickLaunchWeb provides a subscription website service that may include:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>Website build (template-based)</li>
                <li>Hosting + SSL</li>
                <li>Basic maintenance and support</li>
                <li>Basic SEO structure</li>
                <li>Optional analytics setup (when requested)</li>
              </ul>
              <p className="mt-4">
                We build conversion-focused websites for local businesses. However, business results
                depend on many factors outside our control (market demand, competition, pricing,
                reviews, traffic, and your follow-up). We do not guarantee any specific outcomes.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">3) Monthly Billing (Subscriptions)</h2>
              <p className="mt-3">
                Subscriptions are billed monthly and renew automatically until canceled. By subscribing,
                you authorize recurring charges through our payment processor (Stripe).
              </p>
              <p className="mt-3">
                Plans are displayed on our pricing page and may change over time for new customers.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">4) No Refunds (Cancel Anytime)</h2>
              <p className="mt-3">
                All payments are non-refundable. This includes partial months and unused service time.
                You may cancel anytime to stop future billing.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">5) Cancellation</h2>
              <p className="mt-3">You can cancel your subscription in either of the following ways:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>Stripe Customer Portal (recommended)</li>
                <li>Email request to: anthotranllc@gmail.com</li>
              </ul>
              <p className="mt-3">
                Cancellation takes effect at the end of your current billing period unless stated otherwise.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">6) The Free Build Offer</h2>
              <p className="mt-3">
                When we advertise a free build, it means the initial build fee is waived as part of an
                active subscription. The subscription cost still applies.
              </p>
              <p className="mt-3">
                We may decline free builds for businesses that are not a fit, have incomplete onboarding
                information, or violate our Acceptable Use Policy.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">7) Service Scope (Whats Included)</h2>
              <p className="mt-3">
                Your plan includes what is listed on the pricing page at time of purchase, plus the
                policies below.
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <p className="text-xs uppercase tracking-wider text-muted">Starter Plan</p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-white/30">
                    <li>1-page conversion website (template-based)</li>
                    <li>Hosting + SSL</li>
                    <li>Basic maintenance (site stays live + working)</li>
                    <li>Basic local SEO structure</li>
                    <li>Basic copywriting (simple, clear)</li>
                    <li>Content updates (see Section 8)</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <p className="text-xs uppercase tracking-wider text-muted">Pro Plan</p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-white/30">
                    <li>Up to 3 pages (template-based)</li>
                    <li>Hosting + SSL</li>
                    <li>Enhanced local SEO structure</li>
                    <li>Basic copywriting (simple, clear)</li>
                    <li>Priority handling</li>
                    <li>Content updates (see Section 8)</li>
                  </ul>
                </div>
              </div>
              <p className="mt-4">
                Note: Your exact included features are defined by your plan checkout/pricing page.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">8) Support + Content Updates (Fair Use)</h2>
              <p className="mt-3">
                Support is provided primarily through our Support Form: quicklaunchweb.us/support
              </p>
              <p className="mt-2">If something urgent comes up, email: anthotranllc@gmail.com</p>
              <p className="mt-4">Content Updates are small changes such as:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>Updating text (hours, services, pricing)</li>
                <li>Swapping images</li>
                <li>Updating buttons/links</li>
                <li>Updating phone/address/service areas</li>
                <li>Adding a testimonial</li>
                <li>Small tweaks within the existing layout</li>
              </ul>
              <p className="mt-4">Out of scope (not included in monthly plans):</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>New pages beyond your plan</li>
                <li>Full redesigns or custom layouts</li>
                <li>Advanced animations/features</li>
                <li>Custom development work</li>
                <li>CRM/automation integrations</li>
                <li>Complex SEO campaigns or ranking projects</li>
                <li>Anything requiring major structural changes</li>
              </ul>
              <p className="mt-4">We may quote out-of-scope requests separately.</p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">9) Response Times (No Guaranteed SLA)</h2>
              <p className="mt-3">
                <strong>Launch Time Target:</strong> We aim to deliver your initial website within 48 hours AFTER you submit all required onboarding assets (logo, services, service area, contact info, photos).
              </p>
              <p className="mt-3">
                <strong>Delays:</strong> If assets are missing or revisions are requested, timelines may extend.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">10) Client Responsibilities</h2>
              <p className="mt-3">
                You agree to provide accurate business information and any needed assets (logo, photos,
                services, contact info). You are responsible for your business claims, legal compliance,
                licenses, and advertising policies.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">11) Ownership, Hosting, and Website Access</h2>
              <p className="mt-3">
                While your subscription is active and in good standing, we host and operate your website
                on our infrastructure. The website and underlying templates/components remain our
                property unless purchased via a written buyout.
              </p>
              <p className="mt-4">If you cancel your subscription:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>Hosting and access may be removed</li>
                <li>Your site may be taken offline</li>
                <li>We are not obligated to provide files or exports unless a buyout is completed</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">12) Website Buyout Option</h2>
              <p className="mt-3">
                You may request to purchase (buy out) your website. If approved, we will provide a
                written quote/invoice. Ownership transfers only after full payment and written
                confirmation. Buyout pricing may vary depending on complexity and any third-party assets
                or licenses.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">13) Analytics + Tracking (Optional)</h2>
              <p className="mt-3">If you request analytics (Umami, Google Analytics, pixels, etc.), you agree that:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>You have the right to use the tracking scripts you provide</li>
                <li>You are responsible for any consent requirements or disclosures needed in your industry/location</li>
              </ul>
              <p className="mt-4">
                We are not liable for advertising platform policy enforcement or tracking accuracy.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">14) Acceptable Use Policy</h2>
              <p className="mt-3">You may not use our services for:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>Illegal activity, fraud, or misleading business practices</li>
                <li>Malware, phishing, spamming, or abusive behavior</li>
                <li>Harassment or threats toward our team</li>
              </ul>
              <p className="mt-4">
                We reserve the right to refuse service, suspend websites, or terminate accounts for violations.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">15) Right to Modify or Suspend Service</h2>
              <p className="mt-3">
                We may update, modify, or discontinue any part of the Services to improve quality or
                maintain operations. We may suspend service for nonpayment, chargebacks, abuse, or policy
                violations.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">16) No Guarantees (Results Disclaimer)</h2>
              <p className="mt-3">We do not guarantee:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>Leads, calls, bookings, revenue, or ROI</li>
                <li>Google ranking positions or SEO outcomes</li>
                <li>Specific performance within any timeframe</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">17) Limitation of Liability</h2>
              <p className="mt-3">
                To the maximum extent permitted by law, QuickLaunchWeb will not be liable for indirect,
                incidental, special, consequential, or punitive damages (including lost profits, lost
                revenue, or business interruption).
              </p>
              <p className="mt-3">
                Our total liability for any claim is limited to the amount you paid us in the last 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">18) Indemnification</h2>
              <p className="mt-3">
                You agree to defend and indemnify us from any claims, damages, and expenses arising from:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>Your business operations</li>
                <li>Your content, claims, or legal compliance</li>
                <li>Your misuse of the Services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">19) Dispute Resolution + Arbitration (Texas)</h2>
              <p className="mt-3">
                Before filing a claim, you agree to contact us for informal resolution at: anthotranllc@gmail.com
                and allow at least 30 days to resolve the issue.
              </p>
              <p className="mt-3">
                If we cannot resolve the dispute, you agree to binding arbitration in Texas, unless
                prohibited by law. Either party may bring individual claims in small claims court if
                eligible. You waive any right to bring or participate in class actions.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">20) Governing Law</h2>
              <p className="mt-3">These Terms are governed by the laws of the State of Texas.</p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">21) Contact</h2>
              <p className="mt-3">Questions about these Terms? Email: anthotranllc@gmail.com</p>
            </section>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
