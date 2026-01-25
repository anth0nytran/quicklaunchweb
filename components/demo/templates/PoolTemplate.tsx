'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Phone, ArrowRight, Check, Sparkles, Droplets, Star } from 'lucide-react';
import type { DemoState, QuoteFormData } from '@/lib/demoTypes';
import { TEMPLATES } from '@/lib/demoTemplates';
import { ComparisonSlider } from '../ComparisonSlider';

interface PoolTemplateProps {
  state: DemoState;
  isMobile: boolean;
  onFormSubmit: () => void;
}

// LIFESTYLE LUXURY: Calm, premium, hospitality tone
export function PoolTemplate({ state, isMobile, onFormSubmit }: PoolTemplateProps) {
  const formRef = useRef<HTMLDivElement>(null);
  const template = TEMPLATES.pool;
  const theme = template.themes.find((t) => t.id === state.theme) || template.themes[0];
  const heroImage = template.heroImages[0];

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const accent = theme.primary;

  return (
    <div className="min-h-screen bg-[#f7f5f1] text-[#1e2b33] pt-24 md:pt-28">
      <nav className="sticky top-0 z-40 border-b border-black/10 bg-[#f7f5f1]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5" style={{ color: accent }} />
            <span className="text-sm font-semibold tracking-tight">{state.businessName}</span>
          </div>
          <div className="hidden items-center gap-8 text-xs uppercase tracking-[0.3em] text-black/50 md:flex">
            <a href="#services" className="hover:text-black">
              Services
            </a>
            <a href="#plans" className="hover:text-black">
              Membership
            </a>
            <a href="#gallery" className="hover:text-black">
              Gallery
            </a>
            <a href="#reviews" className="hover:text-black">
              Reviews
            </a>
          </div>
          <button
            onClick={scrollToForm}
            className="hidden items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white md:flex"
            style={{ backgroundColor: accent }}
          >
            {state.cta}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </nav>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-black/50">
            {state.city} Outdoor Living
          </p>
          <h1 className="mt-4 font-heading text-4xl font-semibold leading-[1.1] md:text-6xl">
            Make the backyard the
            <span className="block" style={{ color: accent }}>
              best room in the house.
            </span>
          </h1>
          <p className="mt-4 text-base text-black/60 md:text-lg">
            Resort-grade pool care and outdoor living upgrades in one plan. We keep everything
            guest-ready, clean, and operating quietly in the background.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
              style={{ backgroundColor: accent }}
            >
              {state.cta}
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href={`tel:${state.phone.replace(/\D/g, '')}`}
              className="inline-flex items-center gap-2 rounded-full border border-black/20 px-5 py-3 text-sm text-black/70"
            >
              <Phone className="h-4 w-4" />
              {state.phone}
            </a>
          </div>
          <div className="mt-8 grid gap-4 text-xs text-black/50 sm:grid-cols-3">
            {['Weekly water care', 'Outdoor living upgrades', 'Event-ready resets'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4" style={{ color: accent }} />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[360px] overflow-hidden rounded-[2.5rem]">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            unoptimized
            priority
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
          <div className="absolute bottom-6 left-6 rounded-2xl bg-white/90 p-4 shadow-lg">
            <div className="flex items-center gap-1 text-sm">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4" style={{ color: accent }} />
              ))}
            </div>
            <p className="mt-2 text-xs text-black/60">4.9 rating from 140+ clients</p>
          </div>
        </div>
      </section>

      <section id="services" className="border-y border-black/5 bg-white py-16 scroll-mt-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-black/40">Signature services</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold">
                Care that feels effortless
              </h2>
            </div>
            <p className="hidden max-w-xs text-sm text-black/50 md:block">
              Each visit includes inspection notes, water chemistry logs, and proactive fixes.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {state.services.map((service) => (
              <div key={service} className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold">{service}</p>
                <p className="mt-2 text-xs text-black/50">
                  Premium {service.toLowerCase()} with weekly reporting and proactive care.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
          <p className="text-xs uppercase tracking-[0.4em] text-black/40">Experience</p>
          <h3 className="mt-3 font-heading text-2xl font-semibold">Concierge scheduling</h3>
          <p className="mt-4 text-sm text-black/60">
            Requests are handled quickly with a clear arrival window, technician notes, and
            before/after updates so nothing slips through the cracks.
          </p>
          <div className="mt-6 space-y-3 text-sm text-black/60">
            {[
              'Dedicated lead technician',
              'On-site arrival notifications',
              'Digital service summaries',
              'Priority seasonal treatments',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4" style={{ color: accent }} />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-6">
          {template.heroImages.slice(1, 3).map((img) => (
            <div key={img.id} className="relative min-h-[220px] overflow-hidden rounded-3xl">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                unoptimized
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section id="focus" className="bg-[#f4f1ec] py-16 scroll-mt-32">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1fr_1fr] md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-black/40">Service mix</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold">
              Pool care + outdoor living upgrades
            </h2>
            <p className="mt-4 text-sm text-black/60">
              Drag the slider to compare the pool experience with outdoor kitchen upgrades. We plan
              both so the entire backyard feels cohesive.
            </p>
            <div className="mt-6 grid gap-3 text-sm text-black/60">
              {[
                'Weekly pool service with photo check-ins',
                'Outdoor kitchens, pergolas, and lighting upgrades',
                'Seasonal resets for events and entertaining',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4" style={{ color: accent }} />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <ComparisonSlider
            left={template.heroImages[0]}
            right={template.heroImages[2]}
            accent={accent}
            captionClassName="text-black/40"
            trackColor="rgba(0, 0, 0, 0.12)"
          />
        </div>
      </section>

      <section id="plans" className="bg-white py-16 scroll-mt-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-black/40">Membership</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold">Tailored service tiers</h2>
            <p className="mt-4 text-sm text-black/50">
              Pick the cadence that fits your property. Upgrade anytime as the backyard grows.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { name: 'Essentials', price: '$199/mo', desc: 'Weekly clean, chemistry, filter checks.' },
              { name: 'Signature', price: '$299/mo', desc: 'Includes essentials + equipment tuning.' },
              { name: 'Estate', price: 'Custom', desc: 'Multi-pool care, priority support, concierge.' },
            ].map((plan) => (
              <div
                key={plan.name}
                className="rounded-3xl border border-black/10 bg-[#f7f5f1] p-6 text-center"
              >
                <p className="text-sm font-semibold">{plan.name}</p>
                <p className="mt-3 text-2xl font-semibold" style={{ color: accent }}>
                  {plan.price}
                </p>
                <p className="mt-3 text-xs text-black/50">{plan.desc}</p>
                <button
                  onClick={scrollToForm}
                  className="mt-5 w-full rounded-full border border-black/20 py-2 text-xs font-semibold text-black/70"
                >
                  Request details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-16 scroll-mt-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-black/40">Gallery</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold">Recent environments</h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-black/50">
              <Droplets className="h-4 w-4" style={{ color: accent }} />
              Updated weekly
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1.4fr_0.6fr]">
            <div className="relative min-h-[320px] overflow-hidden rounded-3xl">
              <Image
                src={template.heroImages[3].src}
                alt={template.heroImages[3].alt}
                fill
                unoptimized
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="grid gap-4">
              {template.heroImages.slice(0, 2).map((img) => (
                <div key={img.id} className="relative min-h-[150px] overflow-hidden rounded-3xl">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    unoptimized
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="bg-white py-16 scroll-mt-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-black/40">Client stories</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold">Effortless, consistent care</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                quote:
                  'Our pool and outdoor kitchen are show-ready every weekend. The team handles everything quietly in the background.',
                name: 'Jordan + Mel',
              },
              {
                quote:
                  'We booked one plan and got pool care plus patio upgrades. It feels like a private resort now.',
                name: 'Elena R.',
              },
            ].map((review) => (
              <div key={review.name} className="rounded-3xl border border-black/10 bg-[#f7f5f1] p-6">
                <p className="text-sm text-black/70">"{review.quote}"</p>
                <p className="mt-4 text-xs text-black/50">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={formRef} id="quote-form" className="py-16 scroll-mt-32">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-black/40">Get started</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold">
              Request a private walkthrough
            </h2>
            <p className="mt-3 text-sm text-black/50">
              Tell us what you want the backyard to feel like. We will build a plan that gets you
              there fast.
            </p>
          </div>
          <QuoteForm accent={accent} projectTypes={template.projectTypes} onSubmit={onFormSubmit} />
        </div>
      </section>

      <footer className="border-t border-black/10 bg-white py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold">{state.businessName}</p>
            <p className="text-xs text-black/50">Serving {state.city} and nearby communities</p>
          </div>
          <p className="text-xs text-black/50">Mon-Fri 8am-5pm - Weekend visits available</p>
          <a
            href={`tel:${state.phone.replace(/\D/g, '')}`}
            className="text-sm font-semibold"
            style={{ color: accent }}
          >
            {state.phone}
          </a>
        </div>
      </footer>

      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/10 bg-white/95 p-4 backdrop-blur">
          <div className="mx-auto flex max-w-lg gap-3">
            <a
              href={`tel:${state.phone.replace(/\D/g, '')}`}
              className="flex-1 rounded-full border border-black/20 py-3 text-center text-sm text-black/70"
            >
              Call
            </a>
            <button
              onClick={scrollToForm}
              className="flex-1 rounded-full py-3 text-center text-sm font-semibold text-white"
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
  accent,
  projectTypes,
  onSubmit,
}: {
  accent: string;
  projectTypes: string[];
  onSubmit: () => void;
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
    'w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black/80 placeholder:text-black/40 focus:border-black/30 focus:outline-none focus:ring-2 focus:ring-black/10';

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
        className={`${inputClass} ${errors.name ? 'border-red-400' : ''}`}
      />
      <input
        type="tel"
        value={form.phone}
        onChange={(e) => {
          setForm({ ...form, phone: e.target.value });
          setErrors({ ...errors, phone: false });
        }}
        placeholder="Phone number *"
        className={`${inputClass} ${errors.phone ? 'border-red-400' : ''}`}
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
        <option value="">Select a service</option>
        {projectTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <textarea
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        placeholder="Tell us about your backyard"
        rows={4}
        className={`${inputClass} md:col-span-2`}
      />
      <button
        type="submit"
        disabled={loading}
        className="md:col-span-2 rounded-full py-3 text-sm font-semibold text-white"
        style={{ backgroundColor: accent }}
      >
        {loading ? 'Sending...' : 'Request consultation'}
      </button>
    </form>
  );
}
