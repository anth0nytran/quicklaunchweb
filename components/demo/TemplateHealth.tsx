'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, HeartPulse, Star, Menu, X, Phone, Sparkles } from 'lucide-react';
import type { BusinessConfig } from '@/lib/demoDefaults';
import { LeadCaptureModal } from './LeadCaptureModal';
import { PreviewBanner } from './PreviewBanner';
import { ImagePlaceholder } from './ImagePlaceholder';
import { ServiceCarousel, type ServiceCard } from './ServiceCarousel';

const fadeInUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const serviceCards: ServiceCard[] = [
  { name: 'Hydrafacial', bestFor: 'glow + texture' },
  { name: 'Botox + Dysport', bestFor: 'fine lines' },
  { name: 'Dermal Fillers', bestFor: 'volume + balance' },
  { name: 'Laser Resurfacing', bestFor: 'tone + pores' },
  { name: 'IPL Photofacial', bestFor: 'sun spots' },
  { name: 'Microneedling', bestFor: 'texture + scars' },
  { name: 'RF Microneedling', bestFor: 'firmness' },
  { name: 'Chemical Peels', bestFor: 'brightening' },
  { name: 'Skin Tightening', bestFor: 'jawline + neck' },
  { name: 'Body Contouring', bestFor: 'stubborn areas' },
  { name: 'Cool Sculpt', bestFor: 'fat reduction' },
  { name: 'Laser Hair Removal', bestFor: 'smooth skin' },
  { name: 'PRP Facial', bestFor: 'collagen' },
  { name: 'Lash + Brow', bestFor: 'definition' },
  { name: 'Hydration Infusion', bestFor: 'dry skin' },
  { name: 'Acne Reset', bestFor: 'breakouts' },
  { name: 'Pigment Correction', bestFor: 'uneven tone' },
  { name: 'Scar Revision', bestFor: 'texture' },
  { name: 'Vein Therapy', bestFor: 'spider veins' },
  { name: 'Facial Massage', bestFor: 'lymphatic' },
  { name: 'Lip Blush', bestFor: 'natural color' },
  { name: 'Custom Facial', bestFor: 'sensitive skin' },
  { name: 'Stretch Mark Care', bestFor: 'smoothing' },
  { name: 'Postpartum Sculpt', bestFor: 'core support' },
  { name: 'Mens Skin Care', bestFor: 'razor bumps' },
  { name: 'Teen Glow', bestFor: 'gentle care' },
  { name: 'LED Light Therapy', bestFor: 'healing' },
  { name: 'Jawline Definition', bestFor: 'structure' },
  { name: 'Under-Eye Brighten', bestFor: 'tired eyes' },
  { name: 'Neck Renewal', bestFor: 'crepey skin' },
  { name: 'Hand Rejuvenation', bestFor: 'age spots' },
  { name: 'Consultation', bestFor: 'new clients' },
  { name: 'Membership Tune-Up', bestFor: 'monthly care' },
  { name: 'Laser Tattoo Fade', bestFor: 'unwanted ink' },
  { name: 'Seasonal Peel', bestFor: 'fresh start' },
  { name: 'Redness Relief', bestFor: 'sensitive skin' },
];

