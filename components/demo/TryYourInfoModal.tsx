'use client';

import { useEffect, useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ACCENT_PRESETS, BusinessConfig } from '@/lib/demoDefaults';

interface TryYourInfoModalProps {
  config: BusinessConfig;
  onSave: (update: Partial<BusinessConfig>) => void;
}

export function TryYourInfoModal({ config, onSave }: TryYourInfoModalProps) {
  const [open, setOpen] = useState(false);
  const [businessName, setBusinessName] = useState(config.businessName);
  const [city, setCity] = useState(config.city);
  const [phone, setPhone] = useState(config.phone);
  const [primaryService, setPrimaryService] = useState(config.primaryService);
  const [servicesInput, setServicesInput] = useState(config.services.join(', '));
  const [accentName, setAccentName] = useState(config.accent.name);

  const selectedAccent = useMemo(
    () => ACCENT_PRESETS.find((preset) => preset.name === accentName) || config.accent,
    [accentName, config.accent]
  );

  useEffect(() => {
    if (!open) return;
    setBusinessName(config.businessName);
    setCity(config.city);
    setPhone(config.phone);
    setPrimaryService(config.primaryService);
    setServicesInput(config.services.join(', '));
    setAccentName(config.accent.name);
  }, [config, open]);

  const handleSubmit = () => {
    const parsedServices = servicesInput
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 3);

    onSave({
      businessName: businessName.trim() || config.businessName,
      city: city.trim() || config.city,
      phone: phone.trim() || config.phone,
      primaryService: primaryService.trim() || config.primaryService,
      services: parsedServices.length > 0 ? parsedServices : config.services,
      accent: selectedAccent,
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900"
      >
        Try Your Info
      </button>
      <DialogContent className="border-slate-200 bg-white text-slate-900 shadow-xl">
        <DialogHeader className="text-left">
          <DialogTitle className="text-slate-900">Try your info</DialogTitle>
          <DialogDescription className="text-slate-500">
            Add your business details and see the preview update instantly.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Business Name
            <input
              type="text"
              value={businessName}
              onChange={(event) => setBusinessName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900"
              placeholder="Summit Roofing + Trades"
            />
          </label>

          <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            City
            <input
              type="text"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900"
              placeholder="Plano, TX"
            />
          </label>

          <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Phone
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900"
              placeholder="(469) 555-0182"
            />
          </label>

          <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Primary Service
            <input
              type="text"
              value={primaryService}
              onChange={(event) => setPrimaryService(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900"
              placeholder="Roof Replacement"
            />
          </label>

          <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            3 Services (comma-separated)
            <input
              type="text"
              value={servicesInput}
              onChange={(event) => setServicesInput(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900"
              placeholder="Roof Repair, HVAC Tune-Ups, Plumbing Repairs"
            />
          </label>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Accent Color
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {ACCENT_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => setAccentName(preset.name)}
                  className="flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm"
                  style={{
                    borderColor: accentName === preset.name ? preset.hex : 'rgba(226,232,240,0.9)',
                  }}
                >
                  <span
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: preset.hex }}
                  />
                  <span className="text-slate-700">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="mt-2 w-full rounded-full px-4 py-3 text-sm font-semibold text-white"
            style={{ backgroundColor: selectedAccent.hex }}
          >
            Update Preview
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
