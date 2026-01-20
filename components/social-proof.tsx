"use client";

import { GlassCard, AmbientGlow } from "@/components/ui/glass";

// =============================================================================
// Simple Brand Link Component (Apple-style typography)
// =============================================================================

function BrandLink({
  name,
  url,
}: {
  name: string;
  url: string;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(`https://${url}`, "_blank", "noopener,noreferrer");
  };

  return (
    <a
      href={`https://${url}`}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center justify-center h-full w-full transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-xl"
    >
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold text-white tracking-tight">
          {name}
        </h3>
        <p className="text-sm text-muted font-mono">
          {url}
        </p>
      </div>
      
      {/* Subtle hover indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <svg
          className="h-4 w-4 text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
    </a>
  );
}

type Project = {
  name: string;
  type: string;
  url: string;
  tags: string[];
  proofLabel: string;
  proofStat: string;
  proofDetail: string;
};

const projects: Project[] = [
  {
    name: "Tomi Jewelry",
    type: "Shopify Store Launch",
    url: "tomijewelry.com",
    tags: ["Accounts + Cart Setup", "Analytics Tracking"],
    proofLabel: "30-Day Results",
    proofStat: "1,750+ visitors",
    proofDetail: "8,800+ page views in the first month.",
  },
  {
    name: "Diamond Street Realty",
    type: "Seller Lead Machine",
    url: "diamondstreetrealty.com",
    tags: ["Home Valuation Funnel", "CRM + Automation"],
    proofLabel: "Lead Flow",
    proofStat: "4-8 listing appointments / month",
    proofDetail: "Conversion-focused seller funnel + CRM automation.",
  },
  {
    name: "Becreativesco",
    type: "Agency Site Built To Book",
    url: "becreativesco.com",
    tags: ["Portfolio + Video Showcase", "Automated Lead Capture"],
    proofLabel: "First 30 Days",
    proofStat: "2 high-value inbound leads",
    proofDetail: "Booked from the new portfolio + capture flow.",
  },
];

export function SocialProofSection() {
  return (
    <section id="work" className="relative px-6 py-24 md:py-32 overflow-hidden">
      <AmbientGlow color="white" position="center" intensity="subtle" className="opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 md:text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-4xl">
            Recently <span className="text-accent">Shipped</span>
          </h2>
          <p className="mt-3 text-secondary">
          Real businesses. Real launches. Built fast — engineered to convert.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project, i) => (
            <div key={i} className="group">
              <GlassCard className="overflow-hidden p-0" hover>
                <div className="p-5 pb-0">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-accent border border-accent/20 bg-accent/5 px-2 py-0.5 rounded-full">
                      {project.type}
                    </span>
                  </div>
                  <div className="flex gap-2 mb-4 mt-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[10px] text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <div className="relative aspect-[16/10] w-full rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-transform duration-500 ease-out group-hover:scale-[1.01] group-hover:shadow-2xl">
                    <BrandLink name={project.name} url={project.url} />
                  </div>
                </div>
              </GlassCard>

              {/* Proof highlight */}
              <div className="mt-4 px-1 text-left">
                <p className="text-[10px] uppercase tracking-[0.35em] text-accent/80">
                  {project.proofLabel}
                </p>
                <p className="mt-2 text-lg font-semibold text-white md:text-xl">
                  {project.proofStat}
                </p>
                <p className="mt-1 text-xs text-secondary leading-relaxed">
                  {project.proofDetail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
