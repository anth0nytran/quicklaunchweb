'use client';

import { CATEGORY_OPTIONS, BusinessCategory } from '@/lib/demoDefaults';

interface TemplateSelectorProps {
  active: BusinessCategory;
  onChange: (category: BusinessCategory) => void;
  tone?: 'light' | 'dark';
}

export function TemplateSelector({ active, onChange, tone = 'light' }: TemplateSelectorProps) {
  const isDark = tone === 'dark';

  return (
    <div
      className={`rounded-3xl border p-4 ${
        isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white'
      }`}
    >
      <div
        className={`text-xs uppercase tracking-[0.3em] ${
          isDark ? 'text-white/50' : 'text-slate-400'
        }`}
      >
        Templates
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {CATEGORY_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={`rounded-2xl border px-4 py-3 text-left transition ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
            style={{
              borderColor: isDark
                ? active === option.id
                  ? 'rgba(255,255,255,0.4)'
                  : 'rgba(255,255,255,0.12)'
                : active === option.id
                  ? '#1f2937'
                  : 'rgba(226,232,240,0.9)',
              backgroundColor: isDark
                ? active === option.id
                  ? 'rgba(255,255,255,0.08)'
                  : 'transparent'
                : active === option.id
                  ? 'rgba(15,23,42,0.04)'
                  : 'white',
            }}
          >
            <div className="text-sm font-semibold">{option.label}</div>
            <div className={`mt-1 text-xs ${isDark ? 'text-white/60' : 'text-slate-500'}`}>
              {option.subtitle}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
