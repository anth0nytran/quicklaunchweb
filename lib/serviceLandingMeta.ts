import type { Metadata } from "next";
import { serviceAreas } from "@/components/site-footer";
import { absoluteUrl, buildPageMetadata, organizationId, websiteId } from "@/lib/seo";
import type { ServiceLanding } from "@/lib/serviceLandingData";

// Metadata + JSON-LD for the service landing pages, so each route file stays tiny.

export function serviceLandingMetadata(content: ServiceLanding): Metadata {
  return {
    ...buildPageMetadata({
      title: content.metaTitle,
      description: content.metaDescription,
      path: content.path,
    }),
    keywords: content.keywords,
  };
}

export function serviceLandingSchema(content: ServiceLanding) {
  const pageUrl = absoluteUrl(content.path);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: content.metaTitle,
        description: content.metaDescription,
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
          { "@type": "ListItem", position: 3, name: content.serviceName, item: pageUrl },
        ],
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: content.serviceName,
        serviceType: content.serviceType,
        description: content.metaDescription,
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
          name: content.included.title,
          itemListElement: content.included.items.map((item) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: item.title, description: item.body },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: content.faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}
