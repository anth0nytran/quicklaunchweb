import type { Metadata } from "next";
import HomePage from "@/app/page";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  absoluteUrl,
  buildPageMetadata,
  organizationId,
  websiteId,
} from "@/lib/seo";

const pagePath = "/houston-web-design-for-contractors";
const pageUrl = absoluteUrl(pagePath);
const pageTitle = "Houston Web Design for Contractors | QuickLaunchWeb";
const pageDescription =
  "Houston web design for contractors and home service businesses. Built in 48 hours to help you get more calls. $0 upfront.";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: pageTitle,
    description: pageDescription,
    path: pagePath,
  }),
  keywords: [
    "houston web design for contractors",
    "houston contractor web design",
    "websites for houston contractors",
    "houston home service web design",
    "houston contractor website",
  ],
};

export default function HoustonWebDesignForContractorsPage() {
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
              isPartOf: {
                "@id": websiteId,
              },
              about: {
                "@id": organizationId,
              },
              breadcrumb: {
                "@id": `${pageUrl}#breadcrumb`,
              },
            },
            {
              "@type": "Service",
              "@id": `${pageUrl}#service`,
              name: "Houston web design for contractors",
              description:
                "Websites for Houston contractors and home service businesses that help people call and ask for quotes.",
              serviceType: "Houston web design for contractors",
              provider: {
                "@id": organizationId,
              },
              areaServed: [
                {
                  "@type": "City",
                  name: "Houston",
                },
                {
                  "@type": "AdministrativeArea",
                  name: "Texas",
                },
              ],
              audience: {
                "@type": "BusinessAudience",
                audienceType: "Contractors and home service businesses",
              },
              url: pageUrl,
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
                  name: "Houston Web Design for Contractors",
                  item: pageUrl,
                },
              ],
            },
          ],
        }}
      />
      <HomePage />
    </>
  );
}
