# Analytics Event Reference

Quick reference table of all tracked events in QuickLaunchWeb.

Client events are sent to both GA4 and Vercel Web Analytics through the shared analytics wrapper. Server events are sent to Vercel Web Analytics from route handlers.

## Page View Events

| Event | Trigger | Parameters |
|-------|---------|------------|
| `page_view` | Page load/navigation | page_title, page_path, page_type |

**Tracked Pages:**
- Homepage (`homepage`)
- Demo (`demo`)
- Support (`support`)
- Guides (`guides`)
- Success (`checkout_success`)
- Cancel (`checkout_cancel`)

## Checkout Funnel Events

| Event | Trigger | Parameters |
|-------|---------|------------|
| `plan_selected` | Click pricing CTA | plan, cta_location, price |
| `addon_toggled` | Toggle add-on | addon_name, addon_price, action, plan |
| `begin_checkout` | Continue to payment | plan, total_value, addons[], currency |
| `purchase` | Payment complete | transaction_id, plan, value, addons[] |
| `checkout_cancelled` | Leave checkout | plan |
| `checkout_modal_opened` | Plan picker opens | modal_name, funnel_stage |
| `checkout_modal_closed` | Plan picker or checkout modal closes | modal_name, plan, step_number, funnel_stage |
| `checkout_modal_step_viewed` | Checkout modal step becomes active | plan, step_name, step_number, funnel_stage |
| `checkout_modal_step_completed` | User completes checkout modal step | plan, step_name, step_number, addons, total_value |
| `checkout_domain_answered` | User answers domain question | plan, has_domain |
| `checkout_domain_routing_selected` | User chooses who handles domain setup | plan, domain_routing |
| `checkout_billing_cycle_selected` | User chooses monthly or upfront billing | plan, billing_cycle |

## CTA Events

| Event | Trigger | Parameters |
|-------|---------|------------|
| `cta_click` | Click CTA button | cta_text, cta_location, destination_url |

**Tracked CTAs:**
- Header: "Start My Free Website"
- Hero: Primary & Secondary buttons
- Pricing: "Book a Call" (custom quote)

## Form Events

| Event | Trigger | Parameters |
|-------|---------|------------|
| `form_started` | First field focus | form_name, form_location |
| `form_submitted` | Successful submit | form_name, form_location |
| `form_error` | Validation error | form_name, error_message |

**Tracked Forms:**
- `support` - Support request form
- `custom_quote` - Custom website request
- `lead_capture` - Demo lead capture modal

## Demo Events

| Event | Trigger | Parameters |
|-------|---------|------------|
| `demo_template_switched` | Change template | template, previous_template |
| `demo_customized` | Edit customization | customization_type |
| `generate_lead` | Submit lead form | - |

**Customization Types:**
- `theme`
- `accent_color`
- `business_info`

## Engagement Events

| Event | Trigger | Parameters |
|-------|---------|------------|
| `scroll_depth` | Scroll milestone | scroll_depth (25/50/75/90), page_path |
| `faq_expanded` | Open FAQ item | question, question_index |
| `social_proof_clicked` | Click portfolio | item_name, item_url, item_index |

## Server Events

| Event | Trigger | Parameters |
|-------|---------|------------|
| `checkout_session_created` | API success | session_id, plan, total_value, addons[] |
| `server_error` | API error | error_type, error_message |

## Vercel Event Context

Every client-side custom event is enriched with:

| Parameter | Description |
|-----------|-------------|
| `page_path` | Current path when the event fired |
| `page_url` | Current URL, capped for Vercel custom event limits |
| `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` | Captured from the landing URL and persisted for the session |
| `gclid`, `fbclid` | Captured from the landing URL and persisted for the session |

## Event Parameter Reference

### Common Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `event_category` | string | Category for grouping |
| `event_label` | string | Descriptive label |
| `value` | number | Numeric value |

### Checkout Parameters

| Parameter | Type | Values |
|-----------|------|--------|
| `plan` | string | starter, pro |
| `addons` | string[] | text_alerts, unlimited_edits, google_boost, domain_routing |
| `total_value` | number | Total in USD |
| `currency` | string | USD |

### CTA Parameters

| Parameter | Type | Example Values |
|-----------|------|----------------|
| `cta_text` | string | "Start My Free Website" |
| `cta_location` | string | header, hero, pricing_custom |
| `destination_url` | string | #work, /#pricing |

### Form Parameters

| Parameter | Type | Example Values |
|-----------|------|----------------|
| `form_name` | string | support, custom_quote, lead_capture |
| `form_location` | string | support_page, homepage_modal, demo |
| `form_action` | string | started, submitted, error |

### Demo Parameters

| Parameter | Type | Example Values |
|-----------|------|----------------|
| `template` | string | home, health, pro |
| `customization_type` | string | theme, accent_color, business_info |

## GA4 Custom Dimensions

Configure these in GA4 Admin > Custom definitions:

| Name | Scope | Parameter |
|------|-------|-----------|
| Plan Type | Event | `plan` |
| Template Type | Event | `template` |
| CTA Location | Event | `cta_location` |
| Form Name | Event | `form_name` |

## Conversion Events

Mark as conversions in GA4:
- `purchase`
- `generate_lead`
- `form_submitted` (optional)
- `begin_checkout` (optional)
