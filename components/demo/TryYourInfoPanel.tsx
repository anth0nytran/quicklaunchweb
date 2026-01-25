'use client';

import { useEffect, useMemo, useState } from 'react';
import { Building2, MapPin, Phone, Sparkles, Palette, Briefcase, Sun, Moon } from 'lucide-react';
import { ACCENT_PRESETS, THEME_PRESETS, BusinessConfig, ThemeStyle } from '@/lib/demoDefaults';

interface TryYourInfoPanelProps {
  config: BusinessConfig;
  onSave: (update: Partial<BusinessConfig>) => void;
}

export function TryYourInfoPanel({ config, onSave }: TryYourInfoPanelProps) {
  const [activeCategory, setActiveCategory] = useState(config.category);
  const [businessName, setBusinessName] = useState(config.businessName);
  const [city, setCity] = useState(config.city);
  const [phone, setPhone] = useState(config.phone);
  const [primaryService, setPrimaryService] = useState(config.primaryService);
  const [servicesInput, setServicesInput] = useState(config.services.join(', '));
  const [themeId, setThemeId] = useState<ThemeStyle>(config.theme.id);
  const [accentName, setAccentName] = useState(config.accent.name);
  const t = config.theme.colors;
  const isDark = config.theme.isDark;

  const selectedTheme = useMemo(
    () => THEME_PRESETS.find((preset) => preset.id === themeId) || config.theme,
    [themeId, config.theme]
  );

  const selectedAccent = useMemo(
    () => ACCENT_PRESETS.find((preset) => preset.name === accentName) || config.accent,
    [accentName, config.accent]
  );

  useEffect(() => {
    if (config.category === activeCategory) {
      return;
    }

    setActiveCategory(config.category);
    setBusinessName(config.businessName);
    setCity(config.city);
    setPhone(config.phone);
    setPrimaryService(config.primaryService);
    setServicesInput(config.services.join(', '));
    setThemeId(config.theme.id);
    setAccentName(config.accent.name);
  }, [activeCategory, config]);

  useEffect(() => {
    onSave({ theme: selectedTheme, accent: selectedAccent });
  }, [onSave, selectedTheme, selectedAccent]);

  const handleSubmit = () => {
    const parsedServices = servicesInput
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 4);

    onSave({
      businessName: businessName.trim() || config.businessName,
      city: city.trim() || config.city,
      phone: phone.trim() || config.phone,
      primaryService: primaryService.trim() || config.primaryService,
      services: parsedServices.length > 0 ? parsedServices : config.services,
      theme: selectedTheme,
      accent: selectedAccent,
    });
  };

  const panelPalette = {
    bg: isDark ? t.pageBg : t.surfaceBg,
    surface: t.cardBg,
    border: t.border,
    text: t.textPrimary,
    textMuted: t.textMuted,
    textSecondary: t.textSecondary,
  };
  const panelTransition = 'background-color 0.35s ease, color 0.35s ease, border-color 0.35s ease';
  const inputClass = [
    'mt-2 w-full rounded-lg border px-3 py-2.5 text-sm transition focus:outline-none focus:ring-1',
    isDark ? 'placeholder:text-white/40 focus:ring-white/10' : 'placeholder:text-slate-400 focus:ring-black/10',
  ].join(' ');
  const inputStyle = {
    backgroundColor: panelPalette.surface,
    borderColor: panelPalette.border,
    color: panelPalette.text,
    transition: panelTransition,
  };

  // Theme preview mini-cards
  const themeIcons: Record<ThemeStyle, React.ReactNode> = {
    clean: <Sun className="h-3.5 w-3.5" />,
    bold: <Moon className="h-3.5 w-3.5" />,
    elegant: <Sparkles className="h-3.5 w-3.5" />,
    warm: <Sun className="h-3.5 w-3.5" />,
  };

  return (
    <div className="space-y-5">
      {/* Style Theme Section */}
      <section
        className="rounded-2xl border p-4"
        style={{
          borderColor: panelPalette.border,
          backgroundColor: panelPalette.surface,
          transition: panelTransition,
        }}
      >
        <div className="mb-4 flex items-center gap-2">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-lg"
            style={{ backgroundColor: panelPalette.bg, transition: panelTransition }}
          >
            <Palette className="h-3.5 w-3.5" style={{ color: panelPalette.textMuted }} />
          </div>
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: panelPalette.textMuted }}
          >
            Style
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {THEME_PRESETS.map((theme) => {
            const isActive = themeId === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => setThemeId(theme.id)}
                className="group relative overflow-hidden rounded-xl border p-3 text-left transition-all"
                style={{
                  borderColor: isActive ? selectedAccent.hex : panelPalette.border,
                  backgroundColor: isActive ? `${selectedAccent.hex}12` : panelPalette.bg,
                  transition: panelTransition,
                }}
              >
                {/* Mini preview */}
                <div
                  className="mb-2 flex h-10 items-end gap-1 rounded-lg p-1.5"
                  style={{ backgroundColor: theme.colors.pageBg }}
                >
                  <div
                    className="h-full w-1/3 rounded"
                    style={{ backgroundColor: theme.colors.surfaceBg }}
                  />
                  <div className="flex h-full flex-1 flex-col justify-end gap-0.5">
                    <div
                      className="h-1 w-3/4 rounded-full"
                      style={{ backgroundColor: theme.colors.textPrimary }}
                    />
                    <div
                      className="h-1 w-1/2 rounded-full"
                      style={{ backgroundColor: theme.colors.textMuted }}
                    />
                  </div>
                  <div
                    className="h-3 w-3 rounded"
                    style={{ backgroundColor: selectedAccent.hex }}
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <span style={{ color: isActive ? panelPalette.textSecondary : panelPalette.textMuted }}>
                    {themeIcons[theme.id]}
                  </span>
                  <span
                    className="text-[10px] font-medium"
                    style={{ color: isActive ? panelPalette.text : panelPalette.textMuted }}
                  >
                    {theme.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Accent Color Section */}
      <section
        className="rounded-2xl border p-4"
        style={{
          borderColor: panelPalette.border,
          backgroundColor: panelPalette.surface,
          transition: panelTransition,
        }}
      >
        <div className="mb-3 flex items-center gap-2">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-lg"
            style={{ backgroundColor: panelPalette.bg, transition: panelTransition }}
          >
            <Sparkles className="h-3.5 w-3.5" style={{ color: panelPalette.textMuted }} />
          </div>
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: panelPalette.textMuted }}
          >
            Accent Color
          </span>
        </div>

        <div className="grid grid-cols-6 gap-1.5">
          {ACCENT_PRESETS.map((preset) => {
            const isActive = accentName === preset.name;
            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => setAccentName(preset.name)}
                className="group relative"
                title={preset.name}
              >
                <div
                  className="aspect-square rounded-lg transition-all"
                  style={{
                    backgroundColor: preset.hex,
                    boxShadow: isActive
                      ? `0 0 0 2px ${panelPalette.textMuted}, 0 0 0 4px ${panelPalette.bg}`
                      : undefined,
                    transform: isActive ? 'scale(1)' : undefined,
                  }}
                />
                {isActive && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white shadow" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-center text-[9px]" style={{ color: panelPalette.textMuted }}>
          {selectedAccent.name}
        </p>
      </section>

      {/* Business Details Section */}
      <section
        className="rounded-2xl border p-4"
        style={{
          borderColor: panelPalette.border,
          backgroundColor: panelPalette.surface,
          transition: panelTransition,
        }}
      >
        <div className="mb-4 flex items-center gap-2">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-lg"
            style={{ backgroundColor: panelPalette.bg, transition: panelTransition }}
          >
            <Building2 className="h-3.5 w-3.5" style={{ color: panelPalette.textMuted }} />
          </div>
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: panelPalette.textMuted }}
          >
            Business Details
          </span>
        </div>

        <div className="space-y-3">
          <label className="block">
            <span className="text-[10px] font-medium" style={{ color: panelPalette.textMuted }}>
              Business Name
            </span>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className={inputClass}
              style={inputStyle}
              placeholder="Summit Roofing + Trades"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-[10px] font-medium" style={{ color: panelPalette.textMuted }}>
                City
              </span>
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-1/2 mt-1 h-3.5 w-3.5 -translate-y-1/2"
                  style={{ color: panelPalette.textMuted }}
                />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={`${inputClass} pl-8`}
                  style={inputStyle}
                  placeholder="Plano, TX"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-[10px] font-medium" style={{ color: panelPalette.textMuted }}>
                Phone
              </span>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 mt-1 h-3.5 w-3.5 -translate-y-1/2"
                  style={{ color: panelPalette.textMuted }}
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`${inputClass} pl-8`}
                  style={inputStyle}
                  placeholder="(469) 555-0182"
                />
              </div>
            </label>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        className="rounded-2xl border p-4"
        style={{
          borderColor: panelPalette.border,
          backgroundColor: panelPalette.surface,
          transition: panelTransition,
        }}
      >
        <div className="mb-4 flex items-center gap-2">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-lg"
            style={{ backgroundColor: panelPalette.bg, transition: panelTransition }}
          >
            <Briefcase className="h-3.5 w-3.5" style={{ color: panelPalette.textMuted }} />
          </div>
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: panelPalette.textMuted }}
          >
            Services
          </span>
        </div>

        <div className="space-y-3">
          <label className="block">
            <span className="text-[10px] font-medium" style={{ color: panelPalette.textMuted }}>
              Primary Service
            </span>
            <div className="relative">
              <Sparkles
                className="absolute left-3 top-1/2 mt-1 h-3.5 w-3.5 -translate-y-1/2"
                style={{ color: panelPalette.textMuted }}
              />
              <input
                type="text"
                value={primaryService}
                onChange={(e) => setPrimaryService(e.target.value)}
                className={`${inputClass} pl-8`}
                style={inputStyle}
                placeholder="Roof Replacement"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-[10px] font-medium" style={{ color: panelPalette.textMuted }}>
              Additional Services
            </span>
            <textarea
              value={servicesInput}
              onChange={(e) => setServicesInput(e.target.value)}
              rows={2}
              className={`${inputClass} resize-none`}
              style={inputStyle}
              placeholder="Roof Repair, HVAC Tune-Ups, Plumbing"
            />
            <p className="mt-1 text-[10px]" style={{ color: panelPalette.textMuted }}>
              Separate with commas (max 4)
            </p>
          </label>
        </div>
      </section>

      {/* Update Button */}
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full rounded-xl py-3 text-sm font-semibold shadow-lg transition hover:opacity-90"
        style={{ backgroundColor: selectedAccent.hex, color: t.darkText, transition: panelTransition }}
      >
        Update Preview
      </button>
    </div>
  );
}
