import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "SMS Disclosures | QuickLaunchWeb",
  description:
    "SMS opt-in disclosures for the QuickLaunchWeb SMS Program. See our Privacy Policy for full details.",
  path: "/sms-consent",
  robots: { index: false, follow: true },
});

export default function SmsConsentPage() {
  return (
    <meta httpEquiv="refresh" content="0;url=/privacy#sms" />
  );
}
