'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ShieldCheck, Star, Menu, X, Phone, Scale, Users, Clock, Award, ChevronRight, Building2, FileCheck } from 'lucide-react';
import type { BusinessConfig } from '@/lib/demoDefaults';
import { LeadCaptureModal } from './LeadCaptureModal';
import { PreviewBanner } from './PreviewBanner';
import { ImagePlaceholder } from './ImagePlaceholder';

const fadeInUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function TemplatePro({ config }: { config: BusinessConfig }) {
  const accent = config.accent.hex;
  const t = config.theme.colors;
  const cleanPhone = useMemo(() => config.phone.replace(/\D/g, ''), [config.phone]);
  const ratingText = config.rating ? config.rating.toFixed(1) : '4.9';
  const reviewCount = config.reviewCount ?? 80;
  const years = config.yearsInBusiness ?? 15;
  const shellClass = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-12 2xl:max-w-[1400px] 2xl:px-16';
  const text = {
    primary: { color: t.textPrimary },
    secondary: { color: t.textSecondary },
    muted: { color: t.textMuted },
  };
  const [leadOpen, setLeadOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#pro-about' },
    { label: 'Services', href: '#pro-services' },
    { label: 'Results', href: '#pro-proof' },
    { label: 'FAQ', href: '#pro-faq' },
  ];

  const stats = [
    { value: `${years}+`, label: 'Years in Practice', icon: Clock },
    { value: `${reviewCount}+`, label: 'Engagements Led', icon: Users },
    { value: ratingText, label: 'Client Satisfaction', icon: Star },
    { value: '24hr', label: 'Avg. Response', icon: Award },
  ];

  const focusAreas = [
    { title: 'Transactional Counsel', desc: 'Contracts, vendor terms, and negotiation strategy' },
    { title: 'Risk & Compliance', desc: 'Governance frameworks and liability mitigation' },
    { title: 'Employment Advisory', desc: 'Policy, HR alignment, and internal investigations' },
    { title: 'Dispute Strategy', desc: 'Pre-litigation planning and resolution guidance' },
  ];
  const teamPlaceholder = config.imagePlaceholders[0] ?? {
    label: 'Team Photo',
    hint: 'Partners and lead counsel',
  };
  const officePlaceholder = config.imagePlaceholders[1] ?? {
    label: 'Office Photo',
    hint: 'Professional workspace',
  };
  const meetingPlaceholder = config.imagePlaceholders[2] ?? {
    label: 'Client Meeting',
    hint: 'Conference room consult',
  };

  return (
    <div className="bg-white text-slate-900" style={{ backgroundColor: t.pageBg, color: t.textPrimary }}>
      {showPreview && (
        <PreviewBanner accent={accent} ctaHref="#pro-cta" onClose={() => setShowPreview(false)} />
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
              className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold text-white"
              style={{ backgroundColor: accent }}
            >
              {config.businessName.split(' ').map(w => w[0]).join('').slice(0, 2)}
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
              onClick={() => setLeadOpen(true)}
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

      {/* Hero - Executive Layout */}
      <section
        className="relative border-b overflow-hidden"
        style={{
          borderColor: t.border,
          backgroundColor: t.surfaceBg,
        }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute -left-24 top-[-60px] h-72 w-72 rounded-full blur-3xl"
            style={{ backgroundColor: `${accent}12` }}
          />
          <div
            className="absolute right-[-80px] bottom-[-40px] h-80 w-80 rounded-full blur-3xl"
            style={{ backgroundColor: `${accent}0f` }}
          />
        </div>
        <div className={`${shellClass} relative pt-16 pb-24 lg:pt-20 lg:pb-28`}>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <motion.div initial="initial" animate="animate" variants={fadeInUp} className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="h-10 w-1 rounded-full" style={{ backgroundColor: accent }} />
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.35em]" style={text.muted}>
                    Demo content  -  sample copy
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>
                    Trusted {config.primaryService}
                  </div>
                </div>
              </div>

              <h1
                className="text-3xl font-bold leading-[1.15] tracking-tight md:text-4xl lg:text-5xl"
                style={{ fontFamily: 'var(--font-montserrat), system-ui, sans-serif' }}
              >
                Clear guidance for{' '}
                <span style={{ color: accent }}>
                  complex decisions
                </span>
              </h1>
              <p className="max-w-md text-base leading-relaxed" style={text.secondary}>
                {config.businessName} delivers structured advice, clear timelines, and upfront pricing
                so you can move forward with confidence.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="rounded-lg px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]"
                  style={{ backgroundColor: accent, boxShadow: `0 4px 14px ${accent}40` }}
                  onClick={() => setLeadOpen(true)}
                >
                  {config.ctaPrimary}
                </button>
                <a
                  href={`tel:${cleanPhone}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 px-7 py-3.5 text-sm font-semibold transition-colors hover:opacity-80"
                  style={{ borderColor: t.border, color: t.textSecondary, backgroundColor: t.cardBg }}
                >
                  <Phone className="h-4 w-4" />
                  {config.ctaSecondary ?? 'Call the Office'}
                </a>
              </div>
            </motion.div>

            <motion.div initial="initial" animate="animate" variants={fadeInUp} className="relative">
              <div className="rounded-3xl border p-4 shadow-sm" style={{ borderColor: t.border, backgroundColor: t.cardBg }}>
                <ImagePlaceholder
                  label={teamPlaceholder.label}
                  hint={teamPlaceholder.hint}
                  accent={accent}
                  aspectClassName="aspect-[4/5] rounded-2xl"
                />
              </div>
              <div
                className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-l-4 p-5 shadow-lg"
                style={{ borderColor: t.border, borderLeftColor: accent, backgroundColor: t.cardBg }}
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={text.muted}>
                  Engagement snapshot
                </div>
                <div className="mt-4 grid gap-2">
                  {config.services.slice(0, 3).map((service) => (
                    <div key={service} className="flex items-center gap-3 text-sm" style={text.secondary}>
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Dark Credential Strip */}
        <div className="-mt-6 pb-8">
          <div className={shellClass}>
            <div
              className="rounded-2xl border px-6 py-6 shadow-lg"
              style={{ backgroundColor: t.darkBg, borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div className="grid gap-4 md:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                      <stat.icon className="h-5 w-5 text-white/60" />
                    </div>
                    <div>
                      <div className="text-xl font-semibold text-white">{stat.value}</div>
                      <div className="text-xs text-white/60">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Credentials */}
      <section className="border-b py-14" style={{ borderColor: t.border, backgroundColor: t.surfaceBg }}>
        <div className={shellClass}>
          <div className="grid gap-8 lg:grid-cols-[0.3fr_0.7fr] lg:items-center">
            <div className="space-y-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.4em]" style={{ color: accent }}>
                Licensed & Accredited
              </p>
              <div className="h-px w-14" style={{ backgroundColor: accent }} />
            </div>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              <div className="flex flex-col items-start gap-2 rounded-2xl border p-5" style={{ borderColor: t.borderLight, backgroundColor: t.cardBg }}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${accent}10` }}>
                  <Scale className="w-6 h-6" style={{ color: accent }} />
                </div>
                <div className="text-xs font-semibold" style={text.primary}>State Bar</div>
                <div className="text-[10px]" style={text.muted}>Certified Member</div>
              </div>
              <div className="flex flex-col items-start gap-2 rounded-2xl border p-5" style={{ borderColor: t.borderLight, backgroundColor: t.cardBg }}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${accent}10` }}>
                  <Building2 className="w-6 h-6" style={{ color: accent }} />
                </div>
                <div className="text-xs font-semibold" style={text.primary}>Chamber Member</div>
                <div className="text-[10px]" style={text.muted}>Business Network</div>
              </div>
              <div className="flex flex-col items-start gap-2 rounded-2xl border p-5" style={{ borderColor: t.borderLight, backgroundColor: t.cardBg }}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${accent}10` }}>
                  <ShieldCheck className="w-6 h-6" style={{ color: accent }} />
                </div>
                <div className="text-xs font-semibold" style={text.primary}>BBB Accredited</div>
                <div className="text-[10px]" style={text.muted}>A+ Rating</div>
              </div>
              <div className="flex flex-col items-start gap-2 rounded-2xl border p-5" style={{ borderColor: t.borderLight, backgroundColor: t.cardBg }}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${accent}10` }}>
                  <Award className="w-6 h-6" style={{ color: accent }} />
                </div>
                <div className="text-xs font-semibold" style={text.primary}>Industry Awards</div>
                <div className="text-[10px]" style={text.muted}>Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About / Focus Areas - Alternating Cards */}
      <section
        id="pro-about"
        className="relative py-14 scroll-mt-20"
        style={{ backgroundColor: t.pageBg }}
      >
        <div className={`${shellClass} relative`}>
          <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr] lg:items-start">
            <div className="space-y-6">
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.3em]"
                style={{ color: accent }}
              >
                Focus Areas
              </p>
              <h2
                className="text-2xl font-bold md:text-3xl"
                style={{ fontFamily: 'var(--font-montserrat), system-ui, sans-serif', color: t.textPrimary }}
              >
                Strategic counsel for owners and executives
              </h2>
              <p className="text-base leading-relaxed" style={text.secondary}>
                We keep the process structured, with clear deliverables and a single point of contact.
              </p>
            </div>

            <div className="grid gap-4">
              {focusAreas.map((area, i) => (
                <div
                  key={area.title}
                  className={`rounded-2xl border p-6 shadow-sm transition ${
                    i % 2 === 1 ? 'md:translate-x-6' : ''
                  }`}
                  style={{ borderColor: t.border, backgroundColor: t.cardBg }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: accent }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <h3 className="mt-3 text-lg font-semibold" style={text.primary}>
                        {area.title}
                      </h3>
                      <p className="mt-2 text-sm" style={text.secondary}>
                        {area.desc}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5" style={{ color: accent }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Commitment */}
      <section className="border-y py-12" style={{ borderColor: t.border, backgroundColor: t.surfaceBg }}>
        <div className={shellClass}>
          <div className="max-w-4xl mx-auto">
            <div
              className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-2xl border-2 border-l-4 shadow-sm"
              style={{ borderColor: t.border, borderLeftColor: accent, backgroundColor: t.cardBg }}
            >
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-lg flex items-center justify-center" style={{ backgroundColor: accent }}>
                  <FileCheck className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-montserrat), system-ui, sans-serif', color: t.textPrimary }}>
                  Our Professional Commitment
                </h3>
                <p className="text-sm leading-relaxed" style={text.secondary}>
                  Every engagement includes transparent pricing, clear timelines, and regular communication. We maintain the highest ethical standards and prioritize your business interests in every decision. Your matters are handled with strict confidentiality and professional diligence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services - Vertical Timeline Style */}
      <section id="pro-services" className="py-14 scroll-mt-20" style={{ backgroundColor: t.surfaceBg }}>
        <div className={shellClass}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-3"
                style={{ color: accent }}
              >
                Services
              </p>
              <h2
                className="text-2xl font-bold md:text-3xl"
                style={{ fontFamily: 'var(--font-montserrat), system-ui, sans-serif', color: t.textPrimary }}
              >
                How we help your business
              </h2>
              <p className="mt-4 text-sm leading-relaxed" style={text.secondary}>
                Every engagement includes clear scope, timeline, and pricing.
              </p>
              <ImagePlaceholder
                label={officePlaceholder.label}
                hint={officePlaceholder.hint}
                accent={accent}
                aspectClassName="mt-6 aspect-[4/3]"
              />
            </div>

            <div className="space-y-6">
              {config.services.slice(0, 4).map((service, i) => (
                <div
                  key={service}
                  className={`flex gap-5 md:gap-7 ${i % 2 === 1 ? 'md:translate-x-6' : ''}`}
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-semibold text-white md:h-12 md:w-12 md:text-base"
                    style={{ backgroundColor: accent }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 rounded-2xl border p-6 shadow-sm" style={{ borderColor: t.border, backgroundColor: t.cardBg }}>
                    <h3 className="text-base font-semibold" style={text.primary}>
                      {service}
                    </h3>
                    <p className="mt-2 text-sm" style={text.secondary}>
                      Clear scope, timeline, and pricing. We provide structured deliverables with
                      regular updates throughout the process.
                    </p>
                    <button
                      type="button"
                      onClick={() => setLeadOpen(true)}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium transition hover:gap-2"
                      style={{ color: accent }}
                    >
                      Learn more <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Staggered quotes */}
      <section id="pro-proof" className="py-14 scroll-mt-20" style={{ backgroundColor: t.pageBg }}>
        <div className={shellClass}>
          <div className="mb-10 max-w-2xl">
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-3"
              style={{ color: accent }}
            >
              Client Results
            </p>
            <h2
              className="text-2xl font-bold md:text-3xl"
              style={{ fontFamily: 'var(--font-montserrat), system-ui, sans-serif', color: t.textPrimary }}
            >
              Trusted by business owners in {config.city}
            </h2>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5" style={{ color: accent, fill: accent }} />
                ))}
              </div>
              <span className="text-sm font-medium" style={text.secondary}>
                {ratingText} rating from {reviewCount}+ clients
              </span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {config.testimonials.map((testimonial, i) => (
              <div
                key={testimonial.name}
                className={`relative rounded-2xl p-8 ${i === 0 ? 'text-white' : 'border'} ${
                  i % 2 === 1 ? 'md:translate-y-4' : ''
                }`}
                style={i === 0 ? { backgroundColor: accent } : { borderColor: t.border, backgroundColor: t.cardBg }}
              >
                <div
                  className="text-6xl font-serif leading-none"
                  style={{ color: i === 0 ? 'rgba(255,255,255,0.3)' : t.border }}
                >
                  &ldquo;
                </div>
                <p className="mt-2 text-base leading-relaxed" style={i === 0 ? { color: 'rgba(255,255,255,0.9)' } : text.secondary}>
                  {testimonial.quote}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                      i === 0 ? 'bg-white/20 text-white' : ''
                    }`}
                    style={i !== 0 ? { backgroundColor: accent, color: t.darkText } : undefined}
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={i === 0 ? undefined : text.primary}>
                      {testimonial.name}
                    </div>
                    <div className="text-xs" style={i === 0 ? { color: 'rgba(255,255,255,0.6)' } : text.muted}>
                      Business Owner
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <ImagePlaceholder
              label={meetingPlaceholder.label}
              hint={meetingPlaceholder.hint}
              accent={accent}
              aspectClassName="aspect-[21/9]"
            />
          </div>
        </div>
      </section>

      {/* Our Approach - Key Differentiators */}
      <section className="border-y py-14" style={{ borderColor: t.border, backgroundColor: t.cardBg }}>
        <div className={shellClass}>
          <div className="grid gap-10 lg:grid-cols-[0.35fr_0.65fr] lg:items-start">
            <div className="space-y-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: accent }}>
                Our Approach
              </p>
              <h2 className="text-2xl font-bold md:text-3xl" style={{ fontFamily: 'var(--font-montserrat), system-ui, sans-serif', color: t.textPrimary }}>
                What sets us apart
              </h2>
            </div>

            <div className="grid gap-6">
              <div className="flex gap-4 rounded-2xl border p-6" style={{ borderColor: t.border, backgroundColor: t.surfaceBg }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border-2" style={{ borderColor: accent, backgroundColor: `${accent}08` }}>
                  <Clock className="w-6 h-6" style={{ color: accent }} />
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-2" style={text.primary}>Responsive Communication</h3>
                  <p className="text-sm leading-relaxed" style={text.secondary}>
                    We respond within 24 hours and keep you informed at every stage of your matter
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-2xl border p-6" style={{ borderColor: t.border, backgroundColor: t.surfaceBg }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border-2" style={{ borderColor: accent, backgroundColor: `${accent}08` }}>
                  <FileCheck className="w-6 h-6" style={{ color: accent }} />
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-2" style={text.primary}>Transparent Pricing</h3>
                  <p className="text-sm leading-relaxed" style={text.secondary}>
                    Clear fee structures discussed upfront with no hidden costs or surprises
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-2xl border p-6" style={{ borderColor: t.border, backgroundColor: t.surfaceBg }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border-2" style={{ borderColor: accent, backgroundColor: `${accent}08` }}>
                  <Briefcase className="w-6 h-6" style={{ color: accent }} />
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-2" style={text.primary}>Business-Focused</h3>
                  <p className="text-sm leading-relaxed" style={text.secondary}>
                    We understand the commercial implications and provide practical, actionable advice
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process - Horizontal Steps */}
      <section
        className="relative py-16"
        style={{
          backgroundColor: t.darkBg,
        }}
      >
        <div className={shellClass}>
          <div className="mb-10 max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-3" style={{ color: accent }}>
              Our Process
            </p>
            <h2
              className="text-2xl font-bold text-white md:text-3xl"
              style={{ fontFamily: 'var(--font-montserrat), system-ui, sans-serif' }}
            >
              What to expect when you reach out
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Request Consultation',
                desc: 'Share the situation. We confirm fit and schedule a short consult.',
              },
              {
                step: '02',
                title: 'Review Options',
                desc: 'We outline options, timelines, and fees before you decide.',
              },
              {
                step: '03',
                title: 'Clear Next Steps',
                desc: 'You receive a clear plan and one point of contact.',
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className={`rounded-xl border border-white/10 bg-white/5 p-6 shadow-sm ${
                  i === 1 ? 'md:-translate-y-3' : i === 2 ? 'md:translate-y-3' : ''
                }`}
              >
                <div
                  className="text-3xl font-bold"
                  style={{ color: accent }}
                >
                  {item.step}
                </div>
                <h3 className="mt-3 text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - Two-column cards */}
      <section id="pro-faq" className="py-14 scroll-mt-20" style={{ backgroundColor: t.cardBg }}>
        <div className={shellClass}>
          <div className="mb-10 max-w-2xl">
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-3"
              style={{ color: accent }}
            >
              FAQ
            </p>
            <h2
              className="text-2xl font-bold md:text-3xl"
              style={{ fontFamily: 'var(--font-montserrat), system-ui, sans-serif', color: t.textPrimary }}
            >
              Common questions answered
            </h2>
          </div>

          <div className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-2">
            {config.faqs.map((faq, i) => (
              <div
                key={faq.q}
                className="rounded-xl border p-5"
                style={{ borderColor: t.border, backgroundColor: t.surfaceBg }}
              >
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold [&::-webkit-details-marker]:hidden" style={text.primary}>
                    <span className="flex items-center gap-4">
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-bold text-white"
                        style={{ backgroundColor: accent }}
                      >
                        {i + 1}
                      </span>
                      {faq.q}
                    </span>
                    <span className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition group-open:rotate-45" style={{ borderColor: t.border }}>
                      <span className="text-lg leading-none" style={{ color: t.textMuted }}>+</span>
                    </span>
                  </summary>
                  <div className="pt-3">
                    <p className="text-sm" style={text.secondary}>{faq.a}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Split Dark/Light */}
      <section id="pro-cta">
        <div className="grid md:grid-cols-2">
          <div className="px-6 py-16 md:px-12" style={{ backgroundColor: t.darkBg }}>
            <div className="mx-auto max-w-md">
              <h2
                className="text-2xl font-bold text-white md:text-3xl"
                style={{ fontFamily: 'var(--font-montserrat), system-ui, sans-serif' }}
              >
                Start with a focused, confidential consult
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                We review the situation, confirm fit, and outline the next steps.
              </p>
              <button
                type="button"
                className="mt-6 rounded-lg px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]"
                style={{ backgroundColor: accent, boxShadow: `0 4px 14px ${accent}40` }}
                onClick={() => setLeadOpen(true)}
              >
                {config.ctaPrimary}
              </button>
            </div>
          </div>
          <div
            className="flex items-center px-6 py-16 md:px-12"
            style={{
              backgroundColor: t.surfaceBg,
            }}
          >
            <div className="mx-auto max-w-md">
              <p className="text-sm" style={text.muted}>Prefer to talk?</p>
              <a
                href={`tel:${cleanPhone}`}
                className="mt-2 block text-2xl font-bold transition hover:opacity-80 md:text-3xl"
                style={{ fontFamily: 'var(--font-montserrat), system-ui, sans-serif', color: t.textPrimary }}
              >
                {config.phone}
              </a>
              <p className="mt-3 text-sm" style={text.secondary}>
                Mon - Fri, 8am - 6pm | {config.city}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-medium" style={text.muted}>
                <ShieldCheck className="h-4 w-4" style={{ color: accent }} />
                <span>Confidential consultations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-6 text-xs" style={{ borderColor: t.border, backgroundColor: t.cardBg, color: t.textMuted }}>
        <div className={`${shellClass} flex flex-col gap-2 md:flex-row md:items-center md:justify-between`}>
          <span>{config.businessName}</span>
          <span>
            {config.city} | {config.phone}
          </span>
          <span>Mon - Fri, 8am - 6pm</span>
        </div>
      </footer>

      <LeadCaptureModal
        open={leadOpen}
        onOpenChange={setLeadOpen}
        accent={accent}
        businessName={config.businessName}
        serviceLabel={config.primaryService}
        ctaLabel={config.ctaPrimary}
      />
    </div>
  );
}


