import type { Metadata, Viewport } from "next";
import { buildPageMetadata } from "@/lib/seo";

// The Meta Pixel used to load here unconditionally. It now loads site-wide from
// components/consent/consent-manager.tsx, and only after the visitor opts in to advertising.

export const metadata: Metadata = buildPageMetadata({
  title: "See Your Website Demo Live in 15 Minutes | QuickLaunchWeb",
  description:
    "Book a free 15-minute demo call. We'll show you a live website demo built for your services + area. Approve on the call, launch in 48 hours. No contracts.",
  path: "/instagram",
});

// Pinch-zoom stays enabled (WCAG 1.4.4). Inputs use 16px text so iOS does not auto-zoom.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#171717",
};

export default function InstagramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
