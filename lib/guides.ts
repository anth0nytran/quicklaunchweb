import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export type GuideType = "pillar" | "support";

export type GuideStat = {
  label: string;
  value: string;
};

export type GuideLink = {
  href: string;
  label: string;
  context: string;
  suffix?: string;
};

export type GuideSection =
  | {
    kind: "text";
    id: string;
    title: string;
    paragraphs: string[];
    list?: string[];
    links?: GuideLink[];
  }
  | {
    kind: "checklist";
    id: string;
    title: string;
    items: { title: string; detail?: string }[];
    note?: string;
  }
  | {
    kind: "table";
    id: string;
    title: string;
    columns: string[];
    rows: string[][];
    note?: string;
  }
  | {
    kind: "callout";
    id: string;
    title: string;
    body: string[];
  }
  | {
    kind: "faq";
    id: string;
    title: string;
    items: { q: string; a: string }[];
  }
  | {
    kind: "related";
    id: string;
    title: string;
    items: { href: string; label: string; tag: string }[];
  };

export type Guide = {
  slug: string;
  type: GuideType;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  category?: string;
  updated?: string;
  readTime?: string;
  stats?: GuideStat[];
  heroBullets?: string[];
  jumpLinks?: { id: string; label: string }[];
  ctaTop?: { eyebrow: string; description: string; href: string; label: string };
  ctaBottom?: { title: string; description: string; href: string; label: string };
  supportCta?: { title: string; href: string; label: string };
  aside?: {
    takeaways?: string[];
    benchmarks?: string[];
    benchmarkNote?: string;
    roi?: string[];
    roiNote?: string;
  };
  sections: GuideSection[];
};

