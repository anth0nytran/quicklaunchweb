// Google Analytics 4 Configuration

import { EVENT_NAMES } from './types';

/**
 * Analytics Configuration
 */
export const analyticsConfig = {
  // GA4 Measurement ID from environment variables
  measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',

  // Debug mode - logs events to console without sending to GA4
  debug: process.env.NEXT_PUBLIC_GA_DEBUG === 'true',

  // Enable analytics in production only (unless debug mode is on)
  enabled:
    process.env.NODE_ENV === 'production' ||
    process.env.NEXT_PUBLIC_GA_DEBUG === 'true',

  // Default currency for transactions
  defaultCurrency: 'USD',

  // Cookie settings
  cookieFlags: 'SameSite=None;Secure' as const,

  // IP Anonymization
  anonymizeIp: true,
} as const;

/**
 * Event Names Export (for easy imports)
 */
export { EVENT_NAMES };

/**
 * Custom Dimension Mappings
 * These should be configured in GA4: Admin → Data display → Custom definitions
 */
export const CUSTOM_DIMENSIONS = {
  plan_type: 'plan',
  template_type: 'template',
  cta_location: 'cta_location',
  form_name: 'form_name',
  addon_name: 'addon_name',
  scroll_depth: 'scroll_depth',
} as const;

/**
 * Scroll depth thresholds (percentage)
 */
export const SCROLL_THRESHOLDS = [25, 50, 75, 90] as const;

/**
 * Check if analytics is properly configured
 */
export function isAnalyticsConfigured(): boolean {
  return Boolean(analyticsConfig.measurementId);
}

/**
 * Check if analytics should be active
 */
export function isAnalyticsEnabled(): boolean {
  return analyticsConfig.enabled && isAnalyticsConfigured();
}

/**
 * Log configuration status (useful for debugging)
 */
export function logAnalyticsConfig(): void {
  if (typeof window === 'undefined') return;

  console.log('[Analytics] Configuration:', {
    measurementId: analyticsConfig.measurementId
      ? `${analyticsConfig.measurementId.substring(0, 5)}...`
      : 'NOT SET',
    debug: analyticsConfig.debug,
    enabled: analyticsConfig.enabled,
    configured: isAnalyticsConfigured(),
    active: isAnalyticsEnabled(),
  });
}
