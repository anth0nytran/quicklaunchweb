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
          },
          {
            "@type": "WebSite",
            "@id": websiteId,
            url: siteUrl,
            name: siteName,
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
