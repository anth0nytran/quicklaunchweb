// The flagship guarantee: booked estimates, no number on the site.
// The number is set on the free plan call, based on the owner's trade.
// No refunds; we keep working free until it's hit. Keep the conditions in sync
// with the client agreement and the FAQ ("Do you guarantee results?").

export const GUARANTEE_CONDITIONS = [
  "You approve your ads within 48 hours",
  "Our team handles lead follow-up and booking",
  "You keep time open on your calendar",
  "You keep the ad budget we agree on for the full 90 days",
];

export function GuaranteeCard({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-[#0866FF]/25 bg-white p-6 shadow-[0_10px_34px_-20px_rgba(8,102,255,0.35)] sm:p-7 ${className}`}>
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0866FF]/10" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#0866FF]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
            <path d="M8.5 12l2.5 2.5 4.5-5" />
          </svg>
        </span>
        <div className="min-w-0">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0866FF]">Our guarantee</p>
          <h3 className="mt-1 text-[22px] font-extrabold leading-[1.2] tracking-[-0.02em] text-[#07143F] sm:text-[24px]">Booked estimates, guaranteed.</h3>
          <p className="mt-2 text-[16px] leading-[1.6] text-[#46516B]">
            Not leads. Booked estimates on your calendar. On your free plan call, we set your number based on your trade. Don&apos;t hit
            it in 90 days? <span className="font-semibold text-[#07143F]">We keep working for free until you do.</span>
          </p>
          <details className="group mt-3 [&_summary::-webkit-details-marker]:hidden">
            <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-[14px] font-semibold text-[#0866FF]">
              How the guarantee works
              <svg viewBox="0 0 20 20" className="h-4 w-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M5 8l5 5 5-5" />
              </svg>
            </summary>
            <p className="mt-2 text-[14px] text-[#46516B]">We control the booking, so we can stand behind it. It covers you as long as:</p>
            <ul className="mt-2 space-y-1.5">
              {GUARANTEE_CONDITIONS.map((c) => (
                <li key={c} className="flex items-start gap-2 text-[14px] text-[#07143F]">
                  <svg viewBox="0 0 16 16" className="mt-[3px] h-3.5 w-3.5 shrink-0 text-[#0866FF]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3.5 8.5l3 3 6-7" />
                  </svg>
                  {c}
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </div>
  );
}
