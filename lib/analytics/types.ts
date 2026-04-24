// Google Analytics 4 Event Tracking Types

/**
 * Base event structure for all analytics events
 */
export interface BaseEvent {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: string | number | boolean | string[] | undefined;
}

/**
 * CTA Click Event
 * Tracks call-to-action button clicks across the site
 */
export interface CTAEvent extends BaseEvent {
  cta_text: string;
  cta_location: string;
  destination_url?: string;
}

/**
 * Plan Selection Event
 * Tracks when users select a pricing plan
 */
export interface PlanSelectedEvent extends BaseEvent {
  plan: string;
  price?: number;
  billing_cycle?: 'monthly' | 'yearly' | 'one-time';
  cta_location: string;
}

/**
 * Add-on Toggle Event
 * Tracks when users select or deselect add-ons
 */
export interface AddonToggledEvent extends BaseEvent {
  addon_name: string;
  addon_price: number;
  action: 'added' | 'removed';
  plan: string;
}

/**
 * Checkout Event
 * Tracks checkout funnel steps
 */
export interface CheckoutEvent extends BaseEvent {
  plan: string;
  addons?: string[];
  total_value: number;
  currency?: string;
}

/**
 * Purchase Event (GA4 Recommended)
 * Tracks successful conversions
 */
export interface PurchaseEvent extends BaseEvent {
  transaction_id?: string;
  plan: string;
  value: number;
  currency?: string;
  addons?: string[];
}

/**
 * Form Interaction Event
 * Tracks form starts and submissions
 */
export interface FormEvent extends BaseEvent {
  form_name: string;
  form_action: 'started' | 'submitted' | 'error';
  form_location?: string;
  error_message?: string;
}

/**
 * Demo Interaction Event
 * Tracks demo-specific interactions
 */
export interface DemoEvent extends BaseEvent {
  demo_action: 'template_switched' | 'customized' | 'lead_captured';
  template?: string;
  previous_template?: string;
  customization_type?: string;
}

/**
 * Navigation Event
 * Tracks navigation clicks and menu interactions
 */
export interface NavigationEvent extends BaseEvent {
  link_text: string;
  link_url: string;
  link_location: string;
  external?: boolean;
}

/**
 * Scroll Depth Event
 * Tracks scroll milestones on pages
 */
export interface ScrollDepthEvent extends BaseEvent {
  scroll_depth: 25 | 50 | 75 | 90;
  page_path: string;
  page_type?: string;
  percent_scrolled?: 25 | 50 | 75 | 90;
  guide_slug?: string;
}

/**
 * Page Engagement Event
 * Tracks meaningful time-on-page across all routes
 */
export interface PageEngagementEvent extends BaseEvent {
  page_path: string;
  page_type: string;
  engaged_seconds: number;
}

/**
 * Guide Reading Event
 * Tracks guide reading starts, progress, section views, and completions
 */
export interface GuideReadingEvent extends BaseEvent {
  guide_slug: string;
  page_path: string;
  page_type?: "guide_article";
  scroll_depth?: 25 | 50 | 75 | 90;
  percent_scrolled?: 25 | 50 | 75 | 90;
  section_id?: string;
  section_index?: number;
  section_title?: string;
  engaged_seconds?: number;
}

/**
 * FAQ Interaction Event
 * Tracks FAQ expansions
 */
export interface FAQEvent extends BaseEvent {
  question: string;
  question_index: number;
  action: 'expanded' | 'collapsed';
}

/**
 * Social Proof Click Event
 * Tracks clicks on portfolio items
 */
export interface SocialProofEvent extends BaseEvent {
  item_name: string;
  item_url: string;
  item_index: number;
}

/**
 * Page View Event
 * Tracks page views with additional context
 */
export interface PageViewEvent {
  page_title: string;
  page_location: string;
  page_path: string;
  page_type?: string;
}

/**
 * Union type of all trackable events
 */
export type AnalyticsEvent =
  | CTAEvent
  | PlanSelectedEvent
  | AddonToggledEvent
  | CheckoutEvent
  | PurchaseEvent
  | FormEvent
  | DemoEvent
  | NavigationEvent
  | ScrollDepthEvent
  | PageEngagementEvent
  | GuideReadingEvent
  | FAQEvent
  | SocialProofEvent;

/**
 * Event name constants (GA4 recommended + custom events)
 */
export const EVENT_NAMES = {
  // GA4 Recommended Events
  PAGE_VIEW: 'page_view',
  BEGIN_CHECKOUT: 'begin_checkout',
  PURCHASE: 'purchase',
  GENERATE_LEAD: 'generate_lead',

  // Custom Events
  CTA_CLICK: 'cta_click',
  PLAN_SELECTED: 'plan_selected',
  ADDON_TOGGLED: 'addon_toggled',
  FORM_STARTED: 'form_started',
  FORM_SUBMITTED: 'form_submitted',
  FORM_ERROR: 'form_error',
  DEMO_TEMPLATE_SWITCHED: 'demo_template_switched',
  DEMO_CUSTOMIZED: 'demo_customized',
  FAQ_EXPANDED: 'faq_expanded',
  SCROLL_DEPTH: 'scroll_depth',
  PAGE_ENGAGED: 'page_engaged',
  GUIDE_READ_STARTED: 'guide_read_started',
  GUIDE_READ_DEPTH: 'guide_read_depth',
  GUIDE_SECTION_VIEWED: 'guide_section_viewed',
  GUIDE_READ_COMPLETED: 'guide_read_completed',
  NAVIGATION_CLICK: 'navigation_click',
  SOCIAL_PROOF_CLICKED: 'social_proof_clicked',
  GUIDE_CLICKED: 'guide_clicked',
} as const;

export type EventName = typeof EVENT_NAMES[keyof typeof EVENT_NAMES];
