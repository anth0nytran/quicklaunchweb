import Link from "next/link";
import type { Metadata } from "next";
import { BGPattern } from "@/components/ui/bg-pattern";
import { AmbientGlow, GlassCard, GlassDivider, GlassPill } from "@/components/ui/glass";

export const metadata: Metadata = {
  title: "What Pages Does a Business Website Need to Get Leads?",
  description:
    "A practical checklist of the pages a business website needs to convert visitors into leads.",
  openGraph: {
    title: "What Pages Does a Business Website Need to Get Leads?",
    description:
      "Learn the essential pages for a lead generating business website and why each one matters.",
    type: "article",
  },
};

export default function BusinessWebsitePagesPage() {
  return (
    <main className="relative min-h-screen px-6 py-24 md:py-32">
      <BGPattern variant="grid" mask="fade-center" size={30} fill="rgba(255,255,255,0.035)" />
      <AmbientGlow color="accent" position="top" intensity="subtle" className="-top-24" />

      <div className="relative z-10 mx-auto max-w-3xl space-y-10">
        <header className="space-y-4">
          <GlassPill variant="accent">Support Guide</GlassPill>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            What Pages Does a Business Website Need to Get Leads?
          </h1>
          <p className="text-sm text-secondary leading-relaxed">
            A lead focused business website usually needs a clear homepage, a services page, a trust building
            section, and a simple way to contact you. These pages guide visitors from problem to action and
            answer the questions they have before they reach out.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Essential page checklist</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-secondary marker:text-white/30">
            <li><span className="text-white">Homepage:</span> A clear offer, service area, and call to action.</li>
            <li><span className="text-white">Services:</span> A breakdown of what you do and who it is for.</li>
            <li><span className="text-white">About or trust:</span> Reviews, credentials, and real proof.</li>
            <li><span className="text-white">Contact:</span> Simple form, phone, and clear next steps.</li>
            <li><span className="text-white">Service areas (optional):</span> Helpful for local SEO if you serve multiple cities.</li>
          </ul>
          <p className="text-sm text-secondary leading-relaxed">
            If you want a team to build and structure these pages for you, see{" "}
            <Link className="text-accent hover:text-accent-hover" href="/guides/done-for-you-websites">
              done for you websites
            </Link>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Why each page matters</h2>
          <GlassCard className="p-6 space-y-3 text-sm text-secondary">
            <p>
              <span className="text-white">Homepage:</span> Sets expectations fast and gives one clear action.
            </p>
            <p>
              <span className="text-white">Services:</span> Helps visitors self qualify and reduces bad leads.
            </p>
            <p>
              <span className="text-white">About or trust:</span> Builds credibility with proof and story.
            </p>
            <p>
              <span className="text-white">Contact:</span> Removes friction and makes it easy to reach you.
            </p>
          </GlassCard>
          <p className="text-sm text-secondary leading-relaxed">
            If you are choosing between DIY and hiring help, read{" "}
            <Link className="text-accent hover:text-accent-hover" href="/guides/wix-vs-hiring-someone-to-build-website">
              Wix vs hiring someone
            </Link>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">FAQs</h2>
          <div className="space-y-3">
            {[
              {
                q: "Do I need a blog to get leads?",
                a: "Not always. A strong homepage and services page can convert. A blog helps long term SEO but is not required to start.",
              },
              {
                q: "Is a separate contact page necessary?",
                a: "Yes. A dedicated contact page makes it easy for visitors to act and helps SEO for brand searches.",
              },
              {
                q: "What if I only want a one page site?",
                a: "A one page site can work if it covers the essentials in the right order. It should still include services, proof, and contact info.",
              },
              {
                q: "How many services should I list?",
                a: "Focus on your core services first. Too many options can reduce clarity and conversion.",
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
