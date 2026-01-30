'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Menu, X, Phone, ArrowUpRight, ShieldCheck, Microscope, UserPlus, Calendar, Award, CheckCircle, Sparkles, Heart } from 'lucide-react';
import type { BusinessConfig } from '@/lib/demoDefaults';
import { LeadCaptureModal } from './LeadCaptureModal';
import { PreviewBanner } from './PreviewBanner';
import { ImagePlaceholder } from './ImagePlaceholder';
import { ComparisonSlider } from './ComparisonSlider';

export function TemplateHealth({ config }: { config: BusinessConfig }) {
  const accent = config.accent.hex;
  const t = config.theme.colors;

  const [leadOpen, setLeadOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [selectedService, setSelectedService] = useState('');

  const cleanPhone = config.phone.replace(/\D/g, '');
  const ratingText = config.rating ? config.rating.toFixed(1) : '5.0';
  const reviewCount = config.reviewCount || 120;
  const years = config.yearsInBusiness || 15;

  const shellClass = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-12';

  const placeholders = config.imagePlaceholders || [];
  const beforePlaceholder = placeholders[0] || { label: 'Before', hint: 'Pre-treatment' };
  const afterPlaceholder = placeholders[1] || { label: 'After', hint: 'Post-treatment' };

  const navLinks = [
    { label: 'Treatments', href: '#treatments' },
    { label: 'Results', href: '#results' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div className="font-sans antialiased" style={{ backgroundColor: t.pageBg, color: t.textPrimary }}>
      {showPreview && (
        <PreviewBanner accent={accent} ctaHref="#contact" onClose={() => setShowPreview(false)} />
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          HEADER - Elegant Medical
      ═══════════════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 border-b backdrop-blur-md" style={{ backgroundColor: `${t.cardBg}f8`, borderColor: t.border }}>
        <div className={`${shellClass} flex h-20 items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full text-white font-serif text-xl font-bold" style={{ backgroundColor: accent }}>
              {config.businessName.charAt(0)}
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight" style={{ color: t.textPrimary }}>{config.businessName}</span>
              <div className="text-[10px] font-medium uppercase tracking-widest" style={{ color: t.textMuted }}>Aesthetic Medicine</div>
            </div>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium transition-colors hover:opacity-80" style={{ color: t.textSecondary }}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <a href={'tel:' + cleanPhone} className="text-sm font-semibold" style={{ color: t.textPrimary }}>{config.phone}</a>
            <button onClick={() => setLeadOpen(true)} className="rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg" style={{ backgroundColor: accent }}>
              Book Now
            </button>
          </div>

          <button className="md:hidden" style={{ color: t.textPrimary }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden border-t px-6 py-6" style={{ backgroundColor: t.cardBg, borderColor: t.border }}>
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (<a key={link.href} href={link.href} className="text-lg font-semibold" style={{ color: t.textPrimary }} onClick={() => setMobileMenuOpen(false)}>{link.label}</a>))}
                <button onClick={() => { setLeadOpen(true); setMobileMenuOpen(false); }} className="mt-4 w-full rounded-full py-4 text-center font-semibold text-white" style={{ backgroundColor: accent }}>Book Consultation</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ═══════════════════════════════════════════════════════════════════════
            HERO - Full Background with Booking Form
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[90vh] overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80)', backgroundPosition: 'center', backgroundSize: 'cover' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.72) 100%)' }} />

          <div className={`${shellClass} relative z-10 py-20 lg:py-28`}>
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20">
                  <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white">Accepting New Patients</span>
                </div>

                <div className="space-y-5">
                  <h1 className="text-5xl font-serif font-medium leading-tight text-white md:text-6xl lg:text-7xl">{config.businessName}</h1>
                  <p className="text-2xl font-light tracking-wide" style={{ color: accent }}>Advanced Aesthetic Medicine</p>
                  <p className="text-lg leading-relaxed text-slate-300 max-w-lg">Board-certified specialists delivering natural-looking results. Your journey to confidence starts here.</p>
                </div>

                <div className="flex flex-wrap gap-10 pt-4">
                  <div><div className="text-4xl font-bold text-white">{reviewCount}+</div><div className="text-xs font-medium uppercase tracking-wider text-slate-400">Happy Patients</div></div>
                  <div><div className="text-4xl font-bold" style={{ color: accent }}>{ratingText}</div><div className="text-xs font-medium uppercase tracking-wider text-slate-400">Google Rating</div></div>
                  <div><div className="text-4xl font-bold text-white">{years}+</div><div className="text-xs font-medium uppercase tracking-wider text-slate-400">Years Experience</div></div>
                </div>

                <div className="flex flex-wrap gap-6 pt-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-300"><Award className="h-4 w-4" style={{ color: accent }} />Board Certified</div>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-300"><ShieldCheck className="h-4 w-4" style={{ color: accent }} />FDA Approved</div>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-300"><ShieldCheck className="h-4 w-4" style={{ color: accent }} />HIPAA Compliant</div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-3xl p-8 shadow-2xl bg-white">
                <div className="flex items-center gap-2 mb-2"><Calendar className="h-5 w-5" style={{ color: accent }} /><h2 className="text-xl font-bold text-slate-900">Schedule Your Consultation</h2></div>
                <p className="text-sm text-slate-500 mb-6">Free virtual or in-person consultations available.</p>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label><input type="text" placeholder="Jane Smith" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900" /></div>
                    <div><label className="block text-xs font-semibold text-slate-700 mb-1">Phone *</label><input type="tel" placeholder="(555) 123-4567" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900" /></div>
                  </div>
                  <div><label className="block text-xs font-semibold text-slate-700 mb-1">Treatment Interest</label><select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm bg-white text-slate-900"><option>Select a treatment...</option>{config.services.map(s => <option key={s}>{s}</option>)}</select></div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setLeadOpen(true)} className="flex-1 rounded-xl py-4 text-base font-semibold text-white shadow-lg" style={{ backgroundColor: accent }}>Book Consultation</button>
                    <a href={'tel:' + cleanPhone} className="flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 px-6 py-4 font-semibold text-slate-900 hover:bg-slate-50"><Phone className="h-4 w-4" />Call</a>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-center gap-3 pt-4 border-t border-slate-100">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                  <div className="flex">{[1, 2, 3, 4, 5].map(n => <Star key={n} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />)}</div>
                  <span className="text-sm font-bold text-slate-900">{ratingText}</span><span className="text-slate-300">|</span><span className="text-sm font-medium text-slate-500">{reviewCount}+ Reviews</span>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm py-3 overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {[{ text: 'Dr. Vance is amazing! Natural results.', author: 'Sarah M.' }, { text: 'Best experience, highly recommend!', author: 'Jennifer L.' }, { text: 'Transformed my confidence completely.', author: 'Michelle R.' }, { text: 'Professional staff, beautiful facility.', author: 'Amanda K.' }, { text: 'Dr. Vance is amazing! Natural results.', author: 'Sarah M.' }, { text: 'Best experience, highly recommend!', author: 'Jennifer L.' }].map((review, i) => (
                <div key={i} className="mx-8 flex items-center gap-2"><div className="flex">{[1, 2, 3, 4, 5].map(n => <Star key={n} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)}</div><span className="text-sm font-medium text-white">{review.text}</span><span className="text-sm text-slate-400">- {review.author}</span></div>
              ))}
            </div>
          </div>
        </section>

        <style dangerouslySetInnerHTML={{ __html: `@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } .animate-marquee { animation: marquee 30s linear infinite; }` }} />

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 2 - Why Choose Us (Stats + Image Split)
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left - Image */}
            <div className="relative min-h-[500px] lg:min-h-[700px]">
              <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80)', backgroundPosition: 'center', backgroundSize: 'cover' }} />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
              {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur p-6 rounded-2xl shadow-xl max-w-xs">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: accent }}><Heart className="h-6 w-6 text-white" /></div>
                  <div><div className="text-2xl font-bold text-slate-900">{reviewCount}+</div><div className="text-xs text-slate-500 uppercase tracking-wide">Satisfied Patients</div></div>
                </div>
                <div className="flex gap-1">{[1, 2, 3, 4, 5].map(n => <Star key={n} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}</div>
              </div>
            </div>
            {/* Right - Content */}
            <div className="flex items-center bg-slate-50 p-12 lg:p-20">
              <div className="max-w-lg">
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ backgroundColor: `${accent}15` }}>
                  <Sparkles className="h-4 w-4" style={{ color: accent }} />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: accent }}>Why Choose Us</span>
                </div>
                <h2 className="text-4xl font-serif font-medium text-slate-900 mb-6">Experience the Difference</h2>
                <p className="text-lg text-slate-600 mb-10 leading-relaxed">We combine cutting-edge technology with personalized care to deliver results that enhance your natural beauty.</p>

                <div className="space-y-6">
                  {[
                    { title: 'Board Certified Team', desc: 'All procedures performed by licensed medical professionals' },
                    { title: 'Personalized Treatment Plans', desc: 'Customized approaches based on your unique goals' },
                    { title: 'Natural-Looking Results', desc: 'Subtle enhancements that let your beauty shine' },
                    { title: 'State-of-the-Art Facility', desc: 'Modern equipment and comfortable environment' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center" style={{ backgroundColor: accent }}><CheckCircle className="h-4 w-4 text-white" /></div>
                      <div><h3 className="font-semibold text-slate-900">{item.title}</h3><p className="text-sm text-slate-500">{item.desc}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 3 - Treatments (Card Grid with Icons)
        ═══════════════════════════════════════════════════════════════════════ */}
        <section id="treatments" className="py-24" style={{ backgroundColor: t.cardBg }}>
          <div className={shellClass}>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4" style={{ backgroundColor: `${accent}15` }}>
                <Microscope className="h-4 w-4" style={{ color: accent }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: accent }}>Our Services</span>
              </div>
              <h2 className="text-4xl font-serif font-medium text-slate-900 mb-4">Treatments We Offer</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">Personalized aesthetic solutions tailored to your unique needs and goals.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {config.services.map((service, i) => (
                <motion.div key={i} whileHover={{ y: -8 }} className="group relative rounded-3xl bg-slate-50 p-8 overflow-hidden cursor-pointer">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ backgroundColor: accent, transform: 'translate(30%, -30%)' }} />
                  <div className="relative z-10">
                    <div className="mb-6 h-14 w-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: accent }}><Sparkles className="h-7 w-7 text-white" /></div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{service}</h3>
                    <p className="text-sm text-slate-500 mb-6 leading-relaxed">Advanced treatment designed to enhance your natural beauty with minimal downtime.</p>
                    <button onClick={() => { setSelectedService(service); setLeadOpen(true); }} className="flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3" style={{ color: accent }}>
                      Learn More <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 4 - Results (Full Background with Slider)
        ═══════════════════════════════════════════════════════════════════════ */}
        <section id="results" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80)', backgroundPosition: 'center', backgroundSize: 'cover' }} />
          <div className="absolute inset-0 bg-slate-900/95" />

          <div className={`${shellClass} relative z-10`}>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 bg-white/10 backdrop-blur">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-white">Real Results</span>
              </div>
              <h2 className="text-4xl font-serif font-medium text-white mb-4">See the Transformation</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">Actual patient results. No filters, just science.</p>
            </div>

            <div className="mx-auto max-w-3xl">
              <ComparisonSlider accent={accent} beforeLabel={beforePlaceholder.label} beforeHint={beforePlaceholder.hint} afterLabel={afterPlaceholder.label} afterHint={afterPlaceholder.hint} />

              <div className="mt-12 grid grid-cols-3 gap-6 text-center">
                {[{ value: '2 Weeks', label: 'Recovery Time' }, { value: '1 Session', label: 'Treatment' }, { value: 'Permanent', label: 'Results' }].map((stat, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/10 backdrop-blur">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 5 - Meet the Team (Split with Image)
        ═══════════════════════════════════════════════════════════════════════ */}
        <section id="about" className="relative overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left - Content */}
            <div className="flex items-center p-12 lg:p-20 order-2 lg:order-1" style={{ backgroundColor: t.cardBg }}>
              <div className="max-w-lg">
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ backgroundColor: `${accent}15` }}>
                  <UserPlus className="h-4 w-4" style={{ color: accent }} />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: accent }}>Medical Team</span>
                </div>
                <h2 className="text-4xl font-serif font-medium mb-6" style={{ color: t.textPrimary }}>Expertise You Can Trust</h2>
                <p className="text-lg mb-10 leading-relaxed" style={{ color: t.textSecondary }}>Our team of board-certified specialists brings decades of combined experience in aesthetic medicine.</p>

                <div className="space-y-8">
                  {[
                    { name: 'Dr. Elizabeth Vance, MD', role: 'Medical Director', initials: 'EV', desc: 'Board Certified, 20+ years experience' },
                    { name: 'Jennifer Wu, RN', role: 'Lead Injector', initials: 'JW', desc: 'Certified Aesthetic Specialist' },
                  ].map((member, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="h-16 w-16 rounded-full flex items-center justify-center text-xl font-bold text-white" style={{ backgroundColor: accent }}>{member.initials}</div>
                      <div><h3 className="font-bold text-slate-900">{member.name}</h3><p className="text-sm font-medium" style={{ color: accent }}>{member.role}</p><p className="text-sm text-slate-500 mt-1">{member.desc}</p></div>
                    </div>
                  ))}
                </div>

                <button onClick={() => setLeadOpen(true)} className="mt-10 rounded-full px-8 py-4 text-white font-semibold shadow-lg" style={{ backgroundColor: accent }}>Meet Our Full Team</button>
              </div>
            </div>
            {/* Right - Image */}
            <div className="relative min-h-[500px] lg:min-h-[700px] order-1 lg:order-2">
              <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80)', backgroundPosition: 'center', backgroundSize: 'cover' }} />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/20" />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 6 - Testimonials (Cards on Background)
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-slate-50">
          <div className={shellClass}>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4" style={{ backgroundColor: `${accent}15` }}>
                <Heart className="h-4 w-4" style={{ color: accent }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: accent }}>Patient Stories</span>
              </div>
              <h2 className="text-4xl font-serif font-medium text-slate-900 mb-4">What Our Patients Say</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                { text: "Dr. Vance truly listened to my goals and created a treatment plan that gave me exactly what I wanted - natural results that enhanced my features.", author: 'Sarah M.', location: 'Los Angeles, CA' },
                { text: "The entire experience from consultation to recovery was exceptional. The staff made me feel comfortable and the results exceeded my expectations.", author: 'Jennifer L.', location: 'Beverly Hills, CA' },
                { text: "I was nervous at first but the team was so professional and caring. I look refreshed and rejuvenated - exactly what I hoped for!", author: 'Michelle R.', location: 'Santa Monica, CA' },
              ].map((testimonial, i) => (
                <div key={i} className="bg-white rounded-3xl p-8 shadow-sm">
                  <div className="flex gap-1 mb-4">{[1, 2, 3, 4, 5].map(n => <Star key={n} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}</div>
                  <p className="text-slate-600 mb-6 leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: accent }}>{testimonial.author.charAt(0)}</div>
                    <div><div className="font-semibold text-slate-900">{testimonial.author}</div><div className="text-xs text-slate-500">{testimonial.location}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            FOOTER - CTA Section
        ═══════════════════════════════════════════════════════════════════════ */}
        <footer id="contact" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80)', backgroundPosition: 'center', backgroundSize: 'cover' }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${accent}ee 0%, ${accent}cc 100%)` }} />

          <div className={`${shellClass} relative z-10 text-center`}>
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-white mb-6">Ready to Begin Your Journey?</h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">Schedule your complimentary consultation today and discover what's possible.</p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button onClick={() => setLeadOpen(true)} className="min-w-[200px] rounded-full bg-white px-8 py-4 font-bold shadow-lg text-slate-900 hover:bg-slate-100">Book Consultation</button>
              <a href={'tel:' + cleanPhone} className="min-w-[200px] rounded-full border-2 border-white px-8 py-4 font-bold text-white hover:bg-white/10">Call {config.phone}</a>
            </div>

            <div className="mt-16 pt-8 border-t border-white/20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-white font-bold text-lg">{config.businessName}</div>
                <div className="flex items-center gap-6 text-sm text-white/60">
                  <span>{config.city}</span>
                  <span>{config.phone}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-white/40">© {new Date().getFullYear()} All Rights Reserved</span>
                  <a href="/" className="flex items-center gap-1.5 text-[10px] text-white/40 hover:text-white/70 transition-colors">
                    <span>Website by</span>
                    <span className="font-bold" style={{ color: accent }}>QuickLaunchWeb</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>

      <LeadCaptureModal open={leadOpen} onOpenChange={setLeadOpen} accent={accent} businessName={config.businessName} ctaLabel="Book Consultation" serviceLabel={selectedService || config.primaryService} />
    </div>
  );
}
