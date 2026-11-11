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
    title: "We sit down and build your plan",
    body: "One hour with you. We find where your best jobs came from and what your best clients have in common. Then we plan how to get more of them.",
    part: "About an hour",
    lesson: { title: "How we find who your ads should talk to", steps: ["We go through your best jobs from the last year.", "We look at what they share: area, home age, job size, and how they found you.", "What repeats becomes your target. Your ads go after more people just like them."] },
    get: ["Know your best clients", "An offer that stands out", "Sales call prep"],
  },
  {
    n: "02",
    tag: "Video",
    title: "We film a full set of ads",
    body: "Our crew films you on a real job. We shoot lots of openers, each one aimed at a different kind of best client.",
    part: "One job day",
    lesson: { title: "How we plan your shoot", steps: ["We pick the 3 or 4 kinds of clients you want most.", "We write a different opening line for each one, like “Just bought a home?”", "We film every opener on the same job day, so nothing goes to waste."] },
    get: ["Scripts written for you", "Many openers to test", "Videos you keep"],
  },
  {
    n: "03",
    tag: "Ads",
    title: "We bring in better leads",
    body: "Your ads run on Facebook and Instagram, only in your areas. They are built to bring serious homeowners, not price shoppers.",
    part: "Nothing",
    lesson: { title: "How we keep the wrong leads out", steps: ["Your ads show real jobs at your real size.", "The first line says who it is for, so the wrong people scroll past.", "The form asks a few smart questions first: address, timeline, kind of job."] },
    get: ["Leads that pick up", "Only your areas", "Your own ad account"],
  },
  {
    n: "04",
    tag: "Testing",
    title: "We test until we find the winner",
    body: "Your ads go head to head. We keep what books jobs and cut the rest fast.",
    part: "Nothing",
    lesson: { title: "How we pick the winner", steps: ["Every ad gets its own name, so we know where each lead came from.", "We change one thing at a time, like the opening line.", "We count booked jobs per ad, not just leads, and put more money behind what wins."] },
    get: ["Side-by-side tests", "Losers cut in days", "More spend on winners"],
  },
  {
    n: "05",
    tag: "Booked jobs",
    title: "Booked jobs, every month",
    body: "Every lead gets a text in seconds and a booked estimate. Then we film again and grow it every month.",
    part: "Show up to estimates",
    lesson: { title: "How we keep it growing", steps: ["We ask your new clients what made them call, and what almost stopped them.", "Their answers become next month’s opening lines.", "We film again, so your ads and your page stay fresh."] },
    get: ["A text to every lead", "Estimates on your calendar", "New videos every month"],
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
                  How we win your city.
                </h2>
                <p className="mt-3 text-[16px] leading-[1.55] text-[#46516B] sm:text-[18px]">Five simple steps. About an hour of your time to start.</p>
              </motion.div>
              <ul className="mt-8 hidden space-y-1 lg:block" aria-label="Steps">
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
                Get My Free Ad Plan <span aria-hidden="true">&rarr;</span>
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
                <article className={`${cardCls} p-6 sm:p-7`}>
                  <div className="flex items-start gap-4 sm:gap-5">
                    <AnimatedIcon name={ICONS[i]} size={64} offset={i * 0.9} className="-ml-1 -mt-1 shrink-0 sm:hidden" />
                    <AnimatedIcon name={ICONS[i]} size={80} offset={i * 0.9} className="-ml-2 -mt-2 hidden shrink-0 sm:block" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <p className="font-mono text-[12px] font-semibold tracking-[0.18em] text-[#0866FF]">STEP {s.n}</p>
                        <p className="hidden whitespace-nowrap rounded-full bg-[#07143F]/[0.05] px-2.5 py-0.5 text-[12.5px] text-[#46516B] sm:block">
                          <span className="font-semibold text-[#07143F]">Your part:</span> {s.part}
                        </p>
                      </div>
                      <h3 className="mt-1.5 text-[22px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#07143F] sm:text-[26px]">{s.title}</h3>
                    </div>
                  </div>
                  {/* phones: the "your part" tag gets its own full-width line under the header */}
                  <p className="mt-3 inline-block whitespace-nowrap rounded-full bg-[#07143F]/[0.05] px-2.5 py-0.5 text-[12.5px] text-[#46516B] sm:hidden">
                    <span className="font-semibold text-[#07143F]">Your part:</span> {s.part}
                  </p>
                  <p className="mt-3 text-[17px] leading-[1.55] text-[#46516B]">{s.body}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                    {s.get.map((g) => (
                      <li key={g} className="flex items-start gap-2 text-[15px] font-medium leading-[1.4] text-[#07143F]">
                        <Check />
                        {g}
                      </li>
                    ))}
                  </ul>
                  {i === 0 && (
                    <button type="button" onClick={() => book("how-it-works-step1")} className={`${primaryBtn} mt-5 w-full whitespace-nowrap px-4 py-3 text-[15px] sm:w-auto sm:px-5`}>
                      <span className="hidden sm:inline">Start Step 1: </span>Get My Free Ad Plan <span aria-hidden="true">&rarr;</span>
                    </button>
                  )}
                  {/* How we do it: our own 3-step checklist for this step (shows real know-how, builds trust).
                      Folded so the card stays easy to scan; still real text on the page. */}
                  <details className="group mt-4 rounded-xl border border-[#E5EDF6] bg-[#F7F9FC] px-4 py-3 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer list-none items-center gap-2.5 text-[15px] font-semibold text-[#07143F]">
                      <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-[#0866FF]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3" y="3" width="14" height="14" rx="3" />
                        <path d="M7 10l2 2 4-4.5" />
                      </svg>
                      <span className="flex-1">
                        {s.lesson.title}
                      </span>
                      <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-[#46516B] transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <path d="M5 8l5 5 5-5" />
                      </svg>
                    </summary>
                    <ol className="mt-3 space-y-2.5">
                      {s.lesson.steps.map((st, k) => (
                        <li key={st} className="flex items-start gap-3 text-[15px] leading-[1.5] text-[#07143F]">
                          <span className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-[#0866FF]/30 bg-white font-mono text-[11px] font-semibold text-[#0866FF]">
                            {k + 1}
                          </span>
                          {st}
                        </li>
                      ))}
                    </ol>
                  </details>
                  <MediaSlot items={STEP_MEDIA[i]} slim label={`Proof for step ${s.n}`} className="mt-4" columns={3} />
                </article>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* The one next step: book the call (all screen sizes) */}
        <div className="mx-auto mt-14 max-w-[720px] rounded-2xl bg-[#07143F] px-6 py-9 text-center sm:px-10">
          <h3 className="text-[24px] font-extrabold leading-[1.2] tracking-[-0.02em] text-white sm:text-[30px]">Want us to do this for you?</h3>
          <p className="mx-auto mt-3 max-w-[30rem] text-[16px] leading-[1.55] text-white/75 sm:text-[17px]">
            Get your free local ad plan: a full audit of your market. Your competitors&apos; ads on Facebook, Instagram, and Google, where your best jobs come from, and 3 ads written for you. Yours to keep.
          </p>
          <button type="button" onClick={() => book("how-it-works")} className={`${primaryBtn} mt-6 w-full whitespace-nowrap px-4 py-4 text-[15px] sm:w-auto sm:px-7 sm:text-[16px]`}>
            Get My Free Ad Plan <span aria-hidden="true">&rarr;</span>
          </button>
          <p className="mt-3 text-[13px] text-white/60">Free. No pressure. Takes under a minute to book.</p>
        </div>

      </div>
    </section>
  );
}
