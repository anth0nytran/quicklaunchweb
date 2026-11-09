import Image from "next/image";
import { clientLogos } from "@/components/client-logos";
import { container } from "@/components/brand/tokens";

// Light-theme client logo marquee for the brand pages (home, Engine, Proof section).
// One clean scrolling line. The roster lives in components/client-logos.tsx; add logos there.

/** Not home service businesses. Kept on the web design page, hidden on the home-service pages. */
const NOT_HOME_SERVICE = new Set([
  "Base Real Estate Group",
  "The Toro Group",
  "Tomi Jewelry",
  "Becreativesco",
  "MJB Entertainment USA",
  "TJ Nails Katy",
  "FutureRise Financial",
]);

/** Home service clients only: what our buyers want to see. */
export const homeServiceLogos = clientLogos.filter((logo) => !NOT_HOME_SERVICE.has(logo.alt));

const MARQUEE_CSS = `
@keyframes ql-logo-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.ql-logo-track { display: flex; width: max-content; animation: ql-logo-scroll 60s linear infinite; }
.ql-logo-marquee:hover .ql-logo-track, .ql-logo-marquee:focus-within .ql-logo-track { animation-play-state: paused; }
/* Calm, consistent strip: grayscale at rest, full color on hover (per logo). */
.ql-logo-item img { filter: grayscale(1); opacity: 0.6; transition: filter 300ms ease, opacity 300ms ease; }
.ql-logo-item:hover img { filter: grayscale(0); opacity: 1; }
@media (prefers-reduced-motion: reduce) { .ql-logo-track { animation: none; } }
`;

export function ClientLogoGrid({ className = "" }: { className?: string }) {
  return (
    <div
      className={`ql-logo-marquee relative overflow-hidden ${className}`}
      style={{
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: MARQUEE_CSS }} />
      <div className="ql-logo-track allow-motion">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 items-center gap-12 px-6 md:gap-16 md:px-8"
            aria-hidden={copy === 1 ? "true" : undefined}
          >
            {homeServiceLogos.map((logo) => (
              <li
                key={logo.alt}
                className={`ql-logo-item flex shrink-0 items-center justify-center ${logo.h || "h-[40px] md:h-[48px]"} ${logo.w}`}
              >
                <Image
                  src={logo.src}
                  alt={copy === 1 ? "" : logo.alt}
                  width={logo.width}
                  height={logo.height}
                  sizes="(min-width: 768px) 320px, 260px"
                  unoptimized={logo.unoptimized}
                  className="h-auto max-h-full w-auto max-w-full object-contain"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

/** Full-width strip under a hero: label + scrolling logo line. */
export function ClientLogoStrip({ label = "Houston businesses we've helped" }: { label?: string }) {
  return (
    <section className="border-y border-[#E5EDF6] bg-[#EFF8FF] py-9 sm:py-10" aria-label={label}>
      <div className={container}>
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-[#46516B] sm:text-[12px]">
          {label}
        </p>
      </div>
      <ClientLogoGrid className="mt-7" />
    </section>
  );
}

/** Static logo grid (no motion), for a second spot on the page so it doesn't repeat the moving strip. */
export function ClientLogoWall({ className = "" }: { className?: string }) {
  return (
    <ul className={`grid grid-cols-3 items-center gap-x-6 gap-y-8 sm:grid-cols-4 lg:grid-cols-6 ${className}`}>
      {homeServiceLogos.map((logo) => (
        <li key={logo.alt} className="flex min-w-0 items-center justify-center">
          <div className={`flex items-center justify-center ${logo.h || "h-[40px] md:h-[48px]"} ${logo.w} max-w-full`}>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              sizes="(min-width: 768px) 160px, 110px"
              unoptimized={logo.unoptimized}
              className="h-auto max-h-full w-auto max-w-full object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
