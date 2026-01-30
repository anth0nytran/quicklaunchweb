'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Menu, X, Phone, ArrowUpRight, ChevronDown, Shield, Scale, Award, Star, Users, Building, TrendingUp, CheckCircle, Quote } from 'lucide-react';
import type { BusinessConfig } from '@/lib/demoDefaults';
import { LeadCaptureModal } from './LeadCaptureModal';
import { PreviewBanner } from './PreviewBanner';
import { ImagePlaceholder } from './ImagePlaceholder';

export function TemplatePro({ config }: { config: BusinessConfig }) {
  const accent = config.accent.hex;
  const t = config.theme.colors;

  const [leadOpen, setLeadOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [activeFaq, setActiveFaq] = useState(0);

  const cleanPhone = config.phone.replace(/\D/g, '');
  const reviewCount = config.reviewCount || 500;
  const years = config.yearsInBusiness || 25;
  const ratingText = config.rating ? config.rating.toFixed(1) : '5.0';

  const shellClass = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-12';

  const navLinks = [
    { label: 'Practice Areas', href: '#expertise' },
    { label: 'Our Team', href: '#team' },
    { label: 'Results', href: '#results' },
    { label: 'Contact', href: '#contact' },
  ];

  const teamMembers = [
    { name: 'Alexander Sterling', role: 'Managing Partner', specialized: 'Corporate Law', initials: 'AS' },
    { name: 'Sarah Vance', role: 'Senior Partner', specialized: 'Mergers and Acquisitions', initials: 'SV' },
    { name: 'James Chen', role: 'Partner', specialized: 'Intellectual Property', initials: 'JC' },
  ];

  return (
    <div className="font-sans antialiased" style={{ backgroundColor: t.pageBg, color: t.textPrimary }}>
      {showPreview && (
        <PreviewBanner accent={accent} ctaHref="#contact" onClose={() => setShowPreview(false)} />
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          HEADER - Corporate Authority
      ═══════════════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 border-b backdrop-blur-md" style={{ backgroundColor: `${t.cardBg}f8`, borderColor: t.border }}>
        <div className={`${shellClass} flex h-20 items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center text-white font-serif text-xl font-bold" style={{ backgroundColor: accent }}>{config.businessName.charAt(0)}</div>
            <div>
              <div className="text-lg font-bold uppercase tracking-tight leading-none" style={{ color: t.textPrimary }}>{config.businessName}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: t.textMuted }}>Attorneys at Law</div>
            </div>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (<a key={link.href} href={link.href} className="text-xs font-bold uppercase tracking-widest transition-colors hover:opacity-80" style={{ color: t.textSecondary }}>{link.label}</a>))}
          </nav>

          <div className="hidden items-center gap-6 md:flex">
            <a href={'tel:' + cleanPhone} className="text-sm font-bold" style={{ color: t.textPrimary }}>{config.phone}</a>
            <button onClick={() => setLeadOpen(true)} className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors" style={{ backgroundColor: accent }}>Free Consult</button>
          </div>

          <button className="md:hidden" style={{ color: t.textPrimary }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X /> : <Menu />}</button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden border-t" style={{ backgroundColor: t.cardBg, borderColor: t.border }}>
              <div className="flex flex-col p-6">
                {navLinks.map((link) => (<a key={link.href} href={link.href} className="py-3 text-lg font-bold" style={{ color: t.textPrimary }} onClick={() => setMobileMenuOpen(false)}>{link.label}</a>))}
                <button onClick={() => setLeadOpen(true)} className="mt-4 w-full py-4 text-white font-bold uppercase tracking-widest" style={{ backgroundColor: accent }}>Request Consultation</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ═══════════════════════════════════════════════════════════════════════
            HERO - Full Background with Consultation Form
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[90vh] overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80)', backgroundPosition: 'center', backgroundSize: 'cover' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.93) 0%, rgba(0,0,0,0.88) 50%, rgba(0,0,0,0.78) 100%)' }} />

          <div className={`${shellClass} relative z-10 py-20 lg:py-28`}>
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 border-l-4" style={{ borderColor: accent, backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <Scale className="h-4 w-4" style={{ color: accent }} />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Established {new Date().getFullYear() - years}</span>
                </div>

                <div className="space-y-5">
                  <h1 className="text-5xl font-serif font-medium leading-tight text-white md:text-6xl lg:text-7xl">{config.businessName}</h1>
                  <p className="text-2xl font-light tracking-wide" style={{ color: accent }}>{config.primaryService}</p>
                  <p className="text-lg leading-relaxed text-slate-300 max-w-lg">A distinguished firm with {years}+ years of excellence. Strategic counsel and aggressive representation for complex matters.</p>
                </div>

                <div className="flex flex-wrap gap-8 pt-4">
                  <div className="border-r border-slate-700 pr-8"><div className="text-4xl font-bold text-white">$2B+</div><div className="text-xs font-bold uppercase tracking-wider text-slate-400">Recovered</div></div>
                  <div className="border-r border-slate-700 pr-8"><div className="text-4xl font-bold" style={{ color: accent }}>99%</div><div className="text-xs font-bold uppercase tracking-wider text-slate-400">Success Rate</div></div>
                  <div><div className="text-4xl font-bold text-white">{reviewCount}+</div><div className="text-xs font-bold uppercase tracking-wider text-slate-400">Cases Won</div></div>
                </div>

                <div className="flex flex-wrap gap-6 pt-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-300"><Award className="h-4 w-4" style={{ color: accent }} />Super Lawyers</div>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-300"><Shield className="h-4 w-4" style={{ color: accent }} />AV Rated</div>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-300"><Users className="h-4 w-4" style={{ color: accent }} />45+ Attorneys</div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-8 shadow-2xl bg-white border-t-4" style={{ borderTopColor: accent }}>
                <h2 className="text-xl font-bold text-slate-900 mb-2">Confidential Consultation</h2>
                <p className="text-sm text-slate-500 mb-6">Speak directly with a senior attorney. No obligation.</p>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label><input type="text" placeholder="John Smith" className="w-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900" /></div>
                    <div><label className="block text-xs font-bold text-slate-700 mb-1">Phone *</label><input type="tel" placeholder="(555) 123-4567" className="w-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900" /></div>
                  </div>
                  <div><label className="block text-xs font-bold text-slate-700 mb-1">Email *</label><input type="email" placeholder="john@company.com" className="w-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900" /></div>
                  <div><label className="block text-xs font-bold text-slate-700 mb-1">Legal Matter</label><select className="w-full border border-slate-200 px-4 py-3 text-sm bg-white text-slate-900"><option>Select area of law...</option>{config.services.map(s => <option key={s}>{s}</option>)}</select></div>
                  <button type="button" onClick={() => setLeadOpen(true)} className="w-full py-4 text-base font-bold text-white shadow-lg" style={{ backgroundColor: accent }}>Request Consultation</button>
                </div>
                <div className="mt-6 flex items-center justify-center gap-3 pt-4 border-t border-slate-100">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                  <div className="flex">{[1, 2, 3, 4, 5].map(n => <Star key={n} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />)}</div>
                  <span className="text-sm font-bold text-slate-900">{ratingText}</span><span className="text-slate-300">|</span><span className="text-sm font-medium text-slate-500">{reviewCount}+ Reviews</span>
                </div>
                <p className="mt-2 text-center text-[10px] text-slate-400">Attorney-Client Privilege Protected</p>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm py-3 overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {[{ text: 'Exceptional representation, life-changing outcome.', author: 'Robert M., CEO' }, { text: 'Professional, thorough, and relentless.', author: 'David K., CFO' }, { text: 'They fought for us when no one else would.', author: 'Sarah L., Business Owner' }, { text: 'Top-tier legal counsel.', author: 'Michael R., Investor' }, { text: 'Exceptional representation, life-changing outcome.', author: 'Robert M., CEO' }, { text: 'Professional, thorough, and relentless.', author: 'David K., CFO' }].map((review, i) => (
                <div key={i} className="mx-8 flex items-center gap-2"><div className="flex">{[1, 2, 3, 4, 5].map(n => <Star key={n} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)}</div><span className="text-sm font-medium text-white">{review.text}</span><span className="text-sm text-slate-400">- {review.author}</span></div>
              ))}
            </div>
          </div>
        </section>

        <style dangerouslySetInnerHTML={{ __html: `@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } .animate-marquee { animation: marquee 30s linear infinite; }` }} />

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 2 - Why Choose Us (Split Layout with Image)
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left - Image */}
            <div className="relative min-h-[500px] lg:min-h-[700px]">
              <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80)', backgroundPosition: 'center', backgroundSize: 'cover' }} />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/20" />
              {/* Stats Badge */}
              <div className="absolute bottom-8 left-8 bg-white p-6 shadow-xl max-w-xs">
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-14 w-14 bg-slate-900 flex items-center justify-center"><TrendingUp className="h-7 w-7 text-white" /></div>
                  <div><div className="text-3xl font-bold text-slate-900">$2B+</div><div className="text-xs text-slate-500 uppercase tracking-wide">Total Recovered</div></div>
                </div>
                <div className="h-1 w-full" style={{ backgroundColor: accent }} />
              </div>
            </div>
            {/* Right - Content */}
            <div className="flex items-center bg-slate-50 p-12 lg:p-20">
              <div className="max-w-lg">
                <div className="inline-flex items-center gap-2 border-l-4 px-4 py-1 mb-6" style={{ borderColor: accent }}>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Why Choose Us</span>
                </div>
                <h2 className="text-4xl font-serif font-medium text-slate-900 mb-6">A Legacy of Excellence</h2>
                <p className="text-lg text-slate-600 mb-10 leading-relaxed">For {years}+ years, we have been the trusted advisors for Fortune 500 companies, high-net-worth individuals, and those who demand the very best.</p>

                <div className="space-y-6">
                  {[
                    { title: 'Proven Track Record', desc: '99% success rate across all practice areas' },
                    { title: 'Senior-Level Attention', desc: 'Direct access to partners on every case' },
                    { title: 'Aggressive Advocacy', desc: 'We fight relentlessly for your interests' },
                    { title: 'Global Reach', desc: 'Offices in major financial centers worldwide' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 h-8 w-8 bg-slate-900 flex items-center justify-center"><CheckCircle className="h-4 w-4 text-white" /></div>
                      <div><h3 className="font-bold text-slate-900">{item.title}</h3><p className="text-sm text-slate-500">{item.desc}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 3 - Practice Areas (Dark Background with Cards)
        ═══════════════════════════════════════════════════════════════════════ */}
        <section id="expertise" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80)', backgroundPosition: 'center', backgroundSize: 'cover' }} />

          <div className={`${shellClass} relative z-10`}>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 border-l-4 px-4 py-1 mb-4" style={{ borderColor: accent }}>
                <span className="text-xs font-bold uppercase tracking-widest text-white">Expertise</span>
              </div>
              <h2 className="text-4xl font-serif font-medium text-white mb-4">Practice Areas</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">Strategic counsel across the full spectrum of legal challenges.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {config.services.slice(0, 6).map((service, i) => (
                <motion.div key={i} whileHover={{ y: -8 }} className="group bg-white/5 backdrop-blur border border-white/10 p-8 cursor-pointer hover:bg-white/10 transition-all">
                  <div className="mb-6 h-12 w-12 flex items-center justify-center border border-white/20"><Briefcase className="h-6 w-6 text-white" /></div>
                  <h3 className="text-xl font-bold text-white mb-3">{service}</h3>
                  <p className="text-sm text-slate-400 mb-6 leading-relaxed">Strategic counsel for complex {service.toLowerCase()} matters.</p>
                  <button onClick={() => setLeadOpen(true)} className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-all group-hover:gap-3" style={{ color: accent }}>
                    Learn More <ArrowUpRight className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 4 - Case Results (Stats with Background)
        ═══════════════════════════════════════════════════════════════════════ */}
        <section id="results" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80)', backgroundPosition: 'center', backgroundSize: 'cover' }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${accent}ee 0%, ${accent}cc 100%)` }} />

          <div className={`${shellClass} relative z-10`}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-medium text-white mb-4">Notable Results</h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">A track record that speaks for itself.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                { value: '$4.2B', label: 'Largest Merger', desc: 'Tech Acquisition' },
                { value: '100%', label: 'Defense Verdicts', desc: 'Patent Cases' },
                { value: '500+', label: 'Cases Won', desc: 'Last 5 Years' },
                { value: '24hr', label: 'Response Time', desc: 'Urgent Matters' },
              ].map((stat, i) => (
                <div key={i} className="text-center p-8 bg-white/10 backdrop-blur border border-white/20">
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm font-bold uppercase tracking-wider text-white/80 mb-1">{stat.label}</div>
                  <div className="text-xs text-white/60">{stat.desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-2">
              {[
                { title: 'Tech Acquisition', result: '$4.2B Merger Closed', desc: 'Lead counsel on cross-border acquisition involving multiple jurisdictions.' },
                { title: 'Intellectual Property', result: 'Full Defense Verdict', desc: 'Complete dismissal of $500M patent infringement claims.' },
              ].map((study, i) => (
                <div key={i} className="bg-white p-8">
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{study.title}</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{study.result}</h3>
                  <p className="text-slate-600">{study.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 5 - Team (Split Layout)
        ═══════════════════════════════════════════════════════════════════════ */}
        <section id="team" className="relative overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left - Content */}
            <div className="flex items-center bg-white p-12 lg:p-20 order-2 lg:order-1">
              <div className="max-w-lg">
                <div className="inline-flex items-center gap-2 border-l-4 px-4 py-1 mb-6" style={{ borderColor: accent }}>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Leadership</span>
                </div>
                <h2 className="text-4xl font-serif font-medium text-slate-900 mb-6">Our Partners</h2>
                <p className="text-lg text-slate-600 mb-10 leading-relaxed">Recognized leaders who have shaped the legal landscape for decades.</p>

                <div className="space-y-8">
                  {teamMembers.map((member, i) => (
                    <div key={i} className="flex items-start gap-4 group cursor-pointer">
                      <div className="h-16 w-16 bg-slate-900 flex items-center justify-center text-xl font-bold text-white group-hover:scale-105 transition-transform">{member.initials}</div>
                      <div><h3 className="font-bold text-slate-900 group-hover:underline">{member.name}</h3><p className="text-sm font-medium" style={{ color: accent }}>{member.role}</p><p className="text-sm text-slate-500 mt-1">{member.specialized}</p></div>
                    </div>
                  ))}
                </div>

                <button onClick={() => setLeadOpen(true)} className="mt-10 bg-slate-900 px-8 py-4 text-white font-bold uppercase tracking-widest text-xs hover:bg-slate-800">View Full Team</button>
              </div>
            </div>
            {/* Right - Image */}
            <div className="relative min-h-[500px] lg:min-h-[700px] order-1 lg:order-2">
              <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80)', backgroundPosition: 'center', backgroundSize: 'cover' }} />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-slate-900/20" />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 6 - Testimonials (Cards)
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-slate-50">
          <div className={shellClass}>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 border-l-4 px-4 py-1 mb-4" style={{ borderColor: accent }}>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Client Testimonials</span>
              </div>
              <h2 className="text-4xl font-serif font-medium text-slate-900 mb-4">What Clients Say</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                { text: "Their strategic approach and relentless advocacy secured an outcome that exceeded our expectations. A truly exceptional firm.", author: 'Robert Mitchell', title: 'CEO, Tech Ventures Inc.' },
                { text: "When facing the most critical legal challenge in our company's history, they delivered. Professional, thorough, and results-driven.", author: 'David Kim', title: 'CFO, Global Industries' },
                { text: "They fought for us when no one else would. Their dedication to our case was unwavering and the results speak for themselves.", author: 'Sarah Lawrence', title: 'Founder, Lawrence Enterprises' },
              ].map((testimonial, i) => (
                <div key={i} className="bg-white p-8 shadow-sm">
                  <Quote className="h-10 w-10 text-slate-200 mb-4" />
                  <p className="text-slate-600 mb-6 leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3 border-t border-slate-100 pt-6">
                    <div className="h-12 w-12 bg-slate-900 flex items-center justify-center text-white font-bold">{testimonial.author.charAt(0)}</div>
                    <div><div className="font-bold text-slate-900">{testimonial.author}</div><div className="text-xs text-slate-500">{testimonial.title}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 7 - FAQ
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-medium text-slate-900">Frequently Asked Questions</h2>
            </div>
            <div className="divide-y divide-slate-200">
              {config.faqs.map((faq, i) => (
                <div key={i} className="py-6">
                  <button onClick={() => setActiveFaq(activeFaq === i ? -1 : i)} className="flex w-full items-center justify-between text-left font-bold text-slate-900 hover:text-slate-600">
                    {faq.q}
                    <ChevronDown className={'h-5 w-5 transition-transform ' + (activeFaq === i ? 'rotate-180' : '')} />
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="mt-4 text-slate-600 leading-relaxed">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            FOOTER - CTA Section
        ═══════════════════════════════════════════════════════════════════════ */}
        <footer id="contact" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900" />
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80)', backgroundPosition: 'center', backgroundSize: 'cover' }} />

          <div className={`${shellClass} relative z-10`}>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-medium text-white mb-6">Ready to Discuss Your Case?</h2>
                <p className="text-xl text-slate-400 mb-8 max-w-lg">Schedule a confidential consultation with a senior attorney today.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => setLeadOpen(true)} className="px-8 py-4 font-bold text-slate-900 bg-white hover:bg-slate-100">Request Consultation</button>
                  <a href={'tel:' + cleanPhone} className="px-8 py-4 font-bold text-white border-2 border-white hover:bg-white/10 text-center">Call {config.phone}</a>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur border border-white/10 p-8">
                <h3 className="text-xl font-bold text-white mb-6">Our Offices</h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  {[config.city, 'New York, NY', 'Los Angeles, CA', 'Chicago, IL'].map((city, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Building className="h-5 w-5" style={{ color: accent }} />
                      <span className="text-slate-300">{city}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-white font-bold text-lg">{config.businessName}</div>
                <div className="flex items-center gap-6 text-sm text-slate-400">
                  <a href="#" className="hover:text-white">Privacy Policy</a>
                  <a href="#" className="hover:text-white">Terms of Service</a>
                  <a href="#" className="hover:text-white">Attorney Advertising</a>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-500">© {new Date().getFullYear()} All Rights Reserved</span>
                  <a href="/" className="flex items-center gap-1.5 text-[10px] text-slate-500 hover:text-slate-300 transition-colors">
                    <span>Website by</span>
                    <span className="font-bold" style={{ color: accent }}>QuickLaunchWeb</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>

      <LeadCaptureModal open={leadOpen} onOpenChange={setLeadOpen} accent={accent} businessName={config.businessName} ctaLabel="Request Consultation" serviceLabel="Legal Service" />
    </div>
  );
}
