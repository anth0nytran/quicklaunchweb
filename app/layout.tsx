import React from "react";
import type { Metadata, Viewport } from "next";
import { Montserrat, Lato } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ColorSwitcherProvider } from "@/components/color-switcher-context";
import { ColorSwitcher } from "@/components/color-switcher";

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
  title: "Free Website Build | $0 Down, Live in 48 Hours",
  description:
    "Get a professional website built for free. Just $99/mo hosting. Mobile-first, SEO-ready, launched in 48 hours. Cancel anytime.",
  keywords: [
    "free website",
    "website builder",
    "small business website",
    "local business website",
    "website in 48 hours",
  ],
  openGraph: {
    title: "Free Website Build | $0 Down, Live in 48 Hours",
    description:
      "Stop paying $1,000+ upfront. We build your site free. Just $99/mo for hosting + support. Live in 48 hours.",
    url: siteUrl,
    siteName: "QuickLaunchWeb",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Website Build | $0 Down, Live in 48 Hours",
    description:
      "Stop paying $1,000+ upfront. We build your site free. Just $99/mo for hosting + support. Live in 48 hours.",
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
        <ColorSwitcherProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
            <ColorSwitcher />
          </ThemeProvider>
        </ColorSwitcherProvider>
      </body>
    </html>
  );
}
