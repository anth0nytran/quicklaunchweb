import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Support Request | QuickLaunchWeb",
  description:
    "Contact QuickLaunchWeb for help with your website, subscription, billing, or launch questions.",
  path: "/support",
});

export default function SupportLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
