'use client';

import { useEffect } from "react";
import Link from "next/link";
import { BrandShell } from "@/components/brand/brand-shell";
import { Eyebrow, KitIcon, card, container, outlineBtn, primaryBtn } from "@/components/brand/primitives";
import { usePageTracker, useCheckoutTracker } from "@/lib/analytics";

export default function CancelPage() {
  // Analytics tracking
  usePageTracker('QuickLaunchWeb - Checkout Cancelled', 'checkout_cancel');
  const { trackCheckoutCancelled } = useCheckoutTracker();

  // Track checkout cancellation on mount
  useEffect(() => {
    trackCheckoutCancelled('unknown'); // Plan info not available from URL
  }, [trackCheckoutCancelled]);

  return (
    <BrandShell stickyCta={false}>
      <section className="bg-gradient-to-b from-[#EFF8FF] to-[#f7fbff] pb-16 pt-[104px] sm:pb-24 sm:pt-28 lg:pt-32">
        <div className={container}>
          <div className={`${card} mx-auto w-full max-w-xl p-6 text-center sm:p-10`}>
            {/* Cancel icon */}
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF8FF] text-[#0866FF]">
              <KitIcon name="x-circle" className="h-8 w-8" />
            </span>

            <Eyebrow className="mt-6">Checkout canceled</Eyebrow>

            <h1 className="mt-3 text-[32px] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#07143F] sm:text-[40px]">
              No worries.
            </h1>

            <p className="mx-auto mt-4 max-w-md text-[16px] leading-[1.6] text-[#46516B] sm:text-[17px]">
              If you still want a site in{" "}
              <span className="font-semibold text-[#07143F]">48 hours</span>, you can
              restart your plan whenever you&apos;re ready.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <Link href="/services/web-design#pricing" className={`${primaryBtn} w-full px-7 py-4 text-[16px]`}>
                View pricing
                <KitIcon name="arrow-right" white className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/" className={`${outlineBtn} w-full px-7 py-3.5 text-[15px]`}>
                Back to home
              </Link>
            </div>

            {/* Reassurance */}
            <div className="mt-8 border-t border-[#E5EDF6] pt-6">
              <p className="text-[14px] text-[#46516B]">
                Questions? Just reply to any of our emails.
              </p>
            </div>
          </div>
        </div>
      </section>
    </BrandShell>
  );
}
