'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { GlassCard, GlassButton, GlassPill } from '@/components/ui/glass';
import { Check, ChevronDown, Star, Clock, Shield, ArrowRight, Zap, Eye, Wrench, Rocket } from 'lucide-react';
import { InlineWidget } from 'react-calendly';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';
const META_PAGE_ID = process.env.NEXT_PUBLIC_META_PAGE_ID || '';
const META_PIXEL_ENABLED = Boolean(META_PIXEL_ID);

const FAQS = [
  { q: 'Is there a catch? Why is the demo free?', a: 'There\'s no catch. We know contractors get pitched garbage all day. We just build the demo upfront so you can see exactly what you\'re getting before you pull out your credit card. If you don\'t like it, tell us no and we part ways.' },
  { q: 'I already have a website. Why would I switch?', a: 'Simple: is your current website actually making your phone ring? If it\'s just sitting there like a digital business card, it\'s useless. We build sites optimized for local SEO and phone calls. Plus, you\'re probably overpaying for it anyway.' },
  { q: 'I\'m busy on the job site. How much of my time will this take?', a: 'Almost none. We know you\'re busy. We just need 15 minutes on the demo call. If you give us the green light, just send us whatever photos you have and your list of services. We write the text and build the whole thing.' },
  { q: 'Am I going to be locked into some ridiculous contract?', a: 'No. We hate those too. It\'s month-to-month. No long-term contracts, no cancellation fees. You stay with us because the site is making you money, not because you signed a piece of paper.' },
  { q: 'What exactly am I paying $99/mo for?', a: 'Everything. We cover the hosting, the security, keeping it fast on mobile, making unlimited small updates (like adding new photos or services), and making sure the local SEO is dialed in. You literally don\'t have to touch it.' },
  { q: 'Do I have to write all the paragraphs and text for the site?', a: 'No way. We research your trade and write it all for you so it sounds professional and sells your services. Check it on the demo, and if you want something tweaked, we change it right then and there.' },
  { q: 'Are there any hidden fees later on?', a: 'Nope. It\'s $29 for the first month, then $99/mo after. That\'s it. Never any surprising "maintenance" bills or random hourly charges for simple updates.' },
  { q: 'What happens if I want to cancel later?', a: 'You just email us and say "cancel". It\'s your business. We host it on our servers to keep it fast and secure, so if you leave, we\'ll give you all your photos and content to take with you.' },
];

type TrackingPayload = Record<string, string>;

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
    return {
      eventSourceUrl: '',
      messagingChannel: 'instagram',
    };
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
  eventName: 'ViewContent' | 'Lead' | 'CompleteRegistration' | 'LeadSubmitted';
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

