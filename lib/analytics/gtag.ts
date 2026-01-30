// Google Analytics gtag wrapper with type safety and error handling

import { analyticsConfig, isAnalyticsEnabled } from './config';
import type { BaseEvent, PageViewEvent } from './types';

/**
 * Extend Window interface to include gtag
 */
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'set',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Check if gtag is available in the window
 */
export function isGtagAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

/**
 * Initialize gtag (called by Google Analytics script)
 */
export function initGtag(): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
}

/**
 * Send an event to Google Analytics
 *
 * @param eventName - The name of the event
 * @param eventParams - Event parameters
 * @returns void
 */
export function sendGtagEvent(
  eventName: string,
  eventParams: BaseEvent = {}
): void {
  // Check if analytics is enabled
  if (!isAnalyticsEnabled()) {
    if (analyticsConfig.debug) {
      console.log('[Analytics] Analytics disabled, skipping event:', eventName);
    }
    return;
  }

  // Check if gtag is available
  if (!isGtagAvailable()) {
    if (analyticsConfig.debug) {
      console.warn('[Analytics] gtag not available, event not sent:', eventName);
    }
    return;
  }

  try {
    // Debug logging
    if (analyticsConfig.debug) {
      console.log('[Analytics] Event sent:', eventName, eventParams);
    }

    // Send event to GA4
    window.gtag?.('event', eventName, eventParams);
  } catch (error) {
    // Silent fail in production, log in debug mode
    if (analyticsConfig.debug) {
      console.error('[Analytics] Error sending event:', error);
    }
  }
}

/**
 * Send a page view event to Google Analytics
 *
 * @param pageViewData - Page view data
 * @returns void
 */
export function sendPageView(pageViewData: PageViewEvent): void {
  // Check if analytics is enabled
  if (!isAnalyticsEnabled()) {
    if (analyticsConfig.debug) {
      console.log('[Analytics] Analytics disabled, skipping page view');
    }
    return;
  }

  // Check if gtag is available
  if (!isGtagAvailable()) {
    if (analyticsConfig.debug) {
      console.warn('[Analytics] gtag not available, page view not sent');
    }
    return;
  }

  try {
    // Debug logging
    if (analyticsConfig.debug) {
      console.log('[Analytics] Page view:', pageViewData);
    }

    // Send page view to GA4
    window.gtag?.('config', analyticsConfig.measurementId, {
      page_title: pageViewData.page_title,
      page_location: pageViewData.page_location,
      page_path: pageViewData.page_path,
      page_type: pageViewData.page_type,
    });
  } catch (error) {
    // Silent fail in production, log in debug mode
    if (analyticsConfig.debug) {
      console.error('[Analytics] Error sending page view:', error);
    }
  }
}

/**
 * Set user properties in Google Analytics
 *
 * @param properties - User properties to set
 * @returns void
 */
export function setUserProperties(properties: Record<string, unknown>): void {
  // Check if analytics is enabled
  if (!isAnalyticsEnabled()) return;

  // Check if gtag is available
  if (!isGtagAvailable()) return;

  try {
    if (analyticsConfig.debug) {
      console.log('[Analytics] User properties set:', properties);
    }

    window.gtag?.('set', 'user_properties', properties);
  } catch (error) {
    if (analyticsConfig.debug) {
      console.error('[Analytics] Error setting user properties:', error);
    }
  }
}

/**
 * Configure gtag with custom settings
 * Useful for setting up additional configurations
 */
export function configureGtag(config: Record<string, unknown>): void {
  if (!isAnalyticsEnabled() || !isGtagAvailable()) return;

  try {
    if (analyticsConfig.debug) {
      console.log('[Analytics] gtag configured:', config);
    }

    window.gtag?.('config', analyticsConfig.measurementId, config);
  } catch (error) {
    if (analyticsConfig.debug) {
      console.error('[Analytics] Error configuring gtag:', error);
    }
  }
}
