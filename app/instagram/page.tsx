'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, ArrowRight, Phone } from 'lucide-react';
import { PopupModal, InlineWidget } from 'react-calendly';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';
const META_PAGE_ID = process.env.NEXT_PUBLIC_META_PAGE_ID || '';
const META_PIXEL_ENABLED = Boolean(META_PIXEL_ID);
const CALENDLY_URL = 'https://calendly.com/quicklaunchweb/15min';

// ─── Tracking ────────────────────────────────

type MetaContext = {
  eventSourceUrl: string;
  fbp?: string;
  fbc?: string;
  fbclid?: string;
  pageId?: string;
  messagingChannel: string;
};

function compactPayload(payload: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(payload).filter(
      ([, value]) => value !== undefined && value !== null && value !== ''
    )
  );
}

function getCookieValue(name: string): string {
  if (typeof document === 'undefined') return '';
  const pattern = new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}=([^;]*)`);
  const match = document.cookie.match(pattern);
  return match ? decodeURIComponent(match[1]) : '';
}

function buildFbcFromFbclid(fbclid?: string): string | undefined {
  if (!fbclid) return undefined;
  const cleanValue = fbclid.trim();
  if (!cleanValue) return undefined;
  return `fb.1.${Date.now()}.${cleanValue}`;
}

function createEventId(prefix: string): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function getMetaContext(): MetaContext {
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
  eventName: 'ViewContent' | 'Lead' | 'CompleteRegistration' | 'LeadSubmitted' | 'Schedule';
  eventId: string;
  customData?: Record<string, unknown>;
  context: MetaContext;
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
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[IG Landing] Meta server event failed', error);
    }
  }
}

function trackMetaViewContent(eventId: string, context: MetaContext) {
  if (typeof window.fbq === 'function') {
    window.fbq(
      'track',
      'ViewContent',
      compactPayload({
        content_name: 'instagram_landing',
        content_type: 'landing_page',
        page_id: context.pageId,
        messaging_channel: context.messagingChannel,
      }),
      { eventID: eventId }
    );
  }
}

function trackEvent(event: string, data?: Record<string, string>) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[IG Landing] ${event}`, data);
  }
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, data || {});
  }
}

function getUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const utms: Record<string, string> = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((k) => {
    const v = params.get(k);
    if (v) utms[k] = v;
  });
  return utms;
}

// ─── Main Page ───────────────────────────────

