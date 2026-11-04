import type { Metadata } from "next";
import Link from "next/link";
import { BrandShell, CtaBand, PageHero } from "@/components/brand/brand-shell";
import { ResultsSection } from "@/components/brand/results";
import { CheckList, IconTile, KitIcon } from "@/components/brand/primitives";
import { container, focusRing, primaryBtn, outlineBtn } from "@/components/brand/tokens";
import { StructuredData } from "@/components/seo/StructuredData";
import { absoluteUrl, buildPageMetadata, organizationId, websiteId } from "@/lib/seo";

const pagePath = "/services";
const pageUrl = absoluteUrl(pagePath);
const pageTitle = "Services | QuickLaunchWeb Houston";
const pageDescription =
  "Three ways QuickLaunchWeb helps Houston home service businesses: the Houston Growth Engine for booked, higher-ticket jobs, AI Search & SEO to get found, and Automations & Software to save time and make money.";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: pageTitle,
    description: pageDescription,
    path: pagePath,
  }),
};

const services = [
  {
    icon: "rocket",
    eyebrow: "Flagship",
    title: "Houston Growth Engine",
    tagline: "Booked jobs and bigger tickets, not just leads.",
    body: "One done-for-you system: we film your videos, run your Facebook and Instagram ads, text every lead in seconds, and our team qualifies and books the estimate on your calendar.",
    points: [
      "Content that sells before you show up",
      "Ads aimed at bigger, higher-end jobs",
      "Instant text-back and follow-up",
      "We qualify and book your estimates",
      "One business per trade, per area",
    ],
    href: "/houston-growth-engine",
    cta: "See the Engine",
    ctaSecondary: { label: "Facebook ads", href: "/services/facebook-ads" },
    featured: true,
  },
  {
    icon: "search",
    eyebrow: "Get found",
    title: "AI Search & SEO",
    tagline: "Show up on Google, Maps, and AI search.",
    body: "A fast website plus local SEO so Houston homeowners find you on Google, Google Maps, and AI assistants like ChatGPT. Three packages, starting at $99/mo.",
    points: [
      "Free custom website included",
      "Google, Maps, and AI search visibility",
      "Tap-to-call and quote forms",
      "Automated review requests",
    ],
    href: "/services/web-design",
    cta: "See the packages",
    ctaSecondary: { label: "Houston contractors", href: "/houston-web-design-for-contractors" },
    featured: false,
  },
  {
    icon: "automation",
    eyebrow: "Save time, make money",
    title: "Automations & Software",
    tagline: "We diagnose first, then automate.",
    body: "A business diagnosis call, then a custom plan to automate what makes or saves you money: CRM follow-up, AI receptionist, custom software, and custom web development.",
    points: [
      "CRM and follow-up automation",
      "AI receptionist and chat",
      "Custom software and apps",
      "Custom web development",
    ],
    href: "/services/automations",
    cta: "See automations",
    ctaSecondary: { label: "Book a diagnosis call", href: "/services/automations#book" },
    featured: false,
  },
];

export default function ServicesPage() {
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": `${pageUrl}#webpage`,
              url: pageUrl,
              name: pageTitle,
              description: pageDescription,
              isPartOf: { "@id": websiteId },
              about: { "@id": organizationId },
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${pageUrl}#breadcrumb`,
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
                { "@type": "ListItem", position: 2, name: "Services", item: pageUrl },
              ],
            },
          ],
        }}
      />

      <BrandShell pagePath={pagePath}>
        <PageHero
          eyebrow="Houston · Home services"
          title={
            <>
              Three Ways We Grow Your <span className="text-[#0866FF]">Home Service Business</span>.
            </>
          }
          intro={
            <p>
              The Growth Engine books the jobs. AI Search & SEO gets you found. Automations save the time
              and money in between. Most owners start with the Engine.
            </p>
          }
        />

        <section className="bg-white py-12 sm:py-20">
          <div className={`${container} grid gap-6 lg:grid-cols-3 lg:gap-7`}>
            {services.map((service) => (
              <article
                key={service.title}
                className={`relative flex h-full flex-col rounded-xl border bg-white p-7 shadow-[0_8px_30px_-14px_rgba(7,20,63,0.18)] sm:p-9 ${
                  service.featured ? "border-[#0866FF]/40" : "border-[#E5EDF6]"
                }`}
              >
                {service.featured && (
                  <span className="absolute -top-3 left-7 rounded-full bg-[#0866FF] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                    Start here
                  </span>
                )}
                <div className="flex items-center gap-4">
                  <IconTile name={service.icon} />
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0866FF]">{service.eyebrow}</p>
                    <h2 className="text-[24px] font-extrabold tracking-[-0.03em] sm:text-[28px]">{service.title}</h2>
                  </div>
                </div>
                <p className="mt-4 text-[17px] font-semibold">{service.tagline}</p>
                <p className="mt-3 text-[15px] leading-[1.6] text-[#46516B]">{service.body}</p>
                <CheckList items={service.points} className="mt-6 flex-1" />
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href={service.href}
                    className={`${service.featured ? primaryBtn : outlineBtn} px-6 py-3.5 text-[15px]`}
                  >
                    {service.cta}
                    <KitIcon
                      name="arrow-right"
                      white={service.featured}
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                  <Link
                    href={service.ctaSecondary.href}
                    className={`rounded-lg text-[15px] font-semibold text-[#46516B] transition-colors hover:text-[#0866FF] ${focusRing}`}
                  >
                    {service.ctaSecondary.label} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <ResultsSection />
        <CtaBand />
      </BrandShell>
    </>
  );
}
