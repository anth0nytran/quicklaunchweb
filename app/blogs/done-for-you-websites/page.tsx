import Link from "next/link";
import type { Metadata } from "next";
import { BGPattern } from "@/components/ui/bg-pattern";
import { AmbientGlow, GlassButton, GlassCard, GlassDivider, GlassPill } from "@/components/ui/glass";

export const metadata: Metadata = {
  title: "Done for You Websites | Professional Websites Built For You",
  description:
    "Learn what done for you websites are, how pricing works, what is included, and who it is best for. Compare done for you sites vs agencies and DIY builders.",
  openGraph: {
    title: "Done for You Websites | Professional Websites Built For You",
    description:
      "A clear guide to done for you websites, pricing, inclusions, and how they compare to agencies and DIY platforms.",
    type: "article",
  },
};

export default function DoneForYouWebsitesPage() {
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
              Done for You Websites: Professional Sites Built For Busy Owners
            </h1>
            <p className="text-sm text-secondary leading-relaxed">
              A done for you website is exactly what it sounds like: you provide the business details and a
              professional team handles the build, launch, and ongoing updates. It is the fastest way for a
              busy owner to get a site that looks credible and converts visitors into calls.
            </p>
            <p className="text-sm text-secondary leading-relaxed">
              Instead of wrestling with templates, design tools, and tech tasks, you focus on running your
              business. This guide explains what done for you websites include, how pricing works, and how
              they compare with agencies and DIY platforms.
            </p>
          </div>
          <GlassCard className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">Quick start</p>
                <p className="mt-2 text-sm text-secondary">
                  See pricing and get a free build option today.
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
          <h2 className="text-2xl font-semibold text-white">What is a done for you website?</h2>
          <p className="text-sm text-secondary leading-relaxed">
            Done for you websites are built by a professional team that handles strategy, design, and launch
            so you do not have to. You share your services, service area, and brand direction, and the team
            delivers a complete site that is ready to drive leads.
          </p>
          <p className="text-sm text-secondary leading-relaxed">
            Many done for you providers offer a{" "}
            <Link className="text-accent hover:text-accent-hover" href="/guides/subscription-web-design">
              subscription web design
            </Link>{" "}
            model, which makes it easier to start without a large upfront cost. This makes it ideal for local
            businesses that want speed and clarity.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm text-secondary marker:text-white/30">
            <li>Professional strategy and messaging that fits your services.</li>
            <li>Design and layout built to convert visitors into inquiries.</li>
            <li>Ongoing updates without the typical DIY learning curve.</li>
          </ul>
        </section>

        <section id="pricing" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Pricing: what done for you websites cost</h2>
          <p className="text-sm text-secondary leading-relaxed">
            Pricing varies based on the number of pages, custom features, and timeline. Traditional agencies
            often charge $2,000 to $10,000 upfront, while subscription options range from $99 to $299 per
            month. Many service businesses prefer the monthly option because it includes ongoing edits,
            hosting, and support.
          </p>
          <p className="text-sm text-secondary leading-relaxed">
            If cost clarity matters most, compare the long term value of monthly plans in{" "}
            <Link className="text-accent hover:text-accent-hover" href="/guides/pay-monthly-web-design-vs-upfront">
              pay monthly web design vs upfront agencies
            </Link>
            .
          </p>
        </section>

        <section id="whats-included" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">What is included in a done for you site?</h2>
          <p className="text-sm text-secondary leading-relaxed">
            Done for you does not mean generic. A solid provider delivers the core pieces that actually
            create leads and build trust. Typical inclusions are:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm text-secondary marker:text-white/30">
            <li>Custom layout that matches your service area and offer.</li>
            <li>Copywriting that explains what you do and why you are the right choice.</li>
            <li>Mobile first design with fast loading pages.</li>
            <li>Clear calls to action like call buttons, quote forms, or booking links.</li>
            <li>Hosting, SSL, and site monitoring.</li>
          </ul>
          <p className="text-sm text-secondary leading-relaxed">
            If you are unsure what pages your site needs, start with{" "}
            <Link className="text-accent hover:text-accent-hover" href="/guides/what-pages-business-website-needs-to-convert">
              what pages a business website needs to convert
            </Link>
            .
          </p>
        </section>

        <section id="who-its-for" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Who done for you websites are for</h2>
          <p className="text-sm text-secondary leading-relaxed">
            Done for you websites are built for owners who value time and clarity. They are a great fit when
            you want strong results without building in public or learning a website platform.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm text-secondary marker:text-white/30">
            <li>Service businesses that need a clear lead capture path.</li>
            <li>Companies launching a new service or location quickly.</li>
            <li>Owners who want updates handled for them each month.</li>
            <li>Businesses that need a site live fast, like in{" "}
              <Link className="text-accent hover:text-accent-hover" href="/guides/website-in-48-hours">
                48 hours
              </Link>.
            </li>
          </ul>
        </section>

        <section id="process" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">What the done for you process looks like</h2>
          <p className="text-sm text-secondary leading-relaxed">
            The best done for you services use a simple process that keeps your involvement low while still
            capturing the details that matter. You should be able to complete intake quickly and approve the
            site without multiple rounds of revisions.
          </p>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-secondary marker:text-white/30">
            <li>Submit your services, service area, and contact details.</li>
            <li>Review a draft with a clear hero, services, and lead capture.</li>
            <li>Approve or request small edits.</li>
            <li>Launch and receive ongoing updates as needed.</li>
          </ol>
          <p className="text-sm text-secondary leading-relaxed">
            If you want to move fast, pair this with a{" "}
            <Link className="text-accent hover:text-accent-hover" href="/guides/website-in-48-hours">
              48 hour launch timeline
            </Link>
            .
          </p>
        </section>

        <section id="comparison" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Comparison: done for you vs agency vs DIY</h2>
          <p className="text-sm text-secondary leading-relaxed">
            The right option depends on your timeline and how involved you want to be. This table shows the
            typical tradeoffs.
          </p>
          <GlassCard className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-secondary">
                <thead className="text-xs uppercase tracking-wider text-white/70">
                  <tr>
                    <th className="pb-3">Option</th>
                    <th className="pb-3">Upfront Cost</th>
                    <th className="pb-3">Build Effort</th>
                    <th className="pb-3">Time to Launch</th>
                    <th className="pb-3">Best For</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-t border-white/[0.08]">
                    <td className="py-3 text-white">Done for you</td>
                    <td className="py-3">$0 to low</td>
                    <td className="py-3">Minimal</td>
                    <td className="py-3">Days to 2 weeks</td>
                    <td className="py-3">Owners who want it handled</td>
                  </tr>
                  <tr className="border-t border-white/[0.08]">
                    <td className="py-3 text-white">Agency build</td>
                    <td className="py-3">$2k to $15k+</td>
                    <td className="py-3">Moderate</td>
                    <td className="py-3">2 to 8 weeks</td>
                    <td className="py-3">Complex custom projects</td>
                  </tr>
                  <tr className="border-t border-white/[0.08]">
                    <td className="py-3 text-white">DIY builder</td>
                    <td className="py-3">$0 to $500</td>
                    <td className="py-3">High</td>
                    <td className="py-3">Weeks to months</td>
                    <td className="py-3">Owners with time to learn</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </GlassCard>
        </section>

        <section id="mistakes" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Common mistakes to avoid</h2>
          <p className="text-sm text-secondary leading-relaxed">
            Done for you still requires a few inputs from you. The most common mistakes are slow approvals,
            unclear service details, or missing photos. The faster you provide real details, the faster your
            site launches and performs.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm text-secondary marker:text-white/30">
            <li>Waiting too long to send your service list and coverage area.</li>
            <li>Using vague copy that does not explain your offer.</li>
            <li>Skipping local trust signals like reviews or proof.</li>
          </ul>
        </section>

        <section id="faq" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Done for you websites FAQs</h2>
          <div className="space-y-3">
            {[
              {
                q: "How much input do I need to provide?",
                a: "Usually a short intake form with your services, location, and contact details. A good provider does the heavy lifting from there.",
              },
              {
                q: "Can I update the site later?",
                a: "Yes. Many done for you plans include monthly updates so you can keep offers, photos, and reviews current.",
              },
              {
                q: "Will the site be mobile friendly?",
                a: "It should be. Mobile first design is non negotiable for local service businesses where most visitors are on phones.",
              },
              {
                q: "Do you include hosting and SSL?",
                a: "Most done for you providers include hosting and SSL in the plan. Always confirm this in writing.",
              },
              {
                q: "Is SEO part of the build?",
                a: "Most plans include on page SEO basics. Advanced SEO like content marketing or link building is usually separate.",
              },
              {
                q: "How fast can it go live?",
                a: "If you submit content quickly, a well structured team can launch in days. Some providers specialize in a 48 hour timeline.",
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
              <Link className="mt-2 block text-white hover:text-accent" href="/guides/wix-vs-hiring-someone-to-build-website">
                Wix vs Hiring Someone: Whats Better for a Business Website?
              </Link>
            </GlassCard>
            <GlassCard hover className="p-5">
              <p className="text-xs uppercase tracking-wider text-muted">Support</p>
              <Link className="mt-2 block text-white hover:text-accent" href="/guides/what-pages-business-website-needs-to-convert">
                What Pages Does a Business Website Need to Get Leads?
              </Link>
            </GlassCard>
            <GlassCard hover className="p-5">
              <p className="text-xs uppercase tracking-wider text-muted">Pillar</p>
              <Link className="mt-2 block text-white hover:text-accent" href="/guides/subscription-web-design">
                Subscription Web Design
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
                  Get a done for you website without the upfront hit.
                </h2>
                <p className="mt-2 text-sm text-secondary">
                  See pricing and start your build today.
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
