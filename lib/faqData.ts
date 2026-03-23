// Shared FAQ data for homepage UI and FAQPage schema.

export type FAQItem = { q: string; a: string; category: string };

export const faqs: FAQItem[] = [
  { q: "Do I pay anything upfront?", a: "The separate build fee is waived when you start a plan. You can go monthly, or choose the upfront option on eligible plans and prepay 3 months to get month 4 free.", category: "pricing" },
  { q: "How does pricing work?", a: "You pick the plan that fits. Plans start at $99/mo and include hosting, support, and updates. Some plans also have an upfront option if you want the 3-month prepay deal.", category: "pricing" },
  { q: "Why is it monthly?", a: "Because your site needs hosting, fixes, and updates to keep working. This is not a one-and-done file we disappear after delivering.", category: "pricing" },
  { q: "Can I cancel anytime?", a: "Yes. No contracts. Cancel anytime through the Stripe portal or by emailing support if needed.", category: "pricing" },
  { q: "What happens if I cancel?", a: "We stop billing you going forward, and your hosted site may be taken offline after your billing period ends.", category: "pricing" },
  { q: "What comes with each plan?", a: "Starter ($99/mo): a simple 1-page site, basic SEO, and 1 content update each month.\nGrowth Engine ($199/mo): a 5-page site, stronger Google setup, review follow-up, 1 blog post each month, a monthly ranking snapshot, and 2 content updates.\nCity Dominator ($399/mo): everything in Growth Engine plus more service-page coverage, 2 city pages each month, 2 blog posts, priority edits, and 4 content updates.", category: "plans" },
  { q: "What counts as a content update?", a: "Small changes like text edits, photo swaps, button updates, hours, services, or adding a testimonial.", category: "plans" },
  { q: "What's not included?", a: "Big changes like full redesigns, custom features, ecommerce, or complex integrations. If you need that, book a call and we will scope it out.", category: "plans" },
  { q: "Can I request changes anytime?", a: "Yes. Send requests through our support form. Plans include monthly content updates, and City Dominator gets priority turnaround.", category: "plans" },
  { q: "How fast can you launch it?", a: "Typically 48 hours after you send your business details like services, contact info, and photos.", category: "getting-started" },
  { q: "Do I need a domain?", a: "Yes. You will need a domain like yourbusiness.com. If you do not have one, we will send you a quick guide to buy it.", category: "getting-started" },
  { q: "Can you connect my domain for me?", a: "Yes. If you already have a domain, you can do it yourself with our instructions or have us connect it for you for a one-time fee.", category: "getting-started" },
  { q: "How do leads come in?", a: "Through tap-to-call buttons and form submissions on your website.", category: "how-it-works" },
  { q: "Where do form submissions go?", a: "By default, form leads go straight to your email so you can respond fast.", category: "how-it-works" },
  { q: "Do you offer text message lead alerts?", a: "Yes. Add Instant Lead Texts if you want new leads texted to your phone right away.", category: "how-it-works" },
  { q: "Can you add tracking?", a: "Yes. We can add Umami or Google Analytics. Growth Engine and City Dominator also include a monthly ranking and traffic snapshot.", category: "how-it-works" },
  { q: "Do I own the website?", a: "You own your business info and branding, but the website is provided as a subscription service while active. If you want full ownership, you can request a website buyout.", category: "results" },
  { q: "Can you help me show up on Google?", a: "Yes. Every site includes basic SEO. Growth Engine adds stronger on-page SEO, Google Business Profile help, review follow-up, and monthly content. City Dominator adds city-specific pages so you can show up in more local searches.", category: "results" },
  { q: "Will this help me get more work?", a: "That is the goal. We build your site to help people trust you faster, find you easier, and contact you sooner. Results still depend on your market, offer, competition, and follow-up.", category: "results" },
  { q: "Who is this best for?", a: "Local businesses that want to look stronger online, show up better on Google, and make it easier for people to call or book.", category: "results" },
];

export const faqCategories = [
  { id: "all", label: "All Questions" },
  { id: "pricing", label: "Pricing & Billing" },
  { id: "plans", label: "Plans & What's Included" },
  { id: "getting-started", label: "Getting Started" },
  { id: "how-it-works", label: "How It Works" },
  { id: "results", label: "Results & Ownership" },
];
