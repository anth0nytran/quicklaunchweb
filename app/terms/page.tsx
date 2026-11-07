import type { Metadata } from "next";
import { BrandShell } from "@/components/brand/brand-shell";
import { Eyebrow } from "@/components/brand/primitives";
import { buildPageMetadata } from "@/lib/seo";
import { focusRing, container, pageH1, bodyText } from "@/components/brand/tokens";
import { LEGAL_EFFECTIVE_DATE, LEGAL_EMAIL, LEGAL_PHONE_DISPLAY } from "@/lib/legal";

// Not legal advice: have a lawyer review before relying on it.

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service | QuickLaunchWeb",
  description:
    "Read the QuickLaunchWeb terms of service for marketing services, websites, subscriptions, billing, and support.",
  path: "/terms",
});

const legalH2 =
  "scroll-mt-28 text-[22px] font-extrabold leading-[1.25] tracking-[-0.02em] text-[#07143F] sm:text-[24px]";
const tocLink = `block rounded-md py-1 text-[15px] leading-[1.4] text-[#46516B] transition-colors hover:text-[#0866FF] ${focusRing}`;

export default function TermsPage() {
  return (
    <BrandShell stickyCta={false}>
      <section className="bg-gradient-to-b from-[#EFF8FF] to-[#f7fbff] pb-10 pt-[104px] sm:pb-14 sm:pt-28 lg:pt-32">
        <div className={container}>
          <div className="mx-auto max-w-[760px]">
            <Eyebrow>Legal</Eyebrow>
            <h1 className={`mt-4 ${pageH1}`}>Terms of Service</h1>
            <p className={`mt-4 max-w-[40rem] ${bodyText}`}>Please read these terms carefully before using QuickLaunchWeb.</p>
          </div>
        </div>
      </section>

      <section className="bg-white pb-16 pt-10 sm:pb-24 sm:pt-14">
        <div className={container}>
          <article className="mx-auto max-w-[760px]">
          <div className="rounded-xl border border-[#E5EDF6] bg-[#F7FBFF] p-5 sm:p-6 md:grid md:grid-cols-2 md:gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#46516B]">Effective date</p>
                <p className="mt-0.5 text-[15px] font-medium text-[#07143F]">{LEGAL_EFFECTIVE_DATE}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#46516B]">Owner / Operator</p>
                <p className="mt-0.5 text-[15px] font-medium text-[#07143F]">Anthony Tran (QuickLaunchWeb, we, us)</p>
              </div>
            </div>
            <div className="mt-4 space-y-4 md:mt-0">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#46516B]">Website</p>
                <p className="mt-0.5 text-[15px] font-medium text-[#07143F]">quicklaunchweb.us</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#46516B]">Support Form</p>
                <p className="mt-0.5 text-[15px] font-medium text-[#07143F]">quicklaunchweb.us/support</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#46516B]">Support Email</p>
                <p className="mt-0.5 text-[15px] font-medium text-[#07143F]">{LEGAL_EMAIL}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-[#E5EDF6] bg-white p-4 text-[13px] leading-relaxed text-[#46516B]">
            Disclaimer: This document is provided for informational purposes only and does not constitute legal advice.
            Because laws vary by jurisdiction and circumstances, consult a qualified attorney to review these terms and
            ensure compliance with applicable laws.
          </div>

          <nav aria-label="Contents" className="mt-8 rounded-xl border border-[#E5EDF6] bg-white p-5 shadow-[0_4px_20px_-10px_rgba(7,20,63,0.12)] sm:p-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#46516B]">On this page</p>
              <ol className="mt-3 grid gap-x-8 gap-y-1 sm:grid-cols-2">
                <li>
                  <a href="#agreement-to-terms" className={tocLink}>
                    1. Agreement to Terms
                  </a>
                </li>
                <li>
                  <a href="#what-we-provide" className={tocLink}>
                    2. What We Provide
                  </a>
                </li>
                <li>
                  <a href="#subscription-plans-and-pricing" className={tocLink}>
                    3. Subscription Plans and Pricing
                  </a>
                </li>
                <li>
                  <a href="#payment-terms-and-refunds" className={tocLink}>
                    4. Payment Terms and Refunds
                  </a>
                </li>
                <li>
                  <a href="#service-scope" className={tocLink}>
                    5. Service Scope
                  </a>
                </li>
                <li>
                  <a href="#cancellation" className={tocLink}>
                    6. Cancellation
                  </a>
                </li>
                <li>
                  <a href="#ownership-licensing-and-data-portability" className={tocLink}>
                    7. Ownership, Licensing, and Data Portability
                  </a>
                </li>
                <li>
                  <a href="#analytics-and-tracking" className={tocLink}>
                    8. Analytics and Tracking
                  </a>
                </li>
                <li>
                  <a href="#sms-text-messaging-terms" className={tocLink}>
                    9. SMS/Text Messaging Terms
                  </a>
                </li>
                <li>
                  <a href="#acceptable-use-policy" className={tocLink}>
                    10. Acceptable Use Policy
                  </a>
                </li>
                <li>
                  <a href="#modifications-suspension-and-force-majeure" className={tocLink}>
                    11. Modifications, Suspension, and Force Majeure
                  </a>
                </li>
                <li>
                  <a href="#no-guarantees-disclaimer" className={tocLink}>
                    12. No Guarantees; Results Vary
                  </a>
                </li>
                <li>
                  <a href="#limitation-of-liability" className={tocLink}>
                    13. Limitation of Liability
                  </a>
                </li>
                <li>
                  <a href="#indemnification" className={tocLink}>
                    14. Indemnification
                  </a>
                </li>
                <li>
                  <a href="#accessibility" className={tocLink}>
                    15. Accessibility
                  </a>
                </li>
                <li>
                  <a href="#dispute-resolution-and-governing-law" className={tocLink}>
                    16. Dispute Resolution and Governing Law
                  </a>
                </li>
                <li>
                  <a href="#changes-to-terms" className={tocLink}>
                    17. Changes to Terms
                  </a>
                </li>
                <li>
                  <a href="#contact" className={tocLink}>
                    18. Contact
                  </a>
                </li>
              </ol>
            </nav>

            <hr className="my-10 border-[#E5EDF6] sm:my-12" />

          <div className="space-y-12 text-[16px] leading-[1.7] text-[#46516B] sm:text-[17px]">
            <section>
              <h2 id="agreement-to-terms" className={legalH2}>1. Agreement to Terms</h2>
              <p className="mt-3">
                By purchasing, accessing, or using any service offered by QuickLaunchWeb ("QuickLaunchWeb," "we," "us," or
                "our"), you ("you," "your," or "Client") agree to be bound by these Terms of Service ("Terms"). If you do
                not agree to these Terms, do not purchase, access, or use the services. These Terms incorporate our Privacy
                Policy, Acceptable Use Policy, and any service-specific terms posted on our website.
              </p>
            </section>

            <section>
              <h2 id="what-we-provide" className={legalH2}>2. What We Provide</h2>
              <p className="mt-3">
                QuickLaunchWeb provides marketing services for local businesses, which may include Facebook and Instagram
                advertising, short-form video, social media management, lead follow-up and appointment setting, websites
                and hosting, search engine and AI search optimization (SEO), and automation software. What you get is what
                is listed on the checkout page, order form, or written proposal you accept (your &ldquo;Plan&rdquo;). Website
                subscriptions include a website build, secure hosting with SSL, basic maintenance, and basic SEO as described
                in your Plan. Results depend on many factors outside our control; we do not guarantee leads, calls, booked
                jobs, clients, revenue, return on investment, ranking positions, AI search mentions, or any specific outcome
                (see Section 12).
              </p>
            </section>

            <section>
              <h2 id="subscription-plans-and-pricing" className={legalH2}>3. Subscription Plans and Pricing</h2>
              <p className="mt-3">
                Your Plan defines the features and price that apply to you. Subscription fees are billed monthly in advance
                and renew automatically until you cancel. Any one-time setup fee is shown before you pay. By subscribing, you authorize QuickLaunchWeb (via our payment processor) to charge your
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
              <h3 className="mt-7 text-[18px] font-bold text-[#07143F]">3.1 Free Build Offer</h3>
              <p className="mt-2">
                Our "free build" means we waive the initial website build fee so long as your subscription remains active.
                The monthly subscription fee still applies. We may decline free builds if we determine that your business is
                not a good fit, if onboarding information is incomplete, or if you violate our policies.
              </p>
            </section>

            <section>
              <h2 id="payment-terms-and-refunds" className={legalH2}>4. Payment Terms and Refunds</h2>
              <p className="mt-3">
                All payments are non-refundable, including partial months and unused service time. You may cancel your
                subscription at any time to stop future billing (see Section 6). In some jurisdictions, you may have
                statutory rights to refunds or cancellation. Nothing in these Terms is intended to limit any non-waivable
                rights.
              </p>
            </section>

            <section>
              <h2 id="service-scope" className={legalH2}>5. Service Scope</h2>
              <p className="mt-3">
                The services under your Plan include only the features listed in your Plan at the time you bought it.
                Features not expressly included (for example, custom design, advanced animations, ecommerce, extra pages,
                or complex integrations) fall outside your Plan and may be quoted separately.
              </p>
              <h3 className="mt-7 text-[18px] font-bold text-[#07143F]">5.1 Ad Spend and Third-Party Platforms</h3>
              <p className="mt-2">
                Unless your Plan says otherwise, ad spend is separate from our fees and is paid by you directly to the ad
                platform (for example, Meta). Ad platforms, Calendly, HighLevel, Google, and other third-party tools have
                their own terms and can approve, reject, limit, or shut down ads, pages, or accounts at their discretion.
                We are not responsible for their decisions, outages, policy changes, or charges. You are responsible for
                your business&apos;s licenses, the accuracy of your offers and claims, and honoring any prices or promises
                in ads we run for you.
              </p>
              <h3 className="mt-7 text-[18px] font-bold text-[#07143F]">5.2 Support and Content Updates (Fair Use)</h3>
              <p className="mt-2">
                Support is provided primarily through our support form; urgent matters may be submitted via email. We aim to
                respond as quickly as possible but do not guarantee specific response times. Content updates are small
                changes such as updating text, swapping images, or adjusting links. Requests outside the scope of content
                updates, including new pages beyond your plan, full redesigns, custom features, or complex SEO campaigns, are
                not included and may incur additional charges.
              </p>
              <h3 className="mt-7 text-[18px] font-bold text-[#07143F]">5.3 Timelines</h3>
              <p className="mt-2">
                Launch times we mention (for example, &ldquo;live in 7 days&rdquo; or a website draft within 48 hours) start
                after we receive everything we need from you (for example, logo, services, account access, and approvals).
                They are targets, not guarantees. Delays may occur if
                assets are missing, revisions are requested, or circumstances beyond our control occur.
              </p>
            </section>

            <section>
              <h2 id="cancellation" className={legalH2}>6. Cancellation</h2>
              <p className="mt-3">
                You may cancel your subscription at any time through the Stripe customer portal or by emailing support.
                Cancellation will be effective at the end of the current billing period. After cancellation, recurring
                charges will stop and access to your website may end on your next renewal date. We recommend you download or
                request any data you need before your subscription ends.
              </p>
            </section>

            <section>
              <h2 id="ownership-licensing-and-data-portability" className={legalH2}>7. Ownership, Licensing, and Data Portability</h2>
              <h3 className="mt-5 text-[18px] font-bold text-[#07143F]">7.1 Website Ownership</h3>
              <p className="mt-2">
                While your subscription is active, you receive a non-exclusive, non-transferable license to use the website
                created by QuickLaunchWeb for your business purposes. The underlying templates, code, and proprietary
                materials remain our property and are protected by intellectual property law. You may not copy, resell, or
                sublicense the website without our consent. Your original content (for example, text and images you supply)
                remains your property.
              </p>
              <h3 className="mt-7 text-[18px] font-bold text-[#07143F]">7.2 Hosting and Access</h3>
              <p className="mt-2">
                We host and operate your website on Vercel or a similar hosting platform. If your subscription lapses or is
                canceled, hosting may be terminated and the site may go offline. We are under no obligation to provide files
                or exports unless you complete a buyout (Section 7.3) or unless required by law. However, upon written
                request before cancellation, we will provide a reasonable opportunity to export your own content (such as
                text and images) in a commonly used format.
              </p>
              <h3 className="mt-7 text-[18px] font-bold text-[#07143F]">7.3 Website Buyout</h3>
              <p className="mt-2">
                You may request to purchase your website at any time. If approved, we will provide a written quote
                specifying the buyout price. Ownership transfers only after full payment and confirmation. The buyout price
                depends on the complexity of your site and may include the cost of third-party licenses or assets.
              </p>
            </section>

            <section>
              <h2 id="analytics-and-tracking" className={legalH2}>8. Analytics and Tracking</h2>
              <p className="mt-3">
                If you opt in, we will implement analytics scripts (for example, Umami, Vercel Analytics, or Google
                Analytics) to track site performance. You are responsible for providing valid tracking IDs and ensuring you
                have the right to use those tools. You must ensure your use of analytics complies with applicable laws,
                including cookie-consent requirements (see our Privacy Policy for details). We are not responsible for
                marketing platform policies or tracking accuracy.
              </p>
            </section>

            <section id="sms" className="scroll-mt-28">
              <h2 id="sms-text-messaging-terms" className={legalH2}>9. SMS/Text Messaging Terms</h2>

              <p className="mt-3">
                Our text message program, including how you opt in, message types, frequency, rates, and how to opt out, is
                described on our{" "}
                <a href="/sms-consent" className="font-medium text-[#0753CF] underline underline-offset-2 hover:text-[#07143F]">SMS Terms</a>{" "}
                page, which is part of these Terms. In short: we only text you if you agree; agreeing is not a condition of
                any purchase; message frequency varies; message and data rates may apply; reply STOP to opt out and HELP
                for help; carriers are not liable for delayed or undelivered messages; and we never sell or share your
                mobile number or SMS opt-in data with third parties for their marketing.
              </p>
              <p className="mt-2">
                If you are a client and we send texts for your business, you must make sure every person we text has given
                consent that meets the law and carrier rules, and you must tell us right away about any opt-out you receive.
              </p>
            </section>

            <section>
              <h2 id="acceptable-use-policy" className={legalH2}>10. Acceptable Use Policy</h2>
              <p className="mt-3">
                You agree not to use our services for illegal activity, fraud, or misleading business practices; to
                distribute malware or phishing attacks; to send spam; or to harass or threaten others. We reserve the right
                to refuse service, suspend your website, or terminate your subscription for violations. You are responsible
                for the content you publish on your website and for complying with all applicable laws, regulations, and
                advertising policies.
              </p>
            </section>

            <section>
              <h2 id="modifications-suspension-and-force-majeure" className={legalH2}>11. Modifications, Suspension, and Force Majeure</h2>
              <p className="mt-3">
                We may update, modify, or discontinue any part of the services at any time to improve quality or maintain
                operations. We may suspend service for nonpayment, chargebacks, abuse, or policy violations. We are not
                liable for delays or failure to perform due to causes beyond our reasonable control, including natural
                disasters, power failures, third-party hosting outages, labor disputes, government actions, or network
                interruptions ("Force Majeure"). During such events, we will make reasonable efforts to resume service.
              </p>
            </section>

            <section>
              <h2 id="no-guarantees-disclaimer" className={legalH2}>12. No Guarantees; Disclaimer</h2>
              <p className="mt-3">
                We do not offer a guarantee of results. QuickLaunchWeb does not guarantee specific results, leads, calls,
                booked jobs, revenue, ROI, rankings, or ad performance. Results vary by trade, location, season, budget,
                competition, your offer, and how quickly you follow up with leads. Testimonials, case studies, and client
                results on our website or in our ads describe what happened for those businesses and are not typical or
                promised results. Example dashboards and numbers on our website are for illustration only. The services
                are provided &ldquo;as is&rdquo; without warranties of any kind. To the fullest extent permitted by law, we expressly disclaim all
                warranties, whether express, implied, or statutory, including warranties of merchantability, fitness for a
                particular purpose, non-infringement, and quiet enjoyment.
              </p>
            </section>

            <section>
              <h2 id="limitation-of-liability" className={legalH2}>13. Limitation of Liability</h2>
              <p className="mt-3">
                To the maximum extent permitted by law, QuickLaunchWeb shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, or for any loss of profits or revenue, arising out of or in
                connection with these Terms or the services. Our total liability for any claim relating to the services
                shall not exceed the amount you paid us in the 30 days preceding the event giving rise to the claim. Some
                states do not allow certain limits on liability, so some of these limits may not apply to you; in that case
                our liability is limited to the smallest amount the law allows. Nothing in these Terms limits liability that
                cannot be limited by law.
              </p>
            </section>

            <section>
              <h2 id="indemnification" className={legalH2}>14. Indemnification</h2>
              <p className="mt-3">
                You agree to defend, indemnify, and hold harmless QuickLaunchWeb and its affiliates, officers, and employees
                from any claims, losses, damages, liabilities, and expenses (including reasonable attorneys' fees) arising
                from: (a) your content or business operations; (b) your breach of these Terms; or (c) your violation of any
                law or regulation. We will notify you of any such claim and provide reasonable cooperation at your expense.
              </p>
            </section>

            <section>
              <h2 id="accessibility" className={legalH2}>15. Accessibility</h2>
              <p className="mt-3">
                QuickLaunchWeb strives to build websites that are easy to use, but we cannot guarantee full compliance with
                the Americans with Disabilities Act (ADA) or other accessibility regulations. Clients are responsible for
                verifying that their websites meet accessibility requirements applicable to their industry or jurisdiction.
                If you require specific accessibility features, please let us know during onboarding so we can evaluate
                feasibility. If you have trouble using our own website, email us or call {LEGAL_PHONE_DISPLAY} and we will
                help you and work to fix the issue.
              </p>
            </section>

            <section>
              <h2 id="dispute-resolution-and-governing-law" className={legalH2}>16. Dispute Resolution and Governing Law</h2>
              <h3 className="mt-5 text-[18px] font-bold text-[#07143F]">16.1 Informal Resolution</h3>
              <p className="mt-2">
                Before filing a claim, you agree to contact us by email and allow 30 days for us to try to resolve the
                dispute.
              </p>
              <h3 className="mt-7 text-[18px] font-bold text-[#07143F]">16.2 Arbitration and Class-Action Waiver</h3>
              <p className="mt-2">
                If we cannot resolve the dispute informally, we both agree to resolve any remaining dispute through binding
                arbitration administered by the American Arbitration Association under its Consumer Arbitration Rules. The
                arbitration will take place in Texas unless you and QuickLaunchWeb agree otherwise. You and QuickLaunchWeb
                each waive the right to bring or participate in class actions, class arbitrations, or consolidated
                proceedings to the fullest extent permitted by law. Either party may bring an individual action in small
                claims court if the claim qualifies.
              </p>
              <h3 className="mt-7 text-[18px] font-bold text-[#07143F]">16.3 Governing Law</h3>
              <p className="mt-2">
                These Terms are governed by the laws of the State of Texas, without regard to its conflict-of-law principles.
                You consent to the exclusive jurisdiction of the state and federal courts located in Texas to resolve any
                dispute not subject to arbitration.
              </p>
            </section>

            <section>
              <h2 id="changes-to-terms" className={legalH2}>17. Changes to Terms</h2>
              <p className="mt-3">
                We may update these Terms from time to time. If we make material changes, we will notify you by email or
                through our website and indicate the new effective date. Your continued use of the services after the
                changes take effect constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 id="contact" className={legalH2}>18. Contact</h2>
              <p className="mt-3">
                If you have any questions about these Terms, please contact Anthony Tran at {LEGAL_EMAIL}, call or text{" "}
                {LEGAL_PHONE_DISPLAY}, or use the support form on our website.
              </p>
            </section>
          </div>
          </article>
        </div>
      </section>
    </BrandShell>
  );
}
