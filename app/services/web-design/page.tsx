import type { Metadata } from "next";
import WebServicePage from "@/components/pages/web-service-page";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  absoluteUrl,
  buildPageMetadata,
  organizationId,
  websiteId,
} from "@/lib/seo";

const pagePath = "/services/web-design";
const pageUrl = absoluteUrl(pagePath);
const pageTitle = "AI Search & SEO for Houston Contractors | QuickLaunchWeb";
const pageDescription =
  "Get found on Google, Google Maps, and AI assistants like ChatGPT when Houston homeowners search for a contractor. Local SEO plus a fast website. Book a free call.";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: pageTitle,
    description: pageDescription,
    path: pagePath,
  }),
  keywords: [
    "ai search optimization for contractors",
    "houston local seo for contractors",
    "local seo for contractors",
    "show up in chatgpt for local business",
    "contractor website design",
    "website for home service business",
    "missed call text back",
    "google business profile automation",
    "houston web design",
  ],
};

export default function WebDesignServicePage() {
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
              name: pageTitle,
              description: pageDescription,
              isPartOf: { "@id": websiteId },
              about: { "@id": organizationId },
              breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
            },
            {
              "@type": "Service",
              "@id": `${pageUrl}#service`,
              name: "AI search and SEO for Houston home service businesses",
              serviceType: "Local SEO, AI search optimization, and web design",
              description: pageDescription,
              provider: { "@id": organizationId },
              areaServed: {
                "@type": "Place",
                name: "Houston, Texas and surrounding areas",
              },
              offers: {
                "@type": "Offer",
                priceCurrency: "USD",
                price: "99",
                url: pageUrl,
                availability: "https://schema.org/InStock",
              },
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${pageUrl}#breadcrumb`,
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
                  name: "Services",
                  item: absoluteUrl("/services"),
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "AI Search & SEO",
                  item: pageUrl,
                },
              ],
            },
          ],
        }}
      />
      <WebServicePage />
    </>
  );
}
