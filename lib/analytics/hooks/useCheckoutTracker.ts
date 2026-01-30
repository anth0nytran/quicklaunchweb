// Checkout funnel tracking hook

'use client';

import { useCallback } from 'react';
import { sendGtagEvent } from '../gtag';
import { EVENT_NAMES, analyticsConfig } from '../config';
import type {
  PlanSelectedEvent,
  AddonToggledEvent,
  CheckoutEvent,
  PurchaseEvent,
} from '../types';

/**
 * Checkout funnel tracking hook
 * Tracks all steps in the checkout process
 *
 * @returns Object with checkout tracking functions
 *
 * @example
 * const { trackPlanSelected, trackCheckoutInitiated, trackPurchase } = useCheckoutTracker();
 *
 * trackPlanSelected('Starter', 'homepage_pricing');
 * trackCheckoutInitiated('Starter', ['SEO'], 497);
 * trackPurchase('txn_123', 'Starter', 497);
 */
export function useCheckoutTracker() {
  const trackPlanSelected = useCallback(
    (plan: string, ctaLocation: string, price?: number) => {
      const eventData: PlanSelectedEvent = {
        plan,
        cta_location: ctaLocation,
        price,
        event_category: 'engagement',
        event_label: plan,
      };

      sendGtagEvent(EVENT_NAMES.PLAN_SELECTED, eventData);
    },
    []
  );

  const trackAddonToggled = useCallback(
    (addonName: string, addonPrice: number, action: 'added' | 'removed', plan: string) => {
      const eventData: AddonToggledEvent = {
        addon_name: addonName,
        addon_price: addonPrice,
        action,
        plan,
        event_category: 'engagement',
        event_label: addonName,
        value: action === 'added' ? addonPrice : -addonPrice,
      };

      sendGtagEvent(EVENT_NAMES.ADDON_TOGGLED, eventData);
    },
    []
  );

  const trackCheckoutInitiated = useCallback(
    (plan: string, totalValue: number, addons?: string[]) => {
      const eventData: CheckoutEvent = {
        plan,
        addons,
        total_value: totalValue,
        currency: analyticsConfig.defaultCurrency,
        event_category: 'conversion',
        event_label: plan,
        value: totalValue,
      };

      sendGtagEvent(EVENT_NAMES.BEGIN_CHECKOUT, eventData);
    },
    []
  );

  const trackPurchase = useCallback(
    (
      transactionId: string | undefined,
      plan: string,
      value: number,
      addons?: string[]
    ) => {
      const eventData: PurchaseEvent = {
        transaction_id: transactionId,
        plan,
        value,
        currency: analyticsConfig.defaultCurrency,
        addons,
        event_category: 'conversion',
        event_label: plan,
      };

      sendGtagEvent(EVENT_NAMES.PURCHASE, eventData);
    },
    []
  );

  const trackCheckoutCancelled = useCallback((plan: string, totalValue?: number) => {
    const eventData = {
      plan,
      total_value: totalValue,
      event_category: 'conversion',
      event_label: 'checkout_cancelled',
    };

    sendGtagEvent('checkout_cancelled', eventData);
  }, []);

  return {
    trackPlanSelected,
    trackAddonToggled,
    trackCheckoutInitiated,
    trackPurchase,
    trackCheckoutCancelled,
  };
}
