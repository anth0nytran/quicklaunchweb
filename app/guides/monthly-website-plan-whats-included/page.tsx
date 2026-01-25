import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidePage } from "@/components/guides/GuidePage";
import { getGuideBySlug, getGuideMetadata } from "@/lib/guides";

const slug = "monthly-website-plan-whats-included";
const guide = getGuideBySlug(slug);

export const metadata: Metadata = guide
  ? getGuideMetadata(guide)
  : {
      title: "Guide | QuickLaunchWeb",
      description: "QuickLaunchWeb guides for local businesses.",
    };

export default function Page() {
  if (!guide) {
    notFound();
  }

  return <GuidePage guide={guide} />;
}
