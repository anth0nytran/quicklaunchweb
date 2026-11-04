import type { Metadata } from "next";
import AutomationsPage from "@/components/pages/automations-page";
import { StructuredData } from "@/components/seo/StructuredData";
import { serviceAreas } from "@/components/site-footer";
import { absoluteUrl, buildPageMetadata, organizationId, websiteId } from "@/lib/seo";
import {
  automationsFaqs,
  automationsKeywords,
  automationsMetaDescription,
  automationsMetaTitle,
  automationsPath,
  buildItems,
} from "@/lib/automationsContent";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: automationsMetaTitle,
    description: automationsMetaDescription,
    path: automationsPath,
  }),
  keywords: automationsKeywords,
};

function automationsSchema() {
  const pageUrl = absoluteUrl(automationsPath);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: automationsMetaTitle,
        description: automationsMetaDescription,
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
          { "@type": "ListItem", position: 3, name: "Automations & Software", item: pageUrl },
        ],
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Automations & Custom Software",
        serviceType: "Business automation, CRM setup, AI receptionist, and custom software development",
        description: automationsMetaDescription,
        provider: { "@id": organizationId },
        areaServed: serviceAreas.map((city) => ({
          "@type": "City",
          name: city,
          containedInPlace: { "@type": "State", name: "Texas" },
        })),
        audience: {
          "@type": "BusinessAudience",
          name: "Home service businesses and contractors",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "What We Build",
          itemListElement: buildItems.map((item) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: item.title, description: item.body },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: automationsFaqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}

export default function AutomationsRoute() {
  return (
    <>
      <StructuredData data={automationsSchema()} />
      <AutomationsPage />
    </>
  );
}
