'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, HeartPulse, Star, Menu, X, Phone, Sparkles, Clock, Shield } from 'lucide-react';
import type { BusinessConfig } from '@/lib/demoDefaults';
import { LeadCaptureModal } from './LeadCaptureModal';
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
  const cleanPhone = useMemo(() => config.phone.replace(/\D/g, ''), [config.phone]);
  const ratingText = config.rating ? config.rating.toFixed(1) : '4.8';
  const reviewCount = config.reviewCount ?? 200;
  const years = config.yearsInBusiness ?? 7;
  const shellClass = 'mx-auto w-full max-w-6xl px-6';
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadService, setLeadService] = useState(config.primaryService);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      title: 'Book a consult',
      body: 'Share your goals and any sensitivities with a licensed provider.',
    },
    {
      icon: Sparkles,
      title: 'Get your plan',
      body: 'We map treatment timing, pricing, and expected downtime.',
    },
    {
      icon: HeartPulse,
      title: 'Maintain results',
      body: 'Follow-up reminders and optional membership care.',
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
    <div className="text-slate-900" style={{ backgroundColor: '#fafafa' }}>
      {/* Sticky Navigation */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'border-b border-slate-200 backdrop-blur-md shadow-sm' : ''
        }`}
        style={{ backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : '#fafafa' }}
      >
        <div className={`${shellClass} flex items-center justify-between py-4`}>
          <a href="#" className="flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{ backgroundColor: accent }}
            >
              {config.businessName.charAt(0)}
            </div>
            <span className="text-sm font-semibold text-slate-900">{config.businessName}</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-600 transition hover:text-slate-900"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={`tel:${cleanPhone}`}
              className="text-sm text-slate-600 transition hover:text-slate-900"
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
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-slate-100 bg-white px-6 py-4 md:hidden">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4">
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 py-2.5 text-sm font-medium text-slate-700"
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

      {/* Hero - Soft gradient background with centered layout */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${accent}08 0%, rgba(255,255,255,0.5) 50%, ${accent}12 100%)` }}>
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${accent} 0%, transparent 50%), radial-gradient(circle at 70% 80%, ${accent} 0%, transparent 50%)`,
          }}
        />
        <div className={`${shellClass} relative py-20 lg:py-24`}>
          <motion.div initial="initial" animate="animate" variants={fadeInUp} className="text-center">
            <div className="mx-auto mb-6 flex flex-wrap justify-center gap-2 text-[11px] font-light tracking-[0.15em] text-slate-500">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur px-4 py-2 shadow-md" style={{ border: `1px solid ${accent}20` }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
                Appointments available
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur px-4 py-2 shadow-md" style={{ border: `1px solid ${accent}20` }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                Private suites
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur px-4 py-2 shadow-md" style={{ border: `1px solid ${accent}20` }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                No pressure consults
              </span>
            </div>

            <h1
              className="mx-auto max-w-3xl text-4xl font-light leading-[1.2] md:text-5xl"
              style={{ letterSpacing: '-0.02em' }}
            >
              Gentle, personalized care for{' '}
              <span className="font-normal" style={{ color: accent }}>{config.primaryService}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-600 font-light">
              Experience a calming, appointment-first approach with licensed providers who create personalized treatment plans just for you
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
                className="rounded-full border border-slate-200 bg-white/80 backdrop-blur px-10 py-4 text-sm font-medium text-slate-700 transition-all hover:bg-white hover:shadow-lg"
                style={{ letterSpacing: '0.05em' }}
                onClick={() => {
                  setLeadService(config.primaryService);
                  setLeadOpen(true);
                }}
              >
                {config.ctaSecondary ?? 'Check Availability'}
              </button>
            </div>

            <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 font-light">
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 backdrop-blur bg-white/60 shadow-md" style={{ border: `1px solid ${accent}15` }}>
                <Star className="h-4 w-4" style={{ color: accent, fill: accent }} />
                {ratingText} ({reviewCount} reviews)
              </span>
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 backdrop-blur bg-white/60 shadow-md" style={{ border: `1px solid ${accent}15` }}>
                <HeartPulse className="h-4 w-4" style={{ color: accent }} />
                {years}+ years in practice
              </span>
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 backdrop-blur bg-white/60 shadow-md" style={{ border: `1px solid ${accent}15` }}>
                <CalendarCheck className="h-4 w-4" style={{ color: accent }} />
                Same-week consults
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Welcome Message */}
      <section className="py-12" style={{ backgroundColor: 'white' }}>
        <div className={shellClass}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${accent}20 0%, ${accent}10 100%)` }}>
              <Sparkles className="w-8 h-8" style={{ color: accent }} />
            </div>
            <p className="text-lg font-light leading-relaxed text-slate-600" style={{ letterSpacing: '0.02em' }}>
              We believe in a gentle, personalized approach to wellness. Every treatment plan is designed around your unique goals, with licensed providers who take the time to listen and guide you through each step of your journey.
            </p>
          </div>
        </div>
      </section>

      {/* Bento Grid - Treatment Room + Stats */}
      <section className="border-y py-12" style={{ borderColor: `${accent}15`, background: `linear-gradient(180deg, ${accent}03 0%, rgba(255,255,255,0.9) 100%)` }}>
        <div className={shellClass}>
          <div className="grid gap-5 md:grid-cols-3">
            <div className="md:col-span-2">
              <ImagePlaceholder
                label={roomPlaceholder.label}
                hint={roomPlaceholder.hint}
                accent={accent}
                aspectClassName="aspect-[16/9]"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex-1 rounded-3xl backdrop-blur bg-white/80 p-6 shadow-xl transition-all hover:shadow-2xl hover:bg-white" style={{ border: `1px solid ${accent}10` }}>
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${accent}20 0%, ${accent}10 100%)` }}
                  >
                    <Clock className="h-6 w-6" style={{ color: accent }} />
                  </div>
                  <div>
                    <div className="text-2xl font-light text-slate-900" style={{ letterSpacing: '-0.02em' }}>30 min</div>
                    <div className="text-xs text-slate-500 font-light">Avg. consult time</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 rounded-3xl backdrop-blur bg-white/80 p-6 shadow-xl transition-all hover:shadow-2xl hover:bg-white" style={{ border: `1px solid ${accent}10` }}>
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${accent}20 0%, ${accent}10 100%)` }}
                  >
                    <Shield className="h-6 w-6" style={{ color: accent }} />
                  </div>
                  <div>
                    <div className="text-2xl font-light text-slate-900" style={{ letterSpacing: '-0.02em' }}>100%</div>
                    <div className="text-xs text-slate-500 font-light">Licensed providers</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 rounded-3xl backdrop-blur bg-white/80 p-6 shadow-xl transition-all hover:shadow-2xl hover:bg-white" style={{ border: `1px solid ${accent}10` }}>
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${accent}20 0%, ${accent}10 100%)` }}
                  >
                    <Sparkles className="h-6 w-6" style={{ color: accent }} />
                  </div>
                  <div>
                    <div className="text-2xl font-light text-slate-900" style={{ letterSpacing: '-0.02em' }}>Included</div>
                    <div className="text-xs text-slate-500 font-light">Aftercare guidance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Carousel */}
      <section id="treatments" className="py-20 scroll-mt-20" style={{ background: `linear-gradient(180deg, ${accent}06 0%, rgba(255,255,255,0.8) 100%)` }}>
        <div className={shellClass}>
          <div className="mb-10 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: accent }}>Service Menu</p>
            <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-montserrat), system-ui, sans-serif' }}>Browse by goal and result</h2>
            <p className="mt-3 text-sm text-slate-500">Swipe to explore every treatment option</p>
          </div>
          <ServiceCarousel
            accent={accent}
            services={serviceCards}
            onBook={(service) => {
              setLeadService(service.name);
              setLeadOpen(true);
            }}
          />
        </div>
      </section>

      {/* Services - Elegant Grid */}
      <section id="health-services" className="scroll-mt-20 overflow-hidden">
        <div className="py-16" style={{ background: `linear-gradient(180deg, rgba(255,255,255,0.9) 0%, ${accent}05 50%, rgba(255,255,255,0.9) 100%)` }}>
          <div className={shellClass}>
            <div className="mb-10 text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-12 h-px" style={{ backgroundColor: accent }}></div>
                <p className="text-xs font-light uppercase tracking-[0.3em]" style={{ color: accent }}>Signature Services</p>
                <div className="w-12 h-px" style={{ backgroundColor: accent }}></div>
              </div>
              <h2 className="text-3xl font-light text-slate-900 md:text-4xl mb-4" style={{ letterSpacing: '-0.02em' }}>
                Treatments Designed for You
              </h2>
              <p className="text-base font-light leading-relaxed text-slate-600">
                Every session begins with a consultation to ensure the best results for your unique needs
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-12">
              {/* Large feature card */}
              <div className="md:col-span-5 md:row-span-2">
                <div
                  className="flex h-full flex-col justify-between rounded-[2rem] p-8 text-white shadow-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${accent} 0%, ${accent}dd 100%)`,
                    boxShadow: `0 20px 60px ${accent}30`
                  }}
                >
                  <div>
                    <div className="inline-block rounded-full bg-white/20 backdrop-blur px-4 py-1.5 text-[10px] font-light tracking-[0.15em]">
                      Most Popular
                    </div>
                    <h3 className="mt-5 text-2xl font-light" style={{ letterSpacing: '-0.01em' }}>{config.services[0]}</h3>
                    <p className="mt-3 text-sm text-white/90 font-light leading-relaxed">
                      Custom timing and aftercare guidance included with every session.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setLeadService(config.services[0]);
                      setLeadOpen(true);
                    }}
                    className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-medium transition-all hover:bg-white/95 hover:shadow-xl"
                    style={{ color: accent, letterSpacing: '0.05em' }}
                  >
                    Book Now
                  </button>
                </div>
              </div>

              {/* Service cards */}
              {config.services.slice(1, 4).map((service, i) => (
                <div key={service} className="md:col-span-7">
                  <div className="group rounded-3xl backdrop-blur bg-white/80 p-6 transition-all hover:shadow-2xl hover:bg-white" style={{ border: `1px solid ${accent}15` }}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold text-white"
                          style={{ backgroundColor: accent }}
                        >
                          {i + 2}
                        </span>
                        <h3 className="mt-3 text-base font-semibold text-slate-900">{service}</h3>
                        <p className="mt-1 text-xs text-slate-500">
                          Custom timing and aftercare guidance included.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setLeadService(service);
                          setLeadOpen(true);
                        }}
                        className="shrink-0 rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Wellness Promise */}
      <section className="py-12" style={{ backgroundColor: 'white', borderTop: `1px solid ${accent}15` }}>
        <div className={shellClass}>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${accent}15 0%, ${accent}08 100%)` }}>
                  <HeartPulse className="w-7 h-7" style={{ color: accent }} />
                </div>
                <h3 className="text-base font-medium text-slate-900 mb-2" style={{ letterSpacing: '-0.01em' }}>Personalized Care</h3>
                <p className="text-sm font-light text-slate-600 leading-relaxed">
                  Every treatment is customized to your skin type, concerns, and wellness goals
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${accent}15 0%, ${accent}08 100%)` }}>
                  <Shield className="w-7 h-7" style={{ color: accent }} />
                </div>
                <h3 className="text-base font-medium text-slate-900 mb-2" style={{ letterSpacing: '-0.01em' }}>Licensed Experts</h3>
                <p className="text-sm font-light text-slate-600 leading-relaxed">
                  Our providers are fully licensed and continuously trained in the latest techniques
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${accent}15 0%, ${accent}08 100%)` }}>
                  <Sparkles className="w-7 h-7" style={{ color: accent }} />
                </div>
                <h3 className="text-base font-medium text-slate-900 mb-2" style={{ letterSpacing: '-0.01em' }}>Aftercare Support</h3>
                <p className="text-sm font-light text-slate-600 leading-relaxed">
                  Detailed guidance and follow-up to ensure lasting, beautiful results
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process - Horizontal Flow */}
      <section className="border-y py-16" style={{ borderColor: `${accent}15`, background: `linear-gradient(180deg, ${accent}03 0%, rgba(255,255,255,0.9) 100%)` }}>
        <div className={shellClass}>
          <div className="mb-14 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: accent }}>Your Journey</p>
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl" style={{ fontFamily: 'var(--font-montserrat), system-ui, sans-serif' }}>Three steps to feeling your best</h2>
          </div>

          <div className="relative">
            {/* Connecting line with accent gradient */}
            <div
              className="absolute left-0 right-0 top-12 hidden h-0.5 md:block"
              style={{ background: `linear-gradient(90deg, transparent 10%, ${accent}30 30%, ${accent}30 70%, transparent 90%)` }}
            />

            <div className="grid gap-8 md:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step.title} className="relative text-center group">
                  <div
                    className="relative z-10 mx-auto flex h-28 w-28 items-center justify-center rounded-full backdrop-blur bg-white/80 shadow-2xl transition-all group-hover:scale-110 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]"
                    style={{
                      border: `1px solid ${accent}20`,
                      background: `linear-gradient(135deg, white 0%, ${accent}05 100%)`
                    }}
                  >
                    <step.icon className="h-10 w-10" style={{ color: accent }} />
                  </div>
                  <div className="mt-7">
                    <span
                      className="text-[10px] font-light tracking-[0.2em]"
                      style={{ color: accent }}
                    >
                      Step {index + 1}
                    </span>
                    <h3 className="mt-2 text-lg font-light text-slate-900" style={{ letterSpacing: '-0.01em' }}>{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-500 max-w-xs mx-auto font-light">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Elegant Centered Layout */}
      <section id="health-proof" className="py-20 scroll-mt-20" style={{ background: `linear-gradient(135deg, ${accent}06 0%, rgba(255,255,255,0.8) 50%, ${accent}10 100%)` }}>
        <div className={shellClass}>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <ImagePlaceholder
                label={providerPlaceholder.label}
                hint={providerPlaceholder.hint}
                accent={accent}
                aspectClassName="aspect-[4/5]"
              />
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: accent }}>Client Love</p>
                <h2 className="text-2xl font-bold text-slate-900 md:text-3xl" style={{ fontFamily: 'var(--font-montserrat), system-ui, sans-serif' }}>Trusted in {config.city}</h2>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4" style={{ color: accent, fill: accent }} />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-slate-600">
                    {ratingText} from {reviewCount}+ reviews
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {config.testimonials.map((testimonial) => (
                  <div
                    key={testimonial.name}
                    className="relative rounded-2xl border border-slate-100 bg-slate-50/50 p-5"
                  >
                    <div
                      className="absolute -top-2 left-4 text-4xl font-serif leading-none"
                      style={{ color: accent }}
                    >
                      &ldquo;
                    </div>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed italic">
                      {testimonial.quote}
                    </p>
                    <p className="mt-4 text-xs font-semibold text-slate-900">{testimonial.name}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <HeartPulse className="h-4 w-4" style={{ color: accent }} />
                <span>{years}+ years serving {config.city}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Clean Minimal Style */}
      <section id="health-faq" className="border-t py-20 scroll-mt-20" style={{ borderColor: `${accent}25`, background: `linear-gradient(180deg, rgba(255,255,255,0.8) 0%, ${accent}06 100%)` }}>
        <div className={shellClass}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: accent }}>FAQ</p>
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl" style={{ fontFamily: 'var(--font-montserrat), system-ui, sans-serif' }}>
              Answers that help you book confidently
            </h2>
          </div>

          <div className="mx-auto mt-12 max-w-2xl space-y-4">
            {config.faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-sm"
              >
                <summary className="flex cursor-pointer items-center justify-between p-5 text-sm font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span
                    className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition group-open:rotate-45"
                    style={{ backgroundColor: `${accent}15` }}
                  >
                    <span className="text-lg leading-none" style={{ color: accent }}>+</span>
                  </span>
                </summary>
                <div className="border-t border-slate-100 px-5 py-4">
                  <p className="text-sm text-slate-500">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Soft and inviting */}
      <section id="health-cta" className="relative overflow-hidden" style={{ borderTop: `1px solid ${accent}10` }}>
        {/* Soft decorative circles */}
        <div
          className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-[0.15] blur-[100px] pointer-events-none"
          style={{ backgroundColor: accent }}
        />
        <div
          className="absolute -right-32 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-[0.12] blur-[100px] pointer-events-none"
          style={{ backgroundColor: accent }}
        />
        <div className="relative py-24">
          <div className={`${shellClass} text-center`}>
            <h2 className="text-3xl font-light text-slate-900 md:text-4xl" style={{ letterSpacing: '-0.02em' }}>
              Ready to feel your best?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-slate-600 font-light">
              Book a consultation and discover the right treatment plan for your wellness goals
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                className="rounded-full px-10 py-4 text-sm font-medium text-white shadow-2xl transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${accent} 0%, ${accent}dd 100%)`,
                  letterSpacing: '0.05em'
                }}
                onClick={() => {
                  setLeadService(config.primaryService);
                  setLeadOpen(true);
                }}
              >
                {config.ctaPrimary}
              </button>
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center gap-2 rounded-full border backdrop-blur bg-white/60 px-10 py-4 text-sm font-medium text-slate-700 transition-all hover:bg-white hover:shadow-lg"
                style={{ borderColor: `${accent}20`, letterSpacing: '0.05em' }}
              >
                <Phone className="h-4 w-4" />
                {config.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
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
