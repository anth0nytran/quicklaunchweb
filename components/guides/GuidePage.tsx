import Link from "next/link";
import { BGPattern } from "@/components/ui/bg-pattern";
import { AmbientGlow, GlassButton, GlassDivider } from "@/components/ui/glass";
import { GuideStructuredData } from "@/components/seo/GuideStructuredData";
import type { Guide, GuideSection } from "@/lib/guides";

function renderSection(section: GuideSection) {
  switch (section.kind) {
    case "text":
      return (
        <section id={section.id} className="scroll-mt-24">
          <h2 className="text-xl font-bold text-white md:text-2xl">{section.title}</h2>
          <div className="mt-4 space-y-4">
            {section.paragraphs.map((paragraph, idx) => (
              <p
                key={paragraph}
                className={`text-[15px] leading-[1.8] ${
                  idx === 0 ? "text-white/80" : "text-white/55"
                }`}
              >
                {paragraph}
              </p>
            ))}
            {section.list && (
              <ul className="space-y-2.5 pt-1">
                {section.list.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] leading-[1.7]">
                    <span className="mt-[10px] h-1 w-1 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-white/55">{item}</span>
                  </li>
                ))}
              </ul>
            )}
            {section.links?.map((link) => (
              <p key={link.href} className="text-[15px] text-white/40 pt-1">
                {link.context}{" "}
                <Link className="text-accent hover:text-accent-hover transition-colors" href={link.href}>
                  {link.label}
                </Link>
                {link.suffix ? ` ${link.suffix}` : ""}
              </p>
            ))}
          </div>
        </section>
      );

    case "checklist":
      return (
        <section id={section.id} className="scroll-mt-24">
          <h2 className="text-xl font-bold text-white md:text-2xl">{section.title}</h2>
          <div className="mt-5 space-y-0 divide-y divide-white/[0.06]">
            {section.items.map((item) => (
              <div key={item.title} className="flex items-start gap-3.5 py-4 first:pt-0">
                <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
                  <svg className="h-2.5 w-2.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold text-white">{item.title}</p>
                  {item.detail && (
                    <p className="mt-1 text-sm leading-relaxed text-white/45">{item.detail}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          {section.note && (
            <p className="mt-3 text-xs text-white/30">{section.note}</p>
          )}
        </section>
      );

    case "table":
      return (
        <section id={section.id} className="scroll-mt-24">
          <h2 className="text-xl font-bold text-white md:text-2xl">{section.title}</h2>
          <div className="mt-5 -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
            <div className="min-w-[480px] rounded-xl border border-white/[0.06] overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {section.columns.map((column) => (
                      <th
                        key={column}
                        className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent bg-white/[0.02]"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.rows.map((row, rowIdx) => (
                    <tr key={row.join("-")} className={rowIdx !== 0 ? "border-t border-white/[0.04]" : ""}>
                      {row.map((cell, cellIdx) => (
                        <td
                          key={`${cell}-${cellIdx}`}
                          className={`px-4 py-3 ${
                            cellIdx === 0 ? "font-medium text-white/80" : "text-white/45"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {section.note && (
            <p className="mt-3 text-xs text-white/30">{section.note}</p>
          )}
        </section>
      );

    case "callout":
      return (
        <section id={section.id} className="scroll-mt-24">
          <h2 className="text-xl font-bold text-white md:text-2xl">{section.title}</h2>
          <div className="mt-5 border-l-2 border-accent/50 pl-5">
            {section.body.map((line, idx) => (
              <p
                key={line}
                className={`text-[15px] leading-[1.8] ${idx !== 0 ? "mt-3" : ""} ${
                  idx === 0 ? "text-white/80" : "text-white/50"
                }`}
              >
                {line}
              </p>
            ))}
          </div>
        </section>
      );

    case "faq":
      return (
        <section id={section.id} className="scroll-mt-24">
          <h2 className="text-xl font-bold text-white md:text-2xl">{section.title}</h2>
          <div className="mt-5 space-y-0 divide-y divide-white/[0.06]">
            {section.items.map((item) => (
              <details
                key={item.q}
                className="group"
              >
                <summary className="flex cursor-pointer items-center justify-between py-4 list-none [&::-webkit-details-marker]:hidden">
                  <span className="pr-4 text-[15px] font-medium text-white/80 group-hover:text-white transition-colors">{item.q}</span>
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center text-white/20 text-sm transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="pb-4 text-sm leading-[1.8] text-white/50">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      );

    case "related":
      return (
        <section id={section.id} className="scroll-mt-24">
          <h2 className="text-xl font-bold text-white md:text-2xl">{section.title}</h2>
          <div className="mt-5 space-y-0 divide-y divide-white/[0.06]">
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between py-4 first:pt-0"
              >
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-accent mb-1">{item.tag}</p>
                  <p className="text-[15px] font-medium text-white/80 group-hover:text-accent transition-colors">{item.label}</p>
                </div>
                <svg className="h-4 w-4 shrink-0 text-white/15 group-hover:text-accent transition-colors ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </section>
      );

    default:
      return null;
  }
}

export function GuidePage({ guide }: { guide: Guide }) {
  return (
    <main className="relative min-h-screen text-white">
      <GuideStructuredData guide={guide} />
      <BGPattern variant="grid" mask="fade-center" size={30} fill="rgba(255,255,255,0.015)" />
      <AmbientGlow color="accent" position="top" intensity="subtle" className="-top-24 opacity-30" />

      {/* Breadcrumb + Hero */}
      <header className="relative px-5 pt-28 pb-8 md:pt-36 md:pb-10">
        <div className="relative z-10 mx-auto max-w-2xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/30 mb-8">
            <Link href="/guides" className="hover:text-white/60 transition-colors">Guides</Link>
            <span>/</span>
            <span className="text-white/50 truncate">{guide.title}</span>
          </nav>

          {/* Kicker + Category */}
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.15em]">
            <span className="text-accent font-semibold">{guide.kicker}</span>
            {guide.category && (
              <>
                <span className="h-3 w-px bg-white/10" />
                <span className="text-white/30">{guide.category}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-[2.25rem] md:leading-[1.2]">
            {guide.title}
          </h1>

          {/* Description */}
          <p className="mt-3 text-[15px] leading-relaxed text-white/50">
            {guide.description}
          </p>

          {/* Meta line */}
          {(guide.updated || guide.readTime) && (
            <div className="mt-4 flex items-center gap-3 text-xs text-white/25">
              {guide.updated && <span>Updated {guide.updated}</span>}
              {guide.updated && guide.readTime && (
                <span className="h-0.5 w-0.5 rounded-full bg-white/20" />
              )}
              {guide.readTime && <span>{guide.readTime}</span>}
            </div>
          )}
        </div>
      </header>

      {/* Hero bullets */}
      {guide.heroBullets?.length ? (
        <div className="px-5 pb-8">
          <div className="mx-auto max-w-2xl">
            <ul className="grid gap-2 sm:grid-cols-2">
              {guide.heroBullets.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-[6px] h-1 w-1 rounded-full bg-accent flex-shrink-0" />
                  <span className="text-white/50">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {/* Stats */}
      {guide.stats?.length ? (
        <div className="px-5 pb-8">
          <div className="mx-auto max-w-2xl flex gap-8 overflow-x-auto pb-1">
            {guide.stats.map((stat) => (
              <div key={stat.label} className="shrink-0">
                <p className="text-base font-bold text-white">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-[0.1em] text-white/25">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Top CTA */}
      {guide.ctaTop && (
        <div className="px-5 pb-8">
          <div className="mx-auto max-w-2xl">
            <div className="flex flex-col gap-3 rounded-xl border border-accent/10 bg-accent/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">{guide.ctaTop.eyebrow}</p>
                <p className="mt-1 text-sm text-white/50">{guide.ctaTop.description}</p>
              </div>
              <Link href={guide.ctaTop.href} className="shrink-0">
                <GlassButton variant="secondary" size="sm">
                  {guide.ctaTop.label}
                </GlassButton>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Jump links - horizontal scroll on mobile */}
      {guide.jumpLinks?.length ? (
        <div className="px-5 pb-10">
          <div className="mx-auto max-w-2xl">
            <div className="border-y border-white/[0.04] py-3 -mx-5 px-5 overflow-x-auto">
              <nav className="flex items-center gap-4 min-w-max">
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/20">On this page</span>
                {guide.jumpLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className="text-[13px] text-white/35 hover:text-accent whitespace-nowrap transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      ) : null}

      {/* Article body */}
      <div className="px-5 pb-16 md:pb-24">
        <div className={`mx-auto ${guide.aside ? "max-w-4xl" : "max-w-2xl"}`}>
          <div className={`${guide.aside ? "grid gap-12 lg:grid-cols-[1fr_240px]" : ""}`}>
            {/* Main content */}
            <article className="space-y-12">
              {guide.sections.map((section) => (
                <div key={section.id}>
                  {renderSection(section)}
                </div>
              ))}
            </article>

            {/* Sidebar - desktop only */}
            {guide.aside && (
              <aside className="hidden lg:block">
                <div className="sticky top-28 space-y-6">
                  {guide.aside.takeaways && (
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-accent mb-3">Key takeaways</p>
                      <ul className="space-y-2">
                        {guide.aside.takeaways.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-[13px] leading-relaxed">
                            <span className="mt-[7px] h-1 w-1 rounded-full bg-white/20 flex-shrink-0" />
                            <span className="text-white/45">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {guide.aside.benchmarks && (
                    <>
                      <div className="h-px bg-white/[0.04]" />
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-accent mb-3">Targets</p>
                        <ul className="space-y-2">
                          {guide.aside.benchmarks.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-[13px] leading-relaxed">
                              <span className="mt-[7px] h-1 w-1 rounded-full bg-white/20 flex-shrink-0" />
                              <span className="text-white/45">{item}</span>
                            </li>
                          ))}
                        </ul>
                        {guide.aside.benchmarkNote && (
                          <p className="mt-2 text-[11px] text-white/25">{guide.aside.benchmarkNote}</p>
                        )}
                      </div>
                    </>
                  )}
                  {guide.aside.roi && (
                    <>
                      <div className="h-px bg-white/[0.04]" />
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-accent mb-3">ROI</p>
                        <div className="space-y-2 text-[13px] leading-relaxed text-white/45">
                          {guide.aside.roi.map((line) => (
                            <p key={line}>{line}</p>
                          ))}
                        </div>
                        {guide.aside.roiNote && (
                          <p className="mt-2 text-[11px] text-white/25">{guide.aside.roiNote}</p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      {guide.ctaBottom && (
        <div className="px-5 pb-16">
          <div className="mx-auto max-w-2xl border-t border-white/[0.06] pt-12">
            <div className="text-center">
              <h3 className="text-lg font-bold text-white md:text-xl">{guide.ctaBottom.title}</h3>
              <p className="mt-2 text-sm text-white/40">{guide.ctaBottom.description}</p>
              <Link href={guide.ctaBottom.href} className="inline-block mt-5">
                <GlassButton variant="secondary" size="md">
                  {guide.ctaBottom.label}
                </GlassButton>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Support CTA */}
      {guide.supportCta && (
        <div className="px-5 pb-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm text-white/30">
              {guide.supportCta.title}{" "}
              <Link className="text-accent hover:text-accent-hover transition-colors" href={guide.supportCta.href}>
                {guide.supportCta.label}
              </Link>
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
