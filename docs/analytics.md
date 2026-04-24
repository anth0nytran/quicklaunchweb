# GA4 Analytics Implementation Guide

## Overview

QuickLaunchWeb uses Google Analytics 4 (GA4) for comprehensive event tracking across the site. This document covers the analytics infrastructure, available hooks, and how to add new tracking.

## Quick Start

### Environment Setup

Add these variables to your `.env.local`:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-DQ1N327ENZ
NEXT_PUBLIC_GA_DEBUG=true  # Set to true for console logging
```

### Basic Usage

```typescript
// In a client component
import { usePageTracker, useEventTracker } from '@/lib/analytics';

export function MyComponent() {
  // Track page views automatically
  usePageTracker('My Page Title', 'page_type');

  // Track custom events
  const { track } = useEventTracker();

  const handleClick = () => {
    track('button_clicked', {
      button_name: 'my_button',
      event_category: 'engagement',
    });
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

### Server Components

For server components, use the `PageTracker` component:

```typescript
import { PageTracker } from '@/lib/analytics';

export default function ServerPage() {
  return (
    <main>
      <PageTracker title="My Server Page" pageType="content" />
      {/* page content */}
    </main>
  );
}
```

## Available Hooks

### usePageTracker

Automatically tracks page views when the component mounts or pathname changes.

```typescript
usePageTracker(pageTitle?: string, pageType?: string)
```

**Parameters:**
- `pageTitle` - Optional page title (defaults to document.title)
- `pageType` - Optional page category for segmentation

### useEventTracker

General-purpose event tracking hook.

```typescript
const { track } = useEventTracker();
track(eventName: string, eventParams?: BaseEvent)
```

### useCheckoutTracker

Tracks checkout funnel events.

```typescript
const {
  trackPlanSelected,
  trackAddonToggled,
  trackCheckoutInitiated,
  trackPurchase,
  trackCheckoutCancelled,
} = useCheckoutTracker();

// Track plan selection
trackPlanSelected('starter', 'pricing_section', 99);

// Track add-on changes
trackAddonToggled('Text Alerts', 29, 'added', 'starter');

// Track checkout initiation
trackCheckoutInitiated('starter', 128, ['text_alerts']);

// Track successful purchase
trackPurchase('session_123', 'starter', 128, ['text_alerts']);
```

### useFormTracker

Tracks form interactions (start and submit).

```typescript
const { trackFormStart, trackFormSubmit, trackFormError } = useFormTracker(
  'form_name',
  'form_location'
);

// Track when user focuses on form
<input onFocus={trackFormStart} />

// Track successful submission
trackFormSubmit();

// Track errors
trackFormError('Email is required');
```

### useDemoTracker

Tracks demo-specific interactions.

```typescript
const { trackTemplateSwitched, trackDemoCustomized, trackLeadCaptured } = useDemoTracker();

// Track template changes
trackTemplateSwitched('pro', 'home');

// Track customization
trackDemoCustomized('business_info');

// Track lead capture
trackLeadCaptured();
```

## Event Catalog

### GA4 Recommended Events

| Event | Description | Key Parameters |
|-------|-------------|----------------|
| `page_view` | Page visit | page_title, page_type |
| `begin_checkout` | Checkout started | plan, total_value, addons |
| `purchase` | Conversion completed | transaction_id, plan, value |
| `generate_lead` | Lead form submitted | - |

### Custom Events

| Event | Description | Key Parameters |
|-------|-------------|----------------|
| `cta_click` | CTA button clicked | cta_text, cta_location |
| `plan_selected` | Plan chosen | plan, price, cta_location |
| `addon_toggled` | Add-on changed | addon_name, action, plan |
| `form_started` | Form interaction began | form_name, form_location |
| `form_submitted` | Form completed | form_name |
| `demo_template_switched` | Template changed | template, previous_template |
| `demo_customized` | Demo customized | customization_type |
| `faq_expanded` | FAQ opened | question, question_index |
| `scroll_depth` | Scroll milestone | scroll_depth, page_path |
| `page_engaged` | Visitor stayed 15 seconds | page_path, page_type |
| `guide_read_started` | Guide visitor stayed 10 seconds | guide_slug, page_path |
| `guide_read_depth` | Guide scroll milestone | guide_slug, scroll_depth |
| `guide_section_viewed` | Guide section entered viewport | guide_slug, section_id, section_index |
| `guide_read_completed` | Visitor reached 90% of a guide | guide_slug, scroll_depth |
| `social_proof_clicked` | Portfolio clicked | item_name, item_url |

## Testing

### Debug Mode

Enable debug mode to see events in the browser console:

```env
NEXT_PUBLIC_GA_DEBUG=true
```

Console output will show:
```
[Analytics] Event sent: cta_click { cta_text: "Get Started", cta_location: "hero" }
```

### GA4 Realtime

1. Open [GA4 Dashboard](https://analytics.google.com/)
2. Navigate to Reports > Realtime
3. Trigger events on your site
4. Events appear within 30 seconds

### Verification Checklist

- [ ] Page views tracked on all routes
- [ ] Hero CTA click tracked
- [ ] Plan selection tracked
- [ ] Checkout initiation tracked with addons
- [ ] Form start/submit tracked
- [ ] Demo template switches tracked
- [ ] Scroll depth milestones firing
- [ ] Guide read-start and read-depth events firing
- [ ] Guide section views firing on article pages
- [ ] FAQ expansions tracked

## GA4 Configuration

### Custom Dimensions

Create these in GA4: Admin > Data display > Custom definitions

| Dimension | Scope | Parameter |
|-----------|-------|-----------|
| plan_type | Event | plan |
| template_type | Event | template |
| cta_location | Event | cta_location |
| form_name | Event | form_name |

### Conversion Setup

Mark these events as conversions in GA4:
- `purchase`
- `generate_lead`
- `form_submitted`

### Funnel Reports

**Checkout Funnel:**
1. page_view (homepage)
2. plan_selected
3. begin_checkout
4. purchase

**Demo Lead Funnel:**
1. page_view (demo)
2. demo_template_switched
3. generate_lead

## Architecture

```
lib/analytics/
├── index.ts           # Main exports
├── types.ts           # TypeScript definitions
├── config.ts          # Configuration
├── gtag.ts            # Core gtag wrapper
├── hooks/
│   ├── index.ts
│   ├── useEventTracker.ts
│   ├── usePageTracker.ts
│   ├── useFormTracker.ts
│   ├── useCheckoutTracker.ts
│   └── useDemoTracker.ts
├── components/
│   ├── index.ts
│   └── PageTracker.tsx
└── server/
    ├── index.ts
    └── logger.ts
```

## Adding New Events

1. **Define the type** in `types.ts`:
```typescript
export interface MyNewEvent extends BaseEvent {
  my_param: string;
}
```

2. **Add event name** to `EVENT_NAMES` in `types.ts`:
```typescript
MY_NEW_EVENT: 'my_new_event',
```

3. **Create a hook** (optional) or use `useEventTracker`:
```typescript
const { track } = useEventTracker();
track('my_new_event', { my_param: 'value' });
```

## Server-Side Logging

For API routes, use the server logger:

```typescript
import { logServerEvent, logErrorEvent } from '@/lib/analytics/server';

// Log custom event
logServerEvent('api_called', { endpoint: '/api/example' });

// Log errors
logErrorEvent('api_error', 'Something went wrong', { context: 'details' });
```

## Troubleshooting

### Events not appearing

1. Check `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
2. Verify debug mode shows console logs
3. Check browser network tab for gtag requests
4. Ensure analytics not blocked by ad blockers

### TypeScript errors

Ensure event parameters match the type definitions in `types.ts`.

### Duplicate events

Check that hooks aren't being called multiple times due to re-renders. Use `useCallback` for event handlers.
