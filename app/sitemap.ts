import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Ensure HTTPS and correct domain
  let siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://quicklaunchweb.us";
  
  // Force HTTPS if not already
  if (siteUrl.startsWith("http://")) {
    siteUrl = siteUrl.replace("http://", "https://");
  }
  
  // Ensure we're using the correct domain
  if (!siteUrl.includes("quicklaunchweb.us")) {
    siteUrl = "https://quicklaunchweb.us";
  }

  const routes = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${siteUrl}/support`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  return routes;
}
