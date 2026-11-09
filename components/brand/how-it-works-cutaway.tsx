"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Eyebrow } from "@/components/brand/primitives";
import { container, primaryBtn, sectionH2 } from "@/components/brand/tokens";
import { MediaSlot } from "@/components/brand/media-slot";
import { useBooking } from "@/components/booking/booking-context";
import { STEP_MEDIA } from "@/lib/home-media";
import { AnimatedIcon } from "@/components/brand/animated-icon";

// How It Works: text first, proof up front. Same five steps as the hero's dots.
// - Each step leads with an animated 3D icon (components/brand/animated-icon.tsx).
// - Each step: a frosted card with what happens, your part, what you get, and a proof
//   slot (client videos / reviews / screenshots from lib/home-media.ts).
// - Motion: cards fade up once as they arrive; a thin progress line fills as you scroll
//   through the steps (reads scroll position only, never takes over scrolling).
// - Desktop: heading + step list stay in view on the left. Phones: one clean column.

const STEPS = [
  {
    n: "01",
    tag: "Plan",
    title: "We make a plan",
    body: "One call. We learn your best jobs, your towns, and what makes you the best pick. Then we set everything up in week one.",
    part: "One call. About an hour.",
    get: ["Your offer, sharpened", "The towns and homeowners we'll go after", "Ads, lead forms, text-back, and calendar set up"],
  },
  {
    n: "02",
    tag: "Video",
    title: "We film you",
    body: "We write the scripts. Our crew comes to a real job and films you and your team at work. No actors. No stock video.",
    part: "Show up on one job.",
    get: ["Scripts written for you", "A film day on a real job", "Short videos and photos you keep"],
  },
  {
    n: "03",
    tag: "Ads",
    title: "We run your ads",
    body: "Your videos go on Facebook and Instagram, in front of homeowners in the towns you pick.",
    part: "Nothing. We run it.",
    get: ["An ad account in your name", "Ads aimed only at your towns", "Every dollar of spend shown to you"],
  },
  {
    n: "04",
    tag: "Testing",
    title: "We test to find the winner",
    body: "We run a few ads at once. Each one talks to a different kind of homeowner. We keep what books jobs and cut what doesn't.",
    part: "Nothing. We run the tests.",
    get: ["Several ads, each for a different homeowner", "Losers cut, winners kept", "New versions to beat the winner"],
  },
  {
    n: "05",
    tag: "Booked jobs",
    title: "You get booked jobs",
    body: "Every lead gets a text in seconds. Our team calls and books the estimate, or hands it to your office.",
    part: "Show up to the estimates.",
    get: ["A text to every lead in seconds", "Estimates booked on your calendar", "Simple training to close more", "A one-page report every Monday"],
  },
] as const;

const cardCls = "rounded-2xl border border-[#E5EDF6] bg-white shadow-[0_8px_30px_-16px_rgba(7,20,63,0.18)]";
/** Animated 3D icon for each step (public/icons3d). */
const ICONS = ["plan", "camera", "ads", "testing", "booked"] as const;

function Check() {
  return (
    <svg viewBox="0 0 16 16" className="mt-[3px] h-4 w-4 shrink-0 text-[#0866FF]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}

export function HowItWorksCutaway() {
  const book = useBooking();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  const rise = (d = 0) => ({
    initial: { y: 14 },
    whileInView: { y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="how-it-works" className="relative scroll-mt-20 bg-white" aria-labelledby="how-title">
      <div className={`${container} relative py-20 sm:py-28`}>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          {/* Left: heading + the step list (stays in view on desktop) */}
          <div>
            <div className="lg:sticky lg:top-28">
              <motion.div {...rise()}>
                <Eyebrow>How It Works</Eyebrow>
                <h2 id="how-title" className={`mt-3 text-[#07143F] ${sectionH2}`}>
                  Five steps to launch.
                </h2>
                <p className="mt-3 text-[16px] leading-[1.55] text-[#46516B] sm:text-[18px]">About an hour of your time the first week. We do the rest.</p>
              </motion.div>
              <ul className="mt-8 hidden space-y-1 lg:block" aria-hidden="true">
                {STEPS.map((s) => (
                  <li key={s.n}>
                    <a href={`#step-${s.n}`} className="group flex items-center gap-3 rounded-lg py-1.5 text-[15px] text-[#46516B] transition-colors hover:text-[#07143F]">
                      <span className="font-mono text-[11.5px] font-semibold tracking-[0.14em] text-[#0866FF]">{s.n}</span>
                      {s.tag}
                    </a>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={() => book("how-it-works")} className={`${primaryBtn} mt-8 hidden px-6 py-3.5 text-[15px] lg:inline-flex`}>
                Book a Free Call <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>

          {/* Right: the steps */}
          <ol ref={listRef} className="relative space-y-5 pl-7 sm:pl-10">
            {/* progress rail */}
            <span aria-hidden="true" className="absolute bottom-6 left-[9px] top-6 w-px bg-[#07143F]/10 sm:left-[13px]" />
            <motion.span
              aria-hidden="true"
              className="absolute bottom-6 left-[9px] top-6 w-px origin-top bg-[#0866FF] sm:left-[13px]"
              style={{ scaleY: fill }}
            />
            {STEPS.map((s, i) => (
              <motion.li key={s.n} id={`step-${s.n}`} className="relative scroll-mt-28" {...rise(0.04)}>
                {/* node on the rail */}
                <span
                  aria-hidden="true"
                  className="absolute -left-7 top-8 flex h-[19px] w-[19px] items-center justify-center rounded-full border border-[#0866FF]/40 bg-white sm:-left-10 sm:h-[27px] sm:w-[27px]"
                >
                  <span className="h-[7px] w-[7px] rounded-full bg-[#0866FF]" />
                </span>
                <article className={`${cardCls} p-6 sm:p-8`}>
                  <div className="flex items-start gap-5">
                  <AnimatedIcon name={ICONS[i]} size={88} offset={i * 0.9} className="-ml-2 -mt-2 hidden sm:block" />
                  <div className="min-w-0 flex-1">
                  <AnimatedIcon name={ICONS[i]} size={72} offset={i * 0.9} className="-ml-2 mb-2 sm:hidden" />
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <p className="font-mono text-[12px] font-semibold tracking-[0.18em] text-[#0866FF]">
                      STEP {s.n} <span className="text-[#46516B]">/ 05</span>
                    </p>
                    <p className="text-[13px] text-[#46516B]">
                      <span className="font-semibold text-[#07143F]">Your part:</span> {s.part}
                    </p>
                  </div>
                  <h3 className="mt-3 text-[24px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#07143F] sm:text-[28px]">{s.title}</h3>
                  <p className="mt-3 text-[16px] leading-[1.6] text-[#46516B]">{s.body}</p>
                  </div>
                  </div>
                  <div className="mt-5 border-t border-[#07143F]/[0.07] pt-5">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#46516B]">What you get</p>
                    <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                      {s.get.map((g) => (
                        <li key={g} className="flex items-start gap-2.5 text-[15px] leading-[1.45] text-[#07143F]">
                          <Check />
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <MediaSlot items={STEP_MEDIA[i]} slim label={`Proof for step ${s.n}`} className="mt-5" columns={3} />
                </article>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Phones: the one next step */}
        <div className="mt-10 lg:hidden">
          <button type="button" onClick={() => book("how-it-works")} className={`${primaryBtn} w-full px-6 py-4 text-[16px]`}>
            Book a Free Call <span aria-hidden="true">&rarr;</span>
          </button>
        </div>

      </div>
    </section>
  );
}
