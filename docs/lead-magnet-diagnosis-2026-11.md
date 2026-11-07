# Lead Magnet & Cold-Traffic Diagnosis — QuickLaunchWeb

**Date:** 2026-11-06
**Scope:** Diagnosis and plan only. No site code was changed.
**Lens:** `~/.claude/HORMOZI_PRINCIPLES.md` (60-Second Build Checklist)
**Priority (from the owner):** "Push Meta ads and video ads that turn those videos into actual revenue." Everything below is ranked by how well it **proves video + Meta ads turn into booked jobs and revenue**, not views or lead counts.

> **Honesty rule for this doc:** Numbers marked **(est.)** are planning assumptions, not measured facts. Swap in real numbers as soon as you have them. The only real performance data in the repo is `lib/adResults.ts`: lifetime Meta spend and lead counts for 6 client accounts, pulled 2026-10-22.

---

## 0. Hormozi checklist callout (summary)

| # | Checklist item | Current site | After this plan |
|---|---|---|---|
| 1 | Faster / less risky / easier | **Easier** (done for you, ~1 hr/week) and **faster** ("Live in 7 days") are both claimed. **Risk** is the weak vector: no guarantee (by choice), 90-day ask, no proof. | Risk gets reduced without a guarantee: a free sample ad they keep, real ad-account numbers, they own the ad account, a reporting sample, a founding-client program. |
| 2 | Comparable? | Partly. "Booked jobs, not leads" is a good change of unit, but nothing on the site *shows* that unit yet (no cost-per-booked-estimate anywhere). | Sell "cost per booked estimate" and "revenue per $1 of ad spend," and show a sample report. |
| 3 | Lead magnet / reason to give contact info | **Fails.** Every CTA is "Book a Free Strategy Call," which works like "Request a quote." | Free Sample Ad (trial of the solution) plus a Video-to-Revenue Teardown (reveals a problem). |
| 4 | Discount big enough | n/a | The sample ad is 100% off one step of the Engine (a splinter offer). |
| 5 | Fix order | Traffic would hit a funnel that drops anonymous leads (see D2). | Fix the conversion leaks first, then spend. |
| 6 | Speed to lead ≤60s | **Fails.** The qualifier never asks for phone or email, so you can't contact anyone fast. | GHL SMS within 60s of any form submit. |
| 7 | VSL / pre-education | **Missing.** | A 5–7 min founder VSL, texted after booking. |
| 11 | Tracked to a booked job / $ | Client-side `fbq('Schedule')` only. Nothing past the booking. | Pixel + CAPI, plus a CRM offline upload of Qualified, Won and Revenue. |

---

## 1. Diagnosis: what exists and how a cold visitor moves through it

### The journey today
**Land** (home `/`, `/houston-growth-engine`, `/services/*`, `/guides/*`) → **Trust** (client name list, one quote, "Case Studies Coming Soon") → **Act** (one action only: the 5-question qualifier in `components/discovery-call.tsx`, then the Calendly 15-min call).

### What lead magnets / entry offers exist
| Asset | Where | Verdict |
|---|---|---|
| "Book a Free Strategy Call" | Every page, `CtaBand`, hero, results section | A direct CTA. Hormozi: it "only reaches the warmest sliver." Cold Facebook traffic won't book a sales call with an agency it has never heard of and that shows no results. |
| 5-question qualifier → Calendly | `components/discovery-call.tsx` | Good idea, but it **collects zero contact info**. `sendPartialLead()` emails the answers through Web3Forms with no name, phone or email. Anyone who answers all 5 questions and then doesn't book is gone for good. This is the single biggest leak. |
| Free "online presence audit" | `app/instagram/booked/page.tsx` → `/api/instagram/checklist` → Google Sheet tab "IG Audit Leads" | The only real lead magnet on the site, and it's buried **after** someone has already booked. It asks for email + GBP link, and fulfillment is manual. It can't pull in cold traffic. |
| `/instagram` funnel ("We already built your website. Want to see it?") | `app/instagram/page.tsx`, **still in `app/sitemap.ts`** | The strongest Hormozi mechanic on the site (a free sample, revealed on a call), but it sells the **old** website offer, with a crossed-out $ value stack. It's off-positioning now. **Reuse the mechanic for ads.** |
| Guides (12) | `/guides`, `lib/guides.ts` | "Reveal a problem" content, but every CTA points to `/services/web-design#pricing` (the $99 SEO line, not the Engine). There's no capture, and none are about video or Meta ads. Several stats have no visible source ("$1,200 avg cost of missed call", "78% of jobs go to whoever responds first"). Unsourced stats hurt trust with skeptical owners. Cite them or cut them. |
| Self-serve Stripe checkout | `/services/web-design` | Fine for the $99–$399 line. It doesn't help the Engine. |

