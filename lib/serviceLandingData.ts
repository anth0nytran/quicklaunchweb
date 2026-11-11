// Content for the SEO service landing pages (Facebook ads, video). Each page is
// built to rank for one keyword cluster and send traffic into the discovery
// call. FAQs here also feed FAQPage structured data on the route.
//
// Copy rules: same plain voice as the home page. Only claim what we can back
// with lib/adResults.ts or what we actually do.

export type ServiceLanding = {
  slug: string;
  path: string;
  trackerName: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  serviceName: string;
  serviceType: string;
  eyebrow: string;
  h1: { lead: string; accent: string; tail?: string };
  intro: string;
  heroBullets: string[];
  /** icon = kit icon name in /public/home/icons */
  included: { title: string; items: { icon: string; title: string; body: string }[] };
  explainer: { eyebrow: string; title: string; paragraphs: string[]; points: string[] };
  chips: { title: string; items: string[] };
  steps: { label: string; title: string; body: string }[];
  crossLink: { eyebrow: string; title: string; body: string; href: string; label: string };
  faqs: { q: string; a: string }[];
};

export const facebookAdsLanding: ServiceLanding = {
  slug: "facebook-ads",
  path: "/services/facebook-ads",
  trackerName: "QuickLaunchWeb - Facebook Ads for Contractors (Houston)",
  metaTitle: "Facebook Ads for Contractors in Houston | QuickLaunchWeb",
  metaDescription:
    "Facebook and Instagram ads for Houston home service businesses. We film real video of your jobs, run the ads in your own account, and our team can call your leads and book the estimate.",
  keywords: [
    "facebook ads for contractors",
    "facebook ads agency houston",
    "meta ads agency houston",
    "facebook ads for home services",
    "facebook ads for roofers",
    "instagram ads for contractors",
    "contractor lead generation houston",
    "facebook lead generation for contractors",
  ],
  serviceName: "Facebook and Instagram ads for Houston home service businesses",
  serviceType: "Meta paid advertising management",
  eyebrow: "FACEBOOK & INSTAGRAM ADS · HOUSTON",
  h1: { lead: "Facebook ads that get Houston contractors", accent: "booked estimates" },
  intro:
    "We are a Houston Meta ads agency that only works with home service businesses. We make the ads, run them in your own ad account, and follow up on every lead in seconds. You can take the leads yourself, or our team calls them and puts the estimate on your calendar.",
  heroBullets: [
    "Video or picture ads, made by us.",
    "Shown to homeowners in the zip codes you want.",
    "Every lead gets a text back in seconds.",
  ],
  included: {
    title: "What you get when we run your Facebook ads",
    items: [
      {
        icon: "play",
        title: "Ads we make for you",
        body: "Short videos from your jobs, or picture ads if you do not want to be on camera. New ones every month so your ads do not go stale.",
      },
      {
        icon: "ads",
        title: "Set up in your ad account",
        body: "You own the ad account and pay Meta directly. You see every dollar. If you ever leave, everything stays with you.",
      },
      {
        icon: "target",
        title: "Homeowners near you",
        body: "We show your ads to homeowners in the parts of Houston worth your gas. Not renters. Not people three counties away.",
      },
      {
        icon: "check",
        title: "Lead forms that filter",
        body: "Our forms ask the right questions, so you stop wasting time on people who were never going to buy.",
      },
      {
        icon: "phone-message",
        title: "Instant follow-up",
        body: "Every lead gets a text the second they come in. Most jobs go to whoever answers first. That will be you.",
      },
      {
        icon: "calendar",
        title: "We can book the estimate",
        body: "Want it off your plate? Our team calls the lead, checks they own the home and have the budget, and books the estimate for you.",
      },
    ],
  },
  explainer: {
    eyebrow: "Why most contractor ads flop",
    title: "Facebook ads work for contractors. Most are just run wrong.",
    paragraphs: [
      "Most contractors who say Facebook ads do not work tried a boosted post, got a few likes, and quit. Or they paid an agency that ran stock-photo ads to all of Texas and never called the leads back.",
      "Ads are only half of it. The other half is what happens after someone fills out the form. A lead that waits an hour for a call is a lead that already booked someone else.",
    ],
    points: [
      "Boosting posts instead of running real lead campaigns",
      "Stock photos instead of your real work and your real face",
      "Targeting too wide, paying for clicks from people who will never hire you",
      "Slow follow-up, so paid leads go cold before anyone calls",
      "No one checking the numbers every week and fixing what is not working",
    ],
  },
  chips: {
    title: "Home service trades we run ads for",
    items: [
      "Roofing", "Painting", "Electrical", "Insulation", "Fencing", "HVAC",
      "Plumbing", "Remodeling", "Concrete", "Landscaping", "Pools", "Pressure washing",
    ],
  },
  steps: [
    { label: "Day 1", title: "30-minute plan call", body: "You tell us your trade, your area, and the jobs you want more of. We tell you straight if ads make sense for you." },
    { label: "Days 2–5", title: "We build it", body: "We make your first ads, set up your campaign, and build the lead form and the text-back." },
    { label: "Day 7", title: "Ads go live", body: "Leads start coming to your phone, or to our team if we are booking for you." },
    { label: "Every week", title: "We tune it", body: "We cut what is not working, put more money behind what is, and send you new ads." },
  ],
  crossLink: {
    eyebrow: "The ads are only as good as the video",
    title: "We film it too.",
    body: "Our best ads are real videos of real Houston jobs. We come out, film you and your crew, and cut it into ads that make people call.",
    href: "/services/video-production",
    label: "See our video work",
  },
  faqs: [
    {
      q: "Do Facebook ads work for contractors?",
      a: "Yes, when they are run as lead campaigns with real photos or video of your work, shown to homeowners in your area, and followed up on fast. The ads that work best show the real owner and crew on a real Houston job, because homeowners hire people they trust.",
    },
    {
      q: "How much does a Facebook lead cost for a contractor in Houston?",
      a: "It depends on the trade, the area, and the ad. Smaller jobs like insulation or fencing usually cost less per lead. Bigger jobs like roofing, painting, and remodeling cost more per lead, but each job is worth a lot more. That is why we judge ads by cost per booked job, not cost per lead.",
    },
    {
      q: "How much should I spend on Facebook ads?",
      a: "It depends on your trade, your area, and how many jobs you can handle. Ad money goes to Meta on your own card, and it is separate from our fee. We give you a starting number on the call.",
    },
    {
      q: "Do I own the ad account?",
      a: "Yes. The ads run in your ad account, on your card. You see every dollar, and if you ever leave, everything stays with you.",
    },
    {
      q: "Facebook ads or Google ads?",
      a: "Google catches people already searching for your service. Facebook and Instagram reach homeowners before they search, so you are the name they know when they need you. For most home service businesses we start with Facebook because it is cheaper per lead and video does the selling for you.",
    },
    {
      q: "Is this better than Angi or Thumbtack?",
      a: "Angi sells the same lead to several contractors, so you fight on price. Leads from your own ads come to you alone, and you build a brand people remember.",
    },
    {
      q: "Do you call my leads?",
      a: "Only if you want us to. Leads can go straight to your phone, or our team calls them, checks they are a real homeowner with a real budget, and books the estimate for you.",
    },
    {
      q: "Am I stuck in a contract?",
      a: "We ask for 90 days. That is how long it takes to make the content, get the data, and let the ads learn. After that it is month to month.",
    },
  ],
};

