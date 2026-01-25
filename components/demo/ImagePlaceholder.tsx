'use client';

import { useEffect, useRef, useState } from 'react';
import { ImagePlus } from 'lucide-react';

interface ImagePlaceholderProps {
  label: string;
  hint: string;
  accent: string;
  value?: string | null;
  onChange?: (value: string | null) => void;
  showUpload?: boolean;
  className?: string;
  aspectClassName?: string;
}

export function ImagePlaceholder({
  label,
  hint,
  accent,
  value,
  onChange,
  showUpload = true,
  className,
  aspectClassName,
}: ImagePlaceholderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [localValue, setLocalValue] = useState<string | null>(null);
  const [localUrl, setLocalUrl] = useState<string | null>(null);

  const preview = value !== undefined ? value : localValue;

  useEffect(() => {
    return () => {
      if (localUrl) {
        URL.revokeObjectURL(localUrl);
      }
    };
  }, [localUrl]);

  const setPreview = (next: string | null) => {
    if (value === undefined) {
      setLocalValue(next);
    }
    if (onChange) {
      onChange(next);
    }
  };

  const handleFile = (file?: File | null) => {
    if (!file) return;
    const nextUrl = URL.createObjectURL(file);
    if (localUrl) {
      URL.revokeObjectURL(localUrl);
    }
    setLocalUrl(nextUrl);
    setPreview(nextUrl);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 ${aspectClassName ?? 'aspect-[4/3]'} ${className ?? ''}`}
    >
      {preview ? (
        <img src={preview} alt={label} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white">
            <ImagePlus className="h-5 w-5 text-slate-500" />
          </div>
          <div className="text-sm font-semibold text-slate-900">{label}</div>
          <div className="text-xs text-slate-500">{hint}</div>
        </div>
      )}

      <div className="absolute left-4 top-4 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-700">
        {label}
      </div>

      {showUpload && (
        <div className="absolute bottom-4 left-4">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
            style={{ color: accent }}
          >
            Upload
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
          />
        </div>
      )}
    </div>
  );
}
