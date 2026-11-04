import Link from "next/link";
import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/brand/brand-shell";
import { Eyebrow, IconTile, KitIcon } from "@/components/brand/primitives";
import { container, focusRing, sectionH2, sectionPad } from "@/components/brand/tokens";
import { featuredGuide, pillarGuides, supportGuides } from "@/lib/guides";
import { PageTracker } from "@/lib/analytics";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
    title: "Growth Guides for Local Businesses | QuickLaunchWeb",
    description:
        "Straightforward guides on pricing, timelines, and website decisions that help local businesses launch faster and convert more leads.",
    path: "/guides",
});

/** Kit icon per guide category. */
const categoryIcons: Record<string, string> = {
    "Lead Generation": "growth",
    "AI Search & Visibility": "map-pin",
    "Lead Recovery": "phone-message",
    "Website Conversion": "target",
    "Website Strategy": "website",
};
const iconFor = (category?: string) => (category && categoryIcons[category]) || "book";

const cardShadow = "shadow-[0_4px_20px_-10px_rgba(7,20,63,0.12)]";
const cardHover = "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(7,20,63,0.25)]";

function ReadMore({ label = "Read guide" }: { label?: string }) {
    return (
        <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-bold text-[#0866FF]">
            {label}
            <KitIcon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
    );
}

export default function GuidesPage() {
    return (
        <div className="relative">
            <PageTracker title="QuickLaunchWeb - Guides" pageType="guides" />

            <PageHero
                eyebrow="Resource Center"
                title="Guides for local businesses that want more calls."
                intro="Real numbers. Real decisions. No fluff."
            />

            {/* ===================== FEATURED ===================== */}
            {featuredGuide && (
                <section className={`bg-white ${sectionPad}`}>
                    <div className={container}>
                        <Link
                            href={`/guides/${featuredGuide.slug}`}
                            className={`group grid gap-8 rounded-xl border border-[#E5EDF6] bg-white p-6 ${cardShadow} ${cardHover} sm:p-8 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:p-10 ${focusRing}`}
                        >
                            <div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <IconTile name={iconFor(featuredGuide.category)} />
                                    <Eyebrow>Featured</Eyebrow>
                                    {featuredGuide.readTime && (
                                        <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#46516B]"><KitIcon name="clock" className="h-4 w-4" />{featuredGuide.readTime}</span>
                                    )}
                                </div>
                                <h2 className={`mt-5 ${sectionH2} transition-colors group-hover:text-[#0866FF]`}>
                                    {featuredGuide.title}
                                </h2>
                                <p className="mt-3 text-[16px] leading-[1.6] text-[#46516B] sm:text-[17px]">
                                    {featuredGuide.description}
                                </p>
                                <ReadMore />
                            </div>
                            {featuredGuide.stats?.length ? (
                                <dl className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                                    {featuredGuide.stats.map((stat) => (
                                        <div key={stat.label} className="rounded-xl bg-[#EFF8FF] px-5 py-4">
                                            <dt className="text-[13px] font-medium text-[#46516B]">{stat.label}</dt>
                                            <dd className="mt-1 text-[22px] font-extrabold tracking-[-0.02em] text-[#07143F]">
                                                {stat.value}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            ) : null}
                        </Link>
                    </div>
                </section>
            )}

            {/* ===================== PILLAR GUIDES ===================== */}
            <section className={`bg-[#EFF8FF] ${sectionPad}`}>
                <div className={container}>
                    <div className="text-center">
                        <Eyebrow>Pillar Guides</Eyebrow>
                        <h2 className={`mt-3 ${sectionH2}`}>In-depth guides</h2>
                    </div>

                    <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {pillarGuides.map((guide, index) => (
                            <li key={guide.slug}>
                                <Link
                                    href={`/guides/${guide.slug}`}
                                    className={`group flex h-full flex-col rounded-xl border border-[#E5EDF6] bg-white p-6 ${cardShadow} ${cardHover} ${focusRing}`}
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <IconTile name={iconFor(guide.category)} />
                                        <span className="text-[13px] font-bold tabular-nums text-[#46516B]/70">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                    </div>
                                    {guide.category && (
                                        <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0866FF]">
                                            {guide.category}
                                        </p>
                                    )}
                                    <h3 className="mt-2 text-[18px] font-bold leading-[1.35] transition-colors group-hover:text-[#0866FF]">
                                        {guide.title}
                                    </h3>
                                    <p className="mt-2 line-clamp-3 flex-1 text-[15px] leading-[1.55] text-[#46516B]">
                                        {guide.description}
                                    </p>
                                    <ReadMore label={guide.readTime ? `Read guide · ${guide.readTime}` : "Read guide"} />
                                </Link>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* ===================== SUPPORT GUIDES ===================== */}
            <section className={`bg-white ${sectionPad}`}>
                <div className="mx-auto max-w-3xl px-4 sm:px-6">
                    <div className="text-center">
                        <Eyebrow>Support Guides</Eyebrow>
                        <h2 className={`mt-3 ${sectionH2}`}>Quick reads</h2>
                    </div>

                    <ul className={`mt-10 divide-y divide-[#E5EDF6] rounded-xl border border-[#E5EDF6] bg-white ${cardShadow}`}>
                        {supportGuides.map((guide) => (
                            <li key={guide.slug}>
                                <Link
                                    href={`/guides/${guide.slug}`}
                                    className={`group flex items-center gap-4 rounded-xl p-5 transition-colors hover:bg-[#EFF8FF] sm:p-6 ${focusRing}`}
                                >
                                    <span className="flex-1 text-[16px] font-semibold leading-[1.4] text-[#07143F] transition-colors group-hover:text-[#0866FF] sm:text-[17px]">
                                        {guide.title}
                                    </span>
                                    <span className="hidden shrink-0 items-center gap-1.5 text-[13px] font-medium text-[#46516B] sm:inline-flex">
                                        <KitIcon name="clock" className="h-4 w-4" />
                                        {guide.readTime || "Read"}
                                    </span>
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E5EDF6] bg-white transition-colors group-hover:border-[#0866FF]">
                                        <KitIcon name="arrow-right" className="h-4 w-4" />
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <CtaBand
                title="Done reading? Let's get you more calls."
                subtitle="Book a free strategy call and we'll map out a growth plan for your business."
            />
        </div>
    );
}
