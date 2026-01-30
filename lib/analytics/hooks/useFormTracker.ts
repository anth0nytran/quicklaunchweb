// Form tracking hook (start + submit)

'use client';

import { useCallback, useRef } from 'react';
import { sendGtagEvent } from '../gtag';
import { EVENT_NAMES } from '../config';
import type { FormEvent } from '../types';

/**
 * Form tracking hook
 * Tracks form starts and submissions (basic tracking, no field-level)
 *
 * @param formName - The name/identifier of the form
 * @param formLocation - Optional location/context of the form
 * @returns Object with trackFormStart, trackFormSubmit, trackFormError functions
 *
 * @example
 * const { trackFormStart, trackFormSubmit } = useFormTracker('support_form');
 *
 * <input onFocus={trackFormStart} />
 * <form onSubmit={(e) => { e.preventDefault(); trackFormSubmit(); }} />
 */
export function useFormTracker(formName: string, formLocation?: string) {
  // Track if form has been started to avoid duplicate events
  const formStartedRef = useRef(false);

  const trackFormStart = useCallback(() => {
    // Only track once per form session
    if (formStartedRef.current) return;

    formStartedRef.current = true;

    const eventData: FormEvent = {
      form_name: formName,
      form_action: 'started',
      form_location: formLocation,
    };

    sendGtagEvent(EVENT_NAMES.FORM_STARTED, eventData);
  }, [formName, formLocation]);

  const trackFormSubmit = useCallback(() => {
    const eventData: FormEvent = {
      form_name: formName,
      form_action: 'submitted',
      form_location: formLocation,
    };

    sendGtagEvent(EVENT_NAMES.FORM_SUBMITTED, eventData);

    // Reset started flag for potential re-submissions
    formStartedRef.current = false;
  }, [formName, formLocation]);

  const trackFormError = useCallback((errorMessage?: string) => {
    const eventData: FormEvent = {
      form_name: formName,
      form_action: 'error',
      form_location: formLocation,
      error_message: errorMessage,
    };

    sendGtagEvent(EVENT_NAMES.FORM_ERROR, eventData);
  }, [formName, formLocation]);

  return {
    trackFormStart,
    trackFormSubmit,
    trackFormError,
  };
}
