import Link from "next/link";
import { BGPattern } from "@/components/ui/bg-pattern";
import { AmbientGlow, GlassButton, GlassCard, GlassDivider, GlassPill } from "@/components/ui/glass";
import type { Guide, GuideSection } from "@/lib/guides";

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-10 bg-accent/70" />
      <h2 className="text-2xl font-semibold text-white md:text-3xl">{title}</h2>
    </div>
  );
}

function renderSection(section: GuideSection) {
  switch (section.kind) {
    case "text":
      return (
        <section id={section.id} className="space-y-4 scroll-mt-28">
          <SectionTitle title={section.title} />
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-[15px] !text-white/80 leading-relaxed md:text-base">
              {paragraph}
            </p>
          ))}
          {section.list && (
            <ul className="list-disc space-y-2 pl-5 text-[15px] !text-white/80 marker:text-white/40 md:text-base">
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {section.links?.map((link) => (
            <p key={link.href} className="text-[15px] !text-white/80 leading-relaxed md:text-base">
              {link.context}{" "}
              <Link className="text-accent hover:text-accent-hover" href={link.href}>
                {link.label}
              </Link>
              {link.suffix ? ` ${link.suffix}` : ""}
            </p>
          ))}
        </section>
      );
    case "checklist":
      return (
        <section id={section.id} className="space-y-4 scroll-mt-28">
          <SectionTitle title={section.title} />
          <div className="rounded-2xl border border-white/[0.08] p-5">
            <ul className="space-y-3 text-[15px] !text-white/80 md:text-base">
              {section.items.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <span className="mt-2 h-px w-4 bg-accent/70" />
                  <span>
                    <span className="text-white">{item.title}</span>
                    {item.detail ? ` - ${item.detail}` : ""}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {section.note && (
            <p className="text-xs text-muted">{section.note}</p>
          )}
        </section>
      );
    case "table":
      return (
        <section id={section.id} className="space-y-4 scroll-mt-28">
          <SectionTitle title={section.title} />
          <div className="rounded-2xl border border-white/[0.08] p-5">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px] !text-white/80 md:text-sm">
                <thead className="text-xs uppercase tracking-wider !text-white/80">
                  <tr>
                    {section.columns.map((column) => (
                      <th key={column} className="pb-3">{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.rows.map((row) => (
                    <tr key={row.join("-")} className="border-t border-white/[0.08]">
                      {row.map((cell, index) => (
                        <td key={`${cell}-${index}`} className={`py-3 ${index === 0 ? "text-white" : ""}`}>
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
            <p className="text-xs text-muted">{section.note}</p>
          )}
        </section>
      );
    case "callout":
      return (
        <section id={section.id} className="space-y-4 scroll-mt-28">
          <SectionTitle title={section.title} />
          <div className="rounded-2xl border-l-2 border-accent/60 bg-white/[0.02] p-5">
            {section.body.map((line) => (
              <p key={line} className="text-[15px] !text-white/80 leading-relaxed md:text-base">
                {line}
              </p>
            ))}
          </div>
        </section>
      );
    case "faq":
      return (
        <section id={section.id} className="space-y-4 scroll-mt-28">
          <SectionTitle title={section.title} />
          <div className="space-y-3">
            {section.items.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-white/[0.08] bg-white/[0.01] backdrop-blur-sm transition-all duration-200 open:bg-white/[0.04] hover:border-white/[0.12] hover:bg-white/[0.03]"
              >
                <summary className="flex cursor-pointer items-center justify-between p-5 text-sm font-medium text-white list-none">
                  <span className="pr-4">{item.q}</span>
                  <span className="text-muted transition-transform duration-200 group-open:rotate-180">+</span>
                </summary>
                <div className="px-5 pb-5 text-[15px] !text-white/80 leading-relaxed md:text-base">{item.a}</div>
              </details>
            ))}
          </div>
        </section>
      );
    case "related":
      return (
        <section id={section.id} className="space-y-4 scroll-mt-28">
          <SectionTitle title={section.title} />
          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between py-4 transition-colors hover:bg-white/[0.02]"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-2 h-px w-4 bg-accent/70 transition-all group-hover:w-6" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted">{item.tag}</p>
                    <span className="text-sm text-white group-hover:text-accent">{item.label}</span>
                  </div>
                </div>
                <span className="text-xs text-muted group-hover:text-white">Read</span>
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
  const containerWidthClass = hasAside ? "max-w-6xl" : "max-w-5xl";

  return (
    <main className="relative min-h-screen px-6 py-24 text-white md:py-32">
      <BGPattern variant="grid" mask="fade-center" size={30} fill="rgba(255,255,255,0.035)" />
      <AmbientGlow color="accent" position="top" intensity="subtle" className="-top-24" />
      <AmbientGlow color="white" position="bottom" intensity="subtle" className="opacity-60" />

      <div className={`relative z-10 mx-auto ${containerWidthClass} space-y-12`}>
        <header className="space-y-6">
          <GlassPill variant="accent">{guide.kicker}</GlassPill>
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-white md:text-5xl">{guide.title}</h1>
            <p className="text-base !text-white/80 leading-relaxed max-w-3xl md:text-lg">{guide.description}</p>
          </div>

          {guide.heroBullets?.length ? (
            <ul className="grid gap-3 text-[15px] !text-white/80 md:grid-cols-2 md:text-base">
              {guide.heroBullets.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-px w-4 bg-accent/70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {(guide.readTime || guide.updated || guide.category) && (
            <div className="flex flex-wrap gap-3 text-xs text-muted">
              {guide.category && <span className="uppercase tracking-wider">{guide.category}</span>}
              {guide.updated && <span>Updated {guide.updated}</span>}
              {guide.readTime && <span>{guide.readTime}</span>}
            </div>
          )}

          {guide.stats?.length ? (
            <div className="grid gap-4 border-y border-white/[0.08] py-4 md:grid-cols-3">
              {guide.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-[10px] uppercase tracking-wider text-muted">{stat.label}</p>
                  <p className="mt-1 text-sm text-white/90">{stat.value}</p>
                </div>
              ))}
            </div>
          ) : null}

          {guide.ctaTop && (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted">{guide.ctaTop.eyebrow}</p>
                  <p className="mt-2 text-[15px] !text-white/80 md:text-base">{guide.ctaTop.description}</p>
                </div>
                <Link href={guide.ctaTop.href}>
                  <GlassButton variant="secondary" size="md">
                    {guide.ctaTop.label}
                  </GlassButton>
                </Link>
              </div>
            </div>
          )}

          {guide.jumpLinks?.length ? (
            <div className="flex flex-wrap gap-3 text-xs text-muted">
              <span className="uppercase tracking-wider">Jump to:</span>
              {guide.jumpLinks.map((link) => (
                <a key={link.id} href={`#${link.id}`} className="hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </header>

        <div
          className={`grid gap-12 ${
            hasAside ? "lg:grid-cols-[minmax(0,1fr)_320px]" : "lg:grid-cols-1"
          }`}
        >
          <article
            className={`space-y-12 ${
              hasAside ? "" : "w-full max-w-4xl justify-self-center"
            }`}
          >
            {guide.sections.map((section, index) => (
              <div
                key={section.id}
                className={`pt-8 ${index === 0 ? "" : "border-t border-white/[0.08]"}`}
              >
                {renderSection(section)}
              </div>
            ))}

            {guide.ctaBottom && (
              <GlassCard variant="elevated" className="p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm text-white font-semibold">{guide.ctaBottom.title}</p>
                    <p className="mt-2 text-[15px] !text-white/80 md:text-base">
                      {guide.ctaBottom.description}
                    </p>
                  </div>
                  <Link href={guide.ctaBottom.href}>
                    <GlassButton variant="secondary" size="md">
                      {guide.ctaBottom.label}
                    </GlassButton>
                  </Link>
                </div>
              </GlassCard>
            )}

            {guide.supportCta && (
              <GlassCard variant="elevated" className="p-6">
                <p className="text-sm text-white font-semibold">{guide.supportCta.title}</p>
                <p className="mt-2 text-[15px] !text-white/80 md:text-base">
                  <Link className="text-accent hover:text-accent-hover" href={guide.supportCta.href}>
                    {guide.supportCta.label}
                  </Link>
                </p>
              </GlassCard>
            )}
          </article>

          {guide.aside && (
            <aside className="space-y-6 lg:sticky lg:top-24 h-fit">
              <GlassCard className="p-6 space-y-4">
                {guide.aside.takeaways && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted">Key takeaways</p>
                    <ul className="mt-3 space-y-2 text-[15px] !text-white/80 md:text-base">
                      {guide.aside.takeaways.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 h-px w-3 bg-accent/70" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {guide.aside.benchmarks && (
                  <>
                    <GlassDivider />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted">Optimization targets</p>
                      <ul className="mt-3 space-y-2 text-[15px] !text-white/80 md:text-base">
                        {guide.aside.benchmarks.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-2 h-px w-3 bg-accent/70" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      {guide.aside.benchmarkNote && (
                        <p className="mt-3 text-xs text-muted">{guide.aside.benchmarkNote}</p>
                      )}
                    </div>
                  </>
                )}
                {guide.aside.roi && (
                  <>
                    <GlassDivider />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted">ROI snapshot</p>
                      <div className="mt-3 space-y-2 text-[15px] !text-white/80 md:text-base">
                        {guide.aside.roi.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                      {guide.aside.roiNote && (
                        <p className="mt-3 text-xs text-muted">{guide.aside.roiNote}</p>
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
