import React from "react";
import type { Metadata, Viewport } from "next";
import { Montserrat, Lato } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { SiteStructuredData } from "@/components/seo/SiteStructuredData";
import { buildPageMetadata, siteUrl } from "@/lib/seo";

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

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
const homeMetadata = buildPageMetadata({
  title: "QuickLaunchWeb | Stop Losing Customers to Competitors With Better Websites",
  description:
    "Every day without a website, your competitors get the call instead. QuickLaunchWeb builds websites for local businesses that get you customers - live in 48 hours. $0 upfront. $99/mo. Cancel anytime.",
  path: "/",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...homeMetadata,
  keywords: [
    "QuickLaunchWeb",
    "free website builder",
    "professional website builder",
    "affordable website",
    "website builder for business",
    "professional website design",
    "business website builder",
    "website in 48 hours",
    "website builder subscription",
    "monthly website hosting",
    "convert visitors to customers",
    "SEO website builder",
    "mobile-friendly website",
    "website for service business",
    "freelancer website builder",
    "no-code website builder",
    "online business website",
    "service company website",
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
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${lato.variable} ${montserrat.variable} ${lato.className} bg-black text-white antialiased overflow-x-hidden`}
      >
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  anonymize_ip: true,
                  cookie_flags: 'SameSite=None;Secure'
                });
              `}
            </Script>
          </>
        )}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <SiteStructuredData />
        <Analytics />
      </body>
    </html>
  );
}
