import Link from "next/link";
import type { Metadata } from "next";
import { BGPattern } from "@/components/ui/bg-pattern";
import { AmbientGlow, GlassButton } from "@/components/ui/glass";
import { featuredGuide, pillarGuides, supportGuides } from "@/lib/guides";
import { PageTracker } from "@/lib/analytics";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
    title: "Growth Guides for Local Businesses | QuickLaunchWeb",
    description:
        "Straightforward guides on pricing, timelines, and website decisions that help local businesses launch faster and convert more leads.",
    path: "/guides",
});

export default function GuidesPage() {
    return (
        <main className="relative min-h-screen text-white">
            <PageTracker title="QuickLaunchWeb - Guides" pageType="guides" />
            <BGPattern variant="grid" mask="fade-center" size={32} fill="rgba(255,255,255,0.02)" />
            <AmbientGlow color="accent" position="top" intensity="subtle" className="-top-20 opacity-40" />

            {/* Hero - tight, editorial */}
            <section className="relative px-5 pt-32 pb-12 md:pt-40 md:pb-16">
                <div className="relative z-10 mx-auto max-w-2xl">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                        Resource Center
                    </p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-[2.75rem] md:leading-[1.15]">
                        Guides for local businesses that want more calls.
                    </h1>
                    <p className="mt-4 text-[15px] leading-relaxed text-white/50 md:text-base">
                        Real numbers. Real decisions. No fluff.
                    </p>
                </div>
            </section>

            {/* Featured */}
            {featuredGuide && (
                <section className="relative px-5 pb-16">
                    <div className="relative z-10 mx-auto max-w-2xl">
                        <Link
                            href={`/guides/${featuredGuide.slug}`}
                            className="group block rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:border-accent/30 hover:bg-accent/[0.03] md:p-8"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">
                                    Featured
                                </span>
                            </div>
                            <h2 className="text-xl font-bold text-white group-hover:text-accent transition-colors md:text-2xl">
                                {featuredGuide.title}
                            </h2>
                            <p className="mt-2 text-sm leading-relaxed text-white/50 line-clamp-2">
                                {featuredGuide.description}
                            </p>
                            {featuredGuide.stats?.length ? (
                                <div className="mt-5 flex gap-8">
                                    {featuredGuide.stats.map((stat) => (
                                        <div key={stat.label}>
                                            <p className="text-sm font-bold text-white">{stat.value}</p>
                                            <p className="text-[10px] uppercase tracking-wider text-white/30">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                            <div className="mt-5 flex items-center gap-2 text-sm text-accent">
                                <span>Read guide</span>
                                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </Link>
                    </div>
                </section>
            )}

            {/* Pillar Guides */}
            <section className="relative px-5 pb-16 md:pb-20">
                <div className="relative z-10 mx-auto max-w-2xl">
                    <div className="flex items-center gap-3 mb-8">
                        <span className="h-px flex-1 bg-white/[0.06]" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
                            In-depth guides
                        </span>
                        <span className="h-px flex-1 bg-white/[0.06]" />
                    </div>

                    <div className="space-y-0 divide-y divide-white/[0.06]">
                        {pillarGuides.map((guide, index) => (
                            <Link
                                key={guide.slug}
                                href={`/guides/${guide.slug}`}
                                className="group flex items-start gap-5 py-6 first:pt-0 last:pb-0"
                            >
                                <span className="mt-1 text-[13px] font-mono text-white/20 tabular-nums shrink-0">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-[15px] font-semibold text-white group-hover:text-accent transition-colors md:text-base">
                                        {guide.title}
                                    </h3>
                                    <p className="mt-1.5 text-sm text-white/40 line-clamp-2 leading-relaxed">
                                        {guide.description}
                                    </p>
                                </div>
                                <svg className="mt-1.5 h-4 w-4 shrink-0 text-white/15 group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Support Guides */}
            <section className="relative px-5 pb-16 md:pb-20">
                <div className="relative z-10 mx-auto max-w-2xl">
                    <div className="flex items-center gap-3 mb-8">
                        <span className="h-px flex-1 bg-white/[0.06]" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
                            Quick reads
                        </span>
                        <span className="h-px flex-1 bg-white/[0.06]" />
                    </div>

                    <div className="space-y-0 divide-y divide-white/[0.06]">
                        {supportGuides.map((guide) => (
                            <Link
                                key={guide.slug}
                                href={`/guides/${guide.slug}`}
                                className="group flex items-center gap-4 py-5 first:pt-0 last:pb-0"
                            >
                                <span className="h-1 w-1 rounded-full bg-white/20 group-hover:bg-accent transition-colors shrink-0" />
                                <span className="flex-1 text-sm text-white/70 group-hover:text-white transition-colors">
                                    {guide.title}
                                </span>
                                <span className="text-[11px] text-white/20 shrink-0 hidden sm:block">
                                    {guide.readTime || "Read"}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative px-5 pb-24 md:pb-32">
                <AmbientGlow color="accent" position="bottom" intensity="subtle" className="opacity-20" />
                <div className="relative z-10 mx-auto max-w-2xl">
                    <div className="border-t border-white/[0.06] pt-12 text-center">
                        <p className="text-lg font-bold text-white md:text-xl">
                            Done reading? Let&apos;s get you live.
                        </p>
                        <p className="mt-2 text-sm text-white/40">
                            $0 down. Your system goes live in 48 hours. Cancel anytime.
                        </p>
                        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <Link href="/#pricing">
                                <GlassButton variant="secondary" size="md">
                                    View Pricing
                                </GlassButton>
                            </Link>
                            <Link href="/#features">
                                <GlassButton variant="ghost" size="md">
                                    See What&apos;s Included
                                </GlassButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