const guides: Guide[] = [
  /* ───────────────────────────────────────────────────────────
     BLOG 1 — The Contractor's Lead Machine (Pillar)
     Primary KW: "contractor lead generation without ads"
     SEO + AEO + GEO optimized
     ─────────────────────────────────────────────────────────── */
  {
    slug: "contractor-lead-machine-no-ads",
    type: "pillar" as GuideType,
    title:
      "The Contractor's Lead Machine: How to Get More Calls, Reviews, and Jobs Without Paying for Ads",
    description:
      "Ads rent attention. A system owns it. Here is the step-by-step blueprint for building a lead generation machine that runs while you are on a job — no ad spend required.",
    metaTitle:
      "How to Get More Contractor Leads Without Ads: The System Blueprint | QuickLaunchWeb",
    metaDescription:
      "Stop paying for ads that dry up the second you stop spending. Build the 5-part lead system that gets contractors more calls, more reviews, and more jobs on autopilot.",
    kicker: "Pillar Guide",
    category: "Lead Generation",
    updated: "Apr 2026",
    readTime: "14 min read",
    stats: [
      { label: "Cost of missed call", value: "$1,200 avg" },
      { label: "Speed-to-lead winner", value: "78% of jobs" },
      { label: "System cost", value: "$99–$399/mo" },
    ],
    heroBullets: [
      "The 5 components of a contractor lead system that runs without ad spend.",
      "Why 78% of jobs go to whoever responds first — and how to always be first.",
      "The exact math: what missed calls, stale reviews, and slow follow-ups cost you per year.",
      "How to show up on Google, Maps, ChatGPT, and Siri without paying a dime in ads.",
    ],
    jumpLinks: [
      { id: "why-tactics-fail", label: "Why tactics fail" },
      { id: "component-1-visibility", label: "1. Get found everywhere" },
      { id: "component-2-missed-calls", label: "2. Catch every lead" },
      { id: "component-3-reviews", label: "3. Automate reviews" },
      { id: "component-4-follow-up", label: "4. Auto follow-up" },
      { id: "component-5-expansion", label: "5. Expand into cities" },
      { id: "system-cost-vs-return", label: "Cost vs. return" },
      { id: "faqs", label: "FAQs" },
      { id: "related", label: "Related" },
    ],
    ctaTop: {
      eyebrow: "Get the full system",
      description:
        "All 5 components, one flat monthly fee. Live in 48 hours — $0 down.",
      href: "/services/web-design#pricing",
      label: "See plans",
    },
    ctaBottom: {
      title: "Stop renting attention. Start owning it.",
      description:
        "Every component in this guide — visibility, lead capture, reviews, follow-up, city expansion — built and managed for you. No ad spend. No contracts.",
      href: "/services/web-design#pricing",
      label: "Get started",
    },
    aside: {
      takeaways: [
        "Individual marketing tactics fail because they are disconnected. A system compounds.",
        "78% of buyers choose the first contractor to respond. Speed wins more than quality.",
        "One extra closed lead per month at $700 average job value covers the entire system cost.",
      ],
      benchmarks: [
        "Show up in Google, Maps, and at least one AI search engine.",
        "Every missed call gets a text back within 60 seconds.",
        "Review request sent within 2 hours of job completion.",
        "Leads get a response within 60 seconds — even at 10 PM.",
      ],
      benchmarkNote:
        "These are not aspirational targets. Each one is automated. Set it once, it runs forever.",
      roi: [
        "Average plumbing job: $500. One extra lead per month = $6,000/year from a $1,188 investment.",
        "Average HVAC install: $5,500. One extra lead per quarter covers years of system cost.",
        "Missed call recovery alone typically generates 3–5 extra leads per month.",
      ],
      roiNote:
        "The ROI math is not theoretical. Contractors using these systems report measurable results within the first 30 days.",
    },
    sections: [
      {
        kind: "text",
        id: "why-tactics-fail",
        title: "Why individual marketing tactics fail contractors (and what actually works)",
        paragraphs: [
          "A contractor lead generation system combines five automated components — local search visibility, instant lead response, automated review collection, systematic follow-up, and geographic expansion — to generate calls, reviews, and jobs without ad spend. When these five pieces are connected and running, they compound. When they are not, you are doing what every other contractor does: trying random tactics and hoping something sticks.",
          "Here is what most contractors do. They pay for a website. Then they try Google Ads for a month. Then they post on Facebook a few times. Then they hear about SEO and throw some money at that. None of it works because none of it is connected. The website does not ask for reviews. The reviews do not improve the Google ranking. The ranking does not trigger follow-ups. Every piece is isolated, so every piece underperforms.",
          "A system is different. A system means: someone finds you on Google, lands on your site, calls you — and if you miss that call, they get an automatic text within 60 seconds. When you finish the job, a review request goes out automatically. That review improves your Google ranking. The higher ranking brings more calls. The cycle compounds. That is a system.",
          "Ads have their place. But ads rent attention — the moment you stop paying, the leads stop. A system owns attention. It builds over time. Every review, every ranking, every city page you add makes the next lead cheaper than the last.",
        ],
        list: [
          "The average contractor wastes $3,000–$8,000 per year on disconnected marketing tactics that generate inconsistent results.",
          "Businesses with automated lead systems generate 2–3x more leads at half the cost per lead compared to ad-dependent businesses.",
          "The compounding effect: a system that adds 5 reviews, 2 city pages, and 1 blog post per month creates an exponentially growing lead pipeline.",
        ],
      },
      {
        kind: "text",
        id: "component-1-visibility",
        title: "Component 1: Get found on Google, Maps, ChatGPT, and Siri — without paying for ads",
        paragraphs: [
          "To show up in local search results without ads, a contractor needs an optimized Google Business Profile linked to a fast website with structured data, consistent business information across 15 or more directories, and content that answers the questions customers are asking. This combination signals to Google, AI search engines, and voice assistants that your business is legitimate, active, and relevant.",
          "In 2026, 45% of consumers use AI tools like ChatGPT, Perplexity, and Google AI Overviews to find local service providers. But AI search currently recommends only 1.2% of local businesses. The contractors who show up in these results get leads that convert at 4–23x higher rates than traditional search — because the customer already trusts the recommendation before they call.",
          "Here is how to get visible everywhere people search:",
        ],
        list: [
          "Google Business Profile — Complete every field. Add real photos weekly. Post updates at least monthly. Respond to every review. This is your most important free asset. Contractors with fully optimized GBP profiles rank 2x higher in the map pack than those with incomplete profiles.",
          "Your website — Fast, mobile-first, with schema markup (LocalBusiness, Service, FAQPage). Each service you offer gets its own page. Each city you cover gets its own page. This is how Google understands exactly what you do and where you do it.",
          "AI search optimization — ChatGPT and Perplexity cross-reference your business across multiple platforms before recommending you. Being listed on 15+ directories (Google, Yelp, BBB, Angi, Thumbtack, Nextdoor, industry-specific directories) with identical business information is what gets you recommended.",
          "Voice search — Siri, Alexa, and Google Assistant pull from Google Business Profile and structured website data. The same optimizations that help you rank on Google also make you visible in voice search.",
          "Content that answers questions — When someone asks 'how much does a plumber charge to fix a leaking pipe,' the contractor whose website answers that question directly gets cited by Google AI Overviews and ChatGPT. One good FAQ section can drive more qualified traffic than months of social media posting.",
        ],
      },
      {
        kind: "text",
        id: "component-2-missed-calls",
        title: "Component 2: Never lose a lead to a missed call again",
        paragraphs: [
          "Missed call text-back is an automated system that sends a text message to any caller you cannot answer, within 60 seconds, saying something like: 'Hey, this is [Your Name] from [Your Business]. I am on a job right now but I saw you called — what do you need help with?' This simple automation recovers 30–50% of leads that would otherwise be permanently lost.",
          "The numbers are brutal. The average contractor misses 4–7 calls per day. Less than 3% of those callers leave a voicemail. And 85% of callers who do not reach you on the first attempt will never call back — they call the next contractor on the list. At an average job value of $500–$1,200, that adds up to $45,000–$120,000 per year in lost revenue.",
          "You are not losing these leads because you are bad at your job. You are losing them because you are good at your job — you are under a house, on a roof, or elbow-deep in a panel when the phone rings. That is exactly why this needs to be automated.",
        ],
        list: [
          "27% of all calls to home service businesses go unanswered during business hours.",
          "After-hours is even worse: 41% of online job bookings happen outside of 9-to-5. A customer with a flooded basement at 10 PM calls three plumbers. Whoever responds first wins.",
          "Responding within 60 seconds increases conversion by 391% compared to responding within 5 minutes.",
          "The fix is not 'try harder to answer the phone.' The fix is a system that responds when you cannot.",
        ],
      },
      {
        kind: "text",
        id: "component-3-reviews",
        title: "Component 3: Build a reputation that sells for you — on autopilot",
        paragraphs: [
          "An automated review request system sends a text or email to your customer within 1–2 hours of job completion, with a direct link to leave a Google review. It then automatically responds to every review that comes in. This removes the two biggest barriers to building a strong review profile: remembering to ask and finding time to respond.",
          "Reviews are not just nice to have. They are the single most important trust signal for a local service business in 2026. 91% of homeowners check reviews before calling a contractor. 70% will not even request a quote from a business under 4 stars. And 65% expect to see at least 50 reviews before they feel confident hiring you.",
          "Here is what most contractors get wrong about reviews: they think they need to ask in person. They feel awkward about it. They forget. They tell themselves they will do it later and they never do. The contractors with 200+ reviews are not more likable than you — they have a system that asks for them.",
        ],
        list: [
          "SMS review requests get a 19% response rate versus 4% for email. Always text, not email.",
          "Timing matters: requests sent within 2 hours of job completion get 3x the response rate of requests sent the next day. The customer is still impressed — you are still top of mind.",
          "Responding to every review — positive and negative — increases customer trust by 88%. It also signals to Google that your business is active, which improves your ranking.",
          "A contractor with 50 recent reviews will outrank a competitor with 200 old reviews. Recency matters as much as volume. The system keeps fresh reviews flowing every week.",
          "Google's algorithm weights review velocity — businesses that consistently receive new reviews rank higher than those with sporadic bursts followed by silence.",
        ],
      },
      {
        kind: "text",
        id: "component-4-follow-up",
        title: "Component 4: Automatic follow-up that closes leads you would otherwise lose",
        paragraphs: [
          "Speed-to-lead is the most underrated factor in contractor lead generation. 78% of buyers choose the first business to respond to their inquiry. Not the best. Not the cheapest. The first. An automated follow-up system sends an instant reply to every form submission, missed call, and after-hours inquiry — then follows up at 24 hours and 72 hours if the lead has not converted.",
          "Most contractors think they respond fast. They do not. The average contractor takes over 4 hours to respond to an online lead. By that point, the homeowner has already called two other contractors and probably hired one of them. You never even got a chance to compete.",
          "This is not about being pushy. It is about being present. A simple message at 24 hours — 'Hey, just checking if you still need help with that water heater' — converts leads that would have gone cold. A message at 72 hours catches the ones who got busy and forgot. These are leads you already earned. The follow-up system just makes sure you actually close them.",
        ],
        list: [
          "Responding in under 60 seconds increases conversion by 391%. Responding in 5 minutes drops that by 80%.",
          "The 24-hour follow-up recovers 15–20% of leads that did not convert on first contact.",
          "The 72-hour follow-up catches another 5–10% — these are people who meant to call back but life got in the way.",
          "After-hours auto-reply captures leads that come in at night and on weekends. 41% of bookings happen outside business hours — without an auto-reply, those are all going to competitors.",
          "A CRM tracks every lead from first contact to closed job. No more leads lost in text threads, voicemails, or forgotten sticky notes.",
        ],
      },
      {
        kind: "text",
        id: "component-5-expansion",
        title: "Component 5: Expand into more cities without opening more offices",
        paragraphs: [
          "City expansion pages are dedicated pages on your website that target specific cities, neighborhoods, and zip codes you serve. Each page is optimized for local search terms like 'plumber in [City Name]' or 'HVAC repair [Neighborhood].' When done correctly, each page functions as a new lead pipeline for that geographic area — without you having to open a physical office there.",
          "This is how contractors go from serving one city to dominating a region. Your Google Business Profile is tied to your physical address, which limits its geographic reach. But your website has no such limitation. A plumber in Dallas can create pages targeting Plano, Frisco, McKinney, Allen, and Richardson — and rank in each of those cities' local search results.",
          "The key is that each city page must be unique. Duplicate pages with just the city name swapped out do not work — Google penalizes that. Each page needs to reference specific details about that market: the neighborhoods you serve there, common problems in that area (older homes, specific pipe types, regional climate issues), and social proof from customers in that area.",
        ],
        list: [
          "Priority framework for which cities to target first: (job value in that area) x (estimated search volume) x (1 / competition level). Start with high-value, low-competition neighboring cities.",
          "Each city page should include: services you offer there, specific neighborhoods covered, photos from jobs in that area, reviews from customers in that area, and a click-to-call button.",
          "Two new city pages per month, compounded over 12 months, gives you 24 new geographic lead pipelines. Each one continues generating leads indefinitely.",
          "City pages also strengthen your overall domain authority, which improves rankings for your primary service area. The expansion benefits your core market too.",
        ],
      },
      {
        kind: "table",
        id: "system-cost-vs-return",
        title: "What this system costs vs. doing it piece by piece",
        columns: [
          "Component",
          "DIY / Separate Tools",
          "Integrated System",
        ],
        rows: [
          ["Professional website + hosting", "$3,000–$5,000 build + $300/mo hosting", "Included"],
          ["SEO + AI search setup", "$2,500 setup + $500/mo retainer", "Included"],
          ["Google Business Profile management", "$200–$500/mo agency fee", "Included"],
          ["Missed call text-back", "$75–$150/mo (separate tool)", "Included"],
          ["Review automation + auto-replies", "$100–$200/mo (Podium, Broadly)", "Included"],
          ["CRM + lead tracking", "$200–$400/mo (ServiceTitan, HCP)", "Included"],
          ["Auto follow-ups + after-hours reply", "$75–$150/mo (separate tool)", "Included"],
          ["Monthly blog + city pages", "$400–$800/mo (freelance writer)", "Included"],
          ["Year 1 total", "$18,000–$35,000+", "$1,188–$4,788"],
        ],
        note: "Every component in the left column is a different login, different bill, and different thing to manage. The right column is one system, one bill, fully managed for you.",
      },
      {
        kind: "callout",
        id: "the-compound-effect",
        title: "The compound effect — why systems beat tactics",
        body: [
          "Month 1: your site goes live, GBP is optimized, missed call text-back is on. You recover 3 leads you would have lost. You get 5 new reviews from automated requests.",
          "Month 3: those 15 new reviews pushed you into the Google Map Pack top 3. Your website ranks for 2 new service keywords. City page #1 starts generating leads from the next town over. Calls are up 40%.",
          "Month 6: you have 45 new reviews, 4 city pages, 6 blog posts, and a review reply rate of 100%. Google, ChatGPT, and Siri all recommend your business. You are getting leads from cities you have never advertised in. Your cost per lead is under $20.",
          "Month 12: 90+ new reviews, 12 city pages, a dominant Google presence, AI search visibility, and a lead pipeline that runs whether you are on a job, on vacation, or asleep. You did not pay for a single ad. That is the compound effect of a system.",
        ],
      },
      {
        kind: "faq",
        id: "faqs",
        title: "FAQs",
        items: [
          {
            q: "Can a one-person contracting business really run this kind of system?",
            a: "Yes — that is who it is built for. The whole point of automation is that it runs without you. You do the jobs. The system handles visibility, lead capture, reviews, and follow-up. The only thing you need to do is answer the phone and send us photos of completed work.",
          },
          {
            q: "How long before I start getting leads from this system?",
            a: "Most contractors see new leads within the first 2 weeks from missed call recovery and faster response times. SEO and review growth take 60–90 days to compound. By month 3, most clients report a measurable increase in calls. By month 6, the system is typically generating 5–15 new leads per month depending on market and trade.",
          },
          {
            q: "What is the difference between a marketing system and just having a website?",
            a: "A website is one piece of the puzzle — it is where leads land. A system is everything that happens before, during, and after that visit. A system gets you found, captures the lead even if you miss the call, follows up automatically, asks for reviews, replies to reviews, and expands into new cities. A website without a system is a billboard in the desert.",
          },
          {
            q: "How do I show up in AI search like ChatGPT as a contractor?",
            a: "AI search engines cross-reference your business across multiple platforms — Google, Yelp, BBB, industry directories, your website. They look for consistent business information, recent reviews, structured data markup on your site, and content that answers customer questions. The system handles all of this: directory listings, schema markup, review velocity, and FAQ content.",
          },
          {
            q: "What is missed call text-back and how does it work?",
            a: "When you miss a call, the system automatically sends a text to the caller within 60 seconds. The message identifies your business and asks how you can help. The caller replies by text, and you now have their information and can respond when you are off the job. It recovers 30–50% of leads that would otherwise be permanently lost.",
          },
          {
            q: "Is $99 per month enough to actually get more customers?",
            a: "The Starter plan gives you a professional website, Google listing, and basic lead capture. For most solo contractors, that is enough to start generating leads. The Growth Engine at $199 per month adds SEO, AI search optimization, and automated reviews — which is where the compounding effect kicks in. One extra job at $500 covers the cost. Most clients generate that within the first month.",
          },
          {
            q: "Do I need to stop using Angi or Thumbtack if I use this system?",
            a: "No. This system does not replace lead platforms — it reduces your dependence on them. Lead platforms charge $15–$80 per lead and you compete with 5–10 other contractors for each one. Organic leads from your system come to YOU directly — no competition, no per-lead fee. Over time, most contractors shift their budget away from paid platforms as organic leads increase.",
          },
          {
            q: "How many Google reviews do I need to start ranking higher?",
            a: "There is no magic number, but data shows: 10 reviews gets you into consideration, 25 reviews makes you competitive, and 50+ reviews with a 4.5+ average puts you in the top tier for most local markets. What matters most is velocity — getting new reviews consistently every week signals to Google that your business is active and trusted.",
          },
        ],
      },
      {
        kind: "related",
        id: "related",
        title: "Related guides",
        items: [
          {
            href: "/guides/invisible-contractor-ai-search",
            label: "Invisible Contractor: Why Customers Can't Find You on Google or AI Search",
            tag: "Pillar",
          },
          {
            href: "/guides/120k-leak-missed-calls-reviews",
            label: "The $120K Leak: How Missed Calls and Zero Reviews Are Bleeding You Dry",
            tag: "Pillar",
          },
          {
            href: "/guides/shared-leads-vs-exclusive-leads-contractors",
            label: "Shared Leads vs. Exclusive Leads: Which Is Better for Contractors?",
            tag: "Leads",
          },
          {
            href: "/guides/why-website-not-getting-customers",
            label: "Why Your Website Isn't Getting You Customers",
            tag: "Pillar",
          },
        ],
      },
    ],
  },
  /* ───────────────────────────────────────────────────────────
     BLOG 2 — Invisible Contractor (Pillar)
     Primary KW: "how to show up in AI search as a contractor"
     SEO + AEO + GEO optimized
     ─────────────────────────────────────────────────────────── */
  {
    slug: "invisible-contractor-ai-search",
    type: "pillar" as GuideType,
    title:
      "Invisible Contractor: Why 78% of Your Potential Customers Can't Find You (On Google, ChatGPT, or Anywhere Else)",
    description:
      "45% of consumers now use AI search to find local services. AI recommends only 1.2% of businesses. If you are not in that 1.2%, you are invisible to nearly half your potential customers — and you do not even know it.",
    metaTitle:
      "How to Show Up on Google, ChatGPT, and AI Search as a Contractor | QuickLaunchWeb",
    metaDescription:
      "45% of homeowners use AI search to find contractors. Only 1.2% of businesses get recommended. Here is how to make sure you are one of them.",
    kicker: "Pillar Guide",
    category: "AI Search & Visibility",
    updated: "Apr 2026",
    readTime: "12 min read",
    stats: [
      { label: "Consumers using AI search", value: "45% in 2026" },
      { label: "Businesses AI recommends", value: "only 1.2%" },
      { label: "AI lead conversion rate", value: "4–23x higher" },
    ],
    heroBullets: [
      "Where customers actually look for contractors in 2026 — it is not just Google anymore.",
      "A 5-minute test to check if you are invisible right now.",
      "The 7 things AI checks before recommending your business.",
      "How to start showing up in AI search results this month.",
    ],
    jumpLinks: [
      { id: "where-customers-search", label: "Where they search now" },
      { id: "invisibility-test", label: "5-minute visibility test" },
      { id: "why-ai-search-matters", label: "Why AI search matters" },
      { id: "what-ai-checks", label: "What AI checks" },
      { id: "google-still-matters", label: "Google still matters" },
      { id: "how-to-get-visible", label: "How to get visible" },
      { id: "faqs", label: "FAQs" },
      { id: "related", label: "Related" },
    ],
    ctaTop: {
      eyebrow: "Show up everywhere people search",
      description:
        "Google, Maps, ChatGPT, Siri — one system makes you visible in all of them.",
      href: "/services/web-design#pricing",
      label: "See plans",
    },
    ctaBottom: {
      title: "Stop being invisible. Start showing up.",
      description:
        "We set up your Google profile, optimize your website for AI search, and build the listings that get you recommended. 48 hours from now, people can actually find you.",
      href: "/services/web-design#pricing",
      label: "Get started",
    },
    aside: {
      takeaways: [
        "45% of consumers used AI to find local services in 2026 — up from 6% one year prior.",
        "AI leads convert at 4–23x higher rates because customers already trust the recommendation.",
        "The same optimizations that help you rank on Google also make AI recommend you.",
      ],
      benchmarks: [
        "Ask ChatGPT for your trade + your city. Are you mentioned?",
        "Google your business name. Does a complete, professional result appear?",
        "Check Google Maps. Are you in the top 3 for your primary service?",
        "Count your directories. Are you listed on 15+ platforms with matching info?",
      ],
      benchmarkNote:
        "If you failed even one of these checks, you are losing leads to contractors who pass all four. The good news: all of these are fixable.",
      roi: [
        "Contractors who add a website to their GBP see 30–50% more profile views within 90 days.",
        "Businesses visible in AI search get leads that convert at 4–23x higher rates.",
        "Consistent NAP across 15+ directories improves Google Map Pack ranking by an average of 3 positions.",
      ],
      roiNote:
        "Visibility improvements compound. Each platform you appear on strengthens your presence on every other platform.",
    },
    sections: [
      {
        kind: "text",
        id: "where-customers-search",
        title: "Where customers actually look for contractors in 2026",
        paragraphs: [
          "In 2026, homeowners search for contractors across at least seven different platforms. Google Search is still the biggest, but it is no longer the only one that matters. If you are only showing up on Google — or worse, only on your Google Business Profile — you are invisible to a growing share of the market.",
          "Here is where people look, and what each one means for you:",
        ],
        list: [
          "Google Search — Still the number one starting point. But Google is changing. AI Overviews now appear at the top of many local searches, pushing traditional results down. If you are not mentioned in the AI Overview, you are below the fold before the page even loads.",
          "Google Maps and the Map Pack — The 3 business listings that appear with a map at the top of local searches. This is where the highest-intent customers are. They are ready to call right now. Ranking in the Map Pack requires an optimized Google Business Profile, recent reviews, and a linked website.",
          "ChatGPT — 800 million weekly active users. 60.4% of the AI search market. When someone asks ChatGPT 'who is the best plumber in [your city],' it generates a recommendation based on your online presence across multiple platforms. It is not pulling from a database — it is synthesizing your reviews, your website content, your directory listings, and your overall digital footprint.",
          "Google AI Overviews — Google's own AI-generated summary that appears above traditional search results. These summaries cite specific businesses and pull from your website content, reviews, and structured data. Being cited here is the new 'ranking #1.'",
          "Perplexity — Growing AI search engine that provides sourced answers. It links directly to the sources it cites, driving highly qualified traffic. Contractors with strong website content and directory presence are getting cited here regularly.",
          "Siri and voice assistants — 'Hey Siri, find me an electrician near me.' Voice search pulls primarily from Google Business Profile data and structured website data. Optimizing for Google automatically optimizes for voice search.",
          "Angi inside ChatGPT — Angi launched an integration within ChatGPT in 2025. When someone asks ChatGPT for a home service provider, it can now pull from Angi's database directly. If you are listed on Angi, you have an additional path into AI search results.",
        ],
      },
      {
        kind: "checklist",
        id: "invisibility-test",
        title: "The 5-minute invisibility test (do this right now)",
        items: [
          {
            title: "Open ChatGPT and ask for your trade in your city",
            detail:
              "Type: 'Who is the best [plumber/electrician/HVAC tech] in [your city]?' If you are not mentioned, you are invisible to the 45% of consumers who use AI search. Try Perplexity too — it is the second largest AI search platform.",
          },
          {
            title: "Check Google AI Overviews",
            detail:
              "Google '[your trade] in [your city]' on your phone. Look at the AI-generated summary at the top. Are you mentioned? If there is no AI Overview for your query, Google the most common question about your trade ('how much does a plumber charge in [city]'). This is the content AI pulls from.",
          },
          {
            title: "Check your Google Map Pack position",
            detail:
              "Search your primary service + your city on Google. Do you appear in the top 3 map results? If not, you are losing the highest-intent leads to the contractors who do. 44% of people click on one of the top 3 map results and never scroll further.",
          },
          {
            title: "Google your own business name",
            detail:
              "What shows up? A complete Google Business Profile with photos, reviews, and a website link? Or a half-empty listing with no reviews and no site? This is exactly what a referral sees when someone gives them your name. If the result does not inspire confidence, you are losing warm leads.",
          },
          {
            title: "Count your directory listings",
            detail:
              "Are you on Google, Yelp, BBB, Angi, Thumbtack, Nextdoor, Facebook, and at least 7 more industry-specific directories? AI search engines cross-reference your business across multiple platforms. Being on fewer than 15 directories with consistent information means AI does not have enough data to recommend you confidently.",
          },
        ],
        note: "If you failed 2 or more of these checks, you are invisible to a significant percentage of potential customers in your market. Every day you stay invisible is a day of leads going to contractors who pass all five.",
      },
      {
        kind: "text",
        id: "why-ai-search-matters",
        title: "Why AI search leads are worth 4–23x more than traditional search leads",
        paragraphs: [
          "AI search leads convert at 4–23x higher rates than traditional search leads. That is not a typo. Here is why: when ChatGPT or Perplexity recommends your business, the customer treats it as a trusted referral — not a search result to evaluate. The decision is already 80% made before they call you.",
          "Think about the difference in mindset. A traditional Google searcher sees 10 results and picks 3 to evaluate. They are comparison shopping. An AI search user asks 'who should I hire for this job?' and gets a specific recommendation with reasoning. They are ready to act.",
          "The data backs this up:",
        ],
        list: [
          "42% of consumers trust AI recommendations as much as personal recommendations from friends and family.",
          "23% make hiring decisions based solely on AI guidance without further research.",
          "AI search usage for finding local services grew from 6% to 45% in just 12 months. This is not a trend. It is a fundamental shift in how people find and hire contractors.",
          "Google review usage — the primary trust signal for the last decade — dropped from 83% to 71% as AI search rose. Customers are outsourcing the evaluation process to AI.",
          "Contractors who are visible in AI search are pulling leads from a pool that most of their competitors do not even know exists yet. First-mover advantage here is enormous and will not last forever.",
        ],
      },
      {
        kind: "checklist",
        id: "what-ai-checks",
        title: "The 7 things AI checks before recommending your business",
        items: [
          {
            title: "Google Business Profile completeness",
            detail:
              "AI systems start with your GBP. Every field filled out, correct business hours, accurate service categories, real photos (not stock), and an active posting history. An incomplete GBP is the number one reason contractors get overlooked by AI.",
          },
          {
            title: "Review volume, recency, and sentiment",
            detail:
              "AI weighs recent reviews more heavily than old ones. 50 reviews from the last 6 months beats 200 reviews from 2019. Average rating matters, but velocity matters more. Businesses receiving new reviews every week are flagged as active and trustworthy.",
          },
          {
            title: "NAP consistency across directories",
            detail:
              "NAP stands for Name, Address, Phone number. If your business name is 'Johnson Plumbing' on Google but 'Johnson Plumbing LLC' on Yelp and 'Johnson's Plumbing Services' on BBB, AI treats these as potentially different businesses. Exact consistency across every directory is critical.",
          },
          {
            title: "Website with structured data",
            detail:
              "Structured data (also called schema markup) is code that tells search engines and AI exactly what your business is, what services you offer, where you operate, and what your customers say about you. LocalBusiness, Service, and FAQPage schema are the three most important types for contractors.",
          },
          {
            title: "Content that answers customer questions",
            detail:
              "AI search engines generate answers by synthesizing content. If your website has a page that answers 'how much does it cost to replace a water heater in [city],' you are a candidate for citation when someone asks ChatGPT that exact question. FAQ sections, service descriptions, and educational blog posts all feed this.",
          },
          {
            title: "Mentions on trusted platforms",
            detail:
              "AI cross-validates your business by checking how many trusted platforms mention you. Google, Yelp, BBB, Angi, Thumbtack, Nextdoor, HomeAdvisor, Facebook, industry associations — the more sources that confirm your business exists and is legitimate, the more confident AI is in recommending you.",
          },
          {
            title: "Response patterns",
            detail:
              "Do you reply to reviews? Do you respond to messages? AI systems can detect whether a business is actively engaged or dormant. Businesses that respond to 100% of reviews and have recent activity are weighted higher than businesses that set up a profile and abandoned it.",
          },
        ],
        note: "You do not need to be perfect on all seven. But contractors who score well on 5 or more consistently show up in AI recommendations. The threshold for visibility is lower than most people think — you just need to be better than the contractors in your market who are doing nothing.",
      },
      {
        kind: "text",
        id: "google-still-matters",
        title: "Google is not dead — but it is changing fast",
        paragraphs: [
          "Let us be clear: Google is still the most important platform for contractor visibility. 94% of homeowners begin their search for a contractor online, and Google captures the largest share of those searches. Nothing in this guide suggests abandoning Google — everything here makes your Google presence stronger.",
          "But Google itself is changing. AI Overviews now appear at the top of many local searches. Traditional organic results have been pushed lower. The Map Pack is more competitive than ever. And Google is increasingly rewarding the same signals that AI search engines look for: authoritative content, consistent directory listings, fresh reviews, and structured data.",
          "The contractors who will dominate in 2026 and beyond are the ones who optimize once for a system that works everywhere — Google, Maps, ChatGPT, Perplexity, Siri, and whatever comes next. The fundamentals are the same across all platforms: be findable, be credible, be responsive.",
        ],
      },
      {
        kind: "checklist",
        id: "how-to-get-visible",
        title: "How to start showing up in AI search this month",
        items: [
          {
            title: "Complete your Google Business Profile — 100%",
            detail:
              "Every field. Real photos of your work. Correct hours. Accurate service areas. At least one post per month. This is the foundation everything else builds on. Takes 30 minutes to audit and fix.",
          },
          {
            title: "Fix your NAP consistency across all directories",
            detail:
              "Pick your exact business name, address, and phone number. Then update it identically on every platform you are listed on. Use a spreadsheet to track which directories have which information. Inconsistencies confuse both Google and AI.",
          },
          {
            title: "Get listed on 15+ directories",
            detail:
              "Google, Yelp, BBB, Angi, Thumbtack, Nextdoor, HomeAdvisor, Facebook, Apple Maps, Bing Places, and industry-specific directories for your trade. Each listing is a vote of legitimacy that AI systems use to validate your business.",
          },
          {
            title: "Add FAQ schema to your website",
            detail:
              "FAQPage structured data tells AI search engines: 'Here are questions this business answers.' Pages with FAQ schema are 28% more likely to appear as AI Overview sources. Every service page on your site should have 3–5 frequently asked questions with direct, specific answers.",
          },
          {
            title: "Build review velocity",
            detail:
              "Start sending automated review requests after every job. Target 2–3 new reviews per week. This signals to both Google and AI search engines that your business is active, growing, and trusted. Respond to every review — positive and negative.",
          },
          {
            title: "Create content that answers the questions people ask AI",
            detail:
              "What do homeowners in your city ask ChatGPT about your trade? 'How much does X cost in [city]?' 'Who is the best [trade] near me?' 'What should I look for when hiring a [trade]?' Create website content that directly answers these questions. AI cites the content that best answers the query.",
          },
        ],
        note: "You can do all of this yourself — or get a system that does it for you. Either way, the window for first-mover advantage in AI search is closing. Contractors who act now will have a significant lead over those who wait.",
      },
      {
        kind: "faq",
        id: "faqs",
        title: "FAQs",
        items: [
          {
            q: "How do I get my contracting business recommended by ChatGPT?",
            a: "ChatGPT synthesizes information about your business from multiple sources: your Google Business Profile, your website, directory listings (Yelp, BBB, Angi), and review platforms. To get recommended, you need consistent business information across 15+ platforms, recent positive reviews, a website with structured data, and content that answers customer questions about your trade.",
          },
          {
            q: "Does AI search actually send real customers to local contractors?",
            a: "Yes. AI search leads convert at 4–23x higher rates than traditional search leads because customers treat AI recommendations as trusted referrals. 45% of consumers now use AI tools to find local services, up from 6% one year ago. This is already a significant source of leads and growing rapidly.",
          },
          {
            q: "How many reviews do I need to show up in AI search?",
            a: "There is no hard minimum, but data shows: 10+ reviews gets you into consideration, 25+ makes you competitive, and 50+ with a 4.5 average and regular new reviews puts you in the top tier. Recency matters more than total count — AI systems weight recent reviews more heavily.",
          },
          {
            q: "What is structured data and do I need it as a contractor?",
            a: "Structured data is code added to your website that tells search engines and AI exactly what your business is. Think of it as a label on every page that says: 'This is a plumbing business in Dallas that offers drain cleaning and water heater installation.' Without it, AI has to guess what your pages are about. With it, AI knows exactly what you offer and where you offer it.",
          },
          {
            q: "Can a contractor show up in AI search without a website?",
            a: "Technically yes, through Google Business Profile and directory listings alone. But the probability is much lower. AI systems use your website as a primary source for understanding your services, service area, and expertise. Contractors with websites are 2–3x more likely to be cited in AI search results.",
          },
          {
            q: "What is the difference between SEO, AEO, and GEO?",
            a: "SEO (Search Engine Optimization) helps you rank on Google. AEO (Answer Engine Optimization) helps you appear in AI-generated answers from ChatGPT, Perplexity, and Siri. GEO (Generative Engine Optimization) specifically targets AI Overviews in Google search results. The good news: the fundamentals are the same — consistent information, recent reviews, quality content, and structured data. Optimize once, show up everywhere.",
          },
          {
            q: "How long does it take to start showing up in AI search?",
            a: "Directory consistency improvements take 2–4 weeks to propagate. Review velocity improvements take 4–8 weeks to impact rankings. Content and structured data changes are indexed within days but take 4–8 weeks to influence AI recommendations. Most contractors see measurable improvements within 60–90 days of systematic optimization.",
          },
          {
            q: "Is Angi inside ChatGPT going to replace Google for finding contractors?",
            a: "Not replace, but it is a significant new channel. Angi's ChatGPT integration means contractors listed on Angi have an additional path into AI search results. But Google, direct ChatGPT recommendations, and Perplexity all still operate independently. The smart move is to be visible everywhere — not to bet on one platform.",
          },
        ],
      },
      {
        kind: "related",
        id: "related",
        title: "Related guides",
        items: [
          {
            href: "/guides/contractor-lead-machine-no-ads",
            label: "The Contractor's Lead Machine: Get Calls Without Ads",
            tag: "Pillar",
          },
          {
            href: "/guides/120k-leak-missed-calls-reviews",
            label: "The $120K Leak: What Missed Calls and Missing Reviews Cost You",
            tag: "Pillar",
          },
          {
            href: "/guides/how-to-get-more-customers-website",
            label: "How to Get More Customers From Your Website",
            tag: "Pillar",
          },
        ],
      },
    ],
  },
  /* ───────────────────────────────────────────────────────────
     BLOG 3 — The $120K Leak (Pillar)
     Primary KW: "cost of missed calls for contractors"
     SEO + AEO + GEO optimized
     ─────────────────────────────────────────────────────────── */
  {
    slug: "120k-leak-missed-calls-reviews",
    type: "pillar" as GuideType,
    title:
      "The $120K Leak: How Missed Calls, Slow Follow-Ups, and Zero Reviews Are Bleeding Your Contracting Business Dry",
    description:
      "You do not have a marketing problem. You have a leak problem. Leads are coming in and falling through five specific cracks — each one costing you thousands per year. Here are the numbers.",
    metaTitle:
      "Cost of Missed Calls for Contractors: The $120K Leak You Don't See | QuickLaunchWeb",
    metaDescription:
      "The average contractor loses $45K–$120K/year from missed calls alone. Add slow follow-ups and missing reviews and the total leak exceeds $150K. Here's how to plug every hole.",
    kicker: "Pillar Guide",
    category: "Lead Recovery",
    updated: "Apr 2026",
    readTime: "13 min read",
    stats: [
      { label: "Avg cost per missed call", value: "$1,200" },
      { label: "Calls missed daily", value: "4–7 avg" },
      { label: "Callers who never call back", value: "85%" },
    ],
    heroBullets: [
      "The 5 leaks that cost the average contractor $135,000–$365,000 per year.",
      "Why 85% of missed callers never call back (and the 60-second fix).",
      "The speed-to-lead stat that changes everything: 78% choose whoever responds first.",
      "How to plug every leak with one automated system — not 7 different tools.",
    ],
    jumpLinks: [
      { id: "the-invisible-bleed", label: "The invisible bleed" },
      { id: "leak-1-missed-calls", label: "Leak 1: Missed calls" },
      { id: "leak-2-slow-response", label: "Leak 2: Slow response" },
      { id: "leak-3-reviews", label: "Leak 3: Missing reviews" },
      { id: "leak-4-after-hours", label: "Leak 4: After-hours silence" },
      { id: "leak-5-invisible", label: "Leak 5: Being invisible online" },
      { id: "total-leak", label: "The total leak" },
      { id: "plug-every-leak", label: "Plug every leak" },
      { id: "faqs", label: "FAQs" },
      { id: "related", label: "Related" },
    ],
    ctaTop: {
      eyebrow: "Stop the bleeding",
      description:
        "One system. Every leak plugged. $0 down, live in 48 hours.",
      href: "/services/web-design#pricing",
      label: "See plans",
    },
    ctaBottom: {
      title: "Every day you wait is another $500+ walking out the door",
      description:
        "Missed calls, slow follow-ups, missing reviews — the system plugs all of it automatically. One flat monthly fee. No contracts. Cancel if it does not pay for itself.",
      href: "/services/web-design#pricing",
      label: "Plug the leaks",
    },
    aside: {
      takeaways: [
        "The average contractor loses $45,000–$120,000 per year from missed calls alone.",
        "78% of buyers hire the first contractor to respond. Average response time is 4+ hours.",
        "91% of homeowners check reviews before calling. 70% will not hire under 4 stars.",
      ],
      benchmarks: [
        "Every missed call gets an auto-text within 60 seconds.",
        "Every lead gets a response within 60 seconds — even at midnight.",
        "Every completed job triggers an automatic review request.",
        "Every Google review gets a response within 24 hours.",
      ],
      benchmarkNote:
        "These are not goals. They are automation rules. Set them once and they run on every lead, every call, every job — without you doing anything.",
      roi: [
        "Recovering just 2 missed calls per week at $500/job = $52,000/year in recovered revenue.",
        "Responding in 60 seconds instead of 4 hours can double your close rate on inbound leads.",
        "Going from 10 to 50 Google reviews typically doubles Map Pack click-through rate.",
      ],
      roiNote:
        "You are not spending money to fix these leaks. You are recovering money you are already losing.",
    },
    sections: [
      {
        kind: "text",
        id: "the-invisible-bleed",
        title: "Your business is not under-marketed. It is leaking.",
        paragraphs: [
          "The average contractor loses $45,000 to $120,000 per year from missed calls alone. Add slow follow-ups, missing reviews, after-hours silence, and online invisibility, and most contracting businesses are leaking $135,000 to $365,000 in revenue they never see. This is not a marketing problem. It is a plumbing problem — your lead pipeline has holes, and money is draining out of every one.",
          "Here is what makes this so painful: you are already doing the hard part. You are good at your trade. You have happy customers. Leads are finding you. But between the moment a customer decides to call and the moment you actually speak to them, there are five places where that lead can — and does — fall through the cracks.",
          "These leaks are invisible because you never see the leads you lose. You do not get a notification that says 'a homeowner tried to call you, could not reach you, and hired your competitor instead.' It just looks like a slow week. But it is not a slow week. It is a leaky system.",
          "Let us put a dollar figure on every leak so you know exactly how much this is costing you.",
        ],
      },
      {
        kind: "text",
        id: "leak-1-missed-calls",
        title: "Leak #1: Missed calls — $45,000 to $120,000 per year",
        paragraphs: [
          "A missed call to a home service business costs an average of $1,200 in lost revenue. The average contractor misses 4 to 7 calls per day. Less than 3% of those callers leave a voicemail. And 85% of callers who do not reach you on the first attempt never call back. They call the next contractor on the list.",
          "Do the math on your own numbers. If your average job value is $500 and you miss just 3 calls per day, 5 days per week, that is 15 missed calls per week. If even a third of those would have converted to jobs, you are losing 5 jobs per week, which is $2,500 per week — or $130,000 per year.",
          "You are not missing these calls because you do not care. You are missing them because you are on a job. You are under a house, on a roof, running a saw, or talking to another customer. Your hands are full. Your phone is in your pocket. By the time you see the missed call notification, that customer has already called two other contractors.",
        ],
        list: [
          "27% of all calls to home service businesses go unanswered during business hours.",
          "62% of callers say they will not leave a voicemail for a business they have never used before.",
          "A customer who gets a voicemail from a plumber when their pipe is leaking will call the next number, not wait for a callback.",
          "The fix: Missed call text-back sends an automatic text within 60 seconds. 'Hey, this is [Name] from [Business]. I saw you called — I am on a job right now. What do you need help with?' Recovery rate: 30–50% of previously lost leads.",
        ],
      },
      {
        kind: "text",
        id: "leak-2-slow-response",
        title: "Leak #2: Slow follow-up — $30,000 to $80,000 per year",
        paragraphs: [
          "78% of buyers hire the first contractor to respond to their inquiry. Not the most experienced. Not the cheapest. The first. Responding to a lead within 60 seconds increases your conversion rate by 391% compared to responding in 5 minutes. After 5 minutes, the probability of qualifying the lead drops by 80%.",
          "The average contractor takes over 4 hours to respond to an online lead. Four hours. In that time, the homeowner has already contacted, compared, and possibly hired someone else. You never even got to compete.",
          "This is not about sending a sales pitch. It is about acknowledgment. A simple automatic message — 'Got your message. I am finishing up a job right now and will call you back within the hour' — does two things: it tells the customer you are real and responsive, and it stops them from calling your competitor. That 15-second message is worth thousands of dollars per year.",
        ],
        list: [
          "Lead response time is the single strongest predictor of conversion in home services. Stronger than price, stronger than reviews, stronger than years of experience.",
          "The 24-hour follow-up catches leads who were interested but got distracted: 'Hey, just checking if you still need help with that water heater.' This recovers 15–20% of leads that went quiet.",
          "The 72-hour follow-up catches the ones who meant to call back but forgot. Another 5–10% recovery.",
          "41% of online bookings happen after business hours. If a customer fills out your contact form at 9 PM and does not hear back until 9 AM, that is a 12-hour response time. Your competitor with an auto-reply already texted them at 9:01 PM.",
        ],
      },
      {
        kind: "text",
        id: "leak-3-reviews",
        title: "Leak #3: Missing or stale reviews — $20,000 to $50,000 per year",
        paragraphs: [
          "91% of homeowners check reviews before calling a contractor. 70% will not even request a quote from a business rated below 4 stars. 65% expect to see 50 or more reviews before they feel confident hiring you. And 43% of contractors never respond to their reviews — which signals to both customers and Google that the business is either too busy to care or no longer active.",
          "Here is the real cost: a contractor with 3 reviews from 2022 is not competing with the contractor across town who has 75 reviews from the last 6 months. It does not matter that you do better work. It does not matter that you have been in business longer. The customer sees the review gap and makes their decision before they ever call. You lose the job before you even knew it existed.",
          "Reviews are not just social proof. They are the primary ranking signal for Google's Map Pack. Businesses with more recent reviews, higher ratings, and regular owner responses rank higher. And now, AI search engines use review data to determine which businesses to recommend. Low review count is a double penalty: customers do not trust you AND you do not rank.",
        ],
        list: [
          "SMS review requests sent within 2 hours of job completion get 3x the response rate of next-day requests.",
          "A 19% response rate on SMS review requests means: if you complete 10 jobs per week and text each customer, you get 2 new reviews per week, 8 per month, 96 per year.",
          "Responding to every review — including negative ones — increases trust by 88% and signals to Google that your business is actively managed.",
          "Review velocity (new reviews per week) is now weighted more heavily by Google than total review count. 5 reviews per week beats 200 total reviews with no new ones.",
          "The fix: automated review request sent after every job + automatic response to every new review. Zero effort from you after initial setup.",
        ],
      },
      {
        kind: "text",
        id: "leak-4-after-hours",
        title: "Leak #4: After-hours silence — $15,000 to $40,000 per year",
        paragraphs: [
          "41% of online job bookings in home services happen outside of standard business hours. Plumbing emergencies do not respect your office hours. A homeowner with a flooded basement at 10 PM is not going to fill out your contact form and wait until morning. They are going to call three plumbers, and the first one who responds — even with an automated message — gets the job.",
          "This leak is especially costly for emergency-service contractors: plumbers, electricians, and HVAC techs. The jobs that come in after hours tend to be urgent, which means higher willingness to pay and faster conversion. A burst pipe at 11 PM is not a price-shopping call — it is a 'who can come right now' call. Losing these leads is losing your highest-margin work.",
          "The fix is not answering the phone 24/7. The fix is an after-hours auto-reply that captures the lead. 'Hi, this is [Business]. We are closed right now but your message is important. I will call you first thing in the morning — or if this is an emergency, reply to this text and I will get back to you as soon as possible.' This keeps the customer from calling your competitor and gives you first shot at the job when you wake up.",
        ],
      },
      {
        kind: "text",
        id: "leak-5-invisible",
        title: "Leak #5: Being invisible online — $25,000 to $75,000 per year",
        paragraphs: [
          "94% of homeowners begin their search for a contractor online. If your competitor has 50 reviews, a clean professional web presence, and shows up on Google Maps — and you have a half-empty Google Business Profile with 3 reviews from 2021 and no website — you lose before anyone even calls. The homeowner never saw you. You were not in the consideration set.",
          "This leak is the hardest to quantify because you cannot count the leads that never found you. But the data is clear: contractors who rank in the Google Map Pack top 3 get 44% of all clicks for that search. Contractors who are visible on AI search platforms like ChatGPT get leads that convert at 4–23x higher rates. Contractors with professional websites get 2–3x more inquiries than those without.",
          "The compounding problem: invisibility makes every other leak worse. If fewer people find you, you have fewer chances for calls — which means every missed call costs you proportionally more. A contractor who gets 50 calls per month and misses 10 can absorb that loss. A contractor who gets 10 calls per month and misses 4 is in trouble.",
        ],
        list: [
          "84% of consumers trust a business more when it has a professional web presence.",
          "45% now use AI search to find local services. AI recommends only 1.2% of businesses. If you are not visible, you are losing leads from a channel most competitors are not even competing on yet.",
          "The fix: a professional web presence optimized for Google, Maps, and AI search, with Google Business Profile fully managed, and directory listings consistent across 15+ platforms.",
        ],
      },
      {
        kind: "table",
        id: "total-leak",
        title: "The total leak: $135,000–$365,000 per year",
        columns: [
          "Leak",
          "Annual Cost (Low)",
          "Annual Cost (High)",
          "The Fix",
        ],
        rows: [
          ["Missed calls", "$45,000", "$120,000", "Missed call text-back (auto)"],
          ["Slow follow-up", "$30,000", "$80,000", "Instant reply + 24h/72h follow-up"],
          ["Missing/stale reviews", "$20,000", "$50,000", "Auto review requests + replies"],
          ["After-hours silence", "$15,000", "$40,000", "After-hours auto-reply"],
          ["Online invisibility", "$25,000", "$75,000", "Website + GBP + AI search optimization"],
          ["TOTAL", "$135,000", "$365,000", "One integrated system"],
        ],
        note: "These ranges are based on industry data for small to mid-size contracting businesses. Your actual numbers depend on your market, trade, and job values. Even at the low end, the leak dwarfs the cost of fixing it.",
      },
      {
        kind: "callout",
        id: "plug-every-leak",
        title: "Plug every leak with one system — not 7 different tools",
        body: [
          "You could fix each leak individually. Missed call text-back from one provider ($75/mo). CRM from another ($200/mo). Review automation from another ($100/mo). Website from a freelancer ($3,000 + $50/mo hosting). SEO agency ($500/mo). That is 5 logins, 5 bills, and zero integration between them.",
          "Or you could get one system that connects everything. The website feeds the Google ranking. The Google ranking brings calls. The missed call text-back catches the calls you miss. The auto-reply handles after-hours leads. The review requests go out after every job. The reviews improve your ranking. The ranking brings more calls. One system. One bill. Every leak plugged.",
          "At $99–$399 per month with no upfront cost and no contracts, the math is simple. If the system recovers even one extra job per month that you would have lost — one missed call you would not have caught, one lead that would have gone cold, one customer who would have picked your competitor because they had more reviews — it pays for itself many times over.",
          "The real cost is not the monthly fee. The real cost is every day you wait while $500+ in leads leaks out the bottom of your business.",
        ],
      },
      {
        kind: "faq",
        id: "faqs",
        title: "FAQs",
        items: [
          {
            q: "How much does a missed call actually cost a contractor?",
            a: "Industry data puts the average cost of a missed call for home service businesses at $1,200 in lost revenue. This accounts for the job value multiplied by the probability that the caller would have converted to a paying customer. For higher-value trades like HVAC and roofing, a single missed call can cost $3,000–$10,000 in lost revenue.",
          },
          {
            q: "What is missed call text-back and how does it work?",
            a: "When you miss an incoming call, the system automatically sends a text message to the caller within 60 seconds. The message identifies your business and asks how you can help. The caller responds by text, starting a conversation you can continue when you are off the job. It recovers 30–50% of leads that would have been permanently lost.",
          },
          {
            q: "How fast should a contractor respond to a lead?",
            a: "Within 60 seconds is ideal. Data shows that responding within 1 minute increases conversion rates by 391% compared to a 5-minute response. After 5 minutes, the probability of qualifying the lead drops by 80%. The average contractor takes 4+ hours to respond, which is why automation is so important.",
          },
          {
            q: "How many Google reviews does a contractor need to be competitive?",
            a: "10 reviews gets you into consideration. 25 makes you competitive. 50+ with a 4.5 average and consistent new reviews puts you in the top tier for most local markets. But velocity matters more than total count — getting 2–3 new reviews per week signals that your business is active and trusted.",
          },
          {
            q: "What happens to leads that come in after hours?",
            a: "Without an after-hours system, those leads call your competitor. With an auto-reply, they get an immediate text acknowledging their message and capturing their information. 41% of home service bookings happen outside business hours — this is not a small number to ignore.",
          },
          {
            q: "Can one system really fix all five of these leaks?",
            a: "Yes. An integrated lead system handles missed call text-back, instant lead response, automated follow-up sequences, after-hours auto-reply, review automation, and online visibility management in one connected platform. The components are stronger together because each one feeds the others.",
          },
          {
            q: "How much does it cost to set up a lead recovery system?",
            a: "Doing it yourself with separate tools costs $500–$1,200 per month (CRM, review tool, texting platform, website, SEO). An integrated system like QuickLaunchWeb bundles everything for $99–$399 per month with no upfront cost. The ROI math: one recovered lead per month at your average job value covers the cost.",
          },
          {
            q: "How quickly will I see results from fixing these leaks?",
            a: "Missed call recovery and faster response times generate results within the first week. Review automation shows impact within 30 days. SEO and visibility improvements take 60–90 days to compound. Most contractors report measurable increases in calls within the first month and significant growth by month 3.",
          },
        ],
      },
      {
        kind: "related",
        id: "related",
        title: "Related guides",
        items: [
          {
            href: "/guides/contractor-lead-machine-no-ads",
            label: "The Contractor's Lead Machine: Get Calls Without Ads",
            tag: "Pillar",
          },
          {
            href: "/guides/invisible-contractor-ai-search",
            label: "Invisible Contractor: Why Customers Can't Find You",
            tag: "Pillar",
          },
          {
            href: "/guides/how-to-book-more-estimates-contractors",
            label: "How Do Contractors Book More Estimates and Win Bigger Jobs?",
            tag: "Booking",
          },
          {
            href: "/guides/how-to-get-more-customers-website",
            label: "How to Get More Customers From Your Website",
            tag: "Pillar",
          },
        ],
      },
    ],
  },
  {
    slug: "why-website-not-getting-customers",
    type: "pillar",
    title: "Why Your Website Isn't Getting You Customers (And How to Fix It)",
    description:
      "Your website looks fine. You're getting some traffic. But the phone isn't ringing and the contact form is empty. Here's why — and exactly how to fix it.",
    metaTitle: "Why Your Website Isn't Getting You Customers | QuickLaunchWeb",
    metaDescription:
      "Your website isn't broken — it's just not built to convert. Learn the 5 conversion killers on most small business sites and how to fix them fast.",
    kicker: "Pillar Guide",
    category: "Website Conversion",
    updated: "Jan 2026",
    readTime: "10 min read",
    stats: [
      { label: "Average conversion rate", value: "2-5%" },
      { label: "Mobile traffic share", value: "60%+" },
      { label: "Time to fix", value: "48 hours" },
    ],
    heroBullets: [
      "The real reason your website isn't working (it's not traffic).",
      "5 conversion killers hiding on most small business sites.",
      "A simple audit you can do yourself in 10 minutes.",
      "When to fix your current site vs. start fresh.",
    ],
    jumpLinks: [
      { id: "the-real-problem", label: "The real problem" },
      { id: "conversion-killers", label: "5 conversion killers" },
      { id: "audit-checklist", label: "Audit checklist" },
      { id: "fix-vs-replace", label: "Fix vs. replace" },
      { id: "faqs", label: "FAQs" },
      { id: "related", label: "Related" },
    ],
    ctaTop: {
      eyebrow: "Done diagnosing?",
      description: "Get a site built to convert — $0 down, live in 48 hours.",
      href: "/services/web-design#pricing",
      label: "See pricing",
    },
    ctaBottom: {
      title: "Ready for a website that actually works?",
      description: "We build sites that turn visitors into customers. No lock-in — cancel if it's not paying for itself.",
      href: "/services/web-design#pricing",
      label: "Get started",
    },
    aside: {
      takeaways: [
        "Traffic without conversions is wasted traffic.",
        "Most sites fail on clarity, not design.",
        "One clear call-to-action beats five options.",
      ],
      benchmarks: [
        "Phone number visible without scrolling.",
        "Page loads in under 2 seconds on mobile.",
        "One obvious next step on every page.",
        "Trust signals (reviews, photos) in the first scroll.",
      ],
      benchmarkNote:
        "These are minimum standards. Sites that hit all four typically convert 2-3x better than those that don't.",
      roi: [
        "If your average job is $500, one extra lead per month pays for your entire website.",
        "A 1% conversion improvement on 1,000 visitors = 10 more leads.",
        "Speed matters: every second of load time costs you 7% of conversions.",
      ],
      roiNote:
        "Small improvements compound. Fixing even 2-3 issues can double your lead flow.",
    },
    sections: [
      {
        kind: "text",
        id: "the-real-problem",
        title: "The real reason your website isn't working",
        paragraphs: [
          "Here's what most business owners get wrong: they think their website isn't working because they don't have enough traffic. So they pour money into ads, SEO, social media — anything to get more eyeballs on the site.",
          "But traffic isn't the problem. Conversion is.",
          "Think about it: if 1,000 people visit your site and zero of them call you, getting 2,000 visitors won't help. You'll just have twice as many people ignoring you. The issue isn't how many people see your site — it's what happens when they get there.",
          "Most small business websites are built like digital brochures. They look nice. They list services. They have an 'About' page with a photo of the owner. But they don't actually convince anyone to take action. They don't answer the questions visitors have. They don't make the next step obvious. They don't build enough trust to overcome the fear of hiring someone new.",
          "The result? Visitors leave. They hit the back button and call your competitor instead — the one whose site made them feel confident. That's money walking out the door every single day, and you don't even know it's happening.",
        ],
        list: [
          "Traffic without conversion is just expensive vanity metrics.",
          "Your website's job is to turn strangers into customers.",
          "A site that 'looks nice' is worthless if it doesn't generate leads.",
          "Every day without a converting website is leads going to competitors.",
        ],
      },
      {
        kind: "checklist",
        id: "conversion-killers",
        title: "5 conversion killers on most small business sites",
        items: [
          {
            title: "No clear call-to-action",
            detail: "Visitors don't know what to do next. Your phone number is buried. The contact form is hidden on a separate page. There are seven different buttons but none of them stand out. When everything is important, nothing is important. Pick ONE action you want visitors to take and make it impossible to miss.",
          },
          {
            title: "Slow load time",
            detail: "If your site takes more than 3 seconds to load, 53% of mobile visitors leave before seeing anything. They'll never know how good your services are because they're already gone. Speed isn't just nice to have — it's the difference between getting the lead and losing it to someone faster.",
          },
          {
            title: "Not mobile-friendly",
            detail: "Over 60% of your traffic is on phones. If your site is hard to read, requires pinching and zooming, or has buttons too small to tap, you're turning away more than half your potential customers. And they're not coming back on desktop later — they're calling someone else.",
          },
          {
            title: "No trust signals",
            detail: "Would you hire a stranger who can't prove they're legit? Neither will your visitors. If you don't have reviews, photos of your work, years in business, licenses, or any proof that you're trustworthy, people won't take the risk. Trust is built in seconds and destroyed even faster.",
          },
          {
            title: "Confusing navigation",
            detail: "If visitors can't find what they're looking for in 5 seconds, they leave. Clever menu names, hidden contact info, and too many options create friction. Simple wins. Home, Services, About, Contact — that's usually all you need.",
          },
        ],
        note: "Most sites have 2-3 of these issues. Fixing even one can measurably improve your lead flow.",
      },
      {
        kind: "checklist",
        id: "audit-checklist",
        title: "10-minute website audit you can do right now",
        items: [
          {
            title: "Open your site on your phone",
            detail: "Not a tablet, not a desktop preview — your actual phone. Is the text readable without zooming? Can you tap the phone number? Does the main action stand out?",
          },
          {
            title: "Time the page load",
            detail: "Use Google PageSpeed Insights (free). If it takes more than 3 seconds on mobile, you're losing visitors before they even see your content.",
          },
          {
            title: "Find your phone number",
            detail: "Without scrolling, can you see how to contact you? If it's hidden in the footer or on a separate page, you're making it too hard.",
          },
          {
            title: "Count your CTAs",
            detail: "How many different actions are you asking visitors to take? If it's more than 2-3 on a single page, you're creating decision paralysis.",
          },
          {
            title: "Look for trust signals",
            detail: "In the first scroll, do you show reviews, years in business, photos of your work, or any proof? If not, visitors have no reason to trust you.",
          },
          {
            title: "Read your headline out loud",
            detail: "Does it speak to what the CUSTOMER wants, or does it just describe what you do? 'Professional Plumbing Services' vs. 'Pipes Fixed Today — Or It's Free' are very different.",
          },
          {
            title: "Ask a friend to find your services",
            detail: "Give them 10 seconds. If they can't identify what you offer and how to contact you, the site isn't clear enough.",
          },
          {
            title: "Check your forms",
            detail: "How many fields? If it's more than 5, you're asking too much. Name, phone, email, and a brief message is usually enough.",
          },
        ],
        note: "Screenshot what you find. These are your priorities for fixing or replacing the site.",
      },
      {
        kind: "text",
        id: "fix-vs-replace",
        title: "When to fix vs. when to start fresh",
        paragraphs: [
          "Not every website needs to be replaced. Sometimes a few targeted fixes can dramatically improve conversions. But sometimes the foundation is so broken that patching it is like putting lipstick on a pig.",
          "Here's how to decide:",
        ],
        list: [
          "FIX if: Your site is less than 2 years old, loads reasonably fast, and just needs clearer messaging and better CTAs.",
          "FIX if: You have a good design but weak copy — rewriting your headlines and adding trust signals can work.",
          "REPLACE if: Your site is more than 5 years old, built on outdated technology, or was made by a friend's nephew.",
          "REPLACE if: You've tried fixing it multiple times and leads still aren't coming in.",
          "REPLACE if: The site is slow, not mobile-friendly, and would cost more to fix than to rebuild properly.",
        ],
        links: [
          {
            context: "If you decide to start fresh, see",
            label: "how we build sites that convert",
            href: "/services/web-design#features",
            suffix: "in 48 hours with no upfront cost.",
          },
        ],
      },
      {
        kind: "callout",
        id: "bottom-line",
        title: "The bottom line",
        body: [
          "Your website isn't broken. It's just not built to convert. The good news? This is fixable.",
          "Most of these issues can be solved in a single day by someone who knows what they're doing. You don't need a $10,000 agency rebuild. You need a site that's fast, clear, mobile-friendly, and built around ONE goal: getting people to contact you.",
          "Every day you wait is another day of leads going to your competitors. The phone calls that should be coming to you are going somewhere else.",
        ],
      },
      {
        kind: "faq",
        id: "faqs",
        title: "FAQs",
        items: [
          {
            q: "How do I know if my website is the problem vs. something else?",
            a: "Check your analytics. If you're getting traffic but no leads, the site is the problem. If you're getting zero traffic, you have a visibility problem first. Most businesses have both, but conversion should be fixed before pouring money into traffic generation.",
          },
          {
            q: "Can I fix these issues myself?",
            a: "Some of them. You can probably add trust signals, improve your headline, and simplify navigation. But speed issues, mobile responsiveness, and structural problems usually require a developer. The audit above will help you identify what's DIY-friendly.",
          },
          {
            q: "How long does it take to see results after fixing my site?",
            a: "Conversion improvements show up immediately with your next visitors. You should notice more calls and form submissions within the first week if your traffic stays consistent. SEO improvements take longer — typically 4-8 weeks for Google to re-index and reward changes.",
          },
          {
            q: "Is it worth paying someone to fix my site or should I just build a new one?",
            a: "It depends on the scope of issues. If you need more than 3-4 major fixes, a rebuild is often faster and cheaper. If you just need better copy and some trust signals, a few hours of work can transform your results.",
          },
          {
            q: "What's a 'good' conversion rate for a local business website?",
            a: "Most local service websites convert between 2-5% of visitors into leads. Elite sites hit 8-10%. If you're below 2%, there's significant room for improvement. Even getting from 2% to 4% doubles your leads without any change in traffic.",
          },
          {
            q: "Does my website need to look 'modern' or 'pretty' to convert?",
            a: "Not really. Clean and clear beats modern and fancy every time. Some of the highest-converting sites look almost boring. What matters is speed, clarity, trust, and making it obvious what to do next. Pretty comes last.",
          },
        ],
      },
      {
        kind: "related",
        id: "related",
        title: "Related guides",
        items: [
          {
            href: "/guides/how-to-get-more-customers-website",
            label: "How to Get More Customers From Your Website",
            tag: "Pillar",
          },
          {
            href: "/guides/do-you-need-a-website",
            label: "Do You Actually Need a Website to Get Clients?",
            tag: "Pillar",
          },
          {
            href: "/guides/what-pages-business-website-needs-to-convert",
            label: "What Pages Does a Business Website Need?",
            tag: "Support",
          },
        ],
      },
    ],
  },
  {
    slug: "how-to-get-more-customers-website",
    type: "pillar",
    title: "How to Get More Customers From Your Website (Without Paying for Ads)",
    description:
      "Your website should be your best salesperson — working 24/7 to turn strangers into paying customers. Here's how to make it actually do that.",
    metaTitle: "How to Get More Customers From Your Website | QuickLaunchWeb",
    metaDescription:
      "Learn the 3 things every high-converting website needs and free ways to drive traffic. Turn your website into a customer-generating machine.",
    kicker: "Pillar Guide",
    category: "Website Conversion",
    updated: "Jan 2026",
    readTime: "12 min read",
    stats: [
      { label: "High-converting sites", value: "5-10% rate" },
      { label: "Free traffic source", value: "Google Business" },
      { label: "Time to results", value: "Days, not months" },
    ],
    heroBullets: [
      "Why most websites fail (they're brochures, not sales tools).",
      "The 3 things every high-converting site needs.",
      "Free ways to drive traffic without paying for ads.",
      "What 'conversion-focused' actually means in practice.",
    ],
    jumpLinks: [
      { id: "why-sites-fail", label: "Why sites fail" },
      { id: "three-essentials", label: "3 essentials" },
      { id: "free-traffic", label: "Free traffic" },
      { id: "conversion-focused", label: "Conversion-focused" },
      { id: "faqs", label: "FAQs" },
      { id: "related", label: "Related" },
    ],
    ctaTop: {
      eyebrow: "Want a site built this way?",
      description: "We build websites that turn visitors into customers — $0 down, live in 48 hours.",
      href: "/services/web-design#pricing",
      label: "Start free",
    },
    ctaBottom: {
      title: "Ready for a website that sells for you?",
      description: "No lock-in. Cancel if it's not bringing you customers.",
      href: "/services/web-design#pricing",
      label: "Get started",
    },
    aside: {
      takeaways: [
        "Websites should generate customers, not just exist.",
        "Clear beats clever. Simple beats complex.",
        "One strong CTA beats five weak ones.",
      ],
      benchmarks: [
        "Headline answers 'Why should I hire you?'",
        "Phone number clickable on mobile.",
        "At least 3 reviews visible above the fold.",
        "Form has 4 fields or fewer.",
      ],
      benchmarkNote:
        "These aren't 'nice to haves' — they're the baseline for sites that actually convert.",
      roi: [
        "Doubling conversion from 2% to 4% doubles leads with zero extra traffic.",
        "One new customer per month can pay for your site multiple times over.",
        "Free traffic from Google Business is worth $200-500/mo in ads.",
      ],
      roiNote:
        "Most businesses underestimate the value of a website that converts. Do the math on your average job.",
    },
    sections: [
      {
        kind: "text",
        id: "why-sites-fail",
        title: "Why most websites fail (they're brochures, not sales tools)",
        paragraphs: [
          "Here's the uncomfortable truth: most small business websites are expensive digital brochures. They list services. They have an 'About Us' page. They look reasonably professional. And they generate almost zero leads.",
          "Why? Because they were built to 'have a website' — not to get customers. There's a massive difference.",
          "A brochure website says: 'Here's who we are and what we do.' A sales-focused website says: 'Here's your problem, here's how we solve it, here's proof it works, and here's how to get started right now.' One describes. The other persuades.",
          "Think about the last time you hired someone from their website. You didn't care about their history or their team photo. You wanted to know: Can they solve my problem? Are they trustworthy? How do I contact them? Every second of confusion or doubt pushed you closer to hitting the back button.",
          "Your potential customers think the same way. If your website doesn't immediately answer those questions — clearly and confidently — they're gone. And they don't come back. They call the next result on Google, the competitor whose site made them feel certain.",
        ],
        list: [
          "A website isn't a business card — it's a salesperson.",
          "Your site should work when you're not working.",
          "Every element should move visitors toward contacting you.",
          "If your site isn't generating leads, it's costing you money.",
        ],
      },
      {
        kind: "checklist",
        id: "three-essentials",
        title: "The 3 things every high-converting site needs",
        items: [
          {
            title: "A headline that speaks to their problem",
            detail: "Not 'Welcome to ABC Plumbing' — that's about you. Instead: 'Pipes Leaking? Fixed Today or It's Free.' That's about THEM. Your headline should make visitors think 'Yes, that's exactly what I need.' It should answer the question in their head, not introduce your company. You have 3 seconds to hook them or lose them.",
          },
          {
            title: "One obvious next step",
            detail: "Call, form, or book — pick one and make it impossible to miss. Don't make visitors choose between 5 different buttons. Don't hide your phone number in the footer. Don't make them click through 3 pages to find the contact form. One clear action. Visible immediately. On every single page.",
          },
          {
            title: "Proof it works",
            detail: "Reviews. Photos of your work. Years in business. Logos of companies you've worked with. Anything that answers the question 'Why should I trust you?' People don't trust strangers. Give them a reason to trust you before you ask them to call. Real photos beat stock photos. Specific testimonials beat vague ones.",
          },
        ],
        note: "Sites that nail all three typically convert 2-3x better than sites that don't. This isn't theory — it's been tested across thousands of businesses.",
      },
      {
        kind: "text",
        id: "free-traffic",
        title: "Free ways to drive traffic (without paying for ads)",
        paragraphs: [
          "You don't need to spend money on ads to get website traffic. Some of the most valuable traffic is completely free — if you know where to look.",
        ],
        list: [
          "Google Business Profile: This is the single most valuable free traffic source for local businesses. Claim your profile, add photos weekly, respond to reviews, and post updates. Google rewards active profiles with better visibility in local search and Maps.",
          "Local SEO basics: Make sure your website mentions your city and service area. 'Plumber in Austin' beats 'Professional Plumbing Services' for local search. Include your address if you have one. Add city names to your page titles and headings.",
          "Review collection: Ask every happy customer for a Google review. More reviews = more trust = more clicks. A business with 50 reviews gets more calls than one with 5, even if the rating is the same.",
          "Referral traffic: Every customer you delight can send you more customers. Make it easy — give them a card, send a follow-up text, offer a referral discount. Word of mouth is still the most powerful marketing.",
          "Social proof loops: Post your best work on Facebook and Instagram. Link to your website. Neighbors see it, remember you when they have a problem, and search for you specifically.",
        ],
        links: [
          {
            context: "If your site isn't converting the traffic you do have, start with",
            label: "why your website isn't getting you customers",
            href: "/guides/why-website-not-getting-customers",
            suffix: "before worrying about more traffic.",
          },
        ],
      },
      {
        kind: "text",
        id: "conversion-focused",
        title: "What 'conversion-focused' actually means",
        paragraphs: [
          "You'll hear marketers throw around 'conversion-focused' like it's a magic word. But what does it actually mean in practice?",
          "A conversion-focused website is designed around one goal: getting visitors to take action. Every design choice, every word, every button serves that purpose. Nothing is decorative. Nothing is there because 'that's how websites look.' Everything earns its place.",
        ],
        list: [
          "No distractions: Sidebars, animations, and fancy features that don't drive action get cut. Simplicity wins.",
          "Clear hierarchy: The most important information comes first. Your main offer and phone number appear above the fold.",
          "Friction removal: Every click, every form field, every second of load time is friction. Minimize all of it.",
          "Trust-first design: Reviews, photos, and credentials appear early — before you ask anyone to do anything.",
          "Mobile-first: Over 60% of your traffic is on phones. If your site doesn't work perfectly on mobile, you're losing the majority.",
          "Speed obsession: Every second of load time costs you 7% of conversions. Fast isn't optional.",
        ],
      },
      {
        kind: "callout",
        id: "bottom-line",
        title: "The bottom line",
        body: [
          "Your website should be your best salesperson — working 24/7, never taking a break, never having a bad day. If it's not bringing you customers, it's not doing its job.",
          "The good news? A website built the right way doesn't cost tens of thousands of dollars. It doesn't take months to launch. It just takes someone who understands how to build for conversion, not just appearance.",
          "Stop paying for digital brochures. Start paying for results.",
        ],
      },
      {
        kind: "faq",
        id: "faqs",
        title: "FAQs",
        items: [
          {
            q: "How do I know if my website is converting well?",
            a: "Look at your leads-to-visitors ratio. If you get 1,000 visitors a month and less than 20 leads, you're below 2% — which means there's room to improve. Most local service websites should convert between 3-5%. The best hit 8-10%.",
          },
          {
            q: "Do I need to completely rebuild my website?",
            a: "Not always. Sometimes a few targeted changes — better headlines, clearer CTAs, adding reviews — can dramatically improve results. But if your site is slow, not mobile-friendly, or structurally broken, a rebuild is often faster and cheaper than patching.",
          },
          {
            q: "How long before I see results from these changes?",
            a: "Conversion improvements show up immediately with your next visitors. SEO improvements take longer — usually 4-8 weeks for Google to notice and reward changes. Consistency compounds, so stick with it.",
          },
          {
            q: "Is paid advertising worth it for a local business?",
            a: "Only after your website converts. If your site doesn't turn visitors into leads, ads just accelerate the waste. Fix the conversion problem first, then consider ads to amplify what's already working.",
          },
          {
            q: "What's the fastest way to get more leads from my website?",
            a: "Add your phone number to the header of every page, make it clickable on mobile, and add 3-5 recent reviews to your homepage. These three changes take an hour and can increase leads noticeably within days.",
          },
          {
            q: "How important is design vs. copy?",
            a: "Copy wins. A beautifully designed site with weak copy will underperform a simple site with strong copy. Clarity beats cleverness. Specific beats vague. Benefits beat features. Get the words right first, then polish the design.",
          },
        ],
      },
      {
        kind: "related",
        id: "related",
        title: "Related guides",
        items: [
          {
            href: "/guides/why-website-not-getting-customers",
            label: "Why Your Website Isn't Getting Customers",
            tag: "Pillar",
          },
          {
            href: "/guides/do-you-need-a-website",
            label: "Do You Actually Need a Website to Get Clients?",
            tag: "Pillar",
          },
          {
            href: "/guides/what-pages-business-website-needs-to-convert",
            label: "What Pages Does a Business Website Need?",
            tag: "Support",
          },
        ],
      },
    ],
  },
  {
    slug: "do-you-need-a-website",
    type: "pillar",
    title: "Do You Actually Need a Website to Get Clients? (Honest Answer)",
    description:
      "Everyone says you need a website. But do you really? Here's the honest truth about when you need one, when you don't, and what it should actually do for you.",
    metaTitle: "Do You Actually Need a Website to Get Clients? | QuickLaunchWeb",
    metaDescription:
      "The honest answer about whether your business needs a website. Learn when you DON'T need one, when you definitely DO, and what it costs to not have one.",
    kicker: "Pillar Guide",
    category: "Website Strategy",
    updated: "Jan 2026",
    readTime: "9 min read",
    stats: [
      { label: "People who research online", value: "81%" },
      { label: "Who check websites first", value: "70%" },
      { label: "Time to launch", value: "48 hours" },
    ],
    heroBullets: [
      "The honest answer (it depends on your business).",
      "When you DON'T need a website (rare, but real).",
      "When you absolutely DO (most cases).",
      "What a website should actually do for you.",
    ],
    jumpLinks: [
      { id: "honest-answer", label: "The honest answer" },
      { id: "when-you-dont", label: "When you don't need one" },
      { id: "when-you-do", label: "When you do" },
      { id: "what-it-should-do", label: "What it should do" },
      { id: "cost-of-not-having", label: "Cost of not having one" },
      { id: "faqs", label: "FAQs" },
      { id: "related", label: "Related" },
    ],
    ctaTop: {
      eyebrow: "Not sure?",
      description: "Get a site in 48 hours — $0 down, cancel if it doesn't work for you.",
      href: "/services/web-design#pricing",
      label: "Try it risk-free",
    },
    ctaBottom: {
      title: "Ready to stop losing customers?",
      description: "No lock-in. If the website isn't paying for itself, walk away.",
      href: "/services/web-design#pricing",
      label: "Get started",
    },
    aside: {
      takeaways: [
        "Most local businesses need a website. Full stop.",
        "The question is whether it's WORKING, not whether you have one.",
        "A bad website can be worse than no website.",
      ],
      benchmarks: [
        "81% of people research online before buying locally.",
        "70% check a business's website before visiting or calling.",
        "46% of Google searches are for local information.",
        "People trust businesses with websites more than those without.",
      ],
      benchmarkNote:
        "These stats apply to most local service businesses. Your specific market may vary, but the trend is clear.",
      roi: [
        "If your average job is $500, one customer covers 5 months of a $99 website.",
        "Lost leads from no website cost FAR more than any website plan.",
        "A website works while you sleep — you can't answer the phone at 2am.",
      ],
      roiNote:
        "The question isn't 'Can I afford a website?' — it's 'Can I afford NOT to have one?'",
    },
    sections: [
      {
        kind: "text",
        id: "honest-answer",
        title: "The honest answer",
        paragraphs: [
          "Here's the truth that website companies don't want you to hear: not every business needs a website. There, I said it.",
          "But here's the other truth: MOST businesses do. And if you're reading this guide, you're probably one of them.",
          "The question isn't really 'Do I need a website?' — it's 'How are my customers finding me?' If people can discover you, trust you, and contact you without ever visiting a website, you might be fine without one. But for the vast majority of local service businesses, that's not reality.",
          "Let's be specific. I'm going to tell you when you probably DON'T need a website, and then when you absolutely DO. Spoiler: the 'don't need' list is very short.",
        ],
      },
      {
        kind: "checklist",
        id: "when-you-dont",
        title: "When you DON'T need a website (rare, but real)",
        items: [
          {
            title: "100% referral-based business",
            detail: "If every single customer comes from word of mouth and you can't handle more work anyway, a website might not be urgent. This is rare. Most businesses that claim to be 'referral only' are actually leaving money on the table.",
          },
          {
            title: "Hyperlocal, in-person only",
            detail: "A food truck at the same farmers market every Saturday, a tailor in a small town where everyone knows you, a handyman who only works for his neighbors. If your entire business is face-to-face and geography-locked, you can survive on reputation alone.",
          },
          {
            title: "Already maxed out",
            detail: "If you genuinely cannot take on more work and have no plans to grow, hire, or raise prices, a website is unnecessary overhead. But be honest — is that really true, or are you just avoiding the decision?",
          },
        ],
        note: "Notice how narrow these exceptions are? If you don't fit clearly into one of these, you probably need a website.",
      },
      {
        kind: "checklist",
        id: "when-you-do",
        title: "When you absolutely need a website",
        items: [
          {
            title: "People search for your services",
            detail: "If anyone Googles 'plumber near me' or 'landscaper in Austin' and you want to show up, you need a website. Period. Google Business Profile helps, but a website gives you more control, more content, and more credibility.",
          },
          {
            title: "Referrals check you out first",
            detail: "Someone recommends you. What does the person do next? They Google your business name. If nothing comes up — or worse, a competitor does — you've lost credibility before you ever spoke to them. A website catches referrals who want to verify you're legit.",
          },
          {
            title: "You compete on trust",
            detail: "Letting strangers into your home? Working on expensive equipment? Handling someone's money or legal matters? These high-trust services require proof. Reviews, photos, credentials — all displayed on a website you control.",
          },
          {
            title: "You want to grow",
            detail: "If you ever want more customers, to hire employees, to raise your prices, or to sell the business someday, you need online presence. A website is the foundation of a real business, not just a side hustle.",
          },
          {
            title: "Your competitors have one",
            detail: "If the other plumbers, cleaners, or landscapers in your area have websites and you don't, you're handing them credibility for free. Customers compare. Make sure you're in the comparison.",
          },
        ],
        note: "If you checked even ONE of these, a website isn't optional — it's costing you money every day you don't have one.",
      },
      {
        kind: "text",
        id: "what-it-should-do",
        title: "What a website should actually do for you",
        paragraphs: [
          "Here's where most business owners get it wrong: they think a website is a digital business card. Just a place to put your logo, hours, and phone number. That's the bare minimum, and it's not enough.",
          "A real business website should be your best salesperson. It should work 24/7 to convince strangers to call you. It should answer questions, overcome objections, build trust, and make the next step obvious.",
        ],
        list: [
          "Show up when people search: SEO basics so you're findable on Google.",
          "Build instant trust: Reviews, photos, credentials visible immediately.",
          "Answer common questions: So people feel informed before they call.",
          "Make contact easy: One tap to call, simple form, clear next step.",
          "Work on mobile: Because that's where most people will see it.",
          "Load fast: Slow sites lose visitors before they even see your offer.",
          "Capture leads 24/7: Take messages when you can't answer the phone.",
        ],
        links: [
          {
            context: "Want to know why your current site isn't doing this?",
            label: "Why your website isn't getting you customers",
            href: "/guides/why-website-not-getting-customers",
            suffix: "breaks down the common problems.",
          },
        ],
      },
      {
        kind: "text",
        id: "cost-of-not-having",
        title: "The cost of NOT having a website",
        paragraphs: [
          "Let's talk about what you're actually losing by not having a website — or by having a bad one that doesn't convert.",
        ],
        list: [
          "Lost credibility: 'I Googled you and couldn't find anything' is an instant red flag for customers. They'll call someone else.",
          "Missed referrals: People recommend you, but the referral can't find you or verify you're real. They call a competitor instead.",
          "Invisible to searchers: Every 'plumber near me' search you don't show up for is a potential customer going elsewhere.",
          "No 24/7 presence: When someone needs you at 11pm, they can't leave a message on a website you don't have. They'll call the guy who does.",
          "Lower perceived value: Businesses with professional websites can charge more. No website signals 'small time' or 'unprofessional.'",
          "Harder to grow: Try hiring someone or getting a loan without a business website. It's a legitimacy signal that matters.",
        ],
      },
      {
        kind: "callout",
        id: "bottom-line",
        title: "The bottom line",
        body: [
          "The question isn't whether you can afford a website. It's whether you can afford the customers you're losing without one.",
          "For most local service businesses, a professional website pays for itself quickly — usually with a single new customer. And with options like $99/month subscription sites with no upfront cost, the barrier to entry has never been lower.",
          "If you're still on the fence, try this: launch a simple site in 48 hours with a no-lock-in plan. If it doesn't bring you customers in 90 days, cancel. You've lost nothing but a few hundred dollars. But if it works — and for most businesses, it does — you've built a customer-generating machine that works while you sleep.",
        ],
      },
      {
        kind: "faq",
        id: "faqs",
        title: "FAQs",
        items: [
          {
            q: "Can't I just use Facebook or Instagram instead of a website?",
            a: "Social media is great for engagement, but it's not a replacement. You don't own it — Facebook can change the rules or shut you down anytime. You can't rank in Google searches. You can't customize the experience. Use social media AND a website.",
          },
          {
            q: "What about Google Business Profile? Isn't that enough?",
            a: "Google Business Profile is essential, but it's limited. You control the basics — hours, photos, reviews. But you can't write long-form content, answer complex questions, or build the kind of trust that closes high-value jobs. GBP is a supplement, not a replacement.",
          },
          {
            q: "My nephew can build me a website. Is that good enough?",
            a: "Maybe. Does your nephew understand conversion optimization? SEO? Mobile-first design? Loading speed? If the site looks nice but doesn't generate leads, it's not doing its job. A cheap site that doesn't convert is more expensive than a proper site that does.",
          },
          {
            q: "How much should a small business website cost?",
            a: "Traditional agencies charge $3,000 to $10,000 upfront. That's overkill for most local businesses. Subscription models like ours are $99/month with $0 down. Do the math: if your average job is $500 and the site brings you one extra customer per month, it pays for itself 5x over.",
          },
          {
            q: "How long does it take to get a website up?",
            a: "With modern template-based approaches, a professional site can be live in 48 hours if you have your content ready. Complex custom sites take longer. For most local businesses, faster is better — every day without a site is potential customers lost.",
          },
          {
            q: "What if I get a website and it doesn't work?",
            a: "That's why no-lock-in plans exist. Try it for a few months. If you're not getting leads, either the site needs work or (rarely) you're in that small group that doesn't need one. Cancel and move on. But most businesses that get a proper conversion-focused site see results.",
          },
        ],
      },
      {
        kind: "related",
        id: "related",
        title: "Related guides",
        items: [
          {
            href: "/guides/why-website-not-getting-customers",
            label: "Why Your Website Isn't Getting Customers",
            tag: "Pillar",
          },
          {
            href: "/guides/how-to-get-more-customers-website",
            label: "How to Get More Customers From Your Website",
            tag: "Pillar",
          },
          {
            href: "/guides/what-pages-business-website-needs-to-convert",
            label: "What Pages Does a Business Website Need?",
            tag: "Support",
          },
        ],
      },
    ],
  },
  {
    slug: "monthly-website-plan-whats-included",
    type: "support",
    title: "Whats Included in a Monthly Website Plan? (Full Breakdown)",
    description:
      "A monthly website plan usually includes the website build, hosting, security, and a set number of edits each month. The scope varies by provider, so this guide shows what to expect and what is typically extra.",
    metaTitle: "Whats Included in a Monthly Website Plan? | QuickLaunchWeb",
    metaDescription:
      "A clear breakdown of what is included in a monthly website plan, what is usually extra, and how to compare providers.",
    kicker: "Support Guide",
    category: "Website Conversion",
    updated: "Jan 2026",
    readTime: "6 min read",
    heroBullets: [
      "Build, hosting, and updates are usually bundled.",
      "Ask about edit limits and turnaround times.",
      "Know what is included before comparing pricing.",
    ],
    jumpLinks: [
      { id: "quick-breakdown", label: "Quick breakdown" },
      { id: "extra", label: "Whats extra" },
      { id: "comparison", label: "Comparison table" },
      { id: "faqs", label: "FAQs" },
    ],
    supportCta: {
      title: "Want us to handle this for you?",
      href: "/guides/why-website-not-getting-customers",
      label: "Read: Why Your Website Isn't Getting Customers",
    },
    sections: [
      {
        kind: "text",
        id: "overview",
        title: "What you should expect from a monthly website plan",
        paragraphs: [
          "A monthly website plan bundles the build, hosting, and ongoing maintenance into one predictable monthly payment. Instead of paying thousands upfront and then scrambling to find someone for updates, you get a complete package that keeps your site current without surprise invoices.",
          "The specific inclusions vary by provider, but quality plans share common elements. Understanding what should be standard helps you spot plans that underdeliver or overcharge. Use this breakdown to compare providers and ask the right questions before signing up.",
          "The best monthly plans treat your website as a living asset. They include regular updates so your site evolves with your business instead of sitting stagnant for years. This ongoing relationship is the key difference between monthly plans and traditional one time builds.",
        ],
      },
      {
        kind: "checklist",
        id: "quick-breakdown",
        title: "What is typically included",
        items: [
          {
            title: "Initial website build",
            detail: "A focused site designed around your services, service area, and target customers. Most plans include 3 to 7 pages to start.",
          },
          {
            title: "Hosting and SSL",
            detail: "Secure, fast hosting with an SSL certificate included. You should not pay extra for basic hosting or security.",
          },
          {
            title: "Ongoing updates",
            detail: "A set number of content edits each month, typically 2 to 4 requests. This covers text changes, image swaps, and seasonal offers.",
          },
          {
            title: "Mobile first design",
            detail: "Pages built to load fast and read well on phones. Over half your visitors are on mobile, so this is non negotiable.",
          },
          {
            title: "Basic SEO setup",
            detail: "Proper title tags, meta descriptions, heading structure, and local keyword placement. This gives you a foundation for search visibility.",
          },
          {
            title: "Lead capture forms",
            detail: "Contact forms with email notifications so you never miss an inquiry. Some plans include basic tracking.",
          },
          {
            title: "Technical maintenance",
            detail: "Software updates, security patches, and uptime monitoring handled for you. No need to worry about the technical details.",
          },
        ],
        note: "Always confirm what counts as an edit, how fast changes are handled, and whether unused edits roll over.",
      },
      {
        kind: "text",
        id: "extra",
        title: "What is usually extra",
        paragraphs: [
          "Some services are commonly outside the base plan. Knowing this helps you avoid surprises and compare providers accurately. It is not a red flag if these are extra, but you should know before you sign up.",
          "Extra services typically require more specialized skills, take significantly more time, or have ongoing costs beyond the standard plan. Some providers bundle more into premium tiers, so always ask about upgrade options if you need these services.",
        ],
        list: [
          "Advanced SEO including content creation, link building, and citation management.",
          "Ecommerce, payment processing, or online booking integrations.",
          "Professional photography or video production.",
          "Major redesigns or full page additions beyond monthly edits.",
          "Custom development for unique functionality or third party integrations.",
          "Social media management or advertising campaigns.",
        ],
      },
      {
        kind: "table",
        id: "comparison",
        title: "Included vs usually extra",
        columns: ["Feature", "Included", "Usually extra"],
        rows: [
          ["Hosting + SSL", "Yes", "No"],
          ["Mobile first design", "Yes", "No"],
          ["Lead form setup", "Yes", "No"],
          ["Monthly content edits", "Yes", "No"],
          ["Basic on page SEO", "Yes", "No"],
          ["Copywriting support", "Sometimes", "Sometimes"],
          ["Advanced ongoing SEO", "Rarely", "Often"],
          ["Custom integrations", "Sometimes", "Often"],
          ["Ecommerce features", "Rarely", "Often"],
        ],
      },
      {
        kind: "text",
        id: "compare-plans",
        title: "How to compare plans quickly",
        paragraphs: [
          "Compare plans by the parts that affect your day to day work: how many pages you get, how fast edits are handled, and whether analytics are included. Price matters, but the cheapest plan is not always the best value if it skimps on service.",
          "Ask about response times for update requests. Some providers turn around changes within 24 to 48 hours, while others take a week or more. If you run promotions or need quick changes, response time matters more than raw edit count.",
        ],
        list: [
          "Ask how many pages are included and what additional pages cost.",
          "Confirm the turnaround time for updates and whether rush requests are possible.",
          "Verify that hosting, SSL, and analytics are part of the plan.",
          "Look for a simple cancellation policy with no long term lock in.",
          "Check whether unused edits roll over or expire each month.",
        ],
        links: [
          {
            context: "If you want to understand why some sites convert and others don't, start with",
            label: "why your website isn't getting customers",
            href: "/guides/why-website-not-getting-customers",
            suffix: "and then compare providers.",
          },
          {
            context: "For pricing tradeoffs, read",
            label: "pay monthly web design vs upfront agencies",
            href: "/guides/pay-monthly-web-design-vs-upfront",
            suffix: "for a side by side view.",
          },
        ],
      },
      {
        kind: "faq",
        id: "faqs",
        title: "FAQs",
        items: [
          {
            q: "Do monthly plans include updates?",
            a: "Yes, most plans include a set number of content edits per month, typically between 2 and 4 requests. Some plans offer unlimited small edits while others cap requests or time. Always confirm the specific limits and what counts as one edit.",
          },
          {
            q: "Is hosting included?",
            a: "Quality plans include hosting and SSL in the monthly fee. If a provider says hosting is extra, add that cost to your comparison. A plan that seems cheap can become expensive when you factor in separate hosting charges.",
          },
          {
            q: "Can I add pages later?",
            a: "Usually yes. Most providers offer additional pages as one time add ons or include more pages in higher tier plans. Common add ons include service pages, location pages, and landing pages for specific campaigns.",
          },
          {
            q: "Do plans include SEO?",
            a: "Most include basic on page SEO like title tags, meta descriptions, and heading structure. Ongoing SEO work such as content creation, backlink building, and local citation management is typically a separate service with its own pricing.",
          },
          {
            q: "What happens if I cancel?",
            a: "Policies vary. Most providers let you cancel with 30 days notice. Ask what happens to your domain, your content, and whether you can export anything. Some providers will transfer your domain, while the site itself typically stays on their platform.",
          },
          {
            q: "How do I know if a plan is worth it?",
            a: "Calculate the total 12 month cost and compare it to what you would pay for a one time build plus hosting plus paid updates. If you make at least a few changes per month, monthly plans usually win on cost and convenience.",
          },
        ],
      },
    ],
  },
  {
    slug: "pay-monthly-web-design-vs-upfront",
    type: "support",
    title: "Pay Monthly Web Design vs Upfront Agencies: Whats Better?",
    description:
      "Pay monthly web design spreads the cost and bundles updates, while upfront agencies charge a large one time build plus maintenance. The better choice depends on cash flow, update frequency, and how fast you need to launch.",
    metaTitle: "Pay Monthly Web Design vs Upfront Agencies | QuickLaunchWeb",
    metaDescription:
      "A simple comparison of pay monthly web design vs upfront agencies, plus a checklist to decide fast.",
    kicker: "Support Guide",
    category: "Website Conversion",
    updated: "Jan 2026",
    readTime: "6 min read",
    heroBullets: [
      "Monthly plans spread cost and include updates.",
      "Upfront agencies focus on large one time builds.",
      "The right choice depends on timeline and budget.",
    ],
    jumpLinks: [
      { id: "comparison", label: "Comparison table" },
      { id: "monthly-better", label: "When monthly wins" },
      { id: "upfront-better", label: "When upfront wins" },
      { id: "faqs", label: "FAQs" },
    ],
    supportCta: {
      title: "Want us to handle this for you?",
      href: "/guides/why-website-not-getting-customers",
      label: "Read: Why Your Website Isn't Getting Customers",
    },
    sections: [
      {
        kind: "text",
        id: "overview",
        title: "The core difference between monthly and upfront pricing",
        paragraphs: [
          "Pay monthly web design and upfront agencies solve the same problem differently. Monthly plans spread the cost over time and include ongoing updates, while upfront agencies deliver a complete project for one large payment. Which is better depends on your cash flow, how often you need updates, and how fast you need to launch.",
          "Neither model is inherently better. The right choice depends on your specific situation. Local service businesses often benefit from monthly plans because they need regular updates and predictable costs. Larger companies with established budgets and complex needs may prefer the upfront agency model.",
          "This guide breaks down when each model wins so you can make a fast, confident decision without second guessing.",
        ],
      },
      {
        kind: "table",
        id: "comparison",
        title: "Pay monthly vs upfront agencies",
        columns: ["Factor", "Pay monthly", "Upfront agency"],
        rows: [
          ["Upfront cost", "$0-$299", "$3,000-$8,000+"],
          ["Monthly cost", "$99-$249", "$25-$150 for hosting/maintenance"],
          ["Ongoing updates", "Included in monthly fee", "Extra cost per request"],
          ["Launch speed", "Fast, 1-2 weeks", "Slower, 4-10 weeks"],
          ["12 month total cost", "$1,200-$3,000", "$3,500-$10,000+"],
          ["Best for", "Local services, steady updates", "Large custom projects"],
        ],
      },
      {
        kind: "checklist",
        id: "monthly-better",
        title: "When pay monthly is better",
        items: [
          { title: "You want predictable cash flow", detail: "Avoid a large upfront payment and budget a fixed monthly cost instead. This is especially helpful for new or growing businesses." },
          { title: "You change offers often", detail: "Monthly updates keep your pages current with seasonal promotions, new services, and updated pricing without extra invoices." },
          { title: "You need to launch fast", detail: "Smaller scope and streamlined process means you can be live in days instead of months." },
          { title: "You value ongoing partnership", detail: "A monthly relationship means your provider is incentivized to keep you happy and your site performing well." },
          { title: "Your website is a lead generation tool", detail: "If your site drives business, having a partner who continuously improves it pays dividends." },
        ],
      },
      {
        kind: "checklist",
        id: "upfront-better",
        title: "When upfront agencies are better",
        items: [
          { title: "You need a complex custom build", detail: "Large sites with custom functionality, integrations, or extensive custom design benefit from an agency process." },
          { title: "Brand overhaul is the priority", detail: "If you need a full rebrand with custom design systems, photography, and brand guidelines, agencies deliver more comprehensive packages." },
          { title: "You want full ownership day one", detail: "Owning the site outright with no monthly dependency appeals to businesses that prefer complete control." },
          { title: "You rarely need updates", detail: "If your site will stay mostly static, paying upfront may be cheaper over time than monthly fees." },
          { title: "You have budget available now", detail: "If cash flow is not a concern and you want to invest in a premium build, agencies can deliver excellent results." },
        ],
      },
      {
        kind: "text",
        id: "decision-filter",
        title: "A quick decision filter",
        paragraphs: [
          "Decide based on how often the site needs to change. If you update frequently or want a partner for ongoing optimization, pay monthly plans usually win. If you need a large custom build and have budget now, an agency can deliver excellent results.",
          "Do the math on total cost. A $149 per month plan is $1,788 per year. An agency that charges $5,000 upfront plus $50 per month for hosting is $5,600 in year one and adds up from there. Factor in paid updates at agencies, often $75 to $150 per change, and the monthly model often comes out ahead.",
          "Consider the relationship. Monthly providers are motivated to keep you happy because you can cancel. Agencies get paid upfront, so the incentive to stay responsive fades after launch. Think about which dynamic you prefer.",
        ],
        list: [
          "Add up your 12 month cost for each option and compare total spend.",
          "Estimate how many updates you will need and factor in per request fees at agencies.",
          "Ask about turnaround times and revision limits before signing.",
          "Choose the model that fits your cash flow and update needs today.",
        ],
        links: [
          {
            context: "Start with",
            label: "why your website isn't getting customers",
            href: "/guides/why-website-not-getting-customers",
            suffix: "to understand what matters most.",
          },
          {
            context: "If you want to compare inclusions, read",
            label: "Whats included in a monthly website plan",
            href: "/guides/monthly-website-plan-whats-included",
            suffix: "for a checklist.",
          },
        ],
      },
      {
        kind: "faq",
        id: "faqs",
        title: "FAQs",
        items: [
          {
            q: "Is pay monthly web design more expensive long term?",
            a: "Not always, and often it is less. Over 12 to 24 months, monthly plans can cost less than a large upfront build when you factor in hosting, maintenance, and paid updates. The key is comparing total cost of ownership, not just the initial number.",
          },
          {
            q: "Do upfront agencies include hosting?",
            a: "Some do, but many charge hosting and maintenance separately, typically $25 to $150 per month. Always ask for the full monthly cost after launch so you can compare apples to apples.",
          },
          {
            q: "Can I switch models later?",
            a: "Yes. Many businesses start with a monthly plan to get live quickly and switch to a custom agency build later when revenue supports it. Or they start with an agency and switch to a monthly provider for ongoing maintenance.",
          },
          {
            q: "Which model launches faster?",
            a: "Monthly plans are usually faster because scope is tighter and the process is streamlined. Agencies often have longer timelines due to more complex projects, more stakeholders, and more rounds of revisions.",
          },
          {
            q: "What about quality differences?",
            a: "Quality depends on the provider, not the model. There are excellent monthly providers and mediocre agencies, and vice versa. Check portfolios, read reviews, and talk to past clients before assuming one model produces better work.",
          },
          {
            q: "Can I get a custom design with a monthly plan?",
            a: "Yes. Most quality monthly providers create custom designs tailored to your brand, not cookie cutter templates. The scope may be smaller, but the design should still be unique to your business.",
          },
        ],
      },
    ],
  },
  {
    slug: "wix-vs-hiring-someone-to-build-website",
    type: "support",
    title: "Wix vs Hiring Someone: Whats Better for a Business Website?",
    description:
      "Wix is great for DIY speed and low cost, while hiring someone delivers a more polished site that converts without taking your time. The best choice depends on your budget, timeline, and how important leads are to your business.",
    metaTitle: "Wix vs Hiring Someone for a Business Website | QuickLaunchWeb",
    metaDescription:
      "A clear comparison of Wix vs hiring someone to build your website, plus a checklist to decide fast.",
    kicker: "Support Guide",
    category: "Website Conversion",
    updated: "Jan 2026",
    readTime: "6 min read",
    heroBullets: [
      "Wix saves money but costs time.",
      "Hiring someone improves conversion and trust.",
      "Choose based on time, budget, and lead value.",
    ],
    jumpLinks: [
      { id: "comparison", label: "Comparison table" },
      { id: "wix", label: "When Wix wins" },
      { id: "hire", label: "When hiring wins" },
      { id: "faqs", label: "FAQs" },
    ],
    supportCta: {
      title: "Want us to handle this for you?",
      href: "/guides/how-to-get-more-customers-website",
      label: "Read: How to Get More Customers",
    },
    sections: [
      {
        kind: "text",
        id: "overview",
        title: "Understanding the Wix vs hire decision",
        paragraphs: [
          "The choice between Wix and hiring someone comes down to three factors: your budget, your time, and how important your website is for generating leads. Wix and similar builders let you create a site yourself for minimal cost, but require significant time and design skill. Hiring someone costs more upfront but saves time and typically delivers better results.",
          "Both options can produce a functional website. The difference is in quality, conversion rate, and how much of your time gets consumed. For many local businesses, the website is a critical sales tool, and the ROI of a professional build far exceeds the cost difference.",
          "This guide helps you evaluate your situation honestly so you can make the right call without overthinking it.",
        ],
      },
      {
        kind: "table",
        id: "comparison",
        title: "Wix vs hiring someone",
        columns: ["Factor", "Wix (DIY)", "Hire someone"],
        rows: [
          ["Upfront cost", "$0-$300", "$1,000-$6,000"],
          ["Monthly cost", "$15-$40", "$0-$150 for hosting"],
          ["Time required from you", "20-60+ hours", "2-5 hours"],
          ["Design quality", "Depends on your skill", "Professional"],
          ["Conversion optimization", "Basic at best", "Built in"],
          ["SEO setup", "Manual, often missed", "Included"],
          ["Ongoing updates", "DIY", "Often handled for you"],
          ["Mobile optimization", "Template dependent", "Professional focus"],
        ],
      },
      {
        kind: "checklist",
        id: "wix",
        title: "When Wix makes sense",
        items: [
          { title: "You have time to learn and build", detail: "You can dedicate 20 to 60 hours to learning the platform, creating content, choosing layouts, and refining the design without neglecting your core business." },
          { title: "Budget is extremely tight", detail: "You genuinely cannot spend more than a few hundred dollars, and any website is better than no website at this stage." },
          { title: "Your needs are simple", detail: "You just need basic information online and do not depend heavily on website leads to drive revenue." },
          { title: "You enjoy design and tech", detail: "You actually like building things and would find the process enjoyable rather than frustrating." },
          { title: "The site is temporary", detail: "You need something for a short term project or pop up venture and do not need it to perform long term." },
        ],
      },
      {
        kind: "checklist",
        id: "hire",
        title: "When hiring someone is better",
        items: [
          { title: "Leads and conversions matter", detail: "Your website is a primary source of new business, and a higher converting site directly impacts revenue." },
          { title: "Your time is valuable", detail: "The 20 to 60 hours a DIY build takes could generate more money if spent on your actual work." },
          { title: "You need a polished, professional look", detail: "First impressions matter in your industry, and a templated DIY site would undermine credibility." },
          { title: "You do not enjoy tech or design", detail: "The thought of dragging boxes around a screen for hours fills you with dread rather than excitement." },
          { title: "You want it done right the first time", detail: "Many DIY sites get abandoned halfway or rebuilt later. Hiring someone avoids the false start." },
        ],
      },
      {
        kind: "text",
        id: "decision",
        title: "A quick way to decide",
        paragraphs: [
          "If the website is a core sales tool, hiring someone usually pays off. A professional build can improve trust, shorten the sales cycle, and increase qualified calls. The question is not whether you can build a website yourself, it is whether doing so is the best use of your limited time.",
          "Do a simple ROI calculation. If your average job value is $500 and a professional website helps you close one extra lead per month, the investment pays for itself in a few months. Compare that to spending 40 plus hours on a DIY site that converts at half the rate.",
          "Be honest with yourself about time. Most business owners dramatically underestimate how long a DIY build takes. What starts as a weekend project turns into weeks of tweaking, and the site often launches half finished or never at all.",
        ],
        list: [
          "Estimate what one extra job is worth and compare it to the build cost.",
          "Be honest about how much time you can realistically spend on DIY.",
          "Consider opportunity cost: what else could you accomplish with those hours?",
          "Choose the option that gets you live and converting faster.",
        ],
        links: [
          {
            context: "Want more traffic without ads? Read",
            label: "how to get more customers from your website",
            href: "/guides/how-to-get-more-customers-website",
            suffix: "for free strategies.",
          },
          {
            context: "To plan the page structure, see",
            label: "what pages a business website needs to convert",
            href: "/guides/what-pages-business-website-needs-to-convert",
            suffix: "before you build.",
          },
        ],
      },
      {
        kind: "faq",
        id: "faqs",
        title: "FAQs",
        items: [
          {
            q: "Is Wix good enough for a local business?",
            a: "It can be if you have design skills, time to invest, and your needs are simple. However, most local businesses depend on their website for leads, and conversion focused design requires expertise most business owners do not have. A professional build often delivers significantly better results.",
          },
          {
            q: "How much time does Wix actually take?",
            a: "Most business owners spend 20 to 60 hours or more on a DIY build when you count learning the platform, creating content, choosing and customizing templates, sourcing images, and refining the design. Many never finish, or launch something they are not happy with.",
          },
          {
            q: "Will hiring someone improve SEO?",
            a: "Yes. Professionals include proper SEO setup such as title tags, meta descriptions, heading structure, image optimization, and site speed improvements. DIY builders often skip these steps or do them incorrectly because they do not know what matters.",
          },
          {
            q: "Can I start on Wix and hire later?",
            a: "Yes, but many businesses end up rebuilding entirely once they want a more professional presence. The time spent on the DIY version becomes sunk cost. If you think you will eventually want a professional site, consider skipping the DIY phase altogether.",
          },
          {
            q: "What about Squarespace or other builders?",
            a: "The same principles apply. All DIY builders require your time and skill. Some have prettier templates, but none replace professional strategy, copywriting, and conversion optimization. The tool matters less than who is using it.",
          },
          {
            q: "How do I find someone good to hire?",
            a: "Look for providers who specialize in local service businesses, show examples of sites similar to yours, explain their process clearly, and can articulate how they optimize for conversions. Avoid the cheapest option, as you usually get what you pay for.",
          },
        ],
      },
    ],
  },
  {
    slug: "what-pages-business-website-needs-to-convert",
    type: "support",
    title: "What Pages Does a Business Website Need to Get Leads?",
    description:
      "A lead ready business website needs a clear Home page, Services page, proof, and a Contact page that is easy to use. Additional pages add trust and SEO, but the core structure should stay simple.",
    metaTitle: "What Pages Does a Business Website Need? | QuickLaunchWeb",
    metaDescription:
      "A practical guide to the essential pages every business website needs to convert visitors into leads.",
    kicker: "Support Guide",
    category: "Website Conversion",
    updated: "Jan 2026",
    readTime: "7 min read",
    heroBullets: [
      "Keep the core pages simple and focused.",
      "Every page should drive a next step.",
      "Proof and clarity beat extra pages.",
    ],
    jumpLinks: [
      { id: "essential", label: "Essential pages" },
      { id: "table", label: "Page goals" },
      { id: "optional", label: "Optional pages" },
      { id: "faqs", label: "FAQs" },
    ],
    supportCta: {
      title: "Want us to handle this for you?",
      href: "/guides/how-to-get-more-customers-website",
      label: "Read: How to Get More Customers",
    },
    sections: [
      {
        kind: "text",
        id: "overview",
        title: "The minimum pages that actually drive leads",
        paragraphs: [
          "A lead ready business website does not need dozens of pages. It needs the right pages, structured clearly, with obvious next steps. Most local service businesses can generate consistent leads with just four to six well built pages.",
          "The mistake most businesses make is adding pages without purpose. Every page should either build trust, explain value, or capture a lead. Pages that do not serve one of these functions are clutter. Start lean, prove each page works, then expand strategically.",
          "This guide breaks down exactly which pages you need, what each page should accomplish, and when to add more. Use it to plan a new site or audit an existing one.",
        ],
      },
      {
        kind: "checklist",
        id: "essential",
        title: "Essential pages that convert",
        items: [
          { title: "Home page", detail: "Your home page is the front door. Within seconds, visitors should know what you do, where you serve, and what to do next. Lead with a clear headline that states your offer and service area, then support it with trust signals like reviews or certifications." },
          { title: "Services page", detail: "Break down what you do and who it helps. Each service should explain the problem you solve, your process, and why you are the right choice. If you offer multiple distinct services, consider individual pages for each." },
          { title: "Proof section or page", detail: "Proof is what closes skeptics. Include reviews, testimonials, badges, certifications, and before and after photos. Real proof from real customers builds trust faster than any sales copy you can write." },
          { title: "About page", detail: "Tell your story. Who runs the business, how long you have been operating, what makes you different. Local buyers want to know who they are hiring. A photo of you or your team helps humanize the business." },
          { title: "Contact page", detail: "Make it easy to reach you. Include a short form with only the fields you actually need, a phone number with click to call, your service area, and a response time promise. Remove friction from this page." },
        ],
      },
      {
        kind: "table",
        id: "table",
        title: "What each page should accomplish",
        columns: ["Page", "Primary goal", "Key elements"],
        rows: [
          ["Home", "Confirm fit in seconds", "Headline, service area, CTA, social proof"],
          ["Services", "Explain value clearly", "Problems solved, process, pricing range"],
          ["Proof", "Build trust and credibility", "Reviews, badges, case examples, photos"],
          ["About", "Humanize the business", "Story, team photos, experience, values"],
          ["Contact", "Capture leads with no friction", "Short form, phone, response promise"],
        ],
      },
      {
        kind: "text",
        id: "optional",
        title: "Optional pages that help SEO and conversions",
        paragraphs: [
          "Once the core pages work and you are generating leads, consider adding pages that target specific searches or serve specific audiences. These expansion pages improve SEO and can capture traffic from more specific queries.",
          "Each additional page should have a clear purpose and target a specific keyword or audience segment. Random pages dilute focus. Strategic pages amplify reach.",
        ],
        list: [
          "Service area pages for each city or neighborhood you serve, helping you rank locally in multiple areas.",
          "Individual service pages for each offering if you have distinct services with different buyer questions.",
          "FAQ page that answers pricing, scheduling, and common objection questions visitors have before contacting.",
          "Project gallery or case studies with before and after photos that showcase your work quality.",
          "Blog or resource section if you plan to create ongoing content for SEO and thought leadership.",
        ],
        links: [
          {
            context: "If you are deciding between DIY and pro help, read",
            label: "Wix vs hiring someone",
            href: "/guides/wix-vs-hiring-someone-to-build-website",
            suffix: "before you build.",
          },
          {
            context: "For more traffic strategies, see",
            label: "how to get more customers from your website",
            href: "/guides/how-to-get-more-customers-website",
            suffix: "for actionable tips.",
          },
        ],
      },
      {
        kind: "text",
        id: "structure",
        title: "Page structure that actually converts",
        paragraphs: [
          "It is not just which pages you have, but how they are structured. Every page should follow a logical flow that guides visitors toward action.",
          "Start with clarity. The headline should instantly communicate what the page is about. Follow with context: why this matters, what problem it solves. Then add proof: why should they trust you. End with action: exactly what they should do next.",
        ],
        list: [
          "Lead with a clear headline that states the benefit or offer.",
          "Add context and explanation in the middle section.",
          "Include proof and trust signals before the final call to action.",
          "End every page with a clear, specific next step.",
        ],
      },
      {
        kind: "faq",
        id: "faqs",
        title: "FAQs",
        items: [
          {
            q: "Do I need a blog?",
            a: "Not at first, and maybe not ever. A blog only helps if you consistently create quality content. If you cannot commit to regular posts, skip the blog and focus on your core pages. You can always add one later.",
          },
          {
            q: "How many service pages should I create?",
            a: "Start with your main services, the ones that drive the most revenue or that you most want to promote. You can add more service pages later as you expand or want to target specific keywords.",
          },
          {
            q: "Is an About page really needed?",
            a: "Yes. Local buyers want to know who they are hiring. They want to see faces, hear your story, and understand why you are trustworthy. An About page is often one of the most visited pages on local business sites.",
          },
          {
            q: "Should I show pricing on the site?",
            a: "A range can help qualify leads and reduce tire kickers. If your pricing is competitive, showing it builds trust. If pricing varies heavily by project, you can show starting prices or examples without committing to exact figures.",
          },
          {
            q: "What should I put above the fold on each page?",
            a: "Above the fold means what visitors see without scrolling. Include a clear headline, a supporting statement or image, and a call to action. Do not make visitors scroll to understand what the page is about or how to take action.",
          },
          {
            q: "How do I know if my pages are working?",
            a: "Measure leads. Set up basic analytics and form tracking. If pages are getting traffic but not generating inquiries, the content or structure needs work. If pages are converting, keep optimizing what works.",
          },
        ],
      },
    ],
  },
  {
    slug: "can-a-website-really-be-built-in-48-hours",
    type: "support",
    title: "Can a Website Really Be Built in 48 Hours? (Reality + Timeline)",
    description:
      "Yes, a focused website can be built in 48 hours if the scope is tight and content is ready. Complex sites with lots of pages or integrations need a longer timeline.",
    metaTitle: "Can a Website Really Be Built in 48 Hours? | QuickLaunchWeb",
    metaDescription:
      "A realistic look at building a website in 48 hours, plus a checklist and timeline to see if you are ready.",
    kicker: "Support Guide",
    category: "Website Strategy",
    updated: "Jan 2026",
    readTime: "6 min read",
    heroBullets: [
      "48 hours works for focused scope and ready content.",
      "Most delays come from approvals and missing assets.",
      "Use a checklist to confirm you are ready.",
    ],
    jumpLinks: [
      { id: "reality", label: "Reality check" },
      { id: "checklist", label: "Readiness checklist" },
      { id: "comparison", label: "48 hours vs 2 weeks" },
      { id: "faqs", label: "FAQs" },
    ],
    supportCta: {
      title: "Want us to handle this for you?",
      href: "/guides/do-you-need-a-website",
      label: "Read: Do You Need a Website?",
    },
    sections: [
      {
        kind: "text",
        id: "reality",
        title: "The reality of a 48 hour build",
        paragraphs: [
          "Yes, a real business website can be built in 48 hours. It happens regularly for local service businesses that need to launch quickly. But it requires the right conditions: tight scope, ready content, and fast approvals. If any of these are missing, the timeline stretches.",
          "A 48 hour build is realistic when the scope is limited to the pages that drive leads, typically a Home page, Services page, and Contact page. It is not realistic for complex sites with ecommerce, large catalogs, member portals, or custom integrations. Those projects need weeks, not hours.",
          "The speed comes from using proven systems. Professional builders use templates and frameworks that already convert, customizing them for your brand and offer. They are not reinventing design from scratch. That efficiency is what makes the timeline possible.",
        ],
        list: [
          "Fast builds rely on proven layouts and clear content provided upfront.",
          "Missing photos, unclear offers, or slow approvals will derail the timeline.",
          "A simple, focused offer and clear call to action make speed possible.",
          "Complexity is the enemy of speed: fewer pages means faster launch.",
        ],
        links: [
          {
            context: "Not sure if you need a site? Read",
            label: "do you actually need a website",
            href: "/guides/do-you-need-a-website",
            suffix: "for the honest answer.",
          },
          {
            context: "If you need to prepare, use",
            label: "launch a website fast checklist",
            href: "/guides/launch-website-fast-checklist",
            suffix: "to get ready.",
          },
        ],
      },
      {
        kind: "text",
        id: "requirements",
        title: "What a 48 hour timeline requires from you",
        paragraphs: [
          "The 48 hour clock only works if you hold up your end. Most delays happen on the client side, not the builder side. Before starting a fast build, make sure you can commit to these requirements.",
          "First, you need content ready before day one. That means your services list, service area, contact information, a few photos, and any reviews or proof you want to display. Gathering content during the build is the number one timeline killer.",
          "Second, you need to be available for feedback. Fast builds require quick approval cycles, often within a few hours. If you disappear for a day, the 48 hour timeline becomes a week long project.",
        ],
        list: [
          "Have all content gathered and organized before kickoff.",
          "Block time in your calendar for same day feedback on drafts.",
          "Empower yourself to make decisions without consulting others.",
          "Accept that perfection comes later; focus on getting live first.",
        ],
      },
      {
        kind: "checklist",
        id: "checklist",
        title: "48 hour readiness checklist",
        items: [
          { title: "Service list ready", detail: "Your top three to five services and primary service area defined and written out. Do not make the builder guess what you offer." },
          { title: "Proof assets ready", detail: "Reviews, testimonials, badges, certifications, or before and after photos. Proof is critical for conversions, do not skip this." },
          { title: "Brand basics ready", detail: "Logo in a usable format, brand colors if you have them, and accurate contact information including phone, email, and address." },
          { title: "Photos available", detail: "At least three to five photos of your work, your team, or your location. Stock photos work but real photos convert better." },
          { title: "Fast approvals confirmed", detail: "You have blocked time to review drafts within hours, and you have authority to approve without consulting partners or committees." },
          { title: "Domain access ready", detail: "You can log in to your domain registrar to point DNS or verify domain connection. No waiting on a previous developer." },
        ],
      },
      {
        kind: "table",
        id: "comparison",
        title: "48 hours vs 2 weeks",
        columns: ["Factor", "48 hours", "2 weeks"],
        rows: [
          ["Page count", "1-3 focused pages", "5-10 detailed pages"],
          ["Content depth", "Focused on core offer", "More comprehensive"],
          ["Custom elements", "Minimal customization", "Moderate customization"],
          ["Revision rounds", "1-2 quick rounds", "2-3 full rounds"],
          ["Best for", "Urgent launch, MVP site", "Broader scope, more polish"],
        ],
      },
      {
        kind: "faq",
        id: "faqs",
        title: "FAQs",
        items: [
          {
            q: "What makes a 48 hour build possible?",
            a: "Three things: prepared content, tight scope, and fast approvals. Without all three, the timeline will stretch. The builder brings the systems and experience, but you have to bring readiness and responsiveness.",
          },
          {
            q: "Will the site still look professional?",
            a: "Yes, if it uses a proven layout and clear copy. The speed comes from efficiency, not from cutting corners on quality. A well executed 48 hour site can look just as professional as a site that took months.",
          },
          {
            q: "Can I expand the site later?",
            a: "Absolutely. Many fast launches are intentionally minimal. You get the core site live, start generating leads, and then add pages over time. This phased approach is often smarter than waiting for a perfect launch.",
          },
          {
            q: "What usually causes delays?",
            a: "Missing content is the biggest blocker, followed by slow feedback cycles. If you do not have photos ready, or take two days to respond to drafts, the 48 hour promise falls apart. Prepare before you start.",
          },
          {
            q: "Is 48 hours working hours or calendar hours?",
            a: "It depends on the provider. Some mean 48 business hours, others mean two calendar days with work spread across. Clarify expectations upfront so you know when to expect the site live.",
          },
          {
            q: "What if I need something complex like booking or payments?",
            a: "Complex features typically push the timeline beyond 48 hours. If you need integrations, expect a week or more. For a true 48 hour build, stick to essential pages and simple lead capture.",
          },
        ],
      },
    ],
  },
  {
    slug: "launch-website-fast-checklist",
    type: "support",
    title: "Launch a Website Fast: The Exact Checklist You Need",
    description:
      "You can launch a website fast when content, approvals, and assets are ready before the build starts. Use this checklist to remove delays and move from draft to launch in days.",
    metaTitle: "Launch a Website Fast Checklist | QuickLaunchWeb",
    metaDescription:
      "A fast launch checklist with the exact assets and approvals you need to go live quickly.",
    kicker: "Support Guide",
    category: "Website Strategy",
    updated: "Jan 2026",
    readTime: "9 min read",
    heroBullets: [
      "Prep content and assets before the build starts.",
      "Fast approvals keep the timeline tight.",
      "A focused scope is the secret to speed.",
    ],
    jumpLinks: [
      { id: "overview", label: "Overview" },
      { id: "phase-1", label: "Phase 1" },
      { id: "phase-2", label: "Phase 2" },
      { id: "phase-3", label: "Phase 3" },
      { id: "timeline", label: "Timeline" },
      { id: "mistakes", label: "Mistakes" },
      { id: "faqs", label: "FAQs" },
    ],
    supportCta: {
      title: "Want us to handle this for you?",
      href: "/guides/do-you-need-a-website",
      label: "Read: Do You Need a Website?",
    },
    sections: [
      {
        kind: "text",
        id: "overview",
        title: "Why preparation determines launch speed",
        paragraphs: [
          "The difference between a website that launches in days versus weeks almost always comes down to preparation. Builders can move fast when they have what they need. They stall when content is missing, feedback is slow, or scope keeps changing. This checklist covers everything you need to gather before starting a fast website build.",
          "Complete this checklist before kickoff and you remove the most common delays that turn a 48 hour project into a month long nightmare. Skip it and watch your timeline stretch while your competitors capture the leads you are missing.",
          "Fast does not mean rushed or sloppy. It means prepared. The work happens before the build starts, not during it. Just like a chef preps ingredients before service, you prep content before construction begins. The fastest websites come from the most prepared clients.",
          "This guide breaks the checklist into three phases: content preparation, asset gathering, and launch readiness. Complete all three phases before contacting a builder and you will be positioned for the fastest possible launch.",
        ],
        list: [
          "Content prep eliminates the biggest delay: missing information that only you can provide.",
          "Asset gathering ensures designers have the raw materials they need from day one.",
          "Launch readiness removes technical blockers that stall sites at the finish line.",
          "Each phase can be completed in a few hours if you focus on it.",
        ],
        links: [
          {
            context: "Not sure you need one? Read",
            label: "do you actually need a website",
            href: "/guides/do-you-need-a-website",
            suffix: "for the honest answer.",
          },
        ],
      },
      {
        kind: "checklist",
        id: "phase-1",
        title: "Phase 1: Content preparation",
        items: [
          { title: "Core services list", detail: "Write out your top three to five services with one to two sentences describing each. Include your primary service area. This shapes the entire site structure and messaging hierarchy." },
          { title: "Primary offer and CTA", detail: "What is the main action you want visitors to take? Call you? Fill out a form? Get a quote? Define one clear call to action that appears on every page and drives conversions." },
          { title: "About story draft", detail: "Write two to three paragraphs about your business: how you started, what makes you different, and why customers trust you. Personal stories build connection faster than generic corporate language." },
          { title: "Service area definition", detail: "List the specific cities, neighborhoods, or regions you serve. Geographic clarity helps with local SEO and ensures visitors know you work in their area." },
          { title: "Pricing clarity", detail: "Decide how you will handle pricing on the site. Will you show ranges? Request a quote? List specific packages? Having this decided prevents back and forth during the build." },
        ],
        note: "Content preparation typically takes 1-2 hours of focused work. Do not rush it.",
      },
      {
        kind: "checklist",
        id: "phase-2",
        title: "Phase 2: Asset gathering",
        items: [
          { title: "Photos of your work", detail: "Gather three to eight photos showing completed projects, your team in action, or your workspace. Before and after shots are especially powerful for service businesses that create visible transformations." },
          { title: "Logo and brand files", detail: "Collect your logo in PNG or SVG format. Include any brand colors you use consistently. If you do not have a logo, a simple text treatment works fine for launch." },
          { title: "Testimonials and reviews", detail: "Copy three to five of your best reviews from Google, Yelp, or direct feedback. Include the customer name and location if possible. Social proof accelerates trust." },
          { title: "Certifications and badges", detail: "Gather images of any licenses, certifications, insurance badges, or memberships that build credibility. These trust signals matter more than most businesses realize." },
          { title: "Contact information", detail: "Verify your phone number, email address, and physical address are correct. Include hours of operation if relevant. Incorrect contact info kills conversions." },
        ],
        note: "Asset gathering can happen in parallel with content preparation.",
      },
      {
        kind: "checklist",
        id: "phase-3",
        title: "Phase 3: Launch readiness",
        items: [
          { title: "Domain access credentials", detail: "Know where your domain is registered and have login credentials ready. Fast launches require quick DNS changes, and waiting on a previous developer or hosting company kills momentum." },
          { title: "Approval window blocked", detail: "Block two to four hours on your calendar for same day feedback. Fast builds require fast responses. Do not schedule a 48 hour project during your busiest week." },
          { title: "Decision maker aligned", detail: "If someone else needs to approve the site, get them aligned before you start. Committee reviews during the build turn fast projects into slow committee disasters." },
          { title: "Current site access", detail: "If you have an existing site you are replacing, have any login credentials and hosting information available. Migration sometimes requires access to the old system." },
          { title: "Payment method ready", detail: "Have your payment method ready for any setup fees or first month payments. Waiting on invoices or payment processing adds unnecessary friction to launch." },
        ],
        note: "Launch readiness items should be confirmed 24 hours before kickoff.",
      },
      {
        kind: "table",
        id: "timeline",
        title: "Fast launch timeline breakdown",
        columns: ["Phase", "Time required", "Key deliverable"],
        rows: [
          ["Content preparation", "1-2 hours", "Services list, CTA, about story"],
          ["Asset gathering", "1-2 hours", "Photos, logo, testimonials"],
          ["Launch readiness", "30 minutes", "Domain access, calendar blocked"],
          ["Builder kickoff", "1 hour", "Briefing call or form submission"],
          ["First draft review", "2-4 hours", "Initial design and copy"],
          ["Revision round", "1-2 hours", "Feedback and polish"],
          ["Launch", "30 minutes", "DNS update and go live"],
        ],
        note: "Total client time investment: 7-12 hours spread across 2-3 days.",
      },
      {
        kind: "text",
        id: "approvals",
        title: "Make approvals the priority",
        paragraphs: [
          "The biggest speed killer is slow feedback. A draft that sits for two days waiting for your input turns a 48 hour project into a week. Set a clear approval window and treat it like a meeting you cannot reschedule. Your responsiveness directly determines your launch date.",
          "When reviewing drafts, focus on accuracy and clarity, not perfect wording. You can always refine copy after launch. Getting live and generating leads matters more than perfection on day one. Perfectionism is the enemy of progress.",
          "Batch your feedback into one response instead of sending multiple messages throughout the day. This keeps the builder focused and prevents miscommunication. If you have concerns about direction, say them early before the builder invests hours in polish work.",
          "Remember that good web builders know what converts. Trust their expertise on layout decisions and focus your feedback on the content that only you can verify: is the information accurate? Are the services described correctly? Is the contact information right?",
        ],
        list: [
          "Set a same day review window when possible, ideally within a few hours.",
          "Batch feedback into one organized response instead of many small messages.",
          "Focus on accuracy and clarity over perfect wording.",
          "Make direction changes early, before the builder invests hours in polish.",
          "Trust the process: good builders know what converts.",
        ],
        links: [
          {
            context: "For a reality check on what is achievable, see",
            label: "can a website really be built in 48 hours",
            href: "/guides/can-a-website-really-be-built-in-48-hours",
            suffix: "before you start.",
          },
        ],
      },
      {
        kind: "text",
        id: "mistakes",
        title: "Common mistakes that slow launches",
        paragraphs: [
          "Even prepared clients sometimes make mistakes that stretch timelines. Avoid these common pitfalls to keep your launch on track and hit your target date.",
          "Perfectionism kills more launches than any technical problem. The business owner who rewrites every sentence three times will never launch in 48 hours. Accept that version one is a starting point, not a masterpiece. You will iterate after you start getting leads.",
          "Scope creep is the second biggest killer. What starts as a simple five page site becomes a ten page site with a blog, booking system, and photo gallery. Each addition doubles the timeline. Save expansions for phase two after the core site is live and generating leads.",
          "Stakeholder surprise happens when a business partner or spouse suddenly needs to review and approve everything. Get alignment before kickoff. If multiple people need to approve, schedule a single joint review session rather than sequential individual reviews that drag on for days.",
        ],
        list: [
          "Perfectionism: trying to get every word perfect before launching delays everything.",
          "Scope creep: adding pages or features mid project extends timelines significantly.",
          "Stakeholder surprise: involving new decision makers late creates restart loops.",
          "Photo hunting: scrambling for images during the build stalls progress.",
          "Unavailability: scheduling a fast project during your busiest period guarantees delays.",
          "Overthinking: second guessing every design decision adds days to the timeline.",
        ],
        links: [
          {
            context: "Not sure what pages you actually need? Read",
            label: "what pages does a business website need",
            href: "/guides/what-pages-business-website-needs-to-convert",
            suffix: "to focus your scope.",
          },
          {
            context: "If you want to understand what makes a site convert, read",
            label: "why your website isn't getting customers",
            href: "/guides/why-website-not-getting-customers",
            suffix: "to see what to fix.",
          },
        ],
      },
      {
        kind: "faq",
        id: "faqs",
        title: "FAQs",
        items: [
          {
            q: "How fast can a website launch if I am prepared?",
            a: "If content is ready and feedback is fast, a focused site can launch in 48 to 72 hours. Some providers can move even faster for very simple sites. Preparation is the key variable that determines your timeline.",
          },
          {
            q: "What is the most common delay?",
            a: "Missing content and slow approvals are the two biggest causes of delay. Content delays happen before the build, approval delays happen during it. Both are preventable with this checklist.",
          },
          {
            q: "Should I wait until everything is perfect?",
            a: "No. Launch the focused version and refine after you start getting leads. Perfect is the enemy of live. Every day without a website is a day of missed opportunities and leads going to competitors.",
          },
          {
            q: "Can I expand the site later?",
            a: "Yes. Fast launches are usually phase one. Get the core site live, prove it generates leads, then add pages. Many businesses build out over months while the core site earns money and captures leads.",
          },
          {
            q: "What if I do not have professional photos?",
            a: "Phone photos of your work are better than stock photos. Real beats polished. If you have nothing, some builders can source stock, but real photos always convert better because they build authentic trust.",
          },
          {
            q: "Do I need a logo to launch?",
            a: "A simple text based logo is fine to start. Do not delay a website launch to perfect a logo. You can update it later. Getting leads matters more than brand perfection.",
          },
          {
            q: "What if I cannot respond same day?",
            a: "If same day responses are impossible, plan for a longer timeline. A 48 hour build requires 48 hour responsiveness. If you can only check in every other day, expect a week long project instead.",
          },
          {
            q: "How do I know if my content is good enough?",
            a: "If a stranger can read it and understand what you do, who you serve, and how to contact you, it is good enough. You can always improve it later. Clarity matters more than cleverness.",
          },
        ],
      },
    ],
  },
  /* ───────────────────────────────────────────────────────────
     NOV 2026 BATCH — Facebook/Instagram ads by trade: Roofing
     Primary KW: "how much do facebook ads cost for roofers in houston"
     ─────────────────────────────────────────────────────────── */
  {
    slug: "facebook-ads-for-roofers-houston",
    type: "support",
    title: "How Much Do Facebook Ads Cost for Roofers in Houston?",
    description:
      "There is no set price. You pick your own budget, and you can raise it, lower it, or stop any day. What each lead costs depends on your ad, your offer, and the season. Roofers who show their own face on real roofs tend to get calls from better homeowners.",
    metaTitle: "Facebook Ads for Roofers in Houston: Cost & What Works",
    metaDescription:
      "What Facebook and Instagram ads cost Houston roofers, what drives the price, and the ad types that bring real roof replacement calls.",
    kicker: "Support Guide",
    category: "Facebook & Instagram Ads",
    updated: "Nov 2026",
    readTime: "6 min read",
    heroBullets: [
      "What sets the cost of a roofing ad.",
      "Ad types that work for Houston roofers.",
      "When to spend more, and when to pull back.",
      "How to turn a lead into a signed roof.",
    ],
    jumpLinks: [
      { id: "short-answer", label: "Short answer" },
      { id: "what-sets-cost", label: "What sets the cost" },
      { id: "ad-types", label: "Ad types that work" },
      { id: "houston-seasons", label: "Houston seasons" },
      { id: "after-the-lead", label: "After the lead" },
      { id: "faqs", label: "FAQs" },
      { id: "related", label: "Related" },
    ],
    ctaTop: {
      eyebrow: "Roofer in Houston?",
      description: "We film you on real roofs, run the ads, text every lead, and our team books the estimate.",
      href: "/#book",
      label: "Book a Free Call",
    },
    ctaBottom: {
      title: "Want more roof replacements, not more tire kickers?",
      description: "Let's talk about your area, your jobs, and what a good month looks like for you.",
      href: "/#book",
      label: "Book a Free Call",
    },
    aside: {
      takeaways: [
        "You set the budget. Facebook does not.",
        "Real job video beats stock photos.",
        "A fast reply matters as much as the ad.",
      ],
    },
    sections: [
      {
        kind: "text",
        id: "short-answer",
        title: "How much do Facebook ads cost for roofers in Houston?",
        paragraphs: [
          "Facebook and Instagram ads have no fixed price.",
          "You choose a daily or monthly budget. You can change it any time. You can also pause it.",
          "So the real question is not “what does it cost?” The real question is “what does one signed roof cost me?”",
          "That number depends on three things. Your ad. Your offer. And how fast you call people back.",
          "Two roofers can spend the same money. One gets signed jobs. The other gets people who never answer. The ad is only half of it.",
        ],
      },
      {
        kind: "table",
        id: "what-sets-cost",
        title: "What makes a roofing lead cost more or less?",
        columns: ["Thing", "Makes leads cost less", "Makes leads cost more"],
        rows: [
          ["The ad", "Owner on a real Houston roof, talking", "Stock photo of a house"],
          ["The offer", "Clear and easy, like a free roof check", "Vague, like “call us today”"],
          ["The area", "Neighborhoods you can reach fast", "All of Texas"],
          ["The form", "A few questions that show real need", "Name and phone only"],
          ["The season", "Right after a storm hits your area", "A slow, dry month with no storms"],
          ["The follow-up", "Text and call within minutes", "Call back the next day"],
        ],
        note: "These are patterns we see in how ads work. They are not promises of a price.",
      },
      {
        kind: "checklist",
        id: "ad-types",
        title: "What kind of Facebook ads work for roofers?",
        items: [
          {
            title: "The roof walk video",
            detail: "You on a roof with your phone. Show the damage. Say what you see. Homeowners trust a face more than a logo.",
          },
          {
            title: "The before and after",
            detail: "Old roof, new roof. Same house. Real job. Ask the homeowner first.",
          },
          {
            title: "The “what we check” video",
            detail: "Walk through what you look at on a roof check. Flashing, vents, soft spots. This teaches and builds trust.",
          },
          {
            title: "The crew at work",
            detail: "Short clips of your crew tearing off and laying shingles. Clean site. Safe work. People want to see who will be at their house.",
          },
          {
            title: "The happy homeowner",
            detail: "A real customer says a few words on camera. Only if they agree. Never script fake words for them.",
          },
        ],
        note: "Want more video ideas? See our guide on what to film on the job.",
      },
      {
        kind: "text",
        id: "who-to-reach",
        title: "Who should a Houston roofer show ads to?",
        paragraphs: [
          "Show ads to homeowners. Not renters.",
          "Pick the areas you want to work in. Maybe Katy, Cypress, Pearland, or The Woodlands. Do not pick every zip code at once.",
          "Ask a few questions in the form. Is it your home? Is the roof leaking? When do you want it done?",
          "These questions cut out people who are just curious. You get fewer leads. But more of them are real.",
        ],
        list: [
          "Homeowners only.",
          "Areas you can reach in a short drive.",
          "Questions that show real need.",
          "One clear offer per ad.",
        ],
      },
      {
        kind: "text",
        id: "houston-seasons",
        title: "When should Houston roofers spend more on ads?",
        paragraphs: [
          "Houston weather drives roofing work.",
          "The National Oceanic and Atmospheric Administration (NOAA) says Atlantic hurricane season runs June 1 to November 30.",
          "Hail and big spring storms also hit the Houston area. After a storm, many homeowners look for help at the same time.",
          "That is when good ads matter most. Be ready before the storm. Have videos filmed. Have your ad set up and paused. Then turn it on when the storm passes.",
          "In slow months, keep a small budget running. Show your work. Stay in front of people. When they need a roof, they will think of you.",
        ],
        links: [
          {
            context: "For a full year plan, read",
            label: "the Houston contractor marketing calendar",
            href: "/guides/houston-contractor-marketing-calendar",
            suffix: "for heat, storms, and freezes.",
          },
        ],
      },
      {
        kind: "callout",
        id: "storm-chasers",
        title: "Stand apart from storm chasers",
        body: [
          "After a big storm, out-of-town crews show up fast. Homeowners know this. Many are careful.",
          "Texas does not have a state license for roofers. So homeowners look for other proof.",
          "Show your face. Show your trucks. Show jobs on streets they know. Say how long you have worked in Houston.",
          "Local proof is your best ad.",
        ],
      },
      {
        kind: "text",
        id: "after-the-lead",
        title: "What should happen after a roofing lead comes in?",
        paragraphs: [
          "The ad gets the lead. Speed gets the job.",
          "A homeowner with a leak fills out three forms. The first roofer to call often gets the visit.",
          "Text them right away. Call them in minutes. Set a time to look at the roof.",
          "This is how the Houston Growth Engine works. We text every lead fast. Our team calls and books the estimate on your calendar. You show up and sell the roof.",
        ],
        links: [
          {
            context: "See how we run",
            label: "Facebook ads for contractors",
            href: "/services/facebook-ads",
            suffix: "in Houston.",
          },
          {
            context: "Learn how to",
            label: "book more estimates and win bigger jobs",
            href: "/guides/how-to-book-more-estimates-contractors",
            suffix: "from the leads you get.",
          },
        ],
      },
      {
        kind: "faq",
        id: "faqs",
        title: "FAQs",
        items: [
          {
            q: "How much should a roofer spend on Facebook ads?",
            a: "Start with an amount you can keep running for a few months. Ads need time to learn. Judge by signed roofs, not by clicks or likes.",
          },
          {
            q: "Do Facebook ads work for roofing in Houston?",
            a: "They can. They work best with real video of you, a clear offer, a tight area, and a very fast call back.",
          },
          {
            q: "Are Facebook leads worse than Google leads?",
            a: "They are different. Google catches people searching right now. Facebook reaches homeowners before they search. Good questions in your form help sort out the real ones.",
          },
          {
            q: "Should I run ads after a hurricane?",
            a: "Yes, if you can handle the work. Have your ads and videos ready before the storm. Turn them on when it is safe and you have crew time.",
          },
          {
            q: "Do I need to make the videos myself?",
            a: "You need to be in them. Homeowners want to see who they are hiring. We can film you on real jobs so you do not have to.",
          },
        ],
      },
      {
        kind: "related",
        id: "related",
        title: "Related guides",
        items: [
          { href: "/guides/on-the-job-video-for-contractors", label: "What to Film: On-the-Job Video for Contractors", tag: "Video" },
          { href: "/guides/how-much-should-a-contractor-spend-on-ads", label: "How Much Should a Contractor Spend on Ads?", tag: "Budget" },
          { href: "/guides/houston-contractor-marketing-calendar", label: "Houston Contractor Marketing Calendar", tag: "Houston" },
          { href: "/services/facebook-ads", label: "Facebook Ads for Houston Contractors", tag: "Service" },
        ],
      },
    ],
  },
  /* ───────────────────────────────────────────────────────────
     NOV 2026 BATCH — Facebook/Instagram ads by trade: HVAC
     Primary KW: "facebook ads for hvac companies houston"
     ─────────────────────────────────────────────────────────── */
  {
    slug: "facebook-ads-for-hvac-companies-houston",
    type: "support",
    title: "Do Facebook Ads Work for HVAC Companies in Houston?",
    description:
      "Yes, they can. Facebook and Instagram ads work best for Houston HVAC companies when they sell bigger jobs, like new systems, not just quick repairs. Show your real techs, put your license number in the ad, and call every lead back in minutes.",
    metaTitle: "Facebook Ads for HVAC Companies in Houston | QuickLaunchWeb",
    metaDescription:
      "How Houston HVAC companies can use Facebook and Instagram ads to book system replacements, what to show in the ad, and the Texas license rule to follow.",
    kicker: "Support Guide",
    category: "Facebook & Instagram Ads",
    updated: "Nov 2026",
    readTime: "6 min read",
    heroBullets: [
      "Which HVAC jobs fit Facebook ads best.",
      "What to show so homeowners trust you.",
      "The Texas license rule for A/C ads.",
      "How Houston heat changes your plan.",
    ],
    jumpLinks: [
      { id: "short-answer", label: "Short answer" },
      { id: "which-jobs", label: "Which jobs" },
      { id: "what-to-show", label: "What to show" },
      { id: "license-rule", label: "License rule" },
      { id: "houston-heat", label: "Houston heat" },
      { id: "faqs", label: "FAQs" },
      { id: "related", label: "Related" },
    ],
    ctaTop: {
      eyebrow: "HVAC owner in Houston?",
      description: "We film your techs, run the ads, text every lead, and our team books the visit.",
      href: "/#book",
      label: "Book a Free Call",
    },
    ctaBottom: {
      title: "Want more system replacements on your calendar?",
      description: "Tell us your area and your best jobs. We will show you how we would run it.",
      href: "/#book",
      label: "Book a Free Call",
    },
    aside: {
      takeaways: [
        "Sell the big job, not the cheap tune-up.",
        "Show real techs and real trucks.",
        "Put your TDLR license number in every ad.",
      ],
    },
    sections: [
      {
        kind: "text",
        id: "short-answer",
        title: "Do Facebook ads work for HVAC companies in Houston?",
        paragraphs: [
          "Yes. But not the way most people run them.",
          "Many HVAC ads push a cheap tune-up. That brings in people who only want the cheap thing.",
          "Better ads talk to homeowners with an old system. Their unit is loud. Their bill is high. One room never cools. They are ready for a real fix.",
          "Facebook and Instagram reach these people before they search. That is the big plus. You show up first. You look like the expert.",
        ],
      },
      {
        kind: "table",
        id: "which-jobs",
        title: "Which HVAC jobs fit Facebook ads best?",
        columns: ["Job", "Good fit for Facebook ads?", "Why"],
        rows: [
          ["New A/C or full system", "Yes", "Big ticket. People plan it. Trust matters a lot."],
          ["Heat pump or upgrade", "Yes", "Needs teaching. Video explains it well."],
          ["Duct work and air flow", "Yes", "Many people do not know it is the problem."],
          ["Maintenance plans", "Sometimes", "Good for repeat work. Lower first ticket."],
          ["Emergency “no cool” repair", "Less so", "People in a rush search Google first."],
        ],
        note: "Many shops run Google for urgent repairs and Facebook for planned, bigger jobs.",
      },
      {
        kind: "checklist",
        id: "what-to-show",
        title: "What should an HVAC ad show?",
        items: [
          {
            title: "Your real tech in a real attic",
            detail: "Hot, dusty, honest. Homeowners see who will come to their home.",
          },
          {
            title: "The old unit next to the new one",
            detail: "Rust, dirt, and age are easy to see. Ask the homeowner before you film.",
          },
          {
            title: "A simple tip",
            detail: "“Change your filter.” “Clear around the outside unit.” Help first. Sell second.",
          },
          {
            title: "The owner saying who you are",
            detail: "Ten seconds. Your name. How long you have served Houston. What you stand for.",
          },
          {
            title: "Your truck and uniform",
            detail: "It shows you are a real local company, not a lead seller.",
          },
        ],
        note: "Video of you on the job is the core of what we film for clients.",
      },
      {
        kind: "text",
        id: "lead-form",
        title: "What should an HVAC lead form ask?",
        paragraphs: [
          "A good form sorts people for you.",
          "Ask a few simple questions. Keep each one short. Too many questions and people quit.",
          "The answers help your team know who to call first. A homeowner with a 15-year-old unit and no cool air is a hot lead.",
        ],
        list: [
          "Do you own the home?",
          "How old is your system?",
          "What is going on? Not cooling, loud, high bills?",
          "When do you want it fixed or replaced?",
          "What part of Houston are you in?",
        ],
      },
      {
        kind: "text",
        id: "license-rule",
        title: "Do HVAC ads in Texas need a license number?",
        paragraphs: [
          "Yes. Texas has a rule for this.",
          "The Texas Department of Licensing and Regulation (TDLR) licenses air conditioning contractors.",
          "Its rule, 16 Texas Administrative Code §75.71, says ads that ask for A/C work must show the license number.",
          "That means your Facebook and Instagram ads too. Put the number in the ad text or on the image.",
          "This also helps you. It shows you are licensed. Many homeowners like to check.",
        ],
        links: [
          {
            context: "Read the rule text at",
            label: "16 Tex. Admin. Code §75.71",
            href: "https://www.law.cornell.edu/regulations/texas/16-Tex-Admin-Code-SS-75-71",
            suffix: "(Cornell Law School).",
          },
        ],
      },
      {
        kind: "text",
        id: "houston-heat",
        title: "How does Houston heat change HVAC ads?",
        paragraphs: [
          "Houston summers are long and hot. When it gets hot, old systems fail.",
          "In peak heat, you may have more work than you can do. That is a good time to sell replacements, not chase every repair.",
          "In spring, run ads about getting ready. “Is your A/C ready for summer?” works because it is true.",
          "In fall and winter, talk about heaters and heat pumps. Houston can freeze too. Many people remember the February 2021 winter storm.",
          "Keep ads on all year. Just change the message with the season.",
        ],
        links: [
          {
            context: "Plan the whole year with",
            label: "the Houston contractor marketing calendar",
            href: "/guides/houston-contractor-marketing-calendar",
          },
        ],
      },
      {
        kind: "text",
        id: "after-the-lead",
        title: "What happens after an HVAC lead comes in?",
        paragraphs: [
          "Speed wins. A hot homeowner will not wait.",
          "Text them right away. Call them in minutes. Book a time for a tech or a comfort advisor.",
          "That is what the Houston Growth Engine does. We text every lead fast. Our team calls and books the visit. Your team runs the call and sells the system.",
        ],
        links: [
          {
            context: "See how we run",
            label: "the Houston Growth Engine",
            href: "/houston-growth-engine",
            suffix: "from ad to booked visit.",
          },
        ],
      },
      {
        kind: "faq",
        id: "faqs",
        title: "FAQs",
        items: [
          {
            q: "Are Facebook ads good for HVAC repair calls?",
            a: "They can bring some. But urgent repair calls usually start on Google. Facebook is better for planned jobs like new systems.",
          },
          {
            q: "Do I need my license number in Facebook ads?",
            a: "Texas rule 16 TAC §75.71 says A/C ads that ask for work must show the license number. Check the TDLR site for the latest rule.",
          },
          {
            q: "What is the best time to run HVAC ads in Houston?",
            a: "All year. Change the message. Get ready in spring. Replace in summer. Heat in winter.",
          },
          {
            q: "Should I advertise a cheap tune-up?",
            a: "It can fill the schedule. But it often brings bargain hunters. An honest message about old systems tends to bring better jobs.",
          },
          {
            q: "Who books the appointments?",
            a: "With us, our team calls and books the visit. You can also do it in house. The key is speed.",
          },
        ],
      },
      {
        kind: "related",
        id: "related",
        title: "Related guides",
        items: [
          { href: "/guides/on-the-job-video-for-contractors", label: "What to Film: On-the-Job Video for Contractors", tag: "Video" },
          { href: "/guides/how-to-book-more-estimates-contractors", label: "How to Book More Estimates and Win Bigger Jobs", tag: "Booking" },
          { href: "/guides/facebook-ads-for-plumbers-houston", label: "Facebook Ads for Plumbers in Houston", tag: "Ads" },
          { href: "/services/facebook-ads", label: "Facebook Ads for Houston Contractors", tag: "Service" },
        ],
      },
    ],
  },
  /* ───────────────────────────────────────────────────────────
     NOV 2026 BATCH — Facebook/Instagram ads by trade: Plumbing
     Primary KW: "facebook ads for plumbers houston"
     ─────────────────────────────────────────────────────────── */
  {
    slug: "facebook-ads-for-plumbers-houston",
    type: "support",
    title: "Facebook Ads for Plumbers in Houston: What Gets Booked Jobs?",
    description:
      "The Facebook ads that work best for Houston plumbers sell planned, bigger jobs like water heaters, repipes, and slab leak repair. They show the real plumber, include the master plumber's license number, and get a fast call back. Clogged drains usually still start on Google.",
    metaTitle: "Facebook Ads for Plumbers in Houston: What Works",
    metaDescription:
      "Which plumbing jobs fit Facebook and Instagram ads in Houston, what to film, the Texas license rule for plumbing ads, and how to book the job fast.",
    kicker: "Support Guide",
    category: "Facebook & Instagram Ads",
    updated: "Nov 2026",
    readTime: "6 min read",
    heroBullets: [
      "The plumbing jobs that fit Facebook best.",
      "Video ideas that build trust fast.",
      "The Texas license rule for plumbing ads.",
      "Houston freezes, old pipes, and timing.",
    ],
    jumpLinks: [
      { id: "short-answer", label: "Short answer" },
      { id: "which-jobs", label: "Which jobs" },
      { id: "video-ideas", label: "Video ideas" },
      { id: "license-rule", label: "License rule" },
      { id: "houston-timing", label: "Houston timing" },
      { id: "faqs", label: "FAQs" },
      { id: "related", label: "Related" },
    ],
    ctaTop: {
      eyebrow: "Plumber in Houston?",
      description: "We film you on the job, run the ads, text every lead, and our team books the estimate.",
      href: "/#book",
      label: "Book a Free Call",
    },
    ctaBottom: {
      title: "Want more repipes and water heaters, fewer small callouts?",
      description: "Tell us the jobs you want more of. We will show you how we would go after them.",
      href: "/#book",
      label: "Book a Free Call",
    },
    aside: {
      takeaways: [
        "Use Facebook for planned jobs.",
        "Use Google for “right now” jobs.",
        "Show the RMP license number in your ads.",
      ],
    },
    sections: [
      {
        kind: "text",
        id: "short-answer",
        title: "Do Facebook ads work for plumbers in Houston?",
        paragraphs: [
          "Yes, for the right jobs.",
          "When a toilet overflows, people grab their phone and search. That is a Google moment.",
          "But some jobs are planned. A water heater that is getting old. Low water pressure. Old pipes in a 1960s house. A homeowner thinks about these for weeks.",
          "Facebook and Instagram are great for those jobs. You show up in their feed. You teach them. When they are ready, they already know your face.",
        ],
      },
      {
        kind: "table",
        id: "which-jobs",
        title: "Which plumbing jobs fit Facebook ads?",
        columns: ["Job", "Best place to advertise", "Why"],
        rows: [
          ["Water heater swap or tankless", "Facebook and Instagram", "Planned. People compare. Trust matters."],
          ["Whole house repipe", "Facebook and Instagram", "Big job. Needs a clear, calm explainer."],
          ["Slab leak repair", "Both", "Scary for homeowners. Video helps calm them."],
          ["Water filters and softeners", "Facebook and Instagram", "People learn about it from ads."],
          ["Clogged drain, burst pipe", "Google", "Urgent. People search right now."],
        ],
        note: "This is a common way to split the work. Your market may be different.",
      },
      {
        kind: "checklist",
        id: "video-ideas",
        title: "What should a plumber film for ads?",
        items: [
          {
            title: "The old water heater",
            detail: "Show rust and leaks. Say how you can tell it is near the end. Simple and honest.",
          },
          {
            title: "Inside the wall",
            detail: "When you open a wall for a repipe, film the old pipe. People are shocked by what they see.",
          },
          {
            title: "The clean job site",
            detail: "Drop cloths. Shoe covers. A tidy truck. This answers the fear of a mess.",
          },
          {
            title: "A quick tip",
            detail: "Where your main shutoff is. How to wrap pipes before a freeze. Help people for free.",
          },
          {
            title: "You saying hello",
            detail: "Your name, your trade, and the part of Houston you serve. People hire people.",
          },
        ],
        note: "Phone video is fine. Good light and clear sound matter more than a fancy camera.",
      },
      {
        kind: "text",
        id: "who-to-reach",
        title: "Who should Houston plumbers show ads to?",
        paragraphs: [
          "Show ads to homeowners, not renters. Renters call the landlord.",
          "Pick areas your trucks can reach fast. Houston traffic is real. A tight area means more jobs per day.",
          "Older neighborhoods often have older pipes. Those homes may need repipes and new water heaters. Think about where your best past jobs came from.",
          "Ask a few questions in the form. Is it your home? What is the problem? How soon do you need help?",
        ],
      },
      {
        kind: "text",
        id: "license-rule",
        title: "Do plumbing ads in Texas need a license number?",
        paragraphs: [
          "Yes. The Texas State Board of Plumbing Examiners has a rule for it.",
          "Rule 22 Texas Administrative Code §367.10 says ads that ask for plumbing work must show the license number of the Responsible Master Plumber.",
          "The rule says this is true for every kind of media. So it covers your Facebook and Instagram ads.",
          "Put the number in the ad text or on the image. It also tells homeowners you are the real deal.",
        ],
        links: [
          {
            context: "Read the rule text at",
            label: "22 Tex. Admin. Code §367.10",
            href: "https://www.law.cornell.edu/regulations/texas/22-Tex-Admin-Code-SS-367-10",
            suffix: "(Cornell Law School). Check the board's site for updates.",
          },
        ],
      },
      {
        kind: "text",
        id: "houston-timing",
        title: "When should Houston plumbers run more ads?",
        paragraphs: [
          "Houston does not freeze often. But when it does, pipes burst.",
          "Many Texans remember the February 2021 winter storm. Homes lost power and water lines broke.",
          "Before a cold snap, run ads with freeze tips. Wrap pipes. Drip faucets. Know your shutoff. You help people and they remember you.",
          "After a freeze, be ready for repair calls. Then follow up with repipe and water heater offers.",
          "In older parts of town, aging pipes are a year round topic. Film them when you find them.",
        ],
        links: [
          {
            context: "See the full year in",
            label: "the Houston contractor marketing calendar",
            href: "/guides/houston-contractor-marketing-calendar",
          },
        ],
      },
      {
        kind: "text",
        id: "after-the-lead",
        title: "How do you turn a plumbing lead into a booked job?",
        paragraphs: [
          "Call fast. The homeowner may have asked three plumbers.",
          "Text them first so they know you got it. Then call. Ask about the problem. Book a time.",
          "With the Houston Growth Engine, we text every lead fast and our team books the estimate. You walk in and do what you do best.",
        ],
        links: [
          {
            context: "Learn more about",
            label: "contractor video production",
            href: "/services/video-production",
            suffix: "and how we film real jobs.",
          },
        ],
      },
      {
        kind: "faq",
        id: "faqs",
        title: "FAQs",
        items: [
          {
            q: "Are Facebook ads worth it for plumbers?",
            a: "They can be for planned jobs like water heaters and repipes. For urgent calls, Google is usually first. Judge ads by booked jobs, not clicks.",
          },
          {
            q: "Do Texas plumbing ads need a license number?",
            a: "Yes. 22 TAC §367.10 says ads that ask for plumbing work must show the Responsible Master Plumber's license number.",
          },
          {
            q: "What is the best plumbing ad to run?",
            a: "A short video of you on a real job, explaining a real problem. Real beats polished.",
          },
          {
            q: "Should I run ads before a freeze?",
            a: "Yes. Freeze tips help people and keep your name in their head when pipes break.",
          },
          {
            q: "How fast should I call back a lead?",
            a: "Within minutes. A text right away, then a call. The first plumber to reach them often gets the job.",
          },
        ],
      },
      {
        kind: "related",
        id: "related",
        title: "Related guides",
        items: [
          { href: "/guides/shared-leads-vs-exclusive-leads-contractors", label: "Shared Leads vs. Exclusive Leads", tag: "Leads" },
          { href: "/guides/facebook-ads-for-hvac-companies-houston", label: "Facebook Ads for HVAC Companies in Houston", tag: "Ads" },
          { href: "/guides/how-to-book-more-estimates-contractors", label: "How to Book More Estimates and Win Bigger Jobs", tag: "Booking" },
          { href: "/services/facebook-ads", label: "Facebook Ads for Houston Contractors", tag: "Service" },
        ],
      },
    ],
  },
  /* ───────────────────────────────────────────────────────────
     NOV 2026 BATCH — Facebook/Instagram ads by trade: Remodeling
     Primary KW: "facebook ads for remodelers houston"
     ─────────────────────────────────────────────────────────── */
  {
    slug: "facebook-ads-for-remodelers-houston",
    type: "support",
    title: "Facebook Ads for Remodelers in Houston: How to Get Bigger Jobs",
    description:
      "Houston remodelers get the best Facebook and Instagram results when the ads show real finished rooms and the owner talking on camera. Ads should target homeowners in the areas you want and ask a few budget and timing questions. That way the leads fit the size of job you want.",
    metaTitle: "Facebook Ads for Remodelers in Houston | QuickLaunchWeb",
    metaDescription:
      "How Houston kitchen, bath, and home remodelers use Facebook and Instagram ads to find bigger jobs: what to show, who to reach, and how to sort leads.",
    kicker: "Support Guide",
    category: "Facebook & Instagram Ads",
    updated: "Nov 2026",
    readTime: "6 min read",
    heroBullets: [
      "Why remodeling fits Facebook and Instagram.",
      "Ads that sell kitchens and baths.",
      "How to sort out small, cheap jobs.",
      "How to book the in-home visit.",
    ],
    jumpLinks: [
      { id: "short-answer", label: "Short answer" },
      { id: "why-it-fits", label: "Why it fits" },
      { id: "ads-that-work", label: "Ads that work" },
      { id: "sort-leads", label: "Sort the leads" },
      { id: "book-visit", label: "Book the visit" },
      { id: "faqs", label: "FAQs" },
      { id: "related", label: "Related" },
    ],
    ctaTop: {
      eyebrow: "Remodeler in Houston?",
      description: "We film your finished rooms and your crew, run the ads, and our team books the in-home visit.",
      href: "/#book",
      label: "Book a Free Call",
    },
    ctaBottom: {
      title: "Ready for fewer small jobs and more full remodels?",
      description: "Let's talk about the jobs you want and the parts of Houston you want to work in.",
      href: "/#book",
      label: "Book a Free Call",
    },
    aside: {
      takeaways: [
        "Remodeling is a visual sale. Show it.",
        "Ask budget and timing in the form.",
        "Book the visit fast, while they are excited.",
      ],
    },
    sections: [
      {
        kind: "text",
        id: "short-answer",
        title: "Do Facebook ads work for remodelers in Houston?",
        paragraphs: [
          "Yes. Remodeling may be one of the best fits for Facebook and Instagram ads.",
          "People scroll and dream about a new kitchen. They save photos. They show their spouse.",
          "Most remodels are planned for months. That gives you time to show up again and again in their feed.",
          "The goal is not more leads. The goal is the right leads. People with a real budget and a real plan.",
        ],
      },
      {
        kind: "text",
        id: "why-it-fits",
        title: "Why is remodeling a good fit for social ads?",
        paragraphs: [
          "Remodeling is a picture sale. People buy what they can see.",
          "Facebook and Instagram are made for pictures and video. Your work looks good there.",
          "It is also a trust sale. A remodel means a crew in the house for weeks. Homeowners want to know who you are. Video of you answers that.",
        ],
        list: [
          "People plan remodels for a long time.",
          "They want to see real finished work.",
          "They want to see the person in charge.",
          "They often decide as a couple.",
        ],
      },
      {
        kind: "checklist",
        id: "ads-that-work",
        title: "What Facebook ads work for remodelers?",
        items: [
          {
            title: "The slow walk-through",
            detail: "Film a finished kitchen or bath. Walk in slowly. Point out the details you are proud of.",
          },
          {
            title: "Before, during, after",
            detail: "Show the gutted room. Show the crew at work. Show the final reveal. People love the change.",
          },
          {
            title: "The owner explains",
            detail: "You talk about how a project works. Design, pricing, timeline, cleanup. This calms nerves.",
          },
          {
            title: "The homeowner reaction",
            detail: "With permission, film the first look. Real joy is hard to fake, so never fake it.",
          },
          {
            title: "The “mistakes to avoid” video",
            detail: "Tell people three things to ask any remodeler. You help them and look like the pro.",
          },
        ],
        note: "Only show your own work. Never use stock photos as if they were your jobs.",
      },
      {
        kind: "table",
        id: "sort-leads",
        title: "How do you sort out small or cheap remodel leads?",
        columns: ["Form question", "What it tells you"],
        rows: [
          ["Do you own the home?", "Cuts out renters."],
          ["What room or project?", "Kitchen, bath, whole home, or a small fix."],
          ["When do you want to start?", "Ready now, or just looking."],
          ["What budget range fits you?", "Lets you skip jobs too small for you."],
          ["What part of Houston?", "Keeps you near your crews."],
        ],
        note: "More questions means fewer leads. But it often means better leads. Find your balance.",
      },
      {
        kind: "text",
        id: "who-to-reach",
        title: "Who should Houston remodelers target?",
        paragraphs: [
          "Pick the parts of Houston where you want to work. Think about drive time for your crews.",
          "Target homeowners. Keep it simple. Let the form questions do the sorting.",
          "Show different ads to different people. Kitchen ads to some. Bath ads to others. Then see which bring the best jobs.",
        ],
      },
      {
        kind: "text",
        id: "ad-cost",
        title: "How much do Facebook ads cost for remodelers?",
        paragraphs: [
          "There is no set price. You pick the budget. You can change it or pause it any day.",
          "A remodel lead may cost more than a small repair lead. That can still be a great deal. One kitchen can be worth many small jobs.",
          "So do not judge by cost per lead alone. Judge by cost per signed job. And by how big those jobs are.",
          "Give your ads a few months. The first weeks are for testing which rooms, areas, and videos bring the best homeowners.",
        ],
        links: [
          {
            context: "Set your number with",
            label: "how much a contractor should spend on ads",
            href: "/guides/how-much-should-a-contractor-spend-on-ads",
          },
        ],
      },
      {
        kind: "text",
        id: "book-visit",
        title: "How do you turn a remodel lead into a visit?",
        paragraphs: [
          "A remodel lead is excited right now. That fades fast.",
          "Text them right away. Call soon after. Book a time to see the space. Ask if both decision makers can be there.",
          "This is the job of the Houston Growth Engine. We text every lead fast. Our team calls, asks the key questions, and books the visit. You show up to a homeowner who is ready to talk.",
        ],
        links: [
          {
            context: "See how we film",
            label: "contractor videos in Houston",
            href: "/services/video-production",
            suffix: "on real job sites.",
          },
          {
            context: "Learn how to",
            label: "book more estimates and win bigger jobs",
            href: "/guides/how-to-book-more-estimates-contractors",
          },
        ],
      },
      {
        kind: "faq",
        id: "faqs",
        title: "FAQs",
        items: [
          {
            q: "Are Facebook ads good for kitchen remodelers?",
            a: "They can be. Kitchens are visual and planned. Real video of your work and a few smart form questions help a lot.",
          },
          {
            q: "How do I avoid tiny jobs from ads?",
            a: "Ask about the project and the budget in the form. Show big jobs in your ads. People see what you do and self-sort.",
          },
          {
            q: "Do I need a pro camera for remodel videos?",
            a: "No. A newer phone with good light works. Keep it steady and walk slowly.",
          },
          {
            q: "How long until a remodel lead signs?",
            a: "It varies. Some sign in weeks. Some take months. Keep following up kindly.",
          },
          {
            q: "Should I show prices in my ads?",
            a: "That is your call. Some remodelers share a starting range to sort leads. Others talk price at the visit.",
          },
        ],
      },
      {
        kind: "related",
        id: "related",
        title: "Related guides",
        items: [
          { href: "/guides/on-the-job-video-for-contractors", label: "What to Film: On-the-Job Video for Contractors", tag: "Video" },
          { href: "/guides/how-much-should-a-contractor-spend-on-ads", label: "How Much Should a Contractor Spend on Ads?", tag: "Budget" },
          { href: "/guides/how-to-choose-a-marketing-agency-houston", label: "How to Choose a Marketing Agency in Houston", tag: "Agency" },
          { href: "/houston-growth-engine", label: "The Houston Growth Engine", tag: "Service" },
        ],
      },
    ],
  },
  /* ───────────────────────────────────────────────────────────
     NOV 2026 BATCH — Video
     Primary KW: "on the job video for contractors" / "contractor video marketing houston"
     ─────────────────────────────────────────────────────────── */
  {
    slug: "on-the-job-video-for-contractors",
    type: "support",
    title: "What Should Contractors Film on the Job? 12 Video Ideas",
    description:
      "Contractors should film themselves on real jobs: the problem, the work, the finished result, and a few words to the camera. Homeowners trust a real face more than a logo. A phone, good light, and clear sound are enough to start.",
    metaTitle: "On-the-Job Video for Contractors: 12 Ideas | QuickLaunchWeb",
    metaDescription:
      "12 easy on-the-job video ideas for Houston contractors, simple phone tips, and how real job video builds trust and books bigger jobs.",
    kicker: "Support Guide",
    category: "Contractor Video",
    updated: "Nov 2026",
    readTime: "7 min read",
    heroBullets: [
      "Why homeowners trust job video.",
      "12 things to film this week.",
      "Simple phone video tips.",
      "How to turn clips into ads.",
    ],
    jumpLinks: [
      { id: "short-answer", label: "Short answer" },
      { id: "why-video", label: "Why video works" },
      { id: "video-ideas", label: "12 video ideas" },
      { id: "phone-tips", label: "Phone tips" },
      { id: "what-not-to-do", label: "What not to do" },
      { id: "faqs", label: "FAQs" },
      { id: "related", label: "Related" },
    ],
    ctaTop: {
      eyebrow: "No time to film?",
      description: "We come to your real jobs, film you, and turn it into Facebook and Instagram ads.",
      href: "/#book",
      label: "Book a Free Call",
    },
    ctaBottom: {
      title: "Want your real work to sell for you?",
      description: "We film you on the job, run the ads, and our team books the estimates.",
      href: "/#book",
      label: "Book a Free Call",
    },
    aside: {
      takeaways: [
        "Real beats polished.",
        "Sound matters more than the camera.",
        "Always ask the homeowner before filming.",
      ],
    },
    sections: [
      {
        kind: "text",
        id: "short-answer",
        title: "What should a contractor film on the job?",
        paragraphs: [
          "Film the real work. Film yourself talking.",
          "Show the problem you found. Show how you fix it. Show the clean result.",
          "Then look at the camera and say who you are. That part is the most important.",
          "Homeowners are letting a stranger into their home. Video lets them meet you first.",
        ],
      },
      {
        kind: "text",
        id: "why-video",
        title: "Why does on-the-job video build trust?",
        paragraphs: [
          "A logo cannot shake your hand. A stock photo cannot answer a question.",
          "Video shows your face, your voice, and how you work. People can tell if you are kind and if you know your stuff.",
          "It also shows real Houston homes. Streets and houses that look like theirs. That feels close and real.",
          "Good contractors often skip video. They are busy doing the work. That is why video can help you stand out.",
        ],
        list: [
          "People see who will come to their home.",
          "They see that your work is real.",
          "They hear how you explain things.",
          "They feel like they know you before you call.",
        ],
      },
      {
        kind: "table",
        id: "video-ideas",
        title: "What are 12 easy video ideas for contractors?",
        columns: ["#", "Video idea", "What to show", "Good for"],
        rows: [
          ["1", "Meet the owner", "You say your name, trade, and area", "Trust"],
          ["2", "The problem", "Damage, rot, rust, or a leak you found", "Showing need"],
          ["3", "Before and after", "Same spot, start and finish", "Proof"],
          ["4", "Time lapse", "Phone on a stand while the crew works", "Showing effort"],
          ["5", "What we check", "Walk through your inspection steps", "Teaching"],
          ["6", "Quick tip", "One thing a homeowner can do today", "Helping first"],
          ["7", "Myth vs. truth", "A common belief, then the real answer", "Expert look"],
          ["8", "Meet the crew", "Each person waves and says their role", "Trust"],
          ["9", "Clean job site", "Drop cloths, cleanup, a swept driveway", "Calming fears"],
          ["10", "Materials", "Show the product you use and why", "Bigger jobs"],
          ["11", "Customer words", "A real homeowner, only if they agree", "Proof"],
          ["12", "Ask me anything", "Answer a question you hear a lot", "Teaching"],
        ],
        note: "Film a few of these on every job. In a month you will have plenty for ads.",
      },
      {
        kind: "checklist",
        id: "phone-tips",
        title: "How do you film good video with a phone?",
        items: [
          {
            title: "Hold it up and down",
            detail: "Film tall, not wide. Facebook and Instagram feeds and Reels are made for tall video.",
          },
          {
            title: "Face the light",
            detail: "Stand so the sun or a bright window is in front of you, not behind you.",
          },
          {
            title: "Get close for sound",
            detail: "Wind and saws are loud. A small clip-on mic helps a lot. If not, stand close to the phone.",
          },
          {
            title: "Keep it steady",
            detail: "Use two hands or lean on something. Move slowly.",
          },
          {
            title: "Start strong",
            detail: "Say the big thing first. “This roof is leaking in three spots.” Then explain.",
          },
          {
            title: "Keep it short",
            detail: "Most clips can be under a minute. Say one idea per video.",
          },
        ],
        note: "You do not need a film crew to start. You just need to start.",
      },
      {
        kind: "text",
        id: "what-not-to-do",
        title: "What should contractors avoid in videos?",
        paragraphs: [
          "Do not film a home without asking. Get the homeowner's OK first. Do not show house numbers or faces without permission.",
          "Do not show unsafe work. No missing safety gear. Homeowners notice. So do other pros.",
          "Do not fake it. No paid actors pretending to be customers. No stock clips sold as your jobs. Fake proof breaks trust fast.",
          "Do not wait for perfect. A real, kind, simple video beats a fancy one you never post.",
        ],
      },
      {
        kind: "text",
        id: "turn-into-ads",
        title: "How do you turn job videos into ads?",
        paragraphs: [
          "Pick your best clips. Add short captions, since many people watch with the sound off.",
          "Run them as Facebook and Instagram ads to homeowners in the areas you serve.",
          "Add a simple form. Then call every lead fast.",
          "This is the core of the Houston Growth Engine. We film you on real jobs. We run the ads. We text every lead fast. Our team calls and books the estimate.",
        ],
        links: [
          {
            context: "See how our",
            label: "contractor video production",
            href: "/services/video-production",
            suffix: "works in Houston.",
          },
          {
            context: "See trade examples in",
            label: "Facebook ads for roofers in Houston",
            href: "/guides/facebook-ads-for-roofers-houston",
          },
        ],
      },
      {
        kind: "faq",
        id: "faqs",
        title: "FAQs",
        items: [
          {
            q: "Do contractor videos really help get jobs?",
            a: "They help homeowners trust you before you meet. Trust is a big part of who gets hired. Video is one of the clearest ways to show it.",
          },
          {
            q: "What camera should a contractor use?",
            a: "A newer phone is enough. Good light and clear sound matter more than the camera.",
          },
          {
            q: "How long should a contractor video be?",
            a: "Short. Many good ad clips are under a minute. One idea per video.",
          },
          {
            q: "I am shy on camera. Can I still do this?",
            a: "Yes. Talk like you talk to a customer. Show your hands and the work if you want. It gets easier fast.",
          },
          {
            q: "Can someone film for me?",
            a: "Yes. A crew member can film. Or we can come to your real jobs and film you.",
          },
        ],
      },
      {
        kind: "related",
        id: "related",
        title: "Related guides",
        items: [
          { href: "/guides/facebook-ads-for-remodelers-houston", label: "Facebook Ads for Remodelers in Houston", tag: "Ads" },
          { href: "/guides/facebook-ads-for-roofers-houston", label: "How Much Do Facebook Ads Cost for Roofers in Houston?", tag: "Ads" },
          { href: "/guides/how-to-book-more-estimates-contractors", label: "How to Book More Estimates and Win Bigger Jobs", tag: "Booking" },
          { href: "/services/video-production", label: "Contractor Video Production", tag: "Service" },
        ],
      },
    ],
  },
  /* ───────────────────────────────────────────────────────────
     NOV 2026 BATCH — Shared vs. exclusive leads
     Primary KW: "shared leads vs exclusive leads contractors"
     ─────────────────────────────────────────────────────────── */
  {
    slug: "shared-leads-vs-exclusive-leads-contractors",
    type: "support",
    title: "Shared Leads vs. Exclusive Leads: Which Is Better for Contractors?",
    description:
      "Exclusive leads are usually better for contractors who want bigger jobs. A shared lead from a site like Angi, HomeAdvisor, or Thumbtack can go to more than one pro, so you race on speed and price. An exclusive lead comes from your own ads with your name on it, so the homeowner already knows who you are.",
    metaTitle: "Shared vs. Exclusive Leads for Contractors | QuickLaunchWeb",
    metaDescription:
      "Shared leads from Angi, HomeAdvisor, and Thumbtack vs. exclusive leads from your own ads. What each costs you, the FTC case, and how to switch.",
    kicker: "Support Guide",
    category: "Lead Generation",
    updated: "Nov 2026",
    readTime: "7 min read",
    heroBullets: [
      "What shared and exclusive leads are.",
      "A side by side comparison table.",
      "What the FTC said about HomeAdvisor leads.",
      "How to move off shared leads slowly.",
    ],
    jumpLinks: [
      { id: "short-answer", label: "Short answer" },
      { id: "what-they-are", label: "What they are" },
      { id: "comparison", label: "Comparison" },
      { id: "hidden-costs", label: "Hidden costs" },
      { id: "ftc-case", label: "The FTC case" },
      { id: "how-to-switch", label: "How to switch" },
      { id: "faqs", label: "FAQs" },
      { id: "related", label: "Related" },
    ],
    ctaTop: {
      eyebrow: "Tired of racing other pros?",
      description: "We run ads with your face and name on them, so the leads are yours. Our team books the estimate.",
      href: "/#book",
      label: "Book a Free Call",
    },
    ctaBottom: {
      title: "Want leads that are only yours?",
      description: "Let's look at what you get from lead sites now and what your own ads could do instead.",
      href: "/#book",
      label: "Book a Free Call",
    },
    aside: {
      takeaways: [
        "Shared leads mean a race.",
        "Exclusive leads mean a head start.",
        "Do not quit lead sites in one day. Test first.",
      ],
    },
    sections: [
      {
        kind: "text",
        id: "short-answer",
        title: "Are shared leads or exclusive leads better?",
        paragraphs: [
          "For most good contractors, exclusive leads are better.",
          "With a shared lead, you are one of a few pros calling the same person. The fastest or cheapest often wins.",
          "With an exclusive lead, the homeowner saw your ad. They saw your face. They asked for you.",
          "Shared leads can still fill gaps. But it is hard to build a business on a lead someone else also bought.",
        ],
      },
      {
        kind: "text",
        id: "what-they-are",
        title: "What is the difference between shared and exclusive leads?",
        paragraphs: [
          "A shared lead is a homeowner request sold to more than one business. Sites like Angi, HomeAdvisor, and Thumbtack match homeowners with pros. You pay for leads or for being matched. Rules and prices change, so check each site.",
          "An exclusive lead goes only to you. It comes from your own marketing. Your Facebook and Instagram ads. Your website. Your Google profile. Referrals.",
          "With exclusive leads, you own the whole path. The ad, the message, and the follow-up are all yours.",
        ],
      },
      {
        kind: "table",
        id: "comparison",
        title: "How do shared and exclusive leads compare?",
        columns: ["", "Shared leads (lead sites)", "Exclusive leads (your own ads)"],
        rows: [
          ["Who else gets it", "Often other pros too", "Only you"],
          ["What the homeowner knows", "The site's name", "Your name and face"],
          ["How you win", "Call first, often price low", "Show trust, sell value"],
          ["Job size", "Often small or price shopped", "Can aim at bigger jobs"],
          ["Control of the ad", "The site controls it", "You control it"],
          ["Brand building", "Builds the site's brand", "Builds your brand"],
          ["If you stop paying", "Leads stop", "Leads slow, but your name stays known"],
          ["Setup time", "Fast", "Takes a few weeks to tune"],
        ],
        note: "Every market is different. This is a general comparison, not a promise.",
      },
      {
        kind: "checklist",
        id: "hidden-costs",
        title: "What are the hidden costs of shared leads?",
        items: [
          {
            title: "Time chasing people who chose someone else",
            detail: "You call. They already booked. That is time you do not get back.",
          },
          {
            title: "Price pressure",
            detail: "When four pros call, someone goes low. That drags your price down too.",
          },
          {
            title: "Bad fits",
            detail: "Some leads are too small, out of area, or just looking. You may still pay for them.",
          },
          {
            title: "No name recognition",
            detail: "The homeowner remembers the website, not you. Next time, they go back to the site.",
          },
          {
            title: "Stress",
            detail: "Racing to call back every lead in the middle of a job is hard on you and your crew.",
          },
        ],
      },
      {
        kind: "text",
        id: "ftc-case",
        title: "What did the FTC say about HomeAdvisor leads?",
        paragraphs: [
          "The Federal Trade Commission (FTC) took action against HomeAdvisor. In 2023, the FTC finalized an order that requires HomeAdvisor to pay up to $7.2 million.",
          "The FTC said HomeAdvisor made misleading claims about its leads. That included claims about how likely homeowners were to hire soon.",
          "HomeAdvisor disputed the FTC's claims. The order also bans false or misleading claims about leads going forward.",
          "The lesson is simple. Track every lead you buy. How many turn into real visits? How many turn into paid jobs?",
        ],
      },
      {
        kind: "text",
        id: "how-to-switch",
        title: "How do you switch from shared leads to exclusive leads?",
        paragraphs: [
          "Do not quit all at once. Lead sites may be paying some bills today.",
          "Start your own ads next to them. Track both for a few months. Count booked jobs and money made, not just leads.",
          "As your own ads start to work, move money over bit by bit.",
        ],
        list: [
          "Film yourself on real jobs.",
          "Run Facebook and Instagram ads in your areas.",
          "Text and call every lead within minutes.",
          "Track jobs and revenue from each source.",
          "Move budget to what makes the most money.",
        ],
        links: [
          {
            context: "This is what",
            label: "the Houston Growth Engine",
            href: "/houston-growth-engine",
            suffix: "does for Houston contractors.",
          },
          {
            context: "Not sure on budget? Read",
            label: "how much a contractor should spend on ads",
            href: "/guides/how-much-should-a-contractor-spend-on-ads",
          },
        ],
      },
      {
        kind: "faq",
        id: "faqs",
        title: "FAQs",
        items: [
          {
            q: "Is Angi worth it for contractors?",
            a: "It depends on your trade, area, and how fast you call. Track how many Angi leads become paid jobs. Compare that to other sources.",
          },
          {
            q: "What is an alternative to HomeAdvisor and Thumbtack?",
            a: "Your own exclusive leads. Facebook and Instagram ads, Google, your website, and referrals all bring leads that only go to you.",
          },
          {
            q: "Are exclusive leads more expensive?",
            a: "Sometimes each lead costs more. But if more of them turn into bigger jobs, the cost per job can be lower. Judge by jobs, not leads.",
          },
          {
            q: "How fast do exclusive leads start?",
            a: "Ads can start in days. Tuning them to bring good jobs usually takes a few weeks.",
          },
          {
            q: "Should I stop using lead sites right away?",
            a: "No. Run both and track results. Move money over as your own ads prove they work.",
          },
        ],
      },
      {
        kind: "related",
        id: "related",
        title: "Related guides",
        items: [
          { href: "/guides/how-to-book-more-estimates-contractors", label: "How to Book More Estimates and Win Bigger Jobs", tag: "Booking" },
          { href: "/guides/how-much-should-a-contractor-spend-on-ads", label: "How Much Should a Contractor Spend on Ads?", tag: "Budget" },
          { href: "/guides/on-the-job-video-for-contractors", label: "What to Film: On-the-Job Video for Contractors", tag: "Video" },
          { href: "/houston-growth-engine", label: "The Houston Growth Engine", tag: "Service" },
        ],
      },
    ],
  },
  /* ───────────────────────────────────────────────────────────
     NOV 2026 BATCH — Speed to lead / booking / bigger jobs
     Primary KW: "how to book more estimates contractor"
     ─────────────────────────────────────────────────────────── */
  {
    slug: "how-to-book-more-estimates-contractors",
    type: "support",
    title: "How Do Contractors Book More Estimates and Win Bigger Jobs?",
    description:
      "Contractors book more estimates by answering every lead within minutes, with a text first and then a call. They win bigger jobs by asking good questions, showing up on time, and offering a good, better, and best choice. Most lost jobs are lost in the follow-up, not in the ad.",
    metaTitle: "How to Book More Estimates as a Contractor | QuickLaunchWeb",
    metaDescription:
      "A simple plan to book more estimates from your leads and win bigger jobs: speed to lead, a call script, follow-up steps, and good-better-best options.",
    kicker: "Support Guide",
    category: "Speed to Lead",
    updated: "Nov 2026",
    readTime: "7 min read",
    heroBullets: [
      "Why speed matters so much.",
      "A simple first-call script.",
      "A follow-up plan you can copy.",
      "How to turn a small job into a bigger one.",
    ],
    jumpLinks: [
      { id: "short-answer", label: "Short answer" },
      { id: "speed", label: "Speed to lead" },
      { id: "first-call", label: "First call" },
      { id: "follow-up", label: "Follow-up plan" },
      { id: "bigger-jobs", label: "Bigger jobs" },
      { id: "faqs", label: "FAQs" },
      { id: "related", label: "Related" },
    ],
    ctaTop: {
      eyebrow: "Too busy to call back fast?",
      description: "We text every lead right away, and our team calls and books the estimate for you.",
      href: "/#book",
      label: "Book a Free Call",
    },
    ctaBottom: {
      title: "Want more estimates on your calendar?",
      description: "Let's look at what happens to your leads today, and where jobs slip away.",
      href: "/#book",
      label: "Book a Free Call",
    },
    aside: {
      takeaways: [
        "Text right away. Call within minutes.",
        "Follow up more than once.",
        "Always offer more than one choice.",
      ],
    },
    sections: [
      {
        kind: "text",
        id: "short-answer",
        title: "How can a contractor book more estimates?",
        paragraphs: [
          "Answer fast. Follow up more. Make it easy to say yes.",
          "Most contractors do not need more leads first. They need to book more of the leads they already get.",
          "A lead that waits a day often goes cold. They found someone else. Or they just forgot.",
          "Fix the follow-up, and every dollar you spend on ads goes further.",
        ],
      },
      {
        kind: "text",
        id: "speed",
        title: "How fast should you respond to a new lead?",
        paragraphs: [
          "As fast as you can. Minutes, not hours.",
          "A well known study in Harvard Business Review, “The Short Life of Online Sales Leads” (2011), checked how fast 2,241 U.S. companies replied to web leads.",
          "It found that 23% of the companies never replied at all. Many others took more than a day.",
          "That was across many kinds of businesses, not just contractors. But the lesson fits. Being fast is an easy way to beat a lot of competitors.",
        ],
        links: [
          {
            context: "Read the study summary at",
            label: "Harvard Business Review",
            href: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads",
          },
        ],
      },
      {
        kind: "text",
        id: "why-cold",
        title: "Why do contractor leads go cold?",
        paragraphs: [
          "Most leads do not go cold because they were bad. They go cold because no one reached them in time.",
          "The owner is on a job. The phone is in the truck. By the time they call back, it is dinner time. The homeowner already booked someone.",
          "Other times, there is one call and no follow-up. The homeowner missed it. Then life got busy.",
          "These are fixable problems. You need a fast first touch and a simple plan for what comes next.",
        ],
        links: [
          {
            context: "See how missed calls add up in",
            label: "the missed-call leak guide",
            href: "/guides/120k-leak-missed-calls-reviews",
          },
        ],
      },
      {
        kind: "checklist",
        id: "first-call",
        title: "What should you say on the first call?",
        items: [
          {
            title: "Say who you are",
            detail: "“Hi, this is Maria with your roofing company. You asked about your roof. Is now a good time?”",
          },
          {
            title: "Ask what is going on",
            detail: "Let them talk. What is the problem? How long has it been going on?",
          },
          {
            title: "Ask about timing",
            detail: "“When would you like this done?” It tells you how ready they are.",
          },
          {
            title: "Ask who decides",
            detail: "“Will anyone else be part of the decision?” Try to have them both at the estimate.",
          },
          {
            title: "Book a time",
            detail: "Give two choices. “Tuesday at 10 or Wednesday at 4?” It is easier than an open question.",
          },
          {
            title: "Confirm by text",
            detail: "Send the time, your name, and a photo of who is coming.",
          },
        ],
        note: "The name and trade above are just an example. Use your own words.",
      },
      {
        kind: "table",
        id: "follow-up",
        title: "What does a good follow-up plan look like?",
        columns: ["When", "What to do"],
        rows: [
          ["Right away", "Send a text: you got their request and will call soon."],
          ["Within minutes", "Call. If no answer, leave a short voicemail."],
          ["Same day", "Text again with a simple question."],
          ["Next day", "Call one more time."],
          ["Day 3", "Text a short job video or a photo of similar work."],
          ["Week 1", "One last friendly check-in."],
          ["Day before the estimate", "Text a reminder with who is coming."],
          ["After the estimate", "Follow up on the quote within a couple of days."],
        ],
        note: "This is a sample plan. Adjust it to your trade. Always respect people who ask you to stop.",
      },
      {
        kind: "text",
        id: "bigger-jobs",
        title: "How do contractors win bigger jobs?",
        paragraphs: [
          "Bigger jobs come from trust and choices.",
          "Show up on time. Look clean. Explain what you see in plain words. Show photos of the problem.",
          "Then give options. A good fix. A better fix. The best fix. Many homeowners pick the middle or the top when they understand why.",
          "Your ads matter too. If your videos show big, beautiful jobs, you attract people who want big, beautiful jobs.",
        ],
        list: [
          "Be on time and send a heads-up text.",
          "Explain the problem with photos.",
          "Offer good, better, and best options.",
          "Put the quote in writing the same day.",
          "Follow up, kindly, until they decide.",
        ],
      },
      {
        kind: "callout",
        id: "how-we-help",
        title: "We do the fast part for you",
        body: [
          "Most owners are on a roof or under a sink when a lead comes in. That is normal.",
          "In the Houston Growth Engine, we text every lead fast. Our team calls, asks the key questions, and books the estimate on your calendar.",
          "You show up and sell. We track what turns into real jobs and money.",
        ],
      },
      {
        kind: "faq",
        id: "faqs",
        title: "FAQs",
        items: [
          {
            q: "What is speed to lead?",
            a: "It is how fast you reply to a new lead. Faster replies usually mean more booked estimates.",
          },
          {
            q: "Should I text or call a new lead first?",
            a: "Do both. A quick text lets them know you got it. A call right after books the visit.",
          },
          {
            q: "How many times should I follow up?",
            a: "More than once. Many people need a few touches. Stop if they ask you to.",
          },
          {
            q: "How do I get bigger jobs, not small repairs?",
            a: "Show big jobs in your ads, ask good questions, and give good, better, and best options at the estimate.",
          },
          {
            q: "Can someone else book estimates for me?",
            a: "Yes. A person in your office can. Or our team can call and book for you as part of the Houston Growth Engine.",
          },
        ],
      },
      {
        kind: "related",
        id: "related",
        title: "Related guides",
        items: [
          { href: "/guides/120k-leak-missed-calls-reviews", label: "The Missed-Call Leak Costing Contractors Jobs", tag: "Leads" },
          { href: "/guides/shared-leads-vs-exclusive-leads-contractors", label: "Shared Leads vs. Exclusive Leads", tag: "Leads" },
          { href: "/guides/on-the-job-video-for-contractors", label: "What to Film: On-the-Job Video for Contractors", tag: "Video" },
          { href: "/houston-growth-engine", label: "The Houston Growth Engine", tag: "Service" },
        ],
      },
    ],
  },
  /* ───────────────────────────────────────────────────────────
     NOV 2026 BATCH — Budget
     Primary KW: "how much should a contractor spend on ads"
     ─────────────────────────────────────────────────────────── */
  {
    slug: "how-much-should-a-contractor-spend-on-ads",
    type: "support",
    title: "How Much Should a Contractor Spend on Ads?",
    description:
      "Spend what you can keep running for at least a few months, and set it by the jobs you want, not by a guess. Work backward from how many jobs you need, how many estimates it takes to win one, and how many leads it takes to book an estimate. Then judge your ads by booked jobs and money made, not by clicks.",
    metaTitle: "How Much Should a Contractor Spend on Ads? | QuickLaunchWeb",
    metaDescription:
      "A simple way for contractors to set an ad budget: work back from the jobs you want, use a rule of thumb, and judge ads by booked jobs, not clicks.",
    kicker: "Support Guide",
    category: "Marketing Budget",
    updated: "Nov 2026",
    readTime: "6 min read",
    heroBullets: [
      "A rule of thumb many owners start with.",
      "A fill-in-the-blank budget table.",
      "What to count, and what to ignore.",
      "When to spend more, and when to stop.",
    ],
    jumpLinks: [
      { id: "short-answer", label: "Short answer" },
      { id: "rule-of-thumb", label: "Rule of thumb" },
      { id: "work-backward", label: "Work backward" },
      { id: "what-to-count", label: "What to count" },
      { id: "when-to-change", label: "When to change" },
      { id: "faqs", label: "FAQs" },
      { id: "related", label: "Related" },
    ],
    ctaTop: {
      eyebrow: "Not sure what to spend?",
      description: "On a free call, we can walk through your numbers and what a budget could look like for your trade.",
      href: "/#book",
      label: "Book a Free Call",
    },
    ctaBottom: {
      title: "Want a budget built around jobs, not guesses?",
      description: "Bring your average job size and your goals. We will talk it through with you.",
      href: "/#book",
      label: "Book a Free Call",
    },
    aside: {
      takeaways: [
        "Start with jobs you want, then work back.",
        "Give ads a few months to learn.",
        "Count booked jobs and revenue, not likes.",
      ],
    },
    sections: [
      {
        kind: "text",
        id: "short-answer",
        title: "How much should a contractor spend on ads?",
        paragraphs: [
          "There is no one right number. But there is a right way to pick one.",
          "Start with how many new jobs you want each month. Then work backward to the budget.",
          "Pick an amount you can keep running for a few months. Ads need time to learn who your best customers are.",
          "Do not spend money you need for payroll. Ads should be a steady habit, not a gamble.",
        ],
      },
      {
        kind: "text",
        id: "rule-of-thumb",
        title: "Is there a rule of thumb for marketing budgets?",
        paragraphs: [
          "Yes, a common one.",
          "Many business guides credit the U.S. Small Business Administration (SBA) with this rule of thumb: spend about 7% to 8% of gross revenue on marketing if you make under $5 million a year.",
          "That is total marketing, not just ads. And it is only a starting point.",
          "A new company trying to grow fast may spend more. A busy company with a long wait list may spend less.",
        ],
      },
      {
        kind: "table",
        id: "work-backward",
        title: "How do you work backward to an ad budget?",
        columns: ["Step", "Question", "Your number"],
        rows: [
          ["1", "How many new jobs do you want per month?", "A"],
          ["2", "Out of 10 estimates, how many do you win?", "B (out of 10)"],
          ["3", "So how many estimates do you need?", "A ÷ B × 10"],
          ["4", "Out of 10 leads, how many book an estimate?", "C (out of 10)"],
          ["5", "So how many leads do you need?", "Estimates ÷ C × 10"],
          ["6", "What does one lead cost you now?", "D (from your own ads)"],
          ["7", "Estimated monthly ad budget", "Leads × D"],
        ],
        note: "This is a simple estimate. Use your own real numbers. If you do not know them yet, start tracking them now.",
      },
      {
        kind: "text",
        id: "example",
        title: "Can you show an example?",
        paragraphs: [
          "Here is a made-up example. These are not real client numbers.",
          "Say you want 4 new jobs a month. You win 3 out of 10 estimates. So you need about 14 estimates.",
          "Say 5 out of 10 leads book an estimate. So you need about 28 leads.",
          "Now multiply 28 by what one lead costs you. That is your rough monthly ad budget.",
          "Here is the key part. If you book 7 out of 10 leads instead of 5, you need fewer leads. Better follow-up lowers the budget you need.",
        ],
        links: [
          {
            context: "Learn how to",
            label: "book more estimates from your leads",
            href: "/guides/how-to-book-more-estimates-contractors",
          },
        ],
      },
      {
        kind: "checklist",
        id: "what-to-count",
        title: "What should a contractor track to judge ads?",
        items: [
          { title: "Leads", detail: "How many people asked for help." },
          { title: "Booked estimates", detail: "How many of them you set a visit with." },
          { title: "Jobs won", detail: "How many signed and paid." },
          { title: "Revenue", detail: "How much money those jobs brought in." },
          { title: "Cost per job", detail: "Ad spend divided by jobs won. This is the number that matters most." },
        ],
        note: "Clicks, likes, and views are nice. But they do not pay the bills. Booked jobs do.",
      },
      {
        kind: "text",
        id: "when-to-change",
        title: "When should you spend more or less on ads?",
        paragraphs: [
          "Spend more when ads bring jobs that make money and you have crew time.",
          "Hold steady when you are booked out. Do not pay for leads you cannot serve.",
          "Spend less or change the ad when leads come in but do not turn into jobs. Look at the follow-up first. Then look at the ad.",
          "In Houston, seasons matter. Storms, heat, and freezes all change demand. Plan for them.",
        ],
        links: [
          {
            context: "See the",
            label: "Houston contractor marketing calendar",
            href: "/guides/houston-contractor-marketing-calendar",
            suffix: "for the busy seasons.",
          },
          {
            context: "See how we run",
            label: "Facebook ads for contractors",
            href: "/services/facebook-ads",
            suffix: "in Houston.",
          },
        ],
      },
      {
        kind: "faq",
        id: "faqs",
        title: "FAQs",
        items: [
          {
            q: "What percent of revenue should a contractor spend on marketing?",
            a: "Many guides cite an SBA rule of thumb of about 7% to 8% of gross revenue for businesses under $5 million a year. Treat it as a starting point.",
          },
          {
            q: "Is ad spend the same as what I pay an agency?",
            a: "No. Ad spend goes to Facebook, Instagram, or Google. Agency fees are paid to the people who run it. Ask any agency to show both clearly.",
          },
          {
            q: "How long before I know if ads work?",
            a: "Give it a few months. The first weeks are for testing. Judge by booked jobs over time.",
          },
          {
            q: "Can I start small?",
            a: "Yes. A small budget can test your ads and your follow-up. Grow it as you see real jobs come in.",
          },
          {
            q: "What is a good cost per lead?",
            a: "It depends on your trade and job size. A lead that costs more can still be a great deal if it turns into a big job.",
          },
        ],
      },
      {
        kind: "related",
        id: "related",
        title: "Related guides",
        items: [
          { href: "/guides/how-to-choose-a-marketing-agency-houston", label: "How to Choose a Marketing Agency in Houston", tag: "Agency" },
          { href: "/guides/shared-leads-vs-exclusive-leads-contractors", label: "Shared Leads vs. Exclusive Leads", tag: "Leads" },
          { href: "/guides/facebook-ads-for-roofers-houston", label: "How Much Do Facebook Ads Cost for Roofers in Houston?", tag: "Ads" },
          { href: "/houston-growth-engine", label: "The Houston Growth Engine", tag: "Service" },
        ],
      },
    ],
  },
  /* ───────────────────────────────────────────────────────────
     NOV 2026 BATCH — Judge an agency
     Primary KW: "how to choose a marketing agency in houston"
     ─────────────────────────────────────────────────────────── */
  {
    slug: "how-to-choose-a-marketing-agency-houston",
    type: "support",
    title: "How Do You Choose a Marketing Agency in Houston as a Contractor?",
    description:
      "Pick a Houston agency that works with home service companies, shows its work, and tracks booked jobs and revenue, not just clicks. Ask who owns the ad account, how fast leads get a call back, and how you can leave. Be careful of big promises and long contracts you cannot get out of.",
    metaTitle: "How to Choose a Marketing Agency in Houston",
    metaDescription:
      "Questions Houston contractors should ask before hiring a marketing agency, red flags to watch for, and a simple scorecard to compare agencies.",
    kicker: "Support Guide",
    category: "Marketing Budget",
    updated: "Nov 2026",
    readTime: "7 min read",
    heroBullets: [
      "12 questions to ask any agency.",
      "Red flags that should make you pause.",
      "A scorecard to compare agencies.",
      "What a good first 90 days looks like.",
    ],
    jumpLinks: [
      { id: "short-answer", label: "Short answer" },
      { id: "questions", label: "12 questions" },
      { id: "red-flags", label: "Red flags" },
      { id: "scorecard", label: "Scorecard" },
      { id: "first-90-days", label: "First 90 days" },
      { id: "faqs", label: "FAQs" },
      { id: "related", label: "Related" },
    ],
    ctaTop: {
      eyebrow: "Comparing agencies?",
      description: "Bring these questions to a free call with us. We will answer every one.",
      href: "/#book",
      label: "Book a Free Call",
    },
    ctaBottom: {
      title: "Ask us the hard questions",
      description: "We will tell you how we work, what we track, and whether we are a fit for your company.",
      href: "/#book",
      label: "Book a Free Call",
    },
    aside: {
      takeaways: [
        "You should own your ad account.",
        "Judge agencies by booked jobs and revenue.",
        "Be careful of big guarantees.",
      ],
    },
    sections: [
      {
        kind: "text",
        id: "short-answer",
        title: "How should a contractor choose a marketing agency?",
        paragraphs: [
          "Choose an agency that knows your kind of work.",
          "Selling a roof is not like selling shoes. The agency should know how homeowners pick a contractor.",
          "Ask what they track. Good agencies care about booked jobs and money made. Not just clicks and likes.",
          "Ask what happens after a lead comes in. Ads are only half the job. The call back is the other half.",
          "And ask how you can leave. A good agency keeps you because it works, not because of a contract.",
        ],
      },
      {
        kind: "checklist",
        id: "questions",
        title: "What questions should you ask a marketing agency?",
        items: [
          { title: "Do you work with home service companies?", detail: "Ask which trades. Ask to see real ads they have run." },
          { title: "Who owns the ad account?", detail: "It should be in your name. If you leave, you keep it." },
          { title: "What do you track?", detail: "Look for leads, booked estimates, jobs won, and revenue." },
          { title: "What happens when a lead comes in?", detail: "Who texts? Who calls? How fast?" },
          { title: "Who makes the ads?", detail: "Will they use real video of you, or stock photos?" },
          { title: "How much is ad spend vs. your fee?", detail: "These should be two clear, separate numbers." },
          { title: "How often will we talk?", detail: "Weekly or monthly? Who is your contact?" },
          { title: "What does month one look like?", detail: "There should be a clear plan for setup and testing." },
          { title: "How do I leave if it is not working?", detail: "Know the terms before you sign." },
          { title: "Can I talk to a client?", detail: "A good agency can connect you with someone, with that client's OK." },
          { title: "Are you local to Houston?", detail: "Local helps with filming, seasons, and knowing the areas." },
          { title: "What will you need from me?", detail: "Time on camera? Photos? Fast replies? Know up front." },
        ],
        note: "Write down the answers. Compare agencies side by side.",
      },
      {
        kind: "checklist",
        id: "red-flags",
        title: "What are red flags when hiring an agency?",
        items: [
          { title: "Big guarantees", detail: "No one controls Facebook, Google, or the weather. Be careful of promises that sound too good." },
          { title: "They own your account", detail: "If you leave, you may lose your ads, data, and history." },
          { title: "Only talks about clicks and likes", detail: "Those are not jobs. Ask about booked jobs and revenue." },
          { title: "No real examples", detail: "If they cannot show work they have done, ask why." },
          { title: "Fake reviews or stock “results”", detail: "If something looks made up, it might be." },
          { title: "Long contract with no way out", detail: "Read the cancel terms closely." },
          { title: "Hard to reach", detail: "If they are slow to reply before you sign, it may get worse after." },
        ],
      },
      {
        kind: "table",
        id: "scorecard",
        title: "How can you compare agencies side by side?",
        columns: ["Question", "Agency A", "Agency B", "Agency C"],
        rows: [
          ["Works with home service trades", "Yes / No", "Yes / No", "Yes / No"],
          ["You own the ad account", "Yes / No", "Yes / No", "Yes / No"],
          ["Tracks booked jobs and revenue", "Yes / No", "Yes / No", "Yes / No"],
          ["Handles fast lead follow-up", "Yes / No", "Yes / No", "Yes / No"],
          ["Uses real video of your work", "Yes / No", "Yes / No", "Yes / No"],
          ["Clear fee vs. ad spend", "Yes / No", "Yes / No", "Yes / No"],
          ["Fair cancel terms", "Yes / No", "Yes / No", "Yes / No"],
          ["Local to Houston", "Yes / No", "Yes / No", "Yes / No"],
        ],
        note: "Circle the answers on each call. The agency with the most “Yes” answers is a good place to start.",
      },
      {
        kind: "text",
        id: "first-90-days",
        title: "What should the first 90 days with an agency look like?",
        paragraphs: [
          "Month one is setup. Filming. Ads built. Tracking set up. The first leads come in.",
          "Month two is learning. Which ads bring real jobs? Which areas? What do people ask on the phone?",
          "Month three is tuning. Spend more on what works. Cut what does not.",
          "You should know what is going on each step of the way. If you feel lost, ask.",
        ],
      },
      {
        kind: "text",
        id: "how-we-work",
        title: "How does QuickLaunchWeb work?",
        paragraphs: [
          "We are a Houston team that works with home service companies.",
          "We film you on real jobs. We run Facebook and Instagram ads to homeowners who want bigger jobs. We text every lead fast. Our team calls and books the estimate.",
          "We judge our work by booked jobs and money in your pocket. We do not offer a guarantee. We would rather show you how we work and let you decide.",
        ],
        links: [
          {
            context: "See",
            label: "the Houston Growth Engine",
            href: "/houston-growth-engine",
            suffix: "for the full process.",
          },
          {
            context: "Before you talk budget, read",
            label: "how much a contractor should spend on ads",
            href: "/guides/how-much-should-a-contractor-spend-on-ads",
          },
        ],
      },
      {
        kind: "faq",
        id: "faqs",
        title: "FAQs",
        items: [
          {
            q: "What is the best marketing agency in Houston for contractors?",
            a: "The best one for you knows home services, tracks booked jobs and revenue, lets you own your ad account, and has fair terms. Use the questions above to compare.",
          },
          {
            q: "Should I own my Facebook ad account?",
            a: "Yes. Ask for the account to be in your business name. Then your data stays with you.",
          },
          {
            q: "Should I trust an agency that guarantees results?",
            a: "Be careful. Ask exactly what is promised and what happens if it is not met. Read the fine print.",
          },
          {
            q: "How long should I give an agency?",
            a: "Most ad work needs a few months to test and tune. Watch for clear progress and honest updates along the way.",
          },
          {
            q: "Is a local Houston agency better?",
            a: "It can be. A local team can film your jobs, knows the seasons, and knows the areas you serve.",
          },
        ],
      },
      {
        kind: "related",
        id: "related",
        title: "Related guides",
        items: [
          { href: "/guides/how-much-should-a-contractor-spend-on-ads", label: "How Much Should a Contractor Spend on Ads?", tag: "Budget" },
          { href: "/guides/shared-leads-vs-exclusive-leads-contractors", label: "Shared Leads vs. Exclusive Leads", tag: "Leads" },
          { href: "/guides/facebook-ads-for-hvac-companies-houston", label: "Facebook Ads for HVAC Companies in Houston", tag: "Ads" },
          { href: "/services/facebook-ads", label: "Facebook Ads for Houston Contractors", tag: "Service" },
        ],
      },
    ],
  },
  /* ───────────────────────────────────────────────────────────
     NOV 2026 BATCH — Houston-specific seasons
     Primary KW: "houston contractor marketing calendar" / "best time to advertise home services houston"
     ─────────────────────────────────────────────────────────── */
  {
    slug: "houston-contractor-marketing-calendar",
    type: "support",
    title: "When Should Houston Contractors Advertise? A Season-by-Season Calendar",
    description:
      "Houston contractors should advertise all year and change the message with the weather. Spring is for getting ready, summer is heat and A/C, June through November is hurricane season, and winter brings freeze worries. Have ads and videos ready before each season, not after it starts.",
    metaTitle: "Houston Contractor Marketing Calendar by Season",
    metaDescription:
      "A month-by-month marketing calendar for Houston contractors: heat, hurricane season, freezes, and the ad messages that fit each one.",
    kicker: "Support Guide",
    category: "Houston Marketing",
    updated: "Nov 2026",
    readTime: "6 min read",
    heroBullets: [
      "A month-by-month plan for Houston.",
      "Hurricane season dates from NOAA.",
      "How to get ready before a storm or freeze.",
      "Messages that fit each season.",
    ],
    jumpLinks: [
      { id: "short-answer", label: "Short answer" },
      { id: "calendar", label: "The calendar" },
      { id: "hurricane-season", label: "Hurricane season" },
      { id: "freeze", label: "Freezes" },
      { id: "storm-kit", label: "Storm-ready kit" },
      { id: "faqs", label: "FAQs" },
      { id: "related", label: "Related" },
    ],
    ctaTop: {
      eyebrow: "Plan your next season",
      description: "We film ahead, keep ads ready, and our team books the estimates when demand hits.",
      href: "/#book",
      label: "Book a Free Call",
    },
    ctaBottom: {
      title: "Be ready before the next storm",
      description: "Let's plan your ads, videos, and follow-up for the season ahead.",
      href: "/#book",
      label: "Book a Free Call",
    },
    aside: {
      takeaways: [
        "Advertise all year. Change the message.",
        "Film and build ads before the busy season.",
        "Help first during storms. Sell second.",
      ],
    },
    sections: [
      {
        kind: "text",
        id: "short-answer",
        title: "When is the best time for Houston contractors to advertise?",
        paragraphs: [
          "All year. Houston weather keeps changing what people need.",
          "Heat breaks A/C units. Storms damage roofs and fences. Freezes burst pipes. Each season brings a different kind of call.",
          "The trick is to be ready early. Film your videos and build your ads before the season starts. Then turn them on at the right time.",
          "Keep a small, steady budget running in slow months. People remember who they saw all year.",
        ],
      },
      {
        kind: "table",
        id: "calendar",
        title: "What should Houston contractors promote each season?",
        columns: ["Months", "What is going on", "Ad message ideas", "Trades that fit"],
        rows: [
          ["Jan – Feb", "Cold snaps can happen", "Freeze prep, heaters, pipe checks, plan spring projects", "Plumbing, HVAC, remodeling"],
          ["Mar – Apr", "Spring storms, people plan projects", "Roof checks, A/C tune-ups, remodel planning", "Roofing, HVAC, remodeling, fencing"],
          ["May", "Heat starts building, storms continue", "Get ready for summer, roof and gutter checks", "HVAC, roofing, pools"],
          ["Jun – Aug", "Peak heat, hurricane season starts June 1", "New A/C systems, insulation, storm prep", "HVAC, insulation, roofing, electrical"],
          ["Sep – Oct", "Hurricane season peak months, still hot", "Storm repair, roof replacement, generators", "Roofing, electrical, tree, fencing"],
          ["Nov – Dec", "Hurricane season ends Nov 30, holidays", "Get it done before family visits, heaters, freeze prep", "Remodeling, painting, plumbing, HVAC"],
        ],
        note: "This is a general guide. Watch the real forecast and your own call volume.",
      },
      {
        kind: "text",
        id: "hurricane-season",
        title: "How should contractors market during hurricane season?",
        paragraphs: [
          "The National Oceanic and Atmospheric Administration (NOAA) says Atlantic hurricane season runs from June 1 to November 30.",
          "Houston has seen big storms. Hurricane Harvey in 2017 caused huge flooding. Hurricane Beryl in July 2024 left many homes without power.",
          "Before a storm, run helpful ads. How to check your roof. How to secure your fence. When to call a pro.",
          "After a storm, check on safety first. Then turn on repair ads in the areas that were hit. Be honest and calm. Do not use fear to sell.",
        ],
        links: [
          {
            context: "Track storms at the",
            label: "NOAA National Hurricane Center",
            href: "https://www.nhc.noaa.gov/",
          },
          {
            context: "Roofers, see",
            label: "Facebook ads for roofers in Houston",
            href: "/guides/facebook-ads-for-roofers-houston",
            suffix: "for storm season ad ideas.",
          },
        ],
      },
      {
        kind: "text",
        id: "freeze",
        title: "How should contractors market before a Houston freeze?",
        paragraphs: [
          "Houston freezes are rare. But they hit hard.",
          "Many Texans remember the February 2021 winter storm. Power went out across the state. Pipes burst in many homes.",
          "When a cold front is coming, run quick tip videos. Wrap your pipes. Drip your faucets. Know where your water shutoff is.",
          "This helps people for free. And when a pipe does break, they call the plumber who helped them.",
        ],
        links: [
          {
            context: "Plumbers, read",
            label: "Facebook ads for plumbers in Houston",
            href: "/guides/facebook-ads-for-plumbers-houston",
          },
        ],
      },
      {
        kind: "checklist",
        id: "storm-kit",
        title: "How do you get your marketing storm-ready?",
        items: [
          { title: "Film before you need it", detail: "Record tip videos and job videos in calm weeks." },
          { title: "Build ads and pause them", detail: "Have storm and freeze ads ready to turn on fast." },
          { title: "Pick your areas", detail: "Know which parts of Houston you can reach quickly after a storm." },
          { title: "Plan your follow-up", detail: "Calls spike after storms. Know who will text and call every lead." },
          { title: "Know your crew limits", detail: "Do not book more than you can do well. A bad job hurts more than a missed one." },
          { title: "Keep it honest", detail: "No scare tactics. No fake damage photos. Show real work only." },
        ],
      },
      {
        kind: "text",
        id: "local-areas",
        title: "Does it matter which part of Houston you target?",
        paragraphs: [
          "Yes. Houston is huge. Drive time eats your day.",
          "Pick the areas where you want to work. Maybe Katy, Cypress, Sugar Land, Pearland, The Woodlands, or inside the Loop.",
          "Show homes and streets that look like theirs in your videos. Mention the area by name. Local feels trusted.",
          "With the Houston Growth Engine, we film you on real Houston jobs, run ads in the areas you choose, and our team books the estimates.",
        ],
        links: [
          {
            context: "See",
            label: "the Houston Growth Engine",
            href: "/houston-growth-engine",
            suffix: "for how it works.",
          },
        ],
      },
      {
        kind: "faq",
        id: "faqs",
        title: "FAQs",
        items: [
          {
            q: "When is hurricane season in Houston?",
            a: "NOAA says Atlantic hurricane season runs June 1 to November 30.",
          },
          {
            q: "Should I stop ads in slow months?",
            a: "It is often better to keep a small budget running. People remember who they saw before they needed help.",
          },
          {
            q: "When should HVAC companies advertise in Houston?",
            a: "All year. Push tune-ups in spring, new systems in the summer heat, and heaters before cold snaps.",
          },
          {
            q: "Is it OK to advertise right after a storm?",
            a: "Yes, if you are helpful and honest. Check on safety first. Only take work you can do well.",
          },
          {
            q: "When should I film my ads?",
            a: "Before the busy season. Film in calm weeks so you are ready when calls spike.",
          },
        ],
      },
      {
        kind: "related",
        id: "related",
        title: "Related guides",
        items: [
          { href: "/guides/facebook-ads-for-hvac-companies-houston", label: "Facebook Ads for HVAC Companies in Houston", tag: "Ads" },
          { href: "/guides/facebook-ads-for-roofers-houston", label: "How Much Do Facebook Ads Cost for Roofers in Houston?", tag: "Ads" },
          { href: "/guides/on-the-job-video-for-contractors", label: "What to Film: On-the-Job Video for Contractors", tag: "Video" },
          { href: "/houston-growth-engine", label: "The Houston Growth Engine", tag: "Service" },
        ],
      },
    ],
  },
];

export const pillarGuides = guides.filter((guide) => guide.type === "pillar");
export const supportGuides = guides.filter((guide) => guide.type === "support");
export const featuredGuide = pillarGuides[0];
export const allGuides = guides;

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function getGuideMetadata(guide: Guide): Metadata {
  return buildPageMetadata({
    title: guide.metaTitle,
    description: guide.metaDescription,
    path: `/guides/${guide.slug}`,
    type: "article",
  });
}
