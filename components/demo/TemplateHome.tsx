'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, ShieldCheck, Star, Menu, X } from 'lucide-react';
import type { BusinessConfig } from '@/lib/demoDefaults';
import { LeadCaptureModal } from './LeadCaptureModal';
import { ComparisonSlider } from './ComparisonSlider';
import { ImagePlaceholder } from './ImagePlaceholder';
import { PreviewBanner } from './PreviewBanner';

const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const fadeInSoft = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};
const staggerSoft = {
  animate: { transition: { staggerChildren: 0.08 } },
};

export function TemplateHome({ config }: { config: BusinessConfig }) {
  const accent = config.accent.hex;
  const t = config.theme.colors; // Theme colors shorthand
  const isDark = config.theme.isDark;
  const cleanPhone = useMemo(() => config.phone.replace(/\D/g, ''), [config.phone]);
  const services = config.services.slice(0, 4);
  const ratingText = config.rating ? config.rating.toFixed(1) : '4.9';
  const reviewCount = config.reviewCount ?? 120;
  const years = config.yearsInBusiness ?? 10;
  const shellClass = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-12 2xl:max-w-[1400px] 2xl:px-16';
  const [leadOpen, setLeadOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Our Work', href: '#work' },
    { label: 'Reviews', href: '#proof' },
    { label: 'FAQ', href: '#faq' },
  ];

  const benefits = [
    'Same-week scheduling with live updates',
    'Written estimates before any work starts',
    'Licensed, insured, and background-checked',
    'Protective cleanup on every visit',
  ];
  const recentJobs = [
    {
      title: 'Leak containment + flashing repair',
      meta: 'Plano  -  3 hours',
      result: 'Same-day tarp + sealed valley',
    },
    {
      title: 'Storm shingle replacement',
      meta: 'Frisco  -  1 day',
      result: '52 shingles matched and installed',
    },
    {
      title: 'HVAC tune-up + airflow balance',
      meta: 'McKinney  -  90 minutes',
      result: '18% efficiency improvement',
    },
  ];

  const steps = [
    {
      title: 'Tell us what is happening',
      body: 'Share photos or a quick description. We confirm availability and timing.',
    },
    {
      title: 'On-site assessment',
      body: 'A lead tech arrives on time with a clear, written estimate.',
    },
    {
      title: 'Work completed',
      body: 'We finish clean, send photos, and keep you updated the whole way.',
    },
  ];

  const beforePlaceholder = config.imagePlaceholders[0] ?? {
    label: 'Before Photo',
    hint: 'Leak damage or worn shingles',
  };
  const afterPlaceholder = config.imagePlaceholders[1] ?? {
    label: 'After Photo',
    hint: 'Clean new install',
  };
  const crewPlaceholder = config.imagePlaceholders[2] ?? {
    label: 'Crew Photo',
    hint: 'Technicians on site',
  };

  // Computed tinted backgrounds using accent
  const accentTint = `${accent}08`; // Very subtle 8% opacity tint
  const accentGlow = `${accent}12`; // Slightly stronger for glows
  const reviewCardBg = isDark ? t.cardBg : 'rgba(255,255,255,0.95)';
  const reviewCardBorder = isDark ? t.border : 'rgba(255,255,255,0.3)';
  const promiseBg = isDark ? t.surfaceBg : t.cardBg;
  const promiseDivider = isDark ? t.borderLight : t.border;

  return (
    <div className="relative" style={{ backgroundColor: t.pageBg, color: t.textPrimary }}>
      {showPreview && (
        <PreviewBanner accent={accent} ctaHref="#home-cta" onClose={() => setShowPreview(false)} />
      )}

      {/* Sticky Navigation */}
      <nav
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? `${t.pageBg}f2` : t.pageBg,
          borderBottom: scrolled ? `1px solid ${t.border}` : 'none',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
        }}
      >
        <div className={`${shellClass} flex items-center justify-between py-4`}>
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white"
              style={{ backgroundColor: accent }}
            >
              {config.businessName.charAt(0)}
            </div>
            <span className="text-sm font-semibold" style={{ color: t.textPrimary }}>
              {config.businessName}
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm transition hover:opacity-80"
                style={{ color: t.textSecondary }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href={`tel:${cleanPhone}`}
              className="text-sm transition hover:opacity-80"
              style={{ color: t.textSecondary }}
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

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
            style={{ border: `1px solid ${t.border}`, color: t.textPrimary }}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="px-6 py-4 md:hidden" style={{ borderTop: `1px solid ${t.borderLight}`, backgroundColor: t.pageBg }}>
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm transition"
                  style={{ color: t.textSecondary }}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-2 pt-4" style={{ borderTop: `1px solid ${t.borderLight}` }}>
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium"
                style={{ border: `1px solid ${t.border}`, color: t.textPrimary }}
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

      {/* Hero Section - clean with subtle texture */}
      <section className="relative pb-12 pt-6 overflow-hidden" style={{ backgroundColor: t.pageBg }}>
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, ${accent} 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
        <div className={`${shellClass} relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center`}>
          <motion.div initial="initial" animate="animate" variants={fadeInUp} className="space-y-8">
            {/* Hero headline - F-scan pattern starts here */}
            <div className="space-y-4">
              <div className="inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: t.textMuted, borderColor: t.border }}>
                Demo content  -  sample copy
              </div>
              <h1 className="text-4xl font-black leading-[1.1] tracking-tight md:text-5xl lg:text-6xl" style={{ color: t.textPrimary }}>
                Fast, Reliable{' '}
                <span style={{ color: accent }}>{config.primaryService}</span>
              </h1>
              <div className="h-1 w-24" style={{ backgroundColor: accent }} />
              <p className="text-xl font-bold leading-relaxed max-w-xl" style={{ color: t.textPrimary }}>
                Serving {config.city} - Licensed & Insured - {years}+ Years Local
              </p>
            </div>

            {/* Key benefits - F-scan vertical column */}
            <div className="space-y-3 max-w-xl">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: accent }} />
                <p className="text-base font-medium" style={{ color: t.textSecondary }}>
                  Same-week scheduling with clear written estimates
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: accent }} />
                <p className="text-base font-medium" style={{ color: t.textSecondary }}>
                  Licensed crew with {reviewCount}+ completed jobs
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: accent }} />
                <p className="text-base font-medium" style={{ color: t.textSecondary }}>
                  Photo updates and protective cleanup on every visit
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center pt-2">
              <button
                type="button"
                className="rounded px-8 py-4 text-base font-black text-white shadow-lg transition-all hover:shadow-xl uppercase tracking-wide"
                style={{ backgroundColor: accent }}
                onClick={() => setLeadOpen(true)}
              >
                {config.ctaPrimary}
              </button>
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center justify-center gap-2 rounded px-8 py-4 text-base font-black transition-all hover:opacity-90 uppercase tracking-wide"
                style={{ border: `2px solid ${t.border}`, color: t.textPrimary }}
              >
                <Phone className="h-5 w-5" />
                Call {config.phone}
              </a>
            </div>
          </motion.div>

          <motion.div initial="initial" animate="animate" variants={fadeInUp} className="space-y-4">
            <ComparisonSlider
              accent={accent}
              beforeLabel={beforePlaceholder.label}
              beforeHint={beforePlaceholder.hint}
              afterLabel={afterPlaceholder.label}
              afterHint={afterPlaceholder.hint}
            />
            <div className="text-xs" style={{ color: t.textMuted }}>
              Drag the slider to show before and after results in seconds.
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar - industrial style */}
      <section className="py-8" style={{ borderTop: `4px solid ${accent}`, borderBottom: `4px solid ${accent}`, backgroundColor: t.darkBg }}>
        <div className={shellClass}>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-black text-white mb-1">{reviewCount}+</div>
              <div className="text-xs font-bold text-white/70 uppercase tracking-wide">Jobs Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-white mb-1">{years}+</div>
              <div className="text-xs font-bold text-white/70 uppercase tracking-wide">Years Local</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-1" style={{ color: accent }}>{ratingText}</div>
              <div className="text-xs font-bold text-white/70 uppercase tracking-wide">Star Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-1" style={{ color: accent }}>24hr</div>
              <div className="text-xs font-bold text-white/70 uppercase tracking-wide">Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us - Bold dark section with parallax */}
      <section id="why-us" className="relative scroll-mt-20 overflow-hidden" style={{ borderTop: `4px solid ${accent}`, borderBottom: `4px solid ${accent}` }}>
        {/* Parallax background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80)',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Strong dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.88) 100%)'
          }}
        />
        <div className="relative py-16 z-10">
          <div className={shellClass}>
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <div className="inline-block px-4 py-2 rounded mb-6" style={{ backgroundColor: accent }}>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-white">
                    Why Homeowners Choose Us
                  </p>
                </div>
                <h2 className="text-3xl font-black text-white md:text-4xl leading-tight">
                  Direct Answers. Fast Scheduling. No Pressure.
                </h2>
                <div className="mt-10 space-y-4">
                  {benefits.map((benefit, i) => (
                    <div
                      key={benefit}
                      className="flex items-start gap-4 p-5 rounded border-l-4"
                      style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderLeftColor: accent }}
                    >
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded text-lg font-black flex-shrink-0"
                        style={{ backgroundColor: accent, color: '#000' }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-base font-bold text-white leading-relaxed pt-1">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="rounded-lg p-8 shadow-2xl"
                style={{ backgroundColor: promiseBg, border: `3px solid ${accent}` }}
              >
                <div className="text-sm font-black uppercase tracking-[0.2em] mb-8" style={{ color: accent }}>
                  Service Promise
                </div>
                <div className="space-y-6">
                  {[
                    { label: 'Response time', value: 'Within 2 hours', highlight: true },
                    { label: 'Written estimate', value: 'Before work' },
                    { label: 'Cleanup', value: 'Always included' },
                  ].map((item, i, arr) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between pb-5"
                      style={{ borderBottom: i < arr.length - 1 ? `2px solid ${promiseDivider}` : 'none' }}
                    >
                      <span className="text-base font-bold" style={{ color: t.textPrimary }}>{item.label}</span>
                      <span
                        className="text-lg font-black"
                        style={{ color: item.highlight ? accent : t.textPrimary }}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services - Clean card list */}
      <section id="services" className="py-16 scroll-mt-20" style={{ backgroundColor: t.surfaceBg, borderTop: `4px solid ${t.border}` }}>
        <div className={shellClass}>
          <div className="mb-10">
            <div className="inline-block px-3 py-1.5 rounded mb-3" style={{ backgroundColor: accent }}>
              <p className="text-xs font-black uppercase tracking-wider text-white">Services</p>
            </div>
            <h2 className="text-3xl font-black mb-2" style={{ color: t.textPrimary }}>
              What We Do
            </h2>
            <p className="text-base font-medium max-w-xl" style={{ color: t.textMuted }}>
              Licensed professionals in {config.city} - Same-week availability
            </p>
          </div>
          <motion.div
            variants={staggerSoft}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {services.map((service, i) => (
              <motion.div
                key={service}
                variants={fadeInSoft}
                className="group relative overflow-hidden rounded-lg transition-all hover:shadow-lg cursor-pointer"
                style={{ backgroundColor: t.cardBg, border: `3px solid ${t.border}` }}
              >
                <div className="p-5 border-l-4" style={{ borderLeftColor: accent }}>
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 rounded mb-3 text-base font-black"
                    style={{ backgroundColor: accent, color: '#fff' }}
                  >
                    {i + 1}
                  </div>
                  <h3 className="text-base font-black uppercase mb-2" style={{ color: t.textPrimary }}>
                    {service}
                  </h3>
                  <p className="text-xs font-bold mb-3" style={{ color: t.textMuted }}>
                    Written estimate - Licensed crew
                  </p>
                  <button
                    type="button"
                    className="text-xs font-black uppercase tracking-wide transition-all hover:gap-2 inline-flex items-center gap-1"
                    style={{ color: accent }}
                    onClick={() => setLeadOpen(true)}
                  >
                    Get Quote ?
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-12" style={{ borderTop: `4px solid ${t.border}`, backgroundColor: t.cardBg }}>
        <div className={shellClass}>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-lg" style={{ backgroundColor: `${accent}08`, border: `3px solid ${accent}` }}>
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: accent }}>
                  <ShieldCheck className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-black mb-2" style={{ color: t.textPrimary }}>Our Service Guarantee</h3>
                <p className="text-base font-medium" style={{ color: t.textMuted }}>
                  100% satisfaction guaranteed on every job. If you're not happy with our work, we'll make it right - no questions asked. Licensed, insured, and backed by {years}+ years of quality service in {config.city}.
                </p>
              </div>
              <div className="flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setLeadOpen(true)}
                  className="rounded px-6 py-3 text-sm font-black text-white shadow-lg uppercase tracking-wide"
                  style={{ backgroundColor: accent }}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Work Gallery */}
      <section id="work" className="py-16 scroll-mt-20" style={{ borderTop: `4px solid ${t.border}`, backgroundColor: t.surfaceBg }}>
        <div className={shellClass}>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <div className="inline-block px-3 py-1.5 rounded mb-3" style={{ backgroundColor: accent }}>
                <p className="text-xs font-black uppercase tracking-wider text-white">Recent Work</p>
              </div>
              <h2 className="text-3xl font-black" style={{ color: t.textPrimary }}>
                Real Jobs, Real Results
              </h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <ImagePlaceholder label={beforePlaceholder.label} hint={beforePlaceholder.hint} accent={accent} aspectClassName="aspect-[4/3]" />
            <ImagePlaceholder label={afterPlaceholder.label} hint={afterPlaceholder.hint} accent={accent} aspectClassName="aspect-[4/3]" />
            <ImagePlaceholder label={crewPlaceholder.label} hint={crewPlaceholder.hint} accent={accent} aspectClassName="aspect-[4/3]" />
          </div>
          <motion.div
            variants={staggerSoft}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-8 grid gap-4 md:grid-cols-3"
          >
            {recentJobs.map((job) => (
              <motion.div
                key={job.title}
                variants={fadeInSoft}
                className="rounded-xl border p-4"
                style={{ backgroundColor: t.cardBg, borderColor: t.border }}
              >
                <div className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: t.textMuted }}>
                  Recent job
                </div>
                <div className="mt-2 text-base font-black" style={{ color: t.textPrimary }}>
                  {job.title}
                </div>
                <div className="mt-1 text-xs" style={{ color: t.textSecondary }}>
                  {job.meta}
                </div>
                <div className="mt-3 text-sm font-medium" style={{ color: t.textSecondary }}>
                  {job.result}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews section with parallax background */}
      <section
        id="proof"
        className="relative py-16 scroll-mt-20 overflow-hidden"
        style={{ borderTop: `4px solid ${accent}` }}
      >
        {/* Parallax background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1600&q=80)',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.90) 100%)'
          }}
        />
        <div className={`${shellClass} relative z-10 grid gap-10 md:grid-cols-[0.6fr_1.4fr] md:items-start`}>
          {/* Rating card */}
          <div
            className="rounded-lg p-8 shadow-2xl backdrop-blur-sm"
            style={{ backgroundColor: reviewCardBg, border: `3px solid ${accent}` }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div
                className="flex h-16 w-16 items-center justify-center rounded shadow-lg"
                style={{ backgroundColor: accent }}
              >
                <Star className="h-8 w-8 text-white" style={{ fill: 'white' }} />
              </div>
              <div>
                <div className="text-5xl font-black" style={{ color: t.textPrimary }}>{ratingText}</div>
                <div className="text-sm font-bold" style={{ color: t.textMuted }}>{reviewCount}+ Reviews</div>
              </div>
            </div>
            <div className="space-y-4 text-base font-bold" style={{ color: t.textPrimary }}>
              {[
                { label: `Years in ${config.city}`, value: `${years}+` },
                { label: 'Licensed and insured', value: 'Yes' },
                { label: 'Same-week availability', value: 'Yes' },
              ].map((item, i, arr) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-3"
                  style={{ borderBottom: i < arr.length - 1 ? `2px solid ${t.border}` : 'none' }}
                >
                  <span>{item.label}</span>
                  <span className="font-black" style={{ color: accent }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="space-y-5">
            <p className="text-sm font-black uppercase tracking-[0.2em] mb-6" style={{ color: accent }}>What Clients Say</p>
            {config.testimonials.map((testimonial, i) => (
              <div
                key={testimonial.name}
                className="relative rounded-lg p-6 shadow-2xl transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-sm"
                style={{ backgroundColor: reviewCardBg, border: `2px solid ${reviewCardBorder}` }}
              >
                {/* Quote mark */}
                <div className="absolute -top-3 left-5 text-5xl font-serif leading-none opacity-10" style={{ color: accent }}>&ldquo;</div>
                <p className="text-base leading-relaxed pt-2 font-medium" style={{ color: t.textPrimary }}>{testimonial.quote}</p>
                <div className="mt-5 flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded flex items-center justify-center text-base font-black text-white shadow"
                    style={{ backgroundColor: accent }}
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-base font-black" style={{ color: t.textPrimary }}>{testimonial.name}</div>
                    <div className="text-xs font-bold" style={{ color: t.textMuted }}>Verified Customer</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process - Enhanced timeline with connecting line */}
      <section className="py-16" style={{ borderTop: `3px solid ${t.border}`, backgroundColor: t.cardBg }}>
        <div className={shellClass}>
          <div className="mb-8 text-center">
            <div className="inline-block px-3 py-1.5 rounded mb-3" style={{ backgroundColor: accent }}>
              <p className="text-xs font-black uppercase tracking-wider text-white">How it Works</p>
            </div>
            <h2 className="text-2xl font-black md:text-3xl" style={{ color: t.textPrimary }}>Three Simple Steps</h2>
          </div>
          <div className="relative">
            {/* Connecting line with gradient */}
            <div
              className="absolute left-0 right-0 top-10 hidden h-0.5 md:block"
              style={{ background: `linear-gradient(90deg, transparent 10%, ${accent}30 30%, ${accent}30 70%, transparent 90%)` }}
            />
            <div className="grid gap-6 md:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step.title} className="relative text-center">
                  {/* Step number - industrial badge style */}
                  <div
                    className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded text-2xl font-black text-white shadow-lg"
                    style={{ backgroundColor: accent }}
                  >
                    {index + 1}
                  </div>
                  <h3 className="mt-4 text-base font-black uppercase tracking-wide" style={{ color: t.textPrimary }}>{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed max-w-xs mx-auto font-medium" style={{ color: t.textMuted }}>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Enhanced with better interactivity */}
      <section id="faq" className="py-16 scroll-mt-20" style={{ borderTop: `3px solid ${t.border}`, backgroundColor: t.surfaceBg }}>
        <div className={shellClass}>
          <div className="grid gap-10 md:grid-cols-[0.4fr_0.6fr] md:items-start">
            <div className="md:sticky md:top-24">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: accent }}>FAQ</p>
              <h2 className="text-2xl font-bold md:text-3xl" style={{ color: t.textPrimary, fontFamily: 'var(--font-montserrat), system-ui, sans-serif' }}>
                Quick answers before you book.
              </h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: t.textMuted }}>
                Still have questions? Call us directly.
              </p>
              <a
                href={`tel:${cleanPhone}`}
                className="mt-5 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:scale-[1.02]"
                style={{ backgroundColor: accent, boxShadow: `0 4px 12px ${accent}30` }}
              >
                <Phone className="h-4 w-4" />
                {config.phone}
              </a>
            </div>
            <div className="space-y-3">
              {config.faqs.map((faq, i) => (
                <details
                  key={faq.q}
                  className="group rounded-xl transition-all open:shadow-md"
                  style={{ backgroundColor: t.cardBg, border: `1px solid ${t.border}` }}
                  open={i === 0}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between p-5 text-sm font-semibold transition-colors" style={{ color: t.textPrimary }}>
                    {faq.q}
                    <span
                      className="ml-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-200 group-open:rotate-45"
                      style={{ backgroundColor: `${accent}15`, color: accent }}
                    >
                      <span className="text-base leading-none font-medium">+</span>
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: t.textSecondary }}>
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - bold and clean */}
      <section id="home-cta" className="py-16 border-t-3" style={{ borderColor: accent, backgroundColor: accent }}>
        <div className={`${shellClass} flex flex-col gap-6 md:flex-row md:items-center md:justify-between`}>
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tight md:text-5xl text-white">
              Ready to Start?
            </h2>
            <p className="mt-4 text-xl font-bold text-white">
              Free estimate - Same-week start - Licensed crew
            </p>
            <p className="mt-2 text-base font-medium text-white/90">
              Serving {config.city} and surrounding areas
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-shrink-0">
            <button
              type="button"
              className="rounded px-8 py-4 text-base font-black shadow-xl uppercase tracking-wide transition-all hover:scale-105"
              style={{ backgroundColor: 'white', color: accent }}
              onClick={() => setLeadOpen(true)}
            >
              {config.ctaPrimary}
            </button>
            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center justify-center gap-2 rounded px-8 py-4 text-base font-black uppercase tracking-wide transition-all hover:bg-white/10"
              style={{ border: `3px solid white`, color: 'white' }}
            >
              <Phone className="h-5 w-5" />
              {config.phone}
            </a>
          </div>
        </div>
      </section>

      <footer className="py-6 text-xs" style={{ borderTop: `1px solid ${t.border}`, color: t.textMuted }}>
        <div className={`${shellClass} flex flex-col gap-2 md:flex-row md:items-center md:justify-between`}>
          <span>{config.businessName}</span>
          <span>{config.city} | {config.phone}</span>
          <span>Service hours 7am - 7pm</span>
        </div>
      </footer>

      <div className="fixed bottom-4 left-0 right-0 z-40 px-4 md:hidden">
        <div
          className="mx-auto flex max-w-md gap-3 rounded p-3 shadow-2xl"
          style={{ backgroundColor: t.cardBg, border: `3px solid ${accent}` }}
        >
          <a
            href={`tel:${cleanPhone}`}
            className="flex flex-1 items-center justify-center gap-2 rounded px-3 py-3 text-sm font-black uppercase tracking-wide transition-all"
            style={{ border: `2px solid ${t.border}`, color: t.textPrimary }}
          >
            <Phone className="h-4 w-4" />
            Call
          </a>
          <button
            type="button"
            className="flex-1 rounded px-3 py-3 text-sm font-black text-white uppercase tracking-wide shadow-lg transition-all"
            style={{ backgroundColor: accent }}
            onClick={() => setLeadOpen(true)}
          >
            Get Quote
          </button>
        </div>
      </div>

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










