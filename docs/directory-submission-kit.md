# Directory & citation submission kit (free listings)

Why: AI engines (ChatGPT, Perplexity, Google AI Overviews) mostly cite **third-party lists and directories** for "best agency in Houston" questions, not agency homepages. Each listing is also a free backlink and an entity signal.

**Use identical business info (NAP) everywhere.** It must match the Google Business Profile exactly.

After each profile goes live, paste its URL into `sameAsProfiles` in `lib/seo.ts`. That ties every profile to the same entity in the site's schema.

---

## Copy-paste info

- **Business name:** QuickLaunchWeb
- **Phone:** (832) 552-3458
- **Website:** https://quicklaunchweb.us
- **City:** Houston, TX (service-area business, no street address shown)
- **Founder:** Anthony Tran
- **Email:** *(pick one and use it everywhere: support@quicklaunchweb.us or the Gmail in site schema; see note at bottom)*
- **Service area:** Houston, Katy, Cypress, Spring, The Woodlands, Sugar Land, Pearland, Baytown, Conroe, Humble, Pasadena, League City, Missouri City, Richmond, Tomball
- **Industries served:** Home services, construction and contractors (roofing, HVAC, plumbing, electrical, remodeling, painting, fencing, insulation)
- **Services:** Facebook and Instagram advertising, video production, social media marketing, lead qualification and appointment setting, CRM automation, local SEO

**Short description (≈150 chars):**
> Houston marketing agency for home service businesses. We film you on the job, run your Facebook and Instagram ads, and book the estimates for you.

**Long description (≈600 chars):**
> QuickLaunchWeb is a Houston marketing agency that only works with home service businesses: roofers, HVAC, plumbers, electricians, remodelers, painters, fencing and insulation companies. We film the owner and crew on real Houston jobs and turn it into short videos and Facebook and Instagram ads aimed at homeowners in the areas they want. Every lead gets a text in seconds, and our team can call, qualify, and book the estimate on the owner's calendar. Ads run in the client's own ad account. We measure our work in booked jobs and revenue, not likes, and we work with one business per trade per area.

---

## Priority order (all free tiers)

| # | Site | Why | Notes |
|---|---|---|---|
| 1 | **Google Business Profile** | #1 local signal | Primary category: *Marketing agency*. Secondary: *Advertising agency*, *Social media agency*, *Video production service*. Check the live category list. |
| 2 | **Clutch** (clutch.co) | Appeared in every Houston AI query we tested | Free profile. Reviews are the lever, so ask 3 clients to do the Clutch phone/online review. |
| 3 | **Semrush Agency Partners** (agencies.semrush.com) | Has a "Home services · Houston" list | Free for Semrush users. |
| 4 | **Expertise.com** | Ranks "best Houston social media marketing" | Request consideration for the Houston *social media marketing* and *advertising agencies* categories. |
| 5 | **UpCity** | Houston agency lists | Free profile. |
| 6 | **DesignRush** | Houston and Texas lists | Free tier only. Skip paid placement. |
| 7 | **Bing Places** | Feeds Bing and ChatGPT search | Import from Google Business Profile. |
| 8 | **Apple Business Connect** | Siri / Apple Maps | Free. |
| 9 | **LinkedIn company page** + your personal profile | Entity and founder (E-E-A-T) | Put "Founder, QuickLaunchWeb (Houston)" in your headline. |
| 10 | **Yelp for Business** | Citation consistency | Free listing. |
| 11 | **BBB** (free listing, not accreditation) | Trust citation | |
| 12 | **Houston-area chambers** (Greater Houston Partnership, Katy, Tomball, Cy-Fair) | Chamber news posts rank locally | Membership costs money, so this one's optional. |
| 13 | **YouTube channel** | #1 cited domain in AI Overviews | One long-form video per guide. Use chapters and link the guide in the description. |

## Earned mentions (no signup)
- Webtonic's "best roofing/HVAC marketing agencies in Houston" lists say they require trade work on your site plus a Houston address. You now have trade guides, so email them and ask to be considered.
- Answer contractor questions on Reddit (r/Roofing, r/HVAC, r/sweatystartup) under your name. Be useful and don't spam links.
- Offer to be a guest on Houston contractor or home service podcasts.

## Note: email consistency
Site schema (`lib/seo.ts` → `siteSupportEmail`) currently uses a Gmail address. Your account email is support@quicklaunchweb.us. Pick one for every listing, then update `siteSupportEmail` to match.
