import Link from "next/link";
import type { Metadata } from "next";
import { BGPattern } from "@/components/ui/bg-pattern";
import { AmbientGlow, GlassButton, GlassPill } from "@/components/ui/glass";
import { featuredGuide, pillarGuides, supportGuides } from "@/lib/guides";

export const metadata: Metadata = {
    title: "Growth Guides for Local Businesses | QuickLaunchWeb",
    description:
        "Straightforward guides on pricing, timelines, and website decisions that help local businesses launch faster and convert more leads.",
    openGraph: {
        title: "Growth Guides for Local Businesses | QuickLaunchWeb",
        description:
            "Straightforward guides on pricing, timelines, and website decisions that help local businesses launch faster and convert more leads.",
        type: "article",
    },
};

const guideHighlights = [
    "Know what a pay monthly plan actually includes.",
    "Choose the right build model without guesswork.",
    "Launch faster while keeping quality high.",
    "Use clear page structure to earn more leads.",
];

const optimizationBenchmarks = [
    "Mobile load time target: under 2 seconds.",
    "One clear call to action above the fold.",
    "Lead form completion target: 4-8 percent.",
    "Local proof shown within the first scroll.",
];

const textStyle = { color: 'rgba(255, 255, 255, 0.9)' };

export default function GuidesPage() {
    return (
        <main className="relative min-h-screen px-6 py-24 text-white md:py-32">
            <BGPattern variant="grid" mask="fade-center" size={32} fill="rgba(255,255,255,0.035)" />
            <AmbientGlow color="accent" position="top" intensity="subtle" className="-top-20" />
            <AmbientGlow color="white" position="bottom" intensity="subtle" className="opacity-60" />

            <div className="relative z-10 mx-auto max-w-6xl space-y-16">
                <header className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
                    <div className="space-y-6">
                        <GlassPill variant="accent">Guides</GlassPill>
                        <div className="space-y-3">
                            <h1 className="text-4xl font-bold text-white md:text-5xl">
                                Growth Guides for Local Businesses
                            </h1>
                            <p className="text-sm leading-relaxed max-w-2xl" style={textStyle}>
                                Straightforward, professional guides on websites that convert. Built for owners who want
                                clarity, speed, and a simple path to more leads.
                            </p>
                        </div>
                        <ul className="grid gap-2 text-sm md:grid-cols-2" style={textStyle}>
                            {guideHighlights.map((item) => (
                                <li key={item} className="flex gap-2">
                                    <span className="text-accent">-</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Link href="/#pricing">
                                <GlassButton variant="secondary" size="md">
                                    View Pricing
                                </GlassButton>
                            </Link>
                            <Link href="/#features">
                                <GlassButton variant="ghost" size="md">
                                    Explore Features
                                </GlassButton>
                            </Link>
                        </div>
                    </div>

                    {featuredGuide ? (
                        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-7">
                            <p className="text-xs uppercase tracking-wider text-muted">Featured guide</p>
                            <Link
                                className="mt-3 block text-2xl font-semibold text-white hover:text-accent"
                                href={`/guides/${featuredGuide.slug}`}
                            >
                                {featuredGuide.title}
                            </Link>
                            <p className="mt-3 text-sm" style={textStyle}>{featuredGuide.description}</p>
                            {featuredGuide.stats?.length ? (
                                <div className="mt-5 grid gap-3 border-y border-white/[0.08] py-4">
                                    {featuredGuide.stats.map((stat) => (
                                        <div key={stat.label}>
                                            <p className="text-[10px] uppercase tracking-wider text-white/50">{stat.label}</p>
                                            <p className="mt-1 text-sm" style={textStyle}>{stat.value}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                            <Link className="mt-5 inline-flex text-sm text-accent hover:text-accent-hover" href={`/guides/${featuredGuide.slug}`}>
                                Read the full guide
                            </Link>
                        </div>
                    ) : null}
                </header>

                <section className="grid gap-10 lg:grid-cols-[1fr_0.6fr]">
                    <div className="space-y-6">
                        <div>
                            <p className="text-xs uppercase tracking-wider text-muted">Pillar guides</p>
                            <h2 className="mt-2 text-2xl font-semibold text-white">Start with the big decisions</h2>
                            <p className="mt-2 text-sm" style={textStyle}>
                                These guides cover the main buying questions and link to detailed support posts.
                            </p>
                        </div>
                        <div className="relative overflow-hidden border-y border-white/[0.08]">
                            <BGPattern
                                variant="vertical-lines"
                                mask="fade-y"
                                size={48}
                                fill="rgba(255,255,255,0.06)"
                                className="opacity-60"
                            />
                            <div className="relative z-10 divide-y divide-white/[0.08]">
                                {pillarGuides.map((guide, index) => (
                                    <Link
                                        key={guide.slug}
                                        href={`/guides/${guide.slug}`}
                                        className="group grid gap-4 py-5 transition-colors hover:bg-white/[0.02] md:grid-cols-[80px_1fr_auto]"
                                    >
                                        <div className="text-xs text-muted font-mono tracking-widest">
                                            {String(index + 1).padStart(2, "0")}
                                        </div>
                                        <div>
                                            <p className="text-xl font-semibold text-white group-hover:text-accent">{guide.title}</p>
                                            <p className="mt-2 text-sm max-w-2xl" style={textStyle}>{guide.description}</p>
                                        </div>
                                        <div className="flex items-center text-xs text-muted group-hover:text-white">
                                            Read
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <aside className="space-y-6">
                        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                            <p className="text-xs uppercase tracking-wider text-muted">Optimization targets</p>
                            <ul className="mt-4 space-y-2 text-sm" style={textStyle}>
                                {optimizationBenchmarks.map((item) => (
                                    <li key={item} className="flex gap-2">
                                        <span className="text-accent">-</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-4 text-xs text-muted">
                                Benchmarks are typical for local service sites and vary by market.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                            <p className="text-xs uppercase tracking-wider text-muted">ROI snapshot</p>
                            <p className="mt-3 text-sm" style={textStyle}>
                                If your average job is $700, one extra closed lead can cover several months of a website
                                plan. That is why clarity and speed matter.
                            </p>
                        </div>
                    </aside>
                </section>

                <section className="space-y-6">
                    <div>
                        <p className="text-xs uppercase tracking-wider text-muted">Support guides</p>
                        <h2 className="mt-2 text-2xl font-semibold text-white">Answer the common questions</h2>
                        <p className="mt-2 text-sm" style={textStyle}>
                            Shorter reads that break down comparisons, checklists, and real decisions.
                        </p>
                    </div>
                    <div className="relative overflow-hidden border-y border-white/[0.08]">
                        <BGPattern
                            variant="horizontal-lines"
                            mask="fade-y"
                            size={26}
                            fill="rgba(255,255,255,0.05)"
                            className="opacity-50"
                        />
                        <div className="relative z-10 divide-y divide-white/[0.08]">
                            {supportGuides.map((guide) => (
                                <Link
                                    key={guide.slug}
                                    href={`/guides/${guide.slug}`}
                                    className="group flex items-start justify-between gap-6 py-4 transition-colors hover:bg-white/[0.02]"
                                >
                                    <div className="flex items-start gap-4">
                                        <span className="mt-2 h-px w-4 bg-accent/70 transition-all group-hover:w-6" />
                                        <div>
                                            <p className="text-[10px] uppercase tracking-wider text-muted">Support guide</p>
                                            <p className="mt-1 text-base text-white group-hover:text-accent">{guide.title}</p>
                                            <p className="mt-2 text-sm" style={textStyle}>{guide.description}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-muted group-hover:text-white">Read</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
