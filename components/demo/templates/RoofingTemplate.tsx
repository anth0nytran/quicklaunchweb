'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Phone,
  ArrowUpRight,
  Check,
  Star,
  ShieldCheck,
  Wrench,
  Clock,
  MapPin,
} from 'lucide-react';
import type { DemoState, QuoteFormData } from '@/lib/demoTypes';
import { TEMPLATES } from '@/lib/demoTemplates';
import { ComparisonSlider } from '../ComparisonSlider';

interface RoofingTemplateProps {
  state: DemoState;
  isMobile: boolean;
  onFormSubmit: () => void;
}

export function RoofingTemplate({ state, isMobile, onFormSubmit }: RoofingTemplateProps) {
  const formRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const template = TEMPLATES.roofing;
  const theme = template.themes.find((t) => t.id === state.theme) || template.themes[0];
  const heroImage = template.heroImages[0];
  const storyImage = template.heroImages[1];
  const detailImage = template.heroImages[2];

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const accent = theme.accent;

  return (
    <div className="bg-[#0a0a0b] text-white min-h-screen pt-20 md:pt-24">
      {/* Grain texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-20 md:top-24 left-0 right-0 z-40 border-b border-white/[0.06] bg-[#0a0a0b]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-black"
              style={{ backgroundColor: accent }}
            >
              {state.businessName.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight">{state.businessName}</p>
              <p className="text-[10px] text-white/40">{state.city}</p>
            </div>
          </div>
          <div className="hidden items-center gap-8 text-[11px] font-medium uppercase tracking-[0.15em] text-white/50 md:flex">
            <a href="#services" className="transition hover:text-white">Services</a>
            <a href="#work" className="transition hover:text-white">Work</a>
            <a href="#process" className="transition hover:text-white">Process</a>
            <a href="#reviews" className="transition hover:text-white">Reviews</a>
          </div>
          <button
            onClick={scrollToForm}
            className="hidden items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold text-black transition hover:opacity-90 md:flex"
            style={{ backgroundColor: accent }}
          >
            {state.cta}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden pt-14">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#0a0a0b] z-10" />
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            unoptimized
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        <div className="relative z-20 mx-auto max-w-6xl px-5 pb-20 pt-16 md:pt-24">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/60">
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
              {state.city} Service Area
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
              Protect the systems that keep your home livable.
            </h1>
            <p className="mt-5 text-base text-white/60 md:text-lg md:leading-relaxed">
              Same-day diagnostics, clear options, and a crew that follows through.
              Roofs, HVAC, and plumbing handled without the runaround.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                style={{ backgroundColor: accent }}
              >
                {state.cta}
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <a
                href={`tel:${state.phone.replace(/\D/g, '')}`}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm text-white/80 transition hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
                {state.phone}
              </a>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap gap-4">
            {[
              { icon: Clock, text: 'Same-day response' },
              { icon: ShieldCheck, text: 'Upfront pricing' },
              { icon: Wrench, text: '5-year warranty' },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60"
              >
                <Icon className="h-3.5 w-3.5" style={{ color: accent }} />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-white/[0.06] bg-[#0f0f10]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
          {[
            { label: 'Jobs completed', value: '520+' },
            { label: 'Avg response', value: '2 hrs' },
            { label: 'Warranty', value: '5 yrs' },
            { label: 'Google rating', value: '4.9' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`px-5 py-6 ${i < 3 ? 'border-r border-white/[0.06]' : ''} ${i < 2 ? 'border-b border-white/[0.06] md:border-b-0' : ''}`}
            >
              <p className="text-2xl font-semibold" style={{ color: accent }}>{stat.value}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 scroll-mt-40">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-10">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">Services</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              The essential systems, handled end-to-end
            </h2>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {state.services.map((service, index) => (
              <div
                key={service}
                className="group flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 transition hover:border-white/10 hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs text-white/30">0{index + 1}</span>
                  <span className="text-base font-medium">{service}</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-white/30 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/60" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Slider Section */}
      <section className="bg-[#0f0f10] py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">Service Focus</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Exterior protection + interior systems
            </h3>
            <p className="mt-4 text-sm text-white/50 leading-relaxed">
              From roof inspections to plumbing repairs and HVAC tune-ups. Drag the slider to compare our service areas.
            </p>
            <div className="mt-8 space-y-3">
              {[
                { title: 'Roofing', desc: 'Inspections, leak repair, full replacements' },
                { title: 'Plumbing', desc: 'Leak detection, pipe repair, water heaters' },
                { title: 'HVAC', desc: 'Seasonal tune-ups, airflow, filter plans' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accent }} />
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="mt-0.5 text-xs text-white/40">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ComparisonSlider
            left={template.heroImages[0]}
            right={template.heroImages[1]}
            accent={accent}
          />
        </div>
      </section>

      {/* Recent Work / Case Study */}
      <section id="work" className="py-20 scroll-mt-40">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">Recent Work</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Case study</h2>
            </div>
            <div className="hidden items-center gap-2 text-xs text-white/40 md:flex">
              <MapPin className="h-3.5 w-3.5" style={{ color: accent }} />
              {state.city}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={storyImage.src}
                alt={storyImage.alt}
                fill
                unoptimized
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-lg font-semibold">Emergency leak + AC restore</p>
                <p className="mt-1 text-sm text-white/60">Coordinated fix within 48 hours</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">The situation</p>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">
                  A mainline leak and failed condenser hit the same day. We coordinated plumbing repair
                  and HVAC replacement with one schedule, keeping the home functional within two days.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: '2', label: 'Systems' },
                  { value: '2 hrs', label: 'Response' },
                  { value: '0', label: 'Follow-ups' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center">
                    <p className="text-xl font-semibold" style={{ color: accent }}>{stat.value}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/40">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="bg-[#0f0f10] py-20 scroll-mt-40">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-10 text-center">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">Process</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Call, diagnose, restore</h2>
            <p className="mt-3 text-sm text-white/50">Every step tracked with text updates.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { title: 'Call', desc: 'Quick intake, priority scheduling, and an upfront visit window.' },
              { title: 'Diagnose', desc: 'On-site inspection and a clear set of repair or replacement options.' },
              { title: 'Restore', desc: 'Work completed fast with clean handoff and warranty coverage.' },
            ].map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold"
                    style={{ backgroundColor: `${accent}20`, color: accent }}
                  >
                    0{index + 1}
                  </span>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                </div>
                <p className="mt-4 text-sm text-white/50 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 scroll-mt-40">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">Reviews</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">What homeowners say</h2>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-current" style={{ color: accent }} />
              ))}
              <span className="ml-2 text-xs text-white/50">4.9 avg</span>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                quote: 'They were on-site within hours and coordinated the roof and plumbing fix in one visit. Clear updates the whole time.',
                name: 'Taylor M.',
              },
              {
                quote: 'Fast HVAC replacement, no surprises, and the house was comfortable again that night.',
                name: 'Chris L.',
              },
            ].map((review) => (
              <div key={review.name} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                <p className="text-sm text-white/70 leading-relaxed">"{review.quote}"</p>
                <p className="mt-4 text-xs text-white/40">{review.name} - {state.city}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section ref={formRef} id="quote-form" className="bg-[#0f0f10] py-20 scroll-mt-40">
        <div className="mx-auto max-w-3xl px-5">
          <div className="mb-10 text-center">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">Get a quote</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Tell us what happened
            </h2>
            <p className="mt-3 text-sm text-white/50">
              Share the issue and your preferred time. We'll reach out to confirm the next available visit.
            </p>
          </div>
          <QuoteForm projectTypes={template.projectTypes} onSubmit={onFormSubmit} accent={accent} />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold">{state.businessName}</p>
            <p className="mt-1 text-xs text-white/40">Serving {state.city} and surrounding areas</p>
          </div>
          <p className="text-xs text-white/40">Mon-Sat 7am-6pm - Emergency support available</p>
          <a
            href={`tel:${state.phone.replace(/\D/g, '')}`}
            className="text-sm font-semibold"
            style={{ color: accent }}
          >
            {state.phone}
          </a>
        </div>
      </footer>

      {/* Mobile sticky CTA */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.06] bg-[#0a0a0b]/95 p-4 backdrop-blur-md">
          <div className="mx-auto flex max-w-lg gap-3">
            <a
              href={`tel:${state.phone.replace(/\D/g, '')}`}
              className="flex-1 rounded-lg border border-white/15 py-3 text-center text-sm text-white"
            >
              Call
            </a>
            <button
              onClick={scrollToForm}
              className="flex-1 rounded-lg py-3 text-center text-sm font-semibold text-black"
              style={{ backgroundColor: accent }}
            >
              {state.cta}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function QuoteForm({
  projectTypes,
  onSubmit,
  accent,
}: {
  projectTypes: string[];
  onSubmit: () => void;
  accent: string;
}) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<QuoteFormData>({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};
    if (!form.name.trim()) newErrors.name = true;
    if (!form.phone.trim()) newErrors.phone = true;
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    onSubmit();
    setForm({ name: '', phone: '', email: '', projectType: '', message: '' });
  };

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10 transition';

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
      <input
        type="text"
        value={form.name}
        onChange={(e) => {
          setForm({ ...form, name: e.target.value });
          setErrors({ ...errors, name: false });
        }}
        placeholder="Full name *"
        className={`${inputClass} ${errors.name ? 'border-red-500/50' : ''}`}
      />
      <input
        type="tel"
        value={form.phone}
        onChange={(e) => {
          setForm({ ...form, phone: e.target.value });
          setErrors({ ...errors, phone: false });
        }}
        placeholder="Phone number *"
        className={`${inputClass} ${errors.phone ? 'border-red-500/50' : ''}`}
      />
      <input
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="Email (optional)"
        className={inputClass}
      />
      <select
        value={form.projectType}
        onChange={(e) => setForm({ ...form, projectType: e.target.value })}
        className={inputClass}
      >
        <option value="">Select project type</option>
        {projectTypes.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      <textarea
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        placeholder="Describe the issue"
        rows={4}
        className={`${inputClass} md:col-span-2`}
      />
      <button
        type="submit"
        disabled={loading}
        className="md:col-span-2 rounded-xl py-3.5 text-sm font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
        style={{ backgroundColor: accent }}
      >
        {loading ? 'Sending...' : 'Request inspection'}
      </button>
    </form>
  );
}
