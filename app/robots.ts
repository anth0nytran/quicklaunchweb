import { MetadataRoute } from 'next';

// Private/transactional routes that no crawler should index.
const privatePaths = [
  '/api/',
  '/success',
  '/cancel',
  '/demo',
  '/instagram/booked',
  '/call-booked',
  '/sms-consent',
];

// Search + AI answer-engine crawlers we explicitly WANT (visibility in ChatGPT,
// Perplexity, Claude, Gemini/AI Overviews, Copilot, Apple Intelligence, Meta AI).
// A crawler that matches a named group ignores the '*' group, so each group
// repeats the same disallow list.
const aiAndSearchBots = [
  'Googlebot',
  'Google-Extended',
  'Bingbot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'Applebot',
  'Applebot-Extended',
  'meta-externalagent',
  'DuckAssistBot',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  // Use canonical domain (without www)
  const siteUrl = 'https://quicklaunchweb.us';

  return {
    rules: [
      {
        userAgent: aiAndSearchBots,
        allow: '/',
        disallow: privatePaths,
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: privatePaths,
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
