'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Briefcase, HeartPulse, Home, LayoutGrid, Link2, X, Check } from 'lucide-react';
import {
  ACCENT_PRESETS,
  DEFAULT_CONFIGS,
  THEME_PRESETS,
  BusinessCategory,
  BusinessConfig,
  CATEGORY_OPTIONS,
} from '@/lib/demoDefaults';
import { TryYourInfoPanel } from './TryYourInfoPanel';
import { TemplateHome } from './TemplateHome';
import { TemplateHealth } from './TemplateHealth';
import { TemplatePro } from './TemplatePro';
import { usePageTracker } from '@/lib/analytics';

export function DemoShell() {
  // Analytics tracking
  usePageTracker('QuickLaunchWeb - Demo', 'demo');
  const [activeCategory, setActiveCategory] = useState<BusinessCategory>('home');
  const [panelOpen, setPanelOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const lastSerializedRef = useRef<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [configs, setConfigs] = useState<Record<BusinessCategory, BusinessConfig>>({
    home: DEFAULT_CONFIGS.home,
    health: DEFAULT_CONFIGS.health,
    pro: DEFAULT_CONFIGS.pro,
  });

  const activeConfig = configs[activeCategory];
  const panelWidth = 'min(92vw, 360px)';
  const accent = activeConfig.accent.hex;

  const handleSave = useCallback(
    (update: Partial<BusinessConfig>) => {
      setConfigs((prev) => ({
        ...prev,
        [activeCategory]: {
          ...prev[activeCategory],
          ...update,
        },
      }));
    },
    [activeCategory]
  );

  const serializedState = useMemo(() => {
    const params = new URLSearchParams();
    params.set('template', activeCategory);
    params.set('theme', activeConfig.theme.id);
    params.set('accent', activeConfig.accent.name);
    params.set('name', activeConfig.businessName);
    params.set('city', activeConfig.city);
    params.set('phone', activeConfig.phone);
    params.set('primary', activeConfig.primaryService);
    if (activeConfig.services.length > 0) {
      params.set('services', activeConfig.services.join('|'));
    }
    return params.toString();
  }, [activeCategory, activeConfig]);

  useEffect(() => {
    const incoming = searchParams.toString();
    if (!incoming || incoming === lastSerializedRef.current) return;

    const params = new URLSearchParams(incoming);
    const templateParam = params.get('template') ?? params.get('category');
    const category: BusinessCategory =
      templateParam === 'health' || templateParam === 'pro' || templateParam === 'home'
        ? templateParam
        : 'home';
    const base = DEFAULT_CONFIGS[category];
    const nextConfig: BusinessConfig = { ...base };

    const themeParam = params.get('theme');
    if (themeParam) {
      const theme = THEME_PRESETS.find((preset) => preset.id === themeParam);
      if (theme) nextConfig.theme = theme;
    }

    const accentParam = params.get('accent');
    if (accentParam) {
      const accent = ACCENT_PRESETS.find((preset) => preset.name.toLowerCase() === accentParam.toLowerCase());
      if (accent) nextConfig.accent = accent;
    }

    const nameParam = params.get('name');
    if (nameParam) nextConfig.businessName = nameParam;
    const cityParam = params.get('city');
    if (cityParam) nextConfig.city = cityParam;
    const phoneParam = params.get('phone');
    if (phoneParam) nextConfig.phone = phoneParam;
    const primaryParam = params.get('primary');
    if (primaryParam) nextConfig.primaryService = primaryParam;

    const servicesParam = params.get('services');
    if (servicesParam !== null) {
      // Handle various delimiters (pipe, comma, newline)
      const delimiters = /[|,\n]+/;
      const parsed = servicesParam
        .split(delimiters)
        .map((item) => item.trim())
        .filter(Boolean)
        .slice(0, 4);

      // Assign parsed services even if empty (allows clearing the list)
      nextConfig.services = parsed;
    }

    setActiveCategory(category);
    setConfigs((prev) => ({ ...prev, [category]: nextConfig }));
    lastSerializedRef.current = incoming;
  }, [searchParams]);

  useEffect(() => {
    if (!serializedState || serializedState === lastSerializedRef.current) return;
    lastSerializedRef.current = serializedState;
    router.replace(`${pathname}?${serializedState}`, { scroll: false });
  }, [serializedState, router, pathname]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, []);

  const Template = useMemo(() => {
    if (activeCategory === 'home') return TemplateHome;
    if (activeCategory === 'health') return TemplateHealth;
    return TemplatePro;
  }, [activeCategory]);

  const templateMeta: Record<BusinessCategory, { icon: ReactNode; label: string; desc: string }> = {
    home: { icon: <Home className="h-4 w-4" />, label: 'Home', desc: 'Roofing · HVAC · Trades' },
    health: { icon: <HeartPulse className="h-4 w-4" />, label: 'Health', desc: 'Med Spa · Wellness' },
    pro: { icon: <Briefcase className="h-4 w-4" />, label: 'Pro', desc: 'Legal · Consulting' },
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ backgroundColor: activeConfig.theme.colors.pageBg, color: activeConfig.theme.colors.textPrimary, transition: 'background-color 0.35s ease' }}
    >
      {/* ═══════════════════════════════════════════════════════════════════
          FLOATING CUSTOMIZE BUTTON
      ═══════════════════════════════════════════════════════════════════ */}
      <button
        type="button"
        onClick={() => setPanelOpen(true)}
        className="fixed right-4 top-4 z-50 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold shadow-xl transition-all hover:scale-105"
        style={{ backgroundColor: accent, color: '#fff' }}
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="hidden sm:inline">Customize</span>
      </button>

      {/* ═══════════════════════════════════════════════════════════════════
          BACKDROP
      ═══════════════════════════════════════════════════════════════════ */}
      {panelOpen && (
        <button
          type="button"
          aria-label="Close panel"
          onClick={() => setPanelOpen(false)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════════════════════════════ */}
      <div
        className="transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          '--panel-width': panelWidth,
          transform: panelOpen ? 'translateX(calc(-1 * (var(--panel-width) / 2)))' : 'translateX(0)',
        } as CSSProperties}
      >
        <Template config={activeConfig} />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SLIDE-OUT PANEL - Clean White Design
      ═══════════════════════════════════════════════════════════════════ */}
      <aside
        className="fixed right-0 top-0 z-50 flex h-full flex-col bg-white shadow-2xl"
        style={{
          width: panelWidth,
          transform: panelOpen ? 'translateX(0)' : `translateX(${panelWidth})`,
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Demo Builder</h2>
            <p className="text-[10px] text-slate-500">Preview different styles</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] font-medium text-slate-500 hover:bg-slate-50 transition-all"
            >
              {copied ? <Check className="h-3 w-3 text-green-500" /> : <Link2 className="h-3 w-3" />}
              {copied ? 'Copied!' : 'Share'}
            </button>
            <button
              type="button"
              onClick={() => setPanelOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Panel Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {/* ═══════════════════════════════════════════════════════════════
              TEMPLATE SELECTOR - Horizontal Pills
          ═══════════════════════════════════════════════════════════════ */}
          <section className="mb-5">
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Template
            </div>
            <div className="grid grid-cols-3 gap-2">
              {CATEGORY_OPTIONS.map((option) => {
                const isActive = activeCategory === option.id;
                const meta = templateMeta[option.id];
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setActiveCategory(option.id)}
                    className="flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 transition-all"
                    style={{
                      borderColor: isActive ? accent : '#e5e7eb',
                      backgroundColor: isActive ? `${accent}10` : '#fff',
                    }}
                  >
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: isActive ? accent : '#f1f5f9',
                        color: isActive ? '#fff' : '#64748b',
                      }}
                    >
                      {meta.icon}
                    </span>
                    <span className="text-[10px] font-semibold" style={{ color: isActive ? accent : '#475569' }}>
                      {meta.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Divider */}
          <div className="mb-5 border-t border-slate-100" />

          {/* ═══════════════════════════════════════════════════════════════
              CUSTOMIZATION PANEL
          ═══════════════════════════════════════════════════════════════ */}
          <TryYourInfoPanel config={activeConfig} onSave={handleSave} />
        </div>

        {/* Panel Footer */}
        <div className="px-4 py-3 border-t border-slate-200 bg-slate-50">
          <div className="text-center">
            <p className="text-[10px] text-slate-400">
              This is a preview. We customize everything for your business.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
