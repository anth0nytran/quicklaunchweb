import Link from "next/link";
import type { Metadata } from "next";
import { BGPattern } from "@/components/ui/bg-pattern";
import { AmbientGlow, GlassCard, GlassDivider, GlassPill } from "@/components/ui/glass";

export const metadata: Metadata = {
  title: "Can a Website Really Be Built in 48 Hours? (Reality + Timeline)",
  description:
    "Yes, a simple service business site can be built in 48 hours when the scope is focused and content is ready. Learn the real timeline.",
  openGraph: {
    title: "Can a Website Really Be Built in 48 Hours? (Reality + Timeline)",
    description:
      "A realistic look at 48 hour website builds, what is possible, and what is not.",
    type: "article",
  },
};

export default function CanWebsiteBeBuiltIn48HoursPage() {
  return (
    <main className="relative min-h-screen px-6 py-24 md:py-32">
      <BGPattern variant="grid" mask="fade-center" size={30} fill="rgba(255,255,255,0.035)" />
      <AmbientGlow color="accent" position="top" intensity="subtle" className="-top-24" />

      <div className="relative z-10 mx-auto max-w-3xl space-y-10">
        <header className="space-y-4">
          <GlassPill variant="accent">Support Guide</GlassPill>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Can a Website Really Be Built in 48 Hours? (Reality + Timeline)
          </h1>
          <p className="text-sm text-secondary leading-relaxed">
            Yes, a focused service business website can be built in 48 hours when the scope is clear and the
            content is ready. The timeline is realistic for lead generating sites with a small number of
            pages, but complex builds still take longer.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">48 hours vs 2 weeks</h2>
          <GlassCard className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-secondary">
                <thead className="text-xs uppercase tracking-wider text-white/70">
                  <tr>
                    <th className="pb-3">Stage</th>
                    <th className="pb-3">48 Hours</th>
                    <th className="pb-3">Traditional Timeline</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Intake", "Same day", "Days to a week"],
                    ["Design + build", "Day 1", "1 to 3 weeks"],
                    ["Revisions", "Day 2", "1 to 2 weeks"],
                    ["Launch", "Day 2", "After final approvals"],
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
          <h2 className="text-xl font-semibold text-white">What must be ready for a 48 hour build</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-secondary marker:text-white/30">
            <li>Service list and a clear service area.</li>
            <li>Contact details, phone number, and email.</li>
            <li>Photos or brand assets that can be used immediately.</li>
            <li>Approval decision maker available to review quickly.</li>
          </ul>
          <p className="text-sm text-secondary leading-relaxed">
            Use the{" "}
            <Link className="text-accent hover:text-accent-hover" href="/guides/launch-website-fast-checklist">
              launch website fast checklist
            </Link>{" "}
            to get your content ready before the build starts.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">What is realistic vs not</h2>
          <GlassCard className="p-6 space-y-3 text-sm text-secondary">
            <p>
              <span className="text-white">Realistic:</span> One to three pages, clear services, local SEO
              structure, lead form, and launch ready copy.
            </p>
            <p>
              <span className="text-white">Not realistic:</span> Large ecommerce catalogs, complex portals, or
              heavy custom integrations.
            </p>
          </GlassCard>
          <p className="text-sm text-secondary leading-relaxed">
            For the full service overview, see{" "}
            <Link className="text-accent hover:text-accent-hover" href="/guides/website-in-48-hours">
              website in 48 hours
            </Link>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">FAQs</h2>
          <div className="space-y-3">
            {[
              {
                q: "Is the quality lower with a fast build?",
                a: "Not if the scope is focused and the process is proven. The quality depends on the team and the input quality.",
              },
              {
                q: "Can I add pages later?",
                a: "Yes, most providers allow you to add pages after the initial launch.",
              },
              {
                q: "What if I do not have content ready?",
                a: "The timeline will stretch. Fast launches require fast inputs.",
              },
              {
                q: "Does 48 hours include revisions?",
                a: "Typically yes, but the revision window is short to keep the timeline intact.",
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
              <Link className="text-accent hover:text-accent-hover" href="/guides/website-in-48-hours">
                Website in 48 Hours
              </Link>
            </p>
          </GlassCard>
        </section>
      </div>
    </main>
  );
}
