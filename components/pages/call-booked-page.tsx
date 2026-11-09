"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BrandShell } from "@/components/brand/brand-shell";
import { Backdrop, KitIcon, Reveal } from "@/components/brand/primitives";
import { container } from "@/components/brand/tokens";
import { useEventTracker } from "@/lib/analytics";
import {
  markBookingCounted,
  scheduleEventId,
  takePendingBooking,
  wasBookingCounted,
} from "@/lib/bookedCall";
import { bookedCallVsl } from "@/lib/vsl";

// Thank-you page after a Calendly booking. Hormozi: pre-educate before the
// call (VSL on top), then make the call itself easy to show up for.
//
// Conversion fires ONCE: only when the booking flow left a pending token
// (lib/bookedCall.ts) and that booking was never counted. Refresh or a direct
// visit fires nothing.

const PHONE_DISPLAY = "832-552-3458";
const PHONE_SMS = "+18325523458";

type Fbq = (...args: unknown[]) => void;

function useFireBookedConversionOnce() {
  const { track } = useEventTracker();
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    const booking = takePendingBooking();
    if (!booking || wasBookingCounted(booking.id)) return;
    markBookingCounted(booking.id);

    track("discovery_call_booked", {
      event_category: "conversion",
      event_label: "calendly_scheduled",
      trade: booking.trade,
      revenue: booking.revenue,
      lead_source: booking.source,
    });

    // The pixel loads after consent and may not exist yet: wait up to ~5s.
    const eventID = scheduleEventId(booking.id);
    let tries = 0;
    const timer = window.setInterval(() => {
      const fbq = (window as unknown as { fbq?: Fbq }).fbq;
      if (typeof fbq === "function") {
        fbq("track", "Schedule", { content_name: "free_call", content_type: "appointment" }, { eventID });
        window.clearInterval(timer);
      } else if (++tries >= 20) {
        window.clearInterval(timer);
      }
    }, 250);
    return () => window.clearInterval(timer);
  }, [track]);
}

function VslSlot() {
  const { youtubeId, title, watchedKeyword } = bookedCallVsl;
  const isDev = process.env.NODE_ENV !== "production";
  if (!youtubeId && !isDev) return null;

  return (
    <Reveal className="mx-auto mt-8 w-full max-w-3xl">
      <p className="text-center text-[13px] font-bold uppercase tracking-[0.18em] text-[#0866FF]">
        Step 1 · 6 minutes before our call
      </p>
      <h2 className="mt-2 text-center text-[24px] font-extrabold leading-tight tracking-[-0.02em] sm:text-[30px]">
        {title}
      </h2>
      <div className="mt-5 overflow-hidden rounded-2xl border border-[#E5EDF6] bg-[#07143F] shadow-[0_20px_50px_-20px_rgba(7,20,63,0.45)]">
        <div className="relative aspect-video w-full">
          {youtubeId ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 m-3 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/30 p-6 text-center text-white/80">
              <KitIcon name="play" white className="h-10 w-10" />
              <p className="mt-3 text-[16px] font-bold">VSL goes here (only visible in local dev)</p>
              <p className="mt-1 max-w-sm text-[14px] text-white/60">
                Paste the YouTube video ID into lib/vsl.ts to show it on the live site.
              </p>
            </div>
          )}
        </div>
      </div>
      <p className="mt-4 text-center text-[16px] text-[#46516B]">
        Watched it? Text{" "}
        <a
          href={`sms:${PHONE_SMS}?&body=${encodeURIComponent(watchedKeyword)}`}
          className="font-bold text-[#0866FF] hover:underline"
        >
          &ldquo;{watchedKeyword}&rdquo; to <span className="whitespace-nowrap">{PHONE_DISPLAY}</span>
        </a>{" "}
        so we can skip the basics and get right to your plan.
      </p>
    </Reveal>
  );
}

const nextSteps = [
  {
    icon: "phone-message",
    title: "Check your texts and email",
    body: "Your call time and link are on the way. Add it to your calendar so you don't miss it.",
  },
  {
    icon: "target",
    title: "Have two numbers ready",
    body: "Your average job size and how many jobs a month you can handle. That's all we need to do the math with you.",
  },
  {
    icon: "calendar",
    title: "15 minutes with Anthony",
    body: "We look at your trade and your part of Houston and tell you straight if we can help. No pressure.",
  },
];

function Content() {
  useFireBookedConversionOnce();
  const params = useSearchParams();
  const [name, setName] = useState("");
  useEffect(() => {
    const n = (params.get("n") || "").trim().slice(0, 40);
    setName(n.replace(/[^\p{L}\p{M}' -]/gu, ""));
  }, [params]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#EFF8FF] to-white pb-20 pt-[104px] sm:pt-28">
      <Backdrop variant="dots" />
      <div className={`${container} relative z-10`}>
        <div className="mx-auto max-w-3xl text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#0866FF]">
            <KitIcon name="check" white className="h-7 w-7" />
          </span>
          <h1 className="mt-5 text-[34px] font-extrabold leading-[1.08] tracking-[-0.035em] sm:text-[46px]">
            You&apos;re booked{name ? `, ${name}` : ""}!
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[17px] leading-[1.55] text-[#46516B] sm:text-[19px]">
            Your call is on the calendar. Do the one thing below and our call will take half the time.
          </p>
        </div>

        <VslSlot />

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">
          {nextSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.06}>
              <div className="h-full rounded-xl border border-[#E5EDF6] bg-white p-6 shadow-[0_8px_30px_-14px_rgba(7,20,63,0.18)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EFF8FF] p-2.5">
                  <KitIcon name={step.icon} className="h-full w-full" />
                </span>
                <h3 className="mt-4 text-[18px] font-extrabold">{step.title}</h3>
                <p className="mt-1.5 text-[15px] leading-[1.55] text-[#46516B]">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-[15px] text-[#46516B]">
          Need to change the time? Use the link in your email, or text us at{" "}
          <a href={`sms:${PHONE_SMS}`} className="whitespace-nowrap font-semibold text-[#0866FF] hover:underline">
            {PHONE_DISPLAY}
          </a>
          .
        </p>
      </div>
    </section>
  );
}

export default function CallBookedPage() {
  return (
    <BrandShell stickyCta={false}>
      <Content />
    </BrandShell>
  );
}
