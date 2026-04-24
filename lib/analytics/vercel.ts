import { track as trackVercelEvent } from "@vercel/analytics";
import { sanitizeVercelProperties, type VercelEventProperties } from "./vercel-shared";

function getStoredAttribution() {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const attributionKeys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "gclid",
    "fbclid",
  ];

  const attribution: VercelEventProperties = {};
  for (const key of attributionKeys) {
    const incoming = params.get(key);
    if (incoming) {
      window.sessionStorage.setItem(`qlw_${key}`, incoming);
      attribution[key] = incoming.slice(0, 255);
      continue;
    }

    const stored = window.sessionStorage.getItem(`qlw_${key}`);
    if (stored) attribution[key] = stored.slice(0, 255);
  }

  return attribution;
}

export function trackVercelAnalyticsEvent(
  eventName: string,
  properties?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;

  try {
    trackVercelEvent(eventName.slice(0, 255), {
      ...sanitizeVercelProperties(properties),
      page_path: window.location.pathname,
      page_url: window.location.href.slice(0, 255),
      ...getStoredAttribution(),
    });
  } catch (error) {
    if (process.env.NEXT_PUBLIC_GA_DEBUG === "true") {
      console.warn("[Vercel Analytics] Event not sent:", eventName, error);
    }
  }
}
