// Shared FAQ data for homepage UI and FAQPage schema.

export type FAQItem = { q: string; a: string; category: string };

export const faqs: FAQItem[] = [
  // ── Common objections (top of list) ──────────────────────────────
  { q: "Why wouldn't I just build my own website?", a: "You could, and some people do. But most business owners we work with tried that and ended up with a site that doesn't rank, doesn't convert, and sits there collecting dust. This isn't just a website. It's a system that gets you found on Google, Maps, and AI search, follows up with leads automatically, and builds your reviews while you work.", category: "objections" },
  { q: "Will this actually get me more calls?", a: "That is what it is built to do. You show up when people search, leads get followed up automatically so nothing slips through, and reviews build on autopilot so new customers trust you faster. Results depend on your market, competition, and follow-up, but the system does the heavy lifting.", category: "objections" },
  { q: "I already have a website. Why do I need this?", a: "If your current site is bringing in steady calls, great. But if it just sits there and you are still relying on word-of-mouth or paid ads, it is not doing its job. We replace or rebuild it with something designed to rank, convert, and follow up, not just look nice.", category: "objections" },
  { q: "Is there a long-term contract?", a: "No. All plans are month-to-month. No contracts, no commitments. Cancel anytime through the Stripe portal or by emailing support.", category: "objections" },
  { q: "What if I don't like the design?", a: "We build your site based on what converts for local businesses, not just what looks trendy. That said, if something feels off we will adjust it. Your plan includes content updates each month, and you can always request changes through our support form.", category: "objections" },
  { q: "Is this just a template?", a: "We start with proven layouts that convert, then customize everything — your services, your photos, your city, your brand. It is not a cookie-cutter site with your logo slapped on. Every page is written and structured for your specific business.", category: "objections" },
  { q: "Do I need to be tech-savvy?", a: "Not at all. You send us your business details and we handle everything. The site, the SEO, the hosting, the updates. If you need a change, just submit a request and we take care of it.", category: "objections" },

  // ── Pricing & Billing ────────────────────────────────────────────
  { q: "Do I pay anything upfront?", a: "The separate build fee is waived when you start a plan. You can go monthly, or choose the upfront option on eligible plans and prepay 3 months to get month 4 free.", category: "pricing" },
  { q: "How does pricing work?", a: "You pick the plan that fits. Starter is $99/mo, Growth Engine is $199/mo, and City Dominator is $399/mo. Every plan includes hosting, support, and updates. Some plans also have an upfront option where you prepay 3 months and get the 4th month free.", category: "pricing" },
  { q: "Why is it monthly?", a: "Because your site needs hosting, updates, SEO, and ongoing support to keep working and ranking. This is not a one-and-done file we disappear after delivering. We keep everything running and improving.", category: "pricing" },
  { q: "Can I cancel anytime?", a: "Yes. No contracts. Cancel anytime through the Stripe portal or by emailing support.", category: "pricing" },
  { q: "What happens if I cancel?", a: "We stop billing you going forward. Your hosted site may be taken offline after your billing period ends. We recommend downloading or requesting any content you need before your subscription ends.", category: "pricing" },

  // ── Plans & What's Included ──────────────────────────────────────
  { q: "What comes with each plan?", a: "Starter ($99/mo): a custom-built website, mobile-friendly, hosting and security handled, contact form with leads to your email, basic SEO, fast load times, and 1 content update per month.\nGrowth Engine ($199/mo): everything in Starter plus a page for every service you offer, full SEO and AI search setup, Google Business Profile setup, auto-reply to every Google review, review request link after every job, 1 blog post per month, a monthly ranking snapshot, and 2 content updates.\nCity Dominator ($399/mo): everything in Growth Engine plus a full CRM to track every lead, missed call text-back, instant lead reply with auto follow-ups, after-hours auto-reply, automated review requests, 2 new city pages and 2 blog posts per month, a 12-month city growth plan, priority edits, and 4 content updates.", category: "plans" },
  { q: "What counts as a content update?", a: "Small changes like text edits, photo swaps, button updates, hours, services, or adding a testimonial.", category: "plans" },
  { q: "What's not included?", a: "Big changes like full redesigns, custom features, ecommerce, or complex integrations. If you need that, book a call and we will scope it out.", category: "plans" },
  { q: "Can I upgrade my plan later?", a: "Yes. You can move from Starter to Growth Engine or City Dominator anytime. We will migrate your site and activate the new features.", category: "plans" },
  { q: "Are there any add-ons?", a: "Yes. Starter can add Instant Lead Texts for $29/mo or Google Business Setup for a one-time $199. All plans can add a Professional Photo Shoot ($299 one-time). Growth Engine can add an Ad Creative Package ($499 one-time). City Dominator can add a Brand Content Package ($799 one-time) and gets a free ads consultation.", category: "plans" },
  { q: "Can I request changes anytime?", a: "Yes. Send requests through our support form. Plans include monthly content updates, and City Dominator gets priority turnaround.", category: "plans" },

  // ── Getting Started ──────────────────────────────────────────────
  { q: "How fast can you launch it?", a: "Typically 48 hours after you send your business details like services, contact info, and photos. If we have everything we need, we aim to get it live fast.", category: "getting-started" },
  { q: "Do I need a domain?", a: "Yes. You will need a domain like yourbusiness.com. If you do not have one, we will send you a quick guide to buy it.", category: "getting-started" },
  { q: "Can you connect my domain for me?", a: "Yes. If you already have a domain, you can do it yourself with our instructions or have us connect it for you for a one-time fee.", category: "getting-started" },
  { q: "What do I need to get started?", a: "Your business name, the services you offer, your service area, contact info, and any photos or logos you have. The more you give us, the better the site turns out.", category: "getting-started" },

  // ── How It Works ─────────────────────────────────────────────────
  { q: "How do leads come in?", a: "Through tap-to-call buttons and form submissions on your website. On Growth Engine and City Dominator, leads also come through your Google Business Profile.", category: "how-it-works" },
  { q: "Where do form submissions go?", a: "By default, form leads go straight to your email so you can respond fast. On City Dominator, they also go into your CRM so nothing gets lost.", category: "how-it-works" },
  { q: "What is missed call text-back?", a: "If someone calls and you can't answer, the system automatically sends them a text so they don't call your competitor instead. This is included with City Dominator.", category: "how-it-works" },
  { q: "Do you offer text message lead alerts?", a: "Yes. Starter can add Instant Lead Texts for $29/mo. Growth Engine and City Dominator include lead notifications and auto follow-ups built in.", category: "how-it-works" },
  { q: "How do the automated reviews work?", a: "After every job, a review request goes out to your customer. When a review comes in, we auto-reply for you. On City Dominator this is fully automated. On Growth Engine you get a review request link to send manually.", category: "how-it-works" },
  { q: "Can you add tracking?", a: "Yes. We can add Umami or Google Analytics. Growth Engine and City Dominator also include a monthly ranking and traffic snapshot.", category: "how-it-works" },

  // ── Results & Ownership ──────────────────────────────────────────
  { q: "Do I own the website?", a: "You own your business info and branding, but the website is provided as a subscription service while active. If you want full ownership, you can request a website buyout.", category: "results" },
  { q: "Can you help me show up on Google and AI search?", a: "Yes. Every site includes basic SEO. Growth Engine adds full SEO plus AI search setup, Google Business Profile help, review follow-up, and content written so AI tools can find you. City Dominator takes it further with city pages, AI search-ready blog posts, and every page set up so you show up when people ask AI for help near them.", category: "results" },
  { q: "What are city pages?", a: "Dedicated pages built around specific cities you serve. Each one is optimized to rank for searches in that area. City Dominator adds 2 new city pages every month so you keep expanding your reach.", category: "results" },
  { q: "Will this help me get more work?", a: "That is the goal. We build your site to help people trust you faster, find you easier, and contact you sooner. Results depend on your market, offer, competition, and follow-up, but the system is designed to stack the odds in your favor.", category: "results" },
  { q: "Who is this best for?", a: "Local service businesses — contractors, roofers, plumbers, electricians, landscapers, cleaners, and similar trades — that want to look stronger online, show up better on Google, and make it easier for people to call or book.", category: "results" },
];

export const faqCategories = [
  { id: "all", label: "All Questions" },
  { id: "objections", label: "Common Questions" },
  { id: "pricing", label: "Pricing & Billing" },
  { id: "plans", label: "Plans & What's Included" },
  { id: "getting-started", label: "Getting Started" },
  { id: "how-it-works", label: "How It Works" },
  { id: "results", label: "Results & Ownership" },
];
