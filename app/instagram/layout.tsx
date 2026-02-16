import type { Metadata, Viewport } from "next";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Get a Free Website Mockup in 24 Hours | QuickLaunchWeb",
  description:
    "We build professional websites for local businesses — live in 48 hours for $99/mo. Get your free custom mockup today. No credit card required.",
  openGraph: {
    title: "Get a Free Website Mockup in 24 Hours | QuickLaunchWeb",
    description:
      "We build professional websites for local businesses — live in 48 hours for $99/mo. Get your free custom mockup today.",
    url: `${siteUrl}/instagram`,
    siteName: "QuickLaunchWeb",
    type: "website",
    images: [
      {
        url: `${siteUrl}/icon.jpg`,
        width: 1200,
        height: 630,
        alt: "QuickLaunchWeb - Free Website Mockup",
      },
    ],
  },
  robots: {
    index: false, // Don't index ad landing pages
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Prevent zoom on iOS input focus
  userScalable: false,
  themeColor: "#050507",
};

export default function InstagramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
