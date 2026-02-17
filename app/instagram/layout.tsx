import type { Metadata, Viewport } from "next";
import Script from "next/script";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

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
  return (
    <>
      {metaPixelId && (
        <>
          <Script id="meta-pixel-base" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
              (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            <img
              alt=""
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}
      {children}
    </>
  );
}
