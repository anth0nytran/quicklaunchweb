import Image from "next/image";

// Shared client logo marquee. Used on the social media marketing home page and
// the web services page so the roster only has to be updated in one place.

export const clientLogos = [
  { src: "/logos/optimized/alvarez-pool.png", alt: "Alvarez Pool Service", w: "w-[75px] md:w-[95px]", width: 240, height: 182 },
  { src: "/logos/optimized/3d-fencing-v2.png", alt: "3D Fencing", w: "w-[95px] md:w-[115px]", h: "h-[30px] md:h-[36px]", width: 605, height: 180 },
  { src: "/logos/optimized/cuervo-homes-dark.png", alt: "Cuervo Homes", w: "w-[110px] md:w-[130px]", h: "h-[52px] md:h-[60px]", width: 369, height: 180 },
  { src: "/logos/optimized/made-new-pressure.png", alt: "Made New Pressure Washing", w: "w-[60px] md:w-[70px]", h: "h-[56px] md:h-[66px]", width: 186, height: 180 },
  { src: "/logos/optimized/landeros-electrical-v2.png", alt: "Landeros Electrical", w: "w-[48px] md:w-[56px]", h: "h-[54px] md:h-[62px]", width: 151, height: 180 },
  { src: "/logos/optimized/apex-epoxy-v2.png", alt: "Apex Epoxy & Surface Systems", w: "w-[78px] md:w-[90px]", h: "h-[54px] md:h-[62px]", width: 255, height: 180 },
  { src: "/logos/optimized/jimenez-tree-pro-v2.png", alt: "Jimenez Tree Pro", w: "w-[52px] md:w-[60px]", h: "h-[56px] md:h-[64px]", width: 164, height: 180 },
  { src: "/logos/optimized/one-stop-outdoor.png", alt: "One Stop Outdoor Construction", w: "w-[105px] md:w-[135px]", width: 300, height: 132 },
  { src: "/logos/optimized/elite-home-repairs-v2.png", alt: "Elite Home Repairs", w: "w-[95px] md:w-[115px]", h: "h-[48px] md:h-[56px]", width: 353, height: 180 },
  { src: "/logos/optimized/jack-sold-by-toro-dark.png", alt: "The Toro Group", w: "w-[110px] md:w-[130px]", h: "h-[40px] md:h-[48px]", width: 639, height: 180 },
  { src: "/logos/jnornamentaldesign.svg", alt: "JN Ornamental Design", w: "w-[70px] md:w-[85px]", h: "h-[48px] md:h-[56px]", width: 96, height: 96, unoptimized: true },
  { src: "/logos/optimized/mcmillian-junk-removal-v2.png", alt: "McMillian Junk Removal", w: "w-[78px] md:w-[90px]", h: "h-[56px] md:h-[64px]", width: 249, height: 180 },
  { src: "/logos/optimized/tomi-dark.png", alt: "Tomi Jewelry", w: "w-[80px] md:w-[95px]", h: "h-[40px] md:h-[48px]", width: 488, height: 180 },
  { src: "/logos/optimized/jimenez-junk-removal.png", alt: "Jimenez Junk Removal", w: "w-[115px] md:w-[145px]", width: 320, height: 98 },
  { src: "/logos/optimized/becreativesco.png", alt: "Becreativesco", w: "w-[65px] md:w-[78px]", h: "h-[24px] md:h-[28px]", width: 517, height: 180 },
  { src: "/logos/optimized/solivance-electric.png", alt: "Solivance Electric", w: "w-[110px] md:w-[135px]", width: 470, height: 180 },
  { src: "/logos/optimized/south-coast-painting.png", alt: "South Coast Quality Painting", w: "w-[95px] md:w-[115px]", h: "h-[52px] md:h-[64px]", width: 320, height: 180 },
  { src: "/logos/optimized/jerrys-roofing.png", alt: "Jerry's Roofing", w: "w-[100px] md:w-[120px]", width: 365, height: 180 },
  { src: "/logos/optimized/tex-mex-roofing.png", alt: "Tex Mex Roofing", w: "w-[70px] md:w-[85px]", h: "h-[48px] md:h-[56px]", width: 190, height: 180 },
  { src: "/logos/optimized/greatest-insulation.png", alt: "The Greatest Insulation", w: "w-[80px] md:w-[95px]", h: "h-[48px] md:h-[56px]", width: 239, height: 180 },
  { src: "/logos/optimized/vences-house-painters.png", alt: "Vences House Painters", w: "w-[70px] md:w-[85px]", h: "h-[48px] md:h-[56px]", width: 197, height: 180 },
  { src: "/logos/optimized/mjb-entertainment.png", alt: "MJB Entertainment USA", w: "w-[54px] md:w-[62px]", h: "h-[54px] md:h-[62px]", width: 180, height: 180 },
  { src: "/logos/optimized/tj-nails.png", alt: "TJ Nails Katy", w: "w-[125px] md:w-[150px]", h: "h-[30px] md:h-[36px]", width: 609, height: 95 },
  { src: "/logos/optimized/futurerise-financial.png", alt: "FutureRise Financial", w: "w-[130px] md:w-[155px]", h: "h-[40px] md:h-[48px]", width: 720, height: 178 },
  { src: "/logos/optimized/base-real-estate-group.png", alt: "Base Real Estate Group", w: "w-[260px] md:w-[320px]", h: "h-[16px] md:h-[20px]", width: 2054, height: 120 },
];

export function ClientLogoMarquee({
  label = "Businesses We've Helped",
}: {
  label?: string;
}) {
  return (
    <div className="border-t border-white/[0.08] pt-4 pb-2">
      <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 text-center mb-3">
        {label}
      </p>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes logo-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            .logo-marquee-track { display: flex; width: max-content; animation: logo-scroll 75s linear infinite; }
          `,
        }}
      />
      <div className="relative overflow-hidden">
        <div className="logo-marquee-track allow-motion">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 items-center gap-14 md:gap-20 px-7 md:px-10"
              aria-hidden={copy === 1 ? "true" : undefined}
            >
              {clientLogos.map((logo) => (
                <div
                  key={logo.alt}
                  className={`flex items-center justify-center ${logo.h || "h-[40px] md:h-[48px]"} ${logo.w} shrink-0`}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    sizes="(min-width: 768px) 200px, 160px"
                    unoptimized={logo.unoptimized}
                    className="max-w-full max-h-full object-contain opacity-75"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
