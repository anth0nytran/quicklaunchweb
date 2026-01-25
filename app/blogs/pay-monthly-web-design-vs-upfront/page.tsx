import Link from "next/link";
import type { Metadata } from "next";
import { BGPattern } from "@/components/ui/bg-pattern";
import { AmbientGlow, GlassCard, GlassDivider, GlassPill } from "@/components/ui/glass";

export const metadata: Metadata = {
  title: "Pay Monthly Web Design vs Upfront Agencies: Whats Better?",
  description:
    "Compare pay monthly web design to upfront agencies. Learn the cost, risk, and timeline differences so you can choose the right option.",
  openGraph: {
    title: "Pay Monthly Web Design vs Upfront Agencies: Whats Better?",
    description:
      "A clear comparison of monthly website plans vs upfront agency builds, including cost, speed, and risk.",
    type: "article",
  },
};

export default function PayMonthlyVsUpfrontPage() {
  return (
    <main className="relative min-h-screen px-6 py-24 md:py-32">
      <BGPattern variant="grid" mask="fade-center" size={30} fill="rgba(255,255,255,0.035)" />
      <AmbientGlow color="accent" position="top" intensity="subtle" className="-top-24" />

      <div className="relative z-10 mx-auto max-w-3xl space-y-10">
        <header className="space-y-4">
          <GlassPill variant="accent">Support Guide</GlassPill>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Pay Monthly Web Design vs Upfront Agencies: Whats Better?
          </h1>
          <p className="text-sm text-secondary leading-relaxed">
            Pay monthly web design is better if you want low upfront cost, faster launches, and ongoing updates
            included. Upfront agencies make sense when you need a large custom build and have the budget to
            pay for it in one big payment. The best option depends on your timeline, cash flow, and how much
            support you want after launch.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Quick comparison table</h2>
          <GlassCard className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-secondary">
                <thead className="text-xs uppercase tracking-wider text-white/70">
                  <tr>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Pay Monthly</th>
                    <th className="pb-3">Upfront Agency</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Upfront cost", "Low to none", "High"],
                    ["Monthly cost", "Predictable", "Optional retainer"],
                    ["Launch speed", "Days to 2 weeks", "2 to 8 weeks"],
                    ["Ongoing updates", "Included", "Often extra"],
                    ["Best for", "Busy owners, clear offers", "Complex projects"],
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
          <h2 className="text-xl font-semibold text-white">When pay monthly is the better fit</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-secondary marker:text-white/30">
            <li>You want to launch quickly without a large upfront bill.</li>
            <li>You need ongoing updates handled each month.</li>
            <li>Your site is focused on lead generation, not complex features.</li>
          </ul>
          <p className="text-sm text-secondary leading-relaxed">
            Learn the full model in{" "}
            <Link className="text-accent hover:text-accent-hover" href="/guides/subscription-web-design">
              subscription web design
            </Link>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">When upfront agencies make sense</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-secondary marker:text-white/30">
            <li>You need complex custom features or ecommerce builds.</li>
            <li>You already have a marketing team to manage updates.</li>
            <li>You want full ownership and can handle larger upfront costs.</li>
          </ul>
          <p className="text-sm text-secondary leading-relaxed">
            If you are still comparing inclusions, start with{" "}
            <Link className="text-accent hover:text-accent-hover" href="/guides/monthly-website-plan-whats-included">
              whats included in a monthly website plan
            </Link>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">FAQs</h2>
          <div className="space-y-3">
            {[
              {
                q: "Which option is cheaper over time?",
                a: "It depends on the plan length. Monthly plans can cost less in the first year and include updates that agencies often charge extra for.",
              },
              {
                q: "Is pay monthly lower quality?",
                a: "Not if the provider has a solid process. Quality depends on the team, not just the payment model.",
              },
              {
                q: "Can I switch from monthly to ownership later?",
                a: "Many providers offer a buyout option. Ask about ownership and export options before you start.",
              },
              {
                q: "What is the biggest risk with upfront agencies?",
                a: "The risk is paying a large bill before you know if the site performs. Monthly plans reduce that risk.",
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
