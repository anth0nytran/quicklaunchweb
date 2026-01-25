'use client';

import { X } from 'lucide-react';

interface PreviewBannerProps {
  accent: string;
  ctaHref: string;
  onClose: () => void;
}

export function PreviewBanner({ accent, ctaHref, onClose }: PreviewBannerProps) {
  return (
    <div className="border-b border-slate-200 bg-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-3 text-xs text-slate-600">
        <span className="font-semibold uppercase tracking-[0.3em] text-slate-500">Preview Template</span>
        <span className="flex-1 text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: '#b91c1c' }}>
          NOT FINAL COPY. EVERYTHING IS CUSTOM TAILORED TO YOU.
        </span>
        <div className="flex items-center gap-3">
          <a
            href={ctaHref}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-700"
            style={{ color: accent }}
          >
            Get My Website Live
          </a>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 bg-white p-1 text-slate-500 transition hover:text-slate-700"
            aria-label="Hide preview banner"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
