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
          "Subscription web design is a pay monthly web design model where the website build, hosting, and ongoing updates are bundled into one monthly plan. It removes the large upfront fee and keeps your site improving as your business changes. Instead of paying thousands upfront for a website that may sit unchanged for years, you invest a manageable monthly amount that covers everything from initial design to ongoing maintenance.",
          "For local businesses, that predictability matters. You can launch a clean, conversion focused site quickly, then keep it current with seasonal offers, updated services, and fresh proof. The subscription model treats your website as a living asset that evolves with your business rather than a one time project that slowly becomes outdated.",
          "The model works best when you want a partner, not a one time build. You are paying for ongoing access to a team that keeps the site fast, clear, and lead focused. This relationship means you always have someone to call when you need changes, whether that is updating your phone number or adding an entirely new service page.",
          "Unlike traditional agency builds where you pay once and then pay again for every small change, subscription web design aligns incentives. Your provider wants to keep you happy month after month, which means they are motivated to deliver results and stay responsive to your needs.",
        ],
        list: [
          "Monthly fee includes the build, hosting, security, and updates.",
          "The first launch focuses on the pages that convert.",
          "Edits and improvements happen continuously, not once a year.",
          "No surprise invoices for routine changes or seasonal updates.",
          "Provider handles technical maintenance so you can focus on customers.",
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
          "Most subscription web design plans for local service businesses land between $99 and $249 per month. The range depends on how many pages you need, how often you update content, and whether copywriting is included. Some premium plans with advanced features like booking integrations or ecommerce can run higher, but most local service businesses find what they need in this range.",
          "Some providers include a small one time setup fee for intake, domain connection, or initial copy edits. Others include everything in the monthly fee and focus on a simple cancel anytime plan. When evaluating setup fees, consider whether they include extras like professional photography coordination, logo refinement, or extensive copywriting that would otherwise cost more.",
          "When comparing pricing, look at total cost over 12 months. A $149 per month plan is $1,788 for the year, often less than a $3k to $6k upfront agency build plus hosting and maintenance. Factor in the value of included monthly updates, which would cost $50 to $150 per request with most agencies. If you make just a few changes per month, the subscription model often wins on pure cost.",
          "If the plan includes ongoing edits, that value compounds. You are not paying again each time you change a service, add a promotion, or swap photos. Over three years, a subscription plan with regular updates often costs less than an agency build with paid maintenance, while keeping your site significantly more current and effective.",
          "The hidden cost of upfront builds is stagnation. When every change costs money, businesses stop making changes. With subscription pricing, updates are already paid for, so you actually use them. That ongoing optimization is where the real ROI lives.",
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
            a: "No. A subscription plan is built and maintained by a professional team, while a builder like Wix or Squarespace is completely DIY. With subscription web design, you get a custom designed site that is optimized for conversions, and a team handles all the technical work. The result is typically more polished, loads faster, and converts better because it is built by professionals who understand what drives leads.",
          },
          {
            q: "Can I cancel a subscription plan?",
            a: "Most plans allow cancellation with 30 days notice, but always confirm the specific policy and any minimum commitment term. Some providers require a 3 to 6 month minimum to cover initial build costs, while others offer true month to month flexibility. Read the terms carefully and ask about what happens to your site if you cancel.",
          },
          {
            q: "Do I own the website?",
            a: "You generally own the content, copy, images, and brand assets you provide. The design and code may belong to the provider depending on the agreement. Most reputable providers will export your content if you leave, but the site itself typically cannot be transferred as is. Always ask about data portability and what you walk away with before signing up.",
          },
          {
            q: "How many updates are included each month?",
            a: "Plans vary significantly. Some include unlimited small edits, others include a set number like 2 to 4 requests per month, and some use a time based model like 2 hours of work monthly. Ask about what counts as an edit, turnaround time for changes, and whether unused edits roll over. The best plans are transparent about limits and responsive when you need changes.",
          },
          {
            q: "Does subscription web design include SEO?",
            a: "Most plans include foundational on page SEO such as proper title tags, meta descriptions, heading structure, image alt text, and local keyword placement. This gives you a solid starting point. However, ongoing SEO work like content creation, link building, and local citation management is typically a separate service. Ask what SEO elements are included in your plan.",
          },
          {
            q: "How fast can a site launch?",
            a: "With content ready and quick feedback, many subscription sites launch in one to two weeks. Some providers offer expedited timelines of 48 to 72 hours if scope is tight and you can provide same day approvals. The biggest delays come from waiting on content, photos, and feedback, so prepare those before starting.",
          },
          {
            q: "What if I need more pages than the plan includes?",
            a: "Most providers offer add on pages for a one time fee or a plan upgrade. Common add ons include additional service pages, location pages for multi area businesses, blog setup, or landing pages for specific campaigns. Ask about expansion pricing upfront so you know your options as you grow.",
          },
          {
            q: "Is subscription web design worth it for a small business?",
            a: "For most local service businesses, yes. If your website is a lead generation tool and you want it professionally managed without a large upfront investment, subscription pricing makes sense. The ongoing updates keep your site current, which helps both SEO and conversions. Do the math on your average job value, if one extra lead per month pays for the subscription, the ROI is clear.",
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
          "Done for you websites are fully managed builds where a team handles strategy, copy, design, development, and launch. You share your business details, approve the direction, and the rest is handled. This approach is the opposite of DIY website builders, it puts the work in expert hands so you get professional results without the learning curve.",
          "This model is built for owners who want professional quality without spending nights learning a builder. It puts your time back into serving customers while the site is built to convert. Instead of wrestling with templates, fonts, and hosting settings, you focus on what you do best while someone else builds a site designed to win leads.",
          "The best done for you providers keep the process simple with a clear intake, fast drafts, and focused pages. They guide you through what content is needed, ask the right questions about your business, and translate your answers into pages that build trust and drive action.",
          "What separates a great done for you website from a generic template is the strategy layer. Good providers do not just make your site look nice, they structure it to answer buyer questions, overcome objections, and make the next step obvious. That is the difference between a brochure and a lead generation tool.",
        ],
        list: [
          "You get a clear process with expert guidance at every step.",
          "Copy and design are built around your specific offers and market.",
          "Launch includes basic SEO setup and lead tracking configuration.",
          "Professional quality without the DIY time investment.",
          "Built to convert visitors into calls and form submissions.",
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
          "Done for you website pricing typically ranges from $1,500 to $6,000 for small business sites. The range depends on page count, copy depth, custom branding, and integrations. A simple 5 page site with provided content lands on the lower end, while a 10 to 15 page site with professional copywriting, custom photography coordination, and booking integrations runs higher.",
          "Some providers offer a pay monthly option that spreads the cost. Others charge upfront with optional monthly maintenance for edits and hosting. If cash flow is a concern, look for providers that offer split payments or monthly plans that include the build cost over time.",
          "When comparing pricing, look beyond the number. Clarify what is included in the first version, how many revisions you get, and what ongoing updates will cost. Some quotes include hosting for the first year while others bill it separately. Ask about copywriting, image sourcing, and any integrations you need.",
          "A well built site can pay for itself quickly if it improves your close rate or increases call volume. If your average job is worth $500 and the site helps you close even one extra lead per month, you recover a $3,000 investment in six months. The real cost of a cheap or DIY site is the leads it fails to capture.",
          "Consider the hidden costs of other options. An agency that quotes $3k but charges $100 per edit can get expensive fast. A DIY site that takes you 40 hours is not free if your time is worth $75 per hour. A done for you build often wins when you factor in the full picture.",
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
            a: "Most projects launch in two to four weeks, depending on content readiness and revision rounds. If you have all your content, images, and branding ready at kickoff, some providers can move faster. The timeline usually stretches when waiting for client feedback, content revisions, or third party integrations.",
          },
          {
            q: "Do I need to write the copy?",
            a: "Many providers include copywriting or provide guided questionnaires that pull the right information from you. You should always review for accuracy and make sure the messaging sounds like your business. Even with a copywriter, you will need to provide details about your services, process, and what makes you different.",
          },
          {
            q: "Can I update the site later?",
            a: "Yes. Ask whether updates are included, billed hourly, or covered under a monthly maintenance plan. Some providers offer a set number of free edits per month, while others charge per request. Clarify turnaround times and what happens if you need an urgent change.",
          },
          {
            q: "Is SEO included?",
            a: "Most done for you builds include foundational on page SEO such as title tags, meta descriptions, heading structure, image optimization, and proper internal linking. Ongoing SEO work like content creation, backlink building, and local citations is typically a separate service with different pricing.",
          },
          {
            q: "How many pages should I expect?",
            a: "Most small business builds include a focused set of core pages like Home, Services, About, and Contact. Depending on the package, you might also get individual service pages, a gallery or portfolio page, FAQs, and service area pages. More pages typically means a higher price, so start focused and expand as needed.",
          },
          {
            q: "Will it work well on mobile?",
            a: "A professional done for you build should be mobile first by default. This means pages are designed for phone screens first and then adapted for desktop. Ask for mobile previews during the design phase and test the live site on your own phone before launch.",
          },
          {
            q: "What do I need to provide to get started?",
            a: "At minimum, you should have your logo, brand colors, contact information, and a clear idea of your services. Photos of your work, team, or location help a lot. The more you can provide upfront, the faster and smoother the project will go. Good providers will send you a detailed intake form that covers everything needed.",
          },
          {
            q: "What if I do not like the design?",
            a: "Most providers include revision rounds in their pricing, often 2 to 3 rounds of feedback. Be specific with your feedback, vague comments lead to wasted revisions. If the overall direction is wrong, say so early. Major design overhauls late in the project may incur additional fees.",
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
          "A website in 48 hours is a focused, conversion first site built from a proven framework and launched fast. It is not a 20 page custom site or a large portal with complex features. Instead, it is a streamlined approach that prioritizes getting you online and generating leads as quickly as possible.",
          "The goal is speed and clarity. You launch a simple, professional site that highlights your core services, establishes trust, and captures leads quickly. Every element is chosen for impact, not decoration. The result is a lean site that does one thing well: turn visitors into calls and form submissions.",
          "This approach works best when you keep the scope tight and provide content early so the build can move fast. The 48 hour timeline is achievable when both sides are prepared, you with content and quick approvals, and the builder with proven systems and templates.",
          "Speed does not mean low quality. A well designed 48 hour site uses battle tested layouts that already convert. The builder focuses time on customizing messaging and visuals for your business, not reinventing the wheel on structure and functionality.",
        ],
        list: [
          "Focused pages that drive calls and form fills without distractions.",
          "Proven templates and systems that speed up production dramatically.",
          "A clear launch checklist so nothing stalls the timeline.",
          "Mobile first design that works perfectly on phones.",
          "Professional quality that builds trust immediately.",
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
          "Fast website design pricing often ranges from $299 to $999 for a focused launch. Some teams include it as part of a monthly subscription plan instead of charging a separate rush fee. The exact price depends on page count, whether copywriting is included, and any special integrations you need.",
          "The main pricing factor is scope. A one to three page site launches fast, while larger sites push the timeline beyond 48 hours. If you need five or more pages, a standard timeline usually makes more sense both for quality and for the builder's workflow.",
          "You can save time and cost by preparing content early, limiting revision rounds, and keeping the first launch focused on a single offer. Every back and forth cycle adds hours to the project. If you can approve drafts within a few hours instead of a few days, you protect the 48 hour timeline.",
          "Some providers charge a rush fee on top of their standard pricing, typically 25 to 50 percent more. Others build speed into their process and do not charge extra. Ask upfront so you know what the total will be.",
          "The ROI calculation for a fast launch is simple. If you need to capture seasonal demand, launch a new service, or replace a broken site, every day without a working website is lost opportunity. A few hundred dollars to launch a week earlier can easily pay for itself with one or two new leads.",
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
            a: "Yes, if scope is tight and content is ready. The goal is a focused lead generation site, not a complex platform. Businesses launch 48 hour sites every day for new ventures, seasonal pushes, and urgent replacements. The key is having your content ready and being available for quick approvals throughout the build.",
          },
          {
            q: "What if I do not have content ready?",
            a: "Delays in content will push the timeline. Before you start, gather your core services list, service area, contact information, a few photos, and any reviews or proof you want to display. Missing content is the number one reason 48 hour builds turn into week long projects. Use the fast launch checklist to prepare.",
          },
          {
            q: "Will a fast build still look professional?",
            a: "Yes. Using proven layouts and clear copy keeps the site polished and conversion focused. The speed comes from using templates and systems, not from cutting corners on quality. A good 48 hour site looks just as professional as a site that took weeks, it just has a tighter scope.",
          },
          {
            q: "Can I add more pages later?",
            a: "Absolutely. Many fast launches are intentionally minimal, getting the core site live first and then expanding with additional service pages, galleries, or blog content over time. This approach lets you start generating leads immediately while building out the full site at a normal pace.",
          },
          {
            q: "Is SEO included?",
            a: "Basic on page SEO is usually included, meaning proper title tags, meta descriptions, heading structure, and image alt text. This gives Google what it needs to index your site. Ongoing SEO work like content creation, link building, and local optimization is typically a separate effort.",
          },
          {
            q: "How do I prepare for a 48 hour build?",
            a: "Use the fast launch checklist to gather everything you need: services, service area, contact info, logo, brand colors, photos, and reviews. Clear your schedule to be available for feedback. The more prepared you are at kickoff, the smoother the build will go.",
          },
          {
            q: "What if something goes wrong during the build?",
            a: "Issues happen, but most can be solved quickly with clear communication. Common problems include missing images, unclear service descriptions, or domain access delays. Good providers anticipate these and have backup plans. If something major comes up, the timeline may extend, but a focused scope minimizes risk.",
          },
          {
            q: "Is 48 hours realistic for any business?",
            a: "It is realistic for most local service businesses with straightforward offerings. If you need complex booking systems, ecommerce, member portals, or extensive custom functionality, a longer timeline is better. The 48 hour model works best for businesses that need a professional presence fast, not a complex web application.",
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
            context: "For a full service build, see",
            label: "done for you websites",
            href: "/guides/done-for-you-websites",
            suffix: "and compare options.",
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
    category: "Website in 48 Hours",
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
      href: "/guides/website-in-48-hours",
      label: "Read: Website in 48 Hours",
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
            context: "For the full sprint plan, read",
            label: "website in 48 hours",
            href: "/guides/website-in-48-hours",
            suffix: "to understand the timeline.",
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
            context: "If you want ongoing updates after launch, compare",
            label: "subscription web design",
            href: "/guides/subscription-web-design",
            suffix: "to see how it works.",
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
