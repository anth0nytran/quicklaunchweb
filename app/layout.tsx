import React from "react";
import type { Metadata, Viewport } from "next";
import { Montserrat, Lato, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { SiteEngagementTracker } from "@/lib/analytics";
import { SiteStructuredData } from "@/components/seo/SiteStructuredData";
import { buildPageMetadata, siteUrl } from "@/lib/seo";
import { ConsentManager } from "@/components/consent/consent-manager";
import { SkipToContent } from "@/components/skip-to-content";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

// Brand font for the light redesign (components/brand). Applied per page by BrandShell.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";
const homeMetadata = buildPageMetadata({
  title: "Houston Facebook Ads & Video for Contractors | QuickLaunchWeb",
  description:
    "Facebook and Instagram ads, contractor video, and social media marketing for Houston home service businesses. Live in 7 days. Leads go straight to your phone, or our team calls them and books the estimate.",
  path: "/",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...homeMetadata,
  keywords: [
    "QuickLaunchWeb",
    "houston social media marketing",
    "social media marketing for contractors",
    "home service marketing houston",
    "done for you social media management",
    "facebook ads for contractors",
    "instagram marketing for home services",
    "contractor lead generation houston",
    "appointment setting for home services",
    "missed call text back",
    "google reviews automation",
    "website for local business",
    "local SEO for small business",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.jpg",
    apple: "/icon.jpg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080e24",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <body
        className={`${lato.variable} ${montserrat.variable} ${inter.variable} ${lato.className} bg-black text-white antialiased overflow-x-hidden`}
      >
        <SkipToContent />
        {/* Google Analytics and the Meta Pixel load ONLY after consent (components/consent). */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <SiteStructuredData />
        <SiteEngagementTracker />
        {/* Vercel Analytics: cookieless, aggregate page views. Not gated by the banner. */}
        <Analytics />
        <ConsentManager gaId={GA_MEASUREMENT_ID} pixelId={META_PIXEL_ID} />
      </body>
    </html>
  );
}
