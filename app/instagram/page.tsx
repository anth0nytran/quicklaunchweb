'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { GlassCard, GlassButton, GlassInput, GlassPill } from '@/components/ui/glass';
import { Check, ChevronDown, Star, Clock, Shield, ArrowRight, Phone, Mail, Building2, User } from 'lucide-react';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';
const META_PAGE_ID = process.env.NEXT_PUBLIC_META_PAGE_ID || '';
const META_PIXEL_ENABLED = Boolean(META_PIXEL_ID);

/* ─────────────────────────────────────────────
   META PIXEL — paste your pixel script in layout
   or add it here inside a <Script> tag:

   import Script from 'next/script';
   <Script id="fb-pixel" strategy="afterInteractive">
     {`!function(f,b,e,v,n,t,s)...`}
   </Script>
   ───────────────────────────────────────────── */

const BUSINESS_TYPES = [
  'Home Services',
  'Restaurant / Bar',
  'Retail',
  'Beauty / Salon',
  'Auto / Mechanic',
  'Real Estate',
  'Medical / Dental',
  'Fitness / Gym',
  'Other',
] as const;

const FAQS = [
  { q: 'What does $99/mo actually include?', a: 'A custom-built website (not a template), hosting, SSL, mobile optimization, local SEO foundation, a lead capture form, tap-to-call, and ongoing support. The build fee is waived — you only pay hosting + support.' },
  { q: 'What if I don\'t like the mockup?', a: 'Then you walk away. The mockup is 100% free. If it\'s not what you want, you owe nothing. No credit card is taken upfront.' },
  { q: 'How is this so cheap compared to agencies?', a: 'Agencies charge $3-5k upfront because they\'re slow. We\'ve built systems that let us move fast without cutting corners. No bloated overhead, no endless revisions meetings. Just good work, fast.' },
  { q: 'Can I make changes after my site goes live?', a: 'Starter includes 1 content update/month, Pro includes 3. You can also add unlimited edits for $49/mo. We handle everything — you never touch code.' },
];

// ─── Analytics helpers ──────────────────────
const INITIAL_FORM_STATE = {
  name: '',
  business: '',
  phone: '',
  email: '',
  type: '',
};

type FormState = typeof INITIAL_FORM_STATE;
type FormFieldKey = keyof FormState;
type ValidationMode = 'live' | 'submit';

const REQUIRED_FIELDS = ['name', 'business', 'phone', 'email'] as const;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_ALLOWED_PATTERN = /^[\d\s\-\(\)\+]*$/;

function formatPhoneInput(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (!digits) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)})-${digits.slice(3)}`;
  return `(${digits.slice(0, 3)})-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function validateField(field: FormFieldKey, value: string, mode: ValidationMode = 'live'): string {
  const trimmed = value.trim();

  if (field === 'type') return '';

  if (!trimmed) {
    if (mode === 'submit') {
      if (field === 'name') return 'Please enter your name.';
      if (field === 'business') return 'Please enter your business name.';
      if (field === 'phone') return 'Please enter your phone number.';
      if (field === 'email') return 'Please enter your email.';
    }
    return '';
  }

  if (field === 'name' && trimmed.length < 2) {
    return mode === 'submit' ? 'Name looks too short.' : '';
  }

  if (field === 'business' && trimmed.length < 2) {
    return mode === 'submit' ? 'Business name looks too short.' : '';
  }

  if (field === 'phone') {
    if (!PHONE_ALLOWED_PATTERN.test(trimmed)) {
      return 'Use numbers and symbols like + ( ) - only.';
    }

    const digits = trimmed.replace(/\D/g, '');
    if (digits.length < 10) {
      return mode === 'submit' ? 'Please enter a complete 10-digit phone number.' : '';
    }
    if (digits.length > 10) return 'Use a 10-digit phone number.';
  }

  if (field === 'email' && !EMAIL_PATTERN.test(trimmed)) {
    return mode === 'submit' ? 'Enter a valid email address.' : '';
  }

  return '';
}

type TrackingPayload = Record<string, string>;

type MetaContext = {
  eventSourceUrl: string;
  fbp?: string;
  fbc?: string;
  fbclid?: string;
  externalId?: string;
  pageId?: string;
  messagingChannel: string;
};

