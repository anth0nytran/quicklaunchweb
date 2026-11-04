// Content for the Houston Growth Engine page (the flagship offer).
// Copy rules: sell booked jobs and revenue, not lead counts. No guarantee (the
// owner chose not to offer one). No invented dollar values or results; proof
// comes from lib/adResults.ts.

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
    "Shared leads from Angi and Thumbtack, sold to five other contractors",
    "Boosted posts that get likes and no calls",
    "Agencies that report clicks and impressions, not booked jobs",
    "Cheap, small jobs that keep your crew busy but not profitable",
    "Leads that sit for hours because you're on a job",
  ],
  newWay: [
    "Your own leads from your own ads, not shared with anyone",
    "Real video of your work that makes homeowners trust you first",
    "Measured in booked estimates and closed jobs",
    "Aimed at the bigger jobs and the parts of Houston worth your gas",
    "Every lead texted in seconds and called by our team",
  ],

  /** The parts of the Engine. icon = kit icon in /public/home/icons. */
  parts: [
    {
      icon: "video-camera",
      title: "Content that sells before you show up",
      body: "We film you, your crew, and real Houston jobs, then cut it into short videos and ads. Homeowners see your work and your face before they ever call.",
      points: ["On-site filming in Houston", "Short videos for ads and your pages", "Picture ads if you'd rather not be on camera"],
    },
    {
      icon: "target",
      title: "Ads aimed at bigger tickets",
      body: "Facebook and Instagram ads built around the jobs you actually want: replacements over patch jobs, full projects over touch-ups, in the zip codes worth your time.",
      points: ["Homeowners only, in your service area", "Offers built for higher-value jobs", "You own the ad account"],
    },
    {
      icon: "phone-message",
      title: "Instant follow-up",
      body: "Every lead gets a text back in seconds, day or night. Missed calls get answered by text. Leads that go quiet get followed up automatically.",
      points: ["Missed-call text-back", "Instant replies to new leads", "Automatic follow-up sequences"],
    },
    {
      icon: "calendar",
      title: "We qualify and book the estimate",
      body: "Our team calls every lead, checks they own the home, live in your area, have a real project and a real budget, then puts the estimate on your calendar.",
      points: ["Verified homeowner, real budget", "Booked straight onto your calendar", "Or take the leads yourself, your call"],
    },
    {
      icon: "growth",
      title: "Measured in jobs and revenue",
      body: "We judge the Engine by what it puts on your calendar and in your bank account. We cut what doesn't book jobs and put more behind what does.",
      points: ["Weekly ad tuning", "Booked jobs over lead counts", "Sales coaching to close more estimates"],
    },
  ],

  forYou: [
    "You run a Houston home service business and do good work",
    "You can take on more jobs, and want bigger ones",
    "You (or your team) show up to estimates and follow through",
    "You're tired of shared leads and word-of-mouth dry spells",
  ],
  notForYou: [
    "You're looking for the cheapest leads possible",
    "You can't take on more work right now",
    "You don't want to answer the phone or show up to estimates",
    "You're outside the Houston metro",
  ],

  steps: [
    { label: "Day 1", title: "Strategy call", body: "15 minutes. Your trade, your area, the jobs you want more of. We tell you straight if the Engine fits." },
    { label: "Days 2–5", title: "We build it", body: "Videos, ads, lead forms, text-back, and the booking process, all set up for you." },
    { label: "Day 7", title: "The Engine turns on", body: "Ads go live. Leads get texted, called, qualified, and booked." },
    { label: "Every week", title: "We tune it", body: "More money behind what books jobs. Less behind what doesn't." },
  ],
};
