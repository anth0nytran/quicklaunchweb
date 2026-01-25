'use client';

import { ChevronRight } from 'lucide-react';

export type ServiceCard = {
  name: string;
  bestFor: string;
};

interface ServiceCarouselProps {
  accent: string;
  services: ServiceCard[];
  onBook?: (service: ServiceCard) => void;
  cardBg?: string;
  borderColor?: string;
  textPrimary?: string;
  textMuted?: string;
}

export function ServiceCarousel({
  accent,
  services,
  onBook,
  cardBg,
  borderColor,
  textPrimary,
  textMuted,
}: ServiceCarouselProps) {
  const palette = {
    cardBg: cardBg ?? '#ffffff',
    border: borderColor ?? '#e2e8f0',
    text: textPrimary ?? '#0f172a',
    muted: textMuted ?? '#64748b',
  };

  return (
    <div className="overflow-hidden">
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 pr-6">
        {services.map((service, index) => (
          <div
            key={service.name}
            className="relative min-w-[260px] snap-start rounded-2xl border p-5 transition-all hover:-translate-y-1 hover:shadow-lg md:min-w-[280px]"
            style={{ borderColor: palette.border, backgroundColor: palette.cardBg }}
          >
            <div
              className="pointer-events-none absolute right-4 top-3 text-3xl font-semibold opacity-10"
              style={{ color: palette.text }}
            >
              {String(index + 1).padStart(2, '0')}
            </div>
            <div
              className="mb-3 h-1 w-10 rounded-full"
              style={{ backgroundColor: accent, opacity: index % 3 === 0 ? 1 : 0.65 }}
            />
            <div className="text-sm font-semibold" style={{ color: palette.text }}>
              {service.name}
            </div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.3em]" style={{ color: palette.muted }}>
              Best for
            </div>
            <div className="text-xs" style={{ color: palette.text }}>
              {service.bestFor}
            </div>
            <button
              type="button"
              onClick={() => onBook?.(service)}
              className="mt-4 inline-flex items-center gap-1 text-xs font-semibold"
              style={{ color: accent }}
            >
              Book
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
      <div className="text-xs" style={{ color: palette.muted }}>
        Swipe to browse
      </div>
    </div>
  );
}
