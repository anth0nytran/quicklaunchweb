'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, HelpCircle, Palette, MessageSquare, Zap, Rocket, ChevronDown, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreviewBannerProps {
  accent: string;
  ctaHref: string;
  onClose: () => void;
}

export function PreviewBanner({ accent, onClose }: PreviewBannerProps) {
  const [showFaq, setShowFaq] = useState(false);

  const faqItems = [
    {
      icon: <Palette className="h-4 w-4" />,
      q: 'Is this my final website?',
      a: 'No. This is a first draft to show possibilities. We customize every detail—colors, images, layouts, and branding—to perfectly fit your business.',
    },
    {
      icon: <MessageSquare className="h-4 w-4" />,
      q: 'Can I change the content?',
      a: 'Yes. All text and photos are placeholders. We work with you to refine your messaging, service list, and unique value proposition.',
    },
    {
      icon: <Zap className="h-4 w-4" />,
      q: 'How fast can I go live?',
      a: 'Extremely fast. Once you approve the design, we launch your fully optimized, mobile-first site in just 48 hours.',
    },
    {
      icon: <Rocket className="h-4 w-4" />,
      q: 'What\'s included?',
      a: 'Everything you need to grow: Domain connection, premium hosting, local SEO foundation, lead capture forms, and ongoing support.',
    },
  ];

  return (
    <>
      <div className="sticky top-0 z-[60] border-b-2 border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">

          {/* Left: Branding */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-900 text-[10px] font-black text-white group-hover:bg-slate-800 transition-colors">
              QL
            </div>
            <span className="hidden sm:block text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-600 transition-colors">
              QuickLaunchWeb
            </span>
          </Link>

          {/* Center: LOUD Message - Clean & Red */}
          <div className="flex-1 text-center min-w-0 flex items-center justify-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-600 shrink-0 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] text-slate-900 truncate">
              Preview Mode: <span className="text-red-600">First Draft — Not Final Copy</span>
            </span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowFaq(!showFaq)}
              className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
            >
              How it works
              <ChevronDown className={`h-3 w-3 transition-transform ${showFaq ? 'rotate-180' : ''}`} />
            </button>

            <Link
              href="/"
              className="rounded bg-slate-900 px-4 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white hover:bg-slate-800 transition-colors"
            >
              Get Started
            </Link>

            <button
              onClick={onClose}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Dropdown - Clean Aesthetic */}
      <AnimatePresence>
        {showFaq && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[55] bg-slate-900/20 backdrop-blur-[2px]"
              onClick={() => setShowFaq(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed left-1/2 top-16 z-[60] w-[95vw] max-w-2xl -translate-x-1/2 rounded-xl bg-white shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Everything Is Customizable</span>
                <button onClick={() => setShowFaq(false)}><X className="h-4 w-4 text-slate-400 hover:text-slate-600" /></button>
              </div>

              <div className="p-6 grid sm:grid-cols-2 gap-y-6 gap-x-8">
                {faqItems.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="shrink-0 mt-0.5 text-slate-400">{item.icon}</div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wide text-slate-900 mb-1">{item.q}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center text-[10px] text-slate-400 font-medium">
                <span>Start your project today</span>
                <Link href="/" className="flex items-center gap-1 hover:text-slate-900 transition-colors">
                  Get My Free Quote →
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
