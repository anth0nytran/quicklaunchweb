import Link from "next/link";
import type { Metadata } from "next";
import { BGPattern } from "@/components/ui/bg-pattern";
import { AmbientGlow, GlassButton, GlassCard, GlassDivider, GlassPill } from "@/components/ui/glass";

export const metadata: Metadata = {
  title: "Subscription Web Design | Pay Monthly Web Design That Converts",
  description:
    "Learn what subscription web design is, how pricing works, what is included, and who it is best for. Compare pay monthly web design vs agencies and DIY sites.",
  openGraph: {
    title: "Subscription Web Design | Pay Monthly Web Design That Converts",
    description:
      "A clear guide to subscription web design pricing, inclusions, and who it helps most. Compare monthly plans to agencies and DIY platforms.",
    type: "article",
  },
};

export default function SubscriptionWebDesignPage() {
  return (
    <main className="relative min-h-screen px-6 py-24 md:py-32">
      <BGPattern variant="grid" mask="fade-center" size={30} fill="rgba(255,255,255,0.035)" />
      <AmbientGlow color="accent" position="top" intensity="subtle" className="-top-24" />
      <AmbientGlow color="white" position="bottom" intensity="subtle" className="opacity-60" />

      <div className="relative z-10 mx-auto max-w-4xl space-y-12">
        <header className="space-y-6">
          <GlassPill variant="accent">Pillar Guide</GlassPill>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Subscription Web Design: Pay Monthly Web Design That Grows With You
            </h1>
            <p className="text-sm text-secondary leading-relaxed">
              Subscription web design is a pay monthly website model where your site is built, launched, and
              maintained for one simple recurring fee. Instead of paying a large upfront bill, you spread the
              cost across a predictable monthly plan and get ongoing updates, hosting, and support.
            </p>
            <p className="text-sm text-secondary leading-relaxed">
              For local service businesses, this approach removes the risk of a big one time investment and
              delivers a website that stays current. If you want a done for you experience with a clear
              budget, this guide breaks down how subscription web design works, what is included, and how to
              compare it with agencies and DIY builders.
            </p>
          </div>
          <GlassCard className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">Quick start</p>
                <p className="mt-2 text-sm text-secondary">
                  See pricing and launch options in under a minute.
                </p>
              </div>
              <Link href="/#pricing">
                <GlassButton variant="secondary" size="md">
                  View Pricing
                </GlassButton>
              </Link>
            </div>
          </GlassCard>
        </header>

        <section id="what-it-is" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">What is subscription web design?</h2>
          <p className="text-sm text-secondary leading-relaxed">
            Subscription web design is a service model where a team builds your website and keeps it running
            for a monthly fee. You still get a real custom website, but you do not have to pay thousands up
            front. This model is popular with service businesses that need to launch quickly and keep their
            site updated as offers, service areas, or photos change.
          </p>
          <p className="text-sm text-secondary leading-relaxed">
            The biggest difference is that the relationship does not end after launch. You get ongoing support
            for edits, hosting, and performance updates. If you want a hands off website experience, it is
            similar to a <Link className="text-accent hover:text-accent-hover" href="/guides/done-for-you-websites">done for you website</Link>, but structured as a simple subscription.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm text-secondary marker:text-white/30">
            <li>Low upfront cost so you can start without a large build fee.</li>
            <li>Ongoing maintenance so your site stays current and fast.</li>
            <li>A clear monthly budget that is easy to plan around.</li>
          </ul>
        </section>

        <section id="pricing" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Pricing: what pay monthly web design costs</h2>
          <p className="text-sm text-secondary leading-relaxed">
            Pricing depends on the number of pages, how much content you need, and the level of ongoing
            support. Most subscription web design plans for local businesses land between $99 and $299 per
            month, with higher tiers for multi page sites, advanced SEO, or integrations. The key is that
            hosting and updates are usually bundled into that monthly fee.
          </p>
          <p className="text-sm text-secondary leading-relaxed">
            If you want to compare pricing in detail, read{" "}
            <Link className="text-accent hover:text-accent-hover" href="/guides/pay-monthly-web-design-vs-upfront">
              pay monthly web design vs upfront agencies
            </Link>{" "}
            to see how the total cost differs over 12 to 24 months.
          </p>
        </section>

        <section id="whats-included" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">What is included in a monthly plan?</h2>
          <p className="text-sm text-secondary leading-relaxed">
            A solid subscription plan covers more than a one time build. It should include everything needed
            to keep your site live, accurate, and optimized for lead generation. Typical inclusions are:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm text-secondary marker:text-white/30">
            <li>Custom design tailored to your services and service area.</li>
            <li>Mobile first layout with tap to call and fast page speed.</li>
            <li>Hosting, SSL, and security updates.</li>
            <li>On page SEO basics like headings, metadata, and local signals.</li>
            <li>Lead capture forms and contact routing.</li>
            <li>Ongoing edits for photos, copy, and promotions.</li>
          </ul>
          <p className="text-sm text-secondary leading-relaxed">
            For a full breakdown, see{" "}
            <Link className="text-accent hover:text-accent-hover" href="/guides/monthly-website-plan-whats-included">
              what is included in a monthly website plan
            </Link>{" "}
            and use it as a checklist when comparing providers.
          </p>
        </section>

        <section id="who-its-for" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Who subscription web design is for</h2>
          <p className="text-sm text-secondary leading-relaxed">
            Subscription web design is best for owners who want a professional site but do not want to manage
            it every week. It is a strong fit when speed, clarity, and predictable cost matter most.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm text-secondary marker:text-white/30">
            <li>Local service businesses that want consistent leads.</li>
            <li>Busy owners who cannot spend weekends editing a DIY site.</li>
            <li>Companies that need fast updates for offers and seasons.</li>
            <li>New businesses that need to launch quickly without a large build fee.</li>
          </ul>
          <p className="text-sm text-secondary leading-relaxed">
            If you also need a rapid turnaround, explore our{" "}
            <Link className="text-accent hover:text-accent-hover" href="/guides/website-in-48-hours">
              website in 48 hours guide
            </Link>{" "}
            to see how fast launch timelines work.
          </p>
        </section>

        <section id="comparison" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Comparison: subscription vs agency vs DIY</h2>
          <p className="text-sm text-secondary leading-relaxed">
            The right choice depends on budget, timeline, and how much time you can personally dedicate to the
            website. This table shows the typical tradeoffs.
          </p>
          <GlassCard className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-secondary">
                <thead className="text-xs uppercase tracking-wider text-white/70">
                  <tr>
                    <th className="pb-3">Option</th>
                    <th className="pb-3">Upfront Cost</th>
                    <th className="pb-3">Monthly Cost</th>
                    <th className="pb-3">Time to Launch</th>
                    <th className="pb-3">Best For</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-t border-white/[0.08]">
                    <td className="py-3 text-white">Subscription</td>
                    <td className="py-3">$0 to low</td>
                    <td className="py-3">Predictable</td>
                    <td className="py-3">Days to 2 weeks</td>
                    <td className="py-3">Busy owners who want it handled</td>
                  </tr>
                  <tr className="border-t border-white/[0.08]">
                    <td className="py-3 text-white">Agency build</td>
                    <td className="py-3">$2k to $15k+</td>
                    <td className="py-3">Optional retainer</td>
                    <td className="py-3">2 to 8 weeks</td>
                    <td className="py-3">Complex sites with large budgets</td>
                  </tr>
                  <tr className="border-t border-white/[0.08]">
                    <td className="py-3 text-white">DIY builder</td>
                    <td className="py-3">$0 to $500</td>
                    <td className="py-3">$20 to $50</td>
                    <td className="py-3">Weeks to months</td>
                    <td className="py-3">Owners with time to build and test</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </GlassCard>
        </section>

        <section id="how-to-choose" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">How to choose a monthly web design partner</h2>
          <p className="text-sm text-secondary leading-relaxed">
            Not all subscription plans are equal. Look for a provider that focuses on outcomes, not just a
            nice looking site. The most important questions to ask are:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm text-secondary marker:text-white/30">
            <li>Do they include hosting, updates, and support in the monthly fee?</li>
            <li>How quickly can they launch after you submit your content?</li>
            <li>Do they build for leads with clear calls to action?</li>
            <li>Is there a clear cancellation policy with no long term contract?</li>
          </ul>
          <p className="text-sm text-secondary leading-relaxed">
            The best plans feel simple: you submit your details, the site goes live, and updates are handled
            without delays.
          </p>
        </section>

        <section id="process" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">How the subscription process works</h2>
          <p className="text-sm text-secondary leading-relaxed">
            A good subscription process removes friction. You should not have to manage a long timeline or
            back and forth. Most providers follow a simple flow that keeps the launch moving while still
            protecting quality.
          </p>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-secondary marker:text-white/30">
            <li>Submit a short intake form with services, service area, and contact details.</li>
            <li>Receive a first draft based on a proven structure for local services.</li>
            <li>Approve the draft or request small edits.</li>
            <li>Launch the site and continue monthly updates as needed.</li>
          </ol>
          <p className="text-sm text-secondary leading-relaxed">
            If speed is your top priority, combine this model with a{" "}
            <Link className="text-accent hover:text-accent-hover" href="/guides/website-in-48-hours">
              48 hour website launch
            </Link>{" "}
            so you can start marketing quickly.
          </p>
        </section>

        <section id="faq" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Subscription web design FAQs</h2>
          <div className="space-y-3">
            {[
              {
                q: "Do I own my website on a subscription plan?",
                a: "Most providers grant full usage rights while you are subscribed. Some offer a buyout option if you want to own the site outright later. Always confirm the ownership terms before signing up.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Quality subscription plans allow you to cancel with no long term contract. Ask how cancellation impacts hosting and whether you can export your content.",
              },
              {
                q: "How fast can my site launch?",
                a: "If you provide content quickly, many subscription services can launch in days. Some, like QuickLaunchWeb, focus on a 48 hour timeline for most service sites.",
              },
              {
                q: "Is SEO included?",
                a: "Most plans include basic on page SEO. Advanced SEO, content marketing, or link building may be separate.",
              },
              {
                q: "What if I need more pages later?",
                a: "Many providers offer tier upgrades or add on pages. A good plan scales as your services expand.",
              },
              {
                q: "Is subscription web design only for small businesses?",
                a: "It is most common for small and mid sized service businesses, but any company that wants predictable cost and ongoing support can benefit.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm transition-all duration-200 open:bg-white/[0.05] hover:border-white/[0.12] hover:bg-white/[0.03]"
              >
                <summary className="flex cursor-pointer items-center justify-between p-5 text-sm font-medium text-white list-none">
                  <span className="pr-4">{item.q}</span>
                  <span className="text-muted transition-transform duration-200 group-open:rotate-180">+</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-secondary leading-relaxed">{item.a}</div>
              </details>
            ))}
          </div>
        </section>

        <section id="related" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Related posts</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <GlassCard hover className="p-5">
              <p className="text-xs uppercase tracking-wider text-muted">Support</p>
              <Link className="mt-2 block text-white hover:text-accent" href="/guides/monthly-website-plan-whats-included">
                Whats Included in a Monthly Website Plan? (Full Breakdown)
              </Link>
            </GlassCard>
            <GlassCard hover className="p-5">
              <p className="text-xs uppercase tracking-wider text-muted">Support</p>
              <Link className="mt-2 block text-white hover:text-accent" href="/guides/pay-monthly-web-design-vs-upfront">
                Pay Monthly Web Design vs Upfront Agencies: Whats Better?
              </Link>
            </GlassCard>
            <GlassCard hover className="p-5">
              <p className="text-xs uppercase tracking-wider text-muted">Pillar</p>
              <Link className="mt-2 block text-white hover:text-accent" href="/guides/done-for-you-websites">
                Done for You Websites
              </Link>
            </GlassCard>
            <GlassCard hover className="p-5">
              <p className="text-xs uppercase tracking-wider text-muted">Pillar</p>
              <Link className="mt-2 block text-white hover:text-accent" href="/guides/website-in-48-hours">
                Website in 48 Hours
              </Link>
            </GlassCard>
          </div>
        </section>

        <GlassDivider />

        <section className="space-y-4">
          <GlassCard variant="elevated" className="p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">Ready to launch?</p>
                <h2 className="mt-2 text-xl font-semibold text-white">
                  Get a subscription website that is built to convert.
                </h2>
                <p className="mt-2 text-sm text-secondary">
                  See the plans and start your build today.
                </p>
              </div>
              <Link href="/#pricing">
                <GlassButton variant="secondary" size="md">
                  Start My Plan
                </GlassButton>
              </Link>
            </div>
          </GlassCard>
        </section>
      </div>
    </main>
  );
}
