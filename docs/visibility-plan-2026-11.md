# QuickLaunchWeb Visibility Plan (Nov 2026)

**Goal:** get quicklaunchweb.us found by cold traffic on Google Search, Google Maps / GBP, Bing, and AI answer engines (ChatGPT, Perplexity, Gemini / AI Overviews, Claude, Copilot).
**Priority (owner, Nov 2026):** Meta ads + video ads that turn into revenue. Primary terms are *Facebook ads for contractors Houston*, *Meta ads for home service businesses*, *video marketing for roofers / HVAC / plumbers Houston*, and *best Facebook ads agency Houston*. SEO-package keywords are secondary.
**Source of truth:** the repo at `C:\Users\antho\Desktop\Work\quicklaunchweb`, verified against the live site on 2026-11-06.

---

## 0. The short answer to "SEO/AEO agencies automate this, why can't we?"

**We can, and we should automate most of it.** What agencies actually automate is the *mechanical* 70%:

| Agencies automate | Tool they use | We can do it with |
|---|---|---|
| Rank + Maps grid tracking | BrightLocal, Local Falcon | BrightLocal (~$39+/mo) or Local Falcon credits |
| AI citation tracking (does ChatGPT name us?) | Profound, Peec, Otterly | Otterly Lite (~$29/mo) **or** our own n8n job hitting the OpenAI / Perplexity / Gemini / Claude APIs weekly (section 5) |
| Citation / directory submission | BrightLocal Citation Builder, Whitespark, Yext | BrightLocal Citation Builder (pay per citation, one-time) |
| GBP posts, photo uploads, Q&A | GHL Social Planner, GBP API | GHL (already in stack) or GBP API `localPosts` |
| Content drafts + refreshes | AI writers | Scheduled Claude agent that opens a PR against `lib/guides.ts` |
| Technical monitoring | Screaming Frog / Sitebulb schedules | A small script / scheduled agent (section 5) |
| Outreach prospect lists + first drafts | Pitchbox, Respona | n8n + Claude drafting into a sheet |
| Reporting | Looker Studio | GSC + GA4 + tracker sheet |

The part that **cannot** be automated without getting penalized or ignored is the *trust* layer:

- real reviews from real clients
- editorial mentions a human journalist or list-maker chose to give
- podcast and partner relationships
- first-hand expertise in the content

Agencies that claim to "automate links" are almost always reselling PBN or guest-post networks, or spamming directories. Google's 2026 spam updates (March, June and August) targeted exactly that, plus scaled AI location pages. So the model is **machines do the research, drafting, queuing and tracking, and Anthony does a short daily approval block (about 30 minutes)**.

**Hormozi filter:**

- *Wins on:* speed, by reusing what we already have. The first-party Meta data in `lib/adResults.ts` is the one asset competitors can't copy. Leading with it is "proof is the bottleneck" and "turn delivery into content."
- *Do more of fewer things:* the plan concentrates on the Meta / video money pages plus one linkable data asset. It does not spread across 50 directories and 12 more website guides.
- *Lead magnet:* the Houston CPL benchmark page should carry a "get your trade's numbers on a call" CTA. Offer copy is left to the other agent.
- *Violates:* the current guide library mostly sells the *old* offer ("without paying for ads", "$99/mo websites"). It contradicts the flagship and dilutes topical authority for Meta / video.

---

## 1. Audit: current on-site state

### 1.1 Critical findings