### Grade against the value equation (Engine page)
| Lever | Grade | Why |
|---|---|---|
| Dream outcome | **B+** | "Booked Jobs. Bigger Tickets. Real Revenue." is right and in their words. |
| Perceived likelihood | **D** | `ResultsSection` literally says "Case Studies Coming Soon," on both the home page and the Engine page (`ResultsStatCard`). The nav's "Clients" link lands on it. The client list shows names with blank results. This is the empty, templated section the owner dislikes, and it tells a cold visitor "no proof yet." Meanwhile `lib/adResults.ts` holds **real** numbers that go unused: 6 accounts, $23,368 spend, 312 Meta leads, $29–$119 per lead by trade. |
| Time delay | **B** | "Live in 7 days" and "leads in the first week" are both claimed. The FAQ is honest that month 1 is for dialing in. |
| Effort & sacrifice | **A-** | Done for you, ~1 hour the first week, no camera required. |
| CTA clarity | **C** | One clear CTA, but a high-commitment ask for cold traffic. There's no low-commitment step that's still high-value. |
| Proof | **D** | One quote (JN Ornamental). The web-design quotes on `/instagram` are about websites, not ads. There's no video of the founder, the team, the process, or a real ad you made. Odd for a company that sells video. |

### Diagnosis in 5 bullets
1. **No cold-traffic lead magnet.** The only entry is "Book a Free Strategy Call," a direct CTA that only converts people who already trust you.
2. **The qualifier leaks every non-booker.** It collects no name, phone or email, so speed-to-lead and follow-up are impossible. Fix this before spending a dollar on ads (Hormozi fix order: conversion before traffic).
3. **The proof section advertises a lack of proof.** "Case Studies Coming Soon" sits on the two most important pages, while real ad-account data and client relationships go unused.
4. **A video company with no video.** No founder video, no VSL, no sample ad, no behind-the-scenes. The product you sell is the proof you're missing.
5. **No revenue tracking past the booking.** Only a client-side `Schedule` pixel event fires. There's no CAPI on bookings, no CRM-stage or closed-revenue uploads, and no sample client report. "Booked jobs, not leads" is claimed but never shown.

---

## 2. Brainstorm: entry offers ranked by "proves video → revenue"

Scoring is 1–5 on each axis. **Total = Proves video→revenue × Trust × Ease to consume × Ease to deliver × Leads to call** (max 3,125).

