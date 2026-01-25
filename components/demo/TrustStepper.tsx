'use client';

import { useState } from 'react';

export type TrustStep = {
  title: string;
  description: string;
};

interface TrustStepperProps {
  accent: string;
  steps: TrustStep[];
}

export function TrustStepper({ accent, steps }: TrustStepperProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">
      <div className="space-y-4">
        {steps.map((step, index) => (
          <button
            key={step.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition"
            style={{
              borderColor: index === activeIndex ? accent : 'rgba(226, 232, 240, 0.9)',
              backgroundColor: index === activeIndex ? 'rgba(248, 250, 252, 0.9)' : 'white',
            }}
          >
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Step {index + 1}
              </div>
              <div className="text-sm font-semibold text-slate-900">{step.title}</div>
            </div>
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
          </button>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        {steps[activeIndex]?.description}
      </div>
    </div>
  );
}
