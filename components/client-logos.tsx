import Image from "next/image";

// Shared client logo marquee. Used on the social media marketing home page and
// the web services page so the roster only has to be updated in one place.

export const clientLogos = [
  { src: "/logos/optimized/alvarez-pool.png", alt: "Alvarez Pool Service", w: "w-[75px] md:w-[95px]", width: 240, height: 182 },
  { src: "/logos/optimized/3d-fencing.png", alt: "3D Fencing", w: "w-[160px] md:w-[200px]", h: "h-[60px] md:h-[72px]", width: 344, height: 180 },
  { src: "/logos/optimized/cuervo-homes.png", alt: "Cuervo Homes", w: "w-[120px] md:w-[150px]", h: "h-[70px] md:h-[85px]", width: 120, height: 180 },
  { src: "/logos/madenewpressure.svg", alt: "Made New Pressure Washing", w: "w-[75px] md:w-[95px]", width: 112, height: 96, unoptimized: true },
  { src: "/logos/optimized/landeros-electrical.png", alt: "Landeros Electrical", w: "w-[95px] md:w-[125px]", width: 260, height: 159 },
  { src: "/logos/optimized/apex-epoxy.png", alt: "Apex Epoxy & Surface Systems", w: "w-[85px] md:w-[105px]", width: 223, height: 180 },
  { src: "/logos/optimized/jimenez-tree-pro.png", alt: "Jimenez Tree Pro", w: "w-[70px] md:w-[85px]", width: 200, height: 200 },
  { src: "/logos/optimized/one-stop-outdoor.png", alt: "One Stop Outdoor Construction", w: "w-[105px] md:w-[135px]", width: 300, height: 132 },
  { src: "/logos/optimized/elite-home-repairs.png", alt: "Elite Home Repairs", w: "w-[105px] md:w-[135px]", width: 300, height: 164 },
  { src: "/logos/optimized/jack-sold-by-toro.png", alt: "The Toro Group", w: "w-[70px] md:w-[85px]", width: 200, height: 200 },
  { src: "/logos/jnornamentaldesign.svg", alt: "JN Ornamental Design", w: "w-[70px] md:w-[85px]", width: 96, height: 96, unoptimized: true },
  { src: "/logos/optimized/mcmillian-junk-removal.png", alt: "McMillian Junk Removal", w: "w-[95px] md:w-[115px]", width: 239, height: 180 },
  { src: "/logos/optimized/tomi.png", alt: "Tomi Jewelry", w: "w-[65px] md:w-[80px]", width: 180, height: 180 },
  { src: "/logos/optimized/jimenez-junk-removal.png", alt: "Jimenez Junk Removal", w: "w-[115px] md:w-[145px]", width: 320, height: 98 },
  { src: "/logos/optimized/becreativesco.jpg", alt: "Becreativesco", w: "w-[85px] md:w-[105px]", width: 240, height: 171 },
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
