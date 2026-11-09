"use client";

import { useState } from "react";
import type { HomeMedia } from "@/lib/home-media";
import { useBooking } from "@/components/booking/booking-context";

// Frames client media (videos, screenshots, reviews) in the hero's style: frosted glass,
// a hairline blueprint-blue edge, mono labels.
// Empty (no items yet in lib/home-media.ts): a "Now filming" note that reads as busy and in demand,
// with a soft push to book. It disappears on its own the moment real items are added.

const IS_DEV = process.env.NODE_ENV !== "production";

function VideoTile({ m }: { m: Extract<HomeMedia, { kind: "video" }> }) {
  const [play, setPlay] = useState(false);
  return (
    <figure className="group overflow-hidden rounded-xl border border-white/70 bg-white/70 shadow-[0_18px_40px_-28px_rgba(7,20,63,0.45)] backdrop-blur">
      <div className={`relative ${m.vertical ? "aspect-[9/16]" : "aspect-video"} bg-[#0A1530]`}>
        {play ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video src={m.src} poster={m.poster} controls autoPlay playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <button type="button" onClick={() => setPlay(true)} className="absolute inset-0 h-full w-full" aria-label={`Play: ${m.title}`}>
            {m.poster && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={m.poster} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-[#07143F]/45 to-transparent" />
            <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur transition-transform group-hover:scale-110">
              <svg viewBox="0 0 20 20" className="ml-0.5 h-4 w-4 text-[#0866FF]" fill="currentColor">
                <path d="M6 4l10 6-10 6z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="px-3 py-2.5">
        <p className="truncate text-[13px] font-semibold text-[#07143F]">{m.title}</p>
        {m.client && <p className="truncate font-mono text-[10.5px] uppercase tracking-[0.12em] text-[#0866FF]">{m.client}</p>}
      </figcaption>
    </figure>
  );
}

function ImageTile({ m }: { m: Extract<HomeMedia, { kind: "image" }> }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-white/70 bg-white/70 shadow-[0_18px_40px_-28px_rgba(7,20,63,0.45)] backdrop-blur">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={m.src} alt={m.alt} loading="lazy" className="block aspect-video w-full object-cover" />
      {m.caption && <figcaption className="px-3 py-2.5 text-[13px] font-medium text-[#46516B]">{m.caption}</figcaption>}
    </figure>
  );
}

function ReviewTile({ m }: { m: Extract<HomeMedia, { kind: "review" }> }) {
  return (
    <figure className="flex h-full flex-col justify-between rounded-xl border border-white/70 bg-white/75 p-4 shadow-[0_18px_40px_-28px_rgba(7,20,63,0.45)] backdrop-blur">
      <blockquote className="text-[14.5px] font-medium leading-[1.5] text-[#07143F]">&ldquo;{m.quote}&rdquo;</blockquote>
      <figcaption className="mt-3 text-[12.5px] text-[#46516B]">
        <span className="font-semibold text-[#07143F]">{m.name}</span>
        {m.business && <span> · {m.business}</span>}
      </figcaption>
    </figure>
  );
}

/** Inside a step card: one quiet line, like a caption (no push). */
function NowFilmingLine({ className }: { className: string; onBook: () => void }) {
  return (
    <p className={`flex items-center gap-2 border-t border-[#07143F]/[0.07] pt-4 text-[13.5px] text-[#46516B]/80 ${className}`}>
      <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-[#0866FF]/60" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <rect x="2.5" y="5" width="11" height="10" rx="2" />
        <path d="M13.5 9l4-2.5v7l-4-2.5" strokeLinejoin="round" />
      </svg>
      Client results for this step are being added.
    </p>
  );
}

/** Where the client video wall goes: a calm placeholder that reads as "more on the way". */
function NowFilmingCard({ className, onBook }: { className: string; onBook: () => void }) {
  return (
    <div className={`mx-auto max-w-2xl rounded-2xl border border-[#E5EDF6] bg-white/70 px-6 py-6 text-center ${className}`}>
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#46516B]/80">Client videos</p>
      <p className="mt-2 text-[16px] leading-[1.55] text-[#46516B]">
        We film with clients every month. New videos are added here as they go live.{" "}
        <button type="button" onClick={onBook} className="font-semibold text-[#0866FF] hover:underline">
          Want to be next?
        </button>
      </p>
    </div>
  );
}

function EmptyFrame({ label, vertical }: { label: string; vertical?: boolean }) {
  return (
    <div
      className={`flex ${vertical ? "aspect-[9/16]" : "aspect-video"} items-center justify-center rounded-xl border border-dashed border-[#0866FF]/35 bg-[#0866FF]/[0.03] p-3 text-center`}
    >
      <span className="font-mono text-[10px] uppercase leading-[1.5] tracking-[0.12em] text-[#0866FF]/70">{label}</span>
    </div>
  );
}

export function MediaSlot({
  items,
  preview = 0,
  label,
  className = "",
  columns = 3,
  slim = false,
}: {
  items: HomeMedia[];
  /** empty state on the local preview: one quiet line instead of frames */
  slim?: boolean;
  /** how many empty frames to show on the local preview when there are no items */
  preview?: number;
  label: string;
  className?: string;
  columns?: 2 | 3 | 4;
}) {
  const book = useBooking();
  if (!items.length && slim) return <NowFilmingLine className={className} onBook={() => book("proof-slot")} />;
  if (!items.length && !(IS_DEV && preview > 0)) return <NowFilmingCard className={className} onBook={() => book("proof-reel")} />;
  const cols = columns === 2 ? "sm:grid-cols-2" : columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3";
  return (
    <div className={className}>
      <div className={`grid grid-cols-2 gap-3 ${cols}`}>
        {items.length
          ? items.map((m, i) =>
              m.kind === "video" ? <VideoTile key={i} m={m} /> : m.kind === "image" ? <ImageTile key={i} m={m} /> : <ReviewTile key={i} m={m} />
            )
          : Array.from({ length: preview }).map((_, i) => <EmptyFrame key={i} label={`${label} · slot ${i + 1}`} />)}
      </div>
    </div>
  );
}
