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
                  <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:h-[72px] sm:px-6">
                    <Image
                      src="/home/logo.png"
                      alt="QuickLaunchWeb"
                      width={687}
                      height={215}
                      className="h-auto w-[140px] sm:w-[170px]"
                    />
                    <Dialog.Close
                      className={`flex h-12 w-12 items-center justify-center rounded-xl text-[#07143F] transition-colors hover:bg-[#EFF8FF] ${focusRing}`}
                      aria-label="Close booking"
                    >
                      <KitIcon name="close" className="h-6 w-6" />
                    </Dialog.Close>
                  </div>
                </div>

                <div className="mx-auto w-full max-w-5xl flex-1 px-4 pb-16 pt-6 sm:px-6 sm:pt-10">
                  <div className="mb-6 text-center sm:mb-8 lg:text-left">
                    <Dialog.Title className="text-[26px] font-extrabold leading-tight tracking-[-0.03em] text-[#07143F] sm:text-[34px]">
                      {q.isComplete ? "Pick a time for your free call" : "Book your free strategy call"}
                    </Dialog.Title>
                    <Dialog.Description className="mx-auto mt-2 max-w-md text-[16px] text-[#46516B] sm:text-[17px] lg:mx-0">
                      {q.isComplete
                        ? "15 minutes. Pick whatever time works for you."
                        : `${q.total} quick questions, then pick a time. Under a minute.`}
                    </Dialog.Description>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-[300px_1fr] lg:items-start lg:gap-8">
                    {/* Who you'll talk to + what you get. Sits beside the form on desktop, above it on phones. */}
                    <aside className="rounded-2xl border border-[#E3E9F2] bg-white p-4 shadow-[0_1px_2px_rgba(7,20,63,0.04)] lg:sticky lg:top-24 lg:p-5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#07143F] text-[16px] font-bold text-white">
                          A
                        </span>
                        <div className="leading-tight">
                          <p className="text-[15px] font-bold text-[#07143F]">Anthony</p>
                          <p className="text-[13px] text-[#46516B]"><span className="lg:hidden">Founder · you talk to me, not a sales team</span><span className="hidden lg:inline">Founder, QuickLaunchWeb</span></p>
                        </div>
                      </div>
                      <p className="mt-3 hidden text-[14px] leading-[1.55] text-[#46516B] lg:block">
                        You talk to me, not a sales team. If we can&apos;t help, I&apos;ll tell you straight.
                      </p>
                      <p className="mt-4 hidden font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0866FF] lg:block">
                        On the call
                      </p>
                      <ul className="mt-2 hidden space-y-2.5 lg:block">
                        {[
                          "The ads your competitors are running",
                          "The job math for your trade and area",
                          "A plan for your first ads",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2 text-[14px] text-[#07143F]">
                            <KitIcon name="check" className="mt-0.5 h-4 w-4 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-[#EEF2F7] pt-3 text-[13px] text-[#46516B] lg:mt-4 lg:pt-4">
                        {["Free, 15 min", "No pressure", "Houston-based"].map((item) => (
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
