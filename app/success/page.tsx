'use client';

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BrandShell } from "@/components/brand/brand-shell";
import { Eyebrow, KitIcon, card, container, primaryBtn } from "@/components/brand/primitives";
import { usePageTracker, useCheckoutTracker } from "@/lib/analytics";

function SuccessContent() {
  const searchParams = useSearchParams();
  const { trackPurchase } = useCheckoutTracker();

  // Track purchase completion on mount
  useEffect(() => {
    const sessionId = searchParams.get('session_id');

    // Track the conversion
    trackPurchase(
      sessionId || undefined,
      'subscription', // We don't have plan info from URL, use generic value
      0 // Value will be tracked server-side with actual amount
    );
  }, [searchParams, trackPurchase]);

  return null;
}

const nextSteps = [
  "Check your email for the intake form",
  "Fill in your business details",
  "We build your site in 48h",
];

export default function SuccessPage() {
  // Analytics tracking
  usePageTracker('QuickLaunchWeb - Success', 'checkout_success');

  return (
    <BrandShell stickyCta={false}>
      <Suspense fallback={null}>
        <SuccessContent />
      </Suspense>

      <section className="bg-gradient-to-b from-[#EFF8FF] to-[#f7fbff] pb-16 pt-[104px] sm:pb-24 sm:pt-28 lg:pt-32">
        <div className={container}>
          <div className={`${card} mx-auto w-full max-w-xl p-6 text-center sm:p-10`}>
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0866FF] p-4 shadow-[0_10px_25px_-10px_rgba(8,102,255,0.8)]">
              <KitIcon name="check-circle" white className="h-full w-full" />
            </span>

            <Eyebrow className="mt-6">Payment complete</Eyebrow>

            <h1 className="mt-3 text-[32px] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#07143F] sm:text-[40px]">
              You&apos;re in!
            </h1>

            <p className="mx-auto mt-4 max-w-md text-[16px] leading-[1.6] text-[#46516B] sm:text-[17px]">
              Thanks for starting your plan. We&apos;ll email you a quick intake
              form to get your business details and launch your site in{" "}
              <span className="font-semibold text-[#07143F]">48 hours</span>.
            </p>

            {/* Next steps */}
            <div className="mt-8 rounded-xl border border-[#E5EDF6] bg-[#F7FBFF] p-5 text-left sm:p-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#46516B]">What happens next</p>
              <ol className="mt-4 space-y-3">
                {nextSteps.map((step, i) => (
                  <li key={step} className="flex items-center gap-3 text-[15px] text-[#07143F]">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0866FF] text-[13px] font-bold text-white">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-8">
              <Link href="/" className={`${primaryBtn} w-full px-7 py-4 text-[16px]`}>
                <KitIcon name="arrow-left" white className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </BrandShell>
  );
}