export default function InstagramLanding() {
  const calendarRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  useEffect(() => {
    getUtmParams();
    trackEvent('page_view', { source: 'instagram' });
    if (!META_PIXEL_ENABLED) return;
    const context = getMetaContext();
    const eventId = createEventId('ig_view_content');
    trackMetaViewContent(eventId, context);
    void sendMetaServerEvent({
      eventName: 'ViewContent',
      eventId,
      context,
      customData: {
        content_name: 'instagram_landing',
        content_type: 'landing_page',
        page_id: context.pageId,
        messaging_channel: context.messagingChannel,
      },
    });
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleCalendlyEvent = (e: MessageEvent) => {
      if (e.data?.event !== 'calendly.event_scheduled') return;
      const context = getMetaContext();
      const eventId = createEventId('ig_schedule');
      trackEvent('calendly_booked', { source: 'instagram' });
      if (typeof window.fbq === 'function') {
        window.fbq(
          'track',
          'Schedule',
          compactPayload({
            content_name: 'instagram_demo_call',
            content_type: 'appointment',
            page_id: context.pageId,
            messaging_channel: context.messagingChannel,
          }),
          { eventID: eventId }
        );
      }
      void sendMetaServerEvent({
        eventName: 'Schedule' as 'ViewContent',
        eventId,
        context,
        customData: {
          content_name: 'instagram_demo_call',
          content_type: 'appointment',
          page_id: context.pageId,
          messaging_channel: context.messagingChannel,
        },
      });
    };
    window.addEventListener('message', handleCalendlyEvent);
    return () => window.removeEventListener('message', handleCalendlyEvent);
  }, []);

  const openCalendly = () => {
    setShowCalendly(true);
    trackEvent('cta_click', { location: 'page' });
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-neutral-100 font-[family-name:var(--font-lato)]">

      {showCalendly && (
        <PopupModal
          url={CALENDLY_URL}
          onModalClose={() => setShowCalendly(false)}
          open={showCalendly}
          rootElement={document.body}
        />
      )}

      {/* ══════════════════════════════════
          HERO
         ══════════════════════════════════ */}
      <section ref={heroRef} className="bg-neutral-900 px-6 pt-10 pb-12 sm:pt-14 sm:pb-14">
        <div className="max-w-lg mx-auto">

          <p className="text-center text-[12px] font-bold tracking-[0.2em] uppercase text-neutral-500 mb-8 font-[family-name:var(--font-montserrat)]">
            QuickLaunchWeb
          </p>

          <h1 className="text-[1.75rem] sm:text-[2.25rem] font-extrabold font-[family-name:var(--font-montserrat)] text-center leading-[1.2] text-white tracking-tight mb-5">
            We already built your website.
            <br />
            Want to see it?
          </h1>

          <div className="text-center space-y-1 mb-8">
            <p className="text-neutral-400 text-[15px]">15-minute call. We show you the site live.</p>
            <p className="text-neutral-400 text-[15px]">You like it? We launch it in 48 hours.</p>
            <p className="text-white text-[15px] font-semibold">$29 first month. No contracts. Cancel anytime.</p>
          </div>

          <button
            onClick={openCalendly}
            className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-[15px] font-bold font-[family-name:var(--font-montserrat)] py-4 rounded-lg transition-colors duration-150 flex items-center justify-center gap-2"
          >
            Book my free demo <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-center text-[11px] text-neutral-500 mt-3">
            Free call · No credit card · Takes 2 min to book
          </p>

          <div className="mt-8 pt-6 border-t border-neutral-800">
            <p className="text-center text-[13px] text-neutral-500">
              <span className="text-neutral-300">&ldquo;6 jobs from Google in the first month. Steady leads ever since.&rdquo;</span>
              <br className="sm:hidden" />
              <span className="sm:ml-1">&mdash; Juan, Landeros Electrical, Houston TX</span>
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          PROOF
         ══════════════════════════════════ */}
      <section className="px-6 py-12 sm:py-14">
        <div className="max-w-lg mx-auto">
          <p className="text-[12px] font-semibold tracking-[0.15em] uppercase text-neutral-400 mb-6">
            From contractors who were in your shoes
          </p>

          <div className="space-y-3">
            {[
              {
                quote: 'Business was up and down. Good weeks then dead weeks. They set up the site with tap-to-call buttons and we got 6 jobs from Google in the first month. Steady leads ever since.',
                name: 'Juan · Landeros Electrical · Houston, TX',
                result: '6 jobs in 30 days',
              },
              {
                quote: 'We were losing bids to guys doing worse work than us just because their website looked better. Customers judge you before they even call. Now we actually look professional and we\'re closing way more.',
                name: 'David · 3D Fencing · Houston, TX',
                result: 'Leads in the first week',
              },
              {
                quote: 'Tried making my own Wix site and it was a mess. Was embarrassed to send it to homeowners. Anthony turned it around in 2 days. Booked 4 solid painting jobs just from people finding the site.',
                name: 'Jamie · AN Painting Renovations · Houston, TX',
                result: '4 jobs from the site',
              },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-lg border border-neutral-200 p-5">
                <p className="text-[13px] sm:text-[14px] text-neutral-600 leading-relaxed mb-3">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[12px] text-neutral-400 min-w-0">{t.name}</p>
                  <span className="text-[10px] font-bold text-orange-700 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded whitespace-nowrap shrink-0 uppercase tracking-wider">
                    {t.result}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={openCalendly}
            className="w-full mt-8 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-[15px] font-bold font-[family-name:var(--font-montserrat)] py-4 rounded-lg transition-colors duration-150 flex items-center justify-center gap-2"
          >
            Book my free demo <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <div className="max-w-lg mx-auto px-6"><div className="h-px bg-neutral-200" /></div>

      {/* ══════════════════════════════════
          HOW IT WORKS
         ══════════════════════════════════ */}
      <section className="px-6 py-12 sm:py-14">
        <div className="max-w-lg mx-auto">
          <h2 className="text-lg sm:text-xl font-extrabold font-[family-name:var(--font-montserrat)] text-neutral-800 mb-1 tracking-tight">
            What happens on the call
          </h2>
          <p className="text-[13px] text-neutral-400 mb-8">
            No pitch. No slideshow. Just your site, live.
          </p>

          <div className="space-y-5">
            {[
              {
                num: '1',
                title: 'You see your site',
                desc: 'Your services, your area, a tap-to-call button that rings your phone. Already built.',
              },
              {
                num: '2',
                title: 'We fix what you want',
                desc: "Don't like something? We change it on the call. It ends up sounding like you wrote it.",
              },
              {
                num: '3',
                title: 'Say yes — live in 48 hours',
                desc: 'Send your logo and photos. We do the rest. Takes longer than 48 hours? First month free.',
              },
            ].map((s) => (
              <div key={s.num} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded bg-neutral-800 text-white flex items-center justify-center text-[13px] font-bold shrink-0">
                  {s.num}
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-neutral-800 mb-0.5 font-[family-name:var(--font-montserrat)]">{s.title}</h3>
                  <p className="text-[13px] text-neutral-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-lg mx-auto px-6"><div className="h-px bg-neutral-200" /></div>

      {/* ══════════════════════════════════
          PRICING
         ══════════════════════════════════ */}
      <section className="px-6 py-12 sm:py-14">
        <div className="max-w-lg mx-auto">
          <h2 className="text-lg sm:text-xl font-extrabold font-[family-name:var(--font-montserrat)] text-neutral-800 mb-1 tracking-tight">
            Everything included
          </h2>
          <p className="text-[13px] text-neutral-400 mb-6">
            No templates. No website builders. Custom-coded from scratch for your business.
          </p>

          <div className="bg-white rounded-lg border border-neutral-200 p-5 sm:p-6">
            <p className="text-[11px] font-bold font-[family-name:var(--font-montserrat)] tracking-[0.15em] uppercase text-neutral-400 mb-4">
              What this would cost you anywhere else
            </p>

            <div className="space-y-2.5 mb-5">
              {[
                { item: 'Custom-coded website (not a template)', value: '$3,000+' },
                { item: 'Mobile optimization + tap-to-call', value: '$500' },
                { item: 'Local SEO setup', value: '$1,500' },
                { item: 'Hosting, SSL, and security', value: '$300/yr' },
                { item: 'Unlimited updates and changes', value: '$200/mo' },
                { item: 'Lead capture forms', value: '$500' },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between gap-3">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-[13px] text-neutral-600">{row.item}</span>
                  </div>
                  <span className="text-[12px] text-neutral-300 line-through whitespace-nowrap shrink-0">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-neutral-100 pt-4 mb-5">
              <span className="text-[11px] font-bold font-[family-name:var(--font-montserrat)] tracking-[0.1em] uppercase text-neutral-400">Total value</span>
              <span className="text-[15px] text-neutral-300 line-through font-bold font-[family-name:var(--font-montserrat)]">$6,000+</span>
            </div>

            <div className="text-center">
              <p className="text-[12px] text-neutral-400 mb-1">You pay</p>
              <span className="text-4xl font-black font-[family-name:var(--font-montserrat)] text-neutral-900 tracking-tight">$29</span>
              <p className="text-[13px] font-semibold text-neutral-600 mt-1">first month</p>
              <p className="text-[12px] text-neutral-400 mt-0.5">then $99/mo · cancel anytime</p>

              <button
                onClick={openCalendly}
                className="w-full mt-5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-[15px] font-bold font-[family-name:var(--font-montserrat)] py-4 rounded-lg transition-colors duration-150 flex items-center justify-center gap-2"
              >
                Book my free demo <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            {[
              ['No contracts.', 'Cancel anytime. No fees.'],
              ['48-hour guarantee.', "We don't deliver? You don't pay."],
              ['The demo is free.', "Don't like it? Walk away."],
            ].map(([bold, rest], i) => (
              <div key={i} className="flex items-start gap-2.5">
                <Check className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-[12px] text-neutral-500"><span className="font-semibold text-neutral-700">{bold}</span> {rest}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-lg mx-auto px-6"><div className="h-px bg-neutral-200" /></div>

      {/* ══════════════════════════════════
          FAQ
         ══════════════════════════════════ */}
      <section className="px-6 py-12 sm:py-14">
        <div className="max-w-lg mx-auto">
          <h2 className="text-lg sm:text-xl font-extrabold font-[family-name:var(--font-montserrat)] text-neutral-800 mb-6 tracking-tight">
            Common questions
          </h2>
          <div className="space-y-2">
            {[
              {
                q: 'Why is the demo free?',
                a: "We build it upfront so you can see what you're getting before you spend a dollar. Don't like it? Say no and we go our separate ways.",
              },
              {
                q: "I'm busy. How much time does this take?",
                a: '15 minutes on the call. If you say yes, just send us your photos and services. We do the rest.',
              },
              {
                q: 'Am I locked into a contract?',
                a: 'No. Month-to-month. You stay because it makes you money, not because you signed something.',
              },
              {
                q: 'Is this a Wix or Squarespace template?',
                a: "No. Every site is custom-coded from scratch. No drag-and-drop builders. That's why our clients' sites load faster, rank higher on Google, and look like they paid $5,000 for them.",
              },
              {
                q: 'What does the $99/mo cover?',
                a: "Everything. Hosting, security, speed, updates, and local SEO. You don't touch a thing.",
              },
            ].map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-lg mx-auto px-6"><div className="h-px bg-neutral-200" /></div>

      {/* ══════════════════════════════════
          INLINE CALENDAR
         ══════════════════════════════════ */}
      <section ref={calendarRef} className="px-6 py-12 sm:py-14">
        <div className="max-w-lg mx-auto">
          <h2 className="text-lg sm:text-xl font-extrabold font-[family-name:var(--font-montserrat)] text-neutral-800 mb-1 tracking-tight">
            Pick a time
          </h2>
          <p className="text-[13px] text-neutral-400 mb-6">
            15 minutes. See the site. You decide.
          </p>

          <div className="rounded-lg overflow-hidden border border-neutral-200 bg-white">
            <InlineWidget
              url={CALENDLY_URL}
              styles={{ height: '700px', minWidth: '280px' }}
            />
          </div>

          <p className="text-center text-[11px] text-neutral-400 mt-4 max-w-sm mx-auto">
            By booking you agree to receive SMS confirmations from QuickLaunchWeb. Reply STOP to opt out.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════
          FINAL CTA
         ══════════════════════════════════ */}
      <section className="bg-neutral-900 px-6 py-12 sm:py-16">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-lg sm:text-xl font-extrabold font-[family-name:var(--font-montserrat)] text-white mb-3 tracking-tight leading-snug">
            Every day without a real website is a customer calling someone else.
          </h2>
          <p className="text-[14px] text-neutral-400 mb-6 max-w-sm mx-auto">
            The demo is free. The call is 15 minutes. Don&apos;t like it? Walk away.
          </p>
          <button
            onClick={openCalendly}
            className="w-full max-w-sm mx-auto bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-[15px] font-bold font-[family-name:var(--font-montserrat)] py-4 rounded-lg transition-colors duration-150 flex items-center justify-center gap-2"
          >
            Book my free demo <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <footer className="bg-neutral-900 text-center px-6 pb-24 pt-2 text-[11px] text-neutral-600">
        &copy; {new Date().getFullYear()} QuickLaunchWeb
      </footer>

      {/* ══════════════════════════════════
          STICKY BAR
         ══════════════════════════════════ */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-[env(safe-area-inset-bottom,8px)] pt-3 bg-neutral-900 border-t border-neutral-800"
          >
            <div className="max-w-lg mx-auto">
              <button
                onClick={openCalendly}
                className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-[14px] font-bold font-[family-name:var(--font-montserrat)] py-3.5 rounded-lg transition-colors duration-150 flex items-center justify-center gap-2"
              >
                Book my free demo <Phone className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// ─── FAQ ─────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-3.5 flex items-center justify-between text-left"
      >
        <span className="text-[13px] sm:text-[14px] font-semibold text-neutral-700 pr-4">{q}</span>
        <ChevronDown className={`w-4 h-4 text-neutral-300 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 text-[13px] text-neutral-500 leading-relaxed">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
