'use client';

import { useCallback, useEffect, useState } from 'react';
import { HelpCircle, Plus, X } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import type { DemoState, TemplateId } from '@/lib/demoTypes';
import { CTA_OPTIONS } from '@/lib/demoTypes';
import { getDefaultState, TEMPLATES, TEMPLATE_LIST } from '@/lib/demoTemplates';
import { useDemoQueryState } from '@/lib/queryState';
import { RoofingTemplate } from './templates/RoofingTemplate';
import { PoolTemplate } from './templates/PoolTemplate';
import { RemodelingTemplate } from './templates/RemodelingTemplate';

type TemplateProps = {
  state: DemoState;
  isMobile: boolean;
  onFormSubmit: () => void;
};

export function DemoShowcase() {
  const [state, setState] = useState<DemoState>(() => getDefaultState('roofing'));
  const [panelOpen, setPanelOpen] = useState(false);
  const [newService, setNewService] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useDemoQueryState(state, setState);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const handleTemplateSelect = (templateId: TemplateId) => {
    setState(getDefaultState(templateId));
  };

  const handleFormSubmit = useCallback(() => {
    toast.success('Demo lead captured - on a real launch, this goes to your inbox instantly.', {
      duration: 3500,
    });
  }, []);

  const handleAddService = () => {
    const trimmed = newService.trim();
    if (!trimmed) return;
    if (state.services.includes(trimmed)) return;
    setState((prev) => ({ ...prev, services: [...prev.services, trimmed] }));
    setNewService('');
  };

  const handleRemoveService = (service: string) => {
    setState((prev) => ({
      ...prev,
      services: prev.services.filter((item) => item !== service),
    }));
  };

  const renderTemplate = (props: TemplateProps) => {
    switch (state.template) {
      case 'pool':
        return <PoolTemplate {...props} />;
      case 'remodeling':
        return <RemodelingTemplate {...props} />;
      case 'roofing':
      default:
        return <RoofingTemplate {...props} />;
    }
  };

  const templateMeta = TEMPLATES[state.template];

  return (
    <div className="relative min-h-screen">
      <Toaster position="top-center" richColors />

      {renderTemplate({ state, isMobile, onFormSubmit: handleFormSubmit })}

      <div className="fixed top-3 left-1/2 z-[70] w-[min(92vw,720px)] -translate-x-1/2 px-2">
        <div className="flex flex-col items-center gap-2">
          <div className="flex w-full items-center justify-center gap-1 rounded-full border border-black/10 bg-white/85 p-1 shadow-xl backdrop-blur-md">
            {TEMPLATE_LIST.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateSelect(template.id)}
                className={`flex-1 rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-wide transition-all md:text-xs ${
                  state.template === template.id
                    ? 'bg-black text-white shadow-md'
                    : 'text-gray-700 hover:bg-black/5'
                }`}
                type="button"
              >
                {template.name}
              </button>
            ))}
          </div>
          <div className="rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[11px] text-gray-600 shadow-sm backdrop-blur md:text-xs">
            {templateMeta.description}
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label="Customize demo details"
        onClick={() => setPanelOpen((open) => !open)}
        className="fixed bottom-6 right-6 z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white/90 text-gray-900 shadow-xl backdrop-blur transition-all hover:-translate-y-0.5"
      >
        <HelpCircle className="h-5 w-5" />
      </button>

      {panelOpen && (
        <div className="fixed bottom-20 right-6 left-6 z-[70] w-auto max-w-[360px] rounded-2xl border border-black/10 bg-white/95 p-4 shadow-2xl backdrop-blur-md sm:left-auto">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400">Customize</p>
              <h3 className="text-lg font-semibold text-gray-900">Quick edits</h3>
            </div>
            <button
              type="button"
              onClick={() => setPanelOpen(false)}
              className="rounded-full p-1 text-gray-400 hover:text-gray-700"
              aria-label="Close panel"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-400">
                Business name
              </span>
              <input
                type="text"
                value={state.businessName}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, businessName: e.target.value }))
                }
                className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-black/30 focus:ring-2 focus:ring-black/10"
                placeholder="Northshore Home Services"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-400">
                City
              </span>
              <input
                type="text"
                value={state.city}
                onChange={(e) => setState((prev) => ({ ...prev, city: e.target.value }))}
                className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-black/30 focus:ring-2 focus:ring-black/10"
                placeholder="Austin, TX"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-400">
                Phone
              </span>
              <input
                type="tel"
                value={state.phone}
                onChange={(e) => setState((prev) => ({ ...prev, phone: e.target.value }))}
                className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-black/30 focus:ring-2 focus:ring-black/10"
                placeholder="(555) 123-4567"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-400">
                Primary CTA
              </span>
              <select
                value={state.cta}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, cta: e.target.value as DemoState['cta'] }))
                }
                className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-black/30 focus:ring-2 focus:ring-black/10"
              >
                {CTA_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <div>
              <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-400">
                Services
              </span>
              <div className="flex flex-wrap gap-2">
                {state.services.map((service) => (
                  <span
                    key={service}
                    className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
                  >
                    {service}
                    <button
                      type="button"
                      onClick={() => handleRemoveService(service)}
                      className="text-gray-400 hover:text-gray-600"
                      aria-label={`Remove ${service}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddService();
                    }
                  }}
                  className="flex-1 rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-black/30 focus:ring-2 focus:ring-black/10"
                  placeholder="Add a service"
                />
                <button
                  type="button"
                  onClick={handleAddService}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 bg-black text-white transition hover:bg-black/90"
                  aria-label="Add service"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
