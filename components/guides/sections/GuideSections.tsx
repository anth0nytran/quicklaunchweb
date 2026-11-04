import Link from "next/link";
import { KitIcon } from "@/components/brand/primitives";
import { focusRing } from "@/components/brand/tokens";
import type { GuideSection } from "@/lib/guides";

// Article body renderers for the light brand. Readability first: 17–18px copy,
// ~1.7 line height, navy headings, #46516B body, 720px measure (set by GuidePage).

export const articleH2 = "text-[26px] font-extrabold leading-[1.2] tracking-[-0.03em] text-[#07143F] sm:text-[30px]";
export const articleText = "text-[17px] leading-[1.7] text-[#46516B] sm:text-[18px]";
const inlineLink = `rounded font-semibold text-[#0866FF] underline decoration-[#0866FF]/30 underline-offset-4 transition-colors hover:decoration-[#0866FF] ${focusRing}`;
/** Drops hrefs that pointed at the old website offer (pricing/features) so the CTA books a strategy call instead. */
export function ctaHref(href?: string) {
  return !href || href.startsWith("/services/web-design") ? undefined : href;
}

const sectionBase = "scroll-mt-28";

function CheckDot({ className = "" }: { className?: string }) {
  return (
    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0866FF]/10 ${className}`}>
      <KitIcon name="check" className="h-3.5 w-3.5" />
    </span>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-[14px] leading-[1.6] text-[#46516B]/80">{children}</p>;
}

export function GuideSectionView({ section }: { section: GuideSection }) {
  switch (section.kind) {
    case "text":
      return (
        <section id={section.id} className={sectionBase}>
          <h2 className={articleH2}>{section.title}</h2>
          <div className="mt-5 space-y-5">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className={articleText}>
                {paragraph}
              </p>
            ))}
            {section.list && (
              <ul className="space-y-3">
                {section.list.map((item) => (
                  <li key={item} className={`flex items-start gap-3 ${articleText}`}>
                    <CheckDot className="mt-[3px] sm:mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
            {section.links?.map((link) => (
              <p key={link.href} className={articleText}>
                {link.context}{" "}
                <Link className={inlineLink} href={link.href}>
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
        <section id={section.id} className={sectionBase}>
          <h2 className={articleH2}>{section.title}</h2>
          <ul className="mt-6 divide-y divide-[#E5EDF6] rounded-xl border border-[#E5EDF6] bg-white shadow-[0_4px_20px_-10px_rgba(7,20,63,0.12)]">
            {section.items.map((item) => (
              <li key={item.title} className="flex items-start gap-4 p-5 sm:p-6">
                <CheckDot className="mt-0.5" />
                <div className="min-w-0">
                  <p className="text-[17px] font-bold leading-[1.45] text-[#07143F]">{item.title}</p>
                  {item.detail && (
                    <p className="mt-1.5 text-[16px] leading-[1.65] text-[#46516B]">{item.detail}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          {section.note && <Note>{section.note}</Note>}
        </section>
      );

    case "table":
      return (
        <section id={section.id} className={sectionBase}>
          <h2 className={articleH2}>{section.title}</h2>
          <div className="mt-6 overflow-x-auto rounded-xl border border-[#E5EDF6] bg-white shadow-[0_4px_20px_-10px_rgba(7,20,63,0.12)]">
            <table className="w-full min-w-[480px] text-left text-[15px] sm:text-[16px]">
              <thead>
                <tr className="bg-[#EFF8FF]">
                  {section.columns.map((column) => (
                    <th
                      key={column}
                      scope="col"
                      className="px-4 py-3.5 text-[12px] font-bold uppercase tracking-[0.12em] text-[#07143F] sm:px-5"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EDF6]">
                {section.rows.map((row) => (
                  <tr key={row.join("-")}>
                    {row.map((cell, cellIdx) => (
                      <td
                        key={`${cell}-${cellIdx}`}
                        className={`px-4 py-3.5 align-top leading-[1.55] sm:px-5 ${
                          cellIdx === 0 ? "font-semibold text-[#07143F]" : "text-[#46516B]"
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
          {section.note && <Note>{section.note}</Note>}
        </section>
      );

    case "callout":
      return (
        <section id={section.id} className={sectionBase}>
          <h2 className={articleH2}>{section.title}</h2>
          <div className="mt-6 rounded-xl border border-[#E5EDF6] border-l-4 border-l-[#0866FF] bg-[#EFF8FF] p-5 sm:p-7">
            {section.body.map((line, idx) => (
              <p
                key={line}
                className={`${articleText} ${idx !== 0 ? "mt-4" : "font-semibold text-[#07143F]"}`}
              >
                {line}
              </p>
            ))}
          </div>
        </section>
      );

    case "faq":
      return (
        <section id={section.id} className={sectionBase}>
          <h2 className={articleH2}>{section.title}</h2>
          <div className="mt-6 space-y-3">
            {section.items.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-[#E5EDF6] bg-white transition-all open:shadow-[0_10px_30px_-14px_rgba(7,20,63,0.2)]"
              >
                <summary
                  className={`flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl p-5 text-left text-[16px] font-semibold text-[#07143F] sm:p-6 sm:text-[17px] [&::-webkit-details-marker]:hidden ${focusRing}`}
                >
                  {item.q}
                  <KitIcon name="chevron-down" className="h-5 w-5 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-6 text-[16px] leading-[1.7] text-[#46516B] sm:px-6 sm:text-[17px]">{item.a}</div>
              </details>
            ))}
          </div>
        </section>
      );

    case "related":
      return (
        <section id={section.id} className={sectionBase}>
          <h2 className={articleH2}>{section.title}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex h-full items-center justify-between gap-4 rounded-xl border border-[#E5EDF6] bg-white p-5 shadow-[0_4px_20px_-10px_rgba(7,20,63,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0866FF]/40 hover:shadow-[0_18px_40px_-18px_rgba(7,20,63,0.25)] ${focusRing}`}
              >
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0866FF]">{item.tag}</p>
                  <p className="mt-1.5 text-[16px] font-bold leading-[1.4] text-[#07143F]">{item.label}</p>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E5EDF6] bg-white transition-colors group-hover:border-[#0866FF] group-hover:bg-[#EFF8FF]">
                  <KitIcon name="arrow-right" className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      );

    default:
      return null;
  }
}
