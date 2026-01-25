import React from "react";
import type { Metadata, Viewport } from "next";
import { Montserrat, Lato } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";

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

const siteUrl = (() => {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!value && process.env.NODE_ENV === "production") {
    throw new Error("Missing NEXT_PUBLIC_SITE_URL in production.");
  }
  return value || "http://localhost:3000";
})();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "QuickLaunchWeb | Done-For-You Websites in 48 Hours ($99/mo)",
  description:
    "Get a professional website built fast with $0 down. $99/mo includes hosting + support. Mobile-first, SEO-ready, built to convert.",
  keywords: [
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
  openGraph: {
    title: "QuickLaunchWeb | Done-For-You Websites in 48 Hours ($99/mo)",
    description:
      "Get a professional website built fast with $0 down. $99/mo includes hosting + support. Mobile-first, SEO-ready, built to convert.",
    url: siteUrl,
    siteName: "QuickLaunchWeb",
    type: "website",
    images: [
      {
        url: `${siteUrl}/icon.jpg`,
        width: 1200,
        height: 630,
        alt: "QuickLaunchWeb - Done-For-You Websites in 48 Hours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickLaunchWeb | Done-For-You Websites in 48 Hours ($99/mo)",
    description:
      "Get a professional website built fast with $0 down. $99/mo includes hosting + support. Mobile-first, SEO-ready, built to convert.",
    images: [`${siteUrl}/icon.jpg`],
  },
  alternates: {
    canonical: siteUrl,
  },
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
      <body className={`${lato.variable} ${montserrat.variable} ${lato.className} bg-black text-white antialiased`}>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DQ1N327ENZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DQ1N327ENZ');
          `}
        </Script>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
