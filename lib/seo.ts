import type { Metadata } from "next";

export const siteName = "QuickLaunchWeb";
export const siteSupportEmail = "anthotranllc@gmail.com";

export const siteUrl = (() => {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!value && process.env.NODE_ENV === "production") {
    throw new Error("Missing NEXT_PUBLIC_SITE_URL in production.");
  }
  return value || "http://localhost:3000";
})();

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
    url: absoluteUrl("/icon.jpg"),
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
