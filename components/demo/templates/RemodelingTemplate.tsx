'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Phone, Quote, CheckCircle, MapPin } from 'lucide-react';
import type { DemoState, QuoteFormData } from '@/lib/demoTypes';
import { TEMPLATES } from '@/lib/demoTemplates';
import { ComparisonSlider } from '../ComparisonSlider';

interface RemodelingTemplateProps {
  state: DemoState;
  isMobile: boolean;
  onFormSubmit: () => void;
}

// SIGNATURE STUDIO: Editorial, architectural, high-end
export function RemodelingTemplate({ state, isMobile, onFormSubmit }: RemodelingTemplateProps) {
  const formRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const template = TEMPLATES.remodeling;
  const theme = template.themes.find((t) => t.id === state.theme) || template.themes[0];
  const heroImage = template.heroImages[0];
  const secondaryImage = template.heroImages[1];
  const thirdImage = template.heroImages[2];

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const accent = theme.accent;

  return (
    <div className="min-h-screen bg-[#f4f1ec] text-[#2b2622] pt-24 md:pt-28">
      <nav className="sticky top-0 z-40 border-b border-black/10 bg-[#f4f1ec]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: accent }}
            >
              {state.businessName.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold">{state.businessName}</p>
              <p className="text-xs text-black/50">Design + Build Studio</p>
            </div>
          </div>
          <div className="hidden items-center gap-8 text-xs uppercase tracking-[0.3em] text-black/50 md:flex">
            <a href="#capabilities" className="hover:text-black">
              Capabilities
            </a>
            <a href="#portfolio" className="hover:text-black">
              Portfolio
            </a>
            <a href="#process" className="hover:text-black">
              Process
            </a>
            <a href="#stories" className="hover:text-black">
              Stories
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

      <section ref={heroRef} className="relative overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            unoptimized
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-[#f4f1ec]" />
        </motion.div>

        <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-24 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/70">
              {state.city} Design + Build
            </p>
            <h1 className="mt-4 font-heading text-4xl font-semibold leading-[1.1] text-white md:text-6xl">
              Design + build without the chaos.
              <span className="block" style={{ color: accent }}>
                One team. One timeline.
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/70 md:text-lg">
              We manage design, permits, and construction under one roof so the build stays on
              schedule and your budget stays intact.
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
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm text-white/80"
              >
                <Phone className="h-4 w-4" />
                {state.phone}
              </a>
            </div>
          </div>
          <div className="rounded-3xl border border-white/30 bg-white/90 p-6 text-black shadow-xl">
            <p className="text-xs uppercase tracking-[0.4em] text-black/50">Studio snapshot</p>
            <h3 className="mt-3 font-heading text-lg font-semibold">Full-service build team</h3>
            <p className="mt-3 text-sm text-black/60">
              One contract, one project manager, and a single timeline from concept to final
              walkthrough.
            </p>
            <div className="mt-5 grid gap-3 text-xs text-black/60">
              {['Licensed architects', 'Custom millwork', 'White-glove install'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" style={{ color: accent }} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[0.6fr_1.4fr]">
        <div>
          <Quote className="h-10 w-10" style={{ color: accent }} />
          <p className="mt-6 font-heading text-2xl font-semibold leading-snug">
            Design decisions, budgets, and timelines handled in one place - so you can breathe.
          </p>
          <p className="mt-6 text-sm text-black/60">
            300+ completed projects across high-end residential and boutique hospitality spaces.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { value: '15+', label: 'Years of practice' },
            { value: '300+', label: 'Projects delivered' },
            { value: '98%', label: 'Client satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-black/10 bg-white p-6">
              <p className="text-3xl font-semibold" style={{ color: accent }}>
                {stat.value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-black/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="focus" className="bg-[#ede7df] py-16 scroll-mt-32">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1fr_1fr] md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-black/40">Project focus</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold">
              Remodels or custom builds
            </h2>
            <p className="mt-4 text-sm text-black/60">
              Drag the slider to compare a refined remodel with a full custom build. We guide both
              with the same clear process and documentation.
            </p>
            <div className="mt-6 grid gap-3 text-sm text-black/60">
              {[
                'Full-home remodels with room-by-room phasing',
                'Custom builds with architectural planning support',
                'Material curation and procurement handled in-house',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" style={{ color: accent }} />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <ComparisonSlider
            left={template.heroImages[1]}
            right={template.heroImages[2]}
            accent={accent}
            captionClassName="text-black/40"
            trackColor="rgba(0, 0, 0, 0.12)"
          />
        </div>
      </section>

      <section id="capabilities" className="bg-white py-16 scroll-mt-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.4em] text-black/40">Capabilities</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold">
              Designed for everyday elegance
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-black/60">
              From kitchens to full-home transformations, we guide the scope, schedule, and
              craftsmanship end-to-end so the experience feels calm and predictable.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {state.services.map((service) => (
              <div key={service} className="rounded-2xl border border-black/10 bg-[#f9f7f4] p-5">
                <p className="text-sm font-semibold">{service}</p>
                <p className="mt-2 text-xs text-black/50">
                  Curated materials, custom detailing, and hand-finished installation.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-16 scroll-mt-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-black/40">Portfolio</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold">Signature spaces</h2>
            </div>
            <p className="hidden text-sm text-black/50 md:block">Selected residential work from the last 12 months.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
            <div className="relative min-h-[360px] overflow-hidden rounded-3xl">
              <Image
                src={secondaryImage.src}
                alt={secondaryImage.alt}
                fill
                unoptimized
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="grid gap-4">
              {[thirdImage, template.heroImages[3]].map((img) => (
                <div key={img.id} className="relative min-h-[170px] overflow-hidden rounded-3xl">
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

      <section id="process" className="bg-white py-16 scroll-mt-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-black/40">Process</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold">
              A refined collaboration
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { title: 'Discover', desc: 'Walkthrough, scope clarity, and budget alignment.' },
              { title: 'Design', desc: 'Plans, renderings, and fixed material selections.' },
              { title: 'Build', desc: 'Dedicated PM with weekly updates and milestones.' },
              { title: 'Reveal', desc: 'Final walkthrough with care and maintenance guidance.' },
            ].map((step, index) => (
              <div key={step.title} className="rounded-3xl border border-black/10 bg-[#f9f7f4] p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-black/40">0{index + 1}</p>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-xs text-black/50">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stories" className="py-16 scroll-mt-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-black/40">Client stories</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold">In their words</h2>
            </div>
            <div className="hidden items-center gap-2 text-xs text-black/50 md:flex">
              <MapPin className="h-4 w-4" style={{ color: accent }} />
              Serving {state.city}
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                quote:
                  'They managed design, permits, and build with one clear timeline. The remodel stayed on budget.',
                name: 'Sophie + Aaron',
                project: 'Full-home remodel',
              },
              {
                quote:
                  'Our addition felt seamless because one team owned the entire process from drawings to finish.',
                name: 'Priya K.',
                project: 'Custom addition',
              },
            ].map((story) => (
              <div key={story.name} className="rounded-3xl border border-black/10 bg-white p-6">
                <p className="text-sm text-black/70">"{story.quote}"</p>
                <p className="mt-4 text-xs text-black/50">
                  {story.name} - {story.project}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={formRef} id="quote-form" className="bg-white py-16 scroll-mt-32">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-black/40">Start your project</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold">
              Let us design the next chapter
            </h2>
            <p className="mt-4 text-sm text-black/60">
              Share your vision and timing. We will map the scope, schedule, and next available
              start date.
            </p>
            <div className="mt-6 space-y-3 text-sm text-black/60">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" style={{ color: accent }} />
                Dedicated project manager
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" style={{ color: accent }} />
                Transparent milestones
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" style={{ color: accent }} />
                Procurement handled in-house
              </div>
            </div>
          </div>
          <QuoteForm accent={accent} projectTypes={template.projectTypes} onSubmit={onFormSubmit} />
        </div>
      </section>

      <footer className="border-t border-black/10 bg-[#f4f1ec] py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold">{state.businessName}</p>
            <p className="text-xs text-black/50">{state.city} - Private consultations</p>
          </div>
          <p className="text-xs text-black/50">Mon-Fri 8am-6pm</p>
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
    'w-full rounded-xl border border-black/10 bg-[#f9f7f4] px-4 py-3 text-sm text-black/80 placeholder:text-black/40 focus:border-black/30 focus:outline-none focus:ring-2 focus:ring-black/10';

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
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
        <option value="">Select project type</option>
        {projectTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <textarea
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        placeholder="Tell us about your project"
        rows={4}
        className={inputClass}
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-full py-3 text-sm font-semibold text-white"
        style={{ backgroundColor: accent }}
      >
        {loading ? 'Sending...' : 'Request consultation'}
      </button>
    </form>
  );
}
