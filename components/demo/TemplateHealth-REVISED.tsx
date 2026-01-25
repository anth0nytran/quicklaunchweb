'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, HeartPulse, Star, Menu, X, Phone } from 'lucide-react';
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
  const shellClass = 'mx-auto w-full max-w-6xl px-4 sm:px-6';
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
    { label: 'Reviews', href: '#health-proof' },
    { label: 'FAQ', href: '#health-faq' },
  ];

  const roomPlaceholder = config.imagePlaceholders[0] ?? {
    label: 'Treatment Room',
    hint: 'Calm, private suite',
  };
  const providerPlaceholder = config.imagePlaceholders[1] ?? {
    label: 'Provider Photo',
    hint: 'Licensed clinician',
  };

  return (
    <div className="bg-white">
      {/* Nav */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
        }`}
      >
        <div className={`${shellClass} flex items-center justify-between py-3.5`}>
          <a href="#" className="flex items-center gap-2">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{ backgroundColor: accent }}
            >
              {config.businessName.charAt(0)}
            </div>
            <span className="text-sm font-semibold text-slate-900">{config.businessName}</span>
          </a>

          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-600 transition hover:text-slate-900"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`tel:${cleanPhone}`}
              className="text-sm text-slate-600 transition hover:text-slate-900"
            >
              {config.phone}
            </a>
            <button
              type="button"
              onClick={() => setLeadOpen(true)}
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: accent }}
            >
              {config.ctaPrimary}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t bg-white px-4 py-4 md:hidden">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm text-slate-600"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-2 border-t pt-4">
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center justify-center gap-2 rounded-full border-2 py-2.5 text-sm font-medium"
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
                className="rounded-full py-2.5 text-sm font-semibold text-white"
                style={{ backgroundColor: accent }}
              >
                {config.ctaPrimary}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero - Asymmetric with large quote */}
      <section className="relative overflow-hidden">
        {/* Soft gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(165deg, ${accent}08 0%, transparent 50%, ${accent}12 100%)`
          }}
        />

        <div className={`${shellClass} relative py-16 lg:py-24`}>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <motion.div initial="initial" animate="animate" variants={fadeInUp}>
              {/* Large decorative quote */}
              <div className="mb-6 text-8xl font-light leading-none opacity-10" style={{ color: accent }}>"</div>

              <h1 className="text-4xl font-light leading-tight md:text-5xl lg:text-6xl" style={{ letterSpacing: '-0.02em', marginTop: '-60px' }}>
                Gentle, personalized care for{' '}
                <span className="font-normal" style={{ color: accent }}>{config.primaryService}</span>
              </h1>

              <p className="mt-6 text-lg font-light leading-relaxed text-slate-600 max-w-xl">
                Experience a calming, appointment-first approach with licensed providers who create personalized treatment plans
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="rounded-full px-8 py-4 text-base font-medium text-white shadow-lg transition-all hover:shadow-xl"
                  style={{ backgroundColor: accent }}
                  onClick={() => setLeadOpen(true)}
                >
                  {config.ctaPrimary}
                </button>
                <a
                  href={`tel:${cleanPhone}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 px-8 py-4 text-base font-medium transition-all hover:bg-slate-50"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              </div>

              {/* Stats inline with text flow */}
              <div className="mt-12 flex flex-wrap gap-8 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-light" style={{ color: accent }}>{ratingText}</div>
                  <div className="text-xs leading-tight">
                    <Star className="h-3 w-3 inline" style={{ color: accent, fill: accent }} />
                    <div>{reviewCount}+ reviews</div>
                  </div>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div className="text-sm">
                  <div className="font-medium text-slate-900">{years}+ years</div>
                  <div className="text-xs">In practice</div>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div className="text-sm">
                  <div className="font-medium text-slate-900">Same-week</div>
                  <div className="text-xs">Appointments</div>
                </div>
              </div>
            </motion.div>

            <motion.div initial="initial" animate="animate" variants={fadeInUp} className="relative">
              <ImagePlaceholder
                label={roomPlaceholder.label}
                hint={roomPlaceholder.hint}
                accent={accent}
                aspectClassName="aspect-[4/5]"
              />
              {/* Floating badge overlaps image */}
              <div
                className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-6 shadow-2xl"
                style={{ border: `1px solid ${accent}15` }}
              >
                <div className="text-4xl font-light" style={{ color: accent }}>30min</div>
                <div className="text-xs font-medium text-slate-600">Avg. consult time</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Treatment Carousel - breaks the container */}
      <section id="treatments" className="py-20 -mt-12 scroll-mt-20" style={{ background: `linear-gradient(180deg, transparent 0%, ${accent}04 100%)` }}>
        <div className="mb-12 text-center">
          <div className="inline-block text-xs font-medium uppercase tracking-wider mb-3 px-4 py-1.5 rounded-full bg-white shadow-sm" style={{ color: accent, border: `1px solid ${accent}20` }}>
            Treatment Menu
          </div>
          <h2 className="text-3xl font-light text-slate-900 lg:text-4xl" style={{ letterSpacing: '-0.02em' }}>
            Browse by goal and result
          </h2>
        </div>

        <ServiceCarousel
          accent={accent}
          services={serviceCards}
          onBook={(service) => {
            setLeadService(service.name);
            setLeadOpen(true);
          }}
        />
      </section>

      {/* Services - Bento grid style, not linear */}
      <section id="health-services" className="py-20 scroll-mt-20 bg-white">
        <div className={shellClass}>
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl font-light text-slate-900 md:text-4xl mb-4" style={{ letterSpacing: '-0.02em' }}>
              Signature services
            </h2>
            <p className="text-base font-light leading-relaxed text-slate-600">
              Every session begins with a consultation to ensure the best results for your unique needs
            </p>
          </div>

          {/* Asymmetric bento grid */}
          <div className="grid gap-4 md:grid-cols-12">
            {/* Large feature - spans more space */}
            <div className="md:col-span-7 md:row-span-2">
              <div
                className="flex h-full flex-col justify-between rounded-3xl p-10 text-white"
                style={{
                  background: `linear-gradient(135deg, ${accent} 0%, ${accent}dd 100%)`,
                }}
              >
                <div>
                  <div className="text-sm font-light uppercase tracking-wider opacity-80 mb-4">
                    Most Popular
                  </div>
                  <h3 className="text-3xl font-light mb-4" style={{ letterSpacing: '-0.01em' }}>{config.services[0]}</h3>
                  <p className="text-base text-white/90 font-light leading-relaxed max-w-md">
                    Custom timing and aftercare guidance included with every session. Our most requested treatment for visible results.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setLeadService(config.services[0]);
                    setLeadOpen(true);
                  }}
                  className="mt-8 self-start rounded-full bg-white px-8 py-3 text-base font-medium transition-all hover:shadow-xl"
                  style={{ color: accent }}
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Smaller service cards - varied heights */}
            {config.services.slice(1, 4).map((service, i) => (
              <div key={service} className={`md:col-span-5 ${i === 0 ? 'md:row-span-1' : ''}`}>
                <div
                  className="h-full rounded-2xl bg-white p-6 transition-all hover:shadow-lg"
                  style={{ border: `1px solid ${accent}15` }}
                >
                  <h3 className="text-lg font-medium text-slate-900 mb-2">{service}</h3>
                  <p className="text-sm text-slate-600 font-light mb-4">
                    Custom timing and aftercare included
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
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - DARK PARALLAX to break white monotony */}
      <section id="health-proof" className="relative overflow-hidden py-24 scroll-mt-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=80)',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.90) 100%)',
          }}
        />

        <div className={`${shellClass} relative z-10`}>
          {/* Large number visual anchor */}
          <div className="mb-16 text-center">
            <div className="text-8xl font-light text-white/10 mb-4">{reviewCount}+</div>
            <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-6 py-3 backdrop-blur-sm">
              <Star className="h-5 w-5" style={{ color: accent, fill: accent }} />
              <div className="text-white">
                <span className="text-2xl font-light">{ratingText}</span>
                <span className="text-sm ml-2 opacity-70">trusted reviews</span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {config.testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-2xl bg-white/95 p-6 shadow-2xl backdrop-blur-sm"
              >
                <p className="text-sm font-light leading-relaxed text-slate-700">
                  "{testimonial.quote}"
                </p>
                <div className="mt-4 flex items-center gap-3 pt-4 border-t" style={{ borderColor: `${accent}15` }}>
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full font-medium text-white text-sm"
                    style={{ backgroundColor: accent }}
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900">{testimonial.name}</div>
                    <div className="text-xs text-slate-500">Verified Client</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - Diagonal transition from dark */}
      <section id="health-faq" className="relative py-20 scroll-mt-20 bg-white">
        {/* Diagonal cut creates visual transition */}
        <div
          className="absolute top-0 left-0 right-0 h-24"
          style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0) 100%)',
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 100%)'
          }}
        />

        <div className={shellClass}>
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-light lg:text-4xl" style={{ letterSpacing: '-0.02em' }}>
              Common questions
            </h2>

            <div className="space-y-3">
              {config.faqs.map((faq, i) => (
                <details
                  key={faq.q}
                  className="group rounded-xl border-2 bg-white transition-all open:shadow-lg"
                  open={i === 0}
                >
                  <summary className="flex cursor-pointer items-center justify-between p-5 text-base font-medium">
                    {faq.q}
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full transition-transform group-open:rotate-45"
                      style={{ backgroundColor: `${accent}10`, color: accent }}
                    >
                      <span className="text-lg">+</span>
                    </span>
                  </summary>
                  <div className="border-t px-5 pb-5 pt-4 text-sm font-light leading-relaxed text-slate-600">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Overlapping element creates connection */}
      <section className="relative py-20" style={{ backgroundColor: accent }}>
        {/* Overlapping provider image */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 hidden lg:block z-10">
          <div className="w-64">
            <ImagePlaceholder
              label={providerPlaceholder.label}
              hint={providerPlaceholder.hint}
              accent={accent}
              aspectClassName="aspect-square rounded-2xl"
            />
          </div>
        </div>

        <div className={`${shellClass} text-center pt-12 lg:pt-32`}>
          <h2 className="text-4xl font-light text-white md:text-5xl" style={{ letterSpacing: '-0.02em' }}>
            Ready to feel your best?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg font-light leading-relaxed text-white/90">
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

      <footer className="border-t py-6 text-xs text-slate-500">
        <div className={`${shellClass} flex flex-col gap-2 text-center md:flex-row md:justify-between md:text-left`}>
          <span>{config.businessName}</span>
          <span>{config.city} | {config.phone}</span>
          <span>Open Mon - Sat, 9am - 6pm</span>
        </div>
      </footer>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-4 left-0 right-0 z-40 px-4 md:hidden">
        <div className="mx-auto flex max-w-md gap-3 rounded-full bg-white p-3 shadow-2xl" style={{ border: `2px solid ${accent}` }}>
          <a
            href={`tel:${cleanPhone}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 py-3 text-sm font-medium"
          >
            <Phone className="h-4 w-4" />
            Call
          </a>
          <button
            type="button"
            className="flex-1 rounded-full py-3 text-sm font-semibold text-white"
            style={{ backgroundColor: accent }}
            onClick={() => setLeadOpen(true)}
          >
            Book Now
          </button>
        </div>
      </div>

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
