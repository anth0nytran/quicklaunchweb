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
                  <div className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-4 px-4 sm:h-[72px] sm:px-6">
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

                <div className="mx-auto w-full max-w-3xl flex-1 px-4 pb-16 pt-6 sm:px-6 sm:pt-10">
                  <div className="mb-6 text-center sm:mb-8">
                    <Dialog.Title className="text-[26px] font-extrabold leading-tight tracking-[-0.03em] text-[#07143F] sm:text-[34px]">
                      {q.isComplete ? "Pick a time for your free call" : "Book your free call"}
                    </Dialog.Title>
                    <Dialog.Description className="mx-auto mt-2 max-w-md text-[16px] text-[#46516B] sm:text-[17px]">
                      {q.isComplete
                        ? "15 minutes with Anthony. You'll see the ads your competitors are running and the job math for your trade. No pressure."
                        : `${q.total} quick taps, then pick a time. About 1 minute.`}
                    </Dialog.Description>
                  </div>

                  <QualifierFlow q={q} theme="light" inModal />

                  <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-1 text-[14px] text-[#46516B]">
                    {["100% Free", "No Pressure", "Houston Only"].map((item) => (
                      <li key={item} className="flex items-center gap-1.5">
                        <KitIcon name="check" className="h-4 w-4" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
