import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Use canonical domain (without www)
  const siteUrl = 'https://quicklaunchweb.us';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/success',
          '/cancel',
          '/demo',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

