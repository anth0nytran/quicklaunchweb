'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  Search,
} from 'lucide-react';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';
const META_PIXEL_ENABLED = Boolean(META_PIXEL_ID);
const META_PAGE_ID = process.env.NEXT_PUBLIC_META_PAGE_ID || '';

// ─── Results ───

const RESULTS = [
  {
    quote: 'was running my whole business out of instagram DMs which was getting annoying. we show up for local searches now and had 12 inquiries come in last month. process was super easy too.',
    name: 'Brian',
    business: 'Becreativesco',
    trade: 'Marketing & Branding · Boston, MA',
    url: 'https://becreativesco.com',
    result: '12 inquiries in 6 weeks',
  },
  {
    quote: 'was paying some seo guy 250 a month for a website that looked honestly like crap. zero calls from it. Anthony actually cared and worked with us 1:1. got 3 real jobs from google in the first month.',
    name: 'Jose',
    business: 'Elite Home Repairs',
    trade: 'Home Remodeling · Houston, TX',
    url: 'https://elitehomerepairs.us',
    result: '3 jobs in 30 days',
  },
  {
    quote: 'Tried making my own wix site and it was a mess. was embarrassed to send it to homeowners. turned it around in 2 days. booked 4 solid painting jobs just from people finding the site.',
    name: 'Jamie',
    business: 'AN Painting Renovations',
    trade: 'Painting · Houston, TX',
    url: 'https://anpaintingrenovations.com',
    result: '4 jobs from the site',
  },
  {
    quote: 'In real estate everyone looks the same. the site he built captures leads instantly instead of losing them to zillow. got 3 new listings directly from the site.',
    name: 'Jack',
    business: 'The Toro Group Corp',
    trade: 'Real Estate · San Dimas, CA',
    url: 'https://soldbytoro.com',
    result: '3 new listings from website',
  },
  {
    quote: 'we had a site but it didnt even have a way for people to call us from their phone easily. Anthony built us a whole new site in like 2 days. phone definitely rings more now. should have done this a year ago.',
    name: 'Juan',
    business: 'JN Ornamental Design',
    trade: 'Fencing & Fabrication · Houston, TX',
    url: 'https://jnornamentaldesign.com',
    result: '40% more calls in week one',
  },
  {
    quote: 'we were losing bids to guys doing worse work than us just cause their website looked better. customers judge u before they even call. closing way more people now.',
    name: 'David',
    business: '3D Fencing',
    trade: 'Fencing · Houston, TX',
    url: 'https://3dfencing.com',
    result: 'Leads in the first week',
  },
  {
    quote: 'we were just doing word of mouth and facebook groups before. now when people search pressure washing near me we actually show up. getting quote requests straight to my email every few days.',
    name: 'Blake',
    business: 'Made New Pressure Washing',
    trade: 'Pressure Washing · Houston, TX',
    url: 'https://madenewpressurewashing.com',
    result: 'Ranking on Google in weeks',
  },
  {
    quote: 'had absolutely nothing for my tree service just a facebook page. went from basically invisible online to getting a few calls a week. best investment ive made for the business.',
    name: 'Cristian',
    business: 'Jimenez Tree Pro',
    trade: 'Tree Service · Baytown, TX',
    url: 'https://jimeneztreepro.com',
    result: 'Calls every week from Google',
  },
  {
    quote: 'business was too up and down. good weeks then dead weeks. they set up the site with tap to call buttons and its been steady leads from google since.',
    name: 'Juan',
    business: 'Landeros Electrical',
    trade: 'Electrician · Houston, TX',
    url: 'https://landeroselectrical.com',
    result: 'Steady leads from Google',
  },
  {
    quote: 'our old site looked super cheap compared to the actual jewelry we sell. people literally told us that. definitely seeing more foot traffic from people finding us online first.',
    name: 'Tomi',
    business: 'Tomi Jewelry',
    trade: 'Jewelry Store · Houston, TX',
    url: 'https://tomijewelry.com',
    result: 'More foot traffic from Google',
  },
];

