import type { Metadata } from "next";

export const siteName = "QuickLaunchWeb";
export const siteSupportEmail = "anthotranllc@gmail.com";

export const siteUrl = (() => {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!value && process.env.NODE_ENV === "production") {
    throw new Error("Missing NEXT_PUBLIC_SITE_URL in production.");
  }
  if (!value) {
    return "http://localhost:3000";
  }
  // The live site serves only HTTPS (http:// 308-redirects). If the env var was
  // saved as http://, canonicals, og:url and every JSON-LD @id would point at a
  // redirecting URL, so force https for any non-local host.
  return /^http:\/\/(localhost|127\.0\.0\.1)(:|$)/.test(value)
    ? value
    : value.replace(/^http:\/\//, "https://");
})();

/** Public NAP. Keep identical to the Google Business Profile, Bing Places, Yelp, etc. */
export const sitePhone = "+1-832-552-3458";
export const siteLocality = { addressLocality: "Houston", addressRegion: "TX", addressCountry: "US" };

/**
 * Official profiles for Organization.sameAs (entity building for Google + AI engines).
 * Add each URL here as the profile goes live (GBP share link, LinkedIn company page,
 * Facebook page, Instagram, YouTube, Clutch, BBB, Crunchbase...). Real URLs only.
 */
export const sameAsProfiles: string[] = [];

export const founderId = `${siteUrl}/#founder`;

export const organizationId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;

export function absoluteUrl(path = "/") {
  if (!path || path === "/") {
    return siteUrl;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

function defaultOgImage(title: string) {
  return {
    url: absoluteUrl("/og-image.png"),
    width: 1200,
    height: 630,
    alt: title,
  };
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  robots?: Metadata["robots"];
};

export function buildPageMetadata({
  title,
  description,
  path,
  type = "website",
  robots,
}: PageMetadataOptions): Metadata {
  const image = defaultOgImage(title);

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName,
      type,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
    ...(robots ? { robots } : {}),
  };
}

export function parseMonthYearToIso(value?: string) {
  if (!value) {
    return undefined;
  }

  const parsed = Date.parse(`${value} 1`);
  if (Number.isNaN(parsed)) {
    return undefined;
  }

  return new Date(parsed).toISOString();
}
