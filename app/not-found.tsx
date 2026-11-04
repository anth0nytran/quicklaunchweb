import Link from "next/link";
import { BrandShell } from "@/components/brand/brand-shell";
import { Eyebrow, IconTile, KitIcon } from "@/components/brand/primitives";
import { focusRing, container, pageH1, bodyText, card, primaryBtn, outlineBtn } from "@/components/brand/tokens";

const popular = [
  {
    icon: "ads",
    title: "Facebook & Instagram Ads",
    body: "Ads and video that bring in calls and booked jobs.",
    href: "/services/facebook-ads",
  },
  {
    icon: "video-camera",
    title: "Video Production",
    body: "Short-form video we film for your business.",
    href: "/services/video-production",
  },
  {
    icon: "website",
    title: "Websites",
    body: "Conversion-focused sites for local service businesses.",
    href: "/services/web-design",
  },
  {
    icon: "book",
    title: "Guides",
    body: "Practical marketing guides for contractors.",
    href: "/guides",
  },
];

export default function NotFound() {
  return (
    <BrandShell stickyCta={false}>
      <section className="bg-gradient-to-b from-[#EFF8FF] to-[#f7fbff] pb-12 pt-[104px] sm:pb-16 sm:pt-28 lg:pt-32">
        <div className={container}>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Error 404</Eyebrow>
            <h1 className={`mt-4 ${pageH1}`}>We couldn&apos;t find that page.</h1>
            <p className={`mx-auto mt-4 max-w-[34rem] ${bodyText}`}>
              The link may be broken or the page may have moved. Head back home or pick one of the pages below.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3.5 sm:flex-row">
              <Link href="/" className={`${primaryBtn} px-7 py-4 text-[16px]`}>
                Back to home
                <KitIcon name="arrow-right" white className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/support" className={`${outlineBtn} px-7 py-4 text-[16px]`}>
                Contact support
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white pb-16 pt-10 sm:pb-24 sm:pt-14">
        <div className={container}>
          <h2 className="text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-[#46516B]">Popular pages</h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${card} group flex h-full flex-col gap-4 p-5 transition-colors hover:border-[#0866FF]/40 sm:p-6 ${focusRing}`}
                >
                  <IconTile name={item.icon} />
                  <div>
                    <p className="text-[17px] font-bold text-[#07143F] group-hover:text-[#0866FF]">{item.title}</p>
                    <p className="mt-1.5 text-[15px] leading-[1.5] text-[#46516B]">{item.body}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </BrandShell>
  );
}