// ─── Tracking ───

function getCookieValue(name: string): string {
  if (typeof document === 'undefined') return '';
  const pattern = new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}=([^;]*)`);
  const match = document.cookie.match(pattern);
  return match ? decodeURIComponent(match[1]) : '';
}

function buildFbcFromFbclid(fbclid?: string): string | undefined {
  if (!fbclid) return undefined;
  const v = fbclid.trim();
  if (!v) return undefined;
  return `fb.1.${Date.now()}.${v}`;
}

function createEventId(prefix: string): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function compactPayload(payload: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(payload).filter(([, v]) => v !== undefined && v !== null && v !== '')
  );
}

function getMetaContext() {
  if (typeof window === 'undefined') {
    return { eventSourceUrl: '', messagingChannel: 'instagram' };
  }
  const query = new URLSearchParams(window.location.search);
  const fbclid = query.get('fbclid') || undefined;
  return {
    eventSourceUrl: window.location.href,
    fbp: getCookieValue('_fbp') || undefined,
    fbc: getCookieValue('_fbc') || buildFbcFromFbclid(fbclid),
    fbclid,
    pageId: META_PAGE_ID || undefined,
    messagingChannel: 'instagram',
  };
}

async function sendMetaServerEvent(event: {
  eventName: string;
  eventId: string;
  customData?: Record<string, unknown>;
  context: ReturnType<typeof getMetaContext>;
}) {
  try {
    await fetch('/api/instagram/meta', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: event.eventName,
        eventId: event.eventId,
        eventSourceUrl: event.context.eventSourceUrl,
        fbp: event.context.fbp,
        fbc: event.context.fbc,
        fbclid: event.context.fbclid,
        customData: event.customData,
      }),
    });
  } catch {
    // silent
  }
}

// ─── Page ───

export default function BookedPage() {
  const hasFired = useRef(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [gbpLink, setGbpLink] = useState('');
  const [auditEmail, setAuditEmail] = useState('');
  const [auditState, setAuditState] = useState<'idle' | 'loading' | 'done'>('idle');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasFired.current) return;
    hasFired.current = true;
    if (!META_PIXEL_ENABLED) return;

    // Only fire Lead once per session — prevents duplicate on refresh
    const STORAGE_KEY = 'qlw_ig_lead_fired';
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // private browsing — continue, ref guard is enough
    }

    const context = getMetaContext();
    const eventId = createEventId('ig_lead');

    // Browser pixel — Lead event
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', compactPayload({
        content_name: 'instagram_booking_confirmed',
        content_category: 'demo_call',
        page_id: context.pageId,
        messaging_channel: context.messagingChannel,
      }), { eventID: eventId });
    }

    // Server-side CAPI — same eventId for deduplication
    void sendMetaServerEvent({
      eventName: 'Lead', eventId, context,
      customData: {
        content_name: 'instagram_booking_confirmed',
        content_category: 'demo_call',
        page_id: context.pageId,
        messaging_channel: context.messagingChannel,
      },
    });
  }, []);

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(RESULTS.length - 1, index));
    setCurrentSlide(clamped);
    if (scrollRef.current) {
      const child = scrollRef.current.children[clamped] as HTMLElement;
      child?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditEmail.trim() || !auditEmail.includes('@') || !gbpLink.trim()) return;
    setAuditState('loading');
    try {
      await fetch('/api/instagram/checklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: auditEmail.trim(),
          gbpLink: gbpLink.trim(),
          source: 'instagram_booked_audit',
        }),
      });
    } catch {
      // still show success
    }
    setAuditState('done');
  };

  return (
    <main className="min-h-screen bg-neutral-100 font-[family-name:var(--font-lato)]">

      {/* ── HERO ── */}
      <section className="bg-neutral-900 px-6 pt-12 pb-14 sm:pt-16 sm:pb-16">
        <div className="max-w-lg mx-auto text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-8 h-8 text-white" strokeWidth={3} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[1.75rem] sm:text-[2.25rem] font-extrabold font-[family-name:var(--font-montserrat)] leading-[1.2] text-white tracking-tight mb-4"
          >
            You&apos;re in.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-neutral-400 text-[15px] max-w-xs mx-auto leading-relaxed"
          >
            Your call is booked. Check your email for the invite. We&apos;ll be ready.
          </motion.p>
        </div>
      </section>

      {/* ── WHAT HAPPENS NEXT ── */}
      <section className="px-6 py-12 sm:py-14">
        <div className="max-w-lg mx-auto">
          <h2 className="text-lg sm:text-xl font-extrabold font-[family-name:var(--font-montserrat)] text-neutral-800 mb-6 tracking-tight">
            What happens next
          </h2>

          <div className="space-y-4">
            {[
              {
                num: '1',
                title: 'We hop on a quick call',
                desc: "We'll ask about your business and show you a site we put together. If you like what you see and want to move forward — great. If not, no hard feelings.",
              },
              {
                num: '2',
                title: 'You fill out a short form',
                desc: "Your services, your area, your photos. Takes 5 minutes. Once we get that back, we start building your site.",
              },
              {
                num: '3',
                title: 'We send you a preview link',
                desc: "You look it over. Want something changed? Just tell us. We go back and forth until you love it. No meetings needed — just reply or text us.",
              },
              {
                num: '4',
                title: 'We launch it',
                desc: "Domain, hosting, speed, SEO — we handle all of it. You don't touch a thing. Your site goes live and starts working for you.",
              },
            ].map((step) => (
              <div key={step.num} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded bg-neutral-800 text-white flex items-center justify-center text-[13px] font-bold shrink-0 font-[family-name:var(--font-montserrat)]">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-neutral-800 mb-0.5 font-[family-name:var(--font-montserrat)]">{step.title}</h3>
                  <p className="text-[13px] text-neutral-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-lg mx-auto px-6"><div className="h-px bg-neutral-200" /></div>

      {/* ── RESULTS / TESTIMONIALS ── */}
      <section className="px-6 py-12 sm:py-14">
        <div className="max-w-lg mx-auto">
          <h2 className="text-lg sm:text-xl font-extrabold font-[family-name:var(--font-montserrat)] text-neutral-800 mb-1 tracking-tight">
            Contractors who were in your shoes
          </h2>
          <p className="text-[13px] text-neutral-400 mb-6">
            They booked the same call you just did. Here&apos;s what happened.
          </p>

          <div className="relative">
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onScroll={(e) => {
                const el = e.currentTarget;
                const index = Math.round(el.scrollLeft / (el.offsetWidth * 0.85));
                setCurrentSlide(Math.max(0, Math.min(RESULTS.length - 1, index)));
              }}
            >
              {RESULTS.map((r, i) => (
                <div key={i} className="snap-center shrink-0 w-[85%] sm:w-[80%]">
                  <div className="bg-white rounded-lg border border-neutral-200 p-5 h-full flex flex-col">
                    {/* Result badge */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, j) => (
                          <svg key={j} className="w-3.5 h-3.5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-orange-700 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-full whitespace-nowrap uppercase tracking-wider">
                        {r.result}
                      </span>
                    </div>

                    {/* Quote */}
                    <p className="text-[13px] text-neutral-600 leading-relaxed mb-4 flex-1">
                      &ldquo;{r.quote}&rdquo;
                    </p>

                    {/* Attribution + live link */}
                    <div className="border-t border-neutral-100 pt-3 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[13px] font-bold text-neutral-800">{r.name}</p>
                        <p className="text-[11px] text-neutral-400">{r.trade}</p>
                      </div>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[11px] font-semibold text-orange-600 hover:text-orange-700 transition-colors shrink-0"
                      >
                        See their site <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => goTo(currentSlide - 1)}
              className={`absolute left-0 top-[45%] -translate-y-1/2 -translate-x-2 w-8 h-8 bg-white border border-neutral-200 rounded-full flex items-center justify-center shadow-sm transition-opacity ${currentSlide === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4 text-neutral-600" />
            </button>
            <button
              onClick={() => goTo(currentSlide + 1)}
              className={`absolute right-0 top-[45%] -translate-y-1/2 translate-x-2 w-8 h-8 bg-white border border-neutral-200 rounded-full flex items-center justify-center shadow-sm transition-opacity ${currentSlide === RESULTS.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4 text-neutral-600" />
            </button>
          </div>

          <div className="flex justify-center gap-1.5 mt-4">
            {RESULTS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? 'bg-orange-500 w-5' : 'bg-neutral-300'}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-lg mx-auto px-6"><div className="h-px bg-neutral-200" /></div>

      {/* ── FREE AUDIT ── */}
      <section className="px-6 py-12 sm:py-14">
        <div className="max-w-lg mx-auto">
          <div className="bg-neutral-900 rounded-xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Search className="w-4 h-4 text-orange-400" />
                </div>
                <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-orange-400 font-[family-name:var(--font-montserrat)]">
                  Free before your call
                </p>
              </div>

              <h3 className="text-[18px] sm:text-[20px] font-extrabold font-[family-name:var(--font-montserrat)] text-white mb-2 leading-tight tracking-tight">
                We&apos;ll audit your online presence for free
              </h3>
              <p className="text-[13px] text-neutral-400 mb-5 leading-relaxed">
                Drop your Google Business Profile link and email. We&apos;ll look at how you show up on Google, what your competitors are doing, and where you&apos;re losing jobs — and send it to you before the call.
              </p>

              <AnimatePresence mode="wait">
                {auditState !== 'done' ? (
                  <motion.form
                    key="form"
                    onSubmit={handleAudit}
                    className="space-y-2.5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <input
                      type="url"
                      value={gbpLink}
                      onChange={(e) => setGbpLink(e.target.value)}
                      placeholder="Google Business Profile link"
                      required
                      className="w-full bg-neutral-800 border border-neutral-700 text-white text-[14px] px-4 py-3 rounded-lg placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-colors"
                    />
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={auditEmail}
                        onChange={(e) => setAuditEmail(e.target.value)}
                        placeholder="Your email"
                        required
                        className="flex-1 bg-neutral-800 border border-neutral-700 text-white text-[14px] px-4 py-3 rounded-lg placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-colors"
                      />
                      <button
                        type="submit"
                        disabled={auditState === 'loading'}
                        className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 disabled:opacity-60 text-white text-[14px] font-bold font-[family-name:var(--font-montserrat)] px-5 py-3 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                      >
                        {auditState === 'loading' ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>Send <ArrowRight className="w-3.5 h-3.5" /></>
                        )}
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3"
                  >
                    <Check className="w-5 h-5 text-green-400 shrink-0" />
                    <p className="text-[13px] text-green-300 font-medium">
                      Got it. We&apos;ll send your audit before the call.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-[11px] text-neutral-600 mt-3">
                No spam. Just your audit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <section className="bg-neutral-900 px-6 py-10 sm:py-12">
        <div className="max-w-lg mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-neutral-800 rounded-full px-5 py-2.5 mb-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-[13px] text-neutral-300 font-medium">
              Check your email for the calendar invite
            </span>
          </div>
          <p className="text-[13px] text-neutral-500">
            Questions? Text us at <span className="text-neutral-300">(832) 552-3458</span>
          </p>
        </div>
      </section>

      <footer className="bg-neutral-900 text-center px-6 pb-12 pt-0 text-[11px] text-neutral-600">
        &copy; {new Date().getFullYear()} QuickLaunchWeb
      </footer>
    </main>
  );
}
