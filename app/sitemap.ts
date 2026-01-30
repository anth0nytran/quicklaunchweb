import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Use canonical domain (without www) - hardcoded to avoid env var issues
  const siteUrl = 'https://quicklaunchweb.us';

  // Current date for lastModified (can be customized per route)
  const now = new Date();

  // Core pages - highest priority
  const corePages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/support`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Guide hub and individual guides
  const guidePages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/guides`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // High-priority guides (pillar content)
    {
      url: `${siteUrl}/guides/why-website-not-getting-customers`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/guides/how-to-get-more-customers-website`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/guides/do-you-need-a-website`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Standard guides
    {
      url: `${siteUrl}/guides/monthly-website-plan-whats-included`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/guides/pay-monthly-web-design-vs-upfront`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/guides/wix-vs-hiring-someone-to-build-website`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/guides/what-pages-business-website-needs-to-convert`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/guides/can-a-website-really-be-built-in-48-hours`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/guides/launch-website-fast-checklist`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Legal pages - lower priority but still important for trust
  const legalPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  return [...corePages, ...guidePages, ...legalPages];
}
