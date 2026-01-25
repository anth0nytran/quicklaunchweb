'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ImagePlaceholder } from './ImagePlaceholder';

type HeroImageLike = { src: string; alt: string; id?: string };

type PlaceholderProps = {
  accent: string;
  beforeLabel: string;
  beforeHint: string;
  afterLabel: string;
  afterHint: string;
};

type ImagesProps = {
  left: HeroImageLike;
  right: HeroImageLike;
  accent: string;
  captionClassName?: string;
  trackColor?: string;
};

export type ComparisonSliderProps = PlaceholderProps | ImagesProps;

function isImagesProps(p: ComparisonSliderProps): p is ImagesProps {
  return 'left' in p && 'right' in p;
}

export function ComparisonSlider(props: ComparisonSliderProps) {
  const { accent } = props;
  const [value, setValue] = useState(52);
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const beforeInputRef = useRef<HTMLInputElement | null>(null);
  const afterInputRef = useRef<HTMLInputElement | null>(null);

  const trackColor = isImagesProps(props) ? props.trackColor ?? 'rgba(226,232,240,0.7)' : 'rgba(226,232,240,0.7)';
  const captionClassName = isImagesProps(props) ? props.captionClassName ?? 'text-slate-400' : 'text-slate-400';

  if (isImagesProps(props)) {
    const { left, right } = props;
    return (
      <div className="w-full">
        <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <div className="absolute inset-0">
            <Image
              src={left.src}
              alt={left.alt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              unoptimized={left.src.startsWith('http')}
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              clipPath: `inset(0 0 0 ${value}%)`,
              WebkitClipPath: `inset(0 0 0 ${value}%)`,
            }}
          >
            <Image
              src={right.src}
              alt={right.alt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              unoptimized={right.src.startsWith('http')}
            />
          </div>
          <div className="absolute inset-y-0" style={{ left: `${value}%` }}>
            <div className="absolute inset-y-0 -translate-x-1/2" style={{ width: '2px', backgroundColor: accent }} />
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 bg-white p-1 shadow-sm">
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accent }} />
            </div>
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          aria-label="Compare images"
          className="mt-4 h-2 w-full cursor-ew-resize appearance-none rounded-full"
          style={{
            background: `linear-gradient(90deg, ${accent} 0%, ${accent} ${value}%, ${trackColor} ${value}%, ${trackColor} 100%)`,
          }}
        />
        <div className={`mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.35em] ${captionClassName}`}>
          <span>Before</span>
          <span>Drag to compare</span>
          <span>After</span>
        </div>
      </div>
    );
  }

  const { beforeLabel, beforeHint, afterLabel, afterHint } = props;

  const handleFile = (
    file: File | null,
    setter: (v: string | null) => void,
    inputRef: { current: HTMLInputElement | null }
  ) => {
    if (!file) return;
    const nextUrl = URL.createObjectURL(file);
    setter(nextUrl);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="w-full">
      <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-slate-200 bg-white">
        <div className="absolute inset-0">
          <ImagePlaceholder
            label={beforeLabel}
            hint={beforeHint}
            accent={accent}
            value={beforeImage}
            onChange={setBeforeImage}
            showUpload={false}
            className="h-full w-full"
            aspectClassName="aspect-[5/4]"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            clipPath: `inset(0 0 0 ${value}%)`,
            WebkitClipPath: `inset(0 0 0 ${value}%)`,
          }}
        >
          <ImagePlaceholder
            label={afterLabel}
            hint={afterHint}
            accent={accent}
            value={afterImage}
            onChange={setAfterImage}
            showUpload={false}
            className="h-full w-full"
            aspectClassName="aspect-[5/4]"
          />
        </div>

        <div className="absolute inset-y-0" style={{ left: `${value}%` }}>
          <div className="absolute inset-y-0 -translate-x-1/2" style={{ width: '2px', backgroundColor: accent }} />
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 bg-white p-1 shadow-sm">
            <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accent }} />
          </div>
        </div>

        <div className="absolute left-4 top-4 rounded-full border border-slate-200 bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-700">
          Before
        </div>
        <div className="absolute right-4 top-4 rounded-full border border-slate-200 bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-700">
          After
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-end justify-between p-4">
          <div className="pointer-events-auto">
            <button
              type="button"
              onClick={() => beforeInputRef.current?.click()}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
              style={{ color: accent }}
            >
              Upload Before
            </button>
            <input
              ref={beforeInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => handleFile(event.target.files?.[0] ?? null, setBeforeImage, beforeInputRef)}
            />
          </div>
          <div className="pointer-events-auto">
            <button
              type="button"
              onClick={() => afterInputRef.current?.click()}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
              style={{ color: accent }}
            >
              Upload After
            </button>
            <input
              ref={afterInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => handleFile(event.target.files?.[0] ?? null, setAfterImage, afterInputRef)}
            />
          </div>
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        aria-label="Compare before and after"
        className="mt-4 h-2 w-full cursor-ew-resize appearance-none rounded-full bg-slate-200"
        style={{
          background: `linear-gradient(90deg, ${accent} 0%, ${accent} ${value}%, rgba(226,232,240,0.7) ${value}%, rgba(226,232,240,0.7) 100%)`,
        }}
      />
      <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.35em] text-slate-400">
        <span>Before</span>
        <span>Drag to compare</span>
        <span>After</span>
      </div>
    </div>
  );
}
