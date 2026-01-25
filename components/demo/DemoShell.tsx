'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Briefcase, HeartPulse, Home, LayoutGrid, Link2, Sparkles, X } from 'lucide-react';
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

export function DemoShell() {
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
  const panelWidth = 'min(94vw, 380px)';
  const theme = activeConfig.theme.colors;
  const accent = activeConfig.accent.hex;
  const accentSoft = `${accent}22`;
  const accentGlow = `${accent}33`;
  const panelPalette = {
    bg: activeConfig.theme.isDark ? theme.pageBg : theme.surfaceBg,
    surface: theme.cardBg,
    border: theme.border,
    text: theme.textPrimary,
    textMuted: theme.textMuted,
    textSecondary: theme.textSecondary,
  };
  const panelTransition = 'background-color 0.35s ease, color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease';

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
    if (!incoming || incoming === lastSerializedRef.current) {
      return;
    }

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
      const accent = ACCENT_PRESETS.find(
        (preset) => preset.name.toLowerCase() === accentParam.toLowerCase()
      );
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
    if (servicesParam) {
      const normalized = servicesParam.includes('|') ? servicesParam.split('|') : servicesParam.split(',');
      const parsed = normalized
        .map((item) => item.trim())
        .filter(Boolean)
        .slice(0, 4);
      if (parsed.length > 0) nextConfig.services = parsed;
    }

    setActiveCategory(category);
    setConfigs((prev) => ({
      ...prev,
      [category]: nextConfig,
    }));
    lastSerializedRef.current = incoming;
  }, [searchParams]);

  useEffect(() => {
    if (!serializedState || serializedState === lastSerializedRef.current) {
      return;
    }
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

  const templateIcons: Record<BusinessCategory, ReactNode> = {
    home: <Home className="h-4 w-4" />,
    health: <HeartPulse className="h-4 w-4" />,
    pro: <Briefcase className="h-4 w-4" />,
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        backgroundColor: theme.pageBg,
        color: theme.textPrimary,
        transition: 'background-color 0.35s ease, color 0.35s ease',
      }}
    >
      {/* Floating Open Button */}
      <button
        type="button"
        onClick={() => setPanelOpen(true)}
        className="fixed right-4 top-4 z-50 inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold shadow-xl backdrop-blur-sm transition-all hover:-translate-y-0.5"
        style={{
          backgroundColor: accent,
          color: theme.darkText,
          borderColor: accentGlow,
          boxShadow: `0 18px 35px ${accentGlow}`,
          transition: `${panelTransition}, transform 0.25s ease`,
        }}
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="hidden sm:inline">Customize</span>
      </button>

      {/* Backdrop */}
      {panelOpen && (
        <button
          type="button"
          aria-label="Close panel"
          onClick={() => setPanelOpen(false)}
          className="fixed inset-0 z-50 backdrop-blur-sm"
          style={{
            backgroundColor: activeConfig.theme.isDark ? 'rgba(0, 0, 0, 0.65)' : 'rgba(15, 23, 42, 0.35)',
          }}
        />
      )}

      {/* Main Content - shifts when panel opens */}
      <div
        className="transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          '--panel-width': panelWidth,
          transform: panelOpen ? 'translateX(calc(-1 * (var(--panel-width) / 2)))' : 'translateX(0)',
        } as CSSProperties}
      >
        <Template config={activeConfig} />
      </div>

      {/* Slide-out Panel */}
      <aside
        className="fixed right-0 top-0 z-50 flex h-full flex-col shadow-2xl"
        style={{
          width: panelWidth,
          transform: panelOpen ? 'translateX(0)' : `translateX(${panelWidth})`,
          backgroundColor: panelPalette.bg,
          color: panelPalette.text,
          borderLeft: `1px solid ${panelPalette.border}`,
          transition: `transform 0.45s cubic-bezier(0.4, 0, 0.2, 1), ${panelTransition}`,
        }}
      >
        {/* Panel Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: `1px solid ${panelPalette.border}`, transition: panelTransition }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ backgroundColor: panelPalette.surface, transition: panelTransition }}
            >
              <Sparkles className="h-4 w-4" style={{ color: panelPalette.textMuted }} />
            </div>
            <div>
              <div className="text-sm font-semibold">Demo Builder</div>
              <div className="text-[10px]" style={{ color: panelPalette.textMuted }}>
                Customize your preview
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em]"
              style={{
                borderColor: panelPalette.border,
                backgroundColor: panelPalette.surface,
                color: panelPalette.textMuted,
                transition: panelTransition,
              }}
              aria-label="Copy share link"
            >
              <Link2 className="h-3.5 w-3.5" />
              {copied ? 'Copied' : 'Copy link'}
            </button>
            <button
              type="button"
              onClick={() => setPanelOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border transition"
              aria-label="Close panel"
              style={{
                borderColor: panelPalette.border,
                backgroundColor: panelPalette.surface,
                color: panelPalette.textMuted,
                transition: panelTransition,
              }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Panel Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {/* Template Selector */}
          <section className="mb-6">
            <div
              className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em]"
              style={{ color: panelPalette.textMuted }}
            >
              Choose Template
            </div>
            <div className="grid grid-cols-3 gap-2">
              {CATEGORY_OPTIONS.map((option) => {
                const isActive = activeCategory === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setActiveCategory(option.id)}
                    className="flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all"
                    style={{
                      borderColor: isActive ? accent : panelPalette.border,
                      backgroundColor: isActive ? accentSoft : panelPalette.surface,
                      color: isActive ? panelPalette.text : panelPalette.textSecondary,
                      transition: panelTransition,
                    }}
                  >
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: isActive ? panelPalette.surface : panelPalette.bg,
                        color: isActive ? panelPalette.text : panelPalette.textMuted,
                        transition: panelTransition,
                      }}
                    >
                      {templateIcons[option.id]}
                    </span>
                    <span className="text-[10px] font-medium" style={{ color: isActive ? panelPalette.text : panelPalette.textMuted }}>
                      {option.label.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Divider */}
          <div className="mb-6 border-t" style={{ borderColor: panelPalette.border, transition: panelTransition }} />

          {/* Customization Panel */}
          <TryYourInfoPanel config={activeConfig} onSave={handleSave} />
        </div>

        {/* Panel Footer */}
        <div className="px-5 py-4" style={{ borderTop: `1px solid ${panelPalette.border}`, transition: panelTransition }}>
          <div
            className="rounded-xl border p-3 text-center"
            style={{
              borderColor: panelPalette.border,
              backgroundColor: panelPalette.surface,
              transition: panelTransition,
            }}
          >
            <p className="text-[10px]" style={{ color: panelPalette.textMuted }}>
              Preview only. We customize everything for your business.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
