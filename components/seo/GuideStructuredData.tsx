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

function isChecklistSection(
  section: GuideSection
): section is Extract<GuideSection, { kind: "checklist" }> {
  return section.kind === "checklist";
}

export function GuideStructuredData({ guide }: { guide: Guide }) {
  const guideUrl = absoluteUrl(`/guides/${guide.slug}`);
  const dateModified = parseMonthYearToIso(guide.updated);
  const faqSection = guide.sections.find(isFaqSection);
  const checklistSections = guide.sections.filter(isChecklistSection);

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
      ...(guide.category ? { articleSection: guide.category } : {}),
      ...(guide.readTime
        ? { timeRequired: `PT${parseInt(guide.readTime) || 10}M` }
        : {}),
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

  // FAQPage schema — critical for AEO/GEO (28% more likely to appear in AI Overviews)
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

  // HowTo schema for guides with checklists (step-by-step content)
  if (checklistSections.length > 0) {
    const primaryChecklist = checklistSections[0];
    graph.push({
      "@type": "HowTo",
      "@id": `${guideUrl}#howto`,
      name: primaryChecklist.title,
      step: primaryChecklist.items.map((item, idx) => ({
        "@type": "HowToStep",
        position: idx + 1,
        name: item.title,
        text: item.detail || item.title,
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
