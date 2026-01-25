'use client';

import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { CheckCircle2 } from 'lucide-react';
import {
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface LeadCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accent: string;
  businessName: string;
  serviceLabel: string;
  ctaLabel: string;
}

export function LeadCaptureModal({
  open,
  onOpenChange,
  accent,
  businessName,
  serviceLabel,
  ctaLabel,
}: LeadCaptureModalProps) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) {
      setSubmitted(false);
    }
  }, [open]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-slate-200 bg-white text-slate-900 shadow-xl">
        <DialogCloseButton className="text-slate-400 hover:text-slate-700 hover:bg-slate-100" />
        <DialogHeader className="text-left">
          <DialogTitle className="text-slate-900">{ctaLabel}</DialogTitle>
          <DialogDescription className="text-slate-500">
            Requesting {serviceLabel} with {businessName}.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
            <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-500" />
            <div className="mt-3 text-base font-semibold text-slate-900">Request received.</div>
            <div className="mt-2 text-sm text-slate-600">
              This is a demo form. We will follow up with next steps shortly.
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="mt-4 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700"
            >
              Done
            </button>
          </div>
        ) : (
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Full Name
              <input
                type="text"
                required
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900"
                placeholder="Alex Carter"
              />
            </label>

            <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Email
              <input
                type="email"
                required
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900"
                placeholder="alex@email.com"
              />
            </label>

            <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Phone
              <input
                type="tel"
                required
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900"
                placeholder="(480) 555-0176"
              />
            </label>

            <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Notes
              <textarea
                rows={3}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900"
                placeholder="Preferred days or quick details"
              />
            </label>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-500">
              Demo only. No information is sent or stored.
            </div>

            <button
              type="submit"
              className="rounded-full px-4 py-3 text-sm font-semibold text-white"
              style={{ backgroundColor: accent }}
            >
              Submit Request
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