export function TemplateHealth({ config }: { config: BusinessConfig }) {
  const accent = config.accent.hex;
  const t = config.theme.colors;
  const isDark = config.theme.isDark;
  const cleanPhone = useMemo(() => config.phone.replace(/\D/g, ''), [config.phone]);
  const ratingText = config.rating ? config.rating.toFixed(1) : '4.8';
  const reviewCount = config.reviewCount ?? 200;
  const years = config.yearsInBusiness ?? 7;
  const shellClass = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-12 2xl:max-w-[1400px] 2xl:px-16';
  const text = {
    primary: { color: t.textPrimary },
    secondary: { color: t.textSecondary },
    muted: { color: t.textMuted },
  };
  const glassBg = isDark ? 'rgba(15, 18, 24, 0.72)' : 'rgba(255, 255, 255, 0.7)';
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadService, setLeadService] = useState(config.primaryService);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#health-services' },
    { label: 'Treatments', href: '#treatments' },
    { label: 'Reviews', href: '#health-proof' },
    { label: 'FAQ', href: '#health-faq' },
  ];

  const steps = [
    {
      icon: CalendarCheck,
      title: 'Clinical consult',
      body: 'Review goals, skin history, and sensitivities with a licensed provider.',
    },
    {
      icon: Sparkles,
      title: 'Personalized plan',
      body: 'We map timing, pricing, and expected downtime before you commit.',
    },
    {
      icon: HeartPulse,
      title: 'Maintain results',
      body: 'Follow-up reminders and optional membership care are built in.',
    },
  ];
  const roomPlaceholder = config.imagePlaceholders[0] ?? {
    label: 'Treatment Room',
    hint: 'Calm, private suite',
  };
  const providerPlaceholder = config.imagePlaceholders[1] ?? {
    label: 'Provider Photo',
    hint: 'Licensed clinician',
  };
  const resultsPlaceholder = config.imagePlaceholders[2] ?? {
    label: 'Results Photo',
    hint: 'Subtle before and after',
  };

  return (
    <div className="text-slate-900" style={{ backgroundColor: t.pageBg, color: t.textPrimary }}>
      {showPreview && (
        <PreviewBanner accent={accent} ctaHref="#health-cta" onClose={() => setShowPreview(false)} />
      )}
      {/* Sticky Navigation */}
      <nav
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? t.cardBg : t.pageBg,
          borderBottom: scrolled ? `1px solid ${t.border}` : 'none',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        <div className={`${shellClass} flex items-center justify-between py-4`}>
          <a href="#" className="flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{ backgroundColor: accent }}
            >
              {config.businessName.charAt(0)}
            </div>
            <span className="text-sm font-semibold" style={text.primary}>
              {config.businessName}
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm transition hover:opacity-80"
                style={text.secondary}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={`tel:${cleanPhone}`}
              className="text-sm transition hover:opacity-80"
              style={text.secondary}
            >
              {config.phone}
            </a>
            <button
              type="button"
              onClick={() => {
                setLeadService(config.primaryService);
                setLeadOpen(true);
              }}
              className="rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: accent }}
            >
              {config.ctaPrimary}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border md:hidden"
            style={{ borderColor: t.border, color: t.textPrimary }}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            className="border-t px-6 py-4 md:hidden"
            style={{ borderColor: t.borderLight, backgroundColor: t.cardBg }}
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm transition hover:opacity-80"
                  style={text.secondary}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-2 border-t pt-4" style={{ borderColor: t.borderLight }}>
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium"
                style={{ borderColor: t.border, color: t.textPrimary, backgroundColor: t.surfaceBg }}
              >
                <Phone className="h-4 w-4" />
                {config.phone}
              </a>
              <button
                type="button"
                onClick={() => {
                  setLeadService(config.primaryService);
                  setLeadOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="rounded-lg py-2.5 text-sm font-semibold text-white"
                style={{ backgroundColor: accent }}
              >
                {config.ctaPrimary}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero - Diffused glow */}
      <section className="relative overflow-hidden" style={{ backgroundColor: t.pageBg }}>
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute -left-24 top-[-60px] h-72 w-72 rounded-full blur-3xl"
            style={{ backgroundColor: `${accent}22` }}
          />
          <div
            className="absolute right-[-40px] top-20 h-80 w-80 rounded-full blur-3xl"
            style={{ backgroundColor: `${accent}1a` }}
          />
          <div
            className="absolute bottom-[-40px] left-[35%] h-64 w-64 rounded-full blur-3xl"
            style={{ backgroundColor: `${accent}12` }}
          />
        </div>
        <div className={`${shellClass} relative py-16 lg:py-20`}>
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <motion.div initial="initial" animate="animate" variants={fadeInUp} className="text-left">
              <div className="mb-6">
                <div
                  className="inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em]"
                  style={{ color: t.textMuted, borderColor: t.border, backgroundColor: glassBg }}
                >
                  Demo content  -  sample copy
                </div>
              </div>

              <h1
                className="max-w-2xl text-4xl font-light leading-[1.2] md:text-5xl"
                style={{ letterSpacing: '-0.02em' }}
              >
                Gentle, personalized care for{' '}
                <span className="font-normal" style={{ color: accent }}>{config.primaryService}</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed font-light" style={text.secondary}>
                Experience a calming, appointment-first approach with licensed providers who create personalized treatment plans just for you
              </p>

              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
                <button
                  type="button"
                  className="rounded-full px-10 py-4 text-sm font-medium text-white shadow-xl transition-all hover:shadow-2xl hover:scale-105"
                  style={{
                    backgroundColor: accent,
                    boxShadow: `0 10px 40px ${accent}30`,
                    letterSpacing: '0.05em'
                  }}
                  onClick={() => {
                    setLeadService(config.primaryService);
                    setLeadOpen(true);
                  }}
                >
                  {config.ctaPrimary}
                </button>
                <button
                  type="button"
                  className="rounded-full border backdrop-blur px-10 py-4 text-sm font-medium transition-all hover:shadow-lg"
                  style={{ letterSpacing: '0.05em', borderColor: t.border, backgroundColor: glassBg, color: t.textSecondary }}
                  onClick={() => {
                    setLeadService(config.primaryService);
                    setLeadOpen(true);
                  }}
                >
                  {config.ctaSecondary ?? 'Check Availability'}
                </button>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 text-[11px] font-light tracking-[0.12em]" style={text.muted}>
                <span
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
                  style={{ borderColor: t.border, backgroundColor: t.cardBg }}
                >
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
                  Appointments available
                </span>
                <span
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
                  style={{ borderColor: t.border, backgroundColor: t.cardBg }}
                >
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
                  Private suites
                </span>
                <span
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
                  style={{ borderColor: t.border, backgroundColor: t.cardBg }}
                >
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
                  No pressure consults
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="flex items-center gap-3 rounded-2xl border px-4 py-3" style={{ borderColor: t.border, backgroundColor: t.cardBg }}>
                  <Star className="h-4 w-4" style={{ color: accent, fill: accent }} />
                  <div className="text-xs font-light" style={text.muted}>
                    {ratingText} ({reviewCount} reviews)
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border px-4 py-3" style={{ borderColor: t.border, backgroundColor: t.cardBg }}>
                  <HeartPulse className="h-4 w-4" style={{ color: accent }} />
                  <div className="text-xs font-light" style={text.muted}>
                    {years}+ years in practice
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border px-4 py-3" style={{ borderColor: t.border, backgroundColor: t.cardBg }}>
                  <CalendarCheck className="h-4 w-4" style={{ color: accent }} />
                  <div className="text-xs font-light" style={text.muted}>
                    Same-week consults
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial="initial" animate="animate" variants={fadeInUp} className="relative">
              <div className="rounded-3xl border p-3 shadow-sm" style={{ borderColor: t.border, backgroundColor: t.cardBg }}>
                <ImagePlaceholder
                  label={roomPlaceholder.label}
                  hint={roomPlaceholder.hint}
                  accent={accent}
                  aspectClassName="aspect-[4/3] rounded-2xl"
                />
              </div>
              <div
                className="absolute -bottom-6 left-6 rounded-2xl border px-4 py-3 shadow-lg"
                style={{ borderColor: t.border, backgroundColor: t.cardBg }}
              >
                <div className="text-3xl font-light" style={{ color: accent }}>30min</div>
                <div className="text-xs" style={text.secondary}>
                  Average consult
                </div>
              </div>
              <div
                className="absolute right-6 top-6 rounded-2xl border px-4 py-3 shadow-lg"
                style={{ borderColor: t.border, backgroundColor: t.cardBg }}
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={text.muted}>
                  Next available
                </div>
                <div className="mt-2 text-sm font-medium" style={text.primary}>
                  This week
                </div>
                <div className="text-xs" style={text.secondary}>
                  Limited openings
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Clinical Details */}
      <section className="relative py-14" style={{ backgroundColor: t.surfaceBg }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, ${accent}12 0%, transparent 45%), radial-gradient(circle at 80% 80%, ${accent}10 0%, transparent 50%)`,
          }}
        />
        <div className={shellClass}>
          <div
            className="relative -mt-10 rounded-3xl border p-6 shadow-lg md:p-8"
            style={{ borderColor: t.border, backgroundColor: t.cardBg }}
          >
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: accent }}>
                  Clinical standard
                </p>
                <h2 className="mt-2 text-2xl font-light" style={{ color: t.textPrimary }}>
                  Provider-led care with visible results
                </h2>
              </div>
              <div
                className="rounded-full border px-4 py-1 text-[11px]"
                style={{ borderColor: t.border, color: t.textMuted, backgroundColor: t.surfaceBg }}
              >
                Calm, private suites
              </div>
            </div>
            <div className="grid gap-8 lg:grid-cols-[0.6fr_0.4fr] lg:items-center">
              <div className="grid gap-6 sm:grid-cols-2">
                <ImagePlaceholder
                  label={providerPlaceholder.label}
                  hint={providerPlaceholder.hint}
                  accent={accent}
                  aspectClassName="aspect-[4/5] rounded-2xl"
                />
                <ImagePlaceholder
                  label={resultsPlaceholder.label}
                  hint={resultsPlaceholder.hint}
                  accent={accent}
                  aspectClassName="aspect-[4/5] rounded-2xl"
                />
              </div>
              <div className="grid gap-4">
                <div className="rounded-2xl border p-5" style={{ borderColor: t.border, backgroundColor: t.surfaceBg }}>
                  <div className="text-4xl font-light mb-2" style={{ color: accent }}>100%</div>
                  <div className="text-sm font-light" style={text.secondary}>
                    Licensed providers with {years}+ years experience
                  </div>
                </div>
                <div className="rounded-2xl border p-5" style={{ borderColor: t.border, backgroundColor: t.surfaceBg }}>
                  <div className="text-xs font-semibold uppercase tracking-[0.3em]" style={text.muted}>
                    Next available
                  </div>
                  <div className="mt-2 text-xl font-medium" style={text.primary}>
                    Consults this week
                  </div>
                  <div className="mt-1 text-sm" style={text.secondary}>
                    Secure a time slot in under 48 hours.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Carousel */}
      <section id="treatments" className="relative py-16 scroll-mt-20" style={{ backgroundColor: t.pageBg }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            backgroundImage: `radial-gradient(circle at 0% 40%, ${accent}10 0%, transparent 50%), radial-gradient(circle at 90% 10%, ${accent}14 0%, transparent 45%)`,
          }}
        />
        <div className={`${shellClass} relative`}>
          <div className="grid gap-8 lg:grid-cols-[0.4fr_0.6fr] lg:items-center">
            <div
              className="rounded-3xl border p-6 shadow-sm"
              style={{ borderColor: t.border, backgroundColor: t.surfaceBg }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: accent }}>
                Service menu
              </p>
              <h2
                className="text-2xl font-light"
                style={{ fontFamily: 'var(--font-montserrat), system-ui, sans-serif', color: t.textPrimary }}
              >
                Treatments curated by concern
              </h2>
              <p className="mt-3 text-sm" style={text.muted}>
                Browse by goal, skin type, and downtime preference.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-[11px]" style={text.muted}>
                {['Glow + Texture', 'Tone + Pigment', 'Firming + Lift', 'Acne Reset'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-3 py-1"
                    style={{ borderColor: t.border, backgroundColor: t.cardBg }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-[32px] border p-6 shadow-sm" style={{ borderColor: t.border, backgroundColor: t.cardBg }}>
              <ServiceCarousel
                accent={accent}
                services={serviceCards}
                cardBg={t.pageBg}
                borderColor={t.borderLight}
                textPrimary={t.textPrimary}
                textMuted={t.textMuted}
                onBook={(service) => {
                  setLeadService(service.name);
                  setLeadOpen(true);
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services - Asymmetric bento */}
      <section id="health-services" className="relative scroll-mt-20 py-16" style={{ backgroundColor: t.surfaceBg }}>
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-[-80px] top-[-40px] h-72 w-72 rounded-full blur-3xl"
            style={{ backgroundColor: `${accent}12` }}
          />
          <div
            className="absolute bottom-[-60px] right-[-60px] h-80 w-80 rounded-full blur-3xl"
            style={{ backgroundColor: `${accent}0f` }}
          />
        </div>
        <div className={shellClass}>
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl font-light md:text-4xl mb-4" style={{ letterSpacing: '-0.02em', color: t.textPrimary }}>
              Signature services
            </h2>
            <p className="text-base font-light leading-relaxed" style={text.secondary}>
              Every session begins with a consultation to ensure the best results
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-12">
            {/* Large feature - spans wider, taller */}
            <div className="md:col-span-7 md:row-span-2">
              <div
                className="flex h-full flex-col justify-between rounded-3xl border p-10"
                style={{
                  borderColor: t.border,
                  backgroundColor: t.cardBg,
                  backgroundImage: `radial-gradient(circle at 20% 10%, ${accent}22 0%, transparent 55%)`,
                  boxShadow: `0 30px 60px ${accent}12`,
                }}
              >
                <div>
                  <div className="text-sm font-light uppercase tracking-wider opacity-80 mb-4" style={{ color: t.textMuted }}>
                    Most Popular
                  </div>
                  <h3 className="text-3xl font-light mb-4" style={{ letterSpacing: '-0.01em', color: t.textPrimary }}>
                    {config.services[0]}
                  </h3>
                  <p className="text-base font-light leading-relaxed max-w-md" style={{ color: t.textSecondary }}>
                    Custom timing and aftercare guidance included. Our most requested treatment for visible, lasting results.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setLeadService(config.services[0]);
                    setLeadOpen(true);
                  }}
                  className="mt-8 self-start rounded-full px-8 py-3 text-base font-medium text-white transition-all hover:shadow-xl"
                  style={{ backgroundColor: accent }}
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Stacked smaller cards */}
            <div className="md:col-span-5 space-y-6">
              {config.services.slice(1, 4).map((service, i) => (
                <div
                  key={service}
                  className={`rounded-2xl p-6 transition-all hover:shadow-lg ${
                    i === 0 ? 'md:translate-x-2' : i === 1 ? 'md:-translate-x-2' : 'md:translate-x-4'
                  }`}
                  style={{ border: `1px solid ${t.border}`, backgroundColor: t.cardBg }}
                >
                  <h3 className="text-lg font-medium mb-2" style={text.primary}>
                    {service}
                  </h3>
                  <p className="text-sm font-light mb-3" style={text.secondary}>
                    Personalized treatment with expert aftercare
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setLeadService(service);
                      setLeadOpen(true);
                    }}
                    className="text-sm font-medium transition hover:gap-2 inline-flex items-center gap-1"
                    style={{ color: accent }}
                  >
                    Learn more
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Promise - Simple text, no icons */}
      <section className="relative py-16" style={{ backgroundColor: t.pageBg }}>
        <div className={shellClass}>
          <div className="grid gap-6 lg:grid-cols-[0.2fr_0.8fr] lg:items-start">
            <div className="text-6xl font-light opacity-10" style={{ color: accent }}>"</div>
            <div className="rounded-3xl border p-8 shadow-sm" style={{ borderColor: t.border, backgroundColor: t.cardBg }}>
              <p className="text-lg font-light leading-relaxed" style={{ letterSpacing: '0.01em', color: t.textSecondary }}>
                Every treatment is customized to your unique goals. Our licensed providers take the time to listen, plan, and deliver results with personalized aftercare guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process - Asymmetric, no icons */}
      <section className="relative py-16" style={{ backgroundColor: t.surfaceBg }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            backgroundImage: `radial-gradient(circle at 10% 20%, ${accent}10 0%, transparent 45%), radial-gradient(circle at 90% 70%, ${accent}0f 0%, transparent 50%)`,
          }}
        />
        <div className={shellClass}>
          <div className="grid gap-10 lg:grid-cols-[0.45fr_0.55fr] items-start">
            <div
              className="rounded-3xl border p-8 shadow-sm"
              style={{ borderColor: t.border, backgroundColor: t.cardBg }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: accent }}>
                Care process
              </p>
              <h2 className="mt-3 text-3xl font-light lg:text-4xl" style={{ letterSpacing: '-0.02em', color: t.textPrimary }}>
                Your journey
              </h2>
              <p className="mt-4 text-base font-light leading-relaxed" style={text.secondary}>
                Clear steps, clear expectations, and a plan that fits your schedule.
              </p>
              <div className="mt-6 flex items-center gap-4 text-xs" style={text.muted}>
                <span className="rounded-full border px-3 py-1" style={{ borderColor: t.border, backgroundColor: t.surfaceBg }}>
                  Average visit 45 min
                </span>
                <span className="rounded-full border px-3 py-1" style={{ borderColor: t.border, backgroundColor: t.surfaceBg }}>
                  Aftercare included
                </span>
              </div>
            </div>

            <div className="relative space-y-5">
              <div className="absolute left-5 top-4 bottom-4 w-px" style={{ backgroundColor: t.border }} />
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="relative flex flex-col gap-4 rounded-2xl border p-5 pl-12 shadow-sm sm:flex-row sm:items-start"
                  style={{ borderColor: t.border, backgroundColor: t.cardBg }}
                >
                  <div
                    className="absolute left-2 top-6 flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: accent }}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-1" style={text.primary}>
                      {step.title}
                    </h3>
                    <p className="text-sm font-light leading-relaxed" style={text.secondary}>
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Outcome grid */}
      <section id="health-proof" className="relative py-16 scroll-mt-20" style={{ backgroundColor: t.pageBg }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage: `radial-gradient(circle at 15% 10%, ${accent}10 0%, transparent 40%), radial-gradient(circle at 85% 90%, ${accent}12 0%, transparent 45%)`,
          }}
        />
        <div className={`${shellClass} relative grid gap-10 lg:grid-cols-[0.45fr_0.55fr] lg:items-start`}>
          <div className="space-y-6 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-3 rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em]"
              style={{ borderColor: t.border, color: t.textMuted }}
            >
              Patient outcomes
            </div>
            <h2 className="text-3xl font-light" style={{ color: t.textPrimary, letterSpacing: '-0.02em' }}>
              Trusted for natural results in {config.city}
            </h2>
            <p className="text-sm" style={{ color: t.textSecondary }}>
              Every plan is built around your goals with a clear timeline and aftercare support.
            </p>

            <div className="rounded-2xl border p-6" style={{ borderColor: t.border, backgroundColor: t.cardBg }}>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl" style={{ backgroundColor: accent }}>
                  <Star className="h-6 w-6 text-white" style={{ fill: 'white' }} />
                </div>
                <div>
                  <div className="text-3xl font-light" style={{ color: t.textPrimary }}>{ratingText}</div>
                  <div className="text-xs font-semibold" style={{ color: t.textMuted }}>{reviewCount}+ verified reviews</div>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  { label: 'Average consult', value: '30 min' },
                  { label: 'Provider-led care', value: 'Always' },
                  { label: 'Follow-up plan', value: 'Included' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-sm" style={{ color: t.textSecondary }}>
                    <span>{item.label}</span>
                    <span className="font-semibold" style={{ color: t.textPrimary }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {config.testimonials.map((testimonial, i) => (
              <div
                key={testimonial.name}
                className={`rounded-2xl border p-6 shadow-sm ${
                  i === 0 ? 'text-white' : ''
                } ${i % 2 === 1 ? 'md:translate-x-4' : ''}`}
                style={i === 0 ? { backgroundColor: accent, borderColor: accent } : { borderColor: t.border, backgroundColor: t.cardBg }}
              >
                <p className="text-sm font-light leading-relaxed" style={i === 0 ? { color: 'rgba(255,255,255,0.85)' } : { color: t.textSecondary }}>
                  "{testimonial.quote}"
                </p>
                <div className="mt-5 flex items-center gap-3 pt-4 border-t" style={{ borderColor: i === 0 ? 'rgba(255,255,255,0.2)' : t.borderLight }}>
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full font-medium text-sm"
                    style={i === 0 ? { backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' } : { backgroundColor: accent, color: t.darkText }}
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={i === 0 ? { color: 'white' } : { color: t.textPrimary }}>{testimonial.name}</div>
                    <div className="text-xs" style={i === 0 ? { color: 'rgba(255,255,255,0.6)' } : { color: t.textMuted }}>Verified Client</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - Clean Minimal Style */}
      <section
        id="health-faq"
        className="border-t py-16 scroll-mt-20"
        style={{ borderColor: t.border, backgroundColor: t.surfaceBg }}
      >
        <div className={shellClass}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: accent }}>FAQ</p>
            <h2 className="text-2xl font-bold md:text-3xl" style={{ fontFamily: 'var(--font-montserrat), system-ui, sans-serif', color: t.textPrimary }}>
              Answers that help you book confidently
            </h2>
          </div>

          <div className="mx-auto mt-10 max-w-2xl rounded-3xl border p-6 shadow-sm" style={{ borderColor: t.border, backgroundColor: t.cardBg }}>
            <div className="space-y-4">
              {config.faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-2xl border transition-shadow hover:shadow-sm"
                  style={{ borderColor: t.border, backgroundColor: t.surfaceBg }}
                >
                  <summary
                    className="flex cursor-pointer items-center justify-between p-5 text-sm font-semibold [&::-webkit-details-marker]:hidden"
                    style={text.primary}
                  >
                    {faq.q}
                    <span
                      className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition group-open:rotate-45"
                      style={{ backgroundColor: `${accent}15` }}
                    >
                      <span className="text-lg leading-none" style={{ color: accent }}>+</span>
                    </span>
                  </summary>
                  <div className="border-t px-5 py-4" style={{ borderColor: t.borderLight }}>
                    <p className="text-sm" style={text.secondary}>
                      {faq.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Clean gradient */}
      <section
        id="health-cta"
        className="relative py-16"
        style={{
          backgroundColor: accent,
          backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35) 0%, transparent 55%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.2) 0%, transparent 45%)',
        }}
      >
        <div className={`${shellClass} relative text-center`}>
          <h2 className="text-4xl font-light text-white md:text-5xl" style={{ letterSpacing: '-0.02em' }}>
            Ready to feel your best?
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg font-light leading-relaxed text-white/90">
            Book a consultation and discover the right treatment plan for your wellness goals
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              className="rounded-full bg-white px-10 py-4 text-base font-medium shadow-2xl transition-all hover:scale-105"
              style={{ color: accent }}
              onClick={() => {
                setLeadService(config.primaryService);
                setLeadOpen(true);
              }}
            >
              {config.ctaPrimary}
            </button>
            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-10 py-4 text-base font-medium text-white backdrop-blur transition-all hover:bg-white/20"
            >
              <Phone className="h-4 w-4" />
              {config.phone}
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t py-6 text-xs" style={{ borderColor: t.border, backgroundColor: t.cardBg, color: t.textMuted }}>
        <div className={`${shellClass} flex flex-col gap-2 md:flex-row md:items-center md:justify-between`}>
          <span>{config.businessName}</span>
          <span>
            {config.city} | {config.phone}
          </span>
          <span>Open Mon - Sat, 9am - 6pm</span>
        </div>
      </footer>

      <LeadCaptureModal
        open={leadOpen}
        onOpenChange={setLeadOpen}
        accent={accent}
        businessName={config.businessName}
        serviceLabel={leadService || config.primaryService}
        ctaLabel={config.ctaPrimary}
      />
    </div>
  );
}



