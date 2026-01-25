// Shared FAQ data for homepage UI and FAQPage schema (same text, no copy changes)

export type FAQItem = { q: string; a: string; category: string };

export const faqs: FAQItem[] = [
  { q: "Is the website really free?", a: "Yes. The build fee is waived when you start a plan. You only pay monthly for hosting + support.", category: "pricing" },
  { q: "What's the catch?", a: "No catch. It's simple: $0 down to build, then $99/mo (or $149/mo) to keep it live, supported, and updated.", category: "pricing" },
  { q: "Why do you charge monthly?", a: "Because most \"one-time websites\" get outdated fast. Monthly covers hosting, fixes, and support so your site stays fast and working.", category: "pricing" },
  { q: "Can I cancel anytime?", a: "Yes. No contracts. Cancel anytime through the Stripe portal (or email support if needed).", category: "pricing" },
  { q: "What happens if I cancel?", a: "We stop billing you going forward, and your hosted site may be taken offline after your billing period ends.", category: "pricing" },
  { q: "What do I get with Starter vs Pro?", a: "Starter ($99/mo): 1-page site + local SEO foundation + 1 content update/month.\nPro ($149/mo): 3-page site + stronger local structure + priority queue + 3 content updates/month.", category: "plans" },
  { q: "What counts as a \"content update\"?", a: "Small changes like text edits, photo swaps, button/link updates, hours, services, or adding a testimonial.", category: "plans" },
  { q: "What's not included?", a: "Big changes like new pages beyond your plan, full redesigns, custom features, ecommerce, or integrations. If you need that, we'll quote it as a project.", category: "plans" },
  { q: "Can I request changes anytime?", a: "Yes — submit requests through our support form. Plans include monthly content updates, and Pro is handled faster via priority queue.", category: "plans" },
  { q: "How fast can you launch it?", a: "Typically 48 hours after you send your business details (services, contact info, photos/logo).", category: "getting-started" },
  { q: "Do I need a domain?", a: "Yes — you'll need a domain (like yourbusiness.com). If you don't have one, we'll send a quick guide to buy it.", category: "getting-started" },
  { q: "Can you connect my domain for me?", a: "Yes. If you already have a domain, you can either:\n\nDo it yourself (free) with our instructions, or\n\nWe connect it for you ($99 one-time)", category: "getting-started" },
  { q: "How do leads come in?", a: "Through tap-to-call buttons and form submissions on your website.", category: "how-it-works" },
  { q: "Where do form submissions go?", a: "By default, form leads go straight to your email so you can respond fast.", category: "how-it-works" },
  { q: "Do you offer text message lead alerts?", a: "Yes — add Instant Lead Texts to get new leads texted to your phone instantly.", category: "how-it-works" },
  { q: "Can you add Google Analytics / tracking?", a: "Yes. We can add Umami or Google Analytics—especially for Pro. If you have tracking scripts, we'll plug them in.", category: "how-it-works" },
  { q: "Do I own the website?", a: "You own your business info and branding, but the website is provided as a subscription service while active. If you want full ownership, you can request a website buyout.", category: "results" },
  { q: "Do you do SEO?", a: "We build every site with a local SEO foundation (fast load, clean structure, service keywords). We don't promise rankings, but we set you up correctly from day one.", category: "results" },
  { q: "Will this get me more clients?", a: "That's the goal — we build your site to convert visitors into clients and inquiries. Results depend on your market, offer, competition, and follow-up.", category: "results" },
  { q: "Who is this best for?", a: "Local service businesses that want a clean website fast that helps drive clients and inquiries (HVAC, roofing, salons, medspas, dentists, auto, contractors, and more).", category: "results" },
];

export const faqCategories = [
  { id: "all", label: "All Questions" },
  { id: "pricing", label: "Pricing & Billing" },
  { id: "plans", label: "Plans & What's Included" },
  { id: "getting-started", label: "Getting Started" },
  { id: "how-it-works", label: "How It Works" },
  { id: "results", label: "Ownership & SEO" },
];
