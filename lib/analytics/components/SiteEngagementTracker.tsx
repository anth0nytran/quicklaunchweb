"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { SCROLL_THRESHOLDS, EVENT_NAMES } from "../config";
import { sendGtagEvent } from "../gtag";

const PAGE_ENGAGED_SECONDS = 15;
const GUIDE_READ_STARTED_SECONDS = 10;

function getPageType(pathname: string) {
  if (pathname === "/") return "homepage";
  if (pathname === "/guides") return "guides";
  if (pathname.startsWith("/guides/")) return "guide_article";
  if (pathname.startsWith("/demo")) return "demo";
  if (pathname.startsWith("/instagram")) return "instagram";
  if (pathname.startsWith("/support")) return "support";
  if (pathname.startsWith("/success")) return "checkout_success";
  if (pathname.startsWith("/cancel")) return "checkout_cancel";

  return "standard";
}

function getGuideSlug(pathname: string) {
  if (!pathname.startsWith("/guides/")) return undefined;

  return pathname.split("/").filter(Boolean)[1];
}

function getScrollProgress() {
  const documentElement = document.documentElement;
  const scrollableHeight = documentElement.scrollHeight - window.innerHeight;

  if (scrollableHeight <= 0) return 100;

  return Math.min(100, Math.max(0, Math.round((window.scrollY / scrollableHeight) * 100)));
}

function getPageMetrics() {
  return {
    viewport_height: window.innerHeight,
    document_height: document.documentElement.scrollHeight,
  };
}

export function SiteEngagementTracker() {
  const pathname = usePathname();
  const sentScrollDepthsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const pageType = getPageType(pathname);
    const guideSlug = getGuideSlug(pathname);
    const isGuideArticle = Boolean(guideSlug);

    sentScrollDepthsRef.current = new Set();

    const pageEngagedTimeout = window.setTimeout(() => {
      sendGtagEvent("page_engaged", {
        event_category: "engagement",
        page_path: pathname,
        page_type: pageType,
        engaged_seconds: PAGE_ENGAGED_SECONDS,
        ...getPageMetrics(),
      });
    }, PAGE_ENGAGED_SECONDS * 1000);

    const guideStartedTimeout = isGuideArticle
      ? window.setTimeout(() => {
          sendGtagEvent("guide_read_started", {
            event_category: "guides",
            page_path: pathname,
            page_type: pageType,
            guide_slug: guideSlug,
            engaged_seconds: GUIDE_READ_STARTED_SECONDS,
            ...getPageMetrics(),
          });
        }, GUIDE_READ_STARTED_SECONDS * 1000)
      : undefined;

    let animationFrame: number | null = null;

    const trackScrollDepth = () => {
      animationFrame = null;

      const progress = getScrollProgress();

      for (const threshold of SCROLL_THRESHOLDS) {
        if (progress < threshold || sentScrollDepthsRef.current.has(threshold)) {
          continue;
        }

        sentScrollDepthsRef.current.add(threshold);

        const eventPayload = {
          event_category: "engagement",
          scroll_depth: threshold,
          percent_scrolled: threshold,
          page_path: pathname,
          page_type: pageType,
          guide_slug: guideSlug,
          ...getPageMetrics(),
        };

        sendGtagEvent(EVENT_NAMES.SCROLL_DEPTH, eventPayload);

        if (isGuideArticle) {
          sendGtagEvent("guide_read_depth", {
            ...eventPayload,
            event_category: "guides",
          });

          if (threshold === 90) {
            sendGtagEvent("guide_read_completed", {
              event_category: "guides",
              scroll_depth: threshold,
              percent_scrolled: threshold,
              page_path: pathname,
              page_type: pageType,
              guide_slug: guideSlug,
              ...getPageMetrics(),
            });
          }
        }
      }
    };

    const handleScroll = () => {
      if (animationFrame !== null) return;

      animationFrame = window.requestAnimationFrame(trackScrollDepth);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    trackScrollDepth();

    return () => {
      window.clearTimeout(pageEngagedTimeout);
      if (guideStartedTimeout) window.clearTimeout(guideStartedTimeout);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const guideSlug = getGuideSlug(pathname);
    if (!guideSlug) return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>("article section[id]"));
    if (!sections.length) return;

    const viewedSections = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const section = entry.target as HTMLElement;
          const sectionId = section.id;

          if (!sectionId || viewedSections.has(sectionId)) continue;

          viewedSections.add(sectionId);

          const sectionIndex = sections.findIndex((item) => item.id === sectionId);
          const heading = section.querySelector("h2")?.textContent?.trim();

          sendGtagEvent("guide_section_viewed", {
            event_category: "guides",
            page_path: pathname,
            page_type: "guide_article",
            guide_slug: guideSlug,
            section_id: sectionId,
            section_index: sectionIndex >= 0 ? sectionIndex + 1 : undefined,
            section_title: heading,
          });
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -25% 0px",
        threshold: 0.55,
      }
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
