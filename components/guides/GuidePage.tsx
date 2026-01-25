import Link from "next/link";
import { BGPattern } from "@/components/ui/bg-pattern";
import { AmbientGlow, GlassButton, GlassCard, GlassDivider, GlassPill } from "@/components/ui/glass";
import type { Guide, GuideSection } from "@/lib/guides";

// Typography styles with proper hierarchy
const styles = {
  // Headers - bright white, bold
  h2: { color: 'white' },
  // Body text - slightly dimmed for readability
  body: { color: 'rgba(255, 255, 255, 0.75)' },
  // Emphasized/important text
  emphasis: { color: 'rgba(255, 255, 255, 0.9)' },
  // Muted text - labels, notes
  muted: { color: 'rgba(255, 255, 255, 0.5)' },
  // Secondary text - less important
  secondary: { color: 'rgba(255, 255, 255, 0.6)' },
};

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="h-px w-12 bg-gradient-to-r from-accent to-accent/30" />
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl" style={styles.h2}>{title}</h2>
    </div>
  );
}

function renderSection(section: GuideSection) {
  switch (section.kind) {
    case "text":
      return (
        <section id={section.id} className="scroll-mt-28">
          <SectionTitle title={section.title} />
          <div className="space-y-4 pl-16">
            {section.paragraphs.map((paragraph, idx) => (
              <p
                key={paragraph}
                className="text-[15px] leading-[1.8] md:text-base"
                style={idx === 0 ? styles.emphasis : styles.body}
              >
                {paragraph}
              </p>
            ))}
            {section.list && (
              <ul className="space-y-3 pt-2">
                {section.list.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] md:text-base">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent/70 flex-shrink-0" />
                    <span style={styles.body}>{item}</span>
                  </li>
                ))}
              </ul>
            )}
            {section.links?.map((link) => (
              <p key={link.href} className="text-[15px] md:text-base pt-2" style={styles.secondary}>
                {link.context}{" "}
                <Link className="text-accent hover:text-accent-hover font-medium" href={link.href}>
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
        <section id={section.id} className="scroll-mt-28">
          <SectionTitle title={section.title} />
          <div className="ml-16 rounded-2xl border border-white/[0.1] bg-gradient-to-br from-accent/[0.03] via-white/[0.02] to-transparent p-6 backdrop-blur-sm">
            <ul className="space-y-0">
              {section.items.map((item, idx) => (
                <li
                  key={item.title}
                  className={`flex items-start gap-4 py-4 ${idx !== 0 ? 'border-t border-white/[0.08]' : ''}`}
                >
                  <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent/20 border border-accent/40">
                    <svg className="h-3 w-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <span className="font-semibold block" style={styles.h2}>{item.title}</span>
                    {item.detail && (
                      <span className="text-sm leading-relaxed block mt-1" style={styles.body}>{item.detail}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {section.note && (
            <p className="ml-16 mt-3 text-xs" style={styles.muted}>{section.note}</p>
          )}
        </section>
      );
    case "table":
      return (
        <section id={section.id} className="scroll-mt-28">
          <SectionTitle title={section.title} />
          <div className="ml-16 rounded-2xl border border-white/[0.1] bg-gradient-to-br from-white/[0.03] to-transparent overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px] md:text-sm">
                <thead className="bg-accent/10 border-b border-white/[0.1]">
                  <tr>
                    {section.columns.map((column) => (
                      <th
                        key={column}
                        className="px-5 py-4 font-semibold text-xs uppercase tracking-wider"
                        style={styles.h2}
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.rows.map((row, rowIdx) => (
                    <tr key={row.join("-")} className={`${rowIdx !== 0 ? 'border-t border-white/[0.06]' : ''}`}>
                      {row.map((cell, index) => (
                        <td
                          key={`${cell}-${index}`}
                          className="px-5 py-4"
                          style={index === 0 ? styles.emphasis : styles.body}
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
            <p className="ml-16 mt-3 text-xs" style={styles.muted}>{section.note}</p>
          )}
        </section>
      );
    case "callout":
      return (
        <section id={section.id} className="scroll-mt-28">
          <SectionTitle title={section.title} />
          <div className="ml-16 rounded-2xl border-l-4 border-accent bg-accent/[0.05] p-6">
            {section.body.map((line, idx) => (
              <p
                key={line}
                className={`text-[15px] leading-[1.8] md:text-base ${idx !== 0 ? 'mt-3' : ''}`}
                style={idx === 0 ? styles.emphasis : styles.body}
              >
                {line}
              </p>
            ))}
          </div>
        </section>
      );
    case "faq":
      return (
        <section id={section.id} className="scroll-mt-28">
          <SectionTitle title={section.title} />
          <div className="ml-16 space-y-3">
            {section.items.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-white/[0.1] bg-white/[0.02] backdrop-blur-sm transition-all duration-200 open:bg-accent/[0.03] open:border-accent/30 hover:border-white/[0.15]"
              >
                <summary className="flex cursor-pointer items-center justify-between p-5 list-none">
                  <span className="pr-4 font-medium" style={styles.h2}>{item.q}</span>
                  <span className="text-accent text-xl font-light transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <div className="px-5 pb-5 text-[15px] leading-[1.8] md:text-base border-t border-white/[0.08] pt-4" style={styles.body}>
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      );
    case "related":
      return (
        <section id={section.id} className="scroll-mt-28">
          <SectionTitle title={section.title} />
          <div className="ml-16 rounded-2xl border border-white/[0.1] overflow-hidden">
            {section.items.map((item, idx) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center justify-between p-5 transition-colors hover:bg-accent/[0.05] ${idx !== 0 ? 'border-t border-white/[0.08]' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent text-sm font-medium">
                    →
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider mb-1" style={styles.muted}>{item.tag}</p>
                    <span className="font-medium group-hover:text-accent transition-colors" style={styles.h2}>{item.label}</span>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-white/[0.05] group-hover:bg-accent/20 group-hover:text-accent transition-colors" style={styles.secondary}>Read</span>
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
  const hasAside = Boolean(guide.aside);
  const containerWidthClass = hasAside ? "max-w-6xl" : "max-w-4xl";

  return (
    <main className="relative min-h-screen px-6 py-24 text-white md:py-32">
      <BGPattern variant="grid" mask="fade-center" size={30} fill="rgba(255,255,255,0.025)" />
      <AmbientGlow color="accent" position="top" intensity="subtle" className="-top-24" />
      <AmbientGlow color="white" position="bottom" intensity="subtle" className="opacity-40" />

      <div className={`relative z-10 mx-auto ${containerWidthClass} space-y-16`}>
        {/* Hero Header */}
        <header className="space-y-8">
          <div className="flex items-center gap-3">
            <GlassPill variant="accent">{guide.kicker}</GlassPill>
            {guide.category && (
              <span className="text-xs uppercase tracking-wider" style={styles.muted}>
                {guide.category}
              </span>
            )}
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl" style={styles.h2}>
              {guide.title}
            </h1>
            <p className="text-lg leading-relaxed max-w-3xl md:text-xl" style={styles.body}>
              {guide.description}
            </p>
          </div>

          {guide.heroBullets?.length ? (
            <ul className="grid gap-3 md:grid-cols-2 pt-2">
              {guide.heroBullets.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-[15px] md:text-base" style={styles.emphasis}>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {/* Meta bar */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/[0.08]">
            {guide.updated && (
              <span className="text-xs" style={styles.muted}>Updated {guide.updated}</span>
            )}
            {guide.readTime && (
              <>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span className="text-xs" style={styles.muted}>{guide.readTime}</span>
              </>
            )}
          </div>

          {/* Stats grid */}
          {guide.stats?.length ? (
            <div className="grid gap-px bg-white/[0.08] rounded-2xl overflow-hidden md:grid-cols-3">
              {guide.stats.map((stat) => (
                <div key={stat.label} className="bg-base p-5">
                  <p className="text-[10px] uppercase tracking-wider mb-2" style={styles.muted}>{stat.label}</p>
                  <p className="text-lg font-semibold" style={styles.h2}>{stat.value}</p>
                </div>
              ))}
            </div>
          ) : null}

          {/* CTA */}
          {guide.ctaTop && (
            <div className="rounded-2xl border border-accent/20 bg-accent/[0.05] p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-accent font-medium">{guide.ctaTop.eyebrow}</p>
                  <p className="mt-2 text-[15px] md:text-base" style={styles.emphasis}>{guide.ctaTop.description}</p>
                </div>
                <Link href={guide.ctaTop.href}>
                  <GlassButton variant="secondary" size="md">
                    {guide.ctaTop.label}
                  </GlassButton>
                </Link>
              </div>
            </div>
          )}

          {/* Jump Links */}
          {guide.jumpLinks?.length ? (
            <nav className="flex flex-wrap gap-2 pt-4">
              <span className="text-xs uppercase tracking-wider mr-2" style={styles.muted}>Jump to:</span>
              {guide.jumpLinks.map((link, idx) => (
                <span key={link.id} className="flex items-center gap-2">
                  <a
                    href={`#${link.id}`}
                    className="text-sm hover:text-accent transition-colors"
                    style={styles.secondary}
                  >
                    {link.label}
                  </a>
                  {idx < guide.jumpLinks!.length - 1 && (
                    <span className="h-1 w-1 rounded-full bg-white/20" />
                  )}
                </span>
              ))}
            </nav>
          ) : null}
        </header>

        {/* Main content grid */}
        <div className={`grid gap-12 ${hasAside ? "lg:grid-cols-[1fr_300px]" : ""}`}>
          {/* Article */}
          <article className="space-y-16">
            {guide.sections.map((section, index) => (
              <div key={section.id}>
                {renderSection(section)}
              </div>
            ))}

            {/* Bottom CTA */}
            {guide.ctaBottom && (
              <div className="rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xl font-bold" style={styles.h2}>{guide.ctaBottom.title}</p>
                    <p className="mt-2" style={styles.body}>{guide.ctaBottom.description}</p>
                  </div>
                  <Link href={guide.ctaBottom.href}>
                    <GlassButton variant="secondary" size="lg">
                      {guide.ctaBottom.label}
                    </GlassButton>
                  </Link>
                </div>
              </div>
            )}

            {/* Support CTA */}
            {guide.supportCta && (
              <div className="rounded-2xl border border-white/[0.1] bg-white/[0.02] p-6">
                <p className="font-semibold" style={styles.h2}>{guide.supportCta.title}</p>
                <p className="mt-2" style={styles.body}>
                  <Link className="text-accent hover:text-accent-hover font-medium" href={guide.supportCta.href}>
                    {guide.supportCta.label}
                  </Link>
                </p>
              </div>
            )}
          </article>

          {/* Sidebar */}
          {guide.aside && (
            <aside className="space-y-6 lg:sticky lg:top-24 h-fit">
              <GlassCard className="p-6 space-y-6">
                {guide.aside.takeaways && (
                  <div>
                    <p className="text-xs uppercase tracking-wider font-medium text-accent mb-4">Key takeaways</p>
                    <ul className="space-y-3">
                      {guide.aside.takeaways.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-accent" />
                          <span style={styles.body}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {guide.aside.benchmarks && (
                  <>
                    <GlassDivider />
                    <div>
                      <p className="text-xs uppercase tracking-wider font-medium text-accent mb-4">Optimization targets</p>
                      <ul className="space-y-3">
                        {guide.aside.benchmarks.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm">
                            <span className="mt-1.5 h-1 w-1 rounded-full bg-accent" />
                            <span style={styles.body}>{item}</span>
                          </li>
                        ))}
                      </ul>
                      {guide.aside.benchmarkNote && (
                        <p className="mt-3 text-xs" style={styles.muted}>{guide.aside.benchmarkNote}</p>
                      )}
                    </div>
                  </>
                )}
                {guide.aside.roi && (
                  <>
                    <GlassDivider />
                    <div>
                      <p className="text-xs uppercase tracking-wider font-medium text-accent mb-4">ROI snapshot</p>
                      <div className="space-y-2 text-sm" style={styles.body}>
                        {guide.aside.roi.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                      {guide.aside.roiNote && (
                        <p className="mt-3 text-xs" style={styles.muted}>{guide.aside.roiNote}</p>
                      )}
                    </div>
                  </>
                )}
              </GlassCard>
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}
