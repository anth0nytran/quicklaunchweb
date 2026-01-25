import Link from "next/link";
import type { Metadata } from "next";
import { BGPattern } from "@/components/ui/bg-pattern";
import { AmbientGlow, GlassButton, GlassCard, GlassDivider, GlassPill } from "@/components/ui/glass";

export const metadata: Metadata = {
  title: "Website in 48 Hours | Fast Website Design That Converts",
  description:
    "Learn how a website in 48 hours works, what it costs, what is included, and who it is best for. Compare a 48 hour launch to traditional timelines.",
  openGraph: {
    title: "Website in 48 Hours | Fast Website Design That Converts",
    description:
      "A practical guide to launching a website in 48 hours, including pricing, inclusions, and comparison to agencies and DIY builds.",
    type: "article",
  },
};

export default function WebsiteIn48HoursPage() {
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
              Website in 48 Hours: Fast Website Design Without Cutting Corners
            </h1>
            <p className="text-sm text-secondary leading-relaxed">
              A website in 48 hours is a rapid launch process where a professional team builds and publishes
              a conversion ready site in two days. It is designed for service businesses that need to start
              getting leads fast without waiting weeks for an agency timeline.
            </p>
            <p className="text-sm text-secondary leading-relaxed">
              Speed does not mean sloppy work. The key is a streamlined process, clear inputs, and a team that
              focuses on the essentials. This guide explains how a 48 hour build works, what it includes, and
              who it is best for.
            </p>
          </div>
          <GlassCard className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">Quick start</p>
                <p className="mt-2 text-sm text-secondary">
                  See pricing and book your launch window.
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
          <h2 className="text-2xl font-semibold text-white">What does a 48 hour website launch mean?</h2>
          <p className="text-sm text-secondary leading-relaxed">
            A 48 hour launch means the core website is built and published within two business days after you
            submit your content. The focus is on a clean, mobile first site with clear calls to action. This is
            especially common in{" "}
            <Link className="text-accent hover:text-accent-hover" href="/guides/done-for-you-websites">
              done for you website
            </Link>{" "}
            models where the process is already proven.
          </p>
          <p className="text-sm text-secondary leading-relaxed">
            The speed comes from using a repeatable build system, proven page structure, and a clear intake
            form. If your content is ready, the team can move fast without sacrificing quality.
          </p>
        </section>

        <section id="pricing" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Pricing for fast website design</h2>
          <p className="text-sm text-secondary leading-relaxed">
            Fast website design is usually priced like a standard build or a monthly plan. Some agencies
            charge a rush fee, while others include fast timelines as part of a{" "}
            <Link className="text-accent hover:text-accent-hover" href="/guides/subscription-web-design">
              subscription web design
            </Link>{" "}
            package. For most local service businesses, monthly plans range from $99 to $299 depending on
            scope.
          </p>
          <p className="text-sm text-secondary leading-relaxed">
            If you want a detailed breakdown of what you get for the monthly cost, see{" "}
            <Link className="text-accent hover:text-accent-hover" href="/guides/monthly-website-plan-whats-included">
              what is included in a monthly website plan
            </Link>
            .
          </p>
        </section>

        <section id="whats-included" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">What is included in a 48 hour launch?</h2>
          <p className="text-sm text-secondary leading-relaxed">
            A fast launch still covers the core elements that drive results. The usual inclusions are:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm text-secondary marker:text-white/30">
            <li>Hero section with a clear offer and call to action.</li>
            <li>Service highlights that explain what you do and who you help.</li>
            <li>Lead capture form and tap to call buttons.</li>
            <li>Mobile first layout with optimized page speed.</li>
            <li>Basic local SEO structure and metadata.</li>
          </ul>
        </section>

        <section id="timeline" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">What happens during the 48 hour window</h2>
          <p className="text-sm text-secondary leading-relaxed">
            The timeline works when everyone knows the next step. A streamlined process keeps the build moving
            and avoids long feedback cycles.
          </p>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-secondary marker:text-white/30">
            <li>Day 1: Intake review, copy draft, and design layout.</li>
            <li>Day 2: Revisions, final content, and launch.</li>
            <li>Post launch: Ongoing updates and performance checks.</li>
          </ol>
          <p className="text-sm text-secondary leading-relaxed">
            If your content is not ready yet, use the{" "}
            <Link className="text-accent hover:text-accent-hover" href="/guides/launch-website-fast-checklist">
              launch website fast checklist
            </Link>{" "}
            to prepare.
          </p>
        </section>

        <section id="who-its-for" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Who a 48 hour website is for</h2>
          <p className="text-sm text-secondary leading-relaxed">
            Fast launches are ideal when timing matters. If you are starting a new service, running ads, or
            opening a new location, a quick website helps you capture leads right away.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm text-secondary marker:text-white/30">
            <li>New businesses that need a professional online presence fast.</li>
            <li>Owners who do not want to spend weeks in revisions.</li>
            <li>Service businesses preparing for seasonal demand.</li>
            <li>Teams that already have content ready to go.</li>
          </ul>
          <p className="text-sm text-secondary leading-relaxed">
            If you need help preparing the right content, start with our{" "}
            <Link className="text-accent hover:text-accent-hover" href="/guides/launch-website-fast-checklist">
              launch website fast checklist
            </Link>
            .
          </p>
        </section>

        <section id="comparison" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Comparison: 48 hours vs traditional timelines</h2>
          <p className="text-sm text-secondary leading-relaxed">
            The difference is the process. Traditional timelines often include long discovery phases and
            multiple rounds of revisions. A 48 hour launch focuses on speed, clarity, and essentials.
          </p>
          <GlassCard className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-secondary">
                <thead className="text-xs uppercase tracking-wider text-white/70">
                  <tr>
                    <th className="pb-3">Timeline</th>
                    <th className="pb-3">Typical Steps</th>
                    <th className="pb-3">Best For</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-t border-white/[0.08]">
                    <td className="py-3 text-white">48 hours</td>
                    <td className="py-3">Focused intake, build, launch</td>
                    <td className="py-3">Fast lead capture and quick launches</td>
                  </tr>
                  <tr className="border-t border-white/[0.08]">
                    <td className="py-3 text-white">2 to 6 weeks</td>
                    <td className="py-3">Discovery, drafts, revisions</td>
                    <td className="py-3">Complex sites and large teams</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </GlassCard>
          <p className="text-sm text-secondary leading-relaxed">
            If you want the deeper timeline breakdown, read{" "}
            <Link className="text-accent hover:text-accent-hover" href="/guides/can-a-website-really-be-built-in-48-hours">
              can a website really be built in 48 hours
            </Link>
            .
          </p>
        </section>

        <section id="faq" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Website in 48 hours FAQs</h2>
          <div className="space-y-3">
            {[
              {
                q: "Is the site still custom?",
                a: "Yes. The layout is tailored to your business, but the process is streamlined so the team can work quickly.",
              },
              {
                q: "What do I need to provide?",
                a: "Your services, service area, contact info, and any photos or brand assets. A clear intake form speeds everything up.",
              },
              {
                q: "Can I make edits after launch?",
                a: "Most fast launch plans include ongoing updates, especially if you are on a monthly plan.",
              },
              {
                q: "What if I need extra pages?",
                a: "You can usually add pages after launch, but the 48 hour window focuses on the core lead generating page or small set of pages.",
              },
              {
                q: "Does fast design hurt SEO?",
                a: "Not if the basics are handled correctly. A clean structure, strong headings, and local signals can still be built quickly.",
              },
              {
                q: "Is it right for every business?",
                a: "It is best for service businesses with a clear offer. If you need complex ecommerce or custom systems, a longer timeline may be better.",
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
              <Link className="mt-2 block text-white hover:text-accent" href="/guides/can-a-website-really-be-built-in-48-hours">
                Can a Website Really Be Built in 48 Hours? (Reality + Timeline)
              </Link>
            </GlassCard>
            <GlassCard hover className="p-5">
              <p className="text-xs uppercase tracking-wider text-muted">Support</p>
              <Link className="mt-2 block text-white hover:text-accent" href="/guides/launch-website-fast-checklist">
                Launch a Website Fast: The Exact Checklist You Need
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
              <Link className="mt-2 block text-white hover:text-accent" href="/guides/done-for-you-websites">
                Done for You Websites
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
                  Get a website live fast with a proven process.
                </h2>
                <p className="mt-2 text-sm text-secondary">
                  Book your build window and start today.
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
