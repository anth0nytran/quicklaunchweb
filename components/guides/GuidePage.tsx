import Link from "next/link";
import { CtaBand } from "@/components/brand/brand-shell";
import { Eyebrow, KitIcon } from "@/components/brand/primitives";
import { container, focusRing } from "@/components/brand/tokens";
import { GuideStructuredData } from "@/components/seo/GuideStructuredData";
import { GuideCtaButton } from "@/components/guides/sections/GuideCtaButton";
import { GuideSectionView, articleText, ctaHref } from "@/components/guides/sections/GuideSections";
import type { Guide } from "@/lib/guides";

// Guide article template (light brand). Rendered inside BrandShell via app/guides/layout.tsx.

const sideCard = "rounded-xl border border-[#E5EDF6] bg-white p-5 shadow-[0_4px_20px_-10px_rgba(7,20,63,0.12)]";
const sideLabel = "text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0866FF]";

function SideList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-[14px] leading-[1.55] text-[#46516B]">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0866FF]/10">
            <KitIcon name="check" className="h-3 w-3" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function GuidePage({ guide }: { guide: Guide }) {
  const hasSidebar = Boolean(guide.jumpLinks?.length || guide.aside);

  return (
    <div className="relative">
      <GuideStructuredData guide={guide} />

      {/* ===================== HERO ===================== */}
      <header className="relative overflow-hidden bg-gradient-to-b from-[#EFF8FF] to-[#f7fbff] pb-12 pt-[104px] sm:pt-28 lg:pb-16 lg:pt-32">
        <div className={container}>
          <nav aria-label="Breadcrumb">
            <ol className="flex min-w-0 items-center gap-2 text-[14px] text-[#46516B]">
              <li className="shrink-0">
                <Link href="/guides" className={`rounded font-semibold text-[#0866FF] hover:underline ${focusRing}`}>
                  Guides
                </Link>
              </li>
              <li aria-hidden="true" className="shrink-0 text-[#46516B]/50">
                /
              </li>
              <li className="min-w-0 truncate" aria-current="page">
                {guide.title}
              </li>
            </ol>
          </nav>

          <div className="mt-8 max-w-[860px]">
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow>{guide.kicker}</Eyebrow>
              {guide.category && (
                <span className="rounded-full border border-[#E5EDF6] bg-white px-3 py-1 text-[12px] font-semibold text-[#46516B]">
                  {guide.category}
                </span>
              )}
            </div>

            <h1 className="mt-4 text-[32px] font-extrabold leading-[1.1] tracking-[-0.035em] sm:text-[42px] lg:text-[48px]">
              {guide.title}
            </h1>

            <p className="mt-5 max-w-[720px] text-[17px] leading-[1.6] text-[#46516B] sm:text-[19px]">{guide.description}</p>

            {(guide.updated || guide.readTime) && (
              <div className="mt-5 flex flex-wrap items-center gap-3 text-[14px] font-medium text-[#46516B]">
                {guide.updated && <span>Updated {guide.updated}</span>}
                {guide.updated && guide.readTime && (
                  <span className="h-1 w-1 rounded-full bg-[#46516B]/40" aria-hidden="true" />
                )}
                {guide.readTime && (
                  <span className="inline-flex items-center gap-1.5">
                    <KitIcon name="clock" className="h-4 w-4" />
                    {guide.readTime}
                  </span>
                )}
              </div>
            )}
          </div>

          {guide.heroBullets?.length ? (
            <ul className="mt-8 grid max-w-[960px] gap-x-8 gap-y-3 sm:grid-cols-2">
              {guide.heroBullets.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] leading-[1.55] text-[#46516B] sm:text-[16px]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0866FF]/10">
                    <KitIcon name="check" className="h-3.5 w-3.5" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {guide.stats?.length ? (
            <dl className="mt-8 grid max-w-[960px] gap-4 sm:grid-cols-3">
              {guide.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-[#E5EDF6] bg-white px-5 py-4 shadow-[0_4px_20px_-10px_rgba(7,20,63,0.12)]"
                >
                  <dt className="text-[13px] font-medium text-[#46516B]">{stat.label}</dt>
                  <dd className="mt-1 text-[22px] font-extrabold tracking-[-0.02em] text-[#07143F]">{stat.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </header>

      {/* ===================== ARTICLE ===================== */}
      <div className="bg-white py-12 sm:py-16 lg:py-20">
        <div
          className={`${container} ${
            hasSidebar ? "grid gap-12 lg:grid-cols-[minmax(0,720px)_300px] lg:justify-between" : ""
          }`}
        >
          <div className={`min-w-0 ${hasSidebar ? "" : "mx-auto max-w-[720px]"}`}>
            {guide.ctaTop && (
              <div className="mb-10 flex flex-col gap-4 rounded-xl border border-[#E5EDF6] bg-[#EFF8FF] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                  <Eyebrow>{guide.ctaTop.eyebrow}</Eyebrow>
                  <p className="mt-1.5 text-[16px] leading-[1.55] text-[#46516B]">{guide.ctaTop.description}</p>
                </div>
                <GuideCtaButton
                  href={ctaHref(guide.ctaTop.href)}
                  label={guide.ctaTop.label}
                  location="guide_top"
                  className="shrink-0"
                />
              </div>
            )}

            {guide.jumpLinks?.length ? (
              <nav aria-label="On this page" className="mb-10 rounded-xl border border-[#E5EDF6] bg-white p-5 lg:hidden">
                <p className={sideLabel}>On this page</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {guide.jumpLinks.map((link) => (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        className={`inline-block rounded-full border border-[#E5EDF6] bg-[#EFF8FF] px-3 py-1.5 text-[14px] font-medium text-[#07143F] transition-colors hover:border-[#0866FF] hover:text-[#0866FF] ${focusRing}`}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}

            <article className="space-y-14">
              {guide.sections.map((section) => (
                <div key={section.id}>
                  <GuideSectionView section={section} />
                </div>
              ))}
            </article>

            {guide.ctaBottom && (
              <div className="mt-16 rounded-xl border border-[#E5EDF6] bg-[#EFF8FF] p-6 text-center sm:p-10">
                <h3 className="text-[22px] font-extrabold leading-[1.2] tracking-[-0.03em] sm:text-[26px]">
                  {guide.ctaBottom.title}
                </h3>
                <p className={`mx-auto mt-3 max-w-[560px] ${articleText}`}>{guide.ctaBottom.description}</p>
                <GuideCtaButton
                  href={ctaHref(guide.ctaBottom.href)}
                  label={guide.ctaBottom.label}
                  location="guide_bottom"
                  className="mt-6"
                />
              </div>
            )}

            {guide.supportCta && (
              <p className={`mt-12 border-t border-[#E5EDF6] pt-8 text-center ${articleText}`}>
                {guide.supportCta.title}{" "}
                <Link
                  className={`rounded font-semibold text-[#0866FF] underline decoration-[#0866FF]/30 underline-offset-4 hover:decoration-[#0866FF] ${focusRing}`}
                  href={guide.supportCta.href}
                >
                  {guide.supportCta.label}
                </Link>
              </p>
            )}
          </div>

          {hasSidebar && (
            <aside className="hidden lg:block" aria-label="Guide summary">
              <div className="space-y-5">
                {guide.jumpLinks?.length ? (
                  <nav aria-label="On this page" className={sideCard}>
                    <p className={sideLabel}>On this page</p>
                    <ul className="mt-3 space-y-1">
                      {guide.jumpLinks.map((link) => (
                        <li key={link.id}>
                          <a
                            href={`#${link.id}`}
                            className={`block rounded-lg px-2 py-1.5 text-[14px] font-medium text-[#46516B] transition-colors hover:bg-[#EFF8FF] hover:text-[#0866FF] ${focusRing}`}
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ) : null}

                {guide.aside?.takeaways && (
                  <div className={sideCard}>
                    <p className={sideLabel}>Key takeaways</p>
                    <SideList items={guide.aside.takeaways} />
                  </div>
                )}

                {guide.aside?.benchmarks && (
                  <div className={sideCard}>
                    <p className={sideLabel}>Targets</p>
                    <SideList items={guide.aside.benchmarks} />
                    {guide.aside.benchmarkNote && (
                      <p className="mt-3 text-[12px] leading-[1.5] text-[#46516B]/80">{guide.aside.benchmarkNote}</p>
                    )}
                  </div>
                )}

                {guide.aside?.roi && (
                  <div className={sideCard}>
                    <p className={sideLabel}>ROI</p>
                    <div className="mt-3 space-y-2 text-[14px] leading-[1.55] text-[#46516B]">
                      {guide.aside.roi.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                    {guide.aside.roiNote && (
                      <p className="mt-3 text-[12px] leading-[1.5] text-[#46516B]/80">{guide.aside.roiNote}</p>
                    )}
                  </div>
                )}
              </div>
            </aside>
          )}
        </div>
      </div>

      <CtaBand />
    </div>
  );
}
