'use client';

import { usePageTracker } from '../hooks/usePageTracker';

interface PageTrackerProps {
  title: string;
  pageType?: string;
}

/**
 * Client component for page view tracking
 * Can be used in server components to add page tracking
 *
 * @example
 * // In a server component:
 * <PageTracker title="My Page Title" pageType="guides" />
 */
export function PageTracker({ title, pageType }: PageTrackerProps) {
  usePageTracker(title, pageType);
  return null;
}
