import Link from "next/link";
import type { Metadata } from "next";
import { BGPattern } from "@/components/ui/bg-pattern";
import { AmbientGlow, GlassCard, GlassDivider, GlassPill } from "@/components/ui/glass";

export const metadata: Metadata = {
  title: "Wix vs Hiring Someone: Whats Better for a Business Website?",
  description:
    "A clear comparison between building on Wix and hiring a professional. Learn the tradeoffs in cost, time, and results.",
  openGraph: {
    title: "Wix vs Hiring Someone: Whats Better for a Business Website?",
    description:
      "Compare Wix and hiring a professional for a business website, including cost, effort, and lead quality.",
    type: "article",
  },
};

export default function WixVsHiringPage() {
  return (
    <main className="relative min-h-screen px-6 py-24 md:py-32">
      <BGPattern variant="grid" mask="fade-center" size={30} fill="rgba(255,255,255,0.035)" />
      <AmbientGlow color="accent" position="top" intensity="subtle" className="-top-24" />

      <div className="relative z-10 mx-auto max-w-3xl space-y-10">
        <header className="space-y-4">
          <GlassPill variant="accent">Support Guide</GlassPill>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Wix vs Hiring Someone: Whats Better for a Business Website?
          </h1>
          <p className="text-sm text-secondary leading-relaxed">
            Wix is cheaper to start and can work if you have time to build and test on your own. Hiring
            someone is usually better for businesses that need leads quickly, want professional messaging,
            and do not want to spend weeks learning a builder. The right choice depends on your time, budget,
            and goals.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Side by side comparison</h2>
          <GlassCard className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-secondary">
                <thead className="text-xs uppercase tracking-wider text-white/70">
                  <tr>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Wix</th>
                    <th className="pb-3">Hiring Someone</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Upfront cost", "Low", "Moderate to high"],
                    ["Time required", "High", "Low"],
                    ["Conversion focus", "Depends on you", "Usually stronger"],
                    ["Launch speed", "Varies", "Often faster"],
                    ["Ongoing updates", "You handle", "Included in plan"],
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
          <h2 className="text-xl font-semibold text-white">Choose Wix if</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-secondary marker:text-white/30">
            <li>You have time to build, test, and revise the site yourself.</li>
            <li>Your business is early and you want to experiment before investing.</li>
            <li>You are comfortable writing copy and structuring pages.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Hire someone if</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-secondary marker:text-white/30">
            <li>You need leads quickly and want a professional launch.</li>
            <li>You want a clear plan for messaging and conversion.</li>
            <li>You prefer ongoing updates handled for you each month.</li>
          </ul>
          <p className="text-sm text-secondary leading-relaxed">
            Learn more about the service model in{" "}
            <Link className="text-accent hover:text-accent-hover" href="/guides/done-for-you-websites">
              done for you websites
            </Link>
            .
          </p>
          <p className="text-sm text-secondary leading-relaxed">
            If you are unsure what pages you need, read{" "}
            <Link className="text-accent hover:text-accent-hover" href="/guides/what-pages-business-website-needs-to-convert">
              what pages a business website needs to convert
            </Link>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">FAQs</h2>
          <div className="space-y-3">
            {[
              {
                q: "Is Wix good enough for a small business?",
                a: "It can be if you are comfortable building your own pages and do not need strong conversion guidance.",
              },
              {
                q: "Will hiring someone improve results?",
                a: "Usually yes, because messaging, layout, and calls to action are handled by someone who does it often.",
              },
              {
                q: "Is hiring someone more expensive long term?",
                a: "Monthly plans often include updates and hosting, which can balance the total cost over time.",
              },
              {
                q: "Can I start on Wix and hire later?",
                a: "Yes, but you may need to rebuild to get a fully optimized lead system.",
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
              <Link className="text-accent hover:text-accent-hover" href="/guides/done-for-you-websites">
                Done for You Websites
              </Link>
            </p>
          </GlassCard>
        </section>
      </div>
    </main>
  );
}
