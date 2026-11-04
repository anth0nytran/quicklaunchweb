import type { Metadata } from "next";
import HomePage from "@/components/pages/home-page";
import { StructuredData } from "@/components/seo/StructuredData";
import { socialFaqs } from "@/lib/socialFaqData";
import { absoluteUrl, buildPageMetadata, organizationId, websiteId } from "@/lib/seo";


const pagePath = "/";
const pageUrl = absoluteUrl(pagePath);
const pageTitle =
  "Houston Facebook Ads & Video for Contractors | QuickLaunchWeb";
const pageDescription =
  "Facebook and Instagram ads, contractor video, and social media marketing for Houston home service businesses. Live in 7 days. Leads go straight to your phone, or our team calls them and books the estimate.";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: pageTitle,
    description: pageDescription,
    path: pagePath,
  }),
  keywords: [
    "facebook ads for contractors houston",
    "meta ads agency houston",
    "contractor video marketing houston",
    "houston social media marketing",
    "social media marketing for contractors",
    "home service marketing houston",
    "done for you social media management",
    "facebook ads for contractors houston",
    "instagram marketing for home services",
    "lead generation for contractors houston",
    "appointment setting for home services",
    "roofing marketing houston",
    "hvac marketing houston",
  ],
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
              name: pageTitle,
              description: pageDescription,
              isPartOf: { "@id": websiteId },
              about: { "@id": organizationId },
            },
            {
              "@type": "Service",
              "@id": `${pageUrl}#social-media-marketing`,
              name: "Facebook ads, video, and social media marketing for home service businesses",
              serviceType: "Meta paid advertising, video production, and social media marketing",
              description: pageDescription,
              provider: { "@id": organizationId },
              areaServed: [
                "Houston", "Katy", "Cypress", "Spring", "The Woodlands", "Sugar Land",
                "Pearland", "Baytown", "Conroe", "Humble", "Pasadena", "League City",
                "Missouri City", "Richmond", "Tomball",
              ].map((city) => ({
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
                name: "Social media growth system",
                itemListElement: [
                  "Short-form video and static ad creative production and posting",
                  "Meta and Instagram paid advertising management",
                  "Social profile and Google Business Profile rebuild",
                  "Automated lead follow-up and review generation",
                  "Optional lead calling, qualification, and appointment setting",
                ].map((name) => ({
                  "@type": "Offer",
                  itemOffered: { "@type": "Service", name },
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
      <HomePage />
    </>
  );
}