| # | Finding | Evidence | Severity | Status |
|---|---|---|---|---|
| A1 | **Every canonical, og:url and JSON-LD @id on the live site is `http://` while the site 308-redirects to `https://`.** Google gets a canonical pointing at a redirect, and AI engines get inconsistent entity IDs. | `curl https://quicklaunchweb.us/houston-growth-engine` → `rel="canonical" href="http://quicklaunchweb.us/houston-growth-engine"`. Same on `/`, guides and services. Cause: the Vercel env var `NEXT_PUBLIC_SITE_URL` is set to `http://quicklaunchweb.us`. | **Critical** | **Fixed in code** (`lib/seo.ts` forces https for non-local hosts). **Also fix the env var in Vercel** to `https://quicklaunchweb.us`. |
| A2 | Organization schema described the **old offer**: "Free website included", and the WebSite said "More jobs. Zero ads." That contradicts the Meta-ads flagship and confuses entity understanding. | `components/seo/SiteStructuredData.tsx` | High | **Fixed** (new neutral description from existing footer positioning) |
| A3 | No LocalBusiness signals in schema: no telephone, no locality, no areaServed, no founder Person node, and `sameAs: []`. | same file | High | **Fixed** (ProfessionalService + phone + Houston locality + 15 service-area cities + Person). `sameAs` is now driven by `sameAsProfiles` in `lib/seo.ts` and stays empty until real profiles exist. |
| A4 | Guide Article `author` was the Organization, not a Person. This is weak for E-E-A-T. | `components/seo/GuideStructuredData.tsx` | Medium | **Fixed** (author = Person "Anthony Tran", `#founder`) |
| A5 | No `/llms.txt`. | live returned 404 | Low (no engine has confirmed it uses llms.txt) | **Added** (generated from site data, includes the first-party CPL facts) |
| A6 | robots.txt allowed all bots only via `*`. AI bots were allowed, but nothing was explicit. | `app/robots.ts` | Low | **Made explicit** (GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Claude-SearchBot, Google-Extended, Applebot-Extended, meta-externalagent, CCBot and others, each group repeating the private disallows) |
| A7 | Sitemap `lastModified` was the build time for every URL. Google learns to ignore a lastmod that changes on every deploy. | `app/sitemap.ts` | Low | **Fixed for guides** (uses each guide's `updated` month) |
| A8 | No IndexNow. Bing powers ChatGPT search and Copilot results, so fast Bing indexing matters more in 2026. | none | Medium | **Added** key file + `tools/seo/indexnow.mjs` (not run) |
| A9 | **Search Console and Meta event exports are publicly served** from `/public`. | `https://quicklaunchweb.us/google_search_console_exports/Chart.csv` → 200 | Medium (data is aggregate, but it shouldn't be public) | **Not changed.** Move `public/google_search_console_exports/` and `public/meta_events_csv_data/` outside `public/` (e.g. `data/`). Nothing in the code references them. |

### 1.2 Content and topical authority (the biggest strategic gap)

- **12 guides, and 0 are about Meta ads or video.** All 12 target websites, SEO and "no ads" topics. Two pillars actively argue *against* paid ads ("How to Get More Contractor Leads **Without Ads**", "Contractor Lead Machine… Without Paying for Ads"). The site is telling Google and LLMs that QuickLaunchWeb is a website / "no ads" company while selling Meta ads.
- The only GSC data in the repo (Jan–Feb 2026 export) confirms this. Every query is "done for you website", "monthly web design" and similar, with **zero Meta / Facebook / video queries**. (Interesting side signal: position 1 for "seo services 77493" and "web development 77493", which are Katy zip queries. Local relevance is already registering.)
- Money-page depth is about 1,200–1,500 words each, including nav and footer:
  - `/services/facebook-ads` ≈ 1,330
  - `/services/video-production` ≈ 1,180
  - `/houston-growth-engine` ≈ 1,490

  None of them link to any guide except `/guides` from the nav, because no Meta / video guides exist to link to.
- **Unsourced statistics in guides** reduce trust with AI engines, which cross-check claims:
  - "78% of jobs go to whoever responds first"
  - "$1,200 avg missed call"
  - "45% of consumers use AI tools… up from 6%"
  - "4–23x higher conversion"
  - "FAQ schema… 28% more likely in AI Overviews"

  `lib/guides.ts` contains **zero outbound source links**. Either cite a primary source for each claim or remove it.
- **First-party data is the best AEO asset we own and it is underused.** `lib/adResults.ts` holds 6 Houston accounts, $23,368 in spend and 312 Meta leads. Cost per lead by trade:

  | Trade | CPL |
  |---|---|
  | Insulation | ~$29 |
  | Fencing | ~$30 |
  | Electrical | ~$60 |
  | Roofing | ~$94 |
  | Painting | ~$110–119 |

  This exact kind of specific, dated, local number is what AI engines quote. It is currently only shown as a small card and one FAQ answer.

### 1.3 Other on-site notes

- **Keyword cannibalization:** the home page title is "Houston Facebook Ads & Video for Contractors". That competes with `/services/facebook-ads` ("Facebook Ads for Contractors in Houston") for the same term. *Recommendation:* the home page targets the brand plus "Houston home service marketing agency", and `/services/facebook-ads` owns the Facebook terms. Not changed, because it borders on offer copy owned by the other agent.
- The same FAQPage (`socialFaqs`) is emitted on both `/` and `/houston-growth-engine`. Duplicate FAQ entities are minor, but give each page its own FAQ set.
- **No About / founder page.** For E-E-A-T, build `/about` with Anthony's bio and photo, LinkedIn, "why Houston home services", and the client roster that is already public on the site. Then point the Person `url` and `sameAs` at it.
- **NAP:**
  - The phone is consistent (832-552-3458) and is now in schema.
  - The email is inconsistent: `anthotranllc@gmail.com` in schema, privacy and support, vs `support@quicklaunchweb.com` on `/instagram`, which is a *different domain* (.com vs .us).
  - **Decide on one email.** Ideally a domain email on quicklaunchweb.us. Use it everywhere, including GBP and directories.
  - No street address is published. That is fine for a service-area business: GBP should be set as SAB with the address hidden.
- **OG image:** every page uses `/icon.jpg` declared as 1200×630. Verify the real dimensions and make a proper 1200×630 share card, ideally one per money page.
- **Good already:**
  - Pages are server-rendered, so AI crawlers get full text without JavaScript.
  - Service schema with areaServed exists on all money pages.
  - FAQPage, Breadcrumb and Article schema exist on guides.
  - www → apex redirect is correct.
  - All AI bots return 200 (no WAF blocking).

---

## 2. Research: what moves AEO / GEO and local SEO in 2026

1. **AI engines cite third parties far more than brand sites.**
   - ChatGPT leans on Wikipedia and reference sources.
   - Perplexity leans on Reddit (~47% of top citations in Profound's 30M-citation study), YouTube, and Yelp.
   - Google AI Overviews lean on Reddit, YouTube and Quora, and mirror the underlying SERP.

   *Implication:* for "best Facebook ads agency Houston", the citable sources are the listicles (Clutch, Expertise.com, Influencer Marketing Hub, Krowdbase, DesignRush, agency-written "top X" posts), Reddit threads and YouTube videos. Our own page alone will not be named.

2. **ChatGPT local answers run mostly through Bing.** Yelp signed a licensing deal with OpenAI (Aug 2026). Facebook reviews are the largest review source on Bing Places (Whitespark). *Implication:* Bing Places + Yelp + Facebook reviews + IndexNow are cheap and high-leverage.

3. **Whitespark 2026 Local Search Ranking Factors** added an "AI search visibility" category:
   - On-page / website signals weigh more for AI visibility (~24%) than GBP does (~12%).
   - Citations and links roughly double in weight compared with the local pack.
   - Inclusion on curated "best of" lists is a top factor.

4. **llms.txt** has real adoption but no measured citation effect. Google says it doesn't use it, and most files get zero requests. We added it because it is free and generated automatically. Do not spend more time on it.

5. **Programmatic location × trade pages** were a named target of the March 2026 core update and the June / August 2026 spam updates (scaled content abuse and doorway pages). City-swapped pages and pages for areas or trades you don't actually serve are the classic hit pattern. *Implication:* build trade pages **only for trades where we have real accounts and data** (roofing, painting, electrical, fencing, insulation). Do not build city × trade grids.

6. **Digital PR:** HARO's ecosystem fragmented. The 2026 working set is Qwoted, Featured (formerly Terkel), Source of Sources (free, from HARO's founder) and Help a B2B Writer. Pitches that include **original data** win, which is what our CPL dataset is.

7. **National Meta CPL benchmarks** exist but are inconsistent: WordStream Home & Home Improvement lead campaigns ≈ $41; vendor 2026 HVAC blended ≈ $45; roofing $40–80. *Implication:* a page that publishes **real Houston, per-trade numbers with methodology** is a better and more citable answer than what exists. That is the linkable asset.

8. **GBP API `localPosts.create`** still works in 2026 and added recurring posts. GHL can also post to GBP, so posting can be automated.

9. **Meta Business Partner directory** needs meaningful managed spend and certifications. It is a 90-day+ goal, not Week 1. Meta Certified Media Buying Professional is the step to take now.

---

## 3. Keyword → page map (Meta / video first)

| Priority | Query cluster | Target page (exists?) | Gap / action |
|---|---|---|---|
| P1 | facebook ads for contractors houston · facebook ads agency houston · meta ads agency houston | `/services/facebook-ads` ✅ | Add a "Houston cost per lead by trade" table (from `adResults`). Link to the benchmark guide and 2 trade guides. Expand FAQs with "what to expect month 1–3". Fix the home-page cannibalization (1.3). |
| P1 | meta ads for home service businesses · facebook ads for home services | `/services/facebook-ads` + **new guide** | New pillar guide: *"Meta Ads for Home Service Businesses: How It Actually Works (with Houston numbers)"* |
| P1 | facebook ads cost per lead contractors · how much do facebook leads cost roofers | **new** `/guides/houston-facebook-ads-cost-per-lead` | **Linkable asset.** Per-trade table, methodology, date, national benchmarks cited and contrasted, refreshed monthly by automation. |
| P1 | video marketing for contractors houston · contractor videography houston · video ads for roofers / HVAC / plumbers | `/services/video-production` ✅ | Add an embedded real client video (with VideoObject schema) and a "what we film" shot list. New guide: *"Contractor Video Ads That Turn Into Booked Jobs"*. Start a YouTube channel (AI Overviews cite YouTube heavily). |
| P1 | best facebook ads agency houston · top meta ads agency houston | Off-site listicles + own `/guides/how-to-choose-a-facebook-ads-agency-houston` | Own page = honest "12 questions to ask / red flags" checklist. It ranks for the long tail and gets quoted. The "best" head term is won by getting **on** Clutch, Expertise, IMH, Krowdbase and DesignRush (section 6). |
| P2 | facebook ads for roofers houston · painters · electricians · fencing · insulation | **new** trade sections or pages (only trades with data) | One page per trade *with that trade's real CPL, creative examples and FAQs*. No HVAC or plumbing pages until there is an account. Use guides citing external data instead. |
| P2 | contractor marketing houston · home service marketing houston · appointment setting for contractors | `/houston-growth-engine` ✅ | Add a "how a lead becomes a booked job" funnel section with real stage metrics once tracked (lead → contacted → booked → sold). Give it its own FAQ set. |
| P2 | facebook ads vs angi vs thumbtack vs google LSA | **new guide** | Comparison table (ownership, exclusivity, cost model, speed). High AI-citation format. |
| P3 | AI search / SEO / website terms (existing guides) | `/services/web-design` + 12 guides | Keep. Reframe the two "without ads" pillars so they don't contradict the flagship. Source or remove the unsourced stats. |

**Guide briefs (write in this order).** Each one needs a 40–60 word direct answer under the H1, a table, dated first-party numbers, cited sources, Person author, FAQ (3–5) and links to the money page.

1. Houston Facebook Ads Cost Per Lead by Trade (Nov 2026 data from 6 local accounts)
2. How Much Should a Houston Contractor Spend on Facebook Ads? (budget → expected leads → booked jobs math, using our CPLs)
3. Contractor Video Ads That Turn Into Booked Jobs: 10 formats we film (real examples)
4. Facebook Ads vs Angi vs Thumbtack vs Google LSA for Houston Contractors
5. How to Choose a Facebook Ads Agency in Houston: 12 questions and red flags
6. Meta Ads for Home Service Businesses: the full system (pillar; links 1–5)
7. Speed to Lead for Contractors: what happens to a Facebook lead in the first 5 minutes

Only publish booked-job or close-rate numbers once they are actually tracked. No invented figures.

---

## 4. Prioritized plan

Legend:
- **Impact:** H / M / L
- **Effort:** S = under 2 hours, M = half a day to 2 days, L = 3+ days
- **Auto:** ✅ automatable · ◐ partly (drafted or queued automatically, a human approves or sends) · ❌ human

### Week 1: quick wins

| # | Action | Impact | Effort | Auto | How |
|---|---|---|---|---|---|
| 1 | Set Vercel `NEXT_PUBLIC_SITE_URL=https://quicklaunchweb.us`, deploy the code fixes in this PR, and confirm canonicals are https. | H | S | ✅ | Vercel env + deploy. A monitor script checks canonicals weekly (5.6). |
| 2 | Move the GSC and Meta CSV exports out of `/public`. | M | S | ❌ | `git mv public/google_search_console_exports data/…` |
| 3 | **GBP:** confirm or claim. Primary category "Marketing agency", secondaries "Advertising agency" and "Internet marketing service". Service-area business with the 15 cities. Services list mirroring the 3 offers. 10+ real photos. Add the share URL to `sameAsProfiles`. | H | M | ◐ | Human setup. Weekly posts automated later (5.4). |
| 4 | **Bing Places** (import from GBP) + **Apple Business Connect**. | H | S | ❌ | 30 min total. This is the ChatGPT / Copilot / Siri pipeline. |
| 5 | **Review push:** ask the 8 named clients (South Coast, Jerry's, Tex Mex Roofing, JN Ornamental, Solivance, The Greatest Insulation, Vences, MJB) for a Google review now. Ask 3 of them for a Clutch review next. | H | S | ◐ | GHL review-request workflow sends the link; Anthony asks personally first. **Never write or incentivize reviews.** |
| 6 | Submit sitemap in **Google Search Console + Bing Webmaster Tools**, then run `node tools/seo/indexnow.mjs`. | M | S | ✅ | Script added; can be chained to deploys (5.6). |
| 7 | Core profiles: LinkedIn company page, Anthony's LinkedIn (headline: "Facebook ads + video for Houston home service businesses"), Facebook page, Instagram, YouTube channel. Use the same name, phone, URL and one-line description everywhere. Add each URL to `sameAsProfiles`. | H | M | ❌ | Entity consistency is the foundation for AI recommendations. |
| 8 | Start AI-visibility baseline: run the 25 prompts in 5.3 once by hand or in Otterly, and record who gets named and cited. | M | S | ✅ | Becomes a weekly job. |
| 9 | Sign up as a source on **Qwoted, Featured, Source of Sources, Help a B2B Writer**. Profile: "Houston Meta ads for home services, first-party CPL data." | M | S | ◐ | Digest emails feed the outreach triage (5.5). |

### 30 days

| # | Action | Impact | Effort | Auto | How |
|---|---|---|---|---|---|
| 10 | **Publish the Houston CPL benchmark guide** (brief #1) + a downloadable CSV. | H | M | ◐ | Claude drafts from `lib/adResults.ts`; Anthony adds context and approves. Monthly refresh automated (5.2). |
| 11 | Upgrade `/services/facebook-ads` and `/services/video-production`: CPL table, real video embed + VideoObject schema, internal links to the new guides, per-page OG image. | H | M | ◐ | Repo PR. |
| 12 | Clutch profile (Facebook Advertising + Social Media Marketing, Houston) + DesignRush + UpCity + GoodFirms + Sortlist. Same description and NAP. | H | M | ❌ | Clutch only ranks with verified reviews, so pair it with #5. |
| 13 | Data-driven citations: BrightLocal Citation Builder (~top 30–40 US + Houston sources) or a manual pass of Yelp, BBB, Nextdoor, Alignable, Manta, Foursquare, Hotfrog, Chamber listings. | M | S | ✅ | BrightLocal does submission and tracks NAP. |
| 14 | Join 1–2 chambers where buyers are (Katy Area, Cy-Fair Houston, Tomball, or Pearland). Member listing + member news posts with links. One chamber already hosts an agency's "are Facebook ads worth it" article. | M | M | ❌ | Show up in person (Hormozi: "rooms where your buyers are"). |
| 15 | Publish guides #2 and #3. Reframe the two "without ads" pillars. Source or remove unsourced stats. | H | M | ◐ | Content engine PRs (5.1). |
| 16 | Start the YouTube channel: 1 short per week from real client shoots (with permission). Title it with the query, e.g. "What a Facebook lead costs a Houston roofer". | M | M | ◐ | AI Producer / Higgsfield edit pipeline already available. Human approves. |
| 17 | Reddit: Anthony's real account answers r/FacebookAds, r/PPC, r/Roofing, r/HVAC, r/smallbusiness questions with data. **No links for the first 30 days, and disclose affiliation.** | M | S/wk | ◐ | n8n monitors keywords and drafts answers; a human posts. |

### 60 days

| # | Action | Impact | Effort | Auto | How |
|---|---|---|---|---|---|
| 18 | **Digital PR with the dataset:** pitch "What Houston contractors pay per Facebook lead" to Houston Business Journal, Houston Chronicle business desk, Community Impact (Katy, Cy-Fair, Sugar Land editions), and trade press (Roofers Coffee Shop, Contracting Business, ACHR News, Remodeling). | H | M | ◐ | Claude builds the media list and drafts personalized pitches; Anthony sends from his own inbox. |
| 19 | Get on the "best" listicles: request inclusion or editorial review at Expertise.com (Houston social media marketing), Influencer Marketing Hub (Houston Facebook agencies), Krowdbase (roofing social ads Houston), and agency-written "top Houston Facebook agencies" posts that our prompt tracker shows are being cited. | H | M | ◐ | The tracker's "cited domains" list *is* this queue. |
| 20 | Podcast guesting (2/month): Plumbing & HVAC Hustle (Hook Agency), The Successful Contractor (CertainPath), The Home Service Expert, To The Point, Roofers Coffee Shop shows. Topic: "Meta ads that turn into booked jobs, with real numbers." | H | M | ◐ | Claude drafts pitches from recent episodes; a human sends and records. Each episode yields a show-notes link + clips. |
| 21 | Trade pages for the 5 trades with data (roofing, painting, electrical, fencing, insulation). Each has unique CPL, creative examples and FAQs. **No city × trade grids.** | M | M | ◐ | Generated from data, then hand-edited. Kill any page without unique facts. |
| 22 | Guides #4 and #5 (comparison table; "how to choose an agency"). | M | M | ◐ | Content engine. |
| 23 | Free tool: **"Facebook Ads Budget → Booked Jobs Calculator"** (inputs: trade, budget, avg ticket; uses our CPL ranges). | H | M | ❌ build / ✅ run | Linkable asset + lead magnet + quotable. Coordinate with the offer agent on the CTA. |

### 90 days

| # | Action | Impact | Effort | Auto | How |
|---|---|---|---|---|---|
| 24 | Case studies (when clients OK it): cost per **booked job** and revenue, with names and photos. Add Review/Testimonial content *only on the page, not as self-serving review schema*. | H | M | ❌ | This is the biggest proof gap. |
| 25 | Supplier / hub partnerships: Houston branches of roofing and paint supply houses (ABC Supply, SRS, Beacon / QXO, Sherwin-Williams Pro), adjusters, BNI chapters. Offer a "Facebook ads for contractors" lunch-and-learn and ask to be listed as a resource. | H | L | ❌ | Hormozi "partner with hubs" 20x lever. Links follow relationships. |
| 26 | Speaking: UH SBDC, SCORE Houston, GHBA associate events. Speaker pages link back. | M | M | ❌ | |
| 27 | Meta Certified Media Buying Professional (Anthony), then the Meta Business Partner application when spend qualifies. | M | M | ❌ | Partner directory listing = high-trust citation. |
| 28 | Second dataset refresh + press re-pitch ("Q1 2027 update"). Wikidata item only once 2–3 independent press mentions exist (notability). | M | S | ✅ / ❌ | Refresh is automated; the Wikidata decision is human. |
| 29 | Footer credit on client sites we actually built ("Website by QuickLaunchWeb", brand anchor, on the home page only). | L–M | S | ❌ | Real relationships only. No exact-match sitewide anchors. |

---

## 5. The automated "visibility engine"

```
             ┌──────────── INPUTS ────────────┐
 GSC + Bing WMT API   Meta Ads API (client CPLs)   AI prompt tracker results   PR digests (Qwoted/SOS/Featured)
        │                     │                            │                          │
        ▼                     ▼                            ▼                          ▼
  [5.1 Content engine]  [5.2 Data refresher]       [5.3 AI-citation tracker]   [5.5 Outreach triage]
  weekly Claude agent   monthly job → PR           weekly n8n job → Sheet      daily n8n + Claude
  → draft guide PR      updates adResults.ts       "cited domains" list ──────► outreach queue (Sheet)
        │                     │                            │                          │
        └──────► HUMAN REVIEW (Anthony, ~30 min/day: merge PRs, approve pitches, send) ◄┘
                              │
                              ▼
          deploy (Vercel) → [5.6 IndexNow + tech monitor] → [5.4 GBP/social post from new content]
```

### 5.1 Content engine (scheduled Claude agent, weekly)

- **Trigger:** `/schedule` cloud routine, Mondays.
- **Inputs:** the latest GSC queries (impressions with position 8–30 = "striking distance"), the prompt tracker's "we're not named" prompts, and the brief backlog in section 3.
- **Output:** a branch + PR that adds or refreshes one `Guide` object in `lib/guides.ts`. Each guide has a direct-answer intro, a table, FAQ, sources and internal links to the money page.
- **Guardrails written into the prompt:**
  - no invented stats
  - every number either from `lib/adResults.ts` or cited with a URL
  - `updated` field set
  - one guide per week maximum
- **Human:** adds a first-hand paragraph (a real client story) and merges. *Cadence beats volume.*

### 5.2 First-party data refresher (monthly)

- Pulls lifetime spend and leads per managed account from Meta (the Meta Ads MCP / Marketing API is already connected in this environment).
- Opens a PR updating `lib/adResults.ts` and the benchmark guide's `updated` date.
- When booked-job tracking exists in GHL, it adds cost per booked job.
- The PR description lists deltas so Anthony can sanity-check before merge.

### 5.3 AI-citation tracker (weekly, n8n)

- **Prompts** (start with 25):
  - "best facebook ads agency in Houston"
  - "facebook ads for contractors houston"
  - "who runs meta ads for roofers in houston"
  - "how much does a facebook lead cost for a roofer in houston"
  - "video marketing company for contractors houston"
  - "marketing agency for HVAC companies houston"
  - "appointment setting service for contractors houston"
  - "is angi worth it for contractors vs facebook ads"
  - plus trade variants (roofer, painter, electrician, plumber, HVAC, remodeler, fencing) and suburb variants (Katy, Cypress, Sugar Land, The Woodlands)
- **Engines:**
  - OpenAI Responses API with web search
  - Perplexity Sonar API
  - Gemini with Google Search grounding
  - Claude with the web search tool
  - optionally Otterly Lite (~$29/mo) as a cross-check for ChatGPT UI and AI Overviews
- **Parse:** (a) is "QuickLaunchWeb" / quicklaunchweb.us mentioned, (b) position in any list, (c) **every cited domain**.
- **Store:** Google Sheet (the repo already has `lib/google-sheets.ts` patterns) with a weekly diff.
- **Key output:** "domains AI engines cite for our money prompts, that don't mention us". That list feeds straight into the outreach queue (5.5). This is the loop agencies charge for.

### 5.4 GBP + social posting (weekly)

- When a guide merges or a client video is approved, Claude writes a 150–300 word GBP update + CTA and a short social caption.
- It posts via GHL Social Planner (supports GBP) or the GBP API `localPosts.create` (needs Business Profile API access approval).
- Monthly photo uploads come from real shoots. GBP Q&A is seeded with real FAQs from sales calls.
- **Human:** one-click approve in GHL. Never post stock or AI images as "our work".

### 5.5 Outreach / PR triage (daily)

- An n8n Gmail trigger reads Qwoted, SOS, Featured and Help a B2B Writer digests.
- Claude scores each query for relevance (home services, contractors, Meta / Facebook ads, small-business marketing, Houston, video marketing) and drafts a 120-word expert answer using our data.
- It posts the top 3 to Slack or email, and Anthony edits and submits **from his own account**.
- The same queue holds listicle-inclusion requests, podcast pitches, and chamber / partner follow-ups, each with a Claude-drafted personalized note referencing a specific article or episode.
- Status columns: prospect → drafted → sent → replied → won (URL).

### 5.6 Deploy hook + technical monitor

- **On every production deploy** (GitHub Action or Vercel deploy webhook → n8n), run `node tools/seo/indexnow.mjs` with the changed URLs.
- **Weekly checks:**
  - all sitemap URLs return 200
  - canonical == https self
  - JSON-LD parses
  - robots still allows the AI bots
  - `/llms.txt` returns 200
  - no `noindex` on money pages
- **Alerts** go to email. This would have caught A1 months ago.

### What must stay human (non-negotiable)

- **Reviews:** only real clients, never incentivized, never written for them, no review-gating.
- **Sending outreach:** from Anthony's real inbox, personalized, low volume. Automated mass link-request blasts get ignored and burn the domain.
- **Reddit / community posts:** real account, disclosed affiliation, value first.
- **First-hand content:** the client stories, photos and video in every guide.
- **Partnerships, podcasts, chambers, speaking.**

**Never do:** buy links, PBNs or guest-post packages, link exchanges at scale, fake listicles on owned microsites, city × trade doorway pages, AI-generated "reviews" or testimonials, self-serving review schema, or paid "best agency" badges presented as editorial.

---

## 6. Backlink, citation and mention targets (ranked)

Ranked by relevance to Meta / video + Houston, AI-citation likelihood, and effort. URLs were verified as real sites; check each one's current submission terms.

| Rank | Target | URL | Type | Why / note |
|---|---|---|---|---|
| 1 | Google Business Profile | https://business.google.com | Entity / Maps | Foundation for Maps + Gemini. |
| 2 | Bing Places | https://www.bingplaces.com | Entity | Feeds Bing, Copilot and ChatGPT local answers. |
| 3 | Clutch (Facebook Advertising, Houston + Social Media Marketing, Houston) | https://clutch.co/agencies/social-media-marketing/houston | Review directory | Clutch pages rank for "best facebook ads agency houston" and get cited by AI. Needs verified client reviews. |
| 4 | Expertise.com: Houston social media marketing | https://www.expertise.com/tx/houston/social-media-marketing | Editorial "best of" | Curated list (25+ variables). Request a review; can't buy in. |
| 5 | Influencer Marketing Hub: Top Facebook Marketing Agencies in Houston | https://influencermarketinghub.com/facebook-marketing-agencies-houston | Listicle | Exact head-term listicle. Request inclusion with data. |
| 6 | Krowdbase: social media advertising companies for roofing contractors, Houston | https://www.krowdbase.com/top-social-media-advertising-companies-for-roofing-contractors-houston | Niche listicle | Exactly our niche × city. |
| 7 | Yelp for Business | https://biz.yelp.com | Entity / reviews | OpenAI licensing deal (Aug 2026). |
| 8 | Facebook Page (with reviews/recommendations on) | https://www.facebook.com/business | Entity / reviews | Largest review source on Bing Places; also on-brand for a Meta agency. |
| 9 | LinkedIn company page + Anthony's profile | https://www.linkedin.com/company/setup/new/ | Entity | sameAs + E-E-A-T. |
| 10 | YouTube channel | https://www.youtube.com | Entity / content | AI Overviews and Perplexity cite YouTube heavily. Video agency without a channel is a gap. |
| 11 | Apple Business Connect | https://businessconnect.apple.com | Entity | Siri / Apple Maps / Apple Intelligence. |
| 12 | DesignRush: Houston social media agencies | https://www.designrush.com/agency/social-media-marketing/texas/houston | Directory | Free listing; ranks for agency terms. |
| 13 | Qwoted | https://www.qwoted.com | PR | Journalist requests. Pitch the CPL data. |
| 14 | Source of Sources | https://sourceofsources.com | PR | Free. |
| 15 | Featured | https://featured.com | PR | Expert Q&A → publisher links. |
| 16 | Help a B2B Writer | https://helpab2bwriter.com | PR | Marketing / B2B angles. |
| 17 | Plumbing & HVAC Hustle podcast (Hook Agency) | https://hookagency.com | Podcast | Listed as accepting guest pitches. |
| 18 | The Successful Contractor Podcast (CertainPath) | https://podcasts.apple.com/us/podcast/id1507789555 | Podcast | Residential HVAC / plumbing / electrical / roofing owners. |
| 19 | The Home Service Expert Podcast | https://podcasts.apple.com/us/podcast/id1341478446 | Podcast | Home-service owners. |
| 20 | To The Point: Home Services Podcast | https://podcasts.apple.com/us/podcast/to-the-point-home-services-podcast/id1496811695 | Podcast | Marketing + ops for HVAC / plumbing / roofing. |
| 21 | Roofers Coffee Shop | https://www.rooferscoffeeshop.com | Trade media / community | Contributor content, directory, podcasts. Roofing is a core trade. |
| 22 | Houston Business Journal | https://www.bizjournals.com/houston | Local press | Data-driven local business story. |
| 23 | Community Impact (Houston-area editions) | https://communityimpact.com | Hyperlocal press | Covers local business; suburb editions match the service area. |
| 24 | Houston Chronicle (business) | https://www.houstonchronicle.com/business/ | Local press | Dataset pitch; also contributes to the entity. |
| 25 | BBB of Greater Houston & South Texas | https://www.bbb.org/local-bbb/bbb-of-greater-houston-and-south-texas | Trust directory | Accreditation is optional; the profile still counts. |
| 26 | UpCity | https://upcity.com | Directory | Agency marketplace, ranks for city + service. |
| 27 | GoodFirms | https://www.goodfirms.co | Directory | Agency directory. |
| 28 | Sortlist | https://www.sortlist.com | Directory | Agency directory. |
| 29 | Greater Houston Builders Association (associate member) | https://ghba.org | Trade association | ~1,600 member companies (builders, remodelers, associates). Member directory + events. |
| 30 | Local chambers: Tomball (example of member news posts), Katy Area, Cy-Fair Houston, Pearland | https://business.tomballchamber.org · https://katychamber.com · https://www.cyfairchamber.com · https://www.pearlandchamber.org | Local association | Member listing + news posts + in-person room with buyers. Pick 1–2. |
| 31 | UH Small Business Development Center | https://www.sbdc.uh.edu | Speaking | Workshop / speaker page. |
| 32 | SCORE Houston | https://www.score.org/houston | Speaking | Guest workshop on Facebook ads for trades. |
| 33 | Nextdoor Business | https://business.nextdoor.com | Entity | Local trust signal. |
| 34 | Alignable | https://www.alignable.com | Local B2B network | Houston SMB owners; referral network. |
| 35 | Crunchbase | https://www.crunchbase.com | Entity | Organization record used by knowledge graphs. |
| 36 | Meta Business Partners directory | https://www.facebook.com/business/marketing-partners | Entity (90d+) | Needs spend + certifications. Very high trust for Meta queries. |
| 37 | Wikidata | https://www.wikidata.org | Entity (later) | Only after independent press exists, otherwise it gets deleted for notability. |
| 38 | Reddit (r/FacebookAds, r/PPC, r/Roofing, r/HVAC, r/smallbusiness, r/houston) | https://www.reddit.com | Community | Not for links. Perplexity / AIO cite Reddit heavily. Participate honestly. |

Also verify and add trade associations whose Houston-chapter URLs I could not confirm: **ACCA Greater Houston** (HVAC), **NARI Greater Houston** (remodelers), and the roofing contractors association of Texas. Join only if Anthony will attend events.

---

## 7. Files changed in this pass (not committed)

| File | Change |
|---|---|
| `lib/seo.ts` | `siteUrl` forces `https://` for non-local hosts (fixes live http canonicals / og:url / @ids). Added `sitePhone`, `siteLocality`, `sameAsProfiles` (empty: add real profile URLs as they go live), `founderId`. |
| `components/seo/SiteStructuredData.tsx` | Organization → `["Organization","ProfessionalService"]` with phone, Houston locality, 15-city areaServed, knowsAbout, slogan, founder Person node, conditional sameAs. Replaced the stale "Free website included" / "Zero ads" descriptions with neutral Meta / video positioning taken from the existing footer line. |
| `components/seo/GuideStructuredData.tsx` | Article author = Person (Anthony Tran, `#founder`) instead of the Organization. |
| `app/robots.ts` | Explicit allow group for search + AI crawlers (same private disallows), plus the `*` group. |
| `app/sitemap.ts` | Guide `lastModified` uses each guide's real `updated` month. |
| `app/llms.txt/route.ts` (new) | Static `/llms.txt` generated from services, guides, service areas and `lib/adResults.ts` totals / CPL range. |
| `public/f308dc1248c030835cbcd90b925641c6.txt` (new) | IndexNow key file. |
| `tools/seo/indexnow.mjs` (new) | IndexNow submitter (whole sitemap or given paths). **Not run.** Run after deploy. |

**Verified:** `next build` passes with `NEXT_PUBLIC_SITE_URL=http://quicklaunchweb.us`. The built HTML shows `canonical https://…`, the new Organization / ProfessionalService graph and the Person author, and robots.txt / llms.txt / sitemap.xml render as expected.

**Owner to-dos the code can't do:**
1. Set the Vercel env var to https.
2. Move the CSV exports out of `public/`.
3. Pick one business email.
4. Fill `sameAsProfiles` as profiles go live.
5. Run IndexNow after deploy.

---

## Sources

- Search Engine Roundtable: ChatGPT mostly sources Wikipedia, AI Overviews mostly Reddit: https://www.seroundtable.com/chatgpt-google-aio-sources-39578.html
- Ahrefs / Profound citation studies (via Digital Thrive summary): https://digitalthriveai.com/en-gb/resources/ai-and-automation/top-10-most-cited-domains-ai-assistants/
- Digital Applied: AI search citation analysis Q2 2026: https://www.digitalapplied.com/blog/ai-search-citation-analysis-q2-2026-domains-ranked
- Whitespark: Local Search Ranking Factors 2026: https://whitespark.ca/local-search-ranking-factors/
- Whitespark: review sites that matter for ChatGPT: https://whitespark.ca/blog/want-to-rank-in-chatgpt-focus-on-these-review-sites-new-research/
- Local Falcon: ChatGPT local search data sources: https://www.localfalcon.com/blog/chatgpt-local-search-data-sources-where-does-business-info-come-from
- MarTech: Yelp brings reviews and local leads to ChatGPT: https://martech.org/yelp-brings-reviews-and-local-leads-to-chatgpt/
- PPC Land: llms.txt adoption rises but 97% of files get zero AI requests: https://ppc.land/llms-txt-adoption-rises-8-8x-but-97-of-files-get-zero-ai-requests/
- Pixelmojo: Google says you don't need llms.txt: https://www.pixelmojo.io/blogs/google-says-you-dont-need-llms-txt
- Digital Applied: programmatic SEO after March 2026: https://www.digitalapplied.com/blog/programmatic-seo-after-march-2026-surviving-scaled-content-ban
- Digital Shift Media: Google June 2026 spam update and home services: https://digitalshiftmedia.com/search-intelligence/google-june-2026-spam-update-home-services/
- Seoteric: Google August 2026 spam update: https://www.seoteric.com/googles-august-2026-spam-update-impact-and-recovery-guidance/
- Google Business Profile API `localPosts.create`: https://developers.google.com/my-business/reference/rest/v4/accounts.locations.localPosts/create
- Prezly: HARO alternatives 2026: https://www.prezly.com/academy/the-best-haro-alternatives
- Backlinko: HARO alternatives: https://backlinko.com/haro-alternatives
- AI visibility tool pricing 2026: https://www.ud.hk/en/blogs/insight/article/ai-visibility-tool-pricing-2026-09-03 and https://dupple.com/blog/best-ai-search-visibility-tools-2026
- LocaliQ home services benchmarks: https://localiq.com/blog/home-services-advertising-benchmarks/
- WebTonic HVAC Facebook ads statistics 2026: https://www.webtonic.io/blog/hvac-facebook-ads-statistics
- Meta Business Partner overview (secondary): https://www.stackmatix.com/blog/meta-business-partner-program
- Influencer Marketing Hub, Houston Facebook agencies: https://influencermarketinghub.com/facebook-marketing-agencies-houston
- Krowdbase, Houston roofing social ads companies: https://www.krowdbase.com/top-social-media-advertising-companies-for-roofing-contractors-houston
- Tomball Chamber member news example: https://business.tomballchamber.org/news/details/adim-media-are-facebook-ads-worth-it-for-a-houston-area-service-business-09-11-2025
- Podcast guest listings: https://www.podengine.ai/podcasts/plumbing-and-hvac-hustle-podcast · https://podcasts.apple.com/us/podcast/id1507789555
- GHBA: https://ghba.org/belong

*Caveat:* most 2026 percentages above come from vendor or agency studies with differing methods. Treat them as directional, not as figures to quote on the site.
