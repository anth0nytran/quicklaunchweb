import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
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

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/success', '/cancel'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
