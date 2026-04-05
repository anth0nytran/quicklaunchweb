import { StructuredData } from "@/components/seo/StructuredData";
import {
  absoluteUrl,
  organizationId,
  siteName,
  siteSupportEmail,
  siteUrl,
  websiteId,
} from "@/lib/seo";

export function SiteStructuredData() {
  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": organizationId,
            name: siteName,
            url: siteUrl,
            email: siteSupportEmail,
            description: "The system that keeps your phone ringing. Show up on Google, Maps, and AI search. Missed calls get texted back. Reviews build on autopilot. Free website included.",
            founder: {
              "@type": "Person",
              name: "Anthony Tran",
            },
            logo: {
              "@type": "ImageObject",
              url: absoluteUrl("/icon.jpg"),
            },
            contactPoint: [
              {
                "@type": "ContactPoint",
                contactType: "customer support",
                email: siteSupportEmail,
                url: absoluteUrl("/support"),
              },
            ],
            sameAs: [],
          },
          {
            "@type": "WebSite",
            "@id": websiteId,
            url: siteUrl,
            name: siteName,
            description: "More jobs. Zero ads. The system that keeps local businesses' phones ringing.",
            publisher: {
              "@id": organizationId,
            },
            inLanguage: "en-US",
          },
        ],
      }}
    />
  );
}