type LeadEventIds = {
  leadEventId: string;
  completeRegistrationEventId: string;
  leadSubmittedEventId: string;
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

function getMetaContext(form?: FormState): MetaContext {
  if (typeof window === 'undefined') {
    return {
      eventSourceUrl: '',
      messagingChannel: 'instagram',
    };
  }

  const query = new URLSearchParams(window.location.search);
  const fbclid = query.get('fbclid') || undefined;
  const emailPart = form?.email?.trim().toLowerCase() || '';
  const phonePart = form?.phone?.replace(/\D/g, '') || '';

  return {
    eventSourceUrl: window.location.href,
    fbp: getCookieValue('_fbp') || undefined,
    fbc: getCookieValue('_fbc') || buildFbcFromFbclid(fbclid),
    fbclid,
    externalId:
      emailPart || phonePart
        ? `${emailPart || 'no_email'}|${phonePart || 'no_phone'}|instagram`
        : undefined,
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

function trackMetaLeadEvents(eventIds: LeadEventIds, context: MetaContext, businessType: string) {
  if (typeof window.fbq !== 'function') return;

  const payload = compactPayload({
    content_name: 'instagram_lead_form',
    content_type: 'lead_form',
    business_type: businessType || 'Not specified',
    page_id: context.pageId,
    messaging_channel: context.messagingChannel,
  });

  window.fbq('track', 'Lead', payload, { eventID: eventIds.leadEventId });
  window.fbq(
    'track',
    'CompleteRegistration',
    payload,
    { eventID: eventIds.completeRegistrationEventId }
  );
  window.fbq(
    'trackCustom',
    'LeadSubmitted',
    payload,
    { eventID: eventIds.leadSubmittedEventId }
  );
}

function trackEvent(event: string, data?: TrackingPayload) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[IG Landing] ${event}`, data);
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', event, data || {});
  }
}

// ─── UTM capture ────────────────────────────
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
// MAIN PAGE
// ═══════════════════════════════════════════════

export default function InstagramLanding() {
  const formRef = useRef<HTMLFormElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const formStartTime = useRef<number>(Date.now());
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});
  const [showSticky, setShowSticky] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState<FormState>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Partial<Record<FormFieldKey, boolean>>>({});
  const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const capturedUtms = getUtmParams();
    setUtmParams(capturedUtms);
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
        ...capturedUtms,
      },
    });
  }, []);

  useEffect(() => {
    if (!heroRef.current || submitted) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [submitted]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const close = () => setDropdownOpen(false);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [dropdownOpen]);

  const updateField = useCallback((field: FormFieldKey, value: string) => {
    const sanitizedValue =
      field === 'phone' ? formatPhoneInput(value) : value;

    setForm((prev) => ({ ...prev, [field]: sanitizedValue }));
    setErrors((prev) => {
      const shouldValidate = hasSubmittedOnce || !!touched[field];
      return {
        ...prev,
        form: '',
        [field]: shouldValidate ? validateField(field, sanitizedValue, 'live') : '',
      };
    });
  }, [hasSubmittedOnce, touched]);

  const handleFieldBlur = useCallback((field: FormFieldKey) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const mode: ValidationMode = hasSubmittedOnce ? 'submit' : 'live';
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, form[field], mode),
    }));
  }, [form, hasSubmittedOnce]);

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    for (const field of REQUIRED_FIELDS) {
      const message = validateField(field, form[field], 'submit');
      if (message) nextErrors[field] = message;
    }

    setTouched((prev) => ({
      ...prev,
      name: true,
      business: true,
      phone: true,
      email: true,
    }));
    setErrors(nextErrors);

    return {
      isValid: Object.keys(nextErrors).length === 0,
      nextErrors,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmittedOnce(true);
    const { isValid, nextErrors } = validate();
    if (!isValid) {
      trackEvent('form_validation_error', nextErrors);
      return;
    }
    setLoading(true);
    trackEvent('form_submit_attempt');

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);
      const businessTypeValue = form.type || 'Not specified';
      const metaContext = getMetaContext(form);
      const leadEventIds: LeadEventIds = {
        leadEventId: createEventId('ig_lead'),
        completeRegistrationEventId: createEventId('ig_complete_registration'),
        leadSubmittedEventId: createEventId('ig_lead_submitted'),
      };

      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        business_name: form.business,
        business_type: businessTypeValue,
        source: 'instagram_landing',
        _ts: formStartTime.current?.toString() || '',
        meta: {
          ...metaContext,
          ...leadEventIds,
        },
        ...utmParams,
      };

      const res = await fetch('/api/instagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (res.ok) {
        setSubmitted(true);
        trackEvent('form_submit_success', { business_type: businessTypeValue });
        if (META_PIXEL_ENABLED) {
          trackMetaLeadEvents(leadEventIds, metaContext, businessTypeValue);
        }
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      setErrors((prev) => ({ ...prev, form: 'Something went wrong. Try again.' }));
      trackEvent('form_submit_error');
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    trackEvent('sticky_cta_click');
  };

  return (
    <main className="min-h-screen bg-[#050507] overflow-x-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] opacity-50"
          style={{ background: 'radial-gradient(ellipse at center, rgba(20,184,166,0.15), transparent 70%)' }}
        />
      </div>

      <div className="relative z-10">

        {/* ════════════════════════════════════
            HERO — FORM FIRST
           ════════════════════════════════════ */}
        <section ref={heroRef} className="relative z-30 px-5 pt-10 pb-6 sm:pt-14 sm:pb-10 max-w-md mx-auto">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-5"
          >
            <span className="text-lg font-bold tracking-tight font-[family-name:var(--font-montserrat)]">
              <span className="text-white">Quick</span>
              <span className="text-accent">Launch</span>
              <span className="text-white">Web</span>
            </span>
          </motion.div>

          {/* Urgency */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="flex justify-center mb-4"
          >
            <GlassPill variant="warning" pulse>
              Only taking 5 more clients this month
            </GlassPill>
          </motion.div>

          {/* Headline — pain point driven */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="text-[1.65rem] sm:text-[1.85rem] font-bold text-center leading-[1.2] mb-2.5 font-[family-name:var(--font-montserrat)] text-white"
          >
            You&apos;re losing customers right now
            <span className="text-accent"> because your website sucks.</span>
          </motion.h1>

          {/* Sub copy — direct, not fluffy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="text-white/70 text-center text-[15px] mb-5 max-w-xs mx-auto leading-relaxed"
          >
            We&apos;ll build you a free custom mockup in 24 hours. If you like it, we will move forward to the next steps. If not, walk away.
          </motion.p>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="flex items-center justify-center gap-3 mb-6 text-[13px]"
          >
            <span className="flex items-center gap-1 text-white/60">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span className="text-white/90 font-semibold">5.0</span>
              rated by local businesses
            </span>
            <span className="w-px h-3.5 bg-white/15" />
            <span className="flex items-center gap-1 text-white/60">
              <Clock className="w-3.5 h-3.5 text-accent" />
              48hr launch
            </span>
          </motion.div>

          {/* ── THE FORM ── */}
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="relative z-40 overflow-visible"
              >
                <GlassCard variant="elevated" className="relative overflow-visible p-5 sm:p-6">
                  <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-3">

                    <FormField icon={User} error={errors.name}>
                      <GlassInput
                        type="text"
                        placeholder="Your name *"
                        value={form.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        onBlur={() => handleFieldBlur('name')}
                        onFocus={() => trackEvent('field_focus', { field: 'name' })}
                        error={!!errors.name}
                        className="pl-10 py-3.5 text-[16px]"
                        autoComplete="name"
                        required
                      />
                    </FormField>

                    <FormField icon={Building2} error={errors.business}>
                      <GlassInput
                        type="text"
                        placeholder="Business name *"
                        value={form.business}
                        onChange={(e) => updateField('business', e.target.value)}
                        onBlur={() => handleFieldBlur('business')}
                        onFocus={() => trackEvent('field_focus', { field: 'business' })}
                        error={!!errors.business}
                        className="pl-10 py-3.5 text-[16px]"
                        autoComplete="organization"
                        required
                      />
                    </FormField>

                    <FormField icon={Phone} error={errors.phone}>
                      <GlassInput
                        type="tel"
                        placeholder="(555)-123-4567 *"
                        value={form.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        onBlur={() => handleFieldBlur('phone')}
                        onFocus={() => trackEvent('field_focus', { field: 'phone' })}
                        error={!!errors.phone}
                        className="pl-10 py-3.5 text-[16px]"
                        autoComplete="tel"
                        inputMode="tel"
                        maxLength={14}
                        required
                      />
                    </FormField>

                    <FormField icon={Mail} error={errors.email}>
                      <GlassInput
                        type="email"
                        placeholder="Email *"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        onBlur={() => handleFieldBlur('email')}
                        onFocus={() => trackEvent('field_focus', { field: 'email' })}
                        error={!!errors.email}
                        className="pl-10 py-3.5 text-[16px]"
                        autoComplete="email"
                        required
                      />
                    </FormField>

                    {/* Business Type dropdown */}
                    <div>
                      <div className="relative z-[70]" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => { setDropdownOpen(!dropdownOpen); trackEvent('field_focus', { field: 'type' }); }}
                          className={`
                            w-full rounded-xl border bg-white/[0.03] backdrop-blur-sm
                            px-4 py-3.5 text-[16px] text-left flex items-center justify-between
                            transition-all duration-200
                            border-white/[0.08] hover:border-white/[0.15]
                            ${dropdownOpen ? 'border-accent/50 bg-white/[0.05] ring-2 ring-accent/20' : ''}
                            ${form.type ? 'text-white' : 'text-white/40'}
                          `}
                        >
                          <span>{form.type || 'Type of business (optional)'}</span>
                          <ChevronDown className={`w-4 h-4 text-white/40 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {dropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -4, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -4, scale: 0.98 }}
                              transition={{ duration: 0.15 }}
                              className="absolute z-[90] top-full mt-1.5 left-0 right-0 rounded-xl border border-white/[0.12] bg-[rgba(12,12,16,0.98)] backdrop-blur-xl shadow-2xl overflow-hidden max-h-[280px] overflow-y-auto"
                            >
                              {BUSINESS_TYPES.map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  onClick={() => { updateField('type', type); setDropdownOpen(false); }}
                                  className={`
                                    w-full px-4 py-3 text-left text-[15px] transition-colors
                                    ${form.type === type ? 'text-accent bg-accent/10' : 'text-white/80 hover:bg-white/[0.06] hover:text-white'}
                                  `}
                                >
                                  {type}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <p className="text-white/50 text-xs ml-1">* Required fields</p>

                    {errors.form && (
                      <p className="text-red-400 text-sm text-center py-1">{errors.form}</p>
                    )}

                    <GlassButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      loading={loading}
                      className="w-full text-base font-bold py-4 mt-1"
                      icon={!loading ? <ArrowRight className="w-5 h-5" /> : undefined}
                    >
                      {loading ? 'Sending...' : 'Get My Free Mockup'}
                    </GlassButton>

                    <div className="flex items-center justify-center gap-4 pt-1 text-[11px] text-white/45">
                      <span className="flex items-center gap-1">
                        <Shield className="w-3 h-3" /> No credit card needed
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Ready in 24hrs
                      </span>
                    </div>

                    {/* UTM params sent via JSON payload */}
                  </form>
                </GlassCard>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <GlassCard variant="elevated" className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-5"
                  >
                    <Check className="w-8 h-8 text-green-400" />
                  </motion.div>
                  <h2 className="text-xl font-bold mb-2 text-white font-[family-name:var(--font-montserrat)]">You&apos;re in.</h2>
                  <p className="text-white/70 text-[15px] leading-relaxed">
                    Anthony from QuickLaunchWeb will be personally reaching out to you shortly to discuss your custom demo. Please keep your phone nearby so we can get started immediately.
                  </p>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ════════════════════════════════════
            THE PROBLEM — agitate the pain
           ════════════════════════════════════ */}
        <FadeInSection className="px-5 py-14 max-w-md mx-auto">
          <h2 className="text-[1.35rem] sm:text-2xl font-bold text-center mb-3 font-[family-name:var(--font-montserrat)] text-white">
            Here&apos;s what&apos;s happening right now.
          </h2>
          <p className="text-[15px] text-white/65 text-center mb-8 max-w-sm mx-auto leading-relaxed">
            Someone in your area just Googled the exact service you offer. They found your competitor because their site showed up first — and yours didn&apos;t.
          </p>

          <div className="space-y-2.5">
            {[
              { pain: 'Your site takes forever to load', result: 'visitors leave before they even see what you do' },
              { pain: 'There\'s no way to call you in one tap', result: 'they call the next guy who made it easy' },
              { pain: 'It looks like it was built in 2016', result: 'people don\'t trust you before you even get a chance' },
              { pain: 'You\'re invisible on Google Maps', result: 'you\'re paying for a site that nobody finds' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
                className="flex gap-3 items-start"
              >
                <span className="text-red-400 text-lg leading-none mt-0.5 shrink-0">&times;</span>
                <p className="text-[14px] text-white/75 leading-relaxed">
                  <span className="text-white font-medium">{item.pain}</span> — {item.result}
                </p>
              </motion.div>
            ))}
          </div>
        </FadeInSection>

        {/* ════════════════════════════════════
            THE FIX — how it works
           ════════════════════════════════════ */}
        <FadeInSection className="px-5 py-14 max-w-md mx-auto">
          <h2 className="text-[1.35rem] sm:text-2xl font-bold text-center mb-2 font-[family-name:var(--font-montserrat)] text-white">
            We fix that in 48 hours.
          </h2>
          <p className="text-[15px] text-white/60 text-center mb-8 max-w-xs mx-auto leading-relaxed">
            No $5k agency deposit. No 6-week timeline. No DIY drag-and-drop nightmare.
          </p>

          <div className="space-y-3">
            {[
              { num: '01', title: 'Fill out this form', desc: 'Takes 30 seconds. Name, business, how to reach you. That\'s it.' },
              { num: '02', title: 'We design your site by hand', desc: 'Not a template. A real, custom site with tap-to-call, a lead form, and local SEO baked in.' },
              { num: '03', title: 'You\'re live in 48 hours', desc: 'Approve it, we launch. Hosting, SSL, domain setup — all included. You don\'t touch a thing.' },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, duration: 0.35 }}
              >
                <GlassCard className="p-4 flex gap-4 items-start">
                  <span className="text-accent font-bold text-lg font-[family-name:var(--font-montserrat)] leading-none mt-0.5 shrink-0 w-7">{step.num}</span>
                  <div>
                    <h3 className="font-semibold text-[15px] text-white font-[family-name:var(--font-montserrat)]">{step.title}</h3>
                    <p className="text-[13px] text-white/55 mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </FadeInSection>

        {/* ════════════════════════════════════
            REVIEWS — real businesses, pain points
           ════════════════════════════════════ */}
        <FadeInSection className="px-5 py-14 max-w-md mx-auto">
          <h2 className="text-[1.35rem] sm:text-2xl font-bold text-center mb-2 font-[family-name:var(--font-montserrat)] text-white">
            They were in your shoes.
          </h2>
          <p className="text-[15px] text-white/55 text-center mb-8">Same problems. Now they&apos;re booked out.</p>

          <div className="space-y-3">
            {[
              {
                text: 'We were spending $400/mo on a site that didn\'t even have a click-to-call button. Leads were going to our competitors because they couldn\'t reach us fast enough. QuickLaunchWeb rebuilt our whole site in 2 days — calls went up 40% the first week. Should\'ve done this a year ago.',
                name: 'Juan',
                company: 'JN Ornamental Design',
                role: 'Fencing & Fabrication · Houston, TX',
                url: 'https://jnornamentaldesign.com',
                stat: '40% more calls in week one',
              },
              {
                text: 'In real estate, credibility is everything. We needed a digital presence that matched our track record in San Dimas. QuickLaunchWeb built us a high-performance site that captures leads instantly. We stopped losing traffic to Zillow and started getting direct calls from sellers who found us on Google.',
                name: 'Jack',
                company: 'The Toro Group Corp',
                role: 'Real Estate Team · San Dimas, CA',
                url: 'https://soldbytoro.com',
                stat: '3 new listings from website',
              },
              {
                text: 'I was paying a "marketing guy" $250/mo to maintain a site that looked like it was made on Microsoft Word. Customers literally told me they almost didn\'t call because the site looked sketchy. Got my new site from QuickLaunchWeb and within a month I had 3 jobs just from Google alone. Night and day.',
                name: 'Jose',
                company: 'Elite Home Repairs',
                role: 'Home Repair Contractor · Houston, TX',
                url: 'https://elitehomerepairs.us',
                stat: '3 new jobs from Google in 30 days',
              },
              {
                text: 'We had no online presence at all. Just an Instagram page and word of mouth. We were leaving money on the table every single day. QuickLaunchWeb set us up with a site that actually shows up when people search for branding in our area. We\'ve gotten 12 new client inquiries since launching and it\'s only been 6 weeks.',
                name: 'Brian',
                company: 'Becreativesco',
                role: 'Marketing & Branding Agency · Boston, MA',
                url: 'https://becreativesco.com',
                stat: '12 new inquiries in 6 weeks',
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
              >
                <GlassCard className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-white rounded-full p-0.5 shrink-0">
                        <GoogleLogo className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="w-3 h-3 text-[#Fbbc04] fill-[#Fbbc04]" />
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-white/90 bg-white/10 px-1.5 py-0.5 rounded ml-2 whitespace-nowrap">{t.stat}</span>
                  </div>
                  <div className="mb-3.5">
                    <p className="text-[13.5px] text-white/80 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                  </div>
                  <div className="flex items-center gap-2.5 pt-3 border-t border-white/[0.06]">
                    <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center text-xs font-bold text-accent">
                      {t.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[13px] font-semibold text-white">{t.name} <span className="font-normal text-white/40">·</span> <span className="text-white/80 font-medium">{t.company}</span></p>
                          <p className="text-[11px] text-white/45">{t.role}</p>
                        </div>
                        <a href={t.url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-accent font-medium hover:underline shrink-0 ml-2">View website &rarr;</a>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </FadeInSection>

        {/* ════════════════════════════════════
            WHAT'S INCLUDED — no fluff
           ════════════════════════════════════ */}
        <FadeInSection className="px-5 py-14 max-w-md mx-auto">
          <GlassCard variant="elevated" className="p-5">
            <div className="flex items-baseline justify-between mb-1">
              <h2 className="text-[1.1rem] font-bold font-[family-name:var(--font-montserrat)] text-white">
                $99/mo. Build fee waived.
              </h2>
              <span className="text-[11px] text-white/40 line-through">$799 build</span>
            </div>
            <p className="text-[13px] text-white/55 mb-4">No contracts. Cancel anytime. Seriously.</p>
            <div className="space-y-2.5">
              {[
                'Custom site built by hand (not a template)',
                'Mobile-first with tap-to-call',
                'Lead capture form — leads go straight to your inbox',
                'Local SEO foundation so Google can find you',
                'Hosting, SSL, speed optimization — all included',
                'Live in 48 hours',
                '1 content update/month + ongoing support',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-accent/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-accent" />
                  </div>
                  <span className="text-[14px] text-white/80 leading-snug">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-white/[0.08]">
              <p className="text-[12px] text-white/45 leading-relaxed">
                <span className="text-white/60 font-medium">Want more?</span> Pro plan at $149/mo gets you 3 pages, enhanced SEO, call tracking, Google Analytics, and priority support with 3 content updates/month.
              </p>
            </div>
          </GlassCard>
        </FadeInSection>

        {/* ════════════════════════════════════
            FAQ
           ════════════════════════════════════ */}
        <FadeInSection className="px-5 py-14 max-w-md mx-auto">
          <h2 className="text-[1.35rem] sm:text-2xl font-bold text-center mb-6 font-[family-name:var(--font-montserrat)] text-white">
            Common questions
          </h2>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </FadeInSection>

        {/* ════════════════════════════════════
            FINAL CTA — urgency close
           ════════════════════════════════════ */}
        <FadeInSection className="px-5 pt-4 pb-16 sm:pb-20 max-w-md mx-auto">
          <div className="text-center">
            <h2 className="text-[1.35rem] sm:text-2xl font-bold mb-2 font-[family-name:var(--font-montserrat)] text-white">
              Every day without a real site is money left on the table.
            </h2>
            <p className="text-[15px] text-white/55 mb-5">
              Free mockup. 24 hours. You risk literally nothing.
            </p>
            <GlassButton
              variant="primary"
              size="lg"
              onClick={scrollToForm}
              className="w-full font-bold"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Get My Free Mockup
            </GlassButton>
          </div>
        </FadeInSection>

        <footer className="text-center px-5 pb-8 text-[11px] text-white/30">
          &copy; {new Date().getFullYear()} QuickLaunchWeb
        </footer>
      </div>

      {/* ════════════════════════════════════
          STICKY CTA BAR
         ════════════════════════════════════ */}
      <AnimatePresence>
        {showSticky && !submitted && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-[env(safe-area-inset-bottom,8px)] pt-3 bg-[rgba(5,5,7,0.95)] backdrop-blur-xl border-t border-white/[0.08]"
          >
            <div className="max-w-md mx-auto">
              <GlassButton
                variant="primary"
                size="lg"
                onClick={scrollToForm}
                className="w-full font-bold py-3.5"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Get My Free Mockup
              </GlassButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// ─── Helper Components ──────────────────────

function FormField({
  icon: Icon,
  error,
  hint,
  children,
}: {
  icon: React.ElementType;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35 pointer-events-none" />
        {children}
      </div>
      {error && <p className="text-red-400 text-xs mt-1 ml-1">{error}</p>}
      {!error && hint && <p className="text-white/45 text-xs mt-1 ml-1">{hint}</p>}
    </div>
  );
}

function FadeInSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <GlassCard className="overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3.5 flex items-center justify-between text-left"
      >
        <span className="text-[14px] font-medium text-white/90 pr-4">{q}</span>
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
            <div className="px-4 pb-4 text-[14px] text-white/60 leading-relaxed border-t border-white/[0.06] pt-3">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}
