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
      href: "/#pricing",
      label: "See pricing",
    },
    ctaBottom: {
      title: "Ready for a website that actually works?",
      description: "We build sites that turn visitors into customers. No lock-in — cancel if it's not paying for itself.",
      href: "/#pricing",
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
            href: "/#features",
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
      href: "/#pricing",
      label: "Start free",
    },
    ctaBottom: {
      title: "Ready for a website that sells for you?",
      description: "No lock-in. Cancel if it's not bringing you customers.",
      href: "/#pricing",
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
      href: "/#pricing",
      label: "Try it risk-free",
    },
    ctaBottom: {
      title: "Ready to stop losing customers?",
      description: "No lock-in. If the website isn't paying for itself, walk away.",
      href: "/#pricing",
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
