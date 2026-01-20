import React from "react";
import type { Metadata, Viewport } from "next";
import { Montserrat, Lato } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Free Website Builder | Professional Sites $99/mo - QuickLaunchWeb",
  description:
    "Get a professional website built free. Just $99/month for hosting + support. Mobile-friendly, SEO-ready, converts visitors into customers. Launch in 48 hours. No contracts. Cancel anytime. Perfect for businesses, freelancers, service companies, and anyone who needs a professional online presence.",
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
    title: "Free Website Builder | Professional Sites $99/mo - QuickLaunchWeb",
    description:
      "Get a professional website built free. Just $99/month for hosting + support. Mobile-friendly, SEO-ready, converts visitors into customers. Launch in 48 hours. No contracts. Cancel anytime.",
    url: siteUrl,
    siteName: "QuickLaunchWeb",
    type: "website",
    images: [
      {
        url: `${siteUrl}/icon.jpg`,
        width: 1200,
        height: 630,
        alt: "QuickLaunchWeb - Free Professional Website Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Website Builder | Professional Sites $99/mo",
    description:
      "Get a professional website built free. Just $99/month. Mobile-friendly, SEO-ready, converts visitors into customers. Launch in 48 hours. Cancel anytime.",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
