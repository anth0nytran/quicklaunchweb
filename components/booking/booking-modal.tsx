"use client";

import { useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { QualifierFlow, type Qualifier } from "@/components/discovery-call";
import { BRAND_VARS, NAVY, KitIcon, focusRing } from "@/components/brand/primitives";

// Full-screen booking popup: the same qualifier as the inline #book section,
// then Calendly. Radix handles the focus trap, ESC, body scroll lock, and
// aria-modal; BrandShell owns the open state and the focus return.

export function BookingModal({
  open,
  onOpenChange,
  qualifier,
  onCloseAutoFocus,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  qualifier: Qualifier;
  onCloseAutoFocus: (e: Event) => void;
}) {
  const q = qualifier;
  // Side offers (AI Search & SEO / web design pages) keep a plain strategy call; everything else is the flagship plan.
  const side = /ai_search|seo|web_design/i.test(q.source);
  const panelRef = useRef<HTMLDivElement>(null);
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Content
              forceMount
              asChild
              aria-modal="true"
              onOpenAutoFocus={(e) => {
                // Land on the current question, not the close button.
                e.preventDefault();
                const root = panelRef.current;
                const heading = root?.querySelector<HTMLElement>("h3[tabindex='-1']");
                (heading ?? root)?.focus({ preventScroll: true });
              }}
              onCloseAutoFocus={onCloseAutoFocus}
            >
              <motion.div
                ref={panelRef}
                tabIndex={-1}
                initial={{ opacity: 0, y: 24, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.99 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="ql-brand fixed inset-0 z-[100] flex flex-col overflow-y-auto overscroll-contain bg-gradient-to-b from-[#EFF8FF] to-white antialiased [color-scheme:light] focus:outline-none"
                style={{ ...BRAND_VARS, color: NAVY, fontFamily: "var(--font-inter), Arial, sans-serif" }}
              >
                <div className="sticky top-0 z-10 border-b border-[#E5EDF6] bg-white/95 backdrop-blur">
                  <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:h-[72px] sm:px-6">
                    <Image
                      src="/home/logo.png"
                      alt="QuickLaunchWeb"
                      width={687}
                      height={215}
                      className="h-auto w-[124px] sm:w-[170px]"
                    />
                    <Dialog.Close
                      className={`flex h-11 w-11 items-center justify-center rounded-xl text-[#07143F] transition-colors hover:bg-[#EFF8FF] ${focusRing}`}
                      aria-label="Close booking"
                    >
                      <KitIcon name="close" className="h-6 w-6" />
                    </Dialog.Close>
                  </div>
                </div>

                <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 pb-4 pt-3 sm:px-6 sm:pb-16 sm:pt-10 lg:justify-center lg:py-12">
                  <div className="mb-2.5 text-center sm:mb-8 lg:mb-10 lg:text-left">
                    <Dialog.Title className="text-[22px] font-extrabold leading-tight tracking-[-0.03em] text-[#07143F] sm:text-[34px]">
                      {q.isComplete ? (side ? "Pick a time for your free call" : "Pick a time for your plan call") : side ? "Book your free strategy call" : "Get your free local ad plan"}
                    </Dialog.Title>
                    <Dialog.Description className="mx-auto mt-2 hidden max-w-md text-[17px] text-[#46516B] sm:block lg:mx-0">
                      {q.isComplete
                        ? side
                          ? "30 minutes. Pick any time that works."
                          : "30 minutes. We walk you through your plan. Pick any time that works."
                        : `${q.total} quick taps, then pick a time. Takes under a minute.`}
                    </Dialog.Description>
                    {/* phones: who you'll talk to, in one line (the full card shows on desktop) */}
                    <div className="mt-2 flex items-center justify-center gap-2.5 lg:hidden">
                      <span className="flex -space-x-2.5">
                        <Image src="/home/anthony.webp" alt="Anthony Tran, founder" width={80} height={80} className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-[0_2px_8px_rgba(7,20,63,0.15)]" />
                        <Image src="/home/ryan.webp" alt="Ryan Buesa, growth strategist" width={80} height={80} className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-[0_2px_8px_rgba(7,20,63,0.15)]" />
                      </span>
                      <p className="text-left text-[13px] leading-tight text-[#46516B]">
                        <span className="block font-semibold text-[#07143F]">Talk to a real strategist</span>
                        Free plan. 30 min. No pressure.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:items-start lg:gap-10">
                    {/* Who you'll talk to + what you get. Sits beside the form on desktop, above it on phones. */}
                    <aside className="hidden rounded-2xl border border-[#E3E9F2] bg-white p-4 shadow-[0_1px_2px_rgba(7,20,63,0.04)] lg:sticky lg:top-24 lg:block lg:p-6">
                      <div className="flex items-center gap-4">
                        <span className="flex shrink-0 -space-x-3">
                          <Image src="/home/anthony.webp" alt="Anthony Tran, founder of QuickLaunchWeb" width={112} height={112} className="h-14 w-14 rounded-full object-cover ring-[3px] ring-white shadow-[0_4px_14px_rgba(7,20,63,0.18)]" />
                          <Image src="/home/ryan.webp" alt="Ryan Buesa, growth strategist at QuickLaunchWeb" width={112} height={112} className="h-14 w-14 rounded-full object-cover ring-[3px] ring-white shadow-[0_4px_14px_rgba(7,20,63,0.18)]" />
                        </span>
                        <div className="leading-tight">
                          <p className="text-[16px] font-bold text-[#07143F]">Anthony &amp; Ryan</p>
                          <p className="text-[13px] text-[#46516B]">Founder &amp; Growth Strategist</p>
                        </div>
                      </div>
                      <p className="mt-4 hidden text-[14.5px] leading-[1.55] text-[#46516B] lg:block">
                        A real strategist who knows your market, not a pitch. If we can&apos;t help, we&apos;ll tell you straight.
                      </p>
                      <p className="mt-5 hidden font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0866FF] lg:block">
                        {side ? "On the call" : "Your free plan"}
                      </p>
                      <ul className="mt-2 hidden space-y-2.5 lg:block">
                        {(side
                          ? ["Where you stand on Google, Maps, and AI search", "What your top competitors are doing", "Which package fits, if any"]
                          : [
                              "Your competitors' ads on Facebook, Instagram, and Google",
                              "A map of where your best jobs come from",
                              "Your job math, and which ads fit your budget",
                              "Your first 3 ads, written and ready to film",
                            ]
                        ).map((item) => (
                          <li key={item} className="flex items-start gap-2 text-[14px] text-[#07143F]">
                            <KitIcon name="check" className="mt-0.5 h-4 w-4 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-[#EEF2F7] pt-3 text-[13px] text-[#46516B] lg:mt-4 lg:pt-4">
                        {["Yours to keep", "30 min", "No pressure"].map((item) => (
                          <li key={item} className="flex items-center gap-1.5">
                            <KitIcon name="check" className="h-3.5 w-3.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </aside>

                    <div className="min-w-0">
                      <QualifierFlow q={q} theme="light" inModal />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
