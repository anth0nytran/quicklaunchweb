import { StructuredData } from "@/components/seo/StructuredData";
import type { Guide, GuideSection } from "@/lib/guides";
import {
  absoluteUrl,
  organizationId,
  parseMonthYearToIso,
  websiteId,
} from "@/lib/seo";

function isFaqSection(
  section: GuideSection
): section is Extract<GuideSection, { kind: "faq" }> {
  return section.kind === "faq";
}

export function GuideStructuredData({ guide }: { guide: Guide }) {
  const guideUrl = absoluteUrl(`/guides/${guide.slug}`);
  const dateModified = parseMonthYearToIso(guide.updated);
  const faqSection = guide.sections.find(isFaqSection);

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      "@id": `${guideUrl}#article`,
      headline: guide.title,
      description: guide.metaDescription,
      mainEntityOfPage: guideUrl,
      url: guideUrl,
      image: [absoluteUrl("/icon.jpg")],
      author: {
        "@id": organizationId,
      },
      publisher: {
        "@id": organizationId,
      },
      isPartOf: {
        "@id": websiteId,
      },
      ...(dateModified ? { dateModified } : {}),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${guideUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: absoluteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Guides",
          item: absoluteUrl("/guides"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: guide.title,
          item: guideUrl,
        },
      ],
    },
  ];

  if (faqSection) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${guideUrl}#faq`,
      mainEntity: faqSection.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    });
  }

  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@graph": graph,
      }}
    />
  );
}
