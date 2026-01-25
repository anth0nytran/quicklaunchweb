'use client';

import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';

interface MobileStickyCTAProps {
  phone: string;
  ctaLabel: string;
  primaryColor: string;
  onGetQuote: () => void;
}

export function MobileStickyCTA({
  phone,
  ctaLabel,
  primaryColor,
  onGetQuote,
}: MobileStickyCTAProps) {
  const cleanPhone = phone.replace(/\D/g, '');

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur-sm p-3 md:hidden"
      style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.08)' }}
    >
      <div className="flex gap-3 max-w-lg mx-auto">
        <a
          href={`tel:${cleanPhone}`}
          className="flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 flex-1"
          aria-label={`Call ${phone}`}
        >
          <Phone className="h-5 w-5" />
          <span>Call Now</span>
        </a>
        <button
          onClick={onGetQuote}
          className="flex-1 rounded-xl px-4 py-3 font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ backgroundColor: primaryColor }}
        >
          {ctaLabel}
        </button>
      </div>
    </motion.div>
  );
}
