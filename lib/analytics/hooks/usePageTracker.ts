// Automatic page view tracking hook

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { sendPageView } from '../gtag';

/**
 * Automatic page view tracking hook
 * Tracks page views when component mounts or pathname changes
 *
 * @param pageTitle - The title of the page
 * @param pageType - Optional page type/category (e.g., 'homepage', 'demo', 'support')
 *
 * @example
 * usePageTracker('QuickLaunchWeb - Homepage', 'homepage');
 */
export function usePageTracker(pageTitle?: string, pageType?: string) {
  const pathname = usePathname();

  useEffect(() => {
    // Construct page view data
    const pageViewData = {
      page_title: pageTitle || document.title,
      page_location: typeof window !== 'undefined' ? window.location.href : '',
      page_path: pathname,
      page_type: pageType,
    };

    // Send page view
    sendPageView(pageViewData);
  }, [pathname, pageTitle, pageType]);
}
