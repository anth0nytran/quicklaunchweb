'use client';

import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { ChevronDown, Check, Palette, Sparkles } from 'lucide-react';
import { ACCENT_PRESETS, THEME_PRESETS, BusinessConfig, ThemeStyle } from '@/lib/demoDefaults';
import { useDemoTracker } from '@/lib/analytics';

interface TryYourInfoPanelProps {
  config: BusinessConfig;
  onSave: (update: Partial<BusinessConfig>) => void;
}

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, '');
  const cleaned = digits.length > 10 && digits.startsWith('1') ? digits.slice(1, 11) : digits.slice(0, 10);
  if (!cleaned) return '';
  if (cleaned.length < 4) return `(${cleaned}`;
  if (cleaned.length < 7) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
};

export function TryYourInfoPanel({ config, onSave }: TryYourInfoPanelProps) {
  const { trackDemoCustomized } = useDemoTracker();
  const hasTrackedInitialLoad = useRef(false);

  const [businessName, setBusinessName] = useState(config.businessName);
  const [city, setCity] = useState(config.city);
  const [phone, setPhone] = useState(() => formatPhone(config.phone));
  const [primaryService, setPrimaryService] = useState(config.primaryService);
  const [servicesInput, setServicesInput] = useState(config.services.join(', '));
  const [themeId, setThemeId] = useState<ThemeStyle>(config.theme.id);
  const [accentName, setAccentName] = useState(config.accent.name);
  const [showDetails, setShowDetails] = useState(false);

  const servicesValue = useMemo(() => config.services.join(', '), [config.services]);

  const selectedTheme = useMemo(
    () => THEME_PRESETS.find((preset) => preset.id === themeId) || config.theme,
    [themeId, config.theme]
  );

  const selectedAccent = useMemo(
    () => ACCENT_PRESETS.find((preset) => preset.name === accentName) || config.accent,
    [accentName, config.accent]
  );

  // Sync state when config changes (URL restore, template switch, or external updates)
  useEffect(() => {
    const nextPhone = formatPhone(config.phone);
    setBusinessName((prev) => (prev === config.businessName ? prev : config.businessName));
    setCity((prev) => (prev === config.city ? prev : config.city));
    setPhone((prev) => (prev === nextPhone ? prev : nextPhone));
    setPrimaryService((prev) => (prev === config.primaryService ? prev : config.primaryService));
    setServicesInput((prev) => (prev === servicesValue ? prev : servicesValue));
    setThemeId((prev) => (prev === config.theme.id ? prev : config.theme.id));
    setAccentName((prev) => (prev === config.accent.name ? prev : config.accent.name));
  }, [
    config.category,
    config.businessName,
    config.city,
    config.phone,
    config.primaryService,
    config.theme.id,
    config.accent.name,
    servicesValue,
  ]);

  // Handle theme change
  const handleThemeChange = useCallback((newThemeId: ThemeStyle) => {
    setThemeId(newThemeId);
    const newTheme = THEME_PRESETS.find((t) => t.id === newThemeId);
    if (newTheme) {
      trackDemoCustomized('theme');
      onSave({ theme: newTheme });
    }
  }, [onSave, trackDemoCustomized]);

  // Handle accent change
  const handleAccentChange = useCallback((newAccentName: string) => {
    setAccentName(newAccentName);
    const newAccent = ACCENT_PRESETS.find((a) => a.name === newAccentName);
    if (newAccent) {
      trackDemoCustomized('accent_color');
      onSave({ accent: newAccent });
    }
  }, [onSave, trackDemoCustomized]);

  // Debounced auto-save for text inputs
  useEffect(() => {
    const timer = setTimeout(() => {
      const parsedServices = servicesInput.split(/[,|\n]+/).map((s) => s.trim()).filter(Boolean).slice(0, 4);
      const trimmedName = businessName.trim();
      const trimmedCity = city.trim();
      const trimmedPrimary = primaryService.trim();
      const formattedPhone = formatPhone(phone);

      const hasChanges =
        trimmedName !== config.businessName ||
        trimmedCity !== config.city ||
        formattedPhone !== config.phone ||
        trimmedPrimary !== config.primaryService ||
        JSON.stringify(parsedServices) !== JSON.stringify(config.services);

      if (hasChanges) {
        // Track business info customization (only after initial load)
        if (hasTrackedInitialLoad.current) {
          trackDemoCustomized('business_info');
        } else {
          hasTrackedInitialLoad.current = true;
        }

        onSave({
          businessName: trimmedName || config.businessName,
          city: trimmedCity || config.city,
          phone: formattedPhone || config.phone,
          primaryService: trimmedPrimary || config.primaryService,
          services: parsedServices,
        });
      }
    }, 450);
    return () => clearTimeout(timer);
  }, [businessName, city, phone, primaryService, servicesInput, onSave, config, trackDemoCustomized]);

  // Panel accent color for highlights
  const panelAccent = selectedAccent.hex;

  return (
    <div className="space-y-5">
      {/* ═══════════════════════════════════════════════════════════════════
          THEME SELECTOR - 2x2 Grid with visual previews
      ═══════════════════════════════════════════════════════════════════ */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <div className="h-6 w-6 rounded-md flex items-center justify-center" style={{ backgroundColor: `${panelAccent}20` }}>
            <Palette className="h-3.5 w-3.5" style={{ color: panelAccent }} />
          </div>
          <span className="text-xs font-semibold text-slate-700">Theme Style</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {THEME_PRESETS.map((theme) => {
            const isActive = themeId === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => handleThemeChange(theme.id)}
                className="relative group rounded-xl border-2 p-2.5 transition-all text-left"
                style={{
                  borderColor: isActive ? panelAccent : '#e5e7eb',
                  backgroundColor: isActive ? `${panelAccent}08` : '#fff',
                }}
              >
                {/* Theme Preview Box */}
                <div
                  className="h-12 w-full rounded-lg mb-2 flex items-end p-1.5 gap-1"
                  style={{ backgroundColor: theme.colors.pageBg, border: `1px solid ${theme.colors.border}` }}
                >
                  <div className="h-full w-6 rounded" style={{ backgroundColor: theme.colors.cardBg }} />
                  <div className="flex-1 flex flex-col justify-end gap-0.5">
                    <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: theme.colors.textPrimary, opacity: 0.7 }} />
                    <div className="h-1 w-2/3 rounded-full" style={{ backgroundColor: theme.colors.textMuted, opacity: 0.5 }} />
                  </div>
                  <div className="h-4 w-4 rounded" style={{ backgroundColor: panelAccent }} />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium" style={{ color: isActive ? panelAccent : '#64748b' }}>
                    {theme.name}
                  </span>
                  {isActive && (
                    <div className="h-4 w-4 rounded-full flex items-center justify-center" style={{ backgroundColor: panelAccent }}>
                      <Check className="h-2.5 w-2.5 text-white" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          ACCENT COLOR SELECTOR - Pill grid
      ═══════════════════════════════════════════════════════════════════ */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <div className="h-6 w-6 rounded-md flex items-center justify-center" style={{ backgroundColor: `${panelAccent}20` }}>
            <Sparkles className="h-3.5 w-3.5" style={{ color: panelAccent }} />
          </div>
          <span className="text-xs font-semibold text-slate-700">Accent Color</span>
          <span className="ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: `${panelAccent}15`, color: panelAccent }}>
            {selectedAccent.name}
          </span>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {ACCENT_PRESETS.map((preset) => {
            const isActive = accentName === preset.name;
            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => handleAccentChange(preset.name)}
                className="aspect-square rounded-lg transition-all flex items-center justify-center"
                style={{
                  backgroundColor: preset.hex,
                  transform: isActive ? 'scale(1.1)' : 'scale(1)',
                  boxShadow: isActive ? `0 0 0 2px #fff, 0 0 0 4px ${preset.hex}` : 'none',
                }}
                title={preset.name}
              >
                {isActive && <Check className="h-4 w-4 text-white drop-shadow-sm" />}
              </button>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BUSINESS INFO - Collapsible accordion
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="rounded-xl border border-slate-200 overflow-hidden bg-white">
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-between px-4 py-3 text-left bg-slate-50 hover:bg-slate-100 transition-colors"
        >
          <span className="text-xs font-semibold text-slate-700">Business Info</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-400">{showDetails ? 'Collapse' : 'Expand'}</span>
            <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
          </div>
        </button>

        {showDetails && (
          <div className="p-4 space-y-3 border-t border-slate-100">
            <div>
              <label className="block text-[10px] font-medium text-slate-500 mb-1">Business Name</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': panelAccent } as React.CSSProperties}
                placeholder="Your Business Name"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-medium text-slate-500 mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': panelAccent } as React.CSSProperties}
                  placeholder="Dallas, TX"
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-500 mb-1">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': panelAccent } as React.CSSProperties}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-medium text-slate-500 mb-1">Primary Service</label>
              <input
                type="text"
                value={primaryService}
                onChange={(e) => setPrimaryService(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': panelAccent } as React.CSSProperties}
                placeholder="Roof Replacement"
              />
            </div>

            <div>
              <label className="block text-[10px] font-medium text-slate-500 mb-1">Services (comma separated)</label>
              <input
                type="text"
                value={servicesInput}
                onChange={(e) => setServicesInput(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': panelAccent } as React.CSSProperties}
                placeholder="Service 1, Service 2, Service 3"
              />
            </div>
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          LIVE INDICATOR
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex items-center justify-center gap-2 pt-1">
        <div className="relative">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          <div className="absolute inset-0 h-2 w-2 rounded-full bg-emerald-500 animate-ping opacity-75" />
        </div>
        <span className="text-[10px] font-medium text-slate-400">
          Changes update instantly
        </span>
      </div>
    </div>
  );
}
