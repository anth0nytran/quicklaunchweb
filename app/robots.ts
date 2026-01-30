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
          // Block static assets that shouldn't be indexed
          '/_next/static/',
          '/*.woff2',
          '/*.woff',
          '/*.ttf',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

