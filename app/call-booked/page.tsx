import { Suspense } from "react";
import type { Metadata } from "next";
import CallBookedPage from "@/components/pages/call-booked-page";
import { buildPageMetadata } from "@/lib/seo";

// Post-booking thank-you page. Not for search: noindex + disallowed in robots.ts.
export const metadata: Metadata = buildPageMetadata({
  title: "You're Booked | QuickLaunchWeb",
  description: "Your free call with QuickLaunchWeb is booked.",
  path: "/call-booked",
  robots: { index: false, follow: false },
});

export default function Page() {
  return (
    <Suspense>
      <CallBookedPage />
    </Suspense>
  );
}