function trackEvent(event: string, data?: TrackingPayload) {
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

// ═══════════════════════════════════════════════
// ROI CALCULATOR
// ═══════════════════════════════════════════════

function ROICalculator() {
  const [avgTicket, setAvgTicket] = useState(2500);
  const [extraJobs, setExtraJobs] = useState(2);

  const monthlyCost = 99;
  const monthlyRevenue = avgTicket * extraJobs;
  const annualRevenue = monthlyRevenue * 12;
  const annualCost = monthlyCost * 12;
  const roi = Math.round(annualRevenue / annualCost);

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-[1.5rem] sm:text-[1.75rem] font-bold font-[family-name:var(--font-montserrat)] tracking-tight text-white leading-snug">
          Do The Math.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">It&apos;s Not Even Close.</span>
        </h2>
        <p className="text-[14px] text-white/50 mt-2">Slide to match your business.</p>
      </div>

      <GlassCard variant="elevated" className="p-6 sm:p-8 relative overflow-hidden bg-white/[0.04]">
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/15 blur-[50px] rounded-full" />

        <div className="relative space-y-6">
          {/* Avg Ticket Slider */}
          <div>
            <div className="flex justify-between items-baseline mb-3">
              <label className="text-[13px] text-white/60 font-medium">Your average job ticket</label>
              <span className="text-[20px] font-bold text-white font-[family-name:var(--font-montserrat)]">
                ${avgTicket.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={500}
              max={10000}
              step={250}
              value={avgTicket}
              onChange={(e) => setAvgTicket(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent
                [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(20,184,166,0.4)]
                [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white/20"
            />
            <div className="flex justify-between text-[10px] text-white/30 mt-1">
              <span>$500</span>
              <span>$10,000</span>
            </div>
          </div>

          {/* Extra Jobs Slider */}
          <div>
            <div className="flex justify-between items-baseline mb-3">
              <label className="text-[13px] text-white/60 font-medium">Extra jobs per month from website</label>
              <span className="text-[20px] font-bold text-white font-[family-name:var(--font-montserrat)]">
                {extraJobs}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={extraJobs}
              onChange={(e) => setExtraJobs(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent
                [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(20,184,166,0.4)]
                [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white/20"
            />
            <div className="flex justify-between text-[10px] text-white/30 mt-1">
              <span>1 job</span>
              <span>10 jobs</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10" />

          {/* Results */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-white/60">Extra monthly revenue</span>
              <span className="text-[16px] font-bold text-emerald-400 font-[family-name:var(--font-montserrat)]">
                +${monthlyRevenue.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-white/60">Extra annual revenue</span>
              <span className="text-[16px] font-bold text-emerald-400 font-[family-name:var(--font-montserrat)]">
                +${annualRevenue.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-white/60">Website cost</span>
              <span className="text-[14px] text-white/40 font-[family-name:var(--font-montserrat)]">
                −${annualCost.toLocaleString()}/yr
              </span>
            </div>
          </div>

          {/* ROI Callout */}
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 text-center">
            <p className="text-[13px] text-white/50 mb-1">Your website pays for itself</p>
            <p className="text-[2rem] font-black text-accent font-[family-name:var(--font-montserrat)] leading-none" style={{ textShadow: '0 0 20px rgba(20,184,166,0.3)' }}>
              {roi}x over
            </p>
            <p className="text-[12px] text-white/40 mt-2">
              Even <span className="text-white/70 font-semibold">1 extra job</span> covers {Math.ceil(avgTicket / monthlyCost)} months of your website.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

// ═══════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════

export default function InstagramLanding() {
  const calendarRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);

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

  const scrollToCalendar = () => {
    calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    trackEvent('cta_click', { location: 'page' });
  };

  return (
    <main className="min-h-screen bg-[#050507] overflow-x-hidden font-sans pb-10">
      {/* Ambient background glow — dialed down, slightly cooler blue/teal */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-40 mix-blend-screen"
          style={{ background: 'radial-gradient(ellipse at center, rgba(14,165,233,0.12), transparent 60%)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20 mix-blend-screen"
          style={{ background: 'radial-gradient(circle at center, rgba(16,185,129,0.08), transparent 50%)' }}
        />
      </div>

      {/* Subtle noise texture overlay for depth */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.018]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', mixBlendMode: 'overlay' }} />

      <div className="relative z-10">

        {/* ════════════════════════════════════
            SECTION 1 — HERO
           ════════════════════════════════════ */}
        <section ref={heroRef} className="px-5 pt-10 pb-12 sm:pt-16 sm:pb-16 max-w-[500px] mx-auto flex flex-col items-center">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            <span className="text-[15px] sm:text-[16px] font-bold tracking-widest uppercase font-[family-name:var(--font-montserrat)] opacity-90">
              <span className="text-white">Quick</span>
              <span className="text-accent">Launch</span>
              <span className="text-white">Web</span>
            </span>
          </motion.div>

          {/* Live indicator pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="flex justify-center mb-6"
          >
            <div className="px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-md flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent/60 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-accent text-[12px] font-semibold tracking-wide uppercase">Free 15-Min Demo</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-[2.25rem] sm:text-[2.75rem] font-bold text-center leading-[1.15] mb-4 font-[family-name:var(--font-montserrat)] tracking-tight text-white drop-shadow-sm"
          >
            We Built Your Website Already.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">Come See It.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-white/70 text-center text-[15px] sm:text-[16px] mb-8 leading-relaxed max-w-sm"
          >
            We already have a <strong className="text-white font-semibold">working demo</strong> for your type of business. See it live on a 15-minute call. Like it? We customize it to your brand and <strong className="text-white font-semibold">publish it in 48 hours</strong>. $0 upfront.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="w-full"
          >
            <GlassButton
              variant="primary"
              size="lg"
              onClick={scrollToCalendar}
              className="w-full text-[16px] font-bold py-[18px] shadow-[0_0_30px_rgba(20,184,166,0.2)] transition-shadow hover:shadow-[0_0_40px_rgba(20,184,166,0.3)]"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              See My Free Demo
            </GlassButton>
            <div className="flex justify-center items-center mt-4 gap-3 text-[12px] text-white/50 font-medium">
              <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-accent" />Free demo call</span>
              <span className="text-white/20">·</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-accent" />48hr or free</span>
              <span className="text-white/20">·</span>
              <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-accent" />No contracts</span>
            </div>
          </motion.div>

        </section>

        {/* Gradient divider */}
        <div className="mx-auto max-w-[200px] h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

        {/* ════════════════════════════════════
            SECTION 2 — PAIN CALLOUT (Hormozi-style)
           ════════════════════════════════════ */}
        <FadeInSection className="px-5 py-20 max-w-[500px] mx-auto relative">
          {/* Ambient section glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] h-[200px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(20,184,166,0.06), transparent 70%)' }} />
          <div className="text-center mb-8">
            <h2 className="text-[1.5rem] sm:text-[1.75rem] font-bold font-[family-name:var(--font-montserrat)] tracking-tight text-white leading-snug">
              Someone Googled your trade in your city today.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">They called your competitor.</span>
            </h2>
          </div>

          <div className="space-y-3">
            {[
              'You Google your own business and can\'t find yourself.',
              'Customers ask for your website and you send them a Facebook page.',
              'You\'ve paid someone $2K+ for a site that\'s never brought in a single call.',
              'You\'re losing bids to guys whose work is half as good — because they look more professional online.',
            ].map((pain, i) => (
              <div key={i} className="flex items-start gap-3 px-1">
                <span className="text-accent/70 mt-[3px] text-[18px] leading-none select-none shrink-0">→</span>
                <p className="text-[14px] sm:text-[15px] text-white/75 leading-relaxed">{pain}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center space-y-5">
            <p className="text-[16px] sm:text-[17px] font-bold text-white leading-snug">
              That&apos;s not a branding problem.{' '}
              <span className="text-accent">That&apos;s a revenue problem.</span>{' '}
              And it&apos;s fixable in 48 hours.
            </p>
            <GlassButton
              variant="primary"
              size="lg"
              onClick={scrollToCalendar}
              className="w-full text-[15px] font-bold py-4"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              See My Free Demo
            </GlassButton>
          </div>
        </FadeInSection>

        {/* Gradient divider */}
        <div className="mx-auto max-w-[200px] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        {/* ════════════════════════════════════
            SECTION 5 — PROOF / TESTIMONIALS (SCROLLABLE)
           ════════════════════════════════════ */}
        <FadeInSection className="pb-20">
          <div className="text-center mb-10 px-5">
            <h2 className="text-[1.5rem] sm:text-[1.75rem] font-bold mb-2 font-[family-name:var(--font-montserrat)] tracking-tight text-white">
              They Had The Same Problem You Have Right Now
            </h2>
            <p className="text-[15px] text-white/60 max-w-sm mx-auto leading-relaxed">
              Here&apos;s what happened after they booked the demo. Swipe &rarr;
            </p>
          </div>

          {/* Horizontal scroll container */}
          <div
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pl-5 pr-5 pb-4 no-scrollbar"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {[
              {
                text: 'was paying some seo guy 250 a month for a website that looked honestly like crap. zero calls from it. decided to go with Anthony because hes local and it was the best choice. he actually cared and worked with us 1:1 to get exactly what we wanted. dude was available 24/7 to answer questions. got 3 real jobs from google in the first month. highly recommend',
                name: 'Jose',
                company: 'Elite Home Repairs',
                role: 'Home Remodeling · Houston, TX',
                url: 'https://elitehomerepairs.us',
                stat: '3 new jobs from Google in 30 days',
                logo: '/logos/elitehomerepairs.png',
              },
              {
                text: 'really glad i found them. we were just doing word of mouth and facebook groups before. Anthony met with us 1 on 1 to figure out what we needed. now when people search pressure washing near me we actually show up. getting quote requests straight to my email every few days now without doing anything.',
                name: 'Blake',
                company: 'Made New Pressure Washing',
                role: 'Pressure Washing · Houston, TX',
                url: 'https://madenewpressurewashing.com',
                stat: 'Ranking on Google in weeks',
                logo: '/logos/madenewpressure.svg',
              },
              {
                text: 'we had a site but it didnt even have a way for people to call us from their phone easily... Anthony built us a whole new site in like 2 days. loved that hes local and actually cared about my business. phone definitely rings more now. should have just done this a year ago tbh.',
                name: 'Juan',
                company: 'JN Ornamental Design',
                role: 'Fencing & Fabrication · Houston, TX',
                url: 'https://jnornamentaldesign.com',
                stat: '40% more calls in week one',
                logo: '/logos/jnornamentaldesign.svg',
              },
              {
                text: 'man we were losing bids to guys doing worse work than us just cause their website looked better. customers judge u before they even call. Anthony worked with me 1:1 and was literally replying to me 24/7 to get the design exactly how I wanted. quicklaunch gave us a site that actually looks professional. closing way more people now',
                name: 'David',
                company: '3D Fencing',
                role: 'Fencing Contractor · Houston, TX',
                url: 'https://3dfencing.com',
                stat: 'Leads within the first week',
                logo: '/logos/3dfencing.png',
              },
              {
                text: 'Tried making my own wix site and it was a mess. was honestly embarrassed to send it to homeowners. went with anthony cause hes local and u can tell he actually cares. turned it around in 2 days and it looks super clean. booked 4 solid painting jobs just from people finding the site so far',
                name: 'Jamie',
                company: 'AN Painting Renovations',
                role: 'Painting & Renovation · Houston, TX',
                url: 'https://anpaintingrenovations.com',
                stat: '4 jobs booked from website',
                logo: '/logos/anpaintingrenovations.png',
              },
              {
                text: 'had absolutely nothing for my tree service just a facebook page. Anthony is the man, completely hands on 1:1 process and answered my texts 24/7. they built me a site that actually shows up when people search in baytown... went from basically invisible online to getting a few calls a week. best investment ive made for the business',
                name: 'Cristian',
                company: 'Jimenez Tree Pro',
                role: 'Tree & Junk Removal · Baytown, TX',
                url: 'https://jimeneztreepro.com',
                stat: 'Calls every week from Google',
                logo: '/logos/jimenezjunkremoval.png',
              },
              {
                text: 'business was too up and down. good weeks then dead weeks. needed people to find us when they needed an electrician fast. Loved working with Anthony since he\'s local. he really took the time to understand what we needed 1:1. they set up the site with tap to call buttons and its been steady leads from google since',
                name: 'Juan',
                company: 'Landeros Electrical',
                role: 'Electrical Contractor · Houston, TX',
                url: 'https://landeroselectrical.com',
                stat: 'Steady leads from Google',
                logo: '/logos/landeroselectrical.png',
              },
              {
                text: 'In real estate everyone looks the same. needed something that made us look like top producers in our area. even though hes out of state, anthony felt like he was right down the street. incredible communication and super responsive 24/7. the site he built captures leads instantly instead of losing them to zillow. got 3 new listings directly from the site!',
                name: 'Jack',
                company: 'The Toro Group Corp',
                role: 'Real Estate Team · San Dimas, CA',
                url: 'https://soldbytoro.com',
                stat: '3 new listings from website',
                logo: '/logos/jacksoldbytoro.png',
              },
              {
                text: 'our old site looked super cheap compared to the actual jewelry we sell... people literally told us that. Anthony worked with us 1:1 and he was so patient and actually cared about getting it perfect. definitely seeing more foot traffic from people finding us online first.',
                name: 'Tomi',
                company: 'Tomi Jewelry',
                role: 'Jewelry Store · Houston, TX',
                url: 'https://tomijewelry.com',
                stat: 'More foot traffic from Google',
                logo: '/logos/tomi.png',
              },
              {
                text: 'was running my whole business out of instagram DMs which was getting annoying. quick launch got me set up fast. was worried about hiring someone out of state but anthony was awesome. crazy communicative and basically available 24/7 whenever I had a question. we show up for local searches now and had 12 inquiries come in last month. process was super easy too',
                name: 'Brian',
                company: 'Becreativesco',
                role: 'Marketing & Branding · Boston, MA',
                url: 'https://becreativesco.com',
                stat: '12 new inquiries in 6 weeks',
                logo: '/logos/becreativesco.jpg',
              },
            ].map((t, i) => (
              <div
                key={i}
                className="flex-none w-[85vw] max-w-[340px] snap-start"
              >
                <GlassCard className="p-5 h-full flex flex-col transition-all duration-300 active:scale-[0.98]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 text-[#Fbbc04] fill-[#Fbbc04]" />
                      ))}
                    </div>
                    <span className="text-[9px] font-bold text-accent bg-accent/10 border border-accent/20 px-1.5 py-0.5 rounded-sm uppercase tracking-wider leading-tight">{t.stat}</span>
                  </div>

                  <p className="text-[13px] sm:text-[14px] text-white/80 leading-relaxed italic mb-auto pb-4 flex-1">"{t.text}"</p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      {t.logo ? (
                        <div className="h-8 w-auto max-w-[90px] flex items-center justify-start shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={t.logo} alt={t.company} className="max-h-full max-w-full object-contain drop-shadow-sm" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[12px] font-bold text-white shrink-0">
                          {t.name[0]}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-white text-[12px]">{t.name}</p>
                        <p className="text-[10px] text-white/45">{t.role}</p>
                      </div>
                    </div>
                    <a href={`https://${t.url.replace('https://', '')}`} target="_blank" rel="noopener noreferrer" className="text-[11px] text-accent font-medium flex items-center gap-1 hover:underline shrink-0">
                      View <ArrowRight className="w-3 h-3 -rotate-45" />
                    </a>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* Gradient divider */}
        <div className="mx-auto max-w-[200px] h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent" />

        {/* ════════════════════════════════════
            SECTION 3 — WHAT HAPPENS ON THE CALL
           ════════════════════════════════════ */}
        <FadeInSection className="px-5 py-20 max-w-[500px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-[1.5rem] sm:text-[1.75rem] font-bold mb-3 font-[family-name:var(--font-montserrat)] tracking-tight text-white">
              Here&apos;s What Happens In 15 Minutes
            </h2>
            <p className="text-[15px] text-white/60 max-w-sm mx-auto leading-relaxed">
              No pitch deck. No slideshow. You see a real website — built for your business — live on the call.
            </p>
          </div>

          <div className="relative pl-14">
            {/* Vertical timeline line with glow */}
            <div className="absolute left-[19px] top-2 bottom-8 w-[2px] bg-gradient-to-b from-accent/50 via-accent/20 to-transparent shadow-[0_0_8px_rgba(20,184,166,0.3)]" />

            {[
              {
                icon: Eye,
                title: 'You See Your Business On A Real Site',
                desc: 'Not a template. A working site with your services, your area, and a tap-to-call button that actually rings your phone.',
              },
              {
                icon: Wrench,
                title: 'We Dial It In Together',
                desc: "Don't like the headline? We change it live. Want to add a service? Done. You walk away with a site that sounds like you wrote it.",
              },
              {
                icon: Rocket,
                title: 'Say Yes → Live in 48 Hours',
                desc: 'Send us your logo and photos. We handle everything else. If it takes longer than 48 hours, your first month is free.',
              },
            ].map((step, i) => (
              <div key={i} className="relative pb-10 last:pb-0">
                <div className="absolute -left-14 top-0 z-10 w-[40px] h-[40px] rounded-full bg-[#0a0a0f] border border-accent/30 flex items-center justify-center shadow-[0_0_15px_rgba(20,184,166,0.15)]">
                  <step.icon className="w-4 h-4 text-accent" />
                </div>
                <div className="pl-4">
                  <p className="text-[11px] text-accent font-bold uppercase tracking-widest mb-1 font-[family-name:var(--font-montserrat)]">Step {i + 1}</p>
                  <h3 className="font-bold text-[16px] text-white font-[family-name:var(--font-montserrat)] mb-1.5">{step.title}</h3>
                  <p className="text-[13px] text-white/50 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* Gradient divider */}
        <div className="mx-auto max-w-[200px] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        {/* ════════════════════════════════════
            SECTION 4 — PRICING + BONUS + GUARANTEE
           ════════════════════════════════════ */}
        <FadeInSection className="px-5 py-20 max-w-[500px] mx-auto relative">
          {/* Ambient pricing glow */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[250px] h-[150px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(251,191,36,0.04), transparent 70%)' }} />
          <div className="relative text-center mb-8">
            <h2 className="text-[1.5rem] sm:text-[1.75rem] font-bold font-[family-name:var(--font-montserrat)] tracking-tight text-white">
              Here&apos;s What You&apos;re Getting
            </h2>
            <p className="text-[14px] text-white/50 mt-2">And what you&apos;d pay for it anywhere else.</p>
          </div>

          {/* Pricing Box */}
          <GlassCard variant="elevated" className="p-6 sm:p-8 mb-4 relative overflow-hidden bg-white/[0.04]">
            {/* Subtle light burst in background */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/20 blur-[50px] rounded-full"></div>

            <div className="relative">
              {/* Value Stack */}
              <p className="text-[12px] text-white/40 uppercase tracking-widest font-bold mb-5">What this costs everywhere else</p>
              <div className="space-y-3 mb-6">
                {[
                  { item: 'Custom-coded website (not a template)', value: '$3,000–5,000' },
                  { item: 'Mobile optimization + tap-to-call', value: '$500' },
                  { item: 'Local SEO so Google finds you', value: '$1,500' },
                  { item: 'Hosting, SSL \u0026 security (yearly)', value: '$300' },
                  { item: 'Ongoing updates \u0026 support (monthly)', value: '$200' },
                  { item: 'Quote request forms + lead capture', value: '$500' },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-5 h-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      <span className="text-[13px] sm:text-[14px] text-white/80">{row.item}</span>
                    </div>
                    <span className="text-[12px] text-white/30 line-through whitespace-nowrap shrink-0">{row.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4 mb-6">
                <span className="text-[12px] text-white/50 uppercase tracking-widest font-bold">Total value</span>
                <span className="text-[16px] text-white/40 line-through font-bold font-[family-name:var(--font-montserrat)]">$5,800+</span>
              </div>

              <div className="relative rounded-xl overflow-hidden">
                {/* Animated gold border glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/20 via-yellow-400/30 to-amber-500/20 blur-[1px]" />
                <div className="relative bg-[#0a0a0f] rounded-xl p-6 m-[1px]">
                  {/* Founders badge */}
                  <div className="flex justify-center mb-4">
                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-amber-500/15 to-yellow-400/15 border border-amber-400/30 text-amber-400 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] shadow-[0_0_15px_rgba(251,191,36,0.1)]">
                      <Zap className="w-3 h-3 fill-amber-400" />
                      Founders Rate
                    </div>
                  </div>

                  <div className="text-center mb-5 border-b border-white/5 pb-4">
                    <p className="text-[14px] sm:text-[15px] text-white/90 font-medium leading-relaxed">
                      See the live demo on our 15-min call. If you love it and want to go forward, it&apos;s just:
                    </p>
                  </div>

                  <div className="flex items-baseline justify-center mb-1">
                    <span className="text-[4rem] sm:text-[4.5rem] font-black text-white leading-none font-[family-name:var(--font-montserrat)] tracking-tighter" style={{ textShadow: '0 0 40px rgba(255,255,255,0.15)' }}>$29</span>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-1.5 mb-6">
                    <p className="text-white/80 text-[15px] font-bold">for your first month</p>
                    <p className="text-white/40 text-[13px] font-medium tracking-wide uppercase">then $99/mo <span className="px-1.5">·</span> cancel anytime</p>
                  </div>

                  <div className="relative bg-gradient-to-b from-amber-400/10 to-transparent border border-amber-400/20 rounded-xl px-5 py-4 text-center overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
                    <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-white/80">
                      Less than the cost of <span className="text-amber-400 font-bold drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">one shared lead on Angi</span> &mdash; for an entire website system that generates exclusive calls for you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          <div className="mt-6 space-y-4">
            <div className="flex gap-3 items-start">
              <Shield className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-[14px] text-white font-semibold">No Contracts. Cancel Anytime.</p>
                <p className="text-[13px] text-white/45 leading-relaxed">No cancellation fees, no hoops. Walk away whenever you want.</p>
              </div>
            </div>
            <div className="w-full h-px bg-white/5" />
            <div className="flex gap-3 items-start">
              <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-[14px] text-white font-semibold">48-Hour Launch — Or Your First Month Is Free</p>
                <p className="text-[13px] text-white/45 leading-relaxed">Send us your logo and photos. If we don&apos;t have your site live in 48 hours, you don&apos;t pay.</p>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Gradient divider */}
        <div className="mx-auto max-w-[200px] h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent" />

        {/* ════════════════════════════════════
            SECTION — ROI CALCULATOR
           ════════════════════════════════════ */}
        <FadeInSection className="px-5 py-20 max-w-[500px] mx-auto">
          <ROICalculator />
        </FadeInSection>

        {/* ════════════════════════════════════
            SECTION 6 — CALENDAR PLACEHOLDER
           ════════════════════════════════════ */}
        <div ref={calendarRef} className="px-5 pb-20 max-w-[500px] mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-[1.5rem] sm:text-[1.75rem] font-bold mb-3 font-[family-name:var(--font-montserrat)] tracking-tight text-white">
              Book Your Demo Call
            </h2>
            <p className="text-[15px] text-white/60 leading-relaxed max-w-sm mx-auto">
              Pick a time below. We&apos;ll show the demo live, and you decide.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/10">
            <div style={{ overflow: 'hidden', position: 'relative' }}>
              <div style={{ marginRight: '-20px', paddingRight: '20px', overflow: 'hidden' }}>
                <InlineWidget
                  url="https://calendly.com/quicklaunchweb/15min"
                  styles={{ height: '750px', minWidth: '280px' }}
                  pageSettings={{
                    backgroundColor: '0a0a0f',
                    textColor: 'ffffff',
                    primaryColor: '14b8a6',
                    hideGdprBanner: true,
                    hideEventTypeDetails: false,
                    hideLandingPageDetails: false,
                  }}
                />
              </div>
            </div>
          </div>

          <p className="text-center text-[11px] text-white/30 mt-5 leading-relaxed max-w-sm mx-auto">
            By booking, you agree to receive SMS confirmations and follow-ups from QuickLaunchWeb. Msg &amp; data rates may apply. Reply STOP to opt out anytime.
          </p>
        </div>

        {/* ════════════════════════════════════
            SECTION 7 — FAQ
           ════════════════════════════════════ */}
        <FadeInSection className="px-5 pb-20 max-w-[500px] mx-auto">
          <h2 className="text-[1.5rem] sm:text-[1.75rem] font-bold text-center mb-8 font-[family-name:var(--font-montserrat)] tracking-tight text-white">
            Still Not Sure?
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </FadeInSection>

        {/* ════════════════════════════════════
            SECTION 8 — FINAL CTA
           ════════════════════════════════════ */}
        <div className="px-5 pt-4 pb-24 sm:pb-32 max-w-[500px] mx-auto text-center">
          <h2 className="text-[1.75rem] sm:text-[2rem] font-bold mb-4 font-[family-name:var(--font-montserrat)] tracking-tight text-white leading-[1.2]">
            Every Day Without A Real Website Is Money Left On The Table.
          </h2>
          <p className="text-[15px] text-white/60 mb-8 leading-relaxed max-w-sm mx-auto">
            The demo is free. The call is 15 minutes. And if you don&apos;t like what you see, you walk away. Zero risk.
          </p>
          <GlassButton
            variant="primary"
            size="lg"
            onClick={scrollToCalendar}
            className="w-full text-[16px] font-bold py-[18px] shadow-[0_0_20px_rgba(20,184,166,0.15)]"
            icon={<ArrowRight className="w-5 h-5" />}
          >
            See My Free Demo
          </GlassButton>
        </div>

      </div>

      <footer className="relative z-10 text-center px-5 pb-8 text-[11px] text-white/30 uppercase tracking-widest font-medium">
        &copy; {new Date().getFullYear()} QuickLaunchWeb
      </footer>

      {/* ════════════════════════════════════
          STICKY CTA BAR
         ════════════════════════════════════ */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-[env(safe-area-inset-bottom,12px)] pt-3 bg-black/80 backdrop-blur-xl border-t border-white/10"
          >
            <div className="max-w-[500px] mx-auto">
              <GlassButton
                variant="primary"
                size="lg"
                onClick={scrollToCalendar}
                className="w-full text-[15px] font-bold py-4"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                See My Free Demo
              </GlassButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// ─── Helper Components ──────────────────────

function FadeInSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <GlassCard className="overflow-hidden transition-all duration-200 active:scale-[0.98] hover:border-white/15">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between text-left"
      >
        <span className="text-[14px] sm:text-[15px] font-bold text-white/90 pr-4">{q}</span>
        <ChevronDown className={`w-4 h-4 text-white/40 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
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
            <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-[13px] sm:text-[14px] text-white/60 leading-relaxed pt-1">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}
