// Demo interaction tracking hook

'use client';

import { useCallback } from 'react';
import { sendGtagEvent } from '../gtag';
import { EVENT_NAMES } from '../config';
import type { DemoEvent } from '../types';

/**
 * Demo interaction tracking hook
 * Tracks template switching, customization, and lead capture
 *
 * @returns Object with demo tracking functions
 *
 * @example
 * const { trackTemplateSwitched, trackDemoCustomized, trackLeadCaptured } = useDemoTracker();
 *
 * trackTemplateSwitched('construction', 'plumber');
 * trackDemoCustomized('business_name');
 * trackLeadCaptured();
 */
export function useDemoTracker() {
  const trackTemplateSwitched = useCallback(
    (newTemplate: string, previousTemplate?: string) => {
      const eventData: DemoEvent = {
        demo_action: 'template_switched',
        template: newTemplate,
        previous_template: previousTemplate,
        event_category: 'engagement',
        event_label: newTemplate,
      };

      sendGtagEvent(EVENT_NAMES.DEMO_TEMPLATE_SWITCHED, eventData);
    },
    []
  );

  const trackDemoCustomized = useCallback((customizationType: string) => {
    const eventData: DemoEvent = {
      demo_action: 'customized',
      customization_type: customizationType,
      event_category: 'engagement',
      event_label: customizationType,
    };

    sendGtagEvent(EVENT_NAMES.DEMO_CUSTOMIZED, eventData);
  }, []);

  const trackLeadCaptured = useCallback(() => {
    const eventData: DemoEvent = {
      demo_action: 'lead_captured',
      event_category: 'conversion',
      event_label: 'demo_lead',
    };

    sendGtagEvent(EVENT_NAMES.GENERATE_LEAD, eventData);
  }, []);

  return {
    trackTemplateSwitched,
    trackDemoCustomized,
    trackLeadCaptured,
  };
}
