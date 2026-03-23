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
  title: "QuickLaunchWeb | Look Better Online. Win More Jobs.",
  description:
    "We help local businesses look legit online, show up better on Google, and get more 5-star reviews so more people call.",
  path: "/",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...homeMetadata,
  keywords: [
    "QuickLaunchWeb",
    "local business website",
    "service business website",
    "website that gets calls",
    "google business profile help",
    "local SEO for small business",
    "google reviews follow up",
    "website for contractors",
    "website for home services",
    "multi city SEO",
    "city landing pages",
    "website for local business",
    "business website subscription",
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
