import { serviceAreas } from "@/components/site-footer";
import { allGuides } from "@/lib/guides";

// /llms.txt: a plain-markdown map of the site for LLM agents and AI crawlers.
// Built from the same data the pages use, so it never drifts. Facts here must be
// real. Client ad numbers are intentionally not published.
// Note: as of 2026 no major AI engine has confirmed it uses llms.txt for ranking;
// this is cheap insurance and helps agentic browsers, not a ranking lever.

export const dynamic = "force-static";

const site = "https://quicklaunchweb.us";

export function GET() {
  const body = `# QuickLaunchWeb

> QuickLaunchWeb is a Houston, Texas marketing agency for home service businesses (roofers, HVAC, plumbers, electricians, painters, remodelers, fencing, insulation). We run Facebook and Instagram (Meta) ads and short-form video, follow up on every lead in seconds, and our team can qualify leads and book the estimate. We measure ourselves in booked jobs and revenue, not lead counts. We work with one business per trade per area.

- Location: Houston, TX (service-area business)
- Service area: ${serviceAreas.join(", ")}, and the rest of the Houston metro
- Phone / text: +1-832-552-3458
- Website: ${site}
- Founder: Anthony Tran
- How to start: book a free strategy call on the website.

## Services

- [Houston Growth Engine](${site}/houston-growth-engine): flagship done-for-you system. Short-form video, Meta ads aimed at bigger jobs, instant lead follow-up, lead qualifying and appointment setting, CRM follow-up.
- [Facebook & Instagram ads for contractors](${site}/services/facebook-ads): Meta ads run in the client's own ad account, with lead follow-up.
- [Video marketing for contractors](${site}/services/video-production): on-the-job filming turned into short-form videos and video ads.
- [AI Search & SEO](${site}/services/web-design): local SEO, Google Maps / Google Business Profile, and AI search (ChatGPT, Perplexity, Gemini) visibility packages with a fast website.
- [Automations & Software](${site}/services/automations): CRM setup, AI receptionist, missed-call text back, review requests, custom apps.
- [All services](${site}/services)

## Guides

${allGuides
  .map((g) => `- [${g.title}](${site}/guides/${g.slug}): ${g.metaDescription}`)
  .join("\n")}

## Optional

- [Support](${site}/support)
- [Privacy](${site}/privacy)
- [Terms](${site}/terms)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
