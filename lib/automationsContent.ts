// Content for /services/automations. Plain module (no "use client") so the
// server route can build JSON-LD from the same FAQ and offer list the page shows.

export const automationsPath = "/services/automations";
export const automationsMetaTitle =
  "Automation & Custom Software for Houston Home Service Businesses | QuickLaunchWeb";
export const automationsMetaDescription =
  "We start with a diagnosis call on how your business runs, then build a custom automation plan to make or save you money: CRM follow-up, missed-call text back, AI receptionist, and custom software for Houston contractors.";

export const automationsKeywords = [
  "CRM automation for contractors",
  "AI receptionist for contractors",
  "custom software Houston",
  "missed call text back",
  "automation for home service businesses",
  "contractor CRM setup",
  "lead follow up automation",
  "review request automation",
  "custom web development Houston",
  "quoting app for contractors",
];

export type BuildItem = { icon: string; title: string; body: string; bullets: string[] };

export const buildItems: BuildItem[] = [
  {
    icon: "automation",
    title: "CRM & Follow-Up Automation",
    body: "Every lead lands in one place and gets followed up without you chasing it.",
    bullets: [
      "Missed-call text back, so a missed call gets a text in seconds",
      "Lead nurture texts and emails for estimates that go quiet",
      "Automatic review requests after a job is done",
      "A simple pipeline so you can see every lead and where it stands",
    ],
  },
  {
    icon: "phone-message",
    title: "AI Receptionist & Chat",
    body: "Calls, texts, and website chats get answered and booked, even when you're on a roof.",
    bullets: [
      "Answers calls and texts when you can't pick up",
      "Website chat that answers common questions",
      "Asks the right questions and books jobs on your calendar",
      "Hands off to you when a customer needs a real person",
    ],
  },
  {
    icon: "wrench",
    title: "Custom Software & Apps",
    body: "Tools built around how your shop actually works, not the other way around.",
    bullets: [
      "Internal tools for your office and crews",
      "Dashboards that show leads, jobs, and numbers in one view",
      "Quoting and estimating apps",
      "Integrations that connect the software you already use",
    ],
  },
  {
    icon: "website",
    title: "Custom Web Development",
    body: "Custom-built sites and web apps for projects that go beyond a standard website package.",
    bullets: [
      "Custom-built websites with features a template can't handle",
      "Web apps and customer portals",
      "Booking, quote request, and intake flows",
      "Available for home service and other businesses",
    ],
  },
];

export type Faq = { q: string; a: string };

export const automationsFaqs: Faq[] = [
  {
    q: "Do I need to buy new software?",
    a: "Not always. On the diagnosis call we look at what you already use. If your current tools can do the job, we build on them. If something is missing or getting in the way, we'll tell you and explain why before anything gets built.",
  },
  {
    q: "Will this work with my current CRM and phone system?",
    a: "In a lot of cases, yes. Many CRMs, phone systems, calendars, and job management tools can be connected. We check what you use on the diagnosis call and tell you straight what will and won't connect.",
  },
  {
    q: "How long does it take to get set up?",
    a: "It depends on what we build. A missed-call text back or review request flow is a much smaller job than a custom quoting app. Your plan lays out what gets built first and the timeline for each piece.",
  },
  {
    q: "What does it cost?",
    a: "It depends on scope. Every business is different, so we don't use one price for everyone. After the diagnosis call we give you a plan and a quote, and you decide if it makes sense for you.",
  },
  {
    q: "Do you only work with home service businesses?",
    a: "Automations, CRM, and AI receptionist work is built mainly for home service businesses like roofers, painters, electricians, and HVAC companies. Custom web development is also available for other kinds of businesses.",
  },
  {
    q: "What happens on the diagnosis call?",
    a: "We ask how leads come in, how you follow up, how you quote and schedule, and where time or jobs slip through the cracks. From there we put together a custom plan of what to automate first and what it should make or save you.",
  },
  {
    q: "What happens after it's built?",
    a: "We don't hand it off and disappear. We support what we build, fix what needs fixing, and keep improving it as your business changes.",
  },
];
