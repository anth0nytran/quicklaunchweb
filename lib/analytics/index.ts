// Analytics Module - Main Exports

// Core functionality
export { sendGtagEvent, sendPageView, isGtagAvailable, setUserProperties, configureGtag } from './gtag';

// Configuration
export { analyticsConfig, EVENT_NAMES, isAnalyticsEnabled, isAnalyticsConfigured, logAnalyticsConfig, SCROLL_THRESHOLDS } from './config';

// Types
export type {
  BaseEvent,
  CTAEvent,
  PlanSelectedEvent,
  AddonToggledEvent,
  CheckoutEvent,
  PurchaseEvent,
  FormEvent,
  DemoEvent,
  NavigationEvent,
  ScrollDepthEvent,
  FAQEvent,
  SocialProofEvent,
  PageViewEvent,
  AnalyticsEvent,
  EventName,
} from './types';

// Hooks
export * from './hooks';

// Components (for use in server components)
export * from './components';
