import Link from "next/link";
import { GlassDivider } from "@/components/ui/glass";
import { ConsentFooterLinks } from "@/components/consent/consent-links";

// Service area — also mirrored in the Service schema on app/page.tsx.
export const serviceAreas = [
  "Houston", "Katy", "Cypress", "Spring", "The Woodlands", "Sugar Land",
  "Pearland", "Baytown", "Conroe", "Humble", "Pasadena", "League City",
  "Missouri City", "Richmond", "Tomball",
];

const footerColumns = [
  {
    title: "What we do",
    links: [
      { name: "Houston Growth Engine", href: "/houston-growth-engine" },
      { name: "AI Search & SEO", href: "/services/web-design" },
      { name: "Automations & Software", href: "/services/automations" },
      { name: "All Services", href: "/services" },
    ],
  },
  {
    title: "Inside the Engine",
    links: [
      { name: "Facebook & Instagram Ads", href: "/services/facebook-ads" },
      { name: "Contractor Video", href: "/services/video-production" },
      { name: "Houston Contractor Websites", href: "/houston-web-design-for-contractors" },
    ],
  },
  {
    title: "More",
    links: [
      { name: "Guides", href: "/guides" },
      { name: "Support", href: "/support" },
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06] py-12">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-1.5 font-bold tracking-tight">
              <span className="font-black text-lg text-[#6EA8FF]">QL</span>
              <span className="text-white/20 font-light">|</span>
              <span className="text-white/90">QuickLaunchWeb</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              Booked jobs and revenue for Houston home service businesses. Not just leads.
            </p>
            <a
              href="sms:+18325523458"
              className="mt-3 inline-block text-sm text-[#6EA8FF] hover:underline"
            >
              Text us: 832-552-3458
            </a>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-6">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
                  {column.title}
                </h2>
                <ul className="mt-3 space-y-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-secondary hover:text-white">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <GlassDivider className="my-8" />

        <div className="flex flex-col items-center justify-between gap-3 text-white/70 md:flex-row">
          <p className="text-xs">&copy; {year} QuickLaunchWeb. Houston, TX.</p>
          <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs">
            <Link href="/terms" className="hover:text-white hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-white hover:underline">
              Privacy
            </Link>
            <Link href="/sms-consent" className="hover:text-white hover:underline">
              SMS Terms
            </Link>
            <ConsentFooterLinks className="text-left hover:text-white hover:underline" />
          </nav>
        </div>

        <div className="mt-8 border-t border-white/[0.05] pt-6">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60">
            Where we work
          </h2>
          <p className="mt-2.5 text-[12px] leading-relaxed text-white/60">
            Facebook &amp; Instagram ads, video, and social media marketing for home service
            businesses in {serviceAreas.join(", ")}, and the rest of the Houston metro.
          </p>
        </div>

        <p className="mt-6 text-center text-[12px] leading-relaxed text-white/60">
          Results shown are from individual clients and are not a guarantee. Results vary by
          trade, area, and ad budget. Example dashboards and numbers are for illustration.
          QuickLaunchWeb is not affiliated with Meta, Instagram, Google, Angi, or Thumbtack.
        </p>
      </div>
    </footer>
  );
}
