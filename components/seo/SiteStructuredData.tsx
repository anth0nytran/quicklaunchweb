import { StructuredData } from "@/components/seo/StructuredData";
import { serviceAreas } from "@/components/site-footer";
import {
  absoluteUrl,
  founderId,
  organizationId,
  sameAsProfiles,
  siteLocality,
  siteName,
  sitePhone,
  siteSupportEmail,
  siteUrl,
  websiteId,
} from "@/lib/seo";

// Site-wide entity graph. Organization + ProfessionalService (a LocalBusiness
// subtype) so Google, Bing and AI engines see one consistent Houston entity.
// Service-area business: no street address is published, only the locality.
export function SiteStructuredData() {
  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": ["Organization", "ProfessionalService"],
            "@id": organizationId,
            name: siteName,
            url: siteUrl,
            email: siteSupportEmail,
            telephone: sitePhone,
            description:
              "Houston marketing agency for home service businesses. Facebook and Instagram ads, short-form video, lead follow-up, and appointment setting, measured in booked jobs and revenue.",
            slogan: "Booked jobs and revenue for Houston home service businesses. Not just leads.",
            address: { "@type": "PostalAddress", ...siteLocality },
            areaServed: serviceAreas.map((city) => ({
              "@type": "City",
              name: city,
              containedInPlace: { "@type": "State", name: "Texas" },
            })),
            knowsAbout: [
              "Facebook ads for contractors",
              "Meta advertising for home service businesses",
              "Instagram ads",
              "Short-form video marketing for contractors",
              "Lead qualification and appointment setting",
              "CRM automation and lead follow-up",
              "Local SEO and AI search optimization",
            ],
            founder: { "@id": founderId },
            logo: {
              "@type": "ImageObject",
              url: absoluteUrl("/icon.png"),
            },
            image: absoluteUrl("/og-image.png"),
            contactPoint: [
              {
                "@type": "ContactPoint",
                contactType: "customer support",
                email: siteSupportEmail,
                telephone: sitePhone,
                url: absoluteUrl("/support"),
                areaServed: "US-TX",
                availableLanguage: ["English"],
              },
            ],
            ...(sameAsProfiles.length ? { sameAs: sameAsProfiles } : {}),
          },
          {
            "@type": "Person",
            "@id": founderId,
            name: "Anthony Tran",
            jobTitle: "Founder",
            image: absoluteUrl("/home/anthony.jpg"),
            worksFor: { "@id": organizationId },
            homeLocation: { "@type": "City", name: "Houston" },
          },
          {
            "@type": "WebSite",
            "@id": websiteId,
            url: siteUrl,
            name: siteName,
            description:
              "Facebook ads, video, and lead follow-up for Houston home service businesses, plus guides on contractor marketing.",
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
