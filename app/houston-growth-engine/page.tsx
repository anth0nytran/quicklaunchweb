import type { Metadata } from "next";
import EnginePage from "@/components/pages/engine-page";
import { StructuredData } from "@/components/seo/StructuredData";
import { serviceAreas } from "@/components/site-footer";
import { engine } from "@/lib/engineData";
import { socialFaqs } from "@/lib/socialFaqData";
import { absoluteUrl, buildPageMetadata, organizationId, websiteId } from "@/lib/seo";

const pageUrl = absoluteUrl(engine.path);

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: engine.metaTitle,
    description: engine.metaDescription,
    path: engine.path,
  }),
  keywords: engine.keywords,
};

export default function Page() {
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${pageUrl}#webpage`,
              url: pageUrl,
              name: engine.metaTitle,
              description: engine.metaDescription,
              isPartOf: { "@id": websiteId },
              about: { "@id": organizationId },
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${pageUrl}#breadcrumb`,
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
                { "@type": "ListItem", position: 2, name: engine.name, item: pageUrl },
              ],
            },
            {
              "@type": "Service",
              "@id": `${pageUrl}#service`,
              name: engine.name,
              serviceType: "Marketing, lead qualification, and appointment setting for home service businesses",
              description: engine.metaDescription,
              provider: { "@id": organizationId },
              areaServed: serviceAreas.map((city) => ({
                "@type": "City",
                name: city,
                containedInPlace: { "@type": "State", name: "Texas" },
              })),
              audience: { "@type": "BusinessAudience", name: "Home service businesses and contractors" },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: `What's inside the ${engine.name}`,
                itemListElement: engine.parts.map((part) => ({
                  "@type": "Offer",
                  itemOffered: { "@type": "Service", name: part.title, description: part.body },
                })),
              },
            },
            {
              "@type": "FAQPage",
              "@id": `${pageUrl}#faq`,
              mainEntity: socialFaqs.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            },
          ],
        }}
      />
      <EnginePage />
    </>
  );
}
