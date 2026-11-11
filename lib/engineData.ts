// Content for the Houston Growth Engine page (the flagship offer).
// Copy rules: 3rd-grade reading level, short plain lines. Sell more calls,
// more booked jobs, more money. Video of the real contractor is HOW. Guarantee:
// booked estimates, NO number on the site (components/brand/guarantee.tsx). No price on the site. No
// invented dollar values or results; proof comes from lib/adResults.ts.
// Say "our team", never "call center". metaTitle/metaDescription/keywords are
// SEO fields: change them together with the SEO work, not here.

export const engine = {
  name: "Houston Growth Engine",
  path: "/houston-growth-engine",
  metaTitle: "Houston Growth Engine: Booked Jobs for Home Service Businesses | QuickLaunchWeb",
  metaDescription:
    "One done-for-you system that turns Facebook and Instagram into booked, higher-ticket jobs for Houston home service businesses. Video, ads, instant follow-up, and our team qualifying and booking your estimates.",
  keywords: [
    "houston home service marketing",
    "contractor marketing houston",
    "booked jobs for contractors",
    "appointment setting for contractors",
    "facebook ads for contractors houston",
    "high ticket leads for contractors",
    "roofing marketing houston",
    "lead generation for home services houston",
  ],

  oldWay: [
    "You pay for leads you share with other contractors",
    "Homeowners can't see your work or your face",
    "Leads come in, but they don't turn into jobs",
    "Boosted posts get likes, not calls",
    "Leads wait for hours while you're on a job",
  ],
  newWay: [
    "Your own ads. Your leads go only to you.",
    "Video of you on the real job",
    "Our team calls every lead and books it",
    "Ads aimed at bigger jobs",
    "Every lead gets a text in 60 seconds",
  ],

  /** The parts of the Engine. icon = kit icon in /public/home/icons. */
  parts: [
    {
      icon: "video-camera",
      title: "Videos of you on the job",
      body: "We come to your real jobs in Houston. We film you and your crew. No actors. No stock photos. Homeowners see your face before they call.",
      points: ["We film on your jobs", "Short videos made for ads", "Picture ads if you hate the camera"],
    },
    {
      icon: "ads",
      title: "Facebook & Instagram ads",
      body: "We show your videos to Houston homeowners. We aim at the jobs you want. Big ones. In the areas worth your gas.",
      points: ["Homeowners near you only", "Aimed at bigger jobs", "You own the ad account"],
    },
    {
      icon: "phone-message",
      title: "Follow-up texts in 60 seconds",
      body: "A lead comes in at 9 at night. They get a text in 60 seconds. Missed a call? They get a text too.",
      points: ["Text back on missed calls", "Every new lead texted fast", "Follow-up if they go quiet"],
    },
    {
      icon: "calendar",
      title: "Our team books your leads",
      body: "Our team calls every lead. Do they own the home? Is the job real? Then we book it on your calendar.",
      points: ["Real homeowners only", "Booked on your calendar", "Or take the calls yourself"],
    },
    {
      icon: "growth",
      title: "Every Monday, you see the numbers",
      body: "Calls, booked jobs, and money made. On one page. We cut what doesn't book jobs. We put more on what does.",
      points: ["One-page report every Monday", "We tune ads every week", "Tips to win more bids"],
    },
  ],

  forYou: [
    "You run a Houston home service business",
    "You do good work and want bigger jobs",
    "You can put money into ads each month",
    "You (or your team) show up to every estimate",
  ],
  notForYou: [
    "You want the cheapest leads you can find",
    "You can't take on more work right now",
    "You won't answer the phone",
    "You work outside the Houston area",
  ],

  steps: [
    { label: "Day 1", title: "Free call", body: "We look at your trade and area. We tell you straight if it fits." },
    { label: "Days 2–5", title: "We set it up and film", body: "We film you on a job. We set up ads, texts, and your calendar." },
    { label: "Day 7", title: "Ads go live", body: "Leads come in. We text them. Our team calls and books them." },
    { label: "Every Monday", title: "You see the numbers", body: "Calls, jobs, and money made. More money on what works." },
  ],
};
