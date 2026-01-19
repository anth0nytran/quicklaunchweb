"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { GlassCard, AmbientGlow } from "@/components/ui/glass";
import { cn } from "@/lib/utils";

import tomij1 from "@/assets/tomij1.png";
import tomij2 from "@/assets/tomij2.png";
import tomij3 from "@/assets/tomij3.png";
import diamondstreet1 from "@/assets/diamondstreet1.png";
import diamondstreet2 from "@/assets/diamondstreet2.png";
import diamondstreet3 from "@/assets/diamondstreet3.png";
import becreativesco1 from "@/assets/becreativesco1.png";
import becreativesco2 from "@/assets/becreativesco2.png";
import becreativesco3 from "@/assets/becreativesco3.png";

// =============================================================================
// Mock Browser Component
// =============================================================================

function MockBrowser({
  url,
  children,
  className,
}: {
  url: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/[0.08] bg-black/40 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex h-8 items-center gap-2 border-b border-white/[0.05] bg-white/[0.02] px-3">
        <div className="flex gap-1.5">
          <div className="h-2 w-2 rounded-full bg-red-500/20" />
          <div className="h-2 w-2 rounded-full bg-yellow-500/20" />
          <div className="h-2 w-2 rounded-full bg-green-500/20" />
        </div>
        <div className="flex-1 px-2">
          <div className="mx-auto h-4 max-w-[140px] rounded-full bg-white/[0.03] text-[8px] text-white/30 flex items-center justify-center font-mono">
            {url}
          </div>
        </div>
      </div>
      <div className="relative aspect-[16/10] w-full bg-black/60">{children}</div>
    </div>
  );
}

type Screenshot = {
  src: StaticImageData;
  alt: string;
};

function ScreenshotCarousel({
  screenshots,
  siteUrl,
  siteLabel,
}: {
  screenshots: Screenshot[];
  siteUrl: string;
  siteLabel: string;
}) {
  const [index, setIndex] = useState(0);
  const total = screenshots.length;
  const hasMultiple = total > 1;

  if (total === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center text-xs text-muted">
        No screenshots available.
      </div>
    );
  }

  const openSite = () => {
    window.open(`https://${siteUrl}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative h-full w-full">
      <div
        role="link"
        tabIndex={0}
        aria-label={`Visit ${siteLabel}`}
        onClick={openSite}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openSite();
          }
        }}
        className="absolute inset-0 z-10 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        {screenshots.map((shot, i) => (
          <Image
            key={shot.alt}
            src={shot.src}
            alt={shot.alt}
            fill
            quality={92}
            sizes="(min-width: 1280px) 410px, (min-width: 1024px) 340px, (min-width: 768px) 45vw, 90vw"
            priority={i === 0}
            className={cn(
              "absolute inset-0 object-cover object-top transition-opacity duration-300",
              i === index ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="pointer-events-none absolute right-3 top-3 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-wider text-white/80 backdrop-blur-sm transition-colors group-hover:border-white/40 group-hover:text-white">
          Visit site
        </span>
      </div>

      {hasMultiple && (
        <>
          <button
            type="button"
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-2 text-white/80 backdrop-blur-sm transition-colors hover:border-white/40 hover:text-white"
            onClick={(event) => {
              setIndex((prev) => (prev - 1 + total) % total);
            }}
            aria-label={`${siteLabel} previous screenshot`}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-2 text-white/80 backdrop-blur-sm transition-colors hover:border-white/40 hover:text-white"
            onClick={(event) => {
              setIndex((prev) => (prev + 1) % total);
            }}
            aria-label={`${siteLabel} next screenshot`}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 rounded-full border border-white/10 bg-black/40 px-2.5 py-1.5 backdrop-blur-sm">
            {screenshots.map((_, i) => (
              <button
                key={i}
                type="button"
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-colors",
                  i === index ? "bg-accent shadow-glow" : "bg-white/30 hover:bg-white/60"
                )}
                onClick={(event) => {
                  setIndex(i);
                }}
                aria-label={`${siteLabel} screenshot ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

type Project = {
  name: string;
  type: string;
  url: string;
  tags: string[];
  screenshots: Screenshot[];
};

const projects: Project[] = [
  {
    name: "Tomi Jewelry",
    type: "E-commerce Website",
    url: "tomijewelry.com",
    screenshots: [
      { src: tomij1, alt: "Tomi Jewelry website screenshot 1" },
      { src: tomij2, alt: "Tomi Jewelry website screenshot 2" },
      { src: tomij3, alt: "Tomi Jewelry website screenshot 3" },
    ],
    tags: ["Shopify Integration", "Inventory Sync"],
  },
  {
    name: "Diamond Street Realty",
    type: "Landing Page",
    url: "diamondstreetrealty.com",
    screenshots: [
      { src: diamondstreet1, alt: "Diamond Street Realty website screenshot 1" },
      { src: diamondstreet2, alt: "Diamond Street Realty website screenshot 2" },
      { src: diamondstreet3, alt: "Diamond Street Realty website screenshot 3" },
    ],
    tags: ["Lead Capture", "Map Integration"],
  },
  {
    name: "BeCreativesCo",
    type: "Marketing Agency",
    url: "becreativesco.com",
    screenshots: [
      { src: becreativesco1, alt: "BeCreativesCo website screenshot 1" },
      { src: becreativesco2, alt: "BeCreativesCo website screenshot 2" },
      { src: becreativesco3, alt: "BeCreativesCo website screenshot 3" },
    ],
    tags: ["3-Page Site", "Portfolio"],
  },
];

export function SocialProofSection() {
  return (
    <section className="relative px-6 py-24 md:py-32 overflow-hidden">
      <AmbientGlow color="white" position="center" intensity="subtle" className="opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 md:text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-4xl">
            Recent <span className="text-accent">Launches</span>
          </h2>
          <p className="mt-3 text-secondary">
            See what we've built for other businesses this month.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project, i) => (
            <GlassCard key={i} className="group overflow-hidden p-0" hover>
              <div className="p-5 pb-0">
                <div className="mb-1 flex items-center justify-between">
                  <h3 className="font-semibold text-white">{project.name}</h3>
                  <span className="text-[10px] uppercase tracking-wider text-accent border border-accent/20 bg-accent/5 px-2 py-0.5 rounded-full">
                    {project.type}
                  </span>
                </div>
                <div className="flex gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-5 pb-5">
                <MockBrowser
                  url={project.url}
                  className="transition-transform duration-500 ease-out group-hover:scale-[1.01] group-hover:shadow-2xl"
                >
                  <ScreenshotCarousel
                    screenshots={project.screenshots}
                    siteUrl={project.url}
                    siteLabel={project.name}
                  />
                </MockBrowser>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