export const videoProductionLanding: ServiceLanding = {
  slug: "video-production",
  path: "/services/video-production",
  trackerName: "QuickLaunchWeb - Contractor Video Production (Houston)",
  metaTitle: "Video Marketing for Contractors in Houston | QuickLaunchWeb",
  metaDescription:
    "Contractor videography in Houston. We film you on the job and turn it into short videos and ads that get homeowners to call. Picture ads available if you would rather not be on camera.",
  keywords: [
    "contractor videography houston",
    "video marketing for contractors",
    "houston video production for small business",
    "video ads for home services",
    "roofing video marketing",
    "short form video for contractors",
    "houston videographer for business",
    "social media video for contractors",
  ],
  serviceName: "Video production and video ads for Houston home service businesses",
  serviceType: "Video production and video marketing",
  eyebrow: "CONTRACTOR VIDEO · HOUSTON",
  h1: { lead: "Contractor videos that make Houston homeowners", accent: "pick up the phone" },
  intro:
    "We are a Houston video team for home service businesses. We come film you and your crew on real jobs, then cut it into short videos for your ads, Instagram, Facebook, and TikTok. Then we run those videos as ads so they actually bring in work.",
  heroBullets: [
    "We come to your job sites in Houston.",
    "Short videos made to sell, not to look pretty.",
    "Run as ads so they turn into leads.",
  ],
  included: {
    title: "What our contractor video service includes",
    items: [
      {
        icon: "video-camera",
        title: "We film on your job",
        body: "We come to your job sites around Houston and film the work, the crew, and you. No studio. No script you have to memorize.",
      },
      {
        icon: "ads",
        title: "Short videos for every app",
        body: "Cut for Instagram Reels, Facebook, TikTok, and YouTube Shorts. Captions on every one, because most people watch on mute.",
      },
      {
        icon: "target",
        title: "Ad-ready cuts",
        body: "Every shoot gives us several ad versions with different openers, so we can test which one gets the most calls.",
      },
      {
        icon: "star",
        title: "Before and afters",
        body: "The easiest way to show you do good work. We plan the shots so the change hits hard.",
      },
      {
        icon: "phone",
        title: "Phone clips turned into posts",
        body: "Between shoots, send us clips from your phone. We edit them and post them every week.",
      },
      {
        icon: "growth",
        title: "Run as ads",
        body: "A video nobody sees does nothing. We put your best videos behind Facebook and Instagram ads aimed at homeowners near you.",
      },
    ],
  },
  explainer: {
    eyebrow: "Video or picture ads?",
    title: "You on camera works best. But you do not have to be.",
    paragraphs: [
      "People hire who they trust, and nothing builds trust like the owner talking about the work. That is why video is the first thing we pitch.",
      "Some owners do not want to be on camera, and that is fine. We make picture ads from your real job photos, and they bring in leads too. We will tell you on the call which one fits your business.",
    ],
    points: [
      "Owner intro: who you are and why you do it right",
      "Job walkthroughs: what you did and why it matters",
      "Before and after reveals",
      "Customer reviews on camera",
      "Quick answers to the questions homeowners always ask",
    ],
  },
  chips: {
    title: "Trades we film for",
    items: [
      "Roofing", "Painting", "Electrical", "Insulation", "Fencing", "HVAC",
      "Plumbing", "Remodeling", "Concrete", "Landscaping", "Pools", "Pressure washing",
    ],
  },
  steps: [
    { label: "Day 1", title: "30-minute plan call", body: "Tell us your trade and the jobs you want more of. We plan what to film." },
    { label: "Days 2–5", title: "We film and edit", body: "We come to a job, or work from your phone clips, and cut your first videos." },
    { label: "Day 7", title: "Videos go live", body: "Posted on your pages and running as ads to homeowners near you." },
    { label: "Every month", title: "Fresh content", body: "New videos every month so your pages stay active and your ads never go stale." },
  ],
  crossLink: {
    eyebrow: "Video is half of it",
    title: "We run the ads too.",
    body: "Great video with no ads behind it is a nice post. We put your videos in front of Houston homeowners and catch every lead they bring in.",
    href: "/services/facebook-ads",
    label: "See how we run ads",
  },
  faqs: [
    {
      q: "Do I have to be on camera?",
      a: "No. We make picture ads for owners who would rather not be on camera, and they bring in leads. But you talking on camera works best, because people hire who they trust.",
    },
    {
      q: "Do you come film in person?",
      a: "Yes. We are in Houston, so we come to your job sites. Between shoots, you can send us clips from your phone and we edit them for you.",
    },
    {
      q: "What kind of videos work best for contractors?",
      a: "Short, real videos: the owner explaining a job, a before and after, a quick walkthrough, or a happy customer. Polished commercials usually do worse than real footage from the job site.",
    },
    {
      q: "Can I just get videos without ads?",
      a: "We pair video with ads because that is where it pays off. A video nobody sees does not bring in jobs. If you only want content, ask us on the call.",
    },
    {
      q: "How long are the videos?",
      a: "Most are 15 to 60 seconds, made for Reels, TikTok, and Facebook. Short enough to watch to the end, long enough to show the work.",
    },
    {
      q: "How fast can I get started?",
      a: "Most clients are live within 7 days of our first call. About an hour of your time the first week, then just send us clips.",
    },
    {
      q: "What does it cost?",
      a: "It depends on how often we film and whether we run your ads and call your leads. That is what the 30-minute plan call is for.",
    },
  ],
};

export const serviceLandings = [facebookAdsLanding, videoProductionLanding];