| Rank | Idea | Type | Proves V→R | Trust | Consume | Deliver | → Call | Total |
|---|---|---|---|---|---|---|---|---|
| 1 | **Free Sample Ad: "We'll make your next Facebook video ad. Keep it."** | Trial / splinter | 5 | 5 | 5 | 3 | 5 | **1,875** |
| 2 | **Video-to-Revenue Teardown** (personalized 5-min video: competitor Meta ads in their trade + area, their own profiles, the after-the-lead test, 3 fixes) | Reveal a problem | 5 | 5 | 4 | 4 | 4 | **1,600** |
| 3 | Competitor Ad Library Report only (who's running Meta ads in their trade + zip, offers, ad age) | Reveal | 4 | 4 | 4 | 5 | 4 | 1,280 |
| 4 | Speed-to-lead test ("We submitted your form at 8:40pm. Here's what happened.") | Reveal | 3 | 5 | 5 | 4 | 4 | 1,200 |
| 5 | Revenue-per-video calculator (ticket × close rate × booked estimates → break-even ad spend per video) | Tool | 4 | 2 | 5 | 5 | 3 | 600 |
| 6 | Free 14-day missed-call text-back + instant lead reply | Trial (Automations) | 2 | 4 | 4 | 4 | 4 | 512 |
| 7 | "30 Houston ad hooks that book estimates" swipe file, by trade | Give secrets | 3 | 3 | 4 | 5 | 2 | 360 |
| 8 | Monthly live "Houston Contractor Ad Teardown" (FB/IG Live, owners submit their ads) | Content / event | 4 | 4 | 2 | 4 | 3 | 384 |
| 9 | Free 7-day GBP fix | Trial (SEO line) | 1 | 5 | 5 | 3 | 4 | 300 |
| 10 | AI-search check ("Does ChatGPT recommend you?") | Reveal (SEO line) | 1 | 3 | 5 | 5 | 3 | 225 |
| 11 | Houston Home-Services Meta Ad Cost Benchmark (from your own accounts, with permission) | Reveal / data | 4 | 4 | 3 | 5 | 2 | 480 |
| 12 | Quarterly giveaway: "Win 3 months of video ads," and every entrant gets a free sample hook script | Attraction mechanism | 3 | 2 | 4 | 4 | 4 | 384 |
| 13 | Free half-day shoot for founding clients (see §5) | Pilot | 5 | 5 | 3 | 2 | 5 | 750 (limited slots) |

**Notes on the ranking:**
- #3 and #4 are **components of #2**. Build them as modules and reuse them (standalone for cold outreach, bundled for paid traffic).
- #5 (the calculator) is a supporting widget on both #1 and #2 pages, not a standalone magnet.
- #9 and #10 belong to the AI Search & SEO line. Keep them, but they don't prove video → revenue, so they're not the front door for the Engine.
- #11: six accounts is a small sample. If you publish it, say so plainly ("6 Houston accounts, lifetime, as of Oct 2026").
- **Speed-to-lead test ethics:** only do this with consent (the owner requested the teardown and is told "we'll test your line within 24 hours"). For cold outreach, a plain after-hours call to see who answers is fine. Do **not** pose as a homeowner or submit fake job requests to non-consenting businesses.
- **Ad Library API caveat:** Meta's Ad Library API returns full data only for political/issue ads (and EU ads). US commercial ads are visible in the Ad Library **UI**, not the API. Use a scraper actor (e.g., Apify "Facebook Ad Library" actors) or a manual pass. Verify current terms before automating.

---

## 3. Top 2 specs

### Lead Magnet #1: Free Sample Ad ("Your Next Ad, Free. Keep It Either Way.")
**Why it wins:** It's Hormozi lead-magnet type 2/3: a trial of the actual product, one step of the Engine given away free. It's also "the best lead magnets are things other people charge for." It reuses the proven `/instagram` mechanic ("we already built it, want to see it?") for the offer you sell now. And it's the most direct proof possible that you can make a video that sells *their* work.

**URL:** `/free-ad` (one per trade later: `/free-ad/roofing`, etc., with the same template and a different hero line and examples)

**Page copy outline**
- **Eyebrow:** For Houston home service businesses
- **Headline:** "Houston [Roofers]: We'll Make Your Next Facebook Video Ad. Free. You Keep It."
- **Sub:** "Text us 5–10 photos or clips from your phone. In 3 business days we'll show you a finished 20-second ad built to book bigger jobs, plus the math on how many booked estimates it would take to pay for itself."
- **Bullets:**
  - Made from *your* real jobs, not stock footage
  - Written for the jobs you want more of (replacements, full projects, higher-end zips)
  - Comes with 3 hook variations to test
  - The break-even math for your ticket size: how many booked estimates it needs to pay off
  - Yours to keep, whether you work with us or not
- **Scarcity (true, enforce it):** "We make 5 per week, and only one business per trade per area. If your trade in your area is taken, we'll tell you."
- **CTA:** "Claim My Free Ad"
- **Below the fold:** a 60–90s founder video (who we are, why free, what happens next), 2–3 real sample ads you made for current clients (with permission), real numbers from `adResults.ts` by trade, labeled as Meta lead counts with the date, and a 4-question FAQ (Why free? Do I have to be on camera? What's the catch? Who owns it?).
- **"What's the catch?" answer (honest risk reversal, no guarantee):** "We show it to you on a 20-minute call and walk through how we'd run it. If you want us to run it, great. If not, you keep the files. No contract talk unless you ask."

**Form (minimal, 4 fields + consent)**
1. First name
2. Business name (Google Places autocomplete, which gives you address, phone, website, rating and review count for free)
3. Trade (dropdown, same values as `QUESTIONS[0]`)
4. Mobile number
5. SMS consent checkbox (A2P 10DLC / TCPA language, same as the existing `/sms-consent` page)

Then the **thank-you page** runs the remaining 4 qualifier questions (area, source, revenue, bottleneck). The answers attach to the contact. Calendly is embedded as the "Ad Reveal Call" (20 min), with name, phone and email prefilled and the UTMs passed through, the same pattern as `calendlyUtm` in `discovery-call.tsx`.

**Automated fulfillment flow (n8n + GHL + Claude)**
1. **Webhook** (form submit) → create a GHL contact and an opportunity in the "Sample Ad" pipeline, stage *Requested*. Store fbp, fbc, fbclid, utm_* and ad_id (needed for revenue attribution, see §4.6).
2. **≤60s SMS** from a local Houston number: "Hey {first}, Anthony from QuickLaunchWeb. Got your request for the free ad. Reply here with 5–10 photos or short clips of your best recent jobs (before/after is gold). Then grab a time to see it: {calendly}"
3. **CAPI `Lead` event** server-side (dedupe with the browser event_id; reuse `lib/meta/conversions.ts`).
4. **Enrich** through the Places API: categories, rating, review count, top review text. Review quotes can become ad text overlays, but get the client's OK.
5. **MMS photos arrive** → GHL stores them → n8n moves them to a client folder → stage *Assets In*.
6. **Claude step:** input is trade, service area, reviews, photo descriptions (vision) and target job type from the qualifier. Output is 3 hook scripts (0–3s hook, body, CTA after second 3), on-screen captions, and the ad primary text plus headline.
7. **Render** through a template-based video API (Creatomate or Shotstack; or the Higgsfield / AI Producer tools already connected for polish), 9:16, 15–25s, captions burned in, optional AI voiceover or music only.
8. **Human QA, 15–30 min (est.):** you or an editor watch it, fix it, pick the best hook.
9. **Mockup** in a Facebook/IG feed frame, plus a one-page "break-even sheet": ticket size × close rate → booked estimates needed to cover an example spend. It's built from *their* answers on the call, so it isn't a promise.
10. Stage *Ready*. The ad is revealed live on the call, and the files are sent right after regardless of outcome.

**Estimated human time per sample:** 30–60 min (est.). At 5 per week, that's 3–5 hours. Cap it there until close rates are known.

**Follow-up sequence (stop on booking; SMS from a real local number, AI drafts and a human approves)**
| When | Channel | Message intent |
|---|---|---|
| T+0 | SMS + email | Confirm, ask for photos, booking link |
| T+2h (no photos) | SMS | "No photos handy? Send your Facebook page link and we'll use what's there." |
| T+1 day (not booked) | Call (SDR/Ryan) | Book the reveal call, confirm area/trade availability |
| T+2 days | SMS | Send a 20-second preview frame or screenshot of their ad in progress ("here's the hook we're testing for you") |
| T+4 days | Email | Founder video: how a 20-second video becomes a booked estimate (the process walk-through) |
| T+7 days | SMS | "Your ad's ready. I'll hold it until Friday, then it goes to the next roofer on the list in {area}." (Only if true.) |
| Monthly | Email | Houston ad teardown newsletter (keeps the non-buyers warm) |

**After booking:** SMS the VSL ("watch before we talk, it'll save us 15 minutes"), send reminders at 24h and 1h, and fire a server-side `Schedule` event through a Calendly webhook (today it's only the browser `fbq` call in `discovery-call.tsx`).

**On the call:** reveal the ad → run the break-even math with their real ticket size → "Want us to run it? Here's what the Engine adds: more videos, ads, instant follow-up, our team booking the estimates." Present the price live (never by email).

---

### Lead Magnet #2: Video-to-Revenue Teardown (personalized 5-min video)
**Why:** "Reveal a problem," aimed at the video → revenue gap. It's cheaper to deliver than #1, so it scales to cold outreach where #1 can't. It doubles as the "give" in cold email and DMs.

**URL:** `/teardown`
**Headline:** "See What the [Roofers] Getting Jobs From Facebook in [Katy] Are Doing, and What You're Missing."
**Sub:** "A 5-minute video made for your business: the Meta ads your local competitors are running right now, how your page and profiles look to a homeowner, and what happens when a lead comes in after hours. Three fixes, ranked by revenue."
**Bullets:**
- Every competitor in your trade + area running Facebook/IG ads, their offers, and how long each ad has been running (a long-running ad is usually a paying one; that's a signal, not proof)
- Your video gap: what you have, what's missing, what homeowners see first
- The after-the-lead test: we submit your website form after hours (with your OK) and time the response
- The 3 fixes, ranked by booked jobs
**CTA:** "Get My Teardown"
**Form:** first name, business (Places autocomplete), trade, mobile, SMS consent.

**Fulfillment (mostly automated)**
1. Webhook → GHL contact → SMS ≤60s ("Your teardown is building. You'll get it within 1 business day.").
2. n8n: Places enrich → competitor list (Places "roofer near {city}" top 5) → Ad Library scrape (Apify) for each competitor and the prospect: active ad count, formats (video vs. image), start dates, offer text.
3. The prospect's own FB/IG: last post date, video count, followers (manual or scraper).
4. After-the-lead test: n8n submits their website contact form at 7–9pm with a clearly labeled "QuickLaunchWeb speed test, please ignore" message (consented). It logs time-to-first-response by watching a monitored inbox/number.
5. Claude turns it into a structured outline: score, 3 findings, 3 fixes, and one "if you only do one thing" line.
6. **The human layer:** you record a 4–6 min Loom over the outline and the scraped screenshots. Your face and voice are the trust builder, so don't automate this part. Budget about 10 min each (est.).
7. Deliver by SMS + email as a hosted page (`/teardown/[id]` or the Loom link), with Calendly embedded below the video.

**Follow-up:** T+0 delivery → T+3h "did you see the competitor running the same ad for {n} days?" → T+1d SDR call → T+3d "want us to make you a free ad that beats theirs?" (**upgrade to Lead Magnet #1**) → T+7d last call.

### How both plug into the existing discovery call
- Keep `DiscoveryCallSection` as the booking step, but **move contact capture ahead of it**. The magnets do that naturally. On the general site qualifier, add first name + mobile before the Calendly reveal so non-bookers can still be followed up.
- Pass `utm_campaign=free_ad | teardown` and the GHL contact id into Calendly so every booking traces to its magnet and the ad that drove it.
- Add a secondary CTA site-wide ("Or get a free ad made for your business →") next to "Book a Free Strategy Call," and point the guide CTAs there instead of `/services/web-design#pricing`.
- Replace `ResultsSection` "Coming Soon" with real assets (see §5). Don't ship an empty section.

---

## 4. Our own cold-traffic plan: Meta ads + short-form video (we eat our own cooking)

**Principle:** our own ads are the proof. If we can't turn our own videos into booked calls and closed deals, we can't sell it. Track it the same way we'll track it for clients, and show prospects our own numbers once we have them.

### 4.1 Funnel
```
Meta video ad (Houston, creative names the trade)
  → /free-ad (or /teardown) LP — Pixel ViewContent
  → 4-field form — Pixel + CAPI Lead (dedup event_id)
  → Thank-you page: 4 qualifier questions — CAPI CompleteRegistration (+ qualifier answers as custom data)
  → Calendly "Ad Reveal Call" — CAPI Schedule (via Calendly webhook, server-side)
  → Call held — CRM stage → offline event "QualifiedCall"
  → Signed client — CRM stage → offline "Purchase" with value = first-quarter contract value
```
Retargeting catches drop-offs at every arrow.

### 4.2 Campaign structure (start simple, do more of fewer things)
| Campaign | Objective / optimization | Audience | Budget (est.) | Creative |
|---|---|---|---|---|
| **C1 Prospecting: Free Ad** | Leads (website), optimize for `Lead`. Move to the `CompleteRegistration` (qualified) event once it fires ~25+/week. | Houston metro radius (~40–50 mi), Advantage+ / broad. Creative does the targeting ("Houston roofers…"). | $40/day | 4–6 video hooks (below), one ad set |
| **C2 Prospecting: Teardown** (start in week 3, only if C1 CPL is fine) | Same | Same | $15/day | 2–3 hooks |
| **C3 Retargeting** | Leads or Engagement | 50%+ video viewers (30d), IG/FB engagers (60d), LP visitors with no submit (30d), Leads with no booking (14d) | $10–15/day | Founder VSL cut (60–90s), behind-the-scenes shoot, "here's a sample ad we made for a Houston [trade]", objection videos ("Do I have to be on camera?", "Am I locked in?") |
| Instant-form A/B (optional) | Meta Instant Form with higher-intent setting + 1 custom question (trade) | Same as C1 | Split from C1 budget | Same ads |

Keep the CTA late in each video (~3s in, after the hook). Post every hook organically first, then put the paid budget behind the organic winners.

### 4.3 Video ad hook scripts (our own ads)
All lines in [brackets] must be real. Film them after you've actually done the thing. No invented numbers.

**1. The Direct Offer (lead with the magnet)**
- *Hook (0–3s), Anthony on a Houston jobsite:* "Houston roofers. I'll make your next Facebook ad for free, and you keep it."
- *Body:* "Text me 5 to 10 photos of your best jobs. In three days you get a 20-second video ad built to book replacements, not patch jobs. We show it to you, walk you through how we'd run it, and it's yours either way."
- *CTA:* "We only do five a week, one roofer per area. Tap the link and claim yours."

**2. "Likes Don't Pay Your Crew"**
- *Hook:* "Your last video got 2,000 views. How many of those turned into a booked estimate?"
- *Body:* "Views are nice. Booked jobs pay the bills. Here's how one 20-second video becomes an estimate on your calendar: the ad shows your real work to homeowners in your zip codes. Someone fills out the form at 9pm. They get a text in seconds. Our team calls, checks they own the home and have a real budget, and books it. That's the whole Engine."
- *CTA:* "Want to see what that video looks like for your business? We'll make the first one free."

**3. The Ad Library Teardown (do the real research first)**
- *Hook, screen recording of the Meta Ad Library:* "I looked up every [roofer] running Facebook ads in [Katy] right now. [N] of them. Here's what the ones that keep running are doing."
- *Body:* "[Real pattern 1, e.g. 'every long-running ad is a video, not a flyer']. [Real pattern 2]. [Real pattern 3]. And most of them have no follow-up when a lead comes in after hours."
- *CTA:* "Want this teardown for your trade and your area? Free. Link below."

**4. The 9pm Lead**
- *Hook:* "A homeowner fills out your form at 9pm on a Tuesday. Who texts them back?"
- *Body:* "If the answer is 'me, tomorrow morning,' that job probably went to the guy who answered first. Ads don't fix that. Follow-up does. Every lead we run gets a text in seconds and a call from our team."
- *CTA:* "We'll make you a free ad and show you how the follow-up works. Tap below."

**5. Honest Numbers (real `adResults.ts` data, only with client OK, by trade, no names)**
- *Hook, screenshot of the real ad account:* "A Houston insulation company. $1,752 on Facebook ads, 61 leads. Here's the part most agencies won't tell you."
- *Body:* "Leads aren't the win. A lead that never gets called is worth zero. That's why we now track every lead to a booked estimate and a closed job, and report it to the owner every week."
- *CTA:* "Want to see what this would look like for your trade? We'll make your first ad free."
- *(Spend/lead figures are from `lib/adResults.ts`, pulled 2026-10-22. Update the screenshot when you re-pull. Once you have booked-job numbers, replace them.)*

**6. The Founder (trust plus scarcity)**
- *Hook, Anthony to camera in his truck or the office:* "I don't want to work with every contractor in Houston. One per trade, per area."
- *Body:* "I'm Anthony. We're a small Houston team. We film your jobs, run your Facebook ads, and our team calls and books your leads. We take one roofer per area so we're never running ads against our own client."
- *CTA:* "See if your area's open. Start with a free ad. Link below."

**7. Before/After Swap (our product as proof)**
- *Hook, split screen of a client's old boosted post vs. the ad we made from the same photos (with permission):* "Same photos. Same company. Watch the difference."
- *Body:* walk through the 3 changes (hook in the first second, the job type, the CTA after the hook).
- *CTA:* "Send us your photos. We'll do yours free."

### 4.4 Budget → calls → closed deals (all estimates; replace with real data by week 3)
| Step | Assumption (est.) | Low | Mid | High |
|---|---|---|---|---|
| Ad spend / month | $55/day (C1 + C3) | $1,650 | $1,650 | $1,650 |
| Cost per free-ad request | B2B-to-trades on Meta, small Houston audience | $80 | $50 | $30 |
| Requests | | 21 | 33 | 55 |
| Qualified (Houston, ≥$10k/mo, can take work) | 50–65% | 10 | 19 | 33 |
| Booked reveal call (you must book to see the ad) | 40–60% of qualified | 4 | 10 | 20 |
| Shows | 70% | 3 | 7 | 14 |
| Close to Engine | 20–30% | 0.6 | 1.7 | 3.5 |
| **Cost per booked call** | | ~$410 | ~$165 | ~$83 |

**Capacity check:** the mid case asks for ~19 qualified sample ads a month, but you only make 5 a week (~20/month). That fits. If CPL comes in at the high case, raise the qualification bar (revenue ≥$30k) before adding production capacity.

**Kill/scale rules:** after ~$500 of spend per hook, cut any hook with CPL more than 2x the account average. Scale budget 20–30% every few days only while cost per *booked call* holds.

### 4.5 Rest of the Core Four (lighter)
| Core Four | Plan | Weekly volume target (est.) |
|---|---|---|
| **Warm outreach** | Call or text every current and past client (the 8 in `socialClients.ts` plus past web-design clients). Ask for permission to use their results, a 30-second video testimonial, and one intro to a contractor friend. Status-based referral reward: their friend gets a free sample ad "because you know [client]." | 20 conversations |
| **Cold outreach** | Scrape Houston home-service businesses with 15–200 Google reviews (established, not huge) using Outscraper/Apify. Pre-build a mini teardown (Ad Library + profile check) automatically. Then send **cold email** (separate sending domain, warmed inboxes, 30–40 sends per inbox per day, CAN-SPAM footer) with one finding plus "want the full 5-min video?" For the top 10/day, record a real Loom. FB/IG DMs to owners who post their own work. Phone calls are fine. **Don't blast cold SMS** (TCPA and carrier filtering); SMS only after opt-in. | 100 touches/day (Hormozi rule of 100) → about 2–5% reply (est.) |
| **Content** | Owner-led short-form 4–5x/week: "Houston Ad Teardown" series, behind-the-scenes from client shoots, sample-ad before/afters, answers to the top 10 call questions. Run the best organic posts as paid ads, and add video viewers to C3. | 5 posts |
| **Paid** | §4.2–4.4 | $55/day to start |
| **Local hubs** (Hormozi's "20x lever") | Supply-house lunch-and-learns: roofing distributors (e.g. ABC Supply, SRS/Beacon branches), Sherwin-Williams stores for painters, Ferguson/Johnstone for plumbing/HVAC. Talk title: "How Houston contractors turn phone videos into booked estimates." QR code to `/free-ad`. Trade groups: Greater Houston Builders Association, NARI Greater Houston, local ACCA/PHCC/roofing association events. One BNI chapter. Houston contractor Facebook groups: give value first (post a teardown, offer 5 free teardowns in the comments), no spam. | 1 room per month |

### 4.6 Tracking: tying ad spend to revenue (us and clients, same pipeline)
1. **Pixel + Conversions API** on every step: `ViewContent` (LP), `Lead` (form), `CompleteRegistration` (qualifier done), `Schedule` (Calendly webhook, server-side). Use a shared `event_id` for browser/server dedup. `lib/meta/conversions.ts` already exists from the `/instagram` funnel, so reuse it.
2. **Capture identifiers at submit:** fbp, fbc (build it from fbclid; there's already a `buildFbcFromFbclid` helper), hashed email/phone, utm_*, ad id / ad set id (`{{ad.id}}` URL params). Save them on the GHL contact.
3. **CRM stages as conversions:** GHL pipeline Lead → Contacted (≤60s) → Qualified → Call Booked → Call Held → Won (value) / Lost (reason). On each stage change, n8n sends a CAPI event (`action_source: system_generated`, with the original lead's identifiers) so Meta can optimize toward *qualified* and *won*, not just raw form fills. That's Meta's CRM / "conversion leads" approach. Check the current setup docs when you build it.
4. **Revenue value:** send `Purchase` with value = signed first-quarter contract value. Once there's volume, test value-based optimization.
5. **One weekly dashboard (ours):** spend → requests → qualified → booked → held → won → $. Report cost per booked call and revenue per $1 spent, broken down **by video/hook**.

### 4.7 How we show clients the video → revenue link (the differentiator)
Same pipeline, client edition. Every client lead carries its ad id and video id into GHL, and our setters move it through Booked Estimate → Estimate Held → Won ($ job value, entered by the client or our team after a weekly check-in text: "Did the Smith estimate close? Reply with the amount").
**One-page weekly report (Hormozi: one page, show up weekly):**
- Ad spend this week / month
- Leads → contacted in ≤60s (%) → qualified → **booked estimates**
- **Cost per booked estimate**
- Jobs won, **revenue closed**, **revenue per $1 of ad spend**
- **Top video:** which video booked the most estimates and the most revenue (thumbnail + numbers). Next week we make more like it.
- One recommendation for next week

Upload won-job values back to Meta (offline/CRM CAPI) so the algorithm learns which homeowners become *big* jobs. That's how "bigger, higher-end jobs" becomes something you can show, not just say. **Build a sample report now** with clearly labeled demo data and show it on every sales call and on the Engine page ("this is what you get every Monday"). That's proof of process before you have proof of results.

---

## 5. Trust without case studies (create these fast)

1. **Founder VSL (5–7 min, this week).** Follow the structure in HORMOZI_PRINCIPLES §3: promise, the pain (shared leads, boosted posts, leads nobody calls), old way vs. our way, objections (camera, contract, cost, "agencies lie"), the honest answer to "no case studies yet," and a CTA that proves they watched. Text it after every booking. Cut 60–90s versions for retargeting.
2. **Use the real numbers you already have.** `lib/adResults.ts`: 6 Houston accounts, $23,368 spend, 312 Meta leads, $29–$119 per lead by trade, with the date and caveat ("Meta lead counts; calls and messages not included; booked-job tracking starting [month]"). With client permission, show real ad-account screenshots. This replaces "Coming Soon."
3. **Founding Client program (pilot, not a guarantee).** 3 slots per quarter, one per trade. In exchange for a reduced setup fee, you get filming access, a case-study release, and a public weekly scoreboard (spend → booked estimates → revenue). The reduced price buys proof. Set the price live on the call; don't publish invented dollar values.
4. **Ask existing clients now.** 8 named clients and 1 written quote. Get 30-second video testimonials, permission to name results, and before/after sample ads. Even "they answer my leads in seconds" on video beats an empty section.
5. **Show the process.** Real sample ads (with permission), a 60s screen recording of a lead getting an instant text and a setter call (with consent), the sample Monday report, and photos from real Houston shoots. All of it is proof of capability, and it's true today.
6. **Live teardowns / building in public.** Weekly "Houston Ad Teardown" posts and a monthly live session. Once your own ad numbers exist, post them ("Week 3 of our own ads: $X spent, Y requests, Z calls booked").
7. **Local presence.** Houston address and phone on every page. Google reviews for QLW itself (ask every client and every reveal-call attendee who liked their free ad). Show up in person at supply houses. "We can come film with you" is a trust signal no out-of-state agency can match.
8. **Risk reversal without a guarantee.** They keep the free ad. They own the ad account and the ad money is on their own card (already in the FAQ). Consider a 72-hour no-questions cancel window after signing to kill spouse/partner risk (HORMOZI §3). Publish the scope fence ("one price, here's exactly what's included"). Note the FAQ asks for a 90-day commitment; a no-surprises scope plus the 72-hour window makes that ask easier.
9. **Clean up trust leaks.** Remove or `noindex` the off-positioning `/instagram` page (it's in `sitemap.ts`), or turn it into the free-ad funnel. Cite or cut the unsourced guide stats.

---

## 6. First 5 actions this week
1. **Plug the qualifier leak.** Add first name + mobile ahead of the Calendly reveal in `discovery-call.tsx`, send it to GHL instead of Web3Forms, and set a ≤60s SMS reply.
2. **Record the founder VSL (5–7 min) and 3 hook videos** (scripts #1, #2, #6 above). Post them organically first.
3. **Build `/free-ad`.** Reuse the `/instagram` page mechanic and the CAPI helper, with 4 fields + SMS consent → thank-you qualifier → Calendly "Ad Reveal Call." Wire the n8n → GHL → Claude script flow. Produce 3 real sample ads for existing clients to use as examples.
4. **Replace "Case Studies Coming Soon"** with real `adResults.ts` numbers (labeled), the JN quote, and the sample Monday report. Ask all 8 clients for video testimonials and permission this week.
5. **Launch C1 at $40/day + C3 at $15/day** once tracking works (Pixel + CAPI `Lead` / `CompleteRegistration` / `Schedule`, utm + ad id stored in GHL). In parallel, start cold email with the automated mini teardown at 100 touches a day.

**Hormozi check on this plan:** it wins on **risk** (free sample they keep, real numbers, they own the account) and **ease** (text us photos). It fixes conversion before traffic. It adds a lead magnet that's a trial of the real product, adds speed-to-lead and a VSL, and tracks results to booked jobs and dollars. Watch item #12, "do more of fewer things": run one magnet (`/free-ad`) and one paid campaign until they're working before adding the teardown, giveaway or events.
