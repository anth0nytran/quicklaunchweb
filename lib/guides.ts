import type { Metadata } from "next";

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
  {
    slug: "subscription-web-design",
    type: "pillar",
    title: "Subscription Web Design",
    description:
      "Subscription web design is a pay monthly web design model that bundles the build, hosting, and ongoing updates into one predictable fee. It is built for local businesses that want a professional site without a large upfront invoice.",
    metaTitle: "Subscription Web Design (Pay Monthly Web Design) | QuickLaunchWeb",
    metaDescription:
      "A complete guide to subscription web design and pay monthly web design: pricing, whats included, who it is for, comparisons, and FAQs.",
    kicker: "Pillar Guide",
    category: "Subscription Web Design",
    updated: "Jan 2026",
    readTime: "12 min read",
    stats: [
      { label: "Typical plan range", value: "$99-$249/mo" },
      { label: "First version live", value: "2-10 business days" },
      { label: "Best for", value: "Local service teams" },
    ],
    heroBullets: [
      "One monthly fee replaces a large upfront build.",
      "Launch fast with the pages that drive leads.",
      "Ongoing edits keep offers current and visible.",
      "Ideal for local businesses that need consistent updates.",
    ],
    jumpLinks: [
      { id: "what-it-is", label: "What it is" },
      { id: "pricing", label: "Pricing" },
      { id: "whats-included", label: "Whats included" },
      { id: "who-its-for", label: "Who its for" },
      { id: "comparison", label: "Comparison" },
      { id: "how-to-decide", label: "How to decide" },
      { id: "faqs", label: "FAQs" },
      { id: "related", label: "Related" },
    ],
    ctaTop: {
      eyebrow: "Ready for predictable pricing?",
      description: "See plans designed for local businesses and launch without a big upfront fee.",
      href: "/#pricing",
      label: "View pricing",
    },
    ctaBottom: {
      title: "Want a pay monthly website that converts?",
      description: "Start with a plan and we will handle the build, hosting, and ongoing updates.",
      href: "/#pricing",
      label: "See plans",
    },
    aside: {
      takeaways: [
        "Subscription web design keeps costs predictable.",
        "Best results come from steady monthly updates.",
        "Local trust signals should show in the first scroll.",
      ],
      benchmarks: [
        "Mobile load time target: under 2 seconds on 4G.",
        "Primary call to action visible above the fold.",
        "Lead form completion target: 4-8 percent.",
        "Local proof shown early: reviews, badges, service areas.",
      ],
      benchmarkNote:
        "These are typical optimization targets for local service sites. Your market and seasonality will shift results.",
      roi: [
        "One closed job can cover several months of a subscription plan.",
        "Fast updates let you capture seasonal demand without delays.",
        "Clear messaging reduces wasted calls and improves lead quality.",
      ],
      roiNote:
        "ROI depends on average job value and close rate, but clarity and speed usually improve conversion.",
    },
    sections: [
      {
        kind: "text",
        id: "what-it-is",
        title: "What is subscription web design?",
        paragraphs: [
          "Subscription web design is a pay monthly web design model where the website build, hosting, and ongoing updates are bundled into one monthly plan. It removes the large upfront fee and keeps your site improving as your business changes.",
          "For local businesses, that predictability matters. You can launch a clean, conversion focused site quickly, then keep it current with seasonal offers, updated services, and fresh proof.",
          "The model works best when you want a partner, not a one time build. You are paying for ongoing access to a team that keeps the site fast, clear, and lead focused.",
        ],
        list: [
          "Monthly fee includes the build, hosting, security, and updates.",
          "The first launch focuses on the pages that convert.",
          "Edits and improvements happen continuously, not once a year.",
        ],
        links: [
          {
            context: "If you want a hands off build with a larger scope, compare it with",
            label: "done for you websites",
            href: "/guides/done-for-you-websites",
            suffix: "to see what changes.",
          },
          {
            context: "If speed is the priority, read",
            label: "website in 48 hours",
            href: "/guides/website-in-48-hours",
            suffix: "to understand a fast launch.",
          },
        ],
      },
      {
        kind: "text",
        id: "pricing",
        title: "Pricing: how pay monthly web design works",
        paragraphs: [
          "Most subscription web design plans for local service businesses land between $99 and $249 per month. The range depends on how many pages you need, how often you update content, and whether copywriting is included.",
          "Some providers include a small one time setup fee for intake, domain connection, or initial copy edits. Others include everything in the monthly fee and focus on a simple cancel anytime plan.",
          "When comparing pricing, look at total cost over 12 months. A $149 per month plan is $1,788 for the year, often less than a $3k to $6k upfront agency build plus hosting and maintenance.",
          "If the plan includes ongoing edits, that value compounds. You are not paying again each time you change a service, add a promotion, or swap photos.",
        ],
      },
      {
        kind: "checklist",
        id: "whats-included",
        title: "Whats included in a subscription plan",
        items: [
          {
            title: "Strategy and structure",
            detail: "Page plan built around your services, service areas, and top questions.",
          },
          {
            title: "Custom design and build",
            detail: "Mobile first layout tailored to your brand and offer.",
          },
          {
            title: "Core pages",
            detail: "Home, Services, About, Contact, plus optional FAQs or service area pages.",
          },
          {
            title: "Hosting, SSL, monitoring",
            detail: "Fast hosting with security and uptime tracking.",
          },
          {
            title: "On page SEO foundation",
            detail: "Titles, headings, and local keyword placement.",
          },
          {
            title: "Analytics and tracking",
            detail: "Form tracking and basic conversion goals.",
          },
          {
            title: "Monthly edits",
            detail: "Text, images, offer updates, and seasonal changes.",
          },
        ],
        note: "Always confirm edit limits and turnaround time before choosing a plan.",
      },
      {
        kind: "text",
        id: "who-its-for",
        title: "Who subscription web design is for",
        paragraphs: [
          "This model fits businesses that want a professional site without a large upfront expense. It is especially helpful if you change pricing, services, or promotions throughout the year.",
          "If you prefer to handle everything yourself and rarely update your site, a DIY builder can be enough. But if your time is valuable, the subscription model removes the maintenance burden.",
        ],
        list: [
          "Local service businesses such as plumbing, HVAC, cleaning, and landscaping.",
          "New or growing companies that want to protect cash flow.",
          "Teams that need ongoing edits without hiring a designer each time.",
          "Owners who want a single point of contact for web changes.",
        ],
        links: [
          {
            context: "For a detailed checklist of plan inclusions, read",
            label: "Whats included in a monthly website plan",
            href: "/guides/monthly-website-plan-whats-included",
            suffix: "before you compare providers.",
          },
          {
            context: "If you are debating monthly versus upfront pricing, see",
            label: "pay monthly web design vs upfront agencies",
            href: "/guides/pay-monthly-web-design-vs-upfront",
            suffix: "for a side by side view.",
          },
        ],
      },
      {
        kind: "table",
        id: "comparison",
        title: "Subscription vs agency vs DIY",
        columns: ["Approach", "Upfront cost", "Monthly cost", "Timeline", "Best for"],
        rows: [
          ["Subscription web design", "$0-$299", "$99-$249", "2-10 days", "Speed, ongoing updates"],
          ["Traditional agency", "$3k-$8k", "$25-$150", "4-10 weeks", "Complex brand projects"],
          ["DIY website builder", "$0-$300", "$15-$40", "1-4 weeks", "Owners with time and simple needs"],
        ],
        note: "Ranges are typical for small business websites and can vary by scope.",
      },
      {
        kind: "text",
        id: "how-to-decide",
        title: "How to decide quickly",
        paragraphs: [
          "Pick the model that matches how often your website needs to change. If you want steady improvements and fast edits, subscription web design is usually the fastest path to consistent leads.",
          "If you need a large brand project or advanced custom features, an agency build can make sense. If you enjoy DIY and have time, a builder can get you online, but it requires more effort to convert well.",
        ],
        list: [
          "Do you want a predictable monthly cost instead of a large upfront invoice?",
          "Do you need edits every month, or only a few times per year?",
          "Do you want the site live in days instead of weeks?",
        ],
        links: [
          {
            context: "If a fast launch is the priority, read",
            label: "website in 48 hours",
            href: "/guides/website-in-48-hours",
            suffix: "for a realistic timeline.",
          },
        ],
      },
      {
        kind: "faq",
        id: "faqs",
        title: "FAQs",
        items: [
          {
            q: "Is pay monthly web design the same as a website builder?",
            a: "No. A subscription plan is built and maintained by a team, while a builder is DIY. The result is typically more polished and conversion focused.",
          },
          {
            q: "Can I cancel a subscription plan?",
            a: "Most plans allow cancellation with notice, but always confirm the policy and any minimum term.",
          },
          {
            q: "Do I own the website?",
            a: "You generally own the content and brand assets. The provider may host the site, so ask about exporting or transferring if you ever leave.",
          },
          {
            q: "How many updates are included each month?",
            a: "Plans vary. Many include a set number of edits or a monthly update window. Ask about turnaround time and limits.",
          },
          {
            q: "Does subscription web design include SEO?",
            a: "Most plans include on page SEO basics. Ongoing SEO or content marketing is usually separate.",
          },
          {
            q: "How fast can a site launch?",
            a: "With content ready, many subscription sites launch in a week or less. If you need a faster sprint, see the 48 hour guide.",
          },
        ],
      },
      {
        kind: "related",
        id: "related",
        title: "Related posts",
        items: [
          {
            href: "/guides/monthly-website-plan-whats-included",
            label: "Whats Included in a Monthly Website Plan?",
            tag: "Support",
          },
          {
            href: "/guides/pay-monthly-web-design-vs-upfront",
            label: "Pay Monthly Web Design vs Upfront Agencies",
            tag: "Support",
          },
          {
            href: "/guides/done-for-you-websites",
            label: "Done for You Websites",
            tag: "Pillar",
          },
          {
            href: "/guides/website-in-48-hours",
            label: "Website in 48 Hours",
            tag: "Pillar",
          },
        ],
      },
    ],
  },
  {
    slug: "done-for-you-websites",
    type: "pillar",
    title: "Done for You Websites",
    description:
      "Done for you websites are full service builds where a team handles strategy, copy, design, and launch for you. You provide the business details and approvals, and the site is delivered ready to generate leads.",
    metaTitle: "Done for You Websites | QuickLaunchWeb",
    metaDescription:
      "Learn what done for you websites include, pricing, who they are for, and how they compare to agencies and DIY builders.",
    kicker: "Pillar Guide",
    category: "Done for You Websites",
    updated: "Jan 2026",
    readTime: "11 min read",
    stats: [
      { label: "Typical build range", value: "$1.5k-$6k" },
      { label: "Launch window", value: "2-4 weeks" },
      { label: "Best for", value: "Busy owners" },
    ],
    heroBullets: [
      "Strategy, copy, design, and launch handled for you.",
      "Ideal for owners who want results without DIY.",
      "Clear pages that build trust and drive calls.",
      "Built to convert, not just look good.",
    ],
    jumpLinks: [
      { id: "what-it-is", label: "What it is" },
      { id: "pricing", label: "Pricing" },
      { id: "whats-included", label: "Whats included" },
      { id: "who-its-for", label: "Who its for" },
      { id: "comparison", label: "Comparison" },
      { id: "how-to-decide", label: "How to decide" },
      { id: "faqs", label: "FAQs" },
      { id: "related", label: "Related" },
    ],
    ctaTop: {
      eyebrow: "Want it handled for you?",
      description: "We build, launch, and update your site so you can focus on clients.",
      href: "/#pricing",
      label: "View pricing",
    },
    ctaBottom: {
      title: "Ready for a done for you website?",
      description: "See plans that include strategy, copy, design, and launch.",
      href: "/#pricing",
      label: "See plans",
    },
    aside: {
      takeaways: [
        "Done for you websites remove the DIY workload.",
        "Best results come from clear messaging and proof.",
        "A tight page structure improves lead quality.",
      ],
      benchmarks: [
        "Above the fold call to action with service area.",
        "Service pages focused on 1-2 core offers.",
        "Contact options visible within the first scroll.",
        "Mobile page speed target: under 2 seconds.",
      ],
      benchmarkNote:
        "These benchmarks are typical targets for local service sites and should be adjusted for your market.",
      roi: [
        "A single closed job can offset a large share of the build cost.",
        "Clear offers reduce price shoppers and increase qualified calls.",
        "Professional design builds trust fast in competitive markets.",
      ],
      roiNote: "ROI depends on job value and close rate, but clarity usually improves conversion.",
    },
    sections: [
      {
        kind: "text",
        id: "what-it-is",
        title: "What are done for you websites?",
        paragraphs: [
          "Done for you websites are fully managed builds where a team handles strategy, copy, design, development, and launch. You share your business details, approve the direction, and the rest is handled.",
          "This model is built for owners who want professional quality without spending nights learning a builder. It puts your time back into serving customers while the site is built to convert.",
          "The best done for you providers keep the process simple with a clear intake, fast drafts, and focused pages.",
        ],
        list: [
          "You get a clear process with expert guidance.",
          "Copy and design are built around your offers.",
          "Launch includes basic SEO and lead tracking.",
        ],
        links: [
          {
            context: "If you prefer a lower upfront cost, compare it with",
            label: "subscription web design",
            href: "/guides/subscription-web-design",
            suffix: "to see the pay monthly option.",
          },
          {
            context: "If you need a fast launch, read",
            label: "website in 48 hours",
            href: "/guides/website-in-48-hours",
            suffix: "for a sprint timeline.",
          },
        ],
      },
      {
        kind: "text",
        id: "pricing",
        title: "Pricing: what done for you websites cost",
        paragraphs: [
          "Done for you website pricing typically ranges from $1,500 to $6,000 for small business sites. The range depends on page count, copy depth, custom branding, and integrations.",
          "Some providers offer a pay monthly option that spreads the cost. Others charge upfront with optional monthly maintenance for edits and hosting.",
          "When comparing pricing, look beyond the number. Clarify what is included in the first version, how many revisions you get, and what ongoing updates will cost.",
          "A well built site can pay for itself quickly if it improves your close rate or increases call volume.",
        ],
      },
      {
        kind: "checklist",
        id: "whats-included",
        title: "Whats included in a done for you build",
        items: [
          {
            title: "Discovery and messaging",
            detail: "Clear positioning for your services and service area.",
          },
          {
            title: "Copywriting or copy guidance",
            detail: "Benefit led copy that answers buyer questions.",
          },
          {
            title: "Custom design and layout",
            detail: "A clean, trustworthy look that fits your brand.",
          },
          {
            title: "Mobile first build",
            detail: "Fast pages that load and read well on phones.",
          },
          {
            title: "Lead capture setup",
            detail: "Forms, call buttons, and tracking.",
          },
          {
            title: "Local SEO foundation",
            detail: "Titles, headings, and structured service pages.",
          },
          {
            title: "Launch and QA",
            detail: "Testing, domain setup, and go live support.",
          },
        ],
        note: "Ask about revision rounds, turn times, and what ongoing edits cost.",
      },
      {
        kind: "text",
        id: "who-its-for",
        title: "Who done for you websites are for",
        paragraphs: [
          "Done for you websites are ideal for business owners who want professional results without the DIY workload. If your team is already busy, outsourcing the build saves weeks of time.",
          "It is also a strong fit when you need your site to position you as premium, explain complex services, or win higher value jobs.",
        ],
        list: [
          "Local service businesses that compete on trust and reviews.",
          "Owners who value speed and do not want to learn a builder.",
          "Teams that need copywriting and structure guidance.",
          "Businesses rebranding or expanding into new services.",
        ],
        links: [
          {
            context: "If you are debating DIY, read",
            label: "Wix vs hiring someone",
            href: "/guides/wix-vs-hiring-someone-to-build-website",
            suffix: "for a simple comparison.",
          },
          {
            context: "To nail the page structure, see",
            label: "what pages a business website needs to convert",
            href: "/guides/what-pages-business-website-needs-to-convert",
            suffix: "before you build.",
          },
        ],
      },
      {
        kind: "table",
        id: "comparison",
        title: "Done for you vs agency vs DIY",
        columns: ["Approach", "Upfront cost", "Ongoing cost", "Timeline", "Best for"],
        rows: [
          ["Done for you website", "$1.5k-$6k", "$0-$150", "2-4 weeks", "Fast, guided builds"],
          ["Traditional agency", "$5k-$15k", "$50-$250", "6-12 weeks", "Large custom projects"],
          ["DIY website builder", "$0-$300", "$15-$40", "1-4 weeks", "Owners with time and simple needs"],
        ],
        note: "Ranges are typical for small business websites and can vary by scope.",
      },
      {
        kind: "text",
        id: "how-to-decide",
        title: "How to decide quickly",
        paragraphs: [
          "If you want professional results without a long agency timeline, done for you websites are a strong middle ground. You get expert help without the heavy process or cost of a large agency.",
          "If you need a large brand overhaul or complex integrations, an agency may be worth the higher budget. If you want to keep costs minimal and have time to learn, a builder can work for a basic site.",
        ],
        list: [
          "Do you want guidance on copy and page structure?",
          "Will the time saved be worth the higher upfront cost?",
          "Do you need the site live in weeks instead of months?",
        ],
      },
      {
        kind: "faq",
        id: "faqs",
        title: "FAQs",
        items: [
          {
            q: "How long does a done for you website take?",
            a: "Most projects launch in two to four weeks, depending on content readiness and revision rounds.",
          },
          {
            q: "Do I need to write the copy?",
            a: "Many providers include copywriting or provide guided prompts. You should still review for accuracy.",
          },
          {
            q: "Can I update the site later?",
            a: "Yes. Ask whether updates are included or billed monthly, and how fast edits are handled.",
          },
          {
            q: "Is SEO included?",
            a: "Most builds include on page SEO basics. Ongoing SEO is typically a separate service.",
          },
          {
            q: "How many pages should I expect?",
            a: "Most small business builds include a focused set of pages such as Home, Services, About, and Contact.",
          },
          {
            q: "Will it work well on mobile?",
            a: "A professional build should be mobile first by default. Ask for mobile previews early.",
          },
        ],
      },
      {
        kind: "related",
        id: "related",
        title: "Related posts",
        items: [
          {
            href: "/guides/wix-vs-hiring-someone-to-build-website",
            label: "Wix vs Hiring Someone",
            tag: "Support",
          },
          {
            href: "/guides/what-pages-business-website-needs-to-convert",
            label: "What Pages Does a Business Website Need to Convert?",
            tag: "Support",
          },
          {
            href: "/guides/subscription-web-design",
            label: "Subscription Web Design",
            tag: "Pillar",
          },
          {
            href: "/guides/website-in-48-hours",
            label: "Website in 48 Hours",
            tag: "Pillar",
          },
        ],
      },
    ],
  },
  {
    slug: "website-in-48-hours",
    type: "pillar",
    title: "Website in 48 Hours",
    description:
      "A website in 48 hours is a focused, conversion first site built from a proven framework and launched fast. It works best when the scope is tight and the content is ready.",
    metaTitle: "Website in 48 Hours (Fast Website Design) | QuickLaunchWeb",
    metaDescription:
      "Learn how a website in 48 hours works, pricing, whats included, who it is for, and how it compares to longer builds.",
    kicker: "Pillar Guide",
    category: "Fast Website Design",
    updated: "Jan 2026",
    readTime: "11 min read",
    stats: [
      { label: "Typical sprint range", value: "$299-$999" },
      { label: "Launch window", value: "48 hours" },
      { label: "Best for", value: "Urgent launches" },
    ],
    heroBullets: [
      "A focused site built for speed and conversion.",
      "Works best when content is ready on day one.",
      "Great for launches, promos, and new service offers.",
      "Scope is tight so you can move fast.",
    ],
    jumpLinks: [
      { id: "what-it-is", label: "What it is" },
      { id: "pricing", label: "Pricing" },
      { id: "whats-included", label: "Whats included" },
      { id: "who-its-for", label: "Who its for" },
      { id: "comparison", label: "Comparison" },
      { id: "timeline", label: "48 hour timeline" },
      { id: "faqs", label: "FAQs" },
      { id: "related", label: "Related" },
    ],
    ctaTop: {
      eyebrow: "Need it live fast?",
      description: "Launch a focused site in 48 hours with a clear plan and content ready.",
      href: "/#pricing",
      label: "View pricing",
    },
    ctaBottom: {
      title: "Want a fast website that still converts?",
      description: "We build fast without sacrificing clarity or lead flow.",
      href: "/#pricing",
      label: "See plans",
    },
    aside: {
      takeaways: [
        "Fast launches require tight scope and fast approvals.",
        "A 48 hour site is focused, not feature heavy.",
        "Conversion wins come from clarity and trust signals.",
      ],
      benchmarks: [
        "First draft approved within 24 hours.",
        "One clear offer and call to action on every page.",
        "Mobile load time target: under 2 seconds.",
        "Contact options visible within the first scroll.",
      ],
      benchmarkNote:
        "These are typical targets for fast launches. Speed depends on content readiness and approvals.",
      roi: [
        "Launching even a week earlier can capture time sensitive demand.",
        "A focused site can start paying back the build within the first month.",
        "Speed plus clarity reduces missed leads during busy seasons.",
      ],
      roiNote: "ROI depends on demand timing and job value, but early visibility often pays off.",
    },
    sections: [
      {
        kind: "text",
        id: "what-it-is",
        title: "What is a website in 48 hours?",
        paragraphs: [
          "A website in 48 hours is a focused, conversion first site built from a proven framework and launched fast. It is not a 20 page custom site or a large portal with complex features.",
          "The goal is speed and clarity. You launch a simple, professional site that highlights your core services, establishes trust, and captures leads quickly.",
          "This approach works best when you keep the scope tight and provide content early so the build can move fast.",
        ],
        list: [
          "Focused pages that drive calls and form fills.",
          "Templates and systems that speed up production.",
          "A clear launch checklist so nothing stalls.",
        ],
        links: [
          {
            context: "If you want a deeper build with ongoing updates, compare it with",
            label: "subscription web design",
            href: "/guides/subscription-web-design",
            suffix: "to see the long term option.",
          },
          {
            context: "If you want a larger custom project, see",
            label: "done for you websites",
            href: "/guides/done-for-you-websites",
            suffix: "for a broader scope.",
          },
        ],
      },
      {
        kind: "text",
        id: "pricing",
        title: "Pricing for fast website design",
        paragraphs: [
          "Fast website design pricing often ranges from $299 to $999 for a focused launch. Some teams include it as part of a monthly subscription plan instead of charging a separate rush fee.",
          "The main pricing factor is scope. A one to three page site launches fast, while larger sites push the timeline beyond 48 hours.",
          "You can save time and cost by preparing content early, limiting revision rounds, and keeping the first launch focused on a single offer.",
        ],
      },
      {
        kind: "checklist",
        id: "whats-included",
        title: "Whats included in a 48 hour launch",
        items: [
          {
            title: "Fast intake and structure",
            detail: "A short kickoff to define services, location, and goals.",
          },
          {
            title: "Focused page set",
            detail: "Home, Services, and Contact, plus a simple About if needed.",
          },
          {
            title: "Copy guidance",
            detail: "Clear messaging and calls to action for conversions.",
          },
          {
            title: "Mobile first build",
            detail: "Fast loading pages that read well on phones.",
          },
          {
            title: "Lead capture setup",
            detail: "Form, call buttons, and tracking.",
          },
          {
            title: "Basic SEO setup",
            detail: "Titles, headings, and local service keywords.",
          },
        ],
        note: "A 48 hour launch is about speed and clarity, not complex features.",
      },
      {
        kind: "text",
        id: "who-its-for",
        title: "Who a 48 hour website is for",
        paragraphs: [
          "This option is best when you need to be live quickly. New businesses, seasonal service spikes, and urgent promotions are the most common reasons to choose a 48 hour build.",
          "If you want a large custom brand, complex integrations, or a high page count, a longer timeline is a better fit.",
        ],
        list: [
          "New businesses that need a professional presence immediately.",
          "Seasonal services preparing for a short demand window.",
          "Businesses running a new promotion or service launch.",
          "Owners who can deliver content and approvals quickly.",
        ],
      },
      {
        kind: "table",
        id: "comparison",
        title: "48 hours vs standard build vs DIY",
        columns: ["Approach", "Timeline", "Scope", "Cost range", "Best for"],
        rows: [
          ["Website in 48 hours", "2 days", "1-3 pages", "$299-$999", "Urgent launches"],
          ["Standard build", "2-6 weeks", "5-10 pages", "$1.5k-$6k", "Broader scope"],
          ["DIY builder", "1-4 weeks", "Varies", "$0-$300", "Owners with time"],
        ],
        note: "Faster timelines require tight scope and fast approvals.",
      },
      {
        kind: "checklist",
        id: "timeline",
        title: "The 48 hour timeline",
        items: [
          {
            title: "Hour 0-6: Intake and content",
            detail: "Confirm services, service area, pricing ranges, and proof.",
          },
          {
            title: "Hour 6-24: Layout and copy draft",
            detail: "Build the page structure and approve the core messaging.",
          },
          {
            title: "Hour 24-36: Build and polish",
            detail: "Design, imagery, and mobile refinement.",
          },
          {
            title: "Hour 36-48: QA and launch",
            detail: "Test forms, connect domain, and go live.",
          },
        ],
        note: "Fast launches depend on immediate feedback and clear approvals.",
      },
      {
        kind: "faq",
        id: "faqs",
        title: "FAQs",
        items: [
          {
            q: "Can a real business website be built in 48 hours?",
            a: "Yes, if scope is tight and content is ready. The goal is a focused lead generation site, not a complex platform.",
          },
          {
            q: "What if I do not have content ready?",
            a: "Delays in content will push the timeline. Gather services, photos, and offers before starting.",
          },
          {
            q: "Will a fast build still look professional?",
            a: "Yes. Using proven layouts and clear copy keeps the site polished and conversion focused.",
          },
          {
            q: "Can I add more pages later?",
            a: "Absolutely. Many fast launches are expanded after the initial site is live.",
          },
          {
            q: "Is SEO included?",
            a: "Basic on page SEO is usually included. Ongoing SEO is a separate effort.",
          },
          {
            q: "How do I prepare for a 48 hour build?",
            a: "Use the fast launch checklist and confirm you can review drafts quickly.",
          },
        ],
      },
      {
        kind: "related",
        id: "related",
        title: "Related posts",
        items: [
          {
            href: "/guides/can-a-website-really-be-built-in-48-hours",
            label: "Can a Website Really Be Built in 48 Hours?",
            tag: "Support",
          },
          {
            href: "/guides/launch-website-fast-checklist",
            label: "Launch a Website Fast: The Exact Checklist You Need",
            tag: "Support",
          },
          {
            href: "/guides/subscription-web-design",
            label: "Subscription Web Design",
            tag: "Pillar",
          },
          {
            href: "/guides/done-for-you-websites",
            label: "Done for You Websites",
            tag: "Pillar",
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
    category: "Subscription Web Design",
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
      href: "/guides/subscription-web-design",
      label: "Read: Subscription Web Design",
    },
    sections: [
      {
        kind: "checklist",
        id: "quick-breakdown",
        title: "Quick breakdown",
        items: [
          {
            title: "Initial website build",
            detail: "A focused site based on your services and service area.",
          },
          {
            title: "Hosting and SSL",
            detail: "Secure hosting included in the monthly fee.",
          },
          {
            title: "Ongoing updates",
            detail: "A set number of edits each month for offers and content.",
          },
          {
            title: "Mobile first design",
            detail: "Pages built to load fast and read well on phones.",
          },
          {
            title: "Basic SEO setup",
            detail: "Titles, headings, and local keyword placement.",
          },
        ],
        note: "Always confirm what counts as an edit and how fast changes are handled.",
      },
      {
        kind: "text",
        id: "extra",
        title: "What is usually extra",
        paragraphs: [
          "Some services are commonly outside the base plan. Knowing this helps you avoid surprises and compare providers accurately.",
        ],
        list: [
          "Advanced SEO or ongoing content marketing.",
          "Ecommerce, payments, or booking integrations.",
          "Large photo or video production.",
          "Major redesigns beyond monthly edits.",
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
          ["Copywriting support", "Sometimes", "Sometimes"],
          ["Advanced SEO", "Sometimes", "Often"],
          ["Custom integrations", "Sometimes", "Often"],
        ],
      },
      {
        kind: "text",
        id: "compare-plans",
        title: "How to compare plans quickly",
        paragraphs: [
          "Compare plans by the parts that affect your day to day work: how many pages you get, how fast edits are handled, and whether analytics are included.",
        ],
        list: [
          "Ask how many pages are included and how fast updates are handled.",
          "Confirm hosting, SSL, and analytics are part of the plan.",
          "Look for a simple cancellation policy with no long term lock in.",
        ],
        links: [
          {
            context: "If you want the full model breakdown, start with",
            label: "subscription web design",
            href: "/guides/subscription-web-design",
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
            a: "Yes, most plans include a set number of content edits per month. Always confirm the limits.",
          },
          {
            q: "Is hosting included?",
            a: "Quality plans include hosting and SSL in the monthly fee. If not, ask for the full monthly cost.",
          },
          {
            q: "Can I add pages later?",
            a: "Usually yes, but it might require a plan upgrade or a one time add on.",
          },
          {
            q: "Do plans include SEO?",
            a: "Most include basic on page SEO. Ongoing SEO work is typically separate.",
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
    category: "Subscription Web Design",
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
      href: "/guides/subscription-web-design",
      label: "Read: Subscription Web Design",
    },
    sections: [
      {
        kind: "table",
        id: "comparison",
        title: "Pay monthly vs upfront agencies",
        columns: ["Factor", "Pay monthly", "Upfront agency"],
        rows: [
          ["Upfront cost", "Low or none", "High, $3k-$8k+"],
          ["Ongoing updates", "Included", "Extra or separate retainer"],
          ["Launch speed", "Fast, 1-2 weeks", "Slower, 4-10 weeks"],
          ["Best for", "Local services, steady updates", "Large custom projects"],
        ],
      },
      {
        kind: "checklist",
        id: "monthly-better",
        title: "When pay monthly is better",
        items: [
          { title: "You want predictable cash flow", detail: "Avoid a large upfront build fee." },
          { title: "You change offers often", detail: "Monthly updates keep pages current." },
          { title: "You need to launch fast", detail: "Smaller scope speeds delivery." },
        ],
      },
      {
        kind: "checklist",
        id: "upfront-better",
        title: "When upfront agencies are better",
        items: [
          { title: "You need a complex custom build", detail: "Large sites and integrations." },
          { title: "Brand overhaul is the priority", detail: "Full rebrand and design system." },
          { title: "You want full ownership day one", detail: "No monthly provider lock in." },
        ],
      },
      {
        kind: "text",
        id: "decision-filter",
        title: "A quick decision filter",
        paragraphs: [
          "Decide based on how often the site needs to change. If you update frequently or want a partner for ongoing optimization, pay monthly plans usually win.",
        ],
        list: [
          "Add up your 12 month cost for each option and compare.",
          "Ask about update turnaround times and revision limits.",
          "Choose the model that fits your cash flow today.",
        ],
        links: [
          {
            context: "Start with the full model breakdown in",
            label: "subscription web design",
            href: "/guides/subscription-web-design",
            suffix: "before choosing.",
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
            a: "Not always. Over 12 months, monthly plans can be less than a large upfront build plus maintenance.",
          },
          {
            q: "Do upfront agencies include hosting?",
            a: "Some do, but many charge hosting and maintenance separately. Always ask for the full monthly cost.",
          },
          {
            q: "Can I switch models later?",
            a: "Yes. You can start monthly and move to a larger build once revenue supports it.",
          },
          {
            q: "Which model launches faster?",
            a: "Monthly plans are usually faster because scope is tighter and the process is streamlined.",
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
    category: "Done for You Websites",
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
      href: "/guides/done-for-you-websites",
      label: "Read: Done for You Websites",
    },
    sections: [
      {
        kind: "table",
        id: "comparison",
        title: "Wix vs hiring someone",
        columns: ["Factor", "Wix (DIY)", "Hire someone"],
        rows: [
          ["Upfront cost", "Low", "Higher"],
          ["Time required", "High", "Low"],
          ["Design quality", "Depends on your skill", "Professional"],
          ["Conversion focus", "Basic", "Optimized"],
          ["Ongoing updates", "DIY", "Handled for you"],
        ],
      },
      {
        kind: "checklist",
        id: "wix",
        title: "When Wix makes sense",
        items: [
          { title: "You have time to build", detail: "You can spend hours on layout and copy." },
          { title: "Budget is very tight", detail: "You need the lowest possible cost today." },
          { title: "Simple needs", detail: "A basic site is enough for now." },
        ],
      },
      {
        kind: "checklist",
        id: "hire",
        title: "When hiring someone is better",
        items: [
          { title: "Leads matter", detail: "You want better conversion and trust." },
          { title: "You are busy", detail: "Your time is worth more than the cost." },
          { title: "You need a polished look", detail: "Professional design improves credibility." },
        ],
      },
      {
        kind: "text",
        id: "decision",
        title: "A quick way to decide",
        paragraphs: [
          "If the website is a core sales tool, hiring someone usually pays off. A professional build can improve trust, shorten the sales cycle, and increase qualified calls.",
        ],
        list: [
          "Estimate what one extra job is worth and compare it to the build cost.",
          "Be honest about how much time you can spend on DIY.",
          "Choose the option that gets you live and converting faster.",
        ],
        links: [
          {
            context: "For a full service option, read",
            label: "done for you websites",
            href: "/guides/done-for-you-websites",
            suffix: "to see what is included.",
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
            a: "It can be if you have time and your needs are simple. Conversion focused design usually requires more expertise.",
          },
          {
            q: "How much time does Wix take?",
            a: "Most owners spend several hours to days learning the builder, writing copy, and refining the layout.",
          },
          {
            q: "Will hiring someone improve SEO?",
            a: "Professionals usually include basic SEO setup and better structure, which helps performance.",
          },
          {
            q: "Can I start on Wix and hire later?",
            a: "Yes, but many businesses end up rebuilding once they want a more professional presence.",
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
    category: "Done for You Websites",
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
      href: "/guides/done-for-you-websites",
      label: "Read: Done for You Websites",
    },
    sections: [
      {
        kind: "checklist",
        id: "essential",
        title: "Essential pages that convert",
        items: [
          { title: "Home", detail: "Clear offer, service area, and primary call to action." },
          { title: "Services", detail: "Break down what you do and who it helps." },
          { title: "Proof", detail: "Reviews, badges, and before and after photos." },
          { title: "About", detail: "Why you, your story, and how you work." },
          { title: "Contact", detail: "Short form, click to call, and quick response promise." },
        ],
      },
      {
        kind: "table",
        id: "table",
        title: "What each page should do",
        columns: ["Page", "Goal", "Key elements"],
        rows: [
          ["Home", "Confirm fit fast", "Headline, service area, CTA, proof"],
          ["Services", "Explain value", "Problems solved, process, pricing range"],
          ["Proof", "Build trust", "Reviews, badges, case examples"],
          ["About", "Humanize", "Story, team, experience"],
          ["Contact", "Capture leads", "Short form, phone, response time"],
        ],
      },
      {
        kind: "text",
        id: "optional",
        title: "Optional pages that help SEO",
        paragraphs: [
          "Once the core pages work, add pages that target specific services or neighborhoods. These pages help search visibility and make it easier for buyers to find you.",
        ],
        list: [
          "Service area pages for nearby cities or neighborhoods.",
          "FAQs that answer pricing and scheduling questions.",
          "Project gallery or case studies with before and after proof.",
        ],
        links: [
          {
            context: "If you are deciding between DIY and pro help, read",
            label: "Wix vs hiring someone",
            href: "/guides/wix-vs-hiring-someone-to-build-website",
            suffix: "before you build.",
          },
          {
            context: "For a full service build, see",
            label: "done for you websites",
            href: "/guides/done-for-you-websites",
            suffix: "and compare options.",
          },
        ],
      },
      {
        kind: "faq",
        id: "faqs",
        title: "FAQs",
        items: [
          {
            q: "Do I need a blog?",
            a: "Not at first. Focus on the core pages and add a blog later if you want content marketing.",
          },
          {
            q: "How many service pages should I create?",
            a: "Start with your main services and expand once the site is converting.",
          },
          {
            q: "Is an About page really needed?",
            a: "Yes. Local buyers want to know who they are hiring and why you are trustworthy.",
          },
          {
            q: "Should I show pricing on the site?",
            a: "A range can help qualify leads, but it depends on your industry and service complexity.",
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
    category: "Website in 48 Hours",
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
      href: "/guides/website-in-48-hours",
      label: "Read: Website in 48 Hours",
    },
    sections: [
      {
        kind: "text",
        id: "reality",
        title: "The reality of a 48 hour build",
        paragraphs: [
          "A 48 hour build is realistic when the scope is limited to the pages that drive leads. It is not realistic for complex sites with ecommerce, large catalogs, or custom integrations.",
        ],
        list: [
          "Fast builds rely on proven layouts and clear content.",
          "Missing photos or approvals will slow everything down.",
          "A simple offer and clear CTA make speed possible.",
        ],
        links: [
          {
            context: "For the full sprint framework, see",
            label: "website in 48 hours",
            href: "/guides/website-in-48-hours",
            suffix: "before you decide.",
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
        kind: "checklist",
        id: "checklist",
        title: "48 hour readiness checklist",
        items: [
          { title: "Service list ready", detail: "Your top services and service area defined." },
          { title: "Proof assets ready", detail: "Reviews, badges, or before and after photos." },
          { title: "Brand basics ready", detail: "Logo, colors, and contact info." },
          { title: "Fast approvals", detail: "You can review drafts within hours." },
        ],
      },
      {
        kind: "table",
        id: "comparison",
        title: "48 hours vs 2 weeks",
        columns: ["Factor", "48 hours", "2 weeks"],
        rows: [
          ["Scope", "1-3 pages", "5-10 pages"],
          ["Content depth", "Focused", "More detailed"],
          ["Custom elements", "Minimal", "Moderate"],
          ["Best for", "Urgent launch", "Broader scope"],
        ],
      },
      {
        kind: "faq",
        id: "faqs",
        title: "FAQs",
        items: [
          {
            q: "What makes a 48 hour build possible?",
            a: "Prepared content, tight scope, and fast approvals are the key ingredients.",
          },
          {
            q: "Will the site still look professional?",
            a: "Yes, if it uses a proven layout and clear copy. Speed does not mean sloppy.",
          },
          {
            q: "Can I expand the site later?",
            a: "Absolutely. Many fast launches are expanded once the first version is live.",
          },
          {
            q: "What usually causes delays?",
            a: "Missing photos, unclear offers, and slow feedback are the biggest blockers.",
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
    category: "Website in 48 Hours",
    updated: "Jan 2026",
    readTime: "7 min read",
    heroBullets: [
      "Prep content and assets before the build starts.",
      "Fast approvals keep the timeline tight.",
      "A focused scope is the secret to speed.",
    ],
    jumpLinks: [
      { id: "checklist", label: "Checklist" },
      { id: "table", label: "Why it matters" },
      { id: "faqs", label: "FAQs" },
    ],
    supportCta: {
      title: "Want us to handle this for you?",
      href: "/guides/website-in-48-hours",
      label: "Read: Website in 48 Hours",
    },
    sections: [
      {
        kind: "checklist",
        id: "checklist",
        title: "Fast launch checklist",
        items: [
          { title: "Core services list", detail: "Your top services and service area." },
          { title: "Offer and CTA", detail: "What you want people to do and why now." },
          { title: "Photos or proof", detail: "Before and after images or reviews." },
          { title: "Brand basics", detail: "Logo, colors, and contact details." },
          { title: "Domain access", detail: "Login to connect the domain fast." },
          { title: "Approval window", detail: "Time blocked to review drafts quickly." },
        ],
      },
      {
        kind: "table",
        id: "table",
        title: "Why each item matters",
        columns: ["Item", "Why it matters"],
        rows: [
          ["Services list", "Shapes the page structure and messaging."],
          ["Offer and CTA", "Drives conversions and reduces confusion."],
          ["Photos and proof", "Builds trust and credibility fast."],
          ["Brand basics", "Keeps design consistent and polished."],
          ["Domain access", "Removes launch delays."],
        ],
      },
      {
        kind: "text",
        id: "ready",
        title: "Make approvals the priority",
        paragraphs: [
          "The biggest speed killer is slow feedback. Set a clear approval window so the team can move from draft to launch without waiting days for edits.",
        ],
        list: [
          "Set a same day review window when possible.",
          "Batch feedback into one response instead of many.",
          "Focus on clarity and accuracy over perfect wording.",
        ],
        links: [
          {
            context: "If you want the full sprint plan, read",
            label: "website in 48 hours",
            href: "/guides/website-in-48-hours",
            suffix: "for the full timeline.",
          },
          {
            context: "For a reality check on speed, see",
            label: "can a website really be built in 48 hours",
            href: "/guides/can-a-website-really-be-built-in-48-hours",
            suffix: "before you start.",
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
            a: "If content is ready and feedback is fast, a focused site can launch in 48 hours.",
          },
          {
            q: "What is the most common delay?",
            a: "Missing content and slow approvals are the biggest causes of delay.",
          },
          {
            q: "Should I wait until everything is perfect?",
            a: "No. Launch the focused version and refine after you start getting leads.",
          },
          {
            q: "Can I expand the site later?",
            a: "Yes. Fast launches are usually the first phase of a larger build.",
          },
        ],
      },
    ],
  },
];

export const pillarGuides = guides.filter((guide) => guide.type === "pillar");
export const supportGuides = guides.filter((guide) => guide.type === "support");
export const featuredGuide = pillarGuides[0];

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function getGuideMetadata(guide: Guide): Metadata {
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      type: "article",
    },
  };
}
