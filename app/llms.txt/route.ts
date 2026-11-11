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

> QuickLaunchWeb is a Houston, Texas marketing agency for home service businesses (roofers, HVAC, plumbers, electricians, painters, remodelers, fencing, insulation). We run Facebook and Instagram (Meta) ads, Google Ads, and short-form video, follow up on every lead in seconds, and our team qualifies leads and books the estimate. We guarantee booked estimates (the number is set on the free plan call based on the trade; if it isn't hit in 90 days, we keep working free until it is). We work with one business per trade per area.

- Location: Houston, TX (service-area business)
- Service area: ${serviceAreas.join(", ")}, and the rest of the Houston metro
- Phone / text: +1-832-552-3458
- Website: ${site}
- Founder: Anthony Tran
- How to start: get a free local ad plan on the website (a 30-minute call). It is a full audit: competitors' ads on Facebook, Instagram, and Google, a map of where the business's best jobs come from, job math with a channel recommendation by trade and budget, and the first 3 ads written. The plan is the owner's to keep.
- Contract: pay 90 days up front and the setup fee is waived, or go month to month with a setup fee and cancel anytime.

## Services

- [Houston Growth Engine](${site}/houston-growth-engine): flagship done-for-you system, started as a 90-Day Booked Jobs Launch. Short-form video filmed on the job, Meta and Google ads chosen by trade and budget, instant lead follow-up, lead qualifying and appointment setting, CRM follow-up. Booked estimates guaranteed.
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
