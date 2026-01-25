import Link from "next/link";
import type { Metadata } from "next";
import { BGPattern } from "@/components/ui/bg-pattern";
import { AmbientGlow, GlassCard, GlassDivider, GlassPill } from "@/components/ui/glass";

export const metadata: Metadata = {
  title: "Launch a Website Fast: The Exact Checklist You Need",
  description:
    "A practical checklist to launch a website fast, including content, assets, and approvals needed for a 48 hour build.",
  openGraph: {
    title: "Launch a Website Fast: The Exact Checklist You Need",
    description:
      "A clear checklist to launch a website fast with less back and forth.",
    type: "article",
  },
};

export default function LaunchWebsiteFastChecklistPage() {
  return (
    <main className="relative min-h-screen px-6 py-24 md:py-32">
      <BGPattern variant="grid" mask="fade-center" size={30} fill="rgba(255,255,255,0.035)" />
      <AmbientGlow color="accent" position="top" intensity="subtle" className="-top-24" />

      <div className="relative z-10 mx-auto max-w-3xl space-y-10">
        <header className="space-y-4">
          <GlassPill variant="accent">Support Guide</GlassPill>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Launch a Website Fast: The Exact Checklist You Need
          </h1>
          <p className="text-sm text-secondary leading-relaxed">
            To launch a website fast, you need your services, service area, contact details, and a small set
            of photos ready to go. If you can provide those essentials quickly, a focused team can launch your
            site in days instead of weeks.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Fast launch checklist</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-secondary marker:text-white/30">
            <li><span className="text-white">Service list:</span> Your primary services and top 3 priorities.</li>
            <li><span className="text-white">Service area:</span> Cities or neighborhoods you want to rank for.</li>
            <li><span className="text-white">Contact details:</span> Phone, email, and preferred lead form fields.</li>
            <li><span className="text-white">Photos:</span> 5 to 10 real images that show your work.</li>
            <li><span className="text-white">Proof:</span> Reviews, badges, or short testimonials.</li>
            <li><span className="text-white">Decision maker:</span> One person to approve quickly.</li>
          </ul>
          <p className="text-sm text-secondary leading-relaxed">
            For a realistic timeline, read{" "}
            <Link className="text-accent hover:text-accent-hover" href="/guides/can-a-website-really-be-built-in-48-hours">
              can a website really be built in 48 hours
            </Link>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Why this checklist matters</h2>
          <GlassCard className="p-6 space-y-3 text-sm text-secondary">
            <p>
              Speed depends on clarity. When your services and service area are defined, your team can write
              strong copy without back and forth. When photos are ready, layout choices happen faster. Clear
              approvals keep the timeline intact.
            </p>
          </GlassCard>
          <p className="text-sm text-secondary leading-relaxed">
            If you want a structured launch process, see{" "}
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
                q: "What if I do not have photos?",
                a: "You can start with stock photos, but real photos usually convert better. Plan to swap them later.",
              },
              {
                q: "Do I need to write all the copy?",
                a: "Not always. Many teams draft the copy from your intake details and refine it with your feedback.",
              },
              {
                q: "How many pages can launch fast?",
                a: "One to three pages is realistic. More pages usually means a longer timeline.",
              },
              {
                q: "Can I update the site after launch?",
                a: "Yes, updates are usually included in monthly plans.",
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
