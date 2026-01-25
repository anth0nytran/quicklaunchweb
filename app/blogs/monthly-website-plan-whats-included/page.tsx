import Link from "next/link";
import type { Metadata } from "next";
import { BGPattern } from "@/components/ui/bg-pattern";
import { AmbientGlow, GlassCard, GlassDivider, GlassPill } from "@/components/ui/glass";

export const metadata: Metadata = {
  title: "Whats Included in a Monthly Website Plan? (Full Breakdown)",
  description:
    "A clear breakdown of what is included in a monthly website plan, what is usually extra, and how to compare providers.",
  openGraph: {
    title: "Whats Included in a Monthly Website Plan? (Full Breakdown)",
    description:
      "A practical checklist of what monthly website plans include and how to compare options.",
    type: "article",
  },
};

export default function MonthlyWebsitePlanIncludedPage() {
  return (
    <main className="relative min-h-screen px-6 py-24 md:py-32">
      <BGPattern variant="grid" mask="fade-center" size={30} fill="rgba(255,255,255,0.035)" />
      <AmbientGlow color="accent" position="top" intensity="subtle" className="-top-24" />

      <div className="relative z-10 mx-auto max-w-3xl space-y-10">
        <header className="space-y-4">
          <GlassPill variant="accent">Support Guide</GlassPill>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Whats Included in a Monthly Website Plan? (Full Breakdown)
          </h1>
          <p className="text-sm text-secondary leading-relaxed">
            A monthly website plan typically includes the website build, hosting, security, and ongoing
            updates for a flat monthly fee. The exact scope varies by provider, so this guide shows what you
            should expect and what is often extra.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Quick overview</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-secondary marker:text-white/30">
            <li>Initial build based on your services and service area.</li>
            <li>Hosting, SSL, and basic security coverage.</li>
            <li>Ongoing updates for content, images, and offers.</li>
            <li>Mobile first design and basic on page SEO.</li>
          </ul>
          <p className="text-sm text-secondary leading-relaxed">
            If you want the full context, start with{" "}
            <Link className="text-accent hover:text-accent-hover" href="/guides/subscription-web-design">
              subscription web design
            </Link>{" "}
            and then compare providers using the checklist below.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Core inclusions to look for</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-secondary marker:text-white/30">
            <li>Custom layout that matches your brand and service area.</li>
            <li>Copywriting or copy support to explain your offer clearly.</li>
            <li>Mobile first design and fast load performance.</li>
            <li>Contact form or lead capture built in.</li>
            <li>Hosting, SSL, and monitoring.</li>
            <li>Monthly content edits and updates.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">What is often extra</h2>
          <p className="text-sm text-secondary leading-relaxed">
            Some services are commonly outside the base plan. Knowing this helps you avoid surprises.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm text-secondary marker:text-white/30">
            <li>Advanced SEO or ongoing content marketing.</li>
            <li>Ecommerce and payment setup.</li>
            <li>Custom integrations like CRM or booking tools.</li>
            <li>Large custom photo or video production.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Included vs usually extra</h2>
          <GlassCard className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-secondary">
                <thead className="text-xs uppercase tracking-wider text-white/70">
                  <tr>
                    <th className="pb-3">Feature</th>
                    <th className="pb-3">Included</th>
                    <th className="pb-3">Usually Extra</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Hosting + SSL", "Yes", "No"],
                    ["Mobile first design", "Yes", "No"],
                    ["Lead form setup", "Yes", "No"],
                    ["Advanced SEO", "Sometimes", "Often"],
                    ["Ecommerce", "Rarely", "Often"],
                    ["Custom integrations", "Sometimes", "Often"],
                  ].map((row) => (
                    <tr key={row[0]} className="border-t border-white/[0.08]">
                      <td className="py-3 text-white">{row[0]}</td>
                      <td className="py-3">{row[1]}</td>
                      <td className="py-3">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">How to compare plans quickly</h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-secondary marker:text-white/30">
            <li>Ask how many pages are included and how fast edits are handled.</li>
            <li>Confirm hosting, SSL, and analytics are part of the plan.</li>
            <li>Look for a clear cancellation policy with no long term lock in.</li>
          </ol>
          <p className="text-sm text-secondary leading-relaxed">
            If you are comparing pricing models, read{" "}
            <Link className="text-accent hover:text-accent-hover" href="/guides/pay-monthly-web-design-vs-upfront">
              pay monthly web design vs upfront agencies
            </Link>{" "}
            for a simple side by side view.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">FAQs</h2>
          <div className="space-y-3">
            {[
              {
                q: "Do monthly plans include updates?",
                a: "Yes, most plans include a set number of content edits per month. Always confirm the limits.",
              },
              {
                q: "Is hosting included?",
                a: "Quality plans include hosting and SSL in the monthly fee. If not, ask for the full monthly cost.",
              },
              {
                q: "Can I add pages later?",
                a: "Usually yes, but it might require a plan upgrade or a one time add on.",
              },
              {
                q: "Do plans include SEO?",
                a: "Most include basic on page SEO. Ongoing SEO work is typically separate.",
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

        <GlassDivider />

        <section className="space-y-4">
          <GlassCard variant="elevated" className="p-6 md:p-8">
            <p className="text-sm text-white font-semibold">Want us to handle this for you?</p>
            <p className="mt-2 text-sm text-secondary">
              Read:{" "}
              <Link className="text-accent hover:text-accent-hover" href="/guides/subscription-web-design">
                Subscription Web Design
              </Link>
            </p>
          </GlassCard>
        </section>
      </div>
    </main>
  );
}
